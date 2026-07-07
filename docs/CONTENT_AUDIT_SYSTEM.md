# Content-Audit-System (Phase 1)

Stand 2026-07-07 Nacht. Internes Audit- und Freigabesystem für KI-generierte
und geänderte Inhalte. Spezifikation: ROADMAP.md §4 (maßgeblich).

**Positionierung:** Unterstützt dokumentierte menschliche Prüfung und macht
Freigaben nachvollziehbar. Es ersetzt keine Rechtsberatung, keine
Datenschutzprüfung, keine ISO-Zertifizierung und kein behördliches Audit.

## Kernprinzip

1. Der **Scan** (`lib/content-audit/scan.ts`, Button auf /admin/content-audit)
   erfasst alle prüfpflichtigen Blöcke und berechnet je Block einen
   normalisierten SHA-256-**ContentHash**.
2. Neue Blöcke starten mit Status **NEEDS_REVIEW**.
3. Die Prüfung läuft über eine **konfigurierbare Checkliste** (5 Seed-Templates,
   je EntityType zuordenbar, Default-Template als Fallback).
4. **Freigeben** ist serverseitig gesperrt, bis alle Pflicht-Items abgehakt
   sind und der Publikationshaken gesetzt ist (`canApprove`).
5. Die Freigabe speichert den **approvedContentHash** — sie gilt nur für
   exakt diese Fassung.
6. Ändert sich der Inhalt (nächster Scan), kippt der Status automatisch auf
   NEEDS_REVIEW, `version++`, die alte Fassung bleibt als
   previousContentSnapshot mit Diff sichtbar. **Grün heißt: freigegebener
   Hash == aktueller Hash — nie nur „wurde mal geklickt".**
7. **Owner-Freigabe** (kritische Inhalte, requiresOwnerApproval): zusätzlich
   TOTP-Re-Authentifizierung (lib/totp.ts) → ownerApprovedById/At +
   AuditLog CONTENT_AUDIT_OWNER_APPROVED.
8. Jede Aktion schreibt ins bestehende **AuditLog** (CONTENT_AUDIT_*-Actions).

## Quellen-Registry (Coverage-Prinzip)

Was die Registry kennt, kann nicht vergessen werden — es erscheint automatisch
als offen. Phase-1-Quellen (`lib/content-audit/scan.ts`):

| Quelle | EntityType | BlockKey-Muster | Mechanik |
|---|---|---|---|
| Kurse (Titel/Untertitel/Beschreibung) | COURSE | course:<slug>#meta | DB |
| Module (Titel/Beschreibung) | MODULE | module:<slug>#meta | DB |
| Lektionen je didaktisches Feld | LESSON | lesson:<slug>#goal/content/example/risk/memo/minichecks | DB |
| Fragen (Text+Optionen+Erklärung) | QUESTION | question:<id> | DB |
| Modul-Detailtexte | MARKETING_PAGE | module-detail:<slug> | TS-Import |
| i18n-Blöcke home/pricing/themen | MARKETING_PAGE | i18n:<key> | TS-Import |
| i18n feature.review | FEATURE_TEXT | i18n:feature.review | TS-Import |
| i18n certificate (inkl. Disclaimer) | CERTIFICATE_TEMPLATE | i18n:certificate | TS-Import |
| Modulbilder | ASSET | asset:modules/<datei> | Datei-Hash |

Owner-Freigabe Pflicht (requiresOwnerApproval): MARKETING_PAGE, FEATURE_TEXT,
CERTIFICATE_TEMPLATE, LEGAL_PAGE.

Bewusst noch NICHT erfasst (Phase 1b): JSX-Rechtsseiten (/impressum,
/datenschutz, /agb, /legal-disclaimer, /ki-transparenz — liegen als JSX,
brauchen Extraktor), E-Mail-Templates, Prüfmodus-Overlay im Frontend.

## Risk-Word-Scanner

`lib/content-audit/logic.ts → scanForRiskWords`: eigene, schärfere Liste als
der repo-weite wording-guard (Begründung: ROADMAP §4.4 — die Guard-Liste muss
repo-weit test-fest sein, diese hier bewertet nur Audit-Snapshots).
Verneinungen („ersetzt keine Rechtsberatung", „keine ISO-Zertifizierung")
werden vor dem Scan entfernt und lösen keinen Treffer aus. Treffer ⇒
riskLevel mindestens HIGH + Anzeige auf der Detailseite.

## Dateien

- `lib/content-audit/logic.ts` — Hash, Statusmaschine, canApprove, Scanner,
  Diff (unit-getestet, tests/content-audit.test.ts)
- `lib/content-audit/scan.ts` — Registry + idempotenter Scan
- `app/actions/content-audit-actions.ts` — Scan, Prüfung, Checkliste,
  Freigabe, Owner-Freigabe (TOTP), Änderungen anfordern, Ablehnen, Publish
- `app/admin/content-audit/` — Übersicht (KPI, Filter, Tabelle) + Detailseite
  (Snapshots, Diff, Scanner-Treffer, Checkliste, Aktionen, Historie)
- `app/api/content-audit/export/route.ts` — CSV-Export (auditiert)
- Seeds: 5 Checklisten-Templates (prisma/seed/index.ts)
- Schema: ContentAuditItem, ReviewChecklistTemplate/Item,
  ContentReviewChecklistResult/Answer (init.sql synchron)

## Erste Charge

Nach `db:init && db:seed`: auf /admin/content-audit den **Scan ausführen** —
erfasst automatisch alle 3 Kurse (Meta, Module, alle Lektionsfelder,
alle 312 Fragen), Modul-Detailtexte, zentrale i18n-Blöcke und Modulbilder.
Danach prüfen und freigeben, beginnend mit HIGH/CRITICAL und Owner-Pflicht.

## Offene Punkte (Phase 1b — docs/TODO.md)

- PDF-Einzelnachweis je AuditItem (CSV existiert; pdf-lib-Muster vorhanden)
- JSX-Rechtsseiten + E-Mail-Templates in die Registry
- Prüfmodus-Overlay auf öffentlichen Seiten (ROADMAP §4.6b Ebene 2)
- Save-Hooks in Admin-Actions (aktuell erkennt der Scan Änderungen; Hooks
  machen es unmittelbar)
- Scan als Cron-Route (content-audit-scan), Muster CRON_JOBS.md
