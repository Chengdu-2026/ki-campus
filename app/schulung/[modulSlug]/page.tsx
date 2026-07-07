import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { optionalImage } from "@/lib/assets";
import { moduleDetailsDe } from "@/lib/module-details.de";
import { glossaryForHeadings } from "@/lib/glossary";
import { BackButton } from "@/components/back-button";
import { ReadAloud } from "@/components/read-aloud";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, CheckCircle2, Target } from "lucide-react";

export const dynamic = "force-dynamic";

async function loadModule(slug: string) {
  return prisma.module.findUnique({
    where: { slug },
    include: {
      translations: true,
      course: { include: { translations: true } },
      lessons: { orderBy: { order: "asc" }, include: { translations: true } },
    },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ modulSlug: string }> }) {
  const { modulSlug } = await params;
  const mod = await loadModule(modulSlug);
  if (!mod) return {};
  const tr = pickTranslation(mod.translations, appConfig.defaultLocale);
  return { title: tr?.title, description: tr?.description ?? undefined };
}

export default async function ModuleDetailPage({ params }: { params: Promise<{ modulSlug: string }> }) {
  const { modulSlug } = await params;
  const t = getT();
  const mod = await loadModule(modulSlug);
  if (!mod || mod.course.archivedAt || !mod.course.publishedAt) notFound();

  const tr = pickTranslation(mod.translations, appConfig.defaultLocale);
  const courseTr = pickTranslation(mod.course.translations, appConfig.defaultLocale);
  const detail = moduleDetailsDe[mod.slug];
  const image = optionalImage(`modules/${mod.slug}.png`);
  const totalMinutes = mod.lessons.reduce((sum, l) => sum + l.durationMinutes, 0);

  const lessonEntries = mod.lessons.map((lesson) => ({
    id: lesson.id,
    minutes: lesson.durationMinutes,
    tr: pickTranslation(lesson.translations, appConfig.defaultLocale),
  }));

  // Glossar: Abkürzungen aus allen Überschriften dieser Seite
  const headings = [
    tr?.title ?? "",
    ...lessonEntries.map((l) => l.tr?.title ?? ""),
  ];
  const glossary = glossaryForHeadings(headings);

  // Vorlese-Text: kompletter Seiteninhalt in Lesereihenfolge
  const readAloudText = [
    tr?.title,
    tr?.description,
    ...(detail?.intro ?? []),
    t("moduleDetail.lessonsTitle"),
    ...lessonEntries.flatMap((l) => [l.tr?.title, l.tr?.goal]),
    detail ? t("moduleDetail.examplesTitle") : null,
    ...(detail?.examples.flatMap((e) => [e.situation, e.point]) ?? []),
    detail ? `${t("moduleDetail.outcomeTitle")}: ${detail.outcome}` : null,
  ]
    .filter(Boolean)
    .join(". ")
    .replace(/\n\n/g, ". ");

  // Breadcrumb-Schema (GEO/SEO): Entitäts-Hierarchie Start → Schulung → Modul
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: appConfig.appName, item: appUrl },
      { "@type": "ListItem", position: 2, name: "Lerninhalte", item: `${appUrl}/schulung` },
      { "@type": "ListItem", position: 3, name: tr?.title ?? mod.slug, item: `${appUrl}/schulung/${mod.slug}` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl space-y-10 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div>
        <BackButton label={t("moduleDetail.back")} fallbackHref="/schulung" />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
            {mod.order}
          </span>
          <Badge variant="accent">{t("moduleDetail.courseLabel", { order: mod.order, course: courseTr?.title ?? "" })}</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-900 dark:text-white">{tr?.title}</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{tr?.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Badge variant="neutral">{t("moduleDetail.lessonsCount", { count: mod.lessons.length })}</Badge>
          <Badge variant="neutral">{t("course.duration", { minutes: totalMinutes })}</Badge>
        </div>
        <div className="mt-4">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </div>

      {image && (
        <figure>
          <img
            src={image}
            alt={t("moduleDetail.imageAlt", { title: tr?.title ?? "" })}
            className="w-full rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700"
          />
          <figcaption className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {t("moduleDetail.imageNote")}
          </figcaption>
        </figure>
      )}

      {detail && (
        <div className="space-y-4 leading-relaxed text-slate-800 dark:text-slate-200">
          {detail.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      <section aria-label={t("moduleDetail.lessonsTitle")}>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-accent-500" aria-hidden="true" />
          {t("moduleDetail.lessonsTitle")}
        </h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t("moduleDetail.lessonsTeaser")}</p>
        <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white px-5 dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
          {lessonEntries.map((lesson) => (
            <li key={lesson.id} className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{lesson.tr?.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{lesson.tr?.goal}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{t("course.duration", { minutes: lesson.minutes })}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {detail && detail.examples.length > 0 && (
        <section aria-label={t("moduleDetail.examplesTitle")}>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
            <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden="true" />
            {t("moduleDetail.examplesTitle")}
          </h2>
          <div className="space-y-4">
            {detail.examples.map((example, i) => (
              <Card key={i}>
                <CardContent className="space-y-2 p-5">
                  <p className="text-slate-800 dark:text-slate-200">{example.situation}</p>
                  <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                    {example.point}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {detail && (
        <blockquote className="flex items-start gap-3 rounded-xl border-l-4 border-accent-500 bg-cyan-50 p-4 font-medium text-brand-900 dark:bg-cyan-950 dark:text-cyan-100">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            {t("moduleDetail.outcomeTitle")}: {detail.outcome}
          </span>
        </blockquote>
      )}

      {glossary.length > 0 && (
        <section aria-label={t("moduleDetail.glossaryTitle")}>
          <h2 className="mb-4 text-xl font-semibold text-brand-900 dark:text-white">{t("moduleDetail.glossaryTitle")}</h2>
          <dl className="space-y-3">
            {glossary.map((entry) => (
              <div key={entry.term} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  {entry.term}
                  {entry.longForm && <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">— {entry.longForm}</span>}
                </dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="rounded-2xl bg-brand-900 p-8 text-center text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
        <h2 className="text-lg font-semibold">{t("moduleDetail.ctaTitle")}</h2>
        <p className="mt-2 text-sm text-brand-100 dark:text-slate-300">{t("moduleDetail.ctaText")}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/register" className="inline-flex h-11 items-center rounded-lg bg-white px-6 text-sm font-medium text-brand-900 hover:bg-brand-50">
            {t("home.ctaStart")}
          </Link>
          <Link href="/schulung" className="inline-flex h-11 items-center rounded-lg border border-white/40 px-6 text-sm font-medium text-white hover:bg-white/10">
            {t("home.viewCurriculum")}
          </Link>
        </div>
      </section>

      <div>
        <BackButton label={t("moduleDetail.back")} fallbackHref="/schulung" />
      </div>
    </article>
  );
}
