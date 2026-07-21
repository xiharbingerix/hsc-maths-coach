import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type PartResultPayload = {
  marksEarned?: unknown;
};

type AnswerPayload = {
  marksEarned?: unknown;
  attemptCount?: unknown;
  hadIncorrectAttempt?: unknown;
};

type WorksheetQuestionRow = {
  question_id: string;
  questions?: { question_parts?: unknown } | { question_parts?: unknown }[] | null;
};

type WorksheetAnswerRow = {
  question_id: string;
  is_correct: boolean | null;
  answer_payload?: AnswerPayload | null;
  part_results?: PartResultPayload[] | null;
};

function numericValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function questionMarksAvailable(questionParts: unknown): number {
  if (!Array.isArray(questionParts) || questionParts.length === 0) return 1;

  const total = questionParts.reduce((sum, part) => {
    if (!part || typeof part !== "object") return sum + 1;
    const marks = numericValue((part as { marks?: unknown }).marks);
    return sum + (marks !== null && marks > 0 ? marks : 1);
  }, 0);

  return total > 0 ? total : 1;
}

function answerMarksEarned(answer: WorksheetAnswerRow): number {
  const payloadMarks = numericValue(answer.answer_payload?.marksEarned);
  if (payloadMarks !== null) return payloadMarks;

  if (Array.isArray(answer.part_results) && answer.part_results.length > 0) {
    return answer.part_results.reduce((sum, part) => {
      const marks = numericValue(part.marksEarned);
      return sum + (marks ?? 0);
    }, 0);
  }

  return answer.is_correct === true ? 1 : 0;
}

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

  const { data: worksheetQuestions, error: questionCountError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id, questions(question_parts)")
    .eq("worksheet_id", attempt.worksheet_id);

  if (questionCountError || !worksheetQuestions) {
    console.error("[worksheet/attempt] worksheet question count failed", {
      attemptId,
      message: questionCountError?.message,
    });
    return NextResponse.json(
      { error: "Could not load worksheet attempt." },
      { status: 500 }
    );
  }

  const marksAvailable = (worksheetQuestions as WorksheetQuestionRow[]).reduce(
    (sum, row) => {
      const question = Array.isArray(row.questions) ? row.questions[0] : row.questions;
      return sum + questionMarksAvailable(question?.question_parts);
    },
    0
  );

  const { data: answers, error: answersError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("question_id, is_correct, answered_at, answer_payload, part_results")
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

  const latestByQuestion = new Map<
    string,
    {
      isCorrect: boolean;
      marksEarned: number;
      attemptCount: number;
      hadIncorrectAttempt: boolean;
    }
  >();
  for (const answer of answers ?? []) {
    const row = answer as WorksheetAnswerRow;
    if (!latestByQuestion.has(row.question_id)) {
      latestByQuestion.set(row.question_id, {
        isCorrect: row.is_correct === true,
        marksEarned: answerMarksEarned(row),
        attemptCount:
          typeof row.answer_payload?.attemptCount === "number"
            ? row.answer_payload.attemptCount
            : 1,
        hadIncorrectAttempt:
          row.answer_payload?.hadIncorrectAttempt === true ||
          row.is_correct === false,
      });
    }
  }

  const marksEarned = [...latestByQuestion.values()].reduce(
    (sum, answer) => sum + answer.marksEarned,
    0
  );

  return NextResponse.json({
    attemptId: attempt.id,
    studentName: attempt.student_name ?? null,
    completedAt: attempt.completed_at ?? null,
    scoreCorrect: attempt.score_correct ?? null,
    scoreTotal: attempt.score_total ?? null,
    marksEarned,
    marksAvailable,
    answeredQuestions: [...latestByQuestion.entries()].map(
      ([questionId, answer]) => ({
        questionId,
        isCorrect: answer.isCorrect,
        attemptCount: answer.attemptCount,
        hadIncorrectAttempt: answer.hadIncorrectAttempt,
      })
    ),
  });
}
