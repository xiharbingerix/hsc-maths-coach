import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../scripts/seed-question-bank";

test("Year 9 questions use explicit wording for values that are not defined", () => {
  const { rows, warnings } = collectAllQuestions(["year-9-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);

  for (const row of rows) {
    assert.notEqual(row.answer.toLowerCase(), "undefined", `${row.source_id} has an ambiguous answer`);
    for (const choice of row.choices ?? []) {
      assert.notEqual(
        choice.text.toLowerCase(),
        "undefined",
        `${row.source_id} has an ambiguous choice`
      );
    }
  }

  for (const questionId of ["y9-gr-p10", "chal-y9-gr-8", "y9-loi-m7", "y9c-loi-6"]) {
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, "not defined");
    assert.ok(row.accepted_answers.includes("undefined"));
    assert.ok(row.accepted_answers.includes("no gradient"));
  }
});

test("Year 9 questions are standalone rather than relying on adjacent questions", () => {
  const { rows } = collectAllQuestions(["year-9-mathematics"]);

  for (const row of rows) {
    assert.doesNotMatch(
      row.prompt,
      /\b(?:from the (?:same|previous)|shown (?:above|below)|(?:plot|graph|table|diagram|figure|data) (?:above|below))\b/i,
      `${row.source_id} depends on missing context`
    );
  }
});
