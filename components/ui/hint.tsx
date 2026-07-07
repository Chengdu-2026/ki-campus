import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Kontextbezogener Hinweis — barrierefrei, keine reine Farb-Kodierung. */
export function Hint({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-100",
        className
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

export function WarningHint({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100",
        className
      )}
    >
      <span aria-hidden="true" className="font-bold">!</span>
      <div>{children}</div>
    </div>
  );
}
