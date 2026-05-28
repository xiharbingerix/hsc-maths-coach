"use client";

import { Suspense, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BlockMath, InlineMath } from "react-katex";
import { questions } from "../../lib/questions";
import { supabase } from "../../lib/supabaseClient";

type Answers = Record<string, string>;
type Confidence = Record<string, string>;
type Working = Record<string, string>;

const IDK_ANSWER = "__IDK__";
const confidenceLevels = ["Low", "Medium", "High"];

const offerLabels: Record<string, string> = {
  "online-learning": "Online Learning Access",
  "diagnostic-report": "Diagnostic PDF Report",
  "study-plan": "Diagnostic + 30-Day Plan",
  "weekly-tutoring": "Weekly Tutoring + Online Learning",
};

const topics = [
  "Functions and Graphing Techniques",
  "Trigonometric Functions and Graphs",
  "Differential Calculus",
  "Integral Calculus",
  "Financial Mathematics",
  "Statistical Analysis",
  "Revision / mixed exam practice",
  "Not sure",
];

const sectionDescriptions: Record<string, string> = {
  "Functions and Graphing Techniques":
    "Function notation, domain restrictions, graph features, transformations, and asymptotes.",
  "Trigonometric Functions and Graphs":
    "Radians, exact values, unit circle signs, graph features, equations, and identities.",
  "Differential Calculus":
    "Differentiation, tangent gradients, stationary points, and derivative signs.",
  "Integral Calculus":
    "Antidifferentiation, initial conditions, definite integrals, area, and approximation.",
  "Financial Mathematics":
    "Growth factors, compound interest, depreciation, recurrence, annuities, and comparison.",
  "Statistical Analysis":
    "Summary statistics, z-scores, correlation, regression, residuals, and normal distributions.",
};

const sectionOrder = Array.from(
  new Set(questions.map((question) => question.section))
);

function renderMathText(text: string) {
  const parts = text.split("$");

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <InlineMath key={`${part}-${index}`} math={part} />;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function FieldLabel({ children }: Readonly<{ children: ReactNode }>) {
  return <span className="text-sm font-medium text-slate-800">{children}</span>;
}

function DiagnosticForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const offerSelected = searchParams.get("offer") ?? "";
  const selectedOfferLabel = offerLabels[offerSelected];

  const [studentFirstName, setStudentFirstName] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [course, setCourse] = useState("Maths Advanced");
  const [yearLevel, setYearLevel] = useState("Year 12");
  const [currentTopic, setCurrentTopic] = useState("");
  const [targetResult, setTargetResult] = useState("");
  const [assessmentTiming, setAssessmentTiming] = useState("");
  const [topicsStudied, setTopicsStudied] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  const [answers, setAnswers] = useState<Answers>({});
  const [confidence, setConfidence] = useState<Confidence>({});
  const [working, setWorking] = useState<Working>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = questions.filter((question) => {
    const answer = answers[question.id];
    return typeof answer === "string" && answer.trim().length > 0;
  }).length;
  const idkCount = questions.filter(
    (question) => answers[question.id] === IDK_ANSWER
  ).length;
  const blankCount = questions.length - answeredCount;

  function toggleTopic(topic: string) {
    if (topicsStudied.includes(topic)) {
      setTopicsStudied(topicsStudied.filter((item) => item !== topic));
    } else {
      setTopicsStudied([...topicsStudied, topic]);
    }
  }

  function setAnswer(questionId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function setQuestionConfidence(questionId: string, value: string) {
    setConfidence((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function setQuestionWorking(questionId: string, value: string) {
    setWorking((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (
      blankCount >= 5 &&
      !window.confirm(
        `You have left ${blankCount} questions blank. Submit anyway?`
      )
    ) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      student_first_name: studentFirstName,
      parent_first_name: parentFirstName,
      parent_email: parentEmail,

      year_level: yearLevel,
      course,
      topics_studied: topicsStudied,
      current_topic: currentTopic,
      target_result: targetResult,
      assessment_timing: assessmentTiming,

      answers,
      confidence,
      working,

      consent_confirmed: consent,
      offer_selected: offerSelected || null,
    };

    const { error } = await supabase
      .from("diagnostic_submissions")
      .insert(payload);

    if (error) {
      const errorInfo = {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      };

      console.error("Supabase insert error:", errorInfo);

      alert(
        `Something went wrong submitting the diagnostic.

Message: ${error.message}
Code: ${error.code ?? "No code"}
Details: ${error.details ?? "No details"}
Hint: ${error.hint ?? "No hint"}`
      );

      setIsSubmitting(false);
      return;
    }

    router.push("/thanks");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl space-y-8 rounded-3xl bg-white p-6 shadow-sm md:p-8"
      >
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Year 12 Mathematics Advanced Diagnostic
          </h1>

          <p className="max-w-3xl leading-7 text-slate-600">
            This diagnostic checks key Year 12 Maths Advanced areas. It is
            designed to identify priority areas for revision, not to replace a
            school assessment mark. It usually takes about 20-30 minutes.
          </p>

          {selectedOfferLabel ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
              <span className="font-semibold">Selected interest:</span>{" "}
              {selectedOfferLabel}
            </div>
          ) : null}
        </section>

        <section className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold text-slate-950">
              Progress
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <div className="rounded-xl bg-white p-4">
                <p className="text-2xl font-bold">
                  {answeredCount}/{questions.length}
                </p>
                <p className="text-sm text-slate-600">answered</p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-2xl font-bold">{idkCount}</p>
                <p className="text-sm text-slate-600">
                  marked I don&apos;t know yet
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-base font-semibold text-amber-950">
              Work independently
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              Do not use notes, calculators, or worked examples. The goal is
              to find the right starting point, not to get a perfect score.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-amber-900">
              Choosing &quot;I don&apos;t know yet&quot; is useful - it helps
              identify what should be taught first.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-semibold text-blue-950">
            Report review
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-blue-900">
            Diagnostic reports are manually reviewed before being sent to the
            parent or guardian email provided. Reports are intended for learning
            support only and are not official school results, exam predictions,
            or guarantees of future performance.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <FieldLabel>Student first name</FieldLabel>
            <input
              value={studentFirstName}
              onChange={(event) => setStudentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="space-y-1">
            <FieldLabel>Parent/guardian first name</FieldLabel>
            <input
              value={parentFirstName}
              onChange={(event) => setParentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <FieldLabel>Parent/guardian email</FieldLabel>
            <input
              type="email"
              value={parentEmail}
              onChange={(event) => setParentEmail(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
            <p className="text-xs leading-relaxed text-slate-500">
              We use this only to send the diagnostic report and important
              follow-up about this submission.
            </p>
          </label>

          <label className="space-y-1">
            <FieldLabel>Year level</FieldLabel>
            <select
              value={yearLevel}
              onChange={(event) => setYearLevel(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option>Year 12</option>
              <option>Year 11</option>
              <option>Other</option>
            </select>
          </label>

          <label className="space-y-1">
            <FieldLabel>Course</FieldLabel>
            <select
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option>Maths Advanced</option>
              <option>Maths Standard</option>
              <option>Extension 1</option>
              <option>Extension 2</option>
              <option>Not sure</option>
            </select>
          </label>

          <label className="space-y-1">
            <FieldLabel>Current topic</FieldLabel>
            <select
              value={currentTopic}
              onChange={(event) => setCurrentTopic(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Select current topic</option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <FieldLabel>Target result</FieldLabel>
            <select
              value={targetResult}
              onChange={(event) => setTargetResult(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Select target</option>
              <option>Pass comfortably</option>
              <option>Band 4</option>
              <option>Band 5</option>
              <option>Band 6</option>
              <option>Not sure</option>
            </select>
          </label>

          <label className="space-y-1 md:col-span-2">
            <FieldLabel>Next major assessment</FieldLabel>
            <select
              value={assessmentTiming}
              onChange={(event) => setAssessmentTiming(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Select timing</option>
              <option>Within 2 weeks</option>
              <option>2-4 weeks</option>
              <option>More than 4 weeks away</option>
              <option>Not sure</option>
            </select>
          </label>
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Topics studied so far</h2>

          <p className="text-sm text-slate-600">
            Select the topics the student has already covered at school or with
            a tutor. This helps us avoid over-weighting topics they have not
            learned yet.
          </p>

          <div className="grid gap-2 md:grid-cols-2">
            {topics.map((topic) => (
              <label
                key={topic}
                className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={topicsStudied.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <span>{topic}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-xl bg-slate-100 p-4">
          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              disabled={isSubmitting}
              className="mt-1"
            />
            <span className="text-sm text-slate-700">
              I confirm I am the parent/guardian of the student, or I have
              permission from the parent/guardian to submit this diagnostic.
            </span>
          </label>

          <p className="text-xs leading-relaxed text-slate-600">
            We collect only the information needed to review this diagnostic and
            prepare a personalised maths report. Reports are sent to the
            parent/guardian email provided. Read the{" "}
            <Link href="/privacy" className="font-medium underline">
              Privacy Notice
            </Link>
            .
          </p>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Diagnostic questions</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Answer what you can without outside help. Use &quot;I don&apos;t know yet&quot; when you are stuck so the report can separate gaps from
              unanswered questions.
            </p>
          </div>

          {sectionOrder.map((section) => {
            const sectionQuestions = questions.filter(
              (question) => question.section === section
            );

            return (
              <section
                key={section}
                className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {section}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {sectionDescriptions[section]}
                  </p>
                </div>

                <div className="space-y-5">
                  {sectionQuestions.map((question) => {
                    const questionNumber =
                      questions.findIndex((item) => item.id === question.id) +
                      1;
                    const currentAnswer = answers[question.id] ?? "";
                    const isIdk = currentAnswer === IDK_ANSWER;

                    return (
                      <div
                        key={question.id}
                        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span className="font-medium">
                              Question {questionNumber}
                            </span>
                            <span aria-hidden="true">&middot;</span>
                            <span>{question.skill}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-600">
                              {question.difficulty}
                            </span>
                          </div>

                          <p className="mt-3 font-medium">
                            {renderMathText(question.prompt)}
                          </p>

                          {question.latex ? (
                            <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
                              <BlockMath math={question.latex} />
                            </div>
                          ) : null}

                          {question.image ? (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                              <img
                                src={question.image}
                                alt={`${question.skill} graph`}
                                className="h-auto w-full"
                              />
                            </div>
                          ) : null}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <FieldLabel>Answer</FieldLabel>
                            <button
                              type="button"
                              onClick={() => setAnswer(question.id, IDK_ANSWER)}
                              disabled={isSubmitting}
                              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                                isIdk
                                  ? "border-slate-950 bg-slate-950 text-white"
                                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              I don&apos;t know yet
                            </button>
                          </div>

                          {question.choices ? (
                            <div className="grid gap-2 md:grid-cols-2">
                              {question.choices.map((choice) => {
                                const selected =
                                  answers[question.id] === choice.label;

                                return (
                                  <button
                                    key={choice.label}
                                    type="button"
                                    onClick={() =>
                                      setAnswer(question.id, choice.label)
                                    }
                                    disabled={isSubmitting}
                                    className={`rounded-xl border p-3 text-left text-sm transition ${
                                      selected
                                        ? "border-slate-950 bg-slate-950 text-white"
                                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
                                    }`}
                                  >
                                    <span className="font-semibold">
                                      {choice.label}.
                                    </span>{" "}
                                    {renderMathText(choice.text)}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <input
                              value={isIdk ? "" : currentAnswer}
                              onChange={(event) =>
                                setAnswer(question.id, event.target.value)
                              }
                              disabled={isSubmitting}
                              className="w-full rounded-xl border border-slate-300 px-3 py-2"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <FieldLabel>Confidence</FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            {confidenceLevels.map((level) => {
                              const selected =
                                confidence[question.id] === level;

                              return (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() =>
                                    setQuestionConfidence(question.id, level)
                                  }
                                  disabled={isSubmitting}
                                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                    selected
                                      ? "border-slate-950 bg-slate-950 text-white"
                                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  {level}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <label className="block space-y-1">
                          <FieldLabel>Working / reasoning</FieldLabel>
                          <p className="text-xs text-slate-500">
                            Optional, but helpful if you want a more accurate
                            report.
                          </p>
                          <textarea
                            value={working[question.id] ?? ""}
                            onChange={(event) =>
                              setQuestionWorking(question.id, event.target.value)
                            }
                            rows={3}
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-slate-300 px-3 py-2"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-base font-semibold">Before you submit</h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Please check the parent/guardian email address is correct. The
            diagnostic report will be reviewed manually and sent to that email
            address.
          </p>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Submitting..." : "Submit diagnostic"}
        </button>
      </form>
    </main>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
          <section className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Loading diagnostic
            </h1>
          </section>
        </main>
      }
    >
      <DiagnosticForm />
    </Suspense>
  );
}
