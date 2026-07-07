# Architektur

## Stack

| Ebene | Technologie | Begründung |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components, Server Actions, ein Deployment |
| Sprache | TypeScript (strict) | Typsicherheit bis in die DB (Prisma) |
| UI | Tailwind CSS + eigene shadcn-artige Komponenten | kein Runtime-CSS, Dark Mode via `class` |
| DB | SQLite (dev) / PostgreSQL (prod) | Prisma-Schema ohne DB-Enums → beide Provider |
| ORM | Prisma 6 mit **Driver-Adapter (libsql)** | Rust-Engine-frei; Postgres via `@prisma/adapter-pg` |
| Auth | Auth.js (NextAuth v5, Credentials + JWT) | selbst gehostet, keine Drittanbieter-Abhängigkeit |
| PDF | pdf-lib | deterministische Generierung → SHA-256-Integritätshash |
| QR | qrcode | QR auf zufälligen `verifyCode` (kein Enumerationsrisiko) |
| Validierung | Zod | alle Server-Action-Inputs |
| Tests | Vitest | Logik-Unit-Tests + Wording-Guard-Repository-Scan |

## Verzeichnisstruktur

```
app/                    # Routen (App Router)
  actions/              # Server Actions (auth, company, exam, admin, practice, lesson)
  api/                  # Route Handler (NextAuth, PDF, CSV)
  (öffentl. + Teilnehmer- + company/ + admin/-Seiten)
components/
  ui/                   # Button, Card, Badge, Progress, Table, Hint, EmptyState …
  layout/               # Header, Footer, MobileNav
  exam/                 # ExamRunner (Test), PracticeRunner (Übung)
  forms/                # ActionForm, ConfirmButton, CopyButton, RevokeButton
config/app.ts           # ZENTRALE Konfiguration — nichts hardcoden!
lib/
  prisma.ts             # Lazy PrismaClient (Driver-Adapter)
  auth.ts / rbac.ts / tenancy.ts   # Auth, Rollen, Mandantentrennung
  exam.ts               # Bestehens-/Auswertungslogik (pur, testbar)
  certificate/          # number.ts (Nummern/Codes), pdf.ts, issue.ts
  i18n/                 # de.ts, en.ts, index.ts (t() mit Fallback)
  mail.ts               # Mail-Abstraktion (log/smtp)
  wording-guard.ts      # Verbotsliste + Scanner
  audit.ts              # AuditLog-Helfer
prisma/
  schema.prisma         # Datenmodell
  init.sql              # DDL-Alternative zu `db push`
  seed/                 # index.ts + Inhalte beider Kurse (Basic 17 Module/154 Fragen, Officer 10 Module/84 Fragen)
tests/                  # Vitest
docs/                   # diese Doku
```

## Kernentscheidungen

1. **Keine DB-Enums** — SQLite-kompatibel; Werte werden per Zod/TS-Union geprüft.
2. **Übersetzungen in DB-Tabellen** (`*Translation` je Entität) — Inhalte sind ohne
   Codeänderung in weitere EU-Sprachen übersetzbar; UI-Texte in `lib/i18n/<locale>.ts`.
3. **verifyCode ≠ certificateNumber** — öffentliche Prüf-URL nutzt einen zufälligen
   128-Bit-Code; die fortlaufende Nummer ist reine Anzeige (kein Daten-Harvesting).
4. **Zertifikat nur serverseitig** aus DB-Daten generiert; `pdfHash` (SHA-256)
   persistiert; Verify-Seite ist die maßgebliche Wahrheitsquelle.
5. **Server Actions statt API-Zoo** — Mutationen laufen über typisierte Actions mit
   Zod-Validierung, RBAC-Guard und AuditLog; Downloads (PDF/CSV) als Route Handler.
6. **Lazy Prisma-Init** — native DB-Bindung wird erst beim ersten Query geladen
   (Build-Zeit bleibt DB-frei; alle DB-Seiten sind dynamisch).
