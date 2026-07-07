import Link from "next/link";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { glossaryForHeadings } from "@/lib/glossary";
import { ReadAloud } from "@/components/read-aloud";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown, QrCode, Table2, GitBranch, HelpCircle, Scale, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "KI-Kompetenz-Nachweis: Schulung deines Teams sauber dokumentieren",
  description:
    "So sieht ein brauchbarer KI-Kompetenz-Nachweis nach Art. 4 EU AI Act aus: Zertifikat mit eindeutiger Nummer und QR-Verifikation, CSV-Nachweisliste für HR und versionierter Inhaltsstand — ehrlich erklärt, mit Muster.",
};

export default function KiKompetenzNachweisPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("nachweis.title"),
    description: t("nachweis.intro"),
    inLanguage: "de",
    url: `${appUrl}/ki-kompetenz-nachweis`,
    publisher: { "@type": "Organization", name: appConfig.appName, url: appUrl },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: appConfig.appName, item: appUrl },
      { "@type": "ListItem", position: 2, name: t("nachweis.title"), item: `${appUrl}/ki-kompetenz-nachweis` },
    ],
  };

  const parts = [
    { icon: FileDown, title: t("nachweis.part1Title"), text: t("nachweis.part1Text") },
    { icon: QrCode, title: t("nachweis.part2Title"), text: t("nachweis.part2Text") },
    { icon: Table2, title: t("nachweis.part3Title"), text: t("nachweis.part3Text") },
    { icon: GitBranch, title: t("nachweis.part4Title"), text: t("nachweis.part4Text") },
  ];
  const flow = [t("nachweis.flow1"), t("nachweis.flow2"), t("nachweis.flow3"), t("nachweis.flow4")];

  const headings = [t("nachweis.title"), t("nachweis.whatTitle"), t("nachweis.honestTitle")];
  const glossary = glossaryForHeadings(headings);

  const readAloudText = [
    t("nachweis.title"), t("nachweis.intro"),
    t("nachweis.whatTitle"), t("nachweis.whatText"),
    t("nachweis.honestTitle"), t("nachweis.honestText"),
    t("nachweis.partsTitle"), ...parts.flatMap((p) => [p.title, p.text]),
    t("nachweis.flowTitle"), ...flow,
  ].join(". ");

  return (
    <article className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("nachweis.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("nachweis.intro")}</p>
        <div className="mt-4 flex justify-center">
          <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
        </div>
      </header>

      {/* Zitierfähiger Definitionsblock (GEO) */}
      <section className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 dark:border-brand-700 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <HelpCircle className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("nachweis.whatTitle")}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">{t("nachweis.whatText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Scale className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("nachweis.honestTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("nachweis.honestText")}</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-brand-900 dark:text-white">{t("nachweis.partsTitle")}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {parts.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 h-7 w-7 text-accent-500" aria-hidden="true" />
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("nachweis.flowTitle")}</h2>
        <ol className="mt-4 space-y-3">
          {flow.map((item, i) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <QrCode className="h-8 w-8 shrink-0 text-accent-500" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("nachweis.musterTitle")}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("nachweis.musterText")}</p>
            <Link
              href="/musterzertifikat"
              className="mt-4 inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              {t("nachweis.ctaMuster")} →
            </Link>
          </div>
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
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("nachweis.disclaimer")}</p>
      </section>

      <p className="text-center">
        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400"
        >
          {t("nachweis.ctaPrimary")}
        </Link>
      </p>
    </article>
  );
}
