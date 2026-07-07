import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Einstellungen" };

export default async function AdminSettingsPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const profile = await prisma.companyLegalProfile.findFirst();
  const mailCount = await prisma.mailLog.count();

  const config = [
    ["App-Name", appConfig.appName],
    ["Standardsprache", appConfig.defaultLocale],
    ["Aktive Sprachen", appConfig.supportedLocales.join(", ")],
    ["Vorbereitete Sprachen", appConfig.plannedLocales.join(", ")],
    ["Aussteller", appConfig.certificateIssuer],
    ["Inhaltlich verantwortlich", appConfig.contentResponsiblePerson],
    ["Bestehensgrenze (Standard)", `${appConfig.defaultPassPercentage} %`],
    ["Fragen pro Test (Standard)", String(appConfig.defaultExamQuestionCount)],
    ["Max. Versuche (Standard)", String(appConfig.maxExamAttempts)],
    ["Nachschulungs-Schwelle", `< ${appConfig.weakCategoryThreshold} % je Kategorie`],
    ["Mail-Provider", process.env.MAIL_PROVIDER ?? "log"],
    ["Mails im Log", String(mailCount)],
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.settings")}</h1>
      <Hint>Werte werden in config/app.ts bzw. je Kurs unter „Prüfungen" gepflegt — keine Hardcodings in Komponenten.</Hint>
      <Card>
        <CardHeader><CardTitle className="text-base">Konfiguration</CardTitle></CardHeader>
        <CardContent>
          <dl className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {config.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between gap-4 py-2">
                <dt className="text-slate-500 dark:text-slate-400">{key}</dt>
                <dd className="text-right font-medium text-slate-800 dark:text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rechtsprofil (Aussteller)</CardTitle>
          <CardDescription>
            Quelle: {profile?.imprintSourceUrl ?? "—"} {profile?.lastCheckedAt ? `· geprüft ${formatDate(profile.lastCheckedAt)}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-slate-700 dark:text-slate-300">
          <p className="font-medium text-slate-900 dark:text-slate-100">{profile?.legalName} {profile?.chineseName ? `· ${profile.chineseName}` : ""}</p>
          <p className="mt-1 whitespace-pre-line">{profile?.address}</p>
          <p className="mt-1">{profile?.email} · {profile?.website}</p>
        </CardContent>
      </Card>
    </div>
  );
}
