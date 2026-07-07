import { getT } from "@/lib/i18n";

/** Server-seitig erzeugte Fehlercode->Text-Map für Client-Formulare. */
export function buildErrorMap(locale?: string): Record<string, string> {
  const t = getT(locale);
  return {
    "auth.passwordPolicy": t("auth.passwordPolicy"),
    "auth.emailExists": t("auth.emailExists"),
    "auth.inviteInvalid": t("auth.inviteInvalid"),
    "auth.resetInvalid": t("auth.resetInvalid"),
    "common.requiredField": t("common.requiredField"),
    "company.planLimitReached": t("company.planLimitReached", { limit: "" }),
  };
}
