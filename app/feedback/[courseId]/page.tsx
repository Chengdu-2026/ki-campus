import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { submitFeedback } from "@/app/actions/qm-actions";
import { ActionForm } from "@/components/forms/action-form";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Feedback" };

export default async function FeedbackPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const user = await requireUser();
  const t = getT(user.locale);

  const survey = await prisma.feedbackSurvey.findFirst({
    where: { isActive: true, locale: user.locale, OR: [{ companyId: null }, { companyId: user.companyId }] },
    include: { questions: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
  }) ?? await prisma.feedbackSurvey.findFirst({
    where: { isActive: true, companyId: null },
    include: { questions: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
  });
  if (!survey) redirect("/dashboard");

  const existing = await prisma.feedbackResponse.findUnique({
    where: { userId_surveyId_courseId: { userId: user.id, surveyId: survey.id, courseId } },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{survey.title}</CardTitle>
          <CardDescription>{survey.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {existing ? (
            <Hint>{t("qm.feedback.alreadySubmitted")}</Hint>
          ) : (
            <ActionForm
              action={submitFeedback}
              submitLabel={t("qm.feedback.submit")}
              successMessage={t("qm.feedback.thanks")}
              successRedirect="/feedback/success"
              errorMap={buildErrorMap(user.locale)}
            >
              <input type="hidden" name="surveyId" value={survey.id} />
              <input type="hidden" name="courseId" value={courseId} />
              {survey.questions.map((q) => (
                <fieldset key={q.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <legend className="px-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {q.questionText}{q.isRequired ? " *" : ""}
                  </legend>
                  {q.helpText && <p className="mb-2 text-xs text-slate-500">{q.helpText}</p>}
                  {(q.questionType === "RATING_1_5" || q.questionType === "RATING_1_10") && (
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={q.questionText}>
                      {Array.from({ length: q.questionType === "RATING_1_5" ? 5 : 11 }, (_, i) => q.questionType === "RATING_1_5" ? i + 1 : i).map((v) => (
                        <label key={v} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300 text-sm font-medium has-[:checked]:border-brand-700 has-[:checked]:bg-brand-700 has-[:checked]:text-white dark:border-slate-600 dark:has-[:checked]:border-accent-400 dark:has-[:checked]:bg-accent-500 dark:has-[:checked]:text-brand-900">
                          <input type="radio" name={`q_${q.id}`} value={v} required={q.isRequired} className="sr-only" />
                          {v}
                        </label>
                      ))}
                    </div>
                  )}
                  {(q.questionType === "YES_NO" || q.questionType === "YES_NO_TEXT") && (
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name={`q_${q.id}`} value="yes" required={q.isRequired} /> {t("qm.feedback.yes")}</label>
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name={`q_${q.id}`} value="no" required={q.isRequired} /> {t("qm.feedback.no")}</label>
                      </div>
                      {q.questionType === "YES_NO_TEXT" && (
                        <textarea name={`q_${q.id}_text`} rows={2} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
                      )}
                    </div>
                  )}
                  {q.questionType === "FREE_TEXT" && (
                    <textarea name={`q_${q.id}`} rows={3} required={q.isRequired} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
                  )}
                </fieldset>
              ))}
            </ActionForm>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
