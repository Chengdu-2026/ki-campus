import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { CapaList } from "@/components/qm/qm-views";

export const metadata = { title: "Korrekturmaßnahmen" };
export default async function Page() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  return (<div className="space-y-6"><h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.correctiveAction.listTitle")}</h1><CapaList companyId={user.companyId} /></div>);
}
