import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { markAnswerWithCas } from "../../../../../lib/cas/markAnswerWithCas";
import {
  markProofWithAi,
  proofMarkerEnabled,
} from "../../../../../lib/proofMarker/markProofWithAi";
import { allowProofMarkRequest } from "../../../../../lib/proofMarker/rateLimit";
import { isWordedConceptualAnswer } from "../../../../../lib/proofMarker/conceptualAnswer";
import {
  applyTeacherGuidedRetryPolicy,
  isTeacherGuidedRetryEnabled,
  type WorksheetAnswerMetadata,
} from "../../../../../lib/worksheetRetryPolicy";

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
  marksEarned: number;
  marksAvailable: number;
  isCorrect: boolean;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
};

type QuestionScoreState = "correct" | "partial" | "incorrect";

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
    .select("id, expires_at, topic_config")
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

  const teacherGuidedRetry = isTeacherGuidedRetryEnabled(worksheet.topic_config);
  const { data: previousAnswer, error: previousAnswerError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("is_correct, answer_payload")
    .eq("attempt_id", attemptId)
    .eq("question_id", questionId)
    .maybeSingle();

  if (previousAnswerError) {
    console.error("[worksheet/answer] previous answer query failed", {
      attemptId,
      questionId,
      message: previousAnswerError.message,
    });
    return NextResponse.json(
      { error: "Could not check the previous answer. Please try again." },
      { status: 500 }
    );
  }

  // 3. Load the question answer data (kept server-side only)
  const { data: question, error: qError } = await supabaseAdmin
    .from("questions")
    .select("prompt, latex, answer, accepted_answers, choices, explanation, question_parts")
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
  let answerPayload: {
    parts?: Record<string, string>;
    marksEarned?: number;
    marksAvailable?: number;
    percentage?: number;
    scoreState?: QuestionScoreState;
    attemptCount?: number;
    hadIncorrectAttempt?: boolean;
    halfMarksApplied?: boolean;
  } | null = null;
  let partResults: PartAnswerResult[] | null = null;
  let marksEarned = 0;
  let marksAvailable = 1;
  let percentage = 0;
  let scoreState: QuestionScoreState = "incorrect";

  if (parts.length > 0) {
    if (!partAnswers || typeof partAnswers !== "object") {
      return NextResponse.json(
        { error: "partAnswers are required for this question." },
        { status: 400 }
      );
    }

    partResults = await Promise.all(parts.map(async (part) => {
      const studentAnswer = String(partAnswers[part.key] ?? "").trim();
      const result = await markAnswerWithCas({
        userAnswer: studentAnswer,
        correctAnswer: part.answer,
        acceptedAnswers: part.acceptedAnswers ?? part.accepted_answers ?? [],
      });
      const marksAvailableForPart =
        Number.isFinite(part.marks) && part.marks > 0 ? part.marks : 1;
      const partIsCorrect = studentAnswer.length > 0 && result.correct;
      return {
        key: part.key,
        label: part.label,
        marks: marksAvailableForPart,
        marksEarned: partIsCorrect ? marksAvailableForPart : 0,
        marksAvailable: marksAvailableForPart,
        isCorrect: partIsCorrect,
        studentAnswer,
        correctAnswer: part.answer,
        explanation: part.explanation,
      };
    }));

    if (partResults.some((part) => !part.studentAnswer)) {
      return NextResponse.json(
        { error: "Every question part needs an answer." },
        { status: 400 }
      );
    }

    marksEarned = partResults.reduce((total, part) => total + part.marksEarned, 0);
    marksAvailable = partResults.reduce(
      (total, part) => total + part.marksAvailable,
      0
    );
    percentage = marksAvailable > 0 ? marksEarned / marksAvailable : 0;
    isCorrect = marksEarned === marksAvailable;
    scoreState =
      marksEarned === marksAvailable
        ? "correct"
        : marksEarned > 0
        ? "partial"
        : "incorrect";
    answerPayload = {
      parts: partAnswers,
      marksEarned,
      marksAvailable,
      percentage,
      scoreState,
    };
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
    marksEarned = isCorrect ? 1 : 0;
    percentage = marksEarned;
    scoreState = isCorrect ? "correct" : "incorrect";
  } else if (parts.length === 0) {
    // Typed: local fast-path, then CAS equivalence (symbolic) if needed.
    const correctAnswer = String(question.answer ?? "");
    const acceptedAnswers = Array.isArray(question.accepted_answers)
      ? (question.accepted_answers as string[])
      : [];
    const result = await markAnswerWithCas({
      userAnswer: trimmedAnswer,
      correctAnswer,
      acceptedAnswers,
    });
    isCorrect = result.correct;

    // AI fallback for conceptual / worded answers. String and CAS matching
    // cannot judge a paraphrase of a phrase-or-sentence answer (e.g. a student
    // writing "the initial amount" for a stored "the principal"), so when the
    // stored answer is worded and the local match failed, defer to the AI
    // short-explanation marker. This is gated by proofMarkerEnabled() (off
    // unless PROOF_MARKER_ENABLED=true and ANTHROPIC_API_KEY is set) and rate
    // limited; a disabled marker or any error returns null, leaving the local
    // (incorrect) result untouched — so behaviour is unchanged until enabled.
    if (
      !isCorrect &&
      isWordedConceptualAnswer(correctAnswer) &&
      proofMarkerEnabled() &&
      allowProofMarkRequest(`worksheet:${attemptId}`)
    ) {
      const rubric = [correctAnswer, ...acceptedAnswers]
        .map((entry) => entry.trim())
        .filter(Boolean);
      const aiVerdict = await markProofWithAi(
        {
          mode: "short_explanation",
          prompt: String(question.prompt ?? ""),
          latex: question.latex ? String(question.latex) : undefined,
          modelSolution:
            acceptedAnswers.length > 0
              ? `${correctAnswer}. Also acceptable: ${acceptedAnswers.join("; ")}`
              : correctAnswer,
          rubric,
          feedbackOptions: [
            {
              key: "missing_key_idea",
              text: "The response does not convey the required idea.",
            },
          ],
        },
        trimmedAnswer
      );
      if (aiVerdict?.correct) {
        isCorrect = true;
      }
    }

    marksEarned = isCorrect ? 1 : 0;
    percentage = marksEarned;
    scoreState = isCorrect ? "correct" : "incorrect";
  }

  const retryPolicy = applyTeacherGuidedRetryPolicy({
    enabled: teacherGuidedRetry,
    isCorrect,
    rawMarksEarned: marksEarned,
    marksAvailable,
    previousIsCorrect:
      typeof previousAnswer?.is_correct === "boolean"
        ? previousAnswer.is_correct
        : null,
    previousMetadata:
      previousAnswer?.answer_payload &&
      typeof previousAnswer.answer_payload === "object"
        ? (previousAnswer.answer_payload as WorksheetAnswerMetadata)
        : null,
  });

  marksEarned = retryPolicy.marksEarned;
  percentage = retryPolicy.percentage;
  if (retryPolicy.halfMarksApplied && partResults) {
    partResults = partResults.map((part) => ({
      ...part,
      marksEarned: part.marksEarned / 2,
    }));
  }
  answerPayload = {
    ...(answerPayload ?? {}),
    marksEarned,
    marksAvailable,
    percentage,
    scoreState,
    attemptCount: retryPolicy.attemptCount,
    hadIncorrectAttempt: retryPolicy.hadIncorrectAttempt,
    halfMarksApplied: retryPolicy.halfMarksApplied,
  };

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
    scoreState,
    marksEarned,
    marksAvailable,
    percentage,
    explanation: retryPolicy.retryRequired ? "" : explanation,
    partResults: retryPolicy.retryRequired ? [] : partResults ?? [],
    retryRequired: retryPolicy.retryRequired,
    halfMarksApplied: retryPolicy.halfMarksApplied,
    attemptNumber: retryPolicy.attemptCount,
  });
}
