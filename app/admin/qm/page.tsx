import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { QmOverview } from "@/components/qm/qm-views";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "QM (global)" };

export default async function AdminQmPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.title")} — global</h1>
        <Link href="/admin/qm/thresholds" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">{t("qm.threshold.title")}</Link>
        <Link href="/admin/qm/review-templates" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Fragebogen</Link>
        <Link href="/admin/versions" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Versionsregister</Link>
      </div>
      <Hint>{t("qm.subtitle")}</Hint>
      <QmOverview companyId={null} basePath="/admin/qm" />
    </div>
  );
}
