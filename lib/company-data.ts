import { prisma } from "@/lib/prisma";
import { getCourseProgress, getDefaultCourse } from "@/lib/content";
import { categoryStats, type CategoryStat } from "@/lib/exam";

export interface MemberProgress {
  userId: string;
  birthDate: Date | null;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
  progressPercent: number;
  readyForExam: boolean;
  attempts: number;
  bestPercent: number | null;
  passed: boolean;
  failed: boolean;
  needsRetraining: boolean;
  certificateId: string | null;
  certificateNumber: string | null;
  lastExamAt: Date | null;
}

/** Fortschritts-/Teststatus aller Teilnehmenden einer Firma. */
export async function getCompanyProgress(companyId: string): Promise<MemberProgress[]> {
  const course = await getDefaultCourse();
  if (!course) return [];

  const users = await prisma.user.findMany({
    where: { companyId, role: { in: ["PARTICIPANT", "TRAINER"] } },
    orderBy: [{ status: "asc" }, { lastName: "asc" }], // ACTIVE vor INACTIVE, dann alphabetisch
    include: {
      attempts: { where: { courseId: course.id, status: "SUBMITTED" }, orderBy: { submittedAt: "desc" } },
      certificates: { where: { courseId: course.id, status: "VALID" }, take: 1 },
    },
  });

  const result: MemberProgress[] = [];
  for (const user of users) {
    const progress = await getCourseProgress(user.id, course.id);
    const passed = user.attempts.some((a) => a.passed === true);
    const failed = !passed && user.attempts.some((a) => a.passed === false);
    const best = user.attempts.reduce<number | null>(
      (max, a) => (a.scorePercent !== null && (max === null || a.scorePercent > max) ? a.scorePercent : max),
      null
    );
    result.push({
      userId: user.id,
      birthDate: user.birthDate,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      role: user.role,
      progressPercent: progress.percent,
      readyForExam: progress.readyForExam,
      attempts: user.attempts.length,
      bestPercent: best,
      passed,
      failed,
      needsRetraining: failed,
      certificateId: user.certificates[0]?.id ?? null,
      certificateNumber: user.certificates[0]?.certificateNumber ?? null,
      lastExamAt: user.attempts[0]?.submittedAt ?? null,
    });
  }
  return result;
}

export interface CompanyGapAnalysis {
  avgPercent: number | null;
  categories: (CategoryStat & { affectedUsers: number })[];
  usersNeedingRetraining: number;
}

/** Lückenanalyse: häufigste Fehlerkategorien im Unternehmen. */
export async function getCompanyGapAnalysis(companyId: string): Promise<CompanyGapAnalysis> {
  const answers = await prisma.examAnswer.findMany({
    where: { attempt: { user: { companyId }, status: "SUBMITTED" } },
    include: { question: { select: { category: true } }, attempt: { select: { userId: true } } },
  });
  const stats = categoryStats(
    answers.map((a) => ({ category: a.question.category, correct: a.correct === true }))
  );
  const affected = new Map<string, Set<string>>();
  for (const a of answers) {
    if (a.correct !== true) {
      const set = affected.get(a.question.category) ?? new Set<string>();
      set.add(a.attempt.userId);
      affected.set(a.question.category, set);
    }
  }
  const attempts = await prisma.examAttempt.findMany({
    where: { user: { companyId }, status: "SUBMITTED" },
    select: { scorePercent: true, passed: true, userId: true },
  });
  const scores = attempts.filter((a) => a.scorePercent !== null).map((a) => a.scorePercent as number);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const passedUsers = new Set(attempts.filter((a) => a.passed).map((a) => a.userId));
  const failedUsers = new Set(attempts.filter((a) => a.passed === false && !passedUsers.has(a.userId)).map((a) => a.userId));

  return {
    avgPercent: avg,
    categories: stats.map((s) => ({ ...s, affectedUsers: affected.get(s.category)?.size ?? 0 })),
    usersNeedingRetraining: failedUsers.size,
  };
}
