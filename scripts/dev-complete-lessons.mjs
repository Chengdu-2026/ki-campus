/**
 * DEV-Hilfsskript: markiert für einen Nutzer alle Lektionen eines Kurses
 * (oder aller Kurse) als abgeschlossen, damit das Prüfungs-Gate freigibt.
 * NUR für lokale Tests — niemals gegen eine Produktivdatenbank ausführen.
 *
 * Aufruf:
 *   node scripts/dev-complete-lessons.mjs <email> [kursSlug]
 * Beispiele:
 *   node scripts/dev-complete-lessons.mjs sascha.morocutti@gmail.com richtig-prompten
 *   node scripts/dev-complete-lessons.mjs anna.beispiel@musterfirma.example
 */
import { createClient } from "@libsql/client";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { randomUUID } from "crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const url = rawUrl.startsWith("file:./") ? "file:" + join(root, "prisma", rawUrl.slice(7)) : rawUrl;

const email = process.argv[2];
const courseSlug = process.argv[3] ?? null;
if (!email) {
  console.error("Aufruf: node scripts/dev-complete-lessons.mjs <email> [kursSlug]");
  process.exit(1);
}

const db = createClient({ url });

const userRes = await db.execute({ sql: "SELECT id, email FROM User WHERE email = ?", args: [email] });
if (userRes.rows.length === 0) {
  console.error(`Kein Nutzer mit E-Mail ${email} gefunden.`);
  process.exit(1);
}
const userId = userRes.rows[0].id;

let lessonSql =
  "SELECT Lesson.id FROM Lesson JOIN Module ON Lesson.moduleId = Module.id JOIN Course ON Module.courseId = Course.id";
const args = [];
if (courseSlug) {
  lessonSql += " WHERE Course.slug = ?";
  args.push(courseSlug);
}
const lessons = await db.execute({ sql: lessonSql, args });
if (lessons.rows.length === 0) {
  console.error(courseSlug ? `Keine Lektionen für Kurs-Slug '${courseSlug}' gefunden.` : "Keine Lektionen gefunden.");
  process.exit(1);
}

let created = 0;
for (const row of lessons.rows) {
  const res = await db.execute({
    sql: "INSERT OR IGNORE INTO LessonProgress (id, userId, lessonId, completedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
    args: [randomUUID(), userId, row.id],
  });
  created += res.rowsAffected ?? 0;
}
console.log(
  `Fertig: ${lessons.rows.length} Lektionen${courseSlug ? ` (Kurs ${courseSlug})` : ""} für ${email} — ${created} neu markiert, Rest war schon erledigt. Prüfungs-Gate ist jetzt offen.`
);
