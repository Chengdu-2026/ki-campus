# Live-Test-Bericht: Öffentliche Seiten + Wording/AI-Act

## 1. Stammdaten
- Feature: Öffentliche Seiten (Homepage, Preise, Legal) + Wording-Guard live
- Revisionsnummer: V0.10.0 / Gesamtstand V1.008
- Testdatum: 2026-07-08
- Tester / Agent: KI-CAMPUS-LIVE-QA-AUDITOR (Claude in Chrome)
- Umgebung: localhost:3000 (next dev), Windows, Chrome (Browser 1)
- Rollen: nicht eingeloggter Besucher
- Testdaten: keine (öffentliche Seiten)

## 2. Ziel
Prüfen, ob die öffentlichen Kern- und Rechtsseiten live erreichbar sind, korrekt
rendern (keine rohen i18n-Keys), und ob die AI-Act-Wording-Leitplanken eingehalten
werden (keine der in lib/wording-guard.ts hinterlegten Verbotsformulierungen).

## 3. User Journey
Besucher öffnet Homepage → Preise → KI-Transparenz → Rechtlicher Hinweis →
Impressum → Datenschutz → AGB. Footer geprüft.

## 4./5. Erwartet vs. Tatsächlich
Alle Seiten erreichbar (HTTP 200, echter Inhalt), sauberes Deutsch, keine rohen
Keys, Wording innerhalb der Leitplanken. → **Erfüllt**, mit einer Ausnahme (siehe §7).

## 6. Geprüfte Seiten (visuell + Seitentext verifiziert)
| # | Seite | URL | Ergebnis |
|---|-------|-----|----------|
| 1 | Homepage | / | ✅ CTA, Nav, Vorlesen, Dark-Mode, 3 Kurse (17/10/10) |
| 2 | Preise | /pricing | ✅ Basic 129 / Business 299 / Enterprise auf Anfrage, Pro-Kopf-Anker |
| 38 | KI-Transparenz | /ki-transparenz | ✅ „mit KI erstellt", keine autom. Personen-Entscheidung, Stand 08.07.2026 |
| 39 | Rechtlicher Hinweis | /legal-disclaimer | ✅ „ersetzt keine Rechtsberatung", saubere Verneinungen |
| 41 | Impressum | /impressum | ✅ vollständig (Firma, Legal Rep, Codes, Kontakt AT/CN) |
| 40 | Datenschutz | /datenschutz | ✅ datensparsame Verify, AVV-Hinweis, Drittland (CN) offengelegt |
| 42 | AGB | /agb | 🟡 Rechtscharakter korrekt, ABER interner Hinweis öffentlich (§7) |

Hinweis: Screenshots konnten in dieser Umgebung nicht als PNG-Dateien persistiert
werden (Chrome-Tool: „not persisted to disk"). Beweisführung daher über erfasste
Seitentexte (oben zusammengefasst) + visuelle Live-Auswertung durch den Agenten.

## 7. Gefundene Fehler
| Prio | Bereich | Beschreibung | Empfehlung |
|------|---------|--------------|------------|
| P2 | /agb (public) | Interner Betreiber-Hinweis öffentlich sichtbar: „Hinweis für den Betreiber: AGB vor Vertrieb durch Rechtsbeistand erstellen lassen — siehe docs/LEGAL_POSITIONING.md". Leakt internen Docs-Pfad, wirkt unfertig. | Aus der öffentlichen AGB-Seite entfernen bzw. als reinen Code-Kommentar führen. |
| P3 | /pricing | Begriff „Re-Zertifizierung" (Fließtext) — grenzwertig, da „Zertifizierung" suggeriert. Kein Verbotsbegriff, aber im Kontext prüfen. | Ggf. „Auffrischung/erneuter Nachweis" statt „Re-Zertifizierung". |

## 8. Fehlende Verdrahtungen
- UI: keine (Nav, Footer-Links, Vorlesen, Theme-Toggle vorhanden)
- Footer: **Inhaltsstand: V1.008** korrekt angezeigt (globale Versions-Spur) ✅
- i18n: keine rohen Keys (z. B. `categories.XYZ`) gesichtet ✅

## 9. Rechtliche / AI-Act-Wording-Prüfung
Geprüfte Verbotsbegriffe (vollständige Liste: lib/wording-guard.ts →
FORBIDDEN_PHRASES): **auf keiner der 7 Seiten gefunden.**
Erlaubte, saubere Formulierungen durchgängig verwendet (privater Schulungs- und
Kompetenznachweis; ersetzt keine Rechtsberatung; nicht um eine staatliche
Zulassung/behördliche Zertifizierung/EU-Akkreditierung).
Bewertung: **unkritisch** (1× P3 zur Stilprüfung „Re-Zertifizierung").

## 10. Ergebnis
- Homepage, Preise, KI-Transparenz, Rechtlicher Hinweis, Impressum, Datenschutz: **BESTANDEN**
- AGB: **TEILWEISE BESTANDEN** (P2 interner Hinweis öffentlich)
- Wording-Guard (live, 7 Seiten): **BESTANDEN**

## 11. Offene Punkte
- [ ] P2: internen Betreiber-Hinweis von öffentlicher /agb-Seite entfernen
- [ ] P3: „Re-Zertifizierung" auf /pricing stilistisch prüfen
- [ ] Screenshots als PNG ablegen (Umgebung erlaubte kein Datei-Speichern)

## 12. Nächste empfohlene Schritte
- Weiter mit Login + neuen Superadmin-Features (Bericht folgt).
- P2 im nächsten Entwickler-Arbeitspaket beheben (kein QA-Fix ohne Auftrag).
