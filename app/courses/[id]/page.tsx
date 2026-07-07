import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation, getCourseProgress } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";
import { CheckCircle2, Circle } from "lucide-react";

export const metadata = { title: "Kurs" };

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const t = getT(user.locale);

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      translations: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          translations: true,
          lessons: { orderBy: { order: "asc" }, include: { translations: true } },
        },
      },
    },
  });
  if (!course) notFound();

  const progress = await getCourseProgress(user.id, course.id);
  const doneSet = new Set(
    (await prisma.lessonProgress.findMany({ where: { userId: user.id }, select: { lessonId: true } })).map((p) => p.lessonId)
  );
  const courseTr = pickTranslation(course.translations, user.locale);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{courseTr?.title}</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">{courseTr?.subtitle}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">{t("dashboard.progressLabel")}</span>
          <span className="text-slate-500">{progress.percent} %</span>
        </div>
        <Progress value={progress.percent} />
      </div>

      {!progress.readyForExam && <Hint>{t("course.examGateHint")}</Hint>}

      <div className="space-y-4">
        {course.modules.map((mod) => {
          const modTr = pickTranslation(mod.translations, user.locale);
          return (
            <Card key={mod.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base">
                  <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                    {mod.order}
                  </span>
                  {modTr?.title}
                </CardTitle>
                <CardDescription>{modTr?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mod.lessons.map((lesson) => {
                    const lessonTr = pickTranslation(lesson.translations, user.locale);
                    const done = doneSet.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/lessons/${lesson.id}`}
                          className="flex items-center justify-between gap-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <span className="flex items-center gap-3">
                            {done ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-label={t("course.lessonDone")} />
                            ) : (
                              <Circle className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-600" aria-label={t("course.lessonOpen")} />
                            )}
                            <span className="font-medium text-slate-800 dark:text-slate-200">{lessonTr?.title}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                            {lesson.required && <Badge variant="neutral">{t("course.required")}</Badge>}
                            {t("course.duration", { minutes: lesson.durationMinutes })}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
