# Kursinhalte & Didaktik

Drei Kurse (Stand 2026-07-07, V1.006):

1. **„KI-Kompetenz Basic nach Art. 4 EU AI Act"** — ca. 6 Unterrichtseinheiten,
   17 Module, 41 Lektionen, alle Pflicht. Quelle: `prisma/seed/content-lessons.ts`.
   Fragenpool: 154 (content-questions-1/2/3.ts).
2. **„KI-Verantwortliche & KI-Beauftragte im Unternehmen"** — ca. 8 Unterrichtseinheiten,
   10 Module, 37 Lektionen, alle Pflicht. Quelle: `prisma/seed/content-lessons-officer.ts`.
   Fragenpool: 84, davon 48 % Praxisfälle (content-questions-officer-1/2.ts).
3. **„Richtig Prompten — KI-Assistenten wirksam nutzen"** — ca. 6 Unterrichtseinheiten,
   10 Module, 32 Lektionen, alle Pflicht. Quelle: `prisma/seed/content-lessons-prompting.ts`.
   Fragenpool: 74, davon 43 % Praxisfälle (content-questions-prompting-1/2.ts).
   Bewusst prinzipienbasiert (keine Klick-Anleitungen, keine Versionsnummern),
   damit Inhalte nicht mit jedem Tool-Update altern.

## Didaktisches Schema jeder Lektion (alle Kurse)

1. Lernziel → 2. Erklärung in einfacher Sprache → 3. Praxisbeispiel (Arbeitsalltag)
→ 4. Risiko/Warnhinweis → 5. Merksatz → 6. Mini-Check (1–3 Verständnisfragen,
zählen nicht zur Prüfung).

Stil: menschlicher Praxisstil (du-Form) für Lerninhalte und Fragen;
Rechtstexte bleiben formal — siehe TEXT_REWRITE_LOG.md.

## Module Basic (17)

1. Einführung in künstliche Intelligenz (2 Lektionen)
2. Generative KI und Large Language Models (2)
3. Chancen und Grenzen von KI (2)
4. Halluzinationen, Quellenprüfung und Faktencheck (2)
5. Datenschutz und vertrauliche Informationen (2)
6. Urheberrecht und Nutzung von KI-Inhalten (2)
7. Bias, Diskriminierung und ethische Risiken (2)
8. EU AI Act Grundlagen (4 — inkl. Rollen Anbieter/Betreiber/Nutzer)
9. Art. 4 EU AI Act: KI-Kompetenz (3 — inkl. Grenzen des Zertifikats)
10. Sichere Anwendung im Unternehmen (3 — inkl. Prompt-Sicherheit/Injection)
11. Unternehmensrichtlinien und Dos & Don'ts (3 — inkl. interne KI-Richtlinie)
12. Informationssicherheit und KI-Risiken (3 — Kontosicherheit/2FA, Phishing &
    Deepfakes, Geschäftsgeheimnisse) **NEU**
13. Transparenz und Kennzeichnung (2 — inkl. Lektion transparenz-ki-inhalte,
    verschoben aus Modul 6, plus Kennzeichnung im Alltag) **NEU**
14. KI-Tools, Freigabeprozesse und Schatten-KI (3) **NEU**
15. KI-Vorfälle und Meldewege (3) **NEU**
16. Qualität, Feedback und Nachschulung (2) **NEU**
17. Abschlusstest und Zertifikat (1)

## Module KI-Verantwortliche & KI-Beauftragte (10)

1. Rolle und Auftrag der KI-Verantwortlichen (3 — Rolle, Kompetenzprofil, Mandat)
2. EU AI Act für Verantwortliche (4 — Risikoklassen, verbotene Praktiken,
   Hochrisiko-Pflichten, GPAI/Transparenz)
3. Anbieter, Betreiber & Co.: Rollen und Pflichten (3 — inkl. ungewollter
   Rollenwechsel, Einführer/Händler, Privatnutzungs-Grenze)
4. KI-Inventar und Risikobewertung (4 — Inventur, Methodik, DSFA/Grundrechte-FA,
   Pflege)
5. Art. 4 umsetzen: Schulungsprogramm (4 — Bedarf, Zielgruppen, Nachweise,
   Wirksamkeit)
6. KI-Richtlinie und Freigabeprozesse (4 — Erstellen, Freigabeprozess,
   Ausnahmen/Eskalationen, Leben)
7. Datenschutz und Informationssicherheit (4 — DSGVO-Schnittstellen, AVV/Drittland,
   TOMs, Betroffenenrechte/Art. 22)
8. Vorfallsmanagement und Meldepflichten (4 — Prozess, Fristen, Kommunikation,
   Lessons Learned)
9. Lieferanten- und Tool-Management (3 — Due Diligence, Verträge, Lebenszyklus/Exit)
10. Nachweisführung, Audit und Verbesserung (4 — Nachweissystem, Kennzahlen,
    Audits, Abschluss)

Lektions-Slugs des Officer-Kurses sind mit `off-` geprefixt (globale
Slug-Eindeutigkeit; Test erzwingt Kollisionfreiheit).

## Module Richtig Prompten (10)

1. Wie KI-Assistenten ticken — warum Prompts wirken (3 — Wahrscheinlichkeits-
   maschine, Modellwissen/Cutoff, Formulierungs-Hebel)
2. Die Prompt-Formel: Rolle, Ziel, Kontext, Format, Ton (4)
3. Iterieren: in zwei, drei Runden zum Ergebnis (3 — Rohfassung, Nachsteuern,
   Chat-Neustart/Kontextverschmutzung)
4. Kontext füttern: Dokumente, Beispiele, Stilvorlagen (3 — Quellenbindung,
   Few-Shot, Kontextfenster-Grenzen)
5. Textarbeit im Alltag (4 — E-Mails/heikle Post, Angebote, Protokolle/
   Berichte, Übersetzen/Kürzen/Vereinfachen)
6. Analysieren & Zusammenfassen (3 — Blickwinkel/Zitatpflicht, Tabellen &
   Zahlen, Vergleichen/Prüfen)
7. Kreativ- und Marketing-Prompts (3 — Substanz statt Floskeln, Bild-Prompts,
   Kennzeichnungs-Recap)
8. Tool-Kunde: ChatGPT, Copilot, Claude, Gemini & Co. (3 — Kriterien statt
   Marken, eingebettete Assistenten, Prinzipien übertragen)
9. Sicher prompten (3 — Datenschutz/Anonymisierung, Prompt-Injection,
   Halluzinations-Prüfsystem)
10. Die Prompt-Bibliothek fürs Team (3 — Dokumentieren, Pflegen/Versionieren,
    Abschluss-Checkliste + Test)

Lektions-Slugs mit `pr-` geprefixt; Test erzwingt Präfix und
Kollisionsfreiheit gegen beide Bestandskurse. Fragen-Kategorien: PR_GRUNDLAGEN,
PR_FORMEL, PR_ITERATION, PR_KONTEXT, PR_TEXTARBEIT, PR_ANALYSE, PR_KREATIV,
PR_TOOLS, PR_SICHERHEIT, PR_BIBLIOTHEK (Anzeigenamen in lib/i18n/de.ts).
Modulbilder: public/modules/pr-<slug>.png (liefert Sascha später; Seiten
laufen ohne Bild).

## Zertifikate

Zertifikatstitel je Kurs (config/app.ts → courseCertificateTitleKeys, i18n
certificate.title / certificate.titleOfficer / certificate.titlePrompting).
Disclaimer verneint ausdrücklich staatliche Zulassung, behördliche
Zertifizierung, EU-Akkreditierung und ISO-Zertifizierung.

## Pflege

- Superadmin bearbeitet Lektionstexte unter `/admin/lessons/[id]` (Wording-Guard aktiv).
- Änderungen erhöhen `Lesson.version` und landen im AuditLog; Kursversionen im
  ContentRevision-Register (/admin/versions, aktuell V1.004).
- Inhalts-Updates in bestehenden Datenbanken: `npm run db:init && npm run db:seed`
  (Fragen werden je Kurs nur bei leerem Pool eingespielt).
- Neue Sprachen: `LessonTranslation`-Datensätze je locale ergänzen (kein Codeumbau).
