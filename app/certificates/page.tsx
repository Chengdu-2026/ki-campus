import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { effectiveStatus } from "@/lib/certificate/issue";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";
import { EmptyState } from "@/components/ui/empty-state";
import { Download, QrCode } from "lucide-react";

export const metadata = { title: "Meine Zertifikate" };

export default async function CertificatesPage() {
  const user = await requireUser();
  const t = getT(user.locale);

  const certificates = await prisma.certificate.findMany({
    where: { userId: user.id },
    include: { course: { include: { translations: true } } },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("certificate.myCertificates")}</h1>
      <Hint>{t("hints.certificate")}</Hint>

      {certificates.length === 0 ? (
        <EmptyState title={t("certificate.none")}>
          <Link className="text-brand-700 underline dark:text-accent-400" href="/courses">{t("nav.courses")}</Link>
        </EmptyState>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((cert) => {
            const status = effectiveStatus(cert);
            const title = pickTranslation(cert.course.translations, cert.locale)?.title ?? cert.course.slug;
            return (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="font-mono">{cert.certificateNumber}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Badge variant={status === "VALID" ? "success" : status === "EXPIRED" ? "warning" : "danger"}>
                      {t(`certificate.status${status === "VALID" ? "Valid" : status === "EXPIRED" ? "Expired" : "Revoked"}`)}
                    </Badge>
                    <span>{t("certificate.resultText", { percent: cert.scorePercent })}</span>
                    <span>· {formatDate(cert.issuedAt)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/api/certificates/${cert.id}/pdf`}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-700 px-4 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t("certificate.downloadPdf")}
                    </a>
                    <Link
                      href={`/verify/${cert.verifyCode}`}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                    >
                      <QrCode className="h-4 w-4" aria-hidden="true" />
                      {t("verify.title")}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
