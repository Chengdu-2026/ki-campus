# Qualitätscheck — Stand 2026-07-07

Status: ✅ erledigt · 🟡 teilweise · 🔲 offen · ⚠️ Risiko

## Funktionsprüfung

| # | Prüfpunkt | Status | Anmerkung |
|---|---|---|---|
| 1 | Leere Seiten? | ✅ | Alle Routen haben Inhalt; leere Zustände mit EmptyState + Aktion |
| 2 | Dummy-Buttons? | ✅ | Jeder Button hat Funktion (Action/Link/Download) |
| 3 | Alle Rollen funktionieren | ✅ | Superadmin/Firmenadmin/Trainer(read-only)/Teilnehmer; Middleware + requireRole |
| 4 | Mandantentrennung sauber | ✅ | assertCompanyScope überall in Actions; Unit-Tests grün |
| 5 | Hell-/Dunkelmodus überall | ✅ | next-themes, alle Komponenten mit dark:-Varianten; PDF bleibt hell |
| 6 | Mobile Ansicht | ✅ | Hamburger-Nav, Touch-Buttons ≥44px, Teilnehmer ohne Tabellenzwang |
| 7 | Hints an kritischen Stellen | ✅ | Zertifikat, Test-Gate, Bestehensgrenze, Nachschulung, Export |
| 8 | Falsche Fragen → Nachschulung | ✅ | Kategorie→Lektion-Mapping, Ergebnisseite mit Lektions-Links |
| 9 | Wiederholungsmodus | ✅ | 4 Modi (falsche/schwache/alle/Simulation) |
| 10 | Admin-Lückenanalyse | ✅ | /company/progress: Ø-Ergebnis, Fehlerkategorien, Betroffene |
| 11 | Mindestens 120 Fragen | ✅ | 154 Fragen Basic + 84 Officer, je ≥10 Kategorien (Tests erzwingen ≥150/≥80) |
| 12 | ≥30 % Praxisfragen | ✅ | ~44 % practiceCase (Test erzwingt ≥30 %) |
| 13 | Zertifikat-PDF | ✅ | A4, deterministisch, SHA-256-Hash, Disclaimer, QR |
| 14 | QR-Verifikation | ✅ | /verify/[code] öffentlich, Status gültig/widerrufen/abgelaufen; Smoke-Test 200 |
| 15 | Keine irreführenden Rechtsbegriffe | ✅ | Wording-Guard-Test scannt gesamtes Repo (Build-Gate) |
| 16 | Build ohne TypeScript-Fehler | ✅ | next build grün (strict mode) |
| 17 | Grundtests grün | ✅ | 69/69 Vitest-Tests (davon 18 QM) |
| 18 | i18n vorbereitet, kein Hardcoding | ✅ | t()-Dictionary + DB-Translations; en-Skeleton mit de-Fallback |
| 19 | Dokumentation aktuell | ✅ | 24 Dateien in /docs (inkl. 6 QM-Dokumente) |

## QM-Modul (Auftrag §19) — Stand 2026-07-07

Alle §19-Kriterien sind erfüllt, mit den unten genannten Ausnahmen.

| Prüfpunkt | Status | Anmerkung |
|---|---|---|
| Feedback-Fragebogen (10 Fragen lt. Auftrag) | ✅ | 5×Rating, NPS, 2×Freitext, Technik Ja/Nein+Text, Nachschulung Ja/Nein |
| Feedback-Link nach bestandenem Test + Erinnerung | ✅ | Dashboard-Link; Cron erinnert nach 24 h, max. 2-mal (MailLog) |
| Automatische Bewertung mit Eskalationsstufen | ✅ | lib/qm/logic.ts, 3 Stufen, unit-getestet |
| Freitext-Scanner | ✅ | 12 Begriffe; Datenschutz/rechtlich falsch → CRITICAL |
| Durchfall-/Abbruchquoten-Überwachung | ✅ | qm-threshold-check, idempotent per dedupeKey |
| Qualitätsfälle ohne Dubletten | ✅ | QualityIssue.dedupeKey |
| CAPA-Statusmaschine + Abschluss-Sperre | ✅ | canCloseCorrectiveAction serverseitig, getestet |
| Wirksamkeitsprüfung bei HIGH/CRITICAL | ✅ | Pflicht vor CLOSED |
| Management-Review quartalsweise, Kennzahlen automatisch | ✅ | idempotent je Firma+Zeitraum, Freigabe auditiert |
| Ampel-Dashboard mit 12 Kennzahlen (§12) | ✅ | /company/qm, GRÜN/GELB/ROT, Trend 30/90 |
| CSV/PDF-Exporte auditiert | ✅ | /api/qm/export/*, QM_REPORT_EXPORTED |
| Mandantentrennung im QM | ✅ | assertCompanyScope in allen QM-Actions |
| Versionsregister ab V1.003 | ✅ | ContentRevision, /admin/versions |
| Einmaliger Unterlagen-Download mit Wasserzeichen | ✅ | MaterialDownload unique; Personalisierung statt technischem Kopierschutz |
| QM-Mail-Templates + i18n (qm.*) | ✅ | 5 Templates (Seed), Texte in lib/i18n/de.ts |
| Firmen-eigene Fragebögen | 🟡 | nur globaler Standard-Fragebogen |
| Trainer-Kommentarfunktion | 🔲 | nicht umgesetzt |
| Trenddiagramm | 🟡 | als Zahlen (30/90 Tage) statt Grafik |
| MULTIPLE_CHOICE-Fragetyp im Feedback | 🔲 | im Schema vorhanden, ungenutzt |
| node-cron | 🟡 | bewusst nicht eingebaut — externe Scheduler-Routen (CRON_JOBS.md) |

## Bekannte Einschränkungen

| Punkt | Status | Detail |
|---|---|---|
| SMTP-Versand | 🟡 | Mail-Layer vorhanden, dev=MailLog; produktiver SMTP-Client ist bewusst Erweiterungsstelle (DEPLOYMENT.md) |
| AGB / Datenschutz final | ⚠️ | Platzhalter/Vorlage — Anwalt erforderlich (LEGAL_POSITIONING.md), inkl. Drittlandthema China |
| E-Mail-Verifikation | 🟡 | Mail wird versendet, Login aber nicht darauf blockiert |
| Rate-Limiting /login,/verify | 🔲 | nur Audit-Protokollierung; Limiter für Produktion nachrüsten |
| Zeitlimit-Countdown im Test-UI | 🟡 | Serverfeld vorhanden, UI-Countdown fehlt |
| Trainer-Rolle | 🟡 | bewusst minimal (read-only Firmen-Fortschritt), V2 |
| Firmenlogo auf Zertifikat | 🔲 | Config-Flag + Feld vorhanden, Upload-UI fehlt (Business-Feature) |
| E2E-Browser-Tests | 🔲 | Unit-Tests vorhanden; Playwright empfohlen |
| Marketing-Bilder | 🟡 | Bild-Slots auf Startseite vorbereitet (public/images/), Dateien vom Nutzer abzulegen |

## Nächste sinnvolle Verbesserungen
Siehe TODO.md (priorisiert). Top 3: Rechtstexte finalisieren, SMTP produktiv,
Playwright-E2E für die drei Kernflows.
