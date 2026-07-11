import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { existsSync } from "fs";
import { join } from "path";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { pickTranslation } from "@/lib/content";
import { renderMaterialHtml } from "@/lib/certificate/material-html";

// Template-/Styleguide-Version des Handbuchs (Layout, global für alle Kurse).
const HANDBUCH_VERSION = "V2.1";

/**
 * Lernunterlagen als personalisierte Druckansicht (HTML → Strg + P ergibt sauberes A4-PDF).
 * Design: freigegebener Handbuch-Styleguide (lib/certificate/material-html.ts).
 * Kein Einmal-Download-Block mehr — der personalisierte Stempel (Name + Ausgabe-ID) schützt.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user?.id) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      translations: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          translations: true,
          lessons: {
            orderBy: { order: "asc" },
            include: {
              translations: true,
              miniChecks: { orderBy: { order: "asc" }, include: { translations: true } },
            },
          },
        },
      },
    },
  });
  if (!course) return NextResponse.json({ error: "Kurs nicht gefunden." }, { status: 404 });

  const locale = user.locale ?? "de";

  // Personalisierter Stempel gegen Weitergabe
  let recipientLabel = user.name ?? user.email;
  if (user.companyId) {
    const company = await prisma.company.findUnique({ where: { id: user.companyId }, select: { name: true } });
    if (company?.name) recipientLabel = `${user.name ?? user.email} · ${company.name}`;
  }
  const ausgabeId = user.id.slice(-8).toUpperCase();

  const modules = course.modules.map((mod) => ({
    order: mod.order,
    slug: mod.slug,
    title: pickTranslation(mod.translations, locale)?.title ?? mod.slug,
    heroUrl: existsSync(join(process.cwd(), "public", "modules", `${mod.slug}.png`))
      ? `/modules/${mod.slug}.png`
      : null,
    lessons: mod.lessons.map((lesson) => {
      const tr = pickTranslation(lesson.translations, locale);
      return {
        title: tr?.title ?? lesson.slug,
        goal: tr?.goal ?? "",
        content: tr?.content ?? "",
        example: tr?.example ?? "",
        risk: tr?.risk ?? "",
        memo: tr?.memo ?? "",
        miniChecks: lesson.miniChecks
          .map((mc) => {
            const mtr = pickTranslation(mc.translations, locale);
            return mtr ? { question: mtr.question, answer: mtr.answer } : null;
          })
          .filter((x): x is { question: string; answer: string } => x !== null),
      };
    }),
  }));

  const html = renderMaterialHtml({
    courseTitle: pickTranslation(course.translations, locale)?.title ?? course.slug,
    handbuchVersion: HANDBUCH_VERSION,
    // Inhaltsstand pro Kurs aus der DB (Course.version) — steigt bei Freigabe automatisch.
    contentVersion: `V1.${String(course.version).padStart(3, "0")}`,
    recipientLabel,
    ausgabeId,
    assets: {
      logoUrl: "/handbuch/logo-dunkel.png",
      mascotUrl: "/handbuch/mascot-hero.png",
      qrUrl: "/handbuch/qr-signup.png",
    },
    modules,
  });

  // Zugriff protokollieren (ohne zu blockieren)
  const hash = createHash("sha256").update(html).digest("hex");
  await prisma.materialDownload.upsert({
    where: { userId_courseId: { userId: user.id, courseId } },
    update: { downloadedAt: new Date(), pdfHash: hash },
    create: { userId: user.id, courseId, pdfHash: hash },
  });
  await audit({
    action: "REPORT_EXPORTED",
    userId: user.id,
    companyId: user.companyId,
    entityType: "MaterialDownload",
    entityId: courseId,
    metadata: { type: "Lernunterlagen-Druckansicht" },
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'inline; filename="lernunterlagen.html"',
      "Cache-Control": "no-store",
    },
  });
}
