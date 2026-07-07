import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";

/** Reine Bestehenslogik — separat testbar. */
export function isPassed(scorePercent: number, passPercentage: number): boolean {
  return scorePercent >= passPercentage;
}

/** Punktlogik: Frage zählt nur, wenn ALLE korrekten und KEINE falschen Optionen gewählt wurden. */
export function isAnswerCorrect(selectedIds: string[], correctIds: string[]): boolean {
  if (selectedIds.length !== correctIds.length) return false;
  const set = new Set(correctIds);
  return selectedIds.every((id) => set.has(id));
}

export function calcPercent(points: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((points / total) * 100);
}

/** Zufallsauswahl ohne Zurücklegen (Fisher-Yates). */
export function pickRandom<T>(items: T[], count: number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  percent: number;
  weak: boolean;
}

export function categoryStats(
  answers: { category: string; correct: boolean }[],
  weakThreshold: number = appConfig.weakCategoryThreshold
): CategoryStat[] {
  const map = new Map<string, { total: number; correct: number }>();
  for (const a of answers) {
    const entry = map.get(a.category) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (a.correct) entry.correct += 1;
    map.set(a.category, entry);
  }
  return [...map.entries()]
    .map(([category, { total, correct }]) => {
      const percent = calcPercent(correct, total);
      return { category, total, correct, percent, weak: percent < weakThreshold };
    })
    .sort((a, b) => a.percent - b.percent);
}

/** Pflichtlektionen-Gate: darf der Nutzer zum Test? */
export async function hasCompletedRequiredLessons(userId: string, courseId: string): Promise<boolean> {
  const requiredLessons = await prisma.lesson.findMany({
    where: { required: true, module: { courseId } },
    select: { id: true },
  });
  if (requiredLessons.length === 0) return false;
  const done = await prisma.lessonProgress.count({
    where: { userId, lessonId: { in: requiredLessons.map((l) => l.id) } },
  });
  return done >= requiredLessons.length;
}

export async function countUsedAttempts(userId: string, courseId: string): Promise<number> {
  return prisma.examAttempt.count({
    where: { userId, courseId, status: { in: ["SUBMITTED", "EXPIRED"] } },
  });
}

/** Abgelaufene IN_PROGRESS-Versuche schließen (Resume-Fenster überschritten). */
export async function expireStaleAttempts(userId: string, courseId: string): Promise<void> {
  await prisma.examAttempt.updateMany({
    where: { userId, courseId, status: "IN_PROGRESS", expiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });
}
