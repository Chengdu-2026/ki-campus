"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { pickTranslation } from "@/lib/content";
import { categoryStats, pickRandom } from "@/lib/exam";
import { appConfig } from "@/config/app";

export interface PracticeQuestion {
  id: string;
  text: string;
  explanation: string;
  category: string;
  multiple: boolean;
  options: { id: string; text: string; correct: boolean }[];
}

export type PracticeMode = "wrong" | "weak" | "all" | "simulation" | "category";

/** Übungsfragen laden — Wiederholungsmodus ohne Auswirkung auf Testergebnis. */
export async function getPracticeQuestions(mode: PracticeMode, category?: string): Promise<PracticeQuestion[]> {
  const user = await requireUser();
  // V1: Übungsmodus arbeitet auf dem Standardkurs (Basic = ältester Kurs); kursübergreifende Übung siehe docs/TODO.md
  const course = await prisma.course.findFirst({ where: { archivedAt: null }, include: { exam: true }, orderBy: { createdAt: "asc" } });
  if (!course) return [];

  let questionIds: string[] | null = null;

  if (mode === "wrong") {
    const answers = await prisma.examAnswer.findMany({
      where: { attempt: { userId: user.id, courseId: course.id, status: "SUBMITTED" }, correct: false },
      select: { questionId: true },
      distinct: ["questionId"],
    });
    questionIds = answers.map((a) => a.questionId);
    if (questionIds.length === 0) return [];
  } else if (mode === "weak") {
    const answers = await prisma.examAnswer.findMany({
      where: { attempt: { userId: user.id, courseId: course.id, status: "SUBMITTED" } },
      include: { question: { select: { category: true } } },
    });
    const stats = categoryStats(answers.map((a) => ({ category: a.question.category, correct: a.correct === true })));
    const weakCategories = stats.filter((s) => s.weak).map((s) => s.category);
    if (weakCategories.length === 0) return [];
    const pool = await prisma.question.findMany({
      where: { courseId: course.id, active: true, category: { in: weakCategories } },
      select: { id: true },
    });
    questionIds = pickRandom(pool.map((q) => q.id), 15);
  } else if (mode === "category" && category) {
    const pool = await prisma.question.findMany({
      where: { courseId: course.id, active: true, category },
      select: { id: true },
    });
    questionIds = pickRandom(pool.map((q) => q.id), 10);
  } else if (mode === "simulation") {
    const pool = await prisma.question.findMany({
      where: { courseId: course.id, active: true },
      select: { id: true },
    });
    questionIds = pickRandom(pool.map((q) => q.id), course.exam?.questionCount ?? appConfig.defaultExamQuestionCount);
  } else {
    const pool = await prisma.question.findMany({
      where: { courseId: course.id, active: true },
      select: { id: true },
    });
    questionIds = pickRandom(pool.map((q) => q.id), 20);
  }

  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: { translations: true, options: { orderBy: { order: "asc" }, include: { translations: true } } },
  });

  return questions.map((q) => {
    const correctCount = q.options.filter((o) => o.correct).length;
    return {
      id: q.id,
      text: pickTranslation(q.translations, user.locale)?.text ?? "",
      explanation: pickTranslation(q.translations, user.locale)?.explanation ?? "",
      category: q.category,
      multiple: correctCount > 1,
      // Antwortreihenfolge bei jeder Auslieferung neu mischen (kein lernbares Muster)
      options: pickRandom(
        q.options.map((o) => ({
          id: o.id,
          text: pickTranslation(o.translations, user.locale)?.text ?? "",
          correct: o.correct,
        })),
        q.options.length
      ),
    };
  });
}
