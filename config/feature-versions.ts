/**
 * Feature-Versionierung (pro Feature, NICHT global).
 * Jedes Feature startet bei V1.001 und wird nur hochgezaehlt, wenn genau dieses
 * Feature geaendert wird — alte Features bleiben unangetastet. Angezeigt als Badge
 * auf der jeweiligen Seite/Modul. Der globale Gesamtstand (Summe aller
 * Verbesserungen, „letzte hoechste Version") steht separat im Footer
 * (config/app.ts -> contentVersionLabel).
 */
export const featureVersions: Record<string, string> = {
  "superadmin-verwaltung": "V1.001",
  "tester-freigabe": "V1.001",
  // Lernunterlage → „KI-Kompetenz-Handbuch": Pilot=V1, Handbuch-Format=V2.0,
  // Pflegestand/Änderungsprotokoll (lebendes Dokument)=V2.1.
  "handbuch": "V2.1",
};

/** Aktuelle Version eines Features (oder undefined, wenn nicht versioniert). */
export function featureVersion(key: string): string | undefined {
  return featureVersions[key];
}
