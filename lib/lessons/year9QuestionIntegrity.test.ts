import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../scripts/seed-question-bank";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../courseTypes";
import { year9FinancialMathematicsLessonOverride } from "./year9/financialMathematics";

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

test("Year 9 percentage and finance questions do not reveal their setup in latex", () => {
  const financeLessons = new Set([
    "percentages-and-money",
    "percentage-increase-decrease",
    "profits-and-discounts",
    "income",
    "payg-income-tax",
    "simple-interest",
    "compound-interest-depreciation",
    "compound-interest-formula",
  ]);

  for (const courseSlug of [
    "year-9-mathematics",
    "year-9-mathematics-core",
    "year-9-mathematics-advanced",
  ]) {
    const { rows } = collectAllQuestions([courseSlug]);
    const financeRows = rows.filter((row) => financeLessons.has(row.subtopic_slug));

    assert.ok(financeRows.length > 0, `${courseSlug} did not expose any finance questions`);
    for (const row of financeRows) {
      assert.ok(
        !row.latex,
        `${courseSlug}/${row.subtopic_slug}/${row.source_id} still has giveaway latex: ${JSON.stringify(row.latex)}`
      );
    }
  }
});

test("retired Year 9 financial lessons also remain free of question latex", () => {
  const course = {
    slug: "year-9-mathematics-core",
    title: "Year 9 Mathematics Core",
    yearLevel: "Year 9",
    courseType: "Mathematics Core",
    status: "available",
    description: "",
    positioning: "",
    units: [],
  } satisfies CoursePathwaySeed;
  const unit = {
    slug: "financial-mathematics",
    title: "Financial Mathematics",
    description: "",
    syllabusArea: "Number and Algebra",
    focus: "Financial mathematics",
    lessons: [],
  } satisfies CourseUnitSeed;
  const lessonSlugs = [
    "wages-and-earnings",
    "penalty-rates-overtime",
    "non-wage-earnings",
    "tax-and-net-earnings",
    "spending-and-budgets",
    "simple-interest",
    "deposits-and-repayments",
    "buy-now-pay-later-loans",
  ];

  for (const slug of lessonSlugs) {
    const lesson = { slug, title: slug } satisfies CourseLessonSeed;
    const content = year9FinancialMathematicsLessonOverride(course, unit, lesson);
    assert.ok(content, `missing retired financial lesson ${slug}`);

    const questions = [
      ...(content.guidedPractice ?? []),
      ...(content.independentPractice ?? []),
      ...(content.masteryQuiz ?? []),
      ...(content.masteryQuizPool ?? []),
      ...(content.multiPartPractice ?? []),
    ];
    assert.ok(questions.length > 0, `${slug} did not expose any questions`);
    for (const question of questions) {
      assert.ok(!question.latex, `${slug}/${question.id} still has question latex`);
    }
  }
});
