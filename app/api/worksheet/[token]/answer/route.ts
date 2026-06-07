import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { markTypedAnswer } from "../../../../../lib/answerMarking";

export const runtime = "nodejs";

type AnswerBody = {
  attemptId?: string;
  questionId?: string;
  answer?: string;
  timeSpentSecs?: number;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: AnswerBody;
  try {
    body = (await request.json()) as AnswerBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { attemptId, questionId, answer, timeSpentSecs } = body;

  if (!attemptId || !questionId || typeof answer !== "string") {
    return NextResponse.json(
      { error: "attemptId, questionId and answer are required." },
      { status: 400 }
    );
  }

  const trimmedAnswer = answer.trim();
  if (!trimmedAnswer) {
    return NextResponse.json({ error: "Answer cannot be empty." }, { status: 400 });
  }

  // 1. Validate attempt belongs to this token
  const { data: attempt, error: attemptError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id, completed_at")
    .eq("id", attemptId)
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json(
      { error: "Attempt not found." },
      { status: 404 }
    );
  }

  if (attempt.completed_at) {
    return NextResponse.json(
      { error: "This worksheet attempt is already completed." },
      { status: 409 }
    );
  }

  // Confirm the attempt's worksheet matches the token in the URL
  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .select("id")
    .eq("id", attempt.worksheet_id)
    .eq("share_token", token)
    .maybeSingle();

  if (wsError || !worksheet) {
    return NextResponse.json(
      { error: "Attempt does not match this worksheet." },
      { status: 403 }
    );
  }

  // 2. Confirm the question belongs to this worksheet
  const { data: wq, error: wqError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("id")
    .eq("worksheet_id", attempt.worksheet_id)
    .eq("question_id", questionId)
    .maybeSingle();

  if (wqError || !wq) {
    return NextResponse.json(
      { error: "Question does not belong to this worksheet." },
      { status: 403 }
    );
  }

  // 3. Load the question answer data (kept server-side only)
  const { data: question, error: qError } = await supabaseAdmin
    .from("questions")
    .select("answer, accepted_answers, choices, explanation")
    .eq("id", questionId)
    .maybeSingle();

  if (qError || !question) {
    return NextResponse.json(
      { error: "Could not load question data." },
      { status: 500 }
    );
  }

  // 4. Mark the answer
  const isMcq =
    Array.isArray(question.choices) && (question.choices as unknown[]).length > 0;

  let isCorrect: boolean;

  if (isMcq) {
    // MCQ: compare the submitted choice label to the stored correct label.
    // Case-insensitive to be safe (labels are typically "A", "B", "C", "D").
    isCorrect =
      trimmedAnswer.toUpperCase() ===
      String(question.answer ?? "").trim().toUpperCase();
  } else {
    // Typed: use semantic marking
    const result = markTypedAnswer({
      userAnswer: trimmedAnswer,
      correctAnswer: String(question.answer ?? ""),
      acceptedAnswers: Array.isArray(question.accepted_answers)
        ? (question.accepted_answers as string[])
        : [],
    });
    isCorrect = result.correct;
  }

  // 5. Save the answer
  const { error: saveError } = await supabaseAdmin
    .from("worksheet_answers")
    .insert({
      attempt_id: attemptId,
      worksheet_id: attempt.worksheet_id,
      question_id: questionId,
      student_answer: trimmedAnswer,
      is_correct: isCorrect,
      time_spent_secs: typeof timeSpentSecs === "number" ? timeSpentSecs : null,
    });

  if (saveError) {
    console.error("[worksheet/answer] insert failed", {
      attemptId,
      questionId,
      message: saveError.message,
    });
    return NextResponse.json(
      { error: "Could not save answer. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    isCorrect,
    explanation: String(question.explanation ?? ""),
  });
}
