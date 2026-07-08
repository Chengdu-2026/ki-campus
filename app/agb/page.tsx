import { appConfig } from "@/config/app";

export const metadata = { title: "AGB" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Allgemeine Geschäftsbedingungen</h1>
      <section className="space-y-3 text-slate-700 dark:text-slate-300">
        <h2 className="text-lg font-semibold text-brand-900 dark:text-white">§ Rechtscharakter des Zertifikats</h2>
        <p>
          Das über diese Plattform ausgestellte Zertifikat ist ein privater Schulungs- und
          Kompetenznachweis eines privaten Bildungsanbieters. Es ist kein akkreditiertes und kein
          behördliches Dokument, keine staatliche Zulassung und keine EU-Akkreditierung. Ein
          gesetzlich vorgeschriebenes Zertifizierungsverfahren für KI-Kompetenz nach Art. 4 der
          Verordnung (EU) 2024/1689 besteht nicht; das Zertifikat dient der Dokumentation der vom
          Unternehmen ergriffenen Schulungsmaßnahmen.
        </p>
        <h2 className="text-lg font-semibold text-brand-900 dark:text-white">Weitere Bestimmungen</h2>
        <p>
          Die vollständigen Allgemeinen Geschäftsbedingungen für die Nutzung dieser Plattform werden
          derzeit juristisch finalisiert und an dieser Stelle veröffentlicht.
        </p>
        <p>
          Bis dahin gelten die im Rahmen der Registrierung getroffenen individuellen Vereinbarungen.
          Fragen zu Vertragsbedingungen richten Sie bitte an{" "}
          <a className="text-brand-700 underline dark:text-accent-400" href={`mailto:${appConfig.contactEmail}`}>
            {appConfig.contactEmail}
          </a>.
        </p>
      </section>
    </article>
  );
}
