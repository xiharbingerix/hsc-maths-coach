import { courseUnits } from "./courseUnits";
import type { DiagnosticScore } from "./diagnosticScoring";
import type { DiagnosticSubmission } from "./reportTypes";

export type UnitBreakdownItem = {
  unit: string;
  correct: number | null;
  total: number | null;
  attempted: number;
  percentage: number | null;
  interpretation:
    | "Strength"
    | "Developing"
    | "Priority area"
    | "High-priority gap"
    | "Not enough evidence";
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
  correct: number | null,
  percentage: number | null,
  total: number | null,
  attempted: number
): UnitBreakdownItem["interpretation"] {
  if (!total || attempted === 0 || correct === null) {
    return "Not enough evidence";
  }

  if (total === 6) {
    if (correct >= 5) {
      return "Strength";
    }

    if (correct === 4) {
      return "Developing";
    }

    if (correct >= 2) {
      return "Priority area";
    }

    return "High-priority gap";
  }

  if (percentage !== null && percentage >= 83) {
    return "Strength";
  }

  if (percentage !== null && percentage >= 67) {
    return "Developing";
  }

  if (percentage !== null && percentage >= 33) {
    return "Priority area";
  }

  return "High-priority gap";
}

export function getUnitBreakdown(score: DiagnosticScore): UnitBreakdownItem[] {
  return courseUnits.map((unit) => {
    const section = score.bySection.find((item) => item.section === unit.title);
    const attempted = score.questionResults.filter(
      (result) =>
        result.section === unit.title &&
        result.studentAnswer !== "Blank" &&
        result.studentAnswer !== "I don't know yet"
    ).length;

    return {
      unit: unit.title,
      correct: section?.correct ?? null,
      total: section?.total ?? null,
      attempted,
      percentage: section?.percentage ?? null,
      interpretation: unitInterpretation(
        section?.correct ?? null,
        section?.percentage ?? null,
        section?.total ?? null,
        attempted
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

function priorityRank(unit: UnitBreakdownItem) {
  if (unit.interpretation === "High-priority gap") {
    return 0;
  }

  if (unit.interpretation === "Priority area") {
    return 1;
  }

  if (unit.interpretation === "Developing") {
    return 2;
  }

  return 3;
}

export function getPriorityUnitGroups(score: DiagnosticScore) {
  const ordered = getUnitBreakdown(score)
    .filter((unit) => unit.interpretation !== "Not enough evidence")
    .sort((a, b) => {
      const rankDifference = priorityRank(a) - priorityRank(b);

      if (rankDifference !== 0) {
        return rankDifference;
      }

      return (a.percentage ?? 100) - (b.percentage ?? 100);
    });

  return {
    topPriorityUnits: ordered
      .filter(
        (unit) =>
          unit.interpretation === "High-priority gap" ||
          unit.interpretation === "Priority area"
      )
      .slice(0, 3),
    secondaryConsolidation: ordered
      .filter((unit) => unit.interpretation === "Developing")
      .slice(0, 3),
  };
}

function lessonsForUnit(
  groupedLessons: GroupedLessonRecommendations[],
  unit: string | undefined
) {
  if (!unit) {
    return [];
  }

  return groupedLessons.find((group) => group.unit === unit)?.lessons ?? [];
}

function lessonTitlesForPlan(
  groupedLessons: GroupedLessonRecommendations[],
  unit: string | undefined
) {
  const lessons = lessonsForUnit(groupedLessons, unit)
    .slice(0, 3)
    .map((lesson) => lesson.title);

  if (lessons.length === 0) {
    return ["Use the recommended course pathway and reattempt similar diagnostic-style questions."];
  }

  return lessons;
}

export function getPersonalisedThirtyDayPlan(score: DiagnosticScore) {
  const groupedLessons = groupRecommendedLessons(score);
  const { topPriorityUnits, secondaryConsolidation } = getPriorityUnitGroups(score);
  const first = topPriorityUnits[0];
  const second = topPriorityUnits[1] ?? secondaryConsolidation[0];
  const third = topPriorityUnits[2] ?? secondaryConsolidation[1];

  const week3Focus =
    third?.unit ??
    (score.highConfidenceErrors.length > 0
      ? "high-confidence errors"
      : "mixed consolidation");

  return [
    {
      week: "Week 1",
      title: first?.unit ?? "Highest-priority consolidation",
      actions: [
        `Focus on ${first?.unit ?? "the clearest priority area from the diagnostic"}.`,
        ...lessonTitlesForPlan(groupedLessons, first?.unit).map(
          (title) => `Complete: ${title}.`
        ),
        "Reattempt similar diagnostic-style questions at the end of the week.",
      ],
    },
    {
      week: "Week 2",
      title: second?.unit ?? "Second priority or consolidation",
      actions: [
        `Focus on ${second?.unit ?? "the next developing area or mixed consolidation"}.`,
        ...lessonTitlesForPlan(groupedLessons, second?.unit).map(
          (title) => `Complete: ${title}.`
        ),
        "Complete guided practice and independent practice before the mastery quiz.",
      ],
    },
    {
      week: "Week 3",
      title: week3Focus,
      actions:
        third !== undefined
          ? [
              `Focus on ${third.unit}.`,
              ...lessonTitlesForPlan(groupedLessons, third.unit).map(
                (title) => `Complete: ${title}.`
              ),
              "Review any high-confidence errors after practice.",
            ]
          : [
              "Review high-confidence errors and the skills attached to those questions.",
              "Complete mastery quizzes for the priority lessons from Weeks 1 and 2.",
              "If there were few clear weak units, use mixed revision across the course.",
            ],
    },
    {
      week: "Week 4",
      title: "Mixed practice and confidence check",
      actions: [
        "Complete mixed practice across the priority and developing units.",
        "Reattempt diagnostic-style questions from the missed skills.",
        "Review low-confidence correct answers so secure marks become more reliable.",
      ],
    },
  ];
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
    "Top priority areas",
    ...listLines(
      getPriorityUnitGroups(score).topPriorityUnits.map(
        (unit) => `${unit.unit} (${formatUnitScore(unit)})`
      ),
      "No single priority area stood out strongly from this diagnostic."
    ),
    "Secondary consolidation",
    ...listLines(
      getPriorityUnitGroups(score).secondaryConsolidation.map(
        (unit) => `${unit.unit} (${formatUnitScore(unit)})`
      ),
      "No additional developing unit was identified from this diagnostic."
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
    ...getPersonalisedThirtyDayPlan(score).flatMap((week) => [
      `${week.week}: ${week.title}`,
      ...week.actions.map((action) => `- ${action}`),
    ]),
    "",
    "Notes for parent/student",
    "- This diagnostic is for learning support only.",
    "- It is not an official school result.",
    "- Results should be interpreted alongside school feedback and recent assessment performance.",
  ].join("\n");
}
