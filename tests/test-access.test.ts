import { describe, expect, it } from "vitest";
import { isTestAccessExpired } from "@/lib/test-companies";
import { assertCleanWording } from "@/lib/wording-guard";
import { generateCertificatePdf, hashPdf } from "@/lib/certificate/pdf";
import { getT } from "@/lib/i18n";

describe("Testzugang-Ablauf (Cron-Logik)", () => {
  it("nicht abgelaufen ohne Ablaufdatum", () => {
    expect(isTestAccessExpired({ isTest: true, testExpiresAt: null })).toBe(false);
  });
  it("keine Test-Firma => nie abgelaufen", () => {
    expect(isTestAccessExpired({ isTest: false, testExpiresAt: new Date(Date.now() - 1000) })).toBe(false);
  });
  it("abgelaufen nach testExpiresAt, sonst nicht", () => {
    expect(isTestAccessExpired({ isTest: true, testExpiresAt: new Date(Date.now() - 1000) })).toBe(true);
    expect(isTestAccessExpired({ isTest: true, testExpiresAt: new Date(Date.now() + 86_400_000) })).toBe(false);
  });
});

describe("Testzugang-Kennzeichnung", () => {
  const t = getT("de");

  it("Kennzeichnungstexte sind rechtlich sauber (Wording-Guard)", () => {
    expect(() => assertCleanWording(t("certificate.testBanner"))).not.toThrow();
    expect(() => assertCleanWording(`${t("verify.test")} ${t("verify.testHint")}`)).not.toThrow();
    expect(t("certificate.testBanner")).toContain("kein gültiger Nachweis");
  });

  const base = {
    participantName: "Anna Beispiel",
    birthDate: null,
    companyName: "Testfirma GmbH",
    courseSlug: "ki-kompetenz-basic",
    courseTitle: "KI-Kompetenz Basic nach Art. 4 EU AI Act",
    courseSubtitle: "Privater Schulungs- und Kompetenznachweis",
    teachingUnits: 4,
    issuedAt: new Date("2026-07-06T10:00:00Z"),
    validUntil: null,
    scorePercent: 83,
    certificateNumber: "CERT-2026-000009",
    verifyUrl: "https://example.com/verify/x",
    moduleTitles: ["Einführung", "Datenschutz"],
    locale: "de",
  };

  it("Test-Zertifikat ist valides PDF und unterscheidet sich vom regulären", async () => {
    const normal = await generateCertificatePdf({ ...base });
    const test = await generateCertificatePdf({ ...base, isTest: true });
    expect(String.fromCharCode(...test.slice(0, 5))).toBe("%PDF-");
    expect(hashPdf(test)).not.toBe(hashPdf(normal));
  });
});
