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
