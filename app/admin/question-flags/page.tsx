import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { updateFlagStatus } from "./actions";

export const metadata: Metadata = {
  title: "Question Flags | Nova Maths Admin",
};

type FlagRow = {
  id: string;
  source_id: string | null;
  reason: string;
  comment: string | null;
  student_answer: string | null;
  expected_answer_snapshot: string | null;
  marked_correct: boolean | null;
  prompt_snapshot: string | null;
  status: string;
  created_at: string;
};

const REASON_LABELS: Record<string, string> = {
  "wrong-answer": "Wrong answer",
  "confusing-question": "Confusing question",
  "typo-or-error": "Typo / error",
  "diagram-issue": "Diagram issue",
  other: "Other",
};

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "reviewed", label: "Reviewed" },
  { value: "dismissed", label: "Dismissed" },
  { value: "all", label: "All" },
];

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildUrl(status: string, reason: string): string {
  const p = new URLSearchParams({ status });
  if (reason) p.set("reason", reason);
  return `/admin/question-flags?${p}`;
}

export default async function AdminQuestionFlagsPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; reason?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const statusFilter = params?.status ?? "open";
  const reasonFilter = params?.reason ?? "";

  const showAll = statusFilter === "all";

  let query = supabaseAdmin
    .from("question_flags")
    .select(
      "id, source_id, reason, comment, student_answer, expected_answer_snapshot, marked_correct, prompt_snapshot, status, created_at"
    )
    .order("created_at", { ascending: false });

  if (!showAll) {
    query = query.eq("status", statusFilter);
  }
  if (reasonFilter) {
    query = query.eq("reason", reasonFilter);
  }

  const { data, error } = await query;
  const flags = (data as FlagRow[] | null) ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Question Flags
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Student-submitted issues with worksheet questions
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            ← Admin
          </Link>
        </header>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            Failed to load flags:{" "}
            {(error as { message?: string }).message ?? String(error)}
          </div>
        )}

        {/* Filters */}
        <div className="space-y-2">
          {/* Status filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-16">
              Status
            </span>
            {STATUS_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl(opt.value, reasonFilter)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  statusFilter === opt.value
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </Link>
            ))}
            <span className="ml-2 text-xs text-slate-400">
              {flags.length} flag{flags.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Reason filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 w-16">
              Reason
            </span>
            <Link
              href={buildUrl(statusFilter, "")}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                !reasonFilter
                  ? "border-slate-800 bg-slate-800 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              All reasons
            </Link>
            {Object.entries(REASON_LABELS).map(([value, label]) => (
              <Link
                key={value}
                href={buildUrl(statusFilter, value)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  reasonFilter === value
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Table */}
        {flags.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            No flags match the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Source ID</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Reason</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Student answer</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Expected answer</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">Correct?</th>
                  <th className="px-4 py-3 text-left">Prompt / Comment</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {flags.map((f) => {
                  const reviewAction = updateFlagStatus.bind(null, f.id, "reviewed");
                  const dismissAction = updateFlagStatus.bind(null, f.id, "dismissed");
                  const reopenAction = updateFlagStatus.bind(null, f.id, "open");

                  return (
                    <tr key={f.id} className="align-top hover:bg-slate-50">
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {fmtDate(f.created_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {f.source_id ? (
                          <Link
                            href={`/admin/questions?q=${encodeURIComponent(f.source_id)}`}
                            className="font-mono text-xs text-sky-700 underline decoration-sky-300 hover:text-sky-900"
                            title="View in question bank"
                          >
                            {f.source_id}
                          </Link>
                        ) : (
                          <span className="font-mono text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                        {REASON_LABELS[f.reason] ?? f.reason}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-600 whitespace-nowrap">
                        {f.student_answer ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {f.expected_answer_snapshot ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {f.marked_correct === true ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            yes
                          </span>
                        ) : f.marked_correct === false ? (
                          <span className="inline-flex rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                            no
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 max-w-xs text-slate-600">
                        {f.prompt_snapshot ? (
                          <details>
                            <summary className="cursor-pointer list-none text-xs text-slate-500 [&::-webkit-details-marker]:hidden hover:text-slate-800">
                              <span className="underline decoration-dotted">Prompt</span>
                            </summary>
                            <p className="mt-1 rounded-lg bg-slate-50 p-2 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                              {f.prompt_snapshot}
                            </p>
                          </details>
                        ) : null}
                        {f.comment ? (
                          <p className="mt-1 text-xs font-medium text-slate-800">
                            {f.comment}
                          </p>
                        ) : null}
                        {!f.comment && !f.prompt_snapshot ? (
                          <span className="text-slate-300">—</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            f.status === "open"
                              ? "bg-amber-100 text-amber-700"
                              : f.status === "reviewed"
                              ? "bg-emerald-100 text-emerald-700"
                              : f.status === "dismissed"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {f.status !== "reviewed" && (
                            <form action={reviewAction}>
                              <button
                                type="submit"
                                className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                              >
                                Reviewed
                              </button>
                            </form>
                          )}
                          {f.status !== "dismissed" && (
                            <form action={dismissAction}>
                              <button
                                type="submit"
                                className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                Dismiss
                              </button>
                            </form>
                          )}
                          {f.status !== "open" && (
                            <form action={reopenAction}>
                              <button
                                type="submit"
                                className="rounded border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
                              >
                                Reopen
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
