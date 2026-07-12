# Masterplan Produktlinien — Eine Plattform, mehrere Kursfamilien

Stand: 2026-07-11 · Status: **ENTSCHIEDEN (Eigentümer, 4 Weichen)** · Ergänzt
`docs/KURSPLAN_SICHERHEIT.md` (Produktkonzept Sicherheit) und `docs/KURSPLAN_UND_B2C.md`
(KI-Kurskatalog + B2C). Technische API-Details: `docs/ENTERPRISE_API_SPEC.md`.

> Auslöser: Berater-Feedback zur Sicherheits-Produktlinie („größer denken": Dachmarke,
> EHS-SaaS, Reviewer je Familie, Add-on-Preise, StaffFlow-Anbindung). Dieser Plan hält
> fest, was davon übernommen wird, was nicht, und in welcher Reihenfolge. Nichts hieraus
> ist gebaut — reine Planung; Bau-Reihenfolge in §9.

## 1. Die vier Entscheidungen (2026-07-11)

| # | Frage | Entscheidung |
|---|-------|--------------|
| 1 | V1-Scope Sicherheit | **Unterweisungs-Compliance**: Kurse + Test + Zertifikat + jährliche Recert-Erinnerung + CSV-Nachweisliste + Arbeitgeber-Ergänzungs-Checkliste. KEIN EHS-SaaS-Ausbau (keine Gefährdungsbeurteilungen, Betriebsanweisungs-Verwaltung, Unfall-Module). |
| 2 | Dachmarke | **Schwellen-Entscheid**: jetzt Variante (c) — Kursfamilie im bestehenden Branding. Rebranding-Prüfung („Kompetenz Campus" o. ä.) erst bei Trigger (§6). Bis dahin null Rebranding-Arbeit. |
| 3 | StaffFlow-Anbindung | **Enterprise-API zuerst spezifizieren** (liegt vor: `ENTERPRISE_API_SPEC.md`), **Bau erst nach S1-Pilotkunde**. StaffFlow wird erster API-Konsument — nie Direktzugriff auf die DB, kein Schreiben im StaffFlow-Repo. |
| 4 | Preise | **Add-on-Modell mit konkreten Zahlen** (§5) — delegiert erarbeitet, Freigabe durch Eigentümer steht aus. |

## 2. Zielbild

Eine technische Plattform, mehrere **Kursfamilien**:

- **KI** (K1–K10, 3 live) — Anker, Art.-4-Pflicht.
- **Sicherheit** (S1–S5) — §§ 12/14 ASchG, jährlich wiederkehrend. Konzept liegt vor.
- **Später (nur bei Nachfrage/Leadmaschine):** Datenschutz, Compliance, weitere.

Marken bleiben wie in CLAUDE.md verankert: Produkt = „KI-Kompetenz Campus",
Betrieb = Hainan Salzburg Consulting Co., Ltd., Personenmarke = MOSA. Der Kunde kauft
zuerst Inhalt, nicht Dachmarke — Rebranding ist ein Meilenstein (§6), kein Projekt.

**Warum das trägt:** Mehrkurssystem, Prüfungen, QR-Zertifikate, Recert-Erinnerungen,
CSV-Nachweis, Handbuch-Druckansicht und Content-Audit existieren. Der einzige echte
Aufwand je neuer Familie ist Content + fachlicher Review. Genau deshalb: kein zweites
Softwareprodukt bauen, solange Content der Engpass ist.

## 3. Kursfamilien-Architektur (Spezifikation — noch nicht bauen)

ERST PRÜFEN, DANN BAUEN: alles Erweiterungen bestehender Muster, kein Neubau.

- **`Course.familyKey`** (String: `KI` | `SAFETY`, weitere später) + Familien-Registry in
  `config/app.ts` (Muster `courseCertificateTitleKeys` erweitern: Name, Kurzbeschreibung,
  Sortierung je Familie). Bestehende 3 Kurse erhalten `familyKey: "KI"` per Seed-Update
  (eine Zeile je Kurs, ContentRevision-Eintrag).
- **Entitlement je Familie:** neues Model **`CompanyFamilyAddon`**
  (`companyId`, `familyKey`, `status ACTIVE|CANCELLED`, `activatedAt`, `cancelledAt?`,
  auditiert) statt Plan-Matrix-Explosion. Regel: Familie `KI` ist im Plan enthalten
  (Bestandsschutz), jede weitere Familie braucht ein aktives Add-on.
  Zugriffsprüfung im bestehenden Muster (`assertCompanyScope` / Kurs-Gate im
  Schulungsbereich); `init.sql` synchron halten.
- **Recert/Nachunterweisung:** vorhandenes `certificateValidityMonths` (Sicherheit: 12)
  + bestehende Erinnerungs-Crons. Kein Neubau.
- **Zertifikate:** `courseCertificateTitleKeys` je Slug erweitern („Unterweisungsnachweis …");
  Disclaimer-Variante für Unterweisung (juristisch formulieren, Kap. 2 KURSPLAN_SICHERHEIT).
- **B2C-Abgrenzung:** Sicherheits-Familie geht NICHT ins Privat-Abo — Unterweisung ist
  Arbeitgeberpflicht (B2B). Privat-/Solo-Abo bleibt KI-Katalog (KURSPLAN_UND_B2C §3).

## 4. Reviewer-System je Kursfamilie (Wiederverwendung + kleine Ergänzung)

Vorhanden und wiederzuverwenden: `ContentAuditItem` (hash-gebundene Freigabe),
`ReviewChecklistTemplate` (Template je EntityType), Owner-Freigabe mit TOTP,
AuditLog. Externe Reviewer bekommen **keine Accounts/Rollen** (Korrektur aus ROADMAP
§4.5 gilt weiter) — Erfassung durch Superadmin.

Ergänzend spezifiziert (Bau zusammen mit S1-Go-Live): Model **`ExternalReviewApproval`**
— `familyKey`, `courseId?`, `reviewerName`, `reviewerQualification`
(z. B. „Sicherheitsfachkraft"), `reviewerContact?`, `scope` (geprüfte Kurse/Module),
`reviewedVersionLabel` + `contentHash` (Freigabeanker — Änderung invalidiert sichtbar,
gleiches Prinzip wie Content-Audit), `resultStatus FREIGEGEBEN|MIT_AUFLAGEN|ABGELEHNT`,
`conditions?`, `evidenceFile` (unterschriebenes Prüfprotokoll-PDF + Hash), `reviewedAt`,
`recordedById`. AuditLog-Action `EXTERNAL_REVIEW_RECORDED`. `init.sql` synchron.

**Reviewer-Matrix (Go-Live-Gate je Familie):**

| Familie | Reviewer | Status |
|---------|----------|--------|
| KI | Jurist / AI-Act-Fachperson | bestehende interne Prüfung; externe Prüfung bei Rechtsthemen empfohlen |
| Sicherheit | Sicherheitsfachkraft (SFK) | **PFLICHT vor Go-Live S1** — ohne SFK-Freigabe kein Verkauf |
| Datenschutz (später) | Datenschutz-Fachperson | bei Familienstart |

Nächster Schritt (Eigentümer): SFK anfragen, Kostenrahmen einholen (einmalig je Kurs,
Budget-Freigabe offen — Entscheidung 2 aus KURSPLAN_SICHERHEIT Kap. 5).

## 5. Preismodell: Add-on je Kursfamilie (ENTSCHEIDUNGSREIF — Freigabe ausstehend)

**Struktur (entschieden):** Basispaket = bestehende Pläne mit KI-Familie. Jede weitere
Kursfamilie = Aufpreis-Add-on je Plan. Einstiegspreis bleibt stabil, jedes Add-on hebt
den Umsatz je Kunde. Preise bleiben in DB/Seed (`Plan.features`) + Preisseite — nichts
hardcoden.

**Marktanker (recherchiert 2026-07-11):** Mibeo ab 6,33 €/Nutzer/Monat ·
reteach ab 150 €/Monat (bis 200 TN) · ehs-Software ab 2.304 €/Jahr (bis 350 MA ≈
0,55 €/MA/Monat) · LENA (AT): je Zertifikat bzw. je Nutzer gestaffelt, Preis auf
Anfrage · Quentic/lawpilots/erwingo: auf Anfrage. Spanne also breit; Positionierung
wie beim B2C-Abo: mittleres Segment, Premium-Wirkung über Qualität.

**Vorschlag Sicherheits-Add-on (Flatrate, konsistent zum Planmodell):**

| Plan | Basis (heute) | Add-on Sicherheit | Gesamt | Kontrolle €/TN/Monat (voll belegt) |
|------|---------------|-------------------|--------|-------------------------------------|
| BASIC (bis 10 TN) | 129 €/Monat | **+49 €/Monat** | 178 € | 17,80 gesamt · 4,90 Add-on |
| BUSINESS (bis 50 TN) | 299 €/Monat | **+99 €/Monat** | 398 € | 7,96 gesamt · 1,98 Add-on |
| ENTERPRISE | auf Anfrage | auf Anfrage | — | — |

- Jahresrabatt identisch zum Plan (−10 % BASIC / −15 % BUSINESS, `annualDiscountPercent`).
- Begründung: Add-on allein liegt bei 2–5 €/TN/Monat — unter Einzelanbietern (Mibeo 6,33),
  über Massen-EHS (0,55), passend zur Qualitäts-Positionierung; +38 %/+33 % Aufpreis
  ist als „zweite Pflicht erledigt" leicht argumentierbar (ein Admin, ein System).
- Verkaufsargument in Plan-Features: „Zwei gesetzliche Pflichten, eine Plattform:
  Art. 4 EU AI Act + Unterweisung §§ 12/14 ASchG."
- **Muster für spätere Familien:** gleiche Add-on-Logik; ab 3 aktiven Familien
  Bundle-Preis („Compliance-Paket", ca. −20 % auf Add-on-Summe) — erst dann ausarbeiten.

## 6. Dachmarken-Meilenstein (kein Projekt vor Umsatz)

**Trigger für die Rebranding-PRÜFUNG (nicht Umsetzung):** ≥ 10 zahlende Firmenkunden
mit Sicherheits-Add-on ODER Add-on-MRR ≥ 1.000 € in 3 aufeinanderfolgenden Monaten.

**Vorab-Checkliste (erst am Trigger abarbeiten):**
1. Markenrecherche „Kompetenz Campus": Verwechslungsgefahr + Schutzfähigkeit prüfen —
   der Begriff ist beschreibend/generisch und markenrechtlich voraussichtlich schwach;
   Alternativen mitprüfen (z. B. eigenständiges Kunstwort, „MOSA Campus").
2. Domain-Verfügbarkeit + SEO-Migrationskosten (ki-nachweis.at hat dann Bestand/Ranking).
3. Migrationsaufwand beziffern: Logo, Zertifikatsvorlagen, AVV/Rechtstexte, Seiten, Mails.
4. Dann Entscheidung: Dachmarke (a) vs. Produktmarke je Familie (b) vs. Status quo.

## 7. Rechts-Gates vor dem ersten Sicherheits-Verkauf (Blocker, keine Features)

Bereits dokumentiert in `docs/LEGAL_POSITIONING.md` (§ Offene Rechtsthemen) und
AGENT_HANDOVER — hier nur gebündelt als Verkaufs-Blocker der Sicherheits-Familie:

1. **AGB** inhaltlich erstellen (Anwalt) — Platzhalterseite reicht nicht für ein
   Haftungsthema wie Unterweisung.
2. **Datenschutz/Drittland:** Betreiber-Sitz VR China → Art. 44 ff. DSGVO, SCC oder
   EU-Entity (AVV-China-Struktur, läuft bereits mit Anwalt).
3. **SFK-Review S1** (§4) — fachliches Go-Live-Gate.
4. **Wording:** Unterweisungs-Disclaimer je Kurs (KURSPLAN_SICHERHEIT Kap. 2) +
   Erweiterung Wording-Guard um Unterweisungs-Formulierungen; Abgrenzungen §8 einhalten.
5. Bestehende Deploy-Blocker K1/K2 (Auditbericht) gelten unabhängig davon.

## 8. Harte Abgrenzungen (Haftung — Berater-Liste NICHT voll übernommen)

- **KEIN Staplerschein, KEIN Kranschein** — behördliche Fachkenntnisnachweise nach
  eigener Verordnung, bewusst kein Produkt (nur Abgrenzungshinweis im Kurs).
- **Erste Hilfe nur Basics** — kein Ersatz für Erste-Hilfe-Kurse, nie so bewerben.
- **Praxisteile** (PSA gegen Absturz, Feuerlöscher) immer als „vor Ort erforderlich"
  gekennzeichnet; Online-Kurs deckt Theorie.
- **Betriebsspezifischer Unterweisungsteil bleibt beim Arbeitgeber** — unsere
  Ergänzungs-Checkliste unterstützt das, ersetzt es nicht (Differenzierungsmerkmal).
- Kein Feature, das einen Live-Trainer voraussetzt (Eigentümer-Prinzip, nur online).

## 9. Rollout-Reihenfolge (bestätigt + erweitert aus KURSPLAN_SICHERHEIT Kap. 6)

1. **Musterlektion S1-9.1 freigeben** (liegt vor) → Ton-/Format-Gate.
2. **S1 komplett** ausformulieren (24 Lektionen, 72 Mini-Checks, 30 Testfragen),
   modulweise zur Abnahme. Assets liegen bereit: **10/10 S1-Modulbilder**
   (`Bilder/S1_1-…` bis `S1_10-…` inkl. PSA) + transparente Sicherheits-Eule
   (`Bilder/Sicherheis Eule Transparent.png`) — Design-System unverändert
   (Handbuch-Layout, Campus-Eule, Navy/Cyan; Einbindung nach Modulbilder-Konvention
   `public/modules/<slug>.png` über `optionalImage()`).
3. **SFK-Review** (Gate) → Freigabe dokumentiert (`ExternalReviewApproval`).
4. **Kursfamilien-Technik** (§3: familyKey, CompanyFamilyAddon, Preisseite/Seed) —
   erst jetzt, mit echtem zweitem Produkt.
5. **Pilotkunde** Sicherheits-Add-on (bestehender Art.-4-Kunde, Cross-Sell).
6. **S2 Büro** (schnellster Zusatznutzen Bestandskunden), dann S4/S5 (Bau), S3.
7. **Enterprise-API bauen** (`ENTERPRISE_API_SPEC.md`), StaffFlow als erster Konsument.
8. Marketing-Konsistenz erst bei Familienstart: Preisseite, FAQ, Kurs-Hero-Bilder,
   Zahlwörter („drei Kurse" → dynamisch), Sitemap — Checkliste CLAUDE.md gilt.

## 10. Ausdrücklich NICHT geplant (V1)

Kein EHS-SaaS (Gefährdungsbeurteilung, Betriebsanweisungs-Verwaltung, Unfall-/
Beinaheunfall-Modul, Dokumentenlenkung, digitale Unterschriften-Suite) — Wiedervorlage
frühestens bei zahlender Kundennachfrage (pull, nicht push). Kein Rebranding vor
Trigger §6. Keine Sicherheits-Kurse im B2C-Abo. Kein StaffFlow-Schreibzugriff.

---
*Marktquellen Preisrecherche (2026-07-11): digital-affin.de (Unterweisungsmanager-
Vergleich: reteach, ehs, Mibeo, Quentic, lawpilots) · lena-training.at (Tarifmodelle) ·
weka-elearning.de · ispringlearn.de. Detailpreise ändern sich — vor Preisseiten-Launch
stichprobenartig aktualisieren.*
