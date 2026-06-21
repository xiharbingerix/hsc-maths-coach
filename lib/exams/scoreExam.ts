/**
 * Server-side exam scoring.
 *
 * Marks a submitted paper using the same CAS-backed marker as worksheets, then
 * rolls results up into a per-topic breakdown, a predicted band, and a
 * remediation list (weakest topics first, linked to where to revise).
 *
 * Server-only: pulls in the CAS marker. The browser reaches it via /api/exam.
 */
import { markAnswerWithCas } from "../cas/markAnswerWithCas";
import { markProofWithAi } from "../proofMarker/markProofWithAi";
import {
  predictExamBand,
  questionMarks,
  type ExamPaper,
  type ExamQuestion,
} from "./types";

export type PartResult = {
  key: string;
  label: string;
  correct: boolean;
  marksEarned: number;
  marksAvailable: number;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
};

export type QuestionResult = {
  id: string;
  marksEarned: number;
  marksAvailable: number;
  correct: boolean;
  studentAnswer?: string;
  correctAnswer?: string;
  explanation: string;
  parts?: PartResult[];
};

export type TopicBreakdown = {
  topicSlug: string;
  topicTitle: string;
  remediationHref: string;
  marksEarned: number;
  marksAvailable: number;
  percentage: number;
};

export type ExamResult = {
  marksEarned: number;
  marksAvailable: number;
  percentage: number;
  band: string;
  questions: QuestionResult[];
  topicBreakdown: TopicBreakdown[];
  remediation: TopicBreakdown[];
};

/** Key for a multi-part answer in the submitted answers map. */
export function partAnswerKey(questionId: string, partKey: string): string {
  return `${questionId}.${partKey}`;
}

function markMcq(q: ExamQuestion, answer: string): boolean {
  return answer.trim().toUpperCase() === String(q.answer ?? "").trim().toUpperCase();
}

async function scoreQuestion(
  q: ExamQuestion,
  answers: Record<string, string>
): Promise<QuestionResult> {
  // Free-response (proof): graded by the AI marker against the model solution.
  // Binary — full marks if the marker returns correct, else 0. A null verdict
  // (marker disabled or errored) scores 0, so proof items must not ship with the
  // flag off. The marker treats an empty answer as incorrect without an API call.
  if (q.responseType === "proof") {
    const studentAnswer = (answers[q.id] ?? "").trim();
    const available = questionMarks(q);
    const verdict = await markProofWithAi(
      {
        prompt: q.prompt,
        modelSolution: q.modelSolution ?? q.explanation,
        latex: q.latex,
      },
      studentAnswer
    );
    const correct = verdict?.correct === true;
    return {
      id: q.id,
      marksEarned: correct ? available : 0,
      marksAvailable: available,
      correct,
      studentAnswer,
      correctAnswer: "", // a proof has no single canonical answer string
      explanation: q.explanation,
    };
  }

  // Multi-part: mark each part independently.
  if (q.parts && q.parts.length > 0) {
    const parts: PartResult[] = [];
    for (const part of q.parts) {
      const studentAnswer = (answers[partAnswerKey(q.id, part.key)] ?? "").trim();
      const result = await markAnswerWithCas({
        userAnswer: studentAnswer,
        correctAnswer: part.answer,
        acceptedAnswers: part.acceptedAnswers ?? [],
      });
      const correct = studentAnswer.length > 0 && result.correct;
      parts.push({
        key: part.key,
        label: part.label,
        correct,
        marksEarned: correct ? part.marks : 0,
        marksAvailable: part.marks,
        studentAnswer,
        correctAnswer: part.answer,
        explanation: part.explanation,
      });
    }
    const marksEarned = parts.reduce((s, p) => s + p.marksEarned, 0);
    const marksAvailable = parts.reduce((s, p) => s + p.marksAvailable, 0);
    return {
      id: q.id,
      marksEarned,
      marksAvailable,
      correct: marksEarned === marksAvailable,
      explanation: q.explanation,
      parts,
    };
  }

  // Single answer (MCQ or typed).
  const studentAnswer = (answers[q.id] ?? "").trim();
  const available = questionMarks(q);
  let correct = false;
  if (q.choices && q.choices.length > 0) {
    correct = studentAnswer.length > 0 && markMcq(q, studentAnswer);
  } else {
    const result = await markAnswerWithCas({
      userAnswer: studentAnswer,
      correctAnswer: q.answer ?? "",
      acceptedAnswers: q.acceptedAnswers ?? [],
    });
    correct = studentAnswer.length > 0 && result.correct;
  }
  // For MCQ, show the correct option's text; otherwise the stored answer.
  const correctAnswer =
    q.choices && q.choices.length > 0
      ? (q.choices.find((c) => c.label === q.answer)?.text ?? q.answer ?? "")
      : (q.answer ?? "");

  return {
    id: q.id,
    marksEarned: correct ? available : 0,
    marksAvailable: available,
    correct,
    studentAnswer,
    correctAnswer,
    explanation: q.explanation,
  };
}

export async function scoreExam(
  paper: ExamPaper,
  answers: Record<string, string>
): Promise<ExamResult> {
  const questions = paper.sections.flatMap((s) => s.questions);

  const questionResults = await Promise.all(
    questions.map((q) => scoreQuestion(q, answers))
  );

  const byId = new Map(questionResults.map((r) => [r.id, r]));

  // Aggregate by topic.
  const topics = new Map<string, TopicBreakdown>();
  for (const q of questions) {
    const r = byId.get(q.id);
    if (!r) continue;
    const existing = topics.get(q.topicSlug);
    if (existing) {
      existing.marksEarned += r.marksEarned;
      existing.marksAvailable += r.marksAvailable;
    } else {
      topics.set(q.topicSlug, {
        topicSlug: q.topicSlug,
        topicTitle: q.topicTitle,
        remediationHref: q.remediationHref,
        marksEarned: r.marksEarned,
        marksAvailable: r.marksAvailable,
        percentage: 0,
      });
    }
  }
  const topicBreakdown = [...topics.values()].map((t) => ({
    ...t,
    percentage:
      t.marksAvailable > 0
        ? Math.round((t.marksEarned / t.marksAvailable) * 100)
        : 0,
  }));

  const marksEarned = questionResults.reduce((s, r) => s + r.marksEarned, 0);
  const marksAvailable = questionResults.reduce(
    (s, r) => s + r.marksAvailable,
    0
  );
  const { band, percentage } = predictExamBand(
    paper.courseSlug,
    marksEarned,
    marksAvailable
  );

  // Remediation: weak topics (< 60%), weakest first.
  const remediation = topicBreakdown
    .filter((t) => t.percentage < 60)
    .sort((a, b) => a.percentage - b.percentage);

  return {
    marksEarned,
    marksAvailable,
    percentage,
    band,
    questions: questionResults,
    topicBreakdown,
    remediation,
  };
}
