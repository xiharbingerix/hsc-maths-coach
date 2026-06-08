"use client";

import { useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { MathAnswerInput } from "../../components/MathAnswerInput";
import { BoxPlotView } from "../../course/components/BoxPlotView";
import { CartesianGraphView } from "../../course/components/CartesianGraphView";
import { NetworkDiagramView } from "../../course/components/NetworkDiagramView";
import { NormalDistributionView } from "../../course/components/NormalDistributionView";
import { ProbabilityTreeView } from "../../course/components/ProbabilityTreeView";
import { TrapezoidalRuleView } from "../../course/components/TrapezoidalRuleView";
import { TriangleDiagramView } from "../../course/components/TriangleDiagramView";
import { TwoWayTableView } from "../../course/components/TwoWayTableView";
import { VennDiagramView } from "../../course/components/VennDiagramView";
import type {
  BoxPlotDiagram,
  CartesianGraph,
  NetworkDiagram,
  NormalDistributionDiagram,
  ProbabilityTreeDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TwoWayTableDiagram,
  VennDiagram,
} from "../../../lib/lessons/types";
import type { WorksheetQuestion } from "./page";

// ── Inline math renderer for plain text with $...$  delimiters ────────────────

function MathText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <InlineMath key={i} math={part.slice(1, -1)} />
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── Diagram renderer ───────────────────────────────────────────────────────────

function DiagramRenderer({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  const { type, ...rest } = data;
  switch (type) {
    case "cartesianGraph":
      return <CartesianGraphView graph={rest as CartesianGraph} />;
    case "triangleDiagram":
      return <TriangleDiagramView diagram={rest as TriangleDiagram} />;
    case "trapezoidalRuleDiagram":
      return <TrapezoidalRuleView diagram={rest as TrapezoidalRuleDiagram} />;
    case "boxPlotDiagram":
      return <BoxPlotView diagram={rest as BoxPlotDiagram} />;
    case "normalDistributionDiagram":
      return <NormalDistributionView diagram={rest as NormalDistributionDiagram} />;
    case "probabilityTreeDiagram":
      return <ProbabilityTreeView diagram={rest as ProbabilityTreeDiagram} />;
    case "twoWayTableDiagram":
      return <TwoWayTableView diagram={rest as TwoWayTableDiagram} />;
    case "vennDiagram":
      return <VennDiagramView diagram={rest as VennDiagram} />;
    case "networkDiagram":
      return <NetworkDiagramView diagram={rest as NetworkDiagram} />;
    default:
      return null;
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = "intro" | "starting" | "asking" | "answered" | "done" | "error";

type AnswerResult = {
  isCorrect: boolean;
  explanation: string;
};

type FinalScore = {
  scoreCorrect: number;
  scoreTotal: number;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreLabel(pct: number): string {
  if (pct >= 80) return "Excellent work!";
  if (pct >= 60) return "Good effort — keep practising.";
  if (pct >= 40) return "Keep working through these topics.";
  return "Review the material and try again when ready.";
}

function scoreBadgeClass(pct: number): string {
  if (pct >= 80) return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (pct >= 60) return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-red-200 bg-red-50 text-red-800";
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WorksheetClient({
  token,
  worksheetId: _worksheetId,
  title,
  yearLevel,
  questions,
}: {
  token: string;
  worksheetId: string;
  title: string;
  yearLevel: string;
  questions: WorksheetQuestion[];
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [finalScore, setFinalScore] = useState<FinalScore | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Track time spent on each question
  const questionStartTimeRef = useRef<number>(Date.now());
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // ── Start attempt ──────────────────────────────────────────────────────────

  async function handleStartAttempt() {
    if (phase !== "intro" || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setPhase("starting");

    try {
      const res = await fetch(`/api/worksheet/${token}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName }),
      });
      const data = (await res.json()) as { attemptId?: string; error?: string };

      if (!res.ok || !data.attemptId) {
        setErrorMessage(data.error ?? "Could not start worksheet. Please reload.");
        setPhase("error");
        return;
      }

      setAttemptId(data.attemptId);
      setPhase("asking");
      questionStartTimeRef.current = Date.now();
    } catch {
      setErrorMessage("Network error. Please check your connection and reload.");
      setPhase("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Submit answer ──────────────────────────────────────────────────────────

  async function handleCheckAnswer() {
    if (!attemptId || !currentQuestion || isSubmitting) return;

    const answer = currentQuestion.choices ? choiceAnswer : typedAnswer;
    if (!answer.trim()) return;

    setIsSubmitting(true);
    const timeSpentSecs = Math.round(
      (Date.now() - questionStartTimeRef.current) / 1000
    );

    try {
      const res = await fetch(`/api/worksheet/${token}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.id,
          answer: answer.trim(),
          timeSpentSecs,
        }),
      });
      const data = (await res.json()) as {
        isCorrect?: boolean;
        explanation?: string;
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(data.error ?? "Could not submit answer. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setResult({
        isCorrect: Boolean(data.isCorrect),
        explanation: data.explanation ?? "",
      });
      setPhase("answered");
    } catch {
      setErrorMessage("Network error while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Advance to next question or complete ───────────────────────────────────

  async function handleNext() {
    if (!attemptId) return;

    if (isLastQuestion) {
      setIsSubmitting(true);
      try {
        const res = await fetch(`/api/worksheet/${token}/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attemptId }),
        });
        const data = (await res.json()) as {
          scoreCorrect?: number;
          scoreTotal?: number;
          error?: string;
        };

        if (!res.ok) {
          setErrorMessage(data.error ?? "Could not complete worksheet. Please try again.");
          return;
        }

        setFinalScore({
          scoreCorrect: data.scoreCorrect ?? 0,
          scoreTotal: data.scoreTotal ?? totalQuestions,
        });
        setPhase("done");
      } catch {
        setErrorMessage("Network error while completing. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentIndex((i) => i + 1);
      setTypedAnswer("");
      setChoiceAnswer("");
      setResult(null);
      setPhase("asking");
      questionStartTimeRef.current = Date.now();
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const headerBar = (
    <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths · {yearLevel.replace(/-/g, " ")}
        </p>
        <p className="mt-0.5 truncate font-semibold text-slate-900">{title}</p>
      </div>
    </header>
  );

  // ── Starting ───────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          {headerBar}
          <form
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            onSubmit={(event) => {
              event.preventDefault();
              void handleStartAttempt();
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Before you begin
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Enter your name
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This helps Joshua match your worksheet result to you. It is optional,
                but encouraged.
              </p>
            </div>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Student name
              </span>
              <input
                type="text"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                maxLength={120}
                autoComplete="name"
                placeholder="e.g. Mia Chen"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Starting..." : "Start worksheet"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (phase === "starting") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          {headerBar}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-slate-600">Loading worksheet…</p>
          </div>
        </div>
      </main>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (phase === "error") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          {headerBar}
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-semibold text-red-800">Something went wrong</p>
            <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
            >
              Reload
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Done — final score ─────────────────────────────────────────────────────
  if (phase === "done" && finalScore) {
    const pct = Math.round((finalScore.scoreCorrect / finalScore.scoreTotal) * 100);
    const barWidth = `${pct}%`;

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          {headerBar}
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Worksheet complete
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {finalScore.scoreCorrect} / {finalScore.scoreTotal} correct
            </h1>

            {/* Progress bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-800 transition-all"
                style={{ width: barWidth }}
              />
            </div>

            <p
              className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${scoreBadgeClass(pct)}`}
            >
              {pct}% · {scoreLabel(pct)}
            </p>

            <p className="text-sm leading-6 text-slate-600">
              Your results have been saved. Ask your tutor to go through any
              questions you found tricky.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ── Asking / Answered ──────────────────────────────────────────────────────
  if (!currentQuestion) return null;

  const progressPct = Math.round((currentIndex / totalQuestions) * 100);
  const isMcq = Boolean(currentQuestion.choices?.length);
  const canSubmit =
    phase === "asking" &&
    !isSubmitting &&
    (isMcq ? choiceAnswer !== "" : typedAnswer.trim() !== "");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl space-y-4">
        {headerBar}

        {/* Progress */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-700 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* Prompt */}
          <div className="space-y-3">
            <p className="font-medium leading-7 text-slate-900">
              <MathText text={currentQuestion.prompt} />
            </p>
            {currentQuestion.latex ? (
              <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                <BlockMath math={currentQuestion.latex} />
              </div>
            ) : null}
            <DiagramRenderer data={currentQuestion.diagramData} />
          </div>

          {/* Answer input */}
          {isMcq ? (
            <div className="space-y-2">
              {currentQuestion.choices!.map((choice) => {
                const isSelected = choiceAnswer === choice.label;
                const isAnswered = phase === "answered";
                const isCorrectChoice =
                  isAnswered && result?.isCorrect && isSelected;
                const isWrongChoice =
                  isAnswered && !result?.isCorrect && isSelected;

                let buttonClass =
                  "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ";

                if (isCorrectChoice) {
                  buttonClass +=
                    "border-emerald-300 bg-emerald-50 text-emerald-900";
                } else if (isWrongChoice) {
                  buttonClass += "border-red-300 bg-red-50 text-red-900";
                } else if (isSelected) {
                  buttonClass +=
                    "border-slate-900 bg-slate-900 text-white";
                } else {
                  buttonClass +=
                    "border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50";
                }

                if (isAnswered) buttonClass += " cursor-default";

                return (
                  <button
                    key={choice.label}
                    type="button"
                    onClick={() => {
                      if (phase === "asking") setChoiceAnswer(choice.label);
                    }}
                    disabled={phase === "answered"}
                    className={buttonClass}
                  >
                    <span className="mr-3 font-bold">{choice.label}.</span>
                    <MathText text={choice.text} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700">
                Your answer
              </span>
              <MathAnswerInput
                value={typedAnswer}
                onChange={(v) => {
                  if (phase === "asking") setTypedAnswer(v);
                }}
                disabled={phase === "answered"}
                ariaLabel="Your answer"
                placeholder="Type your answer"
              />
            </div>
          )}

          {/* Action buttons */}
          {phase === "asking" ? (
            <button
              type="button"
              onClick={() => void handleCheckAnswer()}
              disabled={!canSubmit}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Checking…" : "Check answer"}
            </button>
          ) : null}

          {/* Result */}
          {phase === "answered" && result ? (
            <div
              className={`space-y-2 rounded-xl border p-4 ${
                result.isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p
                className={`font-semibold ${
                  result.isCorrect ? "text-emerald-800" : "text-red-800"
                }`}
              >
                {result.isCorrect ? "Correct!" : "Not quite."}
              </p>
              {result.explanation ? (
                <p
                  className={`text-sm leading-6 ${
                    result.isCorrect ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  {result.explanation}
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => void handleNext()}
                disabled={isSubmitting}
                className="mt-1 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40"
              >
                {isSubmitting
                  ? "Saving…"
                  : isLastQuestion
                  ? "Finish worksheet"
                  : "Next question →"}
              </button>
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
              <button
                type="button"
                onClick={() => setErrorMessage("")}
                className="ml-2 underline"
              >
                Dismiss
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
