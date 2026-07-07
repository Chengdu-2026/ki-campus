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
- **Jede Inhaltsänderung** (Fragen, Lektionen, Module) bekommt einen Eintrag im
  ContentRevision-Register (versionLabel z. B. V1.005, sichtbar unter
  /admin/versions) UND aktualisiert `config/app.ts → contentVersionLabel`.
- **Der Inhaltsstand steht im Footer** (footer.contentVersion) — auf jeder Seite
  sichtbar. Footer-Version, Register und Config müssen übereinstimmen.
- Zertifikate speichern `courseVersion` + `issuedContentSnapshot` zum
  Ausstellungszeitpunkt — nicht anfassen, das ist die Audit-Grundlage.

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
