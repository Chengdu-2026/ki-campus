"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { appConfig } from "@/config/app";
import { clientIp } from "@/lib/rate-limit";
import type { ActionResult } from "@/app/actions/auth-actions";

const acceptSchema = z.object({
  signerName: z.string().min(2).max(200),
  signerBirthDate: z.string().max(20).optional(),
  signerPosition: z.string().min(1).max(200),
  signatureText: z.string().min(2).max(200),
  confirm: z.string(),
});

/**
 * Firmen-Admin akzeptiert die AVV (Art. 28 DSGVO) für seine Firma.
 * Speichert einen belastbaren elektronischen Zustimmungsnachweis: Name, Geburtsdatum,
 * Position, getippte Signatur, IP-Adresse, User-Agent, Zeitstempel, akzeptierte
 * AVV-Version und ein Inhalts-Hash (Nachweis, WAS akzeptiert wurde). Auditiert.
 */
export async function acceptAvv(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  if (!admin.companyId) return { ok: false, error: "avv.noCompany" };

  const parsed = acceptSchema.safeParse({
    signerName: String(formData.get("signerName") ?? "").trim(),
    signerBirthDate: String(formData.get("signerBirthDate") ?? "").trim() || undefined,
    signerPosition: String(formData.get("signerPosition") ?? "").trim(),
    signatureText: String(formData.get("signatureText") ?? "").trim(),
    confirm: String(formData.get("confirm") ?? ""),
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  if (parsed.data.confirm !== "on" && parsed.data.confirm !== "true") {
    return { ok: false, error: "avv.mustConfirm" };
  }

  const hdrs = await headers();
  const ip = clientIp({ headers: hdrs });
  const userAgent = hdrs.get("user-agent") ?? null;
  const avvVersion = appConfig.avvVersion;

  // Inhalts-Hash: bindet die Zustimmung an Version + Firma + Unterzeichner + Signatur.
  const contentHash = createHash("sha256")
    .update(`${avvVersion}|${admin.companyId}|${parsed.data.signerName}|${parsed.data.signerPosition}|${parsed.data.signatureText}`)
    .digest("hex");

  const record = await prisma.avvAcceptance.create({
    data: {
      companyId: admin.companyId,
      acceptedById: admin.id,
      avvVersion,
      avvContentHash: contentHash,
      signerName: parsed.data.signerName,
      signerBirthDate: parsed.data.signerBirthDate ?? null,
      signerPosition: parsed.data.signerPosition,
      signatureText: parsed.data.signatureText,
      ipAddress: ip === "unknown" ? null : ip,
      userAgent,
    },
  });

  await audit({
    action: "AVV_ACCEPTED",
    userId: admin.id,
    companyId: admin.companyId,
    entityType: "AvvAcceptance",
    entityId: record.id,
    metadata: { avvVersion, signerName: record.signerName, signerPosition: record.signerPosition },
    ip: record.ipAddress,
    userAgent: record.userAgent,
  });

  revalidatePath("/company/avv");
  return { ok: true };
}
