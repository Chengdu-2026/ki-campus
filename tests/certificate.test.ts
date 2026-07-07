import { describe, expect, it } from "vitest";
import { effectiveStatus } from "@/lib/certificate/issue";
import { newVerifyCode } from "@/lib/certificate/number";
import { generateCertificatePdf, hashPdf } from "@/lib/certificate/pdf";

describe("Zertifikatsstatus", () => {
  it("gültig ohne Ablaufdatum", () => {
    expect(effectiveStatus({ status: "VALID", validUntil: null })).toBe("VALID");
  });
  it("widerrufen schlägt alles", () => {
    expect(effectiveStatus({ status: "REVOKED", validUntil: null })).toBe("REVOKED");
  });
  it("abgelaufen nach validUntil", () => {
    expect(effectiveStatus({ status: "VALID", validUntil: new Date(Date.now() - 1000) })).toBe("EXPIRED");
    expect(effectiveStatus({ status: "VALID", validUntil: new Date(Date.now() + 86400000) })).toBe("VALID");
  });
});

describe("Verify-Code", () => {
  it("ist zufällig, lang und ohne Bindestriche", () => {
    const codes = new Set(Array.from({ length: 100 }, () => newVerifyCode()));
    expect(codes.size).toBe(100);
    for (const code of codes) {
      expect(code).toMatch(/^[0-9a-f]{32}$/);
    }
  });
});

describe("Zertifikat-PDF", () => {
  const data = {
    participantName: "Anna Beispiel",
    birthDate: new Date("1990-05-14T00:00:00Z"),
    companyName: "Musterfirma Handel GmbH",
    courseSlug: "ki-kompetenz-basic",
    courseTitle: "KI-Kompetenz Basic nach Art. 4 EU AI Act",
    courseSubtitle: "Privater Schulungs- und Kompetenznachweis",
    teachingUnits: 4,
    issuedAt: new Date("2026-07-06T10:00:00Z"),
    validUntil: null,
    scorePercent: 83,
    certificateNumber: "CERT-2026-000001",
    verifyUrl: "https://example.com/verify/abc123",
    moduleTitles: ["Einführung in KI", "Generative KI", "Datenschutz"],
    locale: "de",
  };

  it("erzeugt ein valides PDF (A4, %PDF-Header)", async () => {
    const bytes = await generateCertificatePdf(data);
    expect(bytes.length).toBeGreaterThan(1000);
    expect(String.fromCharCode(...bytes.slice(0, 5))).toBe("%PDF-");
  });

  it("ist deterministisch (stabiler Hash bei gleichen Daten)", async () => {
    const first = hashPdf(await generateCertificatePdf(data));
    const second = hashPdf(await generateCertificatePdf(data));
    expect(first).toBe(second);
  });
});
