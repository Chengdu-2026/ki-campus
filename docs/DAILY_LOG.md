# Tagesabschluss

## Datum
2026-07-08 (Nacht — Teil 4 Fortsetzung: Content-Audit-System Phase 1 GEBAUT)

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

## Bekannte Probleme / offen
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
