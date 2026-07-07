import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";

export type MailTemplateKey =
  | "invitation" | "verify_email" | "password_reset"
  | "reminder_open" | "exam_failed" | "certificate_ready"
  | "qm_feedback_reminder" | "qm_bad_feedback" | "qm_capa_reminder"
  | "qm_review_draft" | "qm_weekly_digest";

/**
 * Mail-Abstraktion: MAIL_PROVIDER=log (dev) schreibt in MailLog,
 * MAIL_PROVIDER=smtp kann in Produktion angebunden werden (siehe docs/DEPLOYMENT.md).
 */
export async function sendMail(
  template: MailTemplateKey,
  to: string,
  data: Record<string, string>,
  locale: string = appConfig.defaultLocale
): Promise<void> {
  const tpl = await prisma.emailTemplate.findFirst({
    where: { key: template, locale },
  }) ?? await prisma.emailTemplate.findFirst({
    where: { key: template, locale: appConfig.fallbackLocale },
  });

  if (!tpl) {
    console.error(`Mail-Template fehlt: ${template} (${locale})`);
    return;
  }

  let subject = tpl.subject;
  let body = tpl.body;
  for (const [key, value] of Object.entries(data)) {
    subject = subject.replaceAll(`{{${key}}}`, value);
    body = body.replaceAll(`{{${key}}}`, value);
  }

  const provider = process.env.MAIL_PROVIDER ?? "log";
  if (provider === "log") {
    await prisma.mailLog.create({
      data: { to, template, subject, body, status: "LOGGED" },
    });
    return;
  }

  // SMTP-Anbindung (prod): bewusst als klar dokumentierte Erweiterungsstelle.
  await prisma.mailLog.create({
    data: { to, template, subject, body, status: "LOGGED" },
  });
  console.warn("MAIL_PROVIDER=smtp konfiguriert, aber kein SMTP-Client installiert. Siehe docs/DEPLOYMENT.md.");
}
