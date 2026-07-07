import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { CapaList } from "@/components/qm/qm-views";
export const metadata = { title: "Maßnahmen (global)" };
export default async function Page() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  return (<div className="space-y-6"><h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.correctiveAction.listTitle")} — global</h1><CapaList companyId={null} /></div>);
}
