# TODO

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

## Oberste Priorität (nächster Agent-Auftrag)
- [ ] Öffentliche Modul-Detailseiten /schulung/[modulSlug]: Klick auf Modul-Box öffnet
      Erklärseite im Praxisstil (Sascha-Stil) mit Abkürzungs-Glossar (KI, LLM, Bias,
      GPAI, DSGVO, AI Act …), Zurück-Button zur Ausgangsseite und Bild je Modul
      (Fotos liegen bereits in public/images/ — 7 neue Themenbilder vom
      2026-07-07 03:10 Uhr, „ChatGPT Image 7. Juli 2026, 03_10_2x (1–7).png";
      beim Umsetzen thematisch zuordnen und nach public/modules/<slug>.png
      umbenennen, Anzeige nur wenn Datei existiert). Homepage-Boxen verlinken.

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
- [ ] Lektionen anhören (Vorlesefunktion): Web Speech API je Lektion (kostenlos,
      clientseitig, kein Anbieter nötig); auf /schulung und Homepage bewerben,
      sobald umgesetzt
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
