import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { randomUUID } from "crypto";

/** Fortlaufende, menschenlesbare Zertifikatsnummer — NUR Anzeige, nie für Verify-URLs. */
export async function nextCertificateNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `${appConfig.certificateNumberPrefix}-${year}-`;
  const last = await prisma.certificate.findFirst({
    where: { certificateNumber: { startsWith: prefix } },
    orderBy: { certificateNumber: "desc" },
    select: { certificateNumber: true },
  });
  const lastNum = last ? parseInt(last.certificateNumber.slice(prefix.length), 10) : 0;
  return `${prefix}${String(lastNum + 1).padStart(6, "0")}`;
}

/** Kryptografisch zufälliger Verify-Code — Basis der öffentlichen Prüf-URL und des QR-Codes. */
export function newVerifyCode(): string {
  return randomUUID().replace(/-/g, "");
}
