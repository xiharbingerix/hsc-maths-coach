import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";

test("Year 8 questions use explicit wording for gradients that are not defined", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
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

  const verticalLine = rowsById.get("chal-y8-grc-8");
  assert.ok(verticalLine);
  assert.equal(verticalLine.answer, "not defined");
  assert.deepEqual(verticalLine.accepted_answers, ["undefined", "no gradient"]);
});
