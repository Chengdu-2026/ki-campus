# ÜBERGABE — KI-Kompetenz Campus Teil 8 → Teil 9
Datum: 2026-07-11 · Session: „KI Schulung Teil 8" · Letzte Commits: 410d917, 8489629 (main, lokal — NICHT gepusht)

## 1. STAND (verifiziert)
- **Lernunterlagen-Druckansicht LIVE im Code**: `lib/certificate/material-html.ts` (Port des freigegebenen
  Handbuch-Templates: Eule/Masthead/Boxen/Fachbegriff-Fußnoten/Lernfragen kopfüber je Kapitel) +
  Route `app/api/course-material/[courseId]/pdf/route.ts` (HTML-Druckansicht statt pdf-lib, Version je Kurs
  aus `Course.version`, Einmal-Download-Sperre entfernt, personalisierter Stempel Name+Ausgabe-ID).
  Prüfmethode: Container-Rendertest alle 3 Kurse (17 Module/122 PDF-Seiten; Kurs 2 + Kurs 3 einzeln
  gerendert und gesichtet); auf Gerät per grep bestätigt (`renderMaterialHtml` in route.ts).
- **Passwort-Policy zentral**: `lib/password-policy.ts` (min 6, Buchstaben+Zahlen); Server-Schemas
  (`auth-actions.ts`, `company-actions.ts`) + 5 Formulare (users, register, invite, passwort-reset,
  admin/companies) mit minLength=6, pattern, sichtbarem Hinweis; `action-form.tsx` mit opt-in
  `nativeValidation` (Formulardaten gehen bei Fehler nicht mehr verloren). Prüfmethode: tsc sauber,
  Testsuite 110/110 (einziger Rotfall = vorbestehende docs/live-tests/…/00-public/REPORT.md, am Gerät entschärft).
- **de.ts am Gerät intakt**: 67939 Bytes, per `git show HEAD` + python-In-VM-Write wiederhergestellt
  (Bridge hatte Datei verstümmelt), Edits vorhanden (grep=3), EOF geprüft.
- **37/37 Modulbilder**: Kurs 3 (10× `pr-*.png`) neu, Kurs 1+2 (26) aus `Bilder/` ersetzt, Modul 13
  Transparenz vom User ergänzt. Prüfmethode: MD5 paarweise Quelle↔Ziel, 0 Fehler.
- **Brand-Kit platziert**: `public/brand/campus-logo-horizontal.png`, `hsc-adler.png`,
  `mentor/01…10_*.png` (10 Hoodie-Posen). Prüfmethode: MD5. Markenregeln aus
  `MOSA_HSC_Brandpaket_V2.0/README.txt` gelesen (3-Marken-System, siehe Gates).
- **Homepage-Hero + Header**: `app/page.tsx` Navy-Hero (Headline „KI-Pflicht erfüllt…", USP-Chips 24/7 +
  Wissensdatenbank, Trust-Badges, HSC-Betreiberzeile, freigestellte `public/brand/mentor/hero-eule.png`
  1817691 B), `components/layout/header.tsx` Logo h-14/Header h-20, Doppel-Schriftzug entfernt.
  Prüfmethode: Live-Test auf next dev (Container, Port 3005), Screenshots Hell+Dunkel, Theme-Toggle intakt.
- **Pricing-USPs**: `app/pricing/page.tsx` 3 Chips (24/7, wachsende Wissensdatenbank, neue Kurse auf
  Kundenwunsch). Prüfmethode: Live-Test + Screenshot; am Gerät grep=1.
- **Lerninhalte-Umbau**: `app/schulung/page.tsx` Kurs-Accordions (Kurs 1 offen), Modul-Foto-Kacheln
  (3-spaltig, klickbar), volle Lektionsliste hinter <details>. Prüfmethode: Live-Test + Screenshot; grep am Gerät.
- **Commits am Gerät**: 410d917 (page.tsx, header.tsx, hero-eule.png), 8489629 (pricing, schulung) —
  aus User-Terminal bestätigt. Working tree davor clean; Branch main „ahead of origin/main".
- **Kurs-Doku Sicherheit erstellt**: `docs/KURSPLAN_SICHERHEIT.md` (Konzept 5 Kurse S1–S5, Rechtsrahmen
  §§12/14 ASchG, Haftungs-Wording, 4 offene Entscheidungen) + `docs/KURS_S1_SICHERHEITSUNTERWEISUNG.md`
  (S1 komplett: 10 Module/24 Lektionen AUVA-verankert + Musterlektion 9.1 ausformuliert + EU-Sprachstaffel).

## 2. UNVERIFIZIERT / RISIKO
- **Browser-Klicktest des Users** für Hero/Pricing/Schulung am eigenen Rechner: nicht explizit bestätigt
  (committet ja, aber kein „gesehen und gut"). Prüfen: localhost:3005 Startseite, /pricing, /schulung, Theme-Toggle.
- **tsc/Testsuite am GERÄT** nie ausgeführt (nur im Container-Klon). Prüfen: `npx tsc --noEmit` + `npm test` lokal.
- **Docs-ZIPs entpackt?** `_sicherheit-konzept.zip` (User hatte Komma-Tippfehler) und `_kurs-s1.zip`
  liegen ggf. noch im Projektroot. Prüfen: `ls _*.zip`, `docs\KURSPLAN_SICHERHEIT.md` vorhanden?
- **Bridge-Schreibpfad für Textdateien**: device_commit_files zeigte scheinbare Kürzungen (evtl. nur
  Mount-Cache-Staleness — ungeklärt). Regel siehe Gates; nicht erneut austesten.
- **Neuer Druck-Flow einmal END-ZU-ENDE am Gerät**: Dashboard → „Lernunterlagen öffnen (Druckansicht)"
  → neuer Tab → Strg+P. Noch kein User-Test protokolliert.
- **material-pdf.ts** (alter pdf-lib-Generator) ist toter Code — nicht gelöscht (bewusst).

## 3. GEÄNDERTE ARTEFAKTE
- NEU: `lib/certificate/material-html.ts` (20136 B) · `lib/password-policy.ts` (598 B) ·
  `public/handbuch/{logo-dunkel,mascot-hero,qr-signup}.png` · `public/brand/**` (Logo, Adler, 10 Mentor-Posen,
  `mentor/hero-eule.png`) · `public/modules/pr-*.png` (10) · `docs/KURSPLAN_SICHERHEIT.md` ·
  `docs/KURS_S1_SICHERHEITSUNTERWEISUNG.md`
- GEÄNDERT: Route course-material (s. o.) · `app/dashboard/page.tsx` (Link _blank, Sperr-UI raus) ·
  `components/forms/action-form.tsx` (+nativeValidation) · `app/actions/{auth,company}-actions.ts` ·
  `lib/i18n/de.ts` (passwordPolicy „Mindestens 6 Zeichen, mit Buchstaben und Zahlen."; material.download
  „Lernunterlagen öffnen (Druckansicht)" etc.) · 5 Passwort-Formularseiten · `app/page.tsx` ·
  `components/layout/header.tsx` · `app/pricing/page.tsx` · `app/schulung/page.tsx` ·
  `public/modules/*` (26 ersetzt)
- Ports: Campus dev lokal **3005** (3000 = StaffFlow!). Branch: main. Editor-Fix: `core.editor=notepad` gesetzt.

## 4. OFFENE PUNKTE (priorisiert)
1. **Sichern & pushen**: ggf. Docs-ZIPs entpacken → `git add -A` → commit → **`git push`** (bisher nur lokal!)
   + Backup-Tar wie gewohnt.
2. **Deploy-Vorbereitung Hostinger** (User will erst lokal alles testen): Checkliste = K1/K2 aus
   `docs/AUDIT_TEIL8_2026-07-10.md` prüfen/fixen (Details dort — in dieser Session nicht behandelt),
   Dockerfile/Container bauen (Node 20+, `db:generate`/`db:init`/`db:seed`, Prisma-Dummy-Engine-Env,
   Port, DATENBANK-Pfad-Volume, AUTH_SECRET, APP_URL=https://ki-nachweis.at), **Chromium in Container**
   einplanen (für späteren 1-Klick-Server-PDF derselben Route), Hero-PNGs für PDF-Route ggf. auf ~200 KB
   verkleinern (52-MB-Befund).
3. **Musterlektion S1 9.1 freigeben** → dann S1 komplett ausformulieren (24 Lektionen, 72 Mini-Checks,
   30 Testfragen), modulweise zur Abnahme; danach SFK-Review (Go-Live-Gate) und EN als Sprachpiloten.
4. **4 Entscheidungen Sicherheits-Produktlinie** (KURSPLAN_SICHERHEIT.md Kap. 5): Marke, SFK-Review-Budget,
   Preismodell (Empfehlung Add-on), Land-Reihenfolge (AT→DE).
5. **Logo neu generieren**: Tippfehler „SICHER ANWEENDEN" in der Logo-Bilddatei + transparente Version;
   danach Header/Handbuch/Hero tauschen.
6. **Foto-Einbau Rest** (freigegebener Vorschlag): Benefit-Karten mit Eulen-Posen (Homepage),
   Login/Register-Eule, FAQ-Eule (Lupe), Dashboard-Momente (02 feiert/06 Notizen), optional 404-Eule.
7. **i18n-Tech-Debt**: Inline-DE-Strings aus Hero/Pricing/Schulung nach `de.ts` überführen (EN-Fallback).
8. **AVV-Follow-ups** (aus Teil 8 früh): PDF des Accept-Records, Accept-Gate vor Kursstart, AVV-Volltextseite.

## 5. JETZT NICHT (Scope-Schutz)
- **StaffFlow** (Ordner 2): NIE schreiben — anderes Projekt, nur Info-Quelle.
- **Kein Deploy/Push auf Produktion** ohne lokalen Volltest + K1/K2-Check (User-Vorgabe: erst lokal testen).
- **Kein Rebranding/Dachmarke** vor erstem Sicherheits-Umsatz (Konzept-Empfehlung c: als Kursfamilie starten).
- `material-pdf.ts` löschen ist optional — nicht priorisieren.

## 6. RANDBEDINGUNGEN & GATES
- **Arbeitsmethode Content**: erst Gliederung + EINE Musterlektion → Freigabe → skalieren. Immer.
- **Branding (fix, CLAUDE.md + Brand-Sheet V2.0)**: Produktflächen = Campus-Logo + Hoodie-Eule;
  MOSA Works nur persönlich (Mini-Eule); Adler nur HSC/Recht/Impressum; Pflichtzeile
  „Developed & operated by Hainan Salzburg Consulting Co., Ltd."; Palette Navy/Blau/Cyan/Weiß.
- **Wording-Guard**: nie „staatlich anerkannt/behördlich/zertifiziert/garantiert rechtssicher";
  Disclaimer „privater Schulungs-/Unterweisungsnachweis"; Quellen klein in Fußzeile.
- **Bridge-Regeln (hart erarbeitet!)**: Textdateien NUR als ZIP → `device_commit_files` ins Projektroot →
  MD5-Vergleich → User entpackt lokal (`Expand-Archive … -Force`). Große Textdateien (>65 KB, z. B. de.ts)
  NIE über stage/commit editieren — nur in-VM `git show HEAD:` + python-Replace mit Byte-Assertion.
  Mount-Reads können stale/verkürzt sein — Verifikation zählt nur via MD5 oder User-Terminal.
- **Git**: commit immer mit `-m` (Editor-Hänger), vorher ggf. `.git\index.lock` löschen.
- **Hosting**: Hostinger, Deutschland (EU) — relevant für Datenschutztexte.
- **User-Präferenzen**: Fehler ungefragt ausbessern; Antworten mit Fett-Hervorhebungen + Absätzen;
  hell/dunkel-Modus der App darf nie verloren gehen; Logo groß.
- **Hell/Dunkel**: Hero bewusst immer Navy, Rest folgt Theme-Toggle.

## 7. STARTPROMPT NÄCHSTE SESSION
```text
Projekt: KI-Kompetenz Campus (Next.js 15, Prisma/SQLite, Ordner:
C:\Users\SaMo\Claude\Projects\KI-Kompetenz Basic nach Art. 4 AI Act — NUR dieser Ordner,
StaffFlow/Ordner 2 nie anfassen). Dev-Port lokal 3005 (3000 = anderes Projekt).
Branch main, letzte Commits 410d917 + 8489629, NOCH NICHT gepusht.

STAND: Lernunterlagen = Handbuch-Druckansicht (lib/certificate/material-html.ts + Route
app/api/course-material/[courseId]/pdf, Version je Kurs, personalisiert, kein Einmal-Limit).
Passwort-Policy zentral (lib/password-policy.ts, min 6 Buchstaben+Zahlen, 5 Formulare, kein
Datenverlust). Homepage-Navy-Hero + Header-Logo h-14 (app/page.tsx, components/layout/header.tsx,
public/brand/mentor/hero-eule.png). Pricing-USP-Chips, /schulung = Kurs-Accordions mit
37 Modul-Foto-Kacheln. Brand-Kit in public/brand (Regeln: Campus-Logo+Hoodie-Eule fürs Produkt,
Adler nur Impressum, „Developed & operated by Hainan Salzburg Consulting Co., Ltd.").
Sicherheits-Produktlinie: docs/KURSPLAN_SICHERHEIT.md (S1–S5) + docs/KURS_S1_SICHERHEITSUNTERWEISUNG.md
(10 Module/24 Lektionen, Musterlektion 9.1 fertig, EU-Sprachstaffel DE-Master).

AUFGABEN IN REIHENFOLGE:
1. Prüfen ob docs-ZIPs entpackt sind (_sicherheit-konzept.zip, _kurs-s1.zip im Projektroot?),
   dann: git add -A, commit -m "...", git push. Lokal npx tsc --noEmit + npm test laufen lassen
   (einzig erlaubter Rotfall: keiner — REPORT.md ist am Gerät entschärft).
2. End-zu-End-Klicktest: localhost:3005 → Startseite/Hell-Dunkel, /pricing, /schulung,
   Dashboard → „Lernunterlagen öffnen (Druckansicht)" → Strg+P.
3. Deploy-Vorbereitung Hostinger: K1/K2 aus docs/AUDIT_TEIL8_2026-07-10.md prüfen, dann
   Dockerfile/Container (inkl. Chromium für späteren Server-PDF; Hero-PNGs für PDF verkleinern).
   KEIN Produktiv-Deploy ohne Saschas Freigabe.
4. Sascha-Entscheidungen einholen: Musterlektion S1-9.1 freigeben? + 4 Punkte aus
   KURSPLAN_SICHERHEIT.md Kap. 5 (Marke/SFK/Preis/Land). Danach S1 modulweise ausformulieren.

REGELN: Content immer erst Gliederung + 1 Musterlektion → Freigabe → skalieren. Wording-Guard
(nie „staatlich anerkannt" etc.). Textdateien zum Gerät NUR als ZIP ins Projektroot + MD5-Check +
lokal Expand-Archive; de.ts (>65 KB) nur in-VM via git show + python editieren. git commit immer
mit -m. Fehler ungefragt ausbessern. Antworten mit Fett-Struktur. Hell/Dunkel-Modus nie brechen.
```
