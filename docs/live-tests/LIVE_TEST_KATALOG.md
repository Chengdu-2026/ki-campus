# Live-Test-Katalog — KI-Kompetenz Campus

Führt alle kritischen End-to-End-Prozesse der SaaS und ihren Live-Prüfstatus.
Ein Prozess gilt nur als **live geprüft**, wenn ein Bericht mit Screenshot-Beweis
existiert (Agent-Spec „KI-CAMPUS-LIVE-QA-AUDITOR"). „Sieht gut aus" zählt nicht.

**Status-Legende:** 🔲 offen · ✅ bestanden · 🟡 teilweise · ❌ nicht bestanden · ⛔ blockiert

**Umgebung:** localhost:3000 (next dev) · Stand V0.10.0 / Gesamtstand V1.008 ·
Logins aus Seed: `sascha.morocutti@gmail.com` (Superadmin) · `hr@musterfirma.example`
(Firmenadmin A) · `anna.beispiel@musterfirma.example` (Teilnehmer A) ·
`hr@beta-bau.example` (Firmenadmin B, Firma „Beta Bau GmbH", für Mandanten-A/B-Test).

| # | Prozess | Status | Letzter Lauf | Bericht | Offene Fehler |
|---|---------|--------|--------------|---------|---------------|
| 1 | Öffentliche Homepage | 🔲 | — | — | — |
| 2 | Preisseite | 🔲 | — | — | — |
| 3 | Registrierung | 🔲 | — | — | — |
| 4 | Login / Logout | 🔲 | — | — | — |
| 5 | Passwort vergessen | 🔲 | — | — | — |
| 6 | Firmen-Onboarding | 🔲 | — | — | — |
| 7 | Firmenstammdaten | 🔲 | — | — | — |
| 8 | Firmenadmin-Dashboard | 🔲 | — | — | — |
| 9 | Teilnehmer anlegen | 🔲 | — | — | — |
| 10 | Teilnehmer per E-Mail einladen | 🔲 | — | — | — |
| 11 | Kurs zuweisen | 🔲 | — | — | — |
| 12 | Einladung annehmen | 🔲 | — | — | — |
| 13 | Kursübersicht | 🔲 | — | — | — |
| 14 | Modulübersicht | 🔲 | — | — | — |
| 15 | Lektion öffnen | 🔲 | — | — | — |
| 16 | Lernfortschritt speichern | 🔲 | — | — | — |
| 17 | Mini-Check durchführen | 🔲 | — | — | — |
| 18 | Falsche Antwort erklären | 🔲 | — | — | — |
| 19 | Modul abschließen | 🔲 | — | — | — |
| 20 | Abschlusstest starten | 🔲 | — | — | — |
| 21 | Prüfungsfragen anzeigen | 🔲 | — | — | — |
| 22 | Test bestehen | 🔲 | — | — | — |
| 23 | Test nicht bestehen | 🔲 | — | — | — |
| 24 | Wiederholungsversuch | 🔲 | — | — | — |
| 25 | Zertifikat erzeugen | 🔲 | — | — | — |
| 26 | Zertifikat herunterladen | 🔲 | — | — | — |
| 27 | QR-Code prüfen | 🔲 | — | — | — |
| 28 | Öffentliche Zertifikatsverifikation | 🔲 | — | — | — |
| 29 | Zertifikat im Firmenadmin sichtbar | 🔲 | — | — | — |
| 30 | CSV-Nachweisliste exportieren | 🔲 | — | — | — |
| 31 | PDF-Nachweis exportieren | 🔲 | — | — | — |
| 32 | Feedback nach Kursabschluss | 🔲 | — | — | — |
| 33 | QM-Feedback-Auswertung | 🔲 | — | — | — |
| 34 | Nachschulung bei Schwächen | 🔲 | — | — | — |
| 35 | Jährliches Review / Auffrischung (geplant) | 🔲 | — | — | Roadmap-Feature |
| 36 | Content-Audit für KI-Inhalte | 🔲 | — | — | — |
| 37 | Wording-Guard | 🔲 | — | — | — |
| 38 | KI-Transparenz-Seite | 🔲 | — | — | — |
| 39 | Rechtlicher Hinweis | 🔲 | — | — | — |
| 40 | Datenschutzseite | 🔲 | — | — | — |
| 41 | Impressum | 🔲 | — | — | — |
| 42 | AGB | 🔲 | — | — | — |
| 43 | E-Mail-Versand | 🔲 | — | — | SMTP wartet auf DNS/Postfächer |
| 44 | Zahlungsprozess (falls aktiv) | 🔲 | — | — | nicht implementiert |
| 45 | Rechnung / Zahlungsbestätigung | 🔲 | — | — | nicht implementiert |
| 46 | Rollenrechte | 🔲 | — | — | — |
| 47 | Mandantentrennung Firma A / B | 🟡 | 08.07. | task-4-durchlauf-mandanten-n6 | code-verifiziert; Live-A/B offen (kein Firma-B-Seed) |
| 48 | Admin-Reifegrad / Versionsregister | 🔲 | — | — | — |
| 49 | Handbuch / Hilfe | 🔲 | — | — | — |
| 50 | Hover-Hints | 🔲 | — | — | — |
| 51 | Changelog / Revision | 🔲 | — | — | — |
| 52 | Mobile-Ansicht | 🔲 | — | — | — |
| 53 | i18n / Übersetzungen (keine rohen Keys) | 🔲 | — | — | — |
| 54 | Sitemap / SEO / Metadata | 🔲 | — | — | — |
| 55 | Fehlerseiten 404 / 500 | 🔲 | — | — | — |
| 56 | Security-Basisprüfung | 🔲 | — | — | — |

## Neue Features V0.10.0 (Zusatzprüfung, diese Session gebaut)

| # | Prozess | Status | Bericht |
|---|---------|--------|---------|
| N1 | Superadmin: Firma bearbeiten (Stammdaten/Plan/Status) + AuditLog | ✅ 08.07. | superadmin-neue-features |
| N2 | Superadmin: Nutzer bearbeiten (Rolle/Status/Name/E-Mail) + AuditLog | ✅ 08.07. | superadmin-neue-features |
| N3 | Testzugang setzen (isTest/testExpiresAt) | ✅ 08.07. | superadmin-neue-features |
| N4 | Testzugang: Zertifikat trägt „TESTZUGANG" | ✅ 08.07. | n4-zertifikat-testzugang |
| N5 | Testzugang: Verify-Seite zeigt Test-Status | ✅ 08.07. | superadmin-neue-features |
| N6 | Testzugang: UI-Banner für Test-Firma | 🟡 code-verifiziert (Live als Anna offen) | task-4-durchlauf-mandanten-n6 |
| N7 | Feature-Versions-Badges (V1.001) auf den neuen Seiten | ✅ 08.07. | superadmin-neue-features |
| N8 | Cron `deactivate-expired-tests` (nur Logik, ohne UI) | ⬜ n/a | Unit-Test/Code |

## Live-Test-Ergebnisse 08.07.2026 (Auszug)
- ✅ **bestanden:** 1 Homepage · 2 Preise · 38 KI-Transparenz · 39 Rechtl. Hinweis ·
  40 Datenschutz · 41 Impressum · 37 Wording-Guard (7 Seiten, kein Verbotsbegriff) ·
  48 Versionsregister (Footer V1.008, Feature-Badges V1.001) · N1/N2/N3/N5/N7 + Statistik-Ausschluss + AuditLog.
- 🟡 **teilweise:** 42 AGB (P2 interner Hinweis öffentlich) · 4 Login (Seite ok; Anmeldung durch Eigentümer).
- ✅ **N4** Zertifikat-PDF-TESTZUGANG-Stempel: Renderer-Beweis (PDF/PNG) + Route-Verdrahtung — n4-zertifikat-testzugang.
- 🟡 **code-verifiziert (Live-Klick offen):** Teilnehmer-Durchlauf (13–28), N6 Banner, Mandantentrennung (47) — task-4-durchlauf-mandanten-n6.
- 🔲 **offen (Live, Windows-Dev-Server):** Durchlauf-Screenshots, A/B-Zugriffsversuch (Firma-B-Seed nötig), N4/N6 in echter Test-Firma.
- Fix V0.10.2: `toggleUserStatus` (+5 Geschwister) revalidieren jetzt `/admin/companies/[id]` (Stale behoben).
- Funde: siehe docs/live-tests/2026-07-08/*/REPORT.md und TODO.md (P2/P3).

## Erste Prüfreihenfolge (Agent-Spec §15)
1 Homepage · 3 Registrierung · 6 Onboarding · 10 Einladung · Kurs Basic (13–22) ·
25 Zertifikat · 28 QR · 29 Firmenadmin-Nachweis · 30 CSV · 32/33 Feedback ·
23 nicht bestanden · 47 Mandantentrennung · 37 Wording · 38/39 Legal.
