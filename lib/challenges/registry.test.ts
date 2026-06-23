import { test } from "node:test";
import assert from "node:assert/strict";
import { getChallengeQuestions, hasChallenge } from "./index";

// Locks the course-scoped challenge-registry behaviour (Year 9 Wave 1 fix): a course-scoped key
// "<course>/<lesson>" is preferred, with a legacy lesson-only fallback — so a slug shared across
// courses (e.g. simple-interest in Year 9 and Year 11 Standard) carries distinct challenge sets
// without clobbering, and all pre-existing (bare-key) challenges keep resolving.

test("course-scoped key resolves for Year 9 simple-interest", () => {
  assert.ok(getChallengeQuestions("simple-interest", "year-9-mathematics-core").length > 0);
  assert.ok(getChallengeQuestions("simple-interest", "year-9-mathematics-advanced").length > 0);
});

test("legacy lesson-only key still resolves (Year 11 simple-interest intact)", () => {
  assert.ok(getChallengeQuestions("simple-interest").length > 0);
});

test("no clobber: Year 9 and the legacy simple-interest sets are different", () => {
  const y9 = getChallengeQuestions("simple-interest", "year-9-mathematics-core");
  const legacy = getChallengeQuestions("simple-interest");
  assert.notDeepEqual(y9, legacy);
});

test("unknown course falls back to the legacy lesson-only key", () => {
  assert.deepEqual(
    getChallengeQuestions("simple-interest", "year-11-standard"),
    getChallengeQuestions("simple-interest")
  );
});

test("course-scoped-only Y9 slug does not leak to a bare/no-course lookup", () => {
  assert.ok(getChallengeQuestions("gradient", "year-9-mathematics-core").length > 0);
  assert.equal(getChallengeQuestions("gradient").length, 0);
});

test("existing course's legacy challenge still resolves when a course is passed", () => {
  assert.ok(getChallengeQuestions("quadratic-equations-discriminant", "year-11-advanced").length > 0);
});

test("hasChallenge respects course scoping", () => {
  assert.equal(hasChallenge("gradient", "year-9-mathematics-core"), true);
  assert.equal(hasChallenge("gradient"), false);
  assert.equal(hasChallenge("definitely-not-a-slug", "year-9-mathematics-core"), false);
});
