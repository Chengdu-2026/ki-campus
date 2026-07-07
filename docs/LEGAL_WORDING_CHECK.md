# Legal-Wording-Check: zwei Schutzschichten

Stand 2026-07-07. Wie die Plattform irreführende Formulierungen verhindert.

## Schicht 1: Repo-weiter Wording-Guard (Bau-Zeit)

`lib/wording-guard.ts` + Test: scannt bei `npm test` das GESAMTE Repository
(Quellcode, Seeds, Mail-Templates, PDF-Texte) gegen die Verbotsliste
(FORBIDDEN_PHRASES). Verneinungen sind über NEGATION_PATTERNS erlaubt.
Diese Liste ist bewusst konservativ — sie muss repo-weit grün bleiben und
darf NICHT aufgeweicht werden (CLAUDE.md).

## Schicht 2: Content-Audit-Risk-Scanner (Inhalts-Zeit)

`lib/content-audit/logic.ts → AUDIT_RISK_WORDS`: schärfere, längere Liste,
die NUR Audit-Snapshots bewertet (nicht den Quellcode). Treffer setzen
riskLevel ≥ HIGH und erscheinen auf der Prüf-Detailseite. Eigene
Negationsregeln: „ersetzt keine Rechtsberatung", „keine ISO-Zertifizierung"
usw. sind gewollte Klarstellungen und lösen keinen Treffer aus.

**Warum zwei Listen?** Die GPT-Vorgabe „wording-guard erweitern" hätte den
repo-weiten Test durch legitime Verneinungen gebrochen (z. B. „ersetzt
Rechtsberatung" als Substring-Kandidat in zig Klarstellungen). Getrennte
Zuständigkeit: Guard = hartes Bau-Gate, Scanner = Prüf-Hinweisgeber.
Begründung im Detail: ROADMAP.md §4.4.

## Erweitern

- Neue verbotene Phrase mit Repo-weiter Gültigkeit → FORBIDDEN_PHRASES
  (wording-guard.ts) + Test bleibt grün? Erst prüfen!
- Neue Risiko-Phrase nur für Inhalts-Reviews → AUDIT_RISK_WORDS
  (lib/content-audit/logic.ts) + Unit-Test ergänzen
  (tests/content-audit.test.ts).
- Checklisten-Punkte (z. B. neue Compliance-Anforderung) → Seed-Templates
  in prisma/seed/index.ts.
