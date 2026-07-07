# Zertifikatslogik

## Ausstellung

- Automatisch nach bestandenem Test (`lib/certificate/issue.ts`), idempotent je Versuch.
- Harte Absicherung: `issueCertificateForAttempt` wirft, wenn `passed !== true`
  („Kein Zertifikat ohne bestandenen Test").
- Gespeichert werden u. a.: `courseVersion`, `locale`, `scorePercent`,
  `issuedContentSnapshot` (Modultitel), optional `validUntil`
  (aus `Course.certificateValidityMonths` — Re-Zertifizierung vorbereitet).

## Nummern & Codes

- `certificateNumber`: menschenlesbar, fortlaufend (`CERT-JJJJ-NNNNNN`) — NUR Anzeige.
- `verifyCode`: kryptografisch zufällig (UUIDv4, 128 Bit) — Basis von QR-Code und
  öffentlicher Prüf-URL `/verify/[code]`. Sequenzielle Nummern sind bewusst NICHT
  abrufbar (kein Enumerations-/Datenleck).

## PDF

- A4 hoch, immer heller Hintergrund (druckfreundlich, auch bei Dark-Mode-Nutzern).
- Titel ist kursabhängig: `config/app.ts → courseCertificateTitleKeys` mappt
  Kurs-Slug auf i18n-Key (`certificate.title` Basic, `certificate.titleOfficer`
  KI-Verantwortliche); Fallback `certificate.title`.
- TODO (Vormerkung, nicht umgesetzt): „Profilfoto-Funktion später prüfen und
  implementieren. Foto im Account möglich, Foto auf Zertifikat nur optional per
  Firmen-Einstellung und mit ausdrücklicher Einwilligung. Datenschutz,
  Löschkonzept und Zertifikatstemplate vorher prüfen." → docs/DATA_PROTECTION_TODO.md
- Elemente: Kopfleiste mit Aussteller, Titel, Name prominent, Kursname+Untertitel,
  Kursumfang, Ergebnis, Datum, Gültigkeit, Zertifikatsnummer, Lerninhalte kompakt
  (zweispaltig), QR-Code rechts unten, Signaturfeld, Pflicht-Disclaimer, KI-Hinweis.
- Deterministische Generierung (fixierte PDF-Metadaten) ⇒ SHA-256-`pdfHash` stabil;
  Hash wird beim ersten Download persistiert und als `X-Content-Sha256` mitgesendet.
- Wording-Guard läuft beim Rendern des Disclaimers (defense in depth).

## Download & Zugriff

`GET /api/certificates/[id]/pdf` — erlaubt für: Inhaber, Unternehmensadmin/Trainer
derselben Firma, Superadmin. Jeder Download wird auditiert.

## Verifikation

`/verify/[verifyCode]` (öffentlich, ohne Login): Status **gültig / widerrufen /
abgelaufen** (`effectiveStatus`), Name, Unternehmen, Kurs, Datum, Nummer, Hinweis
„Privater Schulungsnachweis". Unbekannter Code ⇒ generische „nicht gefunden"-Seite.
Jeder Aufruf wird auditiert (`CERTIFICATE_VERIFIED`).

## Widerruf

Unternehmensadmin (eigene Firma) oder Superadmin, mit Grund; AuditLog-Eintrag;
Verify-Seite zeigt den Widerruf sofort.

Tests: `tests/certificate.test.ts` (Status, Verify-Code-Entropie, PDF-Validität,
Determinismus/Hash-Stabilität).
