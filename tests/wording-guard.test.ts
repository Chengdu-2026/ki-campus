import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { scanText, FORBIDDEN_PHRASES, assertCleanWording } from "@/lib/wording-guard";

describe("Wording-Guard Kernfunktion", () => {
  it("findet verbotene Formulierungen", () => {
    for (const phrase of FORBIDDEN_PHRASES) {
      expect(scanText(`Unser Kurs ist ${phrase} und großartig.`).length).toBeGreaterThan(0);
    }
  });
  it("erlaubt Verneinungen", () => {
    expect(scanText("Dies ist keine behördliche Zertifizierung und nicht staatlich anerkannt.")).toHaveLength(0);
    expect(scanText("Es handelt sich nicht um eine staatliche Zulassung.")).toHaveLength(0);
  });
  it("wirft bei Verstoß", () => {
    expect(() => assertCleanWording("Das Zertifikat ist EU-zertifiziert!")).toThrow();
  });
});

/** Scannt Quellcode, Seeds, Sprachdateien und Doku auf verbotene Begriffe. */
describe("Wording-Guard Repository-Scan", () => {
  const ROOT = join(__dirname, "..");
  const SCAN_DIRS = ["app", "components", "lib", "prisma/seed", "config", "docs"];
  const EXTENSIONS = [".ts", ".tsx", ".md"];
  const EXCLUDED_FILES = ["wording-guard.ts", "wording-guard.test.ts"];

  function collectFiles(dir: string): string[] {
    const result: string[] = [];
    let entries: string[] = [];
    try { entries = readdirSync(dir); } catch { return result; }
    for (const entry of entries) {
      const full = join(dir, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        if (entry === "node_modules" || entry === "generated") continue;
        result.push(...collectFiles(full));
      } else if (EXTENSIONS.some((ext) => entry.endsWith(ext)) && !EXCLUDED_FILES.includes(entry)) {
        result.push(full);
      }
    }
    return result;
  }

  it("enthält keine verbotenen Formulierungen in Code, Inhalten und Doku", () => {
    const files = SCAN_DIRS.flatMap((d) => collectFiles(join(ROOT, d)));
    expect(files.length).toBeGreaterThan(20);
    const violations: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const violation of scanText(text)) {
        violations.push(`${file}: "${violation.phrase}" — Kontext: ${violation.context.slice(0, 80)}`);
      }
    }
    expect(violations, violations.join("\n")).toHaveLength(0);
  });
});
