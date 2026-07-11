import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, BookOpen, QrCode, Volume2, ChevronDown, Clock, TrendingUp, History } from "lucide-react";
import { optionalImage } from "@/lib/assets";
import { ReadAloud } from "@/components/read-aloud";

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
  const heroOwl = optionalImage("brand/mentor/hero-eule.png");
  const dashboardImage = optionalImage("images/dashboard.jpg");
  const mascotMentor = optionalImage("images/maskottchen-mentor.png");
  const mascotFriendly = optionalImage("images/maskottchen-freundlich.png");

  const benefits = [
    { icon: ShieldCheck, title: t("home.benefit1Title"), text: t("home.benefit1Text") },
    { icon: BookOpen, title: t("home.benefit2Title"), text: t("home.benefit2Text") },
    { icon: QrCode, title: t("home.benefit3Title"), text: t("home.benefit3Text") },
  ];

  // Hero-Texte (freigegebenes Wording, Markensystem V2.0 — Produktmarke KI-Kompetenz Campus)
  const heroTitlePlain = "KI-Pflicht erfüllt. Team geschult. Nachweis in der Hand.";
  const heroTextPlain =
    "Online-Schulung mit echten Büro-Fallbeispielen — rechtlich fundiert, verständlich und mit prüffähigem Kompetenznachweis nach Art. 4 EU AI Act.";

  // Vorlese-Text der Startseite (Barrierefreiheit — Start nur per Klick, nie automatisch)
  const readAloudText = [
    heroTitlePlain,
    heroTextPlain,
    t("home.heroDisclaimer"),
    ...benefits.flatMap((b) => [b.title, b.text]),
    t("home.mentorTitle"),
    t("home.mentorText"),
    t("home.alwaysTitle"),
    t("home.alwaysText"),
    t("home.forWhomTitle"),
    t("home.forWhomText"),
  ].join(". ");

  return (
    <div className="space-y-16 py-6">
      {/* Hero im Handbuch-Look: Navy-Verlauf, Hoodie-Eule (Produktmarke), Cyan-Akzente.
          Bewusst in beiden Farbmodi dunkel — der Rest der Seite folgt weiter dem Hell/Dunkel-Umschalter. */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-800 px-6 py-12 text-white shadow-xl ring-1 ring-brand-800 sm:px-10 sm:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge variant="accent" className="mb-4">Art. 4 EU AI Act · AI Literacy</Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              KI-Pflicht erfüllt. Team geschult.{" "}
              <span className="text-accent-400">Nachweis in der Hand.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">{heroTextPlain}</p>
            <p className="mt-3 text-sm font-medium text-slate-400">{t("home.heroDisclaimer")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                <span aria-hidden="true">🕐</span> <b className="text-accent-400">24/7</b> verfügbar
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                <span aria-hidden="true">📈</span> ständig <b className="text-accent-400">wachsende</b> Wissensdatenbank
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-lg bg-accent-500 px-8 text-base font-bold text-brand-900 shadow-lg shadow-accent-500/30 hover:bg-accent-400">
                {t("home.ctaStart")}
              </Link>
              <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-8 text-base font-medium text-white hover:bg-white/10">
                {t("home.ctaLogin")}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-300">
              <span>🇪🇺 Art. 4 EU AI Act</span>
              <span>🇦🇹 Österreich</span>
              <span>🔒 DSGVO</span>
              <span>📄 Audit-tauglich</span>
              <span>🎓 Kompetenznachweis</span>
            </div>
            <div className="mt-6">
              <ReadAloud text={readAloudText} label={t("moduleDetail.readAloud")} />
            </div>
          </div>
          {heroOwl && (
            <div className="relative mx-auto w-56 sm:w-64 md:w-full md:max-w-sm">
              {/* KI-generiertes Maskottchen — Kennzeichnung unter /ki-transparenz */}
              <img
                src={heroOwl}
                alt="KI-Campus Mentor: Eule im KI-Kompetenz-Campus-Hoodie mit EU-Tablet (KI-generiertes Maskottchen)"
                className="w-full drop-shadow-[0_22px_38px_rgba(0,0,0,0.5)]"
              />
            </div>
          )}
        </div>
      </section>

      {/* KI-Campus Mentor — Maskottchen stellt sich vor (Bild optional, Seite läuft auch ohne) */}
      {mascotMentor && (
        <section className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:gap-8 sm:p-8">
            <img
              src={mascotMentor}
              alt="KI-Campus Mentor: freundliche Eule mit Brille und KI-Kompetenz-Campus-Hoodie (KI-generiertes Maskottchen)"
              className="h-40 w-auto shrink-0 drop-shadow-md sm:h-48"
            />
            <div>
              <Badge variant="accent" className="mb-2">{t("home.mentorBadge")}</Badge>
              <h2 className="text-2xl font-semibold text-brand-900 dark:text-white">{t("home.mentorTitle")}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{t("home.mentorText")}</p>
              <ul className="mt-4 space-y-2">
                {[t("home.mentorPoint1"), t("home.mentorPoint2"), t("home.mentorPoint3")].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

      {/* Immer verfügbar / lebende Wissensdatenbank — USP (kein SLA-Versprechen, Selbstlern-Verfügbarkeit) */}
      <section className="mx-auto max-w-4xl rounded-2xl border border-accent-500/40 bg-gradient-to-br from-brand-50 to-white p-6 dark:border-accent-500/30 dark:from-slate-900 dark:to-slate-900">
        <div className="flex flex-col items-center gap-2">
          {mascotFriendly && (
            <img
              src={mascotFriendly}
              alt="KI-Campus Mentor zwinkert (KI-generiertes Maskottchen)"
              className="h-20 w-auto drop-shadow-sm"
            />
          )}
          <h2 className="text-center text-2xl font-semibold text-brand-900 dark:text-white">{t("home.alwaysTitle")}</h2>
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600 dark:text-slate-300">{t("home.alwaysText")}</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { icon: Clock, title: t("home.always1Title"), text: t("home.always1Text") },
            { icon: TrendingUp, title: t("home.always2Title"), text: t("home.always2Text") },
            { icon: History, title: t("home.always3Title"), text: t("home.always3Text") },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
              <Icon className="mb-2 h-7 w-7 text-accent-500" aria-hidden="true" />
              <h3 className="font-semibold text-brand-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem: Schmerz vor Lösung (SEO-/Conversion-Report Kap. 9) */}
      <section className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-semibold text-brand-900 dark:text-white">{t("home.problemTitle")}</h2>
        <ul className="mt-6 space-y-3">
          {[t("home.problem1"), t("home.problem2"), t("home.problem3")].map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rechtskontext: Art. 4 in drei Zeilen, sachlich */}
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("home.legalTitle")}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("home.legalText")}</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          <Link href="/art-4-ai-act-erklaert" className="inline-block text-sm font-medium text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">
            {t("home.legalLinkArt4")} →
          </Link>
          <Link href="/faq" className="inline-block text-sm font-medium text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">
            {t("home.legalLink")} →
          </Link>
        </div>
      </section>

      {/* Muster-Teaser: das Kaufobjekt zeigen */}
      <section className="mx-auto max-w-3xl rounded-2xl border border-accent-500/40 bg-white p-6 text-center dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("home.musterTitle")}</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-300">{t("home.musterText")}</p>
        <Link
          href="/musterzertifikat"
          className="mt-5 inline-flex h-11 items-center rounded-lg border border-slate-300 px-6 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          {t("home.musterCta")} →
        </Link>
      </section>

      <section>
        <h2 className="mb-2 text-center text-2xl font-semibold text-brand-900 dark:text-white">{t("home.modulesTitle")}</h2>
        <p className="mb-8 text-center text-sm text-slate-500 dark:text-slate-400">{t("home.modulesHint")}</p>
        <div className="space-y-5">
          {courses.map((course, courseIndex) => {
            const courseTr = pickTranslation(course.translations, appConfig.defaultLocale);
            return (
              <details key={course.id} className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-sm font-semibold text-accent-600 dark:text-accent-400">
                      {t("home.courseNumber", { number: courseIndex + 1 })}
                    </span>
                    <span className="mt-0.5 block text-lg font-semibold text-brand-900 dark:text-white">{courseTr?.title}</span>
                    <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
                      {t("home.moduleCount", { modules: course.modules.length })}
                    </span>
                  </span>
                  <ChevronDown className="h-6 w-6 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="grid gap-3 p-5 pt-1 sm:grid-cols-2 lg:grid-cols-3">
                  {course.modules.map((mod) => {
                    const tr = pickTranslation(mod.translations, appConfig.defaultLocale);
                    return (
                      <Link
                        key={mod.id}
                        href={`/schulung/${mod.slug}`}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-accent-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:hover:border-accent-500"
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
              </details>
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
