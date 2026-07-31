import assert from "node:assert/strict";
import test from "node:test";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { getNewCourseUnitLessons } from "../../newCourseCatalog";
import type { PracticeQuestion } from "../differentialCalculus";

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

function lesson(slug = "degrees-and-radians-concept") {
  const result = getNewCourseUnitLessons(
    "year-11-advanced",
    "trigonometry-measure-angles",
  ).find((candidate) => candidate.slug === slug);
  assert.ok(result);
  return result;
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[−–—]/g, "-")
    .trim();
}

test("Degrees and Radians mastery meets the rich-task quality profile", () => {
  const questions = lesson().masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
});

test("Degrees and Radians authored answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-rcon-qm1", "A"],
    ["y11adv-rcon-qm2", "pi/6"],
    ["y11adv-rcon-qm3", "B"],
    ["y11adv-rcon-qm4", "2"],
    ["y11adv-rcon-qm5", "14"],
    ["y11adv-rcon-qm6", "C"],
    ["y11adv-rcon-qm7", "negative y-axis"],
    ["y11adv-rcon-qm8", "2"],
    ["y11adv-rcon-qm9", "Quadrant III"],
    ["y11adv-rcon-qm10", "11pi/6"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-rcon-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Degrees and Radians standard practice is unique and operationally complete", () => {
  const current = lesson();
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Converting Degrees to Radians mastery meets the rich-task quality profile", () => {
  const questions = lesson("converting-degrees-radians")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
});

test("Converting Degrees to Radians answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-d2r-qm1", "A"],
    ["y11adv-d2r-qm2", "2pi/5"],
    ["y11adv-d2r-qm3", "A"],
    ["y11adv-d2r-qm4", "11pi/4"],
    ["y11adv-d2r-qm5", "84"],
    ["y11adv-d2r-qm6", "C"],
    ["y11adv-d2r-qm7", "35pi/12"],
    ["y11adv-d2r-qm8", "4"],
    ["y11adv-d2r-qm9", "10pi"],
    ["y11adv-d2r-qm10", "150"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-d2r-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Converting Degrees to Radians practice is unique and operationally complete", () => {
  const current = lesson("converting-degrees-radians");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Converting Radians to Degrees mastery meets the rich-task quality profile", () => {
  const questions = lesson("converting-radians-degrees")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
});

test("Converting Radians to Degrees answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-r2d-qm1", "A"],
    ["y11adv-r2d-qm2", "234"],
    ["y11adv-r2d-qm3", "A"],
    ["y11adv-r2d-qm4", "510"],
    ["y11adv-r2d-qm5", "21"],
    ["y11adv-r2d-qm6", "C"],
    ["y11adv-r2d-qm7", "190"],
    ["y11adv-r2d-qm8", "11"],
    ["y11adv-r2d-qm9", "645"],
    ["y11adv-r2d-qm10", "3pi/2"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-r2d-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Converting Radians to Degrees practice is unique and operationally complete", () => {
  const current = lesson("converting-radians-degrees");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Arc Length mastery meets the rich-task quality profile", () => {
  const questions = lesson("arc-length-radian-measure")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
});

test("Arc Length answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-alen-qm1", "B"],
    ["y11adv-alen-qm2", "9"],
    ["y11adv-alen-qm3", "C"],
    ["y11adv-alen-qm4", "90"],
    ["y11adv-alen-qm5", "18"],
    ["y11adv-alen-qm6", "C"],
    ["y11adv-alen-qm7", "150"],
    ["y11adv-alen-qm8", "5"],
    ["y11adv-alen-qm9", "-37pi/50"],
    ["y11adv-alen-qm10", "8"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-alen-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Arc Length practice is unique and operationally complete", () => {
  const current = lesson("arc-length-radian-measure");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Sector Area mastery meets the rich-task quality profile", () => {
  const questions = lesson("sector-area-radian-measure")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
});

test("Sector Area answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-sarea-qm1", "B"],
    ["y11adv-sarea-qm2", "7"],
    ["y11adv-sarea-qm3", "C"],
    ["y11adv-sarea-qm4", "8+3pi"],
    ["y11adv-sarea-qm5", "6"],
    ["y11adv-sarea-qm6", "C"],
    ["y11adv-sarea-qm7", "20+2pi"],
    ["y11adv-sarea-qm8", "5"],
    ["y11adv-sarea-qm9", "51pi/320"],
    ["y11adv-sarea-qm10", "10"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-sarea-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Sector Area practice and multipart task are operationally complete", () => {
  const current = lesson("sector-area-radian-measure");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }

  assert.equal(current.multiPartPractice?.length, 1);
  const multipart = current.multiPartPractice![0];
  assert.ok(multipart.sectorDiagram, "multipart task needs its sector visual");
  assert.equal(multipart.parts?.length, 3);
  for (const part of multipart.parts ?? []) {
    assert.ok(
      part.explanation.length >= 80,
      `${multipart.id}${part.label} needs worked feedback`,
    );
    assert.ok(
      part.acceptedAnswers?.some(
        (answer) => answer.trim() !== part.answer.trim(),
      ),
      `${multipart.id}${part.label} needs an accepted-answer variant`,
    );
  }
});

test("Special-Triangle Exact Values mastery meets the rich-task quality profile", () => {
  const questions = lesson("exact-trig-values-special-triangles")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter(
      (question) => question.triangleDiagram || question.trianglePairDiagram,
    ).length,
    4,
  );
});

test("Special-Triangle Exact Values answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-est-qm1", "B"],
    ["y11adv-est-qm2", "sqrt(3)/2"],
    ["y11adv-est-qm3", "C"],
    ["y11adv-est-qm4", "4"],
    ["y11adv-est-qm5", "2-sqrt(3)"],
    ["y11adv-est-qm6", "C"],
    ["y11adv-est-qm7", "12+4sqrt(3)"],
    ["y11adv-est-qm8", "4"],
    ["y11adv-est-qm9", "36-18sqrt(3)"],
    ["y11adv-est-qm10", "8"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-est-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Special-Triangle Exact Values practice is unique and operationally complete", () => {
  const current = lesson("exact-trig-values-special-triangles");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const absentVisualReference =
    /\b(displayed|shown|following diagram|following graph|unit circle)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    assert.doesNotMatch(
      question.prompt,
      absentVisualReference,
      `${question.id} refers to an absent visual`,
    );

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Unit-Circle Exact Values mastery meets the rich-task quality profile", () => {
  const questions = lesson("exact-trig-values-unit-circle")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter((question) => question.unitCircleDiagram).length,
    6,
  );
});

test("Unit-Circle Exact Values answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-ucv2-qm1", "B"],
    ["y11adv-ucv2-qm2", "1"],
    ["y11adv-ucv2-qm3", "C"],
    ["y11adv-ucv2-qm4", "3pi/2"],
    ["y11adv-ucv2-qm5", "1/2"],
    ["y11adv-ucv2-qm6", "C"],
    ["y11adv-ucv2-qm7", "(sqrt(6)-sqrt(2))/2"],
    ["y11adv-ucv2-qm8", "5"],
    ["y11adv-ucv2-qm9", "1/4"],
    ["y11adv-ucv2-qm10", "sqrt(3)/4"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-ucv2-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Unit-Circle Exact Values practice is unique and operationally complete", () => {
  const current = lesson("exact-trig-values-unit-circle");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("All-Quadrant Unit Circle mastery meets the rich-task quality profile", () => {
  const questions = lesson("unit-circle-all-quadrants")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter((question) => question.unitCircleDiagram).length,
    7,
  );
});

test("All-Quadrant Unit Circle answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-ucqa-qm1", "B"],
    ["y11adv-ucqa-qm2", "pi/6"],
    ["y11adv-ucqa-qm3", "C"],
    ["y11adv-ucqa-qm4", "5pi/4"],
    ["y11adv-ucqa-qm5", "7pi/6"],
    ["y11adv-ucqa-qm6", "C"],
    ["y11adv-ucqa-qm7", "sqrt(3)/4"],
    ["y11adv-ucqa-qm8", "8"],
    ["y11adv-ucqa-qm9", "-(1+sqrt(3))/2"],
    ["y11adv-ucqa-qm10", "8pi/3"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-ucqa-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("All-Quadrant Unit Circle practice is unique and operationally complete", () => {
  const current = lesson("unit-circle-all-quadrants");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Parent Trigonometric Graphs mastery meets the rich-task quality profile", () => {
  const questions = lesson("graphing-sin-cos-tan")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter((question) => question.trigGraphDiagram).length,
    5,
  );
});

test("Parent Trigonometric Graphs answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-graph-qm1", "A"],
    ["y11adv-graph-qm2", "pi/2,3pi/2"],
    ["y11adv-graph-qm3", "C"],
    ["y11adv-graph-qm4", "cos x"],
    ["y11adv-graph-qm5", "pi/4,5pi/4"],
    ["y11adv-graph-qm6", "C"],
    ["y11adv-graph-qm7", "5"],
    ["y11adv-graph-qm8", "4"],
    ["y11adv-graph-qm9", "7pi"],
    ["y11adv-graph-qm10", "4pi"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-graph-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Parent Trigonometric Graphs practice is unique and operationally complete", () => {
  const current = lesson("graphing-sin-cos-tan");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const visualReference =
    /\b(displayed|shown|following diagram|following graph)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    if (visualReference.test(question.prompt)) {
      assert.ok(
        question.trigGraphDiagram,
        `${question.id} refers to an absent graph`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Amplitude and Period mastery meets the rich-task quality profile", () => {
  const questions = lesson("trig-graph-amplitude-period")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter((question) => question.cartesianGraph).length,
    4,
  );
});

test("Amplitude and Period answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-amp-qm1", "A"],
    ["y11adv-amp-qm2", "3,pi/2"],
    ["y11adv-amp-qm3", "A"],
    ["y11adv-amp-qm4", "28/5"],
    ["y11adv-amp-qm5", "17/2"],
    ["y11adv-amp-qm6", "C"],
    ["y11adv-amp-qm7", "7pi"],
    ["y11adv-amp-qm8", "24"],
    ["y11adv-amp-qm9", "3pi/4,144"],
    ["y11adv-amp-qm10", "48"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-amp-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Amplitude and Period practice is unique and operationally complete", () => {
  const current = lesson("trig-graph-amplitude-period");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const visualReference =
    /\b(displayed|shown|following diagram|following graph)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    if (visualReference.test(question.prompt)) {
      assert.ok(
        question.cartesianGraph,
        `${question.id} refers to an absent graph`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Trigonometric Graph Transformations mastery meets the rich-task quality profile", () => {
  const questions = lesson("trig-graph-transformations")
    .masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter((question) => question.cartesianGraph).length,
    3,
  );
});

test("Trigonometric Graph Transformations answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-shift-qm1", "B"],
    ["y11adv-shift-qm2", "3,pi,pi/4 left,-4"],
    ["y11adv-shift-qm3", "A"],
    ["y11adv-shift-qm4", "[-2,6],y=2"],
    ["y11adv-shift-qm5", "10"],
    ["y11adv-shift-qm6", "C"],
    ["y11adv-shift-qm7", "2,2,-pi/2,3"],
    ["y11adv-shift-qm8", "30"],
    ["y11adv-shift-qm9", "27"],
    ["y11adv-shift-qm10", "12pi"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-shift-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Trigonometric Graph Transformations practice is unique and operationally complete", () => {
  const current = lesson("trig-graph-transformations");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const visualReference =
    /\b(displayed|shown|following diagram|following graph)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    if (visualReference.test(question.prompt)) {
      assert.ok(
        question.cartesianGraph,
        `${question.id} refers to an absent graph`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }
});

test("Right-Angle Trigonometry Applications mastery meets the rich-task quality profile", () => {
  const questions = lesson(
    "right-angle-trig-applications",
  ).masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter(
      (question) =>
        question.triangleDiagram ||
        question.trianglePairDiagram ||
        question.bearingsDiagram,
    ).length,
    10,
  );
});

test("Right-Angle Trigonometry Applications answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-rat-qm1", "A"],
    ["y11adv-rat-qm2", "21.6"],
    ["y11adv-rat-qm3", "A"],
    ["y11adv-rat-qm4", "10,037"],
    ["y11adv-rat-qm5", "10sqrt(3)"],
    ["y11adv-rat-qm6", "C"],
    ["y11adv-rat-qm7", "12sqrt(3),090"],
    ["y11adv-rat-qm8", "260"],
    ["y11adv-rat-qm9", "40sqrt(3)"],
    ["y11adv-rat-qm10", "6sqrt(7)"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-rat-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Right-Angle Trigonometry Applications practice is unique and operationally complete", () => {
  const current = lesson("right-angle-trig-applications");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const visualReference =
    /\b(displayed|shown|following diagram|following graph)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    if (visualReference.test(question.prompt)) {
      assert.ok(
        question.triangleDiagram ||
          question.trianglePairDiagram ||
          question.bearingsDiagram,
        `${question.id} refers to an absent diagram`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }

  assert.equal(current.multiPartPractice?.length, 2);
  for (const question of current.multiPartPractice ?? []) {
    assert.ok(
      question.triangleDiagram || question.bearingsDiagram,
      `${question.id} needs its spatial model`,
    );
    for (const part of question.parts ?? []) {
      assert.ok(
        (part.explanation?.length ?? 0) >= 40,
        `${question.id} ${part.key} needs explanatory feedback`,
      );
      assert.ok(
        part.acceptedAnswers?.some(
          (answer) => answer.trim() !== part.answer.trim(),
        ),
        `${question.id} ${part.key} needs an accepted-answer variant`,
      );
    }
  }
});

test("Sine Rule, Cosine Rule and Area Formula mastery meets the rich-task quality profile", () => {
  const questions = lesson(
    "sine-rule-cosine-rule",
  ).masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter(
      (question) => question.triangleDiagram || question.trianglePairDiagram,
    ).length,
    10,
  );
});

test("Sine Rule, Cosine Rule and Area Formula answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-nra-qm1", "B"],
    ["y11adv-nra-qm2", "5sqrt(2)"],
    ["y11adv-nra-qm3", "B"],
    ["y11adv-nra-qm4", "12,18sqrt(3)"],
    ["y11adv-nra-qm5", "12"],
    ["y11adv-nra-qm6", "C"],
    ["y11adv-nra-qm7", "24+25sqrt(3)"],
    ["y11adv-nra-qm8", "120"],
    ["y11adv-nra-qm9", "2sqrt(37)"],
    ["y11adv-nra-qm10", "15sqrt(3)/4"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-nra-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Sine Rule, Cosine Rule and Area Formula practice is unique and operationally complete", () => {
  const current = lesson("sine-rule-cosine-rule");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();
  const visualReference =
    /\b(displayed|shown|following diagram|following graph)\b/i;

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }
    if (visualReference.test(question.prompt)) {
      assert.ok(
        question.triangleDiagram || question.trianglePairDiagram,
        `${question.id} refers to an absent diagram`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }

  assert.equal(current.multiPartPractice?.length, 2);
  for (const question of current.multiPartPractice ?? []) {
    assert.ok(question.triangleDiagram, `${question.id} needs its triangle`);
    for (const part of question.parts ?? []) {
      assert.ok(
        (part.explanation?.length ?? 0) >= 40,
        `${question.id} ${part.key} needs explanatory feedback`,
      );
      assert.ok(
        part.acceptedAnswers?.some(
          (answer) => answer.trim() !== part.answer.trim(),
        ),
        `${question.id} ${part.key} needs an accepted-answer variant`,
      );
    }
  }
});

test("Ambiguous Case mastery meets the rich-task quality profile", () => {
  const questions = lesson(
    "ambiguous-case-sine-rule",
  ).masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter(
      (question) => question.triangleDiagram || question.trianglePairDiagram,
    ).length,
    10,
  );
});

test("Ambiguous Case answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-amb-qm1", "A"],
    ["y11adv-amb-qm2", "1,90"],
    ["y11adv-amb-qm3", "B"],
    ["y11adv-amb-qm4", "60,120;90,30"],
    ["y11adv-amb-qm5", "53.13,1"],
    ["y11adv-amb-qm6", "C"],
    ["y11adv-amb-qm7", "140"],
    ["y11adv-amb-qm8", "45"],
    ["y11adv-amb-qm9", "27"],
    ["y11adv-amb-qm10", "12"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-amb-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Ambiguous Case practice is unique and operationally complete", () => {
  const current = lesson("ambiguous-case-sine-rule");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }

  assert.equal(current.multiPartPractice?.length, 2);
  for (const question of current.multiPartPractice ?? []) {
    assert.ok(
      question.triangleDiagram || question.trianglePairDiagram,
      `${question.id} needs its SSA model`,
    );
    for (const part of question.parts ?? []) {
      assert.ok(
        (part.explanation?.length ?? 0) >= 40,
        `${question.id} ${part.key} needs explanatory feedback`,
      );
      assert.ok(
        part.acceptedAnswers?.some(
          (answer) => answer.trim() !== part.answer.trim(),
        ),
        `${question.id} ${part.key} needs an accepted-answer variant`,
      );
    }
  }
});

test("Trigonometry and Measure of Angles Exam Practice mastery meets the rich-task quality profile", () => {
  const questions = lesson(
    "trigonometry-measure-angles-exam-practice",
  ).masteryQuiz as QualityQuestion[];
  const difficulties = new Map<number, number>();
  const taskTypes = new Set<string>();
  let multipleChoiceCount = 0;

  assert.equal(questions.length, 10);
  for (const question of questions) {
    difficulties.set(
      question.difficulty ?? 0,
      (difficulties.get(question.difficulty ?? 0) ?? 0) + 1,
    );
    assert.ok(
      (question.explanation?.length ?? 0) >= 100,
      `${question.id} needs worked reasoning`,
    );
    assert.ok(
      (question.hint?.length ?? 0) >= 35,
      `${question.id} needs a useful first step`,
    );
    assert.ok(
      (question.diagnosticIntent?.length ?? 0) >= 45,
      `${question.id} needs an explicit diagnostic purpose`,
    );
    assert.ok(question.taskType, `${question.id} needs a task classification`);
    taskTypes.add(question.taskType!);

    if (question.choices) {
      multipleChoiceCount += 1;
      const wrongLabels = ["A", "B", "C", "D"].filter(
        (label) => label !== question.answer,
      );
      assert.deepEqual(
        Object.keys(question.distractorMisconceptions ?? {}).sort(),
        wrongLabels,
        `${question.id} needs one misconception per distractor`,
      );
    } else {
      assert.ok(
        question.acceptedAnswers?.some(
          (answer) => answer.trim() !== question.answer.trim(),
        ),
        `${question.id} needs a legitimate accepted variant`,
      );
    }
  }

  assert.deepEqual(Object.fromEntries([...difficulties].sort()), {
    3: 4,
    4: 3,
    5: 3,
  });
  assert.equal(multipleChoiceCount, 3);
  assert.deepEqual([...taskTypes].sort(), [
    "analytical",
    "investigative",
    "problem-solving",
    "procedural",
    "synthesis",
  ]);
  assert.equal(
    questions.filter(
      (question) =>
        question.sectorDiagram ||
        question.unitCircleDiagram ||
        question.trigGraphDiagram ||
        question.cartesianGraph,
    ).length,
    9,
  );
});

test("Trigonometry and Measure of Angles Exam Practice answers and difficulty survive mapping", () => {
  const expectedAnswers = new Map([
    ["y11adv-trig-exam-qm1", "C"],
    ["y11adv-trig-exam-qm2", "(1-sqrt(3))/2"],
    ["y11adv-trig-exam-qm3", "B"],
    ["y11adv-trig-exam-qm4", "2pi/3,12pi"],
    ["y11adv-trig-exam-qm5", "7"],
    ["y11adv-trig-exam-qm6", "C"],
    ["y11adv-trig-exam-qm7", "0,5"],
    ["y11adv-trig-exam-qm8", "8"],
    ["y11adv-trig-exam-qm9", "12+6pi"],
    ["y11adv-trig-exam-qm10", "3-pi/2"],
  ]);
  const rows = collectAllQuestions(["year-11-advanced"]).rows.filter((row) =>
    /^y11adv-trig-exam-qm\d+$/.test(row.source_id),
  );

  assert.equal(rows.length, 10);
  for (const row of rows) {
    assert.equal(row.answer, expectedAnswers.get(row.source_id), row.source_id);
  }
  assert.deepEqual(
    rows.reduce<Record<number, number>>((counts, row) => {
      counts[row.difficulty] = (counts[row.difficulty] ?? 0) + 1;
      return counts;
    }, {}),
    { 3: 4, 4: 3, 5: 3 },
  );
});

test("Trigonometry and Measure of Angles Exam Practice is unique and operationally complete", () => {
  const current = lesson("trigonometry-measure-angles-exam-practice");
  const questions = [
    ...current.guidedPractice,
    ...current.independentPractice,
    ...current.masteryQuiz,
  ];
  const seen = new Map<string, string>();

  assert.deepEqual(
    [
      current.guidedPractice.length,
      current.independentPractice.length,
      current.masteryQuiz.length,
    ],
    [4, 5, 10],
  );
  assert.equal(questions.length, 19);

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
        `${question.id} needs an accepted-answer variant`,
      );
    }

    const key = normalise(`${question.prompt} ${question.latex}`);
    assert.ok(!seen.has(key), `${question.id} duplicates ${seen.get(key)}`);
    seen.set(key, question.id);
  }

  assert.equal(current.multiPartPractice?.length, 1);
  for (const question of current.multiPartPractice ?? []) {
    assert.ok(question.cartesianGraph, `${question.id} needs its graph`);
    for (const part of question.parts ?? []) {
      assert.ok(
        (part.explanation?.length ?? 0) >= 40,
        `${question.id} ${part.key} needs explanatory feedback`,
      );
      assert.ok(
        part.acceptedAnswers?.some(
          (answer) => answer.trim() !== part.answer.trim(),
        ),
        `${question.id} ${part.key} needs an accepted-answer variant`,
      );
    }
  }
});

test("the complete Trigonometry and Measure of Angles unit satisfies the authored acceptance gate", () => {
  const slugs = [
    "degrees-and-radians-concept",
    "converting-degrees-radians",
    "converting-radians-degrees",
    "arc-length-radian-measure",
    "sector-area-radian-measure",
    "exact-trig-values-special-triangles",
    "exact-trig-values-unit-circle",
    "unit-circle-all-quadrants",
    "graphing-sin-cos-tan",
    "trig-graph-amplitude-period",
    "trig-graph-transformations",
    "right-angle-trig-applications",
    "sine-rule-cosine-rule",
    "ambiguous-case-sine-rule",
    "trigonometry-measure-angles-exam-practice",
  ];
  const rows = collectAllQuestions(["year-11-advanced"]).rows;
  const rowById = new Map(rows.map((row) => [row.source_id, row]));
  const seen = new Map<string, string>();
  let standardCount = 0;
  let masteryCount = 0;

  assert.equal(slugs.length, 15);
  for (const slug of slugs) {
    const current = lesson(slug);
    const standard = [
      ...current.guidedPractice,
      ...current.independentPractice,
      ...current.masteryQuiz,
    ];
    const mastery = current.masteryQuiz as QualityQuestion[];
    const taskTypes = new Set(mastery.map((question) => question.taskType));

    assert.deepEqual(
      [
        current.guidedPractice.length,
        current.independentPractice.length,
        mastery.length,
      ],
      [4, 5, 10],
      slug,
    );
    assert.deepEqual(
      mastery.reduce<Record<number, number>>((counts, question) => {
        const difficulty = rowById.get(question.id)?.difficulty ?? 0;
        counts[difficulty] = (counts[difficulty] ?? 0) + 1;
        return counts;
      }, {}),
      { 3: 4, 4: 3, 5: 3 },
      `${slug} difficulty profile`,
    );
    assert.equal(
      mastery.filter((question) => question.choices).length,
      3,
      `${slug} MCQ count`,
    );
    assert.deepEqual([...taskTypes].sort(), [
      "analytical",
      "investigative",
      "problem-solving",
      "procedural",
      "synthesis",
    ]);

    for (const question of standard) {
      assert.ok(
        (question.explanation?.length ?? 0) >= 40,
        `${question.id} needs explanatory feedback`,
      );
      if (!question.choices) {
        assert.ok(
          question.acceptedAnswers?.some(
            (answer) => answer.trim() !== question.answer.trim(),
          ),
          `${question.id} needs an accepted-answer variant`,
        );
      }
      const key = normalise(`${question.prompt} ${question.latex}`);
      assert.ok(
        !seen.has(key),
        `${question.id} duplicates ${seen.get(key)} across the unit`,
      );
      seen.set(key, question.id);
    }

    standardCount += standard.length;
    masteryCount += mastery.length;
  }

  assert.equal(standardCount, 285);
  assert.equal(masteryCount, 150);
});
