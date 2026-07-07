import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { categoryStats } from "@/lib/exam";
import { getT } from "@/lib/i18n";
import { parseJsonArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";
import { CheckCircle2, XCircle } from "lucide-react";

export const metadata = { title: "Testergebnis" };

export default async function ExamResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const user = await requireUser();
  const t = getT(user.locale);

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: {
        include: {
          question: {
            include: {
              translations: true,
              lesson: { include: { translations: true } },
              options: { orderBy: { order: "asc" }, include: { translations: true } },
            },
          },
        },
      },
      certificate: true,
    },
  });
  if (!attempt) notFound();
  if (attempt.userId !== user.id && user.role !== "SUPERADMIN") redirect("/dashboard");
  if (attempt.status === "IN_PROGRESS") redirect(`/exam/${attempt.courseId}`);

  const exam = await prisma.exam.findUnique({ where: { courseId: attempt.courseId } });
  const used = await prisma.examAttempt.count({
    where: { userId: attempt.userId, courseId: attempt.courseId, status: { in: ["SUBMITTED", "EXPIRED"] } },
  });
  const attemptsLeft = Math.max(0, (exam?.maxAttempts ?? 3) - used);

  const stats = categoryStats(
    attempt.answers.map((a) => ({ category: a.question.category, correct: a.correct === true }))
  );
  const weak = stats.filter((s) => s.weak);
  const wrongAnswers = attempt.answers.filter((a) => a.correct !== true);
  const passed = attempt.passed === true;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {passed ? (
              <CheckCircle2 className="h-7 w-7 text-green-600" aria-hidden="true" />
            ) : (
              <XCircle className="h-7 w-7 text-red-600" aria-hidden="true" />
            )}
            {passed ? t("exam.passed") : t("exam.failed")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-2xl font-bold text-brand-900 dark:text-white">{attempt.scorePoints}/{attempt.answers.length}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("exam.points")}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-2xl font-bold text-brand-900 dark:text-white">{attempt.scorePercent} %</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("exam.percent")}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <Badge variant={passed ? "success" : "danger"} className="text-sm">
                {passed ? t("exam.resultPassed") : t("exam.resultFailed")}
              </Badge>
              {!passed && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("exam.attemptsLeft", { count: attemptsLeft })}</p>
              )}
            </div>
          </div>

          {passed && attempt.certificate && (
            <div className="flex flex-wrap gap-3">
              <a href={`/api/certificates/${attempt.certificate.id}/pdf`} className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("certificate.downloadPdf")}
              </a>
              <Link href="/certificates" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                {t("certificate.myCertificates")}
              </Link>
            </div>
          )}
          {passed && wrongAnswers.length > 0 && <Hint>{t("exam.passedButReview")}</Hint>}
          {!passed && weak.length > 0 && (
            <Hint>
              {t("exam.failedAnalysis", { categories: weak.map((w) => t(`categories.${w.category}`)).join(", ") })}
            </Hint>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">{t("exam.categoryResult")}</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stats.map((s) => (
              <li key={s.category} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2">
                  {t(`categories.${s.category}`)}
                  {s.weak && <Badge variant="warning">{t("exam.retrainingRecommended")}</Badge>}
                </span>
                <span className="font-medium">{s.correct}/{s.total} ({s.percent} %)</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {wrongAnswers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("exam.wrongAnswers")}</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("exam.retrainingHint")}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {wrongAnswers.map((answer) => {
              const q = answer.question;
              const qTr = pickTranslation(q.translations, user.locale);
              const selectedIds = new Set(parseJsonArray(answer.selectedOptionIds));
              const lessonTr = q.lesson ? pickTranslation(q.lesson.translations, user.locale) : null;
              return (
                <div key={answer.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{qTr?.text}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {q.options.map((option) => {
                      const oTr = pickTranslation(option.translations, user.locale);
                      const chosen = selectedIds.has(option.id);
                      return (
                        <li
                          key={option.id}
                          className={
                            "flex items-start gap-2 rounded-lg p-2 " +
                            (option.correct
                              ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                              : chosen
                                ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
                                : "text-slate-600 dark:text-slate-300")
                          }
                        >
                          <span className="shrink-0 font-medium">
                            {option.correct ? `✓ ${t("exam.correctAnswer")}` : chosen ? `✗ ${t("exam.yourAnswer")}` : "·"}
                          </span>
                          <span>{oTr?.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    <strong>{t("exam.explanation")}: </strong>{qTr?.explanation}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {q.lesson && (
                      <Link href={`/lessons/${q.lesson.id}`} className="inline-flex h-9 items-center rounded-lg bg-brand-700 px-3 text-xs font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                        {t("exam.repeatLesson")}{lessonTr ? `: ${lessonTr.title}` : ""}
                      </Link>
                    )}
                    <Link href={`/practice?mode=category&category=${q.category}`} className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-3 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                      {t("exam.practiceSimilar")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {!passed && attemptsLeft > 0 && (
        <div className="text-center">
          <Link href={`/exam/${attempt.courseId}`} className="inline-flex h-12 items-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
            {t("exam.start")}
          </Link>
        </div>
      )}
    </div>
  );
}
