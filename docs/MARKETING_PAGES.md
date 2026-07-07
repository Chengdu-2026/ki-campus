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
| `/themen` | **Leadmaschine**: Themenwunsch-Umfrage (welche Kurse als Nächstes?) | Siehe unten |
| `/verify/[code]` | Öffentliche Zertifikatsprüfung | datensparsam |
| Rechtsseiten | /impressum, /datenschutz, /agb, /legal-disclaimer, /ki-transparenz | formaler Stil, NICHT lockern |

## Regeln für Feature-/Roadmap-Seiten

1. **Keine falschen Verfügbarkeitsbehauptungen.** Nicht implementierte
   Funktionen werden ausschließlich als „geplante Erweiterung"/Roadmap
   dargestellt. Status kommt aus `config/app.ts → featureFlags`
   („planned" | "beta" | "live") und wird über i18n-Status-Labels gerendert —
   nie automatisch „Verfügbar" schreiben.
2. **Keine Zertifizierungs- oder Compliance-Garantien.** Verboten sind alle
   Behauptungen staatlicher/behördlicher Anerkennung, jeder Zertifizierungs-
   oder Konformitäts-Garantie und jedes Audit-Ersatzes — die maßgeblichen
   Verbotslisten stehen in `lib/wording-guard.ts` (repo-weites Test-Gate)
   und `lib/content-audit/logic.ts → AUDIT_RISK_WORDS` (Inhalts-Scanner).
   Erlaubt: „unterstützt eine ISO-9001-orientierte QM-Logik, ohne eine
   ISO-Zertifizierung zu ersetzen".
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

## Seite /themen — Leadmaschine (angelegt 2026-07-07)

- Zweck: Portfolio-Steuerung durch Nachfrage-Daten. Interessenten wählen
  Wunschthemen (8 Kandidaten, `lib/leads.ts → LEAD_TOPIC_KEYS`, Texte
  `themen.t1…t8`) + Freitext; Kontakt OPTIONAL und nur mit Einwilligung.
- Dateien: `app/themen/page.tsx` (Formular, Server Action, ohne Client-JS),
  `app/actions/lead-actions.ts` (Zod-Validierung, Honeypot-Feld „website",
  Datensparsamkeit: Kontaktdaten werden ohne Consent NICHT gespeichert),
  Modell `InterestLead` (prisma/schema.prisma + init.sql synchron),
  Auswertung `/admin/leads` (Superadmin: Themen-Ranking + Lead-Tabelle).
- Verlinkt: Footer („Themenwunsch"), Sitemap, CTA „Roadmap-Funktion
  vormerken" auf /ki-kompetenz-review.
- DSGVO: anonym möglich; Consent-Text formal; Hinweis „keine Weitergabe,
  kein Newsletter" — bei Änderung Datenschutzerklärung prüfen (Anwalt-TODO).
- Ausbau-Ideen (TODO): CSV-Export, source-Parameter je Kampagne,
  Double-Opt-in sobald SMTP produktiv.
