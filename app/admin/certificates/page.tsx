import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { effectiveStatus } from "@/lib/certificate/issue";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Zertifikate" };

export default async function AdminCertificatesPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const certificates = await prisma.certificate.findMany({
    include: {
      user: { select: { firstName: true, lastName: true } },
      company: { select: { name: true } },
    },
    orderBy: { issuedAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.certificates")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>{t("certificate.number")}</Th>
            <Th>{t("common.name")}</Th>
            <Th>{t("common.company")}</Th>
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
                <Td className="font-mono text-xs">{cert.certificateNumber}</Td>
                <Td className="font-medium">{cert.user.firstName} {cert.user.lastName}</Td>
                <Td>{cert.company.name}</Td>
                <Td>{formatDate(cert.issuedAt)}</Td>
                <Td>{cert.scorePercent} %</Td>
                <Td>
                  <Badge variant={status === "VALID" ? "success" : status === "EXPIRED" ? "warning" : "danger"}>
                    {t(`certificate.status${status === "VALID" ? "Valid" : status === "EXPIRED" ? "Expired" : "Revoked"}`)}
                  </Badge>
                </Td>
                <Td>
                  <Link href={`/verify/${cert.verifyCode}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                    {t("verify.title")}
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}
