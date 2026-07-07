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

## 0a. Im Praxisstil verfasst (2026-07-07, Teil 5 — V1.007)
- Fünf neue öffentliche SEO-/Ratgeberseiten (lib/i18n/de.ts → art4,
  fuehrerschein, nachweis, chatgptLp, mitarbeiterLp): du-Form, ehrliche
  Einordnungen („kein eigener Bußgeldtatbestand", „Marketingbegriff — mehr
  nicht"), Merksätze („Die Pflicht gilt der Maßnahme, nicht einem Produkt"),
  Alltagsbeispiele (Vertrieb/Buchhaltung/Support als Betreiber). Disclaimer-
  Blöcke je Seite formal gehalten. Muss noch durch den Content-Audit-Scan
  (i18n:art4 usw.) und die TOTP-Owner-Freigabe.

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

## 1b. Im Praxisstil verfasst (2026-07-07 Abend, V1.005)
- Alle 27 öffentlichen Modul-Detailtexte (lib/module-details.de.ts): du-Form,
  Intro-Absätze, je 2 Alltagsbeispiele mit Lerneffekt, „Danach kannst du"-Satz.
- Abkürzungs-Glossar (lib/glossary.ts): 15 Einträge in einfacher Sprache.
- Teaser-/CTA-Texte der Detailseiten, Vorlese-Promo („Lieber hören statt
  lesen?"), einklappbare Kursboxen-Hinweise (lib/i18n/de.ts → moduleDetail,
  readAloudPromo, home.*).
- Plan-Feature-Text Nachprüfung entwirrt (prisma/seed/index.ts).

## 1c. Im Praxisstil verfasst (2026-07-07 Nacht, V1.006 — Kurs 3 + Roadmap-Seite)
- Alle 32 Lektionen des Kurses „Richtig Prompten" (content-lessons-prompting.ts):
  du-Form, Alltagsbeispiele, ehrliche Warnungen, Merksätze, Mini-Checks;
  prinzipienbasiert ohne Klick-Anleitungen.
- 74 Prüfungsfragen (content-questions-prompting-1/2.ts): situative Praxisfälle,
  Erklärungen in Alltagssprache.
- 10 Modul-Detailtexte (lib/module-details.de.ts, pr-*-Keys) im bewährten Muster.
- Roadmap-Seite /ki-kompetenz-review (feature.review.*): menschlich-praxisnah,
  aber sachlich; QM-Hinweis und rechtlicher Hinweis bewusst formal-präzise
  („keine ISO-Zertifizierung", „geplante Erweiterung" — keine Verfügbarkeits-
  oder Garantieversprechen).
- Plan-/Preistexte auf drei Kurse aktualisiert (Seeds + pricing.*).
- Leadmaschine /themen (themen.*): Praxisstil in Anrede und Intro;
  Consent-Text und Datenschutz-Hinweis bewusst formal-präzise.
- Konsistenz-Audit: /features, /schulung, home.benefit2Text, courses.intro
  auf drei Kurse; 3 neue Glossar-Einträge im Praxisstil.

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
- 2026-07-07 Nacht: /ki-transparenz präzisiert (formal, nicht gelockert):
  aus „Sämtliche mit KI-Unterstützung erstellten Inhalte wurden vor
  Veröffentlichung fachlich geprüft" wurde „Die deutschsprachigen
  Kerninhalte (…) werden vor Veröffentlichung intern fachlich geprüft und
  freigegeben" — Pauschal-Vergangenheitsbehauptung ersetzt durch präzise,
  belegbare Gegenwartsaussage (Vorgriff auf Content-Audit-System,
  ROADMAP §4).

## 4. Bestätigung
Keine AGB, Datenschutztexte oder Disclaimer wurden in Umgangssprache
umgeschrieben. Der Praxisstil wurde ausschließlich im Lern-, Marketing- und
Nutzerbereich angewendet. Der Wording-Guard-Repository-Scan (npm test) läuft
über alle Inhalte und blieb grün.
