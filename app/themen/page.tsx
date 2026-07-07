import Link from "next/link";
import { getT } from "@/lib/i18n";
import { LEAD_TOPIC_KEYS } from "@/lib/leads";
import { submitInterestLead } from "@/app/actions/lead-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, CheckCircle2, ShieldCheck } from "lucide-react";

/**
 * Öffentliche Themenwunsch-Seite (Leadmaschine): Interessenten sagen uns,
 * welche Kursthemen sie brauchen — anonym oder mit optionalem Kontakt.
 * Ergebnisse fließen in die Kursplanung (Superadmin: /admin/leads).
 */

export const metadata = {
  title: "Themenwunsch: Welche KI-Kurse brauchst du?",
  description:
    "Sag uns, welche KI-Themen dein Unternehmen als Nächstes braucht — von KI-Agenten über Branchen-Spezialkurse bis KI für Führungskräfte. Deine Rückmeldung steuert unsere Kursplanung.",
};

export default async function ThemenPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const t = getT();
  const { ok, error } = await searchParams;

  if (ok === "1") {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent-500" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("themen.thanksTitle")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("themen.thanksText")}</p>
        <div className="mt-6">
          <Link href="/themen" className="text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">
            {t("themen.another")}
          </Link>
        </div>
      </div>
    );
  }

  const errorKey =
    error === "consent" ? "themen.errorConsent" : error === "email" ? "themen.errorEmail" : error ? "themen.errorNoInput" : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-6">
      <div className="text-center">
        <Lightbulb className="mx-auto mb-3 h-10 w-10 text-accent-500" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("themen.title")}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t("themen.intro")}</p>
      </div>

      {errorKey && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {t(errorKey)}
        </p>
      )}

      <form action={submitInterestLead} className="space-y-6">
        {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("themen.topicsLabel")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {LEAD_TOPIC_KEYS.map((key) => (
              <label key={key} className="flex cursor-pointer items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                <input type="checkbox" name="topics" value={key} className="mt-0.5 h-4 w-4 accent-cyan-600" />
                <span>{t(`themen.${key}`)}</span>
              </label>
            ))}
            <div className="pt-2">
              <Label htmlFor="message">{t("themen.messageLabel")}</Label>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={2000}
                placeholder={t("themen.messagePlaceholder")}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-900"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("themen.contactTitle")}</CardTitle>
            <CardDescription>{t("themen.contactHint")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{t("themen.nameLabel")}</Label>
                <Input id="name" name="name" maxLength={200} autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="company">{t("themen.companyLabel")}</Label>
                <Input id="company" name="company" maxLength={200} autoComplete="organization" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">{t("themen.emailLabel")}</Label>
              <Input id="email" name="email" type="email" maxLength={320} autoComplete="email" />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-cyan-600" />
              <span>{t("themen.consentLabel")}</span>
            </label>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          {t("themen.submit")}
        </Button>
      </form>

      <p className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{t("themen.privacyNote")}</span>
      </p>
    </div>
  );
}
