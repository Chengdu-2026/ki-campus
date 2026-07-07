# DSGVO-Konzept

## Rollenverteilung
Nutzt ein Unternehmen die Plattform für seine Mitarbeitenden, ist das Unternehmen
Verantwortlicher und der Plattformbetreiber Auftragsverarbeiter ⇒ **AVV nötig**
(Muster vom Anwalt erstellen lassen; siehe LEGAL_POSITIONING.md).
Achtung: Betreiber-Sitz VR China ⇒ Drittlandtransfer-Bewertung (SCCs, Hosting-
Standort idealerweise EU) ist VOR Vertrieb zu klären.

## Datenminimierung
- Verify-Seite zeigt nur: Name, Firma, Kurs, Datum, Nummer, Status.
- IP/User-Agent nur am Prüfungsversuch (Protokollzweck), optional.
- Keine sensiblen Datenkategorien werden erhoben.

## Löschkonzept
- **Deaktivieren** (`toggleUserStatus`): Zugang gesperrt, Plan-Platz frei, Daten bleiben.
- **Löschen** (`deleteUserGdpr`): Vorname/Nachname → „Gelöschter Nutzer", E-Mail →
  `geloescht-<id>@anonymisiert.invalid`, Passwort-Hash invalidiert, Status INACTIVE.
  Test-/Zertifikatshistorie bleibt pseudonymisiert als Schulungsnachweis der Firma
  erhalten (berechtigtes Interesse / Nachweispflicht). AuditLog-Eintrag.
- Einladungen laufen automatisch ab (14 Tage), Reset-Tokens nach 1 h.

## Betroffenenrechte
Auskunft/Export: Datenbestand je Nutzer ist über Prisma vollständig abfragbar
(User, LessonProgress, ExamAttempt/Answer, Certificate) — Self-Service-Export als
JSON ist als V2 vorgesehen (TODO.md), bis dahin manuell durch Betreiber.

## TOMs-Checkliste (Auszug)
Bcrypt-Passwort-Hashing (Faktor 10) · rollenbasierte Zugriffe + Mandanten-Scope ·
AuditLog administrativer Aktionen · Zod-Inputvalidierung · JWT-Sessions mit
AUTH_SECRET · Zertifikats-Verify nur über 128-Bit-Zufallscode · HTTPS am Proxy
erzwingen (Deployment) · Backups (DEPLOYMENT.md).
