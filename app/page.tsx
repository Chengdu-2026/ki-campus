import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, BookOpen, QrCode, Volume2 } from "lucide-react";
import { optionalImage } from "@/lib/assets";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const t = getT();
  // Nach Kurs getrennt laden — sonst mischen sich die Module beider Kurse
  // mit doppelten Nummern in einem Raster (Bug, siehe AGENT_HANDOVER).
  const courses = await prisma.course.findMany({
    where: { archivedAt: null, publishedAt: { not: null } },
    include: {
      translations: true,
      modules: { orderBy: { order: "asc" }, include: { translations: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  const heroImage = optionalImage("images/hero.jpg");
  const dashboardImage = optionalImage("images/dashboard.jpg");

  const benefits = [
    { icon: ShieldCheck, title: t("home.benefit1Title"), text: t("home.benefit1Text") },
    { icon: BookOpen, title: t("home.benefit2Title"), text: t("home.benefit2Text") },
    { icon: QrCode, title: t("home.benefit3Title"), text: t("home.benefit3Text") },
  ];

  return (
    <div className="space-y-16 py-6">
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="accent" className="mb-4">Art. 4 EU AI Act · AI Literacy</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-brand-900 dark:text-white sm:text-5xl">
          {t("home.heroTitle")}
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">{t("home.heroText")}</p>
        <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">{t("home.heroDisclaimer")}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-700 px-8 text-base font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900 dark:hover:bg-accent-400">
            {t("home.ctaStart")}
          </Link>
          <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-8 text-base font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {t("home.ctaLogin")}
          </Link>
        </div>
      </section>

      {heroImage && (
        <section>
          {/* KI-generiertes Illustrationsbild — Kennzeichnung im Bild und unter /ki-transparenz */}
          <img
            src={heroImage}
            alt="Illustration: Team arbeitet mit einem KI-Schulungs-Dashboard (KI-generiertes Bild)"
            className="w-full rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700"
          />
        </section>
      )}

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 h-8 w-8 text-accent-500" aria-hidden="true" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-2 text-center text-2xl font-semibold text-brand-900 dark:text-white">{t("home.modulesTitle")}</h2>
        <p className="mb-8 text-center text-sm text-slate-500 dark:text-slate-400">{t("home.modulesHint")}</p>
        <div className="space-y-12">
          {courses.map((course) => {
            const courseTr = pickTranslation(course.translations, appConfig.defaultLocale);
            return (
              <div key={course.id}>
                <h3 className="mb-1 text-lg font-semibold text-brand-900 dark:text-white">{courseTr?.title}</h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                  {t("home.moduleCount", { modules: course.modules.length })}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {course.modules.map((mod) => {
                    const tr = pickTranslation(mod.translations, appConfig.defaultLocale);
                    return (
                      <Link
                        key={mod.id}
                        href={`/schulung/${mod.slug}`}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-accent-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-accent-500"
                      >
                        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 dark:bg-brand-800 dark:text-brand-100">
                          {mod.order}
                        </span>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{tr?.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{tr?.description}</p>
                          <p className="mt-2 text-sm font-medium text-accent-600 dark:text-accent-400">{t("moduleDetail.openDetail")} →</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <Volume2 className="h-8 w-8 shrink-0 text-accent-500" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-brand-900 dark:text-white">{t("readAloudPromo.title")}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("readAloudPromo.text")}</p>
        </div>
      </section>

      {dashboardImage && (
        <section className="mx-auto max-w-4xl">
          <img
            src={dashboardImage}
            alt="Illustration: Lernfortschritt und Zertifikate in der Plattform (KI-generiertes Bild)"
            className="w-full rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700"
          />
        </section>
      )}

      <p className="text-center">
        <Link href="/schulung" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-6 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
          {t("home.viewCurriculum")}
        </Link>
      </p>

      <section className="mx-auto max-w-3xl rounded-2xl bg-brand-900 p-8 text-center text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
        <h2 className="text-xl font-semibold">{t("home.forWhomTitle")}</h2>
        <p className="mt-3 text-brand-100 dark:text-slate-300">{t("home.forWhomText")}</p>
      </section>
    </div>
  );
}
