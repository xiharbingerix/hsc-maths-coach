import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonConfigs = [
  { slug: "data-displays-summary-statistics", pattern: /^y11adv-pd-data-qm\d+$/ },
  { slug: "probability-relative-frequency", pattern: /^y11adv-pd-prob-qm\d+$/ },
  { slug: "sets-venn-diagrams", pattern: /^y11adv-pd-sets-qm\d+$/ },
  {
    slug: "conditional-probability-independence",
    pattern: /^y11adv-pd-cond-qm\d+$/,
  },
  { slug: "discrete-random-variables", pattern: /^y11adv-pd-drv-qm\d+$/ },
  {
    slug: "expected-value-standard-deviation",
    pattern: /^y11adv-pd-ev-qm\d+$/,
  },
  { slug: "probability-data-exam-practice", pattern: /^y11adv-pd-exam-qm\d+$/ },
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
  return getNewCourseUnitLessons("year-11-advanced", "probability-data");
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

function visualDescription(question: PracticeQuestion) {
  return (
    question.boxPlotDiagram?.description ??
    question.dataTableDiagram?.description ??
    question.twoWayTableDiagram?.description ??
    question.vennDiagram?.description
  );
}

test("Probability and Data mastery sets meet the rich-task profile", () => {
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

test("Probability and Data authored difficulty survives question-bank mapping", () => {
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

test("Probability and Data practice is unique and operationally complete", () => {
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

test("Probability and Data visuals and critical mathematical keys do not regress", () => {
  const allQuestions = lessons().flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ]);
  const byId = new Map(allQuestions.map((question) => [question.id, question]));
  const newVisuals = allQuestions.filter(
    (question) => /^y11adv-pd-.+-qm\d+$/.test(question.id) && visualDescription(question),
  );

  assert.equal(newVisuals.length, 16);
  assert.ok(
    newVisuals.every((question) => (visualDescription(question)?.length ?? 0) >= 30),
  );
  assert.equal(
    byId.get("y11adv-pd-data-qm8")?.answer,
    "5, 8, 12, 15, 20",
  );
  assert.match(byId.get("y11adv-pd-prob-qm10")?.answer ?? "", /p=0\.4/);
  assert.match(byId.get("y11adv-pd-sets-qm10")?.answer ?? "", /P\(A\|B\)=1\/4/);
  assert.equal(byId.get("y11adv-pd-cond-qm8")?.answer, "4/13");
  assert.match(byId.get("y11adv-pd-drv-qm10")?.answer ?? "", /0\.1, 0\.2, 0\.3, 0\.4/);
  assert.equal(byId.get("y11adv-pd-ev-qm10")?.answer, "E(X)=0; SD(X)=8");
  assert.match(byId.get("y11adv-pd-exam-qm10")?.answer ?? "", /Var\(X\)=0\.29/);
});
