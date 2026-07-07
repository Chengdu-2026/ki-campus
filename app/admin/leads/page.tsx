import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { LEAD_TOPIC_KEYS, type LeadTopicKey } from "@/lib/leads";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Lightbulb } from "lucide-react";

export const metadata = { title: "Themenwünsche" };

/** Superadmin: eingegangene Themenwünsche der Leadmaschine (/themen). */
export default async function AdminLeadsPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const leads = await prisma.interestLead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });

  // Auszählung je Thema für die Kursplanung
  const counts = new Map<LeadTopicKey, number>();
  for (const lead of leads) {
    try {
      for (const topic of JSON.parse(lead.topics) as LeadTopicKey[]) {
        counts.set(topic, (counts.get(topic) ?? 0) + 1);
      }
    } catch {
      // defekte Einträge ignorieren
    }
  }
  const ranking = LEAD_TOPIC_KEYS.map((key) => ({ key, count: counts.get(key) ?? 0 })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("themen.admin.title")}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">{t("themen.admin.total", { count: leads.length })}</p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-5 w-5 text-accent-500" aria-hidden="true" />
            {t("themen.admin.topTopics")}
          </CardTitle>
          <CardDescription>{t("themen.title")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ranking.map(({ key, count }) => (
              <li key={key} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-700 dark:text-slate-200">{t(`themen.${key}`)}</span>
                <Badge variant={count > 0 ? "accent" : "neutral"}>{count}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {leads.length === 0 ? (
        <EmptyState title={t("themen.admin.none")} />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <THead>
                <Tr>
                  <Th>{t("common.date")}</Th>
                  <Th>{t("themen.admin.topics")}</Th>
                  <Th>{t("themen.admin.message")}</Th>
                  <Th>{t("themen.admin.contact")}</Th>
                </Tr>
              </THead>
              <TBody>
                {leads.map((lead) => {
                  let topicKeys: string[] = [];
                  try {
                    topicKeys = JSON.parse(lead.topics) as string[];
                  } catch {
                    topicKeys = [];
                  }
                  return (
                    <Tr key={lead.id}>
                      <Td className="whitespace-nowrap text-xs">
                        {new Date(lead.createdAt).toLocaleDateString("de-AT")}
                      </Td>
                      <Td>
                        <div className="flex max-w-md flex-wrap gap-1">
                          {topicKeys.map((key) => (
                            <Badge key={key} variant="neutral">
                              {t(`themen.${key}`)}
                            </Badge>
                          ))}
                        </div>
                      </Td>
                      <Td className="max-w-sm text-xs text-slate-600 dark:text-slate-300">
                        {lead.message ?? "—"}
                      </Td>
                      <Td className="text-xs">
                        {lead.email ? (
                          <div>
                            <p className="font-medium">{lead.name ?? "—"}</p>
                            <p>{lead.email}</p>
                            <p className="text-slate-500">{lead.company ?? ""}</p>
                          </div>
                        ) : (
                          <span className="text-slate-400">{t("themen.admin.anonymous")}</span>
                        )}
                      </Td>
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
