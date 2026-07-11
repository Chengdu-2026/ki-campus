# Live-Test-Bericht: Task 4 — Teilnehmer-Durchlauf, Mandantentrennung, N6-Banner

## 1. Stammdaten
- Feature: Katalog 13–28 (Durchlauf), 47 (Mandantentrennung), N6 (Testzugang-Banner)
- Testdatum: 2026-07-08
- Tester / Agent: KI-CAMPUS-LIVE-QA-AUDITOR
- Umgebung: **Code-Audit** über Host-Dateien (Read/Grep) + DB-Inspektion (`prisma/dev.db`)
- Methodenhinweis: **Kein Live-Browser-Beweis** — Begründung siehe §8/§10 (Umgebung).

## 2. Ziel des Tests
Absichern, dass (a) der Durchlauf Kurs→Test→Zertifikat→QR sauber und
sicher implementiert ist, (b) Firma A keine Daten von Firma B erreicht, (c) das
Testzugang-Banner auch Teilnehmern (Anna) angezeigt wird.

## 3. Prüfweg + Befunde (Code-Ebene)

### 3.1 Teilnehmer-Durchlauf (Katalog 13–28) — CODE-VERIFIZIERT
- `app/actions/exam-actions.ts`
  - `startExam`: Eligibility-Gate `hasCompletedRequiredLessons`, Versuchslimit
    `countUsedAttempts >= exam.maxAttempts`, Zufallsauswahl `pickRandom`, Attempt
    `IN_PROGRESS`, auditiert (`EXAM_STARTED`).
  - `saveAnswer`: Ownership-Check (`attempt.userId !== user.id → verweigert`),
    Status/Expiry-Prüfung, „Frage gehört zum Versuch"-Check, Upsert (resume-fähig).
  - `submitExam`: Ownership-Check, serverseitige Auswertung (`isAnswerCorrect` über
    korrekte Optionen), `calcPercent`, `isPassed(percent, exam.passPercentage)`,
    speichert `SUBMITTED`+Score+`passed`, auditiert `EXAM_PASSED`/`EXAM_FAILED`.
    Bei `passed` → `issueCertificateForAttempt`; sonst `RETRAINING_RECOMMENDED` + Mail.
- `lib/certificate/issue.ts`: Zertifikat nur bei `status==="SUBMITTED" && passed===true`
  (harte Absicherung „Kein Zertifikat ohne bestandenen Test"), idempotent je Versuch,
  speichert `courseVersion`+`issuedContentSnapshot`, auditiert `CERTIFICATE_ISSUED`.
- QR/Verify: `verifyCode` = UUIDv4 (128 Bit, nicht enumerierbar);
  `/verify/[code]` (öffentlich) zeigt Status gültig/widerrufen/abgelaufen, bei
  Testfirma zusätzlich Test-Hinweis, jeder Aufruf auditiert (`CERTIFICATE_VERIFIED`).
- PDF-Download `app/api/certificates/[id]/pdf/route.ts`: deterministisch, `pdfHash`
  wird beim ersten Download persistiert (`X-Content-Sha256`), auditiert.

Bewertung: Der Pfad ist logisch vollständig und serverseitig abgesichert. Offen ist
nur der **Live-Klick-Nachweis** (Screenshots) auf einem laufenden Dev-Server.

### 3.2 Mandantentrennung (Katalog 47) — CODE-VERIFIZIERT
- `lib/tenancy.ts`: `assertCompanyScope(user, companyId)` wirft für Nicht-Superadmin
  bei `user.companyId !== companyId`; `companyWhere` liefert `{companyId}`-Filter.
- Mutationen: `assertCompanyScope` in **allen** company-actions (createInvitation,
  createParticipant, updateParticipant, toggleUserStatus, deleteUserGdpr,
  resetAttempts, revokeCertificate) und qm-actions (Issue/CAPA/Review) — belegt per Grep.
- Read-Pfade: `/company/*` leiten die `companyId` aus der **Session** ab
  (`requireRole` → `user.companyId`), nicht aus URL-Parametern → strukturell
  isoliert. `/company/users/[id]` prüft zusätzlich `assertCompanyScope(admin, target.companyId)`.
- Zertifikat-Download: `sameCompany = u.companyId === certificate.companyId`; erlaubt nur
  Superadmin ODER Inhaber ODER (sameCompany && COMPANY_ADMIN/TRAINER) → Firma-A-Admin
  bekommt bei Firma-B-Zertifikat **403**.

Bewertung: Isolation ist strukturell erzwungen (Session-gebundener Scope + zentrale
`assertCompanyScope`). **Blocker für den Live-A/B-Beweis:** Der Seed enthält nur EINE
Firma (`demo-company`) — es gibt keine Firma B. Ohne zweite Firma + zweiten Admin ist
der Cross-Tenant-Zugriffsversuch nicht live durchführbar.

### 3.3 N6 — Testzugang-Banner als Teilnehmer (Anna) — CODE-VERIFIZIERT
- `components/layout/test-access-banner.tsx`: liest `session.user.companyId` →
  `company.isTest`; rendert bei `isTest` das amber Banner (`company.testBanner` bzw.
  `company.testBannerUntil`), sonst `null`. Rollen-unabhängig.
- Mount: `app/layout.tsx` Z.87 rendert `<TestAccessBanner/>` im **Root-Layout** →
  gilt für ALLE eingeloggten Nutzer der Testfirma, inkl. Teilnehmer (Anna).
- i18n: `company.testBanner`/`testBannerUntil` vorhanden (de.ts Z.374/375).

Bewertung: Korrekt implementiert. **Blocker für den Live-Beweis:** Annas Firma
`demo-company` ist `isTest=false` → Banner erscheint (korrekt) erst nach
„Testzugang aktivieren" für die Firma.

## 4. Erwartetes vs. tatsächliches Ergebnis
Erwartet: sichere Implementierung + Isolation + rollenübergreifendes Banner.
Tatsächlich (Code): erfüllt. Live-Nachweis: offen (Umgebungsgründe §8).

## 5. Nebenpunkt-Fix (umgesetzt, V0.10.2)
`toggleUserStatus` revalidierte nur `/company/users` → auf `/admin/companies/[id]`
blieb der Status bis Reload stale. **Behoben** und dieselbe Lücke systematisch bei
allen von `/admin/companies/[id]` erreichbaren Mutationen geschlossen:
`toggleUserStatus`, `createInvitation`, `createParticipant`, `updateParticipant`,
`deleteUserGdpr`, `resetAttempts` revalidieren jetzt zusätzlich
``/admin/companies/${companyId}`` (guarded). Datei: `app/actions/company-actions.ts`.

## 6. Screenshot-Beweise
Keine (Code-Audit). N4-PDF-Beweise siehe Nachbarordner `n4-zertifikat-testzugang/`.

## 7. Gefundene Fehler
| Priorität | Bereich | Beschreibung | Empfehlung |
|---|---|---|---|
| P3 (behoben) | Superadmin-UI | Status/Listen auf `/admin/companies/[id]` stale nach Mutation | revalidatePath ergänzt (V0.10.2) |
| Testdaten | Seed | Nur eine Firma; keine Firma B → A/B-Live-Test nicht möglich | Zweite Firma seeden (siehe §12) |
| Testdaten | Seed | `demo-company` isTest=false → N4/N6-Live nicht sichtbar | Testzugang aktivieren vor Live-Test |

## 8. Fehlende Verdrahtungen / Umgebungs-Blocker
- **App nicht in dieser Sandbox lauffähig:** `node_modules` sind Windows-gebaut
  (`@next/swc-win32`, `esbuild win32`) → `next dev`/`next build`/`vitest` laufen hier
  nicht ohne Linux-Reinstall. Zusätzlich liefert der Sandbox-Mount UTF-8-lastige
  Quelldateien teils abgeschnitten → `tsc` im Sandbox unbrauchbar. Verifikation daher
  über Host-Dateilesung + isolierte PDF-Generierung.
- **Live-Browser-QA** (Screenshots) muss auf dem Windows-Dev-Server laufen.

## 9. Rechtliche / AI-Act-Wording-Prüfung
Keine neuen Nutzertexte erzeugt. Bannertexte bereits vorhanden/geprüft. Unkritisch.

## 10. Ergebnis
**TEILWEISE BESTANDEN** — Durchlauf (13–28), Mandantentrennung (47) und N6 sind
**code-verifiziert und solide**; der **Live-Klick-Nachweis** steht aus (Dev-Server +
Testdaten nötig). Nebenpunkt `toggleUserStatus` (+5 Geschwister): **behoben**.

## 11. Offene Punkte (Live, auf Windows-Dev-Server)
- [ ] Zweite Firma + Admin + Teilnehmer seeden (A/B).
- [ ] `demo-company` (oder Firma B) auf isTest=true → N4-Stempel + N6-Banner live sehen.
- [ ] Durchlauf als Anna klicken: Lektionen → Test bestehen → Zertifikat → QR/Verify.
- [ ] Cross-Tenant: Firma-A-Admin ruft Firma-B-Zertifikat-PDF → 403 bestätigen.
- [ ] `npm test` + `npm run build` grün (bestätigt den V0.10.2-Fix).

## 12. Nächste empfohlene Schritte
- Firma-B-Seed idempotent in `prisma/seed` ergänzen (standardisiert, wiederholbar)
  statt manuellem DB-Insert — dann ist der A/B-Test dauerhaft reproduzierbar.
