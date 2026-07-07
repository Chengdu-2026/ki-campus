import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Unternehmen" };

export default async function AdminCompaniesPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const companies = await prisma.company.findMany({
    include: { plan: true, _count: { select: { users: true, certificates: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.companies")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>{t("common.name")}</Th>
            <Th>Plan</Th>
            <Th>{t("admin.statParticipants")}</Th>
            <Th>{t("admin.statCertificates")}</Th>
            <Th>{t("common.status")}</Th>
            <Th>{t("common.date")}</Th>
            <Th>{t("common.actions")}</Th>
          </Tr>
        </THead>
        <TBody>
          {companies.map((c) => (
            <Tr key={c.id}>
              <Td className="font-medium">{c.name}</Td>
              <Td>{c.plan.name}</Td>
              <Td>{c._count.users}</Td>
              <Td>{c._count.certificates}</Td>
              <Td><Badge variant={c.status === "ACTIVE" ? "success" : "neutral"}>{c.status === "ACTIVE" ? t("common.active") : t("common.inactive")}</Badge></Td>
              <Td>{formatDate(c.createdAt)}</Td>
              <Td>
                <Link href={`/admin/companies/${c.id}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                  Verwalten
                </Link>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
