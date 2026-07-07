import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { updateExamSettings } from "@/app/actions/admin-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Prüfungen" };

export default async function AdminExamsPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const exams = await prisma.exam.findMany({ include: { course: { include: { translations: true } } } });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.exams")}</h1>
      <Hint>{t("exam.passHint", { pass: exams[0]?.passPercentage ?? 75 })}</Hint>
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardHeader>
            <CardTitle className="text-base">{pickTranslation(exam.course.translations, user.locale)?.title}</CardTitle>
            <CardDescription>{t("admin.examSettings")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={updateExamSettings}
              submitLabel={t("common.save")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <input type="hidden" name="courseId" value={exam.courseId} />
              <div>
                <Label htmlFor="passPercentage">{t("admin.passPercentage")}</Label>
                <Input id="passPercentage" name="passPercentage" type="number" min={1} max={100} defaultValue={exam.passPercentage} required />
              </div>
              <div>
                <Label htmlFor="questionCount">{t("admin.questionCount")}</Label>
                <Input id="questionCount" name="questionCount" type="number" min={5} max={200} defaultValue={exam.questionCount} required />
              </div>
              <div>
                <Label htmlFor="maxAttempts">{t("admin.maxAttempts")}</Label>
                <Input id="maxAttempts" name="maxAttempts" type="number" min={1} max={20} defaultValue={exam.maxAttempts} required />
              </div>
              <div>
                <Label htmlFor="timeLimitMinutes">{t("admin.timeLimit")}</Label>
                <Input id="timeLimitMinutes" name="timeLimitMinutes" type="number" min={5} max={480} defaultValue={exam.timeLimitMinutes ?? ""} />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
