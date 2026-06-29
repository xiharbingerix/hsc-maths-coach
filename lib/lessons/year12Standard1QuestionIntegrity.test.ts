import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../scripts/seed-question-bank";

test("Year 12 Standard 1 questions have clean answers and correctly-fired explanations", () => {
  const { rows, warnings } = collectAllQuestions(["year-12-standard-1"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.ok(rows.length > 1000, `expected the full Y12 Std 1 bank, got ${rows.length}`);

  for (const row of rows) {
    // The old "audit-friendly" decoration produced garbled primary answers such
    // as "amount is 500", "angle is 35" (on a height!), "value is 14", "result
    // is 10". None of these prefixes should ever reach a student.
    assert.doesNotMatch(
      row.answer,
      /^(?:amount|result|value|angle)\s+is\b/i,
      `${row.source_id} has a garbled decorated answer: "${row.answer}"`
    );

    // The "mode" explanation template used to fire on the word "model" (scale
    // model, quadratic model). It must only appear for a genuine mode question.
    if (/occurs most often/i.test(row.explanation)) {
      assert.match(
        row.prompt,
        /\bmode\b/i,
        `${row.source_id} got a mode explanation but is not a mode question`
      );
    }

    // The "range" template must only fire when the answer is the numeric range
    // (it used to misfire on "data in the range x = 0 to 20"). MCQ answers are
    // letter labels, so this short-answer check is gated to non-MCQ rows.
    if (
      !row.choices?.length &&
      /^Range = highest value - lowest value/i.test(row.explanation)
    ) {
      assert.match(
        row.answer,
        /^-?\d/,
        `${row.source_id} got a range explanation with a non-numeric answer`
      );
    }

    // Currency in prose is kept as a plain "$" (e.g. "A TV costs $960"); the
    // MathText renderer recognises "$" + digit as currency, so the content must
    // NOT carry "\$" escapes (those rendered a literal backslash on the page).
    assert.doesNotMatch(
      row.prompt,
      /\\\$/,
      `${row.source_id} prompt has a stray "\\$" escape: "${row.prompt}"`
    );

    // The $$...$$ block under a question only ever showed the worked method, a
    // substituted formula, an answer-revealing comparison, or an instruction -
    // all giveaways. The prompts are self-contained, so no row keeps any latex.
    assert.ok(
      !row.latex,
      `${row.source_id} still carries a latex giveaway: ${JSON.stringify(row.latex)}`
    );

    // A prose answer must never be flattened into a space-stripped accepted
    // variant such as "Yessurplus450leaves50..." or "numberofabsences".
    if ((row.answer.match(/[A-Za-z]{3,}/g) ?? []).length >= 2) {
      const stripped = row.answer.replace(/\s+/g, "");
      for (const accepted of row.accepted_answers ?? []) {
        assert.notEqual(
          accepted,
          stripped,
          `${row.source_id} kept a space-stripped prose answer: "${accepted}"`
        );
      }
    }

    // Any "Mean = a / b = c" template must show arithmetic that matches the
    // answer (the old code printed e.g. "13 / 9 = 32").
    const meanMatch = row.explanation.match(
      /Mean = (?:total|sum of values) \/ number of values = (-?\d+(?:\.\d+)?) \/ (-?\d+(?:\.\d+)?) = (-?\d+(?:\.\d+)?)/i
    );
    if (meanMatch) {
      const [, aText, bText, cText] = meanMatch;
      const a = Number(aText);
      const b = Number(bText);
      const c = Number(cText);
      assert.ok(
        Math.abs(a / b - c) < 0.01,
        `${row.source_id} shows incorrect mean arithmetic: ${aText} / ${bText} ≠ ${cText}`
      );
    }
  }

  // Spot-checks on questions that were previously broken in the export.
  const closingBalance = rowsById.get("y12s1-ccs-m1");
  assert.ok(closingBalance);
  assert.equal(closingBalance.answer, "500");

  const trigHeight = rowsById.get("y12s1-y12s1-trig-exam-i1");
  assert.ok(trigHeight);
  assert.equal(trigHeight.answer, "35 m");

  // Currency stays a plain "$" (renderer handles it); the answer-revealing
  // arithmetic latex is stripped.
  const financePlan = rowsById.get("y12s1-fin-plan-g1");
  assert.ok(financePlan);
  assert.match(financePlan.prompt, /\$960/);
  assert.match(financePlan.prompt, /\$160/);
  assert.doesNotMatch(financePlan.prompt, /\\\$/);
  assert.ok(!financePlan.latex, `expected no giveaway latex, got ${JSON.stringify(financePlan.latex)}`);

  // "A model car is 15 cm long…" used to get a "mode" explanation because
  // /mode/i matched "model". It should now get a scale explanation.
  const scaleModel = rowsById.get("y12s1-scale-i2");
  assert.ok(scaleModel);
  assert.doesNotMatch(scaleModel.explanation, /occurs most often/i);
  assert.match(scaleModel.explanation, /scale/i);
});
