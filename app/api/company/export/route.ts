import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { getCompanyProgress } from "@/lib/company-data";
import { getDefaultCourse, pickTranslation } from "@/lib/content";
import { formatDate } from "@/lib/utils";

function csvEscape(value: string): string {
  if (/[";\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** CSV-Export: Nachweisliste für Personalakte / Compliance. */
export async function GET() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !["COMPANY_ADMIN", "SUPERADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });
  }
  if (!user.companyId) return NextResponse.json({ error: "Kein Unternehmen." }, { status: 400 });

  const [company, course, members] = await Promise.all([
    prisma.company.findUnique({ where: { id: user.companyId } }),
    getDefaultCourse(),
    getCompanyProgress(user.companyId),
  ]);
  const courseTitle = course ? pickTranslation(course.translations, user.locale)?.title ?? course.slug : "";
  const appUrl = process.env.APP_URL ?? "";

  const certificates = await prisma.certificate.findMany({
    where: { companyId: user.companyId },
    select: { userId: true, verifyCode: true, certificateNumber: true },
  });
  const certByUser = new Map(certificates.map((c) => [c.userId, c]));

  const header = ["Name", "Geburtsdatum", "E-Mail", "Unternehmen", "Kurs", "Fortschritt (%)", "Testdatum", "Ergebnis (%)", "Bestanden", "Zertifikatsnummer", "Zertifikatslink"];
  const rows = members.map((m) => {
    const cert = certByUser.get(m.userId);
    return [
      `${m.firstName} ${m.lastName}`,
      m.birthDate ? formatDate(m.birthDate) : "",
      m.email,
      company?.name ?? "",
      courseTitle,
      String(m.progressPercent),
      m.lastExamAt ? formatDate(m.lastExamAt) : "",
      m.bestPercent !== null ? String(m.bestPercent) : "",
      m.passed ? "ja" : "nein",
      cert?.certificateNumber ?? "",
      cert ? `${appUrl}/verify/${cert.verifyCode}` : "",
    ].map(csvEscape).join(";");
  });

  await audit({
    action: "REPORT_EXPORTED",
    userId: user.id,
    companyId: user.companyId,
    entityType: "Company",
    metadata: { rows: rows.length },
  });

  const bom = "﻿"; // Excel-kompatibel
  const csv = bom + header.join(";") + "\n" + rows.join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="schulungsnachweis-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
