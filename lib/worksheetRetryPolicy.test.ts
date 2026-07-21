import assert from "node:assert/strict";
import test from "node:test";

import {
  applyTeacherGuidedRetryPolicy,
  isTeacherGuidedRetryEnabled,
} from "./worksheetRetryPolicy";

test("ordinary worksheets keep the original score and allow progression", () => {
  const result = applyTeacherGuidedRetryPolicy({
    enabled: false,
    isCorrect: false,
    rawMarksEarned: 0,
    marksAvailable: 1,
    previousIsCorrect: null,
  });

  assert.equal(result.marksEarned, 0);
  assert.equal(result.retryRequired, false);
  assert.equal(result.hadIncorrectAttempt, true);
});

test("a first mistake in guided mode requires a retry", () => {
  const result = applyTeacherGuidedRetryPolicy({
    enabled: true,
    isCorrect: false,
    rawMarksEarned: 1,
    marksAvailable: 3,
    previousIsCorrect: null,
  });

  assert.equal(result.retryRequired, true);
  assert.equal(result.halfMarksApplied, false);
  assert.equal(result.attemptCount, 1);
  assert.equal(result.hadIncorrectAttempt, true);
});

test("a correct retry is capped at half marks", () => {
  const result = applyTeacherGuidedRetryPolicy({
    enabled: true,
    isCorrect: true,
    rawMarksEarned: 3,
    marksAvailable: 3,
    previousIsCorrect: false,
    previousMetadata: { attemptCount: 1, hadIncorrectAttempt: true },
  });

  assert.equal(result.retryRequired, false);
  assert.equal(result.halfMarksApplied, true);
  assert.equal(result.marksEarned, 1.5);
  assert.equal(result.percentage, 0.5);
  assert.equal(result.attemptCount, 2);
});

test("a correct first response keeps full marks", () => {
  const result = applyTeacherGuidedRetryPolicy({
    enabled: true,
    isCorrect: true,
    rawMarksEarned: 4,
    marksAvailable: 4,
    previousIsCorrect: null,
  });

  assert.equal(result.marksEarned, 4);
  assert.equal(result.halfMarksApplied, false);
});

test("guided mode is read from worksheet topic configuration", () => {
  assert.equal(isTeacherGuidedRetryEnabled({ teacher_guided_retry: true }), true);
  assert.equal(isTeacherGuidedRetryEnabled({ teacher_guided_retry: false }), false);
  assert.equal(isTeacherGuidedRetryEnabled(null), false);
});
