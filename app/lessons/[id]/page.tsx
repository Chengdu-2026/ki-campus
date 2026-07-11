import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { completeLesson } from "@/app/actions/lesson-actions";
import { reportContentIssue } from "@/app/actions/qm-actions";
import { ActionForm } from "@/components/forms/action-form";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hint, WarningHint } from "@/components/ui/hint";
import { ReadAloud } from "@/components/read-aloud";
import { CheckCircle2, Lightbulb, Target } from "lucide-react";

export const metadata = { title: "Lektion" };

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const t = getT(user.locale);

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      translations: true,
      module: { include: { translations: true, course: true } },
      miniChecks: { orderBy: { order: "asc" }, include: { translations: true } },
    },
  });
  if (!lesson) notFound();

  const tr = pickTranslation(lesson.translations, user.locale);
  const modTr = pickTranslation(lesson.module.translations, user.locale);
  const done = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
  });

  // Nächste Lektion ermitteln
  const allLessons = await prisma.lesson.findMany({
    where: { module: { courseId: lesson.module.courseId } },
    orderBy: [{ module: { order: "asc" } }, { order: "asc" }],
    select: { id: true },
  });
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1] ?? null;

  const completeThis = completeLesson.bind(null, lesson.id);

  // Vorlese-Text: didaktische Reihenfolge der Lektion
  const readAloudText = [
    tr?.title,
    `${t("course.goal")}: ${tr?.goal}`,
    tr?.content,
    `${t("course.example")}: ${tr?.example}`,
    `${t("course.risk")}: ${tr?.risk}`,
    `${t("course.memo")}: ${tr?.memo}`,
  ].filter(Boolean).join(". ").replace(/\n\n/g, ". ");

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{modTr?.title}</p>
        <h1 className="mt-1 text-2xl font-bold text-brand-900 dark:text-white">{tr?.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {lesson.required ? <Badge variant="neutral">{t("course.required")}</Badge> : <Badge variant="neutral">{t("course.optional")}</Badge>}
          <span>{t("course.duration", { minutes: lesson.durationMinutes })}</span>
          {done && <Badge variant="success">{t("course.alreadyDone")}</Badge>}
        </div>
        <div className="mt-3">
          <ReadAloud text={readAloudText} label="Lektion vorlesen" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5 text-accent-500" aria-hidden="true" />
            {t("course.goal")}
          </CardTitle>
        </CardHeader>
        <CardContent><p className="text-slate-700 dark:text-slate-200">{tr?.goal}</p></CardContent>
      </Card>

      <div className="space-y-4 leading-relaxed text-slate-800 dark:text-slate-200">
        {tr?.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden="true" />
            {t("course.example")}
          </CardTitle>
        </CardHeader>
        <CardContent><p className="text-slate-700 dark:text-slate-200">{tr?.example}</p></CardContent>
      </Card>

      <WarningHint>
        <strong className="mr-1">{t("course.risk")}:</strong>
        {tr?.risk}
      </WarningHint>

      <blockquote className="rounded-xl border-l-4 border-accent-500 bg-cyan-50 p-4 font-medium text-brand-900 dark:bg-cyan-950 dark:text-cyan-100">
        {t("course.memo")}: „{tr?.memo}"
      </blockquote>

      {lesson.miniChecks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("course.miniCheckTitle")}</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("course.miniCheckHint")}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {lesson.miniChecks.map((check) => {
              const checkTr = pickTranslation(check.translations, user.locale);
              return (
                <details key={check.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-200">
                    {checkTr?.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-medium">{t("course.showAnswer")}: </span>
                    {checkTr?.answer}
                  </p>
                </details>
              );
            })}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
        {!done ? (
          <form action={completeThis}>
            <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {t("course.markDone")}
            </button>
          </form>
        ) : (
          <Badge variant="success">{t("course.alreadyDone")}</Badge>
        )}
        {nextLesson && (
          <Link href={`/lessons/${nextLesson.id}`} className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("course.nextLesson")}
          </Link>
        )}
        <Link href={`/courses/${lesson.module.courseId}`} className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-600 hover:underline dark:text-slate-300">
          {t("course.backToCourse")}
        </Link>
      </div>

      <details className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <summary className="cursor-pointer text-sm font-medium text-slate-600 dark:text-slate-300">{t("course.reportTitle")}</summary>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("course.reportHint")}</p>
        <ActionForm
          action={reportContentIssue}
          submitLabel={t("course.reportSubmit")}
          successMessage={t("course.reportThanks")}
          errorMap={buildErrorMap(user.locale)}
          className="mt-3 space-y-3"
        >
          <input type="hidden" name="lessonId" value={lesson.id} />
          <textarea
            name="message"
            required
            minLength={5}
            rows={3}
            placeholder={t("course.reportPlaceholder")}
            className="w-full rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </ActionForm>
      </details>
    </article>
  );
}
