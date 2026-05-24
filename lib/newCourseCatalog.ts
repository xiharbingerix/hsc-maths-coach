import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./lessons/differentialCalculus";

export type NewCourseSlug =
  | "year-12-standard-2"
  | "year-11-advanced"
  | "year-11-standard";

export type CourseLessonSeed = {
  slug: string;
  title: string;
};

export type CourseUnitSeed = {
  slug: string;
  title: string;
  description: string;
  syllabusArea: string;
  focus: string;
  lessons: CourseLessonSeed[];
};

export type CoursePathwaySeed = {
  slug: NewCourseSlug;
  title: string;
  yearLevel: string;
  courseType: string;
  description: string;
  positioning: string;
  units: CourseUnitSeed[];
};

function slugPrefix(slug: string) {
  return slug.split("-").slice(0, 2).join("-");
}

function typedQuestion(id: string, topic: string, index: number): PracticeQuestion {
  const answer = String(index + 2);

  return {
    id,
    prompt: `Short calculation for ${topic}: what is ${index + 1}+1?`,
    latex: `${index + 1}+1`,
    answer,
    acceptedAnswers: [answer],
    hint: "Use the operation shown and keep the answer short.",
    explanation: `The value is ${answer}.`,
  };
}

function choiceQuestion(
  id: string,
  topic: string,
  promptType: "method" | "interpretation" | "classification",
  answer: "A" | "B" | "C" | "D" = "A"
): PracticeQuestion {
  const choices = [
    {
      label: "A",
      text: `Use the key definition or formula for ${topic}.`,
    },
    {
      label: "B",
      text: "Ignore the context and choose the largest number.",
    },
    {
      label: "C",
      text: "Use a formula from an unrelated topic.",
    },
    {
      label: "D",
      text: "Round first, then decide what the question means.",
    },
  ];

  return {
    id,
    prompt: `Choose the best ${promptType} for this ${topic} question.`,
    latex: "\\text{Select A, B, C, or D.}",
    choices,
    answer,
    hint: "Match the method to the topic and context.",
    explanation: "A is the most reliable option because it starts from the relevant definition or formula.",
  };
}

function workedExamples(title: string): WorkedExample[] {
  return [
    {
      title: `${title}: identifying the method`,
      questionLatex: "\\text{Choose the relevant formula or representation.}",
      steps: [
        {
          explanation:
            "Read the question carefully and identify the mathematical feature being tested.",
        },
        {
          explanation:
            "Write down the key formula, definition, or graph feature before calculating.",
          latex: "\\text{method first, calculation second}",
        },
      ],
      finalAnswerLatex: "\\text{A clear setup leads to a markable answer.}",
    },
    {
      title: `${title}: short calculation`,
      questionLatex: "3+2",
      steps: [
        {
          explanation:
            "Keep the working short and use the units or context from the question.",
        },
        {
          explanation: "Calculate the required value.",
          latex: "3+2=5",
        },
      ],
      finalAnswerLatex: "5",
    },
  ];
}

function commonMistakes(topic: string) {
  return [
    {
      mistake: "Starting with a formula from the wrong topic.",
      fix: `Identify that the question is about ${topic} before calculating.`,
    },
    {
      mistake: "Giving a long explanation instead of a clear answer.",
      fix: "Use a short calculation or choose the best labelled option.",
    },
    {
      mistake: "Ignoring units or context.",
      fix: "Check whether the answer is a value, rate, time, amount, or feature.",
    },
    {
      mistake: "Rounding too early.",
      fix: "Keep working exact where possible, then round at the end if needed.",
    },
  ];
}

export function buildLesson(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed,
  index: number
): ExplicitLesson {
  const topic = lesson.title;
  const prefix = slugPrefix(lesson.slug);

  return {
    id: lesson.slug,
    slug: lesson.slug,
    moduleSlug: unit.slug,
    moduleTitle: unit.title,
    courseTitle: course.title,
    title: lesson.title,
    description: `Learn and practise ${lesson.title.toLowerCase()} in ${course.title}.`,
    syllabusArea: unit.syllabusArea,
    focus: unit.focus,
    status: "active",
    video: {
      title: `${lesson.title} video placeholder`,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention: `Understand the core ideas in ${lesson.title.toLowerCase()} and apply them to short exam-style questions.`,
    successCriteria: [
      `Identify when a question is testing ${lesson.title.toLowerCase()}.`,
      "Choose the relevant method or formula.",
      "Complete short calculations accurately.",
      "Give a clear answer using the context of the question.",
    ],
    teaching: {
      paragraphs: [
        `${lesson.title} is part of ${unit.title}. The aim is to recognise the structure of the question before doing any calculation.`,
        "A strong response starts by identifying the variable, feature, formula, graph, table, or context being used.",
        "For exam practice, keep answers concise and markable. Use labelled choices for interpretation and short typed answers for calculations.",
      ],
      latexBlocks: [
        "\\text{Identify the topic} \\rightarrow \\text{choose a method} \\rightarrow \\text{calculate} \\rightarrow \\text{interpret}",
        "\\text{Check units, restrictions, and context before finalising the answer.}",
      ],
    },
    workedExamples: workedExamples(lesson.title),
    guidedPractice: [
      choiceQuestion(`${prefix}-g1`, topic, "method"),
      typedQuestion(`${prefix}-g2`, topic, 1),
      choiceQuestion(`${prefix}-g3`, topic, "interpretation"),
      typedQuestion(`${prefix}-g4`, topic, 2),
    ],
    independentPractice: [
      typedQuestion(`${prefix}-i1`, topic, 3),
      choiceQuestion(`${prefix}-i2`, topic, "classification"),
      typedQuestion(`${prefix}-i3`, topic, 4),
      choiceQuestion(`${prefix}-i4`, topic, "method"),
      typedQuestion(`${prefix}-i5`, topic, 5),
    ],
    commonMistakes: commonMistakes(topic),
    masteryQuiz: [
      choiceQuestion(`${prefix}-m1`, topic, "method"),
      choiceQuestion(`${prefix}-m2`, topic, "classification"),
      typedQuestion(`${prefix}-m3`, topic, 1),
      typedQuestion(`${prefix}-m4`, topic, 2),
      choiceQuestion(`${prefix}-m5`, topic, "interpretation"),
      typedQuestion(`${prefix}-m6`, topic, 3),
      choiceQuestion(`${prefix}-m7`, topic, "method"),
      typedQuestion(`${prefix}-m8`, topic, 4),
      choiceQuestion(`${prefix}-m9`, topic, "interpretation"),
      typedQuestion(`${prefix}-m10`, topic, 5),
    ],
    masteryPassMark: 0.8,
  };
}

export const newCoursePathways: CoursePathwaySeed[] = [
  {
    slug: "year-12-standard-2",
    title: "Year 12 Mathematics Standard 2",
    yearLevel: "Year 12",
    courseType: "Mathematics Standard 2",
    description:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    positioning:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    units: [
      {
        slug: "algebraic-relationships",
        title: "Algebraic Relationships",
        description:
          "Linear and non-linear models, simultaneous equations, and exam-style algebra in context.",
        syllabusArea: "Algebra",
        focus: "Algebraic relationships",
        lessons: [
          { slug: "linear-relationships-modelling", title: "Linear Relationships and Modelling" },
          { slug: "non-linear-relationships-graphs", title: "Non-Linear Relationships and Graphs" },
          { slug: "simultaneous-equations-context", title: "Simultaneous Equations in Context" },
          { slug: "algebraic-relationships-exam-practice", title: "Algebraic Relationships Exam Practice" },
        ],
      },
      {
        slug: "trigonometry-ratios-rates",
        title: "Trigonometry, Ratios and Rates",
        description:
          "Non-right-angled trigonometry, triangle formulae, ratios, rates, and practical conversions.",
        syllabusArea: "Measurement",
        focus: "Trigonometry, ratios and rates",
        lessons: [
          { slug: "non-right-angled-trigonometry", title: "Non-Right-Angled Trigonometry" },
          { slug: "sine-rule-cosine-rule-area-triangle", title: "Sine Rule, Cosine Rule and Area of a Triangle" },
          { slug: "ratios-rates-unit-conversions", title: "Ratios, Rates and Unit Conversions" },
          { slug: "practical-rates-ratios-exam-practice", title: "Practical Rates and Ratios Exam Practice" },
        ],
      },
      {
        slug: "investments-loans-annuities",
        title: "Investments, Loans and Annuities",
        description:
          "Compound interest, depreciation, loan balances, annuities, and financial decisions.",
        syllabusArea: "Financial mathematics",
        focus: "Investments, loans and annuities",
        lessons: [
          { slug: "investment-compound-interest", title: "Investment and Compound Interest" },
          { slug: "depreciation-loans", title: "Depreciation and Loans" },
          { slug: "annuities-regular-payments", title: "Annuities and Regular Payments" },
          { slug: "financial-decision-making-exam-practice", title: "Financial Decision Making Exam Practice" },
        ],
      },
      {
        slug: "bivariate-data-normal-distribution",
        title: "Bivariate Data and Normal Distribution",
        description:
          "Scatterplots, correlation, regression, z-scores, normal distribution, and statistics practice.",
        syllabusArea: "Statistics",
        focus: "Bivariate data and normal distribution",
        lessons: [
          { slug: "bivariate-data-scatterplots", title: "Bivariate Data and Scatterplots" },
          { slug: "correlation-regression", title: "Correlation and Regression" },
          { slug: "normal-distribution-z-scores", title: "Normal Distribution and Z-Scores" },
          { slug: "statistical-analysis-exam-practice", title: "Statistical Analysis Exam Practice" },
        ],
      },
      {
        slug: "networks-critical-path-analysis",
        title: "Networks and Critical Path Analysis",
        description:
          "Network terminology, shortest paths, minimum spanning trees, and critical path analysis.",
        syllabusArea: "Networks",
        focus: "Networks and critical path analysis",
        lessons: [
          { slug: "network-concepts-terminology", title: "Network Concepts and Terminology" },
          { slug: "shortest-paths-minimum-spanning-trees", title: "Shortest Paths and Minimum Spanning Trees" },
          { slug: "critical-path-analysis", title: "Critical Path Analysis" },
          { slug: "networks-exam-practice", title: "Networks Exam Practice" },
        ],
      },
    ],
  },
  {
    slug: "year-11-advanced",
    title: "Year 11 Mathematics Advanced",
    yearLevel: "Year 11",
    courseType: "Mathematics Advanced",
    description:
      "Year 11 Mathematics Advanced foundations for senior assessment and future HSC Advanced study.",
    positioning:
      "Year 11 Mathematics Advanced foundations for students preparing for senior assessment and future HSC Advanced study.",
    units: [
      {
        slug: "functions",
        title: "Functions",
        description:
          "Function notation, domain, range, polynomial functions, transformations, and reciprocal functions.",
        syllabusArea: "Functions",
        focus: "Working with functions",
        lessons: [
          { slug: "function-notation-domain-range", title: "Function Notation, Domain and Range" },
          { slug: "linear-quadratic-cubic-functions", title: "Linear, Quadratic and Cubic Functions" },
          { slug: "transformations-composite-functions", title: "Transformations and Composite Functions" },
          { slug: "polynomial-reciprocal-functions", title: "Polynomial and Reciprocal Functions" },
          { slug: "functions-exam-practice", title: "Functions Exam Practice" },
        ],
      },
      {
        slug: "trigonometric-functions",
        title: "Trigonometric Functions",
        description:
          "Radians, exact values, unit circle, trigonometric graphs, equations, and identities.",
        syllabusArea: "Trigonometric functions",
        focus: "Trigonometry, identities and equations",
        lessons: [
          { slug: "radians-exact-trigonometric-values", title: "Radians and Exact Trigonometric Values" },
          { slug: "unit-circle-trigonometric-graphs", title: "Unit Circle and Trigonometric Graphs" },
          { slug: "trigonometric-equations", title: "Trigonometric Equations" },
          { slug: "trigonometric-identities", title: "Trigonometric Identities" },
          { slug: "trigonometry-exam-practice", title: "Trigonometry Exam Practice" },
        ],
      },
      {
        slug: "exponential-logarithmic-functions",
        title: "Exponential and Logarithmic Functions",
        description:
          "Index laws, logarithms, equations, modelling, and mixed exponential/logarithmic practice.",
        syllabusArea: "Exponential and logarithmic functions",
        focus: "Exponential and logarithmic functions",
        lessons: [
          { slug: "index-laws-exponential-functions", title: "Index Laws and Exponential Functions" },
          { slug: "logarithms-logarithm-laws", title: "Logarithms and Logarithm Laws" },
          { slug: "solving-exponential-logarithmic-equations", title: "Solving Exponential and Logarithmic Equations" },
          { slug: "exponential-logarithmic-modelling", title: "Exponential and Logarithmic Modelling" },
          { slug: "exponential-logarithmic-functions-exam-practice", title: "Exponential and Logarithmic Functions Exam Practice" },
        ],
      },
      {
        slug: "sequences-series",
        title: "Sequences and Series",
        description:
          "Arithmetic and geometric sequences, series, and exam-style pattern questions.",
        syllabusArea: "Sequences and series",
        focus: "Sequences and series",
        lessons: [
          { slug: "arithmetic-sequences", title: "Arithmetic Sequences" },
          { slug: "geometric-sequences", title: "Geometric Sequences" },
          { slug: "arithmetic-series", title: "Arithmetic Series" },
          { slug: "geometric-series", title: "Geometric Series" },
          { slug: "sequences-series-exam-practice", title: "Sequences and Series Exam Practice" },
        ],
      },
      {
        slug: "introduction-calculus",
        title: "Introduction to Calculus",
        description:
          "Rates of change, first principles, polynomial derivatives, tangents, normals, and applications.",
        syllabusArea: "Calculus",
        focus: "Introduction to differentiation",
        lessons: [
          { slug: "rates-of-change-gradients", title: "Rates of Change and Gradients" },
          { slug: "derivatives-first-principles", title: "Derivatives from First Principles" },
          { slug: "differentiating-polynomial-functions", title: "Differentiating Polynomial Functions" },
          { slug: "tangents-normals-applications", title: "Tangents, Normals and Applications" },
          { slug: "introductory-calculus-exam-practice", title: "Introductory Calculus Exam Practice" },
        ],
      },
      {
        slug: "statistical-analysis",
        title: "Statistical Analysis",
        description:
          "Data displays, probability, relative frequency, random variables, expected value, and spread.",
        syllabusArea: "Statistical analysis",
        focus: "Probability and data",
        lessons: [
          { slug: "data-displays-summary-statistics", title: "Data Displays and Summary Statistics" },
          { slug: "probability-relative-frequency", title: "Probability and Relative Frequency" },
          { slug: "discrete-random-variables", title: "Discrete Random Variables" },
          { slug: "expected-value-standard-deviation", title: "Expected Value and Standard Deviation" },
          { slug: "statistical-analysis-exam-practice", title: "Statistical Analysis Exam Practice" },
        ],
      },
    ],
  },
  {
    slug: "year-11-standard",
    title: "Year 11 Mathematics Standard",
    yearLevel: "Year 11",
    courseType: "Mathematics Standard",
    description:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    positioning:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    units: [
      {
        slug: "algebra-linear-relationships",
        title: "Algebra and Linear Relationships",
        description:
          "Formulae, equations, linear graphs, direct variation, and practical modelling.",
        syllabusArea: "Algebra",
        focus: "Formulas, equations and linear relationships",
        lessons: [
          { slug: "substitution-formulae-equations", title: "Substitution, Formulae and Equations" },
          { slug: "changing-subject-formula", title: "Changing the Subject of a Formula" },
          { slug: "linear-relationships-graphs", title: "Linear Relationships and Graphs" },
          { slug: "direct-variation-practical-linear-models", title: "Direct Variation and Practical Linear Models" },
          { slug: "algebra-linear-relationships-exam-practice", title: "Algebra and Linear Relationships Exam Practice" },
        ],
      },
      {
        slug: "money-financial-mathematics",
        title: "Money and Financial Mathematics",
        description:
          "Payslips, tax, budgeting, simple interest, and practical financial decisions.",
        syllabusArea: "Financial mathematics",
        focus: "Earning and managing money",
        lessons: [
          { slug: "earning-money-payslips", title: "Earning Money and Payslips" },
          { slug: "tax-deductions-net-pay", title: "Tax, Deductions and Net Pay" },
          { slug: "budgeting-managing-money", title: "Budgeting and Managing Money" },
          { slug: "simple-interest-financial-decisions", title: "Simple Interest and Financial Decisions" },
          { slug: "money-matters-exam-practice", title: "Money Matters Exam Practice" },
        ],
      },
      {
        slug: "measurement-time-location",
        title: "Measurement, Time and Location",
        description:
          "Measurement accuracy, area, surface area, volume, practical measurement, time zones, and timetables.",
        syllabusArea: "Measurement",
        focus: "Applications of measurement, time and location",
        lessons: [
          { slug: "units-accuracy-measurement-error", title: "Units, Accuracy and Measurement Error" },
          { slug: "area-surface-area-volume", title: "Area, Surface Area and Volume" },
          { slug: "energy-mass-practical-measurement", title: "Energy, Mass and Practical Measurement" },
          { slug: "time-zones-timetables", title: "Time Zones and Timetables" },
          { slug: "measurement-time-location-exam-practice", title: "Measurement, Time and Location Exam Practice" },
        ],
      },
      {
        slug: "networks-paths-trees",
        title: "Networks, Paths and Trees",
        description:
          "Network diagrams, paths, trails, circuits, connectivity, trees, and minimum spanning trees.",
        syllabusArea: "Networks",
        focus: "Networks, paths and trees",
        lessons: [
          { slug: "network-diagrams-terminology", title: "Network Diagrams and Terminology" },
          { slug: "paths-trails-circuits-connectivity", title: "Paths, Trails, Circuits and Connectivity" },
          { slug: "trees-minimum-spanning-trees", title: "Trees and Minimum Spanning Trees" },
          { slug: "network-applications-exam-practice", title: "Network Applications Exam Practice" },
        ],
      },
      {
        slug: "data-analysis-probability",
        title: "Data Analysis and Probability",
        description:
          "Data displays, summary statistics, outliers, relative frequency, and probability tables.",
        syllabusArea: "Statistics",
        focus: "Data analysis and probability",
        lessons: [
          { slug: "data-displays-summary-statistics", title: "Data Displays and Summary Statistics" },
          { slug: "interpreting-data-outliers", title: "Interpreting Data and Outliers" },
          { slug: "relative-frequency-probability", title: "Relative Frequency and Probability" },
          { slug: "multistage-events-probability-tables", title: "Multistage Events and Probability Tables" },
          { slug: "data-probability-exam-practice", title: "Data and Probability Exam Practice" },
        ],
      },
    ],
  },
];

export function getNewCourse(courseSlug: string) {
  return newCoursePathways.find((course) => course.slug === courseSlug);
}

export function getNewCourseUnit(courseSlug: string, unitSlug: string) {
  return getNewCourse(courseSlug)?.units.find((unit) => unit.slug === unitSlug);
}

export function getNewCourseLesson(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string
) {
  const course = getNewCourse(courseSlug);
  const unit = course?.units.find((nextUnit) => nextUnit.slug === unitSlug);
  const lesson = unit?.lessons.find(
    (nextLesson) => nextLesson.slug === lessonSlug
  );

  if (!course || !unit || !lesson) {
    return null;
  }

  const index = unit.lessons.findIndex(
    (nextLesson) => nextLesson.slug === lessonSlug
  );

  return buildLesson(course, unit, lesson, index);
}

export function getNewCourseUnitLessons(courseSlug: string, unitSlug: string) {
  const course = getNewCourse(courseSlug);
  const unit = course?.units.find((nextUnit) => nextUnit.slug === unitSlug);

  if (!course || !unit) {
    return [];
  }

  return unit.lessons.map((lesson, index) =>
    buildLesson(course, unit, lesson, index)
  );
}

export function getNewCourseUnitOutline(
  courseSlug: string,
  unitSlug: string
): LessonOutlineItem[] {
  const unit = getNewCourseUnit(courseSlug, unitSlug);

  return (
    unit?.lessons.map((lesson) => ({
      id: lesson.slug,
      slug: lesson.slug,
      title: lesson.title,
      description: `Practise ${lesson.title.toLowerCase()} with concise examples and mastery checks.`,
      status: "active" as const,
    })) ?? []
  );
}

export function newCourseLessonCount(course: CoursePathwaySeed) {
  return course.units.reduce((total, unit) => total + unit.lessons.length, 0);
}
