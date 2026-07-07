# Agent Handover

## Projektziel
Multi-Tenant B2B-SaaS „KI-Kompetenz Campus": Schulung → Test (30 Fragen, 75 %) →
privater Schulungsnachweis (PDF + QR-Verify) → Firmen-Reporting.
KEINE staatlich/behördlich klingenden Aussagen (Wording-Guard erzwingt das).

## Aktueller Stand (2026-07-07, nach Kurs-Ausbau)
Funktioniert: Registrierung (Firma+Admin), Einladungen, Login/Logout, 2FA,
Passwort-Reset, Lernpfad mit Fortschritt/Mini-Checks, Prüfungs-Gate, Test mit
Resume + serverseitiger Speicherung, Auswertung mit Kategorien-Analyse, adaptive
Nachschulung, Übungsmodus (4 Modi), automatische Zertifikatsausstellung, PDF mit
Hash, QR-Verifikation, Widerruf, Firmen-Dashboard mit Lückenanalyse, CSV-Export,
Superadmin-CRUD, AuditLog, QM-Modul (ISO-9001-Logik, keine Zertifizierung durch
akkreditierte Stellen), Cron-Routen, Versionsregister, Dark Mode, i18n-Struktur.

## Neu (2026-07-07, dieser Auftrag)
- **Zwei Kurse:** Basic jetzt 17 Module / 41 Lektionen / 154 Fragen
  (neu: Informationssicherheit, Transparenz & Kennzeichnung mit verschobener
  Lektion transparenz-ki-inhalte, Tools/Freigabe/Schatten-KI, Vorfälle &
  Meldewege, Qualität/Feedback). Neuer Kurs `ki-verantwortliche-beauftragte`:
  10 Module / 37 Lektionen (Slug-Prefix `off-`) / 84 Fragen (48 % Praxisfälle).
  Seeds: content-lessons(-officer).ts, content-questions-1/2/3 + officer-1/2;
  seedCourse()-Refactor in prisma/seed/index.ts. ContentRevision V1.004.
- **Zertifikate:** Titel je Kurs (config courseCertificateTitleKeys →
  certificate.title / certificate.titleOfficer); Disclaimer verneint zusätzlich
  ISO-Zertifizierung (formal, juristischer Ton unverändert).
- **/courses** = echte Kursübersicht mit Empfehlungstexten; **/schulung** zeigt
  beide Kurse öffentlich komplett (Transparenz vor Buchung).
- **Nachprüfungs-Modell:** Übungsmodus unbegrenzt, 3 Testversuche je Kurs
  inklusive, danach € 99 je Teilnehmer (config examRetakeFeeEur) → schaltet
  weitere Versuche frei. Aktuell manuelle Freischaltung (auditierter
  Versuchs-Reset durch Firmen-Admin/Superadmin), Online-Zahlung = TODO.
  Jahresrabatt-Anzeige: Basic −10 %, Business −15 % (annualDiscountPercent).
- Tests: 81 grün (davon neue Suites für beide Kurspools). Wording-Guard
  unverändert (nicht angefasst — „ISO-Zertifizierung" kollidiert nicht mit der
  Verbotsliste, Verneinungen sind abgedeckt).
- Tonalitäts-Regeln dokumentiert in TEXT_REWRITE_LOG.md: Praxisstil nur für
  Lern-/Marketing-Texte, Rechtstexte bleiben formal.

## Wichtige Architekturentscheidungen
Siehe ARCHITECTURE.md. Kurz: Next 15 App Router + Server Actions · Prisma 6
engineType "client" + libsql-Adapter (Rust-frei) · Translations in DB ·
verifyCode ≠ certificateNumber · Lazy-Prisma-Init (Build ist DB-frei).
Kurs-Auflösung: getDefaultCourse() = ältester publizierter Kurs (Basic);
Übungsmodus arbeitet V1 auf Basic (TODO: Kursauswahl).

## NICHT anfassen ohne Prüfung
- `prisma/schema.prisma` (Migrationsfolgen, init.sql synchron halten!)
- `lib/auth.ts`, `middleware.ts`, `lib/tenancy.ts` (Sicherheitskern)
- `lib/certificate/number.ts` (Nummern-/Code-Logik) und `issue.ts`
  (Kein-Zertifikat-ohne-Bestehen-Invariante)
- `lib/wording-guard.ts` + zugehöriger Test (Rechts-Gate)
- `lib/i18n/de.ts → certificate.disclaimer` (juristisch fixierter Text)
- `config/app.ts` (zentrale Konfiguration — nichts in Komponenten duplizieren)

## Entwicklungsregeln
Keine Dummy-Buttons · keine hardcodierten Texte (immer t()/Translation-Tabellen) ·
keine Mandanten-Datenlecks (assertCompanyScope) · keine irreführenden Rechtsbegriffe
(npm test schlägt fehl) · keine Zertifikate ohne bestandenen Test · jede Admin-
Mutation ins AuditLog · Tonalität je Bereich beachten (TEXT_REWRITE_LOG.md) ·
nach jedem Arbeitspaket DAILY_LOG/CHANGELOG/TODO pflegen.

## Tests & Build
`npm test` (81 Tests, inkl. Repo-weitem Wording-Scan) · `npm run build`
(prebuild führt prisma generate aus). Seed: `npm run db:init && npm run db:seed`
— Achtung: Inhalts-Updates in bestehenden DBs brauchen den frischen Seed
(Fragen werden je Kurs nur bei leerem Pool eingespielt).

## Bekannte Einschränkungen
- **BUG (sichtbar, zuerst fixen):** Die Homepage (app/page.tsx, Abschnitt
  „Die Schulung im Überblick") lädt `prisma.module.findMany()` OHNE Kursfilter —
  seit dem zweiten Kurs erscheinen 27 Module beider Kurse gemischt und mit
  doppelten Nummern (2, 3, 3, 4, 4 …). Fix: nach Kurs gruppieren (zwei
  Abschnitte mit Kurstitel) oder auf der Homepage nur den Basic-Kurs zeigen und
  auf /schulung verlinken (dort ist die Trennung bereits korrekt).
- Nachprüfungsgebühr und Jahresrabatt: nur Anzeige/Prozess, keine
  Online-Zahlung (manuelle Rechnung + auditierter Versuchs-Reset)
- Übungsmodus nur Basic-Kurs (Kursauswahl fehlt)
- SMTP nur als Log, AGB-Platzhalter, Trainer-UI minimal (QUALITY_CHECK.md)
- Profilfoto: bewusst NICHT gebaut — nur Konzept in DATA_PROTECTION_TODO.md
  (Foto im Account möglich, auf Zertifikat nur optional per Firmen-Einstellung
  mit Einwilligung; Datenschutz/Löschkonzept vorher klären)

## NÄCHSTER AGENT-AUFTRAG
„1. BUGFIX zuerst: Homepage-Modulübersicht (app/page.tsx) mischt seit dem
zweiten Kurs alle 27 Module beider Kurse in einem Raster (findMany ohne
Kursfilter, doppelte Nummern). Nach Kurs trennen: zwei klar beschriftete
Abschnitte (Basic 17 / KI-Verantwortliche 10) oder Homepage zeigt nur Basic
plus prominenten Link auf /schulung.
2. Öffentliche Modul-Detailseiten: Jede Modul-Box (Homepage + /schulung) öffnet
/schulung/[modulSlug] im menschlichen Praxisstil (siehe TEXT_REWRITE_LOG.md) mit
ausführlicher Modul-Erklärung, Abkürzungs-Glossar (KI, LLM, GPAI, Bias, DSGVO,
EU AI Act, 2FA, AVV …) überall dort, wo Abkürzungen in Überschriften vorkommen,
Zurück-Button zur Ausgangsseite und einem Bild je Modul. Fotos liegen bereits in
public/images/ (7 Themenbilder „ChatGPT Image 7. Juli 2026, 03_10_2x (1–7).png")
— thematisch zuordnen, nach public/modules/<slug>.png umbenennen, nur anzeigen
wenn Datei existiert.
3. Vorlesefunktion je Lektion (Web Speech API, clientseitig, kein Anbieter) und
Bewerbung des Features auf Homepage/Schulungsseite.
Danach: i18n, Tests, Doku (DAILY_LOG/CHANGELOG/TODO) pflegen; npm test und
npm run build müssen grün sein."

## Weitere sinnvolle Folgeaufträge
1. Online-Zahlung Nachprüfung € 99 (Stripe) + automatische Versuchs-Freischaltung;
   Jahresabrechnung mit Rabatten.
2. Komplett-Export der Nachweise (ZIP) je Firma vor Kündigung.
3. E2E-Tests (Playwright) für die 3 Kernflows; Mandantentrennung im Browser.
4. Self-Service-Datenexport (DSGVO) je Nutzer als JSON.
5. Trainer-Rolle V2, Enterprise-API (API-Keys je Firma).
