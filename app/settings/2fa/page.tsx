import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { confirmTotp, disableTotp } from "@/app/actions/totp-actions";
import { TotpSetupStarter } from "@/components/forms/totp-setup";
import { ActionForm } from "@/components/forms/action-form";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/ui/hint";

export const metadata = { title: "Zwei-Faktor-Authentifizierung" };

export default async function TwoFactorPage() {
  const user = await requireUser();
  const t = getT(user.locale);
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { totpSecret: true, totpEnabledAt: true },
  });
  const enabled = !!dbUser?.totpEnabledAt;
  const pendingSetup = !!dbUser?.totpSecret && !enabled;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">Zwei-Faktor-Authentifizierung (2FA)</h1>
        <Badge variant={enabled ? "success" : "neutral"}>{enabled ? t("common.active") : t("common.inactive")}</Badge>
      </div>
      <Hint>
        Kompatibel mit Google Authenticator, Microsoft Authenticator und Authy.
        Nach Aktivierung wird beim Login zusätzlich zum Passwort ein 6-stelliger Code abgefragt.
      </Hint>

      {enabled ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">2FA aktiv seit {formatDate(dbUser?.totpEnabledAt)}</CardTitle>
            <CardDescription>Zum Deaktivieren aktuellen Code aus der App eingeben.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={disableTotp}
              submitLabel="2FA deaktivieren"
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
            >
              <div>
                <Label htmlFor="code">Code aus der Authenticator-App</Label>
                <Input id="code" name="code" inputMode="numeric" maxLength={6} placeholder="123456" required />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schritt 1: QR-Code scannen</CardTitle>
              <CardDescription>
                Öffnen Sie Google Authenticator und scannen Sie den QR-Code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TotpSetupStarter
                buttonLabel={pendingSetup ? "Neuen QR-Code erzeugen" : "2FA einrichten"}
                hint="Scannen Sie den Code mit Ihrer Authenticator-App und bestätigen Sie unten mit dem angezeigten 6-stelligen Code."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schritt 2: Mit Code bestätigen</CardTitle>
              <CardDescription>Erst nach Bestätigung ist 2FA aktiv.</CardDescription>
            </CardHeader>
            <CardContent>
              <ActionForm
                action={confirmTotp}
                submitLabel="2FA aktivieren"
                successMessage="2FA ist jetzt aktiv."
                errorMap={buildErrorMap(user.locale)}
              >
                <div>
                  <Label htmlFor="code">Code aus der Authenticator-App</Label>
                  <Input id="code" name="code" inputMode="numeric" maxLength={6} placeholder="123456" required />
                </div>
              </ActionForm>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
