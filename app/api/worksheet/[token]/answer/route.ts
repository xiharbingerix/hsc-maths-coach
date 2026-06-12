import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { markTypedAnswer } from "../../../../../lib/answerMarking";

export const runtime = "nodejs";

type AnswerBody = {
  attemptId?: string;
  questionId?: string;
  answer?: string;
  partAnswers?: Record<string, string>;
  timeSpentSecs?: number;
};

type StoredQuestionPart = {
  key: string;
  label: string;
  prompt: string;
  marks: number;
  answer: string;
  acceptedAnswers?: string[];
  accepted_answers?: string[];
  explanation: string;
};

type PartAnswerResult = {
  key: string;
  label: string;
  marks: number;
  isCorrect: boolean;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
};

function normaliseQuestionParts(value: unknown): StoredQuestionPart[] {
  if (!Array.isArray(value)) return [];
  const parts: StoredQuestionPart[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const part = item as Record<string, unknown>;
    const key = String(part.key ?? "").trim();
    const answer = String(part.answer ?? "").trim();
    if (!key || !answer) continue;
    parts.push({
      key,
      label: String(part.label ?? `(${key})`),
      prompt: String(part.prompt ?? ""),
      marks: typeof part.marks === "number" ? part.marks : 1,
      answer,
      acceptedAnswers: Array.isArray(part.acceptedAnswers)
        ? part.acceptedAnswers.map(String)
        : undefined,
      accepted_answers: Array.isArray(part.accepted_answers)
        ? part.accepted_answers.map(String)
        : undefined,
      explanation: String(part.explanation ?? ""),
    });
  }

  return parts;
}

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

  const { attemptId, questionId, answer, partAnswers, timeSpentSecs } = body;

  if (!attemptId || !questionId) {
    return NextResponse.json(
      { error: "attemptId and questionId are required." },
      { status: 400 }
    );
  }

  const trimmedAnswer = typeof answer === "string" ? answer.trim() : "";

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
    .select("answer, accepted_answers, choices, explanation, question_parts")
    .eq("id", questionId)
    .maybeSingle();

  if (qError || !question) {
    return NextResponse.json(
      { error: "Could not load question data." },
      { status: 500 }
    );
  }

  // 4. Mark the answer
  const parts = normaliseQuestionParts(question.question_parts);
  const isMcq =
    Array.isArray(question.choices) && (question.choices as unknown[]).length > 0;

  let isCorrect = false;
  let explanation = String(question.explanation ?? "");
  let studentAnswerForStorage = trimmedAnswer;
  let answerPayload: { parts?: Record<string, string> } | null = null;
  let partResults: PartAnswerResult[] | null = null;

  if (parts.length > 0) {
    if (!partAnswers || typeof partAnswers !== "object") {
      return NextResponse.json(
        { error: "partAnswers are required for this question." },
        { status: 400 }
      );
    }

    partResults = parts.map((part) => {
      const studentAnswer = String(partAnswers[part.key] ?? "").trim();
      const result = markTypedAnswer({
        userAnswer: studentAnswer,
        correctAnswer: part.answer,
        acceptedAnswers: part.acceptedAnswers ?? part.accepted_answers ?? [],
      });
      return {
        key: part.key,
        label: part.label,
        marks: part.marks,
        isCorrect: studentAnswer.length > 0 && result.correct,
        studentAnswer,
        correctAnswer: part.answer,
        explanation: part.explanation,
      };
    });

    if (partResults.some((part) => !part.studentAnswer)) {
      return NextResponse.json(
        { error: "Every question part needs an answer." },
        { status: 400 }
      );
    }

    isCorrect = partResults.every((part) => part.isCorrect);
    answerPayload = { parts: partAnswers };
    studentAnswerForStorage = partResults
      .map((part) => `${part.label} ${part.studentAnswer}`)
      .join(" | ");
    explanation =
      explanation ||
      partResults.map((part) => `${part.label} ${part.explanation}`).join(" ");
  } else {
    if (!trimmedAnswer) {
      return NextResponse.json(
        { error: "Answer cannot be empty." },
        { status: 400 }
      );
    }
  }

  if (parts.length === 0 && isMcq) {
    // MCQ: compare the submitted choice label to the stored correct label.
    // Case-insensitive to be safe (labels are typically "A", "B", "C", "D").
    isCorrect =
      trimmedAnswer.toUpperCase() ===
      String(question.answer ?? "").trim().toUpperCase();
  } else if (parts.length === 0) {
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
    .upsert({
      attempt_id: attemptId,
      worksheet_id: attempt.worksheet_id,
      question_id: questionId,
      student_answer: studentAnswerForStorage,
      answer_payload: answerPayload,
      part_results: partResults,
      is_correct: isCorrect,
      time_spent_secs: typeof timeSpentSecs === "number" ? timeSpentSecs : null,
      answered_at: new Date().toISOString(),
    }, { onConflict: "attempt_id,question_id" });

  if (saveError) {
    console.error("[worksheet/answer] save failed", {
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
    explanation,
    partResults: partResults ?? [],
  });
}
