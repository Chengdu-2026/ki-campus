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

## SMTP anbinden

`lib/mail.ts` ist die einzige Versandstelle. Für Produktion: `npm i nodemailer`,
im `provider === "smtp"`-Zweig `nodemailer.createTransport({host, port, auth})`
aufrufen und `MailLog.status` auf SENT/FAILED setzen. Templates liegen in der DB
(`EmailTemplate`) und sind je Sprache pflegbar.

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
