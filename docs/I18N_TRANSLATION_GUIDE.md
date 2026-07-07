# Übersetzungsleitfaden

## Ziel
Spätere Übersetzung in alle EU-Sprachen ohne Codeänderung. Primärsprache: de.
Vorbereitet: en (Teilübersetzung mit de-Fallback) + 22 weitere Locales in
`config/app.ts → plannedLocales`.

## Architektur

| Inhaltstyp | Ort | Mechanismus |
|---|---|---|
| UI-Texte (Buttons, Fehlermeldungen, Hints, …) | `lib/i18n/<locale>.ts` | `getT(locale)` mit Fallback-Kette locale → de → Key |
| Kurs-/Modul-/Lektionstexte | DB `*Translation`-Tabellen | `pickTranslation(translations, locale)` |
| Fragen & Antwortoptionen | DB `QuestionTranslation`, `AnswerOptionTranslation` | dito |
| Mini-Checks | DB `MiniCheckTranslation` | dito |
| E-Mail-Vorlagen | DB `EmailTemplate` (key+locale) | `sendMail(..., locale)` mit de-Fallback |
| Zertifikatstexte/Disclaimer | `lib/i18n/<locale>.ts` (`certificate.*`) | Zertifikat speichert `locale` |

**Regel: Keine Texte in Komponenten hardcoden.** Falsch: `<button>Test starten</button>`.
Richtig: `<button>{t("exam.start")}</button>`.

## Key-Schema

`bereich.unterbereich.name`, camelCase, Platzhalter `{{name}}`:
common.save · nav.dashboard · exam.start · exam.result.passed → `exam.resultPassed`
· certificate.download → `certificate.downloadPdf` · lesson.continue →
`dashboard.ctaContinue` · admin.inviteUser → `company.inviteUser` ·
legal.privateCertificateNotice → `footer.disclaimerShort`.

## Neue Sprache hinzufügen (z. B. fr)

1. `lib/i18n/fr.ts` anlegen (Kopie von `de.ts`, übersetzen), in `lib/i18n/index.ts`
   registrieren.
2. Locale in `config/app.ts → supportedLocales` eintragen.
3. DB-Übersetzungen ergänzen: `CourseTranslation`, `ModuleTranslation`,
   `LessonTranslation`, `MiniCheckTranslation`, `QuestionTranslation`,
   `AnswerOptionTranslation`, `EmailTemplate` je fr.
4. **Juristische Prüfung:** Disclaimer & Zertifikatstexte je Sprache anwaltlich
   prüfen lassen; Prüfungsfragen fachlich reviewen.
5. QA: `npm test` (Wording-Guard braucht ggf. sprachspezifische Verbotsliste!)
   und Testdurchlauf in der neuen Sprache.

## Konsistenzregeln

- Juristische Begriffe konsistent übersetzen („privater Schulungsnachweis" hat je
  Sprache genau EINE festgelegte Entsprechung — Glossar hier pflegen).
- Einfache Sprache beibehalten (Zielgruppe: Büro, nicht Jura/IT).
- `de` bleibt Referenz; fehlende Keys fallen automatisch auf de zurück.
