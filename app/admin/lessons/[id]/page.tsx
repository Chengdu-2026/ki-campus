import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { updateLesson } from "@/app/actions/admin-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Lektion bearbeiten" };

export default async function AdminLessonEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const lesson = await prisma.lesson.findUnique({ where: { id }, include: { translations: true } });
  if (!lesson) notFound();
  const tr = pickTranslation(lesson.translations, "de");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{tr?.title}</h1>
      <Card>
        <CardHeader><CardTitle className="text-base">Deutsch (de) — v{lesson.version}</CardTitle></CardHeader>
        <CardContent>
          <ActionForm
            action={updateLesson}
            submitLabel={t("common.save")}
            successMessage={t("admin.saveDone")}
            errorMap={buildErrorMap(user.locale)}
          >
            <input type="hidden" name="lessonId" value={lesson.id} />
            <input type="hidden" name="locale" value="de" />
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input id="title" name="title" defaultValue={tr?.title} required />
            </div>
            <div>
              <Label htmlFor="goal">{t("course.goal")}</Label>
              <textarea id="goal" name="goal" defaultValue={tr?.goal} rows={2} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
            <div>
              <Label htmlFor="content">Lerntext</Label>
              <textarea id="content" name="content" defaultValue={tr?.content} rows={10} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
            <div>
              <Label htmlFor="example">{t("course.example")}</Label>
              <textarea id="example" name="example" defaultValue={tr?.example} rows={3} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
            <div>
              <Label htmlFor="risk">{t("course.risk")}</Label>
              <textarea id="risk" name="risk" defaultValue={tr?.risk} rows={2} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800" />
            </div>
            <div>
              <Label htmlFor="memo">{t("course.memo")}</Label>
              <Input id="memo" name="memo" defaultValue={tr?.memo} required />
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
