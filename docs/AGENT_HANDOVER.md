# Agent Handover

## Projektziel
Multi-Tenant B2B-SaaS „KI-Kompetenz Campus": Schulung → Test (30 Fragen, 75 %) →
privater Schulungsnachweis (PDF + QR-Verify) → Firmen-Reporting.
KEINE staatlich/behördlich klingenden Aussagen (Wording-Guard erzwingt das).
Verbindliche Regeln: CLAUDE.md (Schreibstil, Recht, Versionierung, No-Touch).

## Git & Verifikation (WICHTIG)
- Repo: https://github.com/Chengdu-2026/ki-campus (main). Sascha pusht lokal.
- Die Cowork-Sandbox sieht Projektdateien teils ABGESCHNITTEN (Sync-Bug).
  Verifikation deshalb IMMER über frischen Git-Klon/Pull in der Sandbox,
  nie über den Mount. Datei-Edits mit Read/Write/Edit (Host) sind zuverlässig.
- Sandbox-Eigenheiten: prisma generate braucht Dummy-Engine-Env
  (PRISMA_SCHEMA_ENGINE_BINARY/PRISMA_QUERY_ENGINE_LIBRARY/…_BINARY auf
  Dummy-Datei + PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1), binaries.prisma.sh
  ist gesperrt. Nach npm-Installationsabbrüchen native Pakete prüfen
  (@next/swc, @prisma/client waren einmal trunkiert → Bus error/Typfehler).

## Aktueller Stand (2026-07-07 Nacht, nach V1.006 — Parallel-Session Teil 4)
Funktioniert: Registrierung, Einladungen, Login/2FA, Passwort-Reset, Lernpfad,
Prüfungs-Gate, Test mit Resume, Auswertung mit Kategorien-Analyse, adaptive
Nachschulung, Übungsmodus, automatische Zertifikate (PDF+Hash, QR-Verify,
Widerruf), Firmen-Dashboard, CSV-Export, Superadmin-CRUD (lesend + Kurs/Fragen),
AuditLog, QM-Modul, Cron, Versionsregister, Dark Mode, i18n.
DREI Kurse: Basic 17 Module / 41 Lektionen / 154 Fragen · KI-Verantwortliche
10 Module / 37 Lektionen / 84 Fragen (Slugs off-*) · Richtig Prompten
10 Module / 32 Lektionen / 74 Fragen (Slugs pr-*). Gesamt 312 Fragen.

## Neu in V1.006 (Parallel-Session „Teil 4", 2026-07-07 Nacht)
- Kurs 3 „Richtig Prompten" (Slug richtig-prompten, 6 UE, Flatrate inklusive):
  content-lessons-prompting.ts + content-questions-prompting-1/2.ts,
  10 PR_-Kategorien mit Anzeigenamen, certificate.titlePrompting,
  10 Modul-Detailtexte, Plan-/Preistexte „Alle 3 Kurse", 11 neue Tests.
  Modulbilder pr-* fehlen noch (Sascha liefert; Seiten laufen ohne Bild).
- Roadmap-Seite /ki-kompetenz-review (GEPLANTES Review-/Auffrischungsmodul):
  Feature-Flag-System config featureFlags (planned/beta/live), i18n
  feature.review.*, Footer-Link, Middleware-Public-Path. Regeln für solche
  Seiten: docs/MARKETING_PAGES.md — NIE Verfügbarkeit/ISO-Konformität
  behaupten, solange nicht gebaut.
- TODO „Jährliches KI-Kompetenz-Review & Auffrischungssystem" vollständig
  spezifiziert in docs/ROADMAP.md Abschnitt 1 (Empfehlungslogik, Antwortzeit-
  Grenzwerte, Kategorie-Scores 70/60/50, Wiederholungsmodus, Auffrischungstest,
  Admin-Ampel, jährliches Management-Review, 4 Crons, Modelle
  QuestionPerformance/CompetenceRefreshRecommendation/AnnualCompetenceReview,
  Akzeptanzkriterien) + Einträge in TODO/QM_SYSTEM/QM_WORKFLOW/
  MANAGEMENT_REVIEW/CRON_JOBS. Noch NICHT bauen ohne expliziten Auftrag.
- ACHTUNG Merge: Diese Session lief parallel zur Superadmin-Session (Teil 3).
  Berührpunkte: config/app.ts, lib/i18n/de.ts, prisma/seed/index.ts,
  middleware.ts, TODO/HANDOVER/DAILY_LOG/CHANGELOG. Beim Zusammenführen:
  Versionslabel abstimmen (diese Session = V1.006).

## Neu in V1.005 (dieser Auftrag)
- Öffentliche Modul-Detailseiten /schulung/[modulSlug] (alle 27 Module):
  Praxis-Erklärtexte + Alltagsbeispiele in lib/module-details.de.ts (Key=Slug),
  Lektions-Teaser (volle Inhalte hinter Login), Abkürzungs-Glossar
  lib/glossary.ts (Erkennung über Überschriften), BackButton, Bild je Modul
  aus public/modules/<slug>.png (optionalImage, Seite läuft auch ohne Bild).
- 27 Modulbilder zugeordnet (17 Basic nummeriert, 10 Officer).
- Homepage: Kurse als nummerierte <details>-Boxen, default eingeklappt;
  Kacheln verlinken auf Detailseiten. /schulung: Kurse nummeriert, Titel+Link
  je Modul. Middleware-Fix: /schulung(/**) öffentlich.
- Vorlesen (ReadAloud) auf Homepage, /schulung, Detailseiten (war: nur
  Lektionen); nie Autoplay. Promo-Box „Lieber hören statt lesen?".
- Kategorien-Fix: 15 fehlende Anzeigenamen in lib/i18n/de.ts → categories.
- Footer zeigt Inhaltsstand (footer.contentVersion ← config
  contentVersionLabel = V1.005; Seed legt ContentRevision V1.005 an).
- Plan-Features Nachprüfung klarer formuliert (Betrag aus config).
- Tests 81/81 · tsc 0 Fehler · next build grün (verifiziert am Git-Stand;
  letzte Runde einklappbare Kurse/Middleware nach Push erneut prüfen).

## Wichtige Architekturentscheidungen
Siehe ARCHITECTURE.md. Kurz: Next 15 App Router + Server Actions · Prisma 6
engineType "client" + libsql-Adapter · Translations in DB · Lazy-Prisma-Init
(Build DB-frei) · getDefaultCourse() = ältester publizierter Kurs.
Öffentliche Modul-Erkärtexte bewusst NICHT in der DB, sondern in
lib/module-details.de.ts (Marketing-Schaufenster, versioniert über Git).

## NICHT anfassen ohne Prüfung
prisma/schema.prisma (init.sql synchron!) · lib/auth.ts · middleware.ts ·
lib/tenancy.ts · lib/certificate/number.ts + issue.ts · lib/wording-guard.ts
+ Test · config/app.ts · lib/i18n/de.ts → certificate.disclaimer.

## Entwicklungsregeln
Keine Dummy-Buttons · keine hardcodierten Texte (t()/Translation-Tabellen) ·
assertCompanyScope · Admin-Mutationen ins AuditLog · Tonalität je Bereich
(TEXT_REWRITE_LOG.md) · Versionierung laut CLAUDE.md (Frage-Version++,
ContentRevision, config contentVersionLabel, Footer) · nach jedem Arbeitspaket
npm test + npm run build grün, Doku pflegen, Commit von Sascha pushen lassen.

## Bekannte Einschränkungen
- Lokale DB des Eigentümers braucht `npm run db:init && npm run db:seed`
  (sonst alte Fragenzahlen/Plan-Texte; ChatGPT-Review sah deshalb 124 statt 154).
- Nachprüfung €99/Jahresrabatt: nur Anzeige/Prozess, keine Online-Zahlung.
- Übungsmodus nur Basic-Kurs (Kursauswahl fehlt).
- SMTP nur Log, AGB-Platzhalter, Trainer-UI minimal.
- ExamAnswer speichert Frage-Version zum Antwortzeitpunkt NICHT (Kurs-Snapshot
  am Zertifikat reicht für Audits; optionaler Schema-Folgeauftrag).
- Foto Basic-Modul 1 (einfuehrung-ki.png) trägt fälschlich den Untertitel des
  Officer-Kurses „Rolle und Auftrag der KI-Verantwortlichen" — Bild bei
  Gelegenheit neu generieren.
- Profilfoto bewusst nicht gebaut (DATA_PROTECTION_TODO.md).

## NÄCHSTER AGENT-AUFTRAG: Superadmin-Verwaltung V2 + Tester-Freigabe
1. Firmen bearbeiten (Superadmin): Stammdaten-Formular, planKey-Wechsel
   (Basic/Business/Enterprise), Status ACTIVE/INACTIVE — alles per Server
   Action mit AuditLog-Eintrag.
2. Benutzer bearbeiten (Superadmin): Rolle ändern, Status, Name/E-Mail —
   auditiert; keine Mandanten-Verschiebung (bewusst).
3. Tester-Freigabe: Company.isTest Boolean + testExpiresAt (Schemaänderung —
   init.sql synchron halten!). Konsequenzen einbauen: (a) Zertifikate von
   Test-Firmen tragen sichtbar „TESTZUGANG — kein gültiger Nachweis" und
   Verify-Seite zeigt Status „Test", (b) Test-Firmen fliegen aus QM-Statistik,
   Bestehensquoten, Feedback-Auswertung, (c) Cron deaktiviert abgelaufene
   Testzugänge, (d) Banner „Testzugang bis {Datum}" im UI der Test-Firma.
4. i18n, Tests (inkl. Tester-Zertifikat-Kennzeichnung), Doku, Versionierung.

## PARALLEL-AUFTRAG: Kurs 3 „Richtig Prompten" — ERLEDIGT (V1.006, Teil 4)
Umgesetzt wie spezifiziert (10 Module / 32 Lektionen / 74 Fragen, pr-Präfix,
seedCourse, Zertifikatstitel, Modul-Detailtexte, Tests, Versionierung).
Offen daraus: Modulbilder pr-* (Sascha), en-Übersetzung wie bei allen Kursen.
Ursprüngliche Entscheidungen: SOFORT bauen · in der FLATRATE enthalten
(kein Add-on) · Führungskräfte-Kurs nur als Grobkonzept hinten anstellen.
Spezifikation: 10 Module / ~30–35 Lektionen im bewährten Muster
(SeedModule/SeedLesson aus prisma/seed/content-lessons.ts; Praxisstil laut
CLAUDE.md; Mini-Checks; ~70–80 Fragen mit hohem Praxisfall-Anteil, eigene
Prüfung 30 Fragen / 75 %):
1. Wie KI-Assistenten ticken — warum Prompts wirken (Kontext, Grenzen)
2. Die Prompt-Formel: Rolle, Ziel, Kontext, Format, Ton
3. Iterieren: in 2–3 Runden zum brauchbaren Ergebnis
4. Kontext füttern: Dokumente, Beispiele, Stilvorlagen
5. Textarbeit im Alltag: E-Mails, Angebote, Protokolle, Berichte
6. Analysieren & Zusammenfassen: lange Dokumente, Tabellen, Zahlen
7. Kreativ- und Marketing-Prompts inkl. Bild-Prompts (+ Kennzeichnungs-Recap)
8. Tool-Kunde: ChatGPT, Copilot, Claude, Gemini — Unterschiede & Prinzipien
9. Sicher prompten: Datenschutz-Recap, Prompt-Injection, Halluzinations-Kontrolle
10. Prompt-Bibliothek fürs Team + Abschlusstest
Wichtig: prinzipienbasiert schreiben (keine Screenshot-Klickanleitungen —
Inhalte altern sonst schnell); Slug-Präfix z. B. `pr-` gegen Kollisionen;
seedCourse()-Muster nutzen; Zertifikatstitel-Key ergänzen
(config courseCertificateTitleKeys); Modul-Detailtexte in
lib/module-details.de.ts ergänzen; Modulbilder liefert Sascha später
(Seiten laufen ohne Bild); Tests analog der bestehenden Kurspool-Suites;
ContentRevision + contentVersionLabel hochziehen.

## Danach (in dieser Reihenfolge)
1. PRAXISTEST beider Kurse (ChatGPT-Testplan, von Sascha freigegeben):
   kompletter Teilnehmer-Durchlauf Basic + Officer, 30 Zufallsfragen je Kurs
   auf Qualität prüfen, Admin-Flows, Mandantentrennung (Firma A/B),
   Rechtsbegriff-Scan; Ergebnisse in docs/TEST_REPORT_BASIC_COURSE.md,
   TEST_REPORT_RESPONSIBLE_COURSE.md, QUESTION_QUALITY_CHECK.md — vorhandene
   Doku (QUALITY_CHECK.md) erweitern statt duplizieren.
2. Fragen-Ergänzungspaket (Grok-Review, ~12–15 Fragen): Übergangsfristen/
   Anwendungsphasen AI Act, ungewollter Rollenwechsel/substantial modification
   (vertieft), Proxy-Diskriminierung (z. B. Postleitzahl), DSGVO/DSFA-
   Schnittstellen. Frage-Versionierung beachten.
3. Online-Zahlung Nachprüfung (Stripe) + automatische Freischaltung.
4. E2E-Tests (Playwright) für 3 Kernflows; Komplett-Export (ZIP) je Firma;
   DSGVO-Self-Service-Export; Trainer-V2/Enterprise-API.
