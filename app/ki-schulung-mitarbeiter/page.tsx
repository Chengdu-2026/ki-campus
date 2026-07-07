import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { glossaryForHeadings } from "@/lib/glossary";
import { ReadAloud } from "@/components/read-aloud";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Rocket, BookOpen, HeartHandshake, Building2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "KI-Schulung für Mitarbeiter: an einem Tag ausgerollt, dauerhaft dokumentiert",
  description:
    "KI-Schulung für dein Team ohne IT-Projekt: per Link einladen, im eigenen Tempo lernen, Abschlusstest, Zertifikat mit QR-Verifikation und CSV-Nachweisliste — als dokumentierte Maßnahme zur KI-Kompetenz nach Art. 4 EU AI Act.",
};

export const dynamic = "force-dynamic";

export default async function KiSchulungMitarbeiterPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  // Kursliste dynamisch aus der DB (KONSISTENZ-PFLICHT: keine hartcodierten Zahlen)
  const courses = await prisma.course.findMany({
    where: { archivedAt: null, publishedAt: { not: null } },
    include: {
      translations: true,
      modules: { select: { id: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const faq = [
    { q: t("mitarbeiterLp.faqQ1"), a: t("mitarbeiterLp.faqA1") },
    { q: t("mitarbeiterLp.faqQ2"), a: t("mitarbeiterLp.faqA2") },
    { q: t("mitarbeiterLp.faqQ3"), a: t("mitarbeiterLp.faqA3") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("mitarbeiterLp.title"),
    description: t("mitarbeiterLp.intro"),
    inLanguage: "de",
    url: `${appUrl}/ki-schulung-mitarbeiter`,
    publisher: { "@type": "Organization", name: appConfig.appName, url: appUrl },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: appConfig.appName, item: appUrl },
      { "@type": "ListItem", position: 2, name: t("mitarbeiterLp.title"), item: `${appUrl}/ki-schulung-mitarbeiter` },
    ],
  };

  const rollout = [
    t("mitarbeiterLp.rollout1"),
    t("mitarbeiterLp.rollout2"),
    t("mitarbeiterLp.rollout3"),
    t("mitarbeiterLp.rollout4"),
  ];

  const headings = [t("mitarbeiterLp.title"), t("mitarbeiterLp.pflichtTitle"), t("mitarbeiterLp.coursesTitle")];
  const glossary = glossaryForHeadings(headings);

  const readAloudText = [
    t("mitarbeiterLp.title"), t("mitarbeiterLp.intro"),
    t("mitarbeiterLp.pflichtTitle"), t("mitarbeiterLp.pflichtText"),
    t("mitarbeiterLp.rolloutTitle"), ...rollout,
    t("mitarbeiterLp.coursesTitle"), t("mitarbeiterLp.coursesText"),
    t("mitarbeiterLp.adaptiveTitle"), t("mitarbeiterLp.adaptiveText"),
    t("mitarbeiterLp.forWhomTitle"), t("mitarbeiterLp.forWhomText"),
  ].join(". ");

  return (
    <article className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("mitarbeiterLp.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("mitarbeiterLp.intro")}</p>
        <div className="mt-4 flex justify-center">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </header>

      <section className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 dark:border-brand-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BadgeCheck className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("mitarbeiterLp.pflichtTitle")}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">{t("mitarbeiterLp.pflichtText")}</p>
        <Link href="/art-4-ai-act-erklaert" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("mitarbeiterLp.ctaArt4")} →
        </Link>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Rocket className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("mitarbeiterLp.rolloutTitle")}
        </h2>
        <ol className="mt-4 space-y-3">
          {rollout.map((item, i) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BookOpen className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("mitarbeiterLp.coursesTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("mitarbeiterLp.coursesText")}</p>
        {courses.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {courses.map((course, i) => {
              const tr = pickTranslation(course.translations, appConfig.defaultLocale);
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <Badge variant="accent" className="mb-1 w-fit">{t("home.courseNumber", { number: i + 1 })}</Badge>
                    <CardTitle className="text-base">{tr?.title ?? course.slug}</CardTitle>
                    <CardDescription>{t("home.moduleCount", { modules: course.modules.length })}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
        <Link href="/schulung" className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("home.viewCurriculum")} →
        </Link>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <HeartHandshake className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("mitarbeiterLp.adaptiveTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("mitarbeiterLp.adaptiveText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Building2 className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("mitarbeiterLp.forWhomTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("mitarbeiterLp.forWhomText")}</p>
        <Link href="/pricing" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("nav.pricing")} →
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-brand-900 dark:text-white">{t("nav.faq")}</h2>
        <dl className="space-y-3">
          {faq.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <dt className="font-semibold text-slate-900 dark:text-slate-100">{q}</dt>
              <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{a}</dd>
            </div>
          ))}
        </dl>
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
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("mitarbeiterLp.disclaimer")}</p>
      </section>

      <section className="text-center">
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400">
            {t("mitarbeiterLp.ctaPrimary")}
          </Link>
          <Link href="/musterzertifikat" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-8 text-base font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("mitarbeiterLp.ctaMuster")}
          </Link>
        </div>
      </section>
    </article>
  );
}
