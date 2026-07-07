# Changelog

## [0.5.0] — 2026-07-07

### Hinzugefügt
- Öffentliche Modul-Detailseiten `/schulung/[modulSlug]` für alle 27 Module:
  ausführliche Erklärung im Praxisstil mit Alltagsbeispielen
  (lib/module-details.de.ts), Lektionsliste mit Lernzielen als Teaser,
  Abkürzungs-Glossar (lib/glossary.ts), Zurück-Button, Bild je Modul
  (public/modules/<slug>.png via optionalImage), Vorlesen, Freischalt-CTA
- 27 Modulbilder (17 Basic + 10 KI-Verantwortliche) thematisch zugeordnet
- Vorlesefunktion auf Homepage, /schulung und Modul-Detailseiten (bestehende
  ReadAloud-Komponente; Start nur per Klick, nie automatisch) + Bewerbung
  („Lieber hören statt lesen?")
- Homepage: Kurse als nummerierte, einklappbare Boxen (default eingeklappt);
  /schulung: Kurse nummeriert („Kurs 1"/„Kurs 2")
- Inhaltsstand im Footer (config contentVersionLabel, aktuell V1.005);
  ContentRevision V1.005 im Seed
- CLAUDE.md: verbindliche Projektregeln (Schreibstil, Recht, Versionierung)
- Git-Repository github.com/Chengdu-2026/ki-campus

### Behoben
- Homepage mischte seit dem zweiten Kurs alle 27 Module in einem Raster mit
  doppelten Nummern (findMany ohne Kursfilter)
- Middleware: /schulung und /schulung/* erforderten Login — jetzt öffentlich
- 15 fehlende Kategorie-Anzeigenamen (rohe Keys wie categories.AI_ACT_SYSTEMATIK
  in Admin-Fragenliste und Auswertungen sichtbar)
- Verwirrender Plan-Feature-Text zur Nachprüfung in zwei klare Punkte getrennt;
  Betrag aus config statt hardcodiert

## [0.4.0] — 2026-07-07

### Hinzugefügt
- Basic-Kurs auf 17 Module / 41 Lektionen erweitert: neue Module
  Informationssicherheit & KI-Risiken (Kontosicherheit/2FA, Phishing & Deepfakes,
  Geschäftsgeheimnisse), Transparenz & Kennzeichnung (inkl. verschobener Lektion
  transparenz-ki-inhalte aus dem Urheberrecht-Modul plus neuer Alltags-Lektion),
  KI-Tools/Freigabe/Schatten-KI, KI-Vorfälle & Meldewege, Qualität/Feedback/
  Nachschulung; Fragenpool Basic 124 → 154 (5 neue Kategorien)
- Zweiter Kurs „KI-Verantwortliche & KI-Beauftragte im Unternehmen":
  10 Module, 37 Lektionen (Slug-Präfix off-), 84 Prüfungsfragen mit 48 %
  Praxisfällen; eigene Prüfungskonfiguration (30 Fragen, 75 %)
- Zertifikatstitel je Kurs (config courseCertificateTitleKeys + i18n
  certificate.titleOfficer); PDF nutzt kursabhängigen Titel
- /courses ist jetzt echte Kursübersicht mit Empfehlungstext je Zielgruppe,
  Fortschritt und Zertifikatsstatus je Kurs; /schulung zeigt beide Kurse
  öffentlich mit allen Modulen/Lektionen (Transparenz vor Buchung)
- Nachprüfungs-Modell: Übungsmodus unbegrenzt, 3 Testversuche je Kurs inklusive,
  danach € 99 Nachprüfung je Teilnehmer (config examRetakeFeeEur; Freischaltung
  vorerst manuell via auditiertem Versuchs-Reset, Online-Zahlung als TODO);
  Plan-Features und Preisseite entsprechend aktualisiert
- Preisseite: Jahresrabatt-Anzeige (Basic −10 %, Business −15 %,
  config annualDiscountPercent) und Hinweis auf Nachweis-Download vor Kündigung
- 12 neue Tests (Basic 17 Module/Verschiebungs-Check/Modulabdeckung; Officer-Kurs
  Module/Lektionen/Fragen/Praxisquote/Slug-Kollisionen; Disclaimer/Titel) —
  gesamt 81 grün
- Neue Doku: TEXT_REWRITE_LOG.md (Tonalität je Bereich),
  DATA_PROTECTION_TODO.md (Profilfoto-Vormerkung)

### Geändert
- Zertifikats-Disclaimer formal ergänzt: verneint jetzt auch ISO-Zertifizierung
  (juristischer Ton unverändert)
- Basic-Kurs teachingUnits 4 → 6 (Umfangswachstum); FAQ und Marketingtexte
  auf 17 Module/zwei Kurse aktualisiert
- exam.noAttempts / dashboard.statusNoAttemptsLeft: kommunizieren das
  Nachprüfungs-Modell statt pauschalem „keine Versuche mehr"
- Seed refaktoriert: generische seedCourse()-Funktion für beide Kurse;
  Lesson-Upsert aktualisiert jetzt auch moduleId (Lektionsverschiebungen) und
  durationMinutes; ContentRevision V1.004
- Übungsmodus: Kursauswahl deterministisch (ältester Kurs = Basic);
  kursübergreifende Übung als TODO dokumentiert

## [0.3.0] — 2026-07-07

### Hinzugefügt
- QM-Modul zur Unterstützung dokumentierter Qualitätsprozesse nach ISO-9001-Logik
  (keine ISO-Zertifizierung): Feedback-Fragebogen (10 Fragen) nach bestandenem Test,
  automatische Bewertung mit 3 Eskalationsstufen (lib/qm/logic.ts), Qualitätsfälle
  mit dedupeKey, CAPA-Statusmaschine mit serverseitiger Abschluss-Sperre,
  quartalsweise Management-Reviews mit automatischer Kennzahlenbefüllung,
  7 gesicherte Cron-Routen (/api/cron/*, Bearer CRON_SECRET), Dashboards
  /company/qm und /admin/qm mit Ampel und 12 Kennzahlen (Trend 30/90),
  CSV/PDF-Exporte (auditiert), 5 QM-Mail-Templates, 18 neue Tests
  (Dokumentation: QM_SYSTEM.md, QM_WORKFLOW.md, QM_THRESHOLDS.md, CRON_JOBS.md,
  MANAGEMENT_REVIEW.md, CORRECTIVE_ACTIONS.md)
- Versionsregister der Lerninhalte (ContentRevision) ab Baseline V1.003:
  jede Lektions-/Fragenänderung erzeugt eine neue Version mit Änderungsnotiz,
  Nutzer und Zeitpunkt; Tabelle unter /admin/versions; AuditLog erweitert um
  oldValue/newValue
- Lernunterlagen: einmaliger PDF-Download je Teilnehmer+Kurs (MaterialDownload
  unique) mit personalisiertem Wasserzeichen (Name+E-Mail diagonal + Fußzeile
  auf jeder Seite); zweiter Versuch liefert 403 mit Hinweis
- FAQ mit 29 Fragen inklusive Gesetzes-Fundstellen
- Öffentliche /schulung-Seite; SEO/GEO-Optimierung
- Zwei-Faktor-Authentifizierung (TOTP) — siehe [0.2.0], in 0.3.0 dokumentarisch
  konsolidiert

### Geändert
- Preise: Basic 129 €/Monat (bis 10 TN), Business 299 €/Monat (bis 50 TN),
  Enterprise auf Anfrage (Flatrate je Firma)

### Behoben
- Antwort-Shuffle-Fix im Prüfungsmodul

## [0.2.0] — 2026-07-06

### Hinzugefügt
- Zwei-Faktor-Authentifizierung (TOTP, RFC 6238) — kompatibel mit Google/Microsoft
  Authenticator und Authy: Setup mit QR-Code unter /settings/2fa, Aktivierung nur
  nach Code-Bestätigung, Deaktivierung nur mit gültigem Code, Login verlangt Code
  wenn aktiv, AuditLog (TOTP_ENABLED/DISABLED/FAILED), 4 Tests inkl. RFC-Testvektor.

### Geändert
- Superadmin-Seed: sascha.morocutti@gmail.com (statt Platzhalter-Adresse).

## [0.1.0] — 2026-07-06

### Hinzugefügt
- Komplettes Datenmodell (24 Tabellen) inkl. Übersetzungs- und Versionierungstabellen
- Auth.js-Credentials-Login, JWT-Sessions, Rollen (Superadmin/Firmenadmin/Trainer/Teilnehmer)
- Mandantentrennung (Middleware + requireRole + assertCompanyScope)
- Self-Service-Firmenregistrierung, Einladungen per Link/Code, manuelle Anlage,
  Passwort-Reset, Plan-Limit-Enforcement (Basic 10 / Business 50 / Enterprise ∞)
- LMS: 12 Module, 29 Lektionen mit Lernziel/Beispiel/Risiko/Merksatz/Mini-Checks,
  Fortschritt, geführter Lernpfad mit Status-CTAs
- Prüfung: 124 Fragen (10 Kategorien, 44 % Praxisfälle), 30 Zufallsfragen, 75 %-Grenze,
  max. 3 Versuche + Admin-Reset, Resume-fähig, Kategorien-Auswertung
- Adaptive Nachschulung + Übungsmodus (falsche Antworten / schwache Themen / alle / Simulation)
- Zertifikate: automatische Ausstellung, A4-PDF (pdf-lib) mit QR, SHA-256-Hash,
  öffentliche Verify-Seite über Zufallscode, Widerruf, Gültigkeitslogik
- Dashboards: Superadmin-Statistiken, Firmen-Fortschritt, Lückenanalyse, CSV-Export
- Rechtsseiten: /legal-disclaimer, /impressum (Daten von hainan.at), /datenschutz,
  /agb (Platzhalter), /ki-transparenz; Footer-Disclaimer überall
- Wording-Guard: Verbotsliste + Repo-weiter Test + Speicher-Guard in Admin-Actions
- Dark Mode (System/manuell), responsive UI, Barrierefreiheits-Grundlagen
- i18n: de vollständig, en vorbereitet, 22 EU-Locales konfiguriert, DB-Translations
- AuditLog (20+ Aktionen), MailLog + 6 E-Mail-Templates (de)
- 45 Vitest-Tests, Production Build grün
