import Link from "next/link";
import { getT } from "@/lib/i18n";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  XCircle,
  Timer,
  BarChart3,
  Target,
  CalendarClock,
  FileCheck2,
  CheckCircle2,
  Info,
} from "lucide-react";

/**
 * Öffentliche Roadmap-Seite für das GEPLANTE Modul „Jährliches
 * KI-Kompetenz-Review & Auffrischung". Wichtig: Das Modul ist NICHT
 * implementiert — der Status kommt aus config/app.ts → featureFlags
 * (planned/beta/live) und darf nie fälschlich „Verfügbar" behaupten.
 * Alle Texte über i18n (feature.review.*), keine Hardcodes.
 */

export const metadata = {
  title: "Jährliches KI-Kompetenz-Review & Auffrischung (geplant)",
  description:
    "Geplante Erweiterung des KI-Kompetenz Campus: jährliches Review, Auswertung falsch und langsam beantworteter Fragen, gezielte Nachschulung und QM-Nachweise — ISO-9001-orientiert, ohne Zertifizierungsversprechen.",
};

const CARD_ICONS = [XCircle, Timer, BarChart3, Target, CalendarClock, FileCheck2];

export default function KiKompetenzReviewPage() {
  const t = getT();
  const flag = appConfig.featureFlags.kiKompetenzReview ?? "planned";
  const statusLabel = t(`feature.review.status.${flag}`);

  const cards = [1, 2, 3, 4, 5, 6].map((i) => ({
    icon: CARD_ICONS[i - 1],
    title: t(`feature.review.cards.c${i}Title`),
    text: t(`feature.review.cards.c${i}Text`),
  }));
  const bullets = [1, 2, 3, 4, 5].map((i) => t(`feature.review.why.bullet${i}`));
  const audiences = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`feature.review.audience.g${i}`));
  const workflowSteps = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`feature.review.workflow.s${i}`));
  const roadmapItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`feature.review.roadmap.r${i}`));

  return (
    <div className="space-y-14 py-6">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="accent" className="mb-4">{statusLabel}</Badge>
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white sm:text-4xl">
          {t("feature.review.hero.headline")}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t("feature.review.hero.subheadline")}
        </p>
        <div className="mt-4 flex items-start justify-center gap-2 text-left">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">{t("feature.review.statusNotice")}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            {t("feature.review.hero.ctaPrimary")}
          </Link>
          <a
            href={`mailto:${appConfig.contactEmail}?subject=${encodeURIComponent("Vormerkung: Jährliches KI-Kompetenz-Review")}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("feature.review.hero.ctaSecondary")}
          </a>
        </div>
      </section>

      {/* Warum jährliche Auffrischung */}
      <section className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-brand-900 dark:text-white">{t("feature.review.why.title")}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("feature.review.why.text")}</p>
        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 Karten */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-900 dark:text-white">
          {t("feature.review.cards.title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, text }) => (
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

      {/* Zielgruppen */}
      <section className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-brand-900 dark:text-white">{t("feature.review.audience.title")}</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {audiences.map((a) => (
            <Badge key={a} variant="neutral">
              {a}
            </Badge>
          ))}
        </div>
        <p className="mt-5 text-slate-600 dark:text-slate-300">{t("feature.review.audience.text")}</p>
      </section>

      {/* QM-Logik ohne falsche Versprechen */}
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-brand-900 dark:text-white">{t("feature.review.qm.title")}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("feature.review.qm.text")}</p>
        <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {t("feature.review.qm.notice")}
        </p>
      </section>

      {/* Geplanter Workflow */}
      <section className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-900 dark:text-white">
          {t("feature.review.workflow.title")}
        </h2>
        <ol className="space-y-3">
          {workflowSteps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white dark:bg-accent-500 dark:text-brand-900">
                {i + 1}
              </span>
              <span className="text-slate-700 dark:text-slate-200">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Roadmap-Status */}
      <section className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-900 dark:text-white">
          {t("feature.review.roadmap.title")}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold text-brand-900 dark:text-white">
                  {t("feature.review.roadmap.colFunction")}
                </th>
                <th className="px-4 py-3 font-semibold text-brand-900 dark:text-white">
                  {t("feature.review.roadmap.colStatus")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
              {roadmapItems.map((item) => (
                <tr key={item}>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{item}</td>
                  <td className="px-4 py-3">
                    <Badge variant="neutral">{t("feature.review.roadmap.statusPlanned")}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rechtlicher Hinweis */}
      <section className="mx-auto max-w-3xl">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">{t("feature.review.legalNotice")}</p>
      </section>
    </div>
  );
}
