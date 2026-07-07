import { prisma } from "@/lib/prisma";
import { testCompanyIds } from "@/lib/test-companies";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";
import {
  evaluateFeedback, evaluateFailRate, evaluateDropoutRate,
  type FeedbackEvaluation, type Severity,
} from "@/lib/qm/logic";

/** QM-Fall idempotent anlegen (dedupeKey verhindert Cron-Dubletten). */
export async function createQualityIssue(params: {
  companyId: string;
  courseId?: string | null;
  userId?: string | null;
  feedbackResponseId?: string | null;
  title: string;
  description: string;
  source: string;
  severity: Severity;
  category: string;
  dueDays?: number | null;
  dedupeKey?: string;
}) {
  if (params.dedupeKey) {
    const existing = await prisma.qualityIssue.findUnique({ where: { dedupeKey: params.dedupeKey } });
    if (existing) return existing;
  }
  const issue = await prisma.qualityIssue.create({
    data: {
      companyId: params.companyId,
      courseId: params.courseId ?? null,
      userId: params.userId ?? null,
      feedbackResponseId: params.feedbackResponseId ?? null,
      title: params.title,
      description: params.description,
      source: params.source,
      severity: params.severity,
      category: params.category,
      dueDate: params.dueDays ? new Date(Date.now() + params.dueDays * 86400_000) : null,
      dedupeKey: params.dedupeKey,
    },
  });
  await audit({
    action: "QM_ISSUE_CREATED",
    companyId: params.companyId,
    entityType: "QualityIssue",
    entityId: issue.id,
    metadata: { severity: params.severity, source: params.source },
  });

  // Benachrichtigungen
  const admins = await prisma.user.findMany({
    where: { companyId: params.companyId, role: "COMPANY_ADMIN", status: "ACTIVE" },
    select: { email: true, firstName: true, locale: true },
  });
  const course = params.courseId
    ? await prisma.courseTranslation.findFirst({ where: { courseId: params.courseId, locale: "de" } })
    : null;
  for (const admin of admins) {
    await sendMail("qm_bad_feedback", admin.email, {
      firstName: admin.firstName,
      courseName: course?.title ?? "—",
      issueTitle: params.title,
      link: `${process.env.APP_URL ?? ""}/company/qm/complaints`,
      issuer: appConfig.certificateIssuer,
    }, admin.locale);
  }
  if (params.severity === "CRITICAL") {
    const superadmins = await prisma.user.findMany({ where: { role: "SUPERADMIN", status: "ACTIVE" } });
    for (const sa of superadmins) {
      await sendMail("qm_bad_feedback", sa.email, {
        firstName: sa.firstName,
        courseName: course?.title ?? "—",
        issueTitle: `KRITISCH: ${params.title}`,
        link: `${process.env.APP_URL ?? ""}/admin/qm`,
        issuer: appConfig.certificateIssuer,
      }, sa.locale);
    }
  }
  // Bei HIGH/CRITICAL direkt CAPA-Vorschlag anlegen
  if (params.severity === "HIGH" || params.severity === "CRITICAL") {
    await prisma.correctiveAction.create({
      data: {
        companyId: params.companyId,
        qualityIssueId: issue.id,
        title: `Maßnahme zu: ${params.title}`,
        dueDate: issue.dueDate,
        status: "PLANNED",
      },
    });
  }
  return issue;
}

/** Feedback auswerten, Response-Status setzen, ggf. QM-Fall erzeugen. */
export async function processFeedbackResponse(responseId: string): Promise<FeedbackEvaluation> {
  const response = await prisma.feedbackResponse.findUnique({
    where: { id: responseId },
    include: { answers: { include: { question: true } } },
  });
  if (!response) throw new Error("Feedback nicht gefunden.");

  const ratings = response.answers.filter((a) => a.ratingValue !== null && a.question.questionType === "RATING_1_5");
  const avg = ratings.length
    ? ratings.reduce((sum, a) => sum + (a.ratingValue ?? 0), 0) / ratings.length
    : null;
  const nps = response.answers.find((a) => a.question.questionType === "RATING_1_10")?.ratingValue ?? null;
  const freeTexts = response.answers.map((a) => a.textValue).filter((t): t is string => !!t);
  const catScore = (category: string) => {
    const answer = response.answers.find((a) => a.question.category === category && a.ratingValue !== null);
    return answer?.ratingValue ?? null;
  };
  const needsRetraining = response.answers.some(
    (a) => a.question.category === "SUPPORT" && a.question.questionType === "YES_NO" && a.booleanValue === true
  );

  const evaluation = evaluateFeedback({
    averageScore: avg,
    npsScore: nps,
    freeTexts,
    technicalScore: catScore("TECHNICAL_USABILITY"),
    examFairnessScore: catScore("EXAM_FAIRNESS"),
  });

  await prisma.feedbackResponse.update({
    where: { id: responseId },
    data: {
      averageScore: avg,
      npsScore: nps,
      sentiment: evaluation.sentiment,
      status: evaluation.status,
      needsRetraining,
    },
  });

  if (evaluation.createIssue && evaluation.severity) {
    await createQualityIssue({
      companyId: response.companyId,
      courseId: response.courseId,
      userId: response.userId,
      feedbackResponseId: response.id,
      title: `Kritisches Teilnehmerfeedback (${avg !== null ? "Ø " + avg.toFixed(2) : "Freitext"})`,
      description: evaluation.reasons.join("; "),
      source: "FEEDBACK",
      severity: evaluation.severity,
      category: evaluation.reasons.some((r) => r.includes("Technik")) ? "TECHNICAL"
        : evaluation.reasons.some((r) => r.includes("Testfairness")) ? "EXAM"
        : evaluation.reasons.some((r) => r.includes("Datenschutz")) ? "DATA_PROTECTION"
        : "CONTENT",
      dueDays: evaluation.dueDays,
      dedupeKey: `feedback:${response.id}`,
    });
  }
  return evaluation;
}

export interface CourseQmMetrics {
  courseId: string;
  responses: number;
  averageScore: number | null;
  nps: number | null;
  failRatePercent: number;
  dropoutPercent: number;
}

/** Kennzahlen je Kurs für eine Firma (oder global bei companyId=null). */
export async function courseMetrics(companyId: string | null, courseId: string, since?: Date): Promise<CourseQmMetrics> {
  const companyFilter = companyId ? { companyId } : {};
  const sinceFilter = since ? { gte: since } : undefined;
  // Globale Auswertung (companyId === null): Test-Firmen ausschliessen.
  const excludeIds = companyId ? [] : await testCompanyIds();
  const excludeFilter = excludeIds.length ? { notIn: excludeIds } : undefined;

  const responses = await prisma.feedbackResponse.findMany({
    where: { courseId, ...companyFilter, ...(excludeFilter ? { companyId: excludeFilter } : {}), ...(sinceFilter ? { submittedAt: sinceFilter } : {}) },
    select: { averageScore: true, npsScore: true },
  });
  const scored = responses.filter((r) => r.averageScore !== null);
  const averageScore = scored.length
    ? scored.reduce((s, r) => s + (r.averageScore ?? 0), 0) / scored.length : null;
  const npsScores = responses.map((r) => r.npsScore).filter((n): n is number => n !== null);
  const promoters = npsScores.filter((n) => n >= 9).length;
  const detractors = npsScores.filter((n) => n <= 6).length;
  const nps = npsScores.length ? Math.round(((promoters - detractors) / npsScores.length) * 100) : null;

  const attempts = await prisma.examAttempt.findMany({
    where: { courseId, status: "SUBMITTED", ...(companyId ? { user: { companyId } } : (excludeFilter ? { user: { companyId: excludeFilter } } : {})), ...(sinceFilter ? { submittedAt: sinceFilter } : {}) },
    select: { passed: true },
  });
  const failRatePercent = attempts.length
    ? Math.round((attempts.filter((a) => a.passed === false).length / attempts.length) * 100) : 0;

  // Abbruchquote: begonnen (irgendein Fortschritt), aber nach 30 Tagen weder fertig noch Test
  const participants = await prisma.user.findMany({
    where: { role: "PARTICIPANT", status: "ACTIVE", ...(companyId ? { companyId } : (excludeFilter ? { companyId: excludeFilter } : {})) },
    select: {
      id: true,
      createdAt: true,
      lessonProgress: { select: { lessonId: true }, take: 1 },
      attempts: { where: { courseId, status: "SUBMITTED" }, select: { id: true }, take: 1 },
    },
  });
  const started = participants.filter((p) => p.lessonProgress.length > 0);
  const stale = started.filter(
    (p) => p.attempts.length === 0 && p.createdAt < new Date(Date.now() - 30 * 86400_000)
  );
  const dropoutPercent = started.length ? Math.round((stale.length / started.length) * 100) : 0;

  return { courseId, responses: responses.length, averageScore, nps, failRatePercent, dropoutPercent };
}

/** Schwellenwert-Prüfung je Firma+Kurs — von Cron und Dashboard genutzt. Idempotent pro Tag. */
export async function runThresholdCheck(companyId: string, courseId: string): Promise<string[]> {
  const metrics = await courseMetrics(companyId, courseId);
  const created: string[] = [];
  const today = new Date().toISOString().slice(0, 10);

  const fail = evaluateFailRate(metrics.failRatePercent);
  if (fail.createIssue) {
    await createQualityIssue({
      companyId, courseId,
      title: `Durchfallquote ${metrics.failRatePercent} % über kritischer Schwelle (40 %)`,
      description: "Kursinhalt und Testfragen prüfen (Fragenanalyse empfohlen).",
      source: "SYSTEM", severity: "HIGH", category: "EXAM", dueDays: 14,
      dedupeKey: `failrate:${companyId}:${courseId}:${today}`,
    });
    created.push("EXAM_FAIL_RATE");
  }
  const dropout = evaluateDropoutRate(metrics.dropoutPercent);
  if (dropout.createIssue) {
    await createQualityIssue({
      companyId, courseId,
      title: `Abbruchquote ${metrics.dropoutPercent} % über kritischer Schwelle (35 %)`,
      description: "UX- und Inhaltsprüfung erforderlich.",
      source: "SYSTEM", severity: "HIGH", category: "UX", dueDays: 14,
      dedupeKey: `dropout:${companyId}:${courseId}:${today}`,
    });
    created.push("COURSE_DROPOUT_RATE");
  }
  return created;
}
