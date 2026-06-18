"use client";

import { useEffect, useMemo, useState } from "react";

type LiveAttempt = {
  attemptId: string;
  studentName: string;
  startedAt: string;
  completedAt: string | null;
  scoreCorrect: number | null;
  scoreTotal: number | null;
  answeredCount: number;
  totalQuestions: number;
  currentQuestionNumber: number | null;
  lastAnsweredQuestionNumber: number | null;
  lastActivityAt: string;
  livePhase: string | null;
  idleSeconds: number | null;
  activityState: "active" | "idle" | "completed";
};

type LiveResponse = {
  totalQuestions: number;
  attempts: LiveAttempt[];
  updatedAt: string;
  trackingMode?: "live" | "estimate";
  note?: string;
  error?: string;
};

function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatIdle(seconds: number | null) {
  if (seconds == null) return "-";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function stateClass(state: LiveAttempt["activityState"]) {
  if (state === "completed") {
    return "bg-emerald-100 text-emerald-800";
  }
  if (state === "idle") {
    return "bg-amber-100 text-amber-800";
  }
  return "bg-sky-100 text-sky-800";
}

function stateLabel(state: LiveAttempt["activityState"]) {
  if (state === "completed") return "Complete";
  if (state === "idle") return "Idle";
  return "Active now";
}

export function LiveAttemptMonitor({ worksheetId }: { worksheetId: string }) {
  const [data, setData] = useState<LiveResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const endpoint = useMemo(
    () => `/api/admin/worksheets/${worksheetId}/live`,
    [worksheetId]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        const payload = (await response.json()) as LiveResponse;

        if (cancelled) return;

        if (!response.ok || payload.error) {
          setError(payload.error ?? "Could not load live monitor.");
          return;
        }

        setData(payload);
        setError("");
      } catch {
        if (!cancelled) {
          setError("Could not load live monitor.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    const interval = setInterval(() => {
      void load();
    }, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [endpoint]);

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Live monitor
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Student activity without screenshare
          </h2>
        </div>
        {data?.updatedAt ? (
          <p className="text-xs text-slate-500">
            Updated {formatDateTime(data.updatedAt)}
          </p>
        ) : null}
      </div>

      {data?.trackingMode ? (
        <p className="text-xs text-slate-500">
          Tracking mode: {data.trackingMode === "live" ? "Live heartbeat" : "Estimated"}
        </p>
      ) : null}

      {data?.note ? (
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          {data.note}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading live attempt data...</p>
      ) : error ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </p>
      ) : !data || data.attempts.length === 0 ? (
        <p className="text-sm text-slate-500">No attempts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2 text-left">Student</th>
                <th className="px-3 py-2 text-left">State</th>
                <th className="px-3 py-2 text-left">Progress</th>
                <th className="px-3 py-2 text-left">Current question</th>
                <th className="px-3 py-2 text-left">Phase</th>
                <th className="px-3 py-2 text-left">Last submitted</th>
                <th className="px-3 py-2 text-left">Last activity</th>
                <th className="px-3 py-2 text-left">Started</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.attempts.map((attempt) => (
                <tr key={attempt.attemptId}>
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {attempt.studentName}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stateClass(
                        attempt.activityState
                      )}`}
                    >
                      {stateLabel(attempt.activityState)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {attempt.answeredCount}/{attempt.totalQuestions}
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {attempt.currentQuestionNumber
                      ? `Q${attempt.currentQuestionNumber}`
                      : "Finished"}
                  </td>
                  <td className="px-3 py-3 text-slate-600 capitalize">
                    {attempt.livePhase ?? "-"}
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {attempt.lastAnsweredQuestionNumber
                      ? `Q${attempt.lastAnsweredQuestionNumber}`
                      : "-"}
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {formatIdle(attempt.idleSeconds)}
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {formatDateTime(attempt.startedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
