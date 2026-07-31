import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonConfigs = [
  { slug: "function-notation-domain-range", pattern: /^y11adv-fn-qm\d+$/ },
  { slug: "linear-quadratic-cubic-functions", pattern: /^y11adv-lqc-qm\d+$/ },
  { slug: "polynomial-reciprocal-functions", pattern: /^y11adv-poly-qm\d+$/ },
  { slug: "absolute-value-functions", pattern: /^y11adv-abs-qm\d+$/ },
  { slug: "odd-even-functions", pattern: /^y11adv-sym-qm\d+$/ },
  { slug: "algebraic-techniques", pattern: /^y11adv-alg-qm\d+$/ },
  { slug: "quadratic-equations-discriminant", pattern: /^y11adv-quad-qm\d+$/ },
  { slug: "linear-functions", pattern: /^y11adv-lin-qm\d+$/ },
  { slug: "constructing-using-functions", pattern: /^y11adv-model-qm\d+$/ },
  { slug: "direct-inverse-variation", pattern: /^y11adv-var-qm\d+$/ },
  { slug: "circles-semicircles", pattern: /^y11adv-cir-qm\d+$/ },
  { slug: "piecewise-defined-functions", pattern: /^y11adv-piece-qm\d+$/ },
  { slug: "composite-functions", pattern: /^y11adv-comp-qm\d+$/ },
  { slug: "completing-the-square", pattern: /^y11adv-cts-qm\d+$/ },
  { slug: "quadratic-inequalities", pattern: /^y11adv-qi-qm\d+$/ },
  { slug: "working-with-functions-exam-practice", pattern: /^y11adv-func-exam-qm\d+$/ },
] as const;

type QualityQuestion = PracticeQuestion & {
  diagnosticIntent?: string;
  taskType?:
    | "procedural"
    | "problem-solving"
    | "analytical"
    | "investigative"
    | "synthesis";
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

function lessons() {
  return getNewCourseUnitLessons(
    "year-11-advanced",
    "working-with-functions",
  );
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

test("Working with Functions mastery sets meet the rich-task profile", () => {
  const completed = lessons();
  assert.equal(completed.length, lessonConfigs.length);

  for (const lesson of completed) {
    const questions = lesson.masteryQuiz as QualityQuestion[];
    const difficultyCounts = new Map<number, number>();
    const taskTypes = new Set<string>();
    let multipleChoiceCount = 0;

    assert.equal(questions.length, 10, lesson.slug + " needs ten mastery tasks");
    for (const question of questions) {
      difficultyCounts.set(
        question.difficulty ?? 0,
        (difficultyCounts.get(question.difficulty ?? 0) ?? 0) + 1,
      );
      assert.ok((question.explanation?.length ?? 0) >= 100, question.id);
      assert.ok((question.hint?.length ?? 0) >= 35, question.id);
      assert.ok((question.diagnosticIntent?.length ?? 0) >= 45, question.id);
      assert.ok(question.taskType, question.id + " needs a task type");
      taskTypes.add(question.taskType!);

      if (question.choices) {
        multipleChoiceCount += 1;
        assert.equal(
          new Set(question.choices.map(({ text }) => normalise(text))).size,
          4,
          question.id + " needs four distinct choices",
        );
        for (const { label } of question.choices) {
          if (label !== question.answer) {
            assert.ok(
              question.distractorMisconceptions?.[
                label as "A" | "B" | "C" | "D"
              ],
              question.id + " needs a mapping for " + label,
            );
          }
        }
      } else {
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          question.id + " needs an answer variant",
        );
      }
    }

    assert.deepEqual(
      Object.fromEntries(difficultyCounts),
      { 3: 4, 4: 3, 5: 3 },
      lesson.slug,
    );
    assert.equal(multipleChoiceCount, 3, lesson.slug);
    assert.deepEqual(
      [...taskTypes].sort(),
      [
        "analytical",
        "investigative",
        "problem-solving",
        "procedural",
        "synthesis",
      ],
      lesson.slug,
    );
  }
});

test("Working with Functions authored difficulty survives question-bank mapping", () => {
  const allRows = collectAllQuestions(["year-11-advanced"]).rows;
  for (const config of lessonConfigs) {
    const rows = allRows.filter((row) => config.pattern.test(row.source_id));
    const counts = rows.reduce<Record<number, number>>((result, row) => {
      result[row.difficulty] = (result[row.difficulty] ?? 0) + 1;
      return result;
    }, {});
    assert.equal(rows.length, 10, config.slug);
    assert.deepEqual(counts, { 3: 4, 4: 3, 5: 3 }, config.slug);
  }
});

test("Working with Functions practice is unique and operationally complete", () => {
  const seen = new Map<string, string>();
  for (const lesson of lessons()) {
    const questions = [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
    ];
    assert.equal(questions.length, 19, lesson.slug);
    for (const question of questions) {
      assert.ok(
        (question.explanation?.length ?? 0) >= 40,
        question.id + " needs explanatory feedback",
      );
      if (!question.choices) {
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          question.id + " needs a legitimate answer variant",
        );
      }
      const key = normalise(question.prompt + " " + question.latex);
      assert.ok(key.length >= 24, question.id + " needs a substantive stimulus");
      assert.ok(!seen.has(key), question.id + " duplicates " + seen.get(key));
      seen.set(key, question.id);
    }
  }
});

test("Working with Functions remediation preserves corrected mathematical keys", () => {
  const byId = new Map(
    lessons()
      .flatMap((lesson) => lesson.masteryQuiz)
      .map((question) => [question.id, question]),
  );

  assert.equal(byId.get("y11adv-fn-qm1")?.answer, "14");
  assert.equal(byId.get("y11adv-sym-qm8")?.answer, "4");
  assert.equal(byId.get("y11adv-cir-qm10")?.answer, "sqrt(13)");
  assert.equal(byId.get("y11adv-piece-qm10")?.answer, "no solution");
  assert.equal(byId.get("y11adv-qi-qm10")?.answer, "[-1,2]");
});
