import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Nutzer" };

export default async function AdminUsersPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const users = await prisma.user.findMany({
    include: { company: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.users")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>{t("common.name")}</Th>
            <Th>{t("common.email")}</Th>
            <Th>{t("common.company")}</Th>
            <Th>{t("common.role")}</Th>
            <Th>{t("common.status")}</Th>
            <Th>{t("common.date")}</Th>
            <Th>{t("common.actions")}</Th>
          </Tr>
        </THead>
        <TBody>
          {users.map((u) => (
            <Tr key={u.id}>
              <Td className="font-medium">{u.firstName} {u.lastName}</Td>
              <Td>{u.email}</Td>
              <Td>{u.company?.name ?? "—"}</Td>
              <Td><Badge variant="neutral">{t(`roles.${u.role}`)}</Badge></Td>
              <Td><Badge variant={u.status === "ACTIVE" ? "success" : "neutral"}>{u.status === "ACTIVE" ? t("common.active") : t("common.inactive")}</Badge></Td>
              <Td>{formatDate(u.createdAt)}</Td>
              <Td>
                <Link href={`/admin/users/${u.id}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                  {t("admin.editAction")}
                </Link>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
