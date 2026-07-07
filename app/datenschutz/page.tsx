import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";

export const dynamic = "force-dynamic";
export const metadata = { title: "Datenschutzerklärung" };

export default async function PrivacyPage() {
  const profile = await prisma.companyLegalProfile.findFirst();
  const controller = profile?.legalName ?? appConfig.legalCompanyName;
  const contact = profile?.privacyContactEmail ?? appConfig.contactEmail;

  const sections: { title: string; body: string }[] = [
    {
      title: "1. Verantwortlicher",
      body: `${controller}, ${profile?.address ?? ""}, ${profile?.country ?? ""}. Datenschutz-Kontakt: ${contact}.`,
    },
    {
      title: "2. Verarbeitete Daten",
      body: "Bei der Nutzung der Plattform verarbeiten wir: Stammdaten (Vorname, Nachname, E-Mail-Adresse, Unternehmen, Rolle), Schulungsdaten (Lektionsfortschritt, Testversuche, Testergebnisse, Zertifikate), Protokolldaten (Audit-Log administrativer Aktionen, optional IP-Adresse und Browser-Kennung bei Testversuchen) sowie technisch notwendige Cookies für die Anmeldung.",
    },
    {
      title: "3. Zwecke und Rechtsgrundlagen",
      body: "Die Verarbeitung erfolgt zur Durchführung der Schulung und Prüfung, zur Ausstellung und Verifikation von Zertifikaten, zur Dokumentation der Schulungsteilnahme für das jeweilige Unternehmen (Nachweiszwecke im Zusammenhang mit Art. 4 EU AI Act) sowie zum sicheren Betrieb der Plattform. Rechtsgrundlagen sind die Vertragserfüllung, berechtigte Interessen des Unternehmens an der Dokumentation von Schulungen sowie gegebenenfalls die Erfüllung rechtlicher Verpflichtungen.",
    },
    {
      title: "4. Auftragsverarbeitung",
      body: "Nutzt Ihr Arbeitgeber diese Plattform, verarbeiten wir Ihre Daten im Auftrag Ihres Unternehmens. Der Abschluss einer Vereinbarung zur Auftragsverarbeitung (AVV) zwischen dem Unternehmen und dem Betreiber ist vorgesehen; Vorlage auf Anfrage.",
    },
    {
      title: "5. Öffentliche Zertifikatsprüfung",
      body: "Die Verifikationsseite eines Zertifikats zeigt ausschließlich datensparsame Angaben: Name, Unternehmen, Kursname, Ausstellungsdatum, Zertifikatsnummer und Gültigkeitsstatus. Der Aufruf ist nur mit dem eindeutigen, nicht erratbaren Prüfcode möglich, der auf dem jeweiligen Zertifikat abgedruckt ist.",
    },
    {
      title: "6. Speicherdauer und Löschung",
      body: "Personenbezogene Daten werden gelöscht oder anonymisiert, sobald sie für die genannten Zwecke nicht mehr erforderlich sind. Bei Löschung eines Nutzerkontos werden personenbezogene Felder anonymisiert; Test- und Zertifikatshistorie kann in pseudonymisierter Form als Schulungsnachweis des Unternehmens erhalten bleiben.",
    },
    {
      title: "7. Ihre Rechte",
      body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Wenden Sie sich dazu an " + contact + ".",
    },
    {
      title: "8. Drittlandbezug",
      body: "Der Betreiber der Plattform hat seinen Sitz außerhalb des Europäischen Wirtschaftsraums (Volksrepublik China). Unternehmen sollten dies bei der datenschutzrechtlichen Bewertung berücksichtigen; geeignete Garantien (z. B. Standardvertragsklauseln) und Details zum Hosting-Standort werden im Rahmen der AVV dokumentiert.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Datenschutzerklärung</h1>
      {sections.map((s) => (
        <section key={s.title} className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{s.title}</h2>
          <p className="text-slate-700 dark:text-slate-300">{s.body}</p>
        </section>
      ))}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Hinweis: Diese Datenschutzerklärung ist eine Struktur-Vorlage und vor Produktivbetrieb durch
        eine qualifizierte Fachperson zu prüfen und an das konkrete Hosting- und Vertragskonstrukt anzupassen.
      </p>
    </article>
  );
}
