import { requireRole } from "@/lib/rbac";
import { getDefaultCourse } from "@/lib/content";
import { getCompanyProgress, getCompanyGapAnalysis } from "@/lib/company-data";
import { getT } from "@/lib/i18n";
import { resetAttempts, sendReminder } from "@/app/actions/company-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Hint } from "@/components/ui/hint";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = { title: "Fortschritt & Lückenanalyse" };

export default async function CompanyProgressPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN", "TRAINER");
  const t = getT(user.locale);
  if (!user.companyId) return null;

  const course = await getDefaultCourse();
  const members = await getCompanyProgress(user.companyId);
  const gap = await getCompanyGapAnalysis(user.companyId);
  const canManage = user.role !== "TRAINER";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("company.progressTitle")}</h1>

      {members.length === 0 ? (
        <EmptyState title={t("company.progressEmpty")} />
      ) : (
        <Table>
          <THead>
            <Tr>
              <Th>{t("common.name")}</Th>
              <Th className="min-w-[140px]">{t("company.courseProgress")}</Th>
              <Th>{t("company.examState")}</Th>
              <Th>{t("company.certState")}</Th>
              {canManage && <Th>{t("common.actions")}</Th>}
            </Tr>
          </THead>
          <TBody>
            {members.map((m) => (
              <Tr key={m.userId}>
                <Td className="font-medium">{m.firstName} {m.lastName}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Progress value={m.progressPercent} className="w-24" />
                    <span className="text-xs text-slate-500">{m.progressPercent} %</span>
                  </div>
                </Td>
                <Td>
                  <Badge variant={m.passed ? "success" : m.failed ? "danger" : m.readyForExam ? "accent" : "neutral"}>
                    {m.passed
                      ? `${t("company.examPassed")}${m.bestPercent !== null ? ` (${m.bestPercent} %)` : ""}`
                      : m.failed
                        ? t("company.retrainingNeeded")
                        : m.readyForExam
                          ? t("company.examOpen")
                          : m.progressPercent > 0
                            ? t("company.inProgress")
                            : t("company.notStarted")}
                  </Badge>
                </Td>
                <Td className="font-mono text-xs">{m.certificateNumber ?? "—"}</Td>
                {canManage && (
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      <form action={sendReminder.bind(null, m.userId)}>
                        <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                          {t("company.sendReminder")}
                        </button>
                      </form>
                      {m.failed && course && (
                        <form action={resetAttempts.bind(null, m.userId, course.id)}>
                          <button type="submit" className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-950">
                            {t("company.resetAttempts")}
                          </button>
                        </form>
                      )}
                    </div>
                  </Td>
                )}
              </Tr>
            ))}
          </TBody>
        </Table>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t("company.gapTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardDescription>{t("company.gapAvg")}</CardDescription></CardHeader>
            <CardContent><p className="text-3xl font-bold text-brand-900 dark:text-white">{gap.avgPercent !== null ? `${gap.avgPercent} %` : "—"}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardDescription>{t("company.gapUsers")}</CardDescription></CardHeader>
            <CardContent><p className="text-3xl font-bold text-brand-900 dark:text-white">{gap.usersNeedingRetraining}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardDescription>{t("company.gapTopErrors")}</CardDescription></CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {gap.categories.filter((c) => c.weak).slice(0, 3).map((c) => t(`categories.${c.category}`)).join(", ") || t("company.gapNone")}
              </p>
            </CardContent>
          </Card>
        </div>

        {gap.categories.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">{t("company.gapTopErrors")}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {gap.categories.map((c) => (
                <div key={c.category}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {t(`categories.${c.category}`)}
                      {c.weak && <Badge variant="warning">{t("exam.retrainingRecommended")}</Badge>}
                    </span>
                    <span className="text-slate-500">{c.percent} % {t("practice.correct").toLowerCase()}</span>
                  </div>
                  <Progress value={c.percent} />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {gap.categories.some((c) => c.weak) && (
          <Hint>
            {gap.categories.filter((c) => c.weak).slice(0, 1).map((c) =>
              t("company.gapRecommendation", { percent: 100 - c.percent, category: t(`categories.${c.category}`) })
            )}
          </Hint>
        )}
      </section>
    </div>
  );
}
