import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Versionsregister" };

/** Nachvollziehbarkeit: jede inhaltliche Änderung ab V1.003, neueste oben. */
export default async function VersionsPage() {
  await requireRole("SUPERADMIN");
  const revisions = await prisma.contentRevision.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  const users = await prisma.user.findMany({ select: { id: true, firstName: true, lastName: true } });
  const nameById = new Map(users.map((u) => [u.id, `${u.firstName} ${u.lastName}`]));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">Versionsregister</h1>
      <Hint>Fortlaufende Versionierung aller Inhaltsänderungen ab V1.003 — Grundlage der Nachvollziehbarkeit für QM und Audits.</Hint>
      <Table>
        <THead><Tr><Th>Version</Th><Th>Datum</Th><Th>Typ</Th><Th>Änderung</Th><Th>Geändert von</Th></Tr></THead>
        <TBody>
          {revisions.map((rev) => (
            <Tr key={rev.id}>
              <Td className="font-mono font-medium">{rev.versionLabel}</Td>
              <Td className="whitespace-nowrap text-xs">{rev.createdAt.toLocaleString("de-AT")}</Td>
              <Td><Badge variant="neutral">{rev.entityType}</Badge></Td>
              <Td className="max-w-md">{rev.changeNote}</Td>
              <Td className="text-xs">{rev.changedById ? nameById.get(rev.changedById) ?? rev.changedById : "System"}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
