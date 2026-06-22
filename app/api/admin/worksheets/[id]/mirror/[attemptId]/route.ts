import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === getAdminToken();
  } catch {
    return false;
  }
}

type Choice = { label: string; text: string } & Record<string, unknown>;
type Part = {
  key: string;
  label: string;
  prompt: string;
  latex: string | null;
  marks: number;
};

function normaliseChoices(value: unknown): Choice[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  return value.map((item) => {
    const obj = (item ?? {}) as Record<string, unknown>;
    return { ...obj, label: String(obj.label ?? ""), text: String(obj.text ?? "") };
  });
}

function normaliseParts(value: unknown): Part[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const parts: Part[] = [];
  for (const item of value) {
    const obj = (item ?? {}) as Record<string, unknown>;
    const key = String(obj.key ?? "").trim();
    const prompt = String(obj.prompt ?? "").trim();
    if (!key || !prompt) continue;
    parts.push({
      key,
      label: String(obj.label ?? `(${key})`),
      prompt,
      latex: typeof obj.latex === "string" ? obj.latex : null,
      marks: typeof obj.marks === "number" ? obj.marks : 1,
    });
  }
  return parts.length > 0 ? parts : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; attemptId: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id, attemptId } = await params;
  if (!id || !attemptId) {
    return NextResponse.json(
      { error: "Worksheet id and attempt id are required." },
      { status: 400 }
    );
  }

  const { data: attempt, error: attemptError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select(
      "id, worksheet_id, student_name, started_at, completed_at, last_seen_at, live_question_id, live_question_index, live_phase, live_draft"
    )
    .eq("id", attemptId)
    .eq("worksheet_id", id)
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  const { count: totalQuestions } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id", { count: "exact", head: true })
    .eq("worksheet_id", id);

  const lastSeenAt =
    typeof attempt.last_seen_at === "string" ? attempt.last_seen_at : null;
  const idleSeconds = lastSeenAt
    ? Math.max(0, Math.round((Date.now() - Date.parse(lastSeenAt)) / 1000))
    : null;

  // The teacher is trusted to see answers, so the live question is returned in full.
  let question: {
    id: string;
    prompt: string;
    latex: string | null;
    choices: Choice[] | null;
    parts: Part[] | null;
    diagramData: Record<string, unknown> | null;
    answer: string | null;
  } | null = null;

  const liveQuestionId =
    typeof attempt.live_question_id === "string" ? attempt.live_question_id : null;

  if (liveQuestionId) {
    const { data: q } = await supabaseAdmin
      .from("questions")
      .select("id, prompt, latex, choices, question_parts, diagram_data, answer")
      .eq("id", liveQuestionId)
      .maybeSingle();

    if (q) {
      question = {
        id: q.id,
        prompt: String(q.prompt ?? ""),
        latex: typeof q.latex === "string" ? q.latex : null,
        choices: normaliseChoices(q.choices),
        parts: normaliseParts(q.question_parts),
        diagramData: (q.diagram_data as Record<string, unknown> | null) ?? null,
        answer: typeof q.answer === "string" ? q.answer : null,
      };
    }
  }

  // If they've already submitted this question, surface the saved result too.
  let submitted: {
    studentAnswer: string | null;
    isCorrect: boolean | null;
  } | null = null;

  if (liveQuestionId) {
    const { data: answerRow } = await supabaseAdmin
      .from("worksheet_answers")
      .select("student_answer, is_correct")
      .eq("attempt_id", attemptId)
      .eq("question_id", liveQuestionId)
      .maybeSingle();
    if (answerRow) {
      submitted = {
        studentAnswer: answerRow.student_answer ?? null,
        isCorrect: answerRow.is_correct ?? null,
      };
    }
  }

  const draft =
    attempt.live_draft && typeof attempt.live_draft === "object"
      ? (attempt.live_draft as {
          typed?: string;
          choice?: string;
          parts?: Record<string, string>;
        })
      : null;

  return NextResponse.json({
    attemptId: attempt.id,
    studentName: attempt.student_name?.trim() || "Anonymous student",
    startedAt: attempt.started_at,
    completedAt: attempt.completed_at,
    lastSeenAt,
    idleSeconds,
    phase: attempt.live_phase ?? null,
    questionIndex:
      typeof attempt.live_question_index === "number"
        ? attempt.live_question_index
        : null,
    totalQuestions: totalQuestions ?? null,
    question,
    draft: draft
      ? {
          typed: typeof draft.typed === "string" ? draft.typed : "",
          choice: typeof draft.choice === "string" ? draft.choice : "",
          parts:
            draft.parts && typeof draft.parts === "object" ? draft.parts : {},
        }
      : null,
    submitted,
    updatedAt: new Date().toISOString(),
  });
}
