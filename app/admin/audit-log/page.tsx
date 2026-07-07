import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";

export const metadata = { title: "Audit-Log" };

export default async function AdminAuditLogPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const entries = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: { select: { email: true } }, company: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.auditLog")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>Zeitpunkt</Th>
            <Th>Aktion</Th>
            <Th>Nutzer</Th>
            <Th>{t("common.company")}</Th>
            <Th>Objekt</Th>
            <Th>Details</Th>
          </Tr>
        </THead>
        <TBody>
          {entries.map((e) => (
            <Tr key={e.id}>
              <Td className="whitespace-nowrap text-xs">{e.createdAt.toLocaleString("de-AT")}</Td>
              <Td className="font-mono text-xs">{e.action}</Td>
              <Td className="text-xs">{e.user?.email ?? "System"}</Td>
              <Td className="text-xs">{e.company?.name ?? "—"}</Td>
              <Td className="text-xs">{e.entityType ?? "—"}</Td>
              <Td className="max-w-xs truncate font-mono text-xs" title={e.metadata}>{e.metadata}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
