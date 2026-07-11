// N4-Beweis: Zeichenlogik verbatim aus lib/certificate/pdf.ts (Z.34-194),
// t()/appConfig durch die echten Strings aus lib/i18n/de.ts + config/app.ts ersetzt,
// assertCleanWording als No-op (rein visueller Beweis). Erzeugt 2 PDFs: normal + Testzugang.
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire("/sessions/amazing-gifted-cray/mnt/KI-Kompetenz Basic nach Art. 4 AI Act/package.json");
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const QRCode = require("qrcode");

const cfg = {
  certificateIssuer: "Hainan Salzburg Consulting Co., Ltd.",
  appName: "KI-Kompetenz Campus",
  contactEmail: "info@ki-nachweis.at",
  websiteUrl: "https://www.hainan.at",
  contentResponsiblePerson: "Sascha Morocutti",
};
const S = {
  "certificate.title": "Zertifikat KI-Kompetenz nach Art. 4 EU AI Act",
  "certificate.subtitle": "Privater Schulungs- und Kompetenznachweis",
  "certificate.dataQrLabel": "Zertifikatsdaten",
  "certificate.birthDate": "Geburtsdatum",
  "certificate.scope": "Kursumfang",
  "certificate.scopeUnits": ({units}) => `${units} Unterrichtseinheiten`,
  "certificate.result": "Testergebnis",
  "certificate.resultText": ({percent}) => `bestanden mit ${percent} %`,
  "certificate.issuedAt": "Ausgestellt am",
  "certificate.validUntil": "Gültig bis",
  "certificate.unlimited": "unbefristet",
  "certificate.number": "Zertifikatsnummer",
  "certificate.contents": "Lerninhalte",
  "certificate.signature": "Für den Aussteller",
  "certificate.disclaimer": "Dieses Zertifikat bestätigt die erfolgreiche Teilnahme und den bestandenen Abschlusstest der Schulung. Es dient als privater Schulungs- und Kompetenznachweis zur Unterstützung der KI-Kompetenzpflicht nach Art. 4 der Verordnung (EU) 2024/1689. Es handelt sich nicht um eine staatliche Zulassung, behördliche Zertifizierung, EU-Akkreditierung oder ISO-Zertifizierung.",
  "certificate.authenticityHint": "Echtheit prüfen: QR-Code scannen und alle Angaben mit der offiziellen Prüfseite vergleichen — Abweichungen deuten auf eine Fälschung hin.",
  "certificate.aiNote": ({url}) => `Lerninhalte mit KI-Unterstützung erstellt und fachlich geprüft. Details: ${url}`,
  "certificate.testWatermark": "TESTZUGANG",
  "certificate.testBanner": "TESTZUGANG — kein gültiger Nachweis",
  "verify.title": "Zertifikatsprüfung",
};
const t = (k, p) => { const v = S[k]; return typeof v === "function" ? v(p) : v; };
const assertCleanWording = () => {};

const NAVY = rgb(0.043, 0.122, 0.25);
const CYAN = rgb(0.024, 0.714, 0.831);
const GRAY = rgb(0.35, 0.38, 0.42);
const LIGHT = rgb(0.94, 0.95, 0.97);

function wrapText(text, maxChars) {
  const words = text.split(" "); const lines = []; let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) { lines.push(current.trim()); current = word; }
    else { current += " " + word; }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

async function generateCertificatePdf(data) {
  const doc = await PDFDocument.create();
  const certTitle = t("certificate.title");
  doc.setTitle(certTitle); doc.setAuthor(cfg.certificateIssuer);
  doc.setProducer("ki-kompetenz-plattform"); doc.setCreator("ki-kompetenz-plattform");
  doc.setCreationDate(data.issuedAt); doc.setModificationDate(data.issuedAt);

  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderColor: NAVY, borderWidth: 2 });
  page.drawRectangle({ x: 30, y: 30, width: width - 60, height: height - 60, borderColor: CYAN, borderWidth: 0.8 });
  page.drawRectangle({ x: 30, y: height - 110, width: width - 60, height: 80, color: NAVY });
  page.drawText(cfg.certificateIssuer, { x: 50, y: height - 66, size: 13, font: bold, color: rgb(1,1,1) });
  page.drawText(cfg.appName, { x: 50, y: height - 86, size: 10, font, color: rgb(0.8,0.87,0.95) });

  const dataPayload = [
    "ZERTIFIKAT KI-KOMPETENZ (Art. 4 EU AI Act)",
    `Nr: ${data.certificateNumber}`, `Name: ${data.participantName}`,
    `Unternehmen: ${data.companyName}`, `Kurs: ${data.courseTitle}`,
    `Ergebnis: bestanden mit ${data.scorePercent} %`,
    `Ausgestellt: ${data.issuedAt.toLocaleDateString("de-AT")}`,
    `Aussteller: ${cfg.certificateIssuer} · ${cfg.contactEmail} · ${cfg.websiteUrl}`,
    `Echtheit pruefen: ${data.verifyUrl}`,
  ].join("\n");
  const dataQrUrl = await QRCode.toDataURL(dataPayload, { margin: 1, width: 300, errorCorrectionLevel: "M" });
  const dataQrImage = await doc.embedPng(Buffer.from(dataQrUrl.split(",")[1], "base64"));
  const dataQrSize = 74;
  page.drawRectangle({ x: width - 52 - dataQrSize, y: height - 122 - dataQrSize, width: dataQrSize + 8, height: dataQrSize + 8, color: rgb(1,1,1) });
  page.drawImage(dataQrImage, { x: width - 48 - dataQrSize, y: height - 118 - dataQrSize, width: dataQrSize, height: dataQrSize });
  page.drawText(t("certificate.dataQrLabel"), { x: width - 48 - dataQrSize, y: height - 130 - dataQrSize, size: 7, font, color: GRAY });

  let y = height - 160;
  const center = (text, size, f = font, color = NAVY) => {
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font: f, color });
  };
  center(certTitle, 22, bold); y -= 22;
  center(t("certificate.subtitle"), 12, font, GRAY); y -= 50;
  center(data.participantName, 26, bold); y -= 20;
  center(data.companyName, 12, font, GRAY); y -= 40;
  center(data.courseTitle, 14, bold); y -= 18;
  center(data.courseSubtitle, 10, font, GRAY); y -= 30;

  const line = (label, value) => {
    page.drawText(label, { x: 70, y, size: 10, font: bold, color: NAVY });
    page.drawText(value, { x: 240, y, size: 10, font, color: GRAY }); y -= 18;
  };
  line(t("certificate.scope"), t("certificate.scopeUnits", { units: data.teachingUnits }));
  line(t("certificate.result"), t("certificate.resultText", { percent: data.scorePercent }));
  line(t("certificate.issuedAt"), data.issuedAt.toLocaleDateString("de-AT"));
  line(t("certificate.validUntil"), data.validUntil ? data.validUntil.toLocaleDateString("de-AT") : t("certificate.unlimited"));
  line(t("certificate.number"), data.certificateNumber); y -= 8;

  page.drawText(t("certificate.contents"), { x: 70, y, size: 10, font: bold, color: NAVY }); y -= 16;
  const colX = [70, 310]; const perCol = Math.ceil(data.moduleTitles.length / 2);
  data.moduleTitles.forEach((title, i) => {
    const cx = colX[Math.floor(i / perCol)]; const cy = y - (i % perCol) * 14;
    const short = title.length > 44 ? title.slice(0, 42) + "…" : title;
    page.drawText("• " + short, { x: cx, y: cy, size: 8.5, font, color: GRAY });
  });
  y -= perCol * 14 + 24;

  const qrDataUrl = await QRCode.toDataURL(data.verifyUrl, { margin: 1, width: 220 });
  const qrImage = await doc.embedPng(Buffer.from(qrDataUrl.split(",")[1], "base64"));
  const qrSize = 92;
  page.drawImage(qrImage, { x: width - 70 - qrSize, y: 118, width: qrSize, height: qrSize });
  page.drawText(t("verify.title"), { x: width - 70 - qrSize, y: 106, size: 7.5, font, color: GRAY });

  page.drawLine({ start: { x: 70, y: 150 }, end: { x: 260, y: 150 }, thickness: 0.8, color: GRAY });
  page.drawText(t("certificate.signature"), { x: 70, y: 138, size: 8.5, font, color: GRAY });
  page.drawText(cfg.contentResponsiblePerson + ", " + cfg.certificateIssuer, { x: 70, y: 126, size: 8.5, font: bold, color: NAVY });

  const disclaimer = t("certificate.disclaimer"); assertCleanWording(disclaimer);
  page.drawRectangle({ x: 40, y: 44, width: width - 80, height: 56, color: LIGHT });
  wrapText(disclaimer, 96).forEach((row, i) => { page.drawText(row, { x: 50, y: 86 - i * 11, size: 7.5, font, color: GRAY }); });
  const authenticity = t("certificate.authenticityHint");
  page.drawText(authenticity.length > 130 ? authenticity.slice(0,128)+"…" : authenticity, { x: 70, y: 112, size: 7, font, color: GRAY });
  const aiNote = t("certificate.aiNote", { url: cfg.websiteUrl + "/ki-transparenz" });
  page.drawText(aiNote.length > 120 ? aiNote.slice(0,118)+"…" : aiNote, { x: 50, y: 36, size: 6.5, font, color: GRAY });

  // Testzugang sichtbar kennzeichnen (verbatim aus pdf.ts Z.164-175)
  if (data.isTest) {
    const banner = t("certificate.testBanner"); assertCleanWording(banner);
    page.drawText(t("certificate.testWatermark"), { x: width * 0.13, y: height * 0.33, size: 100, font: bold, color: rgb(0.85,0.15,0.15), opacity: 0.16, rotate: degrees(35) });
    const bw = bold.widthOfTextAtSize(banner, 11);
    page.drawRectangle({ x: (width - bw)/2 - 10, y: height - 132, width: bw + 20, height: 20, color: rgb(0.99,0.9,0.9) });
    page.drawText(banner, { x: (width - bw)/2, y: height - 127, size: 11, font: bold, color: rgb(0.7,0.09,0.09) });
  }
  return doc.save();
}

const base = {
  participantName: "Anna Beispiel", birthDate: null,
  companyName: "Musterfirma Handel GmbH",
  courseSlug: "ki-kompetenz-basic",
  courseTitle: "KI-Kompetenz Basic — Grundlagen nach Art. 4 EU AI Act",
  courseSubtitle: "Pflichtschulung KI-Kompetenz für alle Mitarbeitenden",
  teachingUnits: 6, issuedAt: new Date("2026-07-08T10:00:00Z"), validUntil: null,
  scorePercent: 88, certificateNumber: "CERT-2026-000123",
  verifyUrl: "http://localhost:3000/verify/DEMO-4b1e-uuid-proof",
  moduleTitles: ["Was ist KI und wie funktioniert sie","Der EU AI Act & Art. 4","Risiken, Bias & Halluzinationen","Datenschutz & DSGVO im KI-Einsatz","Transparenz & Kennzeichnung","KI-Tools, Freigabe & Schatten-KI"],
  locale: "de",
};

const normal = await generateCertificatePdf({ ...base, isTest: false });
writeFileSync("zertifikat-normal.pdf", Buffer.from(normal));
const test = await generateCertificatePdf({ ...base, isTest: true, certificateNumber: "CERT-2026-000124" });
writeFileSync("zertifikat-testzugang.pdf", Buffer.from(test));
console.log("OK normal bytes:", normal.length, "test bytes:", test.length);
