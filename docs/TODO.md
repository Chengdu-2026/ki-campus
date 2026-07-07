# TODO

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

## Geplant: Internes Content-Audit-System (Phase 1 — nach Superadmin + Praxistest)
- [ ] Content-Audit-Modul im Campus: ContentAuditItem an ContentRevision
      angedockt, hash-gebundene Freigaben (Änderung invalidiert Freigabe),
      konfigurierbare Checklisten (5 Seed-Templates), eigener Risk-Word-
      Scanner (NICHT wording-guard erweitern — Begründung in ROADMAP §4.4),
      /admin/content-audit + Detailseite mit Diff, Owner-Freigabe über
      Felder (keine neuen Rollen), Übersetzungs-Pflichtprüfung, CSV/PDF-
      Export, 10+ Tests, erste Charge = alle Bestandsinhalte (mit Praxistest
      verbinden). Vollspezifikation: docs/ROADMAP.md Abschnitt 4.
- [x] Vorgezogen (2026-07-07): /ki-transparenz-Aussage präzisiert (keine
      pauschale „sämtliche Inhalte geprüft"-Behauptung mehr)

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
- [ ] SMTP-Versand produktiv anbinden (lib/mail.ts, nodemailer) + Absender-Domain (SPF/DKIM)
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
