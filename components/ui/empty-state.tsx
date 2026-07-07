import { cn } from "@/lib/utils";

/** Leerer Zustand mit Erklärung und optionaler Aktion — keine leeren Seiten. */
export function EmptyState({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-600 dark:bg-slate-900",
        className
      )}
    >
      <p className="font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {children && <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{children}</p>}
      {action}
    </div>
  );
}
