# Cron-Jobs

Alle 7 QM-Jobs sind als gesicherte API-Routen implementiert:

```
GET /api/cron/<name>
Header: Authorization: Bearer $CRON_SECRET
```

Die Routen sind schedulerneutral — sie funktionieren mit Vercel Cron,
Windows Task Scheduler, crontab/curl oder jedem anderen HTTP-Scheduler.

## Übersicht

| Job | Empfohlener Zeitplan | Aufgabe | Betroffene Tabellen |
|---|---|---|---|
| qm-feedback-reminder | täglich 08:00 | Erinnert Teilnehmer ohne Feedback 24 h nach bestandenem Test, max. 2-mal (Zählung über MailLog) | FeedbackResponse, MailLog |
| qm-threshold-check | täglich 02:00 | Prüft Durchfall-/Abbruchquoten je Firma+Kurs gegen Schwellen; legt Fälle an | QualityIssue, QMThreshold |
| qm-capa-due-reminder | täglich 07:30 | Erinnert an fällige CAPAs; eskaliert an Firmenadmin bei Überfälligkeit oder fehlendem Owner | CorrectiveAction, MailLog |
| qm-critical-escalation | stündlich | Prüft offene CRITICAL-Fälle und eskaliert | QualityIssue, MailLog |
| qm-management-review-generator | monatlich am 1., 06:00 | Erzeugt Review-Drafts mit Kennzahlen; idempotent je Firma+Zeitraum | ManagementReview |
| qm-effectiveness-check-reminder | täglich 08:30 | Setzt umgesetzte Maßnahmen auf EFFECTIVENESS_PENDING und erinnert | CorrectiveAction, MailLog |
| qm-weekly-digest | montags 07:00 | Wochenzusammenfassung an Firmenadmins (Template qm_weekly_digest) | MailLog |

## Fehlerverhalten und Idempotenz

- Bei Fehlern liefert die Route HTTP 500 mit Fehlertext im Body.
- Es gibt keinen eingebauten Retry — die Wiederholung übernimmt der
  externe Scheduler.
- Alle Jobs sind idempotent, Wiederholungen sind daher sicher:
  - qm-threshold-check nutzt den dedupeKey `metric:companyId:courseId:datum`,
    doppelte Fälle entstehen nicht.
  - qm-feedback-reminder zählt Erinnerungen über MailLog (max. 2).
  - qm-management-review-generator erzeugt je Firma+Zeitraum höchstens
    einen Draft.

## Einrichtung

### Vercel Cron (vercel.json)

```json
{
  "crons": [
    { "path": "/api/cron/qm-threshold-check", "schedule": "0 2 * * *" },
    { "path": "/api/cron/qm-capa-due-reminder", "schedule": "30 7 * * *" },
    { "path": "/api/cron/qm-feedback-reminder", "schedule": "0 8 * * *" },
    { "path": "/api/cron/qm-effectiveness-check-reminder", "schedule": "30 8 * * *" },
    { "path": "/api/cron/qm-critical-escalation", "schedule": "0 * * * *" },
    { "path": "/api/cron/qm-management-review-generator", "schedule": "0 6 1 * *" },
    { "path": "/api/cron/qm-weekly-digest", "schedule": "0 7 * * 1" }
  ]
}
```

Vercel sendet den Authorization-Header automatisch, wenn `CRON_SECRET`
als Environment-Variable gesetzt ist.

### Windows Task Scheduler (Beispiel: täglicher Threshold-Check)

```
schtasks /create /tn "QM Threshold Check" /sc DAILY /st 02:00 ^
  /tr "curl -s -H \"Authorization: Bearer %CRON_SECRET%\" https://<domain>/api/cron/qm-threshold-check"
```

### crontab (Linux)

```cron
0 2 * * *  curl -s -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/cron/qm-threshold-check
0 8 * * *  curl -s -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/cron/qm-feedback-reminder
0 * * * *  curl -s -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/cron/qm-critical-escalation
```

Weitere Zeilen analog zur Übersichtstabelle.

## Hinweis zur Architektur

Bewusst kein `node-cron` im Prozess: gesicherte HTTP-Routen bleiben auch
in serverless Umgebungen (Vercel) lauffähig und sind extern testbar
(z. B. per curl mit gültigem Secret).

## GEPLANT: Cron-Jobs des Review-/Auffrischungssystems (TODO)

Für das geplante „Jährliche KI-Kompetenz-Review & Auffrischungssystem"
(Spezifikation: docs/ROADMAP.md Abschnitt 1) sind vier weitere Jobs im
selben Muster (GET /api/cron/<name>, Bearer CRON_SECRET, idempotent)
vorgesehen — noch NICHT implementiert:

| Job | Zeitplan | Aufgabe |
|---|---|---|
| annual-competence-review-check | täglich 03:00 | Zertifikate älter als 11 Monate → „Auffrischung bald fällig"; informiert Firmenadmin, Teilnehmer optional |
| annual-refresh-overdue-check | täglich 04:00 | Älter als 12 Monate → „Auffrischung empfohlen"; älter als 13 Monate → „Auffrischung überfällig" |
| weak-question-analysis | wöchentlich Mo 02:30 | Analysiert falsch/langsam beantwortete Fragen, berechnet schwache Kategorien, erstellt Nachschulungsempfehlungen |
| yearly-management-review-generator | jährlich 02.01., 06:00 | Erstellt Management-Review-Draft fürs Vorjahr, befüllt Kennzahlen automatisch, weist Firmenadmin auf Review hin |
