import Link from "next/link";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";

export function Footer() {
  const t = getT();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p className="font-medium">{t("footer.disclaimerShort")}</p>
        <nav aria-label="Rechtliches" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link className="hover:underline" href="/impressum">{t("footer.imprint")}</Link>
          <Link className="hover:underline" href="/datenschutz">{t("footer.privacy")}</Link>
          <Link className="hover:underline" href="/agb">{t("footer.terms")}</Link>
          <Link className="hover:underline" href="/legal-disclaimer">{t("footer.legalDisclaimer")}</Link>
          <Link className="hover:underline" href="/ki-transparenz">{t("footer.aiTransparency")}</Link>
          <Link className="hover:underline" href="/ki-kompetenz-review">{t("footer.reviewRoadmap")}</Link>
          <Link className="hover:underline" href="/themen">{t("footer.topicWish")}</Link>
        </nav>
        <p className="text-xs">
          © {new Date().getFullYear()} {appConfig.legalCompanyName} · {appConfig.legalCompanyNameZh}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t("footer.contentVersion", { version: appConfig.contentVersionLabel })}
        </p>
      </div>
    </footer>
  );
}
