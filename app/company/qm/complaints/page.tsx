import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { IssueList } from "@/components/qm/qm-views";

export const metadata = { title: "QM-Fälle" };
export default async function Page() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  return (<div className="space-y-6"><h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.issue.listTitle")}</h1><IssueList companyId={user.companyId} /></div>);
}
