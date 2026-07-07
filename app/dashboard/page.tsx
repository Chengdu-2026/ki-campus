import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/rbac";
import { getDefaultCourse, getDashboardState, getNextOpenLesson, pickTranslation } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";
import { startExam } from "@/app/actions/exam-actions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Übersicht" };

export default async function DashboardPage() {
  const user = await requireUser();
  if (user.role === "SUPERADMIN") redirect("/admin");
  const t = getT(user.locale);

  const course = await getDefaultCourse();
  if (!course) {
    return <p className="text-slate-600 dark:text-slate-300">{t("common.error")}</p>;
  }
  const courseTr = pickTranslation(course.translations, user.locale);
  const state = await getDashboardState(user.id, course.id);
  const nextLessonId = await getNextOpenLesson(user.id, course.id);

  const statusText = {
    NOT_STARTED: t("dashboard.statusNotStarted"),
    IN_PROGRESS: t("dashboard.statusInProgress", { done: state.progress.doneRequired, total: state.progress.totalRequired }),
    READY_FOR_EXAM: t("dashboard.statusReadyForExam"),
    EXAM_FAILED: t("dashboard.statusExamFailed"),
    NO_ATTEMPTS_LEFT: t("dashboard.statusNoAttemptsLeft"),
    PASSED: t("dashboard.statusPassed"),
  }[state.state];

  const startExamWithCourse = startExam.bind(null, course.id);
  const materialDownload = await prisma.materialDownload.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  });
  const feedbackGiven = await prisma.feedbackResponse.findFirst({ where: { userId: user.id, courseId: course.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">
        {t("dashboard.greeting", { name: user.name ?? "" })}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>{courseTr?.title}</CardTitle>
          <CardDescription>{courseTr?.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">{t("dashboard.progressLabel")}</span>
              <span className="text-slate-500 dark:text-slate-400">{state.progress.percent} %</span>
            </div>
            <Progress value={state.progress.percent} label={t("dashboard.progressLabel")} />
          </div>

          <p className="text-slate-700 dark:text-slate-200">{statusText}</p>

          <div className="flex flex-wrap gap-3">
            {state.state === "NOT_STARTED" && nextLessonId && (
              <Link href={`/lessons/${nextLessonId}`} className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("dashboard.ctaStart")}
              </Link>
            )}
            {state.state === "IN_PROGRESS" && nextLessonId && (
              <Link href={`/lessons/${nextLessonId}`} className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("dashboard.ctaContinue")}
              </Link>
            )}
            {(state.state === "READY_FOR_EXAM" || state.state === "EXAM_FAILED") && (
              state.runningAttempt ? (
                <Link href={`/exam/${course.id}`} className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                  {t("exam.resume")}
                </Link>
              ) : (
                <form action={startExamWithCourse}>
                  <button type="submit" className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                    {t("dashboard.ctaExam")}
                  </button>
                </form>
              )
            )}
            {state.state === "EXAM_FAILED" && state.lastFailedAttemptId && (
              <Link href={`/exam/result/${state.lastFailedAttemptId}`} className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                {t("dashboard.ctaRetraining")}
              </Link>
            )}
            {state.state === "PASSED" && (
              <Link href="/certificates" className="inline-flex h-11 items-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("dashboard.ctaCertificate")}
              </Link>
            )}
            <Link href="/courses" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
              {t("nav.courses")}
            </Link>
          </div>

          {state.state !== "PASSED" && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("dashboard.attemptsLeft", { count: Math.max(0, state.maxAttempts - state.attemptsUsed) })}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardDescription>{t("dashboard.modulesDone")}</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold text-brand-900 dark:text-white">{state.progress.doneLessons} / {state.progress.totalLessons}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardDescription>{t("dashboard.examStatus")}</CardDescription></CardHeader>
          <CardContent>
            <Badge variant={state.state === "PASSED" ? "success" : state.state === "EXAM_FAILED" || state.state === "NO_ATTEMPTS_LEFT" ? "danger" : "neutral"}>
              {state.state === "PASSED" ? t("exam.resultPassed") : state.state === "EXAM_FAILED" ? t("exam.resultFailed") : state.state === "NO_ATTEMPTS_LEFT" ? t("company.retrainingNeeded") : t("company.examOpen")}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardDescription>{t("dashboard.certificateStatus")}</CardDescription></CardHeader>
          <CardContent>
            <Badge variant={state.certificateId ? "success" : "neutral"}>
              {state.certificateId ? t("certificate.statusValid") : t("common.none")}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardDescription>{t("qm.material.download")}</CardDescription></CardHeader>
        <CardContent className="space-y-2">
          {materialDownload ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("qm.material.alreadyDownloaded", { date: formatDate(materialDownload.downloadedAt) })}</p>
          ) : (
            <a href={`/api/course-material/${course.id}/pdf`} className="inline-flex h-10 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
              {t("qm.material.download")}
            </a>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("qm.material.onceHint")}</p>
          {state.state === "PASSED" && !feedbackGiven && (
            <Link href={`/feedback/${course.id}`} className="inline-flex h-10 items-center rounded-lg bg-accent-500 px-4 text-sm font-medium text-brand-900 hover:bg-accent-400">
              {t("qm.feedback.title")}
            </Link>
          )}
        </CardContent>
      </Card>

      {!state.progress.readyForExam && <Hint>{t("course.examGateHint")}</Hint>}
    </div>
  );
}
