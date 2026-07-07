/**
 * Content-Audit: Kernlogik ohne DB-Zugriff (unit-testbar).
 * Hash-gebundene Freigaben, Statusmaschine, Risk-Word-Scanner.
 * WICHTIG: Der Scanner ist bewusst GETRENNT vom repo-weiten wording-guard —
 * dessen Verbotsliste muss repo-weit halten; diese Liste hier darf schärfer
 * sein, weil sie nur Audit-Snapshots bewertet (docs/ROADMAP.md §4.4).
 */
import { createHash } from "crypto";

// ---------- Hash ----------

/** Normalisierter SHA-256 über den Inhalt (Whitespace-tolerant, damit reine Formatierung keine Freigabe kippt). */
export function contentHash(content: string): string {
  const normalized = content.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
  return createHash("sha256").update(normalized, "utf8").digest("hex");
}

/** Freigabe gilt nur, solange der aktuelle Hash dem freigegebenen entspricht. */
export function approvalIsCurrent(item: { contentHash: string; approvedContentHash: string | null }): boolean {
  return !!item.approvedContentHash && item.approvedContentHash === item.contentHash;
}

// ---------- Statusmaschine ----------

export const AUDIT_STATUSES = [
  "DRAFT", "NEEDS_REVIEW", "IN_REVIEW", "CHANGES_REQUESTED",
  "APPROVED", "PUBLISHED", "REJECTED", "ARCHIVED",
] as const;
export type AuditStatus = (typeof AUDIT_STATUSES)[number];

const TRANSITIONS: Record<AuditStatus, AuditStatus[]> = {
  DRAFT: ["NEEDS_REVIEW", "ARCHIVED"],
  NEEDS_REVIEW: ["IN_REVIEW", "ARCHIVED"],
  IN_REVIEW: ["APPROVED", "CHANGES_REQUESTED", "REJECTED", "NEEDS_REVIEW"],
  CHANGES_REQUESTED: ["IN_REVIEW", "NEEDS_REVIEW", "ARCHIVED"],
  APPROVED: ["PUBLISHED", "NEEDS_REVIEW", "ARCHIVED"],
  PUBLISHED: ["NEEDS_REVIEW", "ARCHIVED"],
  REJECTED: ["NEEDS_REVIEW", "ARCHIVED"],
  ARCHIVED: [],
};

export function canTransition(from: AuditStatus, to: AuditStatus): boolean {
  return (TRANSITIONS[from] ?? []).includes(to);
}

// ---------- Freigabe-Voraussetzungen ----------

export interface ChecklistState {
  /** Alle Pflicht-Items des Templates */
  requiredItemKeys: string[];
  /** Keys der abgehakten Items */
  checkedKeys: string[];
  approvedForPublication: boolean;
}

/** Approve nur mit vollständiger Pflicht-Checkliste + Publikationshaken. */
export function canApprove(state: ChecklistState): { ok: boolean; missing: string[] } {
  const checked = new Set(state.checkedKeys);
  const missing = state.requiredItemKeys.filter((k) => !checked.has(k));
  if (missing.length > 0) return { ok: false, missing };
  if (!state.approvedForPublication) return { ok: false, missing: ["approvedForPublication"] };
  return { ok: true, missing: [] };
}

// ---------- Risk-Word-Scanner (nur für Audit-Snapshots) ----------

export const AUDIT_RISK_WORDS: string[] = [
  "staatlich anerkannt",
  "offiziell zertifiziert",
  "EU-zertifiziert",
  "ISO-zertifiziert",
  "behördlich anerkannt",
  "behördlich genehmigt",
  "behördliche Zulassung",
  "rechtssicher garantiert",
  "garantiert rechtssicher",
  "vollständig compliant",
  "vollständig AI-Act-konform",
  "garantiert AI-Act-konform",
  "garantiert ISO-konform",
  "ersetzt Rechtsberatung",
  "ersetzt eine Rechtsberatung",
  "ersetzt Datenschutzprüfung",
  "ersetzt ein Audit",
  "ersetzt das Audit",
  "Zertifizierung garantiert",
  "offizieller KI-Führerschein",
];

/**
 * Verneinungen sind legitim und werden vor dem Scan entfernt —
 * „ersetzt keine Rechtsberatung" oder „keine behördliche Zulassung" sind
 * gewollte Klarstellungen, keine Risiko-Formulierungen.
 */
const NEGATION_PATTERNS: RegExp[] = [
  /\bkein[e]?[nrs]?\s+[^.\n]{0,80}?(anerkannt|zertifiziert|Zulassung|Zertifizierung|Rechtsberatung|Datenschutzprüfung|Audit|Garantie)[^.\n]*/gi,
  /\bnicht\s+[^.\n]{0,80}?(anerkannt|zertifiziert|compliant|konform|rechtssicher|garantiert)[^.\n]*/gi,
  /\bersetzt\s+(kein|keine|keinen|weder)\s+[^.\n]*/gi,
  /\bweder\s+[^.\n]{0,120}?(anerkannt|zertifiziert|Zulassung)[^.\n]*/gi,
];

export interface RiskHit {
  phrase: string;
  context: string;
}

export function scanForRiskWords(text: string): RiskHit[] {
  let cleaned = text;
  for (const pattern of NEGATION_PATTERNS) {
    cleaned = cleaned.replace(pattern, (m) => " ".repeat(m.length));
  }
  const lower = cleaned.toLowerCase();
  const hits: RiskHit[] = [];
  for (const phrase of AUDIT_RISK_WORDS) {
    const needle = phrase.toLowerCase();
    let from = 0;
    while (true) {
      const idx = lower.indexOf(needle, from);
      if (idx === -1) break;
      hits.push({ phrase, context: text.slice(Math.max(0, idx - 50), idx + phrase.length + 50) });
      from = idx + needle.length;
    }
  }
  return hits;
}

export function riskLevelForHits(hits: RiskHit[], base: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW") {
  if (hits.length === 0) return base;
  // Scanner-Treffer: mindestens HIGH (docs/ROADMAP.md §4.4)
  return base === "CRITICAL" ? "CRITICAL" : "HIGH";
}

// ---------- Diff (einfacher Zeilen-Diff für die Detailseite) ----------

export interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
}

/** Simpler LCS-freier Zeilen-Diff: reicht für Review-Zwecke, keine Lib nötig. */
export function simpleLineDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);
  const result: DiffLine[] = [];
  for (const line of oldLines) {
    if (!newSet.has(line)) result.push({ type: "removed", text: line });
  }
  for (const line of newLines) {
    result.push(newSet.has(line) && oldSet.has(line) ? { type: "same", text: line } : { type: "added", text: line });
  }
  return result;
}
