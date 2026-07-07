# Rollen & Rechte

## Rollenmatrix

| Fähigkeit | Superadmin | Unternehmensadmin | Trainer/Prüfer | Teilnehmer |
|---|---|---|---|---|
| Alle Unternehmen sehen | ✓ | — | — | — |
| Kurse/Lektionen/Fragen verwalten | ✓ | — | — | — |
| Prüfungseinstellungen ändern | ✓ | — | — | — |
| Audit-Log einsehen | ✓ | — | — | — |
| Eigene Firma verwalten | ✓ | ✓ | — | — |
| Mitarbeitende einladen/anlegen/deaktivieren | ✓ | ✓ | — | — |
| Fortschritt + Lückenanalyse der Firma sehen | ✓ | ✓ | ✓ (read-only) | — |
| Zertifikate der Firma herunterladen | ✓ | ✓ | ✓ | nur eigene |
| Versuche zurücksetzen / Zertifikat widerrufen | ✓ | ✓ (eigene Firma) | — | — |
| CSV-Export | ✓ | ✓ | — | — |
| Schulung/Test absolvieren, Zertifikat sehen | — | — | — | ✓ |

Trainer/Prüfer ist in V1 bewusst schlank: Rolle existiert im Datenmodell und hat
Read-only-Zugriff auf `/company`-Ansichten; eigener Ausbau ist V2 (siehe TODO.md).

## Durchsetzung (3 Ebenen)

1. **Middleware** (`middleware.ts`): grobe Pfad-Gates (/admin nur SUPERADMIN,
   /company nur COMPANY_ADMIN/SUPERADMIN, Rest nur eingeloggt).
2. **Server-Seite** (`lib/rbac.ts`): `requireUser()` / `requireRole(...)` in jeder
   geschützten Page und Action.
3. **Mandanten-Scope** (`lib/tenancy.ts`): `assertCompanyScope()` wirft bei
   firmenfremdem Zugriff; `companyWhere()` liefert sichere Filter (nie Vollzugriff
   bei fehlender companyId). Teilnehmer-Queries filtern zusätzlich auf `userId`.

Getestet in `tests/rbac.test.ts`.
