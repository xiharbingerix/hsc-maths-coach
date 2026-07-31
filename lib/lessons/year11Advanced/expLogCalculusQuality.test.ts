import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const completedLessonConfigs = [
  {
    slug: "differentiating-exponential-functions",
    masteryIdPattern: /^y11adv-elc-de-qm\d+$/,
  },
  {
    slug: "differentiating-logarithmic-functions",
    masteryIdPattern: /^y11adv-elc-dl-qm\d+$/,
  },
  {
    slug: "integrating-exponential-functions",
    masteryIdPattern: /^y11adv-elc-ie-qm\d+$/,
  },
  {
    slug: "integrating-reciprocal-functions",
    masteryIdPattern: /^y11adv-elc-ir-qm\d+$/,
  },
  {
    slug: "applications-exp-log-calculus",
    masteryIdPattern: /^y11adv-elc-ap-qm\d+$/,
  },
  {
    slug: "exp-log-calculus-exam-practice",
    masteryIdPattern: /^y11adv-elc-ex-qm\d+$/,
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

function completedLessons() {
  const slugs = new Set(completedLessonConfigs.map(({ slug }) => slug));
  return getNewCourseUnitLessons("year-11-advanced", "exp-log-calculus").filter(
    (lesson) => slugs.has(lesson.slug as (typeof completedLessonConfigs)[number]["slug"]),
  );
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

test("completed Exponential and Logarithmic Calculus mastery sets meet the rich-task profile", () => {
  const lessons = completedLessons();
  assert.equal(lessons.length, completedLessonConfigs.length);

  for (const lesson of lessons) {
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

test("completed Exponential and Logarithmic Calculus authored difficulty survives mapping", () => {
  const allRows = collectAllQuestions(["year-11-advanced"]).rows;
  for (const config of completedLessonConfigs) {
    const rows = allRows.filter((row) => config.masteryIdPattern.test(row.source_id));
    const counts = rows.reduce<Record<number, number>>((result, row) => {
      result[row.difficulty] = (result[row.difficulty] ?? 0) + 1;
      return result;
    }, {});
    assert.equal(rows.length, 10, config.slug);
    assert.deepEqual(counts, { 3: 4, 4: 3, 5: 3 }, config.slug);
  }
});

test("completed Exponential and Logarithmic Calculus practice is unique and operationally complete", () => {
  const seen = new Map<string, string>();
  for (const lesson of completedLessons()) {
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
