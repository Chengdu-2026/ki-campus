"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";

const passwordSchema = z.string().min(10, "passwordPolicy");

const registerSchema = z.object({
  companyName: z.string().min(2).max(200),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  password: passwordSchema,
});

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** Self-Service: legt Unternehmen (Plan BASIC) + ersten Unternehmensadmin an. */
export async function registerCompany(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    companyName: formData.get("companyName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: String(formData.get("email") ?? "").toLowerCase().trim(),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message === "passwordPolicy" ? "auth.passwordPolicy" : "common.requiredField" };
  }
  const { companyName, firstName, lastName, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "auth.emailExists" };

  const company = await prisma.company.create({
    data: { name: companyName, planKey: "BASIC" },
  });
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      firstName,
      lastName,
      role: "COMPANY_ADMIN",
      companyId: company.id,
    },
  });

  await audit({ action: "COMPANY_CREATED", userId: user.id, companyId: company.id, entityType: "Company", entityId: company.id });
  await audit({ action: "USER_REGISTERED", userId: user.id, companyId: company.id, entityType: "User", entityId: user.id });
  await sendMail("verify_email", email, {
    firstName,
    link: `${process.env.APP_URL ?? ""}/login`,
    issuer: appConfig.certificateIssuer,
  });
  return { ok: true };
}

/** Passwort-Reset anfordern — antwortet immer gleich (kein Nutzer-Enumerations-Orakel). */
export async function requestPasswordReset(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  if (!email) return { ok: false, error: "common.requiredField" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.status === "ACTIVE") {
    const token = randomUUID().replace(/-/g, "");
    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + 3600 * 1000) },
    });
    await audit({ action: "PASSWORD_RESET_REQUESTED", userId: user.id, companyId: user.companyId });
    await sendMail("password_reset", email, {
      firstName: user.firstName,
      link: `${process.env.APP_URL ?? ""}/passwort-reset/${token}`,
      issuer: appConfig.certificateIssuer,
    }, user.locale);
  }
  return { ok: true };
}

export async function resetPassword(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  if (passwordSchema.safeParse(password).success === false) return { ok: false, error: "auth.passwordPolicy" };

  const reset = await prisma.passwordResetToken.findUnique({ where: { token }, include: { user: true } });
  if (!reset || reset.usedAt || reset.expiresAt < new Date()) return { ok: false, error: "auth.resetInvalid" };

  await prisma.$transaction([
    prisma.user.update({ where: { id: reset.userId }, data: { passwordHash: await bcrypt.hash(password, 10) } }),
    prisma.passwordResetToken.update({ where: { id: reset.id }, data: { usedAt: new Date() } }),
  ]);
  await audit({ action: "PASSWORD_RESET_DONE", userId: reset.userId, companyId: reset.user.companyId });
  return { ok: true };
}

const acceptInviteSchema = z.object({
  code: z.string().min(4),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  password: passwordSchema,
});

/** Einladung annehmen (Link-Code oder Registrierungscode) — erstellt Teilnehmer-Zugang. */
export async function acceptInvitation(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = acceptInviteSchema.safeParse({
    code: String(formData.get("code") ?? "").trim(),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: String(formData.get("email") ?? "").toLowerCase().trim(),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message === "passwordPolicy" ? "auth.passwordPolicy" : "common.requiredField" };
  }
  const { code, firstName, lastName, email, password } = parsed.data;

  const invitation = await prisma.invitation.findUnique({ where: { code }, include: { company: { include: { plan: true, _count: { select: { users: { where: { status: "ACTIVE", role: "PARTICIPANT" } } } } } } } });
  if (!invitation || invitation.acceptedAt || invitation.expiresAt < new Date()) {
    return { ok: false, error: "auth.inviteInvalid" };
  }
  if (invitation.email && invitation.email.toLowerCase() !== email) {
    return { ok: false, error: "auth.inviteInvalid" };
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "auth.emailExists" };

  // Plan-Limit-Enforcement
  const limit = invitation.company.plan.maxParticipants;
  if (limit !== null && invitation.company._count.users >= limit) {
    return { ok: false, error: "company.planLimitReached" };
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      firstName,
      lastName,
      role: invitation.role,
      companyId: invitation.companyId,
      emailVerifiedAt: new Date(),
    },
  });
  await prisma.invitation.update({ where: { id: invitation.id }, data: { acceptedAt: new Date() } });
  await audit({ action: "USER_REGISTERED", userId: user.id, companyId: invitation.companyId, entityType: "User", entityId: user.id, metadata: { viaInvitation: invitation.id } });
  return { ok: true };
}
