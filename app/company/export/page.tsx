import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";
import { FileSpreadsheet } from "lucide-react";

export const metadata = { title: "Export" };

export default async function ExportPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("company.exportTitle")}</h1>
      <Hint>{t("hints.adminExport")}</Hint>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileSpreadsheet className="h-5 w-5 text-accent-500" aria-hidden="true" />
            {t("company.exportCsv")}
          </CardTitle>
          <CardDescription>
            {["Name", "E-Mail", t("common.company"), "Kurs", t("company.courseProgress"), "Testdatum", "Ergebnis", t("certificate.number"), "Zertifikatslink"].join(" · ")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="/api/company/export"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900"
          >
            {t("company.exportCsv")}
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
