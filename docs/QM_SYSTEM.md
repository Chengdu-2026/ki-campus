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

## Branding-Konsistenz als Qualitätsmerkmal (ab 2026-07-10)

Markenkonsistenz ist Teil der Qualitätsprüfung. Bei Content-Audit/Review und vor jedem
Release wird mitgeprüft, ob Ausgaben die Branding-Regeln aus `CLAUDE.md` (Abschnitt
BRANDING) einhalten: richtiges Logo (theme-abhängig), immer dieselbe Maskottchen-Eule
(„KI-Campus Mentor", nie eine fremde), Farbwelt `brand-*`/`accent-*`, Praxis-Ton,
Kennzeichnung KI-generierter Bilder. Eine Branding-Abweichung wird wie eine inhaltliche
Abweichung als QualityIssue (Kategorie CONTENT) behandelt und über CAPA nachgezogen.

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

## GEPLANT: Jährliches KI-Kompetenz-Review & Auffrischungssystem (TODO)

„Jährliches KI-Kompetenz-Review und Auffrischungssystem ergänzen. Das System
soll falsch und langsam beantwortete Fragen auswerten, schwache Kategorien
erkennen, gezielte Nachschulung empfehlen und jährliche Management-Review-
Nachweise erzeugen. Ziel ist dokumentierte Wirksamkeitsprüfung und
kontinuierliche Verbesserung im Sinne einer ISO-9001-orientierten QM-Logik."

Erweitert das QM-System um: Fragen-Performance-Erfassung (inkl. Antwortzeiten),
Kategorie-Scores mit Schwellen (70/60/50 %), Auffrischungsempfehlungen nach
12 Monaten, Firmenadmin-Ampel, jährliches Management-Review und 3 neue
Datenmodelle (QuestionPerformance, CompetenceRefreshRecommendation,
AnnualCompetenceReview). KEINE ISO-Zertifizierung, kein Audit-Ersatz —
erlaubte Formulierung: „Unterstützt dokumentierte Auffrischung,
Wirksamkeitsprüfung und kontinuierliche Verbesserung."
Vollständige Spezifikation: docs/ROADMAP.md Abschnitt 1.
