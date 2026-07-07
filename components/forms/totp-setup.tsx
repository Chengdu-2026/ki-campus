"use client";

import { useState, useTransition } from "react";
import { startTotpSetup, type TotpSetup } from "@/app/actions/totp-actions";
import { Button } from "@/components/ui/button";

export function TotpSetupStarter({ buttonLabel, hint }: { buttonLabel: string; hint: string }) {
  const [setup, setSetup] = useState<TotpSetup | null>(null);
  const [pending, startTransition] = useTransition();

  if (!setup) {
    return (
      <Button
        disabled={pending}
        onClick={() => startTransition(async () => setSetup(await startTotpSetup()))}
      >
        {pending ? "…" : buttonLabel}
      </Button>
    );
  }
  return (
    <div className="space-y-3">
      <img
        src={setup.qrDataUrl}
        alt="QR-Code für Google Authenticator"
        className="rounded-lg border border-slate-200 dark:border-slate-700"
        width={180}
        height={180}
      />
      <p className="text-sm text-slate-600 dark:text-slate-300">{hint}</p>
      <p className="font-mono text-xs text-slate-500 break-all dark:text-slate-400">
        Manueller Schlüssel: {setup.secret}
      </p>
    </div>
  );
}
