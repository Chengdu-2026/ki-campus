# TODO

## Live-QA-Funde 2026-07-08 (KI-CAMPUS-LIVE-QA-AUDITOR) — behoben (V0.10.1)
- [x] P2: interner Betreiber-Hinweis von öffentlicher `/agb` entfernt.
- [x] P2: Audit-Log-UI zeigt jetzt `oldValue → newValue` bei Bearbeitungen.
- [x] P3: Nutzer-Edit leitet nach Speichern auf `/admin/users` (kein staler Status).
- [x] P3: „Re-Zertifizierung" → „erneute Nachweise" (Pricing + FAQ).
- [x] Eigentümer-Fund: Passwort-Auge + autoComplete „Manuell anlegen".
- [x] LIVE-NACHTEST der 5 Fixes: **bestanden** (08.07.2026, nach Dev-Server-Neustart)
      — AGB-Hinweis weg, „erneute Nachweise" (Pricing/FAQ), Audit-Log alt→neu,
      Nutzer-Edit-Redirect, Passwort-Auge.
- [x] P3 (behoben V0.10.1): „Aktivieren"/„Deaktivieren"-Toggle loggt jetzt
      richtungsabhängig (`USER_ACTIVATED` / `USER_DEACTIVATED`). tsc 0 · Tests 111/111.
      (Live-Klick-Bestätigung durch Browser-Tool-Flakiness auf Submit-Buttons verhindert;
      Fix ist code-/typgeprüft.)
- [ ] Klein/optional: `toggleUserStatus` revalidiert nur `/company/users` — auf der
      Superadmin-Firmenseite `/admin/companies/[id]` bleibt der Status bis zum Reload stehen.
- [ ] Live-Test offen: N4 Zertifikat-PDF-TESTZUGANG-Stempel, N6 Testzugang-Banner (als Anna).

## Erledigt am 2026-07-07 (Teil 6: Superadmin-Verwaltung V2 + Tester-Freigabe, V0.10.0)
- [x] KLARSTELLUNG: „Teil-3-Merge Superadmin-Paket" war gegenstandslos — Paket war
      nie gebaut (per Git verifiziert). Neu gebaut als V1.008.
- [x] Superadmin: Firmen bearbeiten (Stammdaten, Plan, Status) + Nutzer bearbeiten
      (Rolle, Status, Name/E-Mail), auditiert; neue Seite /admin/users/[id]
- [x] Tester-Freigabe (Company.isTest + testExpiresAt): Cert-Kennzeichnung
      „TESTZUGANG — kein gültiger Nachweis", Verify-Status, Statistik-Ausschluss
      (Dashboard + QM), Cron `deactivate-expired-tests`, UI-Banner
- [x] Schema + init.sql synchron (ALTER TABLE für bestehende DBs); Tests 111/111,
      tsc 0, Build EXIT=0

## Erledigt am 2026-07-07 (Teil 5: Semrush + Phase-2-SEO-Seiten, V0.9.0)
- [x] SEMrush-Keyword-Daten (6 Kern-Keywords, DB DE) über Browser-Session →
      Report Kap. 5a; Befund: MCP vom Semrush-Plan nicht abgedeckt,
      Bulk-Analyse Pro-only, Free-Tageslimit ~8–10 Abfragen
- [x] Phase-2-Seiten: /art-4-ai-act-erklaert, /ki-fuehrerschein-vergleich,
      /ki-kompetenz-nachweis, /chatgpt-schulung-mitarbeiter,
      /ki-schulung-mitarbeiter (JSON-LD, Quellen, Glossar, ReadAloud,
      Muster-CTA, Pflicht-Sektionen, dynamische Kursdaten aus DB)
- [x] Integration: Middleware, Sitemap, llms.txt, Footer, Startseiten-Link,
      Content-Audit-Registry (i18n:art4 … i18n:mitarbeiterLp),
      ContentRevision V1.007 + contentVersionLabel

## OFFEN — Teil 5 Folgearbeiten
- [ ] Semrush-Rest nachziehen (KI Zertifikat, Art 4 AI Act, AI Act Schulung,
      Copilot Schulung, KI Weiterbildung, KI Schulung Kosten/KMU) —
      Folgetag, Browser-Session, Report Kap. 5a ergänzen
- [ ] Content-Audit-Scan ausführen → neue Blöcke i18n:art4/fuehrerschein/
      nachweis/chatgptLp/mitarbeiterLp prüfen und per TOTP freigeben (Sascha)
- [ ] Interne Verlinkung Ausbaustufe: /schulung-Modulseiten → Geld-Seiten
      (Report Kap. 12.6), wenn erste Rankings sichtbar

## OFFEN — MAIL (wartet auf Sascha; Code ist fertig, Stand 2026-07-08)
- [ ] All-Inkl (KAS): Postfächer anlegen — noreply@ki-nachweis.at (Versand)
      und info@ki-nachweis.at (Empfang: Impressum, Anfragen, DSGVO-Widerrufe)
- [ ] DNS der Domain ki-nachweis.at abwarten/Registrierung anstoßen
      (KAS-Warnung „keine DNS-Informationen", bis 24 h) + SSL aktivieren
- [ ] .env befüllen: MAIL_PROVIDER=smtp, SMTP_HOST=w0175bce.kasserver.com,
      SMTP_PORT=587, SMTP_USER=<KAS-Postfach-Login m…>, SMTP_PASS=<Passwort>,
      MAIL_FROM="KI-Kompetenz Campus <noreply@ki-nachweis.at>",
      MAIL_REPLY_TO=info@ki-nachweis.at — Passwort nur lokal (.env ist gitignored)
- [ ] DKIM im KAS aktivieren (+ SPF prüfen), sonst Spam-Ordner
- [ ] Testlauf: Passwort-Reset an eigene Adresse → MailLog muss SENT zeigen
- [ ] HOSTING-ENTSCHEIDUNG vor Launch: All-Inkl-Webspace ist PHP-Hosting —
      die Next.js-Plattform braucht Node-Hosting (Vercel/VPS). All-Inkl bleibt
      Mail+DNS-Host (MX dort), Domain zeigt per DNS aufs App-Hosting.

## Erledigt am 2026-07-07 Nacht (Parallel-Session „KI Schulung Teil 4")
- [x] Kurs 3 „Richtig Prompten — KI-Assistenten wirksam nutzen": 10 Module,
      32 Lektionen (Slug-Präfix pr-), 74 Fragen (43 % Praxisfälle, 10 neue
      PR_-Kategorien), eigene Prüfung 30/75 %, in der Flatrate enthalten;
      Modul-Detailtexte, Zertifikatstitel, Plan-/Preistexte auf 3 Kurse,
      ContentRevision V1.006, neue Tests
- [x] Öffentliche Roadmap-Seite /ki-kompetenz-review für das GEPLANTE
      Review-/Auffrischungsmodul (Feature-Flag "planned", i18n feature.review.*,
      Footer-Link, keine Verfügbarkeits- oder ISO-Behauptungen)

## Erledigt am 2026-07-07 Nacht (Nachtrag: Audit + Leadmaschine)
- [x] Konsistenz-Audit nach Kurs 3: /features (V0.1-Stand!), /schulung,
      home.benefit2Text, courses.intro, /courses-Empfehlung+Icon Kurs 3,
      Sitemap (+/ki-kompetenz-review, +/themen), 3 Glossar-Einträge
- [x] KONSISTENZ-PFLICHT in CLAUDE.md verankert (Checkliste der Fundstellen)
- [x] Leadmaschine /themen (InterestLead-Modell, Honeypot, Consent,
      Datensparsamkeit) + /admin/leads mit Themen-Ranking
- [x] ROADMAP: Kurs-Pipeline (Kurs 4 KI-Agenten/Second Brain inkl.
      Anweisungsdateien-Modul; Kurs 5 Führungskräfte geparkt) + Video-Policy
- [x] scripts/dev-complete-lessons.mjs (Prüfungs-Gate lokal öffnen)

## Leadmaschine — Ausbau (Priorität mittel)
- [ ] CSV-Export der Leads; source-Parameter je Kampagne (?src=)
- [ ] Double-Opt-in-Mail sobald SMTP produktiv; Datenschutzerklärung um
      /themen-Verarbeitung ergänzen (Anwalt-Paket)
- [ ] „Weiterführende Links" je Modul (zentral gepflegt) für Video-Policy
      laut ROADMAP.md Abschnitt 3

## Content-Audit-System — Phase 1 UMGESETZT (2026-07-08 Nacht, auf Owner-Anweisung vorgezogen)
- [x] Datenmodell (5 Tabellen, init.sql synchron), Hash-Logik, Statusmaschine,
      canApprove-Gate, Risk-Word-Scanner, Quellen-Registry + Scan (300+ Blöcke),
      /admin/content-audit + Detailseite (Diff, Checkliste, Historie),
      TOTP-Owner-Freigabe, CSV-Export, 5 Seed-Templates, 13 Tests, 3 Doku-Dateien
- [x] init-db.mjs idempotent (duplicate-column-Fix)
- [x] /ki-transparenz-Aussage präzisiert

## Content-Audit Phase 1b (nächste Ausbaustufe)
- [ ] PDF-Einzelnachweis je AuditItem (pdf-lib-Muster aus Zertifikaten/QM)
- [ ] JSX-Rechtsseiten (/impressum, /datenschutz, /agb, /legal-disclaimer,
      /ki-transparenz) + E-Mail-Templates in die Quellen-Registry (Extraktor)
- [ ] Prüfmodus-Overlay auf öffentlichen Seiten (ROADMAP §4.6b Ebene 2)
- [ ] Save-Hooks in Admin-Actions (sofortige Erkennung statt Scan-Lauf)
- [ ] Scan als Cron-Route content-audit-scan (Muster CRON_JOBS.md)
- [ ] ERSTE CHARGE ABARBEITEN: Scan ausführen, dann HIGH/CRITICAL und
      Owner-Pflicht-Blöcke prüfen/freigeben (Workflow:
      docs/CONTENT_REVIEW_WORKFLOW.md) — mit dem Praxistest verbinden

## Geplant: Jährliches KI-Kompetenz-Review & Auffrischungssystem
- [ ] „Jährliches KI-Kompetenz-Review und Auffrischungssystem ergänzen. Das
      System soll falsch und langsam beantwortete Fragen auswerten, schwache
      Kategorien erkennen, gezielte Nachschulung empfehlen und jährliche
      Management-Review-Nachweise erzeugen. Ziel ist dokumentierte
      Wirksamkeitsprüfung und kontinuierliche Verbesserung im Sinne einer
      ISO-9001-orientierten QM-Logik."
      Vollständige Spezifikation (Empfehlungslogik, Antwortzeit-Grenzwerte,
      Kategorie-Scores, Wiederholungsmodus, Auffrischungstest 15–20 Fragen,
      Firmenadmin-Ampel, jährliches Management-Review, 4 neue Crons, Modelle
      QuestionPerformance / CompetenceRefreshRecommendation /
      AnnualCompetenceReview, UI-Texte, Akzeptanzkriterien): docs/ROADMAP.md.
      Wichtig: keine ISO-Zertifizierungs-Behauptungen; Nachweis heißt
      „Auffrischungsnachweis KI-Kompetenz".

## Erledigt am 2026-07-07 Abend (Auftrag „Modul-Detailseiten, Bilder, Vorlesen")
- [x] Modul-Detailseiten /schulung/[modulSlug] für alle 27 Module (Praxisstil,
      Beispiele, Glossar, Zurück-Button, Bild je Modul, Vorlesen, Teaser-CTA)
- [x] 27 Modulbilder → public/modules/<slug>.png (17 Basic + 10 Officer)
- [x] Homepage-Bugfix: Kurse getrennt, nummeriert, einklappbar (default zu)
- [x] Middleware-Bugfix: /schulung(/**) öffentlich
- [x] Kategorien-Anzeigenamen vervollständigt (15 Keys)
- [x] Vorlesen auf Homepage//schulung/Detailseiten + Promo; nie Autoplay
- [x] Inhaltsstand im Footer (V1.005); Versionsregeln + Schreibstil in CLAUDE.md
- [x] Git-Repo github.com/Chengdu-2026/ki-campus; Verifikation via Klon
      (Tests 81/81, tsc 0, Build grün)

## Oberste Priorität (nächster Agent-Auftrag)
- [ ] Superadmin-Verwaltung V2 + Tester-Freigabe (Spezifikation in
      docs/AGENT_HANDOVER.md): Firmen/Nutzer bearbeiten, Plan-/Status-Wechsel,
      Company.isTest + testExpiresAt, Tester-Zertifikate sichtbar als
      TESTZUGANG, Test-Firmen raus aus QM-Statistiken, Ablauf-Cron, AuditLog
- [ ] Danach: Praxistest beider Kurse (ChatGPT-Testplan; Reports in docs/)
- [ ] Danach: Fragen-Ergänzungspaket aus Grok-Review (~12–15 Fragen:
      Übergangsfristen, Rollenwechsel vertieft, Proxy-Bias, DSGVO/DSFA)

## Erledigt am 2026-07-07 (Auftrag „Lerninhalte erweitern und zweiten Kurs anlegen")
- [x] Basic-Kurs auf 17 Module / 41 Lektionen erweitert (neu: Informationssicherheit
      & KI-Risiken, Transparenz & Kennzeichnung mit verschobener Lektion
      transparenz-ki-inhalte, KI-Tools/Freigabe/Schatten-KI, KI-Vorfälle & Meldewege,
      Qualität/Feedback/Nachschulung); Fragenpool Basic 154
- [x] Zweiter Kurs ki-verantwortliche-beauftragte (10 Module, 37 Lektionen,
      84 Fragen, 48 % Praxisfälle)
- [x] Zertifikatstitel je Kurs, Disclaimer um „keine ISO-Zertifizierung" ergänzt
- [x] /courses echte Kursübersicht mit Empfehlungstext; /schulung zeigt beide Kurse
- [x] Nachprüfungs-Modell: 3 Versuche inkl., danach € 99 (config: examRetakeFeeEur);
      Jahresrabatt-Anzeige (Basic −10 %, Business −15 %); Seeds, i18n, Tests, Doku

## Priorität hoch (vor Produktivbetrieb)
- [ ] Nachprüfungsgebühr € 99 online abwickeln: Zahlungsanbindung (Stripe) +
      automatische Freischaltung weiterer Versuche nach Zahlung; bis dahin läuft die
      Freischaltung manuell über Versuchs-Reset (Firmen-Admin/Superadmin, auditiert)
      mit manueller Rechnung. Feature-Texte sind bereits konsistent.
- [ ] Jahreszahlung produktiv abbilden (Rechnungsstellung/Abrechnung; Anzeige
      existiert: config annualDiscountPercent Basic −10 %, Business −15 %)
- [ ] Komplett-Export der Nachweise vor Kündigung: ZIP aller Zertifikats-PDFs +
      CSV-Nachweisliste je Firma als Ein-Klick-Download (PDF/CSV einzeln existieren)
- [ ] AGB juristisch erstellen lassen (Platzhalter /agb) — Anwalt
- [ ] Datenschutzerklärung finalisieren: Hosting-Standort, AVV-Muster,
      Drittlandtransfer (Betreiber-Sitz VR China) — Anwalt
- [x] SMTP-Versand implementiert (lib/mail.ts, nodemailer, MAIL_PROVIDER=smtp,
      MailLog SENT/FAILED; 2026-07-08). NOCH OFFEN als Betriebsschritt:
      echte SMTP-Zugangsdaten des ki-nachweis.at-Hosters in .env eintragen
      (SMTP_HOST/PORT/USER/PASS, MAIL_FROM) + SPF/DKIM-DNS-Einträge setzen,
      dann MAIL_PROVIDER=smtp aktivieren und Testmail prüfen
- [ ] Demo-Logins/Seed-Passwörter entfernen bzw. rotieren
- [ ] Rate-Limiting auf /login und /verify (aktuell nur Audit-Protokollierung)
- [ ] 2FA-Backup-Codes (Wiederherstellung bei Handyverlust — aktuell nur via DB-Reset durch Superadmin)
- [ ] E-Mail-Verifikation bei Self-Service-Registrierung erzwingen (Mail wird gesendet,
      Login ist aber nicht blockiert)

## Priorität mittel
- [ ] Profilfoto-Funktion später prüfen und implementieren. Foto im Account möglich,
      Foto auf Zertifikat nur optional per Firmen-Einstellung und mit ausdrücklicher
      Einwilligung. Datenschutz, Löschkonzept und Zertifikatstemplate vorher prüfen.
      Details: docs/DATA_PROTECTION_TODO.md
- [x] Lektionen anhören (Vorlesefunktion): umgesetzt inkl. Homepage//schulung/
      Detailseiten + Bewerbung (2026-07-07)
- [ ] Übungsmodus kursübergreifend: aktuell arbeitet /practice auf dem Basic-Kurs
      (ältester Kurs); Kursauswahl ergänzen
- [ ] E2E-Tests (Playwright): Einladung→Kurs→Test→Zertifikat, Mandantentrennung, Verify
- [ ] DSGVO-Selbstauskunft: JSON-Export je Nutzer als Button
- [ ] Zeitlimit-UI (Countdown) im ExamRunner (serverseitiges Feld existiert)
- [ ] Firmenlogo-Upload + Logo auf Zertifikat (Plan-Feature Business; Flag existiert)
- [ ] Nachschulung explizit „zuweisen" (aktuell: Empfehlung + Erinnerungs-Mail)
- [ ] Superadmin: Firmen anlegen/deaktivieren per UI (aktuell Self-Service + Seed)

## Priorität niedrig / V2
- [ ] Trainer-Rolle: eigene Ansichten und Prüf-Workflows
- [ ] Enterprise-API (API-Keys, Provisioning, Zertifikatsabfrage)
- [ ] Vollständige en-Übersetzung + Sprachumschalter im Profil
- [ ] Re-Zertifizierungs-Erinnerungen bei validUntil (Cronjob)
- [ ] CertificateTemplate je Firma (Enterprise, Model optional ergänzen)
