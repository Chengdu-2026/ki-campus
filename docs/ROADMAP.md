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

## 2. Kurs-Pipeline (Grobkonzepte, Stand 2026-07-07)

Priorisierung datengetrieben über die Leadmaschine (/themen → /admin/leads):
Die Themen-Auszählung entscheidet, welcher Kurs zuerst gebaut wird.
Empfohlene Reihenfolge nach fachlicher Logik (änderbar durch Lead-Daten):

### Kurs 4: „Arbeiten mit KI-Agenten — dein digitaler Assistent im Alltag"
(Arbeitstitel; deckt „Second Brain"-Arbeiten ab.) Baut auf Kurs 3 auf.
Grobkonzept (8–10 Module, Slug-Präfix z. B. `ag-`):
1. Vom Chat zum Agenten: was sich ändert (Dateien, Werkzeuge, Aufgaben)
2. Delegieren statt diktieren: Auftrag, Zwischenstand, Abnahme
3. Dein Projektgedächtnis: Wissensablage, Kontext-Dokumente, Second Brain
4. Anweisungsdateien & Teamregeln: dem Assistenten dauerhaft Regeln geben
   (das „CLAUDE.md-Prinzip" toolneutral: Rollen, Verbote, Stil, Prozesse,
   Pflege/Versionierung — knüpft an Prompt-Bibliothek aus Kurs 3 an)
5. Arbeitsabläufe automatisieren: wiederkehrende Aufgaben, Zeitpläne
6. Sicherheit verschärft: Berechtigungen minimal, Prompt-Injection bei
   Agenten mit Werkzeugzugriff, Freigabeprozesse, Kontrolle vor Wirkung
7. Qualität: Ergebnisse abnehmen, Fehlerquellen, Verantwortung
8. Team-Einführung: Pilot, Regeln, Schulung, Messung
Entscheidung 2026-07-07: „Anweisungsdateien/Teamregeln" wird als Modul in
Kurs 4 integriert — KEIN eigener Kurs (zu schmal für eigenes Zertifikat).

### Kurs 5: „KI für Führungskräfte & Entscheider" (geparkt)
Grobkonzept wie im Handover; Priorität nach Lead-Daten (Thema t3).

### Weitere Kandidaten (nur bei Nachfrage über Leadmaschine)
KI im Vertrieb & Marketing (t4) · KI in HR/Recruiting inkl. Hochrisiko (t5) ·
Datenschutz & KI vertieft (t6) · Branchen-Spezialkurse (t7).

## 3. Video-Policy: externe Videos (YouTube) in Kursen

Grundsatz-Entscheidung (Vorschlag, 2026-07-07):
- **Eigene Inhalte bleiben der Kern.** Externe Videos nur als OPTIONALES
  „Weiterführendes" — nie als Pflicht-Lerninhalt (Qualität, Verfügbarkeit,
  Werbung und Bestand fremder Videos sind nicht kontrollierbar).
- **Verlinken statt einbetten.** Reine Links auf rechtmäßig öffentliche
  YouTube-Videos sind rechtlich unkritisch. Einbetten (iframe) lädt
  Google-Tracking → DSGVO-Einwilligung nötig (Zwei-Klick-Lösung); vorerst
  bewusst NICHT einbetten. Niemals herunterladen/re-hosten/schneiden.
- **Zentral pflegen, nicht einbetonieren:** Links NICHT in Lektionstexte,
  sondern später als eigenes Feld „Weiterführende Links" je Modul (DB oder
  config) — sonst altern Kursinhalte mit jedem toten Link
  (Konsistenz-Pflicht laut CLAUDE.md).
- Kandidatenliste vor Verlinkung IMMER von Sascha sichten (Qualität, Ton,
  keine Konkurrenz-Werbung).

Geprüfte, stabile Kandidaten (Erstliste, Stand Juli 2026):
- Anthropic Learn (Guides/Tutorials, EN): https://www.anthropic.com/learn
- Anthropic Interactive Prompt Engineering Tutorial (EN, kostenlos):
  https://github.com/anthropics/prompt-eng-interactive-tutorial
- OpenAI Prompting-Guides (EN, Entwickler-orientiert): platform.openai.com
- Deutschsprachige YouTube-Grundkurse zu Prompting existieren zahlreich,
  Qualität sehr gemischt — Auswahl erst nach Sichtung durch Sascha.

## 4. Internes Content-Audit-System — Status: GEPLANT
### (Phase 1 nach Superadmin-Paket + Praxistest; Entscheidung Sascha 2026-07-07)

**Ziel:** Jeder KI-generierte oder geänderte Inhalt ist intern sichtbar,
prüfbar und freigebbar. Die Freigabe ist an den ContentHash der konkreten
Version gebunden — ändert sich der Inhalt, verfällt die Freigabe automatisch.
KEIN separates Open-Source-Repo in Phase 1; Extraktion (`human-content-audit`,
MIT) erst nach 2–3 Wochen interner Nutzung (Phase 3). Entwurfsmaterial:
Ordner `AUDIT Repo/` (Zip) + dieser Abschnitt (maßgeblich, enthält Korrekturen).

### 4.1 Grundsatz: Bestehendes erweitern, nichts doppeln
ContentRevision bleibt die technische Versionsbasis; neu: ContentAuditItem
(Prüfstatus, Risiko, Freigabe) verknüpft via contentRevisionId. AuditLog
dokumentiert jede Aktion (bestehende Struktur mit oldValue/newValue).
Question.version + Question.contentHash als Muster für Hash-Anker.
Statusmaschinen-Muster aus CAPA/ManagementReview übernehmen.

### 4.2 Datenmodell (init.sql synchron halten!)
**ContentAuditItem:** id, contentRevisionId?, entityType, entityId,
entitySlug?, title, locale, source (AI_GENERATED|HUMAN_CREATED|AI_ASSISTED|
IMPORTED|TRANSLATED|SYSTEM_GENERATED), status (DRAFT|NEEDS_REVIEW|IN_REVIEW|
CHANGES_REQUESTED|APPROVED|PUBLISHED|REJECTED|ARCHIVED), riskLevel
(LOW|MEDIUM|HIGH|CRITICAL), contentHash, version, currentContentSnapshot,
previousContentSnapshot?, changeSummary?, aiGenerated, reviewedById?/At?,
approvedById?/At?, ownerApprovedById?/At?, publishedAt?, notes?, createdAt,
updatedAt. EntityTypes: MARKETING_PAGE, COURSE, MODULE, LESSON, QUESTION,
ANSWER_OPTION, CERTIFICATE_TEMPLATE, QM_TEXT, LEGAL_PAGE, TRANSLATION,
FEATURE_TEXT, UI_TEXT, OTHER.

**Konfigurierbare Checklisten** (KEINE campus-spezifischen Booleans im
Modell — sonst nie extrahierbar): ReviewChecklistTemplate (name, entityType?,
locale?, isDefault, isActive) → ReviewChecklistItem (key, label, description?,
required, sortOrder, riskLevelIfUnchecked?) → ContentReviewChecklistResult
(auditItemId, templateId, reviewerId, completedAt?, approvedForPublication,
notes?) → ContentReviewChecklistAnswer (checked, comment?).

**Seed: 5 Standard-Templates** — Allgemeiner Content-Review · AI-Act/
Zertifikat/Compliance · ISO/QM · Übersetzungen (inkl. „Maßgeblich ist die
deutsche Fassung") · Rechtstexte (formaler Stil, juristische Prüfung
empfohlen/dokumentiert). Items laut GPT-Auftrag vom 2026-07-07.

### 4.3 Änderungserkennung — WICHTIGE Architektur-Korrektur
Zwei Inhaltswelten, zwei Mechanismen:
- **DB-Inhalte** (Lektionen, Fragen, Kurs-/Modultexte, QM-Texte): Hook in
  den bestehenden Admin-Server-Actions — bei Save Hash berechnen, mit
  freigegebenem Hash vergleichen, bei Abweichung NEEDS_REVIEW + AuditLog.
- **Git-Inhalte** (i18n de.ts, module-details.de.ts, Marketing-/Rechtsseiten):
  KEINE automatische Save-Erkennung möglich → Scan-Script + Cron
  (content-audit-scan): Quellen-Registry je EntityType (Datei + Extraktor),
  Hashes berechnen, Abweichungen als NEEDS_REVIEW anlegen. Ohne diese
  Trennung ist „automatische Erkennung" für die halbe Plattform Fiktion.

### 4.4 Risk-Word-Scanner — Korrektur gegenüber GPT-Auftrag
Den repo-weiten `wording-guard.ts` NICHT pauschal um Wörter wie „ersetzt
Rechtsberatung"/„vollständig compliant" erweitern: Diese Begriffe stehen
repo-weit zigfach in legitimen VERNEINUNGEN („ersetzt keine Rechtsberatung"),
die vorhandenen Negations-Muster decken das nicht ab → npm test würde rot.
Stattdessen: eigener Scanner `lib/content-audit/risk-words.ts` (nutzt
scanText-Mechanik, eigene erweiterte Liste + eigene Negationsregeln) NUR für
Audit-Items. Treffer ⇒ riskLevel ≥ HIGH, NEEDS_REVIEW, AuditLog, Admin-UI.
wording-guard bleibt unangetastet das repo-weite Gate.

### 4.5 Rollen — Korrektur gegenüber GPT-Auftrag
Phase 1: Zugriff NUR Superadmin (bestehendes requireRole). KEINE neuen
Rollen „Owner"/„Content Auditor" ins Role-Enum (Schema+RBAC-Eingriff ohne
Bedarf — es gibt genau einen Prüfer: Sascha). Owner-Freigabe = ownerApproved*-
Felder, vom Superadmin gesetzt (AuditLog-Action OWNER_APPROVED). Pflicht für:
Homepage-Hauptaussagen, Zertifikatstexte, AI-Act-/ISO-/QM-Seiten, Rechtlicher
Hinweis, KI-Transparenz, Preis-/Leistungsversprechen, Feature-Seiten.

### 4.5b Owner-Freigabe-UX: „grüner Haken mit Zeitstempel" (festgelegt 2026-07-07)

So bestätigt der Owner (Sascha) eine Freigabe — auditfest statt nur hübsch:

1. **Checkliste zuerst:** Alle Pflicht-Items des zugeordneten Templates
   müssen abgehakt sein (jede Checkbox wird grün). Der Freigabe-Button ist
   bis dahin gesperrt — serverseitig erzwungen (Muster:
   canCloseCorrectiveAction aus dem CAPA-Modul), nicht nur im UI.
2. **Bestätigungsdialog** mit Zusammenfassung: Titel, EntityType, Version,
   ContentHash (gekürzt angezeigt), Checklisten-Stand.
3. **Re-Authentifizierung bei kritischen Inhalten:** Beim Klick auf
   „Persönlich freigeben" wird der aktuelle TOTP-Code abgefragt
   (bestehende lib/totp.ts wiederverwenden). Damit ist die Freigabe an die
   Person gebunden, nicht an eine offen gelassene Browser-Session — das
   macht aus dem Klick einen belastbaren persönlichen Nachweis.
4. **Serverseitige Speicherung — nichts davon kommt aus dem Formular:**
   ownerApprovedById aus der Session, ownerApprovedAt als Server-Zeit,
   contentHash der freigegebenen Version eingefroren, AuditLog-Eintrag
   OWNER_APPROVED (mit oldStatus/newStatus). AuditLog ist über die UI
   weder änderbar noch löschbar.
5. **Anzeige danach — das Badge lebt am Hash:**
   - GRÜN „✓ Persönlich freigegeben von {Name} am {Datum, Uhrzeit} —
     Version {V}, Hash {kurz}" solange aktueller Hash == freigegebener Hash.
   - GELB/ROT „⚠ Freigabe nicht mehr aktuell — Inhalt geändert am {Datum}"
     sobald der Hash abweicht (die Freigabe verfällt sichtbar, Punkt 
     „Änderung invalidiert Freigabe" wird damit im UI erlebbar).
   - Tabellen-Spalte „persönliche Freigabe": grüner Haken + Datum oder
     rotes Ausrufezeichen; KPI-Karte zählt offene Owner-Freigaben.
6. **PDF-Nachweis je Item** enthält den Freigabeblock (Name, Zeitpunkt,
   Version, Hash, komplette Checkliste mit Haken, Historie) — das ist das
   Dokument für QM-Ordner und Kunden-Audits.

Merksatz: Grün ist nicht die Farbe des Klicks, sondern der Zustand
„freigegebener Hash == aktueller Hash" — nur so kann das Badge nie lügen.

### 4.6 Admin-UI
`/admin/content-audit` (Nav „Inhaltsprüfung"): KPI-Karten (neu/geändert/
live-ohne-Freigabe [rot wenn >0]/Übersetzungen/riskant/Owner-Pflicht/
freigegeben), Tabelle mit Filtern (Status, Risiko, Sprache, Typ, Quelle,
live-ohne-Prüfung, nur Übersetzungen, nur riskant, nur Owner-Pflicht).
`/admin/content-audit/[id]`: Snapshots + einfacher Zeilen-Diff, Hash-Abgleich
(aktuell vs. freigegeben), Scanner-Treffer, Checkliste, AuditLog-Historie;
Aktionen: Prüfung starten / Freigeben / Persönlich freigeben / Änderungen
anfordern / Ablehnen / Als veröffentlicht markieren.

### 4.6b Granularität + Sichtbarkeit ungeprüfter Inhalte (festgelegt 2026-07-07)

**Anforderung Sascha:** Nicht freigegebene Texte, Fotos und Inhalte müssen
klar ersichtlich sein — sonst geht verloren, was noch fehlt.

**Granularität: blockweise, nicht wortwörtlich absatzweise.** AuditItems
bekommen zusätzlich einen optionalen `blockKey`, der an die STABILE
Inhaltsstruktur andockt statt an Absätze:
- Lektion: je didaktisches Feld — `lesson:<slug>#goal|content|example|risk|memo`
  (+ je Mini-Check)
- Frage: je Frage inkl. Optionen+Erklärung als ein Block (Question hat
  bereits version+contentHash — wiederverwenden, nicht doppeln)
- Modul/Kurs: Titel+Beschreibung als Block; Modul-Detailtexte je Slug
- Marketing-/Rechtsseiten: je definierter Abschnitt der Quellen-Registry
  (z. B. `page:home#hero`, `page:ki-transparenz#pruefung`)
- Bilder/Assets: je Datei — `asset:public/modules/<slug>.png`, Hash über
  Dateiinhalt (EntityType ASSET ergänzen)
Begründung gegen echte Absatz-Granularität: Absätze haben keine stabile
Identität — jede Umformulierung verschiebt alle Folge-Hashes und erzeugt
Prüf-Rauschen. Die didaktischen Felder SIND die natürlichen Absätze der
Plattform und bleiben adressierbar.

**Sichtbarkeit — drei Ebenen, damit nichts verloren geht:**
1. **Coverage-Prinzip (das Sicherheitsnetz):** Die Quellen-Registry (§4.3)
   definiert die GESAMTMENGE aller prüfpflichtigen Blöcke. Der Scan legt
   für jeden bekannten Block ein AuditItem an — was nicht freigegeben ist,
   steht damit AUTOMATISCH als offen in der Liste. Es gibt kein „vergessen",
   nur „noch offen". KPI: „Freigegeben 214/230 Blöcke (93 %) — 16 offen".
2. **Prüfmodus-Overlay im Frontend (nur Superadmin, umschaltbar):** Toggle
   „Prüfmodus" im Admin-Header. Aktiv: jeder auditierte Block auf den echten
   Seiten bekommt eine dezente Rahmen-Markierung — GRÜN freigegeben (Hash
   aktuell), GELB nie geprüft, ROT nach Freigabe geändert; Bilder mit
   Eck-Badge. Klick auf Markierung → /admin/content-audit/[id]. Öffentliche
   Besucher sehen davon NIE etwas (kein „ungeprüft"-Stempel nach außen —
   stattdessen greift bei kritischen Inhalten die Veröffentlichungssperre).
3. **Arbeitsliste „Was fehlt noch":** /admin/content-audit gruppiert offene
   Blöcke je Seite/Kurs/Modul mit Fortschrittsbalken (z. B. „Kurs 3:
   28/32 Lektionen freigegeben, 4 offen") — sortiert nach Risiko, dann Alter.

### 4.7 Übersetzungen
Deutsch ist Primärsprache. Ungeprüfte Übersetzungen bleiben NEEDS_REVIEW;
Hinweis „Maßgeblich ist die deutsche Fassung. Übersetzungsfehler vorbehalten."
— nie automatisch auf deutsche Inhalte setzen. Rechtstexte in Fremdsprachen:
Maßgeblichkeit der deutschen Fassung sichtbar, solange nicht juristisch geprüft.

### 4.8 Exporte & Tests
CSV (Items mit Status/Typ/Sprache/Risiko/Prüfer/Datum/Hash-aktuell) + PDF je
Item (pdf-lib wiederverwenden; Version, Hash, Prüfer, Owner-Freigabe,
Checkliste, Historie) — beides auditiert. 10 Tests laut GPT-Auftrag (u. a.
Hash-Änderung invalidiert Freigabe, Approve nur mit vollständiger Checkliste,
Rollen-Sperre, AuditLog je Statuswechsel) + Statusmaschinen-Suite.

### 4.9 Erste echte Charge (verbindet sich mit dem Praxistest!)
Nach Implementierung sofort erfassen: Homepage-Haupttexte, alle 3 Kurse,
Zertifikatstexte, /ki-kompetenz-review, Rechtlicher Hinweis, KI-Transparenz,
alle Fragen seit letzter Freigabe. Neue Doku bei Umsetzung:
CONTENT_AUDIT_SYSTEM.md, CONTENT_REVIEW_WORKFLOW.md, LEGAL_WORDING_CHECK.md.

### 4.10 Bereits erledigt (2026-07-07)
Homepage-/Transparenz-Aussage abgesichert: /ki-transparenz behauptet nicht
mehr pauschal „sämtliche Inhalte wurden geprüft", sondern präzise „die
deutschsprachigen Kerninhalte werden vor Veröffentlichung intern fachlich
geprüft und freigegeben".

## 5. Weitere geplante Erweiterungen (Kurzliste, Details in docs/TODO.md)

- Online-Zahlung Nachprüfung (Stripe) + automatische Freischaltung
- Playwright-E2E-Tests (3 Kernflows), Komplett-Export (ZIP) je Firma
- DSGVO-Self-Service-Export, Trainer-V2, Enterprise-API
- Übungsmodus kursübergreifend (Kursauswahl)
- Leadmaschine ausbauen: CSV-Export, Quellen-Tracking (source je Kampagne),
  Double-Opt-in-Mail sobald SMTP produktiv
