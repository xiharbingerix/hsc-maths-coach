/**
 * Study-streak + daily-goal logic.
 *
 * Pure and dependency-free — computed from activity timestamps the dashboard
 * already loads (mastery history, worksheet attempts, diagnostics, lesson
 * progress). No new storage or migration. "A day" is a calendar date; the streak
 * is the run of consecutive days ending today (or yesterday, if nothing yet
 * today — so an unbroken streak doesn't visually "drop" until a day is missed).
 */

export type StudyStreak = {
  current: number;
  longest: number;
  activeToday: boolean;
  /** True when the streak is alive but today hasn't been logged yet. */
  atRisk: boolean;
};

function toDayNumber(iso: string): number | null {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  // Days since epoch in the runtime's local timezone.
  const d = new Date(t);
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

function todayNumber(now: number): number {
  const d = new Date(now);
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

export function computeStudyStreak(
  activityTimestamps: Array<string | null | undefined>,
  now: number = Date.now()
): StudyStreak {
  const days = new Set<number>();
  for (const ts of activityTimestamps) {
    if (!ts) continue;
    const day = toDayNumber(ts);
    if (day !== null) days.add(day);
  }

  if (days.size === 0) {
    return { current: 0, longest: 0, activeToday: false, atRisk: false };
  }

  const today = todayNumber(now);
  const activeToday = days.has(today);

  // Current streak: count back from today (or yesterday if today not yet logged).
  let current = 0;
  let cursor = activeToday ? today : today - 1;
  while (days.has(cursor)) {
    current += 1;
    cursor -= 1;
  }

  // Longest streak across all recorded days.
  const sorted = [...days].sort((a, b) => a - b);
  let longest = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i] === sorted[i - 1] + 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }

  return {
    current,
    longest: Math.max(longest, current),
    activeToday,
    atRisk: current > 0 && !activeToday,
  };
}

/** Short motivational line for the dashboard card. */
export function streakMessage(streak: StudyStreak): string {
  if (streak.current === 0) {
    return "Do one lesson or quiz today to start a streak.";
  }
  if (streak.activeToday) {
    return `You've studied today — ${streak.current}-day streak. Keep it going!`;
  }
  return `You're on a ${streak.current}-day streak. Study today to keep it alive.`;
}
