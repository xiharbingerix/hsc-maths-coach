import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";

const targetSlugs = [
  "solving-linear-equations",
  "linear-inequalities",
  "equations-complex-algebraic-fractions",
] as const;

function auditedRows() {
  const result = collectAllQuestions(["year-10-mathematics"]);
  const rows = result.rows.filter((row) =>
    targetSlugs.includes(row.subtopic_slug as (typeof targetSlugs)[number]),
  );
  const targetIds = new Set(rows.map((row) => row.source_id));
  return {
    rows,
    warnings: result.warnings.filter((warning) => targetIds.has(warning.sourceId)),
  };
}

test("three audited Year 10 equation lessons retain their hand-authored difficulty progression", () => {
  const { rows, warnings } = auditedRows();
  assert.equal(warnings.length, 0);
  assert.equal(rows.length, 60);

  const expectedDistributions = {
    "solving-linear-equations": { 1: 2, 2: 5, 3: 6, 4: 4, 5: 2, 6: 1 },
    "linear-inequalities": { 1: 2, 2: 5, 3: 6, 4: 5, 5: 1, 6: 1 },
    "equations-complex-algebraic-fractions": { 1: 1, 2: 6, 3: 6, 4: 4, 5: 2, 6: 1 },
  };

  for (const slug of targetSlugs) {
    const lessonRows = rows.filter((row) => row.subtopic_slug === slug);
    const distribution = Object.fromEntries(
      [1, 2, 3, 4, 5, 6].map((difficulty) => [
        difficulty,
        lessonRows.filter((row) => row.difficulty === difficulty).length,
      ]),
    );
    assert.deepEqual(distribution, expectedDistributions[slug]);
  }
});

test("audited Year 10 equation questions remain markable and diagnostically complete", () => {
  const { rows } = auditedRows();

  for (const row of rows) {
    assert.ok(row.prompt.length >= 10, `${row.source_id} has an underspecified prompt`);
    assert.ok((row.hint ?? "").length >= 35, `${row.source_id} needs a specific hint`);
    assert.ok((row.explanation ?? "").length >= 55, `${row.source_id} needs a worked explanation`);

    if (row.choices) {
      assert.equal(row.choices.length, 4, `${row.source_id} must have four choices`);
      assert.equal(
        new Set(row.choices.map((choice) => choice.text)).size,
        4,
        `${row.source_id} has duplicate distractors`,
      );
      assert.ok(
        row.choices.some((choice) => choice.label === row.answer),
        `${row.source_id} has an invalid answer key`,
      );
    } else if (!row.question_parts?.length) {
      assert.ok(row.accepted_answers.length > 0, `${row.source_id} needs accepted answer forms`);
    }
  }
});

test("complex-fraction audit retains variable denominators and excluded-value reasoning", () => {
  const { rows } = auditedRows();
  const byId = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(byId.get("y10-ecf-i3")?.answer, "29/3");
  assert.equal(byId.get("y10-ecf-m6")?.answer, "8/3");
  assert.equal(byId.get("y10-ecf-m7")?.answer, "D");
  assert.match(byId.get("y10-ecf-m7")?.explanation ?? "", /excluded|no valid solution/i);
  assert.match(byId.get("y10-ecf-m9")?.prompt ?? "", /x-1/);
  assert.match(byId.get("y10-ecf-m10")?.explanation ?? "", /a=b=3\/2/);

  const variableDenominatorRows = rows.filter(
    (row) =>
      row.subtopic_slug === "equations-complex-algebraic-fractions" &&
      /\\dfrac|\\frac/.test(`${row.prompt} ${row.latex ?? ""}`) &&
      /x[-+]\d/.test(`${row.prompt} ${row.latex ?? ""}`),
  );
  assert.ok(variableDenominatorRows.length >= 6);
});

test("critical model, boundary and parameter answers do not regress", () => {
  const { rows } = auditedRows();
  const byId = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(byId.get("lin-m5")?.answer, "B");
  assert.equal(byId.get("lin-m8")?.answer, "D");
  assert.equal(byId.get("lin-m9")?.answer, "A");
  assert.equal(byId.get("lin-m10")?.answer, "B");
  assert.equal(byId.get("ineq-m5")?.answer, "B");
  assert.equal(byId.get("ineq-m8")?.answer, "x < 1/9");
  assert.equal(byId.get("ineq-m10")?.answer, "D");
});

test("each audited lesson has one sustained synoptic D6 question", () => {
  const { rows } = auditedRows();
  const d6Rows = rows.filter((row) => row.difficulty === 6);

  assert.deepEqual(
    d6Rows.map((row) => row.source_id),
    ["lin-mp-d6-1", "ineq-mp-d6-1", "y10-ecf-mp-d6-1"],
  );

  for (const slug of targetSlugs) {
    const row = d6Rows.find((candidate) => candidate.subtopic_slug === slug);
    assert.ok(row, `${slug} is missing its D6 question`);
    const parts = row.question_parts as Array<{
      answer?: unknown;
      hint?: unknown;
      explanation?: unknown;
    }> | null;
    assert.ok((parts?.length ?? 0) >= 4, `${row.source_id} is not sustained`);
    assert.ok(
      parts?.every(
        (part) =>
          typeof part.answer === "string" &&
          part.answer.length > 0 &&
          typeof part.hint === "string" &&
          part.hint.length >= 30 &&
          typeof part.explanation === "string" &&
          part.explanation.length >= 55,
      ),
      `${row.source_id} has an incomplete auto-markable part`,
    );
  }

  assert.equal(d6Rows.find((row) => row.source_id === "lin-mp-d6-1")?.answer, "90%");
  assert.equal(d6Rows.find((row) => row.source_id === "ineq-mp-d6-1")?.answer, "19");
  assert.equal(d6Rows.find((row) => row.source_id === "y10-ecf-mp-d6-1")?.answer, "1/3");
});
