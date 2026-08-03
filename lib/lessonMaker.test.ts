import assert from "node:assert/strict";
import test from "node:test";

import { generateTutorPlan } from "./lessonMaker";
import type { ExplicitLesson, PracticeQuestion } from "./lessons/differentialCalculus";
import type { LessonSyllabusScope } from "./syllabus/year9Nesa";

function question(id: string, difficulty: number): PracticeQuestion {
  return {
    id,
    difficulty,
    prompt: `Question ${id}`,
    latex: "",
    answer: String(difficulty),
    hint: `Hint ${difficulty}`,
    explanation: `Explanation ${difficulty}`,
  };
}

const fixture: ExplicitLesson = {
  id: "fixture",
  slug: "fixture",
  moduleSlug: "fixture-unit",
  moduleTitle: "Fixture unit",
  courseTitle: "Year 8 Mathematics",
  title: "Fixture lesson",
  description: "Fixture",
  syllabusArea: "Number",
  focus: "Testing",
  status: "active",
  video: { title: "", url: "" },
  learningIntention: "Use the method correctly.",
  successCriteria: ["Choose the method", "Show the working"],
  teaching: {
    paragraphs: ["Start with a familiar example, then connect it to the rule."],
    latexBlocks: ["a+b=b+a"],
  },
  workedExamples: [
    {
      title: "Example",
      questionLatex: "2+3",
      steps: [{ explanation: "Combine the two amounts.", latex: "2+3=5" }],
      finalAnswerLatex: "5",
    },
  ],
  guidedPractice: [question("g1", 1), question("g2", 2), question("g3", 3)],
  independentPractice: [
    question("i1", 1),
    question("i2", 2),
    question("i3", 3),
    question("i4", 4),
    question("i5", 5),
  ],
  commonMistakes: [{ mistake: "Guessing", fix: "Check each step." }],
  masteryQuiz: [question("m4", 4), question("m5", 5)],
  masteryPassMark: 1,
};

test("built-in plans include delivery mode and required differentiation for every level", () => {
  for (const deliveryMode of ["zoom", "classroom"] as const) {
    for (const level of ["level-1", "level-2", "level-3"] as const) {
      const plan = generateTutorPlan(fixture, {
        length: 45,
        level,
        deliveryMode,
      });

      assert.equal(plan.deliveryMode, deliveryMode);
      assert.equal(plan.level, level);
      assert.deepEqual(plan.successCriteria, fixture.successCriteria);
      assert.ok(plan.sections.some((section) => /scaffolding/i.test(section.heading)));
      assert.ok(
        plan.sections.some(
          (section) =>
            section.kind === "questions" &&
            section.heading ===
              `Independent Practice — ${level.replace("level-", "Level ")}`,
        ),
      );
    }
  }
});

test("independent practice changes quantity and difficulty by level", () => {
  const independentIds = (level: "level-1" | "level-2" | "level-3") => {
    const plan = generateTutorPlan(fixture, {
      length: 45,
      level,
      deliveryMode: "classroom",
    });
    const section = plan.sections.find(
      (candidate) => candidate.kind === "questions" && candidate.id === "independent-practice",
    );
    assert.ok(section?.kind === "questions");
    return section.questions.map((item) => item.id);
  };

  assert.deepEqual(independentIds("level-1"), ["i1", "i2", "i3"]);
  assert.deepEqual(independentIds("level-2"), ["i1", "i2", "i3", "i4"]);
  assert.deepEqual(independentIds("level-3"), ["m5", "i5", "m4", "i4"]);
});

test("a selected NESA scope replaces broad criteria and is retained in the plan", () => {
  const syllabusScope: LessonSyllabusScope = {
    syllabus: "Mathematics K–10 Syllabus (2022)",
    authority: "NSW Education Standards Authority (NESA)",
    stage: "Stage 5",
    sourceUrl: "https://curriculum.nsw.edu.au/syllabuses/mathematics-k-10-2022",
    workingMathematically: {
      code: "MAO-WM-01",
      description: "develops understanding and fluency in mathematics",
    },
    outcomes: [
      {
        code: "MA5-FIN-C-01",
        description: "solves financial mathematics problems",
        classification: "core",
        focusAreas: [
          {
            id: "finance",
            title: "Financial mathematics A",
            sourceUrl: "https://curriculum.nsw.edu.au/",
            contentGroups: [
              {
                title: "Simple interest",
                contentPoints: [
                  {
                    code: "MA5-FIN-C-01-01",
                    text: "Apply the simple interest formula to solve problems",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const plan = generateTutorPlan(fixture, {
    length: 45,
    level: "level-1",
    deliveryMode: "classroom",
    syllabusScope,
  });

  assert.equal(plan.syllabusScope, syllabusScope);
  assert.deepEqual(plan.successCriteria, [
    "Apply the simple interest formula to solve problems",
  ]);
  const alignment = plan.sections.find(
    (section) => section.heading === "Selected NESA Syllabus Scope",
  );
  assert.ok(alignment?.kind === "criteria");
  assert.deepEqual(alignment.items, [
    "MA5-FIN-C-01: solves financial mathematics problems",
    "MA5-FIN-C-01-01: Apply the simple interest formula to solve problems",
  ]);
});
