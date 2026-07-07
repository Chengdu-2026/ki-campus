import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { appConfig } from "@/config/app";
import { pickTranslation } from "@/lib/content";
import { generateCertificatePdf, hashPdf } from "@/lib/certificate/pdf";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });

  const certificate = await prisma.certificate.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, companyId: true, birthDate: true } },
      company: { select: { id: true, name: true } },
      course: { include: { translations: true } },
    },
  });
  if (!certificate) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });

  // Zugriff: eigener Nutzer, Admin der eigenen Firma, Trainer der eigenen Firma oder Superadmin
  const u = session.user;
  const sameCompany = u.companyId === certificate.companyId;
  const allowed =
    u.role === "SUPERADMIN" ||
    certificate.userId === u.id ||
    (sameCompany && (u.role === "COMPANY_ADMIN" || u.role === "TRAINER"));
  if (!allowed) return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });

  const snapshot = certificate.issuedContentSnapshot ? JSON.parse(certificate.issuedContentSnapshot) : {};
  const courseTr = pickTranslation(certificate.course.translations, certificate.locale);

  const pdfBytes = await generateCertificatePdf({
    participantName: `${certificate.user.firstName} ${certificate.user.lastName}`,
    birthDate: certificate.user.birthDate,
    companyName: certificate.company.name,
    courseSlug: certificate.course.slug,
    courseTitle: courseTr?.title ?? certificate.course.slug,
    courseSubtitle: courseTr?.subtitle ?? "",
    teachingUnits: certificate.course.teachingUnits,
    issuedAt: certificate.issuedAt,
    validUntil: certificate.validUntil,
    scorePercent: certificate.scorePercent,
    certificateNumber: certificate.certificateNumber,
    verifyUrl: `${process.env.APP_URL ?? ""}/verify/${certificate.verifyCode}`,
    moduleTitles: snapshot.moduleTitles ?? [],
    locale: certificate.locale,
  });

  // Integrität: Hash beim ersten Download persistieren
  const digest = hashPdf(pdfBytes);
  if (!certificate.pdfHash) {
    await prisma.certificate.update({ where: { id }, data: { pdfHash: digest } });
  }

  await audit({
    action: "CERTIFICATE_DOWNLOADED",
    userId: u.id,
    companyId: certificate.companyId,
    entityType: "Certificate",
    entityId: certificate.id,
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${certificate.certificateNumber}.pdf"`,
      "X-Content-Sha256": digest,
    },
  });
}
