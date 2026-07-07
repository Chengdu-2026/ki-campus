# UX-Guide

## Prinzipien
Einfache Sprache · klare nächste Schritte · wenige Klicks · große Buttons ·
Fortschritt immer sichtbar · Teilnehmer bekommen geführte Lernpfade, Admins Tabellen
· verständliche Fehlermeldungen · jede Seite hat genau einen Hauptzweck ·
keine leeren Seiten (EmptyState mit Erklärung + Aktion) · keine Dummy-Buttons.

## Lernpfad-Statusmaschine (Teilnehmer-Dashboard)
NOT_STARTED → „Schulung starten" · IN_PROGRESS → „Lektion fortsetzen" (springt zur
nächsten offenen Lektion) · READY_FOR_EXAM → „Test starten" · EXAM_FAILED →
„Nachschulung starten" + Wiederholung · NO_ATTEMPTS_LEFT → Hinweis auf Admin ·
PASSED → „Zertifikat herunterladen".

## Design-Tokens
Light: Weiß/Hellgrau-Hintergrund, Primär Dunkelblau (brand-700 #122f62), Akzent
Cyan (accent-500 #06b6d4), Erfolg Grün, Warnung Amber, Fehler Rot.
Dark: slate-950-Hintergrund, Karten slate-900, Text slate-100, Akzent Cyan.
Radius `rounded-xl` für Karten, `rounded-lg` für Controls. Buttons min. 44 px Höhe.

## Dark Mode
next-themes, `attribute="class"`, System-Erkennung, manueller Toggle
(Hell/Dunkel/System) im Header (Desktop) und Mobilmenü, `suppressHydrationWarning`
gegen Flackern. Zertifikat-PDF bleibt immer hell/druckfreundlich.

## Mobile
Mobile-first: Hamburger-Menü, Antwortoptionen als große Touch-Buttons, Tabellen
mit horizontalem Scroll nur in Admin-Bereichen, Teilnehmerflächen ohne
Tabellenzwang, Zertifikat-Download mobil möglich.

## Hints
Komponenten `Hint` (Info) und `WarningHint` (Risiko) — kontextbezogen platziert:
Zertifikat (privater Nachweis), Test-Gate, Bestehensgrenze, Nachschulung, Export.
Texte zentral in `lib/i18n/de.ts → hints.*`.

## Barrierefreiheit
Fokus-Ringe (`focus-visible`) global · Labels für alle Formularfelder ·
`role="progressbar"`/`aria-valuenow` · `role="alert"/"status"` für Feedback ·
Antwortauswahl mit `role="radio"/"checkbox"` + `aria-checked`, per Tastatur
bedienbar (echte Buttons) · Status nie nur über Farbe (Icons ✓/✗ + Badge-Text) ·
`aria-label` an Icon-Buttons · ausreichender Kontrast in beiden Themes.
