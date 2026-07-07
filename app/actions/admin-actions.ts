"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { audit } from "@/lib/audit";
import { assertCleanWording } from "@/lib/wording-guard";
import type { ActionResult } from "@/app/actions/auth-actions";
import { recordRevision } from "@/app/actions/qm-actions";

/** Frage aktiv/inaktiv schalten. */
export async function toggleQuestionActive(questionId: string): Promise<void> {
  const admin = await requireRole("SUPERADMIN");
  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question) throw new Error("Frage nicht gefunden.");
  await prisma.question.update({ where: { id: questionId }, data: { active: !question.active } });
  await audit({ action: "QUESTION_UPDATED", userId: admin.id, entityType: "Question", entityId: questionId, metadata: { active: !question.active } });
  revalidatePath("/admin/questions");
}

const questionSchema = z.object({
  questionId: z.string().min(1),
  locale: z.string().min(2).max(5),
  text: z.string().min(10),
  explanation: z.string().min(5),
  optionIds: z.array(z.string()).length(4),
  optionTexts: z.array(z.string().min(1)).length(4),
  correctIds: z.array(z.string()).min(1).max(2),
});

/** Frage inkl. Optionen bearbeiten — Wording-Guard läuft mit. */
export async function updateQuestion(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const optionIds = formData.getAll("optionId").map(String);
  const parsed = questionSchema.safeParse({
    questionId: formData.get("questionId"),
    locale: formData.get("locale") ?? "de",
    text: formData.get("text"),
    explanation: formData.get("explanation"),
    optionIds,
    optionTexts: formData.getAll("optionText").map(String),
    correctIds: formData.getAll("correctId").map(String),
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const data = parsed.data;

  try {
    assertCleanWording(data.text + " " + data.explanation + " " + data.optionTexts.join(" "));
  } catch {
    return { ok: false, error: "Verbotene Formulierung — bitte umformulieren (siehe /legal-disclaimer)." };
  }

  await prisma.questionTranslation.upsert({
    where: { questionId_locale: { questionId: data.questionId, locale: data.locale } },
    update: { text: data.text, explanation: data.explanation },
    create: { questionId: data.questionId, locale: data.locale, text: data.text, explanation: data.explanation },
  });
  for (let i = 0; i < data.optionIds.length; i++) {
    const optionId = data.optionIds[i];
    await prisma.answerOption.update({
      where: { id: optionId },
      data: { correct: data.correctIds.includes(optionId) },
    });
    await prisma.answerOptionTranslation.upsert({
      where: { answerOptionId_locale: { answerOptionId: optionId, locale: data.locale } },
      update: { text: data.optionTexts[i] },
      create: { answerOptionId: optionId, locale: data.locale, text: data.optionTexts[i] },
    });
  }
  await prisma.question.update({ where: { id: data.questionId }, data: { version: { increment: 1 } } });
  await recordRevision({ entityType: "QUESTION", entityId: data.questionId, changeNote: "Frage/Antworten bearbeitet (" + data.locale + ")", changedById: admin.id, snapshot: { text: data.text } });
  await audit({ action: "QUESTION_UPDATED", userId: admin.id, entityType: "Question", entityId: data.questionId });
  revalidatePath("/admin/questions");
  return { ok: true };
}

const examSettingsSchema = z.object({
  courseId: z.string().min(1),
  passPercentage: z.coerce.number().int().min(1).max(100),
  questionCount: z.coerce.number().int().min(5).max(200),
  maxAttempts: z.coerce.number().int().min(1).max(20),
  timeLimitMinutes: z.union([z.coerce.number().int().min(5).max(480), z.literal("").transform(() => null)]).nullable(),
});

export async function updateExamSettings(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const parsed = examSettingsSchema.safeParse({
    courseId: formData.get("courseId"),
    passPercentage: formData.get("passPercentage"),
    questionCount: formData.get("questionCount"),
    maxAttempts: formData.get("maxAttempts"),
    timeLimitMinutes: formData.get("timeLimitMinutes") || "",
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };

  await prisma.exam.update({
    where: { courseId: parsed.data.courseId },
    data: {
      passPercentage: parsed.data.passPercentage,
      questionCount: parsed.data.questionCount,
      maxAttempts: parsed.data.maxAttempts,
      timeLimitMinutes: parsed.data.timeLimitMinutes,
    },
  });
  await audit({ action: "COURSE_UPDATED", userId: admin.id, entityType: "Exam", entityId: parsed.data.courseId });
  revalidatePath("/admin/exams");
  return { ok: true };
}

const lessonSchema = z.object({
  lessonId: z.string().min(1),
  locale: z.string().min(2).max(5),
  title: z.string().min(3),
  goal: z.string().min(3),
  content: z.string().min(20),
  example: z.string().min(3),
  risk: z.string().min(3),
  memo: z.string().min(3),
});

export async function updateLesson(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const admin = await requireRole("SUPERADMIN");
  const parsed = lessonSchema.safeParse({
    lessonId: formData.get("lessonId"),
    locale: formData.get("locale") ?? "de",
    title: formData.get("title"),
    goal: formData.get("goal"),
    content: formData.get("content"),
    example: formData.get("example"),
    risk: formData.get("risk"),
    memo: formData.get("memo"),
  });
  if (!parsed.success) return { ok: false, error: "common.requiredField" };
  const d = parsed.data;

  try {
    assertCleanWording([d.title, d.goal, d.content, d.example, d.risk, d.memo].join(" "));
  } catch {
    return { ok: false, error: "Verbotene Formulierung — bitte umformulieren (siehe /legal-disclaimer)." };
  }

  await prisma.lessonTranslation.upsert({
    where: { lessonId_locale: { lessonId: d.lessonId, locale: d.locale } },
    update: { title: d.title, goal: d.goal, content: d.content, example: d.example, risk: d.risk, memo: d.memo },
    create: { lessonId: d.lessonId, locale: d.locale, title: d.title, goal: d.goal, content: d.content, example: d.example, risk: d.risk, memo: d.memo },
  });
  await prisma.lesson.update({ where: { id: d.lessonId }, data: { version: { increment: 1 } } });
  await recordRevision({ entityType: "LESSON", entityId: d.lessonId, changeNote: "Lektion bearbeitet (" + d.locale + "): " + d.title, changedById: admin.id });
  await audit({ action: "TRANSLATION_UPDATED", userId: admin.id, entityType: "Lesson", entityId: d.lessonId, metadata: { locale: d.locale } });
  revalidatePath("/admin/lessons");
  return { ok: true };
}
