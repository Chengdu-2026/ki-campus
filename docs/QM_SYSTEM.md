# QM-System — Überblick

## Ziel und Positionierung

Das QM-Modul unterstützt dokumentierte Qualitätsprozesse nach ISO-9001-Logik:
Feedback erheben, Abweichungen erkennen, Korrekturmaßnahmen (CAPA) steuern,
Wirksamkeit prüfen, Management-Reviews durchführen. Es erzeugt Nachweise,
die in einem späteren externen Audit verwendet werden können.

**Klarstellung:** Das Modul ist selbst KEINE Zertifizierung. Es gibt keine
ISO-Zertifizierung durch die Nutzung der Plattform, kein Audit wird ersetzt
und keine behördliche oder staatliche Anerkennung entsteht. Zertifizierung
setzt immer ein externes Audit durch eine akkreditierte Stelle voraus —
das Modul liefert dafür lediglich die dokumentierte Prozessbasis.

## Rollen

| Rolle | Rechte im QM-Modul |
|---|---|
| Teilnehmer | Gibt Feedback ab (`/feedback/[courseId]`), sieht nur eigenes Feedback |
| Firmenadmin | `/company/qm` inkl. Unterseiten; ausschließlich Daten der eigenen Firma (assertCompanyScope in allen Actions) |
| Trainer | Read-only auf Firmen-QM-Daten, keine Mutationen |
| Superadmin | Global: `/admin/qm` inkl. Schwellenwerte, Review-Vorlagen, Reports, `/admin/versions` |

## Erzeugte Nachweise

- Feedback-Rohdaten und Auswertungen (FeedbackSurvey/-Question/-Response/-Answer)
- Qualitätsfälle (QualityIssue) mit Schweregrad, Status und Dedupe-Schutz
- Korrekturmaßnahmen (CorrectiveAction) mit Ursache, Maßnahme, Verantwortlichem,
  Frist und Wirksamkeitsprüfung
- Quartalsweise Management-Reviews (ManagementReview) mit Kennzahlen und
  auditierter Freigabe
- Versionsregister der Lerninhalte (ContentRevision, ab Baseline V1.003)
- AuditLog mit oldValue/newValue für nachvollziehbare Änderungen
- Exporte als CSV/PDF (`/api/qm/export/{feedback|issues|actions|reviews}`),
  jeder Export wird auditiert (QM_REPORT_EXPORTED)

## Datenfluss

```
Feedback (Teilnehmer, nach bestandenem Test)
   → Bewertung (lib/qm/logic.ts: Schwellen, NPS, Freitext-Scanner, Quoten)
   → Qualitätsfall (QualityIssue, dedupeKey verhindert Dubletten)
   → Korrekturmaßnahme (CorrectiveAction, CAPA-Statusmaschine)
   → Wirksamkeitsprüfung (Pflicht bei HIGH/CRITICAL)
   → Management-Review (quartalsweise, Kennzahlen automatisch befüllt)
```

Ergänzend laufen 7 Cron-Jobs (siehe CRON_JOBS.md) für Erinnerungen,
Schwellenwert-Prüfungen, Eskalationen, Review-Erzeugung und Wochen-Digest.

## Datenmodell (Übersicht)

| Model | Zweck |
|---|---|
| FeedbackSurvey | Fragebogen-Definition (Standard: 10 Fragen) |
| FeedbackQuestion | Einzelfrage (Rating 1–5, NPS 0–10, Freitext, Ja/Nein) |
| FeedbackResponse | Abgabe eines Teilnehmers je Kurs |
| FeedbackAnswer | Einzelantwort |
| QMThreshold | Konfigurierbare Schwellenwerte (global, `/admin/qm/thresholds`) |
| QualityIssue | Qualitätsfall mit Schweregrad und dedupeKey |
| CorrectiveAction | CAPA mit Statusmaschine und Abschluss-Sperren |
| ManagementReview | Quartalsbericht, idempotent je Firma+Zeitraum |
| ContentRevision | Versionsregister der Inhalte (V1.003, V1.004, …) |
| MaterialDownload | Einmaliger Lernunterlagen-Download je Teilnehmer+Kurs |
| AuditLog (erweitert) | oldValue/newValue je Änderung |

## Mandantentrennung

Firmenadmins sehen ausschließlich Daten der eigenen Firma; jede QM-Action
prüft assertCompanyScope. Der Superadmin arbeitet global. Teilnehmer haben
nur Zugriff auf ihr eigenes Feedback.

## Tests

18 QM-Unit-Tests (Schwellenlogik, Eskalationsstufen, Freitext-Scanner,
CAPA-Abschluss-Sperre, NPS, Ampellogik, Versionslabels) als Teil der
insgesamt 69 Tests. Der Wording-Guard-Test scannt das gesamte Repository
inklusive einer ISO-Verbotsliste, damit keine irreführenden
Zertifizierungsaussagen entstehen.
