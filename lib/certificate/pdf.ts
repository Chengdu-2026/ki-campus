import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { createHash } from "crypto";
import { appConfig } from "@/config/app";
import { getT } from "@/lib/i18n";
import { assertCleanWording } from "@/lib/wording-guard";

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
  scorePercent: number;
  certificateNumber: string;
  verifyUrl: string;
  moduleTitles: string[];
  locale: string;
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

  // Daten-QR oben rechts: alle Kernangaben inkl. Aussteller — Gegencheck zur Prüfseite
  const dataPayload = [
    "ZERTIFIKAT KI-KOMPETENZ (Art. 4 EU AI Act)",
    `Nr: ${data.certificateNumber}`,
    `Name: ${data.participantName}`,
    data.birthDate ? `Geb.: ${data.birthDate.toLocaleDateString("de-AT")}` : null,
    `Unternehmen: ${data.companyName}`,
    `Kurs: ${data.courseTitle}`,
    `Ergebnis: bestanden mit ${data.scorePercent} %`,
    `Ausgestellt: ${data.issuedAt.toLocaleDateString("de-AT")}`,
    `Aussteller: ${appConfig.certificateIssuer} · ${appConfig.contactEmail} · ${appConfig.websiteUrl}`,
    `Echtheit pruefen: ${data.verifyUrl}`,
  ].filter((row): row is string => row !== null).join("\n");
  const dataQrUrl = await QRCode.toDataURL(dataPayload, { margin: 1, width: 300, errorCorrectionLevel: "M" });
  const dataQrImage = await doc.embedPng(Buffer.from(dataQrUrl.split(",")[1], "base64"));
  const dataQrSize = 74;
  page.drawRectangle({ x: width - 52 - dataQrSize, y: height - 122 - dataQrSize, width: dataQrSize + 8, height: dataQrSize + 8, color: rgb(1, 1, 1) });
  page.drawImage(dataQrImage, { x: width - 48 - dataQrSize, y: height - 118 - dataQrSize, width: dataQrSize, height: dataQrSize });
  page.drawText(t("certificate.dataQrLabel"), { x: width - 48 - dataQrSize, y: height - 130 - dataQrSize, size: 7, font, color: GRAY });

  let y = height - 160;
  const center = (text: string, size: number, f = font, color = NAVY) => {
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font: f, color });
  };

  center(certTitle, 22, bold);
  y -= 22;
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
  page.drawImage(qrImage, { x: width - 70 - qrSize, y: 118, width: qrSize, height: qrSize });
  page.drawText(t("verify.title"), { x: width - 70 - qrSize, y: 106, size: 7.5, font, color: GRAY });

  // Signaturfeld links unten
  page.drawLine({ start: { x: 70, y: 150 }, end: { x: 260, y: 150 }, thickness: 0.8, color: GRAY });
  page.drawText(t("certificate.signature"), { x: 70, y: 138, size: 8.5, font, color: GRAY });
  page.drawText(appConfig.contentResponsiblePerson + ", " + appConfig.certificateIssuer, {
    x: 70, y: 126, size: 8.5, font: bold, color: NAVY,
  });

  // Disclaimer unten
  const disclaimer = t("certificate.disclaimer");
  assertCleanWording(disclaimer);
  page.drawRectangle({ x: 40, y: 44, width: width - 80, height: 56, color: LIGHT });
  wrapText(disclaimer, 96).forEach((row, i) => {
    page.drawText(row, { x: 50, y: 86 - i * 11, size: 7.5, font, color: GRAY });
  });
  const authenticity = t("certificate.authenticityHint");
  page.drawText(authenticity.length > 130 ? authenticity.slice(0, 128) + "…" : authenticity, {
    x: 70, y: 112, size: 7, font, color: GRAY,
  });
  const aiNote = t("certificate.aiNote", { url: appConfig.websiteUrl + "/ki-transparenz" });
  page.drawText(aiNote.length > 120 ? aiNote.slice(0, 118) + "…" : aiNote, {
    x: 50, y: 36, size: 6.5, font, color: GRAY,
  });

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

export function hashPdf(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}
