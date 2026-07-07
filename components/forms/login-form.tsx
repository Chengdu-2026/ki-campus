"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ errorText }: { errorText: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      totp: String(form.get("totp") ?? ""),
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError(true);
    } else {
      router.push(params.get("callbackUrl") ?? "/dashboard");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
          {errorText}
        </p>
      )}
      <div>
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div>
        <Label htmlFor="password">Passwort</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <div>
        <Label htmlFor="totp">2FA-Code (nur falls aktiviert)</Label>
        <Input id="totp" name="totp" inputMode="numeric" autoComplete="one-time-code" placeholder="123456" maxLength={6} />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Wird geprüft …" : "Anmelden"}
      </Button>
    </form>
  );
}
