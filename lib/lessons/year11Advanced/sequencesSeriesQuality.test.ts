import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonConfigs = [
  { slug: "arithmetic-sequences", pattern: /^y11adv-seq-arith-qm\d+$/ },
  { slug: "geometric-sequences", pattern: /^y11adv-seq-geo-qm\d+$/ },
  {
    slug: "arithmetic-series-sigma-notation",
    pattern: /^y11adv-seq-aseries-qm\d+$/,
  },
  {
    slug: "geometric-series-limiting-sums",
    pattern: /^y11adv-seq-gseries-qm\d+$/,
  },
  {
    slug: "sequences-series-exam-practice",
    pattern: /^y11adv-seq-exam-qm\d+$/,
  },
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
  return getNewCourseUnitLessons("year-11-advanced", "sequences-series");
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

test("Sequences and Series mastery sets meet the rich-task profile", () => {
  const completed = lessons();
  assert.equal(completed.length, lessonConfigs.length);

  for (const lesson of completed) {
    const questions = lesson.masteryQuiz as QualityQuestion[];
    const difficultyCounts = new Map<number, number>();
    const taskTypes = new Set<string>();
    let multipleChoiceCount = 0;

    assert.equal(questions.length, 10, `${lesson.slug} needs ten mastery tasks`);
    for (const question of questions) {
      difficultyCounts.set(
        question.difficulty ?? 0,
        (difficultyCounts.get(question.difficulty ?? 0) ?? 0) + 1,
      );
      assert.ok((question.explanation?.length ?? 0) >= 100, question.id);
      assert.ok((question.hint?.length ?? 0) >= 35, question.id);
      assert.ok((question.diagnosticIntent?.length ?? 0) >= 45, question.id);
      assert.ok(question.taskType, `${question.id} needs a task type`);
      taskTypes.add(question.taskType!);

      if (question.choices) {
        multipleChoiceCount += 1;
        assert.equal(
          new Set(question.choices.map(({ text }) => normalise(text))).size,
          4,
          `${question.id} needs four distinct choices`,
        );
        for (const { label } of question.choices) {
          if (label !== question.answer) {
            assert.ok(
              question.distractorMisconceptions?.[
                label as "A" | "B" | "C" | "D"
              ],
              `${question.id} needs a mapping for ${label}`,
            );
          }
        }
      } else {
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          `${question.id} needs an answer variant`,
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

test("Sequences and Series authored difficulty survives question-bank mapping", () => {
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

test("Sequences and Series practice is unique and operationally complete", () => {
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
        `${question.id} needs explanatory feedback`,
      );
      if (!question.choices) {
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          `${question.id} needs a legitimate answer variant`,
        );
      }
      const key = normalise(`${question.prompt} ${question.latex}`);
      assert.ok(key.length >= 24, `${question.id} needs a substantive stimulus`);
      assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
      seen.set(key, question.id);
    }
  }
});

test("Sequences and Series visuals and critical mathematical keys do not regress", () => {
  const allQuestions = lessons().flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ]);
  const byId = new Map(allQuestions.map((question) => [question.id, question]));
  const newVisuals = allQuestions.filter(
    (question) =>
      /^y11adv-seq-.+-qm\d+$/.test(question.id) && question.cartesianGraph,
  );

  assert.equal(newVisuals.length, 3);
  assert.ok(
    newVisuals.every(
      (question) => (question.cartesianGraph?.description.length ?? 0) >= 30,
    ),
  );
  assert.equal(byId.get("y11adv-seq-arith-qm8")?.answer, "a=2, d=3");
  assert.equal(
    byId.get("y11adv-seq-geo-qm6")?.answer,
    "a=800, r=1/2, T_10=25/16",
  );
  assert.match(byId.get("y11adv-seq-aseries-qm10")?.answer ?? "", /30th.*315/);
  assert.equal(
    byId.get("y11adv-seq-geo-qm10")?.answer,
    "2, 4, 8, 16, 32, 64; total 126",
  );
  assert.equal(byId.get("y11adv-seq-gseries-qm10")?.answer, "a=15, r=1/2");
  assert.equal(byId.get("y11adv-seq-exam-qm8")?.answer, "week 16");
});
