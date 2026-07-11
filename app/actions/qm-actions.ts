"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser, requireRole, assertCompanyScope } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { canCloseCorrectiveAction, versionLabel, type Severity } from "@/lib/qm/logic";
import { processFeedbackResponse } from "@/lib/qm/service";
import { generateManagementReviewDraft } from "@/lib/qm/review";
import type { ActionResult } from "@/app/actions/auth-actions";

/**
 * Mandanten-Härtung: Ein aus dem Formular übergebener ownerId darf nur gesetzt
 * werden, wenn der Nutzer zur selben Firma gehört wie der QM-Datensatz. Sonst
 * könnte ein Firmen-Admin einen fremden Mandanten-Nutzer als Verantwortlichen
 * eintragen (→ Erinnerungs-Mails über die Mandantengrenze). companyId === null
 * (Superadmin-/Plattformfälle) erlaubt jeden Nutzer.
 */
async function assertOwnerInScope(ownerId: string | undefined, companyId: string | null): Promise<boolean> {
  if (!ownerId) return true;
  const owner = await prisma.user.findUnique({ where: { id: ownerId }, select: { companyId: true } });
  if (!owner) return false;
  if (companyId === null) return true;
  return owner.companyId === companyId;
}

/** Teilnehmer: Feedback absenden (nur eigenes, einmal je Kurs+Fragebogen). */
export async function submitFeedback(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  if (!user.companyId) return { ok: false, error: "common.requiredField" };
  const surveyId = String(formData.get("surveyId") ?? "");
  const courseId = String(formData.get("courseId") ?? "");
  const survey = await prisma.feedbackSurvey.findUnique({ where: { id: surveyId }, include: { questions: { where: { isActive: true } } } });
  if (!survey || !survey.isActive) return { ok: false, error: "common.requiredField" };

  const existing = await prisma.feedbackResponse.findUnique({
    where: { userId_surveyId_courseId: { userId: user.id, surveyId, courseId } },
  });
  if (existing) return { ok: true }; // idempotent

  const certificate = await prisma.certificate.findFirst({ where: { userId: user.id, courseId } });
  const attempt = await prisma.examAttempt.findFirst({
    where: { userId: user.id, courseId, status: "SUBMITTED" }, orderBy: { submittedAt: "desc" },
  });

  const response = await prisma.feedbackResponse.create({
    data: {
      companyId: user.companyId,
      courseId,
      userId: user.id,
      surveyId,
      certificateId: certificate?.id ?? null,
      examAttemptId: attempt?.id ?? null,
    },
  });

  for (const question of survey.questions) {
    const raw = formData.get(`q_${question.id}`);
    const rawText = formData.get(`q_${question.id}_text`);
    if (raw === null && rawText === null) {
      if (question.isRequired && question.questionType !== "FREE_TEXT") {
        await prisma.feedbackResponse.delete({ where: { id: response.id } });
        return { ok: false, error: "common.requiredField" };
      }
      continue;
    }
    const data: { ratingValue?: number; booleanValue?: boolean; textValue?: string } = {};
    if (question.questionType === "RATING_1_5" || question.questionType === "RATING_1_10") {
      const value = parseInt(String(raw), 10);
      const max = question.questionType === "RATING_1_5" ? 5 : 10;
      if (isNaN(value) || value < 0 || value > max) continue;
      data.ratingValue = value;
    } else if (question.questionType === "YES_NO" || question.questionType === "YES_NO_TEXT") {
      data.booleanValue = String(raw) === "yes";
      if (rawText) data.textValue = String(rawText).slice(0, 2000);
    } else {
      data.textValue = String(raw ?? rawText ?? "").slice(0, 4000);
    }
    await prisma.feedbackAnswer.create({ data: { responseId: response.id, questionId: question.id, ...data } });
  }

  await processFeedbackResponse(response.id);
  await audit({ action: "QM_FEEDBACK_SUBMITTED", userId: user.id, companyId: user.companyId, entityType: "FeedbackResponse", entityId: response.id });
  return { ok: true };
}

/** Teilnehmer: inhaltlichen Fehler/Verbesserung zu einer Lektion melden → QualityIssue im bestehenden QM. */
export async function reportContentIssue(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  if (!user.companyId) return { ok: false, error: "common.requiredField" };
  const lessonId = String(formData.get("lessonId") ?? "");
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);
  if (message.length < 5) return { ok: false, error: "common.requiredField" };

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { translations: true, module: { include: { translations: true } } },
  });
  const lessonTitle = lesson?.translations.find((tr) => tr.locale === user.locale)?.title
    ?? lesson?.translations[0]?.title ?? "Unbekannte Lektion";
  const moduleTitle = lesson?.module.translations.find((tr) => tr.locale === user.locale)?.title
    ?? lesson?.module.translations[0]?.title ?? "";
  const courseId = lesson?.module.courseId ?? null;

  const issue = await prisma.qualityIssue.create({
    data: {
      companyId: user.companyId,
      courseId,
      userId: user.id,
      title: `Inhaltsmeldung: ${lessonTitle}`.slice(0, 200),
      description: `Von Teilnehmer gemeldet.\nModul: ${moduleTitle}\nLektion: ${lessonTitle}${lessonId ? ` (${lessonId})` : ""}\n\n${message}`,
      source: "USER_REPORT",
      category: "CONTENT",
      severity: "LOW",
      status: "OPEN",
    },
  });
  await audit({ action: "QM_CONTENT_REPORTED", userId: user.id, companyId: user.companyId, entityType: "QualityIssue", entityId: issue.id });
  revalidatePath("/company/qm/complaints");
  revalidatePath("/admin/qm/complaints");
  return { ok: true };
}

const issueUpdateSchema = z.object({
  issueId: z.string().min(1),
  status: z.enum(["OPEN", "IN_REVIEW", "ACTION_DEFINED", "IN_PROGRESS", "EFFECTIVENESS_CHECK", "CLOSED", "REJECTED"]),
  ownerId: z.string().optional(),
  dueDate: z.string().optional(),
});

/** QM-Fall aktualisieren (Status/Owner/Frist) — mit Abschlussvalidierung. */
export async function updateQualityIssue(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const parsed = issueUpdateSchema.safeParse({
    issueId: formData.get("issueId"),
    status: formData.get("status"),
    ownerId: String(formData.get("ownerId") ?? "") || undefined,
    dueDate: String(formData.get("dueDate") ?? "") || undefined,
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const issue = await prisma.qualityIssue.findUnique({ where: { id: parsed.data.issueId }, include: { correctiveActions: true } });
  if (!issue) return { ok: false, error: "common.requiredField" };
  assertCompanyScope(admin, issue.companyId);
  if (!(await assertOwnerInScope(parsed.data.ownerId, issue.companyId))) {
    return { ok: false, error: "Verantwortliche(r) muss zur selben Firma gehören." };
  }

  if (parsed.data.status === "CLOSED") {
    const action = issue.correctiveActions[0];
    const check = canCloseCorrectiveAction({
      rootCause: action?.rootCause ?? null,
      correctiveAction: action?.correctiveAction ?? null,
      ownerId: action?.ownerId ?? issue.ownerId,
      effectivenessResult: action?.effectivenessResult ?? null,
      issueSeverity: issue.severity as Severity,
    });
    if (!check.ok) {
      return { ok: false, error: `Abschluss nicht möglich — es fehlt: ${check.missing.join(", ")}. Ursache, Maßnahme, Verantwortlicher (und bei HIGH/CRITICAL die Wirksamkeitsprüfung) sind Pflicht.` };
    }
  }

  const updated = await prisma.qualityIssue.update({
    where: { id: issue.id },
    data: {
      status: parsed.data.status,
      ownerId: parsed.data.ownerId ?? issue.ownerId,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : issue.dueDate,
      closedAt: parsed.data.status === "CLOSED" ? new Date() : null,
    },
  });
  await audit({
    action: "QM_ISSUE_UPDATED", userId: admin.id, companyId: issue.companyId,
    entityType: "QualityIssue", entityId: issue.id,
    oldValue: { status: issue.status, ownerId: issue.ownerId },
    newValue: { status: updated.status, ownerId: updated.ownerId },
  });
  revalidatePath("/company/qm/complaints");
  revalidatePath("/admin/qm");
  return { ok: true };
}

const capaSchema = z.object({
  actionId: z.string().min(1),
  rootCause: z.string().optional(),
  immediateAction: z.string().optional(),
  correctiveAction: z.string().optional(),
  preventiveAction: z.string().optional(),
  ownerId: z.string().optional(),
  dueDate: z.string().optional(),
  effectivenessCheckDate: z.string().optional(),
  effectivenessResult: z.string().optional(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "IMPLEMENTED", "EFFECTIVENESS_PENDING", "EFFECTIVE", "NOT_EFFECTIVE", "CLOSED"]),
});

/** CAPA bearbeiten — Abschluss nur mit Pflichtfeldern (§7). */
export async function updateCorrectiveAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const parsed = capaSchema.safeParse({
    actionId: formData.get("actionId"),
    rootCause: String(formData.get("rootCause") ?? "") || undefined,
    immediateAction: String(formData.get("immediateAction") ?? "") || undefined,
    correctiveAction: String(formData.get("correctiveAction") ?? "") || undefined,
    preventiveAction: String(formData.get("preventiveAction") ?? "") || undefined,
    ownerId: String(formData.get("ownerId") ?? "") || undefined,
    dueDate: String(formData.get("dueDate") ?? "") || undefined,
    effectivenessCheckDate: String(formData.get("effectivenessCheckDate") ?? "") || undefined,
    effectivenessResult: String(formData.get("effectivenessResult") ?? "") || undefined,
    status: formData.get("status"),
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const action = await prisma.correctiveAction.findUnique({ where: { id: parsed.data.actionId }, include: { qualityIssue: true } });
  if (!action) return { ok: false, error: "common.requiredField" };
  assertCompanyScope(admin, action.companyId);
  if (!(await assertOwnerInScope(parsed.data.ownerId, action.companyId))) {
    return { ok: false, error: "Verantwortliche(r) muss zur selben Firma gehören." };
  }

  const merged = {
    rootCause: parsed.data.rootCause ?? action.rootCause,
    correctiveAction: parsed.data.correctiveAction ?? action.correctiveAction,
    ownerId: parsed.data.ownerId ?? action.ownerId,
    effectivenessResult: parsed.data.effectivenessResult ?? action.effectivenessResult,
  };
  if (parsed.data.status === "CLOSED") {
    const check = canCloseCorrectiveAction({ ...merged, issueSeverity: action.qualityIssue.severity as Severity });
    if (!check.ok) {
      return { ok: false, error: `Abschluss nicht möglich — es fehlt: ${check.missing.join(", ")}.` };
    }
  }

  await prisma.correctiveAction.update({
    where: { id: action.id },
    data: {
      rootCause: merged.rootCause,
      immediateAction: parsed.data.immediateAction ?? action.immediateAction,
      correctiveAction: merged.correctiveAction,
      preventiveAction: parsed.data.preventiveAction ?? action.preventiveAction,
      ownerId: merged.ownerId,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : action.dueDate,
      effectivenessCheckDate: parsed.data.effectivenessCheckDate ? new Date(parsed.data.effectivenessCheckDate) : action.effectivenessCheckDate,
      effectivenessResult: merged.effectivenessResult,
      status: parsed.data.status,
      closedAt: parsed.data.status === "CLOSED" ? new Date() : null,
    },
  });
  await audit({
    action: parsed.data.status === "CLOSED" ? "QM_ACTION_CLOSED" : "QM_ACTION_UPDATED",
    userId: admin.id, companyId: action.companyId, entityType: "CorrectiveAction", entityId: action.id,
    oldValue: { status: action.status }, newValue: { status: parsed.data.status },
  });
  if (parsed.data.effectivenessResult) {
    await audit({ action: "QM_EFFECTIVENESS_CHECKED", userId: admin.id, companyId: action.companyId, entityType: "CorrectiveAction", entityId: action.id });
  }
  revalidatePath("/company/qm/corrective-actions");
  return { ok: true };
}

/** Management-Review anlegen (Entwurf mit Auto-Kennzahlen) bzw. freigeben. */
export async function createReviewDraft(): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  if (!admin.companyId) return;
  await generateManagementReviewDraft(admin.companyId);
  revalidatePath("/company/qm/reviews");
}

export async function approveReview(reviewId: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const review = await prisma.managementReview.findUnique({ where: { id: reviewId } });
  if (!review) return;
  assertCompanyScope(admin, review.companyId);
  await prisma.managementReview.update({
    where: { id: reviewId },
    data: { status: "APPROVED", approvedById: admin.id, approvedAt: new Date() },
  });
  await audit({ action: "QM_REVIEW_APPROVED", userId: admin.id, companyId: review.companyId, entityType: "ManagementReview", entityId: reviewId });
  revalidatePath("/company/qm/reviews");
}

const reviewEditSchema = z.object({
  reviewId: z.string().min(1),
  decisions: z.string().max(8000).optional(),
  improvementActions: z.string().max(8000).optional(),
  summary: z.string().max(8000).optional(),
});

export async function updateReview(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const parsed = reviewEditSchema.safeParse({
    reviewId: formData.get("reviewId"),
    decisions: String(formData.get("decisions") ?? "") || undefined,
    improvementActions: String(formData.get("improvementActions") ?? "") || undefined,
    summary: String(formData.get("summary") ?? "") || undefined,
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const review = await prisma.managementReview.findUnique({ where: { id: parsed.data.reviewId } });
  if (!review) return { ok: false, error: "common.requiredField" };
  assertCompanyScope(admin, review.companyId);
  await prisma.managementReview.update({
    where: { id: review.id },
    data: {
      decisions: parsed.data.decisions ?? review.decisions,
      improvementActions: parsed.data.improvementActions ?? review.improvementActions,
      summary: parsed.data.summary ?? review.summary,
      responsibleUserId: admin.id,
      status: review.status === "DRAFT" ? "IN_REVIEW" : review.status,
    },
  });
  revalidatePath("/company/qm/reviews");
  return { ok: true };
}

const thresholdSchema = z.object({
  metric: z.string().min(1),
  warningThreshold: z.coerce.number(),
  criticalThreshold: z.coerce.number(),
});

/** Superadmin: globale Schwellenwerte pflegen. */
export async function upsertThreshold(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const parsed = thresholdSchema.safeParse({
    metric: formData.get("metric"),
    warningThreshold: formData.get("warningThreshold"),
    criticalThreshold: formData.get("criticalThreshold"),
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const existing = await prisma.qMThreshold.findFirst({ where: { scope: "GLOBAL", metric: parsed.data.metric, companyId: null, courseId: null } });
  if (existing) {
    await prisma.qMThreshold.update({ where: { id: existing.id }, data: { warningThreshold: parsed.data.warningThreshold, criticalThreshold: parsed.data.criticalThreshold } });
  } else {
    await prisma.qMThreshold.create({ data: { scope: "GLOBAL", metric: parsed.data.metric, warningThreshold: parsed.data.warningThreshold, criticalThreshold: parsed.data.criticalThreshold } });
  }
  await audit({ action: "QM_THRESHOLD_CHANGED", userId: admin.id, entityType: "QMThreshold", metadata: { metric: parsed.data.metric }, newValue: parsed.data });
  revalidatePath("/admin/qm/thresholds");
  return { ok: true };
}

/** Versionsregister: Eintrag anlegen (ab V1.003 aufsteigend). */
export async function recordRevision(params: {
  entityType: string; entityId: string; changeNote: string; changedById?: string; snapshot?: unknown;
}) {
  const count = await prisma.contentRevision.count();
  const label = versionLabel(count + 1);
  const revision = await prisma.contentRevision.create({
    data: {
      entityType: params.entityType,
      entityId: params.entityId,
      versionLabel: label,
      changeNote: params.changeNote,
      changedById: params.changedById ?? null,
      snapshot: params.snapshot ? JSON.stringify(params.snapshot) : null,
    },
  });
  await audit({ action: "CONTENT_REVISION_CREATED", userId: params.changedById, entityType: params.entityType, entityId: params.entityId, metadata: { versionLabel: label } });
  return revision;
}
