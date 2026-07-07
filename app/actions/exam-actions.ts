"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";
import {
  hasCompletedRequiredLessons, countUsedAttempts, expireStaleAttempts,
  pickRandom, isAnswerCorrect, calcPercent, isPassed,
} from "@/lib/exam";
import { issueCertificateForAttempt } from "@/lib/certificate/issue";

/** Test starten oder laufenden Versuch fortsetzen. */
export async function startExam(courseId: string): Promise<void> {
  const user = await requireUser();
  const exam = await prisma.exam.findUnique({ where: { courseId }, include: { course: true } });
  if (!exam) throw new Error("Prüfung nicht gefunden.");

  await expireStaleAttempts(user.id, courseId);

  const running = await prisma.examAttempt.findFirst({
    where: { userId: user.id, courseId, status: "IN_PROGRESS" },
  });
  if (running) redirect(`/exam/${courseId}`);

  const eligible = await hasCompletedRequiredLessons(user.id, courseId);
  if (!eligible) throw new Error("Pflichtlektionen nicht abgeschlossen.");

  const used = await countUsedAttempts(user.id, courseId);
  if (used >= exam.maxAttempts) throw new Error("Maximale Versuche erreicht.");

  const pool = await prisma.question.findMany({
    where: { courseId, active: true },
    select: { id: true },
  });
  const questionIds = pickRandom(pool.map((q) => q.id), exam.questionCount);

  const hdrs = await headers();
  await prisma.examAttempt.create({
    data: {
      userId: user.id,
      courseId,
      courseVersion: exam.course.version,
      locale: user.locale,
      questionIds: JSON.stringify(questionIds),
      expiresAt: new Date(Date.now() + exam.attemptResumeHours * 3600 * 1000),
      ip: hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: hdrs.get("user-agent"),
    },
  });
  await audit({ action: "EXAM_STARTED", userId: user.id, companyId: user.companyId, entityType: "Course", entityId: courseId });
  redirect(`/exam/${courseId}`);
}

const answerSchema = z.object({
  attemptId: z.string().min(1),
  questionId: z.string().min(1),
  selectedOptionIds: z.array(z.string()).max(4),
});

/** Antwort serverseitig zwischenspeichern (Resume-fähig). */
export async function saveAnswer(input: { attemptId: string; questionId: string; selectedOptionIds: string[] }): Promise<void> {
  const user = await requireUser();
  const parsed = answerSchema.parse(input);

  const attempt = await prisma.examAttempt.findUnique({ where: { id: parsed.attemptId } });
  if (!attempt || attempt.userId !== user.id) throw new Error("Zugriff verweigert.");
  if (attempt.status !== "IN_PROGRESS") throw new Error("Versuch ist abgeschlossen.");
  if (attempt.expiresAt < new Date()) throw new Error("Versuch abgelaufen.");

  const allowedIds: string[] = JSON.parse(attempt.questionIds);
  if (!allowedIds.includes(parsed.questionId)) throw new Error("Frage gehört nicht zu diesem Versuch.");

  await prisma.examAnswer.upsert({
    where: { attemptId_questionId: { attemptId: parsed.attemptId, questionId: parsed.questionId } },
    update: { selectedOptionIds: JSON.stringify(parsed.selectedOptionIds), answeredAt: new Date() },
    create: {
      attemptId: parsed.attemptId,
      questionId: parsed.questionId,
      selectedOptionIds: JSON.stringify(parsed.selectedOptionIds),
    },
  });
}

/** Test abgeben: auswerten, speichern, ggf. Zertifikat ausstellen. */
export async function submitExam(attemptId: string): Promise<void> {
  const user = await requireUser();
  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { answers: true },
  });
  if (!attempt || attempt.userId !== user.id) throw new Error("Zugriff verweigert.");
  if (attempt.status !== "IN_PROGRESS") redirect(`/exam/result/${attemptId}`);

  const exam = await prisma.exam.findUnique({ where: { courseId: attempt.courseId } });
  if (!exam) throw new Error("Prüfung nicht gefunden.");

  const questionIds: string[] = JSON.parse(attempt.questionIds);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: { options: { where: { correct: true }, select: { id: true } } },
  });
  const correctByQuestion = new Map(questions.map((q) => [q.id, q.options.map((o) => o.id)]));
  const answerByQuestion = new Map(attempt.answers.map((a) => [a.questionId, a]));

  let points = 0;
  for (const qid of questionIds) {
    const answer = answerByQuestion.get(qid);
    const selected: string[] = answer ? JSON.parse(answer.selectedOptionIds) : [];
    const correct = isAnswerCorrect(selected, correctByQuestion.get(qid) ?? []);
    if (correct) points++;
    if (answer) {
      await prisma.examAnswer.update({ where: { id: answer.id }, data: { correct } });
    } else {
      await prisma.examAnswer.create({
        data: { attemptId, questionId: qid, selectedOptionIds: "[]", correct: false },
      });
    }
  }

  const percent = calcPercent(points, questionIds.length);
  const passed = isPassed(percent, exam.passPercentage);

  await prisma.examAttempt.update({
    where: { id: attemptId },
    data: { status: "SUBMITTED", submittedAt: new Date(), scorePoints: points, scorePercent: percent, passed },
  });

  await audit({
    action: passed ? "EXAM_PASSED" : "EXAM_FAILED",
    userId: user.id,
    companyId: user.companyId,
    entityType: "ExamAttempt",
    entityId: attemptId,
    metadata: { points, percent, passPercentage: exam.passPercentage },
  });

  if (passed) {
    await issueCertificateForAttempt(attemptId);
  } else {
    await audit({ action: "RETRAINING_RECOMMENDED", userId: user.id, companyId: user.companyId, entityType: "ExamAttempt", entityId: attemptId });
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (dbUser) {
      await sendMail("exam_failed", dbUser.email, {
        firstName: dbUser.firstName,
        link: `${process.env.APP_URL ?? ""}/exam/result/${attemptId}`,
        issuer: appConfig.certificateIssuer,
      }, dbUser.locale);
    }
  }

  revalidatePath("/dashboard");
  redirect(`/exam/result/${attemptId}`);
}
