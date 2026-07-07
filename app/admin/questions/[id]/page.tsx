import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { updateQuestion } from "@/app/actions/admin-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Frage bearbeiten" };

export default async function AdminQuestionEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const question = await prisma.question.findUnique({
    where: { id },
    include: { translations: true, options: { orderBy: { order: "asc" }, include: { translations: true } } },
  });
  if (!question) notFound();
  const tr = pickTranslation(question.translations, "de");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.editQuestion")}</h1>
        <Badge variant="neutral">{t(`categories.${question.category}`)}</Badge>
        <Badge variant="neutral">{t(`difficulty.${question.difficulty}`)}</Badge>
        {question.practiceCase && <Badge variant="accent">{t("admin.practiceCase")}</Badge>}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deutsch (de) — v{question.version}</CardTitle>
          <CardDescription>Korrekte Antworten per Checkbox markieren (1 oder 2).</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={updateQuestion}
            submitLabel={t("common.save")}
            successMessage={t("admin.saveDone")}
            errorMap={buildErrorMap(user.locale)}
          >
            <input type="hidden" name="questionId" value={question.id} />
            <input type="hidden" name="locale" value="de" />
            <div>
              <Label htmlFor="text">Frage</Label>
              <textarea id="text" name="text" defaultValue={tr?.text} rows={3} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
            {question.options.map((option, i) => {
              const oTr = pickTranslation(option.translations, "de");
              return (
                <div key={option.id} className="flex items-start gap-3">
                  <input type="hidden" name="optionId" value={option.id} />
                  <input
                    type="checkbox"
                    name="correctId"
                    value={option.id}
                    defaultChecked={option.correct}
                    aria-label={`Antwort ${String.fromCharCode(65 + i)} ist korrekt`}
                    className="mt-3 h-5 w-5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`opt-${option.id}`}>Antwort {String.fromCharCode(65 + i)}</Label>
                    <Input id={`opt-${option.id}`} name="optionText" defaultValue={oTr?.text} required />
                  </div>
                </div>
              );
            })}
            <div>
              <Label htmlFor="explanation">{t("exam.explanation")}</Label>
              <textarea id="explanation" name="explanation" defaultValue={tr?.explanation} rows={3} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
