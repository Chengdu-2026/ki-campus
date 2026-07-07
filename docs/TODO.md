# TODO

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
