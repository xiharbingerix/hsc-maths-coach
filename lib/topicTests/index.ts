import type { ExamPaper } from "../exams/types";
import type { TopicTestPool } from "./types";
import { buildTopicTest, parseTopicTestId } from "./buildTopicTest";
import { kinematicsPool } from "./pools/year-12-extension-1/kinematics";

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
const POOLS: TopicTestPool[] = [kinematicsPool];

export function listTopicTestPools(): TopicTestPool[] {
  return POOLS;
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
