"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockMath as KatexBlockMath } from "react-katex";

// KaTeX parsing/rendering is expensive; memoising by the latex string means
// unrelated state changes (e.g. typing in another quiz answer) don't re-run it.
const BlockMath = memo(KatexBlockMath);
import { MathText } from "../components/MathText";
import { AccessGate } from "./AccessGate";
import {
  trackLessonViewed,
  trackMasteryStarted,
  trackMasteryCompleted,
  trackLessonStarted,
} from "../../lib/analytics";
import type {
  ExplicitLesson,
  PracticeQuestion,
  PracticeQuestionPart,
} from "../../lib/lessons/differentialCalculus";
import { isGenericMcqInstructionLatex } from "../../lib/lessons/questionHelpers";
import { VisualPayloadRenderer } from "../components/VisualPayloadRenderer";
import { markTypedAnswer } from "../../lib/answerMarking";
import { looksSymbolic } from "../../lib/cas/looksSymbolic";
import { MathAnswerInput } from "../components/MathAnswerInput";
import { HintLadder } from "./components/HintLadder";
import { TutorPanel } from "./components/TutorPanel";
import { getChallengeQuestions } from "../../lib/challenges";
import { buildMasteryQuiz } from "../../lib/mastery/buildMasteryQuiz";
import {
  getUserCourseProgress,
  upsertLessonProgress,
} from "../../lib/lessonProgress";
import { supabase } from "../../lib/supabaseClient";
import { usePaidAccess } from "../../lib/usePaidAccess";
import { clientTrackEvent, readMarketingParams } from "../../lib/analytics/clientTrackEvent";

type LessonStage =
  | "watch"
  | "learn"
  | "guided-practice"
  | "independent-practice"
  | "multi-part-practice"
  | "mastery-quiz";

type MasteryState = {
  passed: boolean;
  completedStages: LessonStage[];
  lastScore?: number;
  updatedAt?: string;
};

export const WATCH_STAGE_ENABLED = true;
const PLACEHOLDER_VIDEO_URL = "/videos/placeholder-lesson.mp4";

const allLessonStages: { id: LessonStage; label: string }[] = [
  { id: "watch", label: "Watch" },
  { id: "learn", label: "Learn" },
  { id: "guided-practice", label: "Guided Practice" },
  { id: "independent-practice", label: "Independent Practice" },
  { id: "multi-part-practice", label: "Multi-Part Practice" },
  { id: "mastery-quiz", label: "Mastery Quiz" },
];

const firstContentStage: LessonStage = "learn";

function normaliseVideoUrl(url?: string) {
  return url?.trim() ?? "";
}

function isPlaceholderVideoUrl(url?: string) {
  const normalisedUrl = normaliseVideoUrl(url);
  return !normalisedUrl || normalisedUrl === PLACEHOLDER_VIDEO_URL;
}

function getYouTubeEmbedUrl(url?: string) {
  const normalisedUrl = normaliseVideoUrl(url);

  if (normalisedUrl.includes("youtube.com/embed/")) {
    return normalisedUrl;
  }

  if (normalisedUrl.includes("youtu.be/")) {
    try {
      const parsedUrl = new URL(normalisedUrl);
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      const [, videoId] = normalisedUrl.split("youtu.be/");
      return videoId
        ? `https://www.youtube.com/embed/${videoId.split(/[?&]/)[0]}`
        : null;
    }
  }

  return null;
}

function hasPlayableVideoUrl(url?: string) {
  return !isPlaceholderVideoUrl(url);
}

function normaliseAnswer(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .toLowerCase()
    .trim()
    .replace(/\blocal\s+max\b/g, "local maximum")
    .replace(/\blocal\s+min\b/g, "local minimum")
    .replace(/\bmax\b/g, "maximum")
    .replace(/\bmin\b/g, "minimum")
    .replace(/\s*([+\-])\s*/g, "$1")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, "");
}

function answerOptions(question: PracticeQuestion) {
  const options = [question.answer, ...(question.acceptedAnswers ?? [])];
  const normalisedAnswer = normaliseAnswer(question.answer);

  if (normalisedAnswer === "localmaximum") {
    options.push("local max", "maximum", "max");
  }

  if (normalisedAnswer === "localminimum") {
    options.push("local min", "minimum", "min");
  }

  if (normalisedAnswer === "maximum") {
    options.push("max");
  }

  if (normalisedAnswer === "minimum") {
    options.push("min");
  }

  return options;
}

function questionParts(question: PracticeQuestion) {
  return question.parts?.filter((part) => part.answer.trim()) ?? [];
}

function hasQuestionParts(question: PracticeQuestion) {
  return questionParts(question).length > 0;
}

function partAcceptedAnswers(part: PracticeQuestionPart) {
  return part.acceptedAnswers ?? [];
}

function partMarks(part: PracticeQuestionPart) {
  return Number.isFinite(part.marks) && part.marks > 0 ? part.marks : 1;
}

// A runtime answer-leak check used to hide any latex whose compacted digits
// happened to contain the answer string. It false-positived and deleted
// essential question setup (e.g. the rate function "C'(x)=4x+10, 0≤x≤5" was
// hidden because "+10" abutting the "0" bound reads as the answer "100").
// Giveaways are now removed at the source content layer, so latex is shown as
// authored. Only genuine placeholder MCQ-instruction latex is still hidden.

function safeQuestionLatex(question: PracticeQuestion) {
  if (isGenericMcqInstructionLatex(question.latex)) {
    return null;
  }

  return question.latex;
}

function safePartLatex(part: PracticeQuestionPart) {
  return part.latex;
}

function serialisePartAnswers(answers: Record<string, string>) {
  return JSON.stringify({ parts: answers });
}

function parsePartAnswers(value: string) {
  try {
    const parsed = JSON.parse(value) as { parts?: unknown };
    if (!parsed.parts || typeof parsed.parts !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed.parts as Record<string, unknown>).map(([key, answer]) => [
        key,
        typeof answer === "string" ? answer : String(answer ?? ""),
      ])
    );
  } catch {
    return {};
  }
}

function isCorrectPart(part: PracticeQuestionPart, value: string) {
  return markTypedAnswer({
    userAnswer: value,
    correctAnswer: part.answer,
    acceptedAnswers: partAcceptedAnswers(part),
  }).correct;
}

function isCorrectAnswer(question: PracticeQuestion, value: string) {
  const parts = questionParts(question);
  if (parts.length > 0) {
    const answers = parsePartAnswers(value);
    return parts.every((part) => {
      const answer = answers[part.key]?.trim() ?? "";
      return answer.length > 0 && isCorrectPart(part, answer);
    });
  }

  if (!question.choices) {
    return markTypedAnswer({
      userAnswer: value,
      correctAnswer: question.answer,
      acceptedAnswers: answerOptions(question).slice(1),
    }).correct;
  }

  const userAnswer = normaliseAnswer(value);

  return answerOptions(question).some(
    (acceptedAnswer) => userAnswer === normaliseAnswer(acceptedAnswer)
  );
}

function formatPercent(score: number) {
  return `${Math.round(score * 100)}%`;
}

/**
 * Tier-1 CAS check for a single typed answer from the browser. Returns true only
 * if the CAS service confirms equivalence. Skips the call for empty or plainly-
 * numeric answers, and returns false on any failure (caller keeps "incorrect").
 */
async function casCheckClient(
  student: string,
  correctAnswer: string,
  acceptedAnswers: string[]
): Promise<boolean> {
  if (!student.trim() || !looksSymbolic(student, correctAnswer)) return false;
  try {
    const res = await fetch("/api/cas/equiv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student, correctAnswer, acceptedAnswers }),
    });
    if (!res.ok) return false;
    const verdict = await res.json();
    return verdict.equivalent === true;
  } catch {
    return false;
  }
}

type SemanticCheckResult = {
  status: "correct" | "incorrect" | "unavailable";
  feedbackKeys: string[];
};

function isShortExplanation(question: PracticeQuestion) {
  return question.responseType === "short_explanation";
}

async function semanticCheckClient(
  question: PracticeQuestion,
  answer: string
): Promise<SemanticCheckResult> {
  if (
    !isShortExplanation(question) ||
    !question.modelSolution ||
    !question.markingRubric?.length ||
    !question.markingFeedbackOptions?.length
  ) {
    return { status: "unavailable", feedbackKeys: [] };
  }

  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return { status: "unavailable", feedbackKeys: [] };

    const response = await fetch("/api/mark-proof", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: {
          mode: "short_explanation",
          prompt: question.prompt,
          latex: question.latex,
          modelSolution: question.modelSolution,
          rubric: question.markingRubric,
          feedbackOptions: question.markingFeedbackOptions,
        },
        answer,
      }),
    });
    if (!response.ok) return { status: "unavailable", feedbackKeys: [] };

    const verdict = (await response.json()) as {
      correct?: unknown;
      feedbackKeys?: unknown;
    };
    if (typeof verdict.correct !== "boolean") {
      return { status: "unavailable", feedbackKeys: [] };
    }

    const allowedKeys = new Set(
      question.markingFeedbackOptions.map((option) => option.key)
    );
    const feedbackKeys = Array.isArray(verdict.feedbackKeys)
      ? verdict.feedbackKeys.filter(
          (key): key is string => typeof key === "string" && allowedKeys.has(key)
        )
      : [];
    return {
      status: verdict.correct ? "correct" : "incorrect",
      feedbackKeys,
    };
  } catch {
    return { status: "unavailable", feedbackKeys: [] };
  }
}

/**
 * Ask the CAS service which locally-rejected quiz answers are actually
 * equivalent forms. Returns a map of questionId -> true for upgrades.
 *
 * Covers single typed answers and multi-part questions (the latter pass only if
 * EVERY part is correct via local marking or CAS). MCQ is skipped; multi-step is
 * already CAS-checked per step during interaction, so by submit its value is
 * either already correct or genuinely skipped. Any failure leaves the answer
 * as locally marked.
 */
async function resolveQuizMarkingOverrides(
  questions: PracticeQuestion[],
  answers: Record<string, string>
): Promise<{
  correctIds: Record<string, boolean>;
  semanticUnavailable: boolean;
}> {
  const correctIds: Record<string, boolean> = {};
  let semanticUnavailable = false;

  await Promise.all(
    questions.map(async (question) => {
      const value = (answers[question.id] ?? "").trim();
      if (!value) return;
      if (isCorrectAnswer(question, value)) return; // already correct locally

      if (isShortExplanation(question)) {
        const verdict = await semanticCheckClient(question, value);
        if (verdict.status === "correct") correctIds[question.id] = true;
        if (verdict.status === "unavailable") semanticUnavailable = true;
        return;
      }

      // Multi-part: correct only if every part passes (local or CAS).
      if (hasQuestionParts(question)) {
        const parts = questionParts(question);
        const partAnswers = parsePartAnswers(value);
        const checks = await Promise.all(
          parts.map(async (part) => {
            const pa = (partAnswers[part.key] ?? "").trim();
            if (!pa) return false;
            if (isCorrectPart(part, pa)) return true;
            return casCheckClient(pa, part.answer, partAcceptedAnswers(part));
          })
        );
        if (checks.every(Boolean)) correctIds[question.id] = true;
        return;
      }

      // MCQ and multi-step are not single-typed-answer upgradeable here.
      if (question.choices || (question.steps?.length ?? 0) > 0) return;

      // Single typed answer.
      if (await casCheckClient(value, question.answer, question.acceptedAnswers ?? [])) {
        correctIds[question.id] = true;
      }
    })
  );

  return { correctIds, semanticUnavailable };
}

function choiceAnswerText(question: PracticeQuestion, answer: string) {
  if (answer === MULTI_STEP_SKIPPED) return "Not all steps answered correctly";

  const parts = questionParts(question);
  if (parts.length > 0) {
    const answers = parsePartAnswers(answer);
    const text = parts
      .map((part) => {
        const partAnswer =
          answer === question.answer ? part.answer : answers[part.key]?.trim();
        return `${part.label}: ${partAnswer || "No answer"}`;
      })
      .join("; ");
    return text || "No answer submitted";
  }

  if (!question.choices) {
    return answer.trim() || "No answer submitted";
  }

  const selectedChoice = question.choices.find(
    (choice) => normaliseAnswer(choice.label) === normaliseAnswer(answer)
  );

  if (!selectedChoice) {
    return answer.trim() || "No answer submitted";
  }

  return `${selectedChoice.label}. ${selectedChoice.text}`;
}

const MULTI_STEP_SKIPPED = "__SKIPPED__";

function MultiPartPracticeCard({
  question,
  index,
}: {
  question: PracticeQuestion;
  index: number;
}) {
  const parts = questionParts(question);
  const questionLatex = safeQuestionLatex(question);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, "correct" | "incorrect">>({});
  const [checkingParts, setCheckingParts] = useState<Record<string, boolean>>({});
  const allAnsweredCorrectly =
    parts.length > 0 && parts.every((part) => results[part.key] === "correct");
  const checkedParts = parts.filter((part) => results[part.key]);
  const marksEarned = checkedParts.reduce(
    (sum, part) => sum + (results[part.key] === "correct" ? partMarks(part) : 0),
    0
  );
  const marksAvailable = checkedParts.reduce((sum, part) => sum + partMarks(part), 0);

  function updateAnswer(key: string, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setResults((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function checkPart(part: PracticeQuestionPart) {
    const answer = answers[part.key] ?? "";
    if (!answer.trim()) return;
    if (isCorrectPart(part, answer)) {
      setResults((current) => ({ ...current, [part.key]: "correct" }));
      return;
    }
    // Tier 1: accept an equivalent form for this part before marking it wrong.
    setCheckingParts((current) => ({ ...current, [part.key]: true }));
    const casOk = await casCheckClient(
      answer,
      part.answer,
      partAcceptedAnswers(part)
    );
    setCheckingParts((current) => {
      const next = { ...current };
      delete next[part.key];
      return next;
    });
    setResults((current) => ({
      ...current,
      [part.key]: casOk ? "correct" : "incorrect",
    }));
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">Question {index + 1}</p>
        <p className="mt-2 font-medium">
          <MathText text={question.prompt} />
        </p>
        {questionLatex && (
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={questionLatex} />
          </div>
        )}
        <VisualPayloadRenderer {...question} />
      </div>

      <div className="space-y-4">
        {parts.map((part) => {
          const partLatex = safePartLatex(part);
          const result = results[part.key];
          return (
            <div key={part.key} className="space-y-3 rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">
                  <span className="mr-2 text-slate-500">{part.label}</span>
                  <MathText text={part.prompt} />
                </p>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {partMarks(part)} {partMarks(part) === 1 ? "mark" : "marks"}
                </span>
              </div>
              {partLatex && (
                <div className="overflow-x-auto rounded-xl bg-slate-50 p-3">
                  <BlockMath math={partLatex} />
                </div>
              )}
              <MathAnswerInput
                value={answers[part.key] ?? ""}
                onChange={(value) => updateAnswer(part.key, value)}
                ariaLabel={`Answer for ${part.label}`}
                placeholder="Type your answer"
              />
              <button
                type="button"
                onClick={() => checkPart(part)}
                disabled={!answers[part.key]?.trim() || checkingParts[part.key]}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40"
              >
                {checkingParts[part.key] ? "Checking…" : `Check ${part.label}`}
              </button>
              {result && (
                <div
                  className={`rounded-xl p-3 text-sm ${
                    result === "correct"
                      ? "bg-green-50 text-green-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <p className="font-semibold">
                    {result === "correct" ? "Correct." : "Not quite."}
                  </p>
                  <p className="mt-1 font-medium">
                    Marks: {result === "correct" ? partMarks(part) : 0} / {partMarks(part)}
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg bg-white/70 p-2">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
                        Your answer
                      </p>
                      <p className="mt-1 font-medium">
                        <MathText text={answers[part.key]?.trim() || "No answer submitted"} />
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/70 p-2">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
                        Correct answer
                      </p>
                      <p className="mt-1 font-medium">
                        <MathText text={part.answer} />
                      </p>
                    </div>
                  </div>
                  <p className="mt-1">
                    <MathText text={part.explanation} />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allAnsweredCorrectly && (
        <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
          All parts correct.
        </div>
      )}
      {!allAnsweredCorrectly && checkedParts.length > 0 && (
        <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
          Marks checked so far: {marksEarned} / {marksAvailable}
        </div>
      )}
    </div>
  );
}

function MultiPartQuizQuestion({
  question,
  index,
  value,
  onChange,
}: {
  question: PracticeQuestion;
  index: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const parts = questionParts(question);
  const answers = parsePartAnswers(value);
  const questionLatex = safeQuestionLatex(question);

  function updateAnswer(key: string, answer: string) {
    onChange(serialisePartAnswers({ ...answers, [key]: answer }));
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">Question {index + 1}</p>
        <p className="mt-2 font-medium">
          <MathText text={question.prompt} />
        </p>
        {questionLatex && (
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={questionLatex} />
          </div>
        )}
        <VisualPayloadRenderer {...question} />
      </div>

      <div className="space-y-4">
        {parts.map((part) => {
          const partLatex = safePartLatex(part);
          return (
          <div key={part.key} className="space-y-3 rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">
                <span className="mr-2 text-slate-500">{part.label}</span>
                <MathText text={part.prompt} />
              </p>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {part.marks} {part.marks === 1 ? "mark" : "marks"}
              </span>
            </div>
            {partLatex && (
              <div className="overflow-x-auto rounded-xl bg-slate-50 p-3">
                <BlockMath math={partLatex} />
              </div>
            )}
            <MathAnswerInput
              value={answers[part.key] ?? ""}
              onChange={(next) => updateAnswer(part.key, next)}
              ariaLabel={`Answer for ${part.label}`}
              placeholder="Type your answer"
            />
          </div>
          );
        })}
      </div>
    </div>
  );
}

function MultiPartReviewDetails({
  question,
  submittedAnswer,
}: {
  question: PracticeQuestion;
  submittedAnswer: string;
}) {
  const parts = questionParts(question);
  const answers = parsePartAnswers(submittedAnswer);
  const marksEarned = parts.reduce((sum, part) => {
    const answer = answers[part.key]?.trim() ?? "";
    return sum + (answer.length > 0 && isCorrectPart(part, answer) ? partMarks(part) : 0);
  }, 0);
  const marksAvailable = parts.reduce((sum, part) => sum + partMarks(part), 0);

  if (parts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">
        Marks: {marksEarned} / {marksAvailable}
      </div>
      {parts.map((part) => (
        <div key={part.key} className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-slate-900">{part.label}</p>
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
              {answers[part.key]?.trim() && isCorrectPart(part, answers[part.key])
                ? partMarks(part)
                : 0}{" "}
              / {partMarks(part)} marks
            </span>
          </div>
          <p className="mt-2 text-slate-800">
            <MathText text={part.prompt} />
          </p>
          {safePartLatex(part) && (
            <div className="mt-2 overflow-x-auto rounded-xl bg-slate-50 p-3">
              <BlockMath math={safePartLatex(part)!} />
            </div>
          )}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your answer
              </p>
              <p className="mt-1 font-medium">
                <MathText text={answers[part.key]?.trim() || "No answer submitted"} />
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Correct answer
              </p>
              <p className="mt-1 font-medium text-green-900">
                <MathText text={part.answer} />
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Explanation
            </p>
            <p className="mt-1">
              <MathText text={part.explanation} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function masteryStorageKey(moduleSlug: string, lessonSlug: string) {
  if (moduleSlug === "differential-calculus") {
    return `hsc-maths-coach:mastery:${lessonSlug}`;
  }

  return `hsc-maths-coach:mastery:${moduleSlug}:${lessonSlug}`;
}

function ChoiceButtons({
  question,
  value,
  onChange,
}: {
  question: PracticeQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  if (!question.choices) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Choose an answer</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {question.choices.map((choice) => {
          const isSelected =
            normaliseAnswer(value) === normaliseAnswer(choice.label);

          return (
            <button
              key={choice.label}
              type="button"
              onClick={() => onChange(choice.label)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <span className="font-semibold">{choice.label}.</span>{" "}
              <MathText text={choice.text} />
              <VisualPayloadRenderer {...choice} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PracticeCard({
  question,
  index,
  courseSlug,
  unitSlug,
  lessonSlug,
  section,
}: {
  question: PracticeQuestion;
  index: number;
  courseSlug?: string;
  unitSlug?: string;
  lessonSlug: string;
  section: "guided-practice" | "independent-practice";
}) {
  const questionLatex = safeQuestionLatex(question);
  // Single-step state
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<
    "correct" | "incorrect" | "unavailable" | null
  >(null);
  const [semanticFeedbackKeys, setSemanticFeedbackKeys] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);

  // Multi-step state (all hooks called unconditionally)
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState("");
  const [stepResult, setStepResult] = useState<"correct" | "incorrect" | null>(null);
  const [stepAttempts, setStepAttempts] = useState(0);
  const [stepChecking, setStepChecking] = useState(false);
  const [anyStepSkipped, setAnyStepSkipped] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);
  const [stepsDone, setStepsDone] = useState(false);

  const steps = question.steps;
  const isMultiStep = (steps?.length ?? 0) > 0;

  if (hasQuestionParts(question)) {
    return <MultiPartPracticeCard question={question} index={index} />;
  }

  if (isMultiStep) {
    const allSteps = steps!;
    const totalSteps = allSteps.length;

    if (stepsDone) {
      return (
        <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Question {index + 1}
            </p>
            <p className="mt-2 font-medium">
              <MathText text={question.prompt} />
            </p>
            {questionLatex ? (
              <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
                <BlockMath math={questionLatex} />
              </div>
            ) : null}
          </div>
          {anyStepSkipped ? (
            <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
              Some steps were not answered correctly. Review the worked example and try the question again when ready.
            </div>
          ) : (
            <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
              All steps completed correctly.
            </div>
          )}
        </div>
      );
    }

    const step = allSteps[stepIndex];

    async function checkStepAnswer() {
      const local = markTypedAnswer({
        userAnswer: stepAnswer,
        correctAnswer: step.answer,
        acceptedAnswers: step.acceptedAnswers ?? [],
      }).correct;
      if (local) {
        setStepResult("correct");
        return;
      }
      // Tier 1: equivalent forms (e.g. factored/reordered) before marking wrong.
      setStepChecking(true);
      const casOk = await casCheckClient(
        stepAnswer,
        step.answer,
        step.acceptedAnswers ?? []
      );
      setStepChecking(false);
      setStepResult(casOk ? "correct" : "incorrect");
      if (!casOk) setStepAttempts((a) => a + 1);
    }

    function advanceStep(skipped: boolean) {
      if (skipped) setAnyStepSkipped(true);
      if (stepIndex + 1 >= totalSteps) {
        setStepsDone(true);
      } else {
        setStepIndex((s) => s + 1);
        setStepAnswer("");
        setStepResult(null);
        setStepAttempts(0);
        setShowStepHint(false);
      }
    }

    return (
      <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Question {index + 1}
          </p>
          <p className="mt-2 font-medium">
            <MathText text={question.prompt} />
          </p>
          {questionLatex ? (
            <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={questionLatex} />
            </div>
          ) : null}
        </div>

        <p className="text-sm font-semibold text-slate-500">
          Step {stepIndex + 1} of {totalSteps}
        </p>

        <div>
          <p className="font-medium">
            <MathText text={step.prompt} />
          </p>
          {step.latex ? (
            <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={step.latex} />
            </div>
          ) : null}
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <MathAnswerInput
            value={stepAnswer}
            onChange={(v) => {
              setStepAnswer(v);
              setStepResult(null);
            }}
            disabled={stepResult === "correct"}
            ariaLabel="Your answer"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={checkStepAnswer}
            disabled={stepResult === "correct" || stepChecking}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {stepChecking ? "Checking…" : "Check answer"}
          </button>
          {step.hint && (
            <button
              type="button"
              onClick={() => setShowStepHint(!showStepHint)}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              {showStepHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>

        {showStepHint && step.hint && (
          <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
            <MathText text={step.hint} />
          </div>
        )}

        {stepResult === "correct" && (
          <div className="space-y-2 rounded-xl bg-green-50 p-3 text-sm">
            <p className="font-medium text-green-800">Correct.</p>
            <p className="text-green-900">
              <MathText text={step.explanation} />
            </p>
            <button
              type="button"
              onClick={() => advanceStep(false)}
              className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              {stepIndex + 1 < totalSteps ? "Next step" : "Finish"}
            </button>
          </div>
        )}

        {stepResult === "incorrect" && (
          <div className="space-y-2 rounded-xl bg-red-50 p-3 text-sm">
            <p className="font-medium text-red-800">
              Not quite.{stepAttempts < 2 ? " Check the explanation and try again." : ""}
            </p>
            <p className="text-red-900">
              <MathText text={step.explanation} />
            </p>
            {stepAttempts >= 2 && (
              <button
                type="button"
                onClick={() => advanceStep(true)}
                className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Continue anyway
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  async function checkAnswer() {
    if (isCorrectAnswer(question, answer)) {
      setResult("correct");
      return;
    }
    if (isShortExplanation(question)) {
      if (!answer.trim()) {
        setResult("incorrect");
        return;
      }
      setChecking(true);
      const verdict = await semanticCheckClient(question, answer);
      setSemanticFeedbackKeys(verdict.feedbackKeys);
      setResult(verdict.status);
      setChecking(false);
      return;
    }
    // MCQ, empty, or plainly-numeric answers can't be rescued by symbolic CAS.
    if (
      question.choices ||
      !answer.trim() ||
      !looksSymbolic(answer, question.answer)
    ) {
      setResult("incorrect");
      return;
    }
    // Tier 1: ask the CAS service whether this is an equivalent form.
    setChecking(true);
    try {
      const res = await fetch("/api/cas/equiv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: answer,
          correctAnswer: question.answer,
          acceptedAnswers: question.acceptedAnswers ?? [],
        }),
      });
      const verdict = res.ok ? await res.json() : { equivalent: false };
      setResult(verdict.equivalent ? "correct" : "incorrect");
    } catch {
      setResult("incorrect");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Question {index + 1}
        </p>

        <p className="mt-2 font-medium">
          <MathText text={question.prompt} />
        </p>

        {questionLatex ? (
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={questionLatex} />
          </div>
        ) : null}

        <VisualPayloadRenderer {...question} />
      </div>

      {question.choices ? (
        <ChoiceButtons
          question={question}
          value={answer}
          onChange={(value) => {
            setAnswer(value);
            setResult(null);
            setSemanticFeedbackKeys([]);
          }}
        />
      ) : (
        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          {isShortExplanation(question) ? (
            <textarea
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
                setResult(null);
                setSemanticFeedbackKeys([]);
              }}
              rows={3}
              aria-label="Your answer"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          ) : (
            <MathAnswerInput
              value={answer}
              onChange={(v) => {
                setAnswer(v);
                setResult(null);
              }}
              ariaLabel="Your answer"
            />
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={checkAnswer}
          disabled={checking}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {checking ? "Checking…" : "Check answer"}
        </button>
      </div>

      {result === "correct" && (
        <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
          Correct.
        </div>
      )}

      {result === "incorrect" && (
        <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">
          {semanticFeedbackKeys.length > 0
            ? question.markingFeedbackOptions
                ?.filter((option) => semanticFeedbackKeys.includes(option.key))
                .map((option) => option.text)
                .join(" ")
            : "Not quite. Check the key idea and try again."}
        </div>
      )}

      {result === "unavailable" && (
        <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
          This answer could not be marked right now. Please try again.
        </div>
      )}

      <HintLadder
        question={question}
        courseSlug={courseSlug}
        unitSlug={unitSlug}
        lessonSlug={lessonSlug}
        section={section}
      />

      <TutorPanel
        question={question}
        courseSlug={courseSlug}
        topicSlug={unitSlug}
        subtopicSlug={lessonSlug}
      />
    </div>
  );
}

// Memo wrapper with a per-question stable onChange so typing in one quiz
// answer doesn't re-render (and re-run KaTeX for) every other question.
const MemoQuizQuestion = memo(function MemoQuizQuestion({
  question,
  index,
  value,
  onAnswer,
}: {
  question: PracticeQuestion;
  index: number;
  value: string;
  onAnswer: (questionId: string, value: string) => void;
}) {
  const handleChange = useCallback(
    (nextValue: string) => onAnswer(question.id, nextValue),
    [onAnswer, question.id]
  );
  return (
    <QuizQuestion
      question={question}
      index={index}
      value={value}
      onChange={handleChange}
    />
  );
});

function QuizQuestion({
  question,
  index,
  value,
  onChange,
}: {
  question: PracticeQuestion;
  index: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const questionLatex = safeQuestionLatex(question);
  // Multi-step state (all hooks called unconditionally)
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState("");
  const [stepResult, setStepResult] = useState<"correct" | "incorrect" | null>(null);
  const [stepAttempts, setStepAttempts] = useState(0);
  const [stepChecking, setStepChecking] = useState(false);
  const [anyStepSkipped, setAnyStepSkipped] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);

  const steps = question.steps;
  const isMultiStep = (steps?.length ?? 0) > 0;

  if (hasQuestionParts(question)) {
    return (
      <MultiPartQuizQuestion
        question={question}
        index={index}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (isMultiStep) {
    const allSteps = steps!;
    const totalSteps = allSteps.length;
    const isCompleted = value === question.answer || value === MULTI_STEP_SKIPPED;

    const questionHeader = (
      <div>
        <p className="text-sm font-medium text-slate-500">Question {index + 1}</p>
        <p className="mt-2 font-medium">
          <MathText text={question.prompt} />
        </p>
        {questionLatex ? (
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={questionLatex} />
          </div>
        ) : null}
      </div>
    );

    if (isCompleted) {
      return (
        <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
          {questionHeader}
          {value === question.answer ? (
            <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
              All steps completed correctly.
            </div>
          ) : (
            <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
              Not all steps answered correctly — this question will count as incorrect.
            </div>
          )}
        </div>
      );
    }

    const step = allSteps[stepIndex];

    async function checkStepAnswer() {
      const local = markTypedAnswer({
        userAnswer: stepAnswer,
        correctAnswer: step.answer,
        acceptedAnswers: step.acceptedAnswers ?? [],
      }).correct;
      if (local) {
        setStepResult("correct");
        return;
      }
      // Tier 1: equivalent forms (e.g. factored/reordered) before marking wrong.
      setStepChecking(true);
      const casOk = await casCheckClient(
        stepAnswer,
        step.answer,
        step.acceptedAnswers ?? []
      );
      setStepChecking(false);
      setStepResult(casOk ? "correct" : "incorrect");
      if (!casOk) setStepAttempts((a) => a + 1);
    }

    function advanceStep(skipped: boolean) {
      const nextAnySkipped = anyStepSkipped || skipped;
      if (skipped) setAnyStepSkipped(true);
      if (stepIndex + 1 >= totalSteps) {
        onChange(nextAnySkipped ? MULTI_STEP_SKIPPED : question.answer);
      } else {
        setStepIndex((s) => s + 1);
        setStepAnswer("");
        setStepResult(null);
        setStepAttempts(0);
        setShowStepHint(false);
      }
    }

    return (
      <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
        {questionHeader}

        <p className="text-sm font-semibold text-slate-500">
          Step {stepIndex + 1} of {totalSteps}
        </p>

        <div>
          <p className="font-medium">
            <MathText text={step.prompt} />
          </p>
          {step.latex ? (
            <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={step.latex} />
            </div>
          ) : null}
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <MathAnswerInput
            value={stepAnswer}
            onChange={(v) => {
              setStepAnswer(v);
              setStepResult(null);
            }}
            disabled={stepResult === "correct"}
            ariaLabel="Your answer"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={checkStepAnswer}
            disabled={stepResult === "correct" || stepChecking}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {stepChecking ? "Checking…" : "Check answer"}
          </button>
          {step.hint && (
            <button
              type="button"
              onClick={() => setShowStepHint(!showStepHint)}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              {showStepHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>

        {showStepHint && step.hint && (
          <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
            <MathText text={step.hint} />
          </div>
        )}

        {stepResult === "correct" && (
          <div className="space-y-2 rounded-xl bg-green-50 p-3 text-sm">
            <p className="font-medium text-green-800">Correct.</p>
            <p className="text-green-900">
              <MathText text={step.explanation} />
            </p>
            <button
              type="button"
              onClick={() => advanceStep(false)}
              className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              {stepIndex + 1 < totalSteps ? "Next step" : "Finish"}
            </button>
          </div>
        )}

        {stepResult === "incorrect" && (
          <div className="space-y-2 rounded-xl bg-red-50 p-3 text-sm">
            <p className="font-medium text-red-800">
              Not quite.{stepAttempts < 2 ? " Check the explanation and try again." : ""}
            </p>
            <p className="text-red-900">
              <MathText text={step.explanation} />
            </p>
            {stepAttempts >= 2 && (
              <button
                type="button"
                onClick={() => advanceStep(true)}
                className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Continue anyway
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Question {index + 1}
        </p>
        <p className="mt-2 font-medium">
          <MathText text={question.prompt} />
        </p>
        {questionLatex ? (
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={questionLatex} />
          </div>
        ) : null}

        <VisualPayloadRenderer {...question} />
      </div>

      {question.choices ? (
        <ChoiceButtons question={question} value={value} onChange={onChange} />
      ) : (
        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          {isShortExplanation(question) ? (
            <textarea
              value={value}
              onChange={(event) => onChange(event.target.value)}
              rows={3}
              aria-label="Your answer"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          ) : (
            <MathAnswerInput
              value={value}
              onChange={onChange}
              ariaLabel="Your answer"
            />
          )}
        </div>
      )}
    </div>
  );
}

function MasteryResultPanel({
  correctCount,
  totalQuestions,
  passMark,
  questions,
  answers,
  casCorrectIds,
  onTryAgain,
  onReviewLesson,
  nextHref,
  nextLabel,
  backHref,
  attemptNumber,
  courseSlug,
  topicSlug,
  subtopicSlug,
}: {
  correctCount: number;
  totalQuestions: number;
  passMark: number;
  questions: PracticeQuestion[];
  answers: Record<string, string>;
  casCorrectIds: Record<string, boolean>;
  onTryAgain: () => void;
  onReviewLesson: () => void;
  nextHref?: string;
  nextLabel?: string;
  backHref: string;
  attemptNumber: number;
  courseSlug?: string;
  topicSlug?: string;
  subtopicSlug?: string;
}) {
  const score = correctCount / totalQuestions;
  const passed = score >= passMark;
  const showCoach = !passed && attemptNumber >= 2;
  const requiredCorrect = Math.ceil(passMark * totalQuestions);
  const incorrectQuestions = questions
    .map((question, index) => ({ question, quizIndex: index }))
    .filter(
      ({ question }) =>
        !isCorrectAnswer(question, answers[question.id] ?? "") &&
        !casCorrectIds[question.id]
    );

  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    if (!showCoach) return;
    clientTrackEvent("learning_coach_shown", {
      coach_variant: "generic_v1",
      attempt_number: attemptNumber,
      course_slug: courseSlug ?? null,
      topic_slug: topicSlug ?? null,
      subtopic_slug: subtopicSlug ?? null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCoach]);

  if (passed) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-50 p-4 text-sm text-green-900">
          <p className="font-semibold">
            Passed: {correctCount} out of {totalQuestions} (
            {formatPercent(score)}).
          </p>
          <p className="mt-1">
            Nice work. You have met the mastery mark for this lesson.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {nextHref ? (
              <Link
                href={nextHref}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
              >
                {nextLabel ? `Next: ${nextLabel}` : "Next lesson"} →
              </Link>
            ) : null}
            <Link
              href={backHref}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Back to unit
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {incorrectQuestions.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white text-sm text-slate-800">
            <button
              type="button"
              onClick={() => setReviewOpen((open) => !open)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-semibold text-slate-900">
                Review missed questions ({incorrectQuestions.length})
              </span>
              <span className="ml-2 text-slate-500" aria-hidden="true">
                {reviewOpen ? "▲" : "▼"}
              </span>
            </button>
            {reviewOpen && (
            <div className="space-y-3 border-t border-slate-200 p-4">
            {incorrectQuestions.map(({ question, quizIndex }) => {
              const submittedAnswer = answers[question.id] ?? "";
              return (
                <div
                  key={question.id}
                  className="space-y-3 rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Question {quizIndex + 1}
                    </p>
                    <p className="mt-1 font-medium">
                      <MathText text={question.prompt} />
                    </p>
                    {question.latex && (
                      <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-3">
                        <BlockMath math={question.latex} />
                      </div>
                    )}
                    <VisualPayloadRenderer {...question} />
                  </div>

                  {hasQuestionParts(question) ? (
                    <MultiPartReviewDetails
                      question={question}
                      submittedAnswer={submittedAnswer}
                    />
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Your answer
                        </p>
                        <p className="mt-1 font-medium">
                          <MathText text={choiceAnswerText(question, submittedAnswer)} />
                        </p>
                      </div>
                      <div className="rounded-xl bg-green-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                          Correct answer
                        </p>
                        <p className="mt-1 font-medium text-green-900">
                          <MathText text={choiceAnswerText(question, question.answer)} />
                        </p>
                      </div>
                    </div>
                  )}

                  {!hasQuestionParts(question) && question.explanation && (
                    <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Explanation
                      </p>
                      <p className="mt-1">
                        <MathText text={question.explanation} />
                      </p>
                    </div>
                  )}

                  {question.hint && (
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                        Hint
                      </p>
                      <p className="mt-1">
                        <MathText text={question.hint} />
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <div>
        <p className="font-semibold">
          Score: {correctCount} out of {totalQuestions} (
          {formatPercent(score)}).
        </p>
        <p className="mt-1">
          You need {requiredCorrect} out of {totalQuestions} to pass.
        </p>
        <p className="mt-2">
          Not quite yet. Review the questions below, then try again when you
          are ready.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">Questions to review</h3>
        {incorrectQuestions.map(({ question, quizIndex }) => {
          const submittedAnswer = answers[question.id] ?? "";

          return (
            <div
              key={question.id}
              className="space-y-3 rounded-xl border border-amber-200 bg-white p-4 text-slate-800"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Question {quizIndex + 1}
                </p>
                <p className="mt-1 font-medium">
                  <MathText text={question.prompt} />
                </p>
                {question.latex && (
                  <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-3">
                    <BlockMath math={question.latex} />
                  </div>
                )}
                <VisualPayloadRenderer {...question} />
              </div>

              {hasQuestionParts(question) ? (
                <MultiPartReviewDetails
                  question={question}
                  submittedAnswer={submittedAnswer}
                />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Your answer
                    </p>
                    <p className="mt-1 font-medium">
                      <MathText
                        text={choiceAnswerText(question, submittedAnswer)}
                      />
                    </p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                      Correct answer
                    </p>
                    <p className="mt-1 font-medium text-green-900">
                      <MathText
                        text={choiceAnswerText(question, question.answer)}
                      />
                    </p>
                  </div>
                </div>
              )}

              {!hasQuestionParts(question) && question.explanation && (
                <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Explanation
                  </p>
                  <p className="mt-1">
                    <MathText text={question.explanation} />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {attemptNumber >= 2 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-semibold">Learning Coach</p>
          <p className="mt-1">
            You&apos;ve attempted this quiz {attemptNumber} times. Here&apos;s what usually helps:
          </p>
          <ul className="mt-2 space-y-1 pl-4 list-disc">
            <li>
              <button
                type="button"
                onClick={() => {
                  clientTrackEvent("learning_coach_reread_clicked", {
                    coach_variant: "generic_v1",
                    attempt_number: attemptNumber,
                    course_slug: courseSlug ?? null,
                    topic_slug: topicSlug ?? null,
                    subtopic_slug: subtopicSlug ?? null,
                  });
                  onReviewLesson();
                }}
                className="underline underline-offset-2 hover:text-blue-700"
              >
                Re-read the lesson
              </button>{" "}
              — focus on the worked examples for the questions you got wrong.
            </li>
            <li>
              Use the{" "}
              <span className="font-medium">hint button</span> on any
              practice question you&apos;re unsure about before retrying the quiz.
            </li>
            <li>
              If you&apos;re still stuck, it&apos;s worth checking the previous lesson in
              this unit — there may be a gap in an earlier concept.
            </li>
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => {
            if (showCoach) {
              clientTrackEvent("learning_coach_retry_clicked", {
                coach_variant: "generic_v1",
                attempt_number: attemptNumber,
                course_slug: courseSlug ?? null,
                topic_slug: topicSlug ?? null,
                subtopic_slug: subtopicSlug ?? null,
              });
            }
            onTryAgain();
          }}
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={onReviewLesson}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
        >
          Back to Learn
        </button>
      </div>
    </div>
  );
}

export function LessonRenderer({
  courseSlug,
  unitSlug,
  lessonSlug,
  lessons,
  backHref,
  backLabel,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: {
  courseSlug?: string;
  unitSlug?: string;
  lessonSlug: string;
  lessons: ExplicitLesson[];
  backHref: string;
  backLabel: string;
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  const [activeStage, setActiveStage] = useState<LessonStage>(firstContentStage);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const handleQuizAnswerChange = useCallback((questionId: string, value: string) => {
    setQuizAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
    setQuizSubmitted(false);
    setQuizMarkingError(null);
  }, []);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // Seed for the per-attempt mastery-quiz draw (when a lesson has a question
  // pool). A fresh seed on each lesson load / retry re-rolls the selection.
  const [quizAttemptSeed, setQuizAttemptSeed] = useState<number>(() =>
    Math.floor(Math.random() * 0x7fffffff)
  );
  // Question ids the CAS service upgraded to correct at submit time (equivalent
  // forms or semantic responses the local marker could not grade). Resets on retry.
  const [casCorrectIds, setCasCorrectIds] = useState<Record<string, boolean>>({});
  const [quizChecking, setQuizChecking] = useState(false);
  const [quizMarkingError, setQuizMarkingError] = useState<string | null>(null);
  const [masteryState, setMasteryState] = useState<MasteryState>({
    passed: false,
    completedStages: [],
  });
  // Mastery quizzes are a Premium feature: free users see an upgrade panel in
  // place of the quiz. null while the access check is still resolving.
  const hasPaidAccess = usePaidAccess();

  const lesson = useMemo(
    () => lessons.find((item) => item.slug === lessonSlug),
    [lessons, lessonSlug]
  );
  // The questions for this mastery attempt. With a pool this is a fresh
  // difficulty-ramped draw (re-rolled when quizAttemptSeed changes); without a
  // pool it's the lesson's fixed masteryQuiz.
  const activeQuiz = useMemo(
    () => (lesson ? buildMasteryQuiz(lesson, { seed: quizAttemptSeed }) : []),
    [lesson, quizAttemptSeed]
  );
  const currentLessonStages = useMemo(() => {
    const shouldShowWatchStage =
      WATCH_STAGE_ENABLED && hasPlayableVideoUrl(lesson?.video.url);
    const hasMultiPartPractice = (lesson?.multiPartPractice?.length ?? 0) > 0;

    return allLessonStages.filter((stage) => {
      if (stage.id === "watch") return shouldShowWatchStage;
      if (stage.id === "multi-part-practice") return hasMultiPartPractice;
      return true;
    });
  }, [lesson?.multiPartPractice?.length, lesson?.video.url]);
  const firstCurrentLessonStage =
    currentLessonStages[0]?.id ?? firstContentStage;

  const masteryStartedRef = useRef<string | null>(null);
  const progressChangedRef = useRef(false);
  const progressSyncRef = useRef(Promise.resolve());
  const masteryRecordedRef = useRef(false);
  // Tracks how many mastery quiz attempts have been started for this lesson load.
  const quizAttemptNumberRef = useRef(0);
  // Records the timestamp when the mastery quiz was opened (for time_on_quiz_seconds).
  const quizStartedAtRef = useRef<number | null>(null);

  function queueProgressSync(
    record: Parameters<typeof upsertLessonProgress>[1]
  ) {
    progressSyncRef.current = progressSyncRef.current.then(async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user) return;
        await upsertLessonProgress(data.user.id, record);
      } catch (error) {
        console.error("Could not sync lesson progress.", error);
      }
    });
  }

  useEffect(() => {
    progressChangedRef.current = false;
    setMasteryState({
      passed: false,
      completedStages: [],
    });

    if (!lesson) {
      return;
    }

    trackLessonViewed(lesson.courseTitle, lesson.moduleTitle, lesson.title);
    trackLessonStarted(courseSlug ?? "", unitSlug ?? "", lessonSlug);
    clientTrackEvent("lesson_started", {
      source: "lesson",
      lesson_slug: lessonSlug,
      course_slug: courseSlug ?? null,
      unit_slug: unitSlug ?? null,
      ...readMarketingParams(),
    });

    const storageKey = masteryStorageKey(lesson.moduleSlug, lessonSlug);
    let localState: MasteryState | null = null;

    try {
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        const storedState = JSON.parse(storedValue) as Partial<
          MasteryState & { sequenceLocked: boolean; mustCompleteLesson: boolean }
        >;

        localState = {
          passed: storedState.passed ?? false,
          completedStages: storedState.completedStages ?? [],
          lastScore: storedState.lastScore,
          updatedAt: storedState.updatedAt,
        };
        setMasteryState(localState);
      }
    } catch {
      localStorage.removeItem(storageKey);
    }

    if (!courseSlug || !unitSlug) return;
    const progressCourseSlug = courseSlug;
    const progressUnitSlug = unitSlug;

    let cancelled = false;
    async function loadRemoteProgress() {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user) return;

        const progress = await getUserCourseProgress(user.id, progressCourseSlug);
        const remoteRecord = progress[`${progressUnitSlug}/${lessonSlug}`];
        if (cancelled || progressChangedRef.current) return;

        if (!remoteRecord) {
          if (localState) {
            queueProgressSync({
              courseSlug: progressCourseSlug,
              unitSlug: progressUnitSlug,
              lessonSlug,
              passed: localState.passed,
              lastScore: localState.lastScore,
              completedStages: localState.completedStages,
            });
          }
          return;
        }

        const completedStages = remoteRecord.completedStages.filter(
          (stage): stage is LessonStage =>
            currentLessonStages.some((lessonStage) => lessonStage.id === stage)
        );
        const remoteState: MasteryState = {
          passed: remoteRecord.passed,
          completedStages,
          lastScore: remoteRecord.lastScore ?? undefined,
          updatedAt: remoteRecord.updatedAt,
        };
        const localUpdatedAt = Date.parse(localState?.updatedAt ?? "");
        const remoteUpdatedAt = Date.parse(remoteRecord.updatedAt ?? "");
        const shouldKeepLocalState =
          localState !== null &&
          Number.isFinite(localUpdatedAt) &&
          (!Number.isFinite(remoteUpdatedAt) || localUpdatedAt > remoteUpdatedAt);
        // Always trust the server for `passed` — local state is not authoritative
        // for this field and a student could manipulate localStorage to bypass the
        // mastery quiz. The DB lesson_progress.passed column is the source of truth.
        const hydratedState: MasteryState =
          shouldKeepLocalState && localState
            ? { ...localState, passed: remoteRecord.passed }
            : remoteState;

        setMasteryState(hydratedState);
        localStorage.setItem(storageKey, JSON.stringify(hydratedState));

        if (shouldKeepLocalState) {
          queueProgressSync({
            courseSlug: progressCourseSlug,
            unitSlug: progressUnitSlug,
            lessonSlug,
            passed: hydratedState.passed,
            lastScore: hydratedState.lastScore,
            completedStages: hydratedState.completedStages,
          });
        }
      } catch (error) {
        console.error("Could not load remote lesson progress.", error);
      }
    }

    void loadRemoteProgress();
    return () => {
      cancelled = true;
    };
  }, [courseSlug, currentLessonStages, lesson, lessonSlug, unitSlug]);

  useEffect(() => {
    setActiveStage(firstCurrentLessonStage);
    setVideoEnded(false);
    setVideoLoadFailed(false);
    setQuizAnswers({});
    setCasCorrectIds({});
    setQuizMarkingError(null);
    setQuizSubmitted(false);
    setQuizAttemptSeed(Math.floor(Math.random() * 0x7fffffff));
    masteryStartedRef.current = null;
  }, [firstCurrentLessonStage, lessonSlug]);

  useEffect(() => {
    if (activeStage !== "mastery-quiz" || !lesson) return;
    if (masteryStartedRef.current === lessonSlug) return;
    masteryStartedRef.current = lessonSlug;
    quizAttemptNumberRef.current += 1;
    quizStartedAtRef.current = Date.now();
    trackMasteryStarted(lesson.courseTitle, lesson.moduleTitle, lesson.title);
    clientTrackEvent("mastery_quiz_started", {
      course_slug: courseSlug ?? null,
      topic_slug: unitSlug ?? null,
      subtopic_slug: lessonSlug,
      attempt_number: quizAttemptNumberRef.current,
    });
  }, [activeStage, courseSlug, lesson, lessonSlug, unitSlug]);

  // Phase 1 instrumentation: lesson abandonment.
  // Fires on browser tab close/navigate (beforeunload) and on React unmount
  // (client-side navigation away from the lesson). We only fire if the student
  // has made some progress (at least one completed stage) and hasn't passed yet.
  useEffect(() => {
    function fireAbandonEvent() {
      if (masteryState.passed) return;
      if (masteryState.completedStages.length === 0) return;

      clientTrackEvent("lesson_abandoned", {
        course_slug: courseSlug ?? null,
        topic_slug: unitSlug ?? null,
        subtopic_slug: lessonSlug,
        current_stage: activeStage,
        stages_completed: masteryState.completedStages.length,
      }, { beacon: true });
    }

    window.addEventListener("beforeunload", fireAbandonEvent);
    return () => {
      window.removeEventListener("beforeunload", fireAbandonEvent);
      // Also fire on unmount (client-side navigation).
      fireAbandonEvent();
    };
  // Re-register whenever lesson or progress state changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStage, courseSlug, lessonSlug, masteryState.completedStages.length, masteryState.passed, unitSlug]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">Lesson not found</h1>
          <p className="mt-3 text-slate-600">
            This lesson is not available yet.
          </p>

          <Link
            href={backHref}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            {backLabel}
          </Link>
        </section>
      </main>
    );
  }

  const currentLesson = lesson;
  const activeStageIndex = currentLessonStages.findIndex(
    (stage) => stage.id === activeStage
  );
  const quizCorrectCount = activeQuiz.filter(
    (question) =>
      isCorrectAnswer(question, quizAnswers[question.id] ?? "") ||
      casCorrectIds[question.id]
  ).length;

  const challengeQuestions = getChallengeQuestions(lessonSlug, courseSlug);

  function saveMasteryState(nextState: MasteryState) {
    const storedState = {
      ...nextState,
      updatedAt: new Date().toISOString(),
    };
    progressChangedRef.current = true;
    setMasteryState(storedState);
    localStorage.setItem(
      masteryStorageKey(currentLesson.moduleSlug, lessonSlug),
      JSON.stringify(storedState)
    );

    if (courseSlug && unitSlug) {
      const progressCourseSlug = courseSlug;
      const progressUnitSlug = unitSlug;
      queueProgressSync({
        courseSlug: progressCourseSlug,
        unitSlug: progressUnitSlug,
        lessonSlug,
        passed: storedState.passed,
        lastScore: storedState.lastScore,
        completedStages: storedState.completedStages,
      });
    }
  }

  function canOpenStage(stage: LessonStage) {
    const hasCompleted = (completedStage: LessonStage) =>
      masteryState.completedStages.includes(completedStage);
    const hasWatchStage = currentLessonStages.some(
      (lessonStage) => lessonStage.id === "watch"
    );

    if (stage === "watch") {
      return hasWatchStage;
    }

    if (stage === "learn") {
      return !hasWatchStage || hasCompleted("watch");
    }

    if (stage === "guided-practice") {
      return hasCompleted("learn");
    }

    if (stage === "independent-practice") {
      return hasCompleted("guided-practice");
    }

    return true;
  }

  function openStage(stage: LessonStage) {
    if (canOpenStage(stage)) {
      setActiveStage(stage);
    }
  }

  function completeCurrentStage() {
    const completedStages = masteryState.completedStages.includes(activeStage)
      ? masteryState.completedStages
      : [...masteryState.completedStages, activeStage];

    saveMasteryState({
      ...masteryState,
      completedStages,
    });

    const nextStage = currentLessonStages[activeStageIndex + 1];
    if (nextStage) {
      setActiveStage(nextStage.id);
    }
  }

  async function submitQuiz() {
    // Resolve answers the local marker cannot judge: symbolic equivalents via
    // CAS and authored short explanations via semantic marking.
    setQuizChecking(true);
    setQuizMarkingError(null);
    let overrides: Record<string, boolean> = {};
    let semanticUnavailable = false;
    try {
      const resolution = await resolveQuizMarkingOverrides(
        activeQuiz,
        quizAnswers
      );
      overrides = resolution.correctIds;
      semanticUnavailable = resolution.semanticUnavailable;
    } catch {
      overrides = {};
      semanticUnavailable = activeQuiz.some(
        (question) =>
          isShortExplanation(question) &&
          Boolean(quizAnswers[question.id]?.trim()) &&
          !isCorrectAnswer(question, quizAnswers[question.id] ?? "")
      );
    }

    if (semanticUnavailable) {
      setQuizChecking(false);
      setQuizSubmitted(false);
      setQuizMarkingError(
        "One or more written answers could not be marked right now. Please try submitting again."
      );
      return;
    }
    setCasCorrectIds(overrides);
    setQuizChecking(false);

    const isCorrectWithCas = (question: PracticeQuestion) =>
      isCorrectAnswer(question, quizAnswers[question.id] ?? "") ||
      Boolean(overrides[question.id]);
    const correctCount =
      activeQuiz.filter(isCorrectWithCas).length;
    const score = correctCount / activeQuiz.length;

    setQuizSubmitted(true);
    trackMasteryCompleted(
      currentLesson.courseTitle,
      currentLesson.moduleTitle,
      currentLesson.title,
      score >= currentLesson.masteryPassMark,
      score
    );

    if (score >= currentLesson.masteryPassMark) {
      saveMasteryState({
        passed: true,
        completedStages: currentLessonStages.map((stage) => stage.id),
        lastScore: score,
      });
    } else {
      saveMasteryState({
        passed: false,
        completedStages: masteryState.completedStages,
        lastScore: score,
      });
    }

    // Phase 1 instrumentation: quiz attempt result.
    clientTrackEvent("mastery_quiz_completed", {
      course_slug: courseSlug ?? null,
      topic_slug: unitSlug ?? null,
      subtopic_slug: lessonSlug,
      score,
      passed: score >= currentLesson.masteryPassMark,
      attempt_number: quizAttemptNumberRef.current,
      time_on_quiz_seconds:
        quizStartedAtRef.current !== null
          ? Math.round((Date.now() - quizStartedAtRef.current) / 1000)
          : null,
    });

    // Supabase analytics — fire-and-forget, always safe.
    clientTrackEvent("lesson_mastery_submitted", {
      ...(courseSlug ? { courseSlug } : {}),
      ...(unitSlug ? { topicSlug: unitSlug } : {}),
      lessonSlug,
      score: Math.round(score * 100),
      questionCount: activeQuiz.length,
      correct: correctCount,
    });
    if (score >= currentLesson.masteryPassMark) {
      clientTrackEvent("lesson_mastery_passed", {
        ...(courseSlug ? { courseSlug } : {}),
        ...(unitSlug ? { topicSlug: unitSlug } : {}),
        lessonSlug,
        score: Math.round(score * 100),
        questionCount: activeQuiz.length,
      });
    }

    // Record mastery events for logged-in students — fire-and-forget.
    if (courseSlug && unitSlug && !masteryRecordedRef.current) {
      masteryRecordedRef.current = true;
      const capturedAnswers = { ...quizAnswers };
      const capturedQuestions = activeQuiz;
      void (async () => {
        try {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          if (!token) return;
          const events = capturedQuestions.map((q) => ({
            questionId: q.id,
            difficulty: q.difficulty ?? 4,
            isCorrect:
              isCorrectAnswer(q, capturedAnswers[q.id] ?? "") ||
              Boolean(overrides[q.id]),
          }));
          await fetch("/api/mastery/lesson", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseSlug,
              topicSlug: unitSlug,
              lessonSlug,
              sourceId: crypto.randomUUID(),
              events,
            }),
          });
        } catch {
          // Mastery recording failure never affects the student's UX.
        }
      })();
    }
  }

  function retryQuiz() {
    masteryRecordedRef.current = false;
    masteryStartedRef.current = null; // allow mastery_quiz_started to re-fire
    setQuizAnswers({});
    setCasCorrectIds({});
    setQuizMarkingError(null);
    setQuizSubmitted(false);
    setQuizAttemptSeed(Math.floor(Math.random() * 0x7fffffff));
    setActiveStage("mastery-quiz");
  }

  function reviewLesson() {
    setQuizSubmitted(false);
    setActiveStage(firstContentStage);
    setVideoEnded(false);
    setVideoLoadFailed(false);
  }

  function renderStage() {
    if (activeStage === "watch") {
      const videoUrl = normaliseVideoUrl(currentLesson.video.url);
      const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
      const hasVideo = hasPlayableVideoUrl(videoUrl);

      return (
        <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Watch</h2>
            <p className="mt-2 text-slate-600">
              Watch the lesson video to unlock the next step in the sequence.
            </p>
          </div>

          {!hasVideo ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Video coming soon
              </p>
              <p className="mt-2 text-sm text-slate-600">
                This lesson does not have a video yet. Start with the written
                lesson when access is available.
              </p>
            </div>
          ) : youtubeEmbedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
              <div className="aspect-video w-full">
                <iframe
                  key={youtubeEmbedUrl}
                  src={youtubeEmbedUrl}
                  title={currentLesson.video.title}
                  className="h-full w-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-slate-950">
              <video
                key={videoUrl}
                controls
                className="aspect-video w-full"
                onEnded={() => setVideoEnded(true)}
                onError={() => setVideoLoadFailed(true)}
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                  onError={() => setVideoLoadFailed(true)}
                />
              </video>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-600">
              {videoEnded
                ? "Video complete. You can continue."
                : youtubeEmbedUrl
                ? "Watch the public video, then continue when you are ready."
                : "Video gate temporarily unlocked for MVP testing."}
            </p>
            <button
              type="button"
              onClick={completeCurrentStage}
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
            >
              Continue to Learn
            </button>
          </div>

          {videoLoadFailed && !videoEnded && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                Video failed to load. This temporary MVP control is available
                for local testing.
              </p>
              <button
                type="button"
                onClick={() => setVideoEnded(true)}
                className="mt-3 rounded-xl bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
              >
                Mark video watched for testing
              </button>
            </div>
          )}
        </section>
      );
    }

    if (activeStage === "learn") {
      return (
        <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Learn</h2>
            <p className="mt-3 text-slate-700">
              <MathText text={currentLesson.learningIntention} />
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Success criteria</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              {currentLesson.successCriteria.map((item) => (
                <li key={item}>
                  <MathText text={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {currentLesson.teaching.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-slate-700">
                <MathText text={paragraph} />
              </p>
            ))}

            {currentLesson.teaching.latexBlocks.map((latex) => (
              <div
                key={latex}
                className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg"
              >
                <BlockMath math={latex} />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Worked examples</h3>
            {currentLesson.workedExamples.map((example) => (
              <div
                key={example.title}
                className="space-y-4 rounded-2xl border border-slate-200 p-5"
              >
                <h4 className="text-xl font-semibold">
                  <MathText text={example.title} />
                </h4>

                <div className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
                  <BlockMath math={example.questionLatex} />
                </div>

                <VisualPayloadRenderer {...example} />

                <div className="space-y-3">
                  {example.steps.map((step, index) => (
                    <div key={`${example.title}-${index}`}>
                      <p className="font-medium text-slate-700">
                        Step {index + 1}: <MathText text={step.explanation} />
                      </p>

                      {step.latex && (
                        <div className="mt-2 overflow-x-auto rounded-xl bg-slate-50 p-3">
                          <BlockMath math={step.latex} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm font-semibold text-green-900">
                    Final answer
                  </p>
                  <BlockMath math={example.finalAnswerLatex} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Common mistakes</h3>
            <div className="mt-4 space-y-3">
              {currentLesson.commonMistakes.map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="font-semibold text-red-700">
                    <MathText text={item.mistake} />
                  </p>
                  <p className="mt-1 text-slate-700">
                    <MathText text={item.fix} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={completeCurrentStage}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Continue to Guided Practice
          </button>
        </section>
      );
    }

    if (activeStage === "guided-practice") {
      return (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Guided Practice</h2>
          {currentLesson.guidedPractice.map((question, index) => (
            <PracticeCard
              key={question.id}
              question={question}
              index={index}
              courseSlug={courseSlug}
              unitSlug={unitSlug}
              lessonSlug={lessonSlug}
              section="guided-practice"
            />
          ))}
          <button
            type="button"
            onClick={completeCurrentStage}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Continue to Independent Practice
          </button>
        </section>
      );
    }

    if (activeStage === "independent-practice") {
      const nextButtonLabel =
        (currentLesson.multiPartPractice?.length ?? 0) > 0
          ? "Continue to Multi-Part Practice"
          : "Continue to Mastery Quiz";

      return (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Independent Practice</h2>
          {currentLesson.independentPractice.map((question, index) => (
            <PracticeCard
              key={question.id}
              question={question}
              index={index}
              courseSlug={courseSlug}
              unitSlug={unitSlug}
              lessonSlug={lessonSlug}
              section="independent-practice"
            />
          ))}
          <button
            type="button"
            onClick={completeCurrentStage}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            {nextButtonLabel}
          </button>
        </section>
      );
    }

    if (activeStage === "multi-part-practice") {
      return (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Multi-Part Practice</h2>
            <p className="mt-2 text-slate-600">
              HSC-style questions with separate answer checks for each part.
            </p>
          </div>
          {(currentLesson.multiPartPractice ?? []).map((question, index) => (
            <PracticeCard
              key={question.id}
              question={question}
              index={index}
              courseSlug={courseSlug}
              unitSlug={unitSlug}
              lessonSlug={lessonSlug}
              section="independent-practice"
            />
          ))}
          <button
            type="button"
            onClick={completeCurrentStage}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Continue to Mastery Quiz
          </button>
        </section>
      );
    }

    // Mastery quizzes are Premium. Free users get the teaching + guided and
    // independent practice for free, but the mastery quiz is locked behind a
    // paid subscription. (hasPaidAccess === null = still resolving.)
    if (hasPaidAccess === false) {
      return (
        <section className="space-y-4 rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Premium
          </p>
          <h2 className="text-2xl font-bold">Mastery Quiz is part of Premium</h2>
          <p className="text-slate-300">
            The mastery quiz scores how exam-ready you are on this lesson and
            updates your mastery map. Lessons and practice stay free — upgrade to
            unlock mastery quizzes, full exam papers, topic tests and step-by-step hints.
          </p>
          <Link
            href="/checkout?offer=online-learning"
            className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Upgrade — $19/month
          </Link>
        </section>
      );
    }

    return (
      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Mastery Quiz</h2>
          <p className="mt-2 text-slate-600">
            Pass mark: {Math.ceil(currentLesson.masteryPassMark * 100)}%. You
            can try this now, or work through the lesson sequence first.
          </p>
        </div>

        {activeQuiz.map((question, index) => (
          <MemoQuizQuestion
            key={question.id}
            question={question}
            index={index}
            value={quizAnswers[question.id] ?? ""}
            onAnswer={handleQuizAnswerChange}
          />
        ))}

        <button
          type="button"
          onClick={submitQuiz}
          disabled={quizChecking}
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {quizChecking ? "Checking…" : "Submit quiz"}
        </button>

        {quizMarkingError && (
          <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
            {quizMarkingError}
          </div>
        )}

        {quizSubmitted && (
          <MasteryResultPanel
            correctCount={quizCorrectCount}
            totalQuestions={activeQuiz.length}
            passMark={currentLesson.masteryPassMark}
            questions={activeQuiz}
            answers={quizAnswers}
            casCorrectIds={casCorrectIds}
            onTryAgain={retryQuiz}
            onReviewLesson={reviewLesson}
            nextHref={nextHref}
            nextLabel={nextLabel}
            backHref={backHref}
            attemptNumber={quizAttemptNumberRef.current}
            courseSlug={courseSlug}
            topicSlug={unitSlug}
            subtopicSlug={lessonSlug}
          />
        )}

        {masteryState.passed && challengeQuestions.length > 0 && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Challenge unlocked
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Level 6 challenge
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                Optional, harder problems that combine skills — the kind that
                stretch you toward a Band 6. These don&rsquo;t affect your lesson
                result.
              </p>
            </div>
            {challengeQuestions.map((q, i) => (
              <PracticeCard
                key={q.id}
                question={q}
                index={i}
                courseSlug={courseSlug}
                unitSlug={unitSlug}
                lessonSlug={lessonSlug}
                section="independent-practice"
              />
            ))}
          </section>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              href={backHref}
              className="text-sm font-medium text-slate-500 underline"
            >
              {backLabel}
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              ← Dashboard
            </Link>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {currentLesson.courseTitle} / {currentLesson.moduleTitle}
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {currentLesson.title}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            {currentLesson.description}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Syllabus area
              </p>
              <p className="mt-1 font-medium">{currentLesson.syllabusArea}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Focus
              </p>
              <p className="mt-1 font-medium">{currentLesson.focus}</p>
            </div>
          </div>

          {(prevHref || nextHref) && (
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
              {prevHref ? (
                <Link
                  href={prevHref}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  ← {prevLabel || "Previous lesson"}
                </Link>
              ) : (
                <span />
              )}
              {nextHref ? (
                <Link
                  href={nextHref}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  {nextLabel || "Next lesson"} →
                </Link>
              ) : null}
            </div>
          )}
        </header>

        <section className="rounded-2xl bg-white p-3 shadow-sm">
          <div
            className={`grid gap-2 ${
              currentLessonStages.length === 5
                ? "md:grid-cols-5"
                : "md:grid-cols-4"
            }`}
          >
            {currentLessonStages.map((stage, index) => {
              const isActive = stage.id === activeStage;
              const isComplete = masteryState.completedStages.includes(
                stage.id
              );
              const isDisabled = !canOpenStage(stage.id);

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => openStage(stage.id)}
                  disabled={isDisabled}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : isComplete
                      ? "bg-green-50 text-green-800"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  } disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400`}
                >
                  <span className="block text-xs opacity-70">
                    Step {index + 1}
                  </span>
                  {stage.label}
                </button>
              );
            })}
          </div>

          {!masteryState.passed && (
            <p className="mt-3 px-2 text-sm text-slate-600">
              You can jump straight to the Mastery Quiz whenever you are ready.
            </p>
          )}

          {masteryState.passed && (
            <p className="mt-3 px-2 text-sm font-medium text-green-700">
              Mastery passed.
            </p>
          )}
        </section>

        {activeStage === "watch" ? (
          renderStage()
        ) : (
          <AccessGate>{renderStage()}</AccessGate>
        )}
      </article>
    </main>
  );
}
