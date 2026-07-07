"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const MODES = [
  { key: "light", icon: Sun, label: "Hell" },
  { key: "dark", icon: Moon, label: "Dunkel" },
  { key: "system", icon: Monitor, label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-[108px]" aria-hidden="true" />;

  return (
    <div role="group" aria-label="Darstellung wählen" className="flex rounded-lg border border-slate-300 p-0.5 dark:border-slate-600">
      {MODES.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setTheme(key)}
          aria-label={label}
          aria-pressed={theme === key}
          title={label}
          className={
            "rounded-md p-1.5 transition-colors " +
            (theme === key
              ? "bg-brand-700 text-white dark:bg-accent-500 dark:text-brand-900"
              : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800")
          }
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
