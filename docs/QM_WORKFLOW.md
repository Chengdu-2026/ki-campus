# QM-Workflow

## 1. Feedbackprozess

1. Teilnehmer besteht den Test → im Dashboard erscheint der Link zum
   Feedback-Fragebogen (`/feedback/[courseId]`).
2. Standard-Fragebogen mit 10 Fragen:
   - 5 × Rating 1–5 (Inhalt, Verständlichkeit, Praxisbezug, Technik, Testfairness)
   - 1 × NPS 0–10 (Weiterempfehlung)
   - 2 × Freitext (was war gut / was fehlt)
   - 1 × Ja/Nein + Freitext (Technikprobleme)
   - 1 × Ja/Nein (Interesse an Nachschulung)
3. Ohne Abgabe erinnert der Cron `qm-feedback-reminder` nach 24 Stunden per
   Mail (Template `qm_feedback_reminder`), maximal 2-mal — gezählt über MailLog.
4. Jede Abgabe wird sofort durch `lib/qm/logic.ts` bewertet (unit-getestet).

## 2. Eskalationsstufen

| Stufe | Auslöser | Automatische Aktionen |
|---|---|---|
| 1 — REVIEW_REQUIRED | Ø-Rating < 3,5 (oder NPS ≤ 6) | Qualitätsfall MEDIUM anlegen; Sichtung durch Firmenadmin |
| 2 — ACTION_REQUIRED | Ø-Rating < 3,0 | Fall HIGH; CAPA-Vorschlag automatisch erzeugt; Frist 14 Tage; Mail `qm_bad_feedback` |
| 3 — CRITICAL | Ø-Rating < 2,0 | Fall CRITICAL; Frist 7 Tage; sofortige Superadmin-Mail; stündliche Prüfung durch `qm-critical-escalation` |

Zusätzliche Auslöser unabhängig vom Ø-Rating:
- Technik- oder Testfairness-Rating < 3 → Fall HIGH
- Freitext-Scanner: kritische Begriffe → mindestens NEGATIVE;
  „Datenschutz" oder „rechtlich falsch" → CRITICAL
- Durchfallquote > 25 % → Warnung; > 40 % → Fall HIGH
- Abbruchquote > 20 % → Warnung; > 35 % → Fall HIGH
  (Abbruch = begonnen, nach 30 Tagen kein abgegebener Test)

Details zu allen Schwellen: QM_THRESHOLDS.md.

## 3. CAPA in 10 Schritten

1. **Erfassen** — Fall entsteht automatisch (Bewertungslogik/Cron) oder manuell.
2. **Klassifizieren** — Schweregrad LOW/MEDIUM/HIGH/CRITICAL prüfen bzw. anpassen.
3. **Sofortmaßnahme** — bei CRITICAL unmittelbare Eindämmung dokumentieren.
4. **Ursachenanalyse** — Root Cause im Feld „Ursache" festhalten (Pflicht für Abschluss).
5. **Maßnahme planen** — Korrekturmaßnahme beschreiben, Status PLANNED.
6. **Verantwortlichen und Frist setzen** — ohne Owner eskaliert der Cron
   `qm-capa-due-reminder` an den Firmenadmin.
7. **Umsetzen** — Status IN_PROGRESS → IMPLEMENTED.
8. **Wirksamkeit prüfen** — Status EFFECTIVENESS_PENDING (bei HIGH/CRITICAL
   Pflicht); der Cron `qm-effectiveness-check-reminder` setzt fällige
   Maßnahmen automatisch auf EFFECTIVENESS_PENDING und erinnert.
9. **Bewerten** — EFFECTIVE oder NOT_EFFECTIVE; bei NOT_EFFECTIVE neue
   Maßnahme planen (zurück zu Schritt 5).
10. **Abschließen** — Status CLOSED, sofern die Abschlussregeln erfüllt sind.

## 4. Wirksamkeitsprüfung

Nach Umsetzung wird geprüft, ob die Maßnahme das Problem tatsächlich behoben
hat (z. B. Folge-Feedback, Quotenentwicklung). Ergebnis wird als
EFFECTIVE/NOT_EFFECTIVE dokumentiert. Bei HIGH- und CRITICAL-Fällen ist die
Wirksamkeitsprüfung Pflichtvoraussetzung für den Abschluss.

## 5. Abschlussregeln

Der Abschluss einer CAPA wird serverseitig blockiert
(`canCloseCorrectiveAction`, getestet), wenn nicht dokumentiert sind:

- Ursache (Root Cause)
- Maßnahme
- Verantwortlicher
- bei HIGH/CRITICAL zusätzlich: abgeschlossene Wirksamkeitsprüfung

Abgeschlossene Fälle und Maßnahmen fließen in das quartalsweise
Management-Review ein (MANAGEMENT_REVIEW.md).
