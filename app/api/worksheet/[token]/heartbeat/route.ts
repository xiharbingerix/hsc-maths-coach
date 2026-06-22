import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type DraftInput = {
  typed?: unknown;
  choice?: unknown;
  parts?: unknown;
};

type HeartbeatBody = {
  attemptId?: string;
  questionId?: string;
  questionIndex?: number;
  phase?: string;
  draft?: DraftInput;
};

function normalisePhase(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return null;
  return trimmed.slice(0, 40);
}

// Cap a single field so a runaway client can't store unbounded text.
const MAX_FIELD_LEN = 2000;

function clampString(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_FIELD_LEN) : "";
}

// Build a small, sanitised snapshot of the student's in-progress answer so the
// teacher can mirror exactly what they're typing before they submit.
function normaliseDraft(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const input = value as DraftInput;

  const typed = clampString(input.typed);
  const choice = clampString(input.choice);

  const parts: Record<string, string> = {};
  if (input.parts && typeof input.parts === "object") {
    let count = 0;
    for (const [key, partValue] of Object.entries(input.parts as Record<string, unknown>)) {
      if (count >= 26) break; // (a)..(z) is plenty for any worksheet question
      const safeKey = String(key).slice(0, 16);
      parts[safeKey] = clampString(partValue);
      count += 1;
    }
  }

  if (!typed && !choice && Object.keys(parts).length === 0) return null;
  return { typed, choice, parts };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: HeartbeatBody;
  try {
    body = (await request.json()) as HeartbeatBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const attemptId = typeof body.attemptId === "string" ? body.attemptId : "";
  if (!token || !attemptId) {
    return NextResponse.json(
      { error: "token and attemptId are required." },
      { status: 400 }
    );
  }

  const { data: attempt } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id")
    .eq("id", attemptId)
    .maybeSingle();

  if (!attempt) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  const { data: worksheet } = await supabaseAdmin
    .from("worksheets")
    .select("id")
    .eq("id", attempt.worksheet_id)
    .eq("share_token", token)
    .maybeSingle();

  if (!worksheet) {
    return NextResponse.json(
      { error: "Attempt does not match this worksheet." },
      { status: 403 }
    );
  }

  let liveQuestionId: string | null = null;
  if (typeof body.questionId === "string" && body.questionId.trim()) {
    const trimmedQuestionId = body.questionId.trim();
    const { data: linkedQuestion } = await supabaseAdmin
      .from("worksheet_questions")
      .select("id")
      .eq("worksheet_id", attempt.worksheet_id)
      .eq("question_id", trimmedQuestionId)
      .maybeSingle();
    if (linkedQuestion) {
      liveQuestionId = trimmedQuestionId;
    }
  }

  const index = Number(body.questionIndex);
  const liveQuestionIndex = Number.isInteger(index) && index > 0 ? index : null;

  const payload = {
    last_seen_at: new Date().toISOString(),
    live_question_id: liveQuestionId,
    live_question_index: liveQuestionIndex,
    live_phase: normalisePhase(body.phase),
    live_draft: normaliseDraft(body.draft),
  };

  const { error } = await supabaseAdmin
    .from("worksheet_attempts")
    .update(payload)
    .eq("id", attemptId);

  if (error) {
    // If migration has not been applied yet, fail soft so student flow is unaffected.
    return NextResponse.json({ ok: false, warning: "Live tracking unavailable." });
  }

  return NextResponse.json({ ok: true });
}
