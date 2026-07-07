# Datenschutz-TODO: Profilfoto-Funktion (nicht umgesetzt — Vormerkung)

Stand 2026-07-07. Bewusst NICHT implementiert. Erst umsetzen, wenn das
Datenschutzkonzept unten vollständig geklärt ist. Keine schnellen
Datenbankänderungen ohne dieses Konzept.

## Grundsatzentscheidung
- Profilfoto im Account: grundsätzlich sinnvoll und machbar.
- Profilfoto auf dem Zertifikat: datenschutzrechtlich sensibler
  (zusätzliche personenbezogene bzw. biometrienahe Daten). Nur optional,
  nur per Firmen-Einstellung, nie Pflicht, keine automatische Anzeige,
  ausdrückliche Einwilligung und Löschmöglichkeit erforderlich.

## Datenmodell (später ergänzen — Migrationsfolgen beachten, init.sql synchron halten)
User/Profile:
- profileImageUrl (optional)
- profileImageUploadedAt (optional)
- profileImageConsentAt (optional)
- profileImageDeletedAt (optional)

CompanySettings (optional):
- allowProfileImages (boolean, default false)
- allowProfileImageOnCertificate (boolean, default false)
- requirePhotoConsent (boolean, default true)

## UI (Accountbereich)
Nutzer kann Foto hochladen, ändern, löschen; Einwilligungstext lesen und bestätigen.
Hinweistext: „Das Profilfoto ist freiwillig. Es wird nur für Ihr Benutzerprofil
verwendet. Eine Anzeige auf Zertifikaten erfolgt nur, wenn Ihr Unternehmen diese
Funktion aktiviert hat und Sie ausdrücklich zustimmen."

## Zertifikat — Anzeige nur wenn ALLE Bedingungen erfüllt
1. Unternehmen erlaubt Fotos auf Zertifikaten (CompanySettings)
2. Nutzer hat ein Foto hochgeladen
3. Nutzer hat ausdrücklich zugestimmt (profileImageConsentAt)
4. Zertifikatstemplate unterstützt Foto
5. Datenschutzerklärung wurde entsprechend ergänzt
Sonst: kein Foto; Zertifikat bleibt ohne Foto vollständig gültig.

## Datenschutz-Prüfliste vor Umsetzung
Zweck der Verarbeitung · Einwilligung · Widerruf · Löschung · Speicherort ·
Zugriffsbeschränkung · Export/Download · Backup-Aufbewahrung · AVV mit
Storage-Anbieter · Ergänzung der Datenschutzerklärung.

## Sicherheit
- Keine öffentlich abrufbaren Bilder: private Storage-Buckets, signierte URLs
  oder geschützter Zugriff
- Dateitypprüfung (nur JPG, PNG, WebP), max. 2 MB
- Viren-/Malwareprüfung wenn möglich
- EXIF-Daten entfernen (keine Standort-/Gerätedaten speichern)
- Rate-Limit für Uploads

## Dokumentations-Querverweise
- docs/TODO.md (Priorität mittel)
- docs/CERTIFICATE_LOGIC.md (Hinweis ergänzt)
- docs/AGENT_HANDOVER.md (Vormerkung)
