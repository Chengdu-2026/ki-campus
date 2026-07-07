"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireRole, assertCompanyScope } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";
import type { ActionResult } from "@/app/actions/auth-actions";

async function checkPlanLimit(companyId: string): Promise<{ ok: boolean; limit: number | null; used: number }> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { plan: true, _count: { select: { users: { where: { status: "ACTIVE", role: "PARTICIPANT" } } } } },
  });
  if (!company) return { ok: false, limit: 0, used: 0 };
  const limit = company.plan.maxParticipants;
  const used = company._count.users;
  return { ok: limit === null || used < limit, limit, used };
}

/** Einladung per E-Mail oder als Registrierungscode. */
export async function createInvitation(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const companyId = user.role === "SUPERADMIN"
    ? String(formData.get("companyId") ?? user.companyId ?? "")
    : user.companyId!;
  assertCompanyScope(user, companyId);

  const email = String(formData.get("email") ?? "").toLowerCase().trim() || null;
  if (email && !z.string().email().safeParse(email).success) {
    return { ok: false, error: "common.requiredField" };
  }

  const planCheck = await checkPlanLimit(companyId);
  if (!planCheck.ok) return { ok: false, error: "company.planLimitReached" };

  const code = randomUUID().slice(0, 8).toUpperCase();
  const invitation = await prisma.invitation.create({
    data: {
      companyId,
      email,
      code,
      invitedById: user.id,
      expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    },
  });

  await audit({ action: "USER_INVITED", userId: user.id, companyId, entityType: "Invitation", entityId: invitation.id, metadata: { email } });

  if (email) {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    await sendMail("invitation", email, {
      companyName: company?.name ?? "",
      link: `${process.env.APP_URL ?? ""}/invite/${code}`,
      issuer: appConfig.certificateIssuer,
    });
  }
  revalidatePath("/company/invitations");
  return { ok: true };
}

const birthDateSchema = z
  .string()
  .optional()
  .transform((value) => (value ? new Date(value) : null))
  .refine((d) => d === null || (!isNaN(d.getTime()) && d < new Date()), "Ungültiges Datum");

const createUserSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  password: z.string().min(10),
  birthDate: birthDateSchema,
});

/** Teilnehmer manuell anlegen. */
export async function createParticipant(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const companyId = user.role === "SUPERADMIN"
    ? String(formData.get("companyId") ?? user.companyId ?? "")
    : user.companyId!;
  assertCompanyScope(user, companyId);

  const parsed = createUserSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: String(formData.get("email") ?? "").toLowerCase().trim(),
    password: formData.get("password"),
    birthDate: String(formData.get("birthDate") ?? "") || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.path[0] === "password" ? "auth.passwordPolicy" : "common.requiredField" };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { ok: false, error: "auth.emailExists" };

  const planCheck = await checkPlanLimit(companyId);
  if (!planCheck.ok) return { ok: false, error: "company.planLimitReached" };

  const created = await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash: await bcrypt.hash(parsed.data.password, 10),
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      birthDate: parsed.data.birthDate,
      role: "PARTICIPANT",
      companyId,
      emailVerifiedAt: new Date(),
    },
  });
  await audit({ action: "USER_CREATED", userId: user.id, companyId, entityType: "User", entityId: created.id });
  revalidatePath("/company/users");
  return { ok: true };
}

const updateUserSchema = z.object({
  userId: z.string().min(1),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  birthDate: birthDateSchema,
});

/** Teilnehmerdaten bearbeiten (Name, E-Mail, Geburtsdatum) — nur eigene Firma bzw. Superadmin. */
export async function updateParticipant(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const parsed = updateUserSchema.safeParse({
    userId: formData.get("userId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: String(formData.get("email") ?? "").toLowerCase().trim(),
    birthDate: String(formData.get("birthDate") ?? "") || undefined,
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };

  const target = await prisma.user.findUnique({ where: { id: parsed.data.userId } });
  if (!target) return { ok: false, error: "common.requiredField" };
  assertCompanyScope(admin, target.companyId);
  if (target.role === "SUPERADMIN" && admin.id !== target.id) {
    return { ok: false, error: "common.requiredField" };
  }

  const emailTaken = await prisma.user.findFirst({
    where: { email: parsed.data.email, id: { not: target.id } },
  });
  if (emailTaken) return { ok: false, error: "auth.emailExists" };

  await prisma.user.update({
    where: { id: target.id },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      birthDate: parsed.data.birthDate,
    },
  });
  await audit({ action: "USER_UPDATED", userId: admin.id, companyId: target.companyId, entityType: "User", entityId: target.id });
  revalidatePath("/company/users");
  return { ok: true };
}

/** Aktiv/Inaktiv umschalten — inaktive Teilnehmer geben Plan-Plätze frei. */
export async function toggleUserStatus(targetUserId: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new Error("Nutzer nicht gefunden.");
  assertCompanyScope(admin, target.companyId);
  if (target.role === "SUPERADMIN") throw new Error("Superadmin kann nicht deaktiviert werden.");

  const newStatus = target.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await prisma.user.update({ where: { id: targetUserId }, data: { status: newStatus } });
  await audit({ action: "USER_DEACTIVATED", userId: admin.id, companyId: target.companyId, entityType: "User", entityId: targetUserId, metadata: { newStatus } });
  revalidatePath("/company/users");
}

/**
 * DSGVO-Löschung: personenbezogene Felder anonymisieren.
 * Zertifikats-/Testhistorie bleibt als Nachweis der Firma erhalten (pseudonymisiert).
 */
export async function deleteUserGdpr(targetUserId: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new Error("Nutzer nicht gefunden.");
  assertCompanyScope(admin, target.companyId);
  if (target.role === "SUPERADMIN") throw new Error("Superadmin kann nicht gelöscht werden.");

  await prisma.user.update({
    where: { id: targetUserId },
    data: {
      firstName: "Gelöschter",
      lastName: "Nutzer",
      email: `geloescht-${targetUserId}@anonymisiert.invalid`,
      passwordHash: "!",
      status: "INACTIVE",
    },
  });
  await audit({ action: "USER_DELETED", userId: admin.id, companyId: target.companyId, entityType: "User", entityId: targetUserId, metadata: { anonymized: true } });
  revalidatePath("/company/users");
}

/** Versuchs-Reset durch Admin — mit AuditLog. */
export async function resetAttempts(targetUserId: string, courseId: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new Error("Nutzer nicht gefunden.");
  assertCompanyScope(admin, target.companyId);

  await prisma.examAttempt.updateMany({
    where: { userId: targetUserId, courseId, status: { in: ["SUBMITTED", "EXPIRED"] }, passed: { not: true } },
    data: { status: "EXPIRED" },
  });
  // Reset = alte nicht bestandene Versuche zählen nicht mehr: wir markieren sie als archiviert über Metadata im AuditLog
  // und löschen die EXPIRED-Versuche ohne Bestehen.
  await prisma.examAttempt.deleteMany({
    where: { userId: targetUserId, courseId, status: "EXPIRED", passed: { not: true } },
  });
  await audit({ action: "EXAM_ATTEMPTS_RESET", userId: admin.id, companyId: target.companyId, entityType: "User", entityId: targetUserId, metadata: { courseId } });
  revalidatePath("/company/progress");
}

/** Erinnerung senden. */
export async function sendReminder(targetUserId: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new Error("Nutzer nicht gefunden.");
  assertCompanyScope(admin, target.companyId);

  await sendMail("reminder_open", target.email, {
    firstName: target.firstName,
    link: `${process.env.APP_URL ?? ""}/dashboard`,
    issuer: appConfig.certificateIssuer,
  }, target.locale);
  revalidatePath("/company/progress");
}

/** Zertifikat widerrufen. */
export async function revokeCertificate(certificateId: string, reason: string): Promise<void> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const cert = await prisma.certificate.findUnique({ where: { id: certificateId } });
  if (!cert) throw new Error("Zertifikat nicht gefunden.");
  assertCompanyScope(admin, cert.companyId);

  await prisma.certificate.update({
    where: { id: certificateId },
    data: { status: "REVOKED", revokedAt: new Date(), revokeReason: reason || "Ohne Angabe" },
  });
  await audit({ action: "CERTIFICATE_REVOKED", userId: admin.id, companyId: cert.companyId, entityType: "Certificate", entityId: certificateId, metadata: { reason } });
  revalidatePath("/company/certificates");
  revalidatePath("/admin/certificates");
}
