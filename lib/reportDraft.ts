import { courseUnits } from "./courseUnits";
import type { DiagnosticScore } from "./diagnosticScoring";
import type { DiagnosticSubmission } from "./reportTypes";

export type UnitBreakdownItem = {
  unit: string;
  correct: number | null;
  total: number | null;
  percentage: number | null;
  interpretation: "strong area" | "needs consolidation" | "priority area" | "not enough evidence";
};

export type GroupedLessonRecommendations = {
  unit: string;
  lessons: {
    title: string;
    href: string;
    reason: string;
  }[];
};

function listLines(items: string[], fallback: string) {
  if (items.length === 0) {
    return [`- ${fallback}`];
  }

  return items.map((item) => `- ${item}`);
}

export function diagnosticInterpretation(score: DiagnosticScore) {
  if (score.percentage >= 80) {
    return "This result suggests a solid overall base. The most useful next step is targeted consolidation of the remaining likely mark leaks.";
  }

  if (score.percentage >= 60) {
    return "This result suggests the student has several useful foundations in place, with some priority areas that should be addressed to make revision more efficient.";
  }

  if (score.attempted < Math.ceil(score.totalQuestions * 0.6)) {
    return "This result suggests the first priority is building confidence and fluency across accessible core skills, then gradually moving into exam-style questions.";
  }

  return "This result suggests there are important likely mark leaks across the diagnostic. The next best step is to focus on the highest-impact priority areas before broad mixed revision.";
}

function unitInterpretation(
  percentage: number | null,
  total: number | null
): UnitBreakdownItem["interpretation"] {
  if (!total) {
    return "not enough evidence";
  }

  if (percentage !== null && percentage >= 75) {
    return "strong area";
  }

  if (percentage !== null && percentage >= 50) {
    return "needs consolidation";
  }

  return "priority area";
}

export function getUnitBreakdown(score: DiagnosticScore): UnitBreakdownItem[] {
  return courseUnits.map((unit) => {
    const section = score.bySection.find((item) => item.section === unit.title);

    return {
      unit: unit.title,
      correct: section?.correct ?? null,
      total: section?.total ?? null,
      percentage: section?.percentage ?? null,
      interpretation: unitInterpretation(
        section?.percentage ?? null,
        section?.total ?? null
      ),
    };
  });
}

function unitFromLessonHref(href: string) {
  return (
    courseUnits.find((unit) => href.startsWith(`${unit.href}/`))?.title ??
    "Recommended lessons"
  );
}

export function groupRecommendedLessons(
  score: DiagnosticScore
): GroupedLessonRecommendations[] {
  const groups = new Map<string, GroupedLessonRecommendations["lessons"]>();

  score.recommendedNextLessons.forEach((lesson) => {
    const unit = unitFromLessonHref(lesson.href);
    groups.set(unit, [...(groups.get(unit) ?? []), lesson]);
  });

  return Array.from(groups.entries()).map(([unit, lessons]) => ({
    unit,
    lessons,
  }));
}

export function getRepeatedWeakAreas(score: DiagnosticScore) {
  const counts = score.weakTags.reduce<Record<string, number>>((result, tag) => {
    const key = `${tag.section}: ${tag.skill}`;
    return {
      ...result,
      [key]: (result[key] ?? 0) + 1,
    };
  }, {});

  return Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([label, count]) => `${label} (${count} questions)`);
}

function topPriorityUnit(score: DiagnosticScore) {
  return (
    getUnitBreakdown(score).find(
      (unit) => unit.interpretation === "priority area"
    )?.unit ??
    score.priorities[0] ??
    "the highest-priority area from the diagnostic"
  );
}

function formatUnitScore(unit: UnitBreakdownItem) {
  if (unit.total === null || unit.correct === null || unit.percentage === null) {
    return "not enough evidence";
  }

  return `${unit.correct}/${unit.total} (${unit.percentage}%)`;
}

export function generateDiagnosticReportDraft(
  submission: DiagnosticSubmission,
  score: DiagnosticScore
) {
  const groupedLessons = groupRecommendedLessons(score);
  const unitBreakdown = getUnitBreakdown(score);
  const repeatedWeakAreas = getRepeatedWeakAreas(score);
  const priorityUnit = topPriorityUnit(score);
  const recommendedLessonLines =
    groupedLessons.length > 0
      ? groupedLessons.flatMap((group) => [
          `- ${group.unit}`,
          ...group.lessons.map(
            (lesson) =>
              `  - ${lesson.title}: ${lesson.reason} (${lesson.href})`
          ),
        ])
      : [
          "- Start with the course unit that best matches the weakest listed section.",
          "- If no exact unit match is available yet, revise the weakest listed sections first and reattempt similar diagnostic-style questions.",
        ];

  return [
    "HSC Maths Advanced Diagnostic Report",
    "",
    "Student snapshot",
    `- Student first name: ${submission.student_first_name || "Not provided"}`,
    `- Year level: ${submission.year_level ?? "Not provided"}`,
    `- Course: ${submission.course ?? "Not provided"}`,
    `- Target result: ${submission.target_result || "Not provided"}`,
    `- Next major assessment timing: ${
      submission.assessment_timing || "Not provided"
    }`,
    `- Selected offer: ${submission.offer_selected || "Not selected"}`,
    "",
    "Overall result",
    `- Overall score: ${score.correct}/${score.totalQuestions} (${score.percentage}%)`,
    `- Attempted questions: ${score.attempted}/${score.totalQuestions}`,
    `- Number marked \"I don't know yet\": ${score.idk}`,
    `- Blank questions: ${score.blank}`,
    `- ${diagnosticInterpretation(score)}`,
    "- This diagnostic is designed to identify priority areas, not to act as a school result.",
    "- The most useful next step is to target the areas where marks are most likely being lost.",
    "",
    "Unit breakdown",
    ...unitBreakdown.map(
      (unit) =>
        `- ${unit.unit}: ${formatUnitScore(unit)} - ${unit.interpretation}`
    ),
    "",
    "Strengths",
    ...listLines(
      score.strengths,
      "No clear strength area was identified from this diagnostic alone."
    ),
    "",
    "Priority areas",
    ...listLines(
      score.priorities,
      "No single priority area stood out strongly from this diagnostic."
    ),
    "- These areas should be addressed first because they are likely to produce the highest improvement.",
    "",
    "Likely mark leaks",
    ...listLines(
      score.highConfidenceErrors,
      "No major high-confidence error pattern was detected."
    ),
    "- High-confidence errors can indicate misconceptions rather than simple uncertainty.",
    ...listLines(
      repeatedWeakAreas,
      "No repeated weak-tag pattern was detected beyond the priority areas above."
    ),
    "",
    "Low-confidence correct answers",
    ...listLines(
      score.lowConfidenceCorrectAnswers,
      "No clear low-confidence correct pattern was detected."
    ),
    "- Low-confidence correct answers may only need consolidation and practice.",
    "",
    "Recommended next lessons",
    ...recommendedLessonLines,
    "",
    "Suggested 30-day revision plan",
    "Week 1:",
    `- Address the top priority unit: ${priorityUnit}.`,
    "- Reattempt similar diagnostic-style questions.",
    "Week 2:",
    "- Work through the recommended lessons for the second priority area.",
    "- Complete guided and independent practice.",
    "Week 3:",
    "- Complete mastery quizzes for priority lessons.",
    "- Review high-confidence errors.",
    "Week 4:",
    "- Complete mixed practice.",
    "- Recheck weak areas before the next assessment.",
    "",
    "Notes for parent/student",
    "- This diagnostic is for learning support only.",
    "- It is not an official school result.",
    "- Results should be interpreted alongside school feedback and recent assessment performance.",
  ].join("\n");
}
