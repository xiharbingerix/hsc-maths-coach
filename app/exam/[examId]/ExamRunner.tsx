"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../components/MathText";
import { VisualPayloadRenderer } from "../../components/VisualPayloadRenderer";
import { MathAnswerInput } from "../../components/MathAnswerInput";
import { supabase } from "../../../lib/supabaseClient";
import type { ClientExamPaper, ClientExamQuestion } from "../../../lib/exams";

type PartResult = {
  key: string;
  label: string;
  correct: boolean;
  marksEarned: number;
  marksAvailable: number;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
};
type QuestionResult = {
  id: string;
  marksEarned: number;
  marksAvailable: number;
  correct: boolean;
  studentAnswer?: string;
  correctAnswer?: string;
  explanation: string;
  parts?: PartResult[];
};
type TopicBreakdown = {
  topicSlug: string;
  topicTitle: string;
  remediationHref: string;
  marksEarned: number;
  marksAvailable: number;
  percentage: number;
};
type ExamResult = {
  marksEarned: number;
  marksAvailable: number;
  percentage: number;
  band: string;
  questions: QuestionResult[];
  topicBreakdown: TopicBreakdown[];
  remediation: TopicBreakdown[];
};

function partKey(qId: string, key: string) {
  return `${qId}.${key}`;
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ExamRunner({ paper }: { paper: ClientExamPaper }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(paper.timeLimitMins * 60);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submittedRef = useRef(false);

  const setAnswer = (key: string, value: string) =>
    setAnswers((current) => ({ ...current, [key]: value }));

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setError("Please sign in to submit your exam.");
        submittedRef.current = false;
        return;
      }
      const res = await fetch(`/api/exam/${paper.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) {
        setError("Could not submit your exam. Please try again.");
        submittedRef.current = false;
        return;
      }
      setResult((await res.json()) as ExamResult);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong submitting your exam.");
      submittedRef.current = false;
    } finally {
      setSubmitting(false);
    }
  }, [answers, paper.id]);

  // Countdown — auto-submits at zero.
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      void submit();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, submitted, submit]);

  if (submitted && result) {
    return <ExamResults paper={paper} result={result} />;
  }

  const lowTime = timeLeft <= 300;
  let questionNumber = 0;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur">
        <div>
          <p className="text-sm font-medium text-slate-500">{paper.courseTitle}</p>
          <h1 className="text-lg font-bold text-slate-900">{paper.title}</h1>
        </div>
        <div
          className={`rounded-xl px-4 py-2 text-lg font-bold tabular-nums ${
            lowTime ? "bg-red-100 text-red-800" : "bg-slate-900 text-white"
          }`}
          aria-label="Time remaining"
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {paper.sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
            {section.instructions && (
              <p className="text-sm text-slate-600">{section.instructions}</p>
            )}
          </div>
          {section.questions.map((q) => {
            questionNumber += 1;
            return (
              <QuestionCard
                key={q.id}
                question={q}
                number={questionNumber}
                answers={answers}
                setAnswer={setAnswer}
              />
            );
          })}
        </section>
      ))}

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={() => void submit()}
        disabled={submitting}
        className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {submitting ? "Marking…" : "Submit exam"}
      </button>
    </div>
  );
}

function QuestionCard({
  question,
  number,
  answers,
  setAnswer,
}: {
  question: ClientExamQuestion;
  number: number;
  answers: Record<string, string>;
  setAnswer: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-slate-900">
          <span className="mr-2 text-slate-500">Q{number}.</span>
          <MathText text={question.prompt} />
        </p>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          {question.marks} {question.marks === 1 ? "mark" : "marks"}
        </span>
      </div>
      {question.latex && (
        <div className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>
      )}

      <VisualPayloadRenderer {...question} />

      {question.parts && question.parts.length > 0 ? (
        <div className="space-y-4">
          {question.parts.map((part) => (
            <div key={part.key} className="space-y-2 rounded-xl border border-slate-200 p-4">
              <p className="font-medium">
                <span className="mr-2 text-slate-500">{part.label}</span>
                <MathText text={part.prompt} />
                <span className="ml-2 text-xs text-slate-500">
                  ({part.marks} {part.marks === 1 ? "mark" : "marks"})
                </span>
              </p>
              {part.latex && (
                <div className="overflow-x-auto rounded-xl bg-slate-50 p-3">
                  <BlockMath math={part.latex} />
                </div>
              )}
              <MathAnswerInput
                value={answers[partKey(question.id, part.key)] ?? ""}
                onChange={(v) => setAnswer(partKey(question.id, part.key), v)}
                ariaLabel={`Answer for ${part.label}`}
                placeholder="Your answer"
              />
            </div>
          ))}
        </div>
      ) : question.choices && question.choices.length > 0 ? (
        <div className="grid gap-2">
          {question.choices.map((choice) => {
            const selected = answers[question.id] === choice.label;
            return (
              <button
                key={choice.label}
                type="button"
                onClick={() => setAnswer(question.id, choice.label)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${
                  selected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span className="font-bold">{choice.label}</span>
                <span>
                  <MathText text={choice.text} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <MathAnswerInput
          value={answers[question.id] ?? ""}
          onChange={(v) => setAnswer(question.id, v)}
          ariaLabel="Your answer"
          placeholder="Your answer"
        />
      )}
    </div>
  );
}

function ExamResults({
  paper,
  result,
}: {
  paper: ClientExamPaper;
  result: ExamResult;
}) {
  const resultById = new Map(result.questions.map((r) => [r.id, r]));
  let questionNumber = 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-sm font-medium text-slate-300">{paper.title} — result</p>
        <p className="mt-1 text-4xl font-bold">{result.band}</p>
        <p className="mt-1 text-slate-200">
          {result.marksEarned} / {result.marksAvailable} ({result.percentage}%)
        </p>
        <p className="mt-3 text-xs text-slate-400">
          A study estimate based on this paper — not an official HSC mark.
        </p>
      </div>

      {result.remediation.length > 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">Revise these topics first</h2>
          <ul className="mt-3 space-y-2">
            {result.remediation.map((t) => (
              <li
                key={t.topicSlug}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-sm text-amber-950">
                  {t.topicTitle} — {t.marksEarned}/{t.marksAvailable} ({t.percentage}%)
                </span>
                <Link
                  href={t.remediationHref}
                  className="shrink-0 rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800"
                >
                  Revise
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm font-medium text-green-800">
          Strong across every topic in this paper. Keep it up.
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">Review</h2>
        {paper.sections.flatMap((section) =>
          section.questions.map((q) => {
            questionNumber += 1;
            const r = resultById.get(q.id);
            if (!r) return null;
            return (
              <ReviewCard key={q.id} question={q} number={questionNumber} result={r} />
            );
          })
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/exam"
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Back to exams
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

function ReviewCard({
  question,
  number,
  result,
}: {
  question: ClientExamQuestion;
  number: number;
  result: QuestionResult;
}) {
  const tone = result.correct
    ? "border-green-200"
    : result.marksEarned > 0
      ? "border-amber-200"
      : "border-red-200";
  return (
    <div className={`space-y-3 rounded-2xl border bg-white p-5 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-slate-900">
          <span className="mr-2 text-slate-500">Q{number}.</span>
          <MathText text={question.prompt} />
        </p>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          {result.marksEarned}/{result.marksAvailable}
        </span>
      </div>

      <VisualPayloadRenderer {...question} />

      {result.parts && result.parts.length > 0 ? (
        <div className="space-y-2">
          {result.parts.map((p) => (
            <div key={p.key} className="rounded-xl bg-slate-50 p-3 text-sm">
              <p className="font-medium">
                <span className="mr-2 text-slate-500">{p.label}</span>
                {p.correct ? "✓" : "✗"} {p.marksEarned}/{p.marksAvailable}
              </p>
              <p className="mt-1 text-slate-700">
                Your answer: {p.studentAnswer || "—"} · Correct:{" "}
                <span className="font-medium">{p.correctAnswer}</span>
              </p>
              <p className="mt-1 text-slate-600">
                <MathText text={p.explanation} />
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-700">
            Your answer: {result.studentAnswer || "—"} · Correct:{" "}
            <span className="font-medium">{result.correctAnswer}</span>
          </p>
          <p className="mt-1 text-slate-600">
            <MathText text={result.explanation} />
          </p>
        </div>
      )}
    </div>
  );
}
