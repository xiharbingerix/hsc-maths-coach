import { questions, type DiagnosticQuestion } from "./questions";

export const IDK_ANSWER = "__IDK__";

type SubmissionMap = Record<string, string> | null | undefined;

type Difficulty = DiagnosticQuestion["difficulty"];

export type DiagnosticScore = {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  idk: number;
  blank: number;
  percentage: number;
  bySection: {
    section: string;
    total: number;
    correct: number;
    percentage: number;
    averageConfidence?: string;
  }[];
  byDifficulty: {
    difficulty: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
  weakTags: {
    diagnosticTag: string;
    skill: string;
    section: string;
    difficulty: string;
    questionId: string;
    studentAnswer: string;
    correctAnswer: string;
    confidence?: string;
  }[];
  strengths: string[];
  priorities: string[];
  highConfidenceErrors: string[];
  lowConfidenceCorrectAnswers: string[];
  recommendedNextLessons: {
    title: string;
    href: string;
    reason: string;
  }[];
  reportNotes: string[];
  questionResults: {
    id: string;
    section: string;
    skill: string;
    difficulty: string;
    diagnosticTag: string;
    studentAnswer: string;
    correctAnswer: string;
    correct: boolean;
    confidence?: string;
  }[];
};

const difficultyOrder: Difficulty[] = ["core", "standard", "extension"];

const lessonRecommendations: Record<
  string,
  { title: string; href: string }
> = {
  "calculus-differentiate-polynomial": {
    title: "Differentiating polynomial functions",
    href: "/course/differential-calculus/differentiating-polynomial-functions",
  },
  "calculus-tangent-gradient": {
    title: "Tangents and normals",
    href: "/course/differential-calculus/tangents-and-normals",
  },
  "calculus-stationary-x-values": {
    title: "Stationary points",
    href: "/course/differential-calculus/stationary-points",
  },
  "calculus-stationary-coordinate": {
    title: "Stationary points",
    href: "/course/differential-calculus/stationary-points",
  },
  "calculus-stationary-classification": {
    title: "First derivative test",
    href: "/course/differential-calculus/first-derivative-test",
  },
  "calculus-derivative-sign-intervals": {
    title: "Increasing and decreasing functions",
    href: "/course/differential-calculus/increasing-decreasing-functions",
  },
  "graph-increasing-decreasing": {
    title: "Increasing and decreasing functions",
    href: "/course/differential-calculus/increasing-decreasing-functions",
  },
  "graph-tangent-gradient-sign": {
    title: "Tangents and normals",
    href: "/course/differential-calculus/tangents-and-normals",
  },
  "graph-x-intercepts": {
    title: "Curve sketching with derivatives",
    href: "/course/differential-calculus/curve-sketching",
  },
  "graph-domain-range": {
    title: "Curve sketching with derivatives",
    href: "/course/differential-calculus/curve-sketching",
  },
};

function percentage(correct: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((correct / total) * 100);
}

function confidenceValue(value: string | undefined): number | undefined {
  if (value === "Low") {
    return 1;
  }

  if (value === "Medium") {
    return 2;
  }

  if (value === "High") {
    return 3;
  }

  return undefined;
}

function confidenceLabel(values: number[]) {
  if (values.length === 0) {
    return undefined;
  }

  const average =
    values.reduce((total, value) => total + value, 0) / values.length;

  if (average < 1.5) {
    return "Low";
  }

  if (average < 2.5) {
    return "Medium";
  }

  return "High";
}

function displayAnswer(value: string | undefined) {
  if (!value || value.trim() === "") {
    return "Blank";
  }

  if (value === IDK_ANSWER) {
    return "I don't know yet";
  }

  return value;
}

export function normaliseAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[π]/g, "pi")
    .replace(/\\pi/g, "pi")
    .replace(/[√]/g, "sqrt")
    .replace(/\\sqrt/g, "sqrt")
    .replace(/\\left|\\right/g, "")
    .replace(/\\,/g, "")
    .replace(/\\;/g, "")
    .replace(/\\quad/g, "")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\$/g, "")
    .replace(/\s+/g, "")
    .replace(/\(([^,()]+),\s*([^,()]+)\)/g, "($1,$2)");
}

export function isCorrectAnswer(
  userAnswer: string | undefined,
  question: DiagnosticQuestion
): boolean {
  if (!userAnswer || userAnswer.trim() === "" || userAnswer === IDK_ANSWER) {
    return false;
  }

  const normalisedUserAnswer = normaliseAnswer(userAnswer);
  const acceptedAnswers = [question.answer, ...(question.acceptedAnswers ?? [])];

  return acceptedAnswers.some(
    (answer) => normaliseAnswer(answer) === normalisedUserAnswer
  );
}

export function scoreDiagnostic(
  submissionAnswers: SubmissionMap,
  submissionConfidence: SubmissionMap
): DiagnosticScore {
  const answers = submissionAnswers ?? {};
  const confidence = submissionConfidence ?? {};

  const questionResults = questions.map((question) => {
    const studentAnswer = answers[question.id] ?? "";
    const correct = isCorrectAnswer(studentAnswer, question);
    const confidenceValueForQuestion = confidence[question.id];

    return {
      id: question.id,
      section: question.section,
      skill: question.skill,
      difficulty: question.difficulty,
      diagnosticTag: question.diagnosticTag,
      studentAnswer: displayAnswer(studentAnswer),
      correctAnswer: question.answer,
      correct,
      confidence: confidenceValueForQuestion,
    };
  });

  const correct = questionResults.filter((result) => result.correct).length;
  const idk = questions.filter(
    (question) => answers[question.id] === IDK_ANSWER
  ).length;
  const blank = questions.filter((question) => {
    const answer = answers[question.id];
    return !answer || answer.trim() === "";
  }).length;
  const attempted = questions.length - idk - blank;
  const incorrect = attempted - correct;

  const sectionNames = Array.from(
    new Set(questions.map((question) => question.section))
  );

  const bySection = sectionNames.map((section) => {
    const sectionQuestions = questions.filter(
      (question) => question.section === section
    );
    const sectionResults = questionResults.filter(
      (result) => result.section === section
    );
    const sectionConfidenceValues = sectionQuestions
      .map((question) => confidenceValue(confidence[question.id]))
      .filter((value): value is number => typeof value === "number");
    const sectionCorrect = sectionResults.filter(
      (result) => result.correct
    ).length;

    return {
      section,
      total: sectionQuestions.length,
      correct: sectionCorrect,
      percentage: percentage(sectionCorrect, sectionQuestions.length),
      averageConfidence: confidenceLabel(sectionConfidenceValues),
    };
  });

  const byDifficulty = difficultyOrder.map((difficulty) => {
    const difficultyQuestions = questions.filter(
      (question) => question.difficulty === difficulty
    );
    const difficultyCorrect = questionResults.filter(
      (result) => result.difficulty === difficulty && result.correct
    ).length;

    return {
      difficulty,
      total: difficultyQuestions.length,
      correct: difficultyCorrect,
      percentage: percentage(difficultyCorrect, difficultyQuestions.length),
    };
  });

  const weakTags = questionResults
    .filter((result) => !result.correct)
    .map((result) => ({
      diagnosticTag: result.diagnosticTag,
      skill: result.skill,
      section: result.section,
      difficulty: result.difficulty,
      questionId: result.id,
      studentAnswer: result.studentAnswer,
      correctAnswer: result.correctAnswer,
      confidence: result.confidence,
    }));

  const strengths = bySection
    .filter((section) => section.percentage >= 75)
    .sort((a, b) => b.percentage - a.percentage)
    .map((section) => `${section.section} (${section.correct}/${section.total})`);

  const priorities = bySection
    .filter((section) => section.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 4)
    .map((section) => `${section.section} (${section.correct}/${section.total})`);

  const highConfidenceErrors = weakTags
    .filter((tag) => tag.confidence === "High")
    .map((tag) => tag.skill);
  const lowConfidenceCorrect = questionResults
    .filter((result) => result.correct && result.confidence === "Low")
    .map((result) => result.skill);
  const recommendedNextLessons = weakTags.reduce<
    { title: string; href: string; reason: string }[]
  >((recommendations, tag) => {
    const recommendation = lessonRecommendations[tag.diagnosticTag];

    if (
      !recommendation ||
      recommendations.some((item) => item.href === recommendation.href)
    ) {
      return recommendations;
    }

    return [
      ...recommendations,
      {
        ...recommendation,
        reason: tag.skill,
      },
    ];
  }, []);

  const reportNotes = [
    strengths.length > 0
      ? `Strongest areas appear to be: ${strengths.join(", ")}.`
      : "No clear strongest area yet; review attempted questions and confidence before drawing conclusions.",
    priorities.length > 0
      ? `Priority revision areas appear to be: ${priorities.join(", ")}.`
      : "No major weak section stands out from this submission.",
    highConfidenceErrors.length > 0
      ? `High-confidence errors detected in: ${highConfidenceErrors.join(", ")}.`
      : "No high-confidence errors detected.",
    lowConfidenceCorrect.length > 0
      ? `Low-confidence correct answers detected in: ${lowConfidenceCorrect.join(", ")}.`
      : "No low-confidence correct answers detected.",
  ];

  return {
    totalQuestions: questions.length,
    attempted,
    correct,
    incorrect,
    idk,
    blank,
    percentage: percentage(correct, questions.length),
    bySection,
    byDifficulty,
    weakTags,
    strengths,
    priorities,
    highConfidenceErrors,
    lowConfidenceCorrectAnswers: lowConfidenceCorrect,
    recommendedNextLessons,
    reportNotes,
    questionResults,
  };
}
