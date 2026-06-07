import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type CompleteBody = {
  attemptId?: string;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: CompleteBody;
  try {
    body = (await request.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { attemptId } = body;

  if (!attemptId) {
    return NextResponse.json({ error: "attemptId is required." }, { status: 400 });
  }

  // 1. Validate attempt belongs to this token
  const { data: attempt, error: attemptError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id, completed_at, score_correct, score_total")
    .eq("id", attemptId)
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  // Confirm the attempt's worksheet matches the token in the URL
  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .select("id, expires_at")
    .eq("id", attempt.worksheet_id)
    .eq("share_token", token)
    .maybeSingle();

  if (wsError || !worksheet) {
    return NextResponse.json(
      { error: "Attempt does not match this worksheet." },
      { status: 403 }
    );
  }

  if (worksheet.expires_at && new Date(worksheet.expires_at) < new Date()) {
    return NextResponse.json(
      { error: "This worksheet link has expired." },
      { status: 410 }
    );
  }

  // 2. Idempotent — if already completed, return the saved score
  if (attempt.completed_at) {
    return NextResponse.json({
      scoreCorrect: attempt.score_correct ?? 0,
      scoreTotal: attempt.score_total ?? 0,
    });
  }

  // 3. Score against the worksheet question count, not just submitted rows.
  const { data: worksheetQuestions, error: questionCountError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id")
    .eq("worksheet_id", attempt.worksheet_id);

  if (questionCountError || !worksheetQuestions) {
    console.error("[worksheet/complete] worksheet question count failed", {
      attemptId,
      message: questionCountError?.message,
    });
    return NextResponse.json(
      { error: "Could not complete worksheet. Please try again." },
      { status: 500 }
    );
  }

  const scoreTotal = worksheetQuestions.length;
  const expectedQuestionIds = new Set(
    worksheetQuestions.map((row: { question_id: string }) => row.question_id)
  );

  const { data: answers, error: countError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("question_id, is_correct, answered_at")
    .eq("attempt_id", attemptId)
    .eq("worksheet_id", attempt.worksheet_id)
    .order("answered_at", { ascending: false });

  if (countError) {
    console.error("[worksheet/complete] count failed", {
      attemptId,
      message: countError.message,
    });
    return NextResponse.json(
      { error: "Could not count answers. Please try again." },
      { status: 500 }
    );
  }

  const latestAnswersByQuestion = new Map<string, boolean>();
  for (const answer of answers ?? []) {
    const row = answer as { question_id: string; is_correct: boolean | null };
    if (!expectedQuestionIds.has(row.question_id)) continue;
    if (!latestAnswersByQuestion.has(row.question_id)) {
      latestAnswersByQuestion.set(row.question_id, row.is_correct === true);
    }
  }

  if (latestAnswersByQuestion.size < scoreTotal) {
    return NextResponse.json(
      { error: "Please answer every question before finishing the worksheet." },
      { status: 409 }
    );
  }

  const scoreCorrect = [...latestAnswersByQuestion.values()].filter(Boolean).length;

  // 4. Mark the attempt as completed
  const { error: updateError } = await supabaseAdmin
    .from("worksheet_attempts")
    .update({
      completed_at: new Date().toISOString(),
      score_correct: scoreCorrect,
      score_total: scoreTotal,
    })
    .eq("id", attemptId);

  if (updateError) {
    console.error("[worksheet/complete] update failed", {
      attemptId,
      message: updateError.message,
    });
    return NextResponse.json(
      { error: "Could not complete worksheet. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ scoreCorrect, scoreTotal });
}
