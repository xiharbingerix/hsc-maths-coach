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
      return {
        key,
        label: String(obj?.label ?? `(${key})`),
        prompt,
        // Worksheets show only the prompt — the per-part LaTeX setup block is
        // redundant with the prompt's inline math and a known answer-leak vector.
        latex: null as string | null,
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
        // Worksheets show only the prompt — the per-question LaTeX setup block is
        // redundant with the prompt's inline math and a known answer-leak vector.
        latex: null as string | null,
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
