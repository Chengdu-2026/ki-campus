/**
 * QM-Kernlogik nach ISO-9001-Logik (keine Zertifizierungsgarantie).
 * Reine Funktionen — vollständig unit-testbar.
 */

export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "CRITICAL";
export type ResponseStatus = "RECEIVED" | "REVIEW_REQUIRED" | "ACTION_REQUIRED" | "CLOSED";
export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IssueStatus = "OPEN" | "IN_REVIEW" | "ACTION_DEFINED" | "IN_PROGRESS" | "EFFECTIVENESS_CHECK" | "CLOSED" | "REJECTED";

/** Kritische Begriffe in Freitexten (Auftrag §5). */
export const CRITICAL_TERMS = [
  "unverständlich", "fehler", "funktioniert nicht", "unfair", "zu schwer", "falsch",
  "datenschutz", "rechtlich falsch", "verwirrend", "nicht brauchbar", "beschwerde", "reklamation",
];

/** Begriffe, die einen Fall automatisch auf CRITICAL heben. */
export const ESCALATION_TERMS = ["datenschutz", "rechtlich falsch"];

export function analyzeFreeText(texts: string[]): { negative: boolean; critical: boolean; matchedTerms: string[] } {
  const joined = texts.join(" \n ").toLowerCase();
  const matched = CRITICAL_TERMS.filter((term) => joined.includes(term));
  const critical = ESCALATION_TERMS.some((term) => joined.includes(term));
  return { negative: matched.length > 0, critical, matchedTerms: matched };
}

export interface FeedbackEvaluation {
  sentiment: Sentiment;
  status: ResponseStatus;
  createIssue: boolean;
  severity: Severity | null;
  dueDays: number | null;
  notifySuperadmin: boolean;
  reasons: string[];
}

/** Bewertet ein Feedback nach den Schwellen aus Auftrag §5/§6. Skala 1–5, NPS 0–10. */
export function evaluateFeedback(input: {
  averageScore: number | null;
  npsScore: number | null;
  freeTexts: string[];
  technicalScore?: number | null;
  examFairnessScore?: number | null;
}): FeedbackEvaluation {
  const reasons: string[] = [];
  const text = analyzeFreeText(input.freeTexts);
  const avg = input.averageScore;

  let sentiment: Sentiment = "NEUTRAL";
  if (avg !== null && avg >= 4.2 && !text.negative) sentiment = "POSITIVE";
  if ((avg !== null && avg < 3.5) || (input.npsScore !== null && input.npsScore <= 6) || text.negative) sentiment = "NEGATIVE";
  if ((avg !== null && avg < 2.0) || text.critical) sentiment = "CRITICAL";

  let status: ResponseStatus = "RECEIVED";
  let createIssue = false;
  let severity: Severity | null = null;
  let dueDays: number | null = null;
  let notifySuperadmin = false;

  // Stufe 1: Warnung / Review
  if ((avg !== null && avg < 3.5) || (input.npsScore !== null && input.npsScore <= 6) || text.negative) {
    status = "REVIEW_REQUIRED";
    if (avg !== null && avg < 3.5) reasons.push(`Durchschnitt ${avg.toFixed(2)} < 3,5`);
    if (input.npsScore !== null && input.npsScore <= 6) reasons.push(`NPS ${input.npsScore} (Kritiker)`);
    if (text.negative) reasons.push(`Kritische Begriffe im Freitext: ${text.matchedTerms.join(", ")}`);
    createIssue = true;
    severity = "MEDIUM";
  }

  // Stufe 2: QM-Fall (HIGH)
  const technicalLow = input.technicalScore !== null && input.technicalScore !== undefined && input.technicalScore < 3.0;
  const fairnessLow = input.examFairnessScore !== null && input.examFairnessScore !== undefined && input.examFairnessScore < 3.0;
  if ((avg !== null && avg < 3.0) || technicalLow || fairnessLow) {
    status = "ACTION_REQUIRED";
    severity = "HIGH";
    dueDays = 14;
    if (avg !== null && avg < 3.0) reasons.push(`Durchschnitt ${avg.toFixed(2)} < 3,0`);
    if (technicalLow) reasons.push("Technik-Bewertung < 3,0");
    if (fairnessLow) reasons.push("Testfairness < 3,0");
  }

  // Stufe 3: Kritisch
  if ((avg !== null && avg < 2.0) || text.critical) {
    status = "ACTION_REQUIRED";
    severity = "CRITICAL";
    dueDays = 7;
    notifySuperadmin = true;
    if (avg !== null && avg < 2.0) reasons.push(`Durchschnitt ${avg.toFixed(2)} < 2,0`);
    if (text.critical) reasons.push("Datenschutz-/Rechtskritik im Freitext");
  }

  return { sentiment, status, createIssue, severity, dueDays, notifySuperadmin, reasons };
}

/** Durchfallquote bewerten (Auftrag §5). Quote als 0–100. */
export function evaluateFailRate(failRatePercent: number): { level: "OK" | "WARNING" | "HIGH"; createIssue: boolean } {
  if (failRatePercent > 40) return { level: "HIGH", createIssue: true };
  if (failRatePercent > 25) return { level: "WARNING", createIssue: false };
  return { level: "OK", createIssue: false };
}

/** Abbruchquote bewerten (Auftrag §5). */
export function evaluateDropoutRate(dropoutPercent: number): { level: "OK" | "WARNING" | "HIGH"; createIssue: boolean } {
  if (dropoutPercent > 35) return { level: "HIGH", createIssue: true };
  if (dropoutPercent > 20) return { level: "WARNING", createIssue: false };
  return { level: "OK", createIssue: false };
}

export type NpsClass = "PROMOTER" | "NEUTRAL" | "DETRACTOR";
export function classifyNps(score: number): NpsClass {
  if (score >= 9) return "PROMOTER";
  if (score >= 7) return "NEUTRAL";
  return "DETRACTOR";
}

/**
 * Abschlussvalidierung für QM-Fälle/Maßnahmen (Auftrag §7):
 * kein Abschluss ohne Ursache, Maßnahme, Verantwortlichen;
 * HIGH/CRITICAL zusätzlich nicht ohne Wirksamkeitsprüfung.
 */
export function canCloseCorrectiveAction(action: {
  rootCause: string | null;
  correctiveAction: string | null;
  ownerId: string | null;
  effectivenessResult: string | null;
  issueSeverity: Severity;
}): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!action.rootCause?.trim()) missing.push("rootCause");
  if (!action.correctiveAction?.trim()) missing.push("correctiveAction");
  if (!action.ownerId) missing.push("owner");
  if ((action.issueSeverity === "HIGH" || action.issueSeverity === "CRITICAL") && !action.effectivenessResult?.trim()) {
    missing.push("effectivenessResult");
  }
  return { ok: missing.length === 0, missing };
}

/** Ampellogik fürs QM-Dashboard (Auftrag §12). */
export function trafficLight(input: {
  averageScore: number | null;
  criticalIssues: number;
  overdueActions: number;
  failRatePercent: number;
}): "GREEN" | "YELLOW" | "RED" {
  if (
    (input.averageScore !== null && input.averageScore < 3.5) ||
    input.criticalIssues > 0 ||
    input.overdueActions > 2 ||
    input.failRatePercent > 40
  ) return "RED";
  if (
    (input.averageScore !== null && input.averageScore < 4.2) ||
    input.overdueActions > 0
  ) return "YELLOW";
  return "GREEN";
}

/** Versionslabel: Zähler ab V1.003 (Auftrag Versionierung). */
export function versionLabel(sequence: number): string {
  return `V1.${String(sequence + 2).padStart(3, "0")}`; // sequence 1 => V1.003
}
