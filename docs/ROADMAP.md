# Roadmap

Stand 2026-07-07. Geplante Erweiterungen mit verbindlicher Spezifikation.
Status-Skala je Funktion: **geplant → in Arbeit → beta → live**.
Öffentliche Kommunikation über Feature-Flags (config/app.ts → featureFlags);
nie automatisch „verfügbar" behaupten, solange nicht implementiert.

---

## 1. Jährliches KI-Kompetenz-Review & Auffrischungssystem — Status: GEPLANT

**TODO-Kurztext (verbindlich, von Sascha 2026-07-07):**
„Jährliches KI-Kompetenz-Review und Auffrischungssystem ergänzen. Das System
soll falsch und langsam beantwortete Fragen auswerten, schwache Kategorien
erkennen, gezielte Nachschulung empfehlen und jährliche Management-Review-
Nachweise erzeugen. Ziel ist dokumentierte Wirksamkeitsprüfung und
kontinuierliche Verbesserung im Sinne einer ISO-9001-orientierten QM-Logik."

Öffentliche Roadmap-Seite: `/ki-kompetenz-review` (Feature-Flag
`kiKompetenzReview: "planned"`, i18n `feature.review.*`).

### 1.1 Wording-Leitplanken

- Erlaubt: „Unterstützt dokumentierte Auffrischung, Wirksamkeitsprüfung und
  kontinuierliche Verbesserung."
- Verboten (Wording-Guard beachten): „ISO-9001-zertifiziert", „garantiert
  ISO-konform", „ersetzt ein Audit", „garantiert AI-Act-Konformität",
  „automatische Compliance", „behördlich anerkannt".
- Bezeichnung des Nachweises: „Auffrischungsnachweis KI-Kompetenz" —
  NICHT „neues staatliches Zertifikat".

### 1.2 Jährliche Auffrischung (Empfehlungslogik)

Auffrischung wird empfohlen, wenn eine der Bedingungen zutrifft:
Zertifikat älter als 12 Monate · neue Kursversion vorhanden · relevante
Rechts-/Inhaltsänderung · schwache Kategorien beim Teilnehmer · viele falsche
Antworten · sehr langsame Antworten · Firmenregel „jährliche Wiederholung".

Folgen: Status „Auffrischung empfohlen", Hinweis an Teilnehmer, Sichtbarkeit
für Firmenadmin, Dokumentation im QM-System.

### 1.3 Fragen-Performance erfassen

Je beantworteter Prüfungsfrage speichern: questionId, userId, examAttemptId,
selectedAnswer, isCorrect, responseTimeSeconds, category, difficulty,
courseId, answeredAt.

Antwortzeit-Grenzwerte: < 20 s normal · 20–45 s beobachten · 45–90 s langsam
· > 90 s sehr langsam.

Eine Frage gilt als **kritisch**, wenn: falsch beantwortet ODER sehr langsam
beantwortet ODER mehrfach falsch ODER Kategorie unter 70 %.

### 1.4 Lernlücken (Kategorie-Score je Teilnehmer)

- < 70 %: Nachschulung empfohlen
- < 60 %: Nachschulung dringend empfohlen
- < 50 %: Admin-Hinweis erzeugen

### 1.5 Intelligenter Wiederholungsmodus („Meine Schwachstellen üben")

Teilnehmer sieht: falsch beantwortete Fragen, langsam beantwortete Fragen,
schwache Kategorien, empfohlene Lektionen, kurze Wiederholung, neuer Mini-Test.
Wiederholungsarten: (1) falsche Fragen, (2) langsame Fragen, (3) schwache
Themen, (4) Jahresauffrischung, (5) neue Inhalte seit letzter Schulung.

### 1.6 Auffrischungstest

Kurzer Review-Test statt Pflicht-Komplettkurs: 15–20 Fragen mit Fokus auf
geänderte Inhalte, frühere Fehler, langsame Antworten, Risikothemen
(Datenschutz, EU AI Act, Informationssicherheit, Tool-Freigabe).
Bei Bestehen: Auffrischung dokumentieren, neues Review-Datum, optional
„Auffrischungsnachweis KI-Kompetenz".

### 1.7 Firmenadmin-Ansicht „Auffrischung & Review"

Kennzahlen: bald ablaufende Zertifikate, Auffrischung empfohlen/überfällig,
schwache Kategorien je Abteilung, häufig falsche Fragen, langsame Fragen,
offene Nachschulungen, abgeschlossene Auffrischungen.

Ampel: **Grün** < 10 % Auffrischung offen, keine kritischen Kategorien ·
**Gelb** 10–25 % offen, einzelne schwache Kategorien · **Rot** > 25 % offen,
Datenschutz/Sicherheit/EU-AI-Act unter 70 %, viele Überfällige.

### 1.8 Jährliches Management-Review (Erweiterung des QM-Systems)

Jährlicher Review-Typ zusätzlich zum Quartals-Review. Inhalte: geschulte
Teilnehmer, ausgestellte Zertifikate, Auffrischungen, Bestehensquote,
Ø-Testergebnis, häufig falsche/langsame Kategorien, Datenschutz-/Sicherheits-
Schwächen, offene/abgeschlossene Nachschulungen, Wirksamkeit der
Nachschulung, Teilnehmer-Feedback, notwendige Kursverbesserungen, neue
Risiken/Tools/Rechtsänderungen, Maßnahmen fürs Folgejahr.
Status: DRAFT → IN_REVIEW → APPROVED → ARCHIVED. Export: PDF, CSV, Audit-Paket.

### 1.9 Neue Cron-Jobs (geplant)

| Job | Zeitplan | Aufgabe |
|---|---|---|
| annual-competence-review-check | täglich 03:00 | Zertifikate > 11 Monate → „Auffrischung bald fällig", informiert Firmenadmin (Teilnehmer optional) |
| annual-refresh-overdue-check | täglich 04:00 | > 12 Monate → „Auffrischung empfohlen"; > 13 Monate → „überfällig" |
| weak-question-analysis | wöchentlich Mo 02:30 | Analysiert falsche/langsame Fragen, berechnet schwache Kategorien, erzeugt Nachschulungsempfehlungen |
| yearly-management-review-generator | jährlich 02.01., 06:00 | Erzeugt Management-Review-Draft fürs Vorjahr, befüllt Kennzahlen, informiert Firmenadmin |

### 1.10 Geplante Datenbankmodelle (init.sql synchron halten!)

**QuestionPerformance:** id, userId, companyId, courseId, questionId,
examAttemptId, category, difficulty, isCorrect, responseTimeSeconds, answeredAt.

**CompetenceRefreshRecommendation:** id, userId, companyId, courseId,
certificateId, reason (CERTIFICATE_OLDER_THAN_12_MONTHS, LOW_CATEGORY_SCORE,
MANY_WRONG_ANSWERS, SLOW_ANSWERS, NEW_COURSE_VERSION, LEGAL_UPDATE,
COMPANY_POLICY), status (RECOMMENDED, ASSIGNED, IN_PROGRESS, COMPLETED,
DISMISSED), recommendedAt, dueDate, completedAt?.

**AnnualCompetenceReview:** id, companyId, year, periodStart, periodEnd,
totalParticipants, certificatesIssued, refreshRecommended, refreshCompleted,
averageScore, passRate, weakCategories JSON, slowCategories JSON,
topWrongQuestions JSON, improvementActions, managementDecision, status,
createdAt, approvedAt?, approvedById?.

### 1.11 UI-Texte (einfach, i18n-fähig)

Teilnehmer: „Deine Schulung ist fast ein Jahr her. Wir empfehlen eine kurze
Auffrischung." · „Du hast in einigen Themen länger gebraucht oder Fragen
falsch beantwortet. Starte hier eine gezielte Wiederholung." · „Keine Sorge.
Es geht nicht ums Bloßstellen, sondern darum, die wichtigen Punkte sicher zu
verstehen."

Firmenadmin: „Für diese Teilnehmer wird eine Auffrischung empfohlen." ·
„Die Kategorie Datenschutz liegt unter dem Schwellenwert. Eine Nachschulung
wird empfohlen." · „Dieses Review hilft Ihnen, Schulungsqualität und
KI-Kompetenz jährlich zu bewerten."

### 1.12 Akzeptanzkriterien

Fertig erst, wenn: Antwortzeiten je Frage gespeichert · falsche Fragen
gespeichert · schwache Kategorien berechnet · jährliche Auffrischung
empfohlen · Teilnehmer-Wiederholungsmodus startbar · Firmenadmin sieht
Auffrischungsbedarf · Management-Review jährlich erzeugt · PDF/CSV-Export ·
Cron-Jobs dokumentiert · keine ISO-Zertifizierung behauptet · alle Texte
i18n-fähig · Mandantentrennung · AuditLog für alle relevanten Aktionen.

### 1.13 Roadmap-Status je Funktion

| Funktion | Status |
|---|---|
| Antwortzeiten je Frage speichern | geplant |
| Falsch beantwortete Fragen auswerten | geplant |
| Schwache Kategorien erkennen | geplant |
| Gezielte Nachschulung empfehlen | geplant |
| Jährliche Auffrischung nach 12 Monaten | geplant |
| Firmenadmin-Übersicht | geplant |
| Management-Review-Export | geplant |
| QM-Dokumentation | geplant |

---

## 2. Weitere geplante Erweiterungen (Kurzliste, Details in docs/TODO.md)

- Online-Zahlung Nachprüfung (Stripe) + automatische Freischaltung
- Playwright-E2E-Tests (3 Kernflows), Komplett-Export (ZIP) je Firma
- DSGVO-Self-Service-Export, Trainer-V2, Enterprise-API
- Übungsmodus kursübergreifend (Kursauswahl)
- Führungskräfte-Kurs (nur Grobkonzept, bewusst zurückgestellt)
