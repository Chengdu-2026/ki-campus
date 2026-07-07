import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { toggleQuestionActive } from "@/app/actions/admin-actions";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Fragen" };

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);

  const questions = await prisma.question.findMany({
    where: category ? { category } : undefined,
    include: { translations: true },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  });
  const categories = await prisma.question.groupBy({ by: ["category"], _count: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">
          {t("admin.questions")} ({questions.length})
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/questions" className={`rounded-full px-3 py-1.5 text-xs font-medium ${!category ? "bg-brand-700 text-white dark:bg-accent-500 dark:text-brand-900" : "border border-slate-300 dark:border-slate-600"}`}>
          {t("common.all")}
        </Link>
        {categories.map((c) => (
          <Link key={c.category} href={`/admin/questions?category=${c.category}`} className={`rounded-full px-3 py-1.5 text-xs font-medium ${category === c.category ? "bg-brand-700 text-white dark:bg-accent-500 dark:text-brand-900" : "border border-slate-300 dark:border-slate-600"}`}>
            {t(`categories.${c.category}`)} ({c._count})
          </Link>
        ))}
      </div>

      <Table>
        <THead>
          <Tr>
            <Th className="max-w-md">Frage</Th>
            <Th>{t("admin.category")}</Th>
            <Th>{t("admin.difficulty")}</Th>
            <Th>{t("admin.practiceCase")}</Th>
            <Th>{t("common.status")}</Th>
            <Th>{t("common.actions")}</Th>
          </Tr>
        </THead>
        <TBody>
          {questions.map((q) => (
            <Tr key={q.id}>
              <Td className="max-w-md">{pickTranslation(q.translations, "de")?.text}</Td>
              <Td><Badge variant="neutral">{t(`categories.${q.category}`)}</Badge></Td>
              <Td>{t(`difficulty.${q.difficulty}`)}</Td>
              <Td>{q.practiceCase ? t("common.yes") : t("common.no")}</Td>
              <Td>
                <form action={toggleQuestionActive.bind(null, q.id)}>
                  <button type="submit" title={q.active ? t("admin.questionActive") : t("admin.questionInactive")}>
                    <Badge variant={q.active ? "success" : "neutral"}>
                      {q.active ? t("admin.questionActive") : t("admin.questionInactive")}
                    </Badge>
                  </button>
                </form>
              </Td>
              <Td>
                <Link href={`/admin/questions/${q.id}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                  {t("admin.editQuestion")}
                </Link>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
