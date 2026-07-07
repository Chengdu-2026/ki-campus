import Link from "next/link";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { optionalImage } from "@/lib/assets";
import { CheckCircle2, Mail, Phone, User, Building2, Compass } from "lucide-react";

export const metadata = {
  title: "Über uns — wer hinter dem KI-Kompetenz Campus steht",
  description:
    "Entwickelt in Oberösterreich, transparent betrieben: Sascha Morocutti und der KI-Kompetenz Campus — warum es die Plattform gibt und woran Sie uns messen können.",
};

export default function UeberUnsPage() {
  const t = getT();
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const portrait = optionalImage("images/sascha.jpg");

  // AboutPage/Person-Schema: Entity-Auflösung für Suchmaschinen und KI-Systeme
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("about.title"),
    url: `${appUrl}/ueber-uns`,
    mainEntity: {
      "@type": "Organization",
      name: appConfig.appName,
      legalName: appConfig.legalCompanyName,
      url: appUrl,
      email: appConfig.contactEmail,
      founder: {
        "@type": "Person",
        name: appConfig.contentResponsiblePerson,
        address: { "@type": "PostalAddress", addressLocality: "Pram", addressRegion: "Oberösterreich", addressCountry: "AT" },
      },
    },
  };

  const principles = [
    t("about.principle1"),
    t("about.principle2"),
    t("about.principle3"),
    t("about.principle4"),
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-12 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-center text-3xl font-bold text-brand-900 dark:text-white">{t("about.title")}</h1>

      <section className="flex flex-col items-start gap-6 sm:flex-row">
        {portrait ? (
          <img
            src={portrait}
            alt={t("about.imageAlt")}
            className="h-40 w-40 shrink-0 rounded-2xl border border-slate-200 object-cover dark:border-slate-700"
          />
        ) : (
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-brand-100 dark:bg-slate-800">
            <User className="h-16 w-16 text-brand-700 dark:text-slate-400" aria-hidden="true" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("about.personTitle")}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{t("about.personText")}</p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Compass className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("about.whyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("about.whyText")}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900 dark:text-white">
          <Building2 className="h-6 w-6 text-accent-500" aria-hidden="true" />
          {t("about.companyTitle")}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {t("about.companyText")}{" "}
          <Link href="/impressum" className="text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">Impressum</Link>
          {" · "}
          <Link href="/ki-transparenz" className="text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">KI-Transparenz</Link>
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("about.principlesTitle")}</h2>
        <ul className="mt-4 space-y-3">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("about.contactTitle")}</h2>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-accent-500" aria-hidden="true" />{appConfig.contactEmail}</span>
          <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-accent-500" aria-hidden="true" />{appConfig.contactPhone}</span>
        </div>
      </section>
    </div>
  );
}
