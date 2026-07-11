# Changelog

## [0.12.0] — 2026-07-11 (Teil 8 Abschluss: FAQ, Kursplan, AVV, Maskottchen)

### Hinzugefügt
- **AVV-Accept-Flow (Art. 28 DSGVO):** Model `AvvAcceptance` (`prisma/schema.prisma` +
  `init.sql` synchron), Action `app/actions/avv-actions.ts`, Seite `/company/avv`, Link im
  Firmen-Dashboard, i18n `avv.*`. Speichert Name, Geburtsdatum, Position, IP, digitale
  Signatur, User-Agent, akzeptierte `appConfig.avvVersion` (V1.0) und SHA-256-Content-Hash;
  auditiert (`AVV_ACCEPTED`). `appConfig.avvVersion` neu.
- **AVV-Master-Vorlage** `docs/AVV_MASTER_VORLAGE.md` (plattformübergreifend, China/SCC-
  Warnblock, Campus-Fakten gefüllt).
- **Homepage:** Sektion „Immer verfügbar. Immer aktuell." (24/7-USP) + Maskottchen „KI-Campus
  Mentor" (`public/images/maskottchen-mentor.png`, `maskottchen-freundlich.png`, transparent).
- **FAQ:** neue Eröffnungsfrage „Dürfen private Anbieter das überhaupt? (WIFI/Kammern)" mit
  Art.-4-Beleg. FAQ zusätzlich in die eingeloggte Navigation (`components/layout/header.tsx`).
- **Pläne/Docs:** `docs/KURSPLAN_UND_B2C.md` (10 Kurse + B2C-Abo, Preise entschieden),
  `docs/MUSTERLEKTION_K8_DATENSCHUTZ.md` (freigegeben).

### Geändert / verankert
- **CLAUDE.md:** Abschnitt BRANDING (Eule-Mentor immer dieselbe, Logo, Farbwelt) fix verankert.
- **QM_SYSTEM.md:** Branding-Konsistenz als Qualitätsmerkmal (Abweichung = QualityIssue/CAPA).
- **i18n `de.ts`:** `home.always*`, `home.mentor*`, `avv.*`, `company.avvLink`.

### Bilder
- `Bilder/` dedupliziert (16 Duplikate → `Bilder/_to_delete/`), 20 Unikate benannt (Schema
  `handout*/uebersicht*/mosa_*/brand_*/maskottchen_*`).

### Offen (Windows)
- **Migration nötig:** `npm run db:generate` + `npm run db:init` (legt `AvvAcceptance`-Tabelle an),
  dann `npm run build`. Danach `/company/avv` live.
- Go-Live-Blocker K1/K2/H1/H3 (Auditbericht) — vor Deploy.

## [0.11.1] — 2026-07-10 (Teil 8: Audit-Fixes + 24/7-USP)

### Behoben
- **Build-Breaker (P1):** `QM_CONTENT_REPORTED` fehlte in der `AuditAction`-Union
  (`lib/audit.ts`) — `app/actions/qm-actions.ts:105` nutzt den Wert. Folge: `tsc` und
  `next build` scheiterten (der als grün gemeldete Teil-7-Stand war nicht deploybar).
  Wert ergänzt. Danach tsc 0, `next build` grün (93 Routen).
- **Mandanten-Härtung (M1):** `updateQualityIssue` und `updateCorrectiveAction`
  (`app/actions/qm-actions.ts`) setzten die aus dem Formular gelieferte `ownerId` ohne
  Prüfung, ob der Nutzer zur Firma des Datensatzes gehört. Neuer Helper
  `assertOwnerInScope()` (REUSE an beiden Stellen) lehnt fremde `ownerId` ab.

### Hinzugefügt
- **Homepage-Sektion „Immer verfügbar. Immer aktuell."** (`app/page.tsx`): drei Karten
  (Lernen rund um die Uhr / Wissensdatenbank wächst laufend / Nachweise bleiben aktuell).
  i18n `home.alwaysTitle/alwaysText/always1..3*` in `lib/i18n/de.ts`, in die Vorlese-
  Funktion aufgenommen. Bewusst ohne Uptime-/SLA-Zusage (wording-guard-konform).
- **Auditbericht** `docs/AUDIT_TEIL8_2026-07-10.md` (Sicherheitsbefunde K1–M3, Belege,
  priorisierte Go-Live-Blocker, Bilder-Dedupe-/Benennungsvorschlag).

### Offen (bewusst)
- Sicherheits-Blocker vor Go-Live (K1 Seed-Passwort, K2 AUTH_SECRET, H1 Mail-Verifikation,
  H2 Rate-Limiting, H3 Session-Invalidierung) — Betriebs-/Deploy-Entscheidungen.
- `contentVersionLabel` V1.008 → V1.009 beim nächsten Seed.

## [0.11.0] — 2026-07-08 (Handbuch-Rollout, Review-Cockpit, QM-Fehlermeldung, Zertifikat-Redesign)

### Hinzugefügt
- **Lernunterlagen → „KI-Kompetenz-Handbuch"** (Feature `handbuch` V2.1): alle
  17 Basic-Module im Handbuch-Format (Boxen, fette Stichwörter, Markierungen,
  Maskottchen-Mentor, hochgestellte Abkürzungs-Nummern aus `lib/glossary.ts`,
  A4 mit Rändern 2 cm links / 1 cm sonst, Trust-Badges, QR zur Anmeldung +
  „ausgegeben für"-Canary). Modul 5 = kuratiertes Referenz-Muster (Cheat-Sheet,
  Entscheidungsbaum, Ja/Nein-Tabelle, Quiz, Workbook, Wenn-dann-Index).
  Generator: `lernunterlagen/_generator.py`. Styleguide: `docs/STYLEGUIDE_HANDBUCH.md`.
- **Review-Cockpit** `/admin/review-plan` (REUSE content-audit-Freigaben statt
  Neubau): getakteter Prüfplan max. 3 Module/Werktag, Mo–Fr, österr. Feiertage
  übersprungen. Reine Logik in `lib/review-schedule.ts` (+ Tests). Config:
  `contentReviewCycleMonths: 6`, `contentReviewMaxPerDay: 3`.
- **Teilnehmer-Fehlermeldung** in Lektionen (`app/lessons/[id]/page.tsx`):
  `reportContentIssue` legt eine `QualityIssue` an (Quelle USER_REPORT, Kategorie
  CONTENT) → landet im QM-Workflow. REUSE des bestehenden QualityIssue-Modells.
- **Theme-abhängiges Logo** in der Kopfzeile (`components/layout/header.tsx`):
  hell/dunkel via `optionalImage`, Fallback „KI"-Kachel.

### Geändert
- **Zertifikat-PDF** (`lib/certificate/pdf.ts`) auf Eigentümer-Vorgabe:
  - Titel → „Bescheinigung der KI-Kompetenz nach Art. 4 EU AI Act" (zweizeilig).
  - Daten-QR ~3 cm tiefer, Verify-QR ~1,5 cm höher.
  - Geburtsdatum ergänzt (Zeile + Daten-QR-Payload).
  - Firmenlogo in der Kopfzeile + Maskottchen als großes dezentes Wasserzeichen
    (ow=430, Opazität 0,11) — beide optional via `existsSync`.
  - Disclaimer-Box in Kleinstschrift (6,5 pt) + Dokumentenlenkungs-Zeile
    „Dokumentenlenkung (ISO-9001-orientiert) · Rev. <Version> · Nr. <…> · Stand <…>".
  - Unterer Textbereich komplett in EINEM Kasten (Echtheit + Disclaimer +
    Dokumentenlenkung + KI-Hinweis) über die volle Breite; Fließtext im Blocksatz
    (neue Funktion `drawJustified`, breitengemessener Umbruch). Eule-Wasserzeichen
    ~1 cm nach rechts (x + 28).
  - Gültigkeit + Verlängerung sichtbar: „Gültig bis" zeigt echtes Datum (Basic =
    2 Jahre über `Course.certificateValidityMonths`), neue Zeile „Jährliche
    Verlängerung" mit leerem Eintragfeld (Datum, sobald erfolgt — optionales Feld
    `refreshedAt`). Gültig-bis zusätzlich im Daten-QR.
  - i18n-Titel (`certificate.title/titleOfficer/titlePrompting`) → „Bescheinigung …";
    neue Keys `certificate.refresh/refreshRequired/refreshedOn`.
- Seed: Geburtsdatum für Anna/Bernd/Clara + `certificateValidityMonths: 24` für
  den Basic-Kurs = 2 Jahre gültig (`prisma/seed/index.ts`).

### Entschieden/erledigt (Eigentümer-Freigabe 2026-07-08)
- Disclaimer-Rebrand: `certificate.disclaimer` + `verify.testHint` → „Diese
  **Bescheinigung** … Sie dient als …" (Grammatik angepasst; rechtliche
  Verneinungen unverändert). Auf Freigabe des Eigentümers.
- `appConfig.websiteUrl` → `https://www.ki-nachweis.at` (Zertifikat-KI-Hinweis,
  Verify-Seite, Impressum-Fallback; SEO/Canonical/Sitemap NICHT betroffen).
- Wording-Guard-Scan grün: `docs/STYLEGUIDE_HANDBUCH.md` + `docs/HANDBUCH_BACKLOG.md`
  neutralisiert (Verbotsliste referenziert statt zitiert).
- Modell entschieden: **2 Jahre gültig** + Zeile „Jährliche Verlängerung" mit
  leerem Feld (Datum wird eingetragen, sobald erfolgt). Auffrischungstest =
  **10 Fragen (verkürzt)**, Erinnerung an **Teilnehmer UND Arbeitgeber**.

### Offen (bewusst)
- Globaler `contentVersionLabel` (Footer) + ContentRevision-Register-Zeile für
  diesen Release beim Windows-Seed nachziehen (Footer=Register=Config).
- Task #25 Backend: Schema `Certificate.refreshedAt` (Windows-Migration),
  10-Fragen-Auffrischungstest, jährliche Verlängerungs-Action (setzt `refreshedAt`),
  Erinnerungs-Cron an beide. **Schritt 1 gebaut:** Reminder-Fenster-Helper
  `lib/recert-reminders.ts` + `tests/recert-reminders.test.ts` (zeitzonensicher via
  UTC, Erinnerung an beide, Default 6 Wochen Vorlauf) — Schema/Action/Cron folgen.

## [0.10.2] — 2026-07-08 (Task 4: N4-Beweis + Stale-Fix)

### Behoben
- `toggleUserStatus` revalidierte nur `/company/users`; auf `/admin/companies/[id]`
  blieb Status bis Reload stale. Fix: zusätzlich ``/admin/companies/${companyId}``
  revalidiert. Dieselbe Lücke systematisch geschlossen bei `createInvitation`,
  `createParticipant`, `updateParticipant`, `deleteUserGdpr`, `resetAttempts`
  (`app/actions/company-actions.ts`).

### Hinzugefügt (Testdaten)
- Zweite Firma „Beta Bau GmbH" (`demo-company-b`, Plan BASIC) + Admin
  `hr@beta-bau.example` + 2 Teilnehmer, idempotent in `prisma/seed/index.ts` —
  ermöglicht den Mandanten-A/B-Test (Katalog 47). Aktivierung: `npm run db:seed`.

### Verifiziert (QA)
- N4 (Zertifikat-PDF „TESTZUGANG"): **bestanden**. Renderer `lib/certificate/pdf.ts`
  zeichnet Wasserzeichen + rotes Banner bei `isTest`; Route übergibt
  `company.isTest`; Beweis-PDFs/PNGs unter docs/live-tests/2026-07-08/n4-zertifikat-testzugang.
- Teilnehmer-Durchlauf (13–28), Mandantentrennung (47), N6-Banner: **code-verifiziert**
  (Isolation strukturell via Session-Scope + `assertCompanyScope`; Banner im Root-Layout
  rollenübergreifend). Live-Klick-Nachweis offen (Windows-Dev-Server).

### Hinweis
- `npm test` + `npm run build` sind auf dem Windows-Dev-Server auszuführen (bestätigt den
  Fix). In der Linux-Agent-Sandbox nicht lauffähig (win32-node_modules, Mount-Artefakte).

## [0.10.1] — 2026-07-08 (Live-QA-Funde behoben)

### Behoben / Hinzugefügt
- Neue Komponente `components/ui/password-input.tsx`: Passwort-Feld mit
  Auge-Umschalter (anzeigen/verbergen). Eingesetzt im „Manuell anlegen"-Formular
  (`/admin/companies/[id]`). Behebt einen Eigentümer-Fund aus dem Live-QA.
- `autoComplete="new-password"` am Anlege-Passwortfeld → verhindert, dass der
  Browser die Superadmin-Login-Daten ins Teilnehmer-Anlegeformular autofüllt.
- P2: Interner Betreiber-Hinweis (mit `docs/…`-Pfad) von der öffentlichen
  `/agb`-Seite entfernt.
- P2: Audit-Log (`/admin/audit-log`) zeigt bei Bearbeitungen jetzt den
  `oldValue → newValue`-Diff (rot→grün) statt nur leerem `{}`.
- P3: Nutzer-Edit (`/admin/users/[id]`) leitet nach dem Speichern auf die
  Nutzerliste (`successRedirect`) — kein staler Status mehr im Formular.
- P3: „Re-Zertifizierung" → „erneute Nachweise" auf `/pricing` und in der FAQ.
- P3: `toggleUserStatus` loggt jetzt richtungsabhängig `USER_ACTIVATED` /
  `USER_DEACTIVATED` (vorher immer `USER_DEACTIVATED`); neue Audit-Aktion
  `USER_ACTIVATED` ergänzt.
- Verifikation: tsc 0 · Tests 111/111 · next build compiled. **Live nachgetestet
  (08.07.2026): AGB-Hinweis weg · „erneute Nachweise" (Pricing/FAQ) · Audit-Log
  zeigt alt→neu · Nutzer-Edit leitet auf die Liste — alle vier OK.**

## [0.10.0] — 2026-07-07 (Teil 6: Superadmin-Verwaltung V2 + Tester-Freigabe)

### Wichtige Klarstellung
- Der im Handover als „Teil-3-Merge des Superadmin-Pakets" angekündigte Schritt
  war gegenstandslos: Das Paket war nie gebaut (kein Branch, kein Commit, kein
  Code — per frischem Git-Klon verifiziert). Teil 6 hat es daher NEU gebaut
  (Inhaltsstand V1.008).

### Hinzugefügt
- Superadmin – Firmen bearbeiten: Stammdaten (Name, Ansprechpartner, UID,
  E-Mail, Telefon, Adresse), Plan-Wechsel (BASIC/BUSINESS/ENTERPRISE) und Status
  (ACTIVE/INACTIVE) über Server Action `updateCompany`; jede Änderung ins
  AuditLog (COMPANY_UPDATED, old/new).
- Superadmin – Nutzer bearbeiten: Rolle, Status, Name, E-Mail über
  `updateUserAsSuperadmin` (auditiert USER_UPDATED). Neue Seite /admin/users/[id],
  Bearbeiten-Link in /admin/users. Schutz gegen Selbst-Aussperren,
  E-Mail-Eindeutigkeit, KEINE Mandanten-Verschiebung.
- Tester-Freigabe: Company.isTest + testExpiresAt (schema.prisma + init.sql
  synchron, inkl. idempotenter ALTER TABLE für bestehende DBs). Konsequenzen:
  - Zertifikate von Test-Firmen tragen sichtbar „TESTZUGANG — kein gültiger
    Nachweis" (diagonaler Stempel + Klartext-Banner im PDF).
  - Verify-Seite zeigt für Test-Firmen einen deutlichen Test-Hinweis.
  - Test-Firmen sind aus der globalen Statistik ausgeschlossen (Superadmin-
    Dashboard-KPIs und QM-courseMetrics: Bestehensquoten, Feedback, NPS, Abbruch).
  - Neuer Cron-Job `deactivate-expired-tests` setzt abgelaufene Testzugänge auf
    INACTIVE (auditiert).
  - UI-Banner „Testzugang bis {Datum}" für Nutzer einer Test-Firma (Root-Layout).

### Geändert
- Zwei-Spuren-Versionierung eingeführt (Eigentümer-Vorgabe): globaler Gesamtstand
  `contentVersionLabel` (Footer, „letzte höchste Version") auf V1.008; NEU
  pro-Feature-Versionen in `config/feature-versions.ts` mit `<VersionBadge>` auf
  der jeweiligen Seite. Die beiden neuen Features starten je bei V1.001
  (ContentRevision entityType FEATURE: superadmin-verwaltung, tester-freigabe).

### Verifikation
- tsc 0 Fehler · Tests 111/111 (5 neue in test-access.test.ts) · next build
  EXIT=0 (90 Routen inkl. /admin/users/[id]).

## [0.9.0] — 2026-07-07 (Teil 5: SEMrush-Daten + Phase-2-SEO-Seiten)

### Hinzugefügt
- Fünf öffentliche SEO-/Ratgeberseiten (Phase 2 aus SEO_GEO_TRUST_REPORT
  Kap. 7/11, Inhaltsstand V1.007):
  - /art-4-ai-act-erklaert: Ratgeber mit zitierfähigem Definitionsblock
    (wortgleich mit /llms.txt), „Ist das Pflicht?"-Sektion, ehrlicher
    Sanktions-Einordnung (kein eigener Bußgeldtatbestand), Umsetzungs-
    Schritten, Quellenblock (EUR-Lex/RTR/WKO), Autorenblock; Article- +
    Breadcrumb-JSON-LD
  - /ki-fuehrerschein-vergleich: ehrliche Einordnung des Marketingbegriffs
    „KI-Führerschein" (kein staatlich geregeltes Dokument), Pflicht-Frage,
    4-Punkte-Seriositäts-Checkliste, FAQ; Article- + FAQPage- +
    Breadcrumb-JSON-LD; Fairness-Hinweis zu Fremdanbietern
  - /ki-kompetenz-nachweis: Conversion-Seite — was als Nachweis entsteht
    (PDF+QR+CSV+Versionsstand), ehrliche „kann/kann nicht"-Sektion,
    Ablauf, Muster-CTA
  - /chatgpt-schulung-mitarbeiter: Landingpage auf Kurs 3 „Richtig
    Prompten", Modulliste dynamisch aus DB (KONSISTENZ-PFLICHT),
    Markenhinweis (beschreibende Nutzung ChatGPT/Copilot/Gemini/Claude)
  - /ki-schulung-mitarbeiter: Rollout-Seite (4 Schritte), Pflicht-Sektion,
    Kurskarten dynamisch aus DB, FAQ; FAQPage-JSON-LD
- Alle 5 Seiten: Glossar über Überschriften, ReadAloud, Disclaimer,
  Middleware-Public-Paths, Sitemap (0.8), interne Verlinkung
- llms.txt: 5 neue „Wichtige Seiten"-Einträge; Footer-Link „Art. 4 erklärt";
  Startseite: Rechtskontext-Sektion verlinkt zusätzlich auf die Art.-4-Seite
- SEO_GEO_TRUST_REPORT Kap. 5a: SEMrush-Keyword-Daten (2026-07-07, DB DE,
  über Browser-Session; AT unter Messschwelle): KI Schulung 2.400/KD57,
  KI-Führerschein 590/KD15, KI Kompetenz 390/KD27, EU AI Act Schulung
  320/KD25/CPC 8,28 $, ChatGPT Schulung 320/KD39, Nachweis 10 —
  strategische Ableitungen dokumentiert („pflicht"-Suffix-Muster u. a.)

### Geändert
- contentVersionLabel → V1.007; Seed legt ContentRevision V1.007 an

## [0.8.0] — 2026-07-08 (SEO-/Trust-Sofortmaßnahmen aus dem Analysereport)

### Hinzugefügt
- /musterzertifikat: öffentliche Muster-Seite (Bestandteile erklärt, Demo-
  Prüfseite verlinkt) + /api/musterzertifikat: layoutidentisches Muster-PDF
  über den echten Generator mit diagonalem MUSTER-Wasserzeichen; Seed setzt
  festen Demo-Verify-Code (demo1234…) für die öffentliche Verify-Demo
- /ueber-uns: Person (Sascha, Pram/OÖ), Motiv, Firmenkonstrukt transparent
  erklärt, 4 Messbarkeits-Prinzipien, Kontakt; AboutPage/Person-JSON-LD;
  Porträt via optionalImage (public/images/sascha.jpg — liefert Sascha)
- GEO-Paket: /llms.txt (dynamisch aus DB/Config: Definition, Einordnung,
  Kurse, Preise, Links, Anbieter), Course-JSON-LD auf /schulung (aus DB),
  BreadcrumbList-JSON-LD auf Modul-Detailseiten
- Startseite: neue Sektionen Problem (3 Punkte), Rechtskontext Art. 4
  (sachlich, FAQ-Link) und Musterzertifikat-Teaser
- /pricing: Pro-Kopf-Anker je Plan („ab € 5,98 pro Person/Monat" Business,
  berechnet aus Plan-Daten) mit Präsenzkurs-Vergleichssatz
- Footer: Links Über uns + Musterzertifikat; Sitemap + Middleware erweitert;
  Content-Audit-Registry um i18n:muster/i18n:about ergänzt
- docs/SEO_GEO_TRUST_REPORT.md (13-Kapitel-Analysereport, Basis dieser
  Maßnahmen; SEMrush-Zahlen als nicht geprüft markiert)

## [0.7.0] — 2026-07-08 (Nacht, Teil 4: Content-Audit-System Phase 1)

### Hinzugefügt
- Content-Audit-System (Spezifikation ROADMAP §4, Entscheidung Sascha):
  hash-gebundene menschliche Freigaben für alle KI-generierten Inhalte.
  Datenmodell ContentAuditItem + ReviewChecklistTemplate/Item +
  ContentReviewChecklistResult/Answer (init.sql synchron); Kernlogik
  lib/content-audit/logic.ts (normalisierter SHA-256-Hash, Statusmaschine,
  canApprove-Gate, eigener Risk-Word-Scanner mit Negationsregeln,
  Zeilen-Diff) — unit-getestet
- Quellen-Registry + idempotenter Scan (lib/content-audit/scan.ts):
  erfasst Kurse/Module/Lektionen je didaktischem Feld, alle Fragen,
  Modul-Detailtexte, zentrale i18n-Blöcke (home/pricing/themen/
  feature.review/certificate) und Modulbilder (Datei-Hash) — Coverage-
  Prinzip: Registriertes kann nicht „vergessen" werden; Integrations-Smoke
  in Sandbox: 300+ Blöcke erfasst, idempotent
- /admin/content-audit: 6 KPI-Karten (rot bei „Live ohne aktuelle
  Freigabe" > 0), Filter, Tabelle mit Hash-Status; Detailseite mit
  Snapshots, Diff, Scanner-Treffern, Checkliste, Audit-Historie
- Freigabe-Flow: Approve serverseitig gesperrt bis alle Pflicht-Items +
  Publikationshaken grün; Owner-Freigabe mit TOTP-Re-Authentifizierung
  (lib/totp.ts wiederverwendet); grünes Badge lebt am Hash (kippt bei
  Änderung automatisch); 9 neue AuditLog-Actions (CONTENT_AUDIT_*)
- 5 Seed-Checklisten-Templates (Allgemein/Compliance/QM/Übersetzung/
  Rechtstexte), CSV-Export (auditiert), 13 neue Tests (gesamt 106)
- Neue Doku: CONTENT_AUDIT_SYSTEM.md, CONTENT_REVIEW_WORKFLOW.md,
  LEGAL_WORDING_CHECK.md

### Behoben
- scripts/init-db.mjs: idempotent gegenüber bereits vorhandenen ALTER-
  TABLE-Spalten (Saschas „duplicate column name: oldValue"-Fehler)
- Wording-Guard-Repo-Test: gezielte Ausnahme für die Scanner-Wortliste
  (lib/content-audit/logic.ts) analog zur Guard-Liste selbst;
  Seed-Checklisten-Labels Guard-fest formuliert

### Hinzugefügt (Nachtrag: Kontaktdaten + SMTP)
- Offizielle Kontaktdaten hinterlegt: contactEmail info@ki-nachweis.at
  (wirkt zentral über appConfig an allen 11 Stellen inkl. Zertifikats-
  Aussteller-Kontakt und Verify), Telefon AT +43 699 10050220 und
  Telefon China +86 191 8217 7220 (config + Impressum); Seed aktualisiert
  bestehendes Rechtsprofil (E-Mail/Datenschutzkontakt) statt nur Neuanlage
- SMTP-Versand implementiert (lib/mail.ts + nodemailer): MAIL_PROVIDER=smtp
  mit SMTP_HOST/PORT/USER/PASS + MAIL_FROM aus .env, MailLog SENT/FAILED,
  sicherer Log-Fallback; .env.example + DEPLOYMENT.md (SPF/DKIM-Pflicht)

### Offen (Phase 1b — TODO)
- PDF-Einzelnachweis je Item, JSX-Rechtsseiten + E-Mail-Templates in die
  Registry, Prüfmodus-Overlay auf öffentlichen Seiten, Save-Hooks,
  Scan-Cron-Route

## [0.6.0] — 2026-07-07 (Nacht, Parallel-Session „Teil 4")

### Hinzugefügt
- Kurs 3 „Richtig Prompten — KI-Assistenten wirksam nutzen" (Slug
  richtig-prompten, 6 UE): 10 Module, 32 Lektionen (Präfix pr-,
  prisma/seed/content-lessons-prompting.ts) — prinzipienbasiert ohne
  Klick-Anleitungen; Themen laut Spezifikation: Funktionsweise, Prompt-Formel
  (Rolle/Ziel/Kontext/Format/Ton), Iterieren, Kontext & Dokumente, Textarbeit,
  Analyse & Zahlen, Kreativ/Bild-Prompts inkl. Kennzeichnungs-Recap,
  Tool-Kunde, Sicherheit (Datenschutz, Prompt-Injection, Halluzinations-
  Prüfsystem), Prompt-Bibliothek
- Fragenpool Kurs 3: 74 Fragen in 10 neuen PR_-Kategorien, 43 % Praxisfälle
  (content-questions-prompting-1/2.ts); eigene Prüfung 30 Fragen / 75 %
- 10 öffentliche Modul-Detailtexte (lib/module-details.de.ts) für die
  pr-Module; Kategorien-Anzeigenamen (10 PR_-Keys) in lib/i18n/de.ts
- Zertifikatstitel Kurs 3 (config courseCertificateTitleKeys +
  certificate.titlePrompting)
- Öffentliche Roadmap-Seite /ki-kompetenz-review für das GEPLANTE Modul
  „Jährliches KI-Kompetenz-Review & Auffrischung": Status-Badge aus
  Feature-Flag (config featureFlags.kiKompetenzReview = "planned"), Hero,
  Warum-Abschnitt, 6 Funktionskarten, Zielgruppen, QM-Hinweis ohne
  Zertifizierungsversprechen, 8-Schritte-Workflow, Roadmap-Tabelle (alles
  „geplant"), rechtlicher Hinweis; alle Texte i18n (feature.review.*);
  Footer-Link; Middleware-Public-Path
- Neue Doku: ROADMAP.md (vollständige Spezifikation Review-/Auffrischungs-
  system inkl. Grenzwerte, Datenmodelle, 4 geplante Crons, Akzeptanz-
  kriterien), MARKETING_PAGES.md (Regeln für Feature-/Roadmap-Seiten)
- 11 neue Tests (Kurs-3-Module/Lektionen/Präfix/Kollisionen; Fragenpool
  Menge/Praxisquote/Kategorien/Modulabdeckung)

### Hinzugefügt (Nachtrag: Konsistenz-Audit + Leadmaschine)
- Leadmaschine /themen: öffentliche Themenwunsch-Umfrage (8 Themen +
  Freitext, Kontakt optional nur mit Einwilligung, Honeypot, Datensparsamkeit)
  + Modell InterestLead (schema.prisma + init.sql) + Superadmin-Auswertung
  /admin/leads (Themen-Ranking, Lead-Tabelle) + Footer-/Sitemap-/Admin-Nav-
  Verlinkung; CTA „Roadmap-Funktion vormerken" zeigt jetzt auf /themen
- CLAUDE.md: neue KONSISTENZ-PFLICHT (bei jeder Ergänzung abhängige Texte
  prüfen — mit Fundstellen-Checkliste)
- 3 neue Glossar-Einträge (Halluzination, Prompt-Injection, Kontextfenster)
  für die Überschriften des Prompting-Kurses
- ROADMAP.md: Kurs-Pipeline (Kurs 4 „KI-Agenten/Second Brain" inkl.
  Anweisungsdateien-Modul, Kurs 5 Führungskräfte geparkt) + Video-Policy
  (verlinken statt einbetten, zentral pflegen, Sichtung durch Sascha)
- scripts/dev-complete-lessons.mjs: Dev-Helfer, markiert Lektionen eines
  Nutzers als erledigt (öffnet das Prüfungs-Gate für lokale Tests)

### Hinzugefügt (Nachtrag 2: Content-Audit-Entscheidung)
- Internes Content-Audit-System als Phase 1 entschieden und vollständig
  spezifiziert (ROADMAP.md Abschnitt 4): hash-gebundene Freigaben an
  ContentRevision angedockt, konfigurierbare Checklisten, separater
  Risk-Word-Scanner, Owner-Freigabe ohne neue Rollen, DB-/Git-Inhalte
  getrennt erkannt; Open-Source-Extraktion erst nach interner Nutzung
- /ki-transparenz: Prüf-Aussage präzisiert (keine Pauschalbehauptung
  „sämtliche Inhalte wurden geprüft" mehr — jetzt belegbare Formulierung)

### Behoben (Konsistenz-Audit nach Kurs 3)
- /features zeigte Stand von V0.1 („12 fertige Lernmodule", „über 120
  Fragen") → jetzt 3 Kurse / 37 Module / über 300 Fragen in 30 Kategorien
- „Beide Kurse"-Reste auf /schulung (Fließtext) und home.benefit2Text,
  courses.intro auf drei Kurse; /courses: Empfehlungstext + eigenes Icon
  für Kurs 3 (RECOMMENDATION_KEY/COURSE_ICON slug-basiert statt Index)
- /ki-kompetenz-review fehlte in der Sitemap → ergänzt (+ /themen)

### Geändert
- Plan-Features und Preistexte: „Beide Kurse" → „Alle 3 Kurse" (Seeds,
  pricing.subtitle/flatrateNote); /schulung-Metadaten auf drei Kurse
- ContentRevision V1.006 + config contentVersionLabel V1.006 (Footer)
- QM_SYSTEM/QM_WORKFLOW/MANAGEMENT_REVIEW/CRON_JOBS/TODO: TODO-Einträge für
  das geplante jährliche Review-/Auffrischungssystem (Verweis ROADMAP.md)

## [0.5.0] — 2026-07-07

### Hinzugefügt
- Öffentliche Modul-Detailseiten `/schulung/[modulSlug]` für alle 27 Module:
  ausführliche Erklärung im Praxisstil mit Alltagsbeispielen
  (lib/module-details.de.ts), Lektionsliste mit Lernzielen als Teaser,
  Abkürzungs-Glossar (lib/glossary.ts), Zurück-Button, Bild je Modul
  (public/modules/<slug>.png via optionalImage), Vorlesen, Freischalt-CTA
- 27 Modulbilder (17 Basic + 10 KI-Verantwortliche) thematisch zugeordnet
- Vorlesefunktion auf Homepage, /schulung und Modul-Detailseiten (bestehende
  ReadAloud-Komponente; Start nur per Klick, nie automatisch) + Bewerbung
  („Lieber hören statt lesen?")
- Homepage: Kurse als nummerierte, einklappbare Boxen (default eingeklappt);
  /schulung: Kurse nummeriert („Kurs 1"/„Kurs 2")
- Inhaltsstand im Footer (config contentVersionLabel, aktuell V1.005);
  ContentRevision V1.005 im Seed
- CLAUDE.md: verbindliche Projektregeln (Schreibstil, Recht, Versionierung)
- Git-Repository github.com/Chengdu-2026/ki-campus

### Behoben
- Homepage mischte seit dem zweiten Kurs alle 27 Module in einem Raster mit
  doppelten Nummern (findMany ohne Kursfilter)
- Middleware: /schulung und /schulung/* erforderten Login — jetzt öffentlich
- 15 fehlende Kategorie-Anzeigenamen (rohe Keys wie categories.AI_ACT_SYSTEMATIK
  in Admin-Fragenliste und Auswertungen sichtbar)
- Verwirrender Plan-Feature-Text zur Nachprüfung in zwei klare Punkte getrennt;
  Betrag aus config statt hardcodiert

## [0.4.0] — 2026-07-07

### Hinzugefügt
- Basic-Kurs auf 17 Module / 41 Lektionen erweitert: neue Module
  Informationssicherheit & KI-Risiken (Kontosicherheit/2FA, Phishing & Deepfakes,
  Geschäftsgeheimnisse), Transparenz & Kennzeichnung (inkl. verschobener Lektion
  transparenz-ki-inhalte aus dem Urheberrecht-Modul plus neuer Alltags-Lektion),
  KI-Tools/Freigabe/Schatten-KI, KI-Vorfälle & Meldewege, Qualität/Feedback/
  Nachschulung; Fragenpool Basic 124 → 154 (5 neue Kategorien)
- Zweiter Kurs „KI-Verantwortliche & KI-Beauftragte im Unternehmen":
  10 Module, 37 Lektionen (Slug-Präfix off-), 84 Prüfungsfragen mit 48 %
  Praxisfällen; eigene Prüfungskonfiguration (30 Fragen, 75 %)
- Zertifikatstitel je Kurs (config courseCertificateTitleKeys + i18n
  certificate.titleOfficer); PDF nutzt kursabhängigen Titel
- /courses ist jetzt echte Kursübersicht mit Empfehlungstext je Zielgruppe,
  Fortschritt und Zertifikatsstatus je Kurs; /schulung zeigt beide Kurse
  öffentlich mit allen Modulen/Lektionen (Transparenz vor Buchung)
- Nachprüfungs-Modell: Übungsmodus unbegrenzt, 3 Testversuche je Kurs inklusive,
  danach € 99 Nachprüfung je Teilnehmer (config examRetakeFeeEur; Freischaltung
  vorerst manuell via auditiertem Versuchs-Reset, Online-Zahlung als TODO);
  Plan-Features und Preisseite entsprechend aktualisiert
- Preisseite: Jahresrabatt-Anzeige (Basic −10 %, Business −15 %,
  config annualDiscountPercent) und Hinweis auf Nachweis-Download vor Kündigung
- 12 neue Tests (Basic 17 Module/Verschiebungs-Check/Modulabdeckung; Officer-Kurs
  Module/Lektionen/Fragen/Praxisquote/Slug-Kollisionen; Disclaimer/Titel) —
  gesamt 81 grün
- Neue Doku: TEXT_REWRITE_LOG.md (Tonalität je Bereich),
  DATA_PROTECTION_TODO.md (Profilfoto-Vormerkung)

### Geändert
- Zertifikats-Disclaimer formal ergänzt: verneint jetzt auch ISO-Zertifizierung
  (juristischer Ton unverändert)
- Basic-Kurs teachingUnits 4 → 6 (Umfangswachstum); FAQ und Marketingtexte
  auf 17 Module/zwei Kurse aktualisiert
- exam.noAttempts / dashboard.statusNoAttemptsLeft: kommunizieren das
  Nachprüfungs-Modell statt pauschalem „keine Versuche mehr"
- Seed refaktoriert: generische seedCourse()-Funktion für beide Kurse;
  Lesson-Upsert aktualisiert jetzt auch moduleId (Lektionsverschiebungen) und
  durationMinutes; ContentRevision V1.004
- Übungsmodus: Kursauswahl deterministisch (ältester Kurs = Basic);
  kursübergreifende Übung als TODO dokumentiert

## [0.3.0] — 2026-07-07

### Hinzugefügt
- QM-Modul zur Unterstützung dokumentierter Qualitätsprozesse nach ISO-9001-Logik
  (keine ISO-Zertifizierung): Feedback-Fragebogen (10 Fragen) nach bestandenem Test,
  automatische Bewertung mit 3 Eskalationsstufen (lib/qm/logic.ts), Qualitätsfälle
  mit dedupeKey, CAPA-Statusmaschine mit serverseitiger Abschluss-Sperre,
  quartalsweise Management-Reviews mit automatischer Kennzahlenbefüllung,
  7 gesicherte Cron-Routen (/api/cron/*, Bearer CRON_SECRET), Dashboards
  /company/qm und /admin/qm mit Ampel und 12 Kennzahlen (Trend 30/90),
  CSV/PDF-Exporte (auditiert), 5 QM-Mail-Templates, 18 neue Tests
  (Dokumentation: QM_SYSTEM.md, QM_WORKFLOW.md, QM_THRESHOLDS.md, CRON_JOBS.md,
  MANAGEMENT_REVIEW.md, CORRECTIVE_ACTIONS.md)
- Versionsregister der Lerninhalte (ContentRevision) ab Baseline V1.003:
  jede Lektions-/Fragenänderung erzeugt eine neue Version mit Änderungsnotiz,
  Nutzer und Zeitpunkt; Tabelle unter /admin/versions; AuditLog erweitert um
  oldValue/newValue
- Lernunterlagen: einmaliger PDF-Download je Teilnehmer+Kurs (MaterialDownload
  unique) mit personalisiertem Wasserzeichen (Name+E-Mail diagonal + Fußzeile
  auf jeder Seite); zweiter Versuch liefert 403 mit Hinweis
- FAQ mit 29 Fragen inklusive Gesetzes-Fundstellen
- Öffentliche /schulung-Seite; SEO/GEO-Optimierung
- Zwei-Faktor-Authentifizierung (TOTP) — siehe [0.2.0], in 0.3.0 dokumentarisch
  konsolidiert

### Geändert
- Preise: Basic 129 €/Monat (bis 10 TN), Business 299 €/Monat (bis 50 TN),
  Enterprise auf Anfrage (Flatrate je Firma)

### Behoben
- Antwort-Shuffle-Fix im Prüfungsmodul

## [0.2.0] — 2026-07-06

### Hinzugefügt
- Zwei-Faktor-Authentifizierung (TOTP, RFC 6238) — kompatibel mit Google/Microsoft
  Authenticator und Authy: Setup mit QR-Code unter /settings/2fa, Aktivierung nur
  nach Code-Bestätigung, Deaktivierung nur mit gültigem Code, Login verlangt Code
  wenn aktiv, AuditLog (TOTP_ENABLED/DISABLED/FAILED), 4 Tests inkl. RFC-Testvektor.

### Geändert
- Superadmin-Seed: sascha.morocutti@gmail.com (statt Platzhalter-Adresse).

## [0.1.0] — 2026-07-06

### Hinzugefügt
- Komplettes Datenmodell (24 Tabellen) inkl. Übersetzungs- und Versionierungstabellen
- Auth.js-Credentials-Login, JWT-Sessions, Rollen (Superadmin/Firmenadmin/Trainer/Teilnehmer)
- Mandantentrennung (Middleware + requireRole + assertCompanyScope)
- Self-Service-Firmenregistrierung, Einladungen per Link/Code, manuelle Anlage,
  Passwort-Reset, Plan-Limit-Enforcement (Basic 10 / Business 50 / Enterprise ∞)
- LMS: 12 Module, 29 Lektionen mit Lernziel/Beispiel/Risiko/Merksatz/Mini-Checks,
  Fortschritt, geführter Lernpfad mit Status-CTAs
- Prüfung: 124 Fragen (10 Kategorien, 44 % Praxisfälle), 30 Zufallsfragen, 75 %-Grenze,
  max. 3 Versuche + Admin-Reset, Resume-fähig, Kategorien-Auswertung
- Adaptive Nachschulung + Übungsmodus (falsche Antworten / schwache Themen / alle / Simulation)
- Zertifikate: automatische Ausstellung, A4-PDF (pdf-lib) mit QR, SHA-256-Hash,
  öffentliche Verify-Seite über Zufallscode, Widerruf, Gültigkeitslogik
- Dashboards: Superadmin-Statistiken, Firmen-Fortschritt, Lückenanalyse, CSV-Export
- Rechtsseiten: /legal-disclaimer, /impressum (Daten von hainan.at), /datenschutz,
  /agb (Platzhalter), /ki-transparenz; Footer-Disclaimer überall
- Wording-Guard: Verbotsliste + Repo-weiter Test + Speicher-Guard in Admin-Actions
- Dark Mode (System/manuell), responsive UI, Barrierefreiheits-Grundlagen
- i18n: de vollständig, en vorbereitet, 22 EU-Locales konfiguriert, DB-Translations
- AuditLog (20+ Aktionen), MailLog + 6 E-Mail-Templates (de)
- 45 Vitest-Tests, Production Build grün
