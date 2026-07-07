import { describe, expect, it } from "vitest";
import { getT } from "@/lib/i18n";

describe("i18n", () => {
  it("liefert deutsche Übersetzungen", () => {
    const t = getT("de");
    expect(t("common.save")).toBe("Speichern");
  });
  it("ersetzt Platzhalter", () => {
    const t = getT("de");
    expect(t("dashboard.greeting", { name: "Anna" })).toContain("Anna");
  });
  it("fällt bei fehlendem Key auf den Key zurück", () => {
    const t = getT("de");
    expect(t("gibt.es.nicht")).toBe("gibt.es.nicht");
  });
  it("fällt bei unvollständiger Sprache auf Deutsch zurück", () => {
    const t = getT("en");
    expect(t("common.save")).toBe("Save");
    expect(t("exam.passed").length).toBeGreaterThan(5); // en fehlt -> de-Fallback
  });
  it("Zertifikats-Disclaimer enthält die Pflicht-Verneinungen", () => {
    const t = getT("de");
    const disclaimer = t("certificate.disclaimer");
    expect(disclaimer).toContain("privater Schulungs- und Kompetenznachweis");
    expect(disclaimer).toContain("nicht um eine staatliche Zulassung");
    expect(disclaimer).toContain("Verordnung (EU) 2024/1689");
    expect(disclaimer).toContain("ISO-Zertifizierung");
  });
  it("Zertifikatstitel je Kurs sind unterschiedlich", () => {
    const t = getT("de");
    expect(t("certificate.titleOfficer")).not.toBe(t("certificate.title"));
    expect(t("certificate.titleOfficer")).toContain("KI-Verantwortliche");
  });
});
