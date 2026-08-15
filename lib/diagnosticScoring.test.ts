import assert from "node:assert/strict";
import test from "node:test";
import { isCorrectAnswer } from "./diagnosticScoring";
import type { DiagnosticQuestion } from "./questions";

const percentageQuestion: DiagnosticQuestion = {
  id: "percentage-regression",
  section: "Probability",
  skill: "Relative frequency",
  difficulty: "core",
  prompt: "Express this relative frequency as a percentage.",
  answer: "20",
  diagnosticTag: "percentage-regression",
};

test("diagnostic percentage accepts a percent symbol with a percentage-point key", () => {
  assert.equal(isCorrectAnswer("20%", percentageQuestion), true);
});

test("diagnostic percentage rejects a wrongly scaled percent", () => {
  assert.equal(isCorrectAnswer("2000%", percentageQuestion), false);
});
