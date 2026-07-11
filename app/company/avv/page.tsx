import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { getT } from "@/lib/i18n";
import { appConfig } from "@/config/app";
import { acceptAvv } from "@/app/actions/avv-actions";
import { ActionForm } from "@/components/forms/action-form";

export const dynamic = "force-dynamic";

export const metadata = { title: "Auftragsverarbeitungsvereinbarung (AVV)" };

export default async function AvvPage() {
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(admin.locale);
  const companyId = admin.companyId;

  const existing = companyId
    ? await prisma.avvAcceptance.findFirst({
        where: { companyId, avvVersion: appConfig.avvVersion },
        orderBy: { acceptedAt: "desc" },
      })
    : null;

  const field = "block text-sm font-medium text-slate-700 dark:text-slate-200";
  const input =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="mx-auto max-w-2xl py-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("avv.title")}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t("avv.intro")}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {t("avv.version")}: {appConfig.avvVersion}
      </p>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t("avv.whatTitle")}
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
          {[t("avv.what1"), t("avv.what2"), t("avv.what3"), t("avv.what4")].map((w) => (
            <li key={w} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{t("avv.fullTextNote")}</p>
      </section>

      {existing ? (
        <section className="mt-6 rounded-2xl border border-green-300 bg-green-50 p-5 dark:border-green-800 dark:bg-green-950">
          <h2 className="font-semibold text-green-800 dark:text-green-200">{t("avv.alreadyTitle")}</h2>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
            <div><dt className="inline font-medium">{t("avv.name")}: </dt><dd className="inline">{existing.signerName}</dd></div>
            <div><dt className="inline font-medium">{t("avv.position")}: </dt><dd className="inline">{existing.signerPosition}</dd></div>
            {existing.signerBirthDate && (
              <div><dt className="inline font-medium">{t("avv.birthDate")}: </dt><dd className="inline">{existing.signerBirthDate}</dd></div>
            )}
            <div><dt className="inline font-medium">{t("avv.version")}: </dt><dd className="inline">{existing.avvVersion}</dd></div>
            <div><dt className="inline font-medium">{t("avv.acceptedAt")}: </dt><dd className="inline">{existing.acceptedAt.toLocaleString("de-AT")}</dd></div>
            {existing.ipAddress && (
              <div><dt className="inline font-medium">IP: </dt><dd className="inline">{existing.ipAddress}</dd></div>
            )}
          </dl>
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
          <h2 className="mb-4 font-semibold text-brand-900 dark:text-white">{t("avv.formTitle")}</h2>
          <ActionForm
            action={acceptAvv}
            submitLabel={t("avv.submit")}
            successMessage={t("avv.success")}
            errorMap={{
              "common.requiredField": t("common.requiredField"),
              "avv.mustConfirm": t("avv.mustConfirm"),
              "avv.noCompany": t("avv.noCompany"),
            }}
          >
            <div>
              <label htmlFor="signerName" className={field}>{t("avv.name")}</label>
              <input id="signerName" name="signerName" required className={input} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="signerBirthDate" className={field}>{t("avv.birthDate")}</label>
              <input id="signerBirthDate" name="signerBirthDate" placeholder="TT.MM.JJJJ" className={input} />
            </div>
            <div>
              <label htmlFor="signerPosition" className={field}>{t("avv.position")}</label>
              <input id="signerPosition" name="signerPosition" required className={input} placeholder={t("avv.positionHint")} />
            </div>
            <div>
              <label htmlFor="signatureText" className={field}>{t("avv.signature")}</label>
              <input id="signatureText" name="signatureText" required className={input} placeholder={t("avv.signatureHint")} />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("avv.signatureNote")}</p>
            </div>
            <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input type="checkbox" name="confirm" value="on" required className="mt-1" />
              <span>{t("avv.confirmLabel")}</span>
            </label>
          </ActionForm>
        </section>
      )}
    </div>
  );
}
