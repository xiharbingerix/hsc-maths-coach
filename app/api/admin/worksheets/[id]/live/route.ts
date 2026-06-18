import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type AttemptRow = {
  id: string;
  student_name: string | null;
  started_at: string;
  completed_at: string | null;
  score_correct: number | null;
  score_total: number | null;
  last_seen_at?: string | null;
  live_question_index?: number | null;
  live_phase?: string | null;
};

type AnswerRow = {
  attempt_id: string;
  question_id: string;
  answered_at: string;
};

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === getAdminToken();
  } catch {
    return false;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Worksheet id is required." }, { status: 400 });
  }

  const { data: worksheetQuestions, error: questionsError } = await supabaseAdmin
    .from("worksheet_questions")
    .select("question_id, position")
    .eq("worksheet_id", id)
    .order("position", { ascending: true });

  if (questionsError) {
    return NextResponse.json(
      { error: "Could not load worksheet questions." },
      { status: 500 }
    );
  }

  const questionRows =
    (worksheetQuestions as Array<{ question_id: string; position: number }> | null) ?? [];
  const totalQuestions = questionRows.length;
  const positionByQuestionId = new Map(
    questionRows.map((row) => [row.question_id, row.position + 1])
  );

  const { data: attemptsData, error: attemptsError } = await supabaseAdmin
    .from("worksheet_attempts")
    .select(
      "id, student_name, started_at, completed_at, score_correct, score_total, last_seen_at, live_question_index, live_phase"
    )
    .eq("worksheet_id", id)
    .order("started_at", { ascending: false })
    .limit(30);

  let attempts = (attemptsData as AttemptRow[] | null) ?? [];

  if (attemptsError) {
    const { data: fallbackAttemptsData, error: fallbackAttemptsError } =
      await supabaseAdmin
        .from("worksheet_attempts")
        .select("id, student_name, started_at, completed_at, score_correct, score_total")
        .eq("worksheet_id", id)
        .order("started_at", { ascending: false })
        .limit(30);

    if (fallbackAttemptsError) {
      return NextResponse.json(
        { error: "Could not load worksheet attempts." },
        { status: 500 }
      );
    }

    attempts = (fallbackAttemptsData as AttemptRow[] | null) ?? [];
  }

  if (attempts.length === 0) {
    return NextResponse.json(
      {
        totalQuestions,
        attempts: [],
        updatedAt: new Date().toISOString(),
        trackingMode: "estimate",
        note: "Current question is estimated from last submitted answer.",
      }
    );
  }

  const attemptIds = attempts.map((attempt) => attempt.id);
  const { data: answersData, error: answersError } = await supabaseAdmin
    .from("worksheet_answers")
    .select("attempt_id, question_id, answered_at")
    .in("attempt_id", attemptIds)
    .order("answered_at", { ascending: false });

  if (answersError) {
    return NextResponse.json(
      { error: "Could not load worksheet answers." },
      { status: 500 }
    );
  }

  const answers = (answersData as AnswerRow[] | null) ?? [];
  const answerState = new Map<
    string,
    {
      answeredQuestionIds: Set<string>;
      lastAnsweredAt: string | null;
      lastAnsweredQuestionNumber: number | null;
    }
  >();

  for (const answer of answers) {
    let current = answerState.get(answer.attempt_id);
    if (!current) {
      current = {
        answeredQuestionIds: new Set<string>(),
        lastAnsweredAt: null,
        lastAnsweredQuestionNumber: null,
      };
      answerState.set(answer.attempt_id, current);
    }

    if (!current.lastAnsweredAt) {
      current.lastAnsweredAt = answer.answered_at;
      current.lastAnsweredQuestionNumber =
        positionByQuestionId.get(answer.question_id) ?? null;
    }

    current.answeredQuestionIds.add(answer.question_id);
  }

  const nowMs = Date.now();
  let hasHeartbeatData = false;
  const snapshots = attempts.map((attempt) => {
    const state = answerState.get(attempt.id);
    const answeredCount = state?.answeredQuestionIds.size ?? 0;
    const completed = Boolean(attempt.completed_at);
    const liveQuestionNumber =
      typeof attempt.live_question_index === "number" &&
      Number.isInteger(attempt.live_question_index) &&
      attempt.live_question_index > 0
        ? attempt.live_question_index
        : null;
    const lastSeenAt =
      typeof attempt.last_seen_at === "string" ? attempt.last_seen_at : null;

    if (liveQuestionNumber || lastSeenAt) {
      hasHeartbeatData = true;
    }

    const currentQuestionNumber = completed
      ? null
      : liveQuestionNumber ?? Math.min(answeredCount + 1, Math.max(totalQuestions, 1));

    const lastActivityAt = lastSeenAt ?? state?.lastAnsweredAt ?? attempt.started_at;
    const ageMs = nowMs - Date.parse(lastActivityAt);
    const idleSeconds = Number.isFinite(ageMs) ? Math.max(0, Math.round(ageMs / 1000)) : null;

    let activityState: "active" | "idle" | "completed" = "active";
    if (completed) {
      activityState = "completed";
    } else if (idleSeconds !== null && idleSeconds > 180) {
      activityState = "idle";
    }

    return {
      attemptId: attempt.id,
      studentName: attempt.student_name?.trim() || "Anonymous student",
      startedAt: attempt.started_at,
      completedAt: attempt.completed_at,
      scoreCorrect: attempt.score_correct,
      scoreTotal: attempt.score_total,
      answeredCount,
      totalQuestions,
      currentQuestionNumber,
      lastAnsweredQuestionNumber: state?.lastAnsweredQuestionNumber ?? null,
      lastActivityAt,
      livePhase: attempt.live_phase ?? null,
      idleSeconds,
      activityState,
    };
  });

  return NextResponse.json({
    totalQuestions,
    attempts: snapshots,
    updatedAt: new Date().toISOString(),
    trackingMode: hasHeartbeatData ? "live" : "estimate",
    note: hasHeartbeatData
      ? "Current question is from student heartbeat when available."
      : "Current question is estimated from last submitted answer.",
  });
}
