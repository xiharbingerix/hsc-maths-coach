import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const completedLessonConfigs = [
  {
    slug: "trigonometric-equations",
    masteryIdPattern: /^y11adv-trig-eq-qm\d+$/,
  },
  {
    slug: "trigonometric-identities",
    masteryIdPattern: /^y11adv-trig-id-qm\d+$/,
  },
  {
    slug: "related-angle-identities",
    masteryIdPattern: /^y11adv-relang-qm\d+$/,
  },
  {
    slug: "complementary-angle-identities",
    masteryIdPattern: /^y11adv-cai-qm\d+$/,
  },
  {
    slug: "trig-equations-basic",
    masteryIdPattern: /^y11adv-trigeq-basic-qm\d+$/,
  },
  {
    slug: "trig-equations-advanced",
    masteryIdPattern: /^y11adv-trigeq-adv-qm\d+$/,
  },
  {
    slug: "trig-identities-proof-strategies",
    masteryIdPattern: /^y11adv-trigproof-qm\d+$/,
  },
  {
    slug: "reciprocal-trig-ratios",
    masteryIdPattern: /^y11adv-sec-qm\d+$/,
  },
  {
    slug: "trigonometric-identities-equations-exam-practice",
    masteryIdPattern: /^y11adv-trig-mixed-qm\d+$/,
  },
] as const;

const completedLessonSlugs = completedLessonConfigs.map(({ slug }) => slug);

type QualityQuestion = PracticeQuestion & {
  diagnosticIntent?: string;
  taskType?:
    | "procedural"
    | "problem-solving"
    | "analytical"
    | "investigative"
    | "synthesis";
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function completedLessons() {
  const selected = new Set<string>(completedLessonSlugs);
  return getNewCourseUnitLessons(
    "year-11-advanced",
    "trigonometric-identities-equations",
  ).filter((lesson) => selected.has(lesson.slug));
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
}

test("completed Trigonometric Identities and Equations mastery sets meet the rich-task profile", () => {
  const lessons = completedLessons();
  assert.equal(lessons.length, completedLessonSlugs.length);

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
      assert.ok(
        (question.explanation?.length ?? 0) >= 100,
        `${question.id} needs a question-specific worked explanation`,
      );
      assert.ok(
        (question.hint?.length ?? 0) >= 35,
        `${question.id} needs a useful first-step hint`,
      );
      assert.ok(
        (question.diagnosticIntent?.length ?? 0) >= 45,
        `${question.id} needs an explicit diagnostic purpose`,
      );
      assert.ok(question.taskType, `${question.id} needs a task classification`);
      taskTypes.add(question.taskType!);

      if (question.choices) {
        multipleChoiceCount += 1;
        assert.equal(question.choices.length, 4, `${question.id} needs four options`);
        assert.match(question.answer, /^[A-D]$/, `${question.id} needs a keyed label`);
        const wrongLabels = ["A", "B", "C", "D"].filter(
          (label) => label !== question.answer,
        );
        assert.deepEqual(
          Object.keys(question.distractorMisconceptions ?? {}).sort(),
          wrongLabels,
          `${question.id} needs one misconception mapping per distractor`,
        );
      } else {
        assert.ok(
          question.acceptedAnswers?.includes(question.answer),
          `${question.id} must accept its canonical answer`,
        );
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          `${question.id} needs a legitimate answer variant`,
        );
      }
    }

    assert.deepEqual(
      Object.fromEntries([...difficultyCounts].sort()),
      { 3: 4, 4: 3, 5: 3 },
      `${lesson.slug} needs a deliberate D3-D5 ramp`,
    );
    assert.equal(
      multipleChoiceCount,
      3,
      `${lesson.slug} should reserve three MCQs for misconception diagnosis`,
    );
    assert.deepEqual(
      [...taskTypes].sort(),
      [
        "analytical",
        "investigative",
        "problem-solving",
        "procedural",
        "synthesis",
      ],
      `${lesson.slug} needs all five bounded task types`,
    );
  }
});

test("completed Trigonometric Identities and Equations authored difficulty survives mapping", () => {
  const allRows = collectAllQuestions(["year-11-advanced"]).rows;

  for (const config of completedLessonConfigs) {
    const rows = allRows.filter((row) =>
      config.masteryIdPattern.test(row.source_id),
    );
    const counts = rows.reduce<Record<number, number>>((result, row) => {
      result[row.difficulty] = (result[row.difficulty] ?? 0) + 1;
      return result;
    }, {});

    assert.equal(rows.length, 10, config.slug);
    assert.deepEqual(counts, { 3: 4, 4: 3, 5: 3 }, config.slug);
  }
});

test("completed Trigonometric Identities and Equations practice is unique and operationally complete", () => {
  const lessons = completedLessons();
  const seen = new Map<string, string>();

  for (const lesson of lessons) {
    const questions = [
      ...lesson.guidedPractice,
      ...lesson.independentPractice,
      ...lesson.masteryQuiz,
    ];
    assert.equal(questions.length, 19, `${lesson.slug} needs 4 + 5 + 10 questions`);

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

test("Related-Angle Identities retains authored symmetry visuals", () => {
  const relatedAngles = completedLessons().find(
    (lesson) => lesson.slug === "related-angle-identities",
  );
  assert.ok(relatedAngles);
  const visualQuestions = relatedAngles.masteryQuiz.filter(
    (question) => question.unitCircleDiagram,
  );

  assert.ok(
    visualQuestions.length >= 3,
    "related-angle mastery needs at least three unit-circle symmetry stimuli",
  );
});

test("completed multipart tasks have worked feedback and answer variants", () => {
  for (const lesson of completedLessons()) {
    for (const question of lesson.multiPartPractice ?? []) {
      assert.ok(
        (question.explanation?.length ?? 0) >= 40,
        `${question.id} needs worked overall feedback`,
      );
      for (const part of question.parts ?? []) {
        assert.ok(
          (part.explanation?.length ?? 0) >= 40,
          `${question.id} ${part.key} needs worked feedback`,
        );
        assert.ok(
          part.acceptedAnswers?.some(
            (answer) => answer.trim() !== part.answer.trim(),
          ),
          `${question.id} ${part.key} needs a legitimate answer variant`,
        );
      }
    }
  }
});
