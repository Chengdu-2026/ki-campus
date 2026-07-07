import Link from "next/link";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { glossaryForHeadings } from "@/lib/glossary";
import { ReadAloud } from "@/components/read-aloud";
import { CheckCircle2, HelpCircle, Search, BadgeCheck, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "KI-Führerschein: Gibt es das offiziell? Die ehrliche Einordnung",
  description:
    "Einen staatlich geregelten KI-Führerschein gibt es nicht — der Begriff ist Marketing. Was Art. 4 EU AI Act wirklich verlangt, ob ein KI-Führerschein Pflicht ist und woran du seriöse KI-Schulungen erkennst.",
};

export default function KiFuehrerscheinVergleichPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  const faq = [
    { q: t("fuehrerschein.faqQ1"), a: t("fuehrerschein.faqA1") },
    { q: t("fuehrerschein.faqQ2"), a: t("fuehrerschein.faqA2") },
    { q: t("fuehrerschein.faqQ3"), a: t("fuehrerschein.faqA3") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("fuehrerschein.title"),
    description: t("fuehrerschein.intro"),
    inLanguage: "de",
    url: `${appUrl}/ki-fuehrerschein-vergleich`,
    author: { "@type": "Person", name: appConfig.contentResponsiblePerson, url: `${appUrl}/ueber-uns` },
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
      { "@type": "ListItem", position: 2, name: t("fuehrerschein.title"), item: `${appUrl}/ki-fuehrerschein-vergleich` },
    ],
  };

  const checks = [
    t("fuehrerschein.check1"),
    t("fuehrerschein.check2"),
    t("fuehrerschein.check3"),
    t("fuehrerschein.check4"),
  ];

  const headings = [t("fuehrerschein.title"), t("fuehrerschein.whatTitle"), t("fuehrerschein.pflichtTitle")];
  const glossary = glossaryForHeadings(headings);

  const readAloudText = [
    t("fuehrerschein.title"), t("fuehrerschein.intro"),
    t("fuehrerschein.whatTitle"), t("fuehrerschein.whatText"),
    t("fuehrerschein.pflichtTitle"), t("fuehrerschein.pflichtText"),
    t("fuehrerschein.compareTitle"), t("fuehrerschein.compareText"), ...checks,
    t("fuehrerschein.usTitle"), t("fuehrerschein.usText"),
  ].join(". ");

  return (
    <article className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("fuehrerschein.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("fuehrerschein.intro")}</p>
        <div className="mt-4 flex justify-center">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </header>

      {/* Zitierfähiger Definitionsblock (GEO) */}
      <section className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 dark:border-brand-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <HelpCircle className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("fuehrerschein.whatTitle")}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">{t("fuehrerschein.whatText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BadgeCheck className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("fuehrerschein.pflichtTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("fuehrerschein.pflichtText")}</p>
        <Link href="/art-4-ai-act-erklaert" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("art4.title")} →
        </Link>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Search className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("fuehrerschein.compareTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("fuehrerschein.compareText")}</p>
        <ul className="mt-4 space-y-3">
          {checks.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("fuehrerschein.usTitle")}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("fuehrerschein.usText")}</p>
        <Link href="/schulung" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("fuehrerschein.ctaSecondary")} →
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
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("fuehrerschein.disclaimer")}</p>
      </section>

      <section className="text-center">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("fuehrerschein.ctaTitle")}</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-300">{t("fuehrerschein.ctaText")}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/musterzertifikat" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400">
            {t("fuehrerschein.ctaPrimary")}
          </Link>
          <Link href="/schulung" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-8 text-base font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("fuehrerschein.ctaSecondary")}
          </Link>
        </div>
      </section>
    </article>
  );
}
