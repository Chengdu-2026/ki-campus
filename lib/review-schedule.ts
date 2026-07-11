/**
 * Getakteter Review-Workflow (Styleguide/ROADMAP): reine, unit-testbare Logik.
 * Österreichische Feiertage (fix + Ostern-beweglich) + Werktags-Pacer „max. N/Tag,
 * nur Mo–Fr, keine Feiertage". KEIN DB-Zugriff hier — die Fälligkeit wird aus
 * ContentAuditItem.approvedAt abgeleitet (siehe app/admin/review-plan).
 */

function iso(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}
function addMonths(d: Date, months: number): Date {
  const x = new Date(d);
  x.setUTCMonth(x.getUTCMonth() + months);
  return x;
}
function dayOnly(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/** Ostersonntag (Anonymous-Gregorian-Algorithmus). */
function easterSunday(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

/** Gesetzliche Feiertage in Österreich (bundesweit) als ISO-Datumsmenge. */
export function austrianHolidays(year: number): Set<string> {
  const s = new Set<string>();
  const fixed: [number, number][] = [
    [1, 1], [1, 6], [5, 1], [8, 15], [10, 26], [11, 1], [12, 8], [12, 25], [12, 26],
  ];
  for (const [mo, day] of fixed) s.add(iso(new Date(Date.UTC(year, mo - 1, day))));
  const easter = easterSunday(year);
  s.add(iso(addDays(easter, 1)));   // Ostermontag
  s.add(iso(addDays(easter, 39)));  // Christi Himmelfahrt
  s.add(iso(addDays(easter, 50)));  // Pfingstmontag
  s.add(iso(addDays(easter, 60)));  // Fronleichnam
  return s;
}

/** Werktag = Montag–Freitag und kein österreichischer Feiertag. */
export function isWorkingDay(d: Date, holidays?: Set<string>): boolean {
  const wd = d.getUTCDay();
  if (wd === 0 || wd === 6) return false;
  const h = holidays ?? austrianHolidays(d.getUTCFullYear());
  return !h.has(iso(d));
}

/** n-tes Werktagsdatum ab `start` (n=0 → erster Werktag ab einschließlich start). */
export function workingDayAfter(start: Date, n: number): Date {
  let d = dayOnly(start);
  while (!isWorkingDay(d)) d = addDays(d, 1);
  for (let c = 0; c < n; c++) {
    d = addDays(d, 1);
    while (!isWorkingDay(d)) d = addDays(d, 1);
  }
  return d;
}

export interface ReviewInput {
  key: string;
  title: string;
  /** Datum der letzten Freigabe (aus ContentAuditItem.approvedAt); null = nie freigegeben. */
  lastApprovedAt: Date | null;
  /** true, wenn Inhalt geändert/nicht (mehr) freigegeben ist → sofort fällig. */
  needsReview: boolean;
}

export type ReviewState = "today" | "scheduled" | "current";

export interface ReviewPlanItem extends ReviewInput {
  dueDate: Date;
  overdue: boolean;
  state: ReviewState;
  /** Werktag, an dem die Prüfung eingeplant ist (today/scheduled); null bei 'current'. */
  scheduledDate: Date | null;
}

export interface ReviewPlanOptions {
  cycleMonths: number;
  maxPerDay: number;
  today?: Date;
}

/**
 * Verteilt fällige Einträge auf Werktage (max. `maxPerDay`, Feiertage übersprungen).
 * Fälligkeit = needsReview/nie-freigegeben → sofort; sonst approvedAt + cycleMonths.
 * Reine Funktion: gleiche Eingabe → gleiche Ausgabe (testbar).
 */
export function buildReviewPlan(items: ReviewInput[], opts: ReviewPlanOptions): ReviewPlanItem[] {
  const today = dayOnly(opts.today ?? new Date());
  const withDue = items.map((it) => {
    const dueDate = it.needsReview || !it.lastApprovedAt
      ? today
      : addMonths(dayOnly(it.lastApprovedAt), opts.cycleMonths);
    return { ...it, dueDate };
  });
  const due = withDue
    .filter((x) => x.dueDate.getTime() <= today.getTime())
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const notDue = withDue.filter((x) => x.dueDate.getTime() > today.getTime());

  const result: ReviewPlanItem[] = [];
  due.forEach((x, idx) => {
    const slot = workingDayAfter(today, Math.floor(idx / Math.max(1, opts.maxPerDay)));
    const isToday = iso(slot) === iso(today);
    result.push({
      ...x,
      overdue: x.dueDate.getTime() < today.getTime(),
      state: isToday ? "today" : "scheduled",
      scheduledDate: slot,
    });
  });
  notDue.forEach((x) =>
    result.push({ ...x, overdue: false, state: "current", scheduledDate: null }),
  );
  return result;
}
