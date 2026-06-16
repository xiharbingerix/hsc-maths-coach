"use client";

import Link from "next/link";
import {
  computeStudyStreak,
  streakMessage,
} from "../../lib/retention/studyStreak";

/**
 * Dashboard study-streak + daily-goal nudge. Computed client-side from activity
 * timestamps the dashboard already loads — no extra requests or storage.
 */
export function StreakCard({
  activityTimestamps,
  continueHref,
}: {
  activityTimestamps: Array<string | null | undefined>;
  continueHref: string;
}) {
  const streak = computeStudyStreak(activityTimestamps);

  const tone = streak.activeToday
    ? "border-green-200 bg-green-50"
    : streak.atRisk
      ? "border-amber-200 bg-amber-50"
      : "border-slate-200 bg-white";

  return (
    <section
      className={`flex flex-col gap-4 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between ${tone}`}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm"
          aria-hidden="true"
        >
          {streak.current > 0 ? "🔥" : "✨"}
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            {streak.current > 0
              ? `${streak.current}-day streak`
              : "Start your streak"}
          </p>
          <p className="mt-0.5 text-sm text-slate-600">
            {streakMessage(streak)}
          </p>
          {streak.longest > 1 && (
            <p className="mt-0.5 text-xs text-slate-500">
              Best: {streak.longest} days
            </p>
          )}
        </div>
      </div>

      {!streak.activeToday && (
        <Link
          href={continueHref}
          className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
        >
          {streak.current > 0 ? "Keep the streak →" : "Study today →"}
        </Link>
      )}
    </section>
  );
}
