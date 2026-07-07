import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { approvalIsCurrent } from "@/lib/content-audit/logic";
import { runScanAction } from "@/app/actions/content-audit-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldAlert } from "lucide-react";

export const metadata = { title: "Inhaltsprüfung" };
export const dynamic = "force-dynamic";

const RISK_BADGE: Record<string, "neutral" | "warning" | "danger"> = {
  LOW: "neutral", MEDIUM: "warning", HIGH: "danger", CRITICAL: "danger",
};
const STATUS_BADGE: Record<string, "neutral" | "warning" | "success" | "danger" | "accent"> = {
  DRAFT: "neutral", NEEDS_REVIEW: "warning", IN_REVIEW: "accent",
  CHANGES_REQUESTED: "warning", APPROVED: "success", PUBLISHED: "success",
  REJECTED: "danger", ARCHIVED: "neutral",
};

export default async function ContentAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; risk?: string; type?: string; filter?: string }>;
}) {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const { status, risk, type, filter } = await searchParams;

  const items = await prisma.contentAuditItem.findMany({
    orderBy: [{ riskLevel: "desc" }, { updatedAt: "desc" }],
    take: 1000,
  });

  // KPIs auf Basis aller Items
  const isStale = (i: (typeof items)[number]) => !!i.approvedContentHash && !approvalIsCurrent(i);
  const liveUnapproved = items.filter((i) => i.status !== "ARCHIVED" && !approvalIsCurrent(i));
  const kpis = [
    { label: t("contentAudit.kpiNew"), value: items.filter((i) => i.status === "NEEDS_REVIEW" && !i.approvedContentHash).length, danger: false },
    { label: t("contentAudit.kpiChanged"), value: items.filter(isStale).length, danger: false },
    { label: t("contentAudit.kpiLiveUnapproved"), value: liveUnapproved.length, danger: liveUnapproved.length > 0 },
    { label: t("contentAudit.kpiRisk"), value: items.filter((i) => ["HIGH", "CRITICAL"].includes(i.riskLevel) && i.status !== "ARCHIVED").length, danger: false },
    { label: t("contentAudit.kpiOwner"), value: items.filter((i) => i.requiresOwnerApproval && !i.ownerApprovedAt).length, danger: false },
    { label: t("contentAudit.kpiApproved"), value: items.filter((i) => approvalIsCurrent(i)).length, danger: false },
  ];

  // Filter
  let filtered = items;
  if (status) filtered = filtered.filter((i) => i.status === status);
  if (risk) filtered = filtered.filter((i) => i.riskLevel === risk);
  if (type) filtered = filtered.filter((i) => i.entityType === type);
  if (filter === "live") filtered = filtered.filter((i) => i.status !== "ARCHIVED" && !approvalIsCurrent(i));
  if (filter === "riskonly") filtered = filtered.filter((i) => ["HIGH", "CRITICAL"].includes(i.riskLevel));
  if (filter === "owner") filtered = filtered.filter((i) => i.requiresOwnerApproval && !i.ownerApprovedAt);

  const entityTypes = [...new Set(items.map((i) => i.entityType))].sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("contentAudit.title")}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t("contentAudit.subtitle")}</p>
        </div>
        <div className="w-full max-w-xs">
          <ActionForm action={runScanAction} submitLabel={t("contentAudit.runScan")} errorMap={buildErrorMap(user.locale)}>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t("contentAudit.scanHint")}</p>
          </ActionForm>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <Card key={k.label} className={k.danger ? "border-red-400 dark:border-red-700" : undefined}>
            <CardHeader className="p-4">
              <CardTitle className={`text-2xl ${k.danger ? "text-red-600 dark:text-red-400" : "text-brand-900 dark:text-white"}`}>
                {k.value}
              </CardTitle>
              <CardDescription className="text-xs">{k.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/admin/content-audit" className="underline-offset-4 hover:underline">{t("contentAudit.filterAll")}</Link>
        <Link href="/admin/content-audit?filter=live" className="text-red-600 underline-offset-4 hover:underline dark:text-red-400">{t("contentAudit.filterLiveUnapproved")}</Link>
        <Link href="/admin/content-audit?filter=riskonly" className="underline-offset-4 hover:underline">{t("contentAudit.filterRiskOnly")}</Link>
        <Link href="/admin/content-audit?filter=owner" className="underline-offset-4 hover:underline">{t("contentAudit.filterOwnerOnly")}</Link>
        {entityTypes.map((et) => (
          <Link key={et} href={`/admin/content-audit?type=${et}`} className="text-slate-500 underline-offset-4 hover:underline">{et}</Link>
        ))}
        <a href="/api/content-audit/export" className="ml-auto font-medium text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">CSV-Export</a>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={t("contentAudit.none")} />
      ) : (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <THead>
                <Tr>
                  <Th>{t("contentAudit.colStatus")}</Th>
                  <Th>{t("contentAudit.colRisk")}</Th>
                  <Th>{t("contentAudit.colTitle")}</Th>
                  <Th>{t("contentAudit.colType")}</Th>
                  <Th>{t("contentAudit.colVersion")}</Th>
                  <Th>{t("contentAudit.colHashCurrent")}</Th>
                  <Th>{t("contentAudit.colOwner")}</Th>
                  <Th>{t("contentAudit.colUpdated")}</Th>
                </Tr>
              </THead>
              <TBody>
                {filtered.slice(0, 300).map((item) => {
                  const current = approvalIsCurrent(item);
                  return (
                    <Tr key={item.id}>
                      <Td><Badge variant={STATUS_BADGE[item.status] ?? "neutral"}>{t(`contentAudit.status.${item.status}`)}</Badge></Td>
                      <Td><Badge variant={RISK_BADGE[item.riskLevel] ?? "neutral"}>{item.riskLevel}</Badge></Td>
                      <Td className="max-w-xs">
                        <Link href={`/admin/content-audit/${item.id}`} className="font-medium text-brand-700 underline-offset-4 hover:underline dark:text-accent-400">
                          {item.title}
                        </Link>
                        {item.blockKey && <p className="text-xs text-slate-400">{item.blockKey}</p>}
                      </Td>
                      <Td className="text-xs">{item.entityType}</Td>
                      <Td className="text-xs">v{item.version}</Td>
                      <Td>
                        {current ? (
                          <Badge variant="success">{t("contentAudit.hashOk")}</Badge>
                        ) : item.approvedContentHash ? (
                          <Badge variant="danger">{t("contentAudit.hashStale")}</Badge>
                        ) : (
                          <Badge variant="warning">{t("contentAudit.hashNever")}</Badge>
                        )}
                      </Td>
                      <Td>
                        {item.requiresOwnerApproval ? (
                          item.ownerApprovedAt && current ? (
                            <Badge variant="success">✓</Badge>
                          ) : (
                            <span title={t("contentAudit.detail.ownerRequired")}>
                              <ShieldAlert className="h-4 w-4 text-red-500" aria-hidden="true" />
                            </span>
                          )
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </Td>
                      <Td className="whitespace-nowrap text-xs">{new Date(item.updatedAt).toLocaleString("de-AT")}</Td>
                    </Tr>
                  );
                })}
              </TBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
