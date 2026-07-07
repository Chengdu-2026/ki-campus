import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { pickTranslation } from "@/lib/content";
import { generateMaterialPdf } from "@/lib/certificate/material-pdf";

/** Einmaliger Download der Lernunterlagen — personalisiert mit Wasserzeichen. */
export async function GET(_req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user?.id) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });

  const existing = await prisma.materialDownload.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  });
  if (existing) {
    return NextResponse.json(
      { error: `Die Lernunterlagen wurden bereits am ${existing.downloadedAt.toLocaleDateString("de-AT")} heruntergeladen. Der Download ist nur einmal möglich — bei Verlust wenden Sie sich an Ihren Administrator.` },
      { status: 403 }
    );
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      translations: true,
      modules: { orderBy: { order: "asc" }, include: { translations: true, lessons: { orderBy: { order: "asc" }, include: { translations: true } } } },
    },
  });
  if (!course) return NextResponse.json({ error: "Kurs nicht gefunden." }, { status: 404 });

  const locale = user.locale ?? "de";
  const lessons = course.modules.flatMap((mod) => {
    const modTitle = pickTranslation(mod.translations, locale)?.title ?? mod.slug;
    return mod.lessons.map((lesson) => {
      const tr = pickTranslation(lesson.translations, locale);
      return {
        module: `Modul ${mod.order}: ${modTitle}`,
        title: tr?.title ?? lesson.slug,
        goal: tr?.goal ?? "", content: tr?.content ?? "", example: tr?.example ?? "",
        risk: tr?.risk ?? "", memo: tr?.memo ?? "",
      };
    });
  });

  const pdf = await generateMaterialPdf({
    courseTitle: pickTranslation(course.translations, locale)?.title ?? course.slug,
    ownerName: user.name ?? user.email,
    ownerEmail: user.email,
    lessons,
  });
  const hash = createHash("sha256").update(pdf).digest("hex");
  await prisma.materialDownload.create({ data: { userId: user.id, courseId, pdfHash: hash } });
  await audit({ action: "REPORT_EXPORTED", userId: user.id, companyId: user.companyId, entityType: "MaterialDownload", entityId: courseId, metadata: { type: "Lernunterlagen", once: true } });

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="lernunterlagen.pdf"',
    },
  });
}
