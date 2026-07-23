"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { StudentNav } from "../../components/StudentNav";
import { supabase } from "../../../lib/supabaseClient";

type AssignedWorksheet = {
  id: string;
  title: string;
  share_token: string;
  due_at: string | null;
  status: string | null;
  created_at: string;
};

type AttemptRow = {
  id: string;
  worksheet_id: string;
  completed_at: string | null;
  score_correct: number | null;
  score_total: number | null;
  started_at: string;
};

type AttemptProgress = {
  answered: number;
  total: number | null;
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function WorksheetsPage() {
  const router = useRouter();
  const [worksheets, setWorksheets] = useState<AssignedWorksheet[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [attemptProgress, setAttemptProgress] = useState<
    Record<string, AttemptProgress>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  useEffect(() => {
    async function loadWorksheets() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        router.replace("/login");
        return;
      }

      const userEmail = session.user.email?.toLowerCase() ?? null;
      const [worksheetResult, attemptsResult] = await Promise.all([
        userEmail
          ? supabase
              .from("worksheets")
              .select("id, title, share_token, due_at, status, created_at")
              .eq("assigned_student_email", userEmail)
              .order("created_at", { ascending: false })
              .limit(50)
          : Promise.resolve({ data: null, error: null }),
        supabase
          .from("worksheet_attempts")
          .select(
            "id, worksheet_id, completed_at, score_correct, score_total, started_at"
          )
          .eq("user_id", session.user.id)
          .order("started_at", { ascending: false })
          .limit(50),
      ]);

      if (worksheetResult.error || attemptsResult.error) {
        setLoadError("We could not load your worksheets. Please try again.");
        setIsLoading(false);
        return;
      }

      const loadedWorksheets =
        (worksheetResult.data as AssignedWorksheet[] | null) ?? [];
      const loadedAttempts = (attemptsResult.data as AttemptRow[] | null) ?? [];
      setWorksheets(loadedWorksheets);
      setAttempts(loadedAttempts);

      const incompleteAttempts = loadedAttempts.filter(
        (attempt) => !attempt.completed_at
      );

      if (incompleteAttempts.length > 0) {
        const attemptIds = incompleteAttempts.map((attempt) => attempt.id);
        const worksheetIds = [
          ...new Set(
            incompleteAttempts.map((attempt) => attempt.worksheet_id)
          ),
        ];
        const [answersResult, questionsResult] = await Promise.all([
          supabase
            .from("worksheet_answers")
            .select("attempt_id, question_id")
            .in("attempt_id", attemptIds),
          supabase
            .from("worksheet_questions")
            .select("worksheet_id, question_id")
            .in("worksheet_id", worksheetIds),
        ]);

        const answeredByAttempt = new Map<string, Set<string>>();
        for (const row of (answersResult.data ?? []) as Array<{
          attempt_id: string;
          question_id: string;
        }>) {
          const questionIds =
            answeredByAttempt.get(row.attempt_id) ?? new Set<string>();
          questionIds.add(row.question_id);
          answeredByAttempt.set(row.attempt_id, questionIds);
        }

        const totalByWorksheet = new Map<string, number>();
        for (const row of (questionsResult.data ?? []) as Array<{
          worksheet_id: string;
        }>) {
          totalByWorksheet.set(
            row.worksheet_id,
            (totalByWorksheet.get(row.worksheet_id) ?? 0) + 1
          );
        }

        const progress: Record<string, AttemptProgress> = {};
        for (const attempt of incompleteAttempts) {
          progress[attempt.id] = {
            answered: answeredByAttempt.get(attempt.id)?.size ?? 0,
            total: totalByWorksheet.get(attempt.worksheet_id) ?? null,
          };
        }
        setAttemptProgress(progress);
      }

      setIsLoading(false);
    }

    void loadWorksheets();
  }, [router]);

  const latestAttemptByWorksheet = useMemo(() => {
    const latestAttempts = new Map<string, AttemptRow>();
    for (const attempt of attempts) {
      if (!latestAttempts.has(attempt.worksheet_id)) {
        latestAttempts.set(attempt.worksheet_id, attempt);
      }
    }
    return latestAttempts;
  }, [attempts]);

  const sortedWorksheets = useMemo(() => {
    function sortRank(worksheet: AssignedWorksheet): number {
      const attempt = latestAttemptByWorksheet.get(worksheet.id);
      if (attempt && !attempt.completed_at) return 0;
      if (!attempt) return 1;
      return 2;
    }

    return [...worksheets].sort((a, b) => {
      const rankDifference = sortRank(a) - sortRank(b);
      if (rankDifference !== 0) return rankDifference;
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });
  }, [latestAttemptByWorksheet, worksheets]);

  const assignedIds = useMemo(
    () => new Set(worksheets.map((worksheet) => worksheet.id)),
    [worksheets]
  );
  const sharedLinkAttempts = attempts.filter(
    (attempt) => !assignedIds.has(attempt.worksheet_id)
  );
  const inProgressCount = worksheets.filter((worksheet) => {
    const attempt = latestAttemptByWorksheet.get(worksheet.id);
    return !!attempt && !attempt.completed_at;
  }).length;
  const completedCount = worksheets.filter(
    (worksheet) =>
      !!latestAttemptByWorksheet.get(worksheet.id)?.completed_at
  ).length;
  const notStartedCount = worksheets.length - inProgressCount - completedCount;

  async function handleGenerateWorksheet() {
    setIsGenerating(true);
    setGenerateError("");

    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        router.replace("/login");
        return;
      }

      const response = await fetch("/api/worksheets/adaptive", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const payload = (await response.json().catch(() => ({}))) as {
        href?: string;
        error?: string;
      };

      if (!response.ok || !payload.href) {
        setGenerateError(
          payload.error ??
            "Could not generate a revision worksheet. Complete a quiz or diagnostic first."
        );
        setIsGenerating(false);
        return;
      }

      router.push(payload.href);
    } catch {
      setGenerateError("Could not generate a revision worksheet. Please try again.");
      setIsGenerating(false);
    }
  }

  return (
    <>
      <StudentNav />
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-6xl space-y-6">
          <header className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm md:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  Practice
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Your worksheets
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Start assigned practice, pick up where you left off, or review
                  your completed work.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleGenerateWorksheet()}
                disabled={isGenerating}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "Generating..." : "Generate revision worksheet"}
              </button>
            </div>
            {generateError ? (
              <p className="mt-4 text-sm text-red-200">{generateError}</p>
            ) : null}
          </header>

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm text-slate-600">Loading your worksheets...</p>
            </div>
          ) : loadError ? (
            <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-medium text-red-700">{loadError}</p>
            </div>
          ) : (
            <>
              <section
                aria-label="Worksheet summary"
                className="grid gap-4 sm:grid-cols-3"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ready to start
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums">
                    {notStartedCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    In progress
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-amber-900">
                    {inProgressCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Completed
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-emerald-900">
                    {completedCount}
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                {sortedWorksheets.length === 0 ? (
                  <div className="py-8 text-center">
                    <h2 className="text-xl font-bold">No worksheets yet</h2>
                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
                      Generate a personalised revision worksheet after completing
                      a lesson quiz or diagnostic.
                    </p>
                    <Link
                      href="/course"
                      className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Browse lessons
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedWorksheets.map((worksheet) => {
                      const attempt =
                        latestAttemptByWorksheet.get(worksheet.id) ?? null;
                      const isCompleted = !!attempt?.completed_at;
                      const isInProgress = !!attempt && !isCompleted;
                      const progress = attempt
                        ? attemptProgress[attempt.id]
                        : undefined;
                      const isPastDue =
                        !!worksheet.due_at &&
                        !isCompleted &&
                        new Date(worksheet.due_at) < new Date();
                      const worksheetHref =
                        isInProgress && attempt
                          ? `/worksheet/${worksheet.share_token}?attempt=${attempt.id}`
                          : `/worksheet/${worksheet.share_token}`;

                      return (
                        <article
                          key={worksheet.id}
                          className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                            isInProgress
                              ? "border-amber-300 bg-amber-50"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-semibold text-slate-950">
                                {worksheet.title}
                              </h2>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  isCompleted
                                    ? "bg-emerald-100 text-emerald-700"
                                    : isInProgress
                                      ? "bg-amber-200 text-amber-800"
                                      : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                {isCompleted
                                  ? "Completed"
                                  : isInProgress
                                    ? "In progress"
                                    : "Not started"}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                              {worksheet.due_at ? (
                                <span
                                  className={
                                    isPastDue ? "font-semibold text-red-600" : ""
                                  }
                                >
                                  Due {formatDate(worksheet.due_at)}
                                  {isPastDue ? " — overdue" : ""}
                                </span>
                              ) : (
                                <span>Added {formatDate(worksheet.created_at)}</span>
                              )}
                              {isCompleted && attempt ? (
                                <span className="font-semibold text-emerald-700">
                                  Score: {attempt.score_correct}/{attempt.score_total}
                                </span>
                              ) : null}
                              {isInProgress && progress ? (
                                <span className="font-semibold text-amber-700">
                                  {progress.total
                                    ? `${progress.answered} of ${progress.total} answered`
                                    : `${progress.answered} answered`}
                                </span>
                              ) : null}
                            </div>
                            {isInProgress && progress?.total ? (
                              <div className="mt-3 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-amber-200">
                                <div
                                  className="h-full rounded-full bg-amber-500"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      Math.round(
                                        (progress.answered / progress.total) * 100
                                      )
                                    )}%`,
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                          <Link
                            href={worksheetHref}
                            className={`inline-flex shrink-0 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
                              isInProgress
                                ? "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
                                : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            {isCompleted
                              ? "Review"
                              : isInProgress
                                ? "Resume worksheet"
                                : "Start worksheet"}
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                )}

                {sharedLinkAttempts.length > 0 ? (
                  <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    You also have {sharedLinkAttempts.length} worksheet attempt
                    {sharedLinkAttempts.length === 1 ? "" : "s"} from shared
                    links.
                  </p>
                ) : null}
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
}
