"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../../components/MathText";
import { BoxPlotView } from "../../../course/components/BoxPlotView";
import { CartesianGraphView } from "../../../course/components/CartesianGraphView";
import { NetworkDiagramView } from "../../../course/components/NetworkDiagramView";
import { NormalDistributionView } from "../../../course/components/NormalDistributionView";
import { ProbabilityTreeView } from "../../../course/components/ProbabilityTreeView";
import { TrapezoidalRuleView } from "../../../course/components/TrapezoidalRuleView";
import { TriangleDiagramView } from "../../../course/components/TriangleDiagramView";
import { TwoWayTableView } from "../../../course/components/TwoWayTableView";
import { VennDiagramView } from "../../../course/components/VennDiagramView";
import type {
  BoxPlotDiagram,
  CartesianGraph,
  NetworkDiagram,
  NormalDistributionDiagram,
  ProbabilityTreeDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TwoWayTableDiagram,
  VennDiagram,
} from "../../../../lib/lessons/types";

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

type PreviewQuestion = {
  id: string;
  sourceId: string | null;
  courseSlug: string;
  topicSlug: string;
  subtopicSlug: string;
  difficulty: number;
  prompt: string;
  latex: string | null;
  choices: { label: string; text: string }[] | null;
  answer: string;
  diagramData: Record<string, unknown> | null;
};

const PRESETS = [
  {
    id: "catch-up",
    label: "Catch-up",
    description: "Mostly foundation and standard - builds confidence",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Balanced spread - typical revision session",
  },
  {
    id: "push-forward",
    label: "Push-forward",
    description: "Weighted to harder questions - challenging session",
  },
] as const;

const QUESTION_COUNTS = [5, 8, 10, 12, 15, 20];

function displaySlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function DiagramPreview({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  const { type, ...rest } = data;

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
      {type === "cartesianGraph" ? (
        <CartesianGraphView graph={rest as CartesianGraph} />
      ) : type === "triangleDiagram" ? (
        <TriangleDiagramView diagram={rest as TriangleDiagram} />
      ) : type === "trapezoidalRuleDiagram" ? (
        <TrapezoidalRuleView diagram={rest as TrapezoidalRuleDiagram} />
      ) : type === "boxPlotDiagram" ? (
        <BoxPlotView diagram={rest as BoxPlotDiagram} />
      ) : type === "normalDistributionDiagram" ? (
        <NormalDistributionView diagram={rest as NormalDistributionDiagram} />
      ) : type === "probabilityTreeDiagram" ? (
        <ProbabilityTreeView diagram={rest as ProbabilityTreeDiagram} />
      ) : type === "twoWayTableDiagram" ? (
        <TwoWayTableView diagram={rest as TwoWayTableDiagram} />
      ) : type === "vennDiagram" ? (
        <VennDiagramView diagram={rest as VennDiagram} />
      ) : type === "networkDiagram" ? (
        <NetworkDiagramView diagram={rest as NetworkDiagram} />
      ) : (
        <p className="text-sm text-slate-500">
          Diagram data is present, but this preview does not recognise its type.
        </p>
      )}
    </div>
  );
}

export function WorksheetGeneratorForm({
  courseTopics,
  initialStudentName = "",
  initialStudentEmail = "",
  initialStudentId = "",
  initialCourseSlug = "",
  initialTopicSlug = "",
  initialTitle = "",
}: {
  courseTopics: CourseTopicEntry[];
  initialStudentName?: string;
  initialStudentEmail?: string;
  initialStudentId?: string;
  initialCourseSlug?: string;
  initialTopicSlug?: string;
  initialTitle?: string;
}) {
  const courses = [...new Set(courseTopics.map((ct) => ct.courseSlug))].sort();

  const resolvedInitialCourse =
    initialCourseSlug && courses.includes(initialCourseSlug)
      ? initialCourseSlug
      : courses[0] ?? "";

  const resolvedInitialTopics = (() => {
    if (!initialTopicSlug) return [];
    const available = courseTopics
      .filter((ct) => ct.courseSlug === resolvedInitialCourse)
      .map((ct) => ct.topicSlug);
    return available.includes(initialTopicSlug) ? [initialTopicSlug] : [];
  })();

  const [title, setTitle] = useState(initialTitle);
  const [studentName, setStudentName] = useState(initialStudentName);
  const [studentEmail, setStudentEmail] = useState(initialStudentEmail);
  const [studentId] = useState(initialStudentId);
  const [dueDate, setDueDate] = useState("");
  const [courseSlug, setCourseSlug] = useState(resolvedInitialCourse);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(resolvedInitialTopics);
  const [preset, setPreset] = useState<"catch-up" | "standard" | "push-forward">(
    "standard"
  );
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [status, setStatus] = useState<
    "idle" | "previewing" | "preview" | "creating" | "success" | "error"
  >("idle");
  const [previewQuestions, setPreviewQuestions] = useState<PreviewQuestion[]>([]);
  const [prioritisedSubtopics, setPrioritisedSubtopics] = useState<string[]>([]);
  const [replacingQuestionId, setReplacingQuestionId] = useState<string | null>(
    null
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
    setPreviewQuestions([]);
    setStatus("idle");
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

  function dueAtIso() {
    return dueDate ? new Date(`${dueDate}T23:59:00`).toISOString() : undefined;
  }

  async function handlePreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      setErrorMessage("Select at least one topic.");
      return;
    }

    setStatus("previewing");
    setErrorMessage("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/worksheets/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          topicSlugs: selectedTopics,
          preset,
          totalQuestions,
          studentId: studentId || undefined,
        }),
      });

      const data = (await res.json()) as {
        questions?: PreviewQuestion[];
        error?: string;
        prioritisedSubtopics?: string[];
      };

      if (!res.ok || data.error || !data.questions) {
        setErrorMessage(data.error ?? "Could not preview worksheet.");
        setStatus("error");
        return;
      }

      setPreviewQuestions(data.questions);
      setPrioritisedSubtopics(data.prioritisedSubtopics ?? []);
      setStatus("preview");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  async function handleReplace(question: PreviewQuestion, index: number) {
    setReplacingQuestionId(question.id);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/worksheets/preview/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: question.courseSlug,
          topicSlug: question.topicSlug,
          difficulty: question.difficulty,
          excludeQuestionIds: previewQuestions.map((q) => q.id),
        }),
      });

      const data = (await res.json()) as {
        question?: PreviewQuestion;
        error?: string;
      };

      if (!res.ok || data.error || !data.question) {
        setErrorMessage(data.error ?? "Could not replace this question.");
        return;
      }

      setPreviewQuestions((prev) =>
        prev.map((existing, currentIndex) =>
          currentIndex === index ? data.question! : existing
        )
      );
    } catch {
      setErrorMessage("Network error while replacing the question.");
    } finally {
      setReplacingQuestionId(null);
    }
  }

  async function handleCreate() {
    if (previewQuestions.length === 0) {
      setErrorMessage("Preview a worksheet before creating it.");
      setStatus("idle");
      return;
    }

    setStatus("creating");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/worksheets/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || `${courseSlug} - ${preset}`,
          courseSlug,
          topicSlugs: selectedTopics,
          preset,
          totalQuestions: previewQuestions.length,
          questionIds: previewQuestions.map((q) => q.id),
          assignedStudentName: studentName.trim() || undefined,
          assignedStudentEmail: studentEmail.trim() || undefined,
          dueAt: dueAtIso(),
        }),
      });

      const data = (await res.json()) as Partial<GenerateResult> & {
        error?: string;
      };

      if (!res.ok || data.error) {
        setErrorMessage(data.error ?? "Could not create worksheet.");
        setStatus("preview");
        return;
      }

      setResult(data as GenerateResult);
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("preview");
    }
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The link remains visible for manual copy.
    }
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setTitle("");
    setStudentName("");
    setStudentEmail("");
    setDueDate("");
    setSelectedTopics([]);
    setPreviewQuestions([]);
    setPrioritisedSubtopics([]);
    setCopied(false);
    setErrorMessage("");
  }

  if (status === "success" && result) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-emerald-800">
            Worksheet created - {result.questionCount} question
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
            Open worksheet
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

  if (status === "preview" || status === "creating") {
    return (
      <div className="space-y-6">
        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Preview: {previewQuestions.length} question
            {previewQuestions.length !== 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {displaySlug(courseSlug)} - {selectedTopics.map(displaySlug).join(", ")}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Nothing has been saved yet. Replace any question, then create the
            worksheet when you are happy.
          </p>
        </div>

        {prioritisedSubtopics.length > 0 ? (
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            Prioritised weak subtopics:{" "}
            {prioritisedSubtopics.map(displaySlug).join(", ")}
          </div>
        ) : null}

        <div className="space-y-4">
          {previewQuestions.map((question, index) => (
            <article
              key={`${question.id}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Question {index + 1}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {displaySlug(question.topicSlug)} /{" "}
                    {displaySlug(question.subtopicSlug)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Difficulty {question.difficulty}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleReplace(question, index)}
                  disabled={status === "creating" || replacingQuestionId !== null}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {replacingQuestionId === question.id
                    ? "Replacing..."
                    : "Replace question"}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <p className="font-medium leading-7 text-slate-900">
                  <MathText text={question.prompt} />
                </p>
                {question.latex ? (
                  <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-lg">
                    <BlockMath math={question.latex} />
                  </div>
                ) : null}
                {question.choices ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {question.choices.map((choice) => (
                      <div
                        key={`${question.id}-${choice.label}`}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                      >
                        <span className="font-semibold">{choice.label}.</span>{" "}
                        <MathText text={choice.text} />
                      </div>
                    ))}
                  </div>
                ) : null}
                <DiagramPreview data={question.diagramData} />
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  <span className="font-semibold">Correct answer:</span>{" "}
                  <MathText text={question.answer} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="sticky bottom-4 flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            disabled={status === "creating"}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          >
            Edit settings
          </button>
          <button
            type="button"
            onClick={() => void handleCreate()}
            disabled={status === "creating" || replacingQuestionId !== null}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "creating" ? "Creating..." : "Create worksheet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handlePreview(e)} className="space-y-6">
      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">
          Worksheet title{" "}
          <span className="font-normal text-slate-500">
            (optional - auto-generated if blank)
          </span>
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`${courseSlug || "Course"} - ${preset}`}
          disabled={status === "previewing"}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
        />
      </label>

      <fieldset className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-800">
          Assign to student{" "}
          <span className="font-normal text-slate-500">(optional)</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Student name
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Mia Chen"
              maxLength={120}
              disabled={status === "previewing"}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Student email
            </span>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="student@example.com"
              maxLength={180}
              disabled={status === "previewing"}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
            />
          </label>
        </div>
        <label className="block max-w-xs space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={status === "previewing"}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
          />
        </label>
      </fieldset>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-800">Course</span>
        <select
          value={courseSlug}
          onChange={(e) => handleCourseChange(e.target.value)}
          disabled={status === "previewing"}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
        >
          {courses.map((course) => (
            <option key={course} value={course}>
              {displaySlug(course)}
            </option>
          ))}
        </select>
      </label>

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
                  disabled={status === "previewing"}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700">{displaySlug(topic)}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-800">
          Difficulty
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {PRESETS.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 text-sm transition ${
                preset === item.id
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name="preset"
                value={item.id}
                checked={preset === item.id}
                onChange={() => setPreset(item.id)}
                disabled={status === "previewing"}
                className="sr-only"
              />
              <span className="font-semibold">{item.label}</span>
              <span
                className={`text-xs ${
                  preset === item.id ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {item.description}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-800">
          Number of questions
        </legend>
        <div className="flex flex-wrap gap-2">
          {QUESTION_COUNTS.map((count) => (
            <label key={count} className="cursor-pointer">
              <input
                type="radio"
                name="totalQuestions"
                value={count}
                checked={totalQuestions === count}
                onChange={() => setTotalQuestions(count)}
                disabled={status === "previewing"}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                  totalQuestions === count
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {count}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "previewing" || topicsForCourse.length === 0}
        className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "previewing" ? "Building preview..." : "Preview worksheet"}
      </button>
    </form>
  );
}
