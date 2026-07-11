# Agent Handover

## STAND 2026-07-11 (Teil 8, Session 10.7. nachts → 11.7.) — ZUERST LESEN

> Hinweis: Der Eigentümer hat am 10.7. separat gearbeitet; diese Teil-8-Session lief über
> Nacht in den 11.7. Statische Deliverables tragen teils noch „2026-07-10" im Dateinamen
> (z. B. `AUDIT_TEIL8_2026-07-10.md`) — inhaltlich derselbe Stand.

**Riesen-Session. Alle Edits liegen im Host-Arbeitsbaum, NOCH NICHT gepusht.**
`npm run db:generate` + `npm run db:init` + `npm run build` auf Windows offen (AVV = neue Tabelle!).

**Gebaut & zurückgeschrieben (verifiziert tsc/Tests/Build im frischen Git-Klon):**
1. **Audit + Stresstest** (`docs/AUDIT_TEIL8_2026-07-10.md`). Fixes: P1 Build-Breaker
   (`QM_CONTENT_REPORTED` fehlte in `lib/audit.ts` → Build war kaputt), M1 QM-Owner-
   Mandantengrenze (`assertOwnerInScope` in `qm-actions.ts`), M2 Reset-Token-Entwertung,
   M3 `/api/cron` aus Middleware, H2 Rate-Limiting (`lib/rate-limit.ts`, fail-open).
2. **24/7-USP + Maskottchen** auf der Homepage (`app/page.tsx`, i18n `home.always*`/
   `home.mentor*`). Eule „KI-Campus Mentor" transparent: `public/images/maskottchen-mentor.png`
   + `maskottchen-freundlich.png`. Branding fix verankert in `CLAUDE.md` (Abschnitt BRANDING)
   + `QM_SYSTEM.md`.
3. **FAQ** (`app/faq/page.tsx`): war komplett, aber Dev-Server-Crash ließ sie nicht rendern
   (KEIN Code-Fehler — per Klon-Build bewiesen). Neue Eröffnungsfrage „Dürfen private Anbieter
   das überhaupt? WIFI/Kammern" ergänzt (Art.-4-Positionierung). FAQ jetzt auch in eingeloggter
   Nav (`components/layout/header.tsx`).
4. **Kursplan 10 + B2C-Abo** freigegeben (`docs/KURSPLAN_UND_B2C.md`). Preise entschieden:
   Privat 14,90 €/Mt (119 €/J), Solo/Freelancer 24,90 €/Mt (199 €/J). Prinzipien §0: nur online,
   Büro-Praxisfälle, Fundstelle je Rechtsaussage, Witz bei trockenen Themen.
5. **Musterlektion K8 Datenschutz** freigegeben (Ton „ganz gut"), Quellen klein als Fußnote unten
   (`docs/MUSTERLEKTION_K8_DATENSCHUTZ.md`). Nächster Schritt: K8 komplett ausbauen (`SeedLesson`-
   Format, Drop-in bereit). Offen (Eigentümer prüft): allgemeiner Datenschutz-Kurs vs. DSB-Kurs.
6. **AVV** (Art. 28 DSGVO): Master-Vorlage `docs/AVV_MASTER_VORLAGE.md` (plattformübergreifend,
   China/SCC-Warnblock oben, Campus-Fakten gefüllt) + **In-App-Accept-Flow gebaut**:
   Model `AvvAcceptance` (schema+init.sql), Action `app/actions/avv-actions.ts`, Seite
   `/company/avv`, Link im Firmen-Dashboard, i18n `avv.*`, `AVV_ACCEPTED` im AuditLog.
   Speichert Name/Geburtsdatum/Position/IP/Signatur/Version/Content-Hash/Zeit. `appConfig.avvVersion="V1.0"`.

**GO-LIVE-BLOCKER (vor Deploy zwingend, siehe Auditbericht):** K1 Seed-Superadmin-Passwort steht
im Repo → env-gaten + rotieren. K2 `AUTH_SECRET` härten (Boot-Check). H1 Mail-Verifikation (erst
wenn SMTP live). H3 Session-Invalidierung. **NICHT deployen, solange K1/K2 offen sind.**

**AVV-China-Struktur (Eigentümer + Anwalt):** Auftragsverarbeiter = Hainan (China) → Drittland
auf Verarbeiter-Ebene trotz DE-Servern. SCC oder EU-Entity klären, bevor AVV produktiv genutzt wird.

**Hosting-Fakt (2026-07-10):** App/Daten bei Hostinger, Deutschland (EU). Node/Next-Tarif prüfen.

**Nächste Happen (Eigentümer-Methode: 1 Musterlektion → Freigabe → skalieren):** K8 ausbauen ·
AVV-PDF + Gate + Volltext-Seite · Deploy-Blocker abarbeiten · Bilder-Dedupe (Rename erledigt).

---

## Projektziel
Multi-Tenant B2B-SaaS „KI-Kompetenz Campus": Schulung → Test (30 Fragen, 75 %) →
privater Schulungsnachweis (PDF + QR-Verify) → Firmen-Reporting.
KEINE staatlich/behördlich klingenden Aussagen (Wording-Guard erzwingt das).
Verbindliche Regeln: CLAUDE.md (Schreibstil, Recht, Versionierung, No-Touch).

## Git & Verifikation (WICHTIG)
- Repo: https://github.com/Chengdu-2026/ki-campus (main). Sascha pusht lokal.
- Die Cowork-Sandbox sieht Projektdateien teils ABGESCHNITTEN (Sync-Bug).
  Verifikation deshalb IMMER über frischen Git-Klon/Pull in der Sandbox,
  nie über den Mount. Datei-Edits mit Read/Write/Edit (Host) sind zuverlässig.
- Sandbox-Eigenheiten: prisma generate braucht Dummy-Engine-Env
  (PRISMA_SCHEMA_ENGINE_BINARY/PRISMA_QUERY_ENGINE_LIBRARY/…_BINARY auf
  Dummy-Datei + PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1), binaries.prisma.sh
  ist gesperrt. Nach npm-Installationsabbrüchen native Pakete prüfen
  (@next/swc, @prisma/client waren einmal trunkiert → Bus error/Typfehler).

## STAND 2026-07-08 (Teil 7, V0.11.0) — zuerst lesen

Edits liegen im Host-Arbeitsbaum, **noch nicht gepusht**, `npm test`/`build` auf Windows offen.
- **Handbuch-Rollout:** alle 17 Basic-Module im Handbuch-Format
  (`lernunterlagen/_generator.py`, Feature `handbuch` V2.1 in `config/feature-versions.ts`),
  Modul 5 = kuratiertes Referenz-Muster. Styleguide `docs/STYLEGUIDE_HANDBUCH.md`,
  Backlog `docs/HANDBUCH_BACKLOG.md`. WICHTIG: Generator ist Sandbox-Herkunft
  (per `cat > … <<'PYEOF'`), sonst trunkiert der Mount die .py beim Lesen durch python.
- **Review-Cockpit** `/admin/review-plan` — REUSE der content-audit-Freigaben (kein Neubau);
  Logik `lib/review-schedule.ts` (+ Tests), Config `contentReviewCycleMonths/MaxPerDay`.
- **Teilnehmer-Fehlermeldung:** `reportContentIssue` (`app/actions/qm-actions.ts`) →
  QualityIssue; UI-Block in `app/lessons/[id]/page.tsx`.
- **Theme-Logo** in `components/layout/header.tsx` (hell/dunkel via optionalImage).
- **Zertifikat-PDF** (`lib/certificate/pdf.ts`) komplett überarbeitet: Titel „Bescheinigung
  der KI-Kompetenz nach Art. 4 EU AI Act" (2-zeilig, wrap 34), Daten-QR y `height-207` (≈−3 cm),
  Verify-QR y `160.5` (≈+1,5 cm), Geburtsdatum (Zeile + QR-Payload), Logo Kopfzeile
  (`public/images/KI-Kompetenz-Logo-dunkel.png`), Eule-Wasserzeichen
  (`public/images/mascot-hero.png`, Opazität 0,06, ow=320), Disclaimer 6,5 pt + ISO-9001-
  Dokumentenlenkungszeile (y46). Seed: Geburtsdaten Anna/Bernd/Clara. i18n `certificate.title*`.
  Verifiziert per PyMuPDF-Proof (`lernunterlagen/img/_cert_v3.png`).

NÄCHSTE SCHRITTE (Windows-Dev-Server):
1. `npm test` + `npm run build` grün → committen/pushen.
2. `npm run db:seed` (schreibt Geburtsdaten) → Zertifikat neu herunterladen und real prüfen.
3. Eigentscheide einholen: Disclaimer-Rebrand „Zertifikat"→„Bescheinigung"?; globaler
   `contentVersionLabel` V1.008→V1.009 + Register-Zeile beim Release; Task #25 Re-Zertifizierung.

## STAND 2026-07-08 (Task 4, V0.10.2)

Erledigt in dieser Session (Edits liegen im Host-Arbeitsbaum, noch nicht gepusht):
- **N4 Zertifikat-PDF „TESTZUGANG": bestanden.** Route (`app/api/certificates/[id]/pdf/route.ts`
  Z.51) übergibt `company.isTest`; Renderer (`lib/certificate/pdf.ts` Z.164–175) zeichnet
  Wasserzeichen + rotes Banner. Beweis (PDF/PNG + cert-proof.mjs):
  docs/live-tests/2026-07-08/n4-zertifikat-testzugang.
- **Stale-Fix (P3): `toggleUserStatus`** revalidiert jetzt auch `/admin/companies/[id]`;
  gleiche Lücke systematisch bei createInvitation/createParticipant/updateParticipant/
  deleteUserGdpr/resetAttempts geschlossen (`app/actions/company-actions.ts`).
- **Code-verifiziert (solide, aber Live-Klick offen):** Durchlauf (13–28), Mandantentrennung
  (47), N6-Banner. Bericht: docs/live-tests/2026-07-08/task-4-durchlauf-mandanten-n6.

NÄCHSTE SCHRITTE (auf dem Windows-Dev-Server, dort liegen die Edits bereits):
1. `npm test` + `npm run build` → bestätigt den V0.10.2-Fix, dann committen/pushen.
2. Firma-B-Seed idempotent in `prisma/seed` ergänzen (für den A/B-Mandantentest).
3. Live: eine Firma auf isTest=true (Superadmin), Durchlauf als Anna klicken
   (Lektionen→Test→Zertifikat→QR/Verify), N4-Stempel + N6-Banner sichten,
   Cross-Tenant Firma-A→Firma-B-Zertifikat-PDF = 403 bestätigen → Katalog auf ✅.

## SOFORT-KONTEXT für den nächsten Agenten (CHAT-ÜBERGABE Teil 6 → Teil 7, Stand 2026-07-07)

**WICHTIGE KORREKTUR zum „Teil-3-Merge":** Es gab NICHTS zu mergen. Das
Superadmin-Paket (Superadmin-Verwaltung V2 + Tester-Freigabe) war nie gebaut —
kein Branch, kein Commit, kein Code (per frischem Git-Klon + grep verifiziert:
weder isTest/testExpiresAt noch Firmen-/Nutzer-Edit-Actions existierten). Die
Formulierung „Teil-3-Merge" im alten Handover war ein Irrtum. Teil 6 hat das
Paket daher NEU GEBAUT als V1.008 (Release V0.10.0).

**Session Teil 6 hat geliefert (V0.10.0, Inhaltsstand V1.008):**
1. Superadmin – Firmen bearbeiten: Stammdaten (Name, Ansprechpartner, UID,
   E-Mail, Telefon, Adresse), Plan-Wechsel, Status ACTIVE/INACTIVE via Server
   Action `updateCompany` (auditiert COMPANY_UPDATED, old/new). UI-Karte in
   /admin/companies/[id].
2. Superadmin – Nutzer bearbeiten: Rolle, Status, Name, E-Mail via
   `updateUserAsSuperadmin` (auditiert USER_UPDATED). Neue Seite
   /admin/users/[id] + Bearbeiten-Link in /admin/users. Selbst-Aussperr-Schutz,
   E-Mail-Eindeutigkeit, KEINE Mandanten-Verschiebung (bewusst).
3. Tester-Freigabe: Company.isTest (Boolean) + testExpiresAt (DateTime?) —
   schema.prisma + init.sql synchron, inkl. idempotenter ALTER TABLE für
   bestehende DBs. Toggle-Karte „Testzugang" in /admin/companies/[id]
   (`setCompanyTestAccess`). Konsequenzen vollständig umgesetzt:
   (a) Zertifikate von Test-Firmen: diagonaler „TESTZUGANG"-Stempel + Banner
       „TESTZUGANG — kein gültiger Nachweis" (lib/certificate/pdf.ts, isTest-
       Flag; Cert-Download-Route reicht company.isTest durch).
   (b) Verify-Seite zeigt Test-Hinweis (verify.test/testHint).
   (c) Statistik-Ausschluss: Superadmin-Dashboard-KPIs (Teilnehmer/bestanden/
       Zertifikate) + QM `courseMetrics(companyId=null)` schließen Test-Firmen
       aus (lib/test-companies.ts → `testCompanyIds()`).
   (d) Cron `deactivate-expired-tests` (lib/qm/cron.ts, CRON_JOBS) setzt
       abgelaufene Testzugänge auf INACTIVE (auditiert).
   (e) UI-Banner „Testzugang bis {Datum}" für Nutzer einer Test-Firma
       (components/layout/test-access-banner.tsx im Root-Layout).
4. Versionierung (Zwei-Spuren, Eigentümer-Vorgabe 2026-07-07): globaler
   Gesamtstand `contentVersionLabel` V1.008 im Footer („letzte höchste Version");
   NEU pro-Feature-Versionen (config/feature-versions.ts) als `<VersionBadge>` auf
   der Seite — superadmin-verwaltung V1.001, tester-freigabe V1.001 (ContentRevision
   entityType FEATURE). 5 neue Tests (tests/test-access.test.ts).

**Letzte Verifikation (Teil 6):** tsc 0 · Tests 111/111 · next build EXIT=0
(90 Routen inkl. /admin/users/[id] und erweitertem /admin/companies/[id]).
Methode: frischer Git-Klon aus lokalem .git, Entwicklung/Verifikation im Klon,
Auslieferung an den Host über Read/Write/Edit (Mount weiterhin truncation-
anfällig — bestätigt: de.ts kam 43 KB statt 61 KB an). SANDBOX-NPM-FALLE für
den nächsten Agenten: lucide-react (dist/*.d.ts fehlte → tsc-Rauschen) und
@pdf-lib/standard-fonts (lib/ fehlte → certificate.test rot) kamen aus dem
npm-Proxy unvollständig an. Fix: `npm cache clean --force` + gezielter
Reinstall (clean re-extract). Prisma generate weiter mit Dummy-Engine-Env.

**NÄCHSTE AUFTRÄGE (Superadmin-Merge ENTFÄLLT — erledigt):**
1. Sascha: pushen (Kommandos unten), `npm run db:init` + `npm run db:seed`
   (bringt isTest/testExpiresAt via ALTER TABLE + V1.008-Revision). Im Browser
   prüfen: Firma auf Testzugang stellen → Zertifikat-PDF trägt TESTZUGANG,
   /verify zeigt Test-Hinweis, Banner erscheint; Firmen-/Nutzer-Edit auditiert.
2. Semrush-Rest an einem Folgetag (Browser, Free-Limit): KI Zertifikat, Art 4
   AI Act, AI Act Schulung, Copilot Schulung, KI Weiterbildung, KI Schulung
   Kosten/KMU → Report Kap. 5a ergänzen.
3. Praxistest beider Kurse (ChatGPT-Testplan), Grok-Fragenpaket (~12–15 Fragen),
   Content-Audit Phase 1b, Zielgruppen-Seiten (HR/DSB/QM/KMU/Copilot).

## SOFORT-KONTEXT für den nächsten Agenten (CHAT-ÜBERGABE Teil 5 → Teil 6, Stand 2026-07-07)

**Session Teil 5 hat geliefert (V0.9.0, Inhaltsstand V1.007):**
1. SEMrush-Keyword-Daten: Report Kap. 5a NEU (6 Kern-Keywords, DB DE,
   2026-07-07). Zugangs-Fakten: Semrush-MCP vom Plan NICHT abgedeckt,
   Web-Bulk-Analyse Pro-only, Free-Plan-Tageslimit ~8–10 Einzelabfragen.
   Kernbefunde: AT-DB unter Messschwelle (außer „KI Schulung" AT 260);
   KI-Führerschein 590/Monat KD 15 = bester Hebel; „…pflicht"-Suffix ist
   DAS Suchmuster (110–390/Monat, KD ≤ 26); EU AI Act Schulung CPC 8,28 $;
   „KI Schulung" solo KD 57 ohne Backlinks unrealistisch;
   /ki-kompetenz-nachweis = reine Conversion-Seite (10/Monat).
2. Fünf Phase-2-Seiten (Report Kap. 7/11) GEBAUT: /art-4-ai-act-erklaert
   (zitierfähiger Definitionsblock wortgleich llms.txt, Quellen EUR-Lex/
   RTR/WKO, Autorenblock, Article-Schema), /ki-fuehrerschein-vergleich
   (Begriffs-Aufklärung, FAQPage-Schema, Fairness-Hinweis),
   /ki-kompetenz-nachweis, /chatgpt-schulung-mitarbeiter (Kurs-3-LP,
   Module dynamisch aus DB, Markenhinweis), /ki-schulung-mitarbeiter
   (Rollout + FAQPage). Alle: i18n-Sektionen art4/fuehrerschein/nachweis/
   chatgptLp/mitarbeiterLp in de.ts, Glossar, ReadAloud, Disclaimer,
   Muster-CTA, „Ist das Pflicht?"-Sektion, Breadcrumb-Schema.
3. Integration: Middleware-PUBLIC_PATHS, Sitemap (5×0.8), llms.txt
   („Wichtige Seiten" +5), Footer „Art. 4 erklärt", Startseiten-
   Rechtskontext verlinkt Art.-4-Seite, Content-Audit-Registry
   (scan.ts: i18n:art4 … i18n:mitarbeiterLp), ContentRevision V1.007.
4. Wording-Guard-Fix: Report Kap. 5 Zeile enthielt die Verbotsphrase
   wörtlich als Anmerkung → umformuliert (Test war dadurch rot).
5. pdf-lib war im Sandbox-npm trunkiert (bekanntes Muster) → Neuinstall.

**Letzte Verifikation (Teil 5):** Tests 106/106 · tsc 0 · Build EXIT=0
(65 Routen inkl. der 5 neuen). Methode erneut bestätigt: frischer Git-Klon
aus lokalem .git + Patch-Skripte über outputs/ — Mount liefert EDITIERTE
Dateien abgeschnitten (de.ts kam 42 KB statt ~57 KB an), NEUE Dateien ok.

**NÄCHSTE AUFTRÄGE (Reihenfolge):**
1. Sascha: pushen (Kommandos unten), db:init + db:seed (V1.007-Revision),
   Content-Audit-Scan starten und die 5 neuen i18n-Blöcke per TOTP freigeben.
2. Semrush-Rest an einem Folgetag (Browser-Session, Free-Limit beachten):
   KI Zertifikat, Art 4 AI Act, AI Act Schulung, Copilot Schulung,
   KI Weiterbildung, KI Schulung Kosten/KMU → Kap. 5a ergänzen.
3. Teil-3-MERGE (Superadmin-Paket): Berührpunkte config/app.ts, de.ts,
   seed/index.ts, middleware, schema+init.sql — Versionslabel abstimmen
   (Teil 5 = V1.007, nächstes = V1.008).
4. Danach Queue wie gehabt: Praxistest beider Kurse, Grok-Fragenpaket,
   Content-Audit Phase 1b, Zielgruppen-Seiten (HR/DSB/QM/KMU/Copilot).

**VON SASCHA OFFEN:** Push V0.9.0, db:init+seed, Porträtfoto sascha.jpg,
Modulbilder pr-*, All-Inkl-Postfächer + .env (TODO „OFFEN — MAIL"),
AGB/Datenschutz beim Anwalt, Content-Audit-Charge + neue Blöcke freigeben,
2FA fürs Owner-Approve.

## VORHERIGE ÜBERGABE (Teil 4 → Teil 5, Stand 2026-07-08)

**Session Teil 4 hat geliefert (chronologisch):**
1. Kurs 3 „Richtig Prompten" komplett (V1.006): 10 Module/32 Lektionen/74
   Fragen, Slugs pr-*, integriert inkl. Zertifikatstitel, Detailtexten, Tests.
2. Roadmap-Seite /ki-kompetenz-review (Feature-Flags in config, „geplant").
3. Konsistenz-Audit (u. a. /features war auf V0.1-Stand) + zwei neue
   CLAUDE.md-Regeln: KONSISTENZ-PFLICHT und ERST PRÜFEN, DANN BAUEN.
4. Leadmaschine /themen (InterestLead) + /admin/leads mit Themen-Ranking —
   Kurs-Priorisierung läuft ab jetzt über diese Daten (ROADMAP §2).
5. CONTENT-AUDIT-SYSTEM Phase 1 (0.7.0): hash-gebundene Freigaben,
   konfigurierbare Checklisten (5 Seed-Templates), eigener Risk-Scanner,
   /admin/content-audit + Detailseite mit Diff + TOTP-Owner-Freigabe,
   CSV-Export, Scan erfasst 300+ Blöcke. Doku: CONTENT_AUDIT_SYSTEM.md,
   CONTENT_REVIEW_WORKFLOW.md, LEGAL_WORDING_CHECK.md. Phase 1b offen (TODO).
6. Kontaktdaten: info@ki-nachweis.at zentral, Telefon AT +43 699 10050220 /
   CN +86 191 8217 7220 im Impressum; SMTP-Versand fertig implementiert
   (nodemailer, MAIL_REPLY_TO) — Betrieb wartet auf Saschas All-Inkl-
   Postfächer/DNS/DKIM (TODO „OFFEN — MAIL"; Host w0175bce.kasserver.com).
7. SEO/GEO/Trust-ANALYSEREPORT: docs/SEO_GEO_TRUST_REPORT.md (13 Kapitel,
   8 Wettbewerber live recherchiert, SEMrush nicht verfügbar → Plan ohne
   MCP-Zugang, nichts erfunden).
8. SEO-SOFORTMASSNAHMEN umgesetzt (0.8.0): /musterzertifikat + Muster-PDF-
   API (echter Generator + MUSTER-Wasserzeichen, fester Demo-Verify-Code
   demo1234… im Seed), /ueber-uns (Porträt-Slot public/images/sascha.jpg
   OFFEN), /llms.txt dynamisch, Course-/Breadcrumb-JSON-LD, Startseite
   (Problem/Rechtskontext/Muster-Teaser), Pricing-Pro-Kopf-Anker.

**Letzte Verifikation:** Tests 106/106 · tsc 0 · Build grün (59 Routen inkl.
aller neuen). Verifikationsmethode: frischer Git-Klon in Sandbox + Patch-
Skripte (Mount-Sync für EDITIERTE Dateien unzuverlässig — neue Dateien ok).

**NÄCHSTE AUFTRÄGE (Reihenfolge):**
1. Phase-2-Seiten aus SEO_GEO_TRUST_REPORT Kap. 7/11 (fertig spezifiziert):
   /ki-kompetenz-nachweis → /art-4-ai-act-erklaert →
   /ki-fuehrerschein-vergleich → /chatgpt-schulung-mitarbeiter →
   /ki-schulung-mitarbeiter. Jede: Schema, Quellenblock, Muster-CTA,
   Wording-Guard beachten, danach Content-Audit-Scan.
2. Semrush-Keyword-Zahlen: Sascha ist im Browser eingeloggt → via
   Chrome-MCP aus dem Web-UI ziehen (Keyword Overview, DB Austria, Liste
   in Report Kap. 5) und Report-Tabellen füllen. Alternativ Plan-Upgrade.
3. Danach Queue wie gehabt: Superadmin-Paket-MERGE aus Teil 3 (Berührpunkte:
   config/app.ts, de.ts, seed/index.ts, middleware, schema+init.sql!),
   Praxistest, Grok-Fragenpaket, Content-Audit Phase 1b.

**VON SASCHA OFFEN:** Push (V0.8.0-Kommandos hat er), npm install,
db:generate+init+seed, Porträtfoto sascha.jpg, All-Inkl-Postfächer + .env,
AGB/Datenschutz beim Anwalt, erste Content-Audit-Charge abarbeiten
(CONTENT_REVIEW_WORKFLOW.md), 2FA fürs Owner-Approve aktivieren.

## Aktueller Stand (2026-07-07 Nacht, nach V1.006 — Parallel-Session Teil 4)
Funktioniert: Registrierung, Einladungen, Login/2FA, Passwort-Reset, Lernpfad,
Prüfungs-Gate, Test mit Resume, Auswertung mit Kategorien-Analyse, adaptive
Nachschulung, Übungsmodus, automatische Zertifikate (PDF+Hash, QR-Verify,
Widerruf), Firmen-Dashboard, CSV-Export, Superadmin-CRUD (lesend + Kurs/Fragen),
AuditLog, QM-Modul, Cron, Versionsregister, Dark Mode, i18n.
DREI Kurse: Basic 17 Module / 41 Lektionen / 154 Fragen · KI-Verantwortliche
10 Module / 37 Lektionen / 84 Fragen (Slugs off-*) · Richtig Prompten
10 Module / 32 Lektionen / 74 Fragen (Slugs pr-*). Gesamt 312 Fragen.

## Neu in V1.006 (Parallel-Session „Teil 4", 2026-07-07 Nacht)
- Kurs 3 „Richtig Prompten" (Slug richtig-prompten, 6 UE, Flatrate inklusive):
  content-lessons-prompting.ts + content-questions-prompting-1/2.ts,
  10 PR_-Kategorien mit Anzeigenamen, certificate.titlePrompting,
  10 Modul-Detailtexte, Plan-/Preistexte „Alle 3 Kurse", 11 neue Tests.
  Modulbilder pr-* fehlen noch (Sascha liefert; Seiten laufen ohne Bild).
- Roadmap-Seite /ki-kompetenz-review (GEPLANTES Review-/Auffrischungsmodul):
  Feature-Flag-System config featureFlags (planned/beta/live), i18n
  feature.review.*, Footer-Link, Middleware-Public-Path. Regeln für solche
  Seiten: docs/MARKETING_PAGES.md — NIE Verfügbarkeit/ISO-Konformität
  behaupten, solange nicht gebaut.
- TODO „Jährliches KI-Kompetenz-Review & Auffrischungssystem" vollständig
  spezifiziert in docs/ROADMAP.md Abschnitt 1 (Empfehlungslogik, Antwortzeit-
  Grenzwerte, Kategorie-Scores 70/60/50, Wiederholungsmodus, Auffrischungstest,
  Admin-Ampel, jährliches Management-Review, 4 Crons, Modelle
  QuestionPerformance/CompetenceRefreshRecommendation/AnnualCompetenceReview,
  Akzeptanzkriterien) + Einträge in TODO/QM_SYSTEM/QM_WORKFLOW/
  MANAGEMENT_REVIEW/CRON_JOBS. Noch NICHT bauen ohne expliziten Auftrag.
- ACHTUNG Merge: Diese Session lief parallel zur Superadmin-Session (Teil 3).
  Berührpunkte: config/app.ts, lib/i18n/de.ts, prisma/seed/index.ts,
  middleware.ts, prisma/schema.prisma + init.sql (InterestLead!),
  TODO/HANDOVER/DAILY_LOG/CHANGELOG. Beim Zusammenführen:
  Versionslabel abstimmen (diese Session = V1.006).
- Nachtrag gleiche Nacht: Konsistenz-Audit (u. a. /features war auf
  V0.1-Stand) + KONSISTENZ-PFLICHT neu in CLAUDE.md (bei jeder Ergänzung
  Alt-Texte prüfen — Checkliste dort). Leadmaschine /themen + /admin/leads
  (Modell InterestLead; Kurs-Priorisierung ab jetzt über Lead-Daten).
  Kurs-Pipeline + Video-Policy: docs/ROADMAP.md Abschnitte 2–3.
  Dev-Helfer scripts/dev-complete-lessons.mjs öffnet das Prüfungs-Gate
  lokal (nach db:init ist aller Lektionsfortschritt weg — häufige
  Stolperfalle beim Browser-Test).

## Neu in V1.005 (dieser Auftrag)
- Öffentliche Modul-Detailseiten /schulung/[modulSlug] (alle 27 Module):
  Praxis-Erklärtexte + Alltagsbeispiele in lib/module-details.de.ts (Key=Slug),
  Lektions-Teaser (volle Inhalte hinter Login), Abkürzungs-Glossar
  lib/glossary.ts (Erkennung über Überschriften), BackButton, Bild je Modul
  aus public/modules/<slug>.png (optionalImage, Seite läuft auch ohne Bild).
- 27 Modulbilder zugeordnet (17 Basic nummeriert, 10 Officer).
- Homepage: Kurse als nummerierte <details>-Boxen, default eingeklappt;
  Kacheln verlinken auf Detailseiten. /schulung: Kurse nummeriert, Titel+Link
  je Modul. Middleware-Fix: /schulung(/**) öffentlich.
- Vorlesen (ReadAloud) auf Homepage, /schulung, Detailseiten (war: nur
  Lektionen); nie Autoplay. Promo-Box „Lieber hören statt lesen?".
- Kategorien-Fix: 15 fehlende Anzeigenamen in lib/i18n/de.ts → categories.
- Footer zeigt Inhaltsstand (footer.contentVersion ← config
  contentVersionLabel = V1.005; Seed legt ContentRevision V1.005 an).
- Plan-Features Nachprüfung klarer formuliert (Betrag aus config).
- Tests 81/81 · tsc 0 Fehler · next build grün (verifiziert am Git-Stand;
  letzte Runde einklappbare Kurse/Middleware nach Push erneut prüfen).

## Wichtige Architekturentscheidungen
Siehe ARCHITECTURE.md. Kurz: Next 15 App Router + Server Actions · Prisma 6
engineType "client" + libsql-Adapter · Translations in DB · Lazy-Prisma-Init
(Build DB-frei) · getDefaultCourse() = ältester publizierter Kurs.
Öffentliche Modul-Erkärtexte bewusst NICHT in der DB, sondern in
lib/module-details.de.ts (Marketing-Schaufenster, versioniert über Git).

## NICHT anfassen ohne Prüfung
prisma/schema.prisma (init.sql synchron!) · lib/auth.ts · middleware.ts ·
lib/tenancy.ts · lib/certificate/number.ts + issue.ts · lib/wording-guard.ts
+ Test · config/app.ts · lib/i18n/de.ts → certificate.disclaimer.

## Entwicklungsregeln
Keine Dummy-Buttons · keine hardcodierten Texte (t()/Translation-Tabellen) ·
assertCompanyScope · Admin-Mutationen ins AuditLog · Tonalität je Bereich
(TEXT_REWRITE_LOG.md) · Versionierung laut CLAUDE.md (Frage-Version++,
ContentRevision, config contentVersionLabel, Footer) · nach jedem Arbeitspaket
npm test + npm run build grün, Doku pflegen, Commit von Sascha pushen lassen.

## Bekannte Einschränkungen
- Lokale DB des Eigentümers braucht `npm run db:init && npm run db:seed`
  (sonst alte Fragenzahlen/Plan-Texte; ChatGPT-Review sah deshalb 124 statt 154).
- Nachprüfung €99/Jahresrabatt: nur Anzeige/Prozess, keine Online-Zahlung.
- Übungsmodus nur Basic-Kurs (Kursauswahl fehlt).
- SMTP nur Log, AGB-Platzhalter, Trainer-UI minimal.
- ExamAnswer speichert Frage-Version zum Antwortzeitpunkt NICHT (Kurs-Snapshot
  am Zertifikat reicht für Audits; optionaler Schema-Folgeauftrag).
- Foto Basic-Modul 1 (einfuehrung-ki.png) trägt fälschlich den Untertitel des
  Officer-Kurses „Rolle und Auftrag der KI-Verantwortlichen" — Bild bei
  Gelegenheit neu generieren.
- Profilfoto bewusst nicht gebaut (DATA_PROTECTION_TODO.md).

## NÄCHSTER AGENT-AUFTRAG: Superadmin-Verwaltung V2 + Tester-Freigabe
1. Firmen bearbeiten (Superadmin): Stammdaten-Formular, planKey-Wechsel
   (Basic/Business/Enterprise), Status ACTIVE/INACTIVE — alles per Server
   Action mit AuditLog-Eintrag.
2. Benutzer bearbeiten (Superadmin): Rolle ändern, Status, Name/E-Mail —
   auditiert; keine Mandanten-Verschiebung (bewusst).
3. Tester-Freigabe: Company.isTest Boolean + testExpiresAt (Schemaänderung —
   init.sql synchron halten!). Konsequenzen einbauen: (a) Zertifikate von
   Test-Firmen tragen sichtbar „TESTZUGANG — kein gültiger Nachweis" und
   Verify-Seite zeigt Status „Test", (b) Test-Firmen fliegen aus QM-Statistik,
   Bestehensquoten, Feedback-Auswertung, (c) Cron deaktiviert abgelaufene
   Testzugänge, (d) Banner „Testzugang bis {Datum}" im UI der Test-Firma.
4. i18n, Tests (inkl. Tester-Zertifikat-Kennzeichnung), Doku, Versionierung.

## PARALLEL-AUFTRAG: Kurs 3 „Richtig Prompten" — ERLEDIGT (V1.006, Teil 4)
Umgesetzt wie spezifiziert (10 Module / 32 Lektionen / 74 Fragen, pr-Präfix,
seedCourse, Zertifikatstitel, Modul-Detailtexte, Tests, Versionierung).
Offen daraus: Modulbilder pr-* (Sascha), en-Übersetzung wie bei allen Kursen.
Ursprüngliche Entscheidungen: SOFORT bauen · in der FLATRATE enthalten
(kein Add-on) · Führungskräfte-Kurs nur als Grobkonzept hinten anstellen.
Spezifikation: 10 Module / ~30–35 Lektionen im bewährten Muster
(SeedModule/SeedLesson aus prisma/seed/content-lessons.ts; Praxisstil laut
CLAUDE.md; Mini-Checks; ~70–80 Fragen mit hohem Praxisfall-Anteil, eigene
Prüfung 30 Fragen / 75 %):
1. Wie KI-Assistenten ticken — warum Prompts wirken (Kontext, Grenzen)
2. Die Prompt-Formel: Rolle, Ziel, Kontext, Format, Ton
3. Iterieren: in 2–3 Runden zum brauchbaren Ergebnis
4. Kontext füttern: Dokumente, Beispiele, Stilvorlagen
5. Textarbeit im Alltag: E-Mails, Angebote, Protokolle, Berichte
6. Analysieren & Zusammenfassen: lange Dokumente, Tabellen, Zahlen
7. Kreativ- und Marketing-Prompts inkl. Bild-Prompts (+ Kennzeichnungs-Recap)
8. Tool-Kunde: ChatGPT, Copilot, Claude, Gemini — Unterschiede & Prinzipien
9. Sicher prompten: Datenschutz-Recap, Prompt-Injection, Halluzinations-Kontrolle
10. Prompt-Bibliothek fürs Team + Abschlusstest
Wichtig: prinzipienbasiert schreiben (keine Screenshot-Klickanleitungen —
Inhalte altern sonst schnell); Slug-Präfix z. B. `pr-` gegen Kollisionen;
seedCourse()-Muster nutzen; Zertifikatstitel-Key ergänzen
(config courseCertificateTitleKeys); Modul-Detailtexte in
lib/module-details.de.ts ergänzen; Modulbilder liefert Sascha später
(Seiten laufen ohne Bild); Tests analog der bestehenden Kurspool-Suites;
ContentRevision + contentVersionLabel hochziehen.

## Danach (in dieser Reihenfolge)
0. ERLEDIGT (2026-07-08 Nacht, auf Owner-Anweisung vorgezogen): CONTENT-
   AUDIT-SYSTEM Phase 1 ist GEBAUT (Spez ROADMAP §4; Doku
   CONTENT_AUDIT_SYSTEM.md + CONTENT_REVIEW_WORKFLOW.md +
   LEGAL_WORDING_CHECK.md; Tests 106 grün, Build grün, Scan-Smoke 300+
   Blöcke). OFFEN: Phase 1b (TODO.md — PDF-Nachweis, JSX-Rechtsseiten/
   Mail-Templates in Registry, Prüfmodus-Overlay, Save-Hooks, Scan-Cron)
   und das ABARBEITEN der ersten Charge durch Sascha (Workflow-Doku).
   KEIN separates Open-Source-Repo vor 2–3 Wochen interner Nutzung.
1. PRAXISTEST beider Kurse (ChatGPT-Testplan, von Sascha freigegeben):
   kompletter Teilnehmer-Durchlauf Basic + Officer, 30 Zufallsfragen je Kurs
   auf Qualität prüfen, Admin-Flows, Mandantentrennung (Firma A/B),
   Rechtsbegriff-Scan; Ergebnisse in docs/TEST_REPORT_BASIC_COURSE.md,
   TEST_REPORT_RESPONSIBLE_COURSE.md, QUESTION_QUALITY_CHECK.md — vorhandene
   Doku (QUALITY_CHECK.md) erweitern statt duplizieren.
2. Fragen-Ergänzungspaket (Grok-Review, ~12–15 Fragen): Übergangsfristen/
   Anwendungsphasen AI Act, ungewollter Rollenwechsel/substantial modification
   (vertieft), Proxy-Diskriminierung (z. B. Postleitzahl), DSGVO/DSFA-
   Schnittstellen. Frage-Versionierung beachten.
3. Online-Zahlung Nachprüfung (Stripe) + automatische Freischaltung.
4. E2E-Tests (Playwright) für 3 Kernflows; Komplett-Export (ZIP) je Firma;
   DSGVO-Self-Service-Export; Trainer-V2/Enterprise-API.
