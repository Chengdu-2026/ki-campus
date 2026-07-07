import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { generateCertificatePdf } from "@/lib/certificate/pdf";
import { appConfig } from "@/config/app";

export const dynamic = "force-dynamic";

/**
 * Öffentliches Muster-Zertifikat (Fantasiedaten) mit diagonalem
 * MUSTER-Wasserzeichen auf jeder Seite. Nutzt den echten PDF-Generator —
 * das Muster ist damit garantiert layoutidentisch zum Original.
 */
export async function GET() {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const pdfBytes = await generateCertificatePdf({
    participantName: "Max Mustermann",
    birthDate: null,
    companyName: "Musterfirma GmbH",
    courseSlug: "ki-kompetenz-basic",
    courseTitle: "KI-Kompetenz Basic nach Art. 4 EU AI Act",
    courseSubtitle: "Privater Schulungs- und Kompetenznachweis für den verantwortungsvollen Umgang mit KI im Unternehmen",
    teachingUnits: 6,
    issuedAt: new Date(),
    validUntil: null,
    scorePercent: 87,
    certificateNumber: `${appConfig.certificateNumberPrefix}-MUSTER-000000`,
    verifyUrl: `${appUrl}/musterzertifikat`,
    moduleTitles: [
      "Einführung in künstliche Intelligenz",
      "Generative KI und Large Language Models",
      "Datenschutz und vertrauliche Informationen",
      "EU AI Act Grundlagen",
      "… (im Original: alle Module des Kurses)",
    ],
    locale: appConfig.defaultLocale,
  });

  // MUSTER-Wasserzeichen diagonal über jede Seite stempeln
  const doc = await PDFDocument.load(pdfBytes);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    page.drawText("MUSTER", {
      x: width * 0.16,
      y: height * 0.32,
      size: 110,
      font,
      color: rgb(0.85, 0.15, 0.15),
      opacity: 0.16,
      rotate: degrees(35),
    });
  }
  const stamped = await doc.save();

  return new NextResponse(Buffer.from(stamped), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="musterzertifikat-ki-kompetenz.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
