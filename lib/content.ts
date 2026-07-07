import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";

/** Übersetzung mit Fallback wählen. */
export function pickTranslation<T extends { locale: string }>(translations: T[], locale: string): T | undefined {
  return translations.find((t) => t.locale === locale)
    ?? translations.find((t) => t.locale === appConfig.fallbackLocale)
    ?? translations[0];
}

/** Standardkurs (V1: genau ein Kurs). */
export async function getDefaultCourse() {
  return prisma.course.findFirst({
    where: { archivedAt: null, publishedAt: { not: null } },
    include: { translations: true, exam: true },
    orderBy: { createdAt: "asc" },
  });
}

export interface CourseProgressSummary {
  totalRequired: number;
  doneRequired: number;
  totalLessons: number;
  doneLessons: number;
  percent: number;
  readyForExam: boolean;
}

export async function getCourseProgress(userId: string, courseId: string): Promise<CourseProgressSummary> {
  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId } },
    select: { id: true, required: true },
  });
  const done = await prisma.lessonProgress.findMany({
    where: { userId, lessonId: { in: lessons.map((l) => l.id) } },
    select: { lessonId: true },
  });
  const doneSet = new Set(done.map((d) => d.lessonId));
  const required = lessons.filter((l) => l.required);
  const doneRequired = required.filter((l) => doneSet.has(l.id)).length;
  const percent = lessons.length === 0 ? 0 : Math.round((done.length / lessons.length) * 100);
  return {
    totalRequired: required.length,
    doneRequired,
    totalLessons: lessons.length,
    doneLessons: done.length,
    percent,
    readyForExam: required.length > 0 && doneRequired >= required.length,
  };
}

export type ParticipantState =
  | "NOT_STARTED" | "IN_PROGRESS" | "READY_FOR_EXAM"
  | "EXAM_FAILED" | "NO_ATTEMPTS_LEFT" | "PASSED";

export interface DashboardState {
  state: ParticipantState;
  progress: CourseProgressSummary;
  attemptsUsed: number;
  maxAttempts: number;
  lastFailedAttemptId: string | null;
  certificateId: string | null;
  runningAttempt: boolean;
}

export async function getDashboardState(userId: string, courseId: string): Promise<DashboardState> {
  const [progress, exam, attempts, certificate, running] = await Promise.all([
    getCourseProgress(userId, courseId),
    prisma.exam.findUnique({ where: { courseId } }),
    prisma.examAttempt.findMany({
      where: { userId, courseId, status: { in: ["SUBMITTED", "EXPIRED"] } },
      orderBy: { startedAt: "desc" },
    }),
    prisma.certificate.findFirst({ where: { userId, courseId, status: "VALID" } }),
    prisma.examAttempt.findFirst({ where: { userId, courseId, status: "IN_PROGRESS", expiresAt: { gt: new Date() } } }),
  ]);

  const maxAttempts = exam?.maxAttempts ?? appConfig.maxExamAttempts;
  const passed = attempts.some((a) => a.passed === true);
  const lastFailed = attempts.find((a) => a.passed === false) ?? null;

  let state: ParticipantState;
  if (passed && certificate) state = "PASSED";
  else if (attempts.length >= maxAttempts && !passed) state = "NO_ATTEMPTS_LEFT";
  else if (lastFailed) state = "EXAM_FAILED";
  else if (progress.readyForExam) state = "READY_FOR_EXAM";
  else if (progress.doneLessons > 0) state = "IN_PROGRESS";
  else state = "NOT_STARTED";

  return {
    state,
    progress,
    attemptsUsed: attempts.length,
    maxAttempts,
    lastFailedAttemptId: lastFailed?.id ?? null,
    certificateId: certificate?.id ?? null,
    runningAttempt: !!running,
  };
}

/** Nächste offene Lektion für "Lektion fortsetzen". */
export async function getNextOpenLesson(userId: string, courseId: string): Promise<string | null> {
  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId } },
    orderBy: [{ module: { order: "asc" } }, { order: "asc" }],
    select: { id: true },
  });
  const done = new Set(
    (await prisma.lessonProgress.findMany({
      where: { userId, lessonId: { in: lessons.map((l) => l.id) } },
      select: { lessonId: true },
    })).map((d) => d.lessonId)
  );
  return lessons.find((l) => !done.has(l.id))?.id ?? null;
}
