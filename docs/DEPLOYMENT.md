# Deployment

## Voraussetzungen
Node.js ≥ 20, npm ≥ 10. Produktions-DB: PostgreSQL empfohlen.

## Umgebungsvariablen (.env)

| Variable | Pflicht | Beschreibung |
|---|---|---|
| DATABASE_URL | ✓ | `file:./dev.db` (SQLite) oder `postgresql://…` |
| AUTH_SECRET | ✓ | 32+ Zeichen Zufallswert (`openssl rand -base64 32`) |
| APP_URL | ✓ | öffentliche Basis-URL (für Links in Mails/QR) |
| MAIL_PROVIDER | — | `log` (Standard) oder `smtp` |
| SMTP_HOST/PORT/USER/PASS, MAIL_FROM | bei smtp | SMTP-Zugang |

## Standard-Setup (Umgebung MIT Zugriff auf binaries.prisma.sh — z. B. dein Windows-PC)

```bash
npm install
npx prisma generate
npm run db:push      # legt Schema an
npm run db:seed
npm run build && npm start
```

## Setup OHNE Prisma-Binary-Downloads (gesperrte Netze)

`npm run db:init` legt das SQLite-Schema aus `prisma/init.sql` an (äquivalent zu
db push). Der Prisma-Client selbst ist Rust-Engine-frei (engineType "client" +
libsql-Driver-Adapter) und braucht keine Binary-Downloads.

## PostgreSQL-Umstellung (Produktion)

1. `prisma/schema.prisma`: `provider = "postgresql"`, DATABASE_URL setzen.
2. `npm install @prisma/adapter-pg pg`
3. `lib/prisma.ts` und `prisma/seed/index.ts`: `PrismaLibSQL` durch `PrismaPg`
   ersetzen (2 Zeilen je Datei):
   ```ts
   const { PrismaPg } = req("@prisma/adapter-pg");
   return new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
   ```
4. `npx prisma migrate dev` (erste Migration erzeugen) · Seed ausführen.
Das Schema enthält bewusst keine SQLite-Spezifika (keine Enums) — kompatibel.

## SMTP anbinden (implementiert seit 2026-07-08)

`lib/mail.ts` ist die einzige Versandstelle; nodemailer ist als Dependency
enthalten. Aktivierung rein über `.env` (siehe .env.example):
`MAIL_PROVIDER=smtp`, `SMTP_HOST`, `SMTP_PORT` (587 STARTTLS / 465 TLS),
`SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` (z. B.
"KI-Kompetenz Campus <info@ki-nachweis.at>"). Jeder Versand landet im MailLog
mit Status SENT/FAILED; bei fehlender Konfiguration wird FAILED geloggt statt
still verschluckt. Templates liegen in der DB (`EmailTemplate`) und sind je
Sprache pflegbar.

**Zustellbarkeits-Pflicht:** Für die Absenderdomain ki-nachweis.at beim
DNS-Hoster SPF- und DKIM-Einträge setzen (Werte liefert der Mail-Hoster),
sonst landen Einladungen im Spam. Empfehlung: zusätzlich DMARC (p=none zum
Start). Zugangsdaten NIEMALS ins Repo — nur in .env / Server-Umgebung.

## Reverse Proxy / Host
`trustHost: true` ist gesetzt — hinter Proxy `APP_URL` korrekt setzen und
`X-Forwarded-*`-Header durchreichen (für IP im Prüfungsprotokoll).

## Backups
SQLite: Datei `prisma/dev.db` sichern. Postgres: `pg_dump` zeitgesteuert.
Zertifikate sind aus der DB reproduzierbar (deterministisches PDF) — DB-Backup genügt.

## Sandbox-Hinweise (nur für diese Entwicklungsumgebung relevant)
In der Build-Sandbox waren binaries.prisma.sh gesperrt und die native SWC-Binary
nicht ladbar (SIGBUS). Workarounds, die auf normalen Systemen NICHT nötig sind:
`PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` + Dummy-Engine-Pfade beim `prisma generate`,
Build mit `NODE_OPTIONS=--no-addons` (erzwingt SWC-WASM-Fallback), `npm run db:init`
statt db push. Der ausgelieferte Code enthält keine dieser Krücken.
