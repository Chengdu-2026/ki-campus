import { describe, expect, it } from "vitest";
import { generateTotpSecret, totpCode, verifyTotp, totpUri } from "@/lib/totp";

describe("TOTP (Google Authenticator)", () => {
  it("erzeugt Base32-Secrets mit ausreichender Länge", () => {
    const secret = generateTotpSecret();
    expect(secret.length).toBeGreaterThanOrEqual(32);
    expect(secret).toMatch(/^[A-Z2-7]+$/);
  });
  it("RFC-6238-Testvektor (SHA-1, T=59s => 287082)", () => {
    // Secret "12345678901234567890" in Base32:
    const secret = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";
    expect(totpCode(secret, 59_000)).toBe("287082");
    expect(totpCode(secret, 1111111109_000)).toBe("081804");
  });
  it("verifiziert gültige Codes inkl. ±30s Drift", () => {
    const secret = generateTotpSecret();
    const now = Date.now();
    expect(verifyTotp(secret, totpCode(secret, now), now)).toBe(true);
    expect(verifyTotp(secret, totpCode(secret, now - 30_000), now)).toBe(true);
    expect(verifyTotp(secret, totpCode(secret, now - 90_000), now)).toBe(false);
    expect(verifyTotp(secret, "000000", now)).toBe(false);
    expect(verifyTotp(secret, "abc", now)).toBe(false);
  });
  it("baut eine korrekte otpauth-URL", () => {
    const uri = totpUri("ABC234", "test@example.com");
    expect(uri).toContain("otpauth://totp/");
    expect(uri).toContain("secret=ABC234");
    expect(uri).toContain("digits=6");
  });
});
