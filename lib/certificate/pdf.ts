import { PDFDocument, StandardFonts, rgb, degrees, type PDFPage, type PDFFont, type Color } from "pdf-lib";
import QRCode from "qrcode";
import { createHash } from "crypto";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { assertCleanWording } from "@/lib/wording-guard";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface CertificatePdfData {
  participantName: string;
  birthDate: Date | null;
  companyName: string;
  /** Kurs-Slug: bestimmt den kursabhängigen Zertifikatstitel (config/app.ts). */
  courseSlug: string;
  courseTitle: string;
  courseSubtitle: string;
  teachingUnits: number;
  issuedAt: Date;
  validUntil: Date | null;
  /** Auffrischung: gesetzt, sobald der Auffrischungstest bestanden wurde (dann validUntil = +2 Jahre). */
  refreshedAt?: Date | null;
  scorePercent: number;
  certificateNumber: string;
  verifyUrl: string;
  moduleTitles: string[];
  locale: string;
  /** Testzugang: sichtbar als "TESTZUGANG — kein gueltiger Nachweis" kennzeichnen. */
  isTest?: boolean;
}

const NAVY = rgb(0.043, 0.122, 0.25);
const CYAN = rgb(0.024, 0.714, 0.831);
const GRAY = rgb(0.35, 0.38, 0.42);
const LIGHT = rgb(0.94, 0.95, 0.97);

/** Erzeugt das A4-Zertifikat deterministisch aus DB-Daten. Immer heller Hintergrund (druckfreundlich). */
export async function generateCertificatePdf(data: CertificatePdfData): Promise<Uint8Array> {
  const t = getT(data.locale);

  const doc = await PDFDocument.create();
  // Kursabhängiger Zertifikatstitel (Fallback: certificate.title)
  const certTitle = t(appConfig.courseCertificateTitleKeys[data.courseSlug] ?? "certificate.title");
  // Deterministische Metadaten => stabiler pdfHash
  doc.setTitle(certTitle);
  doc.setAuthor(appConfig.certificateIssuer);
  doc.setProducer("ki-kompetenz-plattform");
  doc.setCreator("ki-kompetenz-plattform");
  doc.setCreationDate(data.issuedAt);
  doc.setModificationDate(data.issuedAt);

  const page = doc.addPage([595.28, 841.89]); // A4 Hochformat
  const { width, height } = page.getSize();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Rahmen
  page.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderColor: NAVY, borderWidth: 2 });
  page.drawRectangle({ x: 30, y: 30, width: width - 60, height: height - 60, borderColor: CYAN, borderWidth: 0.8 });

  // Kopf
  page.drawRectangle({ x: 30, y: height - 110, width: width - 60, height: 80, color: NAVY });
  page.drawText(appConfig.certificateIssuer, { x: 50, y: height - 66, size: 13, font: bold, color: rgb(1, 1, 1) });
  page.drawText(appConfig.appName, { x: 50, y: height - 86, size: 10, font, color: rgb(0.8, 0.87, 0.95) });

  // Firmenlogo rechts in der Kopfzeile (optional — blendet auf Navy)
  const logoPath = join(process.cwd(), "public", "images", "KI-Kompetenz-Logo-dunkel.png");
  if (existsSync(logoPath)) {
    const logo = await doc.embedPng(readFileSync(logoPath));
    const ls = 58;
    page.drawImage(logo, { x: width - 34 - ls, y: height - 104, width: ls, height: ls });
  }
  // Maskottchen als großes, dezentes Wasserzeichen (hinter dem Inhalt)
  const owlPath = join(process.cwd(), "public", "images", "mascot-hero.png");
  if (existsSync(owlPath)) {
    const owl = await doc.embedPng(readFileSync(owlPath));
    const ow = 430;
    const oh = (owl.height / owl.width) * ow;
    page.drawImage(owl, { x: (width - ow) / 2 + 28, y: (height - oh) / 2 - 30, width: ow, height: oh, opacity: 0.11 });
  }

  // Daten-QR oben rechts: alle Kernangaben inkl. Aussteller — Gegencheck zur Prüfseite
  const dataPayload = [
    "BESCHEINIGUNG KI-KOMPETENZ (Art. 4 EU AI Act)",
    `Nr: ${data.certificateNumber}`,
    `Name: ${data.participantName}`,
    data.birthDate ? `Geb.: ${data.birthDate.toLocaleDateString("de-AT")}` : null,
    `Unternehmen: ${data.companyName}`,
    `Kurs: ${data.courseTitle}`,
    `Ergebnis: bestanden mit ${data.scorePercent} %`,
    `Ausgestellt: ${data.issuedAt.toLocaleDateString("de-AT")}`,
    data.validUntil ? `Gueltig bis: ${data.validUntil.toLocaleDateString("de-AT")}` : null,
    data.refreshedAt ? `Aufgefrischt: ${data.refreshedAt.toLocaleDateString("de-AT")}` : null,
    `Aussteller: ${appConfig.certificateIssuer} · ${appConfig.contactEmail} · ${appConfig.websiteUrl}`,
    `Echtheit pruefen: ${data.verifyUrl}`,
  ].filter((row): row is string => row !== null).join("\n");
  const dataQrUrl = await QRCode.toDataURL(dataPayload, { margin: 1, width: 300, errorCorrectionLevel: "M" });
  const dataQrImage = await doc.embedPng(Buffer.from(dataQrUrl.split(",")[1], "base64"));
  const dataQrSize = 74;
  // Daten-QR ~3 cm tiefer (weg vom Titel, in den rechten Freiraum neben Name/Unternehmen)
  page.drawRectangle({ x: width - 52 - dataQrSize, y: height - 207 - dataQrSize, width: dataQrSize + 8, height: dataQrSize + 8, color: rgb(1, 1, 1) });
  page.drawImage(dataQrImage, { x: width - 48 - dataQrSize, y: height - 203 - dataQrSize, width: dataQrSize, height: dataQrSize });
  page.drawText(t("certificate.dataQrLabel"), { x: width - 48 - dataQrSize, y: height - 215 - dataQrSize, size: 7, font, color: GRAY });

  let y = height - 160;
  const center = (text: string, size: number, f = font, color = NAVY) => {
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font: f, color });
  };

  // Titel „Bescheinigung …" zweizeilig, zentriert (wrap nach Breite)
  for (const titleLine of wrapText(certTitle, 34)) { center(titleLine, 20, bold); y -= 23; }
  y += 1;
  center(t("certificate.subtitle"), 12, font, GRAY);
  y -= 50;

  center(data.participantName, 26, bold);
  y -= 20;
  center(data.companyName, 12, font, GRAY);
  y -= 40;

  center(data.courseTitle, 14, bold);
  y -= 18;
  center(data.courseSubtitle, 10, font, GRAY);
  y -= 30;

  const line = (label: string, value: string) => {
    page.drawText(label, { x: 70, y, size: 10, font: bold, color: NAVY });
    page.drawText(value, { x: 240, y, size: 10, font, color: GRAY });
    y -= 18;
  };
  if (data.birthDate) {
    line(t("certificate.birthDate"), data.birthDate.toLocaleDateString("de-AT"));
  }
  line(t("certificate.scope"), t("certificate.scopeUnits", { units: data.teachingUnits }));
  line(t("certificate.result"), t("certificate.resultText", { percent: data.scorePercent }));
  line(t("certificate.issuedAt"), data.issuedAt.toLocaleDateString("de-AT"));
  line(
    t("certificate.validUntil"),
    data.validUntil ? data.validUntil.toLocaleDateString("de-AT") : t("certificate.unlimited")
  );
  // Jährliche Verlängerung: Datum, sobald erfolgt — sonst leeres Feld zum Eintragen
  page.drawText(t("certificate.refresh"), { x: 70, y, size: 10, font: bold, color: NAVY });
  if (data.refreshedAt) {
    page.drawText(t("certificate.refreshedOn", { date: data.refreshedAt.toLocaleDateString("de-AT") }), {
      x: 240, y, size: 10, font, color: GRAY,
    });
  } else {
    page.drawLine({ start: { x: 240, y: y - 2 }, end: { x: 380, y: y - 2 }, thickness: 0.6, color: GRAY });
  }
  y -= 18;
  line(t("certificate.number"), data.certificateNumber);
  y -= 8;

  // Lerninhalte kompakt (zweispaltig)
  page.drawText(t("certificate.contents"), { x: 70, y, size: 10, font: bold, color: NAVY });
  y -= 16;
  const colX = [70, 310];
  const perCol = Math.ceil(data.moduleTitles.length / 2);
  data.moduleTitles.forEach((title, i) => {
    const cx = colX[Math.floor(i / perCol)];
    const cy = y - (i % perCol) * 14;
    const short = title.length > 44 ? title.slice(0, 42) + "…" : title;
    page.drawText("• " + short, { x: cx, y: cy, size: 8.5, font, color: GRAY });
  });
  y -= perCol * 14 + 24;

  // QR-Code rechts unten
  const qrDataUrl = await QRCode.toDataURL(data.verifyUrl, { margin: 1, width: 220 });
  const qrImage = await doc.embedPng(Buffer.from(qrDataUrl.split(",")[1], "base64"));
  const qrSize = 92;
  // Verify-QR ~1,5 cm höher (weg von der Echtheits-/Disclaimer-Zeile)
  page.drawImage(qrImage, { x: width - 70 - qrSize, y: 160.5, width: qrSize, height: qrSize });
  page.drawText(t("verify.title"), { x: width - 70 - qrSize, y: 148.5, size: 7.5, font, color: GRAY });

  // Signaturfeld links unten
  page.drawLine({ start: { x: 70, y: 150 }, end: { x: 260, y: 150 }, thickness: 0.8, color: GRAY });
  page.drawText(t("certificate.signature"), { x: 70, y: 138, size: 8.5, font, color: GRAY });
  page.drawText(appConfig.contentResponsiblePerson + ", " + appConfig.certificateIssuer, {
    x: 70, y: 126, size: 8.5, font: bold, color: NAVY,
  });

  // Disclaimer unten
  const disclaimer = t("certificate.disclaimer");
  assertCleanWording(disclaimer);
  // Rechtlicher Fußbereich — alles in EINEM Kasten; Fließtext im Blocksatz über die volle Breite
  page.drawRectangle({ x: 34, y: 44, width: width - 68, height: 78, color: LIGHT });
  const boxTextX = 44;
  const boxMaxWidth = width - 34 - boxTextX - 6; // rechte Innenkante des Kastens
  const authenticity = t("certificate.authenticityHint");
  drawJustified(page, authenticity, { x: boxTextX, y: 112, size: 6.8, font, color: GRAY, maxWidth: boxMaxWidth, lineGap: 9 });
  drawJustified(page, disclaimer, { x: boxTextX, y: 101, size: 6.5, font, color: GRAY, maxWidth: boxMaxWidth, lineGap: 9 });
  // ISO-9001-orientierte Dokumentenlenkung (Revisions-/Dokumentnummer) — klein
  page.drawText(
    `Dokumentenlenkung (ISO-9001-orientiert) · Rev. ${appConfig.contentVersionLabel} · Nr. ${data.certificateNumber} · Stand ${data.issuedAt.toLocaleDateString("de-AT")}`,
    { x: boxTextX, y: 71, size: 6, font, color: GRAY },
  );
  const aiNote = t("certificate.aiNote", { url: appConfig.websiteUrl + "/ki-transparenz" });
  page.drawText(aiNote.length > 170 ? aiNote.slice(0, 168) + "…" : aiNote, {
    x: boxTextX, y: 55, size: 6.5, font, color: GRAY,
  });

  // Testzugang sichtbar kennzeichnen: diagonaler Stempel + Klartext-Banner unter dem Kopf.
  if (data.isTest) {
    const banner = t("certificate.testBanner");
    assertCleanWording(banner);
    page.drawText(t("certificate.testWatermark"), {
      x: width * 0.13, y: height * 0.33, size: 100, font: bold,
      color: rgb(0.85, 0.15, 0.15), opacity: 0.16, rotate: degrees(35),
    });
    const bw = bold.widthOfTextAtSize(banner, 11);
    page.drawRectangle({ x: (width - bw) / 2 - 10, y: height - 132, width: bw + 20, height: 20, color: rgb(0.99, 0.9, 0.9) });
    page.drawText(banner, { x: (width - bw) / 2, y: height - 127, size: 11, font: bold, color: rgb(0.7, 0.09, 0.09) });
  }

  return doc.save();
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current += " " + word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

/**
 * Zeichnet Fließtext im Blocksatz (justiert) über die volle Breite. Umbruch nach
 * gemessener Wortbreite; jede Zeile außer der letzten wird auf maxWidth gedehnt.
 * Einzelwort-Zeilen und die letzte Zeile bleiben linksbündig.
 */
function drawJustified(
  page: PDFPage,
  text: string,
  opts: { x: number; y: number; size: number; font: PDFFont; color: Color; maxWidth: number; lineGap: number },
): number {
  const { x, y, size, font, color, maxWidth, lineGap } = opts;
  const words = text.split(" ");
  const spaceW = font.widthOfTextAtSize(" ", size);
  const lines: { words: string[]; width: number }[] = [];
  let cur: string[] = [];
  let curW = 0;
  for (const w of words) {
    const ww = font.widthOfTextAtSize(w, size);
    if (cur.length && curW + spaceW + ww > maxWidth) {
      lines.push({ words: cur, width: curW });
      cur = [w];
      curW = ww;
    } else {
      curW = cur.length ? curW + spaceW + ww : ww;
      cur.push(w);
    }
  }
  if (cur.length) lines.push({ words: cur, width: curW });
  let yy = y;
  lines.forEach((ln, i) => {
    const isLast = i === lines.length - 1;
    if (isLast || ln.words.length === 1) {
      page.drawText(ln.words.join(" "), { x, y: yy, size, font, color });
    } else {
      const extra = (maxWidth - ln.width) / (ln.words.length - 1);
      let cx = x;
      ln.words.forEach((w) => {
        page.drawText(w, { x: cx, y: yy, size, font, color });
        cx += font.widthOfTextAtSize(w, size) + spaceW + extra;
      });
    }
    yy -= lineGap;
  });
  return yy;
}

export function hashPdf(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}
