# Öffentliche Marketing- und Info-Seiten

Stand 2026-07-07. Übersicht der öffentlichen Seiten (Middleware PUBLIC_PATHS)
und ihrer Regeln. Schreibstil laut CLAUDE.md/TEXT_REWRITE_LOG.md; rechtliche
Leitplanken via Wording-Guard (npm test scannt das Repository).

| Route | Zweck | Besonderheiten |
|---|---|---|
| `/` | Homepage: Nutzenversprechen, Kurse als nummerierte einklappbare Boxen | Kurse dynamisch aus DB |
| `/pricing` | Pakete & Preise (Flatrate, alle drei Kurse inklusive) | Beträge aus config/Plan-Seeds, nie hardcoden |
| `/features` | Funktionsübersicht | |
| `/schulung` + `/schulung/[modulSlug]` | Lerninhalte transparent vor Buchung; Modul-Detailseiten mit Praxistexten | Detailtexte in lib/module-details.de.ts (Key = Modul-Slug) |
| `/faq` | 29 Fragen inkl. Gesetzes-Fundstellen | |
| `/ki-kompetenz-review` | **Roadmap-Seite** für das GEPLANTE Modul „Jährliches KI-Kompetenz-Review & Auffrischung" | Siehe unten |
| `/verify/[code]` | Öffentliche Zertifikatsprüfung | datensparsam |
| Rechtsseiten | /impressum, /datenschutz, /agb, /legal-disclaimer, /ki-transparenz | formaler Stil, NICHT lockern |

## Regeln für Feature-/Roadmap-Seiten

1. **Keine falschen Verfügbarkeitsbehauptungen.** Nicht implementierte
   Funktionen werden ausschließlich als „geplante Erweiterung"/Roadmap
   dargestellt. Status kommt aus `config/app.ts → featureFlags`
   („planned" | "beta" | "live") und wird über i18n-Status-Labels gerendert —
   nie automatisch „Verfügbar" schreiben.
2. **Keine Zertifizierungs- oder Compliance-Garantien.** Verboten u. a.:
   „ISO-zertifiziert", „garantiert ISO-9001-Konformität", „ersetzt ein Audit",
   „garantiert AI-Act-Konformität", „automatische Compliance", „behördlich
   anerkannt", „offiziell zertifiziert". Erlaubt: „unterstützt eine
   ISO-9001-orientierte QM-Logik, ohne eine ISO-Zertifizierung zu ersetzen".
3. **i18n-Pflicht.** Keine hardcodierten Texte; Keys unter `feature.<name>.*`.
4. **Rechtlicher Hinweis sichtbar** am Seitenende (siehe
   `feature.review.legalNotice` als Muster).
5. **Keine Dummy-Buttons.** CTAs müssen funktionieren (z. B. „Vormerken" als
   Mailto an config contactEmail, solange kein Backend existiert).

## Seite /ki-kompetenz-review (angelegt 2026-07-07, Status: planned)

- Datei: `app/ki-kompetenz-review/page.tsx`; öffentlich via Middleware;
  Footer-Link „Roadmap: Jährliches Review" (footer.reviewRoadmap).
- Feature-Flag: `appConfig.featureFlags.kiKompetenzReview = "planned"`.
- i18n: `feature.review.*` (Titel, Statushinweis, Hero, Warum-Abschnitt mit
  5 Bullets, 6 Funktionskarten, 8 Zielgruppen, QM-Hinweis, 8 Workflow-Schritte,
  Roadmap-Tabelle mit 8 Zeilen — alle Status „geplant", rechtlicher Hinweis).
- CTAs: „KI-Kompetenz Campus ansehen" → `/`; „Roadmap-Funktion vormerken" →
  mailto an config contactEmail mit Betreff „Vormerkung: Jährliches
  KI-Kompetenz-Review".
- Beim Umsetzen des Moduls: Flag je Teilfunktion prüfen und Status-Zeilen
  einzeln auf „beta"/„live" heben — nicht pauschal.
- Spezifikation des dahinterliegenden Moduls: docs/ROADMAP.md Abschnitt 1.
