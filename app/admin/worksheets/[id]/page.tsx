import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/adminSession";
import { newCoursePathways } from "../../../../lib/newCourseCatalog";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getSiteUrl } from "../../../../lib/stripe";
import { CopyButton } from "../CopyButton";
import { LiveAttemptMonitor } from "./LiveAttemptMonitor";

export const metadata: Metadata = {
  title: "Worksheet Detail | Nova Maths Admin",
};

const courseLabelMap = new Map<string, string>(
  newCoursePathways.map((pathway) => [pathway.slug, pathway.title])
);

type TopicConfig = {
  courseSlug?: string;
  course_slug?: string;
  topicSlugs?: string[];
  topic_slugs?: string[];
  preset?: string;
  teacher_guided_retry?: boolean;
};

type QuestionData = {
  id: string;
  prompt: string;
  latex: string | null;
  choices: Array<{ label: string; text: string }> | null;
  question_parts: unknown;
  answer: string;
  explanation: string | null;
};

type QuestionPartData = {
  key: string;
  label: string;
  prompt: string;
  answer: string;
};

type WorksheetQuestionRow = {
  position: number;
  questions: QuestionData;
};

type AttemptRow = {
  id: string;
  student_name: string | null;
  started_at: string;
  completed_at: string | null;
  score_correct: number | null;
  score_total: number | null;
};

type AnswerRow = {
  attempt_id: string;
  question_id: string;
  student_answer: string | null;
  answer_payload: unknown;
  is_correct: boolean | null;
  time_spent_secs: number | null;
  answered_at: string;
};

function normaliseQuestionParts(value: unknown): QuestionPartData[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const part = item as Record<string, unknown>;
    const key = String(part.key ?? "").trim();
    const answer = String(part.answer ?? "").trim();
    if (!key || !answer) return [];

    return [
      {
        key,
        label: String(part.label ?? `(${key})`),
        prompt: String(part.prompt ?? "").trim(),
        answer,
      },
    ];
  });
}

function readSubmittedPartAnswers(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const parts = (value as { parts?: unknown }).parts;
  if (!parts || typeof parts !== "object" || Array.isArray(parts)) return {};

  return Object.fromEntries(
    Object.entries(parts as Record<string, unknown>).map(([key, answer]) => [
      key,
      String(answer ?? ""),
    ])
  );
}

export default async function WorksheetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;

  const { data: wsData } = await supabaseAdmin
    .from("worksheets")
    .select(
      "id, title, year_level, topic_config, share_token, assigned_student_name, assigned_student_email, due_at, status, created_at"
    )
    .eq("id", id)
    .single();

  if (!wsData) notFound();

  const worksheet = wsData as {
    id: string;
    title: string;
    year_level: string;
    topic_config: TopicConfig;
    share_token: string;
    assigned_student_name: string | null;
    assigned_student_email: string | null;
    due_at: string | null;
    status: string | null;
    created_at: string;
  };

  const [wqResult, attemptsResult] = await Promise.all([
    supabaseAdmin
      .from("worksheet_questions")
      .select(
        "position, questions(id, prompt, latex, choices, question_parts, answer, explanation)"
      )
      .eq("worksheet_id", id)
      .order("position"),
    supabaseAdmin
      .from("worksheet_attempts")
      .select("id, student_name, started_at, completed_at, score_correct, score_total")
      .eq("worksheet_id", id)
      .order("started_at", { ascending: false }),
  ]);

  const questions: WorksheetQuestionRow[] =
    (wqResult.data as WorksheetQuestionRow[] | null) ?? [];
  const attempts: AttemptRow[] = (attemptsResult.data as AttemptRow[] | null) ?? [];

  // Load all answers for these attempts in one query
  const answersMap: Record<string, Record<string, AnswerRow>> = {};
  if (attempts.length > 0) {
    const attemptIds = attempts.map((a) => a.id);
    const { data: answersData } = await supabaseAdmin
      .from("worksheet_answers")
      .select(
        "attempt_id, question_id, student_answer, answer_payload, is_correct, time_spent_secs, answered_at"
      )
      .in("attempt_id", attemptIds);

    if (answersData) {
      for (const row of answersData as AnswerRow[]) {
        if (!answersMap[row.attempt_id]) answersMap[row.attempt_id] = {};
        answersMap[row.attempt_id][row.question_id] = row;
      }
    }
  }

  const shareUrl = `${getSiteUrl()}/worksheet/${worksheet.share_token}`;
  const courseSlug =
    worksheet.topic_config?.courseSlug ?? worksheet.topic_config?.course_slug ?? "—";
  const courseLabel = courseLabelMap.get(courseSlug) ?? courseSlug;
  const assignedName = worksheet.assigned_student_name?.trim() || "Unassigned";
  const assignedEmail = worksheet.assigned_student_email?.trim();
  const dueLabel = worksheet.due_at
    ? new Date(worksheet.due_at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";
  const statusLabel = worksheet.status?.trim() || "active";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths Admin · Worksheets
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{worksheet.title}</h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {courseLabel} · Year {worksheet.year_level} · Created{" "}
              {new Date(worksheet.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {worksheet.topic_config?.preset && ` · ${worksheet.topic_config.preset} preset`}
              {worksheet.topic_config?.teacher_guided_retry
                ? " · discuss-and-retry enabled"
                : ""}
            </p>
          </div>
          <Link
            href="/admin/worksheets"
            className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            ← Worksheets
          </Link>
        </header>

        {/* Assignment */}
        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Assigned to
            </p>
            <p className="mt-1 font-semibold text-slate-900">{assignedName}</p>
            {assignedEmail ? (
              <p className="mt-0.5 break-all text-sm text-slate-500">
                {assignedEmail}
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Due date
            </p>
            <p className="mt-1 font-semibold text-slate-900">{dueLabel}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </p>
            <span className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold capitalize text-slate-700">
              {statusLabel}
            </span>
          </div>
        </section>

        {/* Share URL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Share link
          </p>
          <div className="flex items-center gap-3">
            <span className="flex-1 truncate rounded-lg bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700">
              {shareUrl}
            </span>
            <a
              href={`${shareUrl}?adminPreview=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Open student view
            </a>
            <CopyButton text={shareUrl} />
          </div>
        </section>

        <LiveAttemptMonitor worksheetId={worksheet.id} />

        {/* Questions */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">
            Questions{" "}
            <span className="ml-1 text-sm font-normal text-slate-500">
              ({questions.length})
            </span>
          </h2>
          {questions.length === 0 ? (
            <p className="text-sm text-slate-500">No questions attached.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="w-10 px-4 py-3 text-center">#</th>
                    <th className="px-5 py-3 text-left">Question</th>
                    <th className="px-5 py-3 text-left">Answer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {questions.map((wq) => {
                    const parts = normaliseQuestionParts(
                      wq.questions.question_parts
                    );

                    return (
                      <tr key={wq.questions.id}>
                        <td className="px-4 py-3 text-center text-slate-400">
                          {wq.position + 1}
                        </td>
                        <td className="px-5 py-3 text-slate-800">
                          <p>{wq.questions.prompt}</p>
                          {parts.length > 0 ? (
                            <div className="mt-3 space-y-2 border-l-2 border-slate-200 pl-3">
                              {parts.map((part) => (
                                <p key={part.key} className="text-sm text-slate-600">
                                  <span className="mr-2 font-semibold text-slate-800">
                                    {part.label}
                                  </span>
                                  {part.prompt || "Question part"}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-5 py-3 text-slate-700">
                          {parts.length > 0 ? (
                            <div className="space-y-1.5">
                              {parts.map((part) => (
                                <p key={part.key} className="font-mono">
                                  <span className="mr-2 font-sans font-semibold text-slate-500">
                                    {part.label}
                                  </span>
                                  {part.answer}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <span className="font-mono">
                              {wq.questions.answer || "—"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Attempts */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Attempts{" "}
            <span className="ml-1 text-sm font-normal text-slate-500">
              ({attempts.length})
            </span>
          </h2>

          {attempts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No attempts yet.
            </div>
          ) : (
            attempts.map((attempt, idx) => {
              const answers = answersMap[attempt.id] ?? {};
              const isComplete = !!attempt.completed_at;
              return (
                <div
                  key={attempt.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Attempt header */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700">
                        {attempt.student_name?.trim() || "Anonymous student"}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Attempt {attempts.length - idx}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(attempt.started_at).toLocaleString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {isComplete ? (
                        <>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                            Complete
                          </span>
                          {attempt.score_correct != null && attempt.score_total != null && (
                            <span className="text-sm font-semibold tabular-nums text-slate-700">
                              {attempt.score_correct}/{attempt.score_total}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                          In progress
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Per-question answers */}
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="w-10 px-4 py-2 text-center">#</th>
                        <th className="px-5 py-2 text-left">Question</th>
                        <th className="px-5 py-2 text-left">Student answer</th>
                        <th className="px-4 py-2 text-center">Result</th>
                        <th className="px-4 py-2 text-center">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {questions.map((wq) => {
                        const ans = answers[wq.questions.id];
                        const questionParts = normaliseQuestionParts(
                          wq.questions.question_parts
                        );
                        const submittedParts = readSubmittedPartAnswers(
                          ans?.answer_payload
                        );
                        const hasStructuredPartAnswers =
                          questionParts.length > 0 &&
                          Object.keys(submittedParts).length > 0;

                        return (
                          <tr key={wq.questions.id}>
                            <td className="px-4 py-3 text-center text-slate-400">
                              {wq.position + 1}
                            </td>
                            <td className="px-5 py-3 text-slate-600">
                              <p>{wq.questions.prompt}</p>
                              {questionParts.length > 0 ? (
                                <div className="mt-2 space-y-1.5 border-l-2 border-slate-200 pl-3">
                                  {questionParts.map((part) => (
                                    <p key={part.key} className="text-xs">
                                      <span className="mr-1.5 font-semibold text-slate-700">
                                        {part.label}
                                      </span>
                                      {part.prompt || "Question part"}
                                    </p>
                                  ))}
                                </div>
                              ) : null}
                            </td>
                            <td className="px-5 py-3 text-slate-800">
                              {hasStructuredPartAnswers ? (
                                <div className="space-y-1.5">
                                  {questionParts.map((part) => (
                                    <p key={part.key} className="font-mono">
                                      <span className="mr-2 font-sans font-semibold text-slate-500">
                                        {part.label}
                                      </span>
                                      {submittedParts[part.key] || "—"}
                                    </p>
                                  ))}
                                </div>
                              ) : ans?.student_answer ? (
                                <span className="font-mono">
                                  {ans.student_answer}
                                </span>
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {ans == null ? (
                                <span className="text-slate-300">—</span>
                              ) : ans.is_correct ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-500">✗</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center tabular-nums text-slate-500">
                              {ans?.time_spent_secs != null
                                ? `${ans.time_spent_secs}s`
                                : <span className="text-slate-300">—</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
