import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { appConfig } from "@/config/app";

const NAVY = rgb(0.043, 0.122, 0.25);
const GRAY = rgb(0.35, 0.38, 0.42);

function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(" ")) {
      if ((line + " " + word).trim().length > max) { out.push(line.trim()); line = word; }
      else line += " " + word;
    }
    out.push(line.trim());
  }
  return out;
}

export interface MaterialLesson { module: string; title: string; goal: string; content: string; example: string; risk: string; memo: string; }

/** Lernunterlagen als personalisiertes PDF — Wasserzeichen mit Name/E-Mail auf jeder Seite. */
export async function generateMaterialPdf(params: {
  courseTitle: string; ownerName: string; ownerEmail: string; lessons: MaterialLesson[];
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const watermark = `Persönliches Exemplar: ${params.ownerName} · ${params.ownerEmail}`;

  let page = doc.addPage([595.28, 841.89]);
  let y = 800;
  const newPage = () => { page = doc.addPage([595.28, 841.89]); y = 800; stamp(); };
  const stamp = () => {
    page.drawText(watermark, { x: 40, y: 14, size: 7.5, font, color: GRAY });
    page.drawText(watermark, { x: 120, y: 320, size: 22, font, color: rgb(0.88, 0.9, 0.93), rotate: degrees(35) });
    page.drawText(`${appConfig.appName} · Nur für den persönlichen Gebrauch. Weitergabe nicht gestattet.`, { x: 40, y: 826, size: 7, font, color: GRAY });
  };
  const write = (text: string, size: number, f = font, color = GRAY, indent = 40) => {
    for (const line of wrap(text, Math.floor(500 / (size * 0.5)))) {
      if (y < 46) newPage();
      page.drawText(line, { x: indent, y, size, font: f, color });
      y -= size + 4;
    }
  };

  stamp();
  write(params.courseTitle, 18, bold, NAVY); y -= 8;
  write(`Lernunterlagen — ${params.ownerName}`, 11, font, GRAY); y -= 16;

  let currentModule = "";
  for (const lesson of params.lessons) {
    if (lesson.module !== currentModule) {
      currentModule = lesson.module;
      if (y < 120) newPage();
      y -= 10; write(currentModule, 14, bold, NAVY); y -= 6;
    }
    if (y < 100) newPage();
    write(lesson.title, 12, bold, NAVY); y -= 2;
    write(`Lernziel: ${lesson.goal}`, 9.5, font, GRAY); y -= 4;
    write(lesson.content, 9.5); y -= 4;
    write(`Praxisbeispiel: ${lesson.example}`, 9.5); y -= 4;
    write(`Risiko: ${lesson.risk}`, 9.5); y -= 4;
    write(`Merksatz: ${lesson.memo}`, 9.5, bold, NAVY); y -= 12;
  }
  return doc.save();
}
