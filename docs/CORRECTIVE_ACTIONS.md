# Korrekturmaßnahmen (CAPA)

## Zweck

CorrectiveAction dokumentiert Korrektur- und Vorbeugemaßnahmen zu
Qualitätsfällen (QualityIssue) nach ISO-9001-Logik: Ursache, Maßnahme,
Verantwortlicher, Frist, Wirksamkeit. Die Dokumentation dient als Nachweis
für spätere Audits; sie ist keine ISO-Zertifizierung.

## Felder

| Feld | Inhalt |
|---|---|
| Qualitätsfall | Verknüpfter QualityIssue (Schweregrad LOW/MEDIUM/HIGH/CRITICAL) |
| Ursache | Root-Cause-Analyse (Pflicht für Abschluss) |
| Maßnahme | Beschreibung der Korrektur-/Vorbeugemaßnahme (Pflicht für Abschluss) |
| Verantwortlicher | Owner (Pflicht für Abschluss; fehlt er, eskaliert der Cron) |
| Frist | Fälligkeitsdatum (automatisch: 14 Tage bei HIGH, 7 Tage bei CRITICAL) |
| Status | siehe Statusmaschine |
| Wirksamkeitsprüfung | Ergebnis EFFECTIVE/NOT_EFFECTIVE inkl. Begründung |

## Statusmaschine

```
PLANNED → IN_PROGRESS → IMPLEMENTED → EFFECTIVENESS_PENDING
        → EFFECTIVE / NOT_EFFECTIVE → CLOSED
```

- PLANNED: Maßnahme angelegt (manuell oder als automatischer CAPA-Vorschlag
  bei ACTION_REQUIRED/CRITICAL-Feedback)
- IN_PROGRESS: Umsetzung läuft
- IMPLEMENTED: Umsetzung abgeschlossen
- EFFECTIVENESS_PENDING: Wirksamkeitsprüfung steht aus (wird vom Cron
  `qm-effectiveness-check-reminder` automatisch gesetzt)
- EFFECTIVE / NOT_EFFECTIVE: Ergebnis der Prüfung; bei NOT_EFFECTIVE ist
  eine neue Maßnahme zu planen
- CLOSED: Abgeschlossen (nur wenn Abschlussregeln erfüllt)

## Abschluss-Sperren

Der Abschluss wird serverseitig blockiert (`canCloseCorrectiveAction`,
unit-getestet), wenn nicht vorhanden sind:

1. dokumentierte Ursache
2. dokumentierte Maßnahme
3. benannter Verantwortlicher
4. bei HIGH/CRITICAL: abgeschlossene Wirksamkeitsprüfung

Ein Umgehen über die UI ist nicht möglich, da die Prüfung in der
Server-Action liegt.

## Verantwortliche und Fristen

- Automatisch erzeugte CAPAs erhalten Fristen nach Schweregrad:
  HIGH = 14 Tage, CRITICAL = 7 Tage.
- Fehlt ein Verantwortlicher oder ist die Frist überschritten, eskaliert
  der Cron `qm-capa-due-reminder` an den Firmenadmin.

## Erinnerungs- und Eskalations-Crons

| Cron | Zeitplan | Wirkung |
|---|---|---|
| qm-capa-due-reminder | täglich 07:30 | Erinnert Owner (Template `qm_capa_reminder`); eskaliert an Firmenadmin bei Überfälligkeit oder fehlendem Owner |
| qm-critical-escalation | stündlich | Prüft offene CRITICAL-Fälle, informiert Superadmin |
| qm-effectiveness-check-reminder | täglich 08:30 | Setzt IMPLEMENTED-Maßnahmen auf EFFECTIVENESS_PENDING und erinnert |

Details zu Zeitplänen und Einrichtung: CRON_JOBS.md.

## UI und Export

- Firma: `/company/qm/corrective-actions` (nur eigene Firma, assertCompanyScope)
- Superadmin: `/admin/qm/corrective-actions` (global)
- Export: `/api/qm/export/actions?format=csv|pdf`, auditiert (QM_REPORT_EXPORTED)
- Alle Statusänderungen werden im AuditLog mit oldValue/newValue protokolliert
