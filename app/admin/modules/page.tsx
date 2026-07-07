import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";

export const metadata = { title: "Module" };

export default async function AdminModulesPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: { translations: true, _count: { select: { lessons: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.modules")}</h1>
      <Table>
        <THead>
          <Tr><Th>#</Th><Th>{t("common.name")}</Th><Th>Slug</Th><Th>{t("admin.lessons")}</Th></Tr>
        </THead>
        <TBody>
          {modules.map((m) => (
            <Tr key={m.id}>
              <Td>{m.order}</Td>
              <Td className="font-medium">{pickTranslation(m.translations, user.locale)?.title}</Td>
              <Td className="font-mono text-xs">{m.slug}</Td>
              <Td>{m._count.lessons}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
