"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { audit } from "@/lib/audit";

/** Lektion abschließen — nur für den eigenen Nutzer. */
export async function completeLesson(lessonId: string): Promise<void> {
  const user = await requireUser();
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, select: { id: true } });
  if (!lesson) throw new Error("Lektion nicht gefunden.");

  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: user.id, lessonId } },
    update: {},
    create: { userId: user.id, lessonId },
  });
  await audit({ action: "LESSON_COMPLETED", userId: user.id, companyId: user.companyId, entityType: "Lesson", entityId: lessonId });
  revalidatePath("/courses");
  revalidatePath("/dashboard");
}
