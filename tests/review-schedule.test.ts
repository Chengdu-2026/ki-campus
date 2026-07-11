import { describe, it, expect } from "vitest";
import { austrianHolidays, isWorkingDay, workingDayAfter, buildReviewPlan } from "@/lib/review-schedule";

describe("austrianHolidays", () => {
  it("kennt fixe und Ostern-bewegliche Feiertage 2026", () => {
    const h = austrianHolidays(2026);
    expect(h.has("2026-01-01")).toBe(true); // Neujahr
    expect(h.has("2026-05-01")).toBe(true); // Staatsfeiertag
    expect(h.has("2026-10-26")).toBe(true); // Nationalfeiertag
    expect(h.has("2026-12-25")).toBe(true); // Weihnachten
    // Ostern 2026 = 5. April → Ostermontag 6.4., Fronleichnam 4.6.
    expect(h.has("2026-04-06")).toBe(true);
    expect(h.has("2026-06-04")).toBe(true);
  });
});

describe("isWorkingDay", () => {
  it("Wochenende und Feiertag sind keine Werktage", () => {
    expect(isWorkingDay(new Date("2026-01-01"))).toBe(false); // Neujahr (Do)
    expect(isWorkingDay(new Date("2026-01-03"))).toBe(false); // Samstag
    expect(isWorkingDay(new Date("2026-01-05"))).toBe(true);  // Montag
  });
});

describe("workingDayAfter", () => {
  it("überspringt Wochenende/Feiertag", () => {
    // Fr 2026-01-02 (2.1. ist Werktag), +1 Werktag → Mo 5.1. (Sa/So übersprungen)
    expect(workingDayAfter(new Date("2026-01-02"), 1).toISOString().slice(0, 10)).toBe("2026-01-05");
  });
});

describe("buildReviewPlan", () => {
  it("verteilt fällige Einträge auf max. 3/Werktag", () => {
    const items = Array.from({ length: 7 }, (_, i) => ({ key: "m" + i, title: "Modul " + i, lastApprovedAt: null, needsReview: true }));
    const plan = buildReviewPlan(items, { cycleMonths: 6, maxPerDay: 3, today: new Date("2026-01-05") }); // Montag
    expect(plan.filter((p) => p.state === "today").length).toBe(3);
    expect(plan.filter((p) => p.state === "scheduled").length).toBe(4);
  });
  it("nicht fällige Einträge sind 'current' mit künftigem Fälligkeitsdatum", () => {
    const plan = buildReviewPlan(
      [{ key: "a", title: "A", lastApprovedAt: new Date("2026-01-01"), needsReview: false }],
      { cycleMonths: 6, maxPerDay: 3, today: new Date("2026-01-05") },
    );
    expect(plan[0].state).toBe("current");
    expect(plan[0].dueDate.toISOString().slice(0, 10)).toBe("2026-07-01");
  });
});
