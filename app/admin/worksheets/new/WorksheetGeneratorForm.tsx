"use client";

import Link from "next/link";
import { useState } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../../components/MathText";
import { renderDiagramData } from "../../../components/diagramRegistry";
import { VisualPayloadRenderer } from "../../../components/VisualPayloadRenderer";
import type { Choice } from "../../../../lib/lessons/diagramRegistry";

type CourseTopicEntry = {
  courseSlug: string;
  courseTitle: string;
  topicSlug: string;
  topicTitle: string;
};

type CourseTopicSubtopicEntry = {
  courseSlug: string;
  courseTitle: string;
  topicSlug: string;
  topicTitle: string;
  subtopicSlug: string;
  subtopicTitle: string;
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
  choices: Choice[] | null;
  parts: {
    key: string;
    label: string;
    prompt: string;
    latex?: string | null;
    marks: number;
    answer: string;
    explanation: string;
  }[] | null;
  answer: string;
  diagramData: Record<string, unknown> | null;
};

type PreviewMetadata = {
  totalCandidates: number;
  multipartCandidates: number;
  selectedMultipartCount: number;
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
  {
    id: "harder",
    label: "Harder",
    description: "Skips Levels 1 & 2 - Level 3 to 6, incl. D6 challenge/exam",
  },
  {
    id: "challenge",
    label: "Challenge",
    description:
      "Levels 4-6 only, spread evenly across every selected subtopic",
  },
  {
    id: "even-spread",
    label: "Even spread",
    description:
      "All levels 1-6 equally, balanced evenly across the selected units",
  },
] as const;

const QUESTION_COUNTS = [5, 8, 10, 12, 15, 20, 25, 30, 40, 50];

function displaySlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function DiagramPreview({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  const diagram = renderDiagramData(data);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
      {diagram ?? (
        <p className="text-sm text-slate-500">
          Diagram data is present, but this preview does not recognise its type.
        </p>
      )}
    </div>
  );
}

export function WorksheetGeneratorForm({
  courseTopics,
  courseTopicSubtopics,
  initialStudentName = "",
  initialStudentEmail = "",
  initialStudentId = "",
  initialCourseSlug = "",
  initialTopicSlug = "",
  initialSubtopicSlug = "",
  initialTitle = "",
}: {
  courseTopics: CourseTopicEntry[];
  courseTopicSubtopics: CourseTopicSubtopicEntry[];
  initialStudentName?: string;
  initialStudentEmail?: string;
  initialStudentId?: string;
  initialCourseSlug?: string;
  initialTopicSlug?: string;
  initialSubtopicSlug?: string;
  initialTitle?: string;
}) {
  const courses = [...new Set(courseTopics.map((ct) => ct.courseSlug))].sort();
  const courseLabelMap = new Map(
    courseTopics.map((entry) => [entry.courseSlug, entry.courseTitle])
  );
  const topicLabelMap = new Map(
    courseTopics.map((entry) => [
      `${entry.courseSlug}::${entry.topicSlug}`,
      entry.topicTitle,
    ])
  );
  const subtopicLabelMap = new Map(
    courseTopicSubtopics.map((entry) => [
      `${entry.courseSlug}::${entry.topicSlug}::${entry.subtopicSlug}`,
      entry.subtopicTitle,
    ])
  );

  function courseLabel(slug: string) {
    return courseLabelMap.get(slug) ?? displaySlug(slug);
  }

  function topicLabel(topicSlug: string) {
    return topicLabelMap.get(`${courseSlug}::${topicSlug}`) ?? displaySlug(topicSlug);
  }

  function subtopicLabel(topicSlug: string, subtopicSlug: string) {
    return (
      subtopicLabelMap.get(`${courseSlug}::${topicSlug}::${subtopicSlug}`) ??
      displaySlug(subtopicSlug)
    );
  }

  function worksheetTitlePreview() {
    const courseTitle = courseLabel(courseSlug || "course");
    const subtopicTitles = selectedSubtopics
      .map((subtopic) => {
        const parentTopic = selectedTopics.find((topic) =>
          courseTopicSubtopics.some(
            (entry) =>
              entry.courseSlug === courseSlug &&
              entry.topicSlug === topic &&
              entry.subtopicSlug === subtopic
          )
        );
        return parentTopic ? subtopicLabel(parentTopic, subtopic) : null;
      })
      .filter((title): title is string => Boolean(title));
    if (subtopicTitles.length > 0) {
      return `${courseTitle}: ${subtopicTitles.join(", ")}`;
    }

    const topicTitles = selectedTopics.map((topic) => topicLabel(topic));
    if (topicTitles.length > 0) {
      return `${courseTitle}: ${topicTitles.join(", ")}`;
    }

    return courseTitle;
  }

  function worksheetScopePreview() {
    if (selectedSubtopics.length > 0) {
      const subtopicTitles = selectedSubtopics
        .map((subtopic) => {
          const parentTopic = selectedTopics.find((topic) =>
            courseTopicSubtopics.some(
              (entry) =>
                entry.courseSlug === courseSlug &&
                entry.topicSlug === topic &&
                entry.subtopicSlug === subtopic
            )
          );
          return parentTopic ? subtopicLabel(parentTopic, subtopic) : null;
        })
        .filter((title): title is string => Boolean(title));

      if (subtopicTitles.length > 0) {
        return `${courseLabel(courseSlug)} - ${subtopicTitles.join(", ")}`;
      }
    }

    if (selectedTopics.length > 0) {
      return `${courseLabel(courseSlug)} - ${selectedTopics
        .map((topic) => topicLabel(topic))
        .join(", ")}`;
    }

    return courseLabel(courseSlug);
  }

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

  const resolvedInitialSubtopics = (() => {
    if (!initialSubtopicSlug || resolvedInitialTopics.length === 0) return [];
    const available = courseTopicSubtopics
      .filter(
        (cts) =>
          cts.courseSlug === resolvedInitialCourse &&
          resolvedInitialTopics.includes(cts.topicSlug)
      )
      .map((cts) => cts.subtopicSlug);
    return available.includes(initialSubtopicSlug) ? [initialSubtopicSlug] : [];
  })();

  const [title, setTitle] = useState(initialTitle);
  const [studentName, setStudentName] = useState(initialStudentName);
  const [studentEmail, setStudentEmail] = useState(initialStudentEmail);
  const [studentId] = useState(initialStudentId);
  const [dueDate, setDueDate] = useState("");
  const [courseSlug, setCourseSlug] = useState(resolvedInitialCourse);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(resolvedInitialTopics);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>(
    resolvedInitialSubtopics
  );
  const [preset, setPreset] = useState<
    "catch-up" | "standard" | "push-forward" | "harder" | "challenge" | "even-spread"
  >("standard");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [teacherGuidedRetry, setTeacherGuidedRetry] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "previewing" | "preview" | "creating" | "success" | "error"
  >("idle");
  const [previewQuestions, setPreviewQuestions] = useState<PreviewQuestion[]>([]);
  const [prioritisedSubtopics, setPrioritisedSubtopics] = useState<string[]>([]);
  const [previewMetadata, setPreviewMetadata] = useState<PreviewMetadata | null>(
    null
  );
  const [replacingQuestionId, setReplacingQuestionId] = useState<string | null>(
    null
  );
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const topicsForCourse = courseTopics
    .filter((ct) => ct.courseSlug === courseSlug)
    .map((ct) => ct.topicSlug);

  const subtopicsForSelectedTopics = [
    ...new Set(
      courseTopicSubtopics
        .filter(
          (cts) =>
            cts.courseSlug === courseSlug && selectedTopics.includes(cts.topicSlug)
        )
        .map((cts) => cts.subtopicSlug)
    ),
  ];

  function handleCourseChange(next: string) {
    setCourseSlug(next);
    setSelectedTopics([]);
    setSelectedSubtopics([]);
    setPreviewQuestions([]);
    setPreviewMetadata(null);
    setStatus("idle");
  }

  function toggleTopic(topic: string) {
    const isRemoving = selectedTopics.includes(topic);
    const next = isRemoving
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    setSelectedTopics(next);
    if (isRemoving) {
      const stillAvailable = new Set(
        courseTopicSubtopics
          .filter(
            (cts) => cts.courseSlug === courseSlug && next.includes(cts.topicSlug)
          )
          .map((cts) => cts.subtopicSlug)
      );
      setSelectedSubtopics((prev) => prev.filter((s) => stillAvailable.has(s)));
    }
  }

  function toggleAllTopics() {
    if (selectedTopics.length === topicsForCourse.length) {
      setSelectedTopics([]);
      setSelectedSubtopics([]);
    } else {
      setSelectedTopics([...topicsForCourse]);
    }
  }

  function toggleSubtopic(subtopic: string) {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic) ? prev.filter((s) => s !== subtopic) : [...prev, subtopic]
    );
  }

  function toggleAllSubtopics() {
    if (selectedSubtopics.length === subtopicsForSelectedTopics.length) {
      setSelectedSubtopics([]);
    } else {
      setSelectedSubtopics([...subtopicsForSelectedTopics]);
    }
  }

  function dueAtIso() {
    return dueDate ? new Date(`${dueDate}T23:59:00`).toISOString() : undefined;
  }

  async function handlePreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      setErrorMessage("Select at least one unit.");
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
          selectedSubtopicSlugs:
            selectedSubtopics.length > 0 ? selectedSubtopics : undefined,
        }),
      });

      const data = (await res.json()) as {
        questions?: PreviewQuestion[];
        error?: string;
        prioritisedSubtopics?: string[];
        metadata?: PreviewMetadata;
      };

      if (!res.ok || data.error || !data.questions) {
        setErrorMessage(data.error ?? "Could not preview worksheet.");
        setStatus("error");
        return;
      }

      setPreviewQuestions(data.questions);
      setPrioritisedSubtopics(data.prioritisedSubtopics ?? []);
      setPreviewMetadata(data.metadata ?? null);
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
          subtopicSlug: question.subtopicSlug,
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
          title: title.trim() || worksheetTitlePreview(),
          courseSlug,
          topicSlugs: selectedTopics,
          preset,
          totalQuestions: previewQuestions.length,
          teacherGuidedRetry,
          questionIds: previewQuestions.map((q) => q.id),
          assignedStudentId: studentId || undefined,
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
    setTeacherGuidedRetry(false);
    setSelectedTopics([]);
    setSelectedSubtopics([]);
    setPreviewQuestions([]);
    setPrioritisedSubtopics([]);
    setPreviewMetadata(null);
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
          <Link
            href={`/admin/worksheets/${result.worksheetId}#live-monitor`}
            className="inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Open live view
          </Link>
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
            {worksheetScopePreview()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Nothing has been saved yet. Replace any question, then create the
            worksheet when you are happy.
          </p>
          {previewMetadata ? (
            <p className="mt-2 text-xs text-slate-500">
              Candidates: {previewMetadata.totalCandidates} total,{" "}
              {previewMetadata.multipartCandidates} multi-part; selected{" "}
              {previewMetadata.selectedMultipartCount} multi-part.
            </p>
          ) : null}
        </div>

        {prioritisedSubtopics.length > 0 && selectedSubtopics.length === 0 ? (
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            Prioritised weak subtopics:{" "}
            {prioritisedSubtopics
              .map((subtopic) => {
                const parentTopic = courseTopicSubtopics.find(
                  (entry) =>
                    entry.courseSlug === courseSlug &&
                    entry.subtopicSlug === subtopic &&
                    selectedTopics.includes(entry.topicSlug)
                )?.topicSlug;
                return parentTopic
                  ? subtopicLabel(parentTopic, subtopic)
                  : displaySlug(subtopic);
              })
              .join(", ")}
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
                    {topicLabelMap.get(`${question.courseSlug}::${question.topicSlug}`) ??
                      displaySlug(question.topicSlug)}{" "}
                    /{" "}
                    {subtopicLabelMap.get(
                      `${question.courseSlug}::${question.topicSlug}::${question.subtopicSlug}`
                    ) ?? displaySlug(question.subtopicSlug)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Difficulty {question.difficulty}
                    {question.sourceId ? ` · ${question.sourceId}` : ""}
                    {question.parts?.length ? " · Multi-part" : ""}
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
                        <VisualPayloadRenderer {...choice} />
                      </div>
                    ))}
                  </div>
                ) : null}
                {question.parts?.length ? (
                  <div className="space-y-3">
                    {question.parts.map((part) => (
                      <div
                        key={`${question.id}-${part.key}`}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-medium leading-7 text-slate-900">
                            <span className="mr-2 text-slate-500">
                              {part.label}
                            </span>
                            <MathText text={part.prompt} />
                          </p>
                          <span className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-600">
                            {part.marks} {part.marks === 1 ? "mark" : "marks"}
                          </span>
                        </div>
                        {part.latex ? (
                          <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3 text-lg">
                            <BlockMath math={part.latex} />
                          </div>
                        ) : null}
                        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                          <span className="font-semibold">Correct answer:</span>{" "}
                          <MathText text={part.answer} />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          <MathText text={part.explanation} />
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <DiagramPreview data={question.diagramData} />
                {!question.parts?.length ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    <span className="font-semibold">Correct answer:</span>{" "}
                    <MathText text={question.answer} />
                  </div>
                ) : null}
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
          placeholder={worksheetTitlePreview()}
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
              {courseLabel(course)}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="space-y-2">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-medium text-slate-800">Units</legend>
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
            No units with worksheet questions are available for this course.
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
                <span className="text-slate-700">{topicLabel(topic)}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {selectedTopics.length > 0 && subtopicsForSelectedTopics.length > 0 ? (
        <fieldset className="space-y-2">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-medium text-slate-800">
              Subtopics{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </legend>
            {subtopicsForSelectedTopics.length > 1 ? (
              <button
                type="button"
                onClick={toggleAllSubtopics}
                className="text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                {selectedSubtopics.length === subtopicsForSelectedTopics.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
            ) : null}
          </div>
          <p className="text-xs text-slate-500">
            Leave blank to use weakest subtopics automatically.
          </p>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {subtopicsForSelectedTopics.map((subtopic) => (
              <label
                key={subtopic}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-slate-300 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selectedSubtopics.includes(subtopic)}
                  onChange={() => toggleSubtopic(subtopic)}
                  disabled={status === "previewing"}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700">
                  {subtopicLabel(
                    courseTopicSubtopics.find(
                      (entry) =>
                        entry.courseSlug === courseSlug &&
                        entry.subtopicSlug === subtopic
                    )?.topicSlug ?? "",
                    subtopic
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="font-semibold text-slate-800">
          Multi-part questions are included automatically
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          When suitable multi-part questions exist for the selected units,
          subtopics, and difficulty, they are included in the worksheet pool.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm hover:border-indigo-300">
        <input
          type="checkbox"
          checked={teacherGuidedRetry}
          onChange={(event) => setTeacherGuidedRetry(event.target.checked)}
          disabled={status === "previewing"}
          className="mt-1 rounded border-indigo-300"
        />
        <span>
          <span className="font-semibold text-slate-900">
            Require discussion and retry after a wrong answer
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-600">
            Students cannot move on after an incorrect response. They are asked
            to discuss it with you and try again; a later correct answer earns
            half marks.
          </span>
        </span>
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-800">
          Difficulty
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
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
