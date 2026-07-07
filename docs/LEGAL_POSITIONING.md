# Rechtliche Positionierung

## Was die Plattform ist
Private B2B-Schulungsplattform für KI-Kompetenz mit dokumentiertem Abschlusstest
und privatem Schulungs- und Kompetenznachweis zur Unterstützung der
KI-Kompetenzpflicht nach Art. 4 der Verordnung (EU) 2024/1689.

## Was die Plattform NICHT ist
- keine staatliche Zertifizierungsstelle
- keine behördliche Zulassung
- keine EU-Akkreditierung
- keine Rechtsberatung
- keine Garantie vollständiger Compliance

## Zulässige Begriffe
privater Schulungsnachweis · KI-Kompetenznachweis · Zertifikat nach bestandener
Schulung · unterstützt die Dokumentation der KI-Kompetenzpflicht nach Art. 4 EU
AI Act · nicht behördlich zertifiziert · Schulung mit Abschlusstest und Zertifikat

## Verbotene Begriffe (technisch erzwungen)
Die Verbotsliste steht in `lib/wording-guard.ts` und wird von
`tests/wording-guard.test.ts` gegen den GESAMTEN Quellcode, alle Seed-Inhalte,
Sprachdateien und diese Doku geprüft (Build-Gate). Verneinende Formulierungen
(„keine behördliche Zertifizierung") sind erlaubt. Admin-Änderungen an Fragen und
Lektionen laufen zusätzlich zur Speicherzeit durch den Guard.

## Zertifikatstext (final, fixiert in lib/i18n/de.ts → certificate.disclaimer)
„Dieses Zertifikat bestätigt die erfolgreiche Teilnahme und den bestandenen
Abschlusstest der Schulung. Es dient als privater Schulungs- und Kompetenznachweis
zur Unterstützung der KI-Kompetenzpflicht nach Art. 4 der Verordnung (EU) 2024/1689.
Es handelt sich nicht um eine staatliche Zulassung, behördliche Zertifizierung oder
EU-Akkreditierung."

## KI-Transparenz
Lerninhalte, Fragen und Hilfetexte wurden mit KI-Unterstützung erstellt und von
Sascha Morocutti (Hainan Salzburg Consulting Co., Ltd.) fachlich geprüft und
verantwortet. Öffentliche Transparenzseite: `/ki-transparenz`; Hinweis zusätzlich
auf jedem Zertifikat. Meldeweg für Inhaltsfehler: office@hainan.at.

## Hainan-Datenquelle
Firmendaten übernommen aus dem öffentlichen Impressum
https://www.hainan.at/kontakt.html#impressum, geprüft am **2026-07-06**:
Hainan Salzburg Consulting Co., Ltd. (海南萨尔茨堡咨询有限公司), GmbH
(Auslandsinvestition), Legal Representative Sascha Morocutti, Einheitlicher
Kreditcode 91460000MAK7X7K491, Organisationscode MAK7X7K4-9, registriertes Kapital
1.000.000 RMB, gegründet 10. März 2026, Registrierungsbehörde Marktaufsichtsbehörde
Hainan, Sitz: Raum D03, 1403, 14. Stock, Yaxi Business Building, Nr. 16 Haifu Road,
Meilan District, Haikou, Hainan 570000, VR China. Kontakt office@hainan.at.
Gepflegt in DB-Model `CompanyLegalProfile` (Seed aus `config/app.ts`), NICHT hardcoded
in Komponenten. **Hinweis:** Ursprünglich genannter Name „…GmbH" wäre falsch gewesen —
die korrekte Rechtsform ist Co., Ltd. (chinesische Gesellschaft).

## Offene Rechtsthemen (vor Vertrieb klären — Anwalt!)
1. **AGB** fehlen inhaltlich (Platzhalterseite /agb).
2. **Datenschutzerklärung** ist Struktur-Vorlage; Hosting-Standort, AVV-Muster und
   Drittlandtransfer (Betreiber-Sitz VR China! Art. 44 ff. DSGVO) sind zu klären —
   das ist der größte offene Rechtsblock dieses Produkts für EU-Kunden.
3. Impressumspflichten des tatsächlichen Diensteanbieters je Zielmarkt (AT/DE) prüfen;
   ggf. EU-Vertreter nach Art. 27 DSGVO benennen.
4. Verbraucherrecht irrelevant (B2B), aber Fernabsatz-/E-Commerce-Pflichten prüfen.
