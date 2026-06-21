import type { ExamQuestion } from "../exams/types";

/**
 * Topic tests (see docs/TOPIC_TEST_DIAGNOSTIC_PLAN.md).
 *
 * A topic test is a timed (~1 hour) paper assembled on demand from per-subtopic
 * pools of high-band questions. It reuses the exam tier (runner, CAS marking,
 * per-topic rollup, band prediction) — `buildTopicTest` emits a standard
 * `ExamPaper`, so nothing downstream changes.
 */

/**
 * A pool question authored for a topic test. Structurally an `ExamQuestion`,
 * but:
 * - `difficulty` is restricted to the high band (4 = transfer/interpretation,
 *   5 = synoptic/novel reasoning);
 * - `topicSlug` / `topicTitle` / `remediationHref` are NOT authored per item —
 *   the assembler stamps them from the owning `SubtopicPool`, so a weak result
 *   maps straight to the subtopic's lesson with zero per-question bookkeeping.
 *
 * Every item must be auto-markable (numeric / coordinate / MCQ / simple
 * algebra) — no "prove/justify/explain". See QUESTION_AUTHORING_STANDARD.md.
 */
export type TopicTestQuestion = Omit<
  ExamQuestion,
  "topicSlug" | "topicTitle" | "remediationHref" | "difficulty"
> & {
  difficulty: 4 | 5;
  /** Override the time-budget estimate; defaults to marks × a per-mark rate. */
  estimatedMinutes?: number;
};

export type SubtopicPool = {
  subtopicSlug: string;
  subtopicTitle: string;
  /** Lesson route to revise this subtopic (drives remediation). */
  remediationHref: string;
  /** Target 10 each once authored. */
  d4: TopicTestQuestion[];
  d5: TopicTestQuestion[];
};

export type TopicTestPool = {
  courseSlug: string;
  courseTitle: string;
  topicSlug: string;
  topicTitle: string;
  subtopics: SubtopicPool[];
};
