/**
 * In-Memory Sliding-Window Rate-Limiter (fail-open).
 *
 * Zweck: Brute-Force-/Spam-Bremse für Login, Passwort-Reset und TOTP (Audit-Befund H2).
 * Bewusst einfach gehalten: Einzelinstanz-Zähler im Prozessspeicher. Für horizontal
 * skalierte Deployments (mehrere Node-Instanzen) muss der Speicher später durch einen
 * gemeinsamen Store (z. B. Redis) ersetzt werden — dieselbe API bleibt nutzbar.
 *
 * Grundsatz: NIEMALS legitime Nutzer aussperren. Jede unerwartete Ausnahme führt zu
 * "nicht limitiert" (fail-open). Login wird nur über FEHLversuche gezählt, erfolgreiche
 * Logins zählen nicht — so kann kein Nutzer sich selbst aussperren.
 */

const store = new Map<string, number[]>();
const MAX_KEYS = 10_000;

function pruned(key: string, windowStart: number): number[] {
  const hits = (store.get(key) ?? []).filter((t) => t > windowStart);
  return hits;
}

/** Liest, ob der Schlüssel das Limit im Fenster erreicht hat — ohne zu zählen. */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  try {
    const hits = pruned(key, Date.now() - windowMs);
    store.set(key, hits);
    return hits.length >= limit;
  } catch {
    return false; // fail-open
  }
}

/** Registriert einen Treffer (z. B. einen Fehlversuch). */
export function recordHit(key: string, windowMs: number): void {
  try {
    const now = Date.now();
    const hits = pruned(key, now - windowMs);
    hits.push(now);
    store.set(key, hits);
    if (store.size > MAX_KEYS) {
      // Opportunistische Bereinigung veralteter Buckets.
      const cutoff = now - windowMs;
      for (const [k, v] of store) {
        if (v.every((t) => t <= cutoff)) store.delete(k);
      }
    }
  } catch {
    /* fail-open */
  }
}

/** Setzt den Zähler zurück (z. B. nach erfolgreichem Login). */
export function clearHits(key: string): void {
  try {
    store.delete(key);
  } catch {
    /* ignore */
  }
}

/** Extrahiert die Client-IP aus Request-Headern (hinter Reverse-Proxy X-Forwarded-For). */
export function clientIp(req: Request | { headers: Headers } | null | undefined): string {
  try {
    const headers = (req as { headers?: Headers } | null)?.headers;
    if (!headers || typeof headers.get !== "function") return "unknown";
    const xff = headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return headers.get("x-real-ip") ?? "unknown";
  } catch {
    return "unknown";
  }
}
