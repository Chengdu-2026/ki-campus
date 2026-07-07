import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { createReviewDraft, approveReview, updateReview } from "@/app/actions/qm-actions";
import { ActionForm } from "@/components/forms/action-form";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Management-Review" };

export default async function ReviewsPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  if (!user.companyId) return null;
  const reviews = await prisma.managementReview.findMany({ where: { companyId: user.companyId }, orderBy: { periodStart: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.review.managementReview")}</h1>
        <form action={createReviewDraft}>
          <button type="submit" className="inline-flex h-10 items-center rounded-lg bg-brand-700 px-4 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
            {t("qm.review.createDraft")}
          </button>
        </form>
      </div>
      {reviews.length === 0 ? <EmptyState title={t("qm.review.empty")} /> : reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              {review.title}
              <Badge variant={review.status === "APPROVED" ? "success" : "neutral"}>{review.status}</Badge>
            </CardTitle>
            <CardDescription>{t("qm.review.period")}: {formatDate(review.periodStart)} – {formatDate(review.periodEnd)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              {[["Feedback", review.feedbackSummary], ["QM-Fälle", review.complaintSummary], ["Prüfungen", review.examResultSummary], ["Zertifikate", review.certificateSummary], ["Maßnahmen", review.correctiveActionSummary], ["Risiken", review.riskSummary]].map(([k, v]) => (
                <div key={k as string} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800"><dt className="text-xs text-slate-500">{k}</dt><dd className="mt-1 text-slate-800 dark:text-slate-200">{v ?? "—"}</dd></div>
              ))}
            </dl>
            {review.status !== "APPROVED" && (
              <ActionForm action={updateReview} submitLabel={t("common.save")} successMessage={t("admin.saveDone")} errorMap={buildErrorMap()}>
                <input type="hidden" name="reviewId" value={review.id} />
                <div>
                  <Label>{t("qm.review.decisions")}</Label>
                  <textarea name="decisions" rows={2} defaultValue={review.decisions ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
                </div>
                <div>
                  <Label>{t("qm.review.improvements")}</Label>
                  <textarea name="improvementActions" rows={2} defaultValue={review.improvementActions ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
                </div>
              </ActionForm>
            )}
            {review.status !== "APPROVED" && (
              <form action={approveReview.bind(null, review.id)}>
                <button type="submit" className="inline-flex h-10 items-center rounded-lg border border-green-600 px-4 text-sm font-medium text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950">
                  {t("qm.review.approve")}
                </button>
              </form>
            )}
            {review.status === "APPROVED" && review.approvedAt && (
              <p className="text-xs text-slate-500">Freigegeben am {formatDate(review.approvedAt)}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
