import { describe, expect, it } from "vitest";
import { seedModules } from "@/prisma/seed/content-lessons";
import { seedModulesOfficer } from "@/prisma/seed/content-lessons-officer";
import { seedQuestions1 } from "@/prisma/seed/content-questions-1";
import { seedQuestions2 } from "@/prisma/seed/content-questions-2";
import { seedQuestions3 } from "@/prisma/seed/content-questions-3";
import { seedQuestionsOfficer1 } from "@/prisma/seed/content-questions-officer-1";
import { seedQuestionsOfficer2 } from "@/prisma/seed/content-questions-officer-2";
import type { SeedModule } from "@/prisma/seed/content-lessons";
import type { SeedQuestion } from "@/prisma/seed/content-questions-1";

const basicQuestions = [...seedQuestions1, ...seedQuestions2, ...seedQuestions3];
const officerQuestions = [...seedQuestionsOfficer1, ...seedQuestionsOfficer2];

function lessonSlugsOf(modules: SeedModule[]): Set<string> {
  return new Set(modules.flatMap((m) => m.lessons.map((l) => l.slug)));
}

function checkLessons(modules: SeedModule[]) {
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      expect(lesson.goal.length, lesson.slug).toBeGreaterThan(10);
      expect(lesson.content.length, lesson.slug).toBeGreaterThan(200);
      expect(lesson.example.length, lesson.slug).toBeGreaterThan(20);
      expect(lesson.risk.length, lesson.slug).toBeGreaterThan(10);
      expect(lesson.memo.length, lesson.slug).toBeGreaterThan(5);
      expect(lesson.miniChecks.length, lesson.slug).toBeGreaterThanOrEqual(1);
    }
  }
}

function checkQuestions(questions: SeedQuestion[], lessonSlugs: Set<string>) {
  for (const q of questions) {
    expect(q.options, q.text).toHaveLength(4);
    const correct = q.options.filter((o) => o.correct).length;
    expect(correct, q.text).toBeGreaterThanOrEqual(1);
    expect(correct, q.text).toBeLessThanOrEqual(2);
    expect(q.explanation.length, q.text).toBeGreaterThan(10);
    expect(lessonSlugs.has(q.lessonSlug), `${q.lessonSlug} fehlt (${q.text.slice(0, 40)})`).toBe(true);
  }
}

describe("Kursinhalte Basic", () => {
  it("hat 17 Module", () => {
    expect(seedModules).toHaveLength(17);
  });
  it("Modul-Reihenfolge ist lückenlos 1..17", () => {
    expect(seedModules.map((m) => m.order)).toEqual(Array.from({ length: 17 }, (_, i) => i + 1));
  });
  it("enthält die 5 neuen Module und das Transparenz-Modul mit verschobener Lektion", () => {
    const slugs = seedModules.map((m) => m.slug);
    for (const s of ["informationssicherheit", "transparenz-kennzeichnung", "ki-tools-freigabe", "ki-vorfaelle", "qualitaet-feedback"]) {
      expect(slugs, s).toContain(s);
    }
    const transparenzModul = seedModules.find((m) => m.slug === "transparenz-kennzeichnung")!;
    expect(transparenzModul.lessons.map((l) => l.slug)).toContain("transparenz-ki-inhalte");
    const urheberrecht = seedModules.find((m) => m.slug === "urheberrecht")!;
    expect(urheberrecht.lessons.map((l) => l.slug)).not.toContain("transparenz-ki-inhalte");
  });
  it("jede Lektion hat alle didaktischen Elemente", () => {
    checkLessons(seedModules);
  });
});

describe("Fragenpool Basic", () => {
  it("enthält mindestens 150 Fragen", () => {
    expect(basicQuestions.length).toBeGreaterThanOrEqual(150);
  });
  it("mindestens 30 % Praxisfälle", () => {
    const share = basicQuestions.filter((q) => q.practiceCase).length / basicQuestions.length;
    expect(share).toBeGreaterThanOrEqual(0.3);
  });
  it("Fragen sind formal korrekt und verweisen auf existierende Lektionen", () => {
    checkQuestions(basicQuestions, lessonSlugsOf(seedModules));
  });
  it("deckt mindestens 10 Kategorien ab", () => {
    const categories = new Set(basicQuestions.map((q) => q.category));
    expect(categories.size).toBeGreaterThanOrEqual(10);
  });
  it("jedes neue Modul (12–16) ist im Fragenpool vertreten", () => {
    const bySlug = new Set(basicQuestions.map((q) => q.lessonSlug));
    const newModules = seedModules.filter((m) => m.order >= 12 && m.order <= 16);
    for (const mod of newModules) {
      const covered = mod.lessons.some((l) => bySlug.has(l.slug));
      expect(covered, `Modul ${mod.slug} ohne Fragen`).toBe(true);
    }
  });
});

describe("Kursinhalte KI-Verantwortliche & KI-Beauftragte", () => {
  it("hat 10 Module", () => {
    expect(seedModulesOfficer).toHaveLength(10);
  });
  it("hat mindestens 35 Lektionen", () => {
    const count = seedModulesOfficer.reduce((sum, m) => sum + m.lessons.length, 0);
    expect(count).toBeGreaterThanOrEqual(35);
  });
  it("Modul-Reihenfolge ist lückenlos 1..10", () => {
    expect(seedModulesOfficer.map((m) => m.order)).toEqual(Array.from({ length: 10 }, (_, i) => i + 1));
  });
  it("jede Lektion hat alle didaktischen Elemente", () => {
    checkLessons(seedModulesOfficer);
  });
  it("Lektions-Slugs kollidieren nicht mit dem Basic-Kurs", () => {
    const basic = lessonSlugsOf(seedModules);
    for (const slug of lessonSlugsOf(seedModulesOfficer)) {
      expect(basic.has(slug), slug).toBe(false);
    }
  });
});

describe("Fragenpool KI-Verantwortliche & KI-Beauftragte", () => {
  it("enthält mindestens 80 Fragen", () => {
    expect(officerQuestions.length).toBeGreaterThanOrEqual(80);
  });
  it("mindestens 40 % Praxisfälle", () => {
    const share = officerQuestions.filter((q) => q.practiceCase).length / officerQuestions.length;
    expect(share).toBeGreaterThanOrEqual(0.4);
  });
  it("Fragen sind formal korrekt und verweisen auf existierende Lektionen", () => {
    checkQuestions(officerQuestions, lessonSlugsOf(seedModulesOfficer));
  });
  it("deckt mindestens 10 Kategorien ab", () => {
    const categories = new Set(officerQuestions.map((q) => q.category));
    expect(categories.size).toBeGreaterThanOrEqual(10);
  });
  it("jedes Modul ist im Fragenpool vertreten", () => {
    const bySlug = new Set(officerQuestions.map((q) => q.lessonSlug));
    for (const mod of seedModulesOfficer) {
      const covered = mod.lessons.some((l) => bySlug.has(l.slug));
      expect(covered, `Modul ${mod.slug} ohne Fragen`).toBe(true);
    }
  });
});
