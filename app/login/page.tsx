import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/login-form";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Anmelden" };

export default function LoginPage() {
  const t = getT();
  return (
    <div className="mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("auth.loginTitle")}</CardTitle>
          <CardDescription>{t("auth.loginText")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense>
            <LoginForm errorText={t("auth.loginFailed")} />
          </Suspense>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="text-brand-700 hover:underline dark:text-accent-400" href="/passwort-vergessen">
              {t("auth.forgotPassword")}
            </Link>
            <Link className="text-brand-700 hover:underline dark:text-accent-400" href="/register">
              {t("auth.registerTitle")}
            </Link>
            <Link className="text-brand-700 hover:underline dark:text-accent-400" href="/invite/code">
              {t("auth.codeTitle")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
