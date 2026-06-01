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
  year11StandardProbabilityRelativeFrequencyLessonOverride,
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
  year11AdvancedSequencesSeriesLessonOverride,
  year11AdvancedTrigIdentitiesEquationsLessonOverride,
  year11AdvancedTrigonometryMeasureLessonOverride,
  year11AdvancedWorkingFunctionsLessonOverride,
} from "./lessons/year11Advanced";
import {
  year11ExtensionBinomialTheoremLessonOverride,
  year11ExtensionPermutationsCombinationsLessonOverride,
} from "./lessons/year11Extension";
import { year10AlgebraicTechniquesLessonOverride, year10EquationsSimultaneousLessonOverride, year10FinancialMathematicsLessonOverride, year10GeometryProofsLessonOverride, year10LinearRelationshipsLessonOverride, year10NonLinearRelationshipsLessonOverride, year10ProbabilityLessonOverride, year10StatisticsDataLessonOverride, year10TrigonometryLessonOverride, year10MeasurementLessonOverride } from "./lessons/year10";
import { year9ConstantRatesOfChangeLessonOverride, year9FinancialMathematicsLessonOverride, year9IndexLawsLessonOverride, year9MakingPredictionsLessonOverride, year9PrismsAndCylindersLessonOverride, year9WorkingWithTrianglesLessonOverride } from "./lessons/year9";

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
    year11StandardProbabilityRelativeFrequencyLessonOverride(course, unit, lesson) ??
    year11StandardDataAnalysisLessonOverride(course, unit, lesson) ??
    year11StandardLinearRelationshipsLessonOverride(course, unit, lesson) ??
    year11StandardFormulasEquationsLessonOverride(course, unit, lesson) ??
    year12Standard2NetworksLessonOverride(course, unit, lesson) ??
    year12Standard2FinanceLessonOverride(course, unit, lesson) ??
    year12Standard2StatisticsLessonOverride(course, unit, lesson) ??
    year12Standard2TrigRatesLessonOverride(course, unit, lesson) ??
    year12Standard2AlgebraicRelationshipsLessonOverride(course, unit, lesson) ??
    year11AdvancedWorkingFunctionsLessonOverride(course, unit, lesson) ??
    year11AdvancedSequencesSeriesLessonOverride(course, unit, lesson) ??
    year11AdvancedProbabilityDataLessonOverride(course, unit, lesson) ??
    year11AdvancedTrigIdentitiesEquationsLessonOverride(course, unit, lesson) ??
    year11AdvancedTrigonometryMeasureLessonOverride(course, unit, lesson) ??
    year11AdvancedExponentialLogarithmicLessonOverride(course, unit, lesson) ??
    year11AdvancedIntroductionDifferentiationLessonOverride(course, unit, lesson) ??
    year11AdvancedGraphTransformationsLessonOverride(course, unit, lesson) ??
    year11ExtensionPermutationsCombinationsLessonOverride(course, unit, lesson) ??
    year11ExtensionBinomialTheoremLessonOverride(course, unit, lesson) ??
    year9IndexLawsLessonOverride(course, unit, lesson) ??
    year9FinancialMathematicsLessonOverride(course, unit, lesson) ??
    year9ConstantRatesOfChangeLessonOverride(course, unit, lesson) ??
    year9WorkingWithTrianglesLessonOverride(course, unit, lesson) ??
    year9PrismsAndCylindersLessonOverride(course, unit, lesson) ??
    year9MakingPredictionsLessonOverride(course, unit, lesson) ??
    year10AlgebraicTechniquesLessonOverride(course, unit, lesson) ??
    year10EquationsSimultaneousLessonOverride(course, unit, lesson) ??
    year10TrigonometryLessonOverride(course, unit, lesson) ??
    year10MeasurementLessonOverride(course, unit, lesson) ??
    year10FinancialMathematicsLessonOverride(course, unit, lesson) ??
    year10ProbabilityLessonOverride(course, unit, lesson) ??
    year10StatisticsDataLessonOverride(course, unit, lesson) ??
    year10LinearRelationshipsLessonOverride(course, unit, lesson) ??
    year10NonLinearRelationshipsLessonOverride(course, unit, lesson) ??
    year10GeometryProofsLessonOverride(course, unit, lesson);

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
        slug: "sequences-series",
        title: "Sequences and Series",
        description:
          "Arithmetic and geometric sequences, arithmetic and geometric series, sigma notation, limiting sums and exam-style pattern questions.",
        syllabusArea: "Algebra",
        focus: "Sequences and series",
        lessons: [
          {
            slug: "arithmetic-sequences",
            title: "Arithmetic Sequences",
            description:
              "Use sequence notation, common differences and nth-term rules to analyse arithmetic sequences.",
          },
          {
            slug: "geometric-sequences",
            title: "Geometric Sequences",
            description:
              "Use common ratios and nth-term rules to recognise and solve geometric sequence problems.",
          },
          {
            slug: "arithmetic-series-sigma-notation",
            title: "Arithmetic Series and Sigma Notation",
            description:
              "Sum arithmetic series and interpret simple sigma notation in algebraic and contextual settings.",
          },
          {
            slug: "geometric-series-limiting-sums",
            title: "Geometric Series and Limiting Sums",
            description:
              "Evaluate finite geometric series and determine whether a limiting sum exists for infinite geometric series.",
          },
          {
            slug: "sequences-series-exam-practice",
            title: "Sequences and Series Exam Practice",
            description:
              "Practise mixed Advanced-style sequence and series questions involving arithmetic, geometric, sigma and limiting-sum ideas.",
          },
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
          "Timetables, elapsed time, UTC offsets, Australian and international time zones, date changes, grid references and map scales.",
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
            slug: "map-scales-grid-references-location",
            title: "Map Scales, Grid References and Location",
            description:
              "Use text grids, coordinates, map scales and simple compass directions to describe location without drawing maps.",
          },
          {
            slug: "time-location-exam-practice",
            title: "Time and Location Exam Practice",
            description:
              "Practise mixed time and location questions using timetables, UTC offsets, date changes, grid references and map scales.",
          },
        ],
      },
      {
        slug: "networks-paths-trees",
        title: "Networks, Paths and Trees",
        description:
          "Network diagrams, edge lists, paths, trails, circuits, connectivity, trees, and minimum spanning trees.",
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
        slug: "probability-relative-frequency",
        title: "Probability and Relative Frequency",
        description:
          "Sample spaces, probability scales, complements, relative frequency, experimental probability and two-way table probabilities.",
        syllabusArea: "Statistical Analysis",
        focus: "Probability and relative frequency",
        lessons: [
          {
            slug: "outcomes-sample-space-probability",
            title: "Outcomes, Sample Space and Probability",
            description:
              "Use sample spaces, events, favourable outcomes, probability scales and complements in practical probability contexts.",
          },
          {
            slug: "relative-frequency-experimental-probability",
            title: "Relative Frequency and Experimental Probability",
            description:
              "Calculate relative frequency from trial data and compare experimental results with theoretical probability.",
          },
          {
            slug: "two-way-tables-probability",
            title: "Two-Way Tables and Probability",
            description:
              "Read two-way tables, row and column totals, and simple table probabilities from practical data.",
          },
          {
            slug: "probability-exam-practice",
            title: "Probability Exam Practice",
            description:
              "Practise mixed probability questions involving sample spaces, complements, relative frequency and two-way tables.",
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
    status: "in_progress",
    description:
      "Year 11 Mathematics Extension is partly available, with 2 of 5 planned topics currently available.",
    positioning:
      "2 of 5 planned topics currently available. Permutations and Combinations and The Binomial Theorem are active. Further Work with Functions, Polynomials and Further Trigonometry are coming soon.",
    units: [
      {
        slug: "further-functions",
        title: "Further Work with Functions",
        description:
          "Planned Extension functions work, including deeper function notation, transformations, and graph interpretation.",
        syllabusArea: "Functions",
        focus: "Further work with functions",
        lessons: [],
      },
      {
        slug: "polynomials",
        title: "Polynomials",
        description:
          "Planned polynomial skills for Extension study, including algebraic structure, factors, roots, and graph features.",
        syllabusArea: "Polynomials",
        focus: "Polynomials",
        lessons: [],
      },
      {
        slug: "further-trigonometry",
        title: "Further Trigonometry",
        description:
          "Planned Extension trigonometry support, including identities, equations, and exact-value fluency.",
        syllabusArea: "Trigonometry",
        focus: "Further trigonometry",
        lessons: [],
      },
      {
        slug: "permutations-combinations",
        title: "Permutations and Combinations",
        description:
          "Planned counting techniques, arrangements, selections, and combinatorial reasoning.",
        syllabusArea: "Combinatorics",
        focus: "Permutations and combinations",
        lessons: [
          {
            slug: "counting-principles",
            title: "Counting Principles and Factorials",
            description:
              "Use multiplication, addition, and factorial notation to count staged choices and simple arrangements.",
          },
          {
            slug: "permutations",
            title: "Permutations",
            description:
              "Count ordered arrangements using factorials and permutation notation.",
          },
          {
            slug: "combinations",
            title: "Combinations",
            description:
              "Count unordered selections and compare combinations with permutations.",
          },
          {
            slug: "arrangements-with-restrictions",
            title: "Arrangements with Restrictions",
            description:
              "Handle together, not-together, repeated-object, and circular arrangement restrictions.",
          },
          {
            slug: "perms-combs-exam-practice",
            title: "Permutations and Combinations Exam Practice",
            description:
              "Practise mixed Extension counting questions involving principles, permutations, combinations, and restrictions.",
          },
        ],
      },
      {
        slug: "binomial-theorem",
        title: "The Binomial Theorem",
        description:
          "Use Pascal's triangle, binomial coefficients, general terms, and identities to reason about expansions.",
        syllabusArea: "Combinatorics",
        focus: "The binomial theorem",
        lessons: [
          {
            slug: "pascals-triangle",
            title: "Pascal's Triangle and Binomial Patterns",
            description:
              "Use Pascal's triangle to identify coefficient patterns, symmetry, row sums, and small expansions.",
          },
          {
            slug: "binomial-theorem",
            title: "The Binomial Theorem",
            description:
              "Use binomial coefficients to expand powers, track signs, and find selected coefficients.",
          },
          {
            slug: "general-term",
            title: "Finding a General Term",
            description:
              "Use the general term to locate target powers, extract coefficients, and find constant terms.",
          },
          {
            slug: "binomial-identities",
            title: "Binomial Identities and Coefficients",
            description:
              "Use coefficient identities and substitutions to evaluate sums, alternating sums, and relationships.",
          },
          {
            slug: "binomial-theorem-exam-practice",
            title: "The Binomial Theorem Exam Practice",
            description:
              "Practise mixed Extension binomial theorem questions involving coefficients, terms, signs, and identities.",
          },
        ],
      },
    ],
  },
  {
    slug: "year-12-extension-1",
    title: "Year 12 Mathematics Extension 1",
    yearLevel: "Year 12",
    courseType: "Mathematics Extension 1",
    status: "coming_soon",
    description:
      "Coming soon — no active lessons yet. Future Extension 1 support is being planned against the NSW Mathematics Extension 1 11-12 syllabus.",
    positioning:
      "Coming soon — no active lessons yet. Future Extension 1 support is being planned against the NSW Mathematics Extension 1 11-12 syllabus. Planned units are listed below while lesson content is being prepared.",
    units: [
      {
        slug: "proof-induction",
        title: "Proof by Mathematical Induction",
        description:
          "Planned proof work using mathematical induction and structured algebraic reasoning.",
        syllabusArea: "Proof",
        focus: "Proof by mathematical induction",
        lessons: [],
      },
      {
        slug: "vectors",
        title: "Introduction to Vectors",
        description:
          "Planned vector concepts, notation, operations, and geometric interpretation.",
        syllabusArea: "Vectors",
        focus: "Introduction to vectors",
        lessons: [],
      },
      {
        slug: "inverse-trig",
        title: "Inverse Trigonometric Functions",
        description:
          "Planned support for inverse trigonometric functions, restrictions, graphs, and equations.",
        syllabusArea: "Trigonometric functions",
        focus: "Inverse trigonometric functions",
        lessons: [],
      },
      {
        slug: "further-calculus",
        title: "Further Calculus Skills",
        description:
          "Planned differentiation and integration skills for Extension 1 study.",
        syllabusArea: "Calculus",
        focus: "Further calculus skills",
        lessons: [],
      },
      {
        slug: "calculus-applications",
        title: "Further Applications of Calculus",
        description:
          "Planned calculus applications, modelling, rates, and optimisation-style problems.",
        syllabusArea: "Calculus",
        focus: "Further applications of calculus",
        lessons: [],
      },
      {
        slug: "binomial-distribution",
        title: "The Binomial Distribution",
        description:
          "Planned probability support for binomial random variables and distribution calculations.",
        syllabusArea: "Probability",
        focus: "The binomial distribution",
        lessons: [],
      },
    ],
  },
  {
    slug: "year-9-mathematics",
    title: "Year 9 Mathematics",
    yearLevel: "9",
    courseType: "standard",
    status: "coming_soon",
    description:
      "Build the Stage 5 foundations for Year 10 Mathematics through geometry, trigonometry, algebra, measurement, finance, probability and statistics.",
    positioning:
      "A Year 9 Stage 5 foundation pathway based on the NSW Mathematics K–10 Syllabus and guided by the NSW Stage 5 sample scope and sequence. It prepares students for the completed Year 10 Mathematics course.",
    units: [
      {
        slug: "geometrical-representations",
        title: "Geometrical Representations",
        description:
          "Use similarity, ratio, scale factors and geometric representations to compare shapes and diagrams.",
        syllabusArea: "Measurement and Space",
        focus:
          "Build proportional reasoning, scale and geometric representation skills needed for Year 10 geometry and measurement.",
        lessons: [],
      },
      {
        slug: "working-with-triangles",
        title: "Working with Triangles",
        description:
          "Use Pythagoras, right-triangle trigonometry and coordinate geometry to solve triangle and distance problems.",
        syllabusArea: "Measurement and Space",
        focus:
          "Prepare for Year 10 trigonometry, bearings, elevation and coordinate geometry.",
        lessons: [
          { slug: "pythagoras-hypotenuse", title: "Pythagoras: Finding the Hypotenuse" },
          { slug: "pythagoras-shorter-side", title: "Pythagoras: Finding a Shorter Side" },
          { slug: "right-triangle-applications", title: "Right-Triangle Applications" },
          { slug: "trigonometric-ratios", title: "Trigonometric Ratios" },
          { slug: "finding-sides-right-triangles", title: "Finding Sides in Right Triangles" },
          { slug: "finding-angles-right-triangles", title: "Finding Angles in Right Triangles" },
          { slug: "midpoint-distance-coordinate", title: "Midpoint and Distance on the Cartesian Plane" },
          { slug: "gradient-foundations", title: "Gradient Foundations" },
        ],
      },
      {
        slug: "prisms-and-cylinders",
        title: "Prisms and Cylinders",
        description:
          "Calculate area, surface area and volume for prisms, cylinders and composite solids.",
        syllabusArea: "Measurement and Space",
        focus:
          "Develop measurement fluency for Year 10 surface area, volume and similarity.",
        lessons: [
          { slug: "perimeter-area-review", title: "Perimeter and Area Review" },
          { slug: "composite-area", title: "Composite Area" },
          { slug: "surface-area-prisms", title: "Surface Area of Prisms" },
          { slug: "surface-area-cylinders", title: "Surface Area of Cylinders" },
          { slug: "volume-prisms", title: "Volume of Prisms" },
          { slug: "volume-cylinders", title: "Volume of Cylinders" },
          { slug: "composite-solids", title: "Composite Solids" },
        ],
      },
      {
        slug: "index-laws",
        title: "Index Laws",
        description:
          "Work with positive, zero and simple negative indices, and use scientific notation for large and small numbers.",
        syllabusArea: "Number and Algebra",
        focus:
          "Strengthen algebraic fluency before Year 10 algebra and non-linear relationships.",
        lessons: [
          { slug: "index-notation", title: "Index Notation" },
          { slug: "multiplying-dividing-powers", title: "Multiplying and Dividing Powers" },
          { slug: "power-of-a-power", title: "Power of a Power" },
          { slug: "zero-index", title: "Zero Index" },
          { slug: "numerical-negative-indices", title: "Numerical Negative Indices" },
          { slug: "scientific-notation", title: "Scientific Notation" },
          { slug: "magnitude-and-rounding", title: "Magnitude and Rounding" },
        ],
      },
      {
        slug: "financial-mathematics",
        title: "Financial Mathematics",
        description:
          "Calculate earnings, spending, tax, net earnings and simple interest in practical contexts.",
        syllabusArea: "Number and Algebra",
        focus:
          "Build practical financial mathematics before Year 10 compound interest, depreciation and comparisons.",
        lessons: [
          { slug: "wages-and-earnings", title: "Wages and Earnings" },
          { slug: "penalty-rates-overtime", title: "Penalty Rates and Overtime" },
          { slug: "non-wage-earnings", title: "Non-Wage Earnings" },
          { slug: "tax-and-net-earnings", title: "Tax and Net Earnings" },
          { slug: "spending-and-budgets", title: "Spending and Budgets" },
          { slug: "simple-interest", title: "Simple Interest" },
          { slug: "deposits-and-repayments", title: "Deposits and Repayments" },
        ],
      },
      {
        slug: "constant-rates-of-change",
        title: "Constant Rates of Change",
        description:
          "Connect linear relationships, gradient, graphing and constant rates of change.",
        syllabusArea: "Number and Algebra",
        focus:
          "Prepare for Year 10 linear relationships and modelling.",
        lessons: [
          { slug: "cartesian-plane-review", title: "Cartesian Plane Review" },
          { slug: "tables-rules-and-graphs", title: "Tables, Rules and Graphs" },
          { slug: "gradient-from-points", title: "Gradient from Points" },
          { slug: "gradient-intercept-form", title: "Gradient-Intercept Form" },
          { slug: "parallel-lines-foundations", title: "Parallel Lines Foundations" },
          { slug: "distance-time-graphs", title: "Distance-Time Graphs" },
          { slug: "linear-modelling", title: "Linear Modelling" },
        ],
      },
      {
        slug: "making-predictions",
        title: "Making Predictions",
        description:
          "Use sample spaces, multi-stage probability, dependent and independent events, and simulations to make predictions.",
        syllabusArea: "Statistics and Probability",
        focus:
          "Prepare for Year 10 probability, tree diagrams, Venn diagrams and conditional probability.",
        lessons: [
          { slug: "simple-complementary-events", title: "Simple and Complementary Events" },
          { slug: "sample-spaces", title: "Sample Spaces" },
          { slug: "multi-stage-events", title: "Multi-Stage Events" },
          { slug: "independent-events", title: "Independent Events" },
          { slug: "dependent-events", title: "Dependent Events" },
          { slug: "probability-simulations", title: "Probability Simulations" },
        ],
      },
      {
        slug: "making-decisions",
        title: "Making Decisions",
        description:
          "Use data summaries, quartiles, box plots and standard deviation to compare groups and make decisions.",
        syllabusArea: "Statistics and Probability",
        focus:
          "Prepare for Year 10 statistics, IQR, box plots, spread and data-based reasoning.",
        lessons: [],
      },
    ],
  },
  {
    slug: "year-10-mathematics",
    title: "Year 10 Mathematics",
    yearLevel: "Year 10",
    courseType: "Mathematics",
    status: "available",
    description:
      "Build the algebraic, graphical, measurement and trigonometric foundations needed for senior mathematics.",
    positioning:
      "Year 10 Mathematics covers Stage 5 Core content with selected Path topics to prepare students for Year 11 Standard, Advanced and Extension pathways. One course covers both essential foundations and key extension content — from algebra, trigonometry and measurement through to non-linear graphs, circle geometry and geometric proof.",
    units: [
      {
        slug: "algebraic-techniques",
        title: "Algebraic Techniques",
        description:
          "Expand and factorise expressions including quadratics, difference of two squares, and algebraic fractions.",
        syllabusArea: "Number and Algebra",
        focus: "Fluency with algebraic manipulation — the foundation for all senior mathematics.",
        lessons: [
          {
            slug: "expanding-binomial-products",
            title: "Expanding Binomial Products",
            description:
              "Expand single and double brackets using the distributive law and FOIL, and collect like terms.",
          },
          {
            slug: "factorising-expressions",
            title: "Factorising Algebraic Expressions",
            description:
              "Identify the highest common factor and use it to factorise two- and three-term algebraic expressions.",
          },
          {
            slug: "factorising-quadratics",
            title: "Factorising Quadratic Trinomials",
            description:
              "Factorise monic quadratic trinomials of the form x² + bx + c using the product-sum method.",
          },
          {
            slug: "difference-of-two-squares",
            title: "Difference of Two Squares",
            description:
              "Recognise expressions of the form a² − b² and apply the difference of two squares identity to factorise them.",
          },
          {
            slug: "algebraic-fractions",
            title: "Algebraic Fractions",
            description:
              "Simplify algebraic fractions by cancelling common factors, state restrictions, and multiply or divide simple algebraic fractions.",
          },
        ],
      },
      {
        slug: "equations-simultaneous",
        title: "Equations and Simultaneous Equations",
        description:
          "Solve linear equations, quadratic equations, and pairs of simultaneous equations.",
        syllabusArea: "Number and Algebra",
        focus: "Solving equations is the core skill of senior algebra — master every method here.",
        lessons: [
          {
            slug: "solving-linear-equations",
            title: "Solving Linear Equations",
            description:
              "Solve linear equations using inverse operations, including equations with brackets and variables on both sides.",
          },
          {
            slug: "quadratics-by-factorising",
            title: "Solving Quadratics by Factorising",
            description:
              "Solve quadratic equations by factorising and applying the null factor law.",
          },
          {
            slug: "quadratic-formula",
            title: "The Quadratic Formula",
            description:
              "Use the quadratic formula to solve quadratic equations and interpret the discriminant.",
          },
          {
            slug: "simultaneous-substitution",
            title: "Simultaneous Equations: Substitution",
            description:
              "Solve pairs of simultaneous equations by substituting one expression into the other equation.",
          },
          {
            slug: "simultaneous-elimination",
            title: "Simultaneous Equations: Elimination",
            description:
              "Solve pairs of simultaneous equations by adding or subtracting equations to eliminate one variable.",
          },
        ],
      },
      {
        slug: "linear-relationships",
        title: "Linear Relationships",
        description:
          "Gradient, y-intercept, parallel and perpendicular lines, and coordinate geometry formulas.",
        syllabusArea: "Number and Algebra",
        focus: "Coordinate geometry and linear functions — essential preparation for senior functions.",
        lessons: [
          {
            slug: "gradient-y-intercept",
            title: "Gradient and y-intercept",
            description:
              "Interpret gradient and y-intercept from equations, coordinates and straight-line graphs.",
          },
          {
            slug: "parallel-perpendicular-lines",
            title: "Parallel and Perpendicular Lines",
            description:
              "Identify parallel and perpendicular lines using gradients and simple graph relationships.",
          },
          {
            slug: "midpoint-distance",
            title: "Midpoint and Distance Formulas",
            description:
              "Calculate midpoints and distances between coordinate pairs using averages and Pythagoras.",
          },
          {
            slug: "linear-modelling",
            title: "Linear Modelling and Applications",
            description:
              "Use linear models to interpret starting values, rates, predictions and comparisons.",
          },
        ],
      },
      {
        slug: "non-linear-relationships",
        title: "Non-Linear Relationships",
        description:
          "Sketch and interpret parabolas, circles, exponential graphs, and hyperbolas.",
        syllabusArea: "Number and Algebra",
        focus: "Non-linear graphs preview the function families taught deeply in senior maths.",
        lessons: [
          {
            slug: "introduction-to-parabolas",
            title: "Introduction to Parabolas",
            description:
              "Recognise basic parabola features including vertex, symmetry, opening direction and y-intercept.",
          },
          {
            slug: "sketching-parabolas",
            title: "Sketching Parabolas",
            description:
              "Sketch simple parabolas using tables, symmetry, y-intercepts and factorised x-intercepts.",
          },
          {
            slug: "circle-graphs",
            title: "Circle Graphs",
            description:
              "Interpret circle equations using centre, radius and intercepts.",
          },
          {
            slug: "exponential-functions",
            title: "Exponential Functions",
            description:
              "Recognise introductory exponential growth and decay rules using tables, points and simple graphs.",
          },
          {
            slug: "hyperbolas",
            title: "Hyperbolas",
            description:
              "Interpret reciprocal graphs, excluded values, asymptotes and branch locations.",
          },
        ],
      },
      {
        slug: "trigonometry",
        title: "Trigonometry",
        description:
          "Apply trigonometric ratios, the sine rule, cosine rule, and area formula to solve triangles.",
        syllabusArea: "Measurement and Space",
        focus: "Trigonometry is tested in every senior pathway — build accuracy and speed here.",
        lessons: [
          {
            slug: "trigonometric-ratios",
            title: "Trigonometric Ratios",
            description:
              "Identify the hypotenuse, opposite and adjacent sides relative to a marked angle, and write sin, cos and tan using SOH-CAH-TOA.",
          },
          {
            slug: "finding-sides-trig",
            title: "Finding Unknown Sides",
            description:
              "Use trigonometric ratios to find an unknown side length in a right triangle when one side and one acute angle are known.",
          },
          {
            slug: "finding-angles-trig",
            title: "Finding Unknown Angles",
            description:
              "Apply sin⁻¹, cos⁻¹ or tan⁻¹ to find an unknown angle in a right triangle from two known sides.",
          },
          {
            slug: "elevation-depression",
            title: "Angles of Elevation and Depression",
            description:
              "Model real-world situations using angles of elevation and depression, and solve for unknown heights and distances.",
          },
          {
            slug: "sine-rule",
            title: "The Sine Rule",
            description:
              "Use the sine rule to find unknown sides and angles in non-right-angled triangles when an opposite side–angle pair is known.",
          },
          {
            slug: "cosine-rule",
            title: "The Cosine Rule",
            description:
              "Apply the cosine rule to find an unknown side or angle in a non-right-angled triangle from two sides and the included angle, or from three sides.",
          },
          {
            slug: "area-trig-formula",
            title: "Area of a Triangle",
            description:
              "Calculate the area of any triangle using A = ½ab sin C when two sides and their included angle are known.",
          },
          {
            slug: "bearings",
            title: "Bearings",
            description:
              "Read and write three-digit compass bearings, find reverse bearings, and solve simple navigation problems using bearings and trigonometry.",
          },
        ],
      },
      {
        slug: "measurement",
        title: "Measurement",
        description:
          "Calculate surface area and volume of prisms, cylinders, pyramids, cones, and spheres.",
        syllabusArea: "Measurement and Space",
        focus: "Measurement is a core Standard pathway topic and provides context for real-world problem solving.",
        lessons: [
          {
            slug: "surface-area-prisms",
            title: "Surface Area of Prisms",
            description:
              "Calculate the surface area of rectangular and triangular prisms by finding the area of every face and adding them together.",
          },
          {
            slug: "surface-area-cylinders",
            title: "Surface Area of Cylinders",
            description:
              "Apply SA = 2πr² + 2πrh to find the surface area of closed and open cylinders.",
          },
          {
            slug: "volume-prisms-cylinders",
            title: "Volume of Prisms and Cylinders",
            description:
              "Calculate the volume of rectangular prisms, triangular prisms, and cylinders, and rearrange the formula to find an unknown dimension.",
          },
          {
            slug: "pyramids",
            title: "Surface Area and Volume of Pyramids",
            description:
              "Calculate the volume of square and rectangular pyramids using V = (1/3) × base area × height, and the surface area of square pyramids using the slant height.",
          },
          {
            slug: "cones",
            title: "Surface Area and Volume of Cones",
            description:
              "Apply V = (1/3)πr²h for cone volume, CSA = πrl for curved surface area, and TSA = πr² + πrl for total surface area, using Pythagoras to find the slant height when needed.",
          },
          {
            slug: "spheres",
            title: "Surface Area and Volume of Spheres",
            description:
              "Apply SA = 4πr² and V = (4/3)πr³ to find the surface area and volume of spheres, and rearrange to find the radius.",
          },
          {
            slug: "similar-figures-scale",
            title: "Similar Figures and Scale Factors",
            description:
              "Apply length, area, and volume scale factors to similar figures: area scales by k², volume scales by k³.",
          },
        ],
      },
      {
        slug: "geometry-proofs",
        title: "Geometry and Proofs",
        description:
          "Prove congruence and similarity, and apply circle geometry theorems.",
        syllabusArea: "Measurement and Space",
        focus: "Geometric reasoning is useful for senior pathways and essential for Extension preparation.",
        lessons: [
          {
            slug: "congruent-triangles",
            title: "Congruent Triangles",
            description:
              "Use SSS, SAS, ASA and RHS to identify congruent triangles and match corresponding parts.",
          },
          {
            slug: "similar-triangles",
            title: "Similar Triangles",
            description:
              "Use angle and side relationships to identify similar triangles and calculate scale factors.",
          },
          {
            slug: "circle-chord-angle",
            title: "Circle Geometry: Chord and Angle Theorems",
            description:
              "Use chord and angle theorems to find missing angles in circles and cyclic quadrilaterals.",
          },
          {
            slug: "circle-tangents",
            title: "Circle Geometry: Tangent Theorems",
            description:
              "Use radius-tangent, equal-tangent and alternate-segment facts to reason about circles.",
          },
          {
            slug: "geometric-proofs",
            title: "Writing Geometric Proofs",
            description:
              "Write short geometric proofs by linking given facts, valid reasons and precise conclusions.",
          },
        ],
      },
      {
        slug: "probability",
        title: "Probability",
        description:
          "Calculate probabilities using tree diagrams, Venn diagrams, two-way tables, and conditional probability.",
        syllabusArea: "Statistics and Probability",
        focus: "Probability underpins senior data topics and Extension combinatorics.",
        lessons: [
          {
            slug: "multi-stage-events",
            title: "Multi-stage Events and Counting",
            description:
              "Count outcomes and calculate probabilities for simple multi-stage events with and without replacement.",
          },
          {
            slug: "tree-diagrams",
            title: "Tree Diagrams",
            description:
              "Use tree diagrams to organise stages, multiply along paths and add alternative successful paths.",
          },
          {
            slug: "venn-diagrams",
            title: "Venn Diagrams",
            description:
              "Interpret Venn regions, overlaps, unions and students outside both sets.",
          },
          {
            slug: "two-way-tables",
            title: "Two-way Tables",
            description:
              "Read two-way tables, identify joint and marginal frequencies, and compare proportions.",
          },
          {
            slug: "conditional-probability",
            title: "Conditional Probability",
            description:
              "Calculate simple conditional probabilities by restricting the group represented by the denominator.",
          },
        ],
      },
      {
        slug: "statistics-data",
        title: "Statistics and Data",
        description:
          "Summarise and display data using quartiles, box plots, standard deviation, and scatter plots.",
        syllabusArea: "Statistics and Probability",
        focus: "Data analysis skills are central to senior Standard and useful across all pathways.",
        lessons: [
          {
            slug: "quartiles-iqr",
            title: "Quartiles and Interquartile Range",
            description:
              "Find medians, quartiles and interquartile ranges, and compare the spread of datasets.",
          },
          {
            slug: "box-whisker-plots",
            title: "Box-and-whisker Plots",
            description:
              "Interpret box-and-whisker plots using five-number summaries, medians and interquartile ranges.",
          },
          {
            slug: "standard-deviation",
            title: "Standard Deviation",
            description:
              "Interpret standard deviation as a measure of numerical spread around the mean.",
          },
          {
            slug: "scatter-plots-correlation",
            title: "Scatter Plots and Correlation",
            description:
              "Describe scatter-plot relationships using direction, strength, outliers and careful interpretation.",
          },
          {
            slug: "lines-of-best-fit",
            title: "Lines of Best Fit",
            description:
              "Use lines of best fit for estimates, interpolation, extrapolation and simple residual calculations.",
          },
        ],
      },
      {
        slug: "financial-mathematics",
        title: "Financial Mathematics",
        description:
          "Apply simple and compound interest, depreciation, and investment comparisons.",
        syllabusArea: "Number and Algebra",
        focus: "Financial maths is a major senior Standard topic — this unit builds prerequisite fluency.",
        lessons: [
          {
            slug: "simple-interest",
            title: "Simple Interest",
            description:
              "Calculate simple interest, total amounts, rates and time, and compare simple-interest options.",
          },
          {
            slug: "compound-interest",
            title: "Compound Interest",
            description:
              "Use yearly compound growth factors to calculate balances, interest earned and investment comparisons.",
          },
          {
            slug: "depreciation",
            title: "Depreciation",
            description:
              "Use depreciation factors to calculate asset values, losses in value and percentage decreases.",
          },
          {
            slug: "comparing-investments",
            title: "Comparing Investments",
            description:
              "Compare financial options using final amounts, interest methods, fixed fees and net gains.",
          },
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
