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

type MasterySnapshot = {
  mastery_score?: number | null;
  attempt_count?: number | null;
  correct_count?: number | null;
};

type MasteryCounters = {
  score: number;
  attemptCount: number;
  correctCount: number;
};

function countersFromSnapshot(current: MasterySnapshot | null): MasteryCounters {
  return {
    score: current?.mastery_score ?? 0,
    attemptCount: current?.attempt_count ?? 0,
    correctCount: current?.correct_count ?? 0,
  };
}

function applyEventsToCounters(
  current: MasteryCounters,
  events: MasteryEventInput[]
): MasteryCounters {
  let { score, attemptCount, correctCount } = current;

  for (const event of events) {
    score = applyEvent(score, event.difficulty, event.isCorrect);
    attemptCount += 1;
    if (event.isCorrect) correctCount += 1;
  }

  return { score, attemptCount, correctCount };
}

function isMissingSubtopicMasteryTable(error: { code?: string; message?: string } | null) {
  return Boolean(
    error?.code === "42P01" ||
      error?.message?.toLowerCase().includes("student_subtopic_mastery")
  );
}

/**
 * Inserts mastery_events and updates student_mastery for a set of answered
 * questions. Events with a subtopicSlug also update student_subtopic_mastery.
 * All events must belong to the same user.
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

    const { score, attemptCount, correctCount } = applyEventsToCounters(
      countersFromSnapshot(current),
      topicEvents
    );

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

    const sourceTypes = new Set(topicEvents.map((event) => event.sourceType));
    const sourceType =
      sourceTypes.size === 1 ? topicEvents[0].sourceType : "mixed";

    const { error: historyError } = await supabaseAdmin
      .from("student_mastery_history")
      .insert({
        user_id: userId,
        course_slug: courseSlug,
        topic_slug: topicSlug,
        mastery_score: score,
        attempt_count: attemptCount,
        source_type: sourceType,
      });

    if (historyError) {
      throw new Error(
        `student_mastery_history insert failed for ${courseSlug}/${topicSlug}: ${historyError.message}`
      );
    }
  }

  const groupedSubtopics = new Map<BucketKey, MasteryEventInput[]>();
  for (const event of events) {
    if (!event.subtopicSlug) continue;
    const key = `${event.courseSlug}::${event.topicSlug}::${event.subtopicSlug}`;
    const bucket = groupedSubtopics.get(key) ?? [];
    bucket.push(event);
    groupedSubtopics.set(key, bucket);
  }

  for (const [, subtopicEvents] of groupedSubtopics) {
    const { courseSlug, topicSlug, subtopicSlug } = subtopicEvents[0];
    if (!subtopicSlug) continue;

    const { data: current, error: currentError } = await supabaseAdmin
      .from("student_subtopic_mastery")
      .select("mastery_score, attempt_count, correct_count")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .eq("topic_slug", topicSlug)
      .eq("subtopic_slug", subtopicSlug)
      .maybeSingle();

    if (isMissingSubtopicMasteryTable(currentError)) {
      return;
    }

    if (currentError) {
      throw new Error(
        `student_subtopic_mastery select failed for ${courseSlug}/${topicSlug}/${subtopicSlug}: ${currentError.message}`
      );
    }

    const { score, attemptCount, correctCount } = applyEventsToCounters(
      countersFromSnapshot(current),
      subtopicEvents
    );

    const { error: upsertError } = await supabaseAdmin
      .from("student_subtopic_mastery")
      .upsert(
        {
          user_id: userId,
          course_slug: courseSlug,
          topic_slug: topicSlug,
          subtopic_slug: subtopicSlug,
          mastery_score: score,
          attempt_count: attemptCount,
          correct_count: correctCount,
          last_updated: new Date().toISOString(),
        },
        { onConflict: "user_id,course_slug,topic_slug,subtopic_slug" }
      );

    if (isMissingSubtopicMasteryTable(upsertError)) {
      return;
    }

    if (upsertError) {
      throw new Error(
        `student_subtopic_mastery upsert failed for ${courseSlug}/${topicSlug}/${subtopicSlug}: ${upsertError.message}`
      );
    }
  }
}
