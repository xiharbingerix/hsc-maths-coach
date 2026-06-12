type MasteryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  attempt_count: number;
};

export type BandPrediction =
  | { state: "no_course" }
  | { state: "no_data"; courseSlug: string }
  | { state: "building"; courseSlug: string; confidence: "low" }
  | {
      state: "ready";
      band: string;
      confidence: "low" | "medium" | "high";
      nextActionLabel: string;
      nextActionHref: string;
    };

const EXTENSION_SLUGS = new Set(["year-11-extension", "year-12-extension-1"]);
const HSC_SLUGS = new Set([
  "year-11-standard",
  "year-12-standard-2",
  "year-11-advanced",
  "year-11-extension",
  "year-12-extension-1",
]);

export function predictBand(
  masteryRows: MasteryRow[],
  courseSlug: string | null | undefined,
  totalCourseTopics: number
): BandPrediction {
  if (!courseSlug) return { state: "no_course" };

  const rows = masteryRows.filter(
    (r) => r.course_slug === courseSlug && r.attempt_count > 0
  );
  const topicCount = rows.length;

  if (topicCount === 0) return { state: "no_data", courseSlug };

  const avgMastery = rows.reduce((s, r) => s + r.mastery_score, 0) / topicCount;
  const coverage = totalCourseTopics > 0 ? topicCount / totalCourseTopics : 0;
  const weakCount = rows.filter((r) => r.mastery_score < 50).length;

  if (topicCount < 2 || coverage < 0.08) {
    return { state: "building", courseSlug, confidence: "low" };
  }

  const coverageScore = Math.min(100, coverage * 100);
  const weakPenalty = topicCount > 0 ? (weakCount / topicCount) * 12 : 0;
  const score = avgMastery * 0.65 + coverageScore * 0.35 - weakPenalty;

  let confidence: "low" | "medium" | "high";
  if (coverage >= 0.5 && topicCount >= 6) confidence = "high";
  else if (coverage >= 0.25 || topicCount >= 4) confidence = "medium";
  else confidence = "low";

  const weakest = rows.slice().sort((a, b) => a.mastery_score - b.mastery_score)[0];
  const nextActionHref = weakest
    ? `/course/${weakest.course_slug}/${weakest.topic_slug}`
    : `/course/${courseSlug}`;
  const nextActionLabel =
    weakCount > 0 ? "Strengthen your weakest topic" : "Keep practising all topics";

  let band: string;
  if (EXTENSION_SLUGS.has(courseSlug)) {
    if (score >= 72) band = "E4";
    else if (score >= 56) band = "E3";
    else if (score >= 40) band = "E2";
    else band = "E1";
  } else if (HSC_SLUGS.has(courseSlug)) {
    if (score >= 82) band = "Band 6";
    else if (score >= 68) band = "Band 5";
    else if (score >= 54) band = "Band 4";
    else if (score >= 40) band = "Band 3";
    else band = "Band 2";
  } else {
    if (score >= 80) band = "Advanced";
    else if (score >= 65) band = "Proficient";
    else if (score >= 50) band = "Developing";
    else band = "Foundation";
  }

  return { state: "ready", band, confidence, nextActionLabel, nextActionHref };
}
