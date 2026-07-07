import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { FeedbackList } from "@/components/qm/qm-views";

export const metadata = { title: "Feedback" };
export default async function Page() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN", "TRAINER");
  const t = getT(user.locale);
  return (<div className="space-y-6"><h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.dashboard.feedbackCount")}</h1><FeedbackList companyId={user.companyId} /></div>);
}
