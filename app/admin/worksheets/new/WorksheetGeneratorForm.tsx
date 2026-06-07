"use client";

import { useState } from "react";

type CourseTopicEntry = {
  courseSlug: string;
  topicSlug: string;
};

type GenerateResult = {
  worksheetId: string;
  shareToken: string;
  shareUrl: string;
  questionCount: number;
};

const PRESETS = [
  {
    id: "catch-up",
    label: "Catch-up",
    description: "Mostly foundation and standard — builds confidence",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Balanced spread — typical revision session",
  },
  {
    id: "push-forward",
    label: "Push-forward",
    description: "Weighted to harder questions — challenging session",
  },
] as const;

const QUESTION_COUNTS = [5, 8, 10, 12, 15, 20];

export function WorksheetGeneratorForm({
  courseTopics,
}: {
  courseTopics: CourseTopicEntry[];
}) {
  const courses = [...new Set(courseTopics.map((ct) => ct.courseSlug))].sort();

  const [title, setTitle] = useState("");
  const [courseSlug, setCourseSlug] = useState(courses[0] ?? "");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [preset, setPreset] = useState<"catch-up" | "standard" | "push-forward">(
    "standard"
  );
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const topicsForCourse = courseTopics
    .filter((ct) => ct.courseSlug === courseSlug)
    .map((ct) => ct.topicSlug)
    .sort();

  function handleCourseChange(next: string) {
    setCourseSlug(next);
    setSelectedTopics([]);
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function toggleAllTopics() {
    if (selectedTopics.length === topicsForCourse.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics([...topicsForCourse]);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      setErrorMessage("Select at least one topic.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/worksheets/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || `${courseSlug} — ${preset}`,
          courseSlug,
          topicSlugs: selectedTopics,
          preset,
          totalQuestions,
        }),
      });

      const data = (await res.json()) as Partial<GenerateResult> & {
        error?: string;
      };

      if (!res.ok || data.error) {
        setErrorMessage(data.error ?? "Could not generate worksheet.");
        setStatus("error");
        return;
      }

      setResult(data as GenerateResult);
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — show URL for manual copy
    }
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setTitle("");
    setSelectedTopics([]);
    setCopied(false);
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success" && result) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-emerald-800">
            Worksheet created — {result.questionCount} question
            {result.questionCount !== 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            Share this link with your student. No login required to open it.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="flex-1 break-all rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-800">
              {result.shareUrl}
            </code>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="shrink-0 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={result.shareUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Preview worksheet ↗
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Generate another
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {/* Title */}
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">
          Worksheet title{" "}
          <span className="font-normal text-slate-500">(optional — auto-generated if blank)</span>
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`${courseSlug || "Course"} — ${preset}`}
          disabled={status === "submitting"}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
        />
      </label>

      {/* Course */}
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">Course</span>
        <select
          value={courseSlug}
          onChange={(e) => handleCourseChange(e.target.value)}
          disabled={status === "submitting"}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
        >
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Topics */}
      <fieldset className="space-y-2">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-medium text-slate-800">Topics</legend>
          {topicsForCourse.length > 1 ? (
            <button
              type="button"
              onClick={toggleAllTopics}
              className="text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              {selectedTopics.length === topicsForCourse.length
                ? "Deselect all"
                : "Select all"}
            </button>
          ) : null}
        </div>

        {topicsForCourse.length === 0 ? (
          <p className="text-sm text-slate-500">
            No topics available for this course. Run the seed script first.
          </p>
        ) : (
          <div className="grid gap-1.5 sm:grid-cols-2">
            {topicsForCourse.map((topic) => (
              <label
                key={topic}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-slate-300 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  disabled={status === "submitting"}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700">{topic.replace(/-/g, " ")}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {/* Difficulty preset */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-800">
          Difficulty
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 text-sm transition ${
                preset === p.id
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name="preset"
                value={p.id}
                checked={preset === p.id}
                onChange={() => setPreset(p.id)}
                disabled={status === "submitting"}
                className="sr-only"
              />
              <span className="font-semibold">{p.label}</span>
              <span
                className={`text-xs ${preset === p.id ? "text-slate-300" : "text-slate-500"}`}
              >
                {p.description}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Number of questions */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-800">
          Number of questions
        </legend>
        <div className="flex flex-wrap gap-2">
          {QUESTION_COUNTS.map((n) => (
            <label key={n} className="cursor-pointer">
              <input
                type="radio"
                name="totalQuestions"
                value={n}
                checked={totalQuestions === n}
                onChange={() => setTotalQuestions(n)}
                disabled={status === "submitting"}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                  totalQuestions === n
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "submitting" || topicsForCourse.length === 0}
        className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "submitting" ? "Generating…" : "Generate worksheet"}
      </button>
    </form>
  );
}
