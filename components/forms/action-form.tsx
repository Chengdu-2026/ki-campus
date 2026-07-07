"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/app/actions/auth-actions";

/**
 * Generischer Form-Wrapper für Server Actions mit ActionResult.
 * errorMap übersetzt Fehlercodes (i18n-Keys) in angezeigten Text.
 */
export function ActionForm({
  action,
  children,
  submitLabel,
  successMessage,
  successRedirect,
  errorMap,
  className,
}: {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  submitLabel: string;
  successMessage?: string;
  successRedirect?: string;
  errorMap: Record<string, string>;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok && successRedirect) {
      const timer = setTimeout(() => router.push(successRedirect), 1200);
      return () => clearTimeout(timer);
    }
  }, [state, successRedirect, router]);

  return (
    <form action={formAction} className={className ?? "space-y-4"} noValidate>
      {state && !state.ok && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
          {errorMap[state.error ?? ""] ?? state.error ?? "Fehler"}
        </p>
      )}
      {state?.ok && successMessage && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-200">
          {successMessage}
        </p>
      )}
      {children}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Wird gespeichert …" : submitLabel}
      </Button>
    </form>
  );
}
