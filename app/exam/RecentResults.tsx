"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { ExamAttemptRow } from "../api/exam/attempts/route";

/**
 * Shows a signed-in student's recent exam results on the exam list. Fetches its
 * own data so the list page can stay a server component; renders nothing if the
 * student isn't signed in or has no attempts.
 */
export function RecentResults() {
  const [attempts, setAttempts] = useState<ExamAttemptRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch("/api/exam/attempts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const json = (await res.json()) as { attempts: ExamAttemptRow[] };
        if (!cancelled) setAttempts(json.attempts);
      } catch {
        // ignore — widget is optional
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!attempts || attempts.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold text-slate-900">Your recent results</h2>
      <ul className="mt-3 divide-y divide-slate-100">
        {attempts.slice(0, 5).map((a, i) => (
          <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="text-slate-600">
              {new Date(a.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
              })}
            </span>
            <span className="font-medium text-slate-900">
              {a.band} · {a.marks_earned}/{a.marks_available} ({a.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
