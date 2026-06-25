"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";
import { MathText } from "../../components/MathText";
import { VisualPayloadRenderer } from "../../components/VisualPayloadRenderer";
import { supabase } from "../../../lib/supabaseClient";
import { SubscribeCTA } from "../../components/SubscribeCTA";
import { generateStudyPlan } from "../../../lib/studyPlans/generateStudyPlan";
import type { DiagnosticQuestion, DiagnosticUnit } from "../../../lib/diagnostics/types";
import {
  clientTrackEvent,
  readMarketingParams,
} from "../../../lib/analytics/clientTrackEvent";
import { trackDiagnosticBegun, trackDiagnosticCompleted } from "../../../lib/analytics";
import { ctaExperimentProps } from "../../../lib/experiments/ctaExperiment";

type UnitResult = DiagnosticUnit & {
  correct: number;
  total: number;
};

function assessedUnitSlugs(question: DiagnosticQuestion): string[] {
  return Array.from(
    new Set([question.unitSlug, ...(question.assessedUnitSlugs ?? [])])
  );
}

function priorityLevel(
  correct: number,
  total: number
): "focus" | "review" | "secure-sample" {
  const score = total > 0 ? correct / total : 0;
  if (score <= 0.5) return "focus";
  if (correct < total) return "review";
  return "secure-sample";
}

function priorityLabel(correct: number, total: number): string {
  const level = priorityLevel(correct, total);
  if (level === "focus") return "Focus first";
  if (level === "review") return "Review recommended";
  return "No gaps found in this sample";
}

function priorityBadgeClass(correct: number, total: number): string {
  const level = priorityLevel(correct, total);
  if (level === "focus")
    return "border-red-200 bg-red-50 text-red-800";
  if (level === "secure-sample")
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
    for (const unitSlug of assessedUnitSlugs(q)) {
      if (!tally.has(unitSlug)) tally.set(unitSlug, { correct: 0, total: 0 });
      const entry = tally.get(unitSlug)!;
      entry.total++;
      if (answers[q.id] === q.correctAnswer) entry.correct++;
    }
  }

  return units
    .filter((u) => tally.has(u.slug))
    .map((u) => ({ ...u, ...(tally.get(u.slug)!) }))
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
}

function estimatedDiagnosticMinutes(totalQuestions: number): number {
  return Math.max(1, Math.ceil((totalQuestions * 15) / 60));
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
  const diagnosticUnits = useMemo(() => {
    const unitSlugsWithQuestions = new Set(
      questions.flatMap((question) => assessedUnitSlugs(question))
    );
    return units.filter((unit) => unitSlugsWithQuestions.has(unit.slug));
  }, [questions, units]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [studiedUnitSlugs, setStudiedUnitSlugs] = useState<string[]>([]);
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);

  const saveAttemptedRef = useRef(false);
  const completedTrackedRef = useRef(false);
  const answeredTrackedRef = useRef<Set<string>>(new Set());
  const questionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    clientTrackEvent("diagnostic_started", {
      yearLevel,
      ...ctaExperimentProps(),
      ...readMarketingParams(),
    });
  }, [yearLevel]);

  const unitResults = useMemo(
    () => computeUnitResults(questions, units, answers),
    [questions, units, answers]
  );

  const studiedUnitSlugSet = useMemo(
    () => new Set(studiedUnitSlugs),
    [studiedUnitSlugs]
  );
  const studiedUnitResults = useMemo(
    () => unitResults.filter((unit) => studiedUnitSlugSet.has(unit.slug)),
    [unitResults, studiedUnitSlugSet]
  );
  const unstudiedUnitResults = useMemo(
    () => unitResults.filter((unit) => !studiedUnitSlugSet.has(unit.slug)),
    [unitResults, studiedUnitSlugSet]
  );

  const totalCorrect = useMemo(
    () => questions.filter((q) => answers[q.id] === q.correctAnswer).length,
    [answers, questions]
  );

  useEffect(() => {
    if (phase !== "results" || saveAttemptedRef.current) return;
    saveAttemptedRef.current = true;

    if (!completedTrackedRef.current) {
      completedTrackedRef.current = true;
      clientTrackEvent("diagnostic_completed", {
        yearLevel,
        totalCorrect,
        totalQuestions,
        ...ctaExperimentProps(),
        ...readMarketingParams(),
      });
      trackDiagnosticCompleted();
    }

    // Only studied units are persisted because saved diagnostic results feed
    // recommendations on the dashboard and in the admin view.
    const resultsSnapshot = studiedUnitResults.map((u) => ({
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

      // Seed student_mastery from diagnostic answers — fire-and-forget.
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) return;

      const sourceId = crypto.randomUUID();
      const events = questions
        .flatMap((q) =>
          assessedUnitSlugs(q)
            .filter((unitSlug) => studiedUnitSlugSet.has(unitSlug))
            .map((unitSlug) => ({
              questionId: `${q.id}:${unitSlug}`,
              topicSlug: unitSlug,
              difficulty: q.difficulty ?? 3,
              isCorrect: answers[q.id] === q.correctAnswer,
            }))
        );

      if (events.length === 0) return;

      void fetch("/api/mastery/diagnostic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseSlug: yearLevel, sourceId, events }),
      }).catch(() => {
        // Mastery recording failure never affects the student's results.
      });
    }

    void checkAndSave();
  }, [
    answers,
    phase,
    questions,
    studiedUnitResults,
    studiedUnitSlugSet,
    totalCorrect,
    totalQuestions,
    yearLevel,
  ]);

  function toggleStudiedUnit(unitSlug: string) {
    setStudiedUnitSlugs((current) =>
      current.includes(unitSlug)
        ? current.filter((slug) => slug !== unitSlug)
        : [...current, unitSlug]
    );
  }

  function startDiagnostic() {
    // The mandatory "tick at least one topic" gate was the single biggest
    // abandonment point: ~57% of people who reached this screen left before
    // answering Q1, while almost everyone who answered Q1 finished. So no longer
    // block on an empty selection. If nothing is picked, treat every topic as
    // studied so the results still produce recommendations across the board.
    const studiedForRun =
      studiedUnitSlugs.length === 0
        ? diagnosticUnits.map((unit) => unit.slug)
        : studiedUnitSlugs;

    if (studiedUnitSlugs.length === 0) {
      setStudiedUnitSlugs(studiedForRun);
    }

    // Distinct from diagnostic_started (which fires on page mount / arrival):
    // this marks the real intro→quiz transition, so "bounced on intro" can be
    // separated from "started the quiz but quit partway".
    clientTrackEvent("diagnostic_begun", {
      yearLevel,
      totalQuestions,
      studiedUnitCount: studiedForRun.length,
      startedWithNoSelection: studiedUnitSlugs.length === 0,
      ...readMarketingParams(),
    });

    // Google Ads conversion (Diagnostic Begun) — gives Smart Bidding a
    // higher-frequency signal than diagnostic_completed at current ad volume.
    trackDiagnosticBegun();

    setPhase("quiz");
    setSubmitWarning(null);
  }

  function handleAnswer(question: DiagnosticQuestion, answer: string, questionIndex: number) {
    setAnswers((current) => ({ ...current, [question.id]: answer }));
    setSubmitWarning(null);
    try {
      if (!answeredTrackedRef.current.has(question.id)) {
        answeredTrackedRef.current.add(question.id);
        void clientTrackEvent("diagnostic_question_answered", {
          yearLevel,
          questionIndex: questionIndex + 1,
          totalQuestions,
          questionId: question.id,
          unitSlug: question.unitSlug,
        });
      }
    } catch {
      // Analytics must never interrupt the diagnostic flow.
    }
  }

  function handleSubmit() {
    const firstUnansweredIndex = questions.findIndex((q) => !answers[q.id]);

    void clientTrackEvent("diagnostic_submit_clicked", {
      yearLevel,
      answeredQuestions: Object.keys(answers).length,
      totalQuestions,
      complete: firstUnansweredIndex === -1,
    });

    if (firstUnansweredIndex !== -1) {
      const missingCount = questions.filter((q) => !answers[q.id]).length;
      const firstUnanswered = questions[firstUnansweredIndex];
      setSubmitWarning(
        `${missingCount} question${missingCount === 1 ? "" : "s"} still unanswered. Answer every question before seeing results.`
      );
      questionRefs.current[firstUnanswered.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitWarning(null);
    setPhase("results");
  }

  // ── Intro phase ──────────────────────────────────────────────────────────────
  if (phase === "intro") {
    const estimatedMinutes = estimatedDiagnosticMinutes(totalQuestions);

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-2xl space-y-6">
          <section className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {yearLevelTitle}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Start your diagnostic
            </h1>
            <p className="mt-3 text-lg font-semibold text-slate-800">
              {totalQuestions} questions &bull; about {estimatedMinutes} minutes &bull; builds your personalised study plan
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Answer each question as best you can. The goal is not a school
              mark; it is to find the first topics that will make study feel
              clearer.
            </p>
            <fieldset className="mt-6">
              <legend className="text-lg font-bold text-slate-900">
                Which topics have you already studied this year?{" "}
                <span className="font-semibold text-slate-500">(optional)</span>
              </legend>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Select every topic your class has covered to sharpen your
                recommendations — or just start, and we&rsquo;ll check across all
                topics.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {diagnosticUnits.map((unit) => {
                  const isSelected = studiedUnitSlugSet.has(unit.slug);
                  return (
                    <label
                      key={unit.slug}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                        isSelected
                          ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleStudiedUnit(unit.slug)}
                        className="mt-1 h-4 w-4 shrink-0 accent-slate-900"
                      />
                      <span className="text-sm font-semibold leading-6">
                        {unit.title}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStudiedUnitSlugs(
                      diagnosticUnits.map((unit) => unit.slug)
                    );
                  }}
                  className="font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-950"
                >
                  Select all
                </button>
                <span className="text-slate-500">
                  {studiedUnitSlugs.length} of {diagnosticUnits.length} selected
                </span>
              </div>
            </fieldset>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startDiagnostic}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
              >
                Start diagnostic
              </button>
              <Link
                href="/diagnostic/select"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Choose another diagnostic
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ── Results phase ────────────────────────────────────────────────────────────
  if (phase === "results") {
    const scorePct = Math.round((totalCorrect / totalQuestions) * 100);
    const priorityUnits = studiedUnitResults.slice(
      0,
      Math.min(3, studiedUnitResults.length)
    );
    const focusFirstCount = studiedUnitResults.filter(
      (unit) => priorityLevel(unit.correct, unit.total) === "focus"
    ).length;
    const studyPlan = generateStudyPlan({
      yearLevel,
      diagnosticResults: studiedUnitResults.map((unit) => ({
        courseSlug: yearLevel,
        unitSlug: unit.slug,
        unitTitle: unit.title,
        correct: unit.correct,
        total: unit.total,
        startHref: unit.startHref,
      })),
    });

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* ── Score header ─────────────────────────────────────────────── */}
          <header className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {yearLevelTitle} · Diagnostic complete
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Here is your personalised study plan.
            </h1>
            <p className="mt-3 text-2xl font-semibold tabular-nums">
              {totalCorrect} / {totalQuestions} correct &mdash; {scorePct}%
            </p>
            {focusFirstCount > 0 ? (
              <p className="mt-1 text-slate-600">
                {focusFirstCount === 1
                  ? "1 unit needs your attention first."
                  : `${focusFirstCount} units need attention — start with these.`}
              </p>
            ) : (
              <p className="mt-1 text-slate-600">
                {studyPlan.summary}
              </p>
            )}
            {saved && (
              <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800">
                Results saved to your account.
              </p>
            )}
          </header>

          {/* ── Study plan ───────────────────────────────────────────────── */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Your study plan
            </p>
            <h2 className="mt-2 text-xl font-bold">
              {studyPlan.nextTopic
                ? `Start with ${studyPlan.nextTopic.title}`
                : "Top units to review"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {studyPlan.nextTopic?.reason ??
                "Work through these in order for the fastest improvement."}
            </p>
            {studyPlan.nextTopic ? (
              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Next topic</p>
                  <p className="mt-1">{studyPlan.nextTopic.title}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Study time</p>
                  <p className="mt-1">
                    About {studyPlan.estimatedHours} hour
                    {studyPlan.estimatedHours !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Priority</p>
                  <p className="mt-1 capitalize">{studyPlan.priorityLevel}</p>
                </div>
              </div>
            ) : null}

            <ol className="mt-5 space-y-5">
              {priorityUnits.map((unit, idx) => (
                <li key={unit.slug} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-semibold leading-snug">{unit.title}</p>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priorityBadgeClass(unit.correct, unit.total)}`}
                      >
                        {priorityLabel(unit.correct, unit.total)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {unit.correct} of {unit.total} correct
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          unit.correct === unit.total
                            ? "bg-emerald-500"
                            : priorityLevel(unit.correct, unit.total) === "focus"
                            ? "bg-red-400"
                            : "bg-amber-400"
                        }`}
                        style={{
                          width: `${Math.round((unit.correct / unit.total) * 100)}%`,
                        }}
                      />
                    </div>
                    <Link
                      href={unit.startHref}
                      className="mt-2 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2 hover:text-slate-600"
                    >
                      Preview this unit →
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Free trial CTA ───────────────────────────────────────────── */}
          <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Get started
            </p>
            <h2 className="mt-2 text-xl font-bold">
              Start your trial to unlock the lessons recommended by your results.
            </h2>
            <p className="mt-2 leading-7 text-slate-300">
              Your trial unlocks full lessons, worked examples, guided
              practice, independent practice, mastery quizzes, saved progress
              and course pathways.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SubscribeCTA
                href="/checkout?offer=online-learning"
                className="bg-white text-slate-950 hover:bg-slate-100"
              >
                Start your 7-day free trial
              </SubscribeCTA>
              <Link
                href={`/login?returnTo=/diagnostic/${yearLevel}`}
                className="text-sm font-semibold text-slate-300 hover:text-white"
              >
                Already have access? Log in →
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              No charge today &middot; Then $19/month &middot; Cancel anytime
            </p>
          </section>

          {/* ── Full unit breakdown ──────────────────────────────────────── */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Studied topic breakdown
            </p>
            <div className="space-y-3">
              {studiedUnitResults.map((unit) => (
                <div
                  key={unit.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{unit.title}</h3>
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
            </div>
          </section>

          {unstudiedUnitResults.length > 0 && (
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Not yet studied
              </p>
              <div className="space-y-3">
                {unstudiedUnitResults.map((unit) => (
                  <div
                    key={unit.slug}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{unit.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {unit.correct} of {unit.total} correct
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        Excluded from recommendations
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Save / login panel ───────────────────────────────────────── */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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

          {/* ── Bottom actions ───────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/course"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View all courses
            </Link>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setPhase("intro");
                setSaved(false);
                setSaveError(null);
                setIsLoggedIn(null);
                setSubmitWarning(null);
                completedTrackedRef.current = false;
                answeredTrackedRef.current = new Set();
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
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-28 pt-6 text-slate-900 sm:py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="sticky top-0 z-20 rounded-b-2xl bg-white/95 p-5 shadow-sm backdrop-blur sm:rounded-2xl">
          <div className="flex flex-col gap-1 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium">{yearLevelTitle}</span>
            <span>
              {answeredCount} of {totalQuestions} answered
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            About {estimatedDiagnosticMinutes(totalQuestions)} minutes &middot; {totalQuestions} multiple-choice questions
          </p>

          {submitWarning && (
            <p
              role="alert"
              aria-live="assertive"
              className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-800"
            >
              {submitWarning}
            </p>
          )}

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-5">
          {questions.map((question, questionIndex) => (
            <section
              key={question.id}
              ref={(node) => {
                questionRefs.current[question.id] = node;
              }}
              className={`space-y-5 overflow-hidden rounded-2xl bg-white p-5 shadow-sm sm:p-6 ${
                submitWarning && !answers[question.id]
                  ? "ring-2 ring-red-300"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-slate-500">
                  Question {questionIndex + 1} of {totalQuestions}
                </p>
                <p className="overflow-x-auto text-lg font-semibold leading-relaxed">
                  <MathText text={question.prompt} />
                </p>
              </div>

              {question.latex && (
                <div className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
                  <BlockMath math={question.latex} />
                </div>
              )}

              <VisualPayloadRenderer {...question} />

              <div className="space-y-3">
                {question.choices.map((choice) => {
                  const isSelected = answers[question.id] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => handleAnswer(question, choice.label, questionIndex)}
                      className={`flex w-full min-w-0 items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                        isSelected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="mt-0.5 shrink-0 font-semibold">{choice.label}.</span>
                      <span className="min-w-0 overflow-x-auto">
                        <MathText text={choice.text} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          {submitWarning && (
            <p
              role="alert"
              aria-live="assertive"
              className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
            >
              {submitWarning}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white hover:bg-slate-700"
          >
            See my results
          </button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:hidden">
        {submitWarning && (
          <p
            role="alert"
            aria-live="assertive"
            className="mb-2 text-xs font-semibold text-red-700"
          >
            {submitWarning}
          </p>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
        >
          See my results
        </button>
      </div>
    </main>
  );
}
