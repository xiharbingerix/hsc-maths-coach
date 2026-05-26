import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./lessons/differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "./courseTypes";
import {
  year11StandardApplicationsMeasurementLessonOverride,
  year11StandardDataAnalysisLessonOverride,
  year11StandardEarningMoneyLessonOverride,
  year11StandardFormulasEquationsLessonOverride,
  year11StandardLinearRelationshipsLessonOverride,
  year11StandardManagingMoneyLessonOverride,
  year11StandardNetworksLessonOverride,
  year11StandardTimeLocationLessonOverride,
} from "./lessons/year11Standard";
import {
  year12Standard2AlgebraicRelationshipsLessonOverride,
  year12Standard2FinanceLessonOverride,
  year12Standard2NetworksLessonOverride,
  year12Standard2StatisticsLessonOverride,
  year12Standard2TrigRatesLessonOverride,
} from "./lessons/year12Standard2";
import {
  year11AdvancedExponentialLogarithmicLessonOverride,
  year11AdvancedGraphTransformationsLessonOverride,
  year11AdvancedIntroductionDifferentiationLessonOverride,
  year11AdvancedProbabilityDataLessonOverride,
  year11AdvancedTrigIdentitiesEquationsLessonOverride,
  year11AdvancedTrigonometryMeasureLessonOverride,
  year11AdvancedWorkingFunctionsLessonOverride,
} from "./lessons/year11Advanced";

export type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
  NewCourseSlug,
} from "./courseTypes";

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
  const override =
    year11StandardNetworksLessonOverride(course, unit, lesson) ??
    year11StandardEarningMoneyLessonOverride(course, unit, lesson) ??
    year11StandardManagingMoneyLessonOverride(course, unit, lesson) ??
    year11StandardApplicationsMeasurementLessonOverride(course, unit, lesson) ??
    year11StandardTimeLocationLessonOverride(course, unit, lesson) ??
    year11StandardDataAnalysisLessonOverride(course, unit, lesson) ??
    year11StandardLinearRelationshipsLessonOverride(course, unit, lesson) ??
    year11StandardFormulasEquationsLessonOverride(course, unit, lesson) ??
    year12Standard2NetworksLessonOverride(course, unit, lesson) ??
    year12Standard2FinanceLessonOverride(course, unit, lesson) ??
    year12Standard2StatisticsLessonOverride(course, unit, lesson) ??
    year12Standard2TrigRatesLessonOverride(course, unit, lesson) ??
    year12Standard2AlgebraicRelationshipsLessonOverride(course, unit, lesson) ??
    year11AdvancedWorkingFunctionsLessonOverride(course, unit, lesson) ??
    year11AdvancedProbabilityDataLessonOverride(course, unit, lesson) ??
    year11AdvancedTrigIdentitiesEquationsLessonOverride(course, unit, lesson) ??
    year11AdvancedTrigonometryMeasureLessonOverride(course, unit, lesson) ??
    year11AdvancedExponentialLogarithmicLessonOverride(course, unit, lesson) ??
    year11AdvancedIntroductionDifferentiationLessonOverride(course, unit, lesson) ??
    year11AdvancedGraphTransformationsLessonOverride(course, unit, lesson);

  return {
    id: lesson.slug,
    slug: lesson.slug,
    moduleSlug: unit.slug,
    moduleTitle: unit.title,
    courseTitle: course.title,
    title: lesson.title,
    description:
      lesson.description ??
      `Learn and practise ${lesson.title.toLowerCase()} in ${course.title}.`,
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
    ...override,
  };
}

export const year11AdvancedSequencesSeriesArchive: CourseUnitSeed = {
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
};

// TODO: Recheck whether Sequences and Series should return to the public
// Year 11 Advanced pathway if future syllabus mapping or school demand requires it.

export const newCoursePathways: CoursePathwaySeed[] = [
  {
    slug: "year-12-standard-2",
    title: "Year 12 Mathematics Standard 2",
    yearLevel: "Year 12",
    courseType: "Mathematics Standard 2",
    status: "available",
    description:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    positioning:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    units: [
      {
        slug: "algebraic-relationships",
        title: "Algebraic Relationships",
        description:
          "Linear modelling, non-linear graphs, simultaneous-equation comparisons, and HSC-style algebra in practical contexts.",
        syllabusArea: "Algebra",
        focus: "Algebraic relationships",
        lessons: [
          {
            slug: "linear-relationships-modelling",
            title: "Linear Relationships and Modelling",
            description:
              "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
          },
          {
            slug: "non-linear-relationships-graphs",
            title: "Non-Linear Relationships and Graphs",
            description:
              "Interpret and evaluate non-linear models, including quadratic height and area models, graph features, and context restrictions.",
          },
          {
            slug: "simultaneous-equations-context",
            title: "Simultaneous Equations in Context",
            description:
              "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
          },
          {
            slug: "algebraic-relationships-exam-practice",
            title: "Algebraic Relationships Exam Practice",
            description:
              "Practise HSC-style algebra modelling questions using linear models, non-linear graphs, simultaneous equations, and contextual interpretation.",
          },
        ],
      },
      {
        slug: "trigonometry-ratios-rates",
        title: "Trigonometry, Ratios and Rates",
        description:
          "Non-right-angled trigonometry, sine and cosine rules, triangular area, ratios, rates, scale, speed, and practical conversions.",
        syllabusArea: "Measurement",
        focus: "Trigonometry, ratios and rates",
        lessons: [
          {
            slug: "non-right-angled-trigonometry",
            title: "Non-Right-Angled Trigonometry",
            description:
              "Choose sine rule or cosine rule for practical non-right-angled triangle problems in surveying and navigation contexts.",
          },
          {
            slug: "sine-rule-cosine-rule-area-triangle",
            title: "Sine Rule, Cosine Rule and Area of a Triangle",
            description:
              "Apply sine rule, cosine rule, and the triangular area formula to practical distance and land-area problems.",
          },
          {
            slug: "ratios-rates-unit-conversions",
            title: "Ratios, Rates and Unit Conversions",
            description:
              "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
          },
          {
            slug: "practical-rates-ratios-exam-practice",
            title: "Practical Rates and Ratios Exam Practice",
            description:
              "Practise mixed HSC-style measurement questions involving non-right-angled trigonometry, ratios, rates, scale, speed, and unit conversion.",
          },
        ],
      },
      {
        slug: "investments-loans-annuities",
        title: "Investments, Loans and Annuities",
        description:
          "Compound investments, depreciation, loan recurrences, annuities, regular payments, fees, and financial decisions.",
        syllabusArea: "Financial Mathematics",
        focus: "Investments, loans and annuities",
        lessons: [
          {
            slug: "investment-compound-interest",
            title: "Investment and Compound Interest",
            description:
              "Calculate compound investment balances, interest earned, growth factors, and net returns after fees.",
          },
          {
            slug: "depreciation-loans",
            title: "Depreciation and Loans",
            description:
              "Model asset depreciation and loan balances using decay factors, repayments, and recurrence relations.",
          },
          {
            slug: "annuities-regular-payments",
            title: "Annuities and Regular Payments",
            description:
              "Use recurrence and table methods for regular deposits, future value, annuities, and repayment schedules.",
          },
          {
            slug: "financial-decision-making-exam-practice",
            title: "Financial Decision Making Exam Practice",
            description:
              "Practise mixed HSC-style finance questions involving investments, loans, annuities, fees, and comparisons.",
          },
        ],
      },
      {
        slug: "bivariate-data-normal-distribution",
        title: "Bivariate Data and Normal Distribution",
        description:
          "Bivariate data, scatterplots, correlation, regression, residuals, z-scores, normal distribution, and exam-style statistics practice.",
        syllabusArea: "Statistical Analysis",
        focus: "Bivariate data and normal distribution",
        lessons: [
          {
            slug: "bivariate-data-scatterplots",
            title: "Bivariate Data and Scatterplots",
            description:
              "Interpret bivariate data, scatterplots, association direction, strength, outliers, and causation warnings.",
          },
          {
            slug: "correlation-regression",
            title: "Correlation and Regression",
            description:
              "Use correlation, regression equations, predictions, residuals, slope, intercept, and extrapolation warnings.",
          },
          {
            slug: "normal-distribution-z-scores",
            title: "Normal Distribution and Z-Scores",
            description:
              "Calculate and interpret z-scores, standard deviations from the mean, and empirical-rule percentages.",
          },
          {
            slug: "statistical-analysis-exam-practice",
            title: "Statistical Analysis Exam Practice",
            description:
              "Practise mixed HSC-style statistical analysis questions using scatterplots, regression, residuals, z-scores, and normal distributions.",
          },
        ],
      },
      {
        slug: "networks-critical-path-analysis",
        title: "Networks and Critical Path Analysis",
        description:
          "Weighted and directed networks, shortest paths, minimum spanning trees, project scheduling, and critical path analysis.",
        syllabusArea: "Networks",
        focus: "Networks and critical path analysis",
        lessons: [
          {
            slug: "network-concepts-terminology",
            title: "Network Concepts and Terminology",
            description:
              "Interpret vertices, edges, degrees, directed edges, weighted edges, paths, trails, and circuits from practical edge lists.",
          },
          {
            slug: "shortest-paths-minimum-spanning-trees",
            title: "Shortest Paths and Minimum Spanning Trees",
            description:
              "Solve route and minimal connector problems using shortest paths, path weights, MSTs, and Kruskal's method.",
          },
          {
            slug: "critical-path-analysis",
            title: "Critical Path Analysis",
            description:
              "Use activity tables to find earliest times, critical paths, project completion time, float, and delay effects.",
          },
          {
            slug: "networks-exam-practice",
            title: "Networks Exam Practice",
            description:
              "Practise mixed HSC-style network questions involving routes, connectors, project schedules, and practical decisions.",
          },
        ],
      },
    ],
  },
  {
    slug: "year-11-advanced",
    title: "Year 11 Mathematics Advanced",
    yearLevel: "Year 11",
    courseType: "Mathematics Advanced",
    status: "available",
    description:
      "Year 11 Mathematics Advanced foundations for senior assessment and future HSC Advanced study.",
    positioning:
      "Year 11 Mathematics Advanced foundations for students preparing for senior assessment and future HSC Advanced study.",
    units: [
      {
        slug: "working-with-functions",
        title: "Working with Functions",
        description:
          "Function notation, domain, range, roots, intercepts, linear, quadratic, cubic, polynomial, and reciprocal graph features.",
        syllabusArea: "Functions",
        focus: "Working with functions",
        lessons: [
          {
            slug: "function-notation-domain-range",
            title: "Function Notation, Domain and Range",
            description:
              "Evaluate functions, handle negative inputs, and identify domain and range restrictions from rules, tables and graph descriptions.",
          },
          {
            slug: "linear-quadratic-cubic-functions",
            title: "Linear, Quadratic and Cubic Functions",
            description:
              "Compare linear, quadratic and cubic functions using intercepts, roots, turning points, tables and graph descriptions.",
          },
          {
            slug: "polynomial-reciprocal-functions",
            title: "Polynomial and Reciprocal Functions",
            description:
              "Use degree, leading coefficient, roots, factors, reciprocal functions and asymptotes to interpret function features.",
          },
          {
            slug: "working-with-functions-exam-practice",
            title: "Working with Functions Exam Practice",
            description:
              "Practise mixed assessment-style function questions involving notation, restrictions, roots, intercepts and asymptotes.",
          },
        ],
      },
      {
        slug: "graph-transformations",
        title: "Graph Transformations",
        description:
          "Transformations, composite functions, polynomial and reciprocal graph transformations, and exam-style graphing questions.",
        syllabusArea: "Functions",
        focus: "Graph transformations",
        lessons: [
          { slug: "transformations-composite-functions", title: "Transformations and Composite Functions" },
          { slug: "transformations-polynomial-reciprocal-graphs", title: "Transformations of Polynomial and Reciprocal Graphs" },
          { slug: "graph-transformations-exam-practice", title: "Graph Transformations Exam Practice" },
        ],
      },
      {
        slug: "trigonometry-measure-angles",
        title: "Trigonometry and Measure of Angles",
        description:
          "Radians, exact trigonometric values, the unit circle, trigonometric graphs, and angle-measure practice.",
        syllabusArea: "Trigonometric functions",
        focus: "Trigonometry and measure of angles",
        lessons: [
          { slug: "radians-exact-trigonometric-values", title: "Radians and Exact Trigonometric Values" },
          { slug: "unit-circle-trigonometric-graphs", title: "Unit Circle and Trigonometric Graphs" },
          { slug: "trigonometry-measure-angles-exam-practice", title: "Trigonometry and Measure of Angles Exam Practice" },
        ],
      },
      {
        slug: "trigonometric-identities-equations",
        title: "Trigonometric Identities and Equations",
        description:
          "Trigonometric equations, identities, simplification, and exam-style trigonometry practice.",
        syllabusArea: "Trigonometric functions",
        focus: "Trigonometric identities and equations",
        lessons: [
          { slug: "trigonometric-equations", title: "Trigonometric Equations" },
          { slug: "trigonometric-identities", title: "Trigonometric Identities" },
          { slug: "trigonometric-identities-equations-exam-practice", title: "Trigonometric Identities and Equations Exam Practice" },
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
        slug: "introduction-differentiation",
        title: "Introduction to Differentiation",
        description:
          "Rates of change, first principles, polynomial derivatives, tangents, normals, and applications.",
        syllabusArea: "Calculus",
        focus: "Introduction to differentiation",
        lessons: [
          { slug: "rates-of-change-gradients", title: "Rates of Change and Gradients" },
          { slug: "derivatives-first-principles", title: "Derivatives from First Principles" },
          { slug: "differentiating-polynomial-functions", title: "Differentiating Polynomial Functions" },
          { slug: "tangents-normals-applications", title: "Tangents, Normals and Applications" },
          { slug: "introduction-differentiation-exam-practice", title: "Introduction to Differentiation Exam Practice" },
        ],
      },
      {
        slug: "probability-data",
        title: "Probability and Data",
        description:
          "Data displays, probability, relative frequency, random variables, expected value, and spread.",
        syllabusArea: "Statistical analysis",
        focus: "Probability and data",
        lessons: [
          { slug: "data-displays-summary-statistics", title: "Data Displays and Summary Statistics" },
          { slug: "probability-relative-frequency", title: "Probability and Relative Frequency" },
          { slug: "discrete-random-variables", title: "Discrete Random Variables" },
          { slug: "expected-value-standard-deviation", title: "Expected Value and Standard Deviation" },
          { slug: "probability-data-exam-practice", title: "Probability and Data Exam Practice" },
        ],
      },
    ],
  },
  {
    slug: "year-11-standard",
    title: "Year 11 Mathematics Standard",
    yearLevel: "Year 11",
    courseType: "Mathematics Standard",
    status: "available",
    description:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    positioning:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    units: [
      {
        slug: "formulas-equations",
        title: "Formulas and Equations",
        description:
          "Substitution into practical formulae, contextual equations, changing the subject, units and reasonableness.",
        syllabusArea: "Algebra",
        focus: "Formulas and equations",
        lessons: [
          {
            slug: "substitution-formulae-equations",
            title: "Substitution, Formulae and Equations",
            description:
              "Substitute into practical formulae, solve simple contextual equations, and interpret answers with units.",
          },
          {
            slug: "changing-subject-formula",
            title: "Changing the Subject of a Formula",
            description:
              "Rearrange practical formulae using inverse operations, including cost, area, circumference and temperature formulae.",
          },
          {
            slug: "formulae-equations-exam-practice",
            title: "Formulae and Equations Exam Practice",
            description:
              "Practise mixed formula and equation questions involving substitution, rearranging, units and reasonableness.",
          },
        ],
      },
      {
        slug: "linear-relationships",
        title: "Linear Relationships",
        description:
          "Straight-line relationships, gradients, intercepts, direct variation, practical linear models and graph interpretation.",
        syllabusArea: "Algebra",
        focus: "Linear relationships",
        lessons: [
          {
            slug: "linear-relationships-graphs",
            title: "Linear Relationships and Graphs",
            description:
              "Interpret straight-line rules, tables and graphs using gradients, rates and starting values.",
          },
          {
            slug: "direct-variation-practical-linear-models",
            title: "Direct Variation and Practical Linear Models",
            description:
              "Use direct variation, constants of variation and practical linear models with and without fixed costs.",
          },
          {
            slug: "linear-relationships-exam-practice",
            title: "Linear Relationships Exam Practice",
            description:
              "Practise mixed linear relationship questions using tables, rules, graph features, direct variation and practical limitations.",
          },
        ],
      },
      {
        slug: "earning-money",
        title: "Earning Money",
        description:
          "Wages, salaries, payslips, overtime, penalty rates, allowances, commission, piecework, tax, deductions, and net pay.",
        syllabusArea: "Financial Mathematics",
        focus: "Earning money",
        lessons: [
          {
            slug: "wages-salaries-payslips",
            title: "Wages, Salaries and Payslips",
            description:
              "Calculate wages and salary amounts, and read simple payslip information.",
          },
          {
            slug: "overtime-penalty-rates-allowances",
            title: "Overtime, Penalty Rates and Allowances",
            description:
              "Apply overtime, penalty rates and allowances to realistic work rosters.",
          },
          {
            slug: "commission-piecework",
            title: "Commission and Piecework",
            description:
              "Use commission and piecework rates to compare earning structures.",
          },
          {
            slug: "tax-deductions-net-pay",
            title: "Tax, Deductions and Net Pay",
            description:
              "Calculate net pay from tax withheld and deductions.",
          },
          {
            slug: "earning-money-exam-practice",
            title: "Earning Money Exam Practice",
            description:
              "Practise mixed earning-money exam questions using rosters and payslips.",
          },
        ],
      },
      {
        slug: "managing-money",
        title: "Managing Money",
        description:
          "Budgets, cash flow, savings goals, simple interest, fees, discounts, and practical financial decisions.",
        syllabusArea: "Financial Mathematics",
        focus: "Managing money",
        lessons: [
          {
            slug: "budgets-cash-flow",
            title: "Budgets and Cash Flow",
            description:
              "Use income, fixed expenses, variable expenses and savings to calculate surplus, deficit and cash flow.",
          },
          {
            slug: "saving-spending-financial-goals",
            title: "Saving, Spending and Financial Goals",
            description:
              "Plan savings goals, regular deposits, affordability checks and spending decisions.",
          },
          {
            slug: "simple-interest",
            title: "Simple Interest",
            description:
              "Calculate simple interest, total amounts and compare simple-interest options using principal, rate and time.",
          },
          {
            slug: "comparing-financial-decisions",
            title: "Comparing Financial Decisions",
            description:
              "Compare financial choices using total cost, discounts, fees, charges and reasonableness.",
          },
          {
            slug: "managing-money-exam-practice",
            title: "Managing Money Exam Practice",
            description:
              "Practise mixed managing-money exam questions using budgets, savings goals, simple interest, fees and financial comparisons.",
          },
        ],
      },
      {
        slug: "applications-measurement",
        title: "Applications of Measurement",
        description:
          "Units, accuracy, measurement error, area, surface area, volume, capacity, energy, mass and practical measurement applications.",
        syllabusArea: "Measurement",
        focus: "Applications of measurement",
        lessons: [
          {
            slug: "units-accuracy-measurement-error",
            title: "Units, Accuracy and Measurement Error",
            description:
              "Convert practical measurements, choose units, and use accuracy, absolute error and percentage error.",
          },
          {
            slug: "area-surface-area-volume",
            title: "Area, Surface Area and Volume",
            description:
              "Use perimeter, area, surface area, volume and capacity for rooms, materials, containers and tanks.",
          },
          {
            slug: "energy-mass-practical-measurement",
            title: "Energy, Mass and Practical Measurement",
            description:
              "Use mass, food energy labels, kilojoules, electricity use in kWh, and practical reasonableness checks.",
          },
          {
            slug: "applications-measurement-exam-practice",
            title: "Applications of Measurement Exam Practice",
            description:
              "Practise mixed measurement questions involving units, accuracy, error, area, volume, capacity, energy, mass and electricity use.",
          },
        ],
      },
      {
        slug: "time-location",
        title: "Time and Location",
        description:
          "Timetables, elapsed time, UTC offsets, Australian and international time zones, and date changes in travel contexts.",
        syllabusArea: "Measurement",
        focus: "Time and location",
        lessons: [
          {
            slug: "time-calculations-timetables",
            title: "Time Calculations and Timetables",
            description:
              "Read timetables, convert time formats, and calculate elapsed, waiting and travel times.",
          },
          {
            slug: "time-zones-utc-international-date-line",
            title: "Time Zones, UTC and the International Date Line",
            description:
              "Use UTC offsets, Australian and international time zones, daylight saving and date changes.",
          },
          {
            slug: "time-location-exam-practice",
            title: "Time and Location Exam Practice",
            description:
              "Practise mixed time questions using timetables, elapsed time, UTC offsets, time zones and date changes.",
          },
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
          {
            slug: "network-diagrams-terminology",
            title: "Network Diagrams and Terminology",
            description:
              "Identify vertices, edges, degree, directed networks and weighted edges, then construct networks from tables or maps.",
          },
          {
            slug: "paths-trails-circuits-connectivity",
            title: "Paths, Trails, Circuits and Connectivity",
            description:
              "Classify paths, trails and circuits, check connectivity, and solve shortest path problems in small networks.",
          },
          {
            slug: "trees-minimum-spanning-trees",
            title: "Trees and Minimum Spanning Trees",
            description:
              "Use trees, spanning trees and minimum spanning trees to solve minimal connector problems.",
          },
          {
            slug: "network-applications-exam-practice",
            title: "Network Applications Exam Practice",
            description:
              "Practise mixed network applications involving construction, directed and weighted networks, shortest paths and MST decisions.",
          },
        ],
      },
      {
        slug: "data-analysis",
        title: "Data Analysis",
        description:
          "Data displays, frequency tables, summary statistics, outliers, graph interpretation and cautious data conclusions.",
        syllabusArea: "Statistical Analysis",
        focus: "Data analysis",
        lessons: [
          {
            slug: "data-displays-summary-statistics",
            title: "Data Displays and Summary Statistics",
            description:
              "Read data displays and calculate mean, median, mode and range in practical contexts.",
          },
          {
            slug: "interpreting-data-outliers",
            title: "Interpreting Data and Outliers",
            description:
              "Interpret practical data, identify outliers, and choose cautious conclusions using mean or median.",
          },
          {
            slug: "data-analysis-exam-practice",
            title: "Data Analysis Exam Practice",
            description:
              "Practise mixed data questions using tables, summary statistics, graph interpretation, outliers and cautious conclusions.",
          },
        ],
      },
    ],
  },
  {
    slug: "year-11-extension",
    title: "Year 11 Mathematics Extension",
    yearLevel: "Year 11",
    courseType: "Mathematics Extension",
    status: "coming_soon",
    description:
      "A planned Year 11 Mathematics Extension pathway for future support in higher-level algebra, functions, trigonometry, calculus, and proof.",
    positioning:
      "Year 11 Mathematics Extension lessons are being planned against the NSW Mathematics Extension 11-12 syllabus. The course outline will be added once the pathway is ready for students.",
    units: [],
  },
  {
    slug: "year-12-extension-1",
    title: "Year 12 Mathematics Extension 1",
    yearLevel: "Year 12",
    courseType: "Mathematics Extension 1",
    status: "coming_soon",
    description:
      "A planned Year 12 Mathematics Extension 1 pathway for future Extension 1 support in advanced functions, calculus, trigonometry, and combinatorics.",
    positioning:
      "Year 12 Mathematics Extension 1 lessons are being planned against the NSW Mathematics Extension 1 11-12 syllabus. The course outline will be added once the pathway is ready for students.",
    units: [],
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
      description:
        lesson.description ??
        `Practise ${lesson.title.toLowerCase()} with concise examples and mastery checks.`,
      status: "active" as const,
    })) ?? []
  );
}

export function newCourseLessonCount(course: CoursePathwaySeed) {
  return course.units.reduce((total, unit) => total + unit.lessons.length, 0);
}
