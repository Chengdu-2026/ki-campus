"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { NavItem } from "@/components/layout/header";

export function MobileNav({
  items,
  loggedIn,
  loginLabel,
  registerLabel,
}: {
  items: NavItem[];
  loggedIn: boolean;
  loginLabel: string;
  registerLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
            {!loggedIn && (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">{loginLabel}</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="rounded-lg bg-brand-700 px-3 py-3 text-center text-base font-medium text-white dark:bg-accent-500 dark:text-brand-900">{registerLabel}</Link>
              </>
            )}
            <div className="mt-2 border-t border-slate-200 pt-3 dark:border-slate-800"><ThemeToggle /></div>
          </nav>
        </div>
      )}
    </div>
  );
}
