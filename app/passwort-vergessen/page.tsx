import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionForm } from "@/components/forms/action-form";
import { requestPasswordReset } from "@/app/actions/auth-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Passwort zurücksetzen" };

export default function ForgotPasswordPage() {
  const t = getT();
  return (
    <div className="mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("auth.resetTitle")}</CardTitle>
          <CardDescription>{t("auth.resetRequestText")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={requestPasswordReset}
            submitLabel={t("auth.resetRequestButton")}
            successMessage={t("auth.resetRequested")}
            errorMap={buildErrorMap()}
          >
            <div>
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
