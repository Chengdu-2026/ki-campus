import { prisma } from "@/lib/prisma";

/**
 * IDs aller Firmen mit aktivem Testzugang.
 * Firmenuebergreifende (globale) Auswertungen muessen diese Firmen ausschliessen —
 * Bestehensquoten, Feedback- und QM-Statistik sollen nicht durch Testdaten verfaelscht werden.
 */
export async function testCompanyIds(): Promise<string[]> {
  const rows = await prisma.company.findMany({ where: { isTest: true }, select: { id: true } });
  return rows.map((r) => r.id);
}

/** Ist der Testzugang abgelaufen (Ablaufdatum ueberschritten)? Reine Logik — in Cron und Tests genutzt. */
export function isTestAccessExpired(
  company: { isTest: boolean; testExpiresAt: Date | null },
  now: Date = new Date(),
): boolean {
  return company.isTest && company.testExpiresAt !== null && company.testExpiresAt.getTime() < now.getTime();
}
