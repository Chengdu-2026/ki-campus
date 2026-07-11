/**
 * Re-Zertifizierung / jährliche Verlängerung — reine Erinnerungs-Fenster-Logik.
 *
 * Bewusst OHNE Prisma/DB und ohne Seiteneffekte, damit unit-testbar (wie
 * `lib/review-schedule.ts`). Die Cron-Route reicht bereits geladene Zertifikatsdaten
 * herein und verschickt/protokolliert das Ergebnis (SMTP noch nicht produktiv →
 * zunächst Reporting-Flag/Entwurf).
 *
 * Eigentümer-Entscheidung (2026-07-08): Erinnerung an Teilnehmer UND Arbeitgeber,
 * ein konfigurierbarer Vorlauf vor `validUntil` (Default 6 Wochen).
 */

export const DEFAULT_RECERT_LEAD_DAYS = 42; // 6 Wochen vor Ablauf

export type RecertRecipientRole = "PARTICIPANT" | "EMPLOYER";

export interface RecertCertInput {
  certificateNumber: string;
  /** Ablaufdatum; null = unbefristet → nie eine Erinnerung. */
  validUntil: Date | null;
  /** VALID | REVOKED (nur VALID wird erinnert). */
  status: string;
  participantName: string;
  participantEmail: string | null;
  companyName: string;
  /** E-Mail des Firmen-Admins/Arbeitgebers; null = kein Arbeitgeber-Empfänger. */
  employerEmail: string | null;
}

export interface RecertRecipient {
  role: RecertRecipientRole;
  name: string;
  email: string;
}

export interface RecertReminder {
  certificateNumber: string;
  validUntil: Date;
  daysUntilExpiry: number;
  recipients: RecertRecipient[];
}

/**
 * Ganze Tage zwischen zwei Daten. Bewusst über UTC-Datumsfelder gerechnet, damit
 * das Ergebnis unabhängig von der Server-Zeitzone ist (sonst kippen Zeiten nahe
 * Mitternacht UTC auf den Vor-/Folgetag → Off-by-one).
 */
export function daysUntil(target: Date, today: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const t = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const n = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.round((t - n) / MS_PER_DAY);
}

/**
 * Liefert die fälligen Verlängerungs-Erinnerungen: alle gültigen Zertifikate, deren
 * `validUntil` innerhalb von [heute, heute + leadDays] liegt (nicht bereits abgelaufen,
 * nicht widerrufen). Empfänger: Teilnehmer + Arbeitgeber, sofern E-Mail vorhanden.
 * Sortiert nach Ablauf (frühester zuerst).
 */
export function buildRecertReminders(
  certs: RecertCertInput[],
  opts: { today: Date; leadDays?: number },
): RecertReminder[] {
  const leadDays = opts.leadDays ?? DEFAULT_RECERT_LEAD_DAYS;
  const reminders: RecertReminder[] = [];

  for (const cert of certs) {
    if (cert.status !== "VALID") continue;
    if (!cert.validUntil) continue;

    const days = daysUntil(cert.validUntil, opts.today);
    // Fenster: ab heute (0) bis leadDays vor Ablauf. Bereits abgelaufen (< 0) fällt raus.
    if (days < 0 || days > leadDays) continue;

    const recipients: RecertRecipient[] = [];
    if (cert.participantEmail) {
      recipients.push({ role: "PARTICIPANT", name: cert.participantName, email: cert.participantEmail });
    }
    if (cert.employerEmail) {
      recipients.push({ role: "EMPLOYER", name: cert.companyName, email: cert.employerEmail });
    }
    if (recipients.length === 0) continue; // niemand erreichbar → keine Erinnerung

    reminders.push({
      certificateNumber: cert.certificateNumber,
      validUntil: cert.validUntil,
      daysUntilExpiry: days,
      recipients,
    });
  }

  return reminders.sort((a, b) => a.validUntil.getTime() - b.validUntil.getTime());
}
