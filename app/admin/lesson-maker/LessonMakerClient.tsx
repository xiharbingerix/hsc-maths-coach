"use client";

import { useRef, useState, useTransition } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../components/MathText";
import {
  generateLessonPlanAction,
  saveLessonPlanAction,
  loadSavedPlanAction,
  deleteSavedPlanAction,
  type SavedPlanSummary,
} from "./actions";
import type { CatalogCourse } from "./page";
import type {
  TutorLessonPlan,
  TutorSection,
  TutorQuestion,
  LessonLength,
  LessonDeliveryMode,
  StudentLevel,
} from "../../../lib/lessonMaker";
import {
  DELIVERY_MODE_DETAILS,
  STUDENT_LEVEL_ORDER,
  STUDENT_LEVEL_DETAILS,
  normaliseDeliveryMode,
  normaliseStudentLevels,
  primaryStudentLevel,
} from "../../../lib/lessonPlannerConfig";
import { VisualPayloadRenderer } from "../../components/VisualPayloadRenderer";
import type { Year9PlannerSyllabusPayload } from "../../../lib/syllabus/year9Nesa";

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  catalog: CatalogCourse[];
  initialSavedPlans: SavedPlanSummary[];
  year9Syllabus: Year9PlannerSyllabusPayload;
}

function selectedContentCodes(plan: TutorLessonPlan): string[] {
  return (
    plan.syllabusScope?.outcomes.flatMap((outcome) =>
      outcome.focusAreas.flatMap((focus) =>
        focus.contentGroups.flatMap((group) =>
          group.contentPoints.map((point) => point.code),
        ),
      ),
    ) ?? []
  );
}

function alreadyMetContentCodes(plan: TutorLessonPlan): string[] {
  return plan.priorAttainment?.contentPointCodes ?? [];
}

function planStudentLevels(plan: TutorLessonPlan): StudentLevel[] {
  return normaliseStudentLevels(plan.levels, plan.level);
}

function studentLevelsLabel(levels: StudentLevel[]): string {
  return levels
    .map((level) => STUDENT_LEVEL_DETAILS[level].shortLabel)
    .join(", ");
}

// ── Plan-to-text serialiser (for clipboard) ──────────────────────────────────

function buildWorksheetUrl(
  courseSlug: string,
  unitSlug: string,
  lessonTitle: string,
  lessonSlug?: string
): string {
  const params = new URLSearchParams({
    course: courseSlug,
    topic: unitSlug,
    title: lessonTitle,
  });
  if (lessonSlug) params.set("subtopic", lessonSlug);
  return `/admin/worksheets/new?${params.toString()}`;
}

function planToText(plan: TutorLessonPlan): string {
  const lines: string[] = [];
  const levels = planStudentLevels(plan);
  const deliveryMode = normaliseDeliveryMode(plan.deliveryMode);
  lines.push(`LESSON PLAN — ${plan.title}`);
  lines.push(`Course: ${plan.course}`);
  lines.push(`Unit: ${plan.unit}`);
  lines.push(
    `Duration: ${plan.length} min${plan.length === 10 ? " (catch-up recap)" : ""} | Delivery: ${DELIVERY_MODE_DETAILS[deliveryMode].label} | Levels: ${studentLevelsLabel(levels)} | Generated: ${new Date(plan.generatedAt).toLocaleDateString("en-AU")}`
  );
  lines.push(`Learning goal: ${plan.learningGoal}`);
  if (plan.syllabusScope) {
    lines.push(
      `NESA outcomes: ${plan.syllabusScope.outcomes.map((outcome) => outcome.code).join(", ")}`,
    );
    lines.push(`Selected NESA content:`);
    plan.syllabusScope.outcomes.forEach((outcome) =>
      outcome.focusAreas.forEach((focus) =>
        focus.contentGroups.forEach((group) =>
          group.contentPoints.forEach((point) =>
            lines.push(`  • ${point.code}: ${point.text}`),
          ),
        ),
      ),
    );
  }
  if (plan.priorAttainment) {
    lines.push(`Already met — do not reteach:`);
    plan.priorAttainment.outcomes.forEach((outcome) => {
      lines.push(`  ${outcome.code}: ${outcome.description}`);
      outcome.contentPoints.forEach((point) =>
        lines.push(`    • ${point.code}: ${point.text}`),
      );
    });
  }
  lines.push(`Success criteria:`);
  plan.successCriteria.forEach((c) => lines.push(`  • ${c}`));
  lines.push("");

  plan.sections.forEach((s) => {
    lines.push(`${"─".repeat(60)}`);
    const timing = s.minutes > 0 ? ` [${s.minutes} min]` : "";
    lines.push(`${s.heading.toUpperCase()}${timing}`);
    lines.push("");

    switch (s.kind) {
      case "text":
        s.paragraphs.forEach((p) => lines.push(p));
        break;
      case "formulas":
        if (s.note) lines.push(s.note);
        s.blocks.forEach((b) => lines.push(`  ${b}`));
        break;
      case "criteria":
        s.items.forEach((item) => lines.push(`  • ${item}`));
        break;
      case "questions":
        s.questions.forEach((q, i) => {
          lines.push(`Q${i + 1}. ${q.prompt}`);
          if (q.isMultipleChoice && q.choices) {
            q.choices.forEach((c) => lines.push(`   ${c.label}. ${c.text}`));
          }
          lines.push(`   Answer: ${q.answer}`);
          if (q.hint) lines.push(`   Hint: ${q.hint}`);
          lines.push("");
        });
        break;
      case "worked-example": {
        const ex = s.example;
        lines.push(`${ex.title}`);
        lines.push(`Question: ${ex.questionLatex}`);
        ex.steps.forEach((step, i) => {
          lines.push(`  Step ${i + 1}: ${step.explanation}`);
          if (step.latex) lines.push(`    ${step.latex}`);
        });
        lines.push(`  Answer: ${ex.finalAnswerLatex}`);
        break;
      }
      case "misconceptions":
        s.items.forEach((item) => {
          lines.push(`  ✗ ${item.mistake}`);
          lines.push(`  ✓ ${item.fix}`);
          lines.push("");
        });
        break;
      case "prompts":
        s.prompts.forEach((p) => lines.push(`  • ${p}`));
        break;
      case "homework":
        lines.push(s.suggestion);
        break;
      case "dialogue":
        s.exchanges.forEach((e) => {
          lines.push(
            e.speaker === "tutor"
              ? `  ${deliveryMode === "classroom" ? "TEACHER" : "TUTOR"}: ${e.text}`
              : `  ${deliveryMode === "classroom" ? "CLASS" : "STUDENT"} (listen for): ${e.text}`
          );
        });
        break;
    }
    lines.push("");
  });

  return lines.join("\n");
}

// ── Question renderer ────────────────────────────────────────────────────────

// Question block — the QUESTION ONLY (no answer/hint/explanation), so it can be
// captured as a clean image to share or project without revealing solutions.
function QuestionCard({
  question,
  number,
}: {
  question: TutorQuestion;
  number: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:border-slate-300 print:bg-white">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {number}
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium leading-relaxed text-slate-800">
            <MathText text={question.prompt} />
          </p>

          {/* Display formula */}
          {question.displayLatex && (
            <div className="overflow-x-auto py-1 text-sm">
              <BlockMath math={question.displayLatex} />
            </div>
          )}

          {/* Visual payload */}
          <VisualPayloadRenderer {...question} />

          {/* MCQ choices */}
          {question.isMultipleChoice && question.choices && (
            <ol className="space-y-1 pl-1">
              {question.choices.map((c) => (
                <li key={c.label} className="flex gap-2 text-sm text-slate-700">
                  <span className="font-semibold">{c.label}.</span>
                  <MathText text={c.text} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

// Answers / hints / explanations, kept SEPARATE from the question blocks so they
// never end up in the copied question image.
function QuestionAnswers({ questions }: { questions: TutorQuestion[] }) {
  return (
    <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 print:border-emerald-300 print:bg-white">
      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
        Answers &amp; solutions
      </p>
      <ol className="space-y-2">
        {questions.map((q, i) => (
          <li key={q.id} className="text-sm text-slate-700">
            <span className="font-semibold">{i + 1}. </span>
            <span className="font-semibold text-emerald-800">Answer: </span>
            <MathText text={q.answer} />
            {q.hint && (
              <span className="mt-0.5 block text-xs text-slate-500">
                <span className="font-semibold">Hint: </span>
                <MathText text={q.hint} />
              </span>
            )}
            {q.explanation && (
              <span className="mt-0.5 block text-xs text-slate-600">
                <span className="font-semibold">Explanation: </span>
                <MathText text={q.explanation} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// A questions section: clean question blocks (image-copyable) with answers held
// separately, plus a button that copies an image of just the questions.
function QuestionsSection({ questions }: { questions: TutorQuestion[] }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(true);
  const [imgState, setImgState] = useState<
    "idle" | "copying" | "copied" | "downloaded" | "error"
  >("idle");

  async function copyQuestionsImage() {
    const node = captureRef.current;
    if (!node) return;
    setImgState("copying");
    try {
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(node, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      if (!blob) throw new Error("Could not render image.");
      // Preferred: straight to clipboard for pasting into Zoom or class slides.
      if (navigator.clipboard && "write" in navigator.clipboard) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setImgState("copied");
        setTimeout(() => setImgState("idle"), 2500);
        return;
      }
      throw new Error("Clipboard image write unsupported.");
    } catch {
      // Fallback: download the PNG so it can still be shared.
      try {
        const { toPng } = await import("html-to-image");
        const dataUrl = await toPng(node, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          cacheBust: true,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "questions.png";
        link.click();
        setImgState("downloaded");
        setTimeout(() => setImgState("idle"), 2500);
      } catch {
        setImgState("error");
        setTimeout(() => setImgState("idle"), 2500);
      }
    }
  }

  const imgLabel =
    imgState === "copying"
      ? "Rendering…"
      : imgState === "copied"
        ? "Copied image ✓"
        : imgState === "downloaded"
          ? "Downloaded PNG"
          : imgState === "error"
            ? "Couldn’t copy"
            : "Copy questions as image";

  return (
    <div className="space-y-3">
      {/* Controls (never captured / printed) */}
      <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
        <button
          type="button"
          onClick={() => void copyQuestionsImage()}
          disabled={imgState === "copying"}
          className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-60"
          title="Copies an image of just the question blocks, without answers"
        >
          {imgLabel}
        </button>
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
          <input
            type="checkbox"
            checked={showAnswers}
            onChange={(e) => setShowAnswers(e.target.checked)}
            className="rounded border-slate-300"
          />
          Show answers
        </label>
      </div>

      {/* Question blocks only — this is what gets captured. */}
      <div ref={captureRef} className="space-y-3 bg-white p-1">
        {questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} number={i + 1} />
        ))}
      </div>

      {/* Answers held separately. */}
      {showAnswers && <QuestionAnswers questions={questions} />}
    </div>
  );
}

// ── Section renderer ─────────────────────────────────────────────────────────

function SectionCard({
  section,
  index,
  deliveryMode,
}: {
  section: TutorSection;
  index: number;
  deliveryMode: LessonDeliveryMode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm print:rounded-none print:border-0 print:border-b print:border-slate-300 print:shadow-none print:break-inside-avoid">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 print:border-slate-200">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700 print:border print:border-indigo-200">
            {index + 1}
          </span>
          <h2 className="text-sm font-bold text-slate-900">{section.heading}</h2>
        </div>
        {section.minutes > 0 && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {section.minutes} min
          </span>
        )}
      </div>

      {/* Section body */}
      <div className="px-5 py-4">
        {section.kind === "text" && (
          <div className="space-y-2">
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${
                  p.startsWith("•")
                    ? "pl-4 text-slate-700"
                    : p.startsWith("Note (")
                      ? "rounded-lg bg-amber-50 px-3 py-2 text-amber-900"
                      : p === ""
                        ? "hidden"
                        : "text-slate-800"
                }`}
              >
                <MathText text={p} />
              </p>
            ))}
          </div>
        )}

        {section.kind === "formulas" && (
          <div className="space-y-3">
            {section.note && (
              <p className="text-xs italic text-slate-500">{section.note}</p>
            )}
            {section.blocks.map((block, i) => (
              <div
                key={i}
                className="overflow-x-auto rounded-xl bg-indigo-50 px-4 py-3"
              >
                <BlockMath math={block} />
              </div>
            ))}
          </div>
        )}

        {section.kind === "criteria" && (
          <ul className="space-y-1.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                <MathText text={item} />
              </li>
            ))}
          </ul>
        )}

        {section.kind === "questions" && (
          <QuestionsSection questions={section.questions} />
        )}

        {section.kind === "worked-example" && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              {section.example.title}
            </p>
            <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3">
              <BlockMath math={section.example.questionLatex} />
            </div>
            <VisualPayloadRenderer {...section.example} />
            <div className="space-y-2">
              {section.example.steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-100 bg-white p-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Step {i + 1}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{step.explanation}</p>
                  {step.latex && (
                    <div className="mt-2 overflow-x-auto">
                      <BlockMath math={step.latex} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Final Answer
              </p>
              <div className="mt-1 overflow-x-auto">
                <BlockMath math={section.example.finalAnswerLatex} />
              </div>
            </div>
          </div>
        )}

        {section.kind === "misconceptions" && (
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-base leading-none text-red-500">✗</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-red-700">
                      <MathText text={item.mistake} />
                    </p>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-base leading-none text-emerald-600">✓</span>
                      <p className="text-sm text-emerald-800">
                        <MathText text={item.fix} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {section.kind === "prompts" && (
          <ul className="space-y-2">
            {section.prompts.map((prompt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                <MathText text={prompt} />
              </li>
            ))}
          </ul>
        )}

        {section.kind === "homework" && (
          <p className="text-sm leading-relaxed text-slate-700">
            {section.suggestion}
          </p>
        )}

        {section.kind === "dialogue" && (
          <div className="space-y-2">
            {section.exchanges.map((e, i) =>
              e.speaker === "tutor" ? (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-indigo-50 px-4 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-400">
                      {deliveryMode === "classroom" ? "Teacher" : "Tutor"}
                    </p>
                    <p className="text-sm leading-relaxed text-indigo-900">
                      <MathText text={e.text} />
                    </p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {deliveryMode === "classroom"
                        ? "Listen for (class)"
                        : "Listen for (student)"}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      <MathText text={e.text} />
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Plan header ──────────────────────────────────────────────────────────────

function PlanHeader({ plan }: { plan: TutorLessonPlan }) {
  const levels = planStudentLevels(plan);
  const deliveryMode = normaliseDeliveryMode(plan.deliveryMode);

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 print:rounded-none print:border-0 print:bg-white print:px-0 print:pt-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 print:text-slate-400">
        Nova Maths — {DELIVERY_MODE_DETAILS[deliveryMode].label} Lesson Plan
      </p>
      <h1 className="mt-1 text-2xl font-extrabold text-indigo-900 print:text-slate-900">
        {plan.title}
      </h1>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {plan.course}
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {plan.unit}
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {plan.length === 10 ? "10 min catch-up recap" : `${plan.length} min`}
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {DELIVERY_MODE_DETAILS[deliveryMode].label}
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {studentLevelsLabel(levels)}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-indigo-800 print:text-slate-700">
        {plan.learningGoal}
      </p>
      {plan.syllabusScope && (
        <p className="mt-2 text-xs font-semibold text-indigo-700 print:text-slate-600">
          Official NESA {plan.syllabusScope.stage}: {plan.syllabusScope.outcomes
            .map((outcome) => outcome.code)
            .join(", ")} · {selectedContentCodes(plan).length} selected content point
          {selectedContentCodes(plan).length === 1 ? "" : "s"}
        </p>
      )}
      {plan.priorAttainment && (
        <p className="mt-1 text-xs font-semibold text-emerald-700 print:text-slate-600">
          Prior attainment: {plan.priorAttainment.contentPointCodes.length} content
          point{plan.priorAttainment.contentPointCodes.length === 1 ? "" : "s"}{" "}
          already met — retrieval or application only
        </p>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function LessonMakerClient({
  catalog,
  initialSavedPlans,
  year9Syllabus,
}: Props) {
  const [courseSlug, setCourseSlug] = useState("");
  const [unitSlug, setUnitSlug] = useState("");
  const [lessonSlug, setLessonSlug] = useState("");
  const [length, setLength] = useState<LessonLength>(45);
  const [deliveryMode, setDeliveryMode] =
    useState<LessonDeliveryMode>("zoom");
  const [levels, setLevels] = useState<StudentLevel[]>(["level-2"]);
  const [selectedSyllabusCodes, setSelectedSyllabusCodes] = useState<string[]>([]);
  const [alreadyMetSyllabusCodes, setAlreadyMetSyllabusCodes] = useState<string[]>([]);
  const [plan, setPlan] = useState<TutorLessonPlan | null>(null);
  const [planSource, setPlanSource] = useState<
    "cache" | "ai" | "built-in" | "saved" | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Saved plans state
  const [savedPlans, setSavedPlans] = useState<SavedPlanSummary[]>(initialSavedPlans);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Derived cascade data
  const selectedCourse = catalog.find((c) => c.slug === courseSlug) ?? null;
  const selectedUnit =
    selectedCourse?.units.find((u) => u.slug === unitSlug) ?? null;
  const selectedFocusAreaIds = new Set(
    year9Syllabus.unitFocusAreaIds[unitSlug] ?? [],
  );
  const relevantSyllabusFocusAreas = year9Syllabus.focusAreas.filter((focus) =>
    selectedFocusAreaIds.has(focus.id),
  );
  const allRelevantSyllabusCodes = relevantSyllabusFocusAreas.flatMap((focus) =>
    focus.groups.flatMap((group) =>
      group.contentPoints.map((point) => point.code),
    ),
  );

  function clearGeneratedPlan() {
    setPlan(null);
    setPlanSource(null);
    setSaveState("idle");
    setActiveSavedId(null);
  }

  function setSyllabusCodes(codes: string[]) {
    const nextCodes = [...new Set(codes)];
    setSelectedSyllabusCodes(nextCodes);
    setAlreadyMetSyllabusCodes((current) =>
      current.filter((code) => nextCodes.includes(code)),
    );
    clearGeneratedPlan();
    setError(null);
  }

  function setAlreadyMetCodes(codes: string[]) {
    const selectedCodeSet = new Set(selectedSyllabusCodes);
    setAlreadyMetSyllabusCodes(
      [...new Set(codes)].filter((code) => selectedCodeSet.has(code)),
    );
    clearGeneratedPlan();
    setError(null);
  }

  function handleCourseChange(slug: string) {
    setCourseSlug(slug);
    setUnitSlug("");
    setLessonSlug("");
    setSelectedSyllabusCodes([]);
    setAlreadyMetSyllabusCodes([]);
    setPlan(null);
    setPlanSource(null);
    setError(null);
  }

  function handleUnitChange(slug: string) {
    setUnitSlug(slug);
    setLessonSlug("");
    setSelectedSyllabusCodes([]);
    setAlreadyMetSyllabusCodes([]);
    setPlan(null);
    setPlanSource(null);
    setError(null);
  }

  function handleGenerate(forceRegenerate = false) {
    if (!courseSlug || !unitSlug || !lessonSlug) return;
    setError(null);

    startTransition(async () => {
      const result = await generateLessonPlanAction(
        courseSlug,
        unitSlug,
        lessonSlug,
        length,
        levels,
        deliveryMode,
        selectedSyllabusCodes,
        alreadyMetSyllabusCodes,
        { forceRegenerate },
      );
      if ("error" in result) {
        setError(result.error);
      } else {
        setPlan(result.plan);
        setPlanSource(result.source);
        setSaveState("idle");
        setActiveSavedId(null);
        // Scroll to plan
        setTimeout(() => {
          document.getElementById("lesson-plan-output")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    });
  }

  async function handleCopy() {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(planToText(plan));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available in some contexts
    }
  }

  async function handleSave() {
    if (!plan) return;
    setSaveState("saving");
    const result = await saveLessonPlanAction(
      courseSlug,
      unitSlug,
      lessonSlug,
      length,
      levels,
      deliveryMode,
      plan,
    );
    if ("error" in result) {
      setSaveState("error");
      return;
    }
    const summary: SavedPlanSummary = {
      id: result.id,
      title: plan.title,
      courseSlug,
      unitSlug,
      lessonSlug,
      lessonLength: length,
      studentLevels: levels,
      deliveryMode,
      syllabusOutcomeCodes:
        plan.syllabusScope?.outcomes.map((outcome) => outcome.code) ?? [],
      createdAt: new Date().toISOString(),
    };
    setSavedPlans((prev) => [summary, ...prev]);
    setActiveSavedId(result.id);
    setSaveState("saved");
  }

  async function handleLoadPlan(id: string) {
    const result = await loadSavedPlanAction(id);
    if ("error" in result) return;
    const { record } = result;
    setCourseSlug(record.courseSlug);
    setUnitSlug(record.unitSlug);
    setLessonSlug(record.lessonSlug);
    setLength(record.lessonLength as LessonLength);
    const loadedLevels = normaliseStudentLevels(record.studentLevels);
    setLevels(loadedLevels);
    setDeliveryMode(normaliseDeliveryMode(record.deliveryMode));
    setSelectedSyllabusCodes(selectedContentCodes(record.plan));
    setAlreadyMetSyllabusCodes(alreadyMetContentCodes(record.plan));
    setPlan({
      ...record.plan,
      level: primaryStudentLevel(loadedLevels),
      levels: loadedLevels,
      deliveryMode: normaliseDeliveryMode(record.plan.deliveryMode),
    });
    setPlanSource("saved");
    setActiveSavedId(record.id);
    setSaveState("saved");
    setError(null);
    setTimeout(() => {
      document.getElementById("lesson-plan-output")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  async function handleDeletePlan(id: string) {
    if (!window.confirm("Delete this saved plan?")) return;
    setDeletingId(id);
    const result = await deleteSavedPlanAction(id);
    setDeletingId(null);
    if ("error" in result) return;
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
    if (activeSavedId === id) setActiveSavedId(null);
  }

  const canGenerate =
    !!courseSlug && !!unitSlug && !!lessonSlug && levels.length > 0;

  // ── Select styles ──────────────────────────────────────────────────────────
  const selectCls =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50";

  return (
    <div className="space-y-8">
      {/* ── Form ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:hidden">
        <h2 className="mb-5 text-base font-bold text-slate-900">
          Configure lesson
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Course */}
          <div className="space-y-1.5 lg:col-span-3">
            <label htmlFor="lesson-maker-course" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Course
            </label>
            <select
              id="lesson-maker-course"
              className={selectCls}
              value={courseSlug}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="">Select a course…</option>
              {catalog.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="lesson-maker-unit" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Unit / Topic
            </label>
            <select
              id="lesson-maker-unit"
              className={selectCls}
              value={unitSlug}
              onChange={(e) => handleUnitChange(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">Select a unit…</option>
              {selectedCourse?.units.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.title}
                </option>
              ))}
            </select>
          </div>

          {/* Lesson */}
          <div className="space-y-1.5">
            <label htmlFor="lesson-maker-lesson" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson / Subtopic
            </label>
            <select
              id="lesson-maker-lesson"
              className={selectCls}
              value={lessonSlug}
              onChange={(e) => {
                setLessonSlug(e.target.value);
                setPlan(null);
                setPlanSource(null);
                setError(null);
              }}
              disabled={!selectedUnit}
            >
              <option value="">Select a lesson…</option>
              {selectedUnit?.lessons.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>

          {/* Official NESA syllabus scope */}
          {relevantSyllabusFocusAreas.length > 0 && (
            <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50 p-4 sm:col-span-2 lg:col-span-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                    Official NESA syllabus scope
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Year 9 sits within {year9Syllabus.stage} {year9Syllabus.structure}.
                    Choose the exact content this lesson must cover; you can select
                    all or only part of an outcome.
                  </p>
                  <a
                    href={year9Syllabus.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2"
                  >
                    View source on the NESA curriculum website ↗
                  </a>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setSyllabusCodes(allRelevantSyllabusCodes)}
                    className="rounded-lg border border-sky-300 bg-white px-3 py-1.5 text-xs font-semibold text-sky-800 hover:bg-sky-100"
                  >
                    Select all for unit
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyllabusCodes([])}
                    disabled={selectedSyllabusCodes.length === 0}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <p className="rounded-lg bg-white px-3 py-2 text-xs text-slate-600">
                {selectedSyllabusCodes.length > 0
                  ? `${selectedSyllabusCodes.length} content point${selectedSyllabusCodes.length === 1 ? "" : "s"} selected. The lesson goal, success criteria, examples and practice will be bound to this scope.`
                  : "No content points selected. The planner will use the lesson's existing authored scope."}
              </p>

              {selectedSyllabusCodes.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      Prior attainment
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-emerald-900">
                      {alreadyMetSyllabusCodes.length} of {selectedSyllabusCodes.length}{" "}
                      selected content points are already met. They will receive a
                      brief retrieval check or richer application, not first-teaching
                      again.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAlreadyMetCodes(selectedSyllabusCodes)}
                      disabled={
                        alreadyMetSyllabusCodes.length ===
                        selectedSyllabusCodes.length
                      }
                      className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-40"
                    >
                      Mark all selected as met
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlreadyMetCodes([])}
                      disabled={alreadyMetSyllabusCodes.length === 0}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                    >
                      Clear prior attainment
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {relevantSyllabusFocusAreas.map((focus) => {
                  const focusCodes = focus.groups.flatMap((group) =>
                    group.contentPoints.map((point) => point.code),
                  );
                  const selectedInFocus = focusCodes.filter((code) =>
                    selectedSyllabusCodes.includes(code),
                  ).length;
                  const selectedFocusCodes = focusCodes.filter((code) =>
                    selectedSyllabusCodes.includes(code),
                  );
                  const metInFocus = selectedFocusCodes.filter((code) =>
                    alreadyMetSyllabusCodes.includes(code),
                  ).length;
                  const allFocusSelected = selectedInFocus === focusCodes.length;
                  const allSelectedInFocusMet =
                    selectedFocusCodes.length > 0 &&
                    metInFocus === selectedFocusCodes.length;

                  return (
                    <details
                      key={focus.id}
                      className="rounded-xl border border-sky-200 bg-white open:ring-1 open:ring-sky-200"
                    >
                      <summary className="cursor-pointer list-none px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-slate-900">
                                {focus.title}
                              </span>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${focus.classification === "core" ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}>
                                {focus.classification}
                              </span>
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                {selectedInFocus}/{focusCodes.length} selected
                              </span>
                              {metInFocus > 0 && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                  {metInFocus}/{selectedInFocus} already met
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                              <strong>{focus.outcome.code}:</strong>{" "}
                              <MathText text={focus.outcome.description} />
                            </p>
                          </div>
                          <span aria-hidden="true" className="text-sky-700">⌄</span>
                        </div>
                      </summary>

                      <div className="border-t border-sky-100 px-4 py-4">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSyllabusCodes(
                                allFocusSelected
                                  ? selectedSyllabusCodes.filter(
                                      (code) => !focusCodes.includes(code),
                                    )
                                  : [...selectedSyllabusCodes, ...focusCodes],
                              )
                            }
                            className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 hover:bg-sky-100"
                          >
                            {allFocusSelected ? "Clear focus area" : "Select whole focus area"}
                          </button>
                          {selectedFocusCodes.length > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setAlreadyMetCodes(
                                  allSelectedInFocusMet
                                    ? alreadyMetSyllabusCodes.filter(
                                        (code) => !selectedFocusCodes.includes(code),
                                      )
                                    : [
                                        ...alreadyMetSyllabusCodes,
                                        ...selectedFocusCodes,
                                      ],
                                )
                              }
                              className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                            >
                              {allSelectedInFocusMet
                                ? "Clear already met in outcome"
                                : "Mark selected in outcome as met"}
                            </button>
                          )}
                          <a
                            href={focus.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg px-2 py-1.5 text-xs font-semibold text-sky-700 underline underline-offset-2"
                          >
                            Open this focus area on NESA ↗
                          </a>
                        </div>

                        <div className="space-y-4">
                          {focus.groups.map((group) => (
                            <fieldset key={group.id}>
                              <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                                {group.title}
                              </legend>
                              <div className="space-y-2">
                                {group.contentPoints.map((point) => {
                                  const checked = selectedSyllabusCodes.includes(point.code);
                                  return (
                                    <div
                                      key={point.code}
                                      className={`flex flex-wrap items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${checked ? "border-sky-400 bg-sky-50" : "border-slate-200 hover:bg-slate-50"}`}
                                    >
                                      <label className="flex min-w-0 flex-1 cursor-pointer gap-3">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={() =>
                                            setSyllabusCodes(
                                              checked
                                                ? selectedSyllabusCodes.filter(
                                                    (code) => code !== point.code,
                                                  )
                                                : [...selectedSyllabusCodes, point.code],
                                            )
                                          }
                                          className="mt-0.5 size-4 shrink-0 accent-sky-600"
                                        />
                                        <span className="leading-relaxed text-slate-700">
                                          <strong className="text-slate-900">{point.code}</strong>{" "}
                                          <MathText text={point.text} />
                                          {point.including && (
                                            <span className="mt-1 block text-xs text-slate-500">
                                              Including: <MathText text={point.including} />
                                            </span>
                                          )}
                                        </span>
                                      </label>
                                      {checked && (
                                        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-emerald-300 bg-white px-2 py-1 text-xs font-semibold text-emerald-800">
                                          <input
                                            type="checkbox"
                                            checked={alreadyMetSyllabusCodes.includes(
                                              point.code,
                                            )}
                                            onChange={(event) =>
                                              setAlreadyMetCodes(
                                                event.target.checked
                                                  ? [
                                                      ...alreadyMetSyllabusCodes,
                                                      point.code,
                                                    ]
                                                  : alreadyMetSyllabusCodes.filter(
                                                      (code) => code !== point.code,
                                                    ),
                                              )
                                            }
                                            className="size-4 accent-emerald-600"
                                          />
                                          Already met
                                        </label>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </fieldset>
                          ))}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>

              <p className="text-xs text-slate-600">
                {year9Syllabus.workingMathematically.code} ({year9Syllabus.workingMathematically.description})
                is embedded through reasoning, problem-solving and communication.
              </p>
            </div>
          )}

          {/* Delivery mode */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Delivery mode
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.entries(DELIVERY_MODE_DETAILS) as [
                LessonDeliveryMode,
                (typeof DELIVERY_MODE_DETAILS)[LessonDeliveryMode],
              ][]).map(([value, details]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setDeliveryMode(value);
                    if (value === "zoom" && levels.length > 1) {
                      setLevels([primaryStudentLevel(levels)]);
                    }
                    clearGeneratedPlan();
                  }}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    deliveryMode === value
                      ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                      : "border-slate-300 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm font-semibold text-slate-900">
                    {details.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                    {details.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lesson length */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson length
            </label>
            <div className="flex gap-2">
              {([10, 30, 45, 60] as LessonLength[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  title={
                    l === 10
                      ? "Quick catch-up recap of a previously taught topic"
                      : undefined
                  }
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                    length === l
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {l === 10 ? "10 min recap" : `${l} min`}
                </button>
              ))}
            </div>
          </div>

          {/* Learner levels */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              {deliveryMode === "classroom"
                ? "Class levels — select one or more"
                : "Student level"}
            </label>
            {deliveryMode === "classroom" && (
              <p className="text-xs text-slate-500">
                Each selected group receives its own scaffolding and independent
                practice while working toward the same outcome.
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              {(Object.entries(STUDENT_LEVEL_DETAILS) as [
                StudentLevel,
                (typeof STUDENT_LEVEL_DETAILS)[StudentLevel],
              ][]).map(([value, details]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={levels.includes(value)}
                  onClick={() => {
                    if (deliveryMode === "zoom") {
                      setLevels([value]);
                    } else if (levels.includes(value) && levels.length > 1) {
                      setLevels(levels.filter((level) => level !== value));
                    } else if (!levels.includes(value)) {
                      setLevels(
                        STUDENT_LEVEL_ORDER.filter(
                          (level) => level === value || levels.includes(level),
                        ),
                      );
                    }
                    clearGeneratedPlan();
                  }}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                    levels.includes(value)
                      ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                      : "border-slate-300 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span
                      aria-hidden="true"
                      className={`flex size-4 items-center justify-center rounded border text-[10px] ${
                        levels.includes(value)
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-400 bg-white text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    {details.label}
                  </span>
                  <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-500">
                    {details.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          {isPending && (
            <p className="text-xs text-slate-500">
              First generation for a topic is written by Claude and can take a
              minute or two. It&apos;s saved as the default afterwards.
            </p>
          )}
          <button
            type="button"
            disabled={!canGenerate || isPending}
            onClick={() => handleGenerate()}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Generating…" : "Generate lesson plan →"}
          </button>
        </div>
      </div>

      {/* ── Saved plans ── */}
      {savedPlans.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:hidden">
          <h2 className="mb-4 text-base font-bold text-slate-900">
            Saved plans
          </h2>
          <div className="space-y-2">
            {savedPlans.map((saved) => (
              <div
                key={saved.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
                  activeSavedId === saved.id
                    ? "border-indigo-200 bg-indigo-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {saved.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {saved.courseSlug} / {saved.unitSlug} ·{" "}
                    {saved.lessonLength} min ·{" "}
                    {DELIVERY_MODE_DETAILS[normaliseDeliveryMode(saved.deliveryMode)].label} ·{" "}
                    {studentLevelsLabel(saved.studentLevels)} ·{" "}
                    {new Date(saved.createdAt).toLocaleDateString("en-AU")}
                  </p>
                  {saved.syllabusOutcomeCodes.length > 0 && (
                    <p className="mt-1 text-xs font-semibold text-sky-700">
                      NESA: {saved.syllabusOutcomeCodes.join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => void handleLoadPlan(saved.id)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeletePlan(saved.id)}
                    disabled={deletingId === saved.id}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === saved.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Generated plan ── */}
      {plan && (
        <div id="lesson-plan-output" className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between print:hidden">
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-500">
                {plan.sections.length} sections •{" "}
                {plan.length} min total
              </p>
              {planSource === "ai" && (
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                  ✦ Freshly generated{plan.model ? ` (${plan.model})` : ""} —
                  saved as topic default
                </span>
              )}
              {planSource === "cache" && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  ⚡ Topic default (cached — no tokens used)
                </span>
              )}
              {planSource === "built-in" && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Built-in template (no ANTHROPIC_API_KEY set)
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(planSource === "cache" || planSource === "ai") && (
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Regenerate with Claude? This spends tokens and overwrites the cached default for this topic.",
                      )
                    ) {
                      handleGenerate(true);
                    }
                  }}
                  disabled={isPending}
                  className="rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-50"
                >
                  {isPending ? "Regenerating…" : "↻ Regenerate (uses tokens)"}
                </button>
              )}
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saveState === "saving" || saveState === "saved"}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  saveState === "saved"
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                    : saveState === "error"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {saveState === "saving"
                  ? "Saving…"
                  : saveState === "saved"
                    ? "Saved ✓"
                    : saveState === "error"
                      ? "Save failed"
                      : "Save plan"}
              </button>
              <a
                href={buildWorksheetUrl(courseSlug, unitSlug, plan.title, lessonSlug)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
                title="Pre-filled from this lesson"
              >
                Create worksheet
              </a>
              <button
                type="button"
                onClick={() => void handleCopy()}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copied ? "Copied!" : "Copy as text"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* Plan header */}
          <PlanHeader plan={plan} />

          {/* Sections */}
          <div className="space-y-4 print:space-y-6">
            {plan.sections.map((section, i) => (
              <SectionCard
                key={section.id}
                section={section}
                index={i}
                deliveryMode={normaliseDeliveryMode(plan.deliveryMode)}
              />
            ))}
          </div>

          {/* Bottom toolbar */}
          <div className="flex flex-wrap justify-end gap-2 pt-2 print:hidden">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saveState === "saving" || saveState === "saved"}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                saveState === "saved"
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : saveState === "error"
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {saveState === "saving"
                ? "Saving…"
                : saveState === "saved"
                  ? "Saved ✓"
                  : saveState === "error"
                    ? "Save failed"
                    : "Save plan"}
            </button>
            <a
              href={buildWorksheetUrl(courseSlug, unitSlug, plan.title, lessonSlug)}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              title="Pre-filled from this lesson"
            >
              Create worksheet
            </a>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy as text"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
