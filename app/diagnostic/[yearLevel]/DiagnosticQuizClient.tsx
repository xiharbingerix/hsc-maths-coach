"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { BlockMath, InlineMath } from "react-katex";
import { supabase } from "../../../lib/supabaseClient";
import type { DiagnosticQuestion, DiagnosticUnit } from "../../../lib/diagnostics/types";

type UnitResult = DiagnosticUnit & {
  correct: number;
  total: number;
};

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

function priorityLabel(correct: number, total: number): string {
  if (correct <= 1) return "Focus first";
  if (correct === total) return "Confident — review lightly";
  return "Keep practising";
}

function priorityBadgeClass(correct: number, total: number): string {
  if (correct <= 1)
    return "border-red-200 bg-red-50 text-red-800";
  if (correct === total)
    return "border-green-200 bg-green-50 text-green-800";
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function computeUnitResults(
  questions: DiagnosticQuestion[],
  units: DiagnosticUnit[],
  answers: Record<string, string>
): UnitResult[] {
  const tally = new Map<string, { correct: number; total: number }>();

  for (const q of questions) {
    if (!tally.has(q.unitSlug)) tally.set(q.unitSlug, { correct: 0, total: 0 });
    const entry = tally.get(q.unitSlug)!;
    entry.total++;
    if (answers[q.id] === q.correctAnswer) entry.correct++;
  }

  return units
    .filter((u) => tally.has(u.slug))
    .map((u) => ({ ...u, ...(tally.get(u.slug)!) }))
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export function DiagnosticQuizClient({
  yearLevel,
  yearLevelTitle,
  questions,
  units,
}: {
  yearLevel: string;
  yearLevelTitle: string;
  questions: DiagnosticQuestion[];
  units: DiagnosticUnit[];
}) {
  const totalQuestions = questions.length;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveAttemptedRef = useRef(false);

  const unitResults = useMemo(
    () => computeUnitResults(questions, units, answers),
    [questions, units, answers]
  );

  const totalCorrect = unitResults.reduce((sum, u) => sum + u.correct, 0);

  useEffect(() => {
    if (phase !== "results" || saveAttemptedRef.current) return;
    saveAttemptedRef.current = true;

    const resultsSnapshot = unitResults.map((u) => ({
      unitSlug: u.slug,
      unitTitle: u.title,
      correct: u.correct,
      total: u.total,
    }));

    async function checkAndSave() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      if (!user) return;

      const { error } = await supabase.from("diagnostic_results").insert({
        user_id: user.id,
        year_level: yearLevel,
        unit_results: resultsSnapshot,
      });

      if (error) setSaveError(error.message);
      else setSaved(true);
    }

    void checkAndSave();
  }, [phase, yearLevel, unitResults]);

  function handleNext() {
    if (!selectedAnswer) return;
    const q = questions[questionIndex];
    const newAnswers = { ...answers, [q.id]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (questionIndex + 1 >= totalQuestions) {
      setPhase("results");
    } else {
      setQuestionIndex((i) => i + 1);
    }
  }

  // ── Results phase ────────────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-2xl space-y-6">
          <header className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {yearLevelTitle}
            </p>
            <h1 className="mt-2 text-3xl font-bold">Your diagnostic results</h1>
            <p className="mt-3 text-2xl font-semibold">
              {totalCorrect} / {totalQuestions} correct
            </p>
            <p className="mt-1 text-slate-600">
              Units are listed from weakest to strongest.
            </p>
          </header>

          <section className="space-y-4">
            {unitResults.map((unit) => (
              <div
                key={unit.slug}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{unit.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {unit.correct} of {unit.total} correct
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityBadgeClass(unit.correct, unit.total)}`}
                  >
                    {priorityLabel(unit.correct, unit.total)}
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    href={unit.startHref}
                    className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Start studying →
                  </Link>
                </div>
              </div>
            ))}
          </section>

          {/* Save / login panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {saved && (
              <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
                Results saved to your account.
              </div>
            )}

            {saveError && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">
                Could not save results: {saveError}
              </div>
            )}

            {isLoggedIn === false && !saved && (
              <div className="space-y-3">
                <p className="text-sm text-slate-700">
                  Log in to save your results and track progress over time.
                </p>
                <Link
                  href={`/login?returnTo=/diagnostic/${yearLevel}`}
                  className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Log in to save results
                </Link>
              </div>
            )}

            {isLoggedIn === null && !saved && (
              <p className="text-sm text-slate-500">Checking login status…</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/course/year-12-advanced"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View full course
            </Link>
            <button
              type="button"
              onClick={() => {
                setQuestionIndex(0);
                setAnswers({});
                setSelectedAnswer(null);
                setPhase("quiz");
                setSaved(false);
                setSaveError(null);
                setIsLoggedIn(null);
                saveAttemptedRef.current = false;
              }}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Retake diagnostic
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Quiz phase ───────────────────────────────────────────────────────────────
  const currentQuestion = questions[questionIndex];
  const progressPercent = (questionIndex / totalQuestions) * 100;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span className="font-medium">{yearLevelTitle}</span>
            <span>
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold leading-relaxed">
            <MathText text={currentQuestion.prompt} />
          </p>

          {currentQuestion.latex && (
            <div className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={currentQuestion.latex} />
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.label;
              return (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => setSelectedAnswer(choice.label)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <span className="mt-0.5 font-semibold">{choice.label}.</span>
                  <span>
                    <MathText text={choice.text} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-40"
            >
              {questionIndex + 1 === totalQuestions
                ? "See results"
                : "Next question →"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
