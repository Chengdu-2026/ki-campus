/**
 * Legt das SQLite-Schema aus prisma/init.sql an.
 * Alternative zu `prisma db push` für Umgebungen ohne Zugriff auf binaries.prisma.sh.
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const url = rawUrl.startsWith("file:./") ? "file:" + join(root, "prisma", rawUrl.slice(7)) : rawUrl;

const client = createClient({ url });
const sql = readFileSync(join(root, "prisma", "init.sql"), "utf8");
const cleaned = sql
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n");
const statements = cleaned
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const stmt of statements) {
  await client.execute(stmt);
}
console.log(`DB initialisiert (${statements.length} Statements): ${url}`);
client.close();
