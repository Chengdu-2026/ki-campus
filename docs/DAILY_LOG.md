# Tagesabschluss

## Datum
2026-07-11 abends (Teil 9: Tagesabschluss-Push + Masterplan Produktlinien)

## Heute erledigt
- **Tagesabschluss committet + gepusht** (`f319c08`): Sicherheits-Konzept S1–S5,
  Kurs S1 komplett gegliedert + Musterlektion 9.1, Übergabe Teil 9. Push über Refs
  verifiziert (main == origin/main); Commit enthielt nur A-Einträge (nichts überschrieben).
- **4 Entscheidungen Produktlinie Sicherheit** nach Berater-Feedback + Rückfragen:
  Scope = Unterweisungs-Compliance OHNE EHS-SaaS · Dachmarke = Schwellen-Entscheid ·
  StaffFlow = API-Spec jetzt, Bau nach S1-Pilot · Preise = Add-on-Vorschlag
  (BASIC +49 / BUSINESS +99 €/Monat) → `docs/MASTERPLAN_PRODUKTLINIEN.md` (NEU).
- **Enterprise-API V1 spezifiziert** (`docs/ENTERPRISE_API_SPEC.md`, NEU): ApiKey/
  Scopes/Rate-Limit, participants/certificates/compliance-status, Webhooks,
  StaffFlow-Blueprint (nur API, nie DB), DSGVO-/Datenminimierungs-Regeln.
- **KURSPLAN_SICHERHEIT Kap. 5** → ENTSCHIEDEN; **ROADMAP §6** (Kursfamilien + API);
  TODO/AGENT_HANDOVER/CHANGELOG fortgeschrieben.
- **S1-Bilder vom Eigentümer gesichtet:** 10/10 Modulbilder (`Bilder/S1_*.png`) +
  `Sicherheis Eule Transparent.png` — Design-System unverändert fortführen.

## Verifikation
- Neue/geänderte Docs gegen Wording-Guard-Verbotsliste geprüft (Scan im Container).
- **Fund + Fix:** f319c08 hätte npm test rot gemacht (Verbotsphrasen wörtlich zitiert in
  KURSPLAN_SICHERHEIT + Übergabe Teil 9, 3 Stellen; „niemals/nie“ deckt der Guard nicht ab) — umformuliert.
- Transport als ZIP + MD5-Vergleich; `npm test` lokal nach Entpacken (Windows) OFFEN.

## Offen / Eigentümer
- Preis-Freigabe Add-on (Masterplan §5) · SFK-Kostenrahmen einholen ·
  Musterlektion S1-9.1 freigeben · danach S1 ausformulieren.

---

## Datum
2026-07-11 (Teil 8 Abschluss — Session lief 10.7. nachts → 11.7.)

## Heute erledigt (Fortsetzung Teil 8)
- **FAQ** repariert-diagnostiziert (Code war ok, Dev-Server-Crash) + WIFI/Kammern-Eröffnungsfrage;
  FAQ in eingeloggte Nav.
- **24/7-USP + Maskottchen** auf Homepage; Branding in `CLAUDE.md` + `QM_SYSTEM.md` verankert.
- **Kursplan 10 + B2C-Abo** freigegeben, Preise entschieden (Privat 14,90 / Solo 24,90 €/Mt).
- **Musterlektion K8 Datenschutz** freigegeben; Quellen klein als Fußnote.
- **AVV**: Master-Vorlage (`docs/AVV_MASTER_VORLAGE.md`) + In-App-Accept-Flow `/company/avv`
  (`AvvAcceptance`: Name/Geburtsdatum/Position/IP/Signatur/Version/Hash, auditiert).
- **Bilder** dedupliziert (16 → `_to_delete/`) + 20 benannt.

## Verifikation
- tsc 0 · i18n grün · Wording (eigene Dateien) sauber — im frischen Git-Klon.
- OFFEN (Windows): `db:generate` + `db:init` (AVV-Tabelle) + `build`; danach `/company/avv` live.

## Offen / Eigentümer
- Deploy-Blocker K1/K2/H1/H3 (Auditbericht) vor Go-Live. AVV-China-Struktur mit Anwalt.
- Push + Backup lokal (Campus-Repo `ki-campus`). 10.7.-Arbeit des Eigentümers ist separat, unangetastet.

---

## Datum
2026-07-10 (Teil 8: Vollaudit + Stresstest, Build-Breaker-Fix, Mandanten-Härtung, 24/7-USP)

## Heute erledigt
- **Vollaudit + Stresstest** (frischer Sandbox-Klon, volle Kette tsc/vitest/build +
  Sicherheits-Code-Audit + Live-Smoke). Bericht: `docs/AUDIT_TEIL8_2026-07-10.md`.
- **FIX P1 Build-Breaker:** `QM_CONTENT_REPORTED` fehlte in `AuditAction` (`lib/audit.ts`)
  → `tsc`/`next build` scheiterten (der als „grün" gemeldete Teil-7-Stand baute NICHT).
  Ergänzt; danach tsc 0, Tests 128/128, Build grün (93 Routen).
- **FIX M1 Mandanten-Härtung:** `updateQualityIssue`/`updateCorrectiveAction` übernahmen
  `ownerId` aus dem Formular ohne Firmenprüfung → fremder Mandanten-Nutzer als
  Verantwortlicher möglich (Erinnerungs-Mail über Mandantengrenze). Helper
  `assertOwnerInScope()` an beiden Stellen (`app/actions/qm-actions.ts`).
- **Schritt 2 — 24/7-USP:** Homepage-Sektion „Immer verfügbar. Immer aktuell." (3 Karten:
  Lernen rund um die Uhr / Wissensdatenbank wächst laufend / Nachweise bleiben aktuell).
  Wording-guard-konform (kein SLA-Versprechen). i18n `home.always*`, Vorlese-Funktion,
  live per Hot-Reload verifiziert.
- **Bilder-Audit:** `Bilder/` = 48 PNG, 13 Duplikat-Gruppen, 20 echte Unikate. Kein
  Blind-Rename (Duplikate + Cross-Projekt). Kontaktbogen + Benennungstabelle an Eigentümer.

## Sicherheitsbefunde (Details im Auditbericht) — vor Go-Live
- K1 Seed-Superadmin-Passwort im Repo (env-gaten, rotieren) · K2 AUTH_SECRET-Härtung ·
  H1 E-Mail-Verifikation erzwingen · H2 Rate-Limiting · H3 Session-Invalidierung ·
  M2 Reset-Token entwerten · M3 `/api/cron` aus Middleware (Cron sonst extern nicht auslösbar).

## Offen / Eigentümer
- K1/K2/H1–H3: Betriebs-/Deploy-Entscheidungen (Credentials fasse ich nicht an).
- Bilder-Rename: Freigabe + Zielordner für die Personal-Brand-Poster (#5–7) abwarten.
- `contentVersionLabel` V1.008 → V1.009 beim nächsten Seed nachziehen.

## Verifikation
- tsc 0 · vitest 128/128 · `next build` exit 0 (93 Routen) — nach den Fixes, in Sandbox-Klon.
- Live-Smoke auf localhost:3000: Zertifikatsliste + neue Homepage-Sektion sichtbar.

---

## Datum
2026-07-08 (Teil 7: Handbuch-Rollout, Review-Cockpit, QM-Fehlermeldung, Zertifikat-Redesign)

## Heute erledigt
- **Handbuch-Format** auf alle 17 Basic-Module ausgerollt (Generator
  `lernunterlagen/_generator.py`, Feature `handbuch` V2.1), Modul 5 als
  kuratiertes Referenz-Muster. Styleguide v1 festgeschrieben
  (`docs/STYLEGUIDE_HANDBUCH.md`), Mentor-Backlog `docs/HANDBUCH_BACKLOG.md`.
- **Review-Cockpit** `/admin/review-plan` gebaut — REUSE der content-audit-
  Freigaben statt Neubau; getakteter Prüfplan 3/Werktag, Mo–Fr, österr.
  Feiertage übersprungen (`lib/review-schedule.ts` + Tests).
- **Teilnehmer-Fehlermeldung** in Lektionen → `reportContentIssue` legt
  QualityIssue an (REUSE QM-Modell), erscheint im QM-Workflow.
- **Theme-Logo** in der Kopfzeile (hell/dunkel via `optionalImage`).
- **Zertifikat-PDF** komplett überarbeitet (`lib/certificate/pdf.ts`): Titel
  „Bescheinigung der KI-Kompetenz nach Art. 4 EU AI Act" (2-zeilig), QR-Positionen
  (oben −3 cm, unten +1,5 cm), Geburtsdatum (Zeile + Daten-QR), Logo in der
  Kopfzeile, Eule als großes Wasserzeichen (ow 430, Opazität 0,11, ~1 cm nach
  rechts). Unterer Fußbereich (Echtheit + Disclaimer + Dokumentenlenkung +
  KI-Hinweis) komplett in EINEM Kasten über die volle Breite, Fließtext im
  **Blocksatz** (neue Funktion `drawJustified`). **Gültigkeit + Verlängerung**
  sichtbar: „Gültig bis" = echtes Datum (Basic 2 Jahre), Zeile „Jährliche
  Verlängerung" mit leerem Eintragfeld (Datum sobald erfolgt), optional `refreshedAt`.
- **Disclaimer-Rebrand** (Eigentümer-Freigabe): `certificate.disclaimer` +
  `verify.testHint` → „Diese Bescheinigung … Sie dient …"; rechtliche
  Verneinungen unverändert. **Website** `appConfig.websiteUrl` → ki-nachweis.at.
- **Seed:** Geburtsdaten Anna/Bernd/Clara + `certificateValidityMonths: 24` (Basic = 2 Jahre).
- **Wording-Guard-Fix:** `docs/STYLEGUIDE_HANDBUCH.md` + `docs/HANDBUCH_BACKLOG.md`
  neutralisiert (Verbotsliste referenziert statt zitiert) → Scan wieder grün.
- **Auffrischung entschieden:** Test = 10 Fragen (verkürzt), Erinnerung an
  Teilnehmer UND Arbeitgeber.
- Verifiziert per PyMuPDF-Proof-Renders `lernunterlagen/img/_cert_v3…v6.png`
  (2 Jahre gültig + leeres Verlängerungsfeld, Blocksatz, Kasten, Eule, Website, Disclaimer).

## Offen
- **Windows:** `npm test` + `npm run build` grün, dann `npm run db:seed`
  (Geburtsdaten + 12-Monats-Gültigkeit), Zertifikat neu herunterladen und real prüfen.
- Globaler `contentVersionLabel` V1.008 → V1.009 + ContentRevision-Register-Zeile
  beim Windows-Release nachziehen (Footer=Register=Config-Regel).
- **Task #25 Backend** (Parameter entschieden): Schema `Certificate.refreshedAt`
  (Windows-Migration), 10-Fragen-Auffrischungstest (REUSE Exam/Attempt),
  Refresh-Action (`validUntil = heute + 24 M`), Erinnerungs-Cron an beide
  (SMTP nicht produktiv → erst Reporting-Flag). Zuerst testbarer Fenster-Helper.
- **Reihenfolge-Risiko:** `certificateValidityMonths=24` → neue Nachweise laufen
  nach 2 Jahren ab; Verlängerungs-Action muss vor Ablauf existieren (real erst in ~2 Jahren akut).

## Verifikation
- Zertifikat in mehreren Zuständen visuell per PyMuPDF geprüft (alle Vorgaben sichtbar,
  Blocksatz korrekt, letzte Zeile linksbündig).
- `npm test` + `npm run build` auf Windows: **grün bestätigt** (Sascha, 2026-07-08).

## Nachtrag (Abend): Task #25 Schritt 1
- Reminder-Fenster-Logik gebaut: `lib/recert-reminders.ts` + `tests/recert-reminders.test.ts`
  (14 Fälle). Erinnerung an Teilnehmer UND Arbeitgeber, Default-Vorlauf 6 Wochen.
- Bug gefunden & behoben: `daysUntil` rechnete mit lokalen Datumsfeldern → auf Wien (UTC+2)
  wäre der Test gekippt. Auf UTC-Datumsgrenzen umgestellt; per Node-Port in UTC/Wien/LA je 14/14 grün.
- Offen: `npm test` auf Windows bestätigen; dann Schema `refreshedAt` (Migration),
  10-Fragen-Auffrischungstest, Verlängerungs-Action, Erinnerungs-Cron.

---

# Tagesabschluss

## Datum
2026-07-08 (Task 4: N4-Beweis, Code-Audit Durchlauf/Mandanten/N6, Stale-Fix, V0.10.2)

## Heute (Rolle KI-CAMPUS-LIVE-QA-AUDITOR)
- N4 (Zertifikat-PDF „TESTZUGANG"): **bestanden**. Route (`.../pdf/route.ts` Z.51) übergibt
  `company.isTest`; Renderer (`pdf.ts` Z.164–175) zeichnet Wasserzeichen + rotes Banner.
  Beweis: Zeichenlogik verbatim ausgeführt → 2 PDFs + PNGs (Test vs. Normal) in
  docs/live-tests/2026-07-08/n4-zertifikat-testzugang (inkl. reproduzierbarem cert-proof.mjs).
- Durchlauf (13–28), Mandantentrennung (47), N6-Banner: **code-verifiziert** und solide
  (exam-actions Gates/Ownership/Grading; issue.ts „kein Zertifikat ohne Bestehen";
  assertCompanyScope überall; PDF-Route sameCompany→403; Banner im Root-Layout rollenübergreifend).
  Bericht: docs/live-tests/2026-07-08/task-4-durchlauf-mandanten-n6.
- Fix (V0.10.2): `toggleUserStatus` + 5 Geschwister revalidieren jetzt `/admin/companies/[id]`.
- Firma-B-Seed ergänzt (Beta Bau GmbH, `hr@beta-bau.example`, Plan BASIC, +2 Teilnehmer,
  idempotent) → A/B-Mandantentest möglich nach `npm run db:seed`.
- BLOCKER Live: Seed hat nur EINE Firma (kein Firma B) und demo-company ist isTest=false;
  App/Tests in Agent-Sandbox nicht lauffähig (win32-node_modules). Live-Rest → Windows-Dev-Server.
- OFFEN: Durchlauf-Screenshots als Anna, A/B-Zugriffsversuch (Firma-B-Seed), N4/N6 live,
  `npm test`+`npm run build`.

---

## Datum
2026-07-08 (Live-QA-Audit im Browser + Fix Passwort-Auge, V0.10.1)

## Heute (Rolle KI-CAMPUS-LIVE-QA-AUDITOR, localhost:3000)
- Öffentliche Seiten + Wording live geprüft (Homepage, Preise, KI-Transparenz,
  Rechtl. Hinweis, Impressum, Datenschutz, AGB): sauber, kein Verbotsbegriff;
  Footer zeigt Gesamtstand V1.008. Funde: P2 interner Betreiber-Hinweis öffentlich
  auf /agb (docs-Pfad sichtbar), P3 „Re-Zertifizierung" auf /pricing.
- Neue V0.10.0-Features live verifiziert: Firmen-/Nutzer-Bearbeitung (Save+Audit),
  Testzugang mit voller Konsequenzkette (Verify-Test-Hinweis, Statistik-Ausschluss
  0/0/0, AuditLog COMPANY_UPDATED/USER_UPDATED), V1.001-Badges. Funde: P2 Audit-Log-UI
  zeigt nur `{}` statt alt→neu bei Bearbeitungen; P3 Nutzer-Edit zeigt nach Save stalen Status.
- Eigentümer-Fund behoben (V0.10.1): Passwort-Auge + autoComplete am „Manuell anlegen"-Feld.
  tsc 0 · Tests 111/111 · Build compiled.
- Berichte: docs/live-tests/2026-07-08/00-public + /superadmin-neue-features + LIVE_TEST_KATALOG.md.
  Demo-Daten am Ende sauber zurückgesetzt.
- OFFEN: Task 4 (Zertifikat-PDF TESTZUGANG-Stempel + QR/Widerruf), N6-Banner (als Anna testen).

---

## Datum
2026-07-07 (Teil 6: Superadmin-Verwaltung V2 + Tester-Freigabe + Zwei-Spuren-Versionierung, V0.10.0 / Gesamtstand V1.008)

## Heute erledigt (Teil 6)
- KLARSTELLUNG: „Teil-3-Merge" war gegenstandslos — das Superadmin-Paket war nie
  gebaut (per Git verifiziert: kein Branch/Commit/Code). Daher Neubau als V1.008.
- Superadmin: Firmen + Nutzer bearbeiten (auditiert), neue Seite /admin/users/[id].
- Tester-Freigabe (Company.isTest/testExpiresAt) mit allen Konsequenzen:
  Cert-Kennzeichnung „TESTZUGANG — kein gültiger Nachweis", Verify-Status,
  Ausschluss aus globaler Statistik (Dashboard + QM courseMetrics), Cron
  `deactivate-expired-tests`, UI-Banner für Test-Firmen.
- Versionierung auf Eigentümer-Vorgabe umgestellt (Zwei-Spuren): globaler
  Gesamtstand V1.008 bleibt im Footer („letzte höchste Version"); NEU pro-Feature-
  Versionen (config/feature-versions.ts + `<VersionBadge>`), superadmin-verwaltung
  V1.001 und tester-freigabe V1.001 (ContentRevision entityType FEATURE).
  CLAUDE.md-Versionierungsregel entsprechend aktualisiert.
- Verifikation: tsc 0 · Tests 111/111 · Build EXIT=0. Sandbox-Fixes nötig:
  lucide-react + @pdf-lib/standard-fonts kamen truncated aus dem npm-Proxy
  (clean re-extract), Prisma generate mit Dummy-Engine-Env.

## Offen für Sascha (Teil 6)
- Push (Kommandos im Handover), `npm run db:init` + `npm run db:seed` (bringt
  isTest/testExpiresAt via ALTER TABLE + V1.008-Revision), im Browser prüfen.

---

## Datum
2026-07-07 (Teil 5: SEMrush-Keyword-Daten + Phase-2-SEO-Seiten, V0.9.0)

## Heute erledigt (Teil 5)
- SEMrush-Keyword-Daten gezogen (Browser-Session, Free-Plan; MCP vom Plan
  nicht abgedeckt, Bulk-Analyse Pro-only, Tageslimit nach 6 Kern-Keywords):
  Report Kap. 5a neu mit Zahlen + strategischen Ableitungen. Kernbefunde:
  AT-DB unter Messschwelle (außer „KI Schulung" AT 260); KI-Führerschein
  590/Monat bei KD 15 = bester Hebel; „…pflicht"-Suffix überall das
  Suchmuster; „KI Schulung" solo (KD 57) ohne Backlinks unrealistisch.
- Fünf Phase-2-Seiten gebaut (Report Kap. 7/11): /art-4-ai-act-erklaert,
  /ki-fuehrerschein-vergleich, /ki-kompetenz-nachweis,
  /chatgpt-schulung-mitarbeiter (Kurs-3-LP, Module dynamisch aus DB),
  /ki-schulung-mitarbeiter — alle mit JSON-LD (Article/FAQPage/Breadcrumb),
  Quellen-/Disclaimer-Blöcken, Glossar, ReadAloud, Muster-CTA,
  „Ist das Pflicht?"-Sektionen (Semrush-Befund) und interner Verlinkung.
- Integration: Middleware-Public-Paths, Sitemap, llms.txt, Footer-Link
  „Art. 4 erklärt", Startseiten-Rechtskontext verlinkt Art.-4-Seite.
- Versionierung: contentVersionLabel V1.007 + ContentRevision im Seed.
- Verifikation in Sandbox über frischen Git-Klon + Patch-Skript
  (Mount-Sync-Bug bestätigt: editierte Dateien kommen abgeschnitten an).

## Offen nach Teil 5
- Semrush-Rest (KI Zertifikat, Copilot, Kosten/KMU …) an einem Folgetag
  über die Browser-Session nachziehen (~8–10 Abfragen/Tag frei).
- Content-Audit-Scan über die neuen i18n-Blöcke laufen lassen (art4,
  fuehrerschein, nachweis, chatgptLp, mitarbeiterLp) — Owner-Freigabe TOTP.
- Danach Queue: Teil-3-Merge (Superadmin-Paket), Praxistest, Grok-Fragen.

---

## Vorheriger Abschluss: 2026-07-08 (Nacht — Teil 4 Fortsetzung: Content-Audit-System Phase 1 GEBAUT)

## Heute erledigt
- Content-Audit-System Phase 1 komplett umgesetzt (Owner-Anweisung „baue
  los" — Queue-Vorrang aufgehoben): 5 neue Tabellen (init.sql synchron),
  lib/content-audit/{logic,scan}.ts (Hash normalisiert SHA-256,
  Statusmaschine, canApprove-Gate, Risk-Scanner mit Negationsregeln,
  Zeilen-Diff, Quellen-Registry mit Coverage-Prinzip), 8 Server Actions
  (auditiert, 9 neue CONTENT_AUDIT_*-Actions), /admin/content-audit
  (KPI/Filter/Tabelle) + Detailseite (Snapshots, Diff, Scanner-Treffer,
  Checkliste, TOTP-Owner-Freigabe, Historie), CSV-Export, 5 Seed-Templates,
  13 neue Tests, 3 neue Doku-Dateien
- Integrations-Smoke in Sandbox: Scan erfasst 300+ Blöcke (3 Kurse komplett
  feldweise, 312 Fragen, Marketing-/i18n-Blöcke, Modulbilder), idempotent
- Bugfix für Sascha: init-db.mjs idempotent (duplicate column oldValue)
- Wording-Guard-Selbstfänger gelöst: Scanner-Liste als gezielte Test-
  Ausnahme (wie Guard-Liste selbst); Seed-Labels Guard-fest umformuliert;
  MARKETING_PAGES-Zitate durch Verweis auf die Verbotslisten ersetzt
- Verifikation: Tests 106/106 · tsc 0 · Build grün (55 Seiten) · db:init
  auf BESTEHENDER DB grün (Idempotenz) · Seed inkl. 5 Templates grün

## Nachtrag: Kontaktdaten + SMTP (2026-07-08)
- info@ki-nachweis.at als offizielle Kontaktadresse (config zentral, Seed
  aktualisiert Bestands-Rechtsprofil), Telefon AT + China im Impressum
- SMTP-Versand fertig implementiert (nodemailer, .env-konfiguriert,
  MailLog SENT/FAILED) — Betrieb braucht nur noch Zugangsdaten des
  Mail-Hosters in .env + SPF/DKIM-DNS (DEPLOYMENT.md)
- Konsistenz-Hinweis: /ki-transparenz + Impressum-Block „Inhaltlich
  verantwortlich" zeigen die neue Adresse automatisch (appConfig)

## Nachtrag: Mail-Hoster geklärt (All-Inkl) + Session-Abschluss
- Hoster = All-Inkl (Server w0175bce.kasserver.com laut KAS-Screenshot);
  Setup-Empfehlung fixiert: noreply@ (Versand) + info@ (Empfang),
  MAIL_REPLY_TO implementiert und verifiziert; Schritte in TODO
  „OFFEN — MAIL" (Postfächer, DNS abwarten, SSL, DKIM, Testmail)
- .gitignore geprüft: .env wird ignoriert — SMTP-Passwort kann nicht
  versehentlich gepusht werden
- Hosting-Blindfleck dokumentiert: All-Inkl-Webspace (PHP) trägt die
  Next.js-App nicht → Node-Hosting-Entscheidung vor Launch (TODO)

## Nachtrag: SEO-Sofortmaßnahmen UMGESETZT (Freigabe Sascha)
- Report-Kap.-11-Sofortpaket gebaut und verifiziert (Tests 106/106, tsc 0,
  Build grün mit allen 4 neuen Routen): /musterzertifikat + Muster-PDF-API
  (echter Generator + MUSTER-Wasserzeichen, fester Demo-Verify-Code im Seed),
  /ueber-uns (V1, Porträt-Slot public/images/sascha.jpg offen), /llms.txt
  dynamisch, Course-/Breadcrumb-JSON-LD, Startseite Problem/Rechtskontext/
  Muster-Teaser, Pricing-Pro-Kopf-Anker, Footer/Sitemap/Middleware/
  Audit-Registry nachgezogen
- OFFEN für Sascha: Porträtfoto sascha.jpg liefern; Phase-2-Seiten
  (Nachweis/Art.-4/Führerschein-Vergleich/ChatGPT-LP) nach AGB/Datenschutz;
  Semrush-Zahlen via Browser-Session oder Plan-Upgrade nachziehen

## Nachtrag: SEO/GEO/Trust-Analysereport erstellt (nur Analyse, nichts gebaut)
- docs/SEO_GEO_TRUST_REPORT.md: 13 Kapitel — Schwachstellen (Trust = Bremse
  Nr. 1), 8 Wettbewerber live recherchiert (Gratis-Funnel aitraining.institute
  bis WIFI 990 €/TN), Keyword-Gap qualitativ, GEO-Maßnahmen (llms.txt,
  Course-Schema, Definitionsblöcke), 23-Seiten-Struktur, Trust-/Conversion-
  Analyse, Rechtsrisiken-Wording, priorisierte Roadmap, Bauen/Nicht-bauen.
  SEMrush-Zahlen: nicht verfügbar (Plan ohne MCP-Zugang) — nichts erfunden.
  Umsetzung erst nach Freigabe durch Sascha.

## Bekannte Probleme / offen
- MAIL OFFEN (wartet auf Sascha): Details in docs/TODO.md „OFFEN — MAIL"
- SEMrush-MCP ohne Plan-Zugang → Keyword-/Traffic-Zahlen offen (Report Kap. 4)
- E-Mail-Verifikation beim Login erzwingen bleibt eigenes TODO
- Phase 1b offen (TODO.md): PDF-Einzelnachweis, JSX-Rechtsseiten +
  E-Mail-Templates in Registry, Prüfmodus-Overlay, Save-Hooks, Scan-Cron
- Erste Charge fachlich abarbeiten = Saschas Part (CONTENT_REVIEW_WORKFLOW.md);
  Owner-Freigabe erfordert aktivierte 2FA am Superadmin-Konto
- QUESTION-Items referenzieren Question-IDs: nach db:init && db:seed
  entstehen neue IDs → alte QUESTION-Items laufen als Karteileichen auf
  (einmalig archivieren oder Scan nach Reset neu aufbauen)

---

# Tagesabschluss

## Datum
2026-07-07 (Nacht — Parallel-Session „Teil 4": Kurs 3 „Richtig Prompten" + Review-Roadmap)

## Heute erledigt
- Kurs 3 „Richtig Prompten — KI-Assistenten wirksam nutzen" komplett:
  10 Module / 32 Lektionen (Präfix pr-, prinzipienbasiert, Praxisstil laut
  CLAUDE.md, je Lektion Lernziel/Erklärung/Beispiel/Risiko/Merksatz/
  Mini-Checks), 74 Fragen (10 PR_-Kategorien, 43 % Praxisfälle), eigene
  Prüfung 30/75 %, teachingUnits 6, in der Flatrate enthalten
- Integration: seedCourse-Aufruf, Zertifikatstitel (certificate.titlePrompting
  + config), 10 Modul-Detailtexte (lib/module-details.de.ts), 10 Kategorie-
  Anzeigenamen, Plan-/Preistexte auf „Alle 3 Kurse", /schulung-Metadaten,
  ContentRevision V1.006 + Footer-Versionslabel
- Neue Tests: 2 Suites (Kursinhalte + Fragenpool Richtig Prompten, inkl.
  pr-Präfix-Zwang und Slug-Kollisionsschutz gegen beide Bestandskurse)
- Roadmap-Seite /ki-kompetenz-review (Auftrag „Codex"): geplantes Review-/
  Auffrischungsmodul ausschließlich als geplante Erweiterung dargestellt —
  Feature-Flag-System in config (featureFlags, planned/beta/live), i18n
  feature.review.*, Hero + 6 Karten + Zielgruppen + QM-Hinweis + Workflow +
  Roadmap-Tabelle (alle Zeilen „geplant") + rechtlicher Hinweis; Footer-Link;
  Middleware-Public-Path ergänzt (geprüfte Minimaländerung)
- TODO „Jährliches KI-Kompetenz-Review & Auffrischungssystem" dokumentiert:
  ROADMAP.md (Vollspezifikation: Empfehlungslogik, Antwortzeit-Grenzwerte
  20/45/90 s, Kategorie-Scores 70/60/50 %, Wiederholungsmodus,
  Auffrischungstest 15–20 Fragen, Admin-Ampel, jährliches Management-Review,
  4 Crons, 3 Datenmodelle, UI-Texte, Akzeptanzkriterien) + Einträge in
  TODO/QM_SYSTEM/QM_WORKFLOW/MANAGEMENT_REVIEW/CRON_JOBS; MARKETING_PAGES.md neu

## Nachtrag (gleiche Nacht): Konsistenz-Audit + Leadmaschine
- Konsistenz-Audit „lose Enden": /features zeigte noch V0.1-Stand (12 Module/
  120 Fragen!) → 3 Kurse/37 Module/300+ Fragen; „beide Kurse"-Reste in
  /schulung, home.benefit2Text, courses.intro; /courses ohne Empfehlung/Icon
  für Kurs 3 (jetzt slug-basierte Maps); Sitemap ohne /ki-kompetenz-review;
  Glossar ohne Halluzination/Prompt-Injection/Kontextfenster → alles gefixt
- Neue KONSISTENZ-PFLICHT in CLAUDE.md (Regel: jede Ergänzung erzwingt
  Alt-Text-Prüfung; Fundstellen-Checkliste)
- Leadmaschine /themen: InterestLead-Modell (init.sql synchron), Formular
  mit Honeypot + Consent + Datensparsamkeit, /admin/leads mit Themen-Ranking
  — Priorisierung der Kurs-Pipeline ab jetzt datengetrieben
- ROADMAP: Kurs 4 „KI-Agenten/Second Brain" (inkl. Modul Anweisungsdateien/
  CLAUDE.md-Prinzip — Entscheidung: kein eigener Kurs), Kurs 5 Führungskräfte
  geparkt; Video-Policy (verlinken statt einbetten, zentrale Pflege)
- scripts/dev-complete-lessons.mjs für lokale Prüfungs-Gate-Freischaltung
  (Saschas „kann nicht testen"-Problem nach db:init)

## Nachtrag 2 (gleiche Nacht): Content-Audit-System entschieden
- Sascha-Entscheidung (auf meine Empfehlung + GPT-Bestätigung): internes
  Content-Audit-Modul ZUERST im Campus, kein separates Open-Source-Repo vor
  2–3 Wochen interner Nutzung. Vollspezifikation in ROADMAP §4 mit drei
  Korrekturen am GPT-Entwurf: (1) eigener Risk-Word-Scanner statt
  wording-guard-Erweiterung (repo-weiter Test würde durch legitime
  Verneinungen brechen), (2) keine neuen Rollen in Phase 1 (Owner-Freigabe
  über Felder), (3) getrennte Änderungserkennung DB-Inhalte (Save-Hooks)
  vs. Git-Inhalte (Scan-Script/Cron mit Quellen-Registry)
- Vorgezogener Quick-Win: /ki-transparenz-Pauschalaussage präzisiert
- Einordnung Queue: nach Superadmin-Paket (Teil 3) und Praxistest; erste
  Audit-Charge mit dem Praxistest verbinden
- Owner-Freigabe-UX festgelegt (ROADMAP §4.5b): Checkliste → TOTP-Re-Auth →
  Server-Zeitstempel; grünes Badge lebt am Hash (kippt bei Änderung)
- Granularität + Sichtbarkeit festgelegt (ROADMAP §4.6b): blockweise über
  stabile blockKeys (didaktische Felder, Seiten-Abschnitte, Assets je Datei),
  Coverage-Prinzip über Quellen-Registry (nichts kann „vergessen" werden),
  Prüfmodus-Overlay nur für Superadmin (grün/gelb/rot), Arbeitsliste mit
  Fortschritt je Kurs/Seite
- CLAUDE.md ergänzt: Regel „ERST PRÜFEN, DANN BAUEN" + Versionierung gilt
  ausdrücklich auch für Bilder/Assets (Versionierungs-Grundregel war
  bereits fix verankert — geprüft statt doppelt geschrieben)

## Bekannte Probleme
- Läuft parallel zur Superadmin-Session (Teil 3): mögliche Merge-Berührpunkte
  in config/app.ts, lib/i18n/de.ts, prisma/seed/index.ts, TODO/HANDOVER —
  beim Zusammenführen Versionslabel prüfen (diese Session setzt V1.006)
- Datenschutzerklärung erwähnt /themen-Verarbeitung noch nicht → Anwalt-Paket
- Modulbilder für die 10 pr-Module fehlen noch (Seiten laufen ohne Bild;
  Sascha liefert später → public/modules/pr-<slug>.png)
- Lokale DB braucht npm run db:init && npm run db:seed für Kurs 3 + V1.006

---

# Tagesabschluss

## Datum
2026-07-07 (Abend — Auftrag „Modul-Detailseiten, Bilder, Vorlesen, Bugfixes")

## Heute erledigt
- BUGFIX Homepage: Modulraster nach Kurs getrennt (statt 27 gemischte Module
  mit doppelten Nummern) — jetzt „Kurs 1"/„Kurs 2" als nummerierte, einklappbare
  Boxen (default eingeklappt), jede Modul-Kachel verlinkt
- BUGFIX Middleware: /schulung und /schulung/* waren nie öffentlich (Redirect
  auf Login ohne Session) — jetzt explizit public (Transparenz vor Buchung)
- BUGFIX i18n: 15 fehlende Kategorie-Anzeigenamen ergänzt (AI_ACT_SYSTEMATIK,
  INFORMATIONSSICHERHEIT, …) — vorher rohe Keys in Admin/Auswertung sichtbar
- Öffentliche Modul-Detailseiten /schulung/[modulSlug] für alle 27 Module:
  Erklärtexte im Praxisstil mit Alltagsbeispielen (lib/module-details.de.ts),
  Lektionsliste mit Lernzielen (Teaser — volle Inhalte hinter Login),
  Abkürzungs-Glossar (lib/glossary.ts, zeigt Begriffe aus den Überschriften),
  Zurück-Button (components/back-button.tsx), Bild je Modul, Vorlesen, CTA
- 27 Modulbilder zugeordnet: public/images/1–17.png → public/modules/<slug>.png
  (Basic) + 10 Verantwortlichen-Bilder → off-*-Slugs; Anzeige via optionalImage
- Vorlesefunktion (bestehende ReadAloud-Komponente) jetzt auch auf Homepage,
  /schulung und Modul-Detailseiten; nie Autoplay, Start nur per Klick;
  Bewerbung („Lieber hören statt lesen?") auf Homepage + /schulung
- Inhaltsstand im Footer sichtbar (footer.contentVersion + config
  contentVersionLabel); Versionsregeln in CLAUDE.md verankert; V1.005 im
  Versionsregister (Seed)
- Plan-Feature-Text entwirrt: „Abschlusstest: 3 Versuche pro Kurs inklusive" +
  „Nur falls jemand mehr braucht: Nachprüfung € 99 pro Teilnehmer" (aus config)
- CLAUDE.md neu: Schreibstil (Praxisstil/du-Form, Beispiele Pflicht), Rechts-
  Leitplanken, Versionierung, No-Touch-Liste, Arbeitsweise
- Git eingerichtet: github.com/Chengdu-2026/ki-campus (privat, Push durch Sascha)
- Verifikation in Sandbox über Git-Klon: Tests 81/81, tsc 0 Fehler, Build grün

## Bekannte Probleme
- Sandbox-Dateisync unzuverlässig (Dateien abgeschnitten) — Workaround: Klon
  von GitHub; Regel: Verifikation immer über frischen git pull
- db:seed nötig, damit V1.005, neue Plan-Texte und 238 Fragen lokal ankommen
- Nutzerwünsche offen: Superadmin-Paket (Firmen/Nutzer bearbeiten, Plan/Status
  manuell, Tester-Freigabe mit Kennzeichnung), Praxistest beider Kurse,
  Fragen-Ergänzungspaket (Übergangsfristen, Rollenwechsel, Proxy-Bias, DSFA)

---

# Tagesabschluss

## Datum
2026-07-07 (Nachmittag — Auftrag „Lerninhalte erweitern und zweiten Kurs anlegen")

## Heute erledigt
- Basic-Kurs 12 → 17 Module (41 Lektionen): neue Module Informationssicherheit,
  Transparenz & Kennzeichnung (Lektion transparenz-ki-inhalte aus Modul 6
  verschoben + neue Alltags-Lektion), KI-Tools/Freigabe/Schatten-KI,
  KI-Vorfälle & Meldewege, Qualität/Feedback/Nachschulung; teachingUnits 4 → 6
- Fragenpool Basic 124 → 154 (30 neue Fragen, 5 neue Kategorien, 12 Praxisfälle)
- Neuer Kurs „KI-Verantwortliche & KI-Beauftragte": 10 Module, 37 Lektionen
  (Prefix off-), 84 Fragen (48 % Praxisfälle), eigene Prüfung (30/75 %)
- Zertifikatstitel je Kurs (config + i18n + PDF); Disclaimer formal um
  „ISO-Zertifizierung" in der Verneinungsliste ergänzt
- /courses als echte Kursübersicht (Empfehlung je Zielgruppe, Fortschritt,
  Zertifikatsstatus); /schulung öffentlich mit beiden Kursen (WIFI/BFI-Transparenz)
- Nachprüfungs-Modell umgesetzt (Texte/Config): 3 Versuche inkl., danach € 99
  je Teilnehmer; Jahresrabatt-Anzeige Basic −10 % / Business −15 %;
  Nachweis-Download-Hinweis auf Preisseite; Plan-Features aktualisiert
- Seed refaktoriert (seedCourse() für beide Kurse; Lesson-Upsert mit moduleId);
  ContentRevision V1.004
- Tests 69 → 81 grün (neue Suites für beide Kurspools, Verschiebung, Disclaimer)
- Doku: COURSE_CONTENT neu strukturiert, CHANGELOG 0.4.0, TODO, AGENT_HANDOVER,
  TEXT_REWRITE_LOG (Tonalität), DATA_PROTECTION_TODO (Profilfoto-Vormerkung)

## Bekannte Probleme
- Nachprüfungsgebühr/Jahresrabatt: Anzeige & Prozesstexte fertig, Online-Zahlung
  fehlt (bewusst; manuelle Freischaltung via auditiertem Versuchs-Reset) → TODO
- Übungsmodus arbeitet auf dem Basic-Kurs; Kursauswahl → TODO
- Offene Nutzerwünsche als TODO erfasst: Modul-Detailseiten mit Fotos und
  Abkürzungs-Glossar, Vorlesefunktion, Profilfoto (nur Konzept, bewusst nicht gebaut)

---

# Tagesabschluss (Vormittag)

## Datum
2026-07-07

## Heute erledigt
- QM-Modul komplett: Datenmodell (FeedbackSurvey/-Question/-Response/-Answer,
  QMThreshold, QualityIssue mit dedupeKey, CorrectiveAction, ManagementReview,
  ContentRevision, MaterialDownload; AuditLog um oldValue/newValue erweitert)
- Feedback: Standard-Fragebogen (10 Fragen lt. Auftrag), Route /feedback/[courseId],
  Link nach bestandenem Test, Erinnerung nach 24 h (max. 2-mal via MailLog)
- Bewertungslogik lib/qm/logic.ts mit 3 Eskalationsstufen, NPS-Regel,
  Freitext-Scanner, Durchfall-/Abbruchquoten — unit-getestet
- CAPA-Statusmaschine mit serverseitiger Abschluss-Sperre
  (canCloseCorrectiveAction); Wirksamkeitsprüfung Pflicht bei HIGH/CRITICAL
- Management-Review: quartalsweise Drafts mit automatischen Kennzahlen,
  Statusfluss DRAFT→IN_REVIEW→APPROVED→ARCHIVED, Freigabe auditiert, idempotent
- 7 Cron-Routen (GET /api/cron/*, Bearer CRON_SECRET, schedulerneutral, idempotent)
- UI: /company/qm (Ampel, 12 Kennzahlen, Trend 30/90) + 5 Unterseiten;
  Superadmin /admin/qm mit Thresholds, Review-Templates, Reports; /admin/versions
- Exporte CSV/PDF (/api/qm/export/*), auditiert (QM_REPORT_EXPORTED)
- Versionsregister ab Baseline V1.003 (jede Inhaltsänderung = neue Version)
- Lernunterlagen: einmaliger PDF-Download mit Wasserzeichen (Name+E-Mail),
  zweiter Versuch → 403
- 5 QM-Mail-Templates (Seed), i18n unter qm.*, Preise auf 129/299 € aktualisiert
- Tests: 69 gesamt (18 QM), Wording-Guard um ISO-Verbotsliste erweitert
- Doku: QM_SYSTEM, QM_WORKFLOW, QM_THRESHOLDS, CRON_JOBS, MANAGEMENT_REVIEW,
  CORRECTIVE_ACTIONS neu; CHANGELOG 0.3.0, QUALITY_CHECK, TODO, HANDOVER aktualisiert

## Bekannte Probleme
- Keine offenen Bugs. QM-Einschränkungen (bewusst): nur globaler
  Standard-Fragebogen, Trainer-Kommentarfunktion fehlt, Trend als Zahlen statt
  Grafik, MULTIPLE_CHOICE-Fragetyp ungenutzt — siehe QUALITY_CHECK.md.

## Offene Punkte für morgen
1. Lerninhalte erweitern: Basic-Kurs auf 17 Module, Fragenpool ≥150
2. Zweiten Kurs „ki-verantwortliche-beauftragte" anlegen (10 Module, ≥80 Fragen)
3. /courses als echte Kursübersicht mit Empfehlungstext
4. Zertifikatstitel je Kurs unterscheiden; Certificate-Disclaimer um
   „keine ISO-Zertifizierung" ergänzen
5. Weiterhin offen: Rechtstexte, SMTP produktiv, Rate-Limiting, Playwright-E2E

## Risiken
- Wording: QM-Kommunikation darf keine Zertifizierungswirkung suggerieren —
  Wording-Guard (ISO-Verbotsliste) ist das Gate, bei neuen Texten beachten.
- Cron-Betrieb: ohne eingerichteten externen Scheduler laufen Erinnerungen/
  Eskalationen nicht — Einrichtung lt. CRON_JOBS.md ist Deployment-Pflicht.
- Kopierschutz der Lernunterlagen ist Personalisierung, kein technischer
  Schutz — Erwartungsmanagement gegenüber Kunden.
- Rechtstexte (AGB/Datenschutz/Drittland) weiterhin ungelöst — vor Launch klären.

---

## Datum
2026-07-06

## Heute erledigt
- Lückenanalyse des Auftrags + SPEC_ADDENDUM.md (15 Lücken, priorisiert)
- Firmendaten von hainan.at (Impressum) übernommen und als CompanyLegalProfile geseedet
- Komplettes Projekt aufgebaut: Next.js 15, TypeScript strict, Tailwind, Prisma 6
  (engineType client + libsql-Adapter), Auth.js, Zod, pdf-lib, qrcode, Vitest
- Datenmodell (24 Tabellen inkl. Translations + Versionierung), init.sql als
  engine-freie Alternative zu db push
- Seed: 12 Module, 29 Lektionen (didaktisch vollständig), 124 Fragen (10 Kategorien,
  ~44 % Praxisfälle), Pläne, E-Mail-Templates, Demo-Firma, 4 Nutzer, bestandener
  Test (83 %), Demo-Zertifikat CERT-2026-000001 mit Verify-Link
- Alle UI-Bereiche: öffentlich (10 Seiten inkl. Rechtsseiten + /ki-transparenz),
  Teilnehmer (Lernpfad, Test mit Resume, Ergebnis+Nachschulung, Übungsmodus,
  Zertifikate), Firma (Users/Einladungen/Fortschritt+Lückenanalyse/Zertifikate/
  CSV-Export), Superadmin (10 Admin-Seiten inkl. Fragen-/Lektions-Editor, AuditLog)
- Wording-Guard implementiert + repo-weiter Test; Dark Mode; i18n-Struktur
- 45 Tests grün; Production Build grün; Smoke-Test (Startseite 200, Verify-Seite
  zeigt Demo-Zertifikat korrekt)
- 18 Doku-Dateien in /docs
- Bild-Slots für gelieferte KI-Marketing-Bilder auf der Startseite vorbereitet

## Geänderte Dateien
Neuaufbau — alle Dateien neu (siehe ARCHITECTURE.md für Struktur, CHANGELOG.md 0.1.0).

## Neue Funktionen
Siehe CHANGELOG.md [0.1.0] — Status: funktionsfähig, Build+Tests grün.

## Bekannte Probleme
- Keine offenen Bugs. Einschränkungen: siehe QUALITY_CHECK.md (SMTP, Rechtstexte,
  Rate-Limiting, E2E-Tests).
- Sandbox-spezifisch (NICHT im Produkt): binaries.prisma.sh gesperrt, native SWC
  crasht (SIGBUS) → Build in Sandbox mit NODE_OPTIONS=--no-addons + SWC-WASM;
  auf normalen Systemen Standardweg (DEPLOYMENT.md).

## Offene Punkte für morgen
1. Rechtstexte (AGB, Datenschutz final, AVV) — extern/Anwalt
2. SMTP produktiv anbinden + E-Mail-Verifikation erzwingen
3. Rate-Limiting /login und /verify
4. Playwright-E2E für Kernflows
5. Marketing-Bilder in public/images/ ablegen (hero.jpg, dashboard.jpg)

## Risiken
- Rechtlich: AGB/Datenschutz unfertig; Drittlandtransfer (Betreiber-Sitz China)
  ist DAS Vertriebsrisiko für EU-Kunden — vor Launch klären.
- Technisch: SMTP fehlt für produktive Einladungs-Mails.
- UX: Zeitlimit ohne Countdown könnte Teilnehmer überraschen (falls aktiviert).
- Datenmodell: init.sql muss bei Schema-Änderungen synchron gehalten werden
  (oder in Umgebungen mit Engine-Zugriff auf prisma migrate umstellen).

## Nächster sinnvoller Agent-Auftrag
„Implementiere Playwright-E2E-Tests für: (1) Einladung→Registrierung→Lernpfad→
Test→Zertifikat-Download, (2) Mandantentrennung (Firmenadmin A darf Daten von
Firma B nicht sehen — direkte URL-Zugriffe), (3) Verify-Seite gültig/widerrufen.
Führe danach npm test + npm run build aus und aktualisiere DAILY_LOG.md,
CHANGELOG.md, TODO.md und QUALITY_CHECK.md."
