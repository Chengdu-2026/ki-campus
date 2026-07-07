import Link from "next/link";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { glossaryForHeadings } from "@/lib/glossary";
import { ReadAloud } from "@/components/read-aloud";
import { Scale, Users, BadgeCheck, AlertTriangle, ListChecks, BookOpen, User, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Art. 4 EU AI Act einfach erklärt: KI-Kompetenzpflicht für Unternehmen",
  description:
    "Was Art. 4 der Verordnung (EU) 2024/1689 wirklich verlangt: Definition der KI-Kompetenz, wer betroffen ist, ob eine Schulung Pflicht ist und wie du die Pflicht pragmatisch und dokumentiert umsetzt — mit Gesetzes-Fundstellen.",
};

export default function Art4ErklaertPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  // Article-Schema mit benanntem Autor (E-E-A-T) + Breadcrumb
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("art4.title"),
    description: t("art4.intro"),
    inLanguage: "de",
    url: `${appUrl}/art-4-ai-act-erklaert`,
    author: {
      "@type": "Person",
      name: appConfig.contentResponsiblePerson,
      url: `${appUrl}/ueber-uns`,
    },
    publisher: { "@type": "Organization", name: appConfig.appName, url: appUrl },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: appConfig.appName, item: appUrl },
      { "@type": "ListItem", position: 2, name: t("art4.title"), item: `${appUrl}/art-4-ai-act-erklaert` },
    ],
  };

  const whoItems = [t("art4.who1"), t("art4.who2"), t("art4.who3")];
  const howItems = [t("art4.how1"), t("art4.how2"), t("art4.how3"), t("art4.how4")];
  const sources = [
    { text: t("art4.source1"), href: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" },
    { text: t("art4.source2"), href: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" },
    { text: t("art4.source3"), href: "https://digital-strategy.ec.europa.eu/de/policies/ai-literacy" },
    { text: t("art4.source4"), href: "https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html" },
  ];

  const headings = [
    t("art4.title"), t("art4.defTitle"), t("art4.whoTitle"), t("art4.dutyTitle"),
    t("art4.scopeTitle"), t("art4.sanctionTitle"), t("art4.howTitle"), t("art4.trainingTitle"),
  ];
  const glossary = glossaryForHeadings(headings);

  const readAloudText = [
    t("art4.title"), t("art4.intro"), t("art4.defTitle"), t("art4.defText"),
    t("art4.whoTitle"), t("art4.whoText"), ...whoItems, t("art4.whoNote"),
    t("art4.dutyTitle"), t("art4.dutyText"), t("art4.scopeTitle"), t("art4.scopeText"),
    t("art4.sanctionTitle"), t("art4.sanctionText"), t("art4.howTitle"), ...howItems,
    t("art4.trainingTitle"), t("art4.trainingText"),
  ].join(". ");

  return (
    <article className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("art4.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("art4.intro")}</p>
        <div className="mt-4 flex justify-center">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </header>

      {/* Zitierfähiger Definitionsblock — wortgleich mit /llms.txt (GEO) */}
      <section className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 dark:border-brand-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Scale className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("art4.defTitle")}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">{t("art4.defText")}</p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t("art4.defSource")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Users className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("art4.whoTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("art4.whoText")}</p>
        <ul className="mt-4 space-y-2">
          {whoItems.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">{t("art4.whoNote")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <BadgeCheck className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("art4.dutyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("art4.dutyText")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("art4.scopeTitle")}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("art4.scopeText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <AlertTriangle className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("art4.sanctionTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("art4.sanctionText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <ListChecks className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("art4.howTitle")}
        </h2>
        <ol className="mt-4 space-y-3">
          {howItems.map((item, i) => (
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
          {t("art4.trainingTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("art4.trainingText")}</p>
        <Link href="/schulung" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
          {t("home.viewCurriculum")} →
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("art4.sourcesTitle")}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {sources.map((s) => (
            <li key={s.text}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline dark:text-accent-400">
                {s.text}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <User className="h-8 w-8 shrink-0 text-accent-500" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("art4.authorTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("art4.authorText")}</p>
          <Link href="/ueber-uns" className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">
            {t("footer.aboutUs")} →
          </Link>
        </div>
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
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("art4.disclaimer")}</p>
      </section>

      <section className="text-center">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("art4.ctaTitle")}</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-300">{t("art4.ctaText")}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400">
            {t("art4.ctaPrimary")}
          </Link>
          <Link href="/musterzertifikat" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-8 text-base font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("art4.ctaMuster")}
          </Link>
        </div>
      </section>
    </article>
  );
}
