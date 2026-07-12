# Enterprise-API V1 — Spezifikation

Stand: 2026-07-11 · Status: **SPEZIFIKATION — Bau erst nach S1-Pilotkunde**
(Reihenfolge: `docs/MASTERPLAN_PRODUKTLINIEN.md` §9). Erster Konsument: **StaffFlow**.
Erweitert die Skizze in `docs/API.md` (Enterprise-API) — dort nach Bau verlinken.

## 1. Zweck

Firmenkunden (und eigene Produkte wie StaffFlow) sollen Teilnehmer provisionieren und
Nachweis-Status maschinell abfragen können, ohne die Web-UI. Das ist zugleich das
Plan-Feature „API (optional)" im ENTERPRISE-Plan — also verkaufbar, nicht nur intern.

Grundsätze: mandantenscharf (eine Firma sieht nur sich), datensparsam, jede Nutzung
auditiert, kein Direktzugriff fremder Systeme auf die DB.

## 2. Authentifizierung & Schlüsselverwaltung

- **API-Keys je Company.** Neues Model **`ApiKey`**: `id`, `companyId`, `name`
  (Anzeigename, z. B. „StaffFlow Produktion"), `keyHash` (SHA-256 — Klartext wird nur
  einmal bei Erstellung angezeigt), `keyPrefix` (erste 8 Zeichen zur Identifikation),
  `scopes` (JSON string[]), `status ACTIVE|REVOKED`, `expiresAt?`, `lastUsedAt?`,
  `createdById`, `createdAt`, `revokedAt?`. `init.sql` synchron halten.
- Key-Format: `kcc_live_<32 Zufallszeichen>` (Prefix macht Leaks in Logs/Repos greifbar).
- Übergabe: `Authorization: Bearer <key>`. Nur HTTPS.
- **Scopes:** `participants:read` · `participants:write` · `certificates:read` ·
  `webhooks:manage`. Default: nur `certificates:read`.
- Verwaltung: Superadmin legt Keys an (Phase 1); später Company-Admin-UI. Rotation =
  neuen Key anlegen, alten revoken (beides auditiert: `API_KEY_CREATED`, `API_KEY_REVOKED`).
- **Rate-Limit:** bestehendes Muster `lib/rate-limit.ts` (Sliding Window, fail-open)
  je Key: 60 req/min, 5.000 req/Tag. 429 mit `Retry-After`.
- Jeder Request → AuditLog (`API_REQUEST`, Metadaten: Key-Prefix, Route, Status).
  PII nicht in Log-Metadaten.

## 3. Endpoints (V1, Basis `/api/v1/`)

Antwortformat JSON; Fehler einheitlich:
`{ "error": { "code": "NOT_FOUND", "message": "…" } }` · Codes: 400 `VALIDATION`,
401 `UNAUTHORIZED`, 403 `FORBIDDEN_SCOPE`, 404 `NOT_FOUND`, 409 `CONFLICT`,
429 `RATE_LIMITED`, 500 `INTERNAL`.

### GET /api/v1/participants — Scope `participants:read`
Liste der Teilnehmer der Firma. Query: `status`, `email`, Paging (`cursor`, `limit` ≤ 100).
Felder: `id`, `email`, `firstName`, `lastName`, `status`, `createdAt` — nicht mehr.

### POST /api/v1/participants — Scope `participants:write`
Provisioning (StaffFlow-Onboarding): `{ email, firstName, lastName, locale? }`.
Verhalten wie bestehende `createParticipant`-Action (Plan-Limit! 409 bei erreichtem
Limit, `PLAN_LIMIT_REACHED`), Einladung per bestehendem Invitation-Flow.
**Idempotent** über `email` je Company: existiert der Teilnehmer, 200 mit Bestand
statt Dublette. Auditiert wie UI-Anlage.

### GET /api/v1/certificates — Scope `certificates:read`
Query: `userEmail` oder `userId`, optional `courseSlug`, `familyKey`.
Felder je Zertifikat: `certificateNumber`, `courseSlug`, `courseVersion`, `issuedAt`,
`validUntil`, `status VALID|REVOKED|EXPIRED` (EXPIRED berechnet), `verifyUrl`
(öffentliche QR-Verify-URL). **Kein Score, kein Geburtsdatum** — Datenminimierung;
Score nur auf explizite Anforderung (`includeScore=true`, dokumentierter Zweck).

### GET /api/v1/compliance-status — Scope `certificates:read`
Der Kern für StaffFlow: je Teilnehmer und Kursfamilie der Pflicht-Status.
Query: `familyKey?`. Antwort je Teilnehmer: `email`, `familyKey`, `status
COMPLIANT|EXPIRING|OVERDUE|NEVER_TRAINED`, `validUntil?`, `courseSlug?`.
`EXPIRING` = validUntil < 60 Tage (konfigurierbar `config/app.ts`).

## 4. Webhooks — Scope `webhooks:manage`

Model **`WebhookEndpoint`**: `id`, `companyId`, `url` (nur HTTPS), `secret`
(HMAC-SHA256-Signatur im Header `X-KCC-Signature`), `events` (JSON string[]),
`status ACTIVE|DISABLED`, `failureCount`, `lastDeliveryAt?`. Events V1:

- `certificate.issued` — Zertifikat ausgestellt (Payload wie GET certificates-Eintrag)
- `certificate.expiring` — 60/30/7 Tage vor Ablauf (aus bestehendem Erinnerungs-Cron)
- `exam.failed` — Versuchslimit ausgeschöpft (für HR-Nachsteuerung)

Zustellung: POST mit Retry (3 Versuche, exponentiell); nach 10 Fehlschlägen in Folge
`DISABLED` + Mail an Firmen-Admin. Verwaltung V1 per Superadmin, CRUD-Endpoints
`/api/v1/webhooks` (GET/POST/DELETE).

## 5. StaffFlow-Blueprint (Konsument Nr. 1)

Regeln bleiben: StaffFlow-Repo wird NIE angefasst; Kopplung ausschließlich über diese
API; API-Key der Kunden-Company in StaffFlow als Secret hinterlegt (nie im Code).

Ablauf:
1. **Onboarding:** StaffFlow legt Mitarbeiter an → `POST /participants` → Einladung
   läuft über Campus-Standardflow.
2. **Statusanzeige:** StaffFlow zeigt je Mitarbeiter den Schulungs-/Unterweisungsstatus
   → `GET /compliance-status` (täglicher Sync als Fallback).
3. **Ereignisse:** `certificate.issued` / `certificate.expiring` per Webhook → StaffFlow
   aktualisiert sofort und erinnert im eigenen Workflow (z. B. Dienstplan-Sperre bei
   OVERDUE — Logik liegt in StaffFlow, nicht bei uns).
4. **Nachweis:** StaffFlow verlinkt auf `verifyUrl` (öffentliche Prüfung) statt PDF-Kopien
   zu speichern — Datensparsamkeit, immer aktueller Status.

## 6. Sicherheit & DSGVO

- Mandantentrennung serverseitig über den Key→Company-Bezug (gleiche Garantie wie
  `assertCompanyScope`); niemals companyId aus dem Request übernehmen.
- Datenminimierung je Endpoint (Felder oben abschließend; keine Geburtsdaten, kein Score
  by default). AVV der Firma muss akzeptiert sein, bevor Keys ausgegeben werden
  (bestehender AVV-Accept-Flow als Voraussetzung — Drittland-Thema beachten,
  siehe LEGAL_POSITIONING/AVV-Master).
- Keys nur gehasht speichern; Klartext einmalig; Prefix-Anzeige in UI/Logs.
- Alle Mutationen + Key-Lebenszyklus im AuditLog (Muster vorhanden).
- Tests: Scope-Sperre, Mandantengrenze (Key A sieht nie Firma B), Idempotenz,
  Rate-Limit, Webhook-Signatur — in die bestehende Testsuite.

## 7. Nicht in V1

Kein OAuth/OIDC (nur Keys) · kein Teilnehmer-Löschen per API (DSGVO-Löschung bleibt
UI-Prozess mit Audit) · keine Kursinhalts-API · kein SSO. Wiedervorlage nach
Kundenbedarf.
