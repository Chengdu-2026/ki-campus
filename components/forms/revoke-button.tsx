"use client";

import { useTransition } from "react";

export function RevokeButton({
  action,
  promptText,
  label,
}: {
  action: (reason: string) => Promise<void>;
  promptText: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const reason = window.prompt(promptText);
        if (reason !== null) startTransition(async () => { await action(reason); });
      }}
      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
    >
      {label}
    </button>
  );
}
