import { featureVersion } from "@/config/feature-versions";

/**
 * Dezentes Badge mit der Feature-Version (pro Seite/Modul).
 * Rendert nichts, wenn das Feature nicht versioniert ist ("alte Sachen lassen").
 */
export function VersionBadge({ feature, label }: { feature: string; label?: string }) {
  const version = featureVersion(feature);
  if (!version) return null;
  return (
    <span
      title={label ? `${label}: ${version}` : `Feature-Version: ${version}`}
      className="inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400"
    >
      {version}
    </span>
  );
}
