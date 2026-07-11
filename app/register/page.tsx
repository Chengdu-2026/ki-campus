import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";
import { ActionForm } from "@/components/forms/action-form";
import { registerCompany } from "@/app/actions/auth-actions";
import { PASSWORD_PATTERN } from "@/lib/password-policy";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Unternehmen registrieren" };

export default function RegisterPage() {
  const t = getT();
  return (
    <div className="mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerText")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ActionForm
            action={registerCompany}
            nativeValidation
            submitLabel={t("auth.registerButton")}
            successMessage={t("auth.registerSuccess")}
            successRedirect="/login"
            errorMap={buildErrorMap()}
          >
            <div>
              <Label htmlFor="companyName">{t("auth.companyName")}</Label>
              <Input id="companyName" name="companyName" required />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <Input id="firstName" name="firstName" autoComplete="given-name" required />
              </div>
              <div>
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input id="lastName" name="lastName" autoComplete="family-name" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} pattern={PASSWORD_PATTERN} title={t("auth.passwordPolicy")} />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("auth.passwordPolicy")}</p>
            </div>
          </ActionForm>
          <Hint>{t("footer.disclaimerShort")}</Hint>
        </CardContent>
      </Card>
    </div>
  );
}
