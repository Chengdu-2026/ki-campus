# Live-Test-Bericht: N4 — Zertifikat-PDF trägt „TESTZUGANG"

## 1. Stammdaten
- Feature: N4 — Testzugang-Kennzeichnung auf dem Zertifikat-PDF
- Revisionsnummer: tester-freigabe V1.001 (V0.10.0), geprüft in V0.10.2
- Testdatum: 2026-07-08
- Tester / Agent: KI-CAMPUS-LIVE-QA-AUDITOR
- Umgebung: Code-Audit + deterministische PDF-Generierung (pdf-lib) außerhalb der App
- Rollen: n/a (Renderer-Ebene)
- Testdaten: synthetischer Teilnehmer „Anna Beispiel", Kurs „ki-kompetenz-basic", isTest=false vs. true

## 2. Ziel des Tests
Nachweisen, dass ein Zertifikat einer Testzugang-Firma sichtbar als „TESTZUGANG — kein
gültiger Nachweis" gekennzeichnet wird und ein Normal-Zertifikat NICHT.

## 3. User Journey / Prüfweg
1. Code-Verdrahtung geprüft: `app/api/certificates/[id]/pdf/route.ts` Z.51 übergibt
   `isTest: certificate.company.isTest` an `generateCertificatePdf`.
2. Renderer geprüft: `lib/certificate/pdf.ts` Z.164–175 zeichnet bei `data.isTest`
   (a) diagonales Wasserzeichen `certificate.testWatermark` und (b) ein rotes Banner
   `certificate.testBanner` unter dem Kopf; beide durch `assertCleanWording` abgesichert.
3. i18n geprüft: `lib/i18n/de.ts` Z.310/311 → `testWatermark:"TESTZUGANG"`,
   `testBanner:"TESTZUGANG — kein gültiger Nachweis"`.
4. Beweis erzeugt: Zeichenlogik aus `pdf.ts` (verbatim, echte Strings) für isTest=false
   und isTest=true ausgeführt → 2 PDFs → als PNG gerendert und visuell verglichen.

## 4. Erwartetes Ergebnis
- isTest=true: sichtbares diagonales „TESTZUGANG"-Wasserzeichen + rotes Klartext-Banner.
- isTest=false: keinerlei Testkennzeichnung, sonst identisches Layout.

## 5. Tatsächliches Ergebnis
- isTest=true (`zertifikat-testzugang.pdf/.png`): großes rotes, diagonal (35°) laufendes
  „TESTZUGANG"-Wasserzeichen über die ganze Seite UND rotes Banner
  „TESTZUGANG — kein gültiger Nachweis" direkt unter dem dunklen Kopf. ✔
- isTest=false (`zertifikat-normal.pdf/.png`): sauber, keine Kennzeichnung, Layout identisch. ✔
- Beide QR-Codes (Datencheck oben rechts, Verify-QR unten rechts), Disclaimer,
  Aussteller, Signaturfeld korrekt gerendert.

## 6. Screenshot-Beweise
| Schritt | Screenshot | Beschreibung |
|---|---|---|
| 001 | ./zertifikat-testzugang.png | Testzugang-Zertifikat: Wasserzeichen + rotes Banner sichtbar |
| 002 | ./zertifikat-normal.png | Normal-Zertifikat: keine Testkennzeichnung |

Zusätzlich als PDF beigelegt (`zertifikat-testzugang.pdf`, `zertifikat-normal.pdf`)
und reproduzierbar über `cert-proof.mjs`.

## 7. Gefundene Fehler
| Priorität | Bereich | Beschreibung | Screenshot | Empfehlung |
|---|---|---|---|---|
| — | — | keine | — | — |

## 8. Fehlende Verdrahtungen
- Keine. Route → Renderer → i18n vollständig verdrahtet.

## 9. Rechtliche / AI-Act-Wording-Prüfung
Bannertext „TESTZUGANG — kein gültiger Nachweis" ist eine Abwertung (kein
Behörden-/Zertifizierungsanspruch). `assertCleanWording` läuft im Renderer über den
Bannertext. Bewertung: unkritisch.

## 10. Ergebnis
**BESTANDEN** (Renderer-Ausgabe visuell bewiesen + Datenpfad-Verdrahtung im Code bestätigt).

Resthinweis (kein Fehler): Auf einem *real ausgestellten* Zertifikat erscheint der Stempel
nur, wenn die Firma `isTest=true` ist. Die Seed-Firma `demo-company` ist aktuell
`isTest=false` → ein heute heruntergeladenes Live-Zertifikat trägt korrekterweise KEINEN
Stempel. Für den Live-Klick-Nachweis zuerst über Superadmin „Testzugang aktivieren".

## 11. Offene Punkte
- [ ] Optionaler Live-Klick-Nachweis: demo-company auf isTest=true, Zertifikat neu
      herunterladen, Stempel im echten Download-PDF bestätigen (Windows-Dev-Server).

## 12. Nächste empfohlene Schritte
- Im Zuge des Live-Durchlaufs (Task-4-Restpunkte) gleich mit erledigen.
