import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "QM-Berichte" };

export default async function ReportsPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  const exports = [
    { type: "feedback", label: "FeedbackResponses.csv" },
    { type: "issues", label: "QualityIssues.csv" },
    { type: "actions", label: "CorrectiveActions.csv" },
    { type: "reviews", label: "ManagementReviews.csv" },
  ];
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.report.title")}</h1>
      <Hint>{t("qm.report.hint")}</Hint>
      <Card>
        <CardHeader><CardTitle className="text-base">CSV</CardTitle><CardDescription>{t("qm.report.exportCsv")}</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {exports.map((e) => (
            <a key={e.type} href={`/api/qm/export/${e.type}`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
              {e.label}
            </a>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">PDF</CardTitle><CardDescription>{t("qm.report.exportPdf")}</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <a href="/api/qm/export/feedback?format=pdf" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Feedback-Report</a>
          <a href="/api/qm/export/actions?format=pdf" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Maßnahmen-Report</a>
          <a href="/api/qm/export/reviews?format=pdf" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Management-Review</a>
        </CardContent>
      </Card>
    </div>
  );
}
