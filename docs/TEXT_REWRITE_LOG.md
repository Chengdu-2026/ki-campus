# Text-Rewrite-Log: Tonalität je Bereich

Stand 2026-07-07. Dokumentiert, welche Texte im menschlichen Praxisstil
(„wie einem Kollegen erklären") verfasst bzw. überarbeitet wurden — und welche
Rechtstexte bewusst formal geblieben sind.

## Stilregeln (verbindlich)
- Menschlicher Praxisstil: Homepage/Marketing, Kursübersichten, Modulbeschreibungen,
  Lektionen (Inhalt, Beispiele, Merksätze, Mini-Checks), Prüfungsfragen inkl.
  Antworten und Erklärungen, Übungsmodus, Nachschulung, einfache Hilfetexte im
  Lernbereich.
- Formaler Stil (sachlich, neutral, präzise, nicht werblich, nicht salopp):
  AGB, Datenschutz, Impressum, Rechtlicher Hinweis, KI-Transparenz-Seite,
  Zertifikat-Disclaimer, Widerruf/Zahlungsbedingungen, AVV, Cookie-Hinweise,
  sonstige juristische Texte. QM-/Admin-Texte: sachlich, kurz, verständlich.

## 1. Im Praxisstil verfasst/überarbeitet (2026-07-07)
- Alle 12 neuen Lektionen der Basic-Module 12–16 (prisma/seed/content-lessons.ts):
  du-Form, konkrete Alltagssituationen, ehrliche Warnungen, Merksätze.
- Neue Lektion „Kennzeichnung im Arbeitsalltag umsetzen" (transparenz-kennzeichnung).
- Alle 37 Lektionen des neuen Kurses „KI-Verantwortliche & KI-Beauftragte"
  (content-lessons-officer.ts): praxisnah, aber fachlich tiefer — Zielgruppe
  Verantwortliche.
- 30 neue Basic-Prüfungsfragen (content-questions-3.ts) und 84 Officer-Fragen
  (content-questions-officer-1/2.ts): situative Praxisfragen statt akademischer
  Formulierungen, Erklärungen in Alltagssprache.
- Kursübersicht /courses (Empfehlungstexte), /schulung-Intro („Kein Katalog-Nebel …"),
  Preisseiten-Hinweise (Jahresrabatt, Nachweis-Download), home.benefit2Text.

## 2. Rechtstexte bewusst NICHT im lockeren Stil geändert
- certificate.disclaimer (lib/i18n/de.ts): juristisch fixierter Text. Einzige
  Änderung: formale Ergänzung der Verneinungsliste um „ISO-Zertifizierung" —
  Satzbau, Ton und Rechtssprache unverändert.
- /impressum, /datenschutz, /agb, /legal-disclaimer, /ki-transparenz: unverändert.
- certificate.authenticityHint, verify.*-Texte: unverändert formal.
- E-Mail-Templates mit Rechtsbezug (certificate_ready-Hinweis): unverändert.

## 3. Formale Bereinigung von Rechtstexten
- Nur die o. g. Disclaimer-Ergänzung (präzisierend, nicht lockernd).
  Keine weiteren Eingriffe in juristische Texte.

## 4. Bestätigung
Keine AGB, Datenschutztexte oder Disclaimer wurden in Umgangssprache
umgeschrieben. Der Praxisstil wurde ausschließlich im Lern-, Marketing- und
Nutzerbereich angewendet. Der Wording-Guard-Repository-Scan (npm test) läuft
über alle Inhalte und blieb grün.
