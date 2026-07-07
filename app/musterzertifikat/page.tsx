import Link from "next/link";
import { getT } from "@/lib/i18n";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown, QrCode, Hash, BadgeCheck, GitBranch, Table2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Musterzertifikat: So sieht Ihr KI-Kompetenz-Nachweis aus",
  description:
    "Musterzertifikat des KI-Kompetenz Campus ansehen: A4-PDF mit eindeutiger Nummer, QR-Verifikation, Testergebnis und Inhaltsstand — inklusive Live-Demo der öffentlichen Prüfseite.",
};

/** Öffentliche Demo-Prüfseite: fester Verify-Code aus dem Seed. */
const DEMO_VERIFY_CODE = "demo1234demo1234demo1234demo1234";

export default function MusterzertifikatPage() {
  const t = getT();
  const parts = [
    { icon: Hash, title: t("muster.part1Title"), text: t("muster.part1Text") },
    { icon: QrCode, title: t("muster.part2Title"), text: t("muster.part2Text") },
    { icon: BadgeCheck, title: t("muster.part3Title"), text: t("muster.part3Text") },
    { icon: GitBranch, title: t("muster.part4Title"), text: t("muster.part4Text") },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-12 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("muster.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("muster.intro")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/api/musterzertifikat"
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-700 px-6 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400"
          >
            <FileDown className="h-5 w-5" aria-hidden="true" />
            {t("muster.downloadPdf")}
          </a>
        </div>
      </div>

      <section className="grid gap-5 sm:grid-cols-2">
        {parts.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 h-7 w-7 text-accent-500" aria-hidden="true" />
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <QrCode className="h-8 w-8 shrink-0 text-accent-500" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("muster.verifyDemoTitle")}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("muster.verifyDemoText")}</p>
            <Link
              href={`/verify/${DEMO_VERIFY_CODE}`}
              className="mt-4 inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              {t("muster.verifyDemoCta")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <Table2 className="h-8 w-8 shrink-0 text-accent-500" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("muster.csvTitle")}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("muster.csvText")}</p>
          </div>
        </div>
      </section>

      <section className="flex items-start gap-3 rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        <p className="text-sm text-slate-700 dark:text-slate-300">{t("muster.disclaimer")}</p>
      </section>

      <p className="text-center">
        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400"
        >
          {t("muster.cta")}
        </Link>
      </p>
    </div>
  );
}
