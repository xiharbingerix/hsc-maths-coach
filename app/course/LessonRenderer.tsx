"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { AccessGate } from "./AccessGate";
import {
  trackLessonViewed,
  trackMasteryStarted,
  trackMasteryCompleted,
} from "../../lib/analytics";
import type {
  ExplicitLesson,
  PracticeQuestion,
} from "../../lib/lessons/differentialCalculus";
import { NetworkDiagramView } from "./components/NetworkDiagramView";
import { TriangleDiagramView } from "./components/TriangleDiagramView";
import { CartesianGraphView } from "./components/CartesianGraphView";
import { TrapezoidalRuleView } from "./components/TrapezoidalRuleView";
import { BoxPlotView } from "./components/BoxPlotView";
import { NormalDistributionView } from "./components/NormalDistributionView";
import { ProbabilityTreeView } from "./components/ProbabilityTreeView";
import { TwoWayTableView } from "./components/TwoWayTableView";
import { VennDiagramView } from "./components/VennDiagramView";
import { markTypedAnswer } from "../../lib/answerMarking";
import { MathAnswerInput } from "../components/MathAnswerInput";
import {
  getUserCourseProgress,
  upsertLessonProgress,
} from "../../lib/lessonProgress";
import { supabase } from "../../lib/supabaseClient";

type LessonStage =
  | "watch"
  | "learn"
  | "guided-practice"
  | "independent-practice"
  | "mastery-quiz";

type MasteryState = {
  passed: boolean;
  mustCompleteLesson: boolean;
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

function isCorrectAnswer(question: PracticeQuestion, value: string) {
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

function choiceAnswerText(question: PracticeQuestion, answer: string) {
  if (answer === MULTI_STEP_SKIPPED) return "Not all steps answered correctly";

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

function masteryStorageKey(moduleSlug: string, lessonSlug: string) {
  if (moduleSlug === "differential-calculus") {
    return `hsc-maths-coach:mastery:${lessonSlug}`;
  }

  return `hsc-maths-coach:mastery:${moduleSlug}:${lessonSlug}`;
}

function MathText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return (
            <InlineMath key={`${part}-${index}`} math={part.slice(1, -1)} />
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
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
}: {
  question: PracticeQuestion;
  index: number;
}) {
  // Single-step state
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Multi-step state (all hooks called unconditionally)
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState("");
  const [stepResult, setStepResult] = useState<"correct" | "incorrect" | null>(null);
  const [stepAttempts, setStepAttempts] = useState(0);
  const [anyStepSkipped, setAnyStepSkipped] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);
  const [stepsDone, setStepsDone] = useState(false);

  const steps = question.steps;
  const isMultiStep = (steps?.length ?? 0) > 0;

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
            <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={question.latex} />
            </div>
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

    function checkStepAnswer() {
      const correct = markTypedAnswer({
        userAnswer: stepAnswer,
        correctAnswer: step.answer,
        acceptedAnswers: step.acceptedAnswers ?? [],
      }).correct;
      setStepResult(correct ? "correct" : "incorrect");
      if (!correct) setStepAttempts((a) => a + 1);
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
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={question.latex} />
          </div>
        </div>

        <p className="text-sm font-semibold text-slate-500">
          Step {stepIndex + 1} of {totalSteps}
        </p>

        <div>
          <p className="font-medium">
            <MathText text={step.prompt} />
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={step.latex} />
          </div>
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
            disabled={stepResult === "correct"}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Check answer
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

  function checkAnswer() {
    setResult(isCorrectAnswer(question, answer) ? "correct" : "incorrect");
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

        <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>

        {question.diagram && <NetworkDiagramView diagram={question.diagram} />}
        {question.triangleDiagram && (
          <TriangleDiagramView diagram={question.triangleDiagram} />
        )}
        {question.cartesianGraph && (
          <CartesianGraphView graph={question.cartesianGraph} />
        )}
        {question.trapezoidalRuleDiagram && (
          <TrapezoidalRuleView diagram={question.trapezoidalRuleDiagram} />
        )}
        {question.boxPlotDiagram && (
          <BoxPlotView diagram={question.boxPlotDiagram} />
        )}
        {question.normalDistributionDiagram && (
          <NormalDistributionView diagram={question.normalDistributionDiagram} />
        )}
        {question.probabilityTreeDiagram && (
          <ProbabilityTreeView diagram={question.probabilityTreeDiagram} />
        )}
        {question.twoWayTableDiagram && (
          <TwoWayTableView diagram={question.twoWayTableDiagram} />
        )}
        {question.vennDiagram && <VennDiagramView diagram={question.vennDiagram} />}
      </div>

      {question.choices ? (
        <ChoiceButtons
          question={question}
          value={answer}
          onChange={(value) => {
            setAnswer(value);
            setResult(null);
          }}
        />
      ) : (
        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <MathAnswerInput
            value={answer}
            onChange={(v) => {
              setAnswer(v);
              setResult(null);
            }}
            ariaLabel="Your answer"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={checkAnswer}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Check answer
        </button>

        {question.hint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}

        {question.explanation && (
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            {showExplanation ? "Hide explanation" : "Show explanation"}
          </button>
        )}
      </div>

      {result === "correct" && (
        <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
          Correct.
        </div>
      )}

      {result === "incorrect" && (
        <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">
          Not quite. Check the key idea and try again.
        </div>
      )}

      {showHint && question.hint && (
        <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
          <MathText text={question.hint} />
        </div>
      )}

      {showExplanation && question.explanation && (
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <MathText text={question.explanation} />
        </div>
      )}
    </div>
  );
}

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
  // Multi-step state (all hooks called unconditionally)
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState("");
  const [stepResult, setStepResult] = useState<"correct" | "incorrect" | null>(null);
  const [stepAttempts, setStepAttempts] = useState(0);
  const [anyStepSkipped, setAnyStepSkipped] = useState(false);
  const [showStepHint, setShowStepHint] = useState(false);

  const steps = question.steps;
  const isMultiStep = (steps?.length ?? 0) > 0;

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
        <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>
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

    function checkStepAnswer() {
      const correct = markTypedAnswer({
        userAnswer: stepAnswer,
        correctAnswer: step.answer,
        acceptedAnswers: step.acceptedAnswers ?? [],
      }).correct;
      setStepResult(correct ? "correct" : "incorrect");
      if (!correct) setStepAttempts((a) => a + 1);
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
          <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
            <BlockMath math={step.latex} />
          </div>
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
            disabled={stepResult === "correct"}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Check answer
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
        <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>

        {question.diagram && <NetworkDiagramView diagram={question.diagram} />}
        {question.triangleDiagram && (
          <TriangleDiagramView diagram={question.triangleDiagram} />
        )}
        {question.cartesianGraph && (
          <CartesianGraphView graph={question.cartesianGraph} />
        )}
        {question.trapezoidalRuleDiagram && (
          <TrapezoidalRuleView diagram={question.trapezoidalRuleDiagram} />
        )}
        {question.boxPlotDiagram && (
          <BoxPlotView diagram={question.boxPlotDiagram} />
        )}
        {question.normalDistributionDiagram && (
          <NormalDistributionView diagram={question.normalDistributionDiagram} />
        )}
        {question.probabilityTreeDiagram && (
          <ProbabilityTreeView diagram={question.probabilityTreeDiagram} />
        )}
        {question.twoWayTableDiagram && (
          <TwoWayTableView diagram={question.twoWayTableDiagram} />
        )}
        {question.vennDiagram && <VennDiagramView diagram={question.vennDiagram} />}
      </div>

      {question.choices ? (
        <ChoiceButtons question={question} value={value} onChange={onChange} />
      ) : (
        <div className="space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <MathAnswerInput
            value={value}
            onChange={onChange}
            ariaLabel="Your answer"
          />
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
  onTryAgain,
  onReviewLesson,
}: {
  correctCount: number;
  totalQuestions: number;
  passMark: number;
  questions: PracticeQuestion[];
  answers: Record<string, string>;
  onTryAgain: () => void;
  onReviewLesson: () => void;
}) {
  const score = correctCount / totalQuestions;
  const passed = score >= passMark;
  const requiredCorrect = Math.ceil(passMark * totalQuestions);
  const incorrectQuestions = questions
    .map((question, index) => ({ question, quizIndex: index }))
    .filter(
      ({ question }) => !isCorrectAnswer(question, answers[question.id] ?? "")
    );

  if (passed) {
    return (
      <div className="rounded-xl bg-green-50 p-4 text-sm text-green-900">
        <p className="font-semibold">
          Passed: {correctCount} out of {totalQuestions} (
          {formatPercent(score)}).
        </p>
        <p className="mt-1">
          Nice work. You have met the mastery mark for this lesson.
        </p>
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
                {question.diagram && (
                  <NetworkDiagramView diagram={question.diagram} />
                )}
                {question.triangleDiagram && (
                  <TriangleDiagramView diagram={question.triangleDiagram} />
                )}
                {question.cartesianGraph && (
                  <CartesianGraphView graph={question.cartesianGraph} />
                )}
                {question.trapezoidalRuleDiagram && (
                  <TrapezoidalRuleView diagram={question.trapezoidalRuleDiagram} />
                )}
                {question.boxPlotDiagram && (
                  <BoxPlotView diagram={question.boxPlotDiagram} />
                )}
                {question.normalDistributionDiagram && (
                  <NormalDistributionView diagram={question.normalDistributionDiagram} />
                )}
                {question.probabilityTreeDiagram && (
                  <ProbabilityTreeView diagram={question.probabilityTreeDiagram} />
                )}
                {question.twoWayTableDiagram && (
                  <TwoWayTableView diagram={question.twoWayTableDiagram} />
                )}
                {question.vennDiagram && (
                  <VennDiagramView diagram={question.vennDiagram} />
                )}
              </div>

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

              {question.explanation && (
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

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onTryAgain}
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
}: {
  courseSlug?: string;
  unitSlug?: string;
  lessonSlug: string;
  lessons: ExplicitLesson[];
  backHref: string;
  backLabel: string;
}) {
  const [activeStage, setActiveStage] = useState<LessonStage>(firstContentStage);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [masteryState, setMasteryState] = useState<MasteryState>({
    passed: false,
    mustCompleteLesson: false,
    completedStages: [],
  });

  const lesson = useMemo(
    () => lessons.find((item) => item.slug === lessonSlug),
    [lessons, lessonSlug]
  );
  const currentLessonStages = useMemo(() => {
    const shouldShowWatchStage =
      WATCH_STAGE_ENABLED && hasPlayableVideoUrl(lesson?.video.url);

    return shouldShowWatchStage
      ? allLessonStages
      : allLessonStages.filter((stage) => stage.id !== "watch");
  }, [lesson?.video.url]);
  const firstCurrentLessonStage =
    currentLessonStages[0]?.id ?? firstContentStage;

  const masteryStartedRef = useRef<string | null>(null);
  const progressChangedRef = useRef(false);
  const progressSyncRef = useRef(Promise.resolve());
  const masteryRecordedRef = useRef(false);

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
      mustCompleteLesson: false,
      completedStages: [],
    });

    if (!lesson) {
      return;
    }

    trackLessonViewed(lesson.courseTitle, lesson.moduleTitle, lesson.title);

    const storageKey = masteryStorageKey(lesson.moduleSlug, lessonSlug);
    let localState: MasteryState | null = null;

    try {
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        const storedState = JSON.parse(storedValue) as Partial<
          MasteryState & { sequenceLocked: boolean }
        >;

        localState = {
          passed: storedState.passed ?? false,
          mustCompleteLesson:
            storedState.mustCompleteLesson ??
            storedState.sequenceLocked ??
            false,
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
          mustCompleteLesson: false,
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
        const hydratedState =
          shouldKeepLocalState && localState ? localState : remoteState;

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
    setQuizSubmitted(false);
    masteryStartedRef.current = null;
  }, [firstCurrentLessonStage, lessonSlug]);

  useEffect(() => {
    if (activeStage !== "mastery-quiz" || !lesson) return;
    if (masteryStartedRef.current === lessonSlug) return;
    masteryStartedRef.current = lessonSlug;
    trackMasteryStarted(lesson.courseTitle, lesson.moduleTitle, lesson.title);
  }, [activeStage, lesson, lessonSlug]);

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
  const quizCorrectCount = currentLesson.masteryQuiz.filter((question) =>
    isCorrectAnswer(question, quizAnswers[question.id] ?? "")
  ).length;
  const quizScore = quizCorrectCount / currentLesson.masteryQuiz.length;

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

    return (
      !masteryState.mustCompleteLesson || hasCompleted("independent-practice")
    );
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

  function submitQuiz() {
    setQuizSubmitted(true);
    trackMasteryCompleted(
      currentLesson.courseTitle,
      currentLesson.moduleTitle,
      currentLesson.title,
      quizScore >= currentLesson.masteryPassMark,
      quizScore
    );

    if (quizScore >= currentLesson.masteryPassMark) {
      saveMasteryState({
        passed: true,
        mustCompleteLesson: false,
        completedStages: currentLessonStages.map((stage) => stage.id),
        lastScore: quizScore,
      });
    } else {
      saveMasteryState({
        passed: false,
        mustCompleteLesson: false,
        completedStages: masteryState.completedStages,
        lastScore: quizScore,
      });
    }

    // Record mastery events for logged-in students — fire-and-forget.
    if (courseSlug && unitSlug && !masteryRecordedRef.current) {
      masteryRecordedRef.current = true;
      const capturedAnswers = { ...quizAnswers };
      const capturedQuestions = currentLesson.masteryQuiz;
      void (async () => {
        try {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          if (!token) return;
          const events = capturedQuestions.map((q) => ({
            questionId: q.id,
            difficulty: 4,
            isCorrect: isCorrectAnswer(q, capturedAnswers[q.id] ?? ""),
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
    setQuizAnswers({});
    setQuizSubmitted(false);
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

                {example.diagram && <NetworkDiagramView diagram={example.diagram} />}
                {example.triangleDiagram && (
                  <TriangleDiagramView diagram={example.triangleDiagram} />
                )}
                {example.cartesianGraph && (
                  <CartesianGraphView graph={example.cartesianGraph} />
                )}
                {example.trapezoidalRuleDiagram && (
                  <TrapezoidalRuleView diagram={example.trapezoidalRuleDiagram} />
                )}
                {example.boxPlotDiagram && (
                  <BoxPlotView diagram={example.boxPlotDiagram} />
                )}
                {example.normalDistributionDiagram && (
                  <NormalDistributionView diagram={example.normalDistributionDiagram} />
                )}
                {example.probabilityTreeDiagram && (
                  <ProbabilityTreeView diagram={example.probabilityTreeDiagram} />
                )}
                {example.twoWayTableDiagram && (
                  <TwoWayTableView diagram={example.twoWayTableDiagram} />
                )}
                {example.vennDiagram && (
                  <VennDiagramView diagram={example.vennDiagram} />
                )}

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
            <PracticeCard key={question.id} question={question} index={index} />
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
      return (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Independent Practice</h2>
          {currentLesson.independentPractice.map((question, index) => (
            <PracticeCard key={question.id} question={question} index={index} />
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

    return (
      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Mastery Quiz</h2>
          <p className="mt-2 text-slate-600">
            Pass mark: {Math.ceil(currentLesson.masteryPassMark * 100)}%. You
            can try this now, or work through the lesson sequence first.
          </p>
        </div>

        {masteryState.mustCompleteLesson && (
          <div className="rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-900">
            Complete each stage in order before reattempting the quiz.
          </div>
        )}

        {currentLesson.masteryQuiz.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            index={index}
            value={quizAnswers[question.id] ?? ""}
            onChange={(value) => {
              setQuizAnswers((current) => ({
                ...current,
                [question.id]: value,
              }));
              setQuizSubmitted(false);
            }}
          />
        ))}

        <button
          type="button"
          onClick={submitQuiz}
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Submit quiz
        </button>

        {quizSubmitted && (
          <MasteryResultPanel
            correctCount={quizCorrectCount}
            totalQuestions={currentLesson.masteryQuiz.length}
            passMark={currentLesson.masteryPassMark}
            questions={currentLesson.masteryQuiz}
            answers={quizAnswers}
            onTryAgain={retryQuiz}
            onReviewLesson={reviewLesson}
          />
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <Link
            href={backHref}
            className="text-sm font-medium text-slate-500 underline"
          >
            {backLabel}
          </Link>

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

          {masteryState.mustCompleteLesson && (
            <p className="mt-3 px-2 text-sm font-medium text-amber-700">
              Mastery reattempt locked: move through the stages in order.
            </p>
          )}

          {!masteryState.mustCompleteLesson && !masteryState.passed && (
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
