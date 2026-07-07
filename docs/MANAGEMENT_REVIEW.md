# Management-Review

## Zweck

Quartalsweise Bewertung der Qualitätslage je Firma nach ISO-9001-Logik.
Das Review dokumentiert Kennzahlen, Fälle, Maßnahmen und Risiken und dient
als Nachweis für spätere externe Audits. Es ersetzt kein Audit und stellt
keine ISO-Zertifizierung dar.

## Inhalte und automatische Kennzahlenbefüllung

Der Cron `qm-management-review-generator` (monatlich am 1., 06:00) erzeugt
zum Quartalswechsel automatisch einen Draft je Firma mit folgenden
Kennzahlen aus dem Betriebszeitraum:

- Teilnehmerzahl
- Anzahl Prüfungen
- Bestehensquote
- Ø-Prüfungsergebnis
- Ø-Feedback-Bewertung
- Offene und geschlossene Qualitätsfälle
- Offene und geschlossene Korrekturmaßnahmen
- Wirksamkeitsergebnisse (EFFECTIVE/NOT_EFFECTIVE)
- Identifizierte Risiken

Die Erzeugung ist idempotent je Firma+Zeitraum: existiert für das Quartal
bereits ein Review, wird kein zweites angelegt.

## Statusfluss

```
DRAFT → IN_REVIEW → APPROVED → ARCHIVED
```

| Status | Bedeutung |
|---|---|
| DRAFT | Automatisch erzeugt, Kennzahlen befüllt, editierbar |
| IN_REVIEW | Inhaltliche Prüfung durch Firmenadmin/Management |
| APPROVED | Freigegeben; die Freigabe wird im AuditLog protokolliert |
| ARCHIVED | Abgelegt, unveränderlich für die Historie |

Review-Vorlagen verwaltet der Superadmin unter `/admin/qm/review-templates`.

## Freigabe

Die Freigabe (APPROVED) wird auditiert: AuditLog-Eintrag mit Nutzer,
Zeitpunkt und oldValue/newValue. Draft-Erzeugung wird zusätzlich per Mail
angekündigt (Template `qm_review_draft`).

## Export

- CSV und PDF über `/api/qm/export/reviews?format=csv|pdf`
- Jeder Export wird auditiert (QM_REPORT_EXPORTED)
- UI: `/company/qm/reviews` (Firma) bzw. `/admin/qm/reports` (Superadmin)

## Quartalslogik

- Zeiträume: Q1 (Jan–Mär), Q2 (Apr–Jun), Q3 (Jul–Sep), Q4 (Okt–Dez)
- Der Generator läuft monatlich; nur am Quartalsersten entsteht ein neuer
  Draft für das abgelaufene Quartal (übrige Läufe sind No-Ops, dadurch
  robust gegen verpasste oder wiederholte Ausführungen)
- Firmenadmins sehen ausschließlich Reviews der eigenen Firma
  (assertCompanyScope), der Superadmin alle

## GEPLANT: Jährliches KI-Kompetenz-Review (TODO — Spezifikation in ROADMAP.md)

Zusätzlich zum Quartals-Review ist ein jährlicher Review-Typ vorgesehen
(Modell AnnualCompetenceReview, Cron yearly-management-review-generator am
02.01., 06:00): geschulte Teilnehmer, Zertifikate, Auffrischungen,
Bestehensquote, Ø-Testergebnis, häufig falsch/langsam beantwortete
Kategorien, Datenschutz-/Sicherheits-Schwächen, offene und abgeschlossene
Nachschulungen, Wirksamkeit der Nachschulung, Feedback, Kursverbesserungen,
neue Risiken/Tools/Rechtsänderungen, Maßnahmen fürs Folgejahr. Status wie
Quartals-Review (DRAFT → IN_REVIEW → APPROVED → ARCHIVED); Export PDF, CSV
und Audit-Paket. Keine ISO-Zertifizierungs-Behauptungen.
Details: docs/ROADMAP.md Abschnitt 1.8.
