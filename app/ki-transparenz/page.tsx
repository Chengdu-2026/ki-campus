import { appConfig } from "@/config/app";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "KI-Transparenz" };

export default function AiTransparencyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white">KI-Transparenz</h1>

      <section className="space-y-3 text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Einsatz von KI bei der Erstellung dieser Plattform</h2>
        <p>
          Die Lerninhalte, Prüfungsfragen und Hilfetexte dieser Plattform wurden mit Unterstützung von
          künstlicher Intelligenz (KI) erstellt. Dieser Hinweis dient der Transparenz gegenüber
          Nutzerinnen und Nutzern im Sinne der Transparenzgrundsätze der Verordnung (EU) 2024/1689
          (EU AI Act).
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Fachliche Prüfung und Verantwortung</h2>
        <p>
          Die deutschsprachigen Kerninhalte (Lerninhalte, Prüfungsfragen und zentrale
          Plattformtexte) werden vor Veröffentlichung intern fachlich geprüft und freigegeben.
          Verantwortlich für die Inhalte:
        </p>
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          {appConfig.contentResponsiblePerson}<br />
          {appConfig.contentResponsibleAddress}<br />
          {appConfig.legalCompanyName} ({appConfig.legalCompanyNameZh})<br />
          {appConfig.contactEmail}
        </p>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Was das für Sie bedeutet</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Inhalte werden redaktionell verantwortet und bei Bedarf aktualisiert.</li>
          <li>Fehler können Sie jederzeit an {appConfig.contactEmail} melden — wir prüfen und korrigieren.</li>
          <li>Die Plattform selbst trifft keine automatisierten Entscheidungen über Personen; Testauswertungen folgen festen, dokumentierten Regeln (Punkteanzahl, Bestehensgrenze).</li>
        </ul>

        <h2 className="text-xl font-semibold text-brand-900 dark:text-white">Kennzeichnung am Zertifikat</h2>
        <p>
          Jedes ausgestellte Zertifikat enthält einen Hinweis auf diese Transparenzseite. Stand dieser
          Erklärung: {formatDate(new Date())}.
        </p>
      </section>
    </article>
  );
}
