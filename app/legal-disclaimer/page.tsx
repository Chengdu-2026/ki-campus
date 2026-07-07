import { appConfig } from "@/config/app";

export const metadata = { title: "Rechtlicher Hinweis" };

export default function LegalDisclaimerPage() {
  return (
    <article className="prose-custom mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Rechtlicher Hinweis</h1>

      <section className="space-y-3 text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Keine Rechtsberatung</h2>
        <p>
          Die Inhalte dieser Plattform vermitteln Grundlagenwissen zum verantwortungsvollen Umgang mit
          künstlicher Intelligenz und zur KI-Kompetenzpflicht nach Art. 4 der Verordnung (EU) 2024/1689
          (EU AI Act). Sie stellen keine Rechtsberatung dar und ersetzen keine rechtliche Prüfung des
          konkreten Einzelfalls durch qualifizierte Fachpersonen.
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Kein behördliches Zertifikat</h2>
        <p>
          Das über diese Plattform ausgestellte Zertifikat ist ein privater Schulungs- und
          Kompetenznachweis. Es handelt sich ausdrücklich nicht um eine staatliche Zulassung, nicht um
          eine behördliche Zertifizierung und nicht um eine EU-Akkreditierung. Es besteht kein
          gesetzlich vorgeschriebenes Zertifizierungsverfahren für KI-Kompetenz nach Art. 4 EU AI Act.
          Die vollständige Regelung zum Rechtscharakter des Zertifikats finden Sie in unseren{" "}
          <a className="underline" href="/agb">Allgemeinen Geschäftsbedingungen</a>.
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Keine Garantie vollständiger Compliance</h2>
        <p>
          Die Absolvierung der Schulung unterstützt die Dokumentation der KI-Kompetenz, garantiert
          jedoch keine vollständige Erfüllung aller rechtlichen Pflichten. Ob und in welchem Umfang
          Pflichten aus dem EU AI Act oder anderen Rechtsvorschriften bestehen, hängt vom konkreten
          Einsatzkontext der KI-Systeme im jeweiligen Unternehmen ab.
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Verantwortung der Unternehmen</h2>
        <p>
          Unternehmen bleiben selbst verantwortlich für die Bewertung ihres Einsatzkontexts, die
          Risikobewertung ihrer KI-Anwendungen, die Erstellung und Durchsetzung interner Richtlinien
          sowie die laufende Einhaltung der für sie geltenden Vorschriften.
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Aussteller</h2>
        <p>
          Aussteller des Schulungsnachweises: {appConfig.certificateIssuer} ({appConfig.legalCompanyNameZh}).
          Kontakt: {appConfig.contactEmail}. Details siehe Impressum.
        </p>
      </section>
    </article>
  );
}
