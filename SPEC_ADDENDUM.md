# SPEC-ADDENDUM: Lückenschließung (verbindlich)

Ergänzt den Hauptauftrag „SaaS-Plattform KI-Kompetenz Zertifikat nach Art. 4 EU AI Act".
Bei Widerspruch gilt dieses Addendum.

Fixierte Entscheidungen:
- Aussteller / Marke: **Hainan Salzburg Consulting GmbH** (zentral als Konstante `ISSUER_NAME`, überall referenziert, nie hartcodiert)
- Auth: **Auth.js** (Credentials, selbst gehostet)
- DB: **SQLite (dev) / PostgreSQL (prod)** — Prisma-Schema Postgres-kompatibel, Umstellung nur über `datasource`-Provider + ENV

---

## A1. Rechtsseiten (KRITISCH)

- `/impressum` — Pflichtangaben-Struktur (Firma, Sitz, FN, UID, Kontakt) als Platzhalter mit `TODO`-Markern
- `/datenschutz` — Datenschutzerklärungs-Gerüst (Verantwortlicher, Zwecke, Rechtsgrundlagen, Speicherdauer, Betroffenenrechte) mit `TODO`-Markern
- `/agb` — Platzhalterseite mit Hinweis „Rechtstext folgt" (Inhalt liefert Anwalt)
- Footer auf JEDER Seite: Impressum, Datenschutz, AGB, Legal-Disclaimer + Kurzhinweis „Privater Schulungsnachweis. Keine behördliche Zertifizierung."
- Kein generierter Rechtstext wird als final ausgegeben; alle Rechtsseiten tragen sichtbaren internen Hinweis „Vom Rechtsbeistand zu prüfen" (nur im Admin sichtbar, nicht öffentlich)

## A2. DSGVO-Funktionen (KRITISCH)

- User-Löschung: Unternehmensadmin/Superadmin kann Teilnehmer löschen → personenbezogene Felder werden anonymisiert (`Gelöschter Nutzer`), Zertifikate und ExamAttempts bleiben mit pseudonymisiertem Bezug erhalten (Nachweispflicht der Firma), Verify-Seite zeigt Zertifikat weiterhin gültig mit ursprünglichem Namen NUR wenn Firma „Nachweis erhalten" wählt — sonst widerrufen
- Datenexport pro Teilnehmer (JSON): Profil, Fortschritt, Versuche, Zertifikate
- Aufbewahrung: Feld `retentionNote` je Company optional; Doku in `/docs/DSGVO.md` (Löschkonzept, AVV-Hinweis, TOMs-Checkliste)

## A3. Verify-Sicherheit (KRITISCH)

- `Certificate.certificateNumber`: menschenlesbar, fortlaufend (`CERT-2026-000001`) — NUR Anzeige
- `Certificate.verifyCode`: kryptografisch zufällig (UUID v4 / 128 bit) — QR-Code und `/verify/[verifyCode]` nutzen ausschließlich diesen
- Aufruf mit Zertifikatsnummer statt Code → generische „nicht gefunden"-Seite (keine Existenz-Orakel)
- Rate-Limit auf Verify-Route (einfacher In-Memory/DB-Zähler pro IP, konfigurierbar)

## A4. Firmen-Onboarding

- `/register` = Self-Service: legt Company (Plan: Basic) + ersten Unternehmensadmin an, E-Mail-Verifikation via Mail-Layer
- Superadmin kann Firmen zusätzlich manuell anlegen/deaktivieren
- Teilnehmer registrieren sich NIE frei — nur via Einladungslink oder Registrierungscode der Firma

## A5. Prüfungs-Robustheit

- Antworten werden pro Frage serverseitig gespeichert (Attempt-State `IN_PROGRESS`)
- Abgebrochener Versuch: wiederaufnehmbar innerhalb konfigurierbarem Fenster (Default 24 h), danach automatisch `EXPIRED` (zählt als Versuch, konfigurierbar)
- Max. Versuche Default 3; **Unternehmensadmin kann Versuche zurücksetzen** → AuditLog-Eintrag mit Begründung
- Fragenauswahl je Versuch neu randomisiert; Antwortreihenfolge randomisiert

## A6. Zertifikats-Lebenszyklus

- `Certificate.status`: `VALID | REVOKED`
- `Certificate.validUntil` optional (Default: null = unbefristet; pro Kurs konfigurierbar, z. B. 24 Monate → Re-Zertifizierung)
- Widerruf nur Superadmin/Unternehmensadmin (eigene Firma), mit Grund, AuditLog
- Verify-Seite zeigt Status ehrlich: gültig / widerrufen / abgelaufen
- PDF-Integrität: PDF wird deterministisch aus DB-Daten generiert; SHA-256-Hash in `Certificate.pdfHash`; Verify-Seite ist die maßgebliche Wahrheitsquelle (Hinweis auf Zertifikat)

## A7. Mail-Layer

- Abstraktion `lib/mail.ts`: Interface `sendMail(template, to, data)`
- Dev: Ausgabe in Konsole/DB-Tabelle `MailLog`; Prod: SMTP oder Resend via ENV (`MAIL_PROVIDER`)
- Templates als Seed: Einladung, Registrierung bestätigen, Passwort-Reset, Erinnerung offen, Test nicht bestanden/Nachschulung, Zertifikat verfügbar
- Alle Templates ohne verbotene Formulierungen (siehe A10)

## A8. Passwort & Konto

- Passwort-Reset: Token (1 h gültig, einmalig) via Mail-Layer
- Passwort-Policy: min. 10 Zeichen; Hashing mit bcrypt/argon2
- Teilnehmer-Status: `active | inactive` — inaktiv gibt Plan-Sitzplatz frei, Historie/Zertifikate bleiben
- Login-Rate-Limit (Zähler pro E-Mail/IP)

## A9. Plan-Enforcement

- Einladung/Anlage prüft aktive Teilnehmerzahl gegen Plan-Limit (Basic 10, Business 50, Enterprise ∞)
- Bei Limit: Aktion blockiert + Upgrade-Hinweis (kein stiller Fehler)
- Limits zentral in `Plan`-Seed, nicht hartcodiert

## A10. Wording-Guard (automatisiert)

- `lib/wording-guard.ts`: Verbotsliste (staatlich anerkannt, offiziell zertifiziert, EU-zertifiziert, behördlich genehmigt, garantiert rechtssicher, offizieller KI-Führerschein, erfüllt alle gesetzlichen Pflichten garantiert)
- Vitest-Test scannt alle Quelltexte, Seed-Inhalte, Mail-Templates und PDF-Texte auf Verbotsbegriffe → Build/Test schlägt fehl bei Treffer
- Whitelist-Ausnahme nur für die Verbotsliste selbst und Disclaimer-Texte, die Begriffe verneinen („keine behördliche Zertifizierung")

## A11. Rollen-Klarstellung

- Trainer/Prüfer: im Datenmodell (Role) enthalten, V1 OHNE eigene UI — Rolle zuweisbar, sieht Read-only-Fortschritt der eigenen Firma über `/company/progress`. Keine Dummy-Seiten darüber hinaus. Ausbau V2.

## A12. i18n-Vorbereitung

- Alle UI-Strings in zentraler Dictionary-Struktur (`lib/i18n/de.ts`), V1 nur Deutsch
- Keine hartcodierten Texte in Komponenten

## A13. AuditLog-Events (Mindestumfang)

Login-Fehlversuche (gehäuft), Firmenanlage/-änderung, Nutzeranlage/-löschung/-deaktivierung, Einladung erstellt/angenommen, Versuchs-Reset, Zertifikat erstellt/widerrufen, Fragen-/Kurs-Änderungen, Export-Aufrufe.

## A14. Deployment-Doku

`/docs/DEPLOYMENT.md`: Postgres-Umstellung (Provider + ENV), Mail-Provider-Konfig, ENV-Referenz, Seed-Ausführung, Backup-Hinweis.

---

## Prioritätenreihenfolge Build

1. Kritisch: A1, A2, A3 + Kern laut Hauptauftrag
2. Hoch: A4–A8
3. Mittel: A9–A13
4. Doku: A14, QUALITY_CHECK.md
