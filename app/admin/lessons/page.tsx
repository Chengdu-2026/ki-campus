import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Lektionen" };

export default async function AdminLessonsPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const lessons = await prisma.lesson.findMany({
    orderBy: [{ module: { order: "asc" } }, { order: "asc" }],
    include: { translations: true, module: { include: { translations: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.lessons")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>{t("admin.modules")}</Th>
            <Th>{t("common.name")}</Th>
            <Th>Version</Th>
            <Th>{t("course.required")}</Th>
            <Th>{t("common.actions")}</Th>
          </Tr>
        </THead>
        <TBody>
          {lessons.map((l) => (
            <Tr key={l.id}>
              <Td>{pickTranslation(l.module.translations, user.locale)?.title}</Td>
              <Td className="font-medium">{pickTranslation(l.translations, user.locale)?.title}</Td>
              <Td>v{l.version}</Td>
              <Td><Badge variant={l.required ? "accent" : "neutral"}>{l.required ? t("common.yes") : t("common.no")}</Badge></Td>
              <Td>
                <Link href={`/admin/lessons/${l.id}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                  {t("common.actions")}
                </Link>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
