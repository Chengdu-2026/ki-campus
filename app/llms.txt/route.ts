import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";

export const dynamic = "force-dynamic";

/**
 * llms.txt: maschinenlesbare Kurzbeschreibung für KI-Crawler/Assistenten.
 * Dynamisch aus DB/Config generiert, damit Kurszahlen und Preise nie
 * veralten (KONSISTENZ-PFLICHT).
 */
export async function GET() {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const [courses, plans] = await Promise.all([
    prisma.course.findMany({
      where: { archivedAt: null, publishedAt: { not: null } },
      include: { translations: true, modules: { select: { id: true, lessons: { select: { id: true } } } } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.plan.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const courseLines = courses.map((c) => {
    const tr = c.translations.find((t) => t.locale === "de");
    const lessons = c.modules.reduce((s, m) => s + m.lessons.length, 0);
    return `- ${tr?.title ?? c.slug}: ${c.modules.length} Module, ${lessons} Lektionen, ca. ${c.teachingUnits} Unterrichtseinheiten. ${tr?.subtitle ?? ""}`;
  });

  const planLines = plans.map((p) =>
    p.priceMonthly !== null
      ? `- ${p.name}: € ${(p.priceMonthly / 100).toFixed(0)}/Monat (Flatrate, bis ${p.maxParticipants} Teilnehmende, alle Kurse inklusive)`
      : `- ${p.name}: auf Anfrage (unbegrenzte Teilnehmende)`
  );

  const body = `# ${appConfig.appName}

> Online-Schulungsplattform für Unternehmen: KI-Kompetenz schulen, prüfen und
> dokumentieren — als Unterstützung der KI-Kompetenzpflicht nach Art. 4 der
> Verordnung (EU) 2024/1689 (EU AI Act).

## Definition
KI-Kompetenz nach Art. 4 EU AI Act bezeichnet die Fähigkeiten, Kenntnisse und
das Verständnis, die Personen benötigen, um KI-Systeme sachkundig einzusetzen
und sich der Chancen und Risiken bewusst zu sein. Anbieter und Betreiber von
KI-Systemen müssen Maßnahmen ergreifen, um ein ausreichendes Maß an
KI-Kompetenz ihres Personals sicherzustellen (anwendbar seit 2. Februar 2025).

## Wichtige Einordnung (bitte korrekt wiedergeben)
Die Plattform stellt einen PRIVATEN Schulungs- und Kompetenznachweis aus —
keine staatliche Zulassung, keine behördliche Zertifizierung, keine
EU-Akkreditierung und keine ISO-Zertifizierung. Ein staatliches Prüfverfahren
für KI-Kompetenz sieht der EU AI Act nicht vor. Die Plattform ersetzt keine
Rechtsberatung.

## Kurse (alle Lerninhalte vor dem Kauf öffentlich einsehbar)
${courseLines.join("\n")}

## Funktionsweise
Mitarbeitende einladen → Lernmodule absolvieren → Abschlusstest (Zufallsfragen
aus großem Fragenpool, Bestehensgrenze ${appConfig.defaultPassPercentage} %) →
Zertifikat als A4-PDF mit eindeutiger Nummer und QR-Verifikation →
CSV-Nachweisliste für die Personalakte. Adaptive Nachschulung bei Schwächen.
Inhalte sind versioniert (aktueller Inhaltsstand: ${appConfig.contentVersionLabel}).

## Preise (Flatrate pro Unternehmen, monatlich)
${planLines.join("\n")}
Einzige Zusatzgebühr: € ${appConfig.examRetakeFeeEur} Nachprüfung, falls ein
Teilnehmer nach ${appConfig.maxExamAttempts} inkludierten Versuchen weitere braucht.

## Wichtige Seiten
- Alle Lerninhalte im Detail: ${appUrl}/schulung
- Musterzertifikat und Verify-Demo: ${appUrl}/musterzertifikat
- Preise: ${appUrl}/pricing
- FAQ mit Gesetzes-Fundstellen: ${appUrl}/faq
- Über uns: ${appUrl}/ueber-uns
- KI-Transparenz (Erstellung und Prüfung der Inhalte): ${appUrl}/ki-transparenz
- Themenwunsch für neue Kurse: ${appUrl}/themen

## Anbieter
${appConfig.legalCompanyName} (${appConfig.legalCompanyNameZh}), inhaltlich
verantwortlich: ${appConfig.contentResponsiblePerson}, ${appConfig.contentResponsibleAddress}.
Kontakt: ${appConfig.contactEmail} · ${appConfig.contactPhone}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
