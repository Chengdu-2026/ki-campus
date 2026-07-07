import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { nextCertificateNumber, newVerifyCode } from "@/lib/certificate/number";

/**
 * Stellt nach bestandenem Test automatisch ein Zertifikat aus.
 * Idempotent: existiert für den Versuch bereits eines, wird es zurückgegeben.
 * WICHTIG: Wird NUR bei passed=true aufgerufen — zusätzlich hier hart abgesichert.
 */
export async function issueCertificateForAttempt(attemptId: string) {
  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { user: { include: { company: true } }, course: { include: { modules: { include: { translations: true }, orderBy: { order: "asc" } } } } },
  });
  if (!attempt) throw new Error("Versuch nicht gefunden.");
  if (attempt.status !== "SUBMITTED" || attempt.passed !== true) {
    throw new Error("Kein Zertifikat ohne bestandenen Test.");
  }
  if (!attempt.user.companyId) throw new Error("Teilnehmer ohne Unternehmen.");

  const existing = await prisma.certificate.findUnique({ where: { attemptId } });
  if (existing) return existing;

  const locale = attempt.locale || appConfig.defaultLocale;
  const moduleTitles = attempt.course.modules.map(
    (m) => m.translations.find((tr) => tr.locale === locale)?.title
      ?? m.translations.find((tr) => tr.locale === appConfig.fallbackLocale)?.title
      ?? m.slug
  );

  const validUntil = attempt.course.certificateValidityMonths
    ? new Date(Date.now() + attempt.course.certificateValidityMonths * 30.44 * 24 * 3600 * 1000)
    : null;

  const certificate = await prisma.certificate.create({
    data: {
      certificateNumber: await nextCertificateNumber(),
      verifyCode: newVerifyCode(),
      userId: attempt.userId,
      companyId: attempt.user.companyId,
      courseId: attempt.courseId,
      courseVersion: attempt.courseVersion,
      locale,
      attemptId: attempt.id,
      scorePercent: attempt.scorePercent ?? 0,
      validUntil,
      issuedContentSnapshot: JSON.stringify({ moduleTitles, courseVersion: attempt.courseVersion }),
    },
  });

  await audit({
    action: "CERTIFICATE_ISSUED",
    userId: attempt.userId,
    companyId: attempt.user.companyId,
    entityType: "Certificate",
    entityId: certificate.id,
    metadata: { certificateNumber: certificate.certificateNumber, scorePercent: certificate.scorePercent },
  });

  await sendMail("certificate_ready", attempt.user.email, {
    firstName: attempt.user.firstName,
    link: `${process.env.APP_URL ?? ""}/certificates`,
  }, locale);

  return certificate;
}

export type CertificateStatus = "VALID" | "REVOKED" | "EXPIRED";

export function effectiveStatus(cert: { status: string; validUntil: Date | null }): CertificateStatus {
  if (cert.status === "REVOKED") return "REVOKED";
  if (cert.validUntil && cert.validUntil < new Date()) return "EXPIRED";
  return "VALID";
}
