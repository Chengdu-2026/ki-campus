import { PrismaClient } from "@/lib/generated/prisma/client";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveUrl(): string {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  // Prisma-Konvention: relative Pfade beziehen sich auf /prisma
  if (raw.startsWith("file:./")) {
    return "file:" + path.join(process.cwd(), "prisma", raw.slice(7));
  }
  return raw;
}

/**
 * PrismaClient mit libsql-Driver-Adapter (Rust-Engine-frei).
 * Lazy-Initialisierung: Die native libsql-Bindung wird erst beim ersten
 * Query geladen — nicht beim Import (wichtig für Build-Zeit).
 * Für PostgreSQL in Produktion: @prisma/adapter-pg — siehe docs/DEPLOYMENT.md.
 */
function createClient(): PrismaClient {
  // Lazy-Require: verhindert das Laden der nativen libsql-Bindung zur Build-Zeit.
  const req = eval("require") as NodeRequire;
  const { PrismaLibSQL } = req("@prisma/adapter-libsql") as typeof import("@prisma/adapter-libsql");
  return new PrismaClient({ adapter: new PrismaLibSQL({ url: resolveUrl() }) });
}

let client: PrismaClient | undefined = globalForPrisma.prisma;

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!client) {
      client = createClient();
      if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
    }
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
