import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BookOpen, ClipboardCheck, Award, Volume2, ChevronDown } from "lucide-react";
import { ReadAloud } from "@/components/read-aloud";
import { optionalImage } from "@/lib/assets";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Lerninhalte im Detail — alle Kurse mit allen Modulen und Lektionen",
  description:
    "Alle Lerninhalte transparent im Detail: „KI-Kompetenz Basic nach Art. 4 EU AI Act“ (17 Module), der Aufbaukurs „KI-Verantwortliche & KI-Beauftragte“ (10 Module) und der Praxiskurs „Richtig Prompten“ (10 Module) — mit Lernzielen und Dauer je Lektion.",
};

export default async function CurriculumPage() {
  const t = getT();
  const courses = await prisma.course.findMany({
    where: { archivedAt: null, publishedAt: { not: null } },
    include: {
      translations: true,
      exam: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          translations: true,
          lessons: { orderBy: { order: "asc" }, include: { translations: true } },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  if (courses.length === 0) return null;

  // Course-Schema (GEO/SEO): macht die Kurse für Suchmaschinen und
  // KI-Systeme als Entitäten verständlich. Daten kommen live aus der DB.
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const courseJsonLd = courses.map((course) => {
    const tr = course.translations.find((x) => x.locale === "de");
    return {
      "@context": "https://schema.org",
      "@type": "Course",
      name: tr?.title,
      description: tr?.description,
      url: `${appUrl}/schulung`,
      inLanguage: "de",
      teaches: course.modules
        .map((m) => m.translations.find((x) => x.locale === "de")?.title)
        .filter(Boolean),
      provider: {
        "@type": "Organization",
        name: appConfig.appName,
        url: appUrl,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${course.teachingUnits * 45}M`,
      },
    };
  });

  return (
    <div className="space-y-14 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Lerninhalte im Detail</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Kein Katalog-Nebel: Hier sehen Sie vor der Buchung jede Lektion aller Kurse — mit Lernziel und Dauer.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Jede Lektion folgt demselben didaktischen Aufbau: Lernziel, Erklärung in einfacher Sprache,
          Praxisbeispiel aus dem Arbeitsalltag, Warnhinweis, Merksatz und Mini-Check.
        </p>
        <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left dark:border-slate-700 dark:bg-slate-900">
          <Volume2 className="h-6 w-6 shrink-0 text-accent-500" aria-hidden="true" />
          <div>
            <p className="font-medium text-brand-900 dark:text-white">{t("readAloudPromo.title")}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("readAloudPromo.text")}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <ReadAloud
            text={courses
              .map((course, i) => {
                const courseTr = pickTranslation(course.translations, appConfig.defaultLocale);
                return `${t("home.courseNumber", { number: i + 1 })}: ${courseTr?.title}. ${courseTr?.subtitle ?? ""}`;
              })
              .join(". ")}
            label={t("moduleDetail.readAloud")}
          />
        </div>
      </div>

      {courses.map((course, courseIndex) => {
        const courseTr = pickTranslation(course.translations, appConfig.defaultLocale);
        const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
        const totalMinutes = course.modules.reduce(
          (sum, m) => sum + m.lessons.reduce((s, l) => s + l.durationMinutes, 0), 0
        );
        const stats = [
          { icon: BookOpen, value: `${course.modules.length} Module`, sub: `${totalLessons} Lektionen` },
          { icon: Clock, value: `≈ ${Math.round(totalMinutes / 45)} Unterrichtseinheiten`, sub: `${totalMinutes} Minuten Lernzeit` },
          { icon: ClipboardCheck, value: `${course.exam?.questionCount ?? 30} Testfragen`, sub: `Bestehensgrenze ${course.exam?.passPercentage ?? 75} %` },
          { icon: Award, value: "Zertifikat", sub: "mit QR-Verifikation" },
        ];

        // Kurs als Aufklapper: erster Kurs offen, Rest zu — statt einer endlosen Liste
        return (
          <details
            key={course.id}
            open={courseIndex === 0}
            className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-sm font-semibold text-accent-600 dark:text-accent-400">
                  {t("home.courseNumber", { number: courseIndex + 1 })}
                </span>
                <span className="mt-0.5 block text-xl font-bold text-brand-900 dark:text-white">{courseTr?.title}</span>
                <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{courseTr?.subtitle}</span>
              </span>
              <ChevronDown className="h-6 w-6 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>

            <div className="space-y-6 px-6 pb-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ icon: Icon, value, sub }) => (
                  <Card key={course.id + value}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <Icon className="h-7 w-7 shrink-0 text-accent-500" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-brand-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Kompakte Modul-Kacheln mit Foto — schnell scanbar, Klick öffnet das Modul */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {course.modules.map((mod) => {
                  const modTr = pickTranslation(mod.translations, appConfig.defaultLocale);
                  const modMinutes = mod.lessons.reduce((s, l) => s + l.durationMinutes, 0);
                  const modImage = optionalImage(`modules/${mod.slug}.png`);
                  return (
                    <Link
                      key={mod.id}
                      href={`/schulung/${mod.slug}`}
                      className="group/tile flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-accent-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:hover:border-accent-500"
                    >
                      {modImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={modImage}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="h-16 w-24 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                        />
                      ) : (
                        <span aria-hidden="true" className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-lg font-bold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                          {mod.order}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-accent-600 dark:text-accent-400">
                          Modul {mod.order} · {t("course.duration", { minutes: modMinutes })}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium leading-snug text-slate-900 group-hover/tile:text-accent-600 dark:text-slate-100 dark:group-hover/tile:text-accent-400">
                          {modTr?.title}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Volle Lektionsliste bleibt erhalten (Transparenz + SEO) — aber zusammengeklappt */}
              <details className="rounded-xl border border-slate-200 dark:border-slate-700">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-brand-900 hover:text-accent-600 dark:text-slate-100 dark:hover:text-accent-400 [&::-webkit-details-marker]:hidden">
                  Alle Lektionen mit Lernziel &amp; Dauer anzeigen ▾
                </summary>
                <div className="space-y-5 px-4 pb-4">
                  {course.modules.map((mod) => {
                    const modTr = pickTranslation(mod.translations, appConfig.defaultLocale);
                    return (
                      <div key={mod.id}>
                        <p className="font-semibold text-brand-900 dark:text-white">
                          Modul {mod.order}: {modTr?.title}
                        </p>
                        <ul className="mt-1 divide-y divide-slate-100 dark:divide-slate-800">
                          {mod.lessons.map((lesson) => {
                            const lessonTr = pickTranslation(lesson.translations, appConfig.defaultLocale);
                            return (
                              <li key={lesson.id} className="py-2.5">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{lessonTr?.title}</p>
                                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{lessonTr?.goal}</p>
                                  </div>
                                  <span className="shrink-0 text-xs text-slate-400">{t("course.duration", { minutes: lesson.durationMinutes })}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          </details>
        );
      })}

      <div className="mx-auto max-w-2xl rounded-2xl bg-brand-900 p-8 text-center text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
        <p className="text-lg font-semibold">Alle Pakete enthalten alle drei Kurse — vollständig.</p>
        <p className="mt-2 text-sm text-brand-100 dark:text-slate-300">
          Basic, Business und Enterprise unterscheiden sich in Teilnehmerzahl und
          Verwaltungsfunktionen — nicht im Lerninhalt.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/pricing" className="inline-flex h-11 items-center rounded-lg bg-white px-6 text-sm font-medium text-brand-900 hover:bg-brand-50">
            {t("nav.pricing")}
          </Link>
          <Link href="/register" className="inline-flex h-11 items-center rounded-lg border border-white/40 px-6 text-sm font-medium text-white hover:bg-white/10">
            {t("home.ctaStart")}
          </Link>
        </div>
      </div>
    </div>
  );
}
