import Link from "next/link";
import { requireUser } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Feedback gesendet" };

export default async function FeedbackSuccessPage() {
  const user = await requireUser();
  const t = getT(user.locale);
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
      <h1 className="mt-4 text-2xl font-bold text-brand-900 dark:text-white">{t("qm.feedback.thanks")}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{t("qm.feedback.thanksText")}</p>
      <Link href="/dashboard" className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand-700 px-6 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
        {t("nav.dashboard")}
      </Link>
    </div>
  );
}
