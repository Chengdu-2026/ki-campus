import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { upsertThreshold } from "@/app/actions/qm-actions";
import { ActionForm } from "@/components/forms/action-form";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "QM-Schwellenwerte" };

export default async function ThresholdsPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);
  const thresholds = await prisma.qMThreshold.findMany({ where: { scope: "GLOBAL" }, orderBy: { metric: "asc" } });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("qm.threshold.title")}</h1>
      <Hint>{t("qm.threshold.hint")}</Hint>
      {thresholds.map((threshold) => (
        <Card key={threshold.id}>
          <CardHeader><CardTitle className="text-base font-mono">{threshold.metric}</CardTitle></CardHeader>
          <CardContent>
            <ActionForm action={upsertThreshold} submitLabel={t("common.save")} successMessage={t("admin.saveDone")} errorMap={buildErrorMap()} className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="metric" value={threshold.metric} />
              <div>
                <Label>{t("qm.threshold.warning")}</Label>
                <Input name="warningThreshold" type="number" step="0.1" defaultValue={threshold.warningThreshold} required />
              </div>
              <div>
                <Label>{t("qm.threshold.critical")}</Label>
                <Input name="criticalThreshold" type="number" step="0.1" defaultValue={threshold.criticalThreshold} required />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
