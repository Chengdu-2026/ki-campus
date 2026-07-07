# CLAUDE.md — Verbindliche Projektregeln

Multi-Tenant B2B-SaaS „KI-Kompetenz Campus": Schulung → Test → privater
Schulungsnachweis (PDF + QR-Verify) → Firmen-Reporting.
Einstieg für Agents: `docs/AGENT_HANDOVER.md` (immer zuerst lesen und am Ende pflegen).

## SCHREIBSTIL (fix verankert — gilt für JEDEN neuen Text)

**Menschlicher Praxisstil** („wie einem Kollegen erklären") für alle Lern-,
Marketing- und Nutzertexte:

- **du-Form** in Lerninhalten, Modulbeschreibungen und Modul-Detailseiten.
- **Konkrete Alltagssituationen statt Theorie.** Jede Erklärung bekommt
  mindestens ein echtes Beispiel aus dem Büroalltag („Du schreibst ein Angebot
  und lässt ChatGPT …"), keine akademischen Abstraktionen.
- **Ehrliche Warnungen, klare Ansagen.** Risiken direkt benennen, nichts
  schönreden. Kurze Sätze. Kein Marketing-Blabla, kein Katalog-Nebel.
- **Merksätze und Faustregeln**, die man sich merken kann.
- **Abkürzungen erklären** (KI, LLM, GPAI, Bias, DSGVO, EU AI Act, 2FA, AVV …)
  — auf öffentlichen Seiten über das Abkürzungs-Glossar (`lib/glossary.ts`).

**Formaler Stil** (sachlich, juristisch präzise, NIEMALS lockern):
AGB, Datenschutz, Impressum, Rechtlicher Hinweis, KI-Transparenz,
Zertifikat-Disclaimer, AVV, Widerruf/Zahlung. QM-/Admin-Texte: sachlich, kurz.

Details und Historie: `docs/TEXT_REWRITE_LOG.md` (nach Textarbeit fortschreiben).

## RECHTLICHE LEITPLANKEN

- KEINE staatlich/behördlich klingenden Aussagen. `lib/wording-guard.ts`
  erzwingt das repo-weit über `npm test` — Verbotsliste dort NICHT aufweichen.
- Zertifikat = privater Schulungsnachweis. Keine Zertifikate ohne bestandenen Test.
- `lib/i18n/de.ts → certificate.disclaimer` ist juristisch fixiert.

## NICHT ANFASSEN OHNE PRÜFUNG

`prisma/schema.prisma` (init.sql synchron halten) · `lib/auth.ts` ·
`middleware.ts` · `lib/tenancy.ts` · `lib/certificate/number.ts` + `issue.ts` ·
`lib/wording-guard.ts` + Test · `config/app.ts` (zentrale Config, nichts duplizieren).

## VERSIONIERUNG (fix verankert)

- **Jede Frage trägt eine Versionsnummer** (`Question.version` + `contentHash`).
  Bei jeder inhaltlichen Änderung einer Frage: `version` hochzählen — nie
  still überschreiben.
- **Zwei Versions-Spuren (Eigentümer-Vorgabe vom 2026-07-07):**
  1. **Global (Footer):** `config/app.ts → contentVersionLabel` = die „letzte
     höchste Version" = Summe aller Verbesserungen. Klettert bei jedem Release
     weiter, geht nie zurück; sichtbar im Footer (footer.contentVersion) auf
     jeder Seite.
  2. **Pro Feature (Badge):** Jedes Feature hat eine eigene Version in
     `config/feature-versions.ts`, startet bei **V1.001** und wird NUR
     hochgezählt, wenn genau dieses Feature geändert wird. Angezeigt als
     `<VersionBadge feature="…">` auf der jeweiligen Seite/Modul. **Alte Features
     nicht neu nummerieren** („alte Sachen lassen").
- **Jede Inhalts-/Feature-Änderung** bekommt einen Eintrag im ContentRevision-
  Register (`/admin/versions`): Inhalte (Kurse/Module/Lektionen/Fragen) mit ihrem
  Label; Features mit `entityType FEATURE`, `entityId` = Feature-Key und eigener
  Feature-Version (V1.001…). Der globale `contentVersionLabel` wird beim Release
  hochgezählt. Footer (global), Register und Config müssen zueinander passen.
- Zertifikate speichern `courseVersion` + `issuedContentSnapshot` zum
  Ausstellungszeitpunkt — nicht anfassen, das ist die Audit-Grundlage.
- Gilt auch für Bilder/Assets und alle öffentlichen Texte: jede Änderung
  ist eine neue Version. Mit dem Content-Audit-System (ROADMAP §4) wird
  die Freigabe hash-gebunden — Änderung invalidiert die Freigabe.

## ERST PRÜFEN, DANN BAUEN (fix verankert — Regel vom 2026-07-07)

Vor JEDEM Neubau (Model, Funktion, Seite, Regel, Doku) prüfen, ob es schon
existiert oder erweiterbar ist — repo-weit greppen UND docs/ lesen
(AGENT_HANDOVER, ROADMAP, TODO, ARCHITECTURE). Erst wenn nichts Passendes
existiert, neu bauen. Wiederverwendung im Arbeitspaket dokumentieren
(„erweitert X statt Neubau"). Beispiele für vorhandene Bausteine, die gern
übersehen werden: ContentRevision, AuditLog (oldValue/newValue),
Question.contentHash, wording-guard, CAPA-/Review-Statusmaschinen, totp.ts,
optionalImage(), seedCourse(), bestehende Cron-Route-Muster.

## KONSISTENZ-PFLICHT (fix verankert — Regel vom 2026-07-07)

**Jede Ergänzung macht bestehende Texte potenziell falsch.** Wer etwas Neues
hinzufügt (Kurs, Modul, Feature, Preis, Plan, Seite), MUSS im selben
Arbeitspaket alle abhängigen Texte auf Aktualität prüfen. Checkliste der
typischen Fundstellen (repo-weit greppen, nicht raten):

- Zahlwörter und Zählungen: „beide/zwei/drei Kurse", Modul-/Lektionen-/
  Fragenzahlen, Kategorienzahlen — in `lib/i18n/de.ts`, `app/**` (v. a.
  Homepage, /features, /pricing, /schulung, /courses, FAQ), Plan-Features
  im Seed, Metadata/SEO-Texte, `app/sitemap.ts`.
- Slug-abhängige Maps: `config/app.ts → courseCertificateTitleKeys`,
  `app/courses/page.tsx → RECOMMENDATION_KEY/COURSE_ICON`,
  `lib/module-details.de.ts`, Modulbilder `public/modules/<slug>.png`.
- `lib/glossary.ts`: neue Fachbegriffe in neuen Überschriften brauchen
  Glossar-Einträge.
- Middleware PUBLIC_PATHS + Footer-/Nav-Links + Sitemap bei neuen Seiten.
- Doku: COURSE_CONTENT, CHANGELOG, TODO, AGENT_HANDOVER, DAILY_LOG,
  TEXT_REWRITE_LOG, ggf. ROADMAP/MARKETING_PAGES.
- Historische Log-Einträge (DAILY_LOG/CHANGELOG-Vergangenheit) NICHT
  umschreiben — nur gegenwartsbezogene Texte.

Faustregel: Nach jedem Arbeitspaket einmal greppen nach den alten Zahlen/
Formulierungen, die durch die Änderung veraltet sein könnten.

## ENTWICKLUNGSREGELN

- Keine Dummy-Buttons. Keine hardcodierten Texte — UI-Strings über
  `t()`/`lib/i18n/de.ts`, Kursinhalte über Translation-Tabellen (DB/Seeds).
- Mandantentrennung: `assertCompanyScope`. Jede Admin-Mutation ins AuditLog.
- Bilder optional einbinden über `lib/assets.ts → optionalImage()` —
  nie hart verdrahten, Seite muss ohne Bild funktionieren.
- Nach jedem Arbeitspaket: `npm test` und `npm run build` grün +
  `docs/DAILY_LOG.md`, `docs/CHANGELOG.md`, `docs/TODO.md`,
  `docs/AGENT_HANDOVER.md` aktualisieren.

## ARBEITSWEISE FÜR AGENTS (Erwartung des Eigentümers)

Direkt, klar, umsetzungsorientiert. Schwächen, Risiken und blinde Flecken offen
benennen statt schönreden. Bestehendes reparieren/umbauen statt neu erfinden.
Prozesse standardisieren und skalierbar halten. Entscheidungsreife Vorschläge
statt Theorie.
