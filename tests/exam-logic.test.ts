import { describe, expect, it } from "vitest";
import { isPassed, isAnswerCorrect, calcPercent, pickRandom, categoryStats } from "@/lib/exam";

describe("Bestehenslogik", () => {
  it("besteht exakt an der Grenze (75 %)", () => {
    expect(isPassed(75, 75)).toBe(true);
  });
  it("fällt knapp unter der Grenze durch", () => {
    expect(isPassed(74, 75)).toBe(false);
  });
  it("respektiert konfigurierbare Grenzen", () => {
    expect(isPassed(80, 90)).toBe(false);
    expect(isPassed(90, 90)).toBe(true);
  });
});

describe("Antwortauswertung", () => {
  it("wertet exakte Auswahl als richtig", () => {
    expect(isAnswerCorrect(["a"], ["a"])).toBe(true);
    expect(isAnswerCorrect(["a", "b"], ["b", "a"])).toBe(true);
  });
  it("wertet Teilauswahl bei Mehrfachantwort als falsch", () => {
    expect(isAnswerCorrect(["a"], ["a", "b"])).toBe(false);
  });
  it("wertet zusätzliche falsche Option als falsch", () => {
    expect(isAnswerCorrect(["a", "c"], ["a"])).toBe(false);
  });
  it("wertet leere Antwort als falsch", () => {
    expect(isAnswerCorrect([], ["a"])).toBe(false);
  });
});

describe("Prozentberechnung", () => {
  it("rundet korrekt", () => {
    expect(calcPercent(25, 30)).toBe(83);
    expect(calcPercent(23, 30)).toBe(77);
    expect(calcPercent(0, 30)).toBe(0);
    expect(calcPercent(30, 30)).toBe(100);
  });
  it("ist robust gegen 0 Fragen", () => {
    expect(calcPercent(5, 0)).toBe(0);
  });
});

describe("Zufallsauswahl", () => {
  it("liefert die geforderte Anzahl ohne Duplikate", () => {
    const pool = Array.from({ length: 100 }, (_, i) => `q${i}`);
    const picked = pickRandom(pool, 30);
    expect(picked).toHaveLength(30);
    expect(new Set(picked).size).toBe(30);
  });
  it("liefert maximal die Poolgröße", () => {
    expect(pickRandom(["a", "b"], 10)).toHaveLength(2);
  });
});

describe("Kategorien-Analyse (Nachschulung)", () => {
  it("markiert Kategorien unter 60 % als schwach", () => {
    const stats = categoryStats([
      { category: "DATENSCHUTZ", correct: false },
      { category: "DATENSCHUTZ", correct: false },
      { category: "DATENSCHUTZ", correct: true },
      { category: "PROMPTING", correct: true },
      { category: "PROMPTING", correct: true },
    ]);
    const datenschutz = stats.find((s) => s.category === "DATENSCHUTZ");
    const prompting = stats.find((s) => s.category === "PROMPTING");
    expect(datenschutz?.weak).toBe(true);
    expect(prompting?.weak).toBe(false);
  });
  it("sortiert schwächste Kategorie zuerst", () => {
    const stats = categoryStats([
      { category: "A", correct: true },
      { category: "B", correct: false },
    ]);
    expect(stats[0].category).toBe("B");
  });
});

describe("Antwort-Durchmischung (kein Lösungsmuster)", () => {
  it("pickRandom als Voll-Shuffle erhält alle Elemente", () => {
    const options = ["a", "b", "c", "d"];
    const shuffled = pickRandom(options, options.length);
    expect([...shuffled].sort()).toEqual(["a", "b", "c", "d"]);
  });
  it("verändert die Reihenfolge statistisch (100 Läufe)", () => {
    let firstStaysFirst = 0;
    for (let i = 0; i < 100; i++) {
      if (pickRandom(["a", "b", "c", "d"], 4)[0] === "a") firstStaysFirst++;
    }
    // Erwartung ~25 %; bei >60 % wäre der Shuffle defekt
    expect(firstStaysFirst).toBeLessThan(60);
  });
});
