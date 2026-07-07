import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { pickTranslation } from "@/lib/content";
import { effectiveStatus } from "@/lib/certificate/issue";
import { audit } from "@/lib/audit";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Zertifikatsprüfung" };

export default async function VerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = getT();

  const certificate = await prisma.certificate.findUnique({
    where: { verifyCode: code },
    include: {
      user: { select: { firstName: true, lastName: true } },
      company: { select: { name: true } },
      course: { include: { translations: true } },
    },
  });

  if (!certificate) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
              {t("verify.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300">{t("verify.notFound")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = effectiveStatus(certificate);
  await audit({
    action: "CERTIFICATE_VERIFIED",
    companyId: certificate.companyId,
    entityType: "Certificate",
    entityId: certificate.id,
    metadata: { status },
  });

  const courseTitle = pickTranslation(certificate.course.translations, certificate.locale)?.title ?? certificate.course.slug;
  const statusUi = {
    VALID: { icon: CheckCircle2, color: "text-green-600", badge: "success" as const, label: t("verify.valid") },
    REVOKED: { icon: XCircle, color: "text-red-600", badge: "danger" as const, label: t("verify.revoked") },
    EXPIRED: { icon: Clock, color: "text-amber-600", badge: "warning" as const, label: t("verify.expired") },
  }[status];
  const StatusIcon = statusUi.icon;

  return (
    <div className="mx-auto max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={`h-6 w-6 ${statusUi.color}`} aria-hidden="true" />
            {statusUi.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("common.name")}</dt>
              <dd className="font-medium text-right">{certificate.user.firstName} {certificate.user.lastName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("common.company")}</dt>
              <dd className="font-medium text-right">{certificate.company.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("verify.course")}</dt>
              <dd className="font-medium text-right">{courseTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("certificate.issuedAt")}</dt>
              <dd className="font-medium">{formatDate(certificate.issuedAt)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("certificate.number")}</dt>
              <dd className="font-mono font-medium">{certificate.certificateNumber}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{t("verify.checkedAt")}</dt>
              <dd className="font-medium">{formatDate(new Date())}</dd>
            </div>
          </dl>
          <Badge variant={statusUi.badge}>{statusUi.label}</Badge>
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">{t("verify.issuer")}</p>
            <p className="mt-1">
              {appConfig.certificateIssuer} ({appConfig.legalCompanyNameZh})<br />
              {appConfig.contactEmail} · {appConfig.websiteUrl}<br />
              Inhaltlich geprüft von: {appConfig.contentResponsiblePerson}
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("verify.authenticityHint")}</p>
          <p className="border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {t("verify.hint")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
