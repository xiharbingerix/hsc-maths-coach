import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Question Flags | Nova Maths Admin",
};

type FlagRow = {
  id: string;
  source_id: string | null;
  reason: string;
  comment: string | null;
  student_answer: string | null;
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

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

export default async function AdminQuestionFlagsPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const statusFilter = params?.status ?? "open";
  const showAll = statusFilter === "all";

  const query = supabaseAdmin
    .from("question_flags")
    .select(
      "id, source_id, reason, comment, student_answer, marked_correct, prompt_snapshot, status, created_at"
    )
    .order("created_at", { ascending: false });

  if (!showAll) {
    query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  const flags = (data as FlagRow[] | null) ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">

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

        {/* Status filter */}
        <div className="flex items-center gap-2">
          {["open", "all"].map((s) => (
            <Link
              key={s}
              href={`/admin/question-flags?status=${s}`}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? "border-slate-800 bg-slate-800 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s === "all" ? "All statuses" : "Open"}
            </Link>
          ))}
          <span className="ml-2 text-xs text-slate-400">
            {flags.length} flag{flags.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        {flags.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            No flags{showAll ? "" : " with status “open”"}.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Source ID</th>
                  <th className="px-5 py-3 text-left">Reason</th>
                  <th className="px-5 py-3 text-left">Student answer</th>
                  <th className="px-4 py-3 text-center">Correct?</th>
                  <th className="px-5 py-3 text-left">Comment / Prompt</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {flags.map((f) => (
                  <tr key={f.id} className="align-top hover:bg-slate-50">
                    <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {fmtDate(f.created_at)}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                      {f.source_id ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {REASON_LABELS[f.reason] ?? f.reason}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {f.student_answer ?? "—"}
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
                    <td className="px-5 py-3 max-w-sm text-slate-600">
                      {f.comment ? (
                        <p className="text-xs font-medium text-slate-800">
                          {f.comment}
                        </p>
                      ) : null}
                      {f.prompt_snapshot ? (
                        <details className="mt-1">
                          <summary className="cursor-pointer list-none text-xs text-slate-400 [&::-webkit-details-marker]:hidden">
                            {truncate(f.prompt_snapshot, 60)}
                          </summary>
                          <p className="mt-1 rounded-lg bg-slate-50 p-2 text-xs leading-relaxed text-slate-600 whitespace-pre-wrap">
                            {f.prompt_snapshot}
                          </p>
                        </details>
                      ) : null}
                      {!f.comment && !f.prompt_snapshot ? (
                        <span className="text-slate-300">—</span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          f.status === "open"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
