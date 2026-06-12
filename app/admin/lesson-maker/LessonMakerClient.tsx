"use client";

import { useState, useTransition } from "react";
import { BlockMath } from "react-katex";
import { MathText } from "../../components/MathText";
import { generateLessonPlanAction } from "./actions";
import type { CatalogCourse } from "./page";
import type {
  TutorLessonPlan,
  TutorSection,
  TutorQuestion,
  LessonLength,
  StudentLevel,
} from "../../../lib/lessonMaker";

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  catalog: CatalogCourse[];
}

// ── Plan-to-text serialiser (for clipboard) ──────────────────────────────────

function planToText(plan: TutorLessonPlan): string {
  const lines: string[] = [];
  lines.push(`TUTOR LESSON PLAN — ${plan.title}`);
  lines.push(`Course: ${plan.course}`);
  lines.push(`Unit: ${plan.unit}`);
  lines.push(
    `Duration: ${plan.length} min | Level: ${plan.level} | Generated: ${new Date(plan.generatedAt).toLocaleDateString("en-AU")}`
  );
  lines.push(`Learning goal: ${plan.learningGoal}`);
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
    }
    lines.push("");
  });

  return lines.join("\n");
}

// ── Question renderer ────────────────────────────────────────────────────────

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

          {/* Answer */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              Answer: <MathText text={question.answer} />
            </span>
          </div>

          {/* Hint */}
          {question.hint && (
            <p className="text-xs text-slate-500">
              <span className="font-semibold">Hint: </span>
              <MathText text={question.hint} />
            </p>
          )}

          {/* Explanation */}
          {question.explanation && (
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Explanation: </span>
              <MathText text={question.explanation} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section renderer ─────────────────────────────────────────────────────────

function SectionCard({
  section,
  index,
}: {
  section: TutorSection;
  index: number;
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
          <div className="space-y-3">
            {section.questions.map((q, i) => (
              <QuestionCard key={q.id} question={q} number={i + 1} />
            ))}
          </div>
        )}

        {section.kind === "worked-example" && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              {section.example.title}
            </p>
            <div className="overflow-x-auto rounded-xl bg-slate-50 px-4 py-3">
              <BlockMath math={section.example.questionLatex} />
            </div>
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
      </div>
    </div>
  );
}

// ── Plan header ──────────────────────────────────────────────────────────────

function PlanHeader({ plan }: { plan: TutorLessonPlan }) {
  const levelLabels: Record<StudentLevel, string> = {
    struggling: "Struggling / support",
    "on-level": "On-level",
    extension: "Extension",
  };

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 print:rounded-none print:border-0 print:bg-white print:px-0 print:pt-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 print:text-slate-400">
        Nova Maths — Tutor Lesson Plan
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
          {plan.length} min
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm print:border print:border-slate-300 print:shadow-none">
          {levelLabels[plan.level]}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-indigo-800 print:text-slate-700">
        {plan.learningGoal}
      </p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function LessonMakerClient({ catalog }: Props) {
  const [courseSlug, setCourseSlug] = useState("");
  const [unitSlug, setUnitSlug] = useState("");
  const [lessonSlug, setLessonSlug] = useState("");
  const [length, setLength] = useState<LessonLength>(45);
  const [level, setLevel] = useState<StudentLevel>("on-level");
  const [plan, setPlan] = useState<TutorLessonPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Derived cascade data
  const selectedCourse = catalog.find((c) => c.slug === courseSlug) ?? null;
  const selectedUnit =
    selectedCourse?.units.find((u) => u.slug === unitSlug) ?? null;

  function handleCourseChange(slug: string) {
    setCourseSlug(slug);
    setUnitSlug("");
    setLessonSlug("");
    setPlan(null);
    setError(null);
  }

  function handleUnitChange(slug: string) {
    setUnitSlug(slug);
    setLessonSlug("");
    setPlan(null);
    setError(null);
  }

  function handleGenerate() {
    if (!courseSlug || !unitSlug || !lessonSlug) return;
    setError(null);

    startTransition(async () => {
      const result = await generateLessonPlanAction(
        courseSlug,
        unitSlug,
        lessonSlug,
        length,
        level,
      );
      if ("error" in result) {
        setError(result.error);
      } else {
        setPlan(result.plan);
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

  const canGenerate = !!courseSlug && !!unitSlug && !!lessonSlug;

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
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Course
            </label>
            <select
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
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Unit / Topic
            </label>
            <select
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
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson / Subtopic
            </label>
            <select
              className={selectCls}
              value={lessonSlug}
              onChange={(e) => {
                setLessonSlug(e.target.value);
                setPlan(null);
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

          {/* Lesson length */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson length
            </label>
            <div className="flex gap-2">
              {([30, 45, 60] as LessonLength[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                    length === l
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {l} min
                </button>
              ))}
            </div>
          </div>

          {/* Student level */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Student level
            </label>
            <div className="flex gap-2">
              {(
                [
                  ["struggling", "Struggling"],
                  ["on-level", "On-level"],
                  ["extension", "Extension"],
                ] as [StudentLevel, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setLevel(val)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                    level === val
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {label}
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

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={!canGenerate || isPending}
            onClick={handleGenerate}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Generating…" : "Generate lesson plan →"}
          </button>
        </div>
      </div>

      {/* ── Generated plan ── */}
      {plan && (
        <div id="lesson-plan-output" className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between print:hidden">
            <p className="text-sm text-slate-500">
              {plan.sections.length} sections •{" "}
              {plan.sections.reduce((t, s) => t + s.minutes, 0)} min total
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
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
              <SectionCard key={section.id} section={section} index={i} />
            ))}
          </div>

          {/* Bottom toolbar */}
          <div className="flex justify-end gap-2 pt-2 print:hidden">
            <button
              type="button"
              onClick={handleCopy}
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
