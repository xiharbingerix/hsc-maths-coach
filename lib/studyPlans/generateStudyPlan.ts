import { courseCatalogue } from "../courseUnits";

export type StudyPlanMasteryRow = {
  course_slug?: string;
  courseSlug?: string;
  topic_slug?: string;
  topicSlug?: string;
  mastery_score?: number;
  masteryScore?: number;
  attempt_count?: number;
  attemptCount?: number;
};

export type StudyPlanDiagnosticResult = {
  courseSlug?: string;
  unitSlug?: string;
  topicSlug?: string;
  unitTitle?: string;
  topicTitle?: string;
  title?: string;
  correct?: number;
  total?: number;
  startHref?: string;
};

export type StudyPlanSubtopicRow = {
  course_slug?: string;
  courseSlug?: string;
  topic_slug?: string;
  topicSlug?: string;
  subtopic_slug?: string;
  subtopicSlug?: string;
  mastery_score?: number;
  masteryScore?: number;
};

export type StudyPlanSubtopicFocus = {
  slug: string;
  title: string;
  mastery: number;
};

export type StudyPlanUnitRecommendation = {
  courseSlug: string;
  unitSlug: string;
  title: string;
  mastery: number;
  priorityLevel: "high" | "medium" | "maintenance";
  reason: string;
  href: string;
  estimatedLessons: number;
  /** Weakest subtopic/lesson within this unit, when subtopic-level data exists. */
  weakestSubtopic: StudyPlanSubtopicFocus | null;
};

export type StudyPlan = {
  headline: string;
  summary: string;
  nextTopic: StudyPlanUnitRecommendation | null;
  recommendedUnits: StudyPlanUnitRecommendation[];
  estimatedHours: number;
  priorityLevel: "high" | "medium" | "maintenance";
};

type GenerateStudyPlanInput = {
  yearLevel: string;
  masteryRows?: StudyPlanMasteryRow[];
  diagnosticResults?: StudyPlanDiagnosticResult[];
  /** Subtopic-level mastery rows (e.g. student_subtopic_mastery). Optional — when
   *  present, each recommendation is enriched with its weakest subtopic so the
   *  study plan can point at a specific lesson, not just a whole unit. */
  subtopicRows?: StudyPlanSubtopicRow[];
  /** courseSlug::unitSlug::subtopicSlug -> human title, for display. */
  subtopicLabels?: Map<string, string>;
};

function normaliseScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function priorityFor(score: number): StudyPlan["priorityLevel"] {
  if (score < 40) return "high";
  if (score < 70) return "medium";
  return "maintenance";
}

function priorityLabel(priority: StudyPlan["priorityLevel"]): string {
  if (priority === "high") return "High priority";
  if (priority === "medium") return "Medium priority";
  return "Maintenance";
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function findCatalogueUnit(courseSlug: string, unitSlug: string) {
  const course = courseCatalogue.find((item) => item.courseSlug === courseSlug);
  const unit = course?.units.find((candidate) => {
    const hrefSlug = candidate.href.split("/").filter(Boolean).at(-1);
    return hrefSlug === unitSlug;
  });
  return { course, unit };
}

function unitHref(courseSlug: string, unitSlug: string, fallback?: string) {
  if (fallback) return fallback;
  const { unit } = findCatalogueUnit(courseSlug, unitSlug);
  if (unit?.href) return unit.href;
  return `/course/${courseSlug}/${unitSlug}`;
}

function lessonCount(courseSlug: string, unitSlug: string) {
  const { unit } = findCatalogueUnit(courseSlug, unitSlug);
  return Math.max(1, unit?.activeLessonCount ?? 3);
}

function buildReason(
  score: number,
  source: "mastery" | "diagnostic",
  subtopic: StudyPlanSubtopicFocus | null
) {
  const priority = priorityFor(score);
  const base =
    source === "diagnostic"
      ? `${priorityLabel(priority)} because your diagnostic score for this unit was ${score}%.`
      : `${priorityLabel(priority)} because your current mastery for this topic is ${score}%.`;
  // Only call out a subtopic when it's genuinely weaker than the unit average —
  // otherwise it's redundant with the headline number.
  if (subtopic && subtopic.mastery < score) {
    return `${base} Your weakest area here is ${subtopic.title} (${subtopic.mastery}%) — start there.`;
  }
  return base;
}

/** Finds the lowest-mastery subtopic under a given course/unit, if any subtopic data exists for it. */
function findWeakestSubtopic(
  courseSlug: string,
  unitSlug: string,
  subtopicRows: StudyPlanSubtopicRow[],
  subtopicLabels?: Map<string, string>
): StudyPlanSubtopicFocus | null {
  let weakestSlug: string | null = null;
  let weakestScore = Infinity;

  for (const row of subtopicRows) {
    const rowCourse = row.course_slug ?? row.courseSlug;
    const rowUnit = row.topic_slug ?? row.topicSlug;
    const slug = row.subtopic_slug ?? row.subtopicSlug;
    if (rowCourse !== courseSlug || rowUnit !== unitSlug || !slug) continue;

    const score = normaliseScore(row.mastery_score ?? row.masteryScore ?? 0);
    if (weakestSlug === null || score < weakestScore) {
      weakestSlug = slug;
      weakestScore = score;
    }
  }

  if (weakestSlug === null) return null;
  const title =
    subtopicLabels?.get(`${courseSlug}::${unitSlug}::${weakestSlug}`) ??
    prettifySlug(weakestSlug);
  return { slug: weakestSlug, title, mastery: weakestScore };
}

export function generateStudyPlan({
  yearLevel,
  masteryRows = [],
  diagnosticResults = [],
  subtopicRows = [],
  subtopicLabels,
}: GenerateStudyPlanInput): StudyPlan {
  const recommendations = new Map<string, StudyPlanUnitRecommendation>();

  for (const result of diagnosticResults) {
    const unitSlug = result.unitSlug ?? result.topicSlug;
    if (!unitSlug || !result.total) continue;

    const score = normaliseScore(((result.correct ?? 0) / result.total) * 100);
    const courseSlug = result.courseSlug ?? yearLevel;
    const lessons = lessonCount(courseSlug, unitSlug);
    const weakestSubtopic = findWeakestSubtopic(courseSlug, unitSlug, subtopicRows, subtopicLabels);
    recommendations.set(`${courseSlug}/${unitSlug}`, {
      courseSlug,
      unitSlug,
      title: result.unitTitle ?? result.topicTitle ?? result.title ?? prettifySlug(unitSlug),
      mastery: score,
      priorityLevel: priorityFor(score),
      reason: buildReason(score, "diagnostic", weakestSubtopic),
      href: unitHref(courseSlug, unitSlug, result.startHref),
      estimatedLessons: lessons,
      weakestSubtopic,
    });
  }

  for (const row of masteryRows) {
    const unitSlug = row.topic_slug ?? row.topicSlug;
    if (!unitSlug) continue;

    const courseSlug = row.course_slug ?? row.courseSlug ?? yearLevel;
    const score = normaliseScore(row.mastery_score ?? row.masteryScore ?? 0);
    const lessons = lessonCount(courseSlug, unitSlug);
    const weakestSubtopic = findWeakestSubtopic(courseSlug, unitSlug, subtopicRows, subtopicLabels);
    recommendations.set(`${courseSlug}/${unitSlug}`, {
      courseSlug,
      unitSlug,
      title: prettifySlug(unitSlug),
      mastery: score,
      priorityLevel: priorityFor(score),
      reason: buildReason(score, "mastery", weakestSubtopic),
      href: unitHref(courseSlug, unitSlug),
      estimatedLessons: lessons,
      weakestSubtopic,
    });
  }

  const recommendedUnits = [...recommendations.values()].sort(
    (left, right) =>
      left.mastery - right.mastery ||
      left.title.localeCompare(right.title)
  );
  const nextTopic = recommendedUnits[0] ?? null;
  const priorityLevel = nextTopic?.priorityLevel ?? "maintenance";
  const estimatedLessons = recommendedUnits
    .slice(0, 3)
    .reduce((sum, unit) => sum + unit.estimatedLessons, 0);
  const estimatedHours = Math.max(1, Math.ceil((estimatedLessons * 25) / 60));

  if (!nextTopic) {
    return {
      headline: "Complete a diagnostic or worksheet to unlock your study plan.",
      summary:
        "Once Nova Maths has diagnostic or mastery data, it will recommend the next unit to focus on.",
      nextTopic: null,
      recommendedUnits: [],
      estimatedHours: 0,
      priorityLevel,
    };
  }

  return {
    headline: `Focus on ${nextTopic.title} next.`,
    summary:
      priorityLevel === "high"
        ? "Start with the weakest topic first, then work through the next two recommended units."
        : priorityLevel === "medium"
        ? "You have a workable base here. A focused review should lift this topic quickly."
        : "You are in maintenance mode. Keep this topic fresh while building the next weakest area.",
    nextTopic,
    recommendedUnits,
    estimatedHours,
    priorityLevel,
  };
}

