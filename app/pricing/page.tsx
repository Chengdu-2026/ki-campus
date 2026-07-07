import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { parseJsonArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Preise" };

export default async function PricingPage() {
  const t = getT();
  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="py-6">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-brand-900 dark:text-white">{t("pricing.title")}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t("pricing.subtitle", { fee: appConfig.examRetakeFeeEur })}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.key === "BUSINESS" ? "border-accent-500 ring-1 ring-accent-500" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-2xl font-bold text-brand-900 dark:text-white">
                {plan.priceMonthly !== null
                  ? `€ ${(plan.priceMonthly / 100).toFixed(0)} `
                  : t("pricing.onRequest")}
                {plan.priceMonthly !== null && (
                  <span className="text-sm font-normal text-slate-500">{t("pricing.perMonth")}</span>
                )}
              </p>
              {plan.priceMonthly !== null && plan.maxParticipants !== null && (
                <p className="mt-1 text-sm font-medium text-accent-600 dark:text-accent-400">
                  {t("pricing.perPerson", { amount: (plan.priceMonthly / 100 / plan.maxParticipants).toFixed(2).replace(".", ",") })}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {parseJsonArray(plan.features).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900"
              >
                {t("pricing.choose")}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-brand-900 dark:text-slate-200">{t("pricing.yearlyNote")}</p>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">{t("pricing.flatrateNote")}</p>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">{t("pricing.exportNote")}</p>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">{t("pricing.disclaimer")}</p>
    </div>
  );
}
