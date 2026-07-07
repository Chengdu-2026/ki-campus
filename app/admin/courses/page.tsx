import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Kurse" };

export default async function AdminCoursesPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const courses = await prisma.course.findMany({
    include: { translations: true, _count: { select: { modules: true, questions: true, certificates: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.coursesNav")}</h1>
      <Table>
        <THead>
          <Tr>
            <Th>{t("common.name")}</Th>
            <Th>Version</Th>
            <Th>{t("admin.modules")}</Th>
            <Th>{t("admin.questions")}</Th>
            <Th>{t("admin.statCertificates")}</Th>
            <Th>{t("common.status")}</Th>
            <Th>{t("common.actions")}</Th>
          </Tr>
        </THead>
        <TBody>
          {courses.map((c) => (
            <Tr key={c.id}>
              <Td className="font-medium">{pickTranslation(c.translations, user.locale)?.title ?? c.slug}</Td>
              <Td>v{c.version}</Td>
              <Td>{c._count.modules}</Td>
              <Td>{c._count.questions}</Td>
              <Td>{c._count.certificates}</Td>
              <Td>
                <Badge variant={c.publishedAt && !c.archivedAt ? "success" : "neutral"}>
                  {c.archivedAt ? "Archiviert" : c.publishedAt ? `Veröffentlicht ${formatDate(c.publishedAt)}` : "Entwurf"}
                </Badge>
              </Td>
              <Td>
                <Link href="/admin/exams" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                  {t("admin.examSettings")}
                </Link>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
