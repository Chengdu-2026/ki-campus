import { describe, expect, it } from "vitest";
import {
  evaluateFeedback, evaluateFailRate, evaluateDropoutRate, analyzeFreeText,
  canCloseCorrectiveAction, classifyNps, trafficLight, versionLabel,
} from "@/lib/qm/logic";

describe("QM: Feedback-Bewertung", () => {
  it("gute Bewertung erzeugt keinen Fall", () => {
    const e = evaluateFeedback({ averageScore: 4.5, npsScore: 9, freeTexts: ["Alles super"] });
    expect(e.createIssue).toBe(false);
    expect(e.sentiment).toBe("POSITIVE");
    expect(e.status).toBe("RECEIVED");
  });
  it("Bewertung 3,0–3,49 erzeugt Review + MEDIUM-Fall", () => {
    const e = evaluateFeedback({ averageScore: 3.2, npsScore: 8, freeTexts: [] });
    expect(e.status).toBe("REVIEW_REQUIRED");
    expect(e.createIssue).toBe(true);
    expect(e.severity).toBe("MEDIUM");
  });
  it("Bewertung < 3,0 erzeugt HIGH mit 14 Tagen Frist", () => {
    const e = evaluateFeedback({ averageScore: 2.5, npsScore: 8, freeTexts: [] });
    expect(e.severity).toBe("HIGH");
    expect(e.dueDays).toBe(14);
    expect(e.status).toBe("ACTION_REQUIRED");
  });
  it("Bewertung < 2,0 erzeugt CRITICAL, 7 Tage, Superadmin-Info", () => {
    const e = evaluateFeedback({ averageScore: 1.8, npsScore: 8, freeTexts: [] });
    expect(e.severity).toBe("CRITICAL");
    expect(e.dueDays).toBe(7);
    expect(e.notifySuperadmin).toBe(true);
  });
  it("NPS <= 6 erzeugt Review", () => {
    const e = evaluateFeedback({ averageScore: 4.6, npsScore: 5, freeTexts: [] });
    expect(e.status).toBe("REVIEW_REQUIRED");
    expect(e.createIssue).toBe(true);
  });
  it("Datenschutzkritik im Freitext eskaliert auf CRITICAL", () => {
    const e = evaluateFeedback({ averageScore: 4.8, npsScore: 10, freeTexts: ["Hier gibt es ein Datenschutz-Problem"] });
    expect(e.severity).toBe("CRITICAL");
    expect(e.sentiment).toBe("CRITICAL");
  });
  it("Technik < 3 erzeugt HIGH auch bei gutem Schnitt", () => {
    const e = evaluateFeedback({ averageScore: 4.0, npsScore: 9, freeTexts: [], technicalScore: 2 });
    expect(e.severity).toBe("HIGH");
  });
});

describe("QM: Quoten", () => {
  it("Durchfallquote: 26 % Warnung, 41 % Fall", () => {
    expect(evaluateFailRate(26)).toEqual({ level: "WARNING", createIssue: false });
    expect(evaluateFailRate(41)).toEqual({ level: "HIGH", createIssue: true });
    expect(evaluateFailRate(10).level).toBe("OK");
  });
  it("Abbruchquote: 21 % Warnung, 36 % Fall", () => {
    expect(evaluateDropoutRate(21).level).toBe("WARNING");
    expect(evaluateDropoutRate(36).createIssue).toBe(true);
  });
});

describe("QM: Freitext-Analyse", () => {
  it("erkennt kritische Begriffe", () => {
    const r = analyzeFreeText(["Der Test war unfair und verwirrend"]);
    expect(r.negative).toBe(true);
    expect(r.matchedTerms).toContain("unfair");
  });
  it("neutraler Text bleibt neutral", () => {
    expect(analyzeFreeText(["Sehr hilfreich, danke"]).negative).toBe(false);
  });
});

describe("QM: CAPA-Abschlussvalidierung", () => {
  const base = { rootCause: "Ursache", correctiveAction: "Maßnahme", ownerId: "u1", effectivenessResult: null };
  it("MEDIUM ohne Wirksamkeitsprüfung schließbar", () => {
    expect(canCloseCorrectiveAction({ ...base, issueSeverity: "MEDIUM" }).ok).toBe(true);
  });
  it("ohne Ursache nicht schließbar", () => {
    const r = canCloseCorrectiveAction({ ...base, rootCause: null, issueSeverity: "MEDIUM" });
    expect(r.ok).toBe(false);
    expect(r.missing).toContain("rootCause");
  });
  it("HIGH ohne Wirksamkeitsprüfung nicht schließbar", () => {
    const r = canCloseCorrectiveAction({ ...base, issueSeverity: "HIGH" });
    expect(r.ok).toBe(false);
    expect(r.missing).toContain("effectivenessResult");
  });
  it("CRITICAL mit Wirksamkeitsprüfung schließbar", () => {
    expect(canCloseCorrectiveAction({ ...base, effectivenessResult: "wirksam", issueSeverity: "CRITICAL" }).ok).toBe(true);
  });
});

describe("QM: NPS, Ampel, Versionen", () => {
  it("NPS-Klassifikation", () => {
    expect(classifyNps(10)).toBe("PROMOTER");
    expect(classifyNps(7)).toBe("NEUTRAL");
    expect(classifyNps(6)).toBe("DETRACTOR");
  });
  it("Ampellogik", () => {
    expect(trafficLight({ averageScore: 4.5, criticalIssues: 0, overdueActions: 0, failRatePercent: 10 })).toBe("GREEN");
    expect(trafficLight({ averageScore: 3.8, criticalIssues: 0, overdueActions: 1, failRatePercent: 10 })).toBe("YELLOW");
    expect(trafficLight({ averageScore: 4.5, criticalIssues: 1, overdueActions: 0, failRatePercent: 10 })).toBe("RED");
    expect(trafficLight({ averageScore: 4.5, criticalIssues: 0, overdueActions: 0, failRatePercent: 45 })).toBe("RED");
  });
  it("Versionslabels starten bei V1.003", () => {
    expect(versionLabel(1)).toBe("V1.003");
    expect(versionLabel(2)).toBe("V1.004");
    expect(versionLabel(10)).toBe("V1.012");
  });
});
