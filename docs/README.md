# KI-Kompetenz Campus — Plattform-Dokumentation

Multi-Tenant B2B-SaaS-Plattform: Unternehmen schulen Mitarbeitende im Umgang mit KI,
prüfen das Wissen per Multiple-Choice-Test und erhalten einen **privaten Schulungs-
und Kompetenznachweis** zur Unterstützung der KI-Kompetenzpflicht nach Art. 4 EU AI Act.

**Wichtig:** Kein staatliches Zertifikat, keine behördliche Zertifizierung, keine
EU-Akkreditierung — siehe [LEGAL_POSITIONING.md](./LEGAL_POSITIONING.md).

## Schnellstart (Entwicklung)

```bash
npm install
cp .env.example .env        # AUTH_SECRET setzen!
npx prisma generate
npm run db:init             # SQLite-Schema anlegen (ohne Engine-Download)
# ODER (wenn binaries.prisma.sh erreichbar): npm run db:push
npm run db:seed             # Demo-Daten: 2 Kurse (Basic 17 Module/154 Fragen, KI-Verantwortliche 10 Module/84 Fragen)
npm run dev
```

Demo-Logins nach dem Seed:

| Rolle | E-Mail | Passwort |
|---|---|---|
| Superadmin | sascha.morocutti@gmail.com | Morocutti#Admin2026 |
| Unternehmensadmin | hr@musterfirma.example | Firmenadmin#2026 |
| Teilnehmerin (bestanden, mit Zertifikat) | anna.beispiel@musterfirma.example | Teilnehmer#2026 |
| Teilnehmer (offen) | bernd.tester@musterfirma.example | Teilnehmer#2026 |

**Demo-Passwörter vor Produktivbetrieb ändern bzw. Seed-Nutzer löschen.**

2FA (Google Authenticator): nach Login unter `/settings/2fa` aktivieren —
dringend empfohlen für Superadmin- und Unternehmensadmin-Konten.

## Tests & Build

```bash
npm test        # Vitest: 45 Tests inkl. Wording-Guard-Repository-Scan
npm run build   # Next.js Production Build (Prisma generate läuft via prebuild)
```

## Doku-Index

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Stack, Struktur, Entscheidungen
- [DATABASE.md](./DATABASE.md) — Datenmodell
- [ROLES_AND_PERMISSIONS.md](./ROLES_AND_PERMISSIONS.md) — Rollen & Mandantentrennung
- [COURSE_CONTENT.md](./COURSE_CONTENT.md) — Kursstruktur & Didaktik
- [EXAM_LOGIC.md](./EXAM_LOGIC.md) — Prüfungslogik & Nachschulung
- [CERTIFICATE_LOGIC.md](./CERTIFICATE_LOGIC.md) — Zertifikate & Verifikation
- [I18N_TRANSLATION_GUIDE.md](./I18N_TRANSLATION_GUIDE.md) — Mehrsprachigkeit
- [LEGAL_POSITIONING.md](./LEGAL_POSITIONING.md) — Rechtliche Positionierung
- [UX_GUIDE.md](./UX_GUIDE.md) — UX-Prinzipien & Design
- [API.md](./API.md) — Routen & Server Actions
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Produktivbetrieb, Postgres, Mail
- [DSGVO.md](./DSGVO.md) — Löschkonzept, AVV, TOMs
- [QUALITY_CHECK.md](./QUALITY_CHECK.md) — Qualitätsprüfung
- [DAILY_LOG.md](./DAILY_LOG.md) — Arbeitsprotokoll
- [AGENT_HANDOVER.md](./AGENT_HANDOVER.md) — Übergabe an weitere Agenten
- [AGENT_TASKS.md](./AGENT_TASKS.md) — Aufgabenteilung für Multi-Agenten-Arbeit
- [TODO.md](./TODO.md) — Offene Punkte
- [CHANGELOG.md](./CHANGELOG.md) — Änderungshistorie
