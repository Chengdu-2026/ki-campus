"use client";

import { useTransition } from "react";

/** Destruktive Aktion mit Bestätigungsdialog. */
export function ConfirmButton({
  action,
  confirmText,
  label,
}: {
  action: () => Promise<void>;
  confirmText: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmText)) startTransition(async () => { await action(); });
      }}
      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
    >
      {label}
    </button>
  );
}
