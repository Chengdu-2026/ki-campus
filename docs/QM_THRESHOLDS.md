# QM-Schwellenwerte

Alle Schwellen sind global unter `/admin/qm/thresholds` (QMThreshold)
konfigurierbar. Die Defaults der Auslöselogik sind in `lib/qm/logic.ts`
kodiert und unit-getestet.

## Feedback-Ratings (Ø über die 5 Rating-Fragen, Skala 1–5)

| Schwelle | Bedeutung | Automatische Aktion |
|---|---|---|
| Ø ≥ 4,2 | gut | keine |
| Ø 3,5–4,19 | beobachten | Kennzeichnung, keine Fallanlage |
| Ø < 3,5 | REVIEW_REQUIRED | Qualitätsfall MEDIUM |
| Ø < 3,0 | ACTION_REQUIRED | Fall HIGH + automatischer CAPA-Vorschlag + Frist 14 Tage |
| Ø < 2,0 | CRITICAL | Fall CRITICAL + Frist 7 Tage + Superadmin-Mail |

## Einzelkriterien

| Kriterium | Schwelle | Aktion |
|---|---|---|
| NPS (0–10) | ≤ 6 (Detraktor) | Review + Qualitätsfall |
| Technik-Rating | < 3 | Fall HIGH |
| Testfairness-Rating | < 3 | Fall HIGH |

## Freitext-Scanner

Geprüfte Begriffe: unverständlich, Fehler, funktioniert nicht, unfair,
zu schwer, falsch, Datenschutz, rechtlich falsch, verwirrend,
nicht brauchbar, Beschwerde, Reklamation.

| Fund | Aktion |
|---|---|
| Beliebiger Begriff der Liste | Einstufung mindestens NEGATIVE |
| „Datenschutz" oder „rechtlich falsch" | Einstufung CRITICAL |

## Quoten (je Firma+Kurs, geprüft durch qm-threshold-check)

| Kennzahl | Schwelle 1 | Aktion | Schwelle 2 | Aktion |
|---|---|---|---|---|
| Durchfallquote | > 25 % | Warnung | > 40 % | Fall HIGH |
| Abbruchquote | > 20 % | Warnung | > 35 % | Fall HIGH |

Abbruch = Kurs begonnen, aber nach 30 Tagen kein abgegebener Test.

Der tägliche Cron `qm-threshold-check` (02:00) ist idempotent: der
dedupeKey `metric:companyId:courseId:datum` verhindert doppelte Fälle
bei Wiederholungsläufen.

## Ampellogik (Dashboard /company/qm, lt. Auftrag §12)

| Ampel | Bedingung |
|---|---|
| GRÜN | Alle Kennzahlen im guten Bereich, keine offenen HIGH/CRITICAL-Fälle |
| GELB | Mindestens eine Kennzahl im Beobachtungsbereich oder offene MEDIUM-Fälle |
| ROT | Kennzahl unter Aktions-/Kritisch-Schwelle oder offene HIGH/CRITICAL-Fälle |

Das Dashboard zeigt 12 Kennzahlen inklusive Trend (30/90 Tage).

## Hinweise

- Änderungen an Schwellenwerten wirken global (alle Firmen) und werden
  im AuditLog mit oldValue/newValue protokolliert.
- Die Schwellenlogik erzeugt Nachweise für Qualitätsprozesse nach
  ISO-9001-Logik; sie stellt keine ISO-Zertifizierung dar.
