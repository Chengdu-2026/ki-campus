import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { trafficLight } from "@/lib/qm/logic";
import { courseMetrics } from "@/lib/qm/service";
import { updateQualityIssue, updateCorrectiveAction } from "@/app/actions/qm-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";

const sevVariant = (s: string) => (s === "CRITICAL" ? "danger" : s === "HIGH" ? "warning" : "neutral") as "danger" | "warning" | "neutral";
const sentVariant = (s: string) => (s === "CRITICAL" ? "danger" : s === "NEGATIVE" ? "warning" : s === "POSITIVE" ? "success" : "neutral") as "danger" | "warning" | "success" | "neutral";

/** QM-Kennzahlen-Dashboard (companyId=null ⇒ global für Superadmin). */
export async function QmOverview({ companyId, basePath }: { companyId: string | null; basePath: string }) {
  const t = getT();
  const scope = companyId ? { companyId } : {};
  const d30 = new Date(Date.now() - 30 * 86400_000);
  const d90 = new Date(Date.now() - 90 * 86400_000);

  const [feedbacks, negatives, openIssues, criticalIssues, openActions, overdueActions, f30, f90] = await Promise.all([
    prisma.feedbackResponse.findMany({ where: scope, select: { averageScore: true, npsScore: true } }),
    prisma.feedbackResponse.count({ where: { ...scope, sentiment: { in: ["NEGATIVE", "CRITICAL"] } } }),
    prisma.qualityIssue.count({ where: { ...scope, status: { notIn: ["CLOSED", "REJECTED"] } } }),
    prisma.qualityIssue.count({ where: { ...scope, severity: "CRITICAL", status: { notIn: ["CLOSED", "REJECTED"] } } }),
    prisma.correctiveAction.count({ where: { ...scope, status: { notIn: ["CLOSED", "EFFECTIVE"] } } }),
    prisma.correctiveAction.count({ where: { ...scope, status: { notIn: ["CLOSED", "EFFECTIVE"] }, dueDate: { lt: new Date() } } }),
    prisma.feedbackResponse.aggregate({ where: { ...scope, submittedAt: { gte: d30 } }, _avg: { averageScore: true } }),
    prisma.feedbackResponse.aggregate({ where: { ...scope, submittedAt: { gte: d90 } }, _avg: { averageScore: true } }),
  ]);
  const scored = feedbacks.filter((f) => f.averageScore !== null);
  const avg = scored.length ? scored.reduce((s, f) => s + (f.averageScore ?? 0), 0) / scored.length : null;
  const npsScores = feedbacks.map((f) => f.npsScore).filter((n): n is number => n !== null);
  const nps = npsScores.length
    ? Math.round(((npsScores.filter((n) => n >= 9).length - npsScores.filter((n) => n <= 6).length) / npsScores.length) * 100)
    : null;

  const course = await prisma.course.findFirst({ where: { archivedAt: null }, select: { id: true } });
  const metrics = course ? await courseMetrics(companyId, course.id) : null;

  const light = trafficLight({
    averageScore: avg,
    criticalIssues,
    overdueActions,
    failRatePercent: metrics?.failRatePercent ?? 0,
  });
  const lightUi = {
    GREEN: { label: t("qm.dashboard.lightGreen"), cls: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    YELLOW: { label: t("qm.dashboard.lightYellow"), cls: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
    RED: { label: t("qm.dashboard.lightRed"), cls: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  }[light];

  const cards = [
    { label: t("qm.dashboard.avgRating"), value: avg !== null ? avg.toFixed(2) : "—" },
    { label: t("qm.dashboard.nps"), value: nps !== null ? String(nps) : "—" },
    { label: t("qm.dashboard.feedbackCount"), value: String(feedbacks.length) },
    { label: t("qm.dashboard.negativeCount"), value: String(negatives) },
    { label: t("qm.dashboard.openIssues"), value: String(openIssues) },
    { label: t("qm.dashboard.criticalIssues"), value: String(criticalIssues) },
    { label: t("qm.dashboard.openActions"), value: String(openActions) },
    { label: t("qm.dashboard.overdueActions"), value: String(overdueActions) },
    { label: t("qm.dashboard.failRate"), value: metrics ? `${metrics.failRatePercent} %` : "—" },
    { label: t("qm.dashboard.dropoutRate"), value: metrics ? `${metrics.dropoutPercent} %` : "—" },
    { label: t("qm.dashboard.trend30"), value: f30._avg.averageScore ? f30._avg.averageScore.toFixed(2) : "—" },
    { label: t("qm.dashboard.trend90"), value: f90._avg.averageScore ? f90._avg.averageScore.toFixed(2) : "—" },
  ];

  const nav = [
    { href: `${basePath}/feedback`, label: t("qm.dashboard.feedbackCount") },
    { href: `${basePath}/complaints`, label: t("qm.issue.listTitle") },
    { href: `${basePath}/corrective-actions`, label: t("qm.correctiveAction.listTitle") },
    ...(companyId ? [{ href: `${basePath}/reviews`, label: t("qm.review.managementReview") }] : []),
    { href: `${basePath}/reports`, label: t("qm.report.title") },
  ];

  return (
    <div className="space-y-6">
      <div className={`rounded-xl p-4 text-sm font-medium ${lightUi.cls}`} role="status">{lightUi.label}</div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-brand-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="QM-Bereiche">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export async function FeedbackList({ companyId }: { companyId: string | null }) {
  const t = getT();
  const responses = await prisma.feedbackResponse.findMany({
    where: companyId ? { companyId } : {},
    orderBy: { submittedAt: "desc" },
    take: 100,
    include: { answers: { include: { question: true } } },
  });
  if (responses.length === 0) return <EmptyState title={t("qm.issue.empty")} />;
  return (
    <Table>
      <THead><Tr><Th>{t("common.date")}</Th><Th>{t("qm.feedback.averageScore")}</Th><Th>NPS</Th><Th>Sentiment</Th><Th>{t("common.status")}</Th><Th>Freitext</Th></Tr></THead>
      <TBody>
        {responses.map((r) => {
          const text = r.answers.map((a) => a.textValue).filter(Boolean).join(" · ").slice(0, 120);
          return (
            <Tr key={r.id}>
              <Td>{formatDate(r.submittedAt)}</Td>
              <Td>{r.averageScore?.toFixed(2) ?? "—"}</Td>
              <Td>{r.npsScore ?? "—"}</Td>
              <Td><Badge variant={sentVariant(r.sentiment)}>{r.sentiment}</Badge></Td>
              <Td><Badge variant={r.status === "RECEIVED" || r.status === "CLOSED" ? "neutral" : "warning"}>{r.status}</Badge></Td>
              <Td className="max-w-xs text-xs">{text || "—"}</Td>
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
}

export async function IssueList({ companyId }: { companyId: string | null }) {
  const t = getT();
  const issues = await prisma.qualityIssue.findMany({
    where: companyId ? { companyId } : {},
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 100,
  });
  if (issues.length === 0) return <EmptyState title={t("qm.issue.empty")} />;
  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id}>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              {issue.title}
              <Badge variant={sevVariant(issue.severity)}>{issue.severity}</Badge>
              <Badge variant="neutral">{issue.status}</Badge>
              <Badge variant="neutral">{issue.category}</Badge>
            </CardTitle>
            <CardDescription>
              {issue.description} · {t("qm.issue.source")}: {issue.source} · {t("qm.issue.dueDate")}: {formatDate(issue.dueDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={updateQualityIssue}
              submitLabel={t("common.save")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap()}
              className="grid gap-3 sm:grid-cols-3"
            >
              <input type="hidden" name="issueId" value={issue.id} />
              <div>
                <Label htmlFor={`st-${issue.id}`}>{t("common.status")}</Label>
                <select id={`st-${issue.id}`} name="status" defaultValue={issue.status} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm dark:border-slate-600 dark:bg-slate-800">
                  {["OPEN", "IN_REVIEW", "ACTION_DEFINED", "IN_PROGRESS", "EFFECTIVENESS_CHECK", "CLOSED", "REJECTED"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor={`dd-${issue.id}`}>{t("qm.issue.dueDate")}</Label>
                <Input id={`dd-${issue.id}`} name="dueDate" type="date" defaultValue={issue.dueDate ? issue.dueDate.toISOString().slice(0, 10) : ""} />
              </div>
              <div>
                <Label htmlFor={`ow-${issue.id}`}>{t("qm.issue.owner")} (User-ID)</Label>
                <Input id={`ow-${issue.id}`} name="ownerId" defaultValue={issue.ownerId ?? ""} placeholder="optional" />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export async function CapaList({ companyId }: { companyId: string | null }) {
  const t = getT();
  const actions = await prisma.correctiveAction.findMany({
    where: companyId ? { companyId } : {},
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
    take: 100,
    include: { qualityIssue: { select: { title: true, severity: true } } },
  });
  if (actions.length === 0) return <EmptyState title={t("qm.correctiveAction.empty")} />;
  return (
    <div className="space-y-4">
      <Hint>{t("qm.correctiveAction.closeBlocked")}</Hint>
      {actions.map((action) => (
        <Card key={action.id}>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              {action.title}
              <Badge variant={sevVariant(action.qualityIssue.severity)}>{action.qualityIssue.severity}</Badge>
              <Badge variant={action.dueDate && action.dueDate < new Date() && action.status !== "CLOSED" ? "danger" : "neutral"}>{action.status}</Badge>
            </CardTitle>
            <CardDescription>QM-Fall: {action.qualityIssue.title} · {t("qm.issue.dueDate")}: {formatDate(action.dueDate)}</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm action={updateCorrectiveAction} submitLabel={t("common.save")} successMessage={t("admin.saveDone")} errorMap={buildErrorMap()} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="actionId" value={action.id} />
              <div className="sm:col-span-2">
                <Label>{t("qm.correctiveAction.rootCause")}</Label>
                <textarea name="rootCause" rows={2} defaultValue={action.rootCause ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
              </div>
              <div>
                <Label>{t("qm.correctiveAction.immediateAction")}</Label>
                <textarea name="immediateAction" rows={2} defaultValue={action.immediateAction ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
              </div>
              <div>
                <Label>{t("qm.correctiveAction.correctiveAction")}</Label>
                <textarea name="correctiveAction" rows={2} defaultValue={action.correctiveAction ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
              </div>
              <div>
                <Label>{t("qm.correctiveAction.preventiveAction")}</Label>
                <textarea name="preventiveAction" rows={2} defaultValue={action.preventiveAction ?? ""} className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
              </div>
              <div>
                <Label>{t("qm.issue.owner")} (User-ID)</Label>
                <Input name="ownerId" defaultValue={action.ownerId ?? ""} />
              </div>
              <div>
                <Label>{t("qm.issue.dueDate")}</Label>
                <Input name="dueDate" type="date" defaultValue={action.dueDate ? action.dueDate.toISOString().slice(0, 10) : ""} />
              </div>
              <div>
                <Label>{t("qm.correctiveAction.effectivenessDate")}</Label>
                <Input name="effectivenessCheckDate" type="date" defaultValue={action.effectivenessCheckDate ? action.effectivenessCheckDate.toISOString().slice(0, 10) : ""} />
              </div>
              <div>
                <Label>{t("qm.correctiveAction.effectivenessResult")}</Label>
                <Input name="effectivenessResult" defaultValue={action.effectivenessResult ?? ""} />
              </div>
              <div>
                <Label>{t("common.status")}</Label>
                <select name="status" defaultValue={action.status} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm dark:border-slate-600 dark:bg-slate-800">
                  {["PLANNED", "IN_PROGRESS", "IMPLEMENTED", "EFFECTIVENESS_PENDING", "EFFECTIVE", "NOT_EFFECTIVE", "CLOSED"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
