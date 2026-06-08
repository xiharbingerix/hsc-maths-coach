import { supabaseAdmin } from "../supabaseAdmin";

export type MasteryEventInput = {
  userId: string;
  sourceType: "diagnostic" | "lesson" | "quiz" | "worksheet";
  sourceId: string;
  questionId: string;
  /** Original lesson question ID (e.g. "q1"). Enables per-question analytics
   *  and idempotency for lesson mastery events. Null for worksheet/diagnostic. */
  sourceQuestionId?: string | null;
  courseSlug: string;
  topicSlug: string;
  subtopicSlug: string | null;
  difficulty: number;
  isCorrect: boolean;
};

// Event value for a correct answer at each difficulty level.
const CORRECT_VALUES: Record<number, number> = {
  1: 40,
  2: 60,
  3: 80,
  4: 95,
  5: 100,
};

// Penalty magnitude subtracted from current score on an incorrect answer.
const INCORRECT_PENALTIES: Record<number, number> = {
  1: 15,
  2: 12,
  3: 8,
  4: 5,
  5: 5,
};

function computeEventValue(
  difficulty: number,
  isCorrect: boolean,
  currentScore: number
): number {
  if (isCorrect) {
    return CORRECT_VALUES[difficulty] ?? 60;
  }
  const penalty = INCORRECT_PENALTIES[difficulty] ?? 5;
  return Math.max(0, currentScore - penalty);
}

function applyEvent(
  currentScore: number,
  difficulty: number,
  isCorrect: boolean
): number {
  const ev = computeEventValue(difficulty, isCorrect, currentScore);
  const raw = currentScore * 0.75 + ev * 0.25;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

/**
 * Inserts mastery_events and updates student_mastery for a set of answered
 * questions. All events must belong to the same user.
 *
 * The function is intentionally non-transactional for this MVP: in the unlikely
 * case of a concurrent completion for the same user/topic, the scores may
 * diverge by one event. A version-lock upsert can be added later if needed.
 */
export async function recordMasteryEvents(
  events: MasteryEventInput[]
): Promise<void> {
  if (events.length === 0) return;

  // 1. Insert all mastery_events in one batch.
  const { error: insertError } = await supabaseAdmin
    .from("mastery_events")
    .insert(
      events.map((e) => ({
        user_id: e.userId,
        source_type: e.sourceType,
        source_id: e.sourceId,
        question_id: e.questionId,
        source_question_id: e.sourceQuestionId ?? null,
        course_slug: e.courseSlug,
        topic_slug: e.topicSlug,
        subtopic_slug: e.subtopicSlug,
        difficulty: e.difficulty,
        is_correct: e.isCorrect,
      }))
    );

  if (insertError) {
    throw new Error(`mastery_events insert failed: ${insertError.message}`);
  }

  // 2. Group events by (course_slug, topic_slug) — slugs never contain "::".
  type BucketKey = string;
  const grouped = new Map<BucketKey, MasteryEventInput[]>();
  for (const event of events) {
    const key = `${event.courseSlug}::${event.topicSlug}`;
    const bucket = grouped.get(key) ?? [];
    bucket.push(event);
    grouped.set(key, bucket);
  }

  // All events share a single userId (enforced at the call site).
  const userId = events[0].userId;

  // 3. For each topic, read current score and apply events sequentially.
  for (const [, topicEvents] of grouped) {
    const { courseSlug, topicSlug } = topicEvents[0];

    const { data: current } = await supabaseAdmin
      .from("student_mastery")
      .select("mastery_score, attempt_count, correct_count")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .eq("topic_slug", topicSlug)
      .maybeSingle();

    let score = (current?.mastery_score as number | null) ?? 0;
    let attemptCount = (current?.attempt_count as number | null) ?? 0;
    let correctCount = (current?.correct_count as number | null) ?? 0;

    for (const event of topicEvents) {
      score = applyEvent(score, event.difficulty, event.isCorrect);
      attemptCount += 1;
      if (event.isCorrect) correctCount += 1;
    }

    const { error: upsertError } = await supabaseAdmin
      .from("student_mastery")
      .upsert(
        {
          user_id: userId,
          course_slug: courseSlug,
          topic_slug: topicSlug,
          mastery_score: score,
          attempt_count: attemptCount,
          correct_count: correctCount,
          last_updated: new Date().toISOString(),
        },
        { onConflict: "user_id,course_slug,topic_slug" }
      );

    if (upsertError) {
      throw new Error(
        `student_mastery upsert failed for ${courseSlug}/${topicSlug}: ${upsertError.message}`
      );
    }
  }
}
