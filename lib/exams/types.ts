/**
 * Exam-readiness content tier.
 *
 * A dedicated model, separate from the lesson-practice `PracticeQuestion`
 * catalog. Exam questions carry the things an exam needs that practice items
 * don't: explicit marks, a difficulty band (so we can author genuine D6/synoptic
 * items), and a topic tag so a weak result maps to a lesson to revise.
 */

import type { DiagramFields } from "../lessons/diagramRegistry";

/** 1–5 ≈ standard practice depth; 6 = synoptic / transfer / exam-hard. */
export type Difficulty = 1 | 2 | 3 | 4 | 5 | 6;

export type ExamChoice = { label: string; text: string };

export type ExamQuestionPart = {
  key: string;
  label: string; // "(a)", "(b)", …
  prompt: string;
  latex?: string;
  marks: number;
  answer: string;
  acceptedAnswers?: string[];
  explanation: string;
};

export type ExamQuestion = {
  id: string;
  prompt: string;
  latex?: string;
  /** Total marks (for multi-part, the sum of part marks). */
  marks: number;
  difficulty: Difficulty;
  /** Whether the item tests transfer to an unfamiliar context. */
  transfer?: boolean;
  /** Topic this question assesses — drives remediation. */
  topicSlug: string;
  topicTitle: string;
  /** Where to send a student to revise this topic (course/topic route). */
  remediationHref: string;
  explanation: string;

  /**
   * Optional finer-grained tags used by dynamically-assembled topic tests
   * (see lib/topicTests). For static papers these are unset; topic tests set
   * `topicSlug` to the subtopic so the existing per-topic rollup remediates at
   * subtopic granularity, and keep the human label here.
   */
  subtopicSlug?: string;
  subtopicTitle?: string;
  /** Override for the time-budget estimate; defaults to marks × a per-mark rate. */
  estimatedMinutes?: number;

  // Single-answer (multiple-choice if `choices` set, else typed):
  answer?: string;
  acceptedAnswers?: string[];
  choices?: ExamChoice[];

  // Multi-part (Section II style):
  parts?: ExamQuestionPart[];
} & DiagramFields;

export type ExamSection = {
  title: string;
  instructions?: string;
  questions: ExamQuestion[];
};

export type ExamPaper = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  description: string;
  timeLimitMins: number;
  totalMarks: number;
  sections: ExamSection[];
};

export function examQuestions(paper: ExamPaper): ExamQuestion[] {
  return paper.sections.flatMap((s) => s.questions);
}

export function questionMarks(q: ExamQuestion): number {
  if (q.parts && q.parts.length > 0) {
    return q.parts.reduce((sum, p) => sum + p.marks, 0);
  }
  return q.marks;
}

// ── Band prediction from an exam percentage ──────────────────────────────────
// Approximate HSC alignment. Exam % → band; this is a study signal, not an
// official mark. Extension courses use the E-band scale.

const EXTENSION_SLUGS = new Set([
  "year-11-extension",
  "year-12-extension-1",
  "year-12-extension-2",
]);

export type ExamBand = {
  band: string;
  /** 0–100 exam percentage. */
  percentage: number;
};

export function predictExamBand(
  courseSlug: string,
  marksEarned: number,
  marksAvailable: number
): ExamBand {
  const percentage =
    marksAvailable > 0 ? Math.round((marksEarned / marksAvailable) * 100) : 0;

  let band: string;
  if (EXTENSION_SLUGS.has(courseSlug)) {
    if (percentage >= 80) band = "E4";
    else if (percentage >= 70) band = "E3";
    else if (percentage >= 50) band = "E2";
    else band = "E1";
  } else {
    if (percentage >= 90) band = "Band 6";
    else if (percentage >= 80) band = "Band 5";
    else if (percentage >= 70) band = "Band 4";
    else if (percentage >= 60) band = "Band 3";
    else if (percentage >= 50) band = "Band 2";
    else band = "Band 1";
  }
  return { band, percentage };
}
