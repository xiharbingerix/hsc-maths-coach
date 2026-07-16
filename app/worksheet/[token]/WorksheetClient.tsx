"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockMath } from "react-katex";
import { MathAnswerInput } from "../../components/MathAnswerInput";
import { MathText } from "../../components/MathText";
import { supabase } from "../../../lib/supabaseClient";
import { renderDiagramData } from "../../components/diagramRegistry";
import { VisualPayloadRenderer } from "../../components/VisualPayloadRenderer";
import type { WorksheetQuestion } from "./page";

// ── Diagram renderer ───────────────────────────────────────────────────────────

function DiagramRenderer({ data }: { data: Record<string, unknown> | null }) {
  return renderDiagramData(data);
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = "intro" | "starting" | "asking" | "answered" | "done" | "error";

type AnswerResult = {
  isCorrect: boolean;
  scoreState?: "correct" | "partial" | "incorrect";
  marksEarned?: number;
  marksAvailable?: number;
  percentage?: number;
  explanation: string;
  partResults?: PartAnswerResult[];
};

type PartAnswerResult = {
  key: string;
  label: string;
  marks: number;
  marksEarned?: number;
  marksAvailable?: number;
  isCorrect: boolean;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
};

type FinalScore = {
  scoreCorrect: number;
  scoreTotal: number;
  marksEarned?: number;
  marksAvailable?: number;
};

type ResumeAnswer = {
  questionId: string;
  isCorrect: boolean;
};

type ResumeAttempt = {
  attemptId?: string;
  studentName?: string | null;
  completedAt?: string | null;
  scoreCorrect?: number | null;
  scoreTotal?: number | null;
  marksEarned?: number | null;
  marksAvailable?: number | null;
  answeredQuestions?: ResumeAnswer[];
  error?: string;
};

type AttentionSnapshot = {
  state: "focused" | "away";
  reason: "focus" | "blur" | "hidden";
  eventId: string;
  changedAt: string;
  lastAwayEventId: string | null;
  lastAwayAt: string | null;
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
  title,
  yearLevel,
  adminPreview = false,
  assignedStudentName,
  dueAt,
  questions,
  resumeAttemptId = null,
}: {
  token: string;
  title: string;
  yearLevel: string;
  adminPreview?: boolean;
  assignedStudentName?: string | null;
  dueAt?: string | null;
  questions: WorksheetQuestion[];
  resumeAttemptId?: string | null;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [partAnswers, setPartAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [finalScore, setFinalScore] = useState<FinalScore | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [flagState, setFlagState] = useState<
    "idle" | "open" | "submitting" | "submitted" | "error"
  >("idle");
  const [flagReason, setFlagReason] = useState("");
  const [flagComment, setFlagComment] = useState("");
  const storageKey = useMemo(() => `nova-worksheet-attempt:${token}`, [token]);

  // Track time spent on each question
  const questionStartTimeRef = useRef<number>(0);
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const assignedName = assignedStudentName?.trim();
  const dueLabel = dueAt
    ? new Date(dueAt).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  // Always hold the latest in-progress answer so heartbeats can mirror exactly
  // what the student is typing, without re-creating the send function on every keystroke.
  const draftRef = useRef<{
    typed: string;
    choice: string;
    parts: Record<string, string>;
  }>({ typed: "", choice: "", parts: {} });
  const attentionRef = useRef<AttentionSnapshot | null>(null);
  const attentionAttemptRef = useRef<string | null>(null);

  useEffect(() => {
    draftRef.current = {
      typed: typedAnswer,
      choice: choiceAnswer,
      parts: partAnswers,
    };
  }, [typedAnswer, choiceAnswer, partAnswers]);

  const sendHeartbeat = useCallback(async () => {
    if (!attemptId || !currentQuestion) return;
    try {
      await fetch(`/api/worksheet/${token}/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.id,
          questionIndex: currentIndex + 1,
          phase,
          draft: draftRef.current,
          attention: attentionRef.current,
        }),
        keepalive: true,
      });
    } catch {
      // Heartbeat is best-effort telemetry; worksheet flow should never fail because of it.
    }
  }, [attemptId, currentQuestion, currentIndex, phase, token]);

  // Periodic heartbeat + an immediate one whenever the question or phase changes,
  // so the live mirror reflects navigation and submissions promptly.
  useEffect(() => {
    if (!attemptId || !currentQuestion) return;
    void sendHeartbeat();
    const interval = setInterval(() => {
      void sendHeartbeat();
    }, 5000);
    return () => clearInterval(interval);
  }, [attemptId, currentQuestion, sendHeartbeat]);

  // Push the draft shortly after the student stops typing, so the teacher sees
  // their working appear almost as they write it.
  useEffect(() => {
    if (!attemptId || phase !== "asking") return;
    const timeout = setTimeout(() => {
      void sendHeartbeat();
    }, 600);
    return () => clearTimeout(timeout);
  }, [typedAnswer, choiceAnswer, partAnswers, attemptId, phase, sendHeartbeat]);

  // Browsers do not reveal which tab or application was opened, but they do
  // expose when this worksheet loses visibility or window focus. Send each
  // transition as part of the existing live snapshot; only an open teacher
  // Watch view turns an "away" transition into an alert.
  useEffect(() => {
    if (!attemptId || !currentQuestion || phase === "done") return;

    function makeEventId() {
      if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    function reportAttention(
      state: AttentionSnapshot["state"],
      reason: AttentionSnapshot["reason"]
    ) {
      if (attentionRef.current?.state === state) return;
      const eventId = makeEventId();
      const changedAt = new Date().toISOString();
      attentionRef.current = {
        state,
        reason,
        eventId,
        changedAt,
        lastAwayEventId:
          state === "away"
            ? eventId
            : attentionRef.current?.lastAwayEventId ?? null,
        lastAwayAt:
          state === "away"
            ? changedAt
            : attentionRef.current?.lastAwayAt ?? null,
      };
      void sendHeartbeat();
    }

    if (attentionAttemptRef.current !== attemptId) {
      attentionAttemptRef.current = attemptId;
      const state =
        document.visibilityState === "hidden" || !document.hasFocus()
          ? "away"
          : "focused";
      const eventId = makeEventId();
      const changedAt = new Date().toISOString();
      attentionRef.current = {
        state,
        reason: document.visibilityState === "hidden" ? "hidden" : "focus",
        eventId,
        changedAt,
        lastAwayEventId: state === "away" ? eventId : null,
        lastAwayAt: state === "away" ? changedAt : null,
      };
      void sendHeartbeat();
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        reportAttention("away", "hidden");
      } else if (document.hasFocus()) {
        reportAttention("focused", "focus");
      }
    }

    function onWindowBlur() {
      reportAttention("away", "blur");
    }

    function onWindowFocus() {
      if (document.visibilityState === "visible") {
        reportAttention("focused", "focus");
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, [attemptId, currentQuestion, phase, sendHeartbeat]);

  useEffect(() => {
    let cancelled = false;

    async function resumeStoredAttempt() {
      // A dashboard "Resume" link carries the attempt id in the URL, which
      // beats localStorage so resume works across devices.
      let storedAttemptId: string | null = resumeAttemptId;
      if (!storedAttemptId) {
        try {
          storedAttemptId = window.localStorage.getItem(storageKey);
        } catch {
          return;
        }
      }

      if (!storedAttemptId) return;

      setPhase("starting");
      setErrorMessage("");

      try {
        const res = await fetch(
          `/api/worksheet/${token}/attempt/${storedAttemptId}`
        );
        const data = (await res.json()) as ResumeAttempt;

        if (cancelled) return;

        if (!res.ok || data.error || !data.attemptId) {
          try {
            // Only clear the stored id if it was the one that failed — a bad
            // URL param shouldn't wipe a valid attempt saved on this device.
            if (window.localStorage.getItem(storageKey) === storedAttemptId) {
              window.localStorage.removeItem(storageKey);
            }
          } catch {
            // localStorage may be unavailable; ignore and fall back to fresh start.
          }
          setAttemptId(null);
          setFinalScore(null);
          setCurrentIndex(0);
          setPhase("intro");
          return;
        }

        setAttemptId(data.attemptId);
        try {
          // Remember a URL-resumed attempt so later visits on this device
          // resume even without the ?attempt= link.
          window.localStorage.setItem(storageKey, data.attemptId);
        } catch {
          // localStorage is a same-device convenience only.
        }
        if (data.studentName?.trim()) {
          setStudentName(data.studentName.trim());
        }

        if (data.completedAt) {
          setFinalScore({
            scoreCorrect: data.scoreCorrect ?? 0,
            scoreTotal: data.scoreTotal ?? totalQuestions,
            marksEarned: data.marksEarned ?? undefined,
            marksAvailable: data.marksAvailable ?? undefined,
          });
          setPhase("done");
          return;
        }

        const answeredIds = new Set(
          (data.answeredQuestions ?? []).map((answer) => answer.questionId)
        );
        const firstUnansweredIndex = questions.findIndex(
          (question) => !answeredIds.has(question.id)
        );

        setCurrentIndex(
          firstUnansweredIndex === -1
            ? Math.max(0, totalQuestions - 1)
            : firstUnansweredIndex
        );
        setTypedAnswer("");
        setChoiceAnswer("");
        setPartAnswers({});
        setResult(null);
        setFinalScore(null);
        setPhase("asking");
        questionStartTimeRef.current = Date.now();
      } catch {
        if (!cancelled) {
          setPhase("intro");
        }
      }
    }

    void resumeStoredAttempt();

    return () => {
      cancelled = true;
    };
  }, [questions, resumeAttemptId, storageKey, token, totalQuestions]);

  // ── Start attempt ──────────────────────────────────────────────────────────

  async function handleStartAttempt() {
    if (phase !== "intro" || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setPhase("starting");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const res = await fetch(`/api/worksheet/${token}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ studentName }),
      });
      const data = (await res.json()) as { attemptId?: string; error?: string };

      if (!res.ok || !data.attemptId) {
        setErrorMessage(data.error ?? "Could not start worksheet. Please reload.");
        setPhase("error");
        return;
      }

      setAttemptId(data.attemptId);
      try {
        window.localStorage.setItem(storageKey, data.attemptId);
      } catch {
        // localStorage is a same-device convenience only; worksheet still works.
      }
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
    const isMultiPart = Boolean(currentQuestion.parts?.length);
    const hasMultiPartAnswers = isMultiPart
      ? currentQuestion.parts!.every((part) => partAnswers[part.key]?.trim())
      : true;
    if (isMultiPart ? !hasMultiPartAnswers : !answer.trim()) return;

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
          partAnswers: isMultiPart ? partAnswers : undefined,
          timeSpentSecs,
        }),
      });
      const data = (await res.json()) as {
        isCorrect?: boolean;
        scoreState?: "correct" | "partial" | "incorrect";
        marksEarned?: number;
        marksAvailable?: number;
        percentage?: number;
        explanation?: string;
        partResults?: PartAnswerResult[];
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(data.error ?? "Could not submit answer. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setResult({
        isCorrect: Boolean(data.isCorrect),
        scoreState: data.scoreState,
        marksEarned: data.marksEarned,
        marksAvailable: data.marksAvailable,
        percentage: data.percentage,
        explanation: data.explanation ?? "",
        partResults: data.partResults ?? [],
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
          marksEarned?: number;
          marksAvailable?: number;
          error?: string;
        };

        if (!res.ok) {
          setErrorMessage(data.error ?? "Could not complete worksheet. Please try again.");
          return;
        }

        setFinalScore({
          scoreCorrect: data.scoreCorrect ?? 0,
          scoreTotal: data.scoreTotal ?? totalQuestions,
          marksEarned: data.marksEarned,
          marksAvailable: data.marksAvailable,
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
      setPartAnswers({});
      setResult(null);
      setFlagState("idle");
      setFlagReason("");
      setFlagComment("");
      setPhase("asking");
      questionStartTimeRef.current = Date.now();
    }
  }

  // ── Submit question flag ───────────────────────────────────────────────────

  async function handleFlag() {
    if (!attemptId || !currentQuestion || !flagReason) return;
    setFlagState("submitting");
    const answer = currentQuestion.choices ? choiceAnswer : typedAnswer;
    const isMultiPart = Boolean(currentQuestion.parts?.length);
    const studentAnswer = isMultiPart
      ? JSON.stringify({ parts: partAnswers })
      : answer.trim();
    try {
      const res = await fetch(`/api/worksheet/${token}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.id,
          reason: flagReason,
          comment: flagComment,
          studentAnswer,
          markedCorrect: result?.isCorrect ?? false,
        }),
      });
      setFlagState(res.ok ? "submitted" : "error");
    } catch {
      setFlagState("error");
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
        {adminPreview ? (
          <p className="mt-1 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            Admin preview mode
          </p>
        ) : null}
        {assignedName || dueLabel ? (
          <p className="mt-0.5 text-sm text-slate-500">
            {assignedName ? `Worksheet for ${assignedName}` : null}
            {assignedName && dueLabel ? " · " : null}
            {dueLabel ? `Due ${dueLabel}` : null}
          </p>
        ) : null}
      </div>
      <Link
        href="/dashboard"
        className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      >
        ← Dashboard
      </Link>
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
    const hasMarksScore =
      typeof finalScore.marksEarned === "number" &&
      typeof finalScore.marksAvailable === "number" &&
      finalScore.marksAvailable > 0;
    const pct = hasMarksScore
      ? Math.round((finalScore.marksEarned! / finalScore.marksAvailable!) * 100)
      : Math.round((finalScore.scoreCorrect / finalScore.scoreTotal) * 100);
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
              {hasMarksScore
                ? `${finalScore.marksEarned} / ${finalScore.marksAvailable} marks`
                : `${finalScore.scoreCorrect} / ${finalScore.scoreTotal} correct`}
            </h1>
            {hasMarksScore ? (
              <p className="text-sm font-medium text-slate-600">
                {finalScore.scoreCorrect} / {finalScore.scoreTotal} questions fully correct
              </p>
            ) : null}

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
            <Link
              href="/dashboard"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Asking / Answered ──────────────────────────────────────────────────────
  if (!currentQuestion) return null;

  const progressPct = Math.round((currentIndex / totalQuestions) * 100);
  const isMcq = Boolean(currentQuestion.choices?.length);
  const isMultiPart = Boolean(currentQuestion.parts?.length);
  const canSubmit =
    phase === "asking" &&
    !isSubmitting &&
    (isMultiPart
      ? currentQuestion.parts!.every((part) => partAnswers[part.key]?.trim())
      : isMcq
      ? choiceAnswer !== ""
      : typedAnswer.trim() !== "");
  const resultState = result?.scoreState ?? (result?.isCorrect ? "correct" : "incorrect");
  const resultPanelClass =
    resultState === "correct"
      ? "border-emerald-200 bg-emerald-50"
      : resultState === "partial"
      ? "border-amber-200 bg-amber-50"
      : "border-red-200 bg-red-50";
  const resultTextClass =
    resultState === "correct"
      ? "text-emerald-800"
      : resultState === "partial"
      ? "text-amber-800"
      : "text-red-800";
  const resultBodyClass =
    resultState === "correct"
      ? "text-emerald-900"
      : resultState === "partial"
      ? "text-amber-900"
      : "text-red-900";
  const resultTitle =
    resultState === "correct"
      ? "Correct!"
      : resultState === "partial"
      ? "Partly correct."
      : "Not quite.";

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
          {isMultiPart ? (
            <div className="space-y-4">
              {currentQuestion.parts!.map((part) => (
                <div key={part.key} className="space-y-3 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium leading-7 text-slate-900">
                      <span className="mr-2 text-slate-500">{part.label}</span>
                      <MathText text={part.prompt} />
                    </p>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {part.marks} {part.marks === 1 ? "mark" : "marks"}
                    </span>
                  </div>
                  {part.latex ? (
                    <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                      <BlockMath math={part.latex} />
                    </div>
                  ) : null}
                  <MathAnswerInput
                    value={partAnswers[part.key] ?? ""}
                    onChange={(value) => {
                      if (phase === "asking") {
                        setPartAnswers((current) => ({
                          ...current,
                          [part.key]: value,
                        }));
                      }
                    }}
                    disabled={phase === "answered"}
                    ariaLabel={`Answer for ${part.label}`}
                    placeholder="Type your answer"
                  />
                </div>
              ))}
            </div>
          ) : isMcq ? (
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
                    <VisualPayloadRenderer {...choice} />
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
              className={`space-y-2 rounded-xl border p-4 ${resultPanelClass}`}
            >
              <p className={`font-semibold ${resultTextClass}`}>{resultTitle}</p>
              {typeof result.marksEarned === "number" &&
              typeof result.marksAvailable === "number" ? (
                <p className={`text-sm font-semibold ${resultBodyClass}`}>
                  Marks: {result.marksEarned} / {result.marksAvailable}
                  {typeof result.percentage === "number"
                    ? ` (${Math.round(result.percentage * 100)}%)`
                    : ""}
                </p>
              ) : null}
              {result.explanation ? (
                <p className={`text-sm leading-6 ${resultBodyClass}`}>
                  <MathText text={result.explanation} />
                </p>
              ) : null}
              {result.partResults && result.partResults.length > 0 ? (
                <div className="space-y-2">
                  {result.partResults.map((part) => (
                    <div
                      key={part.key}
                      className={`rounded-xl border p-3 text-sm ${
                        part.isCorrect
                          ? "border-emerald-200 bg-white/70 text-emerald-900"
                          : "border-red-200 bg-white/70 text-red-900"
                      }`}
                    >
                      <p className="font-semibold">
                        {part.label} {part.isCorrect ? "Correct" : "Not quite"} (
                        {part.marksEarned ?? (part.isCorrect ? part.marks : 0)} /{" "}
                        {part.marksAvailable ?? part.marks} marks)
                      </p>
                      <p className="mt-1">
                        Your answer:{" "}
                        <MathText text={part.studentAnswer || "No answer submitted"} />
                      </p>
                      <p className="mt-1 font-medium">
                        Correct answer: <MathText text={part.correctAnswer} />
                      </p>
                      <p className="mt-2">
                        <MathText text={part.explanation} />
                      </p>
                    </div>
                  ))}
                </div>
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

          {/* Flag this question */}
          {phase === "answered" ? (
            <div className="border-t border-slate-100 pt-4">
              {flagState === "submitted" ? (
                <p className="text-xs text-slate-400">
                  Thanks for flagging — we&apos;ll review this question.
                </p>
              ) : flagState === "open" ||
                flagState === "submitting" ||
                flagState === "error" ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-700">
                    What&apos;s the issue?
                  </p>
                  <div className="space-y-1.5">
                    {(
                      [
                        { value: "wrong-answer", label: "The answer seems wrong" },
                        {
                          value: "confusing-question",
                          label: "The question is confusing",
                        },
                        { value: "typo-or-error", label: "There's a typo or error" },
                        {
                          value: "diagram-issue",
                          label: "The diagram is incorrect or unclear",
                        },
                        { value: "other", label: "Other issue" },
                      ] as const
                    ).map(({ value, label }) => (
                      <label
                        key={value}
                        className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
                      >
                        <input
                          type="radio"
                          name="flag-reason"
                          value={value}
                          checked={flagReason === value}
                          onChange={() => setFlagReason(value)}
                          className="accent-slate-800"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  <textarea
                    value={flagComment}
                    onChange={(e) => setFlagComment(e.target.value)}
                    maxLength={400}
                    placeholder="Additional details (optional)"
                    rows={2}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  {flagState === "error" ? (
                    <p className="text-xs text-red-600">
                      Could not send — please try again.
                    </p>
                  ) : null}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleFlag()}
                      disabled={!flagReason || flagState === "submitting"}
                      className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40"
                    >
                      {flagState === "submitting" ? "Sending…" : "Send flag"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFlagState("idle");
                        setFlagReason("");
                        setFlagComment("");
                      }}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setFlagState("open")}
                  className="text-xs text-slate-400 underline decoration-slate-300 underline-offset-2 hover:text-slate-600"
                >
                  Flag this question
                </button>
              )}
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
