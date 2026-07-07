import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { appConfig } from "@/config/app";

function csv(rows: string[][]): string {
  const esc = (v: string) => (/[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return "﻿" + rows.map((r) => r.map(esc).join(";")).join("\n");
}

async function simplePdf(title: string, lines: string[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page = doc.addPage([595.28, 841.89]);
  let y = 800;
  page.drawText(title, { x: 40, y, size: 16, font: bold, color: rgb(0.04, 0.12, 0.25) });
  y -= 14;
  page.drawText(`${appConfig.appName} · erstellt ${new Date().toLocaleString("de-AT")} · QM-Nachweis (ISO-9001-Logik, keine Zertifizierungsgarantie)`, { x: 40, y, size: 8, font, color: rgb(0.4, 0.4, 0.45) });
  y -= 24;
  for (const raw of lines) {
    for (let i = 0; i < raw.length; i += 100) {
      if (y < 40) { page = doc.addPage([595.28, 841.89]); y = 800; }
      page.drawText(raw.slice(i, i + 100), { x: 40, y, size: 9, font, color: rgb(0.2, 0.22, 0.26) });
      y -= 13;
    }
  }
  return doc.save();
}

export async function GET(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !["COMPANY_ADMIN", "SUPERADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });
  }
  const scope = user.role === "SUPERADMIN" ? {} : { companyId: user.companyId ?? "__none__" };
  const format = new URL(req.url).searchParams.get("format") ?? "csv";
  const fmt = (d: Date | null | undefined) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  let rows: string[][] = [];
  let name = type;
  if (type === "feedback") {
    const data = await prisma.feedbackResponse.findMany({ where: scope, orderBy: { submittedAt: "desc" }, take: 2000 });
    rows = [["Datum", "Ø Bewertung", "NPS", "Sentiment", "Status", "Nachschulung gewünscht"],
      ...data.map((r) => [fmt(r.submittedAt), r.averageScore?.toFixed(2) ?? "", String(r.npsScore ?? ""), r.sentiment, r.status, r.needsRetraining ? "ja" : "nein"])];
    name = "FeedbackResponses";
  } else if (type === "issues") {
    const data = await prisma.qualityIssue.findMany({ where: scope, orderBy: { createdAt: "desc" }, take: 2000 });
    rows = [["Erstellt", "Titel", "Schwere", "Kategorie", "Status", "Frist", "Geschlossen"],
      ...data.map((i) => [fmt(i.createdAt), i.title, i.severity, i.category, i.status, fmt(i.dueDate), fmt(i.closedAt)])];
    name = "QualityIssues";
  } else if (type === "actions") {
    const data = await prisma.correctiveAction.findMany({ where: scope, orderBy: { createdAt: "desc" }, take: 2000 });
    rows = [["Erstellt", "Titel", "Status", "Frist", "Ursache", "Maßnahme", "Wirksamkeit"],
      ...data.map((a) => [fmt(a.createdAt), a.title, a.status, fmt(a.dueDate), a.rootCause ?? "", a.correctiveAction ?? "", a.effectivenessResult ?? ""])];
    name = "CorrectiveActions";
  } else if (type === "reviews") {
    const data = await prisma.managementReview.findMany({ where: scope, orderBy: { periodStart: "desc" }, take: 200 });
    rows = [["Zeitraum von", "bis", "Titel", "Status", "Feedback", "QM-Fälle", "Prüfungen", "Maßnahmen", "Entscheidungen"],
      ...data.map((r) => [fmt(r.periodStart), fmt(r.periodEnd), r.title, r.status, r.feedbackSummary ?? "", r.complaintSummary ?? "", r.examResultSummary ?? "", r.correctiveActionSummary ?? "", r.decisions ?? ""])];
    name = "ManagementReviews";
  } else {
    return NextResponse.json({ error: "Unbekannter Export." }, { status: 404 });
  }

  await audit({ action: "QM_REPORT_EXPORTED", userId: user.id, companyId: user.companyId, entityType: "QMExport", metadata: { type, format } });

  if (format === "pdf") {
    const lines = rows.map((r) => r.join(" | "));
    const pdf = await simplePdf(`QM-Report: ${name}`, lines);
    return new NextResponse(Buffer.from(pdf), {
      headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${name}.pdf"` },
    });
  }
  return new NextResponse(csv(rows), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}.csv"` },
  });
}
