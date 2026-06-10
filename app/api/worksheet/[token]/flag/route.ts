import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type FlagBody = {
  attemptId?: string;
  questionId?: string;
  reason?: string;
  comment?: string;
  studentAnswer?: string;
  markedCorrect?: boolean;
};

const VALID_REASONS = new Set([
  "wrong-answer",
  "confusing-question",
  "typo-or-error",
  "diagram-issue",
  "other",
]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: FlagBody;
  try {
    body = (await request.json()) as FlagBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { attemptId, questionId, reason, comment, studentAnswer, markedCorrect } =
    body;

  if (!attemptId || !questionId || !reason) {
    return NextResponse.json(
      { error: "attemptId, questionId and reason are required." },
      { status: 400 }
    );
  }

  if (!VALID_REASONS.has(reason)) {
    return NextResponse.json({ error: "Invalid reason." }, { status: 400 });
  }

  // Validate attempt exists and belongs to this token
  const { data: attempt } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id, user_id")
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
    return NextResponse.json({ error: "Invalid worksheet token." }, { status: 403 });
  }

  // Confirm the question belongs to this worksheet
  const { data: wq } = await supabaseAdmin
    .from("worksheet_questions")
    .select("id")
    .eq("worksheet_id", attempt.worksheet_id)
    .eq("question_id", questionId)
    .maybeSingle();

  if (!wq) {
    return NextResponse.json(
      { error: "Question does not belong to this worksheet." },
      { status: 403 }
    );
  }

  // Fetch question data server-side — expected answer never comes from the client
  const { data: question } = await supabaseAdmin
    .from("questions")
    .select("source_id, prompt, answer")
    .eq("id", questionId)
    .maybeSingle();

  const { error: insertError } = await supabaseAdmin
    .from("question_flags")
    .insert({
      question_id: questionId,
      source_id: question?.source_id ?? null,
      worksheet_token: token,
      attempt_id: attemptId,
      prompt_snapshot: question?.prompt ?? null,
      expected_answer_snapshot: question?.answer ?? null,
      student_answer:
        typeof studentAnswer === "string" ? studentAnswer.trim() || null : null,
      marked_correct:
        typeof markedCorrect === "boolean" ? markedCorrect : null,
      reason,
      comment:
        typeof comment === "string" && comment.trim() ? comment.trim() : null,
      user_id: attempt.user_id ?? null,
      status: "open",
    });

  if (insertError) {
    console.error("[question-flag] insert failed", {
      message: insertError.message,
    });
    return NextResponse.json(
      { error: "Could not save flag. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
