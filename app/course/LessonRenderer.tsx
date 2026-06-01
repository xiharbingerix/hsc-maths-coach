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
import { markTypedAnswer } from "../../lib/answerMarking";

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
};

export const WATCH_STAGE_ENABLED = false;

const allLessonStages: { id: LessonStage; label: string }[] = [
  { id: "watch", label: "Watch" },
  { id: "learn", label: "Learn" },
  { id: "guided-practice", label: "Guided Practice" },
  { id: "independent-practice", label: "Independent Practice" },
  { id: "mastery-quiz", label: "Mastery Quiz" },
];

const lessonStages = WATCH_STAGE_ENABLED
  ? allLessonStages
  : allLessonStages.filter((stage) => stage.id !== "watch");

const firstLessonStage = lessonStages[0].id;
const firstContentStage: LessonStage = "learn";

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
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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
        <label className="block space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <input
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setResult(null);
            }}
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
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
      </div>

      {question.choices ? (
        <ChoiceButtons question={question} value={value} onChange={onChange} />
      ) : (
        <label className="block space-y-1">
          <span className="text-sm font-medium">Your answer</span>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </label>
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
  lessonSlug,
  lessons,
  backHref,
  backLabel,
}: {
  lessonSlug: string;
  lessons: ExplicitLesson[];
  backHref: string;
  backLabel: string;
}) {
  const [activeStage, setActiveStage] = useState<LessonStage>(firstLessonStage);
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

  const masteryStartedRef = useRef<string | null>(null);

  useEffect(() => {
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

    try {
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        const storedState = JSON.parse(storedValue) as Partial<
          MasteryState & { sequenceLocked: boolean }
        >;

        setMasteryState({
          passed: storedState.passed ?? false,
          mustCompleteLesson:
            storedState.mustCompleteLesson ??
            storedState.sequenceLocked ??
            false,
          completedStages: storedState.completedStages ?? [],
          lastScore: storedState.lastScore,
        });
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [lesson, lessonSlug]);

  useEffect(() => {
    setActiveStage(firstLessonStage);
    setVideoEnded(false);
    setVideoLoadFailed(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    masteryStartedRef.current = null;
  }, [lessonSlug]);

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
  const activeStageIndex = lessonStages.findIndex(
    (stage) => stage.id === activeStage
  );
  const quizCorrectCount = currentLesson.masteryQuiz.filter((question) =>
    isCorrectAnswer(question, quizAnswers[question.id] ?? "")
  ).length;
  const quizScore = quizCorrectCount / currentLesson.masteryQuiz.length;

  function saveMasteryState(nextState: MasteryState) {
    setMasteryState(nextState);
    localStorage.setItem(
      masteryStorageKey(currentLesson.moduleSlug, lessonSlug),
      JSON.stringify(nextState)
    );
  }

  function canOpenStage(stage: LessonStage) {
    const hasCompleted = (completedStage: LessonStage) =>
      masteryState.completedStages.includes(completedStage);

    if (stage === "watch") {
      return WATCH_STAGE_ENABLED;
    }

    if (stage === "learn") {
      return !WATCH_STAGE_ENABLED || hasCompleted("watch");
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

    const nextStage = lessonStages[activeStageIndex + 1];
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
        completedStages: lessonStages.map((stage) => stage.id),
        lastScore: quizScore,
      });
      return;
    }

    saveMasteryState({
      passed: false,
      mustCompleteLesson: false,
      completedStages: masteryState.completedStages,
      lastScore: quizScore,
    });
  }

  function retryQuiz() {
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
      return (
        <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Watch</h2>
            <p className="mt-2 text-slate-600">
              Watch the lesson video to unlock the next step in the sequence.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-slate-950">
            <video
              key={currentLesson.video.url}
              controls
              className="aspect-video w-full"
              onEnded={() => setVideoEnded(true)}
              onError={() => setVideoLoadFailed(true)}
            >
              <source
                src={currentLesson.video.url}
                type="video/mp4"
                onError={() => setVideoLoadFailed(true)}
              />
            </video>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-600">
              {videoEnded
                ? "Video complete. You can continue."
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
    <AccessGate>
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
              WATCH_STAGE_ENABLED ? "md:grid-cols-5" : "md:grid-cols-4"
            }`}
          >
            {lessonStages.map((stage, index) => {
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

        {renderStage()}
      </article>
      </main>
    </AccessGate>
  );
}
