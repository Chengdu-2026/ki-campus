import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { glossaryForHeadings } from "@/lib/glossary";
import { ReadAloud } from "@/components/read-aloud";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Sparkles, BadgeCheck, Layers, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "ChatGPT-Schulung für Mitarbeiter: Richtig Prompten im Arbeitsalltag",
  description:
    "Praxiskurs „Richtig Prompten“ für Teams: bessere Ergebnisse mit ChatGPT, Copilot & Co., sicherer Umgang mit Daten, Abschlusstest und verifizierbarer Nachweis — alle Kursinhalte vor dem Kauf öffentlich einsehbar.",
};

export const dynamic = "force-dynamic";

export default async function ChatgptSchulungPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  // Kursdaten dynamisch aus der DB (KONSISTENZ-PFLICHT: keine hartcodierten Zahlen)
  const course = await prisma.course.findFirst({
    where: { slug: "richtig-prompten", archivedAt: null, publishedAt: { not: null } },
    include: {
      translations: true,
      modules: { orderBy: { order: "asc" }, include: { translations: true } },
    },
  });
  const courseTr = course ? pickTranslation(course.translations, appConfig.defaultLocale) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("chatgptLp.title"),
    description: t("chatgptLp.intro"),
    inLanguage: "de",
    url: `${appUrl}/chatgpt-schulung-mitarbeiter`,
    publisher: { "@type": "Organization", name: appConfig.appName, url: appUrl },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: appConfig.appName, item: appUrl },
      { "@type": "ListItem", position: 2, name: t("chatgptLp.title"), item: `${appUrl}/chatgpt-schulung-mitarbeiter` },
    ],
  };

  const headings = [t("chatgptLp.title"), t("chatgptLp.problemTitle"), t("chatgptLp.courseTitle"), t("chatgptLp.examTitle")];
  const glossary = glossaryForHeadings(headings);

  const readAloudText = [
    t("chatgptLp.title"), t("chatgptLp.intro"),
    t("chatgptLp.problemTitle"), t("chatgptLp.problem1"), t("chatgptLp.problem2"),
    t("chatgptLp.courseTitle"), t("chatgptLp.courseText"),
    t("chatgptLp.examTitle"), t("chatgptLp.examText"),
    t("chatgptLp.flatrateTitle"), t("chatgptLp.flatrateText"),
  ].join(". ");

  return (
    <article className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("chatgptLp.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("chatgptLp.intro")}</p>
        <div className="mt-4 flex justify-center">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </header>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <AlertTriangle className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("chatgptLp.problemTitle")}
        </h2>
        <div className="mt-4 space-y-3">
          <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {t("chatgptLp.problem1")}
          </p>
          <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {t("chatgptLp.problem2")}
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Sparkles className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("chatgptLp.courseTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("chatgptLp.courseText")}</p>
        {course && course.modules.length > 0 && (
          <ol className="mt-4 space-y-2">
            {course.modules.map((mod) => {
              const tr = pickTranslation(mod.translations, appConfig.defaultLocale);
              return (
                <li key={mod.id}>
                  <Link
                    href={`/schulung/${mod.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                  >
                    <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                      {mod.order}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{tr?.title ?? mod.slug}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
        {courseTr && (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            <Badge variant="neutral">{t("home.moduleCount", { modules: course!.modules.length })}</Badge>
          </p>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BadgeCheck className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("chatgptLp.examTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("chatgptLp.examText")}</p>
        <Link href="/musterzertifikat" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("chatgptLp.ctaMuster")} →
        </Link>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Layers className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("chatgptLp.flatrateTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("chatgptLp.flatrateText")}</p>
        <Link href="/pricing" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("nav.pricing")} →
        </Link>
      </section>

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

      <section className="flex items-start gap-3 rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("chatgptLp.brandNote")}</p>
      </section>

      <section className="text-center">
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400">
            {t("chatgptLp.ctaPrimary")}
          </Link>
          <Link href="/schulung" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-8 text-base font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("chatgptLp.ctaSecondary")}
          </Link>
        </div>
      </section>
    </article>
  );
}
