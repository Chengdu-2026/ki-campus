/**
 * Wording-Guard: verhindert rechtlich irreführende Formulierungen.
 * Wird in Tests gegen Quellcode, Seeds, Mail-Templates und PDF-Texte ausgeführt.
 */
export const FORBIDDEN_PHRASES: string[] = [
  "staatlich anerkannt",
  "offiziell zertifiziert",
  "EU-zertifiziert",
  "behördlich genehmigt",
  "garantiert rechtssicher",
  "offizieller KI-Führerschein",
  "erfüllt alle gesetzlichen Pflichten garantiert",
  "ISO-zertifiziert",
  "garantiert ISO-9001-konform",
  "automatische Zertifizierung",
  "ersetzt das Audit",
  "offiziell anerkanntes QM-System",
];

/**
 * Erlaubt sind Verneinungen ("keine behördliche Zertifizierung") und
 * die Verbotsliste selbst. Diese Muster werden vor der Prüfung entfernt.
 */
const NEGATION_PATTERNS: RegExp[] = [
  /kein[e]?\s+(staatlich|behördlich|offiziell)[^.\n]*/gi,
  /nicht\s+(staatlich|behördlich|offiziell|EU-)[^.\n]*/gi,
  /weder\s+staatlich[^.\n]*/gi,
];

export interface WordingViolation {
  phrase: string;
  index: number;
  context: string;
}

export function scanText(text: string): WordingViolation[] {
  let cleaned = text;
  for (const pattern of NEGATION_PATTERNS) {
    cleaned = cleaned.replace(pattern, (m) => " ".repeat(m.length));
  }
  const violations: WordingViolation[] = [];
  const lower = cleaned.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    let from = 0;
    const needle = phrase.toLowerCase();
    while (true) {
      const idx = lower.indexOf(needle, from);
      if (idx === -1) break;
      violations.push({
        phrase,
        index: idx,
        context: text.slice(Math.max(0, idx - 60), idx + phrase.length + 60),
      });
      from = idx + needle.length;
    }
  }
  return violations;
}

export function assertCleanWording(text: string): void {
  const violations = scanText(text);
  if (violations.length > 0) {
    throw new Error(
      "Verbotene Formulierung gefunden: " + violations.map((v) => `"${v.phrase}"`).join(", ")
    );
  }
}
