export type WorksheetAnswerMetadata = {
  attemptCount?: unknown;
  hadIncorrectAttempt?: unknown;
};

export type TeacherGuidedRetryResult = {
  attemptCount: number;
  hadIncorrectAttempt: boolean;
  halfMarksApplied: boolean;
  marksEarned: number;
  percentage: number;
  retryRequired: boolean;
};

function positiveInteger(value: unknown): number {
  return typeof value === "number" && Number.isInteger(value) && value > 0
    ? value
    : 0;
}

/**
 * Applies the scoring and progression rules for teacher-guided retries.
 * The previous answer row is overwritten on each submission, so the compact
 * metadata carried in answer_payload preserves whether a mistake occurred.
 */
export function applyTeacherGuidedRetryPolicy({
  enabled,
  isCorrect,
  rawMarksEarned,
  marksAvailable,
  previousIsCorrect,
  previousMetadata,
}: {
  enabled: boolean;
  isCorrect: boolean;
  rawMarksEarned: number;
  marksAvailable: number;
  previousIsCorrect: boolean | null;
  previousMetadata?: WorksheetAnswerMetadata | null;
}): TeacherGuidedRetryResult {
  const previousAttemptCount = positiveInteger(previousMetadata?.attemptCount);
  const hadPreviousIncorrectAttempt =
    previousMetadata?.hadIncorrectAttempt === true || previousIsCorrect === false;
  const halfMarksApplied = enabled && isCorrect && hadPreviousIncorrectAttempt;
  const marksEarned = halfMarksApplied ? marksAvailable / 2 : rawMarksEarned;

  return {
    attemptCount: previousAttemptCount + 1,
    hadIncorrectAttempt: hadPreviousIncorrectAttempt || !isCorrect,
    halfMarksApplied,
    marksEarned,
    percentage: marksAvailable > 0 ? marksEarned / marksAvailable : 0,
    retryRequired: enabled && !isCorrect,
  };
}

export function isTeacherGuidedRetryEnabled(topicConfig: unknown): boolean {
  if (!topicConfig || typeof topicConfig !== "object") return false;
  return (
    (topicConfig as { teacher_guided_retry?: unknown }).teacher_guided_retry === true
  );
}
