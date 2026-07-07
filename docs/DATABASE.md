# Datenmodell

Quelle der Wahrheit: `prisma/schema.prisma`. Alternative DDL: `prisma/init.sql`.

## Entitäten (Überblick)

| Model | Zweck | Mandantenbezug |
|---|---|---|
| Company | Unternehmen (Name, Adresse, UID, Plan, Logo) | — |
| Plan | BASIC / BUSINESS / ENTERPRISE inkl. Limits & Preisen | global |
| User | Nutzer mit Rolle, Status, locale, theme | companyId |
| Course / CourseTranslation | Kurs inkl. Version, Unterrichtseinheiten | global |
| Module / ModuleTranslation | 27 Module (17 Basic + 10 Officer), sortiert | via Course |
| Lesson / LessonTranslation | Lektionen (Lernziel, Text, Beispiel, Risiko, Merksatz) | via Module |
| MiniCheck / MiniCheckTranslation | Verständnisfragen je Lektion | via Lesson |
| LessonProgress | Abschluss je Nutzer+Lektion (unique) | via User |
| Question / QuestionTranslation | Fragenpool: Kategorie, Schwierigkeit, Praxisfall, Tags, aktiv, Version | via Course |
| AnswerOption / AnswerOptionTranslation | 4 Optionen je Frage, correct-Flag | via Question |
| Exam | Prüfungskonfig je Kurs: Fragenzahl, Bestehensgrenze, Versuche, Zeitlimit, Resume-Fenster | via Course |
| ExamAttempt | Versuch: Status, gezogene Fragen (JSON), Ergebnis, IP/UA optional | userId |
| ExamAnswer | Antwort je Frage (JSON der Options-IDs), correct | via Attempt |
| Certificate | Nummer, verifyCode, Status VALID/REVOKED, validUntil, pdfHash, Snapshot, courseVersion, locale | companyId |
| Invitation | E-Mail-Link/Code, Ablauf, angenommen | companyId |
| PasswordResetToken | 1h gültig, einmalig | userId |
| AuditLog | Aktion, Entität, Metadata JSON, IP/UA | companyId optional |
| MailLog | Dev-Mailausgang / Prod-Protokoll | — |
| EmailTemplate | Vorlagen je key+locale (Platzhalter {{name}}) | global |
| CompanyLegalProfile | Impressumsdaten des Betreibers (Quelle hainan.at) | global |

## Versionierung

- `Course.version`, `Lesson.version`, `Question.version` werden bei Änderungen erhöht.
- `Certificate` speichert `courseVersion`, `locale` und `issuedContentSnapshot`
  (Modultitel zum Ausstellungszeitpunkt) — nachvollziehbar, welche Inhalte
  ein Teilnehmer absolviert hat.

## Status-Werte (String statt Enum)

- User.role: SUPERADMIN | COMPANY_ADMIN | TRAINER | PARTICIPANT
- User.status / Company.status: ACTIVE | INACTIVE
- ExamAttempt.status: IN_PROGRESS | SUBMITTED | EXPIRED
- Certificate.status: VALID | REVOKED (EXPIRED wird aus validUntil berechnet)
- Question.difficulty: LEICHT | MITTEL | SCHWER
- Kategorien: KI_GRUNDLAGEN, GENERATIVE_KI, DATENSCHUTZ, URHEBERRECHT, BIAS_ETHIK,
  EU_AI_ACT, ART4_KOMPETENZ, UNTERNEHMENSPRAXIS, PROMPTING, FAKTENPRUEFUNG
