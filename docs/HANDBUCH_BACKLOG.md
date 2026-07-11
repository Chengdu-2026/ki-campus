# Handbuch / Produkt — Backlog (Mentor-Feedback + Owner)

Stand 2026-07-09. **Status: ERFASSUNG.** Umsetzung erst nach Owner-Freigabe („Los").
ISO-9001-Orientierung **beibehalten** (für Audit-Readiness) — aber OHNE Zertifizierungs-Behauptung
(siehe „Recht/Wording"). Owner liefert noch Bild + Logo für das Corporate Design.

## P0 — Substanz (macht das Produkt audit-grade)
- **Review-Workflow im Management-Cockpit (ISO-9001-orientiert):** fällige inhaltliche Prüfung
  einplanen; **max. 3 Kapitel/Tag**, **nur Mo–Fr**, **keine österreichischen Feiertage**;
  Freigabe durch den Owner erzeugt das echte „letzte fachliche Prüfung"-Datum; nächste Prüfung per
  Zyklus (Vorschlag halbjährlich). Anbindung an das bestehende Content-Audit-/Review-System
  (ContentAuditItem, ReviewChecklist-Templates, TOTP-Owner-Freigabe) + Management-Review.
- **Echte Pflege-/Prüfdaten** aus dem Review-System ins Handbuch ziehen (kein hartgecodetes Datum;
  Owner-Prinzip: „Ich lese jedes Dokument, dann steht das Datum").
- **QM „Fehler melden"** (Teilnehmer → QualityIssue → CAPA-Workflow), Mail-Fallback im Handbuch existiert.
- **Rollout** des Handbuch-Layouts auf alle 17 Basic-Module + Kurse „KI-Verantwortliche" und
  „Richtig Prompten"; **je Modul ein Entscheidungsbaum** (Mentor-Favorit), z. B. Datenschutz „Darf ich
  eingeben?", Urheberrecht „Darf ich veröffentlichen?", AI Act „Hochrisiko?", Prompting „Prompt vollständig?".

## P1 — Wirkung / Branding (Premium-Look; Owner liefert Logo + Bild)
- Durchgängiges **Corporate Design + Logo**, wiedererkennbare Farbmuster, klare visuelle Identität.
- **Hero „10 Regeln"** mit großem Bild/Illustration statt technischem Kopf (Motive vorhanden:
  `public/modules/*.png` z. B. `datenschutz.png`, `public/images/`, `assets-archiv/`).
- **Box-Hierarchie schärfen:** Warnungen kräftiger, Merksätze freundlicher, Übungen spielerischer
  (aktuell zu uniform).
- Mehr **Persönlichkeit**: Illustrationen/Menschen/Büro/KI statt „Formular".
- **Meta-Badges oben rechts** je Lektion: Zeit, Schwierigkeit (🟢🟠🔴), Praxisnutzen ★, Prüfungsrelevanz ★, Risiko.
- **Dezenter Humor** als Merkhilfe (z. B. „Auch KI blufft" — erfundene Quelle, die es nicht gibt).

## P2 — Produkt / Moat
- **QR-Code je Modul** → 60-Sek-Video / Quiz / Prompt / Download (verbindet Papier ↔ Plattform).
- **Management-Edition** (Handbuch für Geschäftsführung): Pflichten, nötige Nachweise, fehlende
  Richtlinien, empfohlene Audits, Aufbewahrungspflichten → Verkauf an Entscheider.
- **Positionierung:** „ISO-9001-orientierte KI-Kompetenz-Wissensplattform" statt „Schulungsunterlagen",
  konsistent kommunizieren — ohne Zertifizierungs-Claim.
- Promptbibliothek, Reifegrad-Logik, Vorlagenpaket (früher notiert).

## Recht / Wording — FIX (nicht verhandelbar)
- ISO-9001 nur als **„orientiert"/„-reif"** (interne QM-Logik, Audit-Readiness). NIEMALS
  Behauptungen einer staatlichen, behördlichen, EU- oder ISO-Zertifizierung. Die exakte
  Verbotsliste steht in `lib/wording-guard.ts` und wird hier bewusst NICHT zitiert (sonst
  schlägt der Wording-Guard-Scan auf dieser Datei an). Haftungsrisiko.
