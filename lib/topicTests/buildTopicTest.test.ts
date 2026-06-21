import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildTopicTest,
  buildTopicTestId,
  parseTopicTestId,
} from "./buildTopicTest";
import type { SubtopicPool, TopicTestPool, TopicTestQuestion } from "./types";

// ── Fixture ──────────────────────────────────────────────────────────────────
// 3 subtopics, each with 5 D4 (2 marks → 4 min) and 5 D5 (4 marks → 8 min).
function q(
  sub: string,
  band: 4 | 5,
  i: number
): TopicTestQuestion {
  const marks = band === 4 ? 2 : 4;
  return {
    id: `${sub}-d${band}-${i}`,
    prompt: `${sub} D${band} #${i}: value?`,
    marks,
    difficulty: band,
    explanation: `Worked solution for ${sub} D${band} #${i}.`,
    answer: String(i),
    acceptedAnswers: [],
  };
}

function subtopic(slug: string, title: string): SubtopicPool {
  return {
    subtopicSlug: slug,
    subtopicTitle: title,
    remediationHref: `/course/c/t/${slug}`,
    d4: [0, 1, 2, 3, 4].map((i) => q(slug, 4, i)),
    d5: [0, 1, 2, 3, 4].map((i) => q(slug, 5, i)),
  };
}

const pool: TopicTestPool = {
  courseSlug: "course-x",
  courseTitle: "Course X",
  topicSlug: "topic-y",
  topicTitle: "Topic Y",
  subtopics: [
    subtopic("sub-a", "Sub A"),
    subtopic("sub-b", "Sub B"),
    subtopic("sub-c", "Sub C"),
  ],
};

const ids = (p: ReturnType<typeof buildTopicTest>) =>
  p.sections.flatMap((s) => s.questions.map((x) => x.id));

const minutes = (p: ReturnType<typeof buildTopicTest>) =>
  p.sections
    .flatMap((s) => s.questions)
    .reduce((m, x) => m + (x.estimatedMinutes ?? x.marks * 2), 0);

test("same seed is deterministic", () => {
  const a = buildTopicTest(pool, { seed: 42 });
  const b = buildTopicTest(pool, { seed: 42 });
  assert.deepEqual(ids(a), ids(b));
});

test("different seeds produce a different draw", () => {
  assert.notDeepEqual(
    ids(buildTopicTest(pool, { seed: 1 })),
    ids(buildTopicTest(pool, { seed: 2 }))
  );
});

test("covers every subtopic", () => {
  const p = buildTopicTest(pool, { seed: 7 });
  assert.equal(p.sections.length, 3);
  for (const s of p.sections) assert.ok(s.questions.length > 0);
});

test("stays within the time budget and fills it", () => {
  const p = buildTopicTest(pool, { seed: 7, timeLimitMins: 60 });
  const m = minutes(p);
  assert.ok(m <= 60, `expected <= 60, got ${m}`);
  assert.ok(m >= 52, `expected a reasonably full paper, got ${m}`);
});

test("respects a smaller budget", () => {
  const p = buildTopicTest(pool, { seed: 7, timeLimitMins: 20 });
  assert.ok(minutes(p) <= 20);
  // Coverage still guaranteed (one per subtopic = 12 min ≤ 20).
  assert.equal(p.sections.length, 3);
});

test("stamps remediation from the owning subtopic", () => {
  const p = buildTopicTest(pool, { seed: 3 });
  for (const s of p.sections) {
    const sub = pool.subtopics.find((x) => x.subtopicTitle === s.title)!;
    for (const x of s.questions) {
      assert.equal(x.topicSlug, sub.subtopicSlug);
      assert.equal(x.topicTitle, sub.subtopicTitle);
      assert.equal(x.remediationHref, sub.remediationHref);
      assert.ok(x.difficulty === 4 || x.difficulty === 5);
    }
  }
});

test("id encodes course/topic/seed and round-trips", () => {
  const p = buildTopicTest(pool, { seed: 99 });
  assert.equal(p.id, buildTopicTestId("course-x", "topic-y", 99));
  assert.deepEqual(parseTopicTestId(p.id), {
    courseSlug: "course-x",
    topicSlug: "topic-y",
    seed: 99,
  });
});

test("parseTopicTestId rejects malformed ids", () => {
  assert.equal(parseTopicTestId("nope"), null);
  assert.equal(parseTopicTestId("topic-test:a:b"), null);
  assert.equal(parseTopicTestId("topic-test:a:b:not-a-number"), null);
});
