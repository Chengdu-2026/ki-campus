import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { approvalIsCurrent, simpleLineDiff, type RiskHit } from "@/lib/content-audit/logic";
import {
  startReviewAction, setChecklistAnswerAction, approveAction, ownerApproveAction,
  requestChangesAction, rejectAction, markPublishedAction,
} from "@/app/actions/content-audit-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export const metadata = { title: "Inhaltsprüfung — Detail" };
export const dynamic = "force-dynamic";

export default async function ContentAuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const errorMap = buildErrorMap(user.locale);
  const { id } = await params;

  const item = await prisma.contentAuditItem.findUnique({
    where: { id },
    include: {
      checklistResults: {
        orderBy: { createdAt: "desc" }, take: 1,
        include: { answers: true, template: { include: { items: { orderBy: { sortOrder: "asc" } } } } },
      },
    },
  });
  if (!item) notFound();

  const [reviewer, approver, owner, history] = await Promise.all([
    item.reviewedById ? prisma.user.findUnique({ where: { id: item.reviewedById }, select: { firstName: true, lastName: true } }) : null,
    item.approvedById ? prisma.user.findUnique({ where: { id: item.approvedById }, select: { firstName: true, lastName: true } }) : null,
    item.ownerApprovedById ? prisma.user.findUnique({ where: { id: item.ownerApprovedById }, select: { firstName: true, lastName: true } }) : null,
    prisma.auditLog.findMany({
      where: { entityType: "ContentAuditItem", entityId: item.id },
      orderBy: { createdAt: "desc" }, take: 30,
    }),
  ]);

  const current = approvalIsCurrent(item);
  const result = item.checklistResults[0];
  const riskHits: RiskHit[] = item.riskHits ? (JSON.parse(item.riskHits) as RiskHit[]) : [];
  const checkedIds = new Set(result?.answers.filter((a) => a.checked).map((a) => a.checklistItemId));
  const name = (u: { firstName: string | null; lastName: string | null } | null) =>
    u ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() : "—";
  const fmt = (d: Date) => new Date(d).toLocaleString("de-AT");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/admin/content-audit" className="text-sm text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">
        ← {t("contentAudit.detail.back")}
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{item.title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {item.entityType} · {item.blockKey ?? item.entityId} · {item.locale} · v{item.version} ·{" "}
          {t(`contentAudit.status.${item.status}`)}
        </p>
      </div>

      {/* Freigabe-Badge: lebt am Hash */}
      {current ? (
        <div className="flex items-start gap-3 rounded-xl border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" aria-hidden="true" />
          <div className="text-sm text-green-800 dark:text-green-200">
            <p className="font-semibold">
              {t("contentAudit.detail.approvedBadge", { name: name(approver), date: item.approvedAt ? fmt(item.approvedAt) : "—", hash: item.approvedContentHash?.slice(0, 12) ?? "—" })}
            </p>
            {item.ownerApprovedAt && (
              <p className="mt-1">{t("contentAudit.detail.ownerBadge", { name: name(owner), date: fmt(item.ownerApprovedAt) })}</p>
            )}
          </div>
        </div>
      ) : item.approvedContentHash ? (
        <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm font-semibold text-red-800 dark:text-red-200">{t("contentAudit.detail.staleBadge")}</p>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">{t("contentAudit.detail.neverBadge")}</p>
        </div>
      )}

      {item.requiresOwnerApproval && !(item.ownerApprovedAt && current) && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
          <ShieldAlert className="h-4 w-4" aria-hidden="true" /> {t("contentAudit.detail.ownerRequired")}
        </p>
      )}

      <div className="grid gap-2 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-2">
        <p>{t("contentAudit.detail.currentHash")}: <code>{item.contentHash.slice(0, 20)}…</code></p>
        <p>{t("contentAudit.detail.approvedHash")}: <code>{item.approvedContentHash ? item.approvedContentHash.slice(0, 20) + "…" : "—"}</code></p>
      </div>

      {/* Risiko-Treffer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("contentAudit.detail.riskHits")}</CardTitle>
        </CardHeader>
        <CardContent>
          {riskHits.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("contentAudit.detail.noRiskHits")}</p>
          ) : (
            <ul className="space-y-2">
              {riskHits.map((hit, i) => (
                <li key={i} className="rounded-lg bg-red-50 p-3 text-sm dark:bg-red-950">
                  <Badge variant="danger">{hit.phrase}</Badge>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">…{hit.context}…</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Inhalt + Diff */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("contentAudit.detail.currentContent")}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs dark:bg-slate-900">{item.currentContentSnapshot}</pre>
        </CardContent>
      </Card>
      {item.previousContentSnapshot && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("contentAudit.detail.diff")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-xs dark:bg-slate-900">
              {simpleLineDiff(item.previousContentSnapshot, item.currentContentSnapshot).map((line, i) =>
                line.type === "same" ? (
                  <p key={i} className="text-slate-500">{line.text || " "}</p>
                ) : line.type === "added" ? (
                  <p key={i} className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">+ {line.text}</p>
                ) : (
                  <p key={i} className="bg-red-100 text-red-800 line-through dark:bg-red-950 dark:text-red-200">− {line.text}</p>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Aktionen */}
      {!result && item.status !== "ARCHIVED" && (
        <ActionForm action={startReviewAction} submitLabel={t("contentAudit.detail.startReview")} errorMap={errorMap}>
          <input type="hidden" name="itemId" value={item.id} />
        </ActionForm>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("contentAudit.detail.checklist")}</CardTitle>
            <CardDescription>{result.template.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm action={setChecklistAnswerAction} submitLabel={t("contentAudit.detail.checklistSave")} errorMap={errorMap}>
              <input type="hidden" name="resultId" value={result.id} />
              <div className="space-y-2">
                {result.template.items.map((ci) => (
                  <label key={ci.id} className="flex cursor-pointer items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <input
                      type="checkbox"
                      name="checkedItems"
                      value={ci.id}
                      defaultChecked={checkedIds.has(ci.id)}
                      className="mt-0.5 h-4 w-4 accent-green-600"
                    />
                    <span>
                      {ci.label}
                      {ci.required && <span className="text-red-500"> *</span>}
                      {ci.description && <span className="block text-xs text-slate-400">{ci.description}</span>}
                    </span>
                  </label>
                ))}
              </div>
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-medium text-slate-800 dark:text-slate-100">
                <input type="checkbox" name="approvedForPublication" defaultChecked={result.approvedForPublication} className="mt-0.5 h-4 w-4 accent-green-600" />
                <span>{t("contentAudit.detail.approvedForPublication")}</span>
              </label>
              <div className="mt-3">
                <Label htmlFor="notes">{t("contentAudit.detail.notes")}</Label>
                <Input id="notes" name="notes" defaultValue={result.notes ?? ""} />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ActionForm action={approveAction} submitLabel={t("contentAudit.detail.approve")} errorMap={errorMap}>
            <input type="hidden" name="itemId" value={item.id} />
          </ActionForm>
          <ActionForm action={ownerApproveAction} submitLabel={t("contentAudit.detail.ownerApprove")} errorMap={errorMap}>
            <input type="hidden" name="itemId" value={item.id} />
            <div>
              <Label htmlFor="totp">{t("contentAudit.detail.totpLabel")}</Label>
              <Input id="totp" name="totp" inputMode="numeric" maxLength={6} placeholder="000000" required />
            </div>
          </ActionForm>
          <ActionForm action={requestChangesAction} submitLabel={t("contentAudit.detail.requestChanges")} errorMap={errorMap}>
            <input type="hidden" name="itemId" value={item.id} />
            <div>
              <Label htmlFor="reason-rc">{t("contentAudit.detail.reasonLabel")}</Label>
              <Input id="reason-rc" name="reason" />
            </div>
          </ActionForm>
          <ActionForm action={rejectAction} submitLabel={t("contentAudit.detail.reject")} errorMap={errorMap}>
            <input type="hidden" name="itemId" value={item.id} />
            <div>
              <Label htmlFor="reason-rj">{t("contentAudit.detail.reasonLabel")}</Label>
              <Input id="reason-rj" name="reason" />
            </div>
          </ActionForm>
          {item.status === "APPROVED" && (
            <ActionForm action={markPublishedAction} submitLabel={t("contentAudit.detail.markPublished")} errorMap={errorMap}>
              <input type="hidden" name="itemId" value={item.id} />
            </ActionForm>
          )}
        </div>
      )}

      {/* Historie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("contentAudit.detail.history")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {history.map((h) => (
              <li key={h.id}>
                <span className="font-mono">{fmt(h.createdAt)}</span> — {h.action}
              </li>
            ))}
            {history.length === 0 && <li className="text-slate-400">—</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
