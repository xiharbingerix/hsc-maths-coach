"use client";

import { useEffect, useRef, useState } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../../components/MathText";
import { VisualPayloadRenderer } from "../../../components/VisualPayloadRenderer";
import { renderDiagramData } from "../../../components/diagramRegistry";
import type { Choice } from "../../../../lib/lessons/diagramRegistry";

type Part = {
  key: string;
  label: string;
  prompt: string;
  latex: string | null;
  marks: number;
};

type MirrorQuestion = {
  id: string;
  prompt: string;
  latex: string | null;
  choices: Choice[] | null;
  parts: Part[] | null;
  diagramData: Record<string, unknown> | null;
  answer: string | null;
};

type MirrorResponse = {
  attemptId: string;
  studentName: string;
  completedAt: string | null;
  idleSeconds: number | null;
  phase: string | null;
  questionIndex: number | null;
  totalQuestions: number | null;
  question: MirrorQuestion | null;
  draft: { typed: string; choice: string; parts: Record<string, string> } | null;
  submitted: { studentAnswer: string | null; isCorrect: boolean | null } | null;
  updatedAt: string;
  error?: string;
};

const POLL_MS = 1000;

function liveDot(idleSeconds: number | null, completed: boolean) {
  if (completed) return { color: "bg-emerald-500", label: "Finished" };
  if (idleSeconds == null) return { color: "bg-slate-400", label: "Connecting…" };
  if (idleSeconds <= 12) return { color: "bg-sky-500 animate-pulse", label: "Live" };
  if (idleSeconds <= 90) return { color: "bg-amber-500", label: `${idleSeconds}s ago` };
  return { color: "bg-slate-400", label: "Idle" };
}

export function WorksheetMirror({
  worksheetId,
  attemptId,
  studentName,
  onClose,
}: {
  worksheetId: string;
  attemptId: string;
  studentName: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<MirrorResponse | null>(null);
  const [error, setError] = useState("");
  const dataRef = useRef<MirrorResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const endpoint = `/api/admin/worksheets/${worksheetId}/mirror/${attemptId}`;

    async function load() {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        const payload = (await res.json()) as MirrorResponse;
        if (cancelled) return;
        if (!res.ok || payload.error) {
          setError(payload.error ?? "Could not load live view.");
          return;
        }
        dataRef.current = payload;
        setData(payload);
        setError("");
      } catch {
        if (!cancelled) setError("Could not load live view.");
      }
    }

    void load();
    const interval = setInterval(() => void load(), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [worksheetId, attemptId]);

  // Close on Escape.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const completed = Boolean(data?.completedAt);
  const dot = liveDot(data?.idleSeconds ?? null, completed);
  const question = data?.question ?? null;
  const draft = data?.draft ?? null;
  const isAnswered = data?.phase === "answered";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl space-y-4"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Mirror header */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${dot.color}`} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Watching live · {dot.label}
              </p>
              <p className="font-semibold text-slate-900">{studentName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {data?.questionIndex && data?.totalQuestions ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Q{data.questionIndex} / {data.totalQuestions}
              </span>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>

        {/* Mirrored question card */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          {error ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {error}
            </p>
          ) : !data ? (
            <p className="text-sm text-slate-500">Connecting to student…</p>
          ) : completed ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
              {studentName} has finished this worksheet.
            </p>
          ) : !question ? (
            <p className="text-sm text-slate-500">
              Waiting for {studentName} to open a question…
            </p>
          ) : (
            <>
              {/* Prompt */}
              <div className="space-y-3">
                <p className="font-medium leading-7 text-slate-900">
                  <MathText text={question.prompt} />
                </p>
                {question.latex ? (
                  <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                    <BlockMath math={question.latex} />
                  </div>
                ) : null}
                {renderDiagramData(question.diagramData)}
              </div>

              {/* Live answer reconstruction */}
              {question.parts && question.parts.length > 0 ? (
                <div className="space-y-3">
                  {question.parts.map((part) => {
                    const value = draft?.parts?.[part.key] ?? "";
                    return (
                      <div
                        key={part.key}
                        className="space-y-2 rounded-xl border border-slate-200 p-4"
                      >
                        <p className="font-medium leading-7 text-slate-900">
                          <span className="mr-2 text-slate-500">{part.label}</span>
                          <MathText text={part.prompt} />
                        </p>
                        {part.latex ? (
                          <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                            <BlockMath math={part.latex} />
                          </div>
                        ) : null}
                        <LiveField value={value} />
                      </div>
                    );
                  })}
                </div>
              ) : question.choices && question.choices.length > 0 ? (
                <div className="space-y-2">
                  {question.choices.map((choice) => {
                    const selected = draft?.choice === choice.label;
                    return (
                      <div
                        key={choice.label}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium ${
                          selected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-800"
                        }`}
                      >
                        <span className="mr-3 font-bold">{choice.label}.</span>
                        <MathText text={choice.text} />
                        <VisualPayloadRenderer {...choice} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-sm font-medium text-slate-700">
                    Their answer (live)
                  </span>
                  <LiveField value={draft?.typed ?? ""} />
                </div>
              )}

              {/* Status line */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>
                  {isAnswered
                    ? "Submitted — reviewing result"
                    : "Typing / working on this question"}
                </span>
                {data.submitted && isAnswered ? (
                  <span
                    className={`font-semibold ${
                      data.submitted.isCorrect ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {data.submitted.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                ) : null}
              </div>
            </>
          )}
        </div>

        <p className="px-1 text-center text-xs text-slate-300">
          Reconstructed from the student&apos;s live worksheet — updates every {POLL_MS / 1000}s.
        </p>
      </div>
    </div>
  );
}

function LiveField({ value }: { value: string }) {
  const hasValue = value.trim().length > 0;
  return (
    <div
      className={`min-h-[3rem] rounded-xl border px-4 py-3 font-mono text-sm ${
        hasValue
          ? "border-slate-300 bg-white text-slate-900"
          : "border-dashed border-slate-200 bg-slate-50 text-slate-400"
      }`}
    >
      {hasValue ? (
        <span>
          {value}
          <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-slate-400 align-middle" />
        </span>
      ) : (
        "Nothing typed yet…"
      )}
    </div>
  );
}
