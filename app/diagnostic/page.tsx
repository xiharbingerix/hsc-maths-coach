"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BlockMath } from "react-katex";
import { questions } from "../../lib/questions";
import { supabase } from "../../lib/supabaseClient";

type Answers = Record<string, string>;
type Confidence = Record<string, string>;
type Working = Record<string, string>;

const topics = [
  "Functions and graphing",
  "Trigonometric functions",
  "Calculus: differentiation",
  "Calculus: applications of differentiation",
  "Calculus: integration",
  "Exponential and logarithmic functions",
  "Financial mathematics",
  "Statistical analysis",
  "Revision / mixed exam practice",
  "Not sure",
];

export default function DiagnosticPage() {
  const router = useRouter();

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

  function toggleTopic(topic: string) {
    if (topicsStudied.includes(topic)) {
      setTopicsStudied(topicsStudied.filter((item) => item !== topic));
    } else {
      setTopicsStudied([...topicsStudied, topic]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
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
        className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm"
      >
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            HSC Maths Advanced Diagnostic
          </h1>

          <p className="text-slate-600">
            This diagnostic helps identify strengths, weak areas, and
            high-impact study priorities.
          </p>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-semibold text-blue-950">
            Pilot version
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-blue-900">
            For the pilot, diagnostic reports are manually reviewed before being
            sent to the parent or guardian email provided. Reports are intended
            for learning support only and are not official school results, exam
            predictions, or guarantees of future performance.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium">Student first name</span>
            <input
              value={studentFirstName}
              onChange={(event) => setStudentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">
              Parent/guardian first name
            </span>
            <input
              value={parentFirstName}
              onChange={(event) => setParentFirstName(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium">Parent/guardian email</span>
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
            <span className="text-sm font-medium">Year level</span>
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
            <span className="text-sm font-medium">Course</span>
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
            <span className="text-sm font-medium">Current topic</span>
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
            <span className="text-sm font-medium">Target result</span>
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
            <span className="text-sm font-medium">Next major assessment</span>
            <select
              value={assessmentTiming}
              onChange={(event) => setAssessmentTiming(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Select timing</option>
              <option>Within 2 weeks</option>
              <option>2–4 weeks</option>
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

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Diagnostic questions</h2>
            <p className="mt-1 text-sm text-slate-600">
              Try each question without outside help. The goal is not to get
              everything perfect — it is to identify the highest-impact study
              priorities.
            </p>
          </div>

          {questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-4 rounded-2xl border border-slate-200 p-5"
            >
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Question {index + 1} · {question.section}
                </p>

                <p className="mt-2 font-medium">{question.prompt}</p>

                <div className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-lg">
                  <BlockMath math={question.latex} />
                </div>
              </div>

              <label className="block space-y-1">
                <span className="text-sm font-medium">Answer</span>
                <input
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswers({
                      ...answers,
                      [question.id]: event.target.value,
                    })
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-sm font-medium">Confidence</span>
                <select
                  value={confidence[question.id] ?? ""}
                  onChange={(event) =>
                    setConfidence({
                      ...confidence,
                      [question.id]: event.target.value,
                    })
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                >
                  <option value="">Select confidence</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-sm font-medium">Optional working</span>
                <textarea
                  value={working[question.id] ?? ""}
                  onChange={(event) =>
                    setWorking({
                      ...working,
                      [question.id]: event.target.value,
                    })
                  }
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-base font-semibold">Before you submit</h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Please check the parent/guardian email address is correct. For the
            pilot, the diagnostic report will be reviewed manually and sent to
            that email address.
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