# Styleguide v1 — KI-Kompetenz-Handbuch (DESIGN-FREEZE)

Stand 2026-07-09. **Verbindlich.** Ab hier keine Design-Experimente mehr — alle 17 Basic-Module
(und später die anderen Kurse) werden strikt nach diesem Standard gebaut. Referenz-Implementierung:
`lernunterlagen/KI-Kompetenz-Handbuch_Modul-05.html`. Generator: `lernunterlagen/_generator.py`.

## 1. Marke & Logo
- Zwei Logos in `public/images/` bzw. `lernunterlagen/img/`:
  `KI-Kompetenz-Logo-hell.png` (heller Grund → **Hellmodus/Druck/weiße Flächen**) ·
  `KI-Kompetenz-Logo-dunkel.png` (dunkler Grund → **Dunkelmodus/Navy-Flächen**).
- Handbuch-Kopf (Navy-Feld): **dunkles Logo, linksbündig**. App-Header: theme-abhängig automatisch.
- Firmenname/©: **Hainan Salzburg Consulting Co., Ltd.** · Website in Handouts: **www.ki-nachweis.at**.

## 2. Farben (fix)
- Navy `#0b1f40`, Navy-2 `#12315f`, Cyan `#06b6d4` / `#0891b2`, Text `#1f2937`, Linien `#e4e8ef`.
- Box-Farben: Lernziel `#0891b2`/bg `#e8fbff` · Beispiel/Do `#0f9d58`/bg `#eafaf0` ·
  Vorsicht/Don't `#c0392b`/bg `#fdece9` · Merksatz `#b7791f`/bg `#fff6da` ·
  Recht `#4f46e5`/bg `#eef0ff` · Story `#b45309`/bg `#fff4e6` · Technik `#0369a1`/bg `#eef6fc`.

## 3. Typografie
- System-Stack: „Segoe UI", system-ui, Roboto, Arial. Fließtext ~11 pt Druck. Überschriften Navy, fett.

## 4. Komponenten (Baukasten — nur diese verwenden)
- **Lernziel-Box**, **Beispiel-Box** („Aus dem Büroalltag"), **Vorsicht-Box**, **Merk-dir-Box**
  (gestrichelt gelb), **Recht-Box** („Orientierung, keine Rechtsberatung"), **Story-Box**
  („So kann es schiefgehen").
- **Do/Don't-Zweispalter**, **Ja/Nein-Tabelle**, **Entscheidungsbaum** (mind. 1 pro Modul),
  **Mini-Übung**, **„Was würdest du tun?"** (A/B/C + Auflösung, im Druck sichtbar),
  **Workbook-Checkboxen** je Lektion (☐ verstanden ☐ betrifft mich ☐ nachfragen),
  **„Wenn…dann"-Schnellindex**, **Cheat-Sheet** „10 Regeln" (Titelblatt).

## 5. Icons (durchgängige Legende)
🟢 Empfehlung · 🟠 Achtung · 🔴 Verbot · 📚 Hintergrund · 💡 Tipp/Merksatz.

## 6. Maskottchen „KI-Campus Mentor" (Eule)
- Assets in `lernunterlagen/img/mascot/` (weißer Grund → auf weißen Flächen bzw. in weißen Chips).
- **Begrüßung** oben je Modul: `hero.png` (Daumen hoch).
- **Pose→Element-Mapping:** ☝️ `pose-point` = Merksatz/Tipp · 🔍 `pose-magnifier` = Vorsicht/prüfen ·
  💻 `pose-laptop` = Beispiel · 📋 `pose-clipboard` = Übung · Emotionen (`emo-*`) = kleine Akzente.
- In farbigen Boxen: Eule in **weißem Chip** (rund/abgerundet), damit kein Kasten sichtbar wird.

## 7. Vertrauens-Badges (Footer, wording-sicher)
🇪🇺 Art. 4 EU AI Act · 🇦🇹 Österreich · 🔒 DSGVO · 📄 Audit-tauglich · 🏢 Für Unternehmen ·
🎓 **Kompetenzbescheinigung** (NICHT „Zertifikat/zertifiziert").

## 8. Seite / Druck
- **A4**, Ränder **oben/rechts/unten 1 cm, links 2 cm** (`@page margin: 10mm 10mm 10mm 20mm`).
- Laufende **Druck-Fußzeile** jede Seite: © + Handbuch-Version + „geprüft/nächste Prüfung" + Seitenzahl.
- Bilder gedeckelt (Cover ≤ ~105 mm Druck, `break-inside: avoid`), `img{max-width:100%}` — Ränder einhalten.

## 9. Versionierung (automatisch anzeigen)
- Versionsleiste oben + Fußzeile aus **Quelle**: `config/app.ts → contentVersionLabel` (global) +
  `config/feature-versions.ts → handbuch` (Feature). Nicht hart eintippen.

## 10. Abkürzungs-/Fachbegriffs-Regel (fest im Code, Owner-Vorgabe)
- **Jede** Abkürzung/Fachbegriff bei **erster Nennung** mit **hochgestellter Nummer** (z. B. KI¹, DSGVO²).
- Am Ende (bzw. je Modul) eine **nummerierte Erklärliste** — Quelle: `lib/glossary.ts`.
- Automatisch im Generator, nicht von Hand.

## 11. QR-Code + Canary (Weitergabe-Schutz + Funnel)
- QR → `www.ki-nachweis.at/register?ref=<eindeutig>` (Anmeldung).
- **Canary:** „ausgegeben für [Name/Firma] · Ausgabe-ID [ID]" in Box + Fußzeile — pro Empfänger
  vom Generator gefüllt (rückverfolgbar bei Weitergabe).

## 12. Lebendes Dokument
- Kopf: „Letzte fachliche Prüfung / Nächste geplante Überprüfung / Änderungsprotokoll".
- **Daten müssen echt sein** — aus dem Content-Audit-/Review-System (nicht dekorativ).

## 13. Rechtliche Leitplanken (nicht verhandelbar)
- Keine Behauptungen einer staatlichen, behördlichen, EU- oder ISO-Zertifizierung (exakte
  Verbotsliste in `lib/wording-guard.ts`, hier bewusst nicht zitiert — sonst schlägt der
  Wording-Guard-Scan auf dieser Datei an).
- ISO 9001 nur **„orientiert"** (Audit-Readiness), keine Zertifizierungs-Behauptung.
- „Orientierung, keine Rechtsberatung"; versionierte DB-Inhalte nur mit Version+Freigabe ändern.
