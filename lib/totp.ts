import { createHmac, randomBytes } from "crypto";
import { appConfig } from "@/config/app";

/**
 * TOTP nach RFC 6238 (SHA-1, 6 Stellen, 30 s) — kompatibel mit Google Authenticator,
 * Microsoft Authenticator, Authy u. a. Bewusst ohne Zusatzabhängigkeit implementiert.
 */

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateTotpSecret(): string {
  const bytes = randomBytes(20);
  let bits = 0;
  let value = 0;
  let secret = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      secret += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) secret += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return secret;
}

function base32Decode(secret: string): Buffer {
  const clean = secret.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of clean) {
    value = (value << 5) | BASE32_ALPHABET.indexOf(char);
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

export function totpCode(secret: string, timestampMs: number = Date.now(), stepSeconds = 30): string {
  const counter = Math.floor(timestampMs / 1000 / stepSeconds);
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", base32Decode(secret)).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    (((hmac[offset] & 0x7f) << 24) | (hmac[offset + 1] << 16) | (hmac[offset + 2] << 8) | hmac[offset + 3]) % 1_000_000;
  return String(code).padStart(6, "0");
}

/** Prüft den Code mit ±1 Zeitfenster (Uhrendrift). */
export function verifyTotp(secret: string, code: string, timestampMs: number = Date.now()): boolean {
  const normalized = code.replace(/\s/g, "");
  if (!/^\d{6}$/.test(normalized)) return false;
  for (const drift of [-1, 0, 1]) {
    if (totpCode(secret, timestampMs + drift * 30_000) === normalized) return true;
  }
  return false;
}

/** otpauth-URL für den QR-Code in Authenticator-Apps. */
export function totpUri(secret: string, accountEmail: string): string {
  const issuer = encodeURIComponent(appConfig.appName);
  const account = encodeURIComponent(accountEmail);
  return `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}
