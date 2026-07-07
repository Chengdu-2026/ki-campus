import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { QmOverview } from "@/components/qm/qm-views";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Qualitätsmanagement" };

export default async function CompanyQmPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN", "TRAINER");
  const t = getT(user.locale);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.title")}</h1>
      <Hint>{t("qm.subtitle")}</Hint>
      <QmOverview companyId={user.companyId} basePath="/company/qm" />
    </div>
  );
}
