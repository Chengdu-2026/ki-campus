# Prüfungslogik

Konfiguration je Kurs im Model `Exam` (UI: `/admin/exams`):
Fragen pro Test (Standard 30) · Bestehensgrenze (Standard 75 %) · max. Versuche
(Standard 3) · Zeitlimit optional · Resume-Fenster (Standard 24 h).

## Ablauf

1. **Gate:** Test startet nur, wenn ALLE Pflichtlektionen abgeschlossen sind
   (`hasCompletedRequiredLessons`) und Versuche übrig sind.
2. **Ziehung:** `pickRandom` (Fisher-Yates) wählt N aktive Fragen; Reihenfolge wird
   im Attempt gespeichert (`questionIds` JSON) — Resume zeigt identische Fragen.
3. **Antworten:** jede Antwort wird sofort serverseitig gespeichert
   (`saveAnswer`, upsert je Frage). Browser-Crash ⇒ Versuch ist innerhalb des
   Resume-Fensters fortsetzbar; danach `EXPIRED` (zählt als Versuch).
4. **Wertung:** Frage zählt nur bei exakter Übereinstimmung der korrekten Optionen
   (`isAnswerCorrect`) — Teilpunkte gibt es nicht. Unbeantwortet = falsch.
5. **Ergebnis:** Punkte, Prozent (`calcPercent`, gerundet), bestanden ab
   Bestehensgrenze (`isPassed`, >=). Attempt wird `SUBMITTED`, AuditLog-Eintrag.
6. **Bestanden:** Zertifikat wird automatisch ausgestellt (idempotent, hart
   abgesichert: nie ohne `passed === true`).
7. **Nicht bestanden:** Nachschulungsempfehlung + E-Mail (`exam_failed`).

## Adaptive Nachschulung

- `categoryStats` aggregiert Antworten je Kategorie; < 60 % (config
  `weakCategoryThreshold`) ⇒ „Nachschulung empfohlen".
- Ergebnisseite zeigt: falsche Fragen mit richtiger Antwort + Erklärung,
  Link zur zugehörigen Lektion, Link zu Übungsfragen derselben Kategorie.
- Wiederholungsmodus (`/practice`): falsche Antworten üben, schwache Themen,
  alle Module, Testsimulation — ohne Einfluss auf das Testergebnis.

## Versuchs-Reset

Unternehmensadmin kann nicht bestandene Versuche zurücksetzen
(`resetAttempts`, AuditLog `EXAM_ATTEMPTS_RESET`) — kein Support-Dead-End
nach 3 Fehlversuchen.

Tests: `tests/exam-logic.test.ts`.
