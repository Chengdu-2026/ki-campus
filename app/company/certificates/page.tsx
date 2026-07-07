import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { effectiveStatus } from "@/lib/certificate/issue";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { revokeCertificate } from "@/app/actions/company-actions";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { RevokeButton } from "@/components/forms/revoke-button";

export const metadata = { title: "Zertifikate" };

export default async function CompanyCertificatesPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN", "TRAINER");
  const t = getT(user.locale);
  if (!user.companyId) return null;

  const certificates = await prisma.certificate.findMany({
    where: { companyId: user.companyId },
    include: { user: { select: { firstName: true, lastName: true } } },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("company.certificatesTitle")}</h1>

      {certificates.length === 0 ? (
        <EmptyState title={t("company.certificatesEmpty")} />
      ) : (
        <Table>
          <THead>
            <Tr>
              <Th>{t("common.name")}</Th>
              <Th>{t("certificate.number")}</Th>
              <Th>{t("certificate.issuedAt")}</Th>
              <Th>{t("certificate.result")}</Th>
              <Th>{t("common.status")}</Th>
              <Th>{t("common.actions")}</Th>
            </Tr>
          </THead>
          <TBody>
            {certificates.map((cert) => {
              const status = effectiveStatus(cert);
              return (
                <Tr key={cert.id}>
                  <Td className="font-medium">{cert.user.firstName} {cert.user.lastName}</Td>
                  <Td className="font-mono text-xs">{cert.certificateNumber}</Td>
                  <Td>{formatDate(cert.issuedAt)}</Td>
                  <Td>{cert.scorePercent} %</Td>
                  <Td>
                    <Badge variant={status === "VALID" ? "success" : status === "EXPIRED" ? "warning" : "danger"}>
                      {t(`certificate.status${status === "VALID" ? "Valid" : status === "EXPIRED" ? "Expired" : "Revoked"}`)}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      <a href={`/api/certificates/${cert.id}/pdf`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                        PDF
                      </a>
                      <Link href={`/verify/${cert.verifyCode}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                        {t("verify.title")}
                      </Link>
                      {status === "VALID" && user.role !== "TRAINER" && (
                        <RevokeButton
                          action={revokeCertificate.bind(null, cert.id)}
                          promptText={t("certificate.revokeReason")}
                          label={t("certificate.revoke")}
                        />
                      )}
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      )}
    </div>
  );
}
