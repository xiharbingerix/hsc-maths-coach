import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonSlugs = [
  "transformations-polynomial-reciprocal-graphs",
  "function-translations-general",
  "function-dilations-reflections",
  "circles-completing-the-square",
  "graph-transformations-exam-practice",
] as const;

type QualityQuestion = PracticeQuestion & {
  diagnosticIntent?: string;
  taskType?: "procedural" | "problem-solving" | "analytical" | "synthesis";
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function graphTransformationLessons() {
  const selected = new Set<string>(lessonSlugs);
  return getNewCourseUnitLessons("year-11-advanced", "graph-transformations")
    .filter((lesson) => selected.has(lesson.slug));
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[−–—]/g, "-")
    .trim();
}

test("Graph Transformations mastery sets meet the authored quality profile", () => {
  const lessons = graphTransformationLessons();
  assert.equal(lessons.length, lessonSlugs.length);

  for (const lesson of lessons) {
    const questions = lesson.masteryQuiz as QualityQuestion[];
    assert.equal(questions.length, 10, `${lesson.slug} needs ten mastery tasks`);

    const difficultyCounts = new Map<number, number>();
    const taskTypes = new Set<string>();
    let multipleChoiceCount = 0;

    for (const question of questions) {
      difficultyCounts.set(
        question.difficulty ?? 0,
        (difficultyCounts.get(question.difficulty ?? 0) ?? 0) + 1,
      );
      assert.ok(
        (question.explanation?.length ?? 0) >= 100,
        `${question.id} needs a worked explanation`,
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
          `${question.id} needs a misconception mapping for every distractor`,
        );
      } else {
        assert.ok(
          question.acceptedAnswers?.includes(question.answer),
          `${question.id} must accept its canonical answer`,
        );
      }
    }

    assert.deepEqual(
      Object.fromEntries([...difficultyCounts].sort()),
      { 3: 4, 4: 3, 5: 3 },
      `${lesson.slug} needs a deliberate D3-D5 ramp`,
    );
    assert.ok(
      multipleChoiceCount >= 2 && multipleChoiceCount <= 3,
      `${lesson.slug} should use selected-response only where distractors diagnose`,
    );
    assert.ok(
      taskTypes.size >= 3 && taskTypes.has("synthesis"),
      `${lesson.slug} needs diverse task types including synthesis`,
    );
  }
});

test("Graph Transformations authored difficulty survives question-bank mapping", () => {
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-gt-(?:trans|dil|poly|exam|circles)-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 50);
  for (const prefix of ["trans", "dil", "poly", "exam", "circles"]) {
    const lessonRows = rows.filter((row) =>
      row.source_id.startsWith(`y11adv-gt-${prefix}-qm`),
    );
    const counts = lessonRows.reduce<Record<number, number>>((result, row) => {
      result[row.difficulty] = (result[row.difficulty] ?? 0) + 1;
      return result;
    }, {});
    assert.deepEqual(counts, { 3: 4, 4: 3, 5: 3 }, prefix);
  }
});

test("Graph Transformations mastery stimuli are unique and self-contained", () => {
  const questions = graphTransformationLessons().flatMap(
    (lesson) => lesson.masteryQuiz,
  );
  const seen = new Map<string, string>();
  const unsupportedVisualReference =
    /\b(displayed|shown|diagram|plot|graph|table|triangle|sector|curve sketch)\b/i;

  for (const question of questions) {
    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(key.length >= 40, `${question.id} needs a substantive stimulus`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
    assert.doesNotMatch(
      question.prompt,
      unsupportedVisualReference,
      `${question.id} refers to an absent visual`,
    );
  }
});

test("Graph Transformations standard practice has no shallow feedback or repeats", () => {
  const questions = graphTransformationLessons().flatMap((lesson) => [
    ...lesson.guidedPractice,
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
  ]);
  const seen = new Map<string, string>();

  assert.equal(questions.length, 95);
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
        `${question.id} needs a legitimate variant beyond its canonical answer`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});
