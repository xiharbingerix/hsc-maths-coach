import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";

const expectedHighDifficulty = new Map<string, number>([
  ["chal-y12a-f2-6", 4],
  ["y11adv-var-m10", 4],
  ["chal-y11a-var-1", 4],
  ["chal-y11a-var-2", 4],
  ["chal-y12a-dpf-2", 4],
  ["y11adv-stat-m6", 4],
  ["chal-y12a-sp-3", 4],
  ["chal-y12a-sp-4", 4],
  ["chal-y12a-sp-5", 5],
  ["chal-y12a-sp-6", 6],
  ["chal-y12a-sp-7", 5],
  ["y11adv-cs-rd-m5", 4],
  ["chal-y12a-opt-1", 5],
  ["chal-y12a-opt-2", 5],
  ["chal-y12a-opt-3", 5],
  ["chal-y12a-opt-4", 5],
  ["chal-y12a-opt-5", 5],
  ["chal-y12a-opt-6", 5],
  ["chal-y12a-opt-7", 4],
  ["y11adv-sf-ex-m7", 4],
  ["y11adv-ge-sp-m4b", 4],
  ["y11adv-ge-sim-m7", 4],
  ["y11adv-ge-ex-m7", 4],
]);

function year11AdvancedRows() {
  return collectAllQuestions(["year-11-advanced"]).rows;
}

test("Year 11 Advanced D4-D6 assignments match the hand audit", () => {
  const actual = year11AdvancedRows()
    .filter((row) => row.difficulty >= 4)
    .map((row) => [row.source_id, row.difficulty] as const);

  assert.equal(actual.length, expectedHighDifficulty.size);
  for (const [id, difficulty] of actual) {
    assert.equal(
      expectedHighDifficulty.get(id),
      difficulty,
      `${id} has an unaudited D${difficulty} assignment`,
    );
  }
});

test("repaired high-tier questions retain their corrected prompts and answers", () => {
  const byId = new Map(year11AdvancedRows().map((row) => [row.source_id, row]));

  assert.doesNotMatch(byId.get("y11adv-stat-m6")!.prompt, /at x\s*=\s*[−-]1/i);
  assert.equal(byId.get("y11adv-stat-m6")!.difficulty, 4);

  assert.match(byId.get("y11adv-ge-sim-m7")!.prompt, /student claims/i);
  assert.match(byId.get("y11adv-ge-sim-m7")!.answer, /not tangent/i);
  assert.match(byId.get("y11adv-ge-sp-m4b")!.answer, /±9√2/);
  assert.match(byId.get("y11adv-ge-ex-m7")!.answer, /1 or k = 4/);
  assert.match(byId.get("chal-y11a-var-1")!.prompt, /C = 88/);
  assert.match(byId.get("y11adv-sf-ex-m7")!.answer, /36 963/);
});

test("Year 11 Advanced seeded question text contains no escaped control characters", () => {
  const controlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;
  for (const row of year11AdvancedRows()) {
    const text = [
      row.prompt,
      row.latex,
      row.answer,
      row.hint,
      row.explanation,
    ].filter(Boolean).join(" ");
    assert.doesNotMatch(text, controlCharacters, row.source_id);
  }
});
