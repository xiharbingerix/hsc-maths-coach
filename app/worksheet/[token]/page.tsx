import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { pickDiagramFields, type Choice } from "../../../lib/lessons/diagramRegistry";
import { WorksheetClient } from "./WorksheetClient";

export const metadata: Metadata = {
  title: "Worksheet | Nova Maths",
  robots: { index: false },
};

// Exported so WorksheetClient can import the type without re-defining it.
export type WorksheetQuestion = {
  id: string;
  position: number;
  prompt: string;
  latex: string | null;
  choices: Choice[] | null;
  parts: WorksheetQuestionPart[] | null;
  diagramData: Record<string, unknown> | null;
};

export type WorksheetQuestionPart = {
  key: string;
  label: string;
  prompt: string;
  latex: string | null;
  marks: number;
};

function normaliseForLeakCheck(value: string) {
  return value
    .toLowerCase()
    .replace(/\\left|\\right/g, "")
    .replace(/\\,/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function expandLatexFractions(value: string) {
  let current = value;
  const fractionPattern = /\\(?:d?frac)\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g;

  while (fractionPattern.test(current)) {
    current = current.replace(fractionPattern, "($1)/($2)");
  }

  return current;
}

function leakCheckForms(value: string) {
  const base = normaliseForLeakCheck(value);
  const expanded = normaliseForLeakCheck(expandLatexFractions(value));
  const withoutCommands = expanded
    .replace(/\\[a-z]+/g, "")
    .replace(/[{}]/g, "");
  const compact = withoutCommands.replace(/[^a-z0-9]/g, "");

  return [...new Set([base, expanded, withoutCommands, compact])].filter(Boolean);
}

function shouldStripLatex(latex: string | null, candidates: string[]) {
  if (!latex) return false;

  const latexForms = leakCheckForms(latex);
  if (latexForms.length === 0) return false;

  // Explicit answer/solution cue words.
  if (/(answer|solution|therefore|hence)/i.test(latex)) {
    return true;
  }

  // If the expression after the last "=" is purely numeric/arithmetic
  // (only digits, /, -, +, ., *, ^, parentheses — no letters or variable names),
  // the latex is showing a worked result, not a question-setup formula.
  //
  // This catches P(A) = 17/20, P(not A) = 1 − 1/5, σ² = 14.2, etc.
  // It does NOT strip formulas like f(x) = 2x − 3 (has "x") or P(A) = P(B)+P(C) (has letters).
  const expandedNorm = leakCheckForms(latex)[1] ?? leakCheckForms(latex)[0];
  if (expandedNorm.includes("=")) {
    const afterLastEquals = expandedNorm.split("=").pop() ?? "";
    if (
      afterLastEquals.trim().length > 0 &&
      /^[\s\d/\-.+()^*]*$/.test(afterLastEquals)
    ) {
      return true;
    }
  }

  for (const candidate of candidates) {
    const trimmed = candidate.trim();
    if (!trimmed) continue;

    const candidateForms = leakCheckForms(trimmed);
    for (const form of candidateForms) {
      const compactLength = form.replace(/[^a-z0-9]/g, "").length;
      const fractionLike = form.includes("/") || /\\(?:d?frac)/.test(trimmed);

      // Very short values (e.g. "1") produce too many false positives.
      if (!fractionLike && form.length < 3) continue;
      if (fractionLike && compactLength < 2) continue;

      if (latexForms.some((latexForm) => latexForm.includes(form))) {
        return true;
      }
    }
  }

  return false;
}

function safeChoices(value: unknown): Choice[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  return value.map((item: unknown) => {
    const obj = item as Record<string, unknown>;
    return {
      label: String(obj?.label ?? ""),
      text: String(obj?.text ?? ""),
      ...pickDiagramFields(obj),
    };
  });
}

function safeParts(value: unknown): WorksheetQuestionPart[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  return value
    .map((item: unknown) => {
      const obj = item as Record<string, unknown>;
      const key = String(obj?.key ?? "").trim();
      const prompt = String(obj?.prompt ?? "").trim();
      if (!key || !prompt) return null;
      const answer = typeof obj?.answer === "string" ? obj.answer : "";
      const acceptedAnswers = Array.isArray(obj?.acceptedAnswers)
        ? obj.acceptedAnswers
        : Array.isArray(obj?.accepted_answers)
        ? obj.accepted_answers
        : [];
      const rawLatex = typeof obj?.latex === "string" ? obj.latex : null;
      return {
        key,
        label: String(obj?.label ?? `(${key})`),
        prompt,
        latex: shouldStripLatex(rawLatex, [answer, ...acceptedAnswers.map(String)])
          ? null
          : rawLatex,
        marks: typeof obj?.marks === "number" ? obj.marks : 1,
      };
    })
    .filter((part): part is WorksheetQuestionPart => part !== null);
}

function UnavailablePage({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths
        </p>
        <h1 className="mt-3 text-2xl font-bold">Worksheet unavailable</h1>
        <p className="mt-3 leading-7 text-slate-600">{message}</p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Back to Nova Maths
        </Link>
      </div>
    </main>
  );
}

export default async function WorksheetPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams?: Promise<{ adminPreview?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;
  const adminPreview =
    query?.adminPreview === "1" || query?.adminPreview === "true";

  // 1. Load worksheet by share token
  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .select("id, title, year_level, expires_at, assigned_student_name, due_at")
    .eq("share_token", token)
    .maybeSingle();

  if (wsError || !worksheet) {
    return (
      <UnavailablePage message="This worksheet link is not valid. Check the URL and try again, or ask your tutor for a new link." />
    );
  }

  if (worksheet.expires_at && new Date(worksheet.expires_at) < new Date()) {
    return (
      <UnavailablePage message="This worksheet link has expired. Ask your tutor for a new link." />
    );
  }

  // 2. Load ordered question positions for this worksheet
  const { data: wqRows, error: wqError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id, position")
    .eq("worksheet_id", worksheet.id)
    .order("position");

  if (wqError || !wqRows || wqRows.length === 0) {
    return (
      <UnavailablePage message="This worksheet has no questions yet. Ask your tutor to check the setup." />
    );
  }

  // 3. Load question content — answer/accepted_answers excluded here to avoid exposure
  const questionIds: string[] = wqRows.map(
    (r: { question_id: string }) => r.question_id
  );
  const { data: qRows, error: qError } = await supabaseAdmin
    .from("questions")
    .select(
      "id, prompt, latex, choices, question_parts, answer, accepted_answers, diagram_data"
    )
    .in("id", questionIds);

  if (qError || !qRows) {
    return (
      <UnavailablePage message="Could not load worksheet questions. Please try again." />
    );
  }

  // 4. Join and sort by worksheet position
  type RawQuestion = {
    id: string;
    prompt: string;
    latex: string | null;
    choices: unknown;
    question_parts: unknown;
    answer: string;
    accepted_answers: string[];
    diagram_data: Record<string, unknown> | null;
  };

  const qById = new Map<string, RawQuestion>(
    qRows.map((q: RawQuestion) => [q.id, q])
  );

  const questions: WorksheetQuestion[] = (
    wqRows as Array<{ question_id: string; position: number }>
  )
    .map((wq) => {
      const q = qById.get(wq.question_id);
      if (!q) return null;
      return {
        id: q.id,
        position: wq.position,
        prompt: q.prompt,
        latex: shouldStripLatex(q.latex, [q.answer, ...(q.accepted_answers ?? [])])
          ? null
          : q.latex,
        choices: safeChoices(q.choices),
        parts: safeParts(q.question_parts),
        diagramData: q.diagram_data ?? null,
      };
    })
    .filter((q): q is WorksheetQuestion => q !== null);

  return (
    <WorksheetClient
      token={token}
      title={worksheet.title}
      yearLevel={worksheet.year_level}
      adminPreview={adminPreview}
      assignedStudentName={worksheet.assigned_student_name}
      dueAt={worksheet.due_at}
      questions={questions}
    />
  );
}
