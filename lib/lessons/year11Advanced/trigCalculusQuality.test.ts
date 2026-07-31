import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonConfigs = [
  { slug: "differentiating-sin-cos", pattern: /^y11adv-tc-ds-qm\d+$/ },
  { slug: "differentiating-trig-chain-rule", pattern: /^y11adv-tc-dc-qm\d+$/ },
  { slug: "integrating-sin-cos", pattern: /^y11adv-tc-is-qm\d+$/ },
  { slug: "integrating-trig-chain-rule", pattern: /^y11adv-tc-ic-qm\d+$/ },
  { slug: "applications-trig-calculus", pattern: /^y11adv-tc-at-qm\d+$/ },
  { slug: "trig-calculus-exam-practice", pattern: /^y11adv-tc-ex-qm\d+$/ },
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
  const slugs = new Set(lessonConfigs.map(({ slug }) => slug));
  return getNewCourseUnitLessons("year-11-advanced", "trig-calculus").filter(
    (lesson) => slugs.has(lesson.slug as (typeof lessonConfigs)[number]["slug"]),
  );
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

test("Trigonometric Calculus mastery sets meet the rich-task profile", () => {
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

test("Trigonometric Calculus authored difficulty survives question-bank mapping", () => {
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

test("Trigonometric Calculus practice is unique and operationally complete", () => {
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
