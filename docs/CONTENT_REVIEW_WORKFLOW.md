# Content-Review-Workflow (für den Prüfer)

Stand 2026-07-07. Der praktische Ablauf; Systemdetails: CONTENT_AUDIT_SYSTEM.md.

## Der Weg eines Inhaltsblocks

```
Scan → NEEDS_REVIEW → [Prüfung starten] → IN_REVIEW
  → Checkliste abhaken (alle Pflicht-Items + Publikationshaken)
  → [Freigeben]                → APPROVED (Hash eingefroren)
  → [Persönlich freigeben]     → APPROVED + Owner-Nachweis (TOTP-Code nötig)
  → [Als veröffentlicht markieren] → PUBLISHED
Inhalt ändert sich (Scan erkennt Hash-Abweichung)
  → automatisch zurück auf NEEDS_REVIEW, version++, Freigabe verfällt sichtbar
Alternativ aus IN_REVIEW: [Änderungen anfordern] / [Ablehnen]
```

## Tagesroutine (Superadmin)

1. /admin/content-audit öffnen. Wenn die rote Karte „Live ohne aktuelle
   Freigabe" > 0 zeigt: zuerst dort hinein (Filter „Nur live ohne Freigabe").
2. Nach Inhaltsänderungen oder neuen Seeds: **Scan ausführen**.
3. Reihenfolge der Abarbeitung: CRITICAL/HIGH-Risiko → Owner-Pflicht →
   Rest nach Alter.
4. Je Block: Inhalt lesen (bei Änderungen den Diff), Scanner-Treffer prüfen,
   Checkliste abhaken, freigeben. Kritische Inhalte: „Persönlich freigeben"
   mit TOTP-Code aus der Authenticator-App.
5. Fürs QM: CSV-Export (Button oben rechts) ablegen.

## Regeln

- Der Freigabe-Button bleibt gesperrt, bis alle Pflicht-Punkte grün sind —
  das ist serverseitig erzwungen, kein UI-Kosmetik-Gate.
- Grün heißt: freigegebener Hash == aktueller Hash. Ein grüner Eintrag kann
  durch eine Inhaltsänderung jederzeit kippen — das ist gewollt.
- „Aber die Checkliste war doch mal grün" zählt nicht: Die Freigabe gehört
  zur Version, nicht zur Person oder zum Datum allein.
- Checklisten-Templates verwaltet der Seed (Phase 1); Anpassungen über
  DB/Seed, nicht hart im Code.
