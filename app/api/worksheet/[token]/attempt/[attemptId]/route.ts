import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string; attemptId: string }> }
) {
  const { token, attemptId } = await params;

  if (!token || !attemptId) {
    return NextResponse.json({ error: "Invalid worksheet attempt." }, { status: 400 });
  }

  const { data: attempt, error: attemptError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id, student_name, completed_at, score_correct, score_total")
    .eq("id", attemptId)
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  const { data: worksheet, error: worksheetError } = await supabaseAdmin
    .from("worksheets")
    .select("id, expires_at")
    .eq("id", attempt.worksheet_id)
    .eq("share_token", token)
    .maybeSingle();

  if (worksheetError || !worksheet) {
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

  const { data: answers, error: answersError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("question_id, is_correct, answered_at")
    .eq("attempt_id", attemptId)
    .eq("worksheet_id", attempt.worksheet_id)
    .order("answered_at", { ascending: false });

  if (answersError) {
    console.error("[worksheet/attempt] answers query failed", {
      attemptId,
      message: answersError.message,
    });
    return NextResponse.json(
      { error: "Could not load worksheet attempt." },
      { status: 500 }
    );
  }

  const latestByQuestion = new Map<string, boolean>();
  for (const answer of answers ?? []) {
    const row = answer as { question_id: string; is_correct: boolean | null };
    if (!latestByQuestion.has(row.question_id)) {
      latestByQuestion.set(row.question_id, row.is_correct === true);
    }
  }

  return NextResponse.json({
    attemptId: attempt.id,
    studentName: attempt.student_name ?? null,
    completedAt: attempt.completed_at ?? null,
    scoreCorrect: attempt.score_correct ?? null,
    scoreTotal: attempt.score_total ?? null,
    answeredQuestions: [...latestByQuestion.entries()].map(
      ([questionId, isCorrect]) => ({ questionId, isCorrect })
    ),
  });
}

