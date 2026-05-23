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

export type StrengthSummary = {
  title: "Strengths" | "Emerging strengths";
  items: string[];
  note: string;
};

export type ThirtyDayPlanWeek = {
  week: string;
  focus: string;
  lessons: string[];
  checkLabel: "End-of-week check" | "Practice target" | "Review" | "Tasks";
  checks: string[];
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

export function getOrderedRecommendedLessons(score: DiagnosticScore) {
  const groupedLessons = groupRecommendedLessons(score);
  const { topPriorityUnits, secondaryConsolidation } =
    getPriorityUnitGroups(score);
  const priorityOrder = [
    ...topPriorityUnits.map((unit) => unit.unit),
    ...secondaryConsolidation.map((unit) => unit.unit),
  ];

  return [...groupedLessons].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.unit);
    const bIndex = priorityOrder.indexOf(b.unit);

    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    }

    return a.unit.localeCompare(b.unit);
  });
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

export function getStrengthSummary(score: DiagnosticScore): StrengthSummary {
  const units = getUnitBreakdown(score).filter(
    (unit) => unit.interpretation !== "Not enough evidence"
  );

  if (units.length === 0) {
    return {
      title: "Emerging strengths",
      items: [],
      note: "No clear strength area was identified from this diagnostic alone.",
    };
  }

  const formalStrengths = units
    .filter((unit) => unit.interpretation === "Strength")
    .map((unit) => `${unit.unit} (${formatUnitScore(unit)})`);

  if (formalStrengths.length > 0) {
    return {
      title: "Strengths",
      items: formalStrengths,
      note: "These were the strongest areas in this diagnostic. They should still be revisited through mixed practice before the next assessment.",
    };
  }

  const highestPercentage = Math.max(
    ...units.map((unit) => unit.percentage ?? -1)
  );
  const emergingStrengths = units
    .filter((unit) => unit.percentage === highestPercentage)
    .slice(0, 3)
    .map((unit) => `${unit.unit} (${formatUnitScore(unit)})`);

  return {
    title: "Emerging strengths",
    items: emergingStrengths,
    note:
      emergingStrengths.length > 0
        ? "These were the strongest areas in this diagnostic, but they should still be consolidated before being treated as secure strengths."
        : "No clear strength area was identified from this diagnostic alone.",
  };
}

function joinUnitNames(units: UnitBreakdownItem[]) {
  if (units.length === 0) {
    return "";
  }

  if (units.length === 1) {
    return units[0].unit;
  }

  if (units.length === 2) {
    return `${units[0].unit} and ${units[1].unit}`;
  }

  return `${units
    .slice(0, -1)
    .map((unit) => unit.unit)
    .join(", ")}, and ${units[units.length - 1].unit}`;
}

export function getWhatThisMeansSummary(score: DiagnosticScore) {
  const { topPriorityUnits, secondaryConsolidation } =
    getPriorityUnitGroups(score);
  const sentences: string[] = [];
  const priorityNames = joinUnitNames(topPriorityUnits);
  const consolidationNames = joinUnitNames(secondaryConsolidation);

  if (score.percentage >= 80) {
    sentences.push(
      "This diagnostic suggests the student has a solid overall base, with the next improvement likely to come from targeted consolidation rather than starting again."
    );
  } else if (score.percentage >= 60) {
    sentences.push(
      "This diagnostic suggests the student has some usable foundations, but there are still mark leaks that should be addressed before broad mixed practice."
    );
  } else {
    sentences.push(
      "This diagnostic suggests the most useful next step is focused revision on a small number of priority areas, rather than trying to revise everything at once."
    );
  }

  if (priorityNames && consolidationNames) {
    sentences.push(
      `The clearest priority area${topPriorityUnits.length === 1 ? " is" : "s are"} ${priorityNames}, with ${consolidationNames} needing secondary consolidation.`
    );
  } else if (priorityNames) {
    sentences.push(
      `The clearest priority area${topPriorityUnits.length === 1 ? " is" : "s are"} ${priorityNames}.`
    );
  } else if (consolidationNames) {
    sentences.push(
      `The developing area${secondaryConsolidation.length === 1 ? "" : "s"} to consolidate next ${secondaryConsolidation.length === 1 ? "is" : "are"} ${consolidationNames}.`
    );
  }

  if (score.highConfidenceErrors.length > 0) {
    sentences.push(
      "The high-confidence errors are worth reviewing carefully because they may point to misconceptions rather than simple uncertainty."
    );
  }

  if (sentences.length < 3) {
    sentences.push(
      "The next step should be targeted revision in these areas before broad mixed practice."
    );
  }

  return sentences.slice(0, 3);
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
  const groupedLessons = getOrderedRecommendedLessons(score);
  const { topPriorityUnits, secondaryConsolidation } =
    getPriorityUnitGroups(score);
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
      focus: first?.unit ?? "Highest-priority consolidation",
      lessons: lessonTitlesForPlan(groupedLessons, first?.unit),
      checkLabel: "End-of-week check" as const,
      checks: [
        "Reattempt similar diagnostic-style questions at the end of the week.",
      ],
    },
    {
      week: "Week 2",
      focus: second?.unit ?? "Second priority or consolidation",
      lessons: lessonTitlesForPlan(groupedLessons, second?.unit),
      checkLabel: "Practice target" as const,
      checks: [
        "Complete guided practice and independent practice before the mastery quiz.",
      ],
    },
    {
      week: "Week 3",
      focus: week3Focus,
      lessons:
        third !== undefined
          ? lessonTitlesForPlan(groupedLessons, third.unit)
          : ["Mastery quizzes for the priority lessons from Weeks 1 and 2"],
      checkLabel: "Review" as const,
      checks: [
        score.highConfidenceErrors.length > 0
          ? "Recheck high-confidence errors after practice."
          : "Use mixed revision across the course if there were few clear weak units.",
      ],
    },
    {
      week: "Week 4",
      focus: "Mixed practice and confidence check",
      lessons: [],
      checkLabel: "Tasks" as const,
      checks: [
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
  const groupedLessons = getOrderedRecommendedLessons(score);
  const unitBreakdown = getUnitBreakdown(score);
  const repeatedWeakAreas = getRepeatedWeakAreas(score);
  const strengthSummary = getStrengthSummary(score);
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
    "What this means",
    ...getWhatThisMeansSummary(score).map((sentence) => `- ${sentence}`),
    "",
    "Unit breakdown",
    ...unitBreakdown.map(
      (unit) =>
        `- ${unit.unit}: ${formatUnitScore(unit)} - ${unit.interpretation}`
    ),
    "",
    strengthSummary.title,
    ...listLines(strengthSummary.items, strengthSummary.note),
    ...(strengthSummary.items.length > 0 ? [`- ${strengthSummary.note}`] : []),
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
      week.week,
      `- Focus: ${week.focus}`,
      ...(week.lessons.length > 0
        ? ["- Lessons:", ...week.lessons.map((lesson) => `  - ${lesson}`)]
        : []),
      `- ${week.checkLabel}:`,
      ...week.checks.map((check) => `  - ${check}`),
    ]),
    "",
    "Notes for parent/student",
    "- This diagnostic is for learning support only.",
    "- It is not an official school result.",
    "- Results should be interpreted alongside school feedback and recent assessment performance.",
  ].join("\n");
}
