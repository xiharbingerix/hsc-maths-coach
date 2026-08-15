import { questions, type DiagnosticQuestion } from "./questions";
import { markTypedAnswer } from "./answerMarking";

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
  "functions-function-notation-substitution": {
    title: "Domain, Range, and Function Notation",
    href: "/course/functions-graphing-techniques/domain-range-function-notation",
  },
  "functions-substitution-composite-input": {
    title: "Domain, Range, and Function Notation",
    href: "/course/functions-graphing-techniques/domain-range-function-notation",
  },
  "functions-domain-square-root": {
    title: "Domain, Range, and Function Notation",
    href: "/course/functions-graphing-techniques/domain-range-function-notation",
  },
  "graph-x-intercepts": {
    title: "Intercepts and Key Features",
    href: "/course/functions-graphing-techniques/intercepts-key-features",
  },
  "functions-graph-transformations": {
    title: "Graph Transformations",
    href: "/course/functions-graphing-techniques/graph-transformations",
  },
  "functions-reciprocal-asymptote": {
    title: "Asymptotes and Reciprocal-Style Graphs",
    href: "/course/functions-graphing-techniques/asymptotes-reciprocal-graphs",
  },
  "trig-degrees-to-radians": {
    title: "Radians, Exact Values, and the Unit Circle",
    href: "/course/trigonometric-functions-graphs/radians-exact-values-unit-circle",
  },
  "trig-exact-values": {
    title: "Radians, Exact Values, and the Unit Circle",
    href: "/course/trigonometric-functions-graphs/radians-exact-values-unit-circle",
  },
  "trig-unit-circle-signs": {
    title: "Radians, Exact Values, and the Unit Circle",
    href: "/course/trigonometric-functions-graphs/radians-exact-values-unit-circle",
  },
  "trig-amplitude-period": {
    title: "Amplitude, Period, Phase Shift, and Vertical Shift",
    href: "/course/trigonometric-functions-graphs/amplitude-period-phase-vertical-shift",
  },
  "trig-equation-domain": {
    title: "Trigonometric Equations",
    href: "/course/trigonometric-functions-graphs/trigonometric-equations",
  },
  "trig-identities-simplification": {
    title: "Trigonometric Identities and Simplification",
    href: "/course/trigonometric-functions-graphs/trigonometric-identities-simplification",
  },
  "calculus-average-rate-of-change": {
    title: "The Derivative as Rate of Change",
    href: "/course/differential-calculus/rate-of-change",
  },
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
  "integration-indefinite-polynomial": {
    title: "Indefinite Integrals and the Constant of Integration",
    href: "/course/integral-calculus/indefinite-integrals-constant-of-integration",
  },
  "integration-initial-condition-c": {
    title: "Initial Conditions and Finding the Particular Primitive",
    href: "/course/integral-calculus/initial-conditions-particular-primitive",
  },
  "integration-definite-polynomial": {
    title: "Definite Integrals and the Fundamental Theorem of Calculus",
    href: "/course/integral-calculus/definite-integrals-fundamental-theorem",
  },
  "integration-signed-total-area": {
    title: "Signed Area and Total Area",
    href: "/course/integral-calculus/signed-area-total-area",
  },
  "integration-trapezoidal-rule": {
    title: "The Trapezoidal Rule and Area Approximation",
    href: "/course/integral-calculus/trapezoidal-rule-area-approximation",
  },
  "integration-area-between-curves": {
    title: "Area Between Two Curves",
    href: "/course/integral-calculus/area-between-two-curves",
  },
  "financial-growth-decay-factor": {
    title: "Growth Factors, Compound Interest, and Depreciation",
    href: "/course/financial-mathematics/growth-factors-compound-interest-depreciation",
  },
  "financial-compound-interest": {
    title: "Growth Factors, Compound Interest, and Depreciation",
    href: "/course/financial-mathematics/growth-factors-compound-interest-depreciation",
  },
  "financial-depreciation": {
    title: "Growth Factors, Compound Interest, and Depreciation",
    href: "/course/financial-mathematics/growth-factors-compound-interest-depreciation",
  },
  "financial-recurrence-next-term": {
    title: "Recurrence Relations in Financial Contexts",
    href: "/course/financial-mathematics/recurrence-relations-financial-contexts",
  },
  "financial-future-value-annuities": {
    title: "Future Value of Annuities",
    href: "/course/financial-mathematics/future-value-annuities",
  },
  "financial-comparing-options": {
    title: "Comparing Financial Options",
    href: "/course/financial-mathematics/comparing-financial-options",
  },
  "statistics-summary-median": {
    title: "Data Displays, Summary Statistics, and Outliers",
    href: "/course/statistical-analysis/data-displays-measures-of-centre",
  },
  "statistics-standardised-score": {
    title: "Standard Deviation, Z-Scores, and Standardised Values",
    href: "/course/statistical-analysis/standard-deviation-z-scores-standardised-values",
  },
  "statistics-correlation-interpretation": {
    title: "Correlation and Least-Squares Regression",
    href: "/course/statistical-analysis/correlation-least-squares-regression",
  },
  "statistics-regression-prediction": {
    title: "Correlation and Least-Squares Regression",
    href: "/course/statistical-analysis/correlation-least-squares-regression",
  },
  "statistics-residuals": {
    title: "Interpreting Association and Residuals",
    href: "/course/statistical-analysis/interpreting-association-residuals",
  },
  "statistics-normal-empirical-rule": {
    title: "Normal Distribution and Empirical Rule",
    href: "/course/statistical-analysis/normal-distribution-empirical-rule",
  },
};

// TODO: Add diagnostic items and recommendation mappings for arithmetic/geometric
// sequences and series, exponential/logarithmic graph transformations, and random
// variables when the diagnostic expands beyond the current 36-question set.

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
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\u03c0]/g, "pi")
    .replace(/\\pi/g, "pi")
    .replace(/[\u221a]/g, "sqrt")
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

  return markTypedAnswer({
    userAnswer,
    correctAnswer: question.answer,
    acceptedAnswers: question.acceptedAnswers ?? [],
    prompt: question.prompt,
  }).correct;
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
