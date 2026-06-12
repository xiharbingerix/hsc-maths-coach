export type ReviewReason = "weak" | "stale" | "confidence-building";

export type DailyReviewItem = {
  title: string;
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string | null;
  mastery_score: number;
  last_updated: string;
  reason: ReviewReason;
  suggested_action_href: string;
};

type MasteryInput = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  attempt_count: number;
  last_updated: string;
};

type SubtopicInput = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  mastery_score: number;
  attempt_count: number;
  last_updated: string;
};

const MS_14 = 14 * 24 * 60 * 60 * 1000;
const MS_21 = 21 * 24 * 60 * 60 * 1000;
const MAX_ITEMS = 5;

function prettifySlug(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Deterministic daily review queue.
 *
 * Selection formula (three tiers, max 5 items total):
 *   Tier 1 – weak:                mastery < 50; sort by selected-course-first, then lowest mastery.
 *                                 If a weak subtopic exists for the topic, surface that instead.
 *   Tier 2 – stale:               50 ≤ mastery < 80 AND age > 14 days; sort by oldest first.
 *   Tier 3 – confidence-building: mastery ≥ 80 AND age > 21 days; sort by oldest first.
 *
 * At most one entry per topic (deduped by course_slug + topic_slug).
 * Items from selectedCourseSlug are always promoted to the front of each tier.
 */
export function getDailyReviewQueue(
  masteryRows: MasteryInput[],
  subtopicRows: SubtopicInput[],
  selectedCourseSlug: string | null,
  topicLabels: Map<string, string>,
  subtopicLabels: Map<string, string>,
  nowMs: number = Date.now(),
): DailyReviewItem[] {
  const items: DailyReviewItem[] = [];
  const seenTopics = new Set<string>();

  function coursePriority(course_slug: string): number {
    return selectedCourseSlug && course_slug === selectedCourseSlug ? 0 : 1;
  }

  function topicTitle(course_slug: string, topic_slug: string): string {
    return topicLabels.get(`${course_slug}::${topic_slug}`) ?? prettifySlug(topic_slug);
  }

  function subtopicTitle(course_slug: string, topic_slug: string, subtopic_slug: string): string {
    return subtopicLabels.get(`${course_slug}::${topic_slug}::${subtopic_slug}`) ?? prettifySlug(subtopic_slug);
  }

  function push(row: MasteryInput, subtopic: SubtopicInput | null, reason: ReviewReason): boolean {
    if (items.length >= MAX_ITEMS) return false;
    const topicKey = `${row.course_slug}::${row.topic_slug}`;
    if (seenTopics.has(topicKey)) return false;
    seenTopics.add(topicKey);

    const subtopic_slug = subtopic?.subtopic_slug ?? null;
    const title = subtopic_slug
      ? subtopicTitle(row.course_slug, row.topic_slug, subtopic_slug)
      : topicTitle(row.course_slug, row.topic_slug);
    const mastery_score = subtopic?.mastery_score ?? row.mastery_score;
    const last_updated = subtopic?.last_updated ?? row.last_updated;
    // Link to the topic page (always valid); subtopic shown as metadata only.
    const suggested_action_href = `/course/${row.course_slug}/${row.topic_slug}`;

    items.push({
      title,
      course_slug: row.course_slug,
      topic_slug: row.topic_slug,
      subtopic_slug,
      mastery_score,
      last_updated,
      reason,
      suggested_action_href,
    });
    return true;
  }

  // ── Tier 1: weak (mastery < 50) ──────────────────────────────────────────
  const weakTopics = [...masteryRows]
    .filter((r) => r.mastery_score < 50)
    .sort((a, b) => {
      const cp = coursePriority(a.course_slug) - coursePriority(b.course_slug);
      return cp !== 0 ? cp : a.mastery_score - b.mastery_score;
    });

  for (const row of weakTopics) {
    if (items.length >= MAX_ITEMS) break;
    const weakestSub = subtopicRows
      .filter(
        (s) =>
          s.course_slug === row.course_slug &&
          s.topic_slug === row.topic_slug &&
          s.mastery_score < 50,
      )
      .sort((a, b) => a.mastery_score - b.mastery_score)[0] ?? null;
    push(row, weakestSub, "weak");
  }

  // ── Tier 2: stale (50–80 mastery, older than 14 days) ────────────────────
  const staleTopics = [...masteryRows]
    .filter((r) => {
      const age = nowMs - new Date(r.last_updated).getTime();
      return r.mastery_score >= 50 && r.mastery_score < 80 && age > MS_14;
    })
    .sort((a, b) => {
      const cp = coursePriority(a.course_slug) - coursePriority(b.course_slug);
      if (cp !== 0) return cp;
      return new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime();
    });

  for (const row of staleTopics) {
    if (items.length >= MAX_ITEMS) break;
    push(row, null, "stale");
  }

  // ── Tier 3: confidence-building (mastery ≥ 80, older than 21 days) ───────
  const confTopics = [...masteryRows]
    .filter((r) => {
      const age = nowMs - new Date(r.last_updated).getTime();
      return r.mastery_score >= 80 && age > MS_21;
    })
    .sort((a, b) => {
      const cp = coursePriority(a.course_slug) - coursePriority(b.course_slug);
      if (cp !== 0) return cp;
      return new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime();
    });

  for (const row of confTopics) {
    if (items.length >= MAX_ITEMS) break;
    push(row, null, "confidence-building");
  }

  return items;
}
