import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Feedback-Fragebogen" };

export default async function ReviewTemplatesPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const surveys = await prisma.feedbackSurvey.findMany({ include: { questions: { orderBy: { sortOrder: "asc" } } } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">Feedback-Fragebogen</h1>
      <Hint>Fragen werden per Seed gepflegt und versioniert; Änderungen an Formulierungen laufen über das Versionsregister.</Hint>
      {surveys.map((survey) => (
        <div key={survey.id} className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{survey.title} <Badge variant={survey.isActive ? "success" : "neutral"}>{survey.isActive ? t("common.active") : t("common.inactive")}</Badge></h2>
          <Table>
            <THead><Tr><Th>#</Th><Th>Frage</Th><Th>Kategorie</Th><Th>Typ</Th><Th>Pflicht</Th></Tr></THead>
            <TBody>
              {survey.questions.map((q) => (
                <Tr key={q.id}><Td>{q.sortOrder}</Td><Td>{q.questionText}</Td><Td><Badge variant="neutral">{q.category}</Badge></Td><Td className="font-mono text-xs">{q.questionType}</Td><Td>{q.isRequired ? t("common.yes") : t("common.no")}</Td></Tr>
              ))}
            </TBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
