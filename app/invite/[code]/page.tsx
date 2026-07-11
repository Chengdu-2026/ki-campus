import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";
import { ActionForm } from "@/components/forms/action-form";
import { acceptInvitation } from "@/app/actions/auth-actions";
import { PASSWORD_PATTERN } from "@/lib/password-policy";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Einladung annehmen" };

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = getT();

  // "code" = generischer Einstieg für Registrierungscodes; sonst Link-Code prüfen
  const isGeneric = code === "code";
  const invitation = isGeneric
    ? null
    : await prisma.invitation.findUnique({ where: { code }, include: { company: true } });
  const invalid = !isGeneric && (!invitation || invitation.acceptedAt !== null || invitation.expiresAt < new Date());

  return (
    <div className="mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>{isGeneric ? t("auth.codeTitle") : t("auth.inviteTitle")}</CardTitle>
          <CardDescription>
            {invitation?.company ? `${invitation.company.name} — ` : ""}
            {t("auth.inviteText")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invalid ? (
            <Hint>{t("auth.inviteInvalid")}</Hint>
          ) : (
            <ActionForm
              action={acceptInvitation}
              nativeValidation
              submitLabel={t("auth.inviteButton")}
              successMessage={t("auth.registerSuccess")}
              successRedirect="/login"
              errorMap={buildErrorMap()}
            >
              {isGeneric ? (
                <div>
                  <Label htmlFor="code">{t("auth.codeLabel")}</Label>
                  <Input id="code" name="code" required />
                </div>
              ) : (
                <input type="hidden" name="code" value={code} />
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input id="password" name="password" type="password" required minLength={6} pattern={PASSWORD_PATTERN} title={t("auth.passwordPolicy")} />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("auth.passwordPolicy")}</p>
              </div>
            </ActionForm>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
