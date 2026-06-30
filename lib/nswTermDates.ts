// NSW public-school term dates (Eastern division), used to drive tutoring
// subscription start dates and the "pause before the holidays" reminder.
//
// Source: NSW Department of Education official calendars
//   https://education.nsw.gov.au/schooling/calendars/2026
//   https://education.nsw.gov.au/schooling/calendars/future-and-past-nsw-term-and-vacation-dates
//
// `start` is the first day students attend; `end` is the last day of term.
// All dates are Sydney calendar dates (YYYY-MM-DD).
//
// ⚠️ Verify these against the official calendar each year and append future
// years here. School development days are baked into these student dates.

export type TermNumber = 1 | 2 | 3 | 4;

export type Term = {
  year: number;
  term: TermNumber;
  start: string; // first student day
  end: string; // last day of term
};

export const NSW_TERMS: Term[] = [
  { year: 2026, term: 1, start: "2026-02-02", end: "2026-04-02" },
  { year: 2026, term: 2, start: "2026-04-22", end: "2026-07-03" },
  { year: 2026, term: 3, start: "2026-07-21", end: "2026-09-25" },
  { year: 2026, term: 4, start: "2026-10-13", end: "2026-12-17" },
  { year: 2027, term: 1, start: "2027-01-28", end: "2027-04-09" },
  { year: 2027, term: 2, start: "2027-04-27", end: "2027-07-02" },
  { year: 2027, term: 3, start: "2027-07-19", end: "2027-09-24" },
  { year: 2027, term: 4, start: "2027-10-11", end: "2027-12-20" },
];

// ─── Date helpers (Sydney calendar dates, no DST math needed) ───────────────
//
// We treat each ISO date as UTC midnight purely for calendar arithmetic
// (adding days, weekday). Billing timestamps are pinned to 03:00 UTC, which is
// always mid-afternoon Monday in Sydney regardless of daylight saving, so a
// "Monday" anchor never slips to Sunday/Tuesday.

function toUtc(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

function isoOf(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const d = toUtc(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return isoOf(d);
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round(
    (toUtc(toIso).getTime() - toUtc(fromIso).getTime()) / 86_400_000,
  );
}

// Today's date in the Sydney timezone, as an ISO calendar date.
export function sydneyToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

// Monday of the week containing `iso` (weeks start Monday).
export function mondayOfWeek(iso: string): string {
  const dow = toUtc(iso).getUTCDay(); // 0=Sun … 6=Sat
  const diff = dow === 0 ? -6 : 1 - dow;
  return addDays(iso, diff);
}

// The first Monday on or after `iso` (returns `iso` itself if it is a Monday).
export function mondayOnOrAfter(iso: string): string {
  const dow = toUtc(iso).getUTCDay();
  const daysUntil = (1 - dow + 7) % 7;
  return addDays(iso, daysUntil);
}

export function isMonday(iso: string): boolean {
  return toUtc(iso).getUTCDay() === 1;
}

// Stripe billing-cycle anchor (unix seconds) for a Sydney Monday. Pinned to
// 03:00 UTC so it lands squarely on Monday afternoon Sydney time.
export function billingAnchorTimestamp(mondayIso: string): number {
  return Math.floor(new Date(`${mondayIso}T03:00:00Z`).getTime() / 1000);
}

// ─── Term + break queries ───────────────────────────────────────────────────

export type MondayInfo = {
  date: string; // ISO Monday
  inHoliday: boolean;
  termLabel: string | null; // e.g. "Term 3 2026", null if outside known terms
  isTermStartWeek: boolean; // the Monday of the week a term begins
  note: string; // short human description for the picker
};

// Classifies a Monday against the term calendar: which term it's in (if any),
// whether it falls in the school holidays, and whether it's a term-start week.
export function describeMonday(iso: string): MondayInfo {
  for (const t of NSW_TERMS) {
    // Cover the Monday of the start week too, even when the term's first student
    // day is a Tuesday/Wednesday — that Monday is the natural first billing day
    // for the term, not "holidays".
    const effectiveStart = mondayOfWeek(t.start);
    if (iso >= effectiveStart && iso <= t.end) {
      const isTermStartWeek = iso === effectiveStart;
      const termLabel = `Term ${t.term} ${t.year}`;
      return {
        date: iso,
        inHoliday: false,
        termLabel,
        isTermStartWeek,
        note: isTermStartWeek ? `${termLabel} starts this week` : termLabel,
      };
    }
  }
  for (const b of allBreaks()) {
    const breakEnd = b.nextTermStart ? addDays(b.nextTermStart, -1) : null;
    if (iso >= b.breakStart && (breakEnd === null || iso <= breakEnd)) {
      return {
        date: iso,
        inHoliday: true,
        termLabel: null,
        isTermStartWeek: false,
        note: "School holidays",
      };
    }
  }
  return {
    date: iso,
    inHoliday: false,
    termLabel: null,
    isTermStartWeek: false,
    note: "",
  };
}

// The next `count` Mondays on or after `from`, each annotated with its term /
// holiday status, so the admin can pick the first billing Monday.
export function upcomingMondays(
  count = 16,
  from: string = sydneyToday(),
): MondayInfo[] {
  const mondays: MondayInfo[] = [];
  let monday = mondayOnOrAfter(from);
  for (let i = 0; i < count; i += 1) {
    mondays.push(describeMonday(monday));
    monday = addDays(monday, 7);
  }
  return mondays;
}

export type UpcomingBreak = {
  label: string; // e.g. "Term 2 holidays"
  termEnd: string; // last day of the term before the break
  breakStart: string; // first day of the holidays
  nextTermStart: string | null; // first student day of the term after
};

// The breaks between consecutive terms, in date order.
function allBreaks(): UpcomingBreak[] {
  const sorted = [...NSW_TERMS].sort((a, b) => a.start.localeCompare(b.start));
  const breaks: UpcomingBreak[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    const term = sorted[i];
    const next = sorted[i + 1] ?? null;
    breaks.push({
      label: `Term ${term.term} ${term.year} holidays`,
      termEnd: term.end,
      breakStart: addDays(term.end, 1),
      nextTermStart: next ? next.start : null,
    });
  }
  return breaks;
}

// The next school break whose holidays begin within `withinDays` of `from`.
// Used to nudge the admin to pause weekly billing before the holidays.
export function nextBreakWithinDays(
  withinDays: number,
  from: string = sydneyToday(),
): UpcomingBreak | null {
  for (const b of allBreaks()) {
    if (b.breakStart <= from) continue; // already started / past
    const lead = daysBetween(from, b.breakStart);
    if (lead <= withinDays) return b;
    break; // breaks are ordered; the first future one is the soonest
  }
  return null;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toUtc(iso));
}
