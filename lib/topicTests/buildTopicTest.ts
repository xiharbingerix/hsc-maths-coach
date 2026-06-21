import type { ExamPaper, ExamQuestion, ExamSection } from "../exams/types";
import { questionMarks } from "../exams/types";
import type { SubtopicPool, TopicTestPool, TopicTestQuestion } from "./types";

/**
 * Assembles a topic test into a standard `ExamPaper`.
 *
 * Draw is seeded (mulberry32) so a given attempt is stable — and so the server
 * can reconstruct the exact paper from the seed encoded in the id at submit
 * time — while different seeds (retakes) produce a different paper.
 */

const DEFAULT_TIME_LIMIT_MINS = 60;
// High-band (D4/D5) items run heavier than the mixed mini-papers (~1.8 min/mark);
// budget ~2 min/mark. Calibrate against real attempt durations in Phase 2.
const MINUTES_PER_MARK = 2;

function makeRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function estimateMinutes(q: TopicTestQuestion): number {
  return q.estimatedMinutes ?? questionMarks(q as unknown as ExamQuestion) * MINUTES_PER_MARK;
}

export function buildTopicTestId(
  courseSlug: string,
  topicSlug: string,
  seed: number
): string {
  return `topic-test:${courseSlug}:${topicSlug}:${seed}`;
}

export function parseTopicTestId(
  id: string
): { courseSlug: string; topicSlug: string; seed: number } | null {
  const parts = id.split(":");
  if (parts.length !== 4 || parts[0] !== "topic-test") return null;
  const seed = Number(parts[3]);
  if (!Number.isInteger(seed)) return null;
  return { courseSlug: parts[1], topicSlug: parts[2], seed };
}

export type BuildTopicTestOptions = {
  seed?: number;
  timeLimitMins?: number;
};

export function buildTopicTest(
  pool: TopicTestPool,
  options: BuildTopicTestOptions = {}
): ExamPaper {
  const seed = options.seed ?? 1;
  const budget = options.timeLimitMins ?? DEFAULT_TIME_LIMIT_MINS;
  const rng = makeRng(seed);

  // Stamp an authored pool question into a full ExamQuestion, pointing topicSlug
  // (the rollup key) at the subtopic so remediation lands on the right lesson.
  const stamp = (q: TopicTestQuestion, sub: SubtopicPool): ExamQuestion => ({
    ...q,
    topicSlug: sub.subtopicSlug,
    topicTitle: sub.subtopicTitle,
    remediationHref: sub.remediationHref,
    subtopicSlug: sub.subtopicSlug,
    subtopicTitle: sub.subtopicTitle,
  });

  // Per-subtopic draw queue: shuffle each band, then interleave D4,D5,D4,D5…
  // so easier items surface first and both bands are represented.
  const lanes = pool.subtopics.map((sub) => {
    const d4 = shuffled(sub.d4, rng);
    const d5 = shuffled(sub.d5, rng);
    const queue: TopicTestQuestion[] = [];
    for (let i = 0; i < Math.max(d4.length, d5.length); i++) {
      if (i < d4.length) queue.push(d4[i]);
      if (i < d5.length) queue.push(d5[i]);
    }
    return { sub, queue, taken: [] as ExamQuestion[] };
  });

  let used = 0;

  // Phase A — coverage: one question per subtopic (guaranteed, even if it nudges
  // slightly over budget) so every studied subtopic is assessed.
  for (const lane of lanes) {
    const q = lane.queue.shift();
    if (!q) continue;
    lane.taken.push(stamp(q, lane.sub));
    used += estimateMinutes(q);
  }

  // Phase B — fill: round-robin the rest until the time budget is reached.
  let progressed = true;
  while (used < budget && progressed) {
    progressed = false;
    for (const lane of lanes) {
      const next = lane.queue[0];
      if (!next) continue;
      const cost = estimateMinutes(next);
      if (used + cost > budget) continue;
      lane.queue.shift();
      lane.taken.push(stamp(next, lane.sub));
      used += cost;
      progressed = true;
    }
  }

  const sections: ExamSection[] = lanes
    .filter((lane) => lane.taken.length > 0)
    .map((lane) => ({ title: lane.sub.subtopicTitle, questions: lane.taken }));

  const totalMarks = sections
    .flatMap((s) => s.questions)
    .reduce((sum, q) => sum + questionMarks(q), 0);

  return {
    id: buildTopicTestId(pool.courseSlug, pool.topicSlug, seed),
    courseSlug: pool.courseSlug,
    courseTitle: pool.courseTitle,
    title: `${pool.topicTitle} — Topic Test`,
    description: `A timed, ${budget}-minute diagnostic across ${pool.topicTitle}. Questions are drawn at random from each subtopic; your result shows which subtopics to re-practise.`,
    timeLimitMins: budget,
    totalMarks,
    sections,
  };
}
