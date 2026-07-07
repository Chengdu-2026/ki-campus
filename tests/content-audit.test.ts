import { describe, expect, it } from "vitest";
import {
  contentHash,
  approvalIsCurrent,
  canTransition,
  canApprove,
  scanForRiskWords,
  riskLevelForHits,
  simpleLineDiff,
} from "@/lib/content-audit/logic";

describe("Content-Audit: Hash & Freigabeanker", () => {
  it("gleicher Inhalt ergibt gleichen Hash, geänderter Inhalt einen anderen", () => {
    const a = contentHash("Die Prompt-Formel: Rolle, Ziel, Kontext.");
    const b = contentHash("Die Prompt-Formel: Rolle, Ziel, Kontext.");
    const c = contentHash("Die Prompt-Formel: Rolle, Ziel, Kontext, Format.");
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });
  it("reine Whitespace-Formatierung kippt die Freigabe nicht", () => {
    expect(contentHash("Hallo  Welt \n")).toBe(contentHash("Hallo Welt"));
  });
  it("Freigabe gilt nur bei identischem Hash (Änderung invalidiert)", () => {
    const hash = contentHash("Version 1");
    expect(approvalIsCurrent({ contentHash: hash, approvedContentHash: hash })).toBe(true);
    expect(approvalIsCurrent({ contentHash: contentHash("Version 2"), approvedContentHash: hash })).toBe(false);
    expect(approvalIsCurrent({ contentHash: hash, approvedContentHash: null })).toBe(false);
  });
});

describe("Content-Audit: Statusmaschine", () => {
  it("erlaubt den Regelfluss NEEDS_REVIEW → IN_REVIEW → APPROVED → PUBLISHED", () => {
    expect(canTransition("NEEDS_REVIEW", "IN_REVIEW")).toBe(true);
    expect(canTransition("IN_REVIEW", "APPROVED")).toBe(true);
    expect(canTransition("APPROVED", "PUBLISHED")).toBe(true);
  });
  it("verbietet Abkürzungen und Rückwege aus ARCHIVED", () => {
    expect(canTransition("NEEDS_REVIEW", "APPROVED")).toBe(false);
    expect(canTransition("NEEDS_REVIEW", "PUBLISHED")).toBe(false);
    expect(canTransition("ARCHIVED", "APPROVED")).toBe(false);
  });
  it("geänderte veröffentlichte Inhalte dürfen zurück auf NEEDS_REVIEW", () => {
    expect(canTransition("PUBLISHED", "NEEDS_REVIEW")).toBe(true);
    expect(canTransition("APPROVED", "NEEDS_REVIEW")).toBe(true);
  });
});

describe("Content-Audit: Freigabe-Gate (Checkliste)", () => {
  it("Approve nur mit vollständiger Pflicht-Checkliste", () => {
    const gate = canApprove({
      requiredItemKeys: ["read", "language", "plausible"],
      checkedKeys: ["read", "language"],
      approvedForPublication: true,
    });
    expect(gate.ok).toBe(false);
    expect(gate.missing).toContain("plausible");
  });
  it("Approve ohne Publikationshaken gesperrt", () => {
    const gate = canApprove({ requiredItemKeys: ["read"], checkedKeys: ["read"], approvedForPublication: false });
    expect(gate.ok).toBe(false);
  });
  it("Approve mit allem grün erlaubt", () => {
    const gate = canApprove({ requiredItemKeys: ["read", "language"], checkedKeys: ["language", "read"], approvedForPublication: true });
    expect(gate.ok).toBe(true);
  });
});

describe("Content-Audit: Risk-Word-Scanner", () => {
  it("findet riskante Formulierungen und setzt mindestens HIGH", () => {
    const hits = scanForRiskWords("Unser Kurs ist ISO-zertifiziert und garantiert AI-Act-konform.");
    expect(hits.length).toBeGreaterThanOrEqual(2);
    expect(riskLevelForHits(hits)).toBe("HIGH");
  });
  it("legitime Verneinungen lösen KEINEN Treffer aus", () => {
    const text =
      "Es handelt sich nicht um eine staatliche Zulassung. Das Modul ersetzt keine Rechtsberatung, " +
      "keine Datenschutzprüfung und kein behördliches Audit. Es ist keine ISO-Zertifizierung.";
    expect(scanForRiskWords(text)).toHaveLength(0);
  });
  it("Treffer trotz Verneinung an anderer Stelle im Text", () => {
    const text = "Wir sind offiziell zertifiziert. Das ersetzt keine Rechtsberatung.";
    const hits = scanForRiskWords(text);
    expect(hits.map((h) => h.phrase)).toContain("offiziell zertifiziert");
  });
  it("ohne Treffer bleibt das Basis-Risiko erhalten", () => {
    expect(riskLevelForHits([], "LOW")).toBe("LOW");
  });
});

describe("Content-Audit: Diff", () => {
  it("markiert entfernte und neue Zeilen", () => {
    const diff = simpleLineDiff("Zeile A\nZeile B", "Zeile A\nZeile C");
    expect(diff.some((d) => d.type === "removed" && d.text === "Zeile B")).toBe(true);
    expect(diff.some((d) => d.type === "added" && d.text === "Zeile C")).toBe(true);
    expect(diff.some((d) => d.type === "same" && d.text === "Zeile A")).toBe(true);
  });
});
