import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation, getCourseProgress } from "@/lib/content";
import { countUsedAttempts, expireStaleAttempts, pickRandom } from "@/lib/exam";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { startExam } from "@/app/actions/exam-actions";
import { ExamRunner, type RunnerQuestion } from "@/components/exam/exam-runner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Abschlusstest" };

export default async function ExamPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const user = await requireUser();
  const t = getT(user.locale);

  const exam = await prisma.exam.findUnique({ where: { courseId }, include: { course: { include: { translations: true } } } });
  if (!exam) notFound();

  await expireStaleAttempts(user.id, courseId);
  const running = await prisma.examAttempt.findFirst({
    where: { userId: user.id, courseId, status: "IN_PROGRESS", expiresAt: { gt: new Date() } },
    include: { answers: true },
  });

  // ---- Laufender Versuch: Fragen laden und Runner anzeigen (ohne correct-Flags!) ----
  if (running) {
    const questionIds: string[] = JSON.parse(running.questionIds);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: { translations: true, options: { orderBy: { order: "asc" }, include: { translations: true } } },
    });
    const byId = new Map(questions.map((q) => [q.id, q]));
    const runnerQuestions: RunnerQuestion[] = questionIds
      .map((qid) => byId.get(qid))
      .filter((q): q is NonNullable<typeof q> => !!q)
      .map((q) => {
        const correctCount = q.options.filter((o) => o.correct).length;
        return {
          id: q.id,
          text: pickTranslation(q.translations, user.locale)?.text ?? "",
          multiple: correctCount > 1,
          // Antwortreihenfolge je Aufruf mischen — verhindert weitergebbare Lösungsmuster (A/B/C/D)
          options: pickRandom(
            q.options.map((o) => ({
              id: o.id,
              text: pickTranslation(o.translations, user.locale)?.text ?? "",
            })),
            q.options.length
          ),
        };
      });
    const savedAnswers: Record<string, string[]> = {};
    for (const a of running.answers) savedAnswers[a.questionId] = JSON.parse(a.selectedOptionIds);

    return (
      <div className="space-y-6">
        <h1 className="text-center text-2xl font-bold text-brand-900 dark:text-white">{t("exam.title")}</h1>
        <ExamRunner
          attemptId={running.id}
          questions={runnerQuestions}
          savedAnswers={savedAnswers}
          labels={{
            question: t("exam.question", { current: "{{current}}", total: "{{total}}" }),
            multipleHint: t("exam.multipleHint"),
            singleHint: t("exam.singleHint"),
            next: t("common.next"),
            back: t("common.back"),
            finish: t("exam.finish"),
            confirmFinish: t("exam.confirmFinish"),
            saving: t("common.loading"),
          }}
        />
      </div>
    );
  }

  // ---- Kein laufender Versuch: Startseite mit Gate-Prüfung ----
  const progress = await getCourseProgress(user.id, courseId);
  const used = await countUsedAttempts(user.id, courseId);
  const left = Math.max(0, exam.maxAttempts - used);
  const courseTr = pickTranslation(exam.course.translations, user.locale);
  const startExamWithCourse = startExam.bind(null, courseId);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("exam.startTitle")}</CardTitle>
          <CardDescription>{courseTr?.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700 dark:text-slate-200">
            {t("exam.startText", { count: exam.questionCount, pass: exam.passPercentage, attempts: exam.maxAttempts })}
          </p>
          <Hint>{t("exam.passHint", { pass: exam.passPercentage })}</Hint>

          {!progress.readyForExam ? (
            <>
              <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                {t("exam.notEligible")}
              </p>
              <Link href="/courses" className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("dashboard.ctaContinue")}
              </Link>
            </>
          ) : left === 0 ? (
            <p role="status" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
              {t("exam.noAttempts", { fee: appConfig.examRetakeFeeEur })}
            </p>
          ) : (
            <div className="space-y-3">
              <form action={startExamWithCourse}>
                <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-700 px-5 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                  {t("exam.start")}
                </button>
              </form>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                {t("exam.attemptsLeft", { count: left })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
