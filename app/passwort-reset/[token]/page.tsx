import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionForm } from "@/components/forms/action-form";
import { resetPassword } from "@/app/actions/auth-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Neues Passwort" };

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const t = getT();
  return (
    <div className="mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("auth.resetTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={resetPassword}
            submitLabel={t("auth.resetButton")}
            successMessage={t("auth.resetDone")}
            successRedirect="/login"
            errorMap={buildErrorMap()}
          >
            <input type="hidden" name="token" value={token} />
            <div>
              <Label htmlFor="password">{t("auth.resetNewPassword")}</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={10} />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("auth.passwordPolicy")}</p>
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
