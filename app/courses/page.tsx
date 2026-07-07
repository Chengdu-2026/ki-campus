import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation, getCourseProgress } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShieldCheck, Award } from "lucide-react";

export const metadata = { title: "Kurse" }; // Kursübersicht: beide Kurse mit Empfehlung

/** Empfehlungstexte je Kurs-Slug (i18n-Keys). */
const RECOMMENDATION_KEY: Record<string, string> = {
  "ki-kompetenz-basic": "courses.recommendationBasic",
  "ki-verantwortliche-beauftragte": "courses.recommendationOfficer",
};

export default async function CoursesPage() {
  const user = await requireUser();
  const t = getT(user.locale);

  const courses = await prisma.course.findMany({
    where: { archivedAt: null, publishedAt: { not: null } },
    include: {
      translations: true,
      modules: { select: { id: true, lessons: { select: { id: true } } } },
    },
    orderBy: { createdAt: "asc" },
  });

  const rows = await Promise.all(
    courses.map(async (course) => {
      const [progress, certificate] = await Promise.all([
        getCourseProgress(user.id, course.id),
        prisma.certificate.findFirst({ where: { userId: user.id, courseId: course.id, status: "VALID" }, select: { id: true } }),
      ]);
      return { course, progress, hasCertificate: !!certificate };
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("courses.title")}</h1>
        <p className="mt-1 max-w-3xl text-slate-600 dark:text-slate-300">{t("courses.intro")}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {rows.map(({ course, progress, hasCertificate }, idx) => {
          const tr = pickTranslation(course.translations, user.locale);
          const moduleCount = course.modules.length;
          const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
          const recommendationKey = RECOMMENDATION_KEY[course.slug];
          const Icon = idx === 0 ? BookOpen : ShieldCheck;
          const cta = hasCertificate
            ? t("courses.open")
            : progress.doneLessons > 0
              ? t("courses.continue")
              : t("courses.start");
          return (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-start gap-3 text-lg">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" aria-hidden="true" />
                  <span>{tr?.title}</span>
                </CardTitle>
                <CardDescription>{tr?.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">{tr?.description}</p>

                {recommendationKey && (
                  <div className="rounded-lg bg-brand-50 p-3 text-sm text-brand-900 dark:bg-slate-800 dark:text-slate-200">
                    <p className="mb-1 font-semibold">{t("courses.recommendationTitle")}</p>
                    <p>{t(recommendationKey)}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Badge variant="neutral">{t("courses.modulesLessons", { modules: moduleCount, lessons: lessonCount })}</Badge>
                  {hasCertificate && (
                    <Badge variant="neutral">
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("courses.passed")}
                      </span>
                    </Badge>
                  )}
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{t("courses.yourProgress", { percent: progress.percent })}</span>
                  </div>
                  <Progress value={progress.percent} />
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900"
                  >
                    {cta}
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
