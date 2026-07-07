"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { generateTotpSecret, verifyTotp, totpUri } from "@/lib/totp";
import QRCode from "qrcode";
import type { ActionResult } from "@/app/actions/auth-actions";

export interface TotpSetup {
  secret: string;
  qrDataUrl: string;
}

/** Neues Secret erzeugen (noch NICHT aktiv — erst nach Code-Bestätigung). */
export async function startTotpSetup(): Promise<TotpSetup> {
  const user = await requireUser();
  const secret = generateTotpSecret();
  await prisma.user.update({
    where: { id: user.id },
    data: { totpSecret: secret, totpEnabledAt: null },
  });
  const qrDataUrl = await QRCode.toDataURL(totpUri(secret, user.email), { margin: 1, width: 220 });
  return { secret, qrDataUrl };
}

/** Aktivierung: erst wenn der Nutzer einen gültigen Code aus der App eingibt. */
export async function confirmTotp(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.totpSecret) return { ok: false, error: "Bitte zuerst den QR-Code erzeugen." };

  const code = String(formData.get("code") ?? "");
  if (!verifyTotp(dbUser.totpSecret, code)) {
    await audit({ action: "TOTP_FAILED", userId: user.id, companyId: user.companyId });
    return { ok: false, error: "Code ungültig. Bitte erneut versuchen." };
  }
  await prisma.user.update({ where: { id: user.id }, data: { totpEnabledAt: new Date() } });
  await audit({ action: "TOTP_ENABLED", userId: user.id, companyId: user.companyId });
  revalidatePath("/settings/2fa");
  return { ok: true };
}

/** Deaktivierung nur mit gültigem Code. */
export async function disableTotp(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.totpSecret || !dbUser.totpEnabledAt) return { ok: false, error: "2FA ist nicht aktiv." };

  const code = String(formData.get("code") ?? "");
  if (!verifyTotp(dbUser.totpSecret, code)) {
    await audit({ action: "TOTP_FAILED", userId: user.id, companyId: user.companyId });
    return { ok: false, error: "Code ungültig. Bitte erneut versuchen." };
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { totpSecret: null, totpEnabledAt: null },
  });
  await audit({ action: "TOTP_DISABLED", userId: user.id, companyId: user.companyId });
  revalidatePath("/settings/2fa");
  return { ok: true };
}
