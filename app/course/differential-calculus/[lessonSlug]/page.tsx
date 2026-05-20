"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import {
  differentialCalculusLessons,
  PracticeQuestion,
} from "../../../../lib/lessons/differentialCalculus";

function normaliseAnswer(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
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

    if (userAnswer === correctAnswer) {
      setResult("correct");
    } else {
      setResult("incorrect");
    }
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
          {question.hint}
        </div>
      )}

      {showExplanation && question.explanation && (
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          {question.explanation}
        </div>
      )}
    </div>
  );
}

export default function LessonPage({
  params,
}: {
  params: { lessonSlug: string };
}) {
  const lesson = useMemo(
    () =>
      differentialCalculusLessons.find(
        (item) => item.slug === params.lessonSlug
      ),
    [params.lessonSlug]
  );

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">Lesson not found</h1>
          <p className="mt-3 text-slate-600">
            This lesson is not available yet.
          </p>
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
            {lesson.courseTitle} · {lesson.moduleTitle}
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {lesson.title}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            {lesson.description}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Syllabus area
              </p>
              <p className="mt-1 font-medium">{lesson.syllabusArea}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Focus
              </p>
              <p className="mt-1 font-medium">{lesson.focus}</p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Learning intention</h2>
          <p className="mt-3 text-slate-700">{lesson.learningIntention}</p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Success criteria</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            {lesson.successCriteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Prerequisite check</h2>
            <p className="mt-2 text-slate-600">
              Check the small skills needed before learning the new content.
            </p>
          </div>

          {lesson.prerequisiteChecks.map((question, index) => (
            <PracticeCard key={question.id} question={question} index={index} />
          ))}
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Direct teaching</h2>

          {lesson.directTeaching.explanation.map((paragraph) => (
            <p key={paragraph} className="text-slate-700">
              {paragraph}
            </p>
          ))}

          {lesson.directTeaching.keyFormulaLatex && (
            <div className="rounded-xl bg-slate-50 p-4 text-lg">
              <BlockMath math={lesson.directTeaching.keyFormulaLatex} />
            </div>
          )}
        </section>

        <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Worked examples</h2>

          {lesson.workedExamples.map((example) => (
            <div
              key={example.title}
              className="space-y-4 rounded-2xl border border-slate-200 p-5"
            >
              <h3 className="text-xl font-semibold">{example.title}</h3>

              <div className="rounded-xl bg-slate-50 p-4 text-lg">
                <BlockMath math={example.questionLatex} />
              </div>

              <div className="space-y-3">
                {example.steps.map((step, index) => (
                  <div key={`${example.title}-${index}`}>
                    <p className="font-medium text-slate-700">
                      Step {index + 1}: {step.explanation}
                    </p>

                    {step.latex && (
                      <div className="mt-2 rounded-xl bg-slate-50 p-3">
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
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Guided practice</h2>

          {lesson.guidedPractice.map((question, index) => (
            <PracticeCard key={question.id} question={question} index={index} />
          ))}
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Independent practice</h2>

          {lesson.independentPractice.map((question, index) => (
            <PracticeCard key={question.id} question={question} index={index} />
          ))}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Common mistakes</h2>

          <div className="mt-4 space-y-3">
            {lesson.commonMistakes.map((item) => (
              <div
                key={item.mistake}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-semibold text-red-700">{item.mistake}</p>
                <p className="mt-1 text-slate-700">{item.fix}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Mastery check</h2>

          <p className="text-slate-600">
            Try these without looking back. If you miss more than one, revise the
            worked examples before moving on.
          </p>

          {lesson.masteryCheck.map((question, index) => (
            <PracticeCard key={question.id} question={question} index={index} />
          ))}
        </section>
      </article>
    </main>
  );
}