# Agent Tasks — Aufgabenteilung für parallele Arbeit

Status: ✅ erledigt · 🔲 offen. Konfliktarme Aufteilung: je Agent eigene Dateien.

## Agent 1: Architektur und Datenbank ✅
Prisma Schema, Mandantenfähigkeit, Rollenmodell, Seed-Daten.
Akzeptanz: Schema anlegbar (db:init/db:push) ✅ · Seed vollständig (12 Module,
29 Lektionen, 124 Fragen, Demo-Zertifikat) ✅ · Mandantentrennung vorbereitet ✅

## Agent 2: Auth und Rechte ✅
Login, Rollenprüfung, Middleware, Zugriffsschutz.
Akzeptanz: Teilnehmer sieht nur eigene Daten ✅ · Admin nur eigene Firma ✅ ·
Superadmin alles ✅ (tests/rbac.test.ts)

## Agent 3: Kurs und Lerninhalte ✅
Kursstruktur, Module, Lektionen, Mini-Checks, Hints.
Akzeptanz: Lernpfad ✅ · Fortschritt gespeichert ✅ · Inhalte übersetzbar (DB) ✅

## Agent 4: Prüfungsmodul ✅
Fragenpool, Zufallsfragen, Versuche, Auswertung, Wiederholungsmodus.
Akzeptanz: Test ✅ · falsche Antworten gespeichert ✅ · Nachschulung empfohlen ✅

## Agent 5: Zertifikate ✅
PDF, QR-Code, Verifizierungsseite, Zertifikatsnummer.
Akzeptanz: PDF downloadbar ✅ · QR-Verify ✅ · Disclaimer enthalten ✅

## Agent 6: UX, Theme und Mobile ✅
Design, Light/Dark, responsive, Tooltips, leere Zustände.
Akzeptanz: Theme ✅ · mobil bedienbar ✅ · keine unfertigen Seiten ✅

## Agent 7: Internationalisierung ✅ (Struktur) / 🔲 (Übersetzungen)
i18n-Struktur, Sprachdateien, Übersetzungsmodell, kein Hardcoding.
Akzeptanz: Deutsch ✅ · Englisch vorbereitet ✅ · weitere Sprachen ergänzbar ✅ ·
vollständige en-Übersetzung 🔲

## Agent 8: QA und Compliance ✅ (Basis) / 🔲 (E2E)
Tests, verbotene Begriffe, Mandantentrennung, Qualitätscheck.
Akzeptanz: 45 Tests grün ✅ · Wording-Scan grün ✅ · QUALITY_CHECK.md ✅ ·
Playwright-E2E 🔲

## Arbeitsregeln für parallele Agenten
- Vor Start: AGENT_HANDOVER.md + DAILY_LOG.md lesen.
- Schema-Änderungen NUR Agent 1; andere melden Bedarf via TODO.md.
- Jede Änderung: `npm test` + `npm run build` grün, dann DAILY_LOG-Eintrag.
- Keine neuen Texte ohne i18n-Key/Translation-Datensatz.
