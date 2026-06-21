import type { ExamPaper } from "../exams/types";
import type { TopicTestPool } from "./types";
import { buildTopicTest, parseTopicTestId } from "./buildTopicTest";
import { kinematicsPool } from "./pools/year-12-extension-1/kinematics";
import { inverseTrigPool } from "./pools/year-12-extension-1/inverse-trig";
import { furtherCalculusPool } from "./pools/year-12-extension-1/further-calculus";

export * from "./types";
export {
  buildTopicTest,
  buildTopicTestId,
  parseTopicTestId,
} from "./buildTopicTest";

/**
 * Registered topic-test pools. Kinematics ships a starter set (1 D4 + 1 D5 per
 * subtopic); the content slice grows each band to 10.
 */
const POOLS: TopicTestPool[] = [
  kinematicsPool,
  inverseTrigPool,
  furtherCalculusPool,
];

export function listTopicTestPools(): TopicTestPool[] {
  return POOLS;
}

export type TopicTestSummary = {
  courseSlug: string;
  courseTitle: string;
  topicSlug: string;
  topicTitle: string;
  subtopicCount: number;
  /** Total authored pool size across all subtopics (D4 + D5). */
  poolSize: number;
};

export function listTopicTests(): TopicTestSummary[] {
  return POOLS.map((p) => ({
    courseSlug: p.courseSlug,
    courseTitle: p.courseTitle,
    topicSlug: p.topicSlug,
    topicTitle: p.topicTitle,
    subtopicCount: p.subtopics.length,
    poolSize: p.subtopics.reduce(
      (n, s) => n + s.d4.length + s.d5.length + (s.d6?.length ?? 0),
      0
    ),
  }));
}

export function getTopicTestPool(
  courseSlug: string,
  topicSlug: string
): TopicTestPool | null {
  return (
    POOLS.find(
      (p) => p.courseSlug === courseSlug && p.topicSlug === topicSlug
    ) ?? null
  );
}

/**
 * Reconstruct the exact paper for a topic-test id. Deterministic because the
 * seed is encoded in the id, so the submit route can re-derive and score the
 * same paper the student sat.
 */
export function getTopicTestPaper(id: string): ExamPaper | null {
  const parsed = parseTopicTestId(id);
  if (!parsed) return null;
  const pool = getTopicTestPool(parsed.courseSlug, parsed.topicSlug);
  if (!pool) return null;
  return buildTopicTest(pool, { seed: parsed.seed });
}
