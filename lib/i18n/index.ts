import { de, type Dictionary } from "./de";
import { en } from "./en";
import { appConfig } from "@/config/app";

const dictionaries: Record<string, unknown> = { de, en };

function get(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Übersetzungsfunktion mit Fallback-Kette: locale -> fallbackLocale -> Key.
 * Platzhalter: t("dashboard.greeting", { name: "Anna" }) ersetzt {{name}}.
 */
export function getT(locale: string = appConfig.defaultLocale) {
  const dict = dictionaries[locale] ?? dictionaries[appConfig.fallbackLocale];
  const fallback = dictionaries[appConfig.fallbackLocale];
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = get(dict, key);
    if (value === undefined) value = get(fallback, key);
    if (typeof value !== "string") return key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = (value as string).replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value as string;
  };
}

export type { Dictionary };
export { de };
