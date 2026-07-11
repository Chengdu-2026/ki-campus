import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { pickTranslation } from "@/lib/content";
import { appConfig } from "@/config/app";
import { buildReviewPlan, type ReviewInput } from "@/lib/review-schedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Prüfplan" };

/** Getakteter Review-Workflow: max. N Module/Werktag, Feiertage übersprungen. Reuse: content-audit-Freigaben. */
export default async function ReviewPlanPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);

  const [courses, modules, lessons, items] = await Promise.all([
    prisma.course.findMany({ select: { id: true, slug: true } }),
    prisma.module.findMany({ include: { translations: true }, orderBy: [{ courseId: "asc" }, { order: "asc" }] }),
    prisma.lesson.findMany({ select: { id: true, moduleId: true } }),
    prisma.contentAuditItem.findMany({
      select: { entityId: true, status: true, approvedAt: true, contentHash: true, approvedContentHash: true },
    }),
  ]);

  const courseSlug = new Map(courses.map((c) => [c.id, c.slug]));
  const lessonsByModule = new Map<string, string[]>();
  for (const l of lessons) {
    const arr = lessonsByModule.get(l.moduleId) ?? [];
    arr.push(l.id);
    lessonsByModule.set(l.moduleId, arr);
  }
  const byEntity = new Map<string, typeof items>();
  for (const it of items) {
    const arr = byEntity.get(it.entityId) ?? [];
    arr.push(it);
    byEntity.set(it.entityId, arr);
  }
  const isApproved = (it: (typeof items)[number]) =>
    (it.status === "APPROVED" || it.status === "PUBLISHED") && !!it.approvedAt && it.approvedContentHash === it.contentHash;

  const inputs: ReviewInput[] = modules.map((m) => {
    const lessonIds = lessonsByModule.get(m.id) ?? [];
    const rel = [...(byEntity.get(m.id) ?? []), ...lessonIds.flatMap((lid) => byEntity.get(lid) ?? [])];
    const needsReview = rel.length === 0 || rel.some((it) => !isApproved(it));
    const approvedTimes = rel.filter((it) => it.approvedAt).map((it) => (it.approvedAt as Date).getTime());
    const lastApprovedAt = approvedTimes.length ? new Date(Math.min(...approvedTimes)) : null;
    const title = pickTranslation(m.translations, user.locale)?.title ?? m.slug;
    return { key: m.id, title: `${title} · ${courseSlug.get(m.courseId) ?? ""}`, lastApprovedAt, needsReview };
  });

  const plan = buildReviewPlan(inputs, {
    cycleMonths: appConfig.contentReviewCycleMonths,
    maxPerDay: appConfig.contentReviewMaxPerDay,
  });
  const today = plan.filter((p) => p.state === "today");
  const scheduled = plan.filter((p) => p.state === "scheduled").sort((a, b) => a.scheduledDate!.getTime() - b.scheduledDate!.getTime());
  const current = plan.filter((p) => p.state === "current").sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const auditHref = "/admin/content-audit?filter=live";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.reviewPlan")}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("admin.reviewIntro", { n: appConfig.contentReviewMaxPerDay })}</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">{t("admin.reviewToday")} ({today.length})</CardTitle></CardHeader>
        <CardContent>
          {today.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("admin.reviewNothing")}</p>
          ) : (
            <ul className="space-y-2">
              {today.map((p) => (
                <li key={p.key} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {p.title}
                    {p.overdue && <Badge variant="danger">{t("admin.reviewOverdueTag")}</Badge>}
                  </span>
                  <Link href={auditHref} className="text-sm font-medium text-brand-700 hover:underline dark:text-accent-400">{t("admin.reviewOpen")}</Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {scheduled.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">{t("admin.reviewScheduled")}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {scheduled.map((p) => (
                <li key={p.key} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">
                    {p.title}
                    {p.overdue && <Badge variant="danger">{t("admin.reviewOverdueTag")}</Badge>}
                  </span>
                  <span className="whitespace-nowrap text-slate-500 dark:text-slate-400">{formatDate(p.scheduledDate!)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {current.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">{t("admin.reviewCurrent")} ({current.length})</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {current.map((p) => (
                <li key={p.key} className="flex items-center justify-between gap-3 text-sm">
                  <span>{p.title}</span>
                  <span className="whitespace-nowrap text-slate-500 dark:text-slate-400">{t("admin.reviewNextDue")}: {formatDate(p.dueDate)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
