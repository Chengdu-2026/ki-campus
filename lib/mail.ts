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

  if (provider === "smtp") {
    // SMTP-Versand (prod): Konfiguration ausschließlich über .env —
    // SMTP_HOST, SMTP_PORT (587=STARTTLS / 465=TLS), SMTP_USER, SMTP_PASS,
    // MAIL_FROM (z. B. "KI-Kompetenz Campus <info@ki-nachweis.at>").
    // Details: docs/DEPLOYMENT.md (inkl. SPF/DKIM-Pflicht für Zustellbarkeit).
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.MAIL_FROM ?? `${appConfig.appName} <${appConfig.contactEmail}>`;
    if (!host || !user || !pass) {
      await prisma.mailLog.create({ data: { to, template, subject, body, status: "FAILED" } });
      console.error("MAIL_PROVIDER=smtp, aber SMTP_HOST/SMTP_USER/SMTP_PASS fehlen in .env — Mail nicht versendet.");
      return;
    }
    try {
      // Dynamischer Import: hält den Client aus Build/Edge-Bundles heraus.
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT ?? 587);
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // 465 = implizites TLS; 587 = STARTTLS
        auth: { user, pass },
      });
      // Optional MAIL_REPLY_TO: Versand von noreply@, Antworten landen bei info@.
      const replyTo = process.env.MAIL_REPLY_TO || undefined;
      await transporter.sendMail({ from, to, subject, text: body, replyTo });
      await prisma.mailLog.create({ data: { to, template, subject, body, status: "SENT" } });
    } catch (e) {
      await prisma.mailLog.create({ data: { to, template, subject, body, status: "FAILED" } });
      console.error("SMTP-Versand fehlgeschlagen:", e);
    }
    return;
  }

  // Unbekannter Provider: sicherer Fallback auf Log.
  await prisma.mailLog.create({ data: { to, template, subject, body, status: "LOGGED" } });
  console.warn(`Unbekannter MAIL_PROVIDER "${provider}" — Mail nur geloggt. Siehe docs/DEPLOYMENT.md.`);
}
