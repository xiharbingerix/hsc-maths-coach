import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

const lessonConfigs = [
  { slug: "scatter-plots-correlation", pattern: /^y11adv-bd-sc-qm\d+$/ },
  { slug: "line-of-best-fit", pattern: /^y11adv-bd-lf-qm\d+$/ },
  { slug: "interpolation-extrapolation", pattern: /^y11adv-bd-ie-qm\d+$/ },
  { slug: "data-transformation", pattern: /^y11adv-bd-dt-qm\d+$/ },
  { slug: "bivariate-data-exam-practice", pattern: /^y11adv-bd-ex-qm\d+$/ },
] as const;

type QualityQuestion = PracticeQuestion & {
  diagnosticIntent?: string;
  taskType?: "procedural" | "problem-solving" | "analytical" | "investigative" | "synthesis";
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

function lessons() {
  return getNewCourseUnitLessons("year-11-advanced", "bivariate-data");
}

function normalise(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").replace(/[\u2212\u2013\u2014]/g, "-").trim();
}

test("Bivariate Data mastery sets meet the rich-task profile", () => {
  const completed = lessons();
  assert.equal(completed.length, lessonConfigs.length);

  for (const lesson of completed) {
    const questions = lesson.masteryQuiz as QualityQuestion[];
    const difficultyCounts = new Map<number, number>();
    const taskTypes = new Set<string>();
    let multipleChoiceCount = 0;

    assert.equal(questions.length, 10, `${lesson.slug} needs ten mastery tasks`);
    for (const question of questions) {
      difficultyCounts.set(question.difficulty ?? 0, (difficultyCounts.get(question.difficulty ?? 0) ?? 0) + 1);
      assert.ok((question.explanation?.length ?? 0) >= 100, `${question.id} needs worked feedback`);
      assert.ok((question.hint?.length ?? 0) >= 35, `${question.id} needs a useful hint`);
      assert.ok((question.diagnosticIntent?.length ?? 0) >= 45, `${question.id} needs diagnostic intent`);
      assert.ok(question.taskType, `${question.id} needs a task type`);
      taskTypes.add(question.taskType!);
      if (question.choices) {
        multipleChoiceCount += 1;
        assert.equal(new Set(question.choices.map(({ text }) => normalise(text))).size, 4, `${question.id} needs distinct choices`);
        for (const { label } of question.choices) {
          if (label !== question.answer) {
            assert.ok(question.distractorMisconceptions?.[label as "A" | "B" | "C" | "D"], `${question.id} needs a mapping for ${label}`);
          }
        }
      } else {
        assert.ok(question.acceptedAnswers?.some((candidate) => candidate.trim() !== question.answer.trim()), `${question.id} needs an answer variant`);
      }
    }
    assert.deepEqual(Object.fromEntries(difficultyCounts), { 3: 4, 4: 3, 5: 3 }, lesson.slug);
    assert.equal(multipleChoiceCount, 3, lesson.slug);
    assert.deepEqual([...taskTypes].sort(), ["analytical", "investigative", "problem-solving", "procedural", "synthesis"], lesson.slug);
  }
});

test("Bivariate Data authored difficulty survives question-bank mapping", () => {
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

test("Bivariate Data practice is unique and operationally complete", () => {
  const seen = new Map<string, string>();
  for (const lesson of lessons()) {
    const questions = [...lesson.guidedPractice, ...lesson.independentPractice, ...lesson.masteryQuiz];
    assert.equal(questions.length, 19, lesson.slug);
    for (const question of questions) {
      assert.ok((question.explanation?.length ?? 0) >= 40, `${question.id} needs explanatory feedback`);
      if (!question.choices) {
        assert.ok(question.acceptedAnswers?.some((candidate) => candidate.trim() !== question.answer.trim()), `${question.id} needs a legitimate answer variant`);
      }
      const key = normalise(`${question.prompt} ${question.latex}`);
      assert.ok(key.length >= 24, `${question.id} needs a substantive stimulus`);
      assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
      seen.set(key, question.id);
    }
  }
});

test("Bivariate Data visuals and critical mathematical keys do not regress", () => {
  const allQuestions = lessons().flatMap((lesson) => [...lesson.guidedPractice, ...lesson.independentPractice, ...lesson.masteryQuiz]);
  const byId = new Map(allQuestions.map((question) => [question.id, question]));
  const newVisuals = allQuestions.filter((question) => /^y11adv-bd-.+-qm\d+$/.test(question.id) && (question.scatterPlotDiagram || question.dataTableDiagram));
  assert.equal(newVisuals.length, 8);
  assert.ok(newVisuals.every((question) => ((question.scatterPlotDiagram ?? question.dataTableDiagram)?.description.length ?? 0) >= 30));
  assert.match(byId.get("y11adv-bd-lf-i1")?.answer ?? "", /32.*1\.2x/);
  assert.match(byId.get("y11adv-bd-lf-i5")?.answer ?? "", /0\.5.*2\.7x/);
  assert.match(byId.get("y11adv-bd-ex-i2")?.answer ?? "", /32\.08.*3\.52x/);
  assert.match(byId.get("y11adv-bd-lf-qm10")?.answer ?? "", /70-2x.*46.*-2/);
  assert.match(byId.get("y11adv-bd-dt-qm8")?.answer ?? "", /2\(3\^x\).*162/);
  assert.match(byId.get("y11adv-bd-ex-qm10")?.answer ?? "", /16\+2\.4x.*49\.6.*8\.4/);
});
