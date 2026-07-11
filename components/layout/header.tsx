import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { optionalImage } from "@/lib/assets";

export interface NavItem { href: string; label: string; }

export function navItemsFor(role: string | null, t: (k: string) => string): NavItem[] {
  if (!role) {
    return [
      { href: "/schulung", label: "Lerninhalte" },
      { href: "/features", label: t("nav.features") },
      { href: "/pricing", label: t("nav.pricing") },
      { href: "/faq", label: t("nav.faq") },
    ];
  }
  const items: NavItem[] = [
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/certificates", label: t("nav.certificates") },
    { href: "/practice", label: t("nav.practice") },
    { href: "/faq", label: t("nav.faq") },
  ];
  if (role === "COMPANY_ADMIN" || role === "TRAINER") items.push({ href: "/company", label: t("nav.company") });
  if (role === "SUPERADMIN") items.push({ href: "/admin", label: t("nav.admin") });
  items.push({ href: "/settings/2fa", label: "2FA" });
  return items;
}

export async function Header() {
  const session = await auth();
  const t = getT(session?.user?.locale);
  const role = session?.user?.role ?? null;
  const items = navItemsFor(role, t);
  const logoLight = optionalImage("images/KI-Kompetenz-Logo-hell.png");
  const logoDark = optionalImage("images/KI-Kompetenz-Logo-dunkel.png");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2 font-semibold text-brand-900 dark:text-slate-100">
          {logoLight && logoDark ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoLight} alt={appConfig.appName} className="h-9 w-auto rounded-md dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoDark} alt="" aria-hidden="true" className="hidden h-9 w-auto rounded-md dark:block" />
            </>
          ) : (
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white dark:bg-accent-500 dark:text-brand-900">KI</span>
          )}
          <span className="hidden sm:inline">{appConfig.appName}</span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block"><ThemeToggle /></div>
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="outline" size="sm" type="submit">{t("nav.logout")}</Button>
            </form>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">{t("nav.login")}</Link>
              <Link href="/register" className="inline-flex h-9 items-center rounded-lg bg-brand-700 px-4 text-sm font-medium text-white hover:bg-brand-600 dark:bg-accent-500 dark:text-brand-900">
                {t("nav.register")}
              </Link>
            </div>
          )}
          <MobileNav items={items} loggedIn={!!session} loginLabel={t("nav.login")} registerLabel={t("nav.register")} />
        </div>
      </div>
    </header>
  );
}
