# API & Server Actions

## Route Handler (HTTP)

| Route | Methode | Auth | Zweck |
|---|---|---|---|
| /api/auth/[...nextauth] | GET/POST | öffentlich | Auth.js (Login/Session/Logout) |
| /api/certificates/[id]/pdf | GET | Inhaber, Firmen-Admin/Trainer, Superadmin | Zertifikat-PDF, Header `X-Content-Sha256` |
| /api/company/export | GET | COMPANY_ADMIN, SUPERADMIN | CSV-Nachweisliste (Semikolon, BOM, Excel-kompatibel) |

## Server Actions (Zod-validiert, RBAC-geprüft, auditiert)

| Action | Datei | Rolle |
|---|---|---|
| registerCompany | actions/auth-actions.ts | öffentlich (Self-Service Firma+Admin, Plan BASIC) |
| requestPasswordReset / resetPassword | auth-actions.ts | öffentlich (kein Nutzer-Enumerations-Orakel) |
| acceptInvitation | auth-actions.ts | öffentlich mit gültigem Code (Plan-Limit geprüft) |
| completeLesson | lesson-actions.ts | eingeloggt (nur eigener Fortschritt) |
| startExam / saveAnswer / submitExam | exam-actions.ts | Teilnehmer (Gate, Versuchslimit, Resume, Auswertung, Zertifikat) |
| getPracticeQuestions | practice-actions.ts | eingeloggt (Übungsmodus) |
| createInvitation / createParticipant | company-actions.ts | COMPANY_ADMIN/SUPERADMIN (Plan-Limit) |
| toggleUserStatus / deleteUserGdpr | company-actions.ts | COMPANY_ADMIN/SUPERADMIN (eigene Firma) |
| resetAttempts / sendReminder | company-actions.ts | COMPANY_ADMIN/SUPERADMIN |
| revokeCertificate | company-actions.ts | COMPANY_ADMIN/SUPERADMIN |
| toggleQuestionActive / updateQuestion | admin-actions.ts | SUPERADMIN (Wording-Guard) |
| updateLesson / updateExamSettings | admin-actions.ts | SUPERADMIN (Wording-Guard) |

## Öffentliche Seiten
`/verify/[verifyCode]` — Zertifikatsprüfung ohne Login, datensparsam.

## Enterprise-API (Plan-Feature „API optional")
Noch nicht umgesetzt — sauberer Ansatz: API-Keys je Company + REST-Endpoints
für Teilnehmer-Provisioning und Zertifikatsabfrage. Siehe TODO.md.
