import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreExam } from "./scoreExam";
import type { ExamPaper, ExamQuestion } from "./types";

function paperWith(q: ExamQuestion): ExamPaper {
  return {
    id: "test-paper",
    courseSlug: "year-12-extension-1",
    courseTitle: "Test",
    title: "Test",
    description: "",
    timeLimitMins: 60,
    totalMarks: q.marks,
    sections: [{ title: "Section", questions: [q] }],
  };
}

const proofQ: ExamQuestion = {
  id: "proof-1",
  prompt: "Prove by induction that 1+2+...+n = n(n+1)/2.",
  marks: 3,
  difficulty: 6,
  topicSlug: "proof-induction",
  topicTitle: "Proof by Induction",
  remediationHref: "/x",
  explanation: "Base case, hypothesis, inductive step, conclusion.",
  responseType: "proof",
  modelSolution: "Base case n=1. Assume n=k. Show n=k+1. Conclude.",
  proofRubric: [
    "Checks the stated base case explicitly.",
    "States the inductive hypothesis clearly at n = k.",
    "Uses the hypothesis in the k+1 step.",
    "States a valid induction conclusion.",
  ],
  proofFeedbackOptions: [
    { key: "base_case_missing", text: "Check the base case explicitly." },
    { key: "hypothesis_missing", text: "State the inductive hypothesis clearly." },
    { key: "hypothesis_not_used", text: "Use the hypothesis in the k+1 step." },
    { key: "conclusion_missing", text: "State the final induction conclusion." },
  ],
};

// With PROOF_MARKER_ENABLED unset (the default), the marker is unavailable and a
// null verdict scores the proof 0 — exercised here without any network call.
test("proof question scores 0 when the marker is unavailable", async () => {
  delete process.env.PROOF_MARKER_ENABLED;
  const result = await scoreExam(paperWith(proofQ), { "proof-1": "some attempt" });
  const r = result.questions[0];
  assert.equal(r.id, "proof-1");
  assert.equal(r.correct, false);
  assert.equal(r.marksEarned, 0);
  assert.equal(r.marksAvailable, 3);
  assert.equal(r.studentAnswer, "some attempt");
  assert.equal(r.correctAnswer, "");
  assert.ok(r.explanation.length > 0);
  // It still aggregates into the topic breakdown like any other question.
  assert.equal(result.marksAvailable, 3);
  assert.equal(result.topicBreakdown[0]?.topicSlug, "proof-induction");
});

test("typed question still marks correctly (regression)", async () => {
  delete process.env.PROOF_MARKER_ENABLED;
  const typedQ: ExamQuestion = {
    id: "typed-1",
    prompt: "What is 2+2?",
    marks: 1,
    difficulty: 1,
    topicSlug: "arith",
    topicTitle: "Arithmetic",
    remediationHref: "/x",
    explanation: "4",
    answer: "4",
  };
  const result = await scoreExam(paperWith(typedQ), { "typed-1": "4" });
  assert.equal(result.questions[0]?.correct, true);
  assert.equal(result.marksEarned, 1);
});

test("typed percentage accepts a percent symbol with a percentage-point key", async () => {
  const percentageQ: ExamQuestion = {
    id: "percentage-1",
    prompt: "Express this relative frequency as a percentage.",
    marks: 1,
    difficulty: 2,
    topicSlug: "relative-frequency",
    topicTitle: "Relative Frequency",
    remediationHref: "/x",
    explanation: "The relative frequency is 20%.",
    answer: "20",
  };

  const result = await scoreExam(paperWith(percentageQ), {
    "percentage-1": "20%",
  });

  assert.equal(result.questions[0]?.correct, true);
  assert.equal(result.marksEarned, 1);
});
