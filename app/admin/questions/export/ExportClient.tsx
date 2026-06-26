"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../../components/MathText";
import { VisualPayloadRenderer } from "../../../components/VisualPayloadRenderer";

type Choice = { label: string; text: string; [key: string]: unknown };

export type ExportQuestion = {
  id: string;
  source_id: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  difficulty: number;
  question_type: string;
  prompt: string;
  latex: string | null;
  choices: Choice[] | null;
  answer: string;
  accepted_answers: string[];
  hint: string | null;
  explanation: string;
  syllabus_ref: string | null;
  diagram_data: Record<string, unknown> | null;
  question_parts: unknown | null;
};

const DIFF_LABEL: Record<number, string> = {
  1: "D1", 2: "D2", 3: "D3", 4: "D4", 5: "D5", 6: "D6",
};
const DIFF_COLOUR: Record<number, string> = {
  1: "bg-emerald-50 text-emerald-700 border-emerald-200",
  2: "bg-sky-50 text-sky-700 border-sky-200",
  3: "bg-amber-50 text-amber-700 border-amber-200",
  4: "bg-orange-50 text-orange-700 border-orange-200",
  5: "bg-rose-50 text-rose-700 border-rose-200",
  6: "bg-purple-50 text-purple-700 border-purple-200",
};

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// diagram_data in DB: {type: "cartesianGraph", ...payload}
// VisualPayloadRenderer expects: {cartesianGraph: {...payload}}
// Special case: networkDiagram → field "diagram"
function diagramDataToProps(data: Record<string, unknown>): Record<string, unknown> {
  const { type, ...rest } = data;
  const field = type === "networkDiagram" ? "diagram" : (type as string);
  return { [field]: rest };
}

export function ExportClient({ questions }: { questions: ExportQuestion[] }) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <>
      {/* ── Print CSS ─────────────────────────────────────────────────────── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page-break { break-before: page; }
          body { background: white !important; }
          .question-card {
            break-inside: avoid;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
          }
        }
        @media screen {
          .print-page-break { display: none; }
        }
      `}</style>

      {/* ── Controls (hidden on print) ────────────────────────────────────── */}
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Print / Save PDF
        </button>
        <button
          onClick={() => setShowAnswers((v) => !v)}
          className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
            showAnswers
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {showAnswers ? "Answers shown" : "Show answers"}
        </button>
        <span className="text-sm text-slate-500">
          {questions.length} question{questions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Question list ─────────────────────────────────────────────────── */}
      {questions.length === 0 ? (
        <div className="no-print rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          No questions match these filters.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="question-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {/* ── Question header ───────────────────────────────────────── */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-slate-900">
                      Q{idx + 1}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 text-xs font-bold ${DIFF_COLOUR[q.difficulty] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                    >
                      {DIFF_LABEL[q.difficulty] ?? `D${q.difficulty}`}
                    </span>
                    <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-600">
                      {q.source_id}
                    </span>
                    {q.question_type === "conceptual" && (
                      <span className="rounded border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
                        MCQ
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400">
                    <span>{prettify(q.course_slug)}</span>
                    <span>·</span>
                    <span>{prettify(q.topic_slug)}</span>
                    <span>·</span>
                    <span>{prettify(q.subtopic_slug)}</span>
                    {q.syllabus_ref && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-slate-500">{q.syllabus_ref}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Prompt ───────────────────────────────────────────────── */}
              <div className="mt-4 text-base font-medium leading-relaxed text-slate-900">
                <MathText text={q.prompt} />
              </div>

              {/* ── LaTeX block ───────────────────────────────────────────── */}
              {q.latex && (
                <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                  <BlockMath math={q.latex} />
                </div>
              )}

              {/* ── Diagram ───────────────────────────────────────────────── */}
              {q.diagram_data && (
                <div className="mt-3">
                  <VisualPayloadRenderer
                    {...(diagramDataToProps(q.diagram_data) as Parameters<typeof VisualPayloadRenderer>[0])}
                  />
                </div>
              )}

              {/* ── Choices (MCQ) ─────────────────────────────────────────── */}
              {q.choices && q.choices.length > 0 && (
                <div className="mt-4 space-y-2">
                  {q.choices.map((choice) => {
                    const isCorrect = showAnswers && choice.label === q.answer;
                    return (
                      <div
                        key={choice.label}
                        className={`flex items-start gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                          isCorrect
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <span className={`mt-0.5 shrink-0 font-bold ${isCorrect ? "text-emerald-700" : "text-slate-500"}`}>
                          {choice.label}.
                          {isCorrect && " ✓"}
                        </span>
                        <span className="min-w-0 text-slate-800">
                          <MathText text={choice.text} />
                          {/* per-choice diagrams (e.g. "which graph matches?") */}
                          {Object.keys(choice).some((k) => k !== "label" && k !== "text") && (
                            <VisualPayloadRenderer
                              {...(choice as unknown as Parameters<typeof VisualPayloadRenderer>[0])}
                            />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── Answer + Explanation (toggled) ────────────────────────── */}
              {showAnswers && (
                <div className="mt-4 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Answer
                    </span>
                    <p className="mt-1 font-semibold text-slate-900">
                      <MathText text={q.answer} />
                    </p>
                    {q.accepted_answers.length > 0 && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        Also accepted:{" "}
                        {q.accepted_answers.map((a, i) => (
                          <span key={i}>
                            {i > 0 && ", "}
                            <MathText text={a} />
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                  {q.hint && (
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                        Hint
                      </span>
                      <p className="mt-1 text-sm text-slate-700">
                        <MathText text={q.hint} />
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Explanation
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      <MathText text={q.explanation} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
