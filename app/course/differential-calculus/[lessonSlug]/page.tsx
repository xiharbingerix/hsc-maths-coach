"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  differentialCalculusLessons,
  PracticeQuestion,
} from "../../../../lib/lessons/differentialCalculus";

type LessonStage =
  | "watch"
  | "learn"
  | "guided-practice"
  | "independent-practice"
  | "mastery-quiz";

type MasteryState = {
  passed: boolean;
  sequenceLocked: boolean;
  completedStages: LessonStage[];
  lastScore?: number;
};

const lessonStages: { id: LessonStage; label: string }[] = [
  { id: "watch", label: "Watch" },
  { id: "learn", label: "Learn" },
  { id: "guided-practice", label: "Guided Practice" },
  { id: "independent-practice", label: "Independent Practice" },
  { id: "mastery-quiz", label: "Mastery Quiz" },
];

function normaliseAnswer(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function masteryStorageKey(lessonSlug: string) {
  return `hsc-maths-coach:mastery:${lessonSlug}`;
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
    const userAnswer = normaliseAnswer(answer);
    const correctAnswer = normaliseAnswer(question.answer);

    setResult(userAnswer === correctAnswer ? "correct" : "incorrect");
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Question {index + 1}
        </p>

        <p className="mt-2 font-medium">{question.prompt}</p>

        <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>
      </div>

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
          Not quite. Check the coefficient, power, and signs.
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
        <p className="mt-2 font-medium">{question.prompt}</p>
        <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
          <BlockMath math={question.latex} />
        </div>
      </div>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Your answer</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
        />
      </label>
    </div>
  );
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = use(params);
  const [activeStage, setActiveStage] = useState<LessonStage>("watch");
  const [videoEnded, setVideoEnded] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [masteryState, setMasteryState] = useState<MasteryState>({
    passed: false,
    sequenceLocked: false,
    completedStages: [],
  });

  const lesson = useMemo(
    () => differentialCalculusLessons.find((item) => item.slug === lessonSlug),
    [lessonSlug]
  );

  useEffect(() => {
    setMasteryState({
      passed: false,
      sequenceLocked: false,
      completedStages: [],
    });

    try {
      const storedValue = localStorage.getItem(masteryStorageKey(lessonSlug));
      if (storedValue) {
        setMasteryState(JSON.parse(storedValue) as MasteryState);
      }
    } catch {
      localStorage.removeItem(masteryStorageKey(lessonSlug));
    }
  }, [lessonSlug]);

  useEffect(() => {
    setActiveStage("watch");
    setVideoEnded(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [lessonSlug]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">Lesson not found</h1>
          <p className="mt-3 text-slate-600">
            This lesson is not available yet.
          </p>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
            <p>
              Requested lesson: <strong>{lessonSlug}</strong>
            </p>
            <p className="mt-2">
              Available lessons:{" "}
              <strong>
                {differentialCalculusLessons
                  .map((item) => item.slug)
                  .join(", ")}
              </strong>
            </p>
          </div>

          <Link
            href="/course/differential-calculus"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Back to Differential Calculus
          </Link>
        </section>
      </main>
    );
  }

  const currentLesson = lesson;
  const activeStageIndex = lessonStages.findIndex(
    (stage) => stage.id === activeStage
  );
  const completedStageIndexes = masteryState.completedStages.map((stage) =>
    lessonStages.findIndex((item) => item.id === stage)
  );
  const highestCompletedIndex =
    completedStageIndexes.length > 0 ? Math.max(...completedStageIndexes) : -1;
  const quizCorrectCount = currentLesson.masteryQuiz.filter(
    (question) =>
      normaliseAnswer(quizAnswers[question.id] ?? "") ===
      normaliseAnswer(question.answer)
  ).length;
  const quizScore = quizCorrectCount / currentLesson.masteryQuiz.length;

  function saveMasteryState(nextState: MasteryState) {
    setMasteryState(nextState);
    localStorage.setItem(
      masteryStorageKey(lessonSlug),
      JSON.stringify(nextState)
    );
  }

  function canOpenStage(stage: LessonStage) {
    if (!masteryState.sequenceLocked) {
      return true;
    }

    const stageIndex = lessonStages.findIndex((item) => item.id === stage);
    return stageIndex <= highestCompletedIndex + 1;
  }

  function openStage(stage: LessonStage) {
    if (canOpenStage(stage)) {
      setActiveStage(stage);
    }
  }

  function completeCurrentStage() {
    if (activeStage === "watch" && !videoEnded) {
      return;
    }

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

    if (quizScore >= currentLesson.masteryPassMark) {
      saveMasteryState({
        passed: true,
        sequenceLocked: false,
        completedStages: lessonStages.map((stage) => stage.id),
        lastScore: quizScore,
      });
      return;
    }

    saveMasteryState({
      passed: false,
      sequenceLocked: true,
      completedStages: [],
      lastScore: quizScore,
    });
    setActiveStage("watch");
    setVideoEnded(false);
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
            >
              <source src={currentLesson.video.url} type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-600">
              {videoEnded
                ? "Video complete. You can continue."
                : "Continue unlocks when the video ends."}
            </p>
            <button
              type="button"
              onClick={completeCurrentStage}
              disabled={!videoEnded}
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue to Learn
            </button>
          </div>
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
            Pass mark: {Math.ceil(currentLesson.masteryPassMark * 100)}%. You can try
            this now, or work through the lesson sequence first.
          </p>
        </div>

        {masteryState.sequenceLocked && (
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

        {quizSubmitted && quizScore >= currentLesson.masteryPassMark && (
          <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-900">
            Passed: {quizCorrectCount} out of {currentLesson.masteryQuiz.length}.
          </div>
        )}

        {quizSubmitted && quizScore < currentLesson.masteryPassMark && (
          <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-900">
            Score: {quizCorrectCount} out of {currentLesson.masteryQuiz.length}. The
            lesson sequence is now locked in order.
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <Link
            href="/course/differential-calculus"
            className="text-sm font-medium text-slate-500 underline"
          >
            Back to Differential Calculus
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
          <div className="grid gap-2 md:grid-cols-5">
            {lessonStages.map((stage, index) => {
              const isActive = stage.id === activeStage;
              const isComplete = masteryState.completedStages.includes(stage.id);
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

          {masteryState.sequenceLocked && (
            <p className="mt-3 px-2 text-sm font-medium text-amber-700">
              Mastery reattempt locked: move through the stages in order.
            </p>
          )}

          {!masteryState.sequenceLocked && !masteryState.passed && (
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
  );
}
