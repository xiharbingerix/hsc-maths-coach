import type { ExamPaper } from "../exams/types";
import type { TopicTestPool } from "./types";
import { buildTopicTest, parseTopicTestId } from "./buildTopicTest";

export * from "./types";
export {
  buildTopicTest,
  buildTopicTestId,
  parseTopicTestId,
} from "./buildTopicTest";

/**
 * Registered topic-test pools. The kinematics scaffold
 * (./pools/year-12-extension-1/kinematics) exists but is intentionally NOT
 * enabled here until its D4/D5 questions are authored (content slice of
 * Phase 1) — an empty pool would assemble an empty paper.
 */
const POOLS: TopicTestPool[] = [
  // kinematicsPool,  // enable once authored
];

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
