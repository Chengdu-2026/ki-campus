"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { verifyTotp } from "@/lib/totp";
import { canApprove, canTransition, type AuditStatus } from "@/lib/content-audit/logic";
import { runContentAuditScan } from "@/lib/content-audit/scan";
import type { ActionResult } from "@/app/actions/auth-actions";

/** ActionResult mit optionaler Erfolgsmeldung (kompatibel zu ActionForm). */
export type AuditActionResult = ActionResult & { message?: string };

/** Scan ausführen: erfasst neue Blöcke, erkennt Änderungen (Superadmin). */
export async function runScanAction(_prev: ActionResult | null, _formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const result = await runContentAuditScan(admin.id);
  await audit({
    action: "CONTENT_AUDIT_SCANNED",
    userId: admin.id,
    entityType: "ContentAuditItem",
    metadata: { ...result },
  });
  revalidatePath("/admin/content-audit");
  return { ok: true, message: `Scan: ${result.created} neu, ${result.changed} geändert, ${result.unchanged} unverändert, ${result.riskFlagged} riskant (${result.total} Blöcke)` };
}

async function transition(itemId: string, to: AuditStatus, adminId: string, extra?: Record<string, unknown>) {
  const item = await prisma.contentAuditItem.findUnique({ where: { id: itemId } });
  if (!item) return { ok: false as const, error: "Eintrag nicht gefunden." };
  if (!canTransition(item.status as AuditStatus, to)) {
    return { ok: false as const, error: `Statuswechsel ${item.status} → ${to} ist nicht erlaubt.` };
  }
  return { ok: true as const, item };
}

/** Prüfung starten: NEEDS_REVIEW/CHANGES_REQUESTED → IN_REVIEW + Checklisten-Result anlegen. */
export async function startReviewAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const check = await transition(itemId, "IN_REVIEW", admin.id);
  if (!check.ok) return check;
  const item = check.item;

  // Passendes Template: erst entityType-spezifisch, sonst Default.
  const template =
    (await prisma.reviewChecklistTemplate.findFirst({ where: { entityType: item.entityType, isActive: true } })) ??
    (await prisma.reviewChecklistTemplate.findFirst({ where: { isDefault: true, isActive: true } }));
  if (!template) return { ok: false, error: "Kein aktives Checklisten-Template vorhanden (Seed fehlt?)." };

  await prisma.$transaction([
    prisma.contentAuditItem.update({
      where: { id: item.id },
      data: { status: "IN_REVIEW", reviewedById: admin.id, reviewedAt: new Date() },
    }),
    prisma.contentReviewChecklistResult.create({
      data: { auditItemId: item.id, templateId: template.id, reviewerId: admin.id },
    }),
  ]);
  await audit({
    action: "CONTENT_AUDIT_REVIEW_STARTED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: item.id,
    oldValue: { status: item.status }, newValue: { status: "IN_REVIEW", templateId: template.id },
  });
  revalidatePath(`/admin/content-audit/${item.id}`);
  return { ok: true };
}

/** Checklisten-Antwort setzen (Haken/Kommentar). */
export async function setChecklistAnswerAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const resultId = String(formData.get("resultId") ?? "");
  const itemIdsChecked = formData.getAll("checkedItems").map(String);
  const result = await prisma.contentReviewChecklistResult.findUnique({
    where: { id: resultId },
    include: { template: { include: { items: true } } },
  });
  if (!result) return { ok: false, error: "Checkliste nicht gefunden." };
  if (result.reviewerId !== admin.id && admin.role !== "SUPERADMIN") return { ok: false, error: "Nicht berechtigt." };

  for (const item of result.template.items) {
    await prisma.contentReviewChecklistAnswer.upsert({
      where: { checklistResultId_checklistItemId: { checklistResultId: result.id, checklistItemId: item.id } },
      update: { checked: itemIdsChecked.includes(item.id) },
      create: { checklistResultId: result.id, checklistItemId: item.id, checked: itemIdsChecked.includes(item.id) },
    });
  }
  const notes = String(formData.get("notes") ?? "");
  await prisma.contentReviewChecklistResult.update({
    where: { id: result.id },
    data: { notes: notes || null, approvedForPublication: formData.get("approvedForPublication") === "on" },
  });
  revalidatePath(`/admin/content-audit`);
  const auditItem = await prisma.contentAuditItem.findUnique({ where: { id: result.auditItemId }, select: { id: true } });
  if (auditItem) revalidatePath(`/admin/content-audit/${auditItem.id}`);
  return { ok: true, message: "Checkliste gespeichert." };
}

/** Interne Prüfung: Voraussetzungen für Approve laden und prüfen. */
async function approvePreconditions(itemId: string) {
  const item = await prisma.contentAuditItem.findUnique({
    where: { id: itemId },
    include: {
      checklistResults: {
        orderBy: { createdAt: "desc" }, take: 1,
        include: { answers: { include: { item: true } }, template: { include: { items: true } } },
      },
    },
  });
  if (!item) return { ok: false as const, error: "Eintrag nicht gefunden." };
  const result = item.checklistResults[0];
  if (!result) return { ok: false as const, error: "Erst Prüfung starten (keine Checkliste vorhanden)." };
  const state = {
    requiredItemKeys: result.template.items.filter((i) => i.required).map((i) => i.key),
    checkedKeys: result.answers.filter((a) => a.checked).map((a) => a.item.key),
    approvedForPublication: result.approvedForPublication,
  };
  const gate = canApprove(state);
  if (!gate.ok) {
    return { ok: false as const, error: `Freigabe gesperrt — offene Pflichtpunkte: ${gate.missing.join(", ")}` };
  }
  return { ok: true as const, item, result };
}

/** Freigeben: nur mit vollständiger Pflicht-Checkliste; bindet Freigabe an den Hash. */
export async function approveAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const pre = await approvePreconditions(itemId);
  if (!pre.ok) return pre;
  const { item, result } = pre;
  if (!canTransition(item.status as AuditStatus, "APPROVED")) {
    return { ok: false, error: `Statuswechsel ${item.status} → APPROVED nicht erlaubt.` };
  }
  if (item.requiresOwnerApproval && !formData.get("totp")) {
    return { ok: false, error: "Dieser Inhalt benötigt persönliche Freigabe (mit TOTP-Code) — nutze „Persönlich freigeben“." };
  }

  await prisma.$transaction([
    prisma.contentAuditItem.update({
      where: { id: item.id },
      data: { status: "APPROVED", approvedById: admin.id, approvedAt: new Date(), approvedContentHash: item.contentHash },
    }),
    prisma.contentReviewChecklistResult.update({ where: { id: result.id }, data: { completedAt: new Date() } }),
  ]);
  await audit({
    action: "CONTENT_AUDIT_APPROVED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: item.id,
    oldValue: { status: item.status }, newValue: { status: "APPROVED", contentHash: item.contentHash },
  });
  revalidatePath(`/admin/content-audit/${item.id}`);
  revalidatePath("/admin/content-audit");
  return { ok: true, message: "Freigegeben — Freigabe ist an den aktuellen Inhalts-Hash gebunden." };
}

/** Persönliche Owner-Freigabe: wie approve, zusätzlich TOTP-Re-Authentifizierung. */
export async function ownerApproveAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const code = String(formData.get("totp") ?? "").trim();

  const user = await prisma.user.findUnique({ where: { id: admin.id }, select: { totpSecret: true, totpEnabledAt: true } });
  if (!user?.totpSecret || !user.totpEnabledAt) {
    return { ok: false, error: "Persönliche Freigabe erfordert aktivierte 2FA (TOTP) für dein Konto." };
  }
  if (!verifyTotp(user.totpSecret, code)) {
    await audit({ action: "TOTP_FAILED", userId: admin.id, entityType: "ContentAuditItem", entityId: itemId, metadata: { context: "ownerApprove" } });
    return { ok: false, error: "TOTP-Code ungültig — persönliche Freigabe abgebrochen." };
  }

  const pre = await approvePreconditions(itemId);
  if (!pre.ok) return pre;
  const { item, result } = pre;
  if (!canTransition(item.status as AuditStatus, "APPROVED") && item.status !== "APPROVED") {
    return { ok: false, error: `Statuswechsel ${item.status} → APPROVED nicht erlaubt.` };
  }

  const now = new Date();
  await prisma.$transaction([
    prisma.contentAuditItem.update({
      where: { id: item.id },
      data: {
        status: "APPROVED",
        approvedById: item.approvedById ?? admin.id,
        approvedAt: item.approvedAt ?? now,
        approvedContentHash: item.contentHash,
        ownerApprovedById: admin.id,
        ownerApprovedAt: now,
      },
    }),
    prisma.contentReviewChecklistResult.update({ where: { id: result.id }, data: { completedAt: now } }),
  ]);
  await audit({
    action: "CONTENT_AUDIT_OWNER_APPROVED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: item.id,
    oldValue: { status: item.status },
    newValue: { status: "APPROVED", ownerApprovedAt: now.toISOString(), contentHash: item.contentHash },
  });
  revalidatePath(`/admin/content-audit/${item.id}`);
  revalidatePath("/admin/content-audit");
  return { ok: true, message: "Persönlich freigegeben (TOTP bestätigt) — hash-gebunden dokumentiert." };
}

/** Änderungen anfordern / Ablehnen / Veröffentlicht markieren. */
export async function requestChangesAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const reason = String(formData.get("reason") ?? "");
  const check = await transition(itemId, "CHANGES_REQUESTED", admin.id);
  if (!check.ok) return check;
  await prisma.contentAuditItem.update({
    where: { id: itemId },
    data: { status: "CHANGES_REQUESTED", notes: reason || check.item.notes },
  });
  await audit({
    action: "CONTENT_AUDIT_CHANGES_REQUESTED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: itemId,
    oldValue: { status: check.item.status }, newValue: { status: "CHANGES_REQUESTED", reason },
  });
  revalidatePath(`/admin/content-audit/${itemId}`);
  return { ok: true };
}

export async function rejectAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const reason = String(formData.get("reason") ?? "");
  const check = await transition(itemId, "REJECTED", admin.id);
  if (!check.ok) return check;
  await prisma.contentAuditItem.update({
    where: { id: itemId },
    data: { status: "REJECTED", notes: reason || check.item.notes },
  });
  await audit({
    action: "CONTENT_AUDIT_REJECTED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: itemId,
    oldValue: { status: check.item.status }, newValue: { status: "REJECTED", reason },
  });
  revalidatePath(`/admin/content-audit/${itemId}`);
  return { ok: true };
}

export async function markPublishedAction(_prev: ActionResult | null, formData: FormData): Promise<AuditActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const itemId = String(formData.get("itemId") ?? "");
  const check = await transition(itemId, "PUBLISHED", admin.id);
  if (!check.ok) return check;
  await prisma.contentAuditItem.update({
    where: { id: itemId },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
  await audit({
    action: "CONTENT_AUDIT_PUBLISHED", userId: admin.id,
    entityType: "ContentAuditItem", entityId: itemId,
    oldValue: { status: check.item.status }, newValue: { status: "PUBLISHED" },
  });
  revalidatePath(`/admin/content-audit/${itemId}`);
  return { ok: true };
}
