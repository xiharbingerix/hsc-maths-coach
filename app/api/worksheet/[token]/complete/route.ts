import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { recordMasteryEvents } from "../../../../../lib/mastery/updateMastery";
import type { MasteryEventInput } from "../../../../../lib/mastery/updateMastery";
import { trackEvent } from "../../../../../lib/analytics/trackEvent";

export const runtime = "nodejs";

type CompleteBody = {
  attemptId?: string;
};

type PartResultPayload = {
  marksEarned?: unknown;
  marksAvailable?: unknown;
};

type AnswerPayload = {
  marksEarned?: unknown;
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

  const { data: attempt, error: attemptError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select("id, worksheet_id, user_id, completed_at, score_correct, score_total")
    .eq("id", attemptId)
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .select("id, expires_at, assigned_to_user")
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

  const { data: worksheetQuestions, error: questionCountError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id, questions(question_parts)")
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

  const typedWorksheetQuestions = worksheetQuestions as WorksheetQuestionRow[];
  const scoreTotal = typedWorksheetQuestions.length;
  const marksAvailable = typedWorksheetQuestions.reduce((sum, row) => {
    const question = Array.isArray(row.questions) ? row.questions[0] : row.questions;
    return sum + questionMarksAvailable(question?.question_parts);
  }, 0);
  const expectedQuestionIds = new Set(
    typedWorksheetQuestions.map((row) => row.question_id)
  );

  const { data: answers, error: countError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("question_id, is_correct, answered_at, answer_payload, part_results")
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

  const latestAnswersByQuestion = new Map<
    string,
    { isCorrect: boolean; marksEarned: number }
  >();
  for (const answer of answers ?? []) {
    const row = answer as WorksheetAnswerRow;
    if (!expectedQuestionIds.has(row.question_id)) continue;
    if (!latestAnswersByQuestion.has(row.question_id)) {
      latestAnswersByQuestion.set(row.question_id, {
        isCorrect: row.is_correct === true,
        marksEarned: answerMarksEarned(row),
      });
    }
  }

  const scoreCorrect = [...latestAnswersByQuestion.values()].filter(
    (answer) => answer.isCorrect
  ).length;
  const marksEarned = [...latestAnswersByQuestion.values()].reduce(
    (sum, answer) => sum + answer.marksEarned,
    0
  );

  if (attempt.completed_at) {
    return NextResponse.json({
      scoreCorrect: attempt.score_correct ?? scoreCorrect,
      scoreTotal: attempt.score_total ?? scoreTotal,
      marksEarned,
      marksAvailable,
    });
  }

  if (latestAnswersByQuestion.size < scoreTotal) {
    return NextResponse.json(
      { error: "Please answer every question before finishing the worksheet." },
      { status: 409 }
    );
  }

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

  const attemptUserId = (attempt as { user_id?: string | null }).user_id;
  const worksheetAssignedUserId =
    typeof (worksheet as { assigned_to_user?: string | null }).assigned_to_user === "string" &&
    (worksheet as { assigned_to_user?: string | null }).assigned_to_user
      ? (worksheet as { assigned_to_user?: string | null }).assigned_to_user!
      : null;
  const userId = attemptUserId ?? worksheetAssignedUserId;
  if (userId) {
    try {
      const questionIds = [...latestAnswersByQuestion.keys()];
      const { data: questionMeta } = await supabaseAdmin
        .from("questions")
        .select("id, course_slug, topic_slug, subtopic_slug, difficulty")
        .in("id", questionIds);

      if (questionMeta && questionMeta.length > 0) {
        const metaById = new Map(
          (
            questionMeta as {
              id: string;
              course_slug: string;
              topic_slug: string;
              subtopic_slug: string | null;
              difficulty: number;
            }[]
          ).map((q) => [q.id, q])
        );

        const events: MasteryEventInput[] = [];
        for (const [questionId, answer] of latestAnswersByQuestion) {
          const meta = metaById.get(questionId);
          if (!meta) continue;
          events.push({
            userId,
            sourceType: "worksheet",
            sourceId: attemptId,
            questionId,
            courseSlug: meta.course_slug,
            topicSlug: meta.topic_slug,
            subtopicSlug: meta.subtopic_slug ?? null,
            difficulty: meta.difficulty,
            isCorrect: answer.isCorrect,
          });
        }

        await recordMasteryEvents(events);
      }
    } catch (masteryErr) {
      console.error("[worksheet/complete] mastery update failed", {
        attemptId,
        userId,
        error: masteryErr instanceof Error ? masteryErr.message : masteryErr,
      });
    }
  }

  void trackEvent({
    userId: userId ?? null,
    eventName: "worksheet_completed",
    page: `/worksheet/${token}`,
    metadata: { scoreCorrect, scoreTotal, marksEarned, marksAvailable, attemptId },
  });

  return NextResponse.json({ scoreCorrect, scoreTotal, marksEarned, marksAvailable });
}
