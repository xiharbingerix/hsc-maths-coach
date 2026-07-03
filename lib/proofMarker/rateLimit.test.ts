import assert from "node:assert/strict";
import test from "node:test";
import {
  allowProofMarkRequest,
  resetProofMarkRateLimitForTests,
} from "./rateLimit";

test("proof marker rate limit allows requests up to the window cap", () => {
  resetProofMarkRateLimitForTests();

  for (let i = 0; i < 40; i++) {
    assert.equal(allowProofMarkRequest("student-a"), true);
  }

  assert.equal(allowProofMarkRequest("student-a"), false);
});

test("proof marker rate limit is tracked per user", () => {
  resetProofMarkRateLimitForTests();

  for (let i = 0; i < 40; i++) {
    assert.equal(allowProofMarkRequest("student-a"), true);
  }

  assert.equal(allowProofMarkRequest("student-a"), false);
  assert.equal(allowProofMarkRequest("student-b"), true);
});
