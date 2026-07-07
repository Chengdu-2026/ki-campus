import { describe, expect, it } from "vitest";

// CSV-Escaping-Logik (identisch zu app/api/company/export/route.ts)
function csvEscape(value: string): string {
  if (/[";\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

describe("CSV-Export", () => {
  it("escapt Semikolons und Anführungszeichen", () => {
    expect(csvEscape("Müller; GmbH")).toBe('"Müller; GmbH"');
    expect(csvEscape('Er sagte "Hallo"')).toBe('"Er sagte ""Hallo"""');
  });
  it("lässt einfache Werte unverändert", () => {
    expect(csvEscape("Anna Beispiel")).toBe("Anna Beispiel");
  });
});
