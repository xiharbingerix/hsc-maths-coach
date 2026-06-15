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
  year12Standard1DataDisplaysSummaryStatisticsLessonOverride,
  year12Standard1FinancialPlanningRepaymentLessonOverride,
  year12Standard1LinearAndDirectVariationLessonOverride,
  year12Standard1MeasurementAreaVolumeLessonOverride,
  year12Standard1ProbabilityAndChanceLessonOverride,
  year12Standard1RightAngleTrigApplicationsLessonOverride,
  year12Standard1RightAngleTrigonometryLessonOverride,
  year12Standard1RatesPracticalProblemsLessonOverride,
  year12Standard1ScaleDrawingsAndPlansLessonOverride,
  year12Standard1StatisticsExamPracticeLessonOverride,
  year12Standard1TrigRatesExamPracticeLessonOverride,
} from "./lessons/year12Standard1";
import {
  year12Standard2AlgebraicRelationshipsLessonOverride,
  year12Standard2FinanceLessonOverride,
  year12Standard2MeasurementSAVLessonOverride,
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
  year11ExtensionFurtherFunctionsLessonOverride,
  year11ExtensionFurtherTrigonometryLessonOverride,
  year11ExtensionPermutationsCombinationsLessonOverride,
  year11ExtensionPolynomialsLessonOverride,
} from "./lessons/year11Extension";
import {
  year12Extension1InverseTrigLessonOverride,
  year12Extension1ProofInductionLessonOverride,
  year12Extension1VectorsLessonOverride,
  year12Extension1FurtherCalculusLessonOverride,
  year12Extension1BinomialDistributionLessonOverride,
  year12Extension1CalculusApplicationsLessonOverride,
  year12Extension1KinematicsLessonOverride,
  year12Extension1ProjectileMotionLessonOverride,
  year12Extension1SamplingDistributionLessonOverride,
  year12Extension1AreasVolumesLessonOverride,
  year12Extension1PolynomialZeroesLessonOverride,
  year12Extension1NewtonCoolingLessonOverride,
  year12Extension1VectorsProjectionLessonOverride,
  year12Extension1VectorsMotionLessonOverride,
  year12Extension1SlopeFieldsLessonOverride,
} from "./lessons/year12Extension1";
import { year10AlgebraicTechniquesLessonOverride, year10EquationsSimultaneousLessonOverride, year10FinancialMathematicsLessonOverride, year10GeometryProofsLessonOverride, year10LinearRelationshipsLessonOverride, year10NonLinearRelationshipsLessonOverride, year10ProbabilityLessonOverride, year10StatisticsDataLessonOverride, year10TrigonometryLessonOverride, year10MeasurementLessonOverride } from "./lessons/year10";
import { year9ConstantRatesOfChangeLessonOverride, year9FinancialMathematicsLessonOverride, year9GeometricalRepresentationsLessonOverride, year9IndexLawsLessonOverride, year9MakingDecisionsLessonOverride, year9MakingPredictionsLessonOverride, year9PrismsAndCylindersLessonOverride, year9WorkingWithTrianglesLessonOverride } from "./lessons/year9";
import { year8PythagorasTheoremLessonOverride, year8AlgebraFoundationsLessonOverride, year8NumberFinancialMathematicsLessonOverride, year8GeometryAnglesLessonOverride, year8LinearRelationshipsLessonOverride, year8StatisticsProbabilityLessonOverride, year8AlgebraEquationsLessonOverride, year8NumberOperationsLessonOverride, year8VolumeSurfaceAreaLessonOverride } from "./lessons/year8";
import {
  year12Extension2CalculusLessonOverride,
  year12Extension2ComplexNumbersLessonOverride,
  year12Extension2MechanicsLessonOverride,
  year12Extension2ProofLessonOverride,
  year12Extension2Vectors3DLessonOverride,
} from "./lessons/year12Extension2";

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

// Per-course question ID prefixes ensure globally unique IDs when the same override
// content is shared across pathway variants (Advanced/Core reuse the same override
// functions but generate distinct question IDs so the lesson audit never sees duplicates).
const COURSE_QUESTION_ID_PREFIX: Partial<Record<string, string>> = {
  "year-9-mathematics-advanced": "y9a-",
  "year-9-mathematics-core":     "y9c-",
  "year-10-mathematics-advanced": "y10a-",
  "year-10-mathematics-core":     "y10c-",
  "year-12-standard-1":           "y12s1-",
};

function prefixLessonQuestionIds(
  built: ExplicitLesson,
  courseSlug: string
): ExplicitLesson {
  const pfx = COURSE_QUESTION_ID_PREFIX[courseSlug];
  if (!pfx) return built;
  const p = (q: PracticeQuestion): PracticeQuestion => ({ ...q, id: `${pfx}${q.id}` });
  return {
    ...built,
    guidedPractice: built.guidedPractice.map(p),
    independentPractice: built.independentPractice.map(p),
    masteryQuiz: built.masteryQuiz.map(p),
  };
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
    year12Standard1RightAngleTrigonometryLessonOverride(course, unit, lesson) ??
    year12Standard1RightAngleTrigApplicationsLessonOverride(course, unit, lesson) ??
    year12Standard1RatesPracticalProblemsLessonOverride(course, unit, lesson) ??
    year12Standard1TrigRatesExamPracticeLessonOverride(course, unit, lesson) ??
    year12Standard1MeasurementAreaVolumeLessonOverride(course, unit, lesson) ??
    year12Standard1ScaleDrawingsAndPlansLessonOverride(course, unit, lesson) ??
    year12Standard1DataDisplaysSummaryStatisticsLessonOverride(course, unit, lesson) ??
    year12Standard1ProbabilityAndChanceLessonOverride(course, unit, lesson) ??
    year12Standard1StatisticsExamPracticeLessonOverride(course, unit, lesson) ??
    year12Standard1LinearAndDirectVariationLessonOverride(course, unit, lesson) ??
    year12Standard1FinancialPlanningRepaymentLessonOverride(course, unit, lesson) ??
    year12Standard2NetworksLessonOverride(course, unit, lesson) ??
    year12Standard2FinanceLessonOverride(course, unit, lesson) ??
    year12Standard2MeasurementSAVLessonOverride(course, unit, lesson) ??
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
    year12Extension1ProofInductionLessonOverride(course, unit, lesson) ??
    year12Extension1VectorsLessonOverride(course, unit, lesson) ??
    year12Extension1InverseTrigLessonOverride(course, unit, lesson) ??
    year12Extension1FurtherCalculusLessonOverride(course, unit, lesson) ??
    year12Extension1CalculusApplicationsLessonOverride(course, unit, lesson) ??
    year12Extension1BinomialDistributionLessonOverride(course, unit, lesson) ??
    year12Extension1KinematicsLessonOverride(course, unit, lesson) ??
    year12Extension1ProjectileMotionLessonOverride(course, unit, lesson) ??
    year12Extension1SamplingDistributionLessonOverride(course, unit, lesson) ??
    year12Extension1AreasVolumesLessonOverride(course, unit, lesson) ??
    year12Extension1PolynomialZeroesLessonOverride(course, unit, lesson) ??
    year12Extension1NewtonCoolingLessonOverride(course, unit, lesson) ??
    year12Extension1VectorsProjectionLessonOverride(course, unit, lesson) ??
    year12Extension1VectorsMotionLessonOverride(course, unit, lesson) ??
    year12Extension1SlopeFieldsLessonOverride(course, unit, lesson) ??
    year12Extension2ComplexNumbersLessonOverride(course, unit, lesson) ??
    year12Extension2Vectors3DLessonOverride(course, unit, lesson) ??
    year12Extension2CalculusLessonOverride(course, unit, lesson) ??
    year12Extension2MechanicsLessonOverride(course, unit, lesson) ??
    year12Extension2ProofLessonOverride(course, unit, lesson) ??
    year11ExtensionFurtherFunctionsLessonOverride(course, unit, lesson) ??
    year11ExtensionPolynomialsLessonOverride(course, unit, lesson) ??
    year11ExtensionFurtherTrigonometryLessonOverride(course, unit, lesson) ??
    year11ExtensionPermutationsCombinationsLessonOverride(course, unit, lesson) ??
    year11ExtensionBinomialTheoremLessonOverride(course, unit, lesson) ??
    year8NumberOperationsLessonOverride(course, unit, lesson) ??
    year8VolumeSurfaceAreaLessonOverride(course, unit, lesson) ??
    year8AlgebraFoundationsLessonOverride(course, unit, lesson) ??
    year8AlgebraEquationsLessonOverride(course, unit, lesson) ??
    year8NumberFinancialMathematicsLessonOverride(course, unit, lesson) ??
    year8PythagorasTheoremLessonOverride(course, unit, lesson) ??
    year8GeometryAnglesLessonOverride(course, unit, lesson) ??
    year8LinearRelationshipsLessonOverride(course, unit, lesson) ??
    year8StatisticsProbabilityLessonOverride(course, unit, lesson) ??
    year9IndexLawsLessonOverride(course, unit, lesson) ??
    year9FinancialMathematicsLessonOverride(course, unit, lesson) ??
    year9ConstantRatesOfChangeLessonOverride(course, unit, lesson) ??
    year9WorkingWithTrianglesLessonOverride(course, unit, lesson) ??
    year9PrismsAndCylindersLessonOverride(course, unit, lesson) ??
    year9MakingPredictionsLessonOverride(course, unit, lesson) ??
    year9MakingDecisionsLessonOverride(course, unit, lesson) ??
    year9GeometricalRepresentationsLessonOverride(course, unit, lesson) ??
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

  const built: ExplicitLesson = {
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

  return prefixLessonQuestionIds(built, course.slug);
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
          "Linear modelling, quadratic models, exponential and inverse variation models, simultaneous-equation comparisons, and HSC-style algebra in practical contexts.",
        syllabusArea: "Algebra",
        focus: "Algebraic relationships",
        lessons: [
          {
            slug: "algebraic-relationships-revision",
            title: "Algebraic Relationships Revision",
            description:
              "Consolidate Year 11 skills: solving linear equations, substituting into formulas, gradient and y-intercept, and plotting from tables — preparation for Year 12 non-linear content.",
          },
          {
            slug: "linear-relationships-modelling",
            title: "Linear Relationships and Modelling",
            description:
              "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
          },
          {
            slug: "quadratic-models",
            title: "Quadratic Models",
            description:
              "Recognise and interpret quadratic models including parabola shape, opening direction, vertex, intercepts, and practical context restrictions.",
          },
          {
            slug: "exponential-inverse-variation",
            title: "Exponential and Inverse Variation Models",
            description:
              "Recognise and evaluate exponential growth and decay models and inverse variation models, and identify each type from tables, equations, and contexts.",
          },
          {
            slug: "reciprocal-relationships",
            title: "Reciprocal Relationships",
            description:
              "Recognise and sketch y = k/x as a rectangular hyperbola, identify its asymptotes and branches, find k from a given point, and solve practical inverse variation problems.",
          },
          {
            slug: "simultaneous-equations-context",
            title: "Simultaneous Equations in Context",
            description:
              "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
          },
          {
            slug: "linear-inequalities-modelling",
            title: "Linear Inequalities and Modelling",
            description:
              "Solve linear inequalities, represent solutions on a number line, and interpret inequality constraints in practical budgeting and threshold contexts.",
          },
          {
            slug: "working-with-formulae-substitution",
            title: "Working with Formulae and Substitution",
            description:
              "Substitute values into literal equations from science, finance, and measurement contexts, and rearrange simple formulas to find a target variable.",
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
            slug: "trigonometry-revision",
            title: "Trigonometry Revision",
            description:
              "Activate Year 11 right-triangle skills: label hypotenuse, opposite and adjacent sides, apply Pythagoras' theorem, and use SOH CAH TOA — foundation for right-angled and non-right-angled trigonometry.",
          },
          {
            slug: "right-angled-trig-radians",
            title: "Right-Angled Trigonometry and Radians",
            description:
              "Convert between degrees and radians, apply SOH CAH TOA using radian angles, and solve practical right-triangle problems in both units.",
          },
          {
            slug: "elevation-depression-applications",
            title: "Angles of Elevation and Depression",
            description:
              "Identify angles of elevation and depression, draw right-angled diagrams, and apply SOH CAH TOA to find heights and distances in practical contexts.",
          },
          {
            slug: "sine-rule-cosine-rule-area-triangle",
            title: "Sine Rule, Cosine Rule and Area of a Triangle",
            description:
              "Apply sine rule, cosine rule, and the triangular area formula to practical distance and land-area problems.",
          },
          {
            slug: "non-right-angled-trigonometry",
            title: "Non-Right-Angled Trigonometry",
            description:
              "Choose sine rule or cosine rule for practical non-right-angled triangle problems in surveying and navigation contexts.",
          },
          {
            slug: "ratios-rates-revision",
            title: "Ratios and Rates Revision",
            description:
              "Consolidate Year 11 ratio and rate skills: simplify ratios, divide quantities in a given ratio, convert between common units, and calculate basic rates — preparation for speed, fuel consumption, map scales and flow-rate problems.",
          },
          {
            slug: "ratios-rates-unit-conversions",
            title: "Ratios, Rates and Unit Conversions",
            description:
              "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
          },
          {
            slug: "energy-consumption-watts-kilowatts",
            title: "Energy Consumption: Watts and Kilowatts",
            description:
              "Convert between watts and kilowatts, calculate kilowatt-hours used by appliances, and find the cost of electricity from a tariff rate.",
          },
          {
            slug: "scale-drawings-site-plans",
            title: "Scale Drawings and Site Plans",
            description:
              "Interpret architectural scale drawings, calculate actual dimensions from scaled measurements, and find perimeter and area from site plans.",
          },
          {
            slug: "rainfall-volume-calculations",
            title: "Rainfall and Volume Calculations",
            description:
              "Apply V = Ah to calculate the volume of water collected from rainfall over a catchment area, converting between mm, cm, m and litres.",
          },
          {
            slug: "bearings-navigation-problems",
            title: "Bearings and Navigation Problems",
            description:
              "Read and write true bearings, calculate back bearings, find interior angles from bearing information, and apply the cosine rule to solve practical navigation problems.",
          },
          {
            slug: "time-zones-conversions",
            title: "Time Zones and Conversions",
            description:
              "Convert times between Australian and international time zones using UTC offsets, handle midnight crossings and day changes, and understand the International Date Line.",
          },
          {
            slug: "ambiguous-case-sine-rule",
            title: "The Ambiguous Case of the Sine Rule",
            description:
              "Recognise when SSA information produces one or two valid triangles, compute both possible angles using B₂ = 180° − B₁, and test validity with A + B < 180°.",
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
        slug: "measurement-surface-area-volume",
        title: "Surface Area and Volume",
        description:
          "Calculate total surface area and volume of right prisms, cylinders and spheres, convert between volume units, and solve practical composite solid problems.",
        syllabusArea: "Measurement",
        focus: "Surface area and volume",
        lessons: [
          {
            slug: "surface-area-prisms-cylinders",
            title: "Surface Area of Prisms and Cylinders",
            description:
              "Find the total surface area of rectangular prisms, triangular prisms and cylinders by identifying each face, using nets, and applying TSA formulas.",
          },
          {
            slug: "volume-prisms-cylinders-spheres",
            title: "Volume of Prisms, Cylinders and Spheres",
            description:
              "Calculate volume using V = Ah for prisms, V = πr²h for cylinders and V = (4/3)πr³ for spheres, and convert between cm³, m³ and litres.",
          },
          {
            slug: "composite-solids-practical",
            title: "Composite Solids and Practical Applications",
            description:
              "Find surface area and volume of composite solids formed by combining or removing basic shapes, and solve practical capacity and material-cost problems.",
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
            slug: "investment-loans-revision",
            title: "Investment and Loans Revision",
            description:
              "Consolidate Year 11 percentage and interest skills: finding percentage of a quantity, percentage increase/decrease, and simple interest I = Prn — preparation for compound interest and depreciation.",
          },
          {
            slug: "investment-compound-interest",
            title: "Investment and Compound Interest",
            description:
              "Calculate compound investment balances, interest earned, growth factors, and net returns after fees.",
          },
          {
            slug: "shares-dividends-brokerage",
            title: "Shares, Dividends and Brokerage",
            description:
              "Calculate total dividends, dividend yield, brokerage fees on buying and selling shares, capital gain or loss, and total return from a share investment.",
          },
          {
            slug: "depreciation-loans",
            title: "Depreciation and Loans",
            description:
              "Model asset depreciation and loan balances using decay factors, repayments, and recurrence relations.",
          },
          {
            slug: "straight-line-vs-declining-depreciation",
            title: "Straight-Line vs Declining Balance Depreciation",
            description:
              "Apply S = V₀ − Dn for straight-line depreciation and S = V₀(1−r)ⁿ for declining balance depreciation, and compare both methods for the same asset.",
          },
          {
            slug: "annuities-revision",
            title: "Annuities Revision",
            description:
              "Consolidate Year 12 compound-interest foundations: apply A = P(1+r)ⁿ, work through recurrence relations for savings and loans, and read balance tables — preparation for future-value and present-value annuity lessons.",
          },
          {
            slug: "annuities-regular-payments",
            title: "Annuities and Regular Payments",
            description:
              "Use recurrence and table methods for regular deposits, future value, annuities, and repayment schedules.",
          },
          {
            slug: "present-value-annuities",
            title: "Present Value of Annuities",
            description:
              "Use the present value formula to find loan repayments from a lump-sum amount, calculate total interest paid, and compare loan options with different terms.",
          },
          {
            slug: "annuity-interest-factor-tables",
            title: "Annuities Using Interest Factor Tables",
            description:
              "Use tables of FV and PV interest factors to calculate future values, present values, and required regular contributions for savings and loan annuities.",
          },
          {
            slug: "retirement-annuity-planning",
            title: "Retirement and Annuity Planning",
            description:
              "Use future value and present value annuity reasoning to plan long-term savings goals, superannuation scenarios, and retirement income streams.",
          },
          {
            slug: "comparing-investments-risk-return",
            title: "Comparing Investments and the Effect of Inflation",
            description:
              "Compare investment options by effective return, identify how inflation reduces purchasing power, and use future value formulas to evaluate lump-sum alternatives.",
          },
          {
            slug: "credit-cards-consumer-decisions",
            title: "Credit Cards and Consumer Decisions",
            description:
              "Calculate monthly credit-card interest, find the total cost of a purchase paid over time, and compare buy-now-pay-later options with saving-first alternatives.",
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
            slug: "bivariate-data-revision",
            title: "Bivariate Data Revision",
            description:
              "Consolidate Year 11 univariate data skills: calculate mean, median, mode, range and standard deviation, read dot plots and histograms, and interpret data spread — preparation for scatterplot, correlation and regression lessons.",
          },
          {
            slug: "bivariate-data-scatterplots",
            title: "Bivariate Data and Scatterplots",
            description:
              "Interpret bivariate data, scatterplots, association direction, strength, outliers, and causation warnings.",
          },
          {
            slug: "correlation-association",
            title: "Correlation and Association",
            description:
              "Describe direction and strength of linear association using scatterplots and correlation values, while avoiding causation claims.",
          },
          {
            slug: "regression-prediction-residuals",
            title: "Regression Equations, Predictions and Residuals",
            description:
              "Use regression equations to make predictions, interpret slope, and calculate residuals as actual minus predicted values.",
          },
          {
            slug: "normal-distribution-z-scores",
            title: "Normal Distribution and Z-Scores",
            description:
              "Calculate and interpret z-scores, standard deviations from the mean, and empirical-rule percentages.",
          },
          {
            slug: "relative-frequency-probability",
            title: "Relative Frequency and Probability",
            description:
              "Use relative frequency, experimental probability, simulations, and two-way tables to estimate and interpret probabilities.",
          },
          {
            slug: "multistage-events-independence",
            title: "Multistage Events and Independence",
            description:
              "Use tree diagrams and tables for two-stage events, apply P(A and B) = P(A) × P(B) for independent events, and distinguish with- and without-replacement scenarios.",
          },
          {
            slug: "expected-frequency-contingency-tables",
            title: "Expected Frequency and Contingency Tables",
            description:
              "Calculate expected frequency using E = np, read and complete contingency tables, find probabilities from cell counts, and use probability to evaluate decisions.",
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
            slug: "network-flow-revision",
            title: "Network Flow Revision",
            description:
              "Activate Year 11 network foundations: identify vertices, edges, degree sequences, directed and weighted networks, adjacency matrices, and paths — preparation for flow capacity, shortest path and spanning tree lessons.",
          },
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
            slug: "network-flow-capacity-cuts",
            title: "Network Flow, Capacity and Cuts",
            description:
              "Interpret directed flow networks, capacities, bottlenecks, feasible flow, cuts, and maximum-flow limits in practical contexts.",
          },
          {
            slug: "critical-path-revision",
            title: "Critical Path Revision",
            description:
              "Activate Year 11 network scheduling foundations: read precedence tables, identify predecessor relationships, sequence activities, and calculate simple path totals — preparation for earliest start, float and critical path analysis.",
          },
          {
            slug: "critical-path-analysis",
            title: "Critical Path Analysis",
            description:
              "Use activity tables to find earliest times, critical paths, project completion time, float, and delay effects.",
          },
          {
            slug: "gantt-charts-dummy-activities",
            title: "Gantt Charts and Dummy Activities",
            description:
              "Construct Gantt charts from network diagrams, identify the critical path on a Gantt chart, and use dummy activities to model shared precedence constraints.",
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
    slug: "year-12-standard-1",
    title: "Year 12 Mathematics Standard 1",
    yearLevel: "Year 12",
    courseType: "Mathematics Standard 1",
    status: "in_progress",
    description:
      "A NSW HSC Mathematics Standard 1 pathway in development, with selected algebra, finance, measurement and data lessons active and remaining units planned.",
    positioning:
      "This pathway is being scaffolded with crossover content from Standard 2 where the syllabus overlap is clear. Standard 1-specific measurement and data lessons are now active, with further geometric and probability units planned.",
    units: [
      {
        slug: "algebraic-relationships",
        title: "Algebraic Relationships",
        description:
          "Linear modelling, quadratic models, direct variation, simultaneous-equation comparisons, and practical algebra in everyday contexts.",
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
            slug: "quadratic-models",
            title: "Quadratic Models",
            description:
              "Recognise and interpret quadratic models including parabola shape, opening direction, vertex, intercepts, and practical context restrictions.",
          },
          {
            slug: "exponential-inverse-variation",
            title: "Linear and Direct Variation Models",
            description:
              "Build and interpret linear models, identify gradient as a constant rate of change and y-intercept as a starting value, evaluate models by substitution, and check tables for linearity.",
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
              "Practise algebra modelling questions using linear models, quadratic graphs, simultaneous equations, and contextual interpretation.",
          },
        ],
      },
      {
        slug: "trigonometry-ratios-rates",
        title: "Rates, Ratios and Measurement",
        description:
          "Rates, ratios, speed, scale, unit conversion and practical measurement. Standard 1 trig content is being added alongside ratio and rate practice.",
        syllabusArea: "Measurement",
        focus: "Rates, ratios and measurement",
        lessons: [
          {
            slug: "ratios-rates-unit-conversions",
            title: "Ratios, Rates and Unit Conversions",
            description:
              "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
          },
          {
            slug: "right-angle-trig-applications",
            title: "Right-Angle Trigonometry — Applied Problems",
            description:
              "Apply sine, cosine and tangent to multi-step practical problems involving angles of elevation and depression, ramp gradients, and distances in real-world contexts.",
            stableSkillId: "y12s1-trig-right-angle-trig-applications",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12s1-trig-app-cp-a",
                label: "Identify the relevant sides and angle in a practical trig context",
              },
              {
                stableCheckpointId: "y12s1-trig-app-cp-b",
                label: "Choose the correct trigonometric ratio for the unknown quantity",
              },
              {
                stableCheckpointId: "y12s1-trig-app-cp-c",
                label: "Apply inverse trigonometry to find an angle to the nearest degree",
              },
              {
                stableCheckpointId: "y12s1-trig-app-cp-d",
                label: "Solve a two-step applied problem using a right triangle",
              },
            ],
          },
          {
            slug: "rates-practical-problems",
            title: "Rates in Practical Contexts",
            description:
              "Calculate and interpret rates in multi-step practical problems including speed, fuel consumption, flow rate and pay, applying rate formulas to find totals and compare options.",
            stableSkillId: "y12s1-trig-rates-practical-problems",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12s1-rates-pp-cp-a",
                label: "Calculate a rate from two related quantities",
              },
              {
                stableCheckpointId: "y12s1-rates-pp-cp-b",
                label: "Apply a rate to find a total amount, distance or time",
              },
              {
                stableCheckpointId: "y12s1-rates-pp-cp-c",
                label: "Compare two rate options to identify the better value",
              },
              {
                stableCheckpointId: "y12s1-rates-pp-cp-d",
                label: "Solve a multi-step rate problem combining two rates or two phases",
              },
            ],
          },
          {
            slug: "trig-rates-exam-practice",
            title: "Trigonometry and Rates Exam Practice",
            description:
              "Practise Standard 1 exam-style questions mixing right-angle trigonometry, rate calculations, and ratio reasoning with technique identification and multi-step working.",
            stableSkillId: "y12s1-trig-trig-rates-exam-practice",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12s1-exam-cp-a",
                label: "Identify whether a question requires trig, rate, or ratio reasoning",
              },
              {
                stableCheckpointId: "y12s1-exam-cp-b",
                label: "Execute the correct method to find a side, angle, or rate value",
              },
              {
                stableCheckpointId: "y12s1-exam-cp-c",
                label: "Apply a result from one part to answer a connected question",
              },
              {
                stableCheckpointId: "y12s1-exam-cp-d",
                label: "Interpret a calculated value in its practical context",
              },
            ],
          },
        ],
      },
      {
        slug: "investments-loans-annuities",
        title: "Investments, Loans and Annuities",
        description:
          "Compound investments, depreciation, loan balances, regular payments, annuities, and financial decision-making.",
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
            title: "Financial Planning and Repayments",
            description:
              "Calculate equal repayment amounts from a deposit and balance, find total plan costs, compare payment options, and check affordability against a monthly budget.",
          },
        ],
      },
      {
        slug: "statistics-and-data",
        title: "Statistics and Data",
        description:
          "Data displays, summary statistics, probability, and practical data reasoning for Standard 1 assessment.",
        syllabusArea: "Statistics",
        focus: "Statistics and data",
        lessons: [
          {
            slug: "data-displays-summary-statistics",
            title: "Data Displays and Summary Statistics",
            description:
              "Interpret graphs, tables, averages and spread measures in practical contexts.",
          },
          {
            slug: "probability-and-chance",
            title: "Probability and Chance",
            description:
              "Use probability language, tables, and simple chance models to solve practical problems.",
          },
          {
            slug: "statistics-exam-practice",
            title: "Statistics Exam Practice",
            description:
              "Practise Standard 1-style statistical and probability questions from everyday situations.",
          },
        ],
      },
      {
        slug: "measurement-geometry",
        title: "Measurement and Geometry",
        description:
          "Right-angle trigonometry, area, volume and geometry for practical measurement, scale drawings and design contexts.",
        syllabusArea: "Measurement",
        focus: "Measurement and geometry",
        lessons: [
          {
            slug: "right-angle-trigonometry",
            title: "Right-Angle Trigonometry",
            description:
              "Solve right-angle triangle problems using sine, cosine and tangent ratios.",
          },
          {
            slug: "measurement-area-volume",
            title: "Measurement, Area and Volume",
            description:
              "Calculate area, perimeter, surface area and volume for common shapes and solids.",
          },
          {
            slug: "scale-drawings-and-plans",
            title: "Scale Drawings and Plans",
            description:
              "Use scale, similarity and measurement to interpret plans, maps and diagrams.",
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
            slug: "absolute-value-functions",
            title: "Absolute Value Functions",
            description:
              "Evaluate, sketch and interpret absolute-value functions, including transformations of y = |x|.",
            stableSkillId: "y11adv-functions-absolute-value-functions",
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-functions-abs-evaluate-expressions",
                label: "Evaluate absolute-value expressions",
              },
              {
                stableCheckpointId: "y11adv-functions-abs-identify-vertex",
                label: "Identify the vertex of y = |x - a| + b",
              },
              {
                stableCheckpointId: "y11adv-functions-abs-solve-equations",
                label: "Solve simple absolute-value equations",
              },
              {
                stableCheckpointId: "y11adv-functions-abs-match-graph-features",
                label: "Match absolute-value rules to graph features",
              },
            ],
          },
          {
            slug: "odd-even-functions",
            title: "Odd and Even Functions",
            description:
              "Classify functions as even, odd or neither using f(-x) tests and graph symmetry.",
            stableSkillId: "y11adv-functions-odd-even-functions",
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-functions-sym-even-test",
                label: "Use f(-x) = f(x) to identify even functions",
              },
              {
                stableCheckpointId: "y11adv-functions-sym-odd-test",
                label: "Use f(-x) = -f(x) to identify odd functions",
              },
              {
                stableCheckpointId: "y11adv-functions-sym-connect-graph-symmetry",
                label: "Connect y-axis and origin symmetry to function type",
              },
              {
                stableCheckpointId: "y11adv-functions-sym-classify-polynomials",
                label: "Classify simple polynomial functions as even, odd or neither",
              },
            ],
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
          {
            slug: "function-translations-general",
            title: "Translating Functions",
            description:
              "Apply vertical, horizontal and combined translations of y = f(x), including image coordinates and horizontal sign conventions.",
            stableSkillId: "y11adv-gt-function-translations-general",
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-gt-trans-horizontal-sign-direction",
                label: "Identify horizontal shift direction and size from y = f(x + a) and y = f(x - a)",
              },
              {
                stableCheckpointId: "y11adv-gt-trans-vertical-direction-size",
                label: "State vertical shift direction and size from y = f(x) + b",
              },
              {
                stableCheckpointId: "y11adv-gt-trans-image-coordinates",
                label: "Find the image coordinates of a key point under a translation",
              },
              {
                stableCheckpointId: "y11adv-gt-trans-match-description-equation",
                label: "Match a translation description to the correct equation form",
              },
            ],
          },
          {
            slug: "function-dilations-reflections",
            title: "Dilating and Reflecting Functions",
            description:
              "Apply vertical and horizontal dilations, reflections in the axes, and image-point rules for transformed functions.",
            stableSkillId: "y11adv-gt-function-dilations-reflections",
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-gt-dil-vertical-factor",
                label: "State the effect of y = kf(x) on y-coordinates",
              },
              {
                stableCheckpointId: "y11adv-gt-dil-horizontal-reciprocal-factor",
                label: "State the effect of y = f(kx) on x-coordinates",
              },
              {
                stableCheckpointId: "y11adv-gt-dil-reflection-image-points",
                label: "Find the image of a point under y = -f(x) or y = f(-x)",
              },
              {
                stableCheckpointId: "y11adv-gt-dil-match-equation-form",
                label: "Match a dilation or reflection description to the correct equation form",
              },
            ],
          },
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
          {
            slug: "radians-exact-trigonometric-values",
            title: "Radians and Exact Trigonometric Values",
            description: "Legacy broad lesson covering radian concept, conversion, arc length, sector area, and exact values. Replaced by focused v2 skill slots.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "unit-circle-trigonometric-graphs",
            title: "Unit Circle and Trigonometric Graphs",
            description: "Legacy broad lesson covering unit circle, ASTC, reference angles, and trig graph features. Replaced by focused v2 skill slots.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "degrees-and-radians-concept",
            title: "Degrees and Radians",
            description: "Understand what a radian is, learn the benchmark radian-degree equivalences, and identify quadrants using radian boundaries.",
            stableSkillId: "y11adv-trig-measure-degrees-and-radians-concept",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-radian-definition",
                label: "Define a radian and state that one full turn equals 2π radians",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-radian-benchmarks",
                label: "Recall benchmark radian equivalences: 0, π/6, π/4, π/3, π/2, π, 3π/2, 2π",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-radian-quadrants",
                label: "Identify which quadrant contains a given radian angle using benchmark boundaries",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "converting-degrees-radians",
            title: "Converting Degrees to Radians",
            description: "Multiply by π/180 to convert any degree measure to an exact radian fraction and simplify.",
            stableSkillId: "y11adv-trig-measure-converting-degrees-radians",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-deg-to-rad-rule",
                label: "Apply the multiply-by-π/180 rule to convert degrees to radians",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-deg-to-rad-simplify",
                label: "Simplify the resulting fraction by cancelling common factors",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "converting-radians-degrees",
            title: "Converting Radians to Degrees",
            description: "Multiply by 180/π to convert any radian measure to degrees, cancelling π to get a pure number.",
            stableSkillId: "y11adv-trig-measure-converting-radians-degrees",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-rad-to-deg-rule",
                label: "Apply the multiply-by-180/π rule to convert radians to degrees",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-rad-to-deg-cancel",
                label: "Cancel π from numerator and denominator to obtain the degree value",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "arc-length-radian-measure",
            title: "Arc Length",
            description: "Apply s = rθ to find arc lengths, radii, and angles — converting degree angles to radians first when needed.",
            stableSkillId: "y11adv-trig-measure-arc-length-radian-measure",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-arc-find-s",
                label: "Find arc length given radius and angle in radians using s = rθ",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-arc-find-r-theta",
                label: "Rearrange s = rθ to find the radius or angle",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-arc-convert-first",
                label: "Convert a degree angle to radians before applying s = rθ",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "sector-area-radian-measure",
            title: "Sector Area",
            description: "Apply A = ½r²θ to find sector areas, radii, and angles, and calculate the perimeter of a sector.",
            stableSkillId: "y11adv-trig-measure-sector-area-radian-measure",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-sector-find-a",
                label: "Find sector area given radius and angle using A = ½r²θ",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-sector-find-r-theta",
                label: "Rearrange A = ½r²θ to find the radius or angle",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-sector-perimeter",
                label: "Calculate the perimeter of a sector using P = 2r + rθ",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "exact-trig-values-special-triangles",
            title: "Exact Trigonometric Values",
            description: "Derive and recall exact sin, cos, and tan values for π/6, π/4, and π/3 using the 30-60-90 and 45-45-90 special triangles.",
            stableSkillId: "y11adv-trig-measure-exact-trig-values-special-triangles",
            legacySlugs: ["radians-exact-trigonometric-values"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-exact-values-30-60-90",
                label: "Derive exact sin, cos, tan for π/6 and π/3 from the 30-60-90 triangle",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-exact-values-45-45-90",
                label: "Derive exact sin, cos, tan for π/4 from the 45-45-90 triangle",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-exact-values-application",
                label: "Apply exact values to evaluate trigonometric expressions without a calculator",
                legacySlugs: ["radians-exact-trigonometric-values"],
              },
            ],
          },
          {
            slug: "exact-trig-values-unit-circle",
            title: "The Unit Circle and Exact Values",
            description: "Use the unit-circle rule (cos θ, sin θ) to read exact trigonometric values at common Q1 and axis angles.",
            stableSkillId: "y11adv-trig-measure-exact-trig-values-unit-circle",
            legacySlugs: ["unit-circle-trigonometric-graphs"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-unit-circle-coordinate-rule",
                label: "State and apply the unit-circle coordinate rule (cos θ, sin θ)",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-unit-circle-q1-values",
                label: "Read exact sin, cos, and tan at π/6, π/4, and π/3 from the unit circle",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-unit-circle-boundary-values",
                label: "State the coordinates at boundary angles 0, π/2, π, 3π/2, and 2π",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
            ],
          },
          {
            slug: "unit-circle-all-quadrants",
            title: "Exact Values in All Quadrants",
            description: "Use reference angles and ASTC to evaluate exact sin, cos, and tan values for angles in Q2, Q3, and Q4.",
            stableSkillId: "y11adv-trig-measure-unit-circle-all-quadrants",
            legacySlugs: ["unit-circle-trigonometric-graphs"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-astc-signs",
                label: "State the sign of sin, cos, and tan in each quadrant using ASTC",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-reference-angle",
                label: "Find the reference angle for any angle in Q2, Q3, or Q4",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-exact-values-all-quadrants",
                label: "Evaluate exact sin, cos, tan in Q2, Q3, and Q4 using reference angle and ASTC sign",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
            ],
          },
          {
            slug: "graphing-sin-cos-tan",
            title: "Graphs of Sine, Cosine and Tangent",
            description: "State and apply the period, range, starting value, zeros, maxima, minima, and asymptotes of y = sin x, y = cos x, and y = tan x.",
            stableSkillId: "y11adv-trig-measure-graphing-sin-cos-tan",
            legacySlugs: ["unit-circle-trigonometric-graphs"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-sin-cos-graph-features",
                label: "State period, range, zeros, and starting value of y = sin x and y = cos x",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-tan-graph-features",
                label: "State period, range, and asymptote positions of y = tan x",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
            ],
          },
          {
            slug: "trig-graph-amplitude-period",
            title: "Amplitude and Period of Trigonometric Graphs",
            description:
              "Identify and calculate the amplitude |a| and period 2π/b of y = a sin(bx) and y = a cos(bx).",
            stableSkillId: "y11adv-trig-measure-trig-graph-amplitude-period",
            legacySlugs: ["unit-circle-trigonometric-graphs"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-amplitude",
                label: "State the amplitude of y = a sin(bx) or y = a cos(bx) as |a|",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-period",
                label: "Calculate the period of y = sin(bx) or y = cos(bx) as 2π/b",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
            ],
          },
          {
            slug: "trig-graph-transformations",
            title: "Transformations of Trigonometric Graphs",
            description:
              "Identify amplitude, period, phase shift (−c/b), and vertical shift (d) of y = a sin(bx + c) + d, and state the new range.",
            stableSkillId: "y11adv-trig-measure-trig-graph-transformations",
            legacySlugs: ["unit-circle-trigonometric-graphs"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-measure-phase-shift",
                label: "Calculate the phase shift of y = a sin(bx + c) + d as −c/b",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
              {
                stableCheckpointId: "y11adv-trig-measure-vertical-shift-range",
                label: "State the vertical shift and range [d − |a|, d + |a|] of y = a sin(bx + c) + d",
                legacySlugs: ["unit-circle-trigonometric-graphs"],
              },
            ],
          },
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
          {
            slug: "trigonometric-equations",
            title: "Trigonometric Equations",
            stableSkillId: "y11adv-trig-id-trigonometric-equations",
            legacySlugs: ["trigonometric-equations"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-equations-isolate-function",
                label: "Isolate sine, cosine, or tangent before solving a trigonometric equation",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-equations-reference-angle",
                label: "Find a reference angle from an exact trigonometric value",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-equations-quadrant-solutions",
                label: "Use quadrant signs to select solutions in a stated radian interval",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-equations-tangent-period",
                label: "Use period pi for tangent equations and period 2pi for sine and cosine equations",
                legacySlugs: ["trigonometric-equations"],
              },
            ],
          },
          {
            slug: "trigonometric-identities",
            title: "Trigonometric Identities",
            stableSkillId: "y11adv-trig-id-trigonometric-identities",
            legacySlugs: ["trigonometric-identities"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-identities-pythagorean",
                label: "Use sin^2 x + cos^2 x = 1 to simplify expressions",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-identities-rearrangements",
                label: "Use rearrangements of the Pythagorean identity",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-identities-quotient",
                label: "Use tan x = sin x / cos x where cos x is not zero",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-identities-valid-rewrite",
                label: "Choose a valid identity rewrite without entering proof working",
                legacySlugs: ["trigonometric-identities"],
              },
            ],
          },
          {
            slug: "related-angle-identities",
            title: "Related-Angle Identities",
            stableSkillId: "y11adv-trig-id-related-angle-identities",
            legacySlugs: ["trigonometric-identities"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-related-q2-symmetry",
                label: "Choose the correct sine, cosine, or tangent identity for pi minus theta",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-related-q3-q4-symmetry",
                label: "Choose the correct sign for pi plus theta and 2pi minus theta identities",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-related-simplify",
                label: "Simplify a related-angle expression to one trigonometric function of theta",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-related-exact-values",
                label: "Evaluate exact trigonometric values using related-angle identities",
                legacySlugs: ["trigonometric-identities"],
              },
            ],
          },
          {
            slug: "trig-equations-basic",
            title: "Basic Trigonometric Equations",
            stableSkillId: "y11adv-trig-id-trig-equations-basic",
            legacySlugs: ["trigonometric-equations"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-eq-basic-reference-angle",
                label: "Find the reference angle from an exact sine, cosine, or tangent value",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-basic-radian-solutions",
                label: "Solve sine, cosine, and tangent equations in 0 <= x <= 2pi",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-basic-degree-solutions",
                label: "Solve sine and cosine equations in 0 degrees <= x <= 360 degrees",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-basic-solution-pairs",
                label: "Select or enter finite-interval solution pairs in marking-safe formats",
                legacySlugs: ["trigonometric-equations"],
              },
            ],
          },
          {
            slug: "trig-equations-advanced",
            title: "Advanced Trigonometric Equations",
            stableSkillId: "y11adv-trig-id-trig-equations-advanced",
            legacySlugs: ["trigonometric-equations", "trig-equations-basic"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-eq-advanced-identity-first",
                label: "Use a Pythagorean identity to rewrite an equation before solving",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-advanced-factorise",
                label: "Factorise a trigonometric equation and apply the zero-product rule",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-advanced-squared-values",
                label: "Solve equations involving sin^2 x, cos^2 x, or tan^2 x over a finite domain",
                legacySlugs: ["trigonometric-equations"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-eq-advanced-complete-solution-set",
                label: "Select every solution in the stated interval without adding general solution notation",
                legacySlugs: ["trigonometric-equations"],
              },
            ],
          },
          {
            slug: "trig-identities-proof-strategies",
            title: "Trigonometric Identity Proof Strategies",
            stableSkillId: "y11adv-trig-id-proof-strategies",
            legacySlugs: ["trigonometric-identities", "related-angle-identities"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-proof-choose-side",
                label: "Choose the side of an identity that is easier to simplify",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-proof-sin-cos",
                label: "Rewrite tangent expressions in sine and cosine form",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-proof-pythagorean",
                label: "Use Pythagorean identity rearrangements inside an identity proof",
                legacySlugs: ["trigonometric-identities"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-proof-algebra-structure",
                label: "Recognise useful algebraic structures such as difference of squares and cancellation",
                legacySlugs: ["trigonometric-identities"],
              },
            ],
          },
          {
            slug: "trigonometric-identities-equations-exam-practice",
            title: "Trigonometric Identities and Equations Exam Practice",
            stableSkillId: "y11adv-trig-id-exam-practice",
            legacySlugs: ["trigonometric-identities-equations-exam-practice"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y11adv-trig-id-exam-isolate-and-solve",
                label: "Apply isolation, reference angles, and quadrant signs in mixed equation questions",
                legacySlugs: ["trigonometric-identities-equations-exam-practice"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-exam-identity-simplify",
                label: "Apply Pythagorean and quotient identities in mixed simplification questions",
                legacySlugs: ["trigonometric-identities-equations-exam-practice"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-exam-solution-pair-choice",
                label: "Choose complete finite-interval solution sets without fragile typed proof working",
                legacySlugs: ["trigonometric-identities-equations-exam-practice"],
              },
              {
                stableCheckpointId: "y11adv-trig-id-exam-method-selection",
                label: "Select whether a mixed question requires equation solving or identity rewriting",
                legacySlugs: ["trigonometric-identities-equations-exam-practice"],
              },
            ],
          },
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
          {
            slug: "chain-rule-basics",
            title: "The Chain Rule",
            description: "Differentiate composite polynomial functions of the form (ax+b)^n and (ax²+bx+c)^n using the chain rule.",
            stableSkillId: "y11adv-diff-chain-rule-basics",
            skillCheckpoints: [
              { stableCheckpointId: "y11adv-diff-chain-identify-functions", label: "Identify the inner and outer function in a composite expression" },
              { stableCheckpointId: "y11adv-diff-chain-linear-inside", label: "Apply the chain rule to differentiate (ax + b)^n" },
              { stableCheckpointId: "y11adv-diff-chain-quadratic-inside", label: "Differentiate (ax² + bx + c)^n using the chain rule" },
              { stableCheckpointId: "y11adv-diff-chain-evaluate", label: "Evaluate a chain-rule derivative at a given x-value" },
            ],
          },
          {
            slug: "stationary-points-first-derivative-test",
            title: "Stationary Points and the First Derivative Test",
            description: "Find and classify stationary points of polynomial functions and determine intervals of increase and decrease.",
            stableSkillId: "y11adv-diff-stationary-points-first-derivative-test",
            skillCheckpoints: [
              { stableCheckpointId: "y11adv-diff-stat-find-points", label: "Find stationary points by solving f'(x) = 0" },
              { stableCheckpointId: "y11adv-diff-stat-sign-diagram", label: "Construct a sign diagram for f'(x) around a stationary point" },
              { stableCheckpointId: "y11adv-diff-stat-classify", label: "Classify stationary points as local max, local min, or horizontal inflection" },
              { stableCheckpointId: "y11adv-diff-stat-intervals", label: "State intervals where f is increasing or decreasing" },
            ],
          },
          {
            slug: "second-derivative-concavity",
            title: "Second Derivative and Concavity",
            description: "Find the second derivative, determine concavity, locate and confirm points of inflection, and apply the second derivative test.",
            stableSkillId: "y11adv-diff-second-derivative-concavity",
            skillCheckpoints: [
              { stableCheckpointId: "y11adv-diff-conc-find-second", label: "Find the second derivative f''(x) by differentiating f'(x)" },
              { stableCheckpointId: "y11adv-diff-conc-concavity", label: "Determine concavity: f''(x) > 0 concave up; f''(x) < 0 concave down" },
              { stableCheckpointId: "y11adv-diff-conc-inflection", label: "Find and confirm points of inflection by setting f''(x) = 0 and checking the sign change" },
              { stableCheckpointId: "y11adv-diff-conc-second-derivative-test", label: "Apply the second derivative test to classify a stationary point" },
            ],
          },
          { slug: "tangents-normals-applications", title: "Tangents, Normals and Applications" },
          {
            slug: "curve-sketching-calculus",
            title: "Curve Sketching Using Calculus",
            description: "Combine intercepts, stationary points, increasing/decreasing intervals, concavity, and inflection points to describe a curve using calculus.",
            stableSkillId: "y11adv-diff-curve-sketching-calculus",
            skillCheckpoints: [
              { stableCheckpointId: "y11adv-diff-curve-features", label: "Find useful graph features: intercepts, stationary points, and inflection candidates" },
              { stableCheckpointId: "y11adv-diff-curve-increasing-decreasing", label: "Use the sign of f'(x) to state increasing and decreasing intervals" },
              { stableCheckpointId: "y11adv-diff-curve-concavity", label: "Use the sign of f''(x) to state concavity intervals and confirm inflection points" },
              { stableCheckpointId: "y11adv-diff-curve-synthesis", label: "Combine features into a calculus-informed graph description" },
            ],
          },
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
            slug: "solving-linear-equations",
            title: "Solving Linear Equations",
            description:
              "Use inverse operations to solve one-step, two-step and bracket equations, including equations with unknowns on both sides, in practical contexts.",
          },
          {
            slug: "nonlinear-models-context",
            title: "Non-linear Models in Context",
            description:
              "Evaluate non-linear formulas involving squares and square roots, and recognise when a relationship is quadratic rather than linear.",
          },
          {
            slug: "simultaneous-equations-context",
            title: "Simultaneous Equations",
            description:
              "Set up and solve pairs of practical linear equations to find where two models give the same output, such as equal-cost or break-even situations.",
          },
          {
            slug: "inequalities-in-context",
            title: "Inequalities in Context",
            description:
              "Read, set up and solve linear inequalities using correct notation, and interpret solutions as maximum or minimum values in practical constraint problems.",
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
            slug: "constructing-linear-models",
            title: "Constructing Linear Models",
            description:
              "Write a linear rule from a word description, two given points or a table of values, and verify by substituting back.",
          },
          {
            slug: "piecewise-step-functions",
            title: "Piecewise and Step Functions",
            description:
              "Identify and evaluate piecewise and step models with different rates for different input ranges, such as tariffs and parking fees.",
          },
          {
            slug: "break-even-analysis",
            title: "Break-even Analysis",
            description:
              "Find the break-even quantity by setting revenue equal to cost and interpret profit and loss regions in practical contexts.",
          },
          {
            slug: "practical-limitations-linear-models",
            title: "Practical Limitations of Linear Models",
            description:
              "Identify domain restrictions, explain why extrapolation may be unreliable, and state meaningful limitations of linear models in context.",
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
            slug: "leave-entitlements-superannuation",
            title: "Leave Entitlements and Superannuation",
            description:
              "Calculate annual leave pay, leave loading at 17.5%, and employer superannuation contributions at 11% of ordinary earnings.",
          },
          {
            slug: "government-benefits-allowances",
            title: "Government Benefits and Allowances",
            description:
              "Identify Youth Allowance, Family Tax Benefit and Centrelink payments, calculate benefit amounts, and apply income-free area means testing.",
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
            slug: "credit-cards-consumer-finance",
            title: "Credit Cards and Consumer Finance",
            description:
              "Calculate monthly interest on credit card balances, find minimum payments, track new balances after payments, and compare credit cards with BNPL services.",
          },
          {
            slug: "gst-discounts-consumer-arithmetic",
            title: "GST, Discounts and Consumer Arithmetic",
            description:
              "Apply 10% GST to find inclusive prices and pre-GST prices, calculate percentage discounts, and use unit pricing to find the best buy.",
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
            slug: "composite-shapes-land-measurement",
            title: "Composite Shapes and Land Measurement",
            description:
              "Find areas of L-shapes and other composite figures by splitting into rectangles and triangles, and convert between square metres and hectares for land measurement.",
          },
          {
            slug: "density-concentration-practical-rates",
            title: "Density, Concentration and Practical Rates",
            description:
              "Apply D = M/V for density, calculate fuel consumption in L/100 km, population density in people per km², and concentration in g/L.",
          },
          {
            slug: "scale-drawings-models",
            title: "Scale Drawings and Models",
            description:
              "Interpret scale 1:n to find real lengths from drawings and drawing lengths from real measurements, and apply the squared scale factor for areas.",
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
            slug: "compass-bearings-navigation",
            title: "Compass Bearings and Navigation",
            description:
              "Read true bearings using three-digit notation measured clockwise from north, identify key compass points as bearings, and calculate back bearings.",
          },
          {
            slug: "speed-distance-time",
            title: "Speed, Distance and Time",
            description:
              "Apply D = S × T to find distance, speed or time, convert between minutes and decimal hours, and calculate average speed for multi-leg journeys.",
          },
          {
            slug: "latitude-longitude-global-location",
            title: "Latitude, Longitude and Global Location",
            description:
              "Read GPS coordinates as (latitude, longitude), identify hemispheres, estimate north-south distances using 111 km per degree, and connect longitude to UTC offsets.",
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
            slug: "euler-paths-circuits",
            title: "Euler Paths and Circuits",
            description:
              "Use odd-degree vertex counts to determine whether an Euler path or Euler circuit exists, and interpret the Chinese Postman concept for route-inspection problems.",
          },
          {
            slug: "weighted-networks-shortest-paths",
            title: "Weighted Networks and Shortest Paths",
            description:
              "Systematically list and compare all viable routes in weighted networks to find the shortest path, and apply this to practical delivery and cable-routing problems.",
          },
          {
            slug: "network-flow-connectivity",
            title: "Network Flow and Connectivity",
            description:
              "Identify bridges (cut edges) by checking whether their removal disconnects the network, compare network reliability, and explain how redundant connections improve robustness.",
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
            slug: "venn-diagrams",
            title: "Venn Diagrams",
            description:
              "Use two-circle Venn diagrams to count elements in the intersection, union and complement of two sets, and calculate probabilities from each region.",
          },
          {
            slug: "conditional-probability",
            title: "Conditional Probability",
            description:
              "Find P(A|B) by restricting the sample space to the given event B, using two-way tables and Venn diagrams to identify the correct denominator.",
          },
          {
            slug: "tree-diagrams",
            title: "Tree Diagrams",
            description:
              "Construct tree diagrams for multi-stage probability problems, multiply along branches and add separate paths to find combined event probabilities with and without replacement.",
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
            slug: "grouped-data-frequency-tables",
            title: "Grouped Data and Frequency Tables",
            description:
              "Read grouped frequency tables, identify the modal class, and estimate the mean using class midpoints.",
          },
          {
            slug: "box-plots-five-number-summary",
            title: "Box Plots and the Five-Number Summary",
            description:
              "Find Q1, median, Q3, IQR and fences, identify outliers by the IQR rule, and compare two distributions using box plots.",
          },
          {
            slug: "stem-leaf-plots",
            title: "Stem-and-Leaf Plots",
            description:
              "Read and interpret stem-and-leaf plots, find the median, and compare two datasets using back-to-back stem-and-leaf plots.",
          },
          {
            slug: "time-series-trend-lines",
            title: "Time Series and Trend Lines",
            description:
              "Plot and read time series data, describe trends as increasing, decreasing or fluctuating, and make cautious predictions.",
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
    status: "available",
    description:
      "Year 11 Mathematics Extension is available across all 5 planned topics, with focused lessons for functions, polynomials, trigonometry, combinatorics, and binomial theorem.",
    positioning:
      "All 5 planned topics are available, covering Further Work with Functions, Polynomials, Further Trigonometry, Permutations and Combinations, and The Binomial Theorem.",
    units: [
      {
        slug: "further-functions",
        title: "Further Work with Functions",
        description:
          "Planned Extension functions work, including deeper function notation, transformations, and graph interpretation.",
        syllabusArea: "Functions",
        focus: "Further work with functions",
        lessons: [
          {
            slug: "inverse-functions",
            title: "Inverse Functions",
            description:
              "Find inverse functions, test one-to-one behaviour, and connect domains and ranges.",
          },
          {
            slug: "parametric-equations",
            title: "Parametric Equations",
            description:
              "Convert simple parametric equations to Cartesian form and interpret restricted paths.",
          },
          {
            slug: "polynomial-division-remainder-functions",
            title: "Polynomial Division and Remainders",
            description:
              "Use polynomial division and the remainder theorem as tools for analysing functions.",
          },
          {
            slug: "odd-even-functions-symmetry",
            title: "Odd and Even Functions",
            description:
              "Classify odd and even functions using algebraic tests and graph symmetry.",
          },
          {
            slug: "absolute-value-functions",
            title: "Absolute Value Functions",
            description:
              "Graph, solve, and interpret equations and inequalities involving absolute value functions.",
          },
        ],
      },
      {
        slug: "polynomials",
        title: "Polynomials",
        description:
          "Planned polynomial skills for Extension study, including algebraic structure, factors, roots, and graph features.",
        syllabusArea: "Polynomials",
        focus: "Polynomials",
        lessons: [
          {
            slug: "polynomial-terminology",
            title: "Polynomial Terminology",
            description:
              "Use polynomial vocabulary including degree, coefficients, leading term, and constant term.",
          },
          {
            slug: "polynomial-division-remainder-theorem",
            title: "Polynomial Division and the Remainder Theorem",
            description:
              "Divide polynomials and use P(a) to find remainders efficiently.",
          },
          {
            slug: "factor-theorem-factorisation",
            title: "Factor Theorem and Factorisation",
            description:
              "Use the factor theorem to identify linear factors and fully factorise simple cubics.",
          },
          {
            slug: "roots-and-coefficients",
            title: "Roots and Coefficients",
            description:
              "Use relationships between roots and coefficients for quadratics and cubics.",
          },
          {
            slug: "polynomial-graphs",
            title: "Polynomial Graphs",
            description:
              "Sketch polynomial graphs from degree, leading coefficient, roots, and multiplicities.",
          },
        ],
      },
      {
        slug: "further-trigonometry",
        title: "Further Trigonometry",
        description:
          "Planned Extension trigonometry support, including identities, equations, and exact-value fluency.",
        syllabusArea: "Trigonometry",
        focus: "Further trigonometry",
        lessons: [
          {
            slug: "reciprocal-trigonometric-functions",
            title: "Reciprocal Trigonometric Functions",
            description:
              "Define secant, cosecant and cotangent, and evaluate exact reciprocal trigonometric values.",
          },
          {
            slug: "compound-angle-formulae",
            title: "Compound Angle Formulae",
            description:
              "Apply compound angle formulae for sine, cosine, and tangent.",
          },
          {
            slug: "double-angle-formulae",
            title: "Double Angle Formulae",
            description:
              "Use double angle formulae for sine, cosine, and tangent, including alternate cosine forms.",
          },
          {
            slug: "t-formula-subsidiary-angle",
            title: "t-Formula and Subsidiary Angle Method",
            description:
              "Use the t-formula and subsidiary angle method to rewrite trigonometric expressions.",
          },
          {
            slug: "product-to-sum-identities",
            title: "Product-to-Sum Identities",
            description:
              "Use product-to-sum, sum-to-product, and identity reasoning in further trigonometry.",
          },
        ],
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
    status: "available",
    description:
      "Year 12 Mathematics Extension 1 with all 6 units active: proof by mathematical induction, vectors, inverse trigonometric functions, further calculus, calculus applications, and the binomial distribution.",
    positioning:
      "A complete Year 12 Mathematics Extension 1 pathway covering all 6 units against the NSW Mathematics Extension 1 11-12 syllabus: Proof by Mathematical Induction, Vectors, Inverse Trigonometric Functions, Further Calculus Skills, Further Applications of Calculus, and The Binomial Distribution.",
    units: [
      {
        slug: "proof-induction",
        title: "Proof by Mathematical Induction",
        description:
          "Learn induction structure, divisibility proofs, and inequality proofs using clear base-case and inductive-step reasoning.",
        syllabusArea: "Proof",
        focus: "Proof by mathematical induction",
        lessons: [
          {
            slug: "intro-to-mathematical-induction",
            title: "Introduction to Mathematical Induction",
            description:
              "Understand why induction works and prove the formula for the sum of the first n positive integers.",
          },
          {
            slug: "induction-divisibility",
            title: "Induction Divisibility Proofs",
            description:
              "Use induction to prove divisibility results by exposing known multiples in the k + 1 step.",
          },
          {
            slug: "induction-inequalities",
            title: "Induction Inequality Proofs",
            description:
              "Use induction to prove inequalities and choose the correct base case for the stated range.",
          },
        ],
      },
      {
        slug: "vectors",
        title: "Introduction to Vectors",
        description:
          "Build vector notation, operations, dot products, projections and practical vector applications.",
        syllabusArea: "Vectors",
        focus: "Introduction to vectors",
        lessons: [
          {
            slug: "vectors-scalars-notation",
            title: "Vectors, Scalars and Notation",
            description:
              "Define vectors and scalars, use column and i, j notation, and calculate magnitudes and unit vectors.",
          },
          {
            slug: "vector-addition-subtraction",
            title: "Vector Addition and Subtraction",
            description:
              "Add, subtract and scale vectors using component methods and geometric interpretations.",
          },
          {
            slug: "dot-product",
            title: "The Dot Product",
            description:
              "Use the dot product to find scalar products, angles between vectors, and perpendicularity.",
          },
          {
            slug: "vector-projections-applications",
            title: "Vector Projections and Applications",
            description:
              "Calculate scalar and vector projections and apply them to force, velocity and displacement contexts.",
          },
          {
            slug: "vectors-projection",
            title: "Proof of the Projection Formula and Perpendicular Component",
            description:
              "Derive the projection formula from the perpendicularity condition, find the perpendicular component of a vector, verify the decomposition using the dot product, and write the full parallel + perpendicular decomposition.",
          },
          {
            slug: "vectors-motion-2d",
            title: "Vector Functions of Time: Position, Velocity and Acceleration",
            description:
              "Represent the position of a moving point as r(t) = (x(t), y(t)), differentiate to find the velocity and acceleration vectors, compute speed |v(t)|, and find position from velocity by integration.",
          },
          {
            slug: "vectors-projectile-parametric",
            title: "Projectile Motion in Vector and Parametric Form",
            description:
              "Model projectile motion as r(t) = (Vcosθ·t, Vsinθ·t − ½gt²), find velocity by differentiation, determine time of flight, maximum height, range, and impact velocity, and solve problems where launch speed or angle is unknown.",
          },
        ],
      },
      {
        slug: "inverse-trig",
        title: "Inverse Trigonometric Functions",
        description:
          "Study inverse sine, cosine and tangent functions, their restrictions, exact values, graphs and calculus links.",
        syllabusArea: "Trigonometric functions",
        focus: "Inverse trigonometric functions",
        lessons: [
          {
            slug: "inverse-sine-cosine",
            title: "Inverse Sine and Cosine",
            description:
              "Understand restricted domains, principal ranges, exact values and graph features for arcsin and arccos.",
          },
          {
            slug: "inverse-tangent",
            title: "Inverse Tangent",
            description:
              "Use arctan's domain, range, asymptotes and exact values to solve inverse tangent and triangle problems.",
          },
          {
            slug: "differentiating-inverse-trig",
            title: "Differentiating Inverse Trig Functions",
            description:
              "Differentiate inverse trigonometric functions, apply the chain rule and recognise basic inverse-trig integrals.",
          },
        ],
      },
      {
        slug: "further-calculus",
        title: "Further Calculus Skills",
        description:
          "Planned differentiation and integration skills for Extension 1 study.",
        syllabusArea: "Calculus",
        focus: "Further calculus skills",
        lessons: [
          { slug: "trig-integrals", title: "Trigonometric Integral Forms" },
          { slug: "simple-substitution", title: "Substitution for Linear Inner Functions" },
          { slug: "integration-by-parts", title: "Introduction to Integration by Parts" },
          { slug: "further-calculus-exam-practice", title: "Further Calculus Exam Practice" },
        ],
      },
      {
        slug: "calculus-applications",
        title: "Further Applications of Calculus",
        description:
          "Extension 1 calculus applications: related rates, exponential growth and decay, and simple harmonic motion.",
        syllabusArea: "Calculus",
        focus: "Further applications of calculus",
        lessons: [
          { slug: "related-rates-of-change", title: "Related Rates of Change" },
          { slug: "newtons-law-cooling-growth-decay", title: "Exponential Growth and Decay" },
          { slug: "simple-harmonic-motion-intro", title: "Simple Harmonic Motion" },
          { slug: "calculus-applications-exam-practice", title: "Calculus Applications Exam Practice" },
          {
            slug: "calculus-applications-volumes",
            title: "Areas Between Curves and Volumes of Revolution",
            description:
              "Calculate areas enclosed between two curves and volumes of solids formed by rotating a region about the x-axis or y-axis.",
          },
          {
            slug: "calculus-applications-polynomial-zeroes",
            title: "Multiplicity of Zeroes of Polynomial Functions",
            description:
              "Define the multiplicity of a zero, prove the derivative result, and sketch polynomials in factored form by reading crossing, touch, and inflection behaviour at each zero.",
          },
          {
            slug: "calculus-applications-newton-cooling",
            title: "Newton's Law of Cooling and Limited Growth",
            description:
              "Solve dQ/dt = k(Q − A) by separation of variables to obtain Q(t) = A + Ce^(kt), apply it to Newton's Law of Cooling and population models approaching a carrying capacity, and justify long-run conclusions in context.",
          },
        ],
      },
      {
        slug: "binomial-distribution",
        title: "The Binomial Distribution",
        description:
          "Planned probability support for binomial random variables and distribution calculations.",
        syllabusArea: "Probability",
        focus: "The binomial distribution",
        lessons: [
          { slug: "bernoulli-trials", title: "Bernoulli Trials" },
          { slug: "binomial-probabilities", title: "Binomial Probabilities" },
          { slug: "mean-and-variance", title: "Mean and Variance" },
          { slug: "binomial-exam-practice", title: "Binomial Exam Practice" },
        ],
      },
      {
        slug: "kinematics",
        title: "Rates of Change and Kinematics",
        description:
          "Use calculus to analyse straight-line motion: find velocity and acceleration by differentiation, and displacement by integration.",
        syllabusArea: "Calculus",
        focus: "Kinematics and rates of change",
        lessons: [
          { slug: "kinematics-velocity-acceleration", title: "Velocity and Acceleration from Displacement" },
          { slug: "kinematics-displacement-from-velocity", title: "Displacement from Velocity by Integration" },
          { slug: "kinematics-motion-analysis", title: "Analysing Motion: Direction Changes and Total Distance" },
          { slug: "kinematics-exam-practice", title: "Kinematics Exam Practice" },
        ],
      },
      {
        slug: "projectile-motion",
        title: "Projectile Motion",
        description:
          "Analyse two-dimensional motion under gravity by resolving into independent horizontal and vertical components.",
        syllabusArea: "Calculus",
        focus: "Projectile motion",
        lessons: [
          { slug: "projectile-equations-setup", title: "Setting Up Projectile Equations" },
          { slug: "projectile-max-height", title: "Maximum Height and Time" },
          { slug: "projectile-range-flight", title: "Range and Time of Flight" },
          { slug: "projectile-exam-practice", title: "Projectile Motion Exam Practice" },
        ],
      },
      {
        slug: "sampling-distribution",
        title: "Sampling Distribution of the Mean",
        description:
          "Understand the distribution of sample means, apply the formula Var(x̄) = σ²/n, and use the Central Limit Theorem to estimate probabilities about x̄.",
        syllabusArea: "Probability",
        focus: "The binomial distribution and sampling distribution of the mean",
        lessons: [
          {
            slug: "sampling-distribution-mean",
            title: "Distribution of the Sample Mean",
            description:
              "Define population and sample, derive E(x̄) = μ and Var(x̄) = σ²/n, and examine the effect of sample size on the spread of x̄.",
          },
          {
            slug: "central-limit-theorem",
            title: "The Central Limit Theorem",
            description:
              "State the CLT, convert x̄ to z-scores, and calculate probabilities about sample means using normal distribution values.",
          },
        ],
      },
    ],
  },
  {
    slug: "year-12-extension-2",
    title: "Year 12 Mathematics Extension 2",
    yearLevel: "Year 12",
    courseType: "Mathematics Extension 2",
    status: "in_progress",
    description:
      "Year 12 Mathematics Extension 2 pathway with active Phase 1 content across Proof, Vectors in Three Dimensions, Complex Numbers, Calculus and Mechanics.",
    positioning:
      "An in-progress Year 12 Mathematics Extension 2 pathway for NSW HSC students. Every NSW Extension 2 topic area now has active authored content, with later phases planned for fuller exam coverage.",
    units: [
      {
        slug: "proof",
        title: "Proof",
        description:
          "Extension 2 proof work beginning with contradiction, contrapositive reasoning and algebraic inequality proofs. Advanced induction and exam practice are planned for later phases.",
        syllabusArea: "Proof",
        focus: "Advanced proof techniques",
        lessons: [
          {
            slug: "proof-by-contradiction",
            title: "Proof by Contradiction",
            description:
              "Assume the negation of a statement, derive a logical or arithmetic contradiction, and identify the conclusion safely through structured proof checkpoints.",
            stableSkillId: "y12e2-proof-proof-by-contradiction",
            legacySlugs: ["proof-by-contradiction"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-proof-contradiction-negation-assumption",
                label: "State the assumption that begins a proof by contradiction",
                legacySlugs: ["proof-by-contradiction"],
              },
              {
                stableCheckpointId: "y12e2-proof-contradiction-key-consequence",
                label: "Derive the key consequence that creates a contradiction",
                legacySlugs: ["proof-by-contradiction"],
              },
              {
                stableCheckpointId: "y12e2-proof-contradiction-property-violated",
                label: "Identify which property or condition is violated",
                legacySlugs: ["proof-by-contradiction"],
              },
              {
                stableCheckpointId: "y12e2-proof-contradiction-conclusion",
                label: "Select the correct conclusion after a contradiction is reached",
                legacySlugs: ["proof-by-contradiction"],
              },
            ],
          },
          {
            slug: "proof-by-contrapositive",
            title: "Proof by Contrapositive",
            description:
              "Convert P implies Q into not Q implies not P, choose when contrapositive reasoning is efficient, and complete exact parity and divisibility steps.",
            stableSkillId: "y12e2-proof-proof-by-contrapositive",
            legacySlugs: ["proof-by-contrapositive"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-proof-contrapositive-form",
                label: "Form the contrapositive not Q implies not P from a conditional statement",
                legacySlugs: ["proof-by-contrapositive"],
              },
              {
                stableCheckpointId: "y12e2-proof-contrapositive-method-selection",
                label: "Identify when contrapositive proof is simpler than direct proof",
                legacySlugs: ["proof-by-contrapositive"],
              },
              {
                stableCheckpointId: "y12e2-proof-contrapositive-algebra-step",
                label: "Complete a contrapositive argument with a correct algebraic step",
                legacySlugs: ["proof-by-contrapositive"],
              },
              {
                stableCheckpointId: "y12e2-proof-contrapositive-link-original",
                label: "Link the proven contrapositive back to the original conditional",
                legacySlugs: ["proof-by-contrapositive"],
              },
            ],
          },
          {
            slug: "inequalities-algebraic-proof",
            title: "Inequalities and Algebraic Proof",
            description:
              "Use completing the square, discriminant conditions and non-negative forms to establish inequalities with exact equality conditions.",
            stableSkillId: "y12e2-proof-inequalities-algebraic-proof",
            legacySlugs: ["inequalities-algebraic-proof"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-proof-ineq-perfect-square-expand",
                label: "Expand and simplify a perfect-square expression used in an inequality",
                legacySlugs: ["inequalities-algebraic-proof"],
              },
              {
                stableCheckpointId: "y12e2-proof-ineq-nonnegative-square",
                label: "Use a non-negative square to support an algebraic inequality",
                legacySlugs: ["inequalities-algebraic-proof"],
              },
              {
                stableCheckpointId: "y12e2-proof-ineq-discriminant-condition",
                label: "Use discriminant conditions to test whether a quadratic is always non-negative",
                legacySlugs: ["inequalities-algebraic-proof"],
              },
              {
                stableCheckpointId: "y12e2-proof-ineq-equality-condition",
                label: "Find the equality condition in an algebraic inequality",
                legacySlugs: ["inequalities-algebraic-proof"],
              },
            ],
          },
          {
            slug: "proof-by-mathematical-induction",
            title: "Proof by Mathematical Induction",
            description:
              "Prove divisibility, inequality and summation statements using strong induction: verify the base case, write a clear inductive hypothesis, and complete the algebraic step that closes the argument.",
            stableSkillId: "y12e2-proof-proof-by-mathematical-induction",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-proof-ind-base-case",
                label: "Verify the base case for a proof by mathematical induction",
              },
              {
                stableCheckpointId: "y12e2-proof-ind-hypothesis",
                label: "State the inductive hypothesis P(k) correctly",
              },
              {
                stableCheckpointId: "y12e2-proof-ind-algebraic-step",
                label: "Complete the algebraic step connecting P(k) to P(k+1)",
              },
              {
                stableCheckpointId: "y12e2-proof-ind-conclusion",
                label: "State the correct conclusion after the inductive step is complete",
              },
            ],
          },
        ],
      },
      {
        slug: "vectors-3d",
        title: "Vectors in Three Dimensions",
        description:
          "3D vector operations, dot product and angles, equations of lines, and applied exam-style vector problems.",
        syllabusArea: "Vectors",
        focus: "Vectors in three dimensions",
        lessons: [
          { slug: "vectors-and-points-3d", title: "Vectors and Points in 3D" },
          { slug: "dot-product-and-angle", title: "Dot Product and Angle" },
          { slug: "equations-of-lines-3d", title: "Equations of Lines in 3D" },
          { slug: "vector-applications-exam-practice", title: "Vector Applications and Exam Practice" },
        ],
      },
      {
        slug: "complex-numbers",
        title: "Complex Numbers",
        description:
          "Complex number arithmetic, modulus-argument form, Argand diagram geometry and polar form with De Moivre's theorem.",
        syllabusArea: "Complex Numbers",
        focus: "Complex numbers and the Argand diagram",
        lessons: [
          {
            slug: "complex-number-arithmetic",
            title: "Complex Number Arithmetic",
            stableSkillId: "y12e2-cn-complex-number-arithmetic",
            legacySlugs: ["complex-number-arithmetic"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-complex-arithmetic-add-subtract",
                label: "Add and subtract complex numbers in Cartesian form",
                legacySlugs: ["complex-number-arithmetic"],
              },
              {
                stableCheckpointId: "y12e2-cn-complex-arithmetic-multiply",
                label: "Multiply complex numbers and simplify powers of i",
                legacySlugs: ["complex-number-arithmetic"],
              },
              {
                stableCheckpointId: "y12e2-cn-complex-arithmetic-divide-conjugate",
                label: "Divide complex numbers using the conjugate",
                legacySlugs: ["complex-number-arithmetic"],
              },
            ],
          },
          {
            slug: "modulus-argument-conjugate",
            title: "Modulus, Argument and Conjugate",
            stableSkillId: "y12e2-cn-modulus-argument-conjugate",
            legacySlugs: ["modulus-argument-conjugate"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-modulus-argument-definition",
                label: "Find the modulus and principal argument of a complex number",
                legacySlugs: ["modulus-argument-conjugate"],
              },
              {
                stableCheckpointId: "y12e2-cn-conjugate-properties-division",
                label: "Use conjugate properties in algebraic and geometric forms",
                legacySlugs: ["modulus-argument-conjugate"],
              },
            ],
          },
          {
            slug: "argand-diagram-geometry",
            title: "Argand Diagram and Geometry",
            stableSkillId: "y12e2-cn-argand-diagram-geometry",
            legacySlugs: ["argand-diagram-geometry"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-argand-plotting-loci",
                label: "Plot complex numbers and interpret simple Argand loci",
                legacySlugs: ["argand-diagram-geometry"],
              },
              {
                stableCheckpointId: "y12e2-cn-argand-geometric-operations",
                label: "Interpret complex operations geometrically on the Argand plane",
                legacySlugs: ["argand-diagram-geometry"],
              },
            ],
          },
          {
            slug: "polar-form-de-moivre",
            title: "Polar Form and De Moivre's Theorem",
            stableSkillId: "y12e2-cn-polar-form-de-moivre",
            legacySlugs: ["polar-form-de-moivre"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-polar-form-conversion",
                label: "Convert between Cartesian and polar form",
                legacySlugs: ["polar-form-de-moivre"],
              },
              {
                stableCheckpointId: "y12e2-cn-de-moivre-theorem-powers",
                label: "Use De Moivre's theorem to raise complex numbers to powers",
                legacySlugs: ["polar-form-de-moivre"],
              },
            ],
          },
          {
            slug: "roots-of-unity",
            title: "Roots of Unity",
            description:
              "Find all nth roots of unity using De Moivre's theorem, plot them on the Argand diagram as equally-spaced points on the unit circle, and prove their sum is zero.",
            stableSkillId: "y12e2-cn-roots-of-unity",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-rou-formula",
                label: "State the nth roots of unity using cis(2πk/n) for k = 0, 1, …, n−1",
              },
              {
                stableCheckpointId: "y12e2-cn-rou-argand-geometry",
                label: "Describe the Argand diagram arrangement of nth roots of unity",
              },
              {
                stableCheckpointId: "y12e2-cn-rou-sum-zero",
                label: "Prove or verify that the sum of all nth roots of unity equals zero",
              },
            ],
          },
          {
            slug: "complex-polynomials",
            title: "Complex Polynomials",
            description:
              "Apply the conjugate root theorem to real polynomials, find complex roots in conjugate pairs, and factorise real polynomials over ℂ into linear and irreducible quadratic factors.",
            stableSkillId: "y12e2-cn-complex-polynomials",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-cn-poly-conjugate-root-theorem",
                label: "Apply the conjugate root theorem: if a+bi is a root, then a−bi is also a root",
              },
              {
                stableCheckpointId: "y12e2-cn-poly-find-complex-roots",
                label: "Find complex roots of a real polynomial given one complex root",
              },
              {
                stableCheckpointId: "y12e2-cn-poly-factorise-over-complex",
                label: "Factorise a real polynomial into linear and irreducible quadratic factors over ℂ",
              },
            ],
          },
        ],
      },
      {
        slug: "calculus",
        title: "Calculus",
        description:
          "Extension 2 integration techniques including method selection, integration by parts, and reduction formulae. Volumes and differential equations will be added in later phases.",
        syllabusArea: "Calculus",
        focus: "Further calculus methods and applications",
        lessons: [
          {
            slug: "advanced-integration-method-selection",
            title: "Advanced Integration Method Selection",
            description:
              "Identify which technique to use before computing: substitution, integration by parts, partial fractions, standard form, or trigonometric identities.",
            stableSkillId: "y12e2-calc-advanced-integration-method-selection",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-method-substitution",
                label: "Identify substitution integrals: composite function with derivative of inner function present",
              },
              {
                stableCheckpointId: "y12e2-calc-method-by-parts",
                label: "Identify integration by parts integrals: product of different function families",
              },
              {
                stableCheckpointId: "y12e2-calc-method-partial-fractions",
                label: "Identify partial fractions integrals: rational function with factorable denominator",
              },
              {
                stableCheckpointId: "y12e2-calc-method-trig-identity",
                label: "Identify trigonometric identity integrals: powers of sin or cos requiring half-angle reduction",
              },
            ],
          },
          {
            slug: "integration-by-parts-extension",
            title: "Integration by Parts Extension",
            description:
              "Apply integration by parts to repeated products, logarithmic integrands, and definite integrals with exact answers.",
            stableSkillId: "y12e2-calc-integration-by-parts-extension",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-ibp-liate-choice",
                label: "Apply LIATE to choose u and dv in a by-parts integral",
              },
              {
                stableCheckpointId: "y12e2-calc-ibp-repeated",
                label: "Perform repeated by-parts applications for polynomial × exponential products",
              },
              {
                stableCheckpointId: "y12e2-calc-ibp-logarithm",
                label: "Integrate ∫ln(x)dx and ∫x·ln(x)dx by setting dv = dx or dv = x dx",
              },
              {
                stableCheckpointId: "y12e2-calc-ibp-definite",
                label: "Evaluate definite by-parts integrals by substituting limits after all algebra is complete",
              },
            ],
          },
          {
            slug: "reduction-formulae-introduction",
            title: "Reduction Formulae Introduction",
            description:
              "Use supplied reduction formulae to evaluate families of integrals recursively from base cases.",
            stableSkillId: "y12e2-calc-reduction-formulae-introduction",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-red-base-case",
                label: "Identify the correct base case(s) required to initialise a reduction recurrence",
              },
              {
                stableCheckpointId: "y12e2-calc-red-substitute",
                label: "Substitute a given n into a reduction formula to compute the next value",
              },
              {
                stableCheckpointId: "y12e2-calc-red-iterate",
                label: "Evaluate several successive terms of a recurrence from supplied initial values",
              },
              {
                stableCheckpointId: "y12e2-calc-red-apply-definite",
                label: "Use a reduction result to evaluate a definite integral exactly",
              },
            ],
          },
          {
            slug: "partial-fractions-integration",
            title: "Partial Fractions Integration",
            description:
              "Decompose proper rational functions into partial fractions over distinct or repeated linear factors, then integrate each term to produce logarithmic or power expressions.",
            stableSkillId: "y12e2-calc-partial-fractions-integration",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-pf-cover-up",
                label: "Use the cover-up rule to find numerators of partial fractions over distinct linear factors",
              },
              {
                stableCheckpointId: "y12e2-calc-pf-repeated-factor",
                label: "Handle repeated linear factors by including A/(x−a) and B/(x−a)² terms",
              },
              {
                stableCheckpointId: "y12e2-calc-pf-integrate",
                label: "Integrate each partial fraction term and combine to give the final answer",
              },
            ],
          },
          {
            slug: "t-substitution-weierstrass",
            title: "t-Substitution (Weierstrass)",
            description:
              "Apply the Weierstrass substitution t = tan(x/2) to convert integrands involving sin x and cos x into rational functions of t, then integrate using standard techniques.",
            stableSkillId: "y12e2-calc-t-substitution-weierstrass",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-tsub-formulas",
                label: "State sin x, cos x, and dx in terms of t = tan(x/2)",
              },
              {
                stableCheckpointId: "y12e2-calc-tsub-convert",
                label: "Convert a trig integrand into a rational function using the t-substitution",
              },
              {
                stableCheckpointId: "y12e2-calc-tsub-integrate",
                label: "Integrate the resulting rational function and back-substitute",
              },
            ],
          },
          {
            slug: "trig-identity-integration",
            title: "Integration Using Trigonometric Identities",
            description:
              "Use half-angle identities sin²x = (1−cos2x)/2 and cos²x = (1+cos2x)/2 to reduce powers of sine and cosine before integrating, and handle mixed products using product-to-sum identities.",
            stableSkillId: "y12e2-calc-trig-identity-integration",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-calc-trig-half-angle",
                label: "Apply the half-angle identity to reduce sin²x or cos²x before integrating",
              },
              {
                stableCheckpointId: "y12e2-calc-trig-product-to-sum",
                label: "Use product-to-sum identities to convert sin(ax)cos(bx) into a sum",
              },
              {
                stableCheckpointId: "y12e2-calc-trig-definite-exact",
                label: "Evaluate definite integrals of trig powers to exact values",
              },
            ],
          },
        ],
      },
      {
        slug: "mechanics",
        title: "Mechanics",
        description:
          "Extension 2 mechanics using calculus: rectilinear motion, simple harmonic motion, and uniform circular motion. Resisted motion and projectile applications are planned for Phase 2.",
        syllabusArea: "Mechanics",
        focus: "Mechanics modelling and motion",
        lessons: [
          {
            slug: "rectilinear-motion-calculus",
            title: "Rectilinear Motion with Calculus",
            description:
              "Use v = dx/dt and a = dv/dt to find velocity and acceleration from a position function, recover position from acceleration using initial conditions, and interpret direction and speed from signs.",
            stableSkillId: "y12e2-mech-rectilinear-motion-calculus",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-mech-rect-velocity-from-position",
                label: "Find velocity by differentiating a position function",
              },
              {
                stableCheckpointId: "y12e2-mech-rect-acceleration-from-velocity",
                label: "Find acceleration by differentiating a velocity function",
              },
              {
                stableCheckpointId: "y12e2-mech-rect-integrate-acceleration",
                label: "Recover velocity and position by integrating acceleration with initial conditions",
              },
              {
                stableCheckpointId: "y12e2-mech-rect-interpret-signs",
                label: "Interpret the sign and magnitude of velocity as direction and speed",
              },
            ],
          },
          {
            slug: "simple-harmonic-motion-extended",
            title: "Simple Harmonic Motion — Energy and Initial Conditions",
            description:
              "Use x = a sin(nt + α) or x = a cos(nt + α) to identify amplitude, angular frequency and period, apply the energy equation v² = n²(a² − x²) to find speed at any position, and determine maximum speed and acceleration.",
            stableSkillId: "y12e2-mech-simple-harmonic-motion-extended",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-mech-shm-amplitude-period",
                label: "Identify amplitude and period from a SHM displacement equation",
              },
              {
                stableCheckpointId: "y12e2-mech-shm-max-speed-acceleration",
                label: "State maximum speed as an and maximum acceleration as an²",
              },
              {
                stableCheckpointId: "y12e2-mech-shm-energy-equation",
                label: "Apply v² = n²(a² − x²) to find speed at any given position",
              },
              {
                stableCheckpointId: "y12e2-mech-shm-defining-condition",
                label: "Verify ẍ = −n²x as the defining condition of SHM",
              },
            ],
          },
          {
            slug: "circular-motion-uniform",
            title: "Uniform Circular Motion",
            description:
              "Apply v = rω and a = rω² = v²/r to find speed, centripetal acceleration, and centripetal force for objects in uniform circular motion, and connect angular velocity to period.",
            stableSkillId: "y12e2-mech-circular-motion-uniform",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-mech-circ-speed-angular-velocity",
                label: "Convert between linear speed and angular velocity using v = rω",
              },
              {
                stableCheckpointId: "y12e2-mech-circ-centripetal-acceleration",
                label: "Calculate centripetal acceleration using a = rω² or a = v²/r",
              },
              {
                stableCheckpointId: "y12e2-mech-circ-centripetal-force",
                label: "Apply F = mrω² to find centripetal force",
              },
              {
                stableCheckpointId: "y12e2-mech-circ-period-frequency",
                label: "Use T = 2π/ω to find period and angular velocity",
              },
            ],
          },
          {
            slug: "resisted-motion",
            title: "Resisted Motion",
            description:
              "Model horizontal resisted motion with ma = −kv and vertical resisted motion under gravity with ma = mg − kv, find terminal velocity, and solve the separable ODE for v(t) and x(t).",
            stableSkillId: "y12e2-mech-resisted-motion",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-mech-resist-equation-of-motion",
                label: "Write the equation of motion for horizontal and vertical resisted motion",
              },
              {
                stableCheckpointId: "y12e2-mech-resist-terminal-velocity",
                label: "Find terminal velocity by setting the net force to zero",
              },
              {
                stableCheckpointId: "y12e2-mech-resist-solve-ode",
                label: "Solve the separable ODE to find v(t) and x(t) for resisted motion",
              },
            ],
          },
          {
            slug: "projectile-motion-resistance",
            title: "Projectile Motion with Air Resistance",
            description:
              "Analyse two-dimensional projectile motion with air resistance by solving decoupled horizontal and vertical ODEs, express velocity components as functions of time, and find the terminal speed in each direction.",
            stableSkillId: "y12e2-mech-projectile-motion-resistance",
            skillCheckpoints: [
              {
                stableCheckpointId: "y12e2-mech-proj-decouple-odes",
                label: "Write decoupled horizontal and vertical equations of motion with air resistance",
              },
              {
                stableCheckpointId: "y12e2-mech-proj-solve-horizontal",
                label: "Solve the horizontal ODE to find x-component of velocity and displacement",
              },
              {
                stableCheckpointId: "y12e2-mech-proj-solve-vertical",
                label: "Solve the vertical ODE to find y-component of velocity and displacement",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "year-9-mathematics",
    title: "Year 9 Mathematics",
    yearLevel: "9",
    courseType: "standard",
    status: "available",
    description:
      "Build the Stage 5 foundations for Year 10 Mathematics through geometry, trigonometry, algebra, measurement, finance, probability and statistics.",
    positioning:
      "A Year 9 Stage 5 foundation pathway based on the NSW Mathematics Kâ€“10 Syllabus and guided by the NSW Stage 5 sample scope and sequence. It prepares students for the completed Year 10 Mathematics course.",
    units: [
      {
        slug: "geometrical-representations",
        title: "Geometrical Representations",
        description:
          "Use similarity, ratio, scale factors and geometric representations to compare shapes and diagrams.",
        syllabusArea: "Measurement and Space",
        focus:
          "Build proportional reasoning, scale and geometric representation skills needed for Year 10 geometry and measurement.",
        lessons: [
          { slug: "similar-figures", title: "Similar Figures" },
          { slug: "ratio-scale-factors", title: "Ratio and Scale Factors" },
          { slug: "scale-drawings", title: "Scale Drawings" },
          { slug: "geometric-representations", title: "Geometric Representations" },
          { slug: "networks-introduction", title: "Introduction to Networks" },
        ],
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
        lessons: [
          { slug: "mean-median-mode-range-review", title: "Mean, Median, Mode and Range Review" },
          { slug: "quartiles-iqr", title: "Quartiles and Interquartile Range" },
          { slug: "box-plots", title: "Box Plots" },
          { slug: "comparing-data-sets", title: "Comparing Data Sets" },
          { slug: "standard-deviation-introduction", title: "Standard Deviation Introduction" },
          { slug: "data-based-decisions", title: "Data-Based Decisions" },
        ],
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
      "Year 10 Mathematics covers Stage 5 Core content with selected Path topics to prepare students for Year 11 Standard, Advanced and Extension pathways. One course covers both essential foundations and key extension content â€” from algebra, trigonometry and measurement through to non-linear graphs, circle geometry and geometric proof.",
    units: [
      {
        slug: "algebraic-techniques",
        title: "Algebraic Techniques",
        description:
          "Expand and factorise expressions including quadratics, difference of two squares, and algebraic fractions.",
        syllabusArea: "Number and Algebra",
        focus: "Fluency with algebraic manipulation â€” the foundation for all senior mathematics.",
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
              "Factorise monic quadratic trinomials of the form xÂ² + bx + c using the product-sum method.",
          },
          {
            slug: "difference-of-two-squares",
            title: "Difference of Two Squares",
            description:
              "Recognise expressions of the form aÂ² âˆ’ bÂ² and apply the difference of two squares identity to factorise them.",
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
        focus: "Solving equations is the core skill of senior algebra â€” master every method here.",
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
        focus: "Coordinate geometry and linear functions â€” essential preparation for senior functions.",
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
        focus: "Trigonometry is tested in every senior pathway â€” build accuracy and speed here.",
        lessons: [
          {
            slug: "trigonometric-ratios",
            title: "Trigonometric Ratios",
            description:
              "Identify the hypotenuse, opposite and adjacent sides relative to a marked angle, and write sin, cos and tan using SOH-CAH-TOA.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "finding-sides-trig",
            title: "Finding Unknown Sides",
            description:
              "Use trigonometric ratios to find an unknown side length in a right triangle when one side and one acute angle are known.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "finding-angles-trig",
            title: "Finding Unknown Angles",
            description:
              "Apply sinâ»Â¹, cosâ»Â¹ or tanâ»Â¹ to find an unknown angle in a right triangle from two known sides.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "elevation-depression",
            title: "Angles of Elevation and Depression",
            description:
              "Model real-world situations using angles of elevation and depression, and solve for unknown heights and distances.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "sine-rule",
            title: "The Sine Rule",
            description:
              "Use the sine rule to find unknown sides and angles in non-right-angled triangles when an opposite sideâ€“angle pair is known.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "cosine-rule",
            title: "The Cosine Rule",
            description:
              "Apply the cosine rule to find an unknown side or angle in a non-right-angled triangle from two sides and the included angle, or from three sides.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "area-trig-formula",
            title: "Area of a Triangle",
            description:
              "Calculate the area of any triangle using A = Â½ab sin C when two sides and their included angle are known.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "bearings",
            title: "Bearings",
            description:
              "Read and write three-digit compass bearings, find reverse bearings, and solve simple navigation problems using bearings and trigonometry.",
            seedQuestions: false,
            showInCourseNav: false,
          },
          {
            slug: "trig-ratios-identifying-sides",
            title: "Identifying Triangle Sides",
            description:
              "Identify the hypotenuse, opposite and adjacent sides relative to a marked angle in a right triangle.",
            stableSkillId: "y10-trig-ratios-identifying-sides",
            legacySlugs: ["trigonometric-ratios"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-side-labels-hypotenuse",
                label: "Identify the hypotenuse from the right angle",
                legacySlugs: ["trigonometric-ratios"],
              },
              {
                stableCheckpointId: "y10-trig-side-labels-opposite-adjacent",
                label: "Identify opposite and adjacent sides from the marked angle",
                legacySlugs: ["trigonometric-ratios"],
              },
            ],
          },
          {
            slug: "trig-ratios-sin-cos-tan",
            title: "Writing and Selecting Trig Ratios",
            description:
              "Write sin, cos and tan ratios from labelled right triangles and select the correct ratio for a pair of sides.",
            stableSkillId: "y10-trig-ratios-sin-cos-tan",
            legacySlugs: ["trigonometric-ratios"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-soh-cah-toa-ratio-writing",
                label: "Write sin, cos and tan using SOH-CAH-TOA",
                legacySlugs: ["trigonometric-ratios"],
              },
              {
                stableCheckpointId: "y10-trig-ratio-selection",
                label: "Select the ratio that matches the known and wanted sides",
                legacySlugs: ["trigonometric-ratios"],
              },
            ],
          },
          {
            slug: "finding-sides-sin-cos",
            title: "Finding Sides Using Sin and Cos",
            description:
              "Use sin and cos to find unknown sides in right triangles involving the hypotenuse.",
            stableSkillId: "y10-trig-finding-sides-sin-cos",
            legacySlugs: ["finding-sides-trig"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-find-side-sin",
                label: "Use sine to connect opposite and hypotenuse",
                legacySlugs: ["finding-sides-trig"],
              },
              {
                stableCheckpointId: "y10-trig-find-side-cos",
                label: "Use cosine to connect adjacent and hypotenuse",
                legacySlugs: ["finding-sides-trig"],
              },
            ],
          },
          {
            slug: "finding-sides-tan",
            title: "Finding Sides Using Tan",
            description:
              "Use tan to find unknown opposite or adjacent side lengths without using the hypotenuse.",
            stableSkillId: "y10-trig-finding-sides-tan",
            legacySlugs: ["finding-sides-trig"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-find-side-tan-opposite",
                label: "Find an opposite side using tan",
                legacySlugs: ["finding-sides-trig"],
              },
              {
                stableCheckpointId: "y10-trig-find-side-tan-adjacent",
                label: "Find an adjacent side using tan",
                legacySlugs: ["finding-sides-trig"],
              },
            ],
          },
          {
            slug: "finding-angles-inverse-trig",
            title: "Finding Angles Using Inverse Trig",
            description:
              "Apply inverse sin, inverse cos or inverse tan to find an unknown angle in a right triangle.",
            stableSkillId: "y10-trig-finding-angles-inverse-trig",
            legacySlugs: ["finding-angles-trig"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-inverse-ratio-selection",
                label: "Choose the inverse trig function from two known sides",
                legacySlugs: ["finding-angles-trig"],
              },
            ],
          },
          {
            slug: "elevation-depression-applications",
            title: "Angles of Elevation and Depression",
            description:
              "Model elevation and depression contexts as right triangles and solve for heights, distances or angles.",
            stableSkillId: "y10-trig-elevation-depression-applications",
            legacySlugs: ["elevation-depression"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-elevation-depression-models",
                label: "Draw and solve elevation and depression models",
                legacySlugs: ["elevation-depression"],
              },
            ],
          },
          {
            slug: "sine-rule-finding-sides",
            title: "Sine Rule - Finding Sides",
            description:
              "Use the sine rule to find unknown sides in non-right-angled triangles.",
            stableSkillId: "y10-trig-sine-rule-finding-sides",
            legacySlugs: ["sine-rule"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-sine-rule-side-pairs",
                label: "Use opposite side-angle pairs to find a side",
                legacySlugs: ["sine-rule"],
              },
            ],
          },
          {
            slug: "sine-rule-finding-angles",
            title: "Sine Rule - Finding Angles",
            description:
              "Use the sine rule and inverse sine to find unknown angles in non-right-angled triangles.",
            stableSkillId: "y10-trig-sine-rule-finding-angles",
            legacySlugs: ["sine-rule"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-sine-rule-angle-pairs",
                label: "Use opposite side-angle pairs to find an angle",
                legacySlugs: ["sine-rule"],
              },
            ],
          },
          {
            slug: "cosine-rule-finding-sides",
            title: "Cosine Rule - Finding Sides",
            description:
              "Use the cosine rule to find a side from two sides and the included angle.",
            stableSkillId: "y10-trig-cosine-rule-finding-sides",
            legacySlugs: ["cosine-rule"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-cosine-rule-sas",
                label: "Use the cosine rule for SAS side-finding",
                legacySlugs: ["cosine-rule"],
              },
            ],
          },
          {
            slug: "cosine-rule-finding-angles",
            title: "Cosine Rule - Finding Angles",
            description:
              "Rearrange the cosine rule to find an unknown angle from three sides.",
            stableSkillId: "y10-trig-cosine-rule-finding-angles",
            legacySlugs: ["cosine-rule"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-cosine-rule-sss",
                label: "Use the cosine rule for SSS angle-finding",
                legacySlugs: ["cosine-rule"],
              },
            ],
          },
          {
            slug: "area-of-triangle-formula",
            title: "Area of a Triangle",
            description:
              "Calculate triangle area using one half ab sin C and rearrange the formula in simple cases.",
            stableSkillId: "y10-trig-area-of-triangle-formula",
            legacySlugs: ["area-trig-formula"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-area-half-ab-sin-c",
                label: "Use one half ab sin C for non-right triangle area",
                legacySlugs: ["area-trig-formula"],
              },
            ],
          },
          {
            slug: "bearings-and-trigonometry",
            title: "Bearings",
            description:
              "Read and write three-digit bearings and solve navigation problems using trigonometry.",
            stableSkillId: "y10-trig-bearings-and-trigonometry",
            legacySlugs: ["bearings"],
            skillCheckpoints: [
              {
                stableCheckpointId: "y10-trig-three-digit-bearings",
                label: "Interpret three-digit and reverse bearings",
                legacySlugs: ["bearings"],
              },
              {
                stableCheckpointId: "y10-trig-bearing-components",
                label: "Use trig to resolve bearing distances",
                legacySlugs: ["bearings"],
              },
            ],
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
              "Apply SA = 2Ï€rÂ² + 2Ï€rh to find the surface area of closed and open cylinders.",
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
              "Calculate the volume of square and rectangular pyramids using V = (1/3) Ã— base area Ã— height, and the surface area of square pyramids using the slant height.",
          },
          {
            slug: "cones",
            title: "Surface Area and Volume of Cones",
            description:
              "Apply V = (1/3)Ï€rÂ²h for cone volume, CSA = Ï€rl for curved surface area, and TSA = Ï€rÂ² + Ï€rl for total surface area, using Pythagoras to find the slant height when needed.",
          },
          {
            slug: "spheres",
            title: "Surface Area and Volume of Spheres",
            description:
              "Apply SA = 4Ï€rÂ² and V = (4/3)Ï€rÂ³ to find the surface area and volume of spheres, and rearrange to find the radius.",
          },
          {
            slug: "similar-figures-scale",
            title: "Similar Figures and Scale Factors",
            description:
              "Apply length, area, and volume scale factors to similar figures: area scales by kÂ², volume scales by kÂ³.",
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
        focus: "Financial maths is a major senior Standard topic â€” this unit builds prerequisite fluency.",
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
  {
    slug: "year-8-mathematics",
    title: "Year 8 Mathematics",
    yearLevel: "Year 8",
    courseType: "Mathematics",
    status: "available",
    description:
      "Build Stage 4 foundations across number, algebra, geometry, measurement and statistics â€” the essential groundwork for Year 9 and 10 Mathematics.",
    positioning:
      "Year 8 Mathematics covers the Late Stage 4 NSW curriculum, preparing students for the Year 9 pathway and the transition to Stage 5 content. It extends Year 7 foundations with linear relationships, Pythagoras, geometric reasoning and algebraic equation-solving.",
    units: [
      {
        slug: "number-operations",
        title: "Number Operations and Properties",
        description:
          "Consolidate directed numbers, rational and irrational numbers, index notation, fractions and real-world financial contexts.",
        syllabusArea: "Number and Algebra",
        focus:
          "Ensure fluency with the number system before extending to algebra and coordinate geometry.",
        lessons: [
          { slug: "directed-numbers",          title: "Directed Numbers" },
          { slug: "fractions-and-decimals",   title: "Fractions and Decimals" },
          { slug: "percentages-and-fractions",    title: "Percentages and Fractions" },
          { slug: "order-of-operations",         title: "Order of Operations" },
          { slug: "powers-roots-and-squares",     title: "Powers, Roots and Squares" },
          { slug: "estimation-and-reasonableness", title: "Estimation and Reasonableness" },
        ],
      },
      {
        slug: "algebra-foundations",
        title: "Algebra Foundations",
        description:
          "Simplify expressions, collect like terms, substitute values, expand single brackets, and solve one- and two-step equations â€” building the fluency and confidence needed for Year 9 algebra.",
        syllabusArea: "Number and Algebra",
        focus:
          "Develop core algebraic fluency before Year 9 index laws, linear relationships and simultaneous equations. No quadratics, no simultaneous equations, no factorisation.",
        lessons: [
          { slug: "simplifying-algebraic-expressions", title: "Simplifying Algebraic Expressions" },
          { slug: "collecting-like-terms",             title: "Collecting Like Terms" },
          { slug: "substitution",                      title: "Substitution" },
          { slug: "expanding-single-brackets",         title: "Expanding Single Brackets" },
          { slug: "solving-one-step-equations",        title: "Solving One-Step Equations" },
          { slug: "solving-two-step-equations",        title: "Solving Two-Step Equations" },
        ],
      },
      {
        slug: "number-financial-mathematics",
        title: "Number and Financial Mathematics",
        description:
          "Calculate percentages, apply percentage increase and decrease, find profit and loss, work with discounts and use simple interest in everyday Australian money contexts.",
        syllabusArea: "Number and Algebra",
        focus:
          "Build financial numeracy and percentage fluency needed for Year 9 financial mathematics and real-world problem solving.",
        lessons: [
          { slug: "percentages-basics",            title: "Percentages Basics" },
          { slug: "percentage-increase",           title: "Percentage Increase" },
          { slug: "percentage-decrease",           title: "Percentage Decrease" },
          { slug: "profit-and-loss",               title: "Profit and Loss" },
          { slug: "discounts-and-sales",           title: "Discounts and Sales" },
          { slug: "simple-interest-introduction",  title: "Simple Interest Introduction" },
        ],
      },
      {
        slug: "algebra-equations",
        title: "Algebra and Equations",
        description:
          "Expand and factorise algebraic expressions, and solve linear equations including those with brackets and variables on both sides.",
        syllabusArea: "Number and Algebra",
        focus:
          "Build equation-solving fluency that directly underpins Year 9 index laws, linear relationships and simultaneous equations.",
        lessons: [
          {
            slug: "solving-one-step-equations",
            title: "Solving One-Step Equations",
            description:
              "Use a single inverse operation to solve equations involving addition, subtraction, multiplication and division.",
          },
          {
            slug: "solving-two-step-equations",
            title: "Solving Two-Step Equations",
            description:
              "Undo the constant term first and then the coefficient to solve equations requiring two inverse operations.",
          },
          {
            slug: "equations-with-brackets",
            title: "Equations with Brackets",
            description:
              "Expand brackets using the distributive law and then solve the resulting equation.",
          },
          {
            slug: "equations-with-pronumerals-on-both-sides",
            title: "Equations with Pronumerals on Both Sides",
            description:
              "Collect all variable terms on one side and all constants on the other, then solve.",
          },
          {
            slug: "forming-equations-from-word-problems",
            title: "Forming Equations from Word Problems",
            description:
              "Translate a word problem into an algebraic equation, solve it, and interpret the answer in context.",
          },
          {
            slug: "checking-solutions-and-error-analysis",
            title: "Checking Solutions and Error Analysis",
            description:
              "Verify solutions by substitution, identify errors in incorrect working, and practise mixed equation types.",
          },
        ],
      },
      {
        slug: "linear-relationships",
        title: "Linear Relationships",
        description:
          "Plot points and graph linear equations on the Cartesian plane, and interpret gradient, intercepts and the equation y = mx + b.",
        syllabusArea: "Number and Algebra",
        focus:
          "Establish the Cartesian plane and linear graph fluency required for Year 9 constant rates of change and Year 10 linear relationships.",
        lessons: [
          { slug: "number-patterns-and-rules",     title: "Number Patterns and Rules" },
          { slug: "coordinates-and-points",         title: "Coordinates and Points" },
          { slug: "tables-of-values",               title: "Tables of Values" },
          { slug: "graphing-linear-relationships",  title: "Graphing Linear Relationships" },
          { slug: "gradient-as-rate-of-change",     title: "Gradient as Rate of Change" },
          { slug: "interpreting-linear-graphs",     title: "Interpreting Linear Graphs" },
        ],
      },
      {
        slug: "pythagoras-theorem",
        title: "Pythagoras' Theorem",
        description:
          "Apply Pythagoras' theorem to find unknown sides in right-angled triangles and calculate distances on the coordinate plane.",
        syllabusArea: "Measurement and Space",
        focus:
          "Develop Pythagoras fluency as the direct prerequisite for Year 9 working with triangles and trigonometric ratios.",
        lessons: [
          { slug: "right-angled-triangles-pythagoras", title: "Right-Angled Triangles and Pythagoras" },
          { slug: "finding-the-hypotenuse",            title: "Finding the Hypotenuse" },
          { slug: "finding-a-shorter-side",            title: "Finding a Shorter Side" },
          { slug: "pythagoras-real-contexts",        title: "Pythagoras in Real Contexts" },
          { slug: "pythagorean-triples",             title: "Pythagorean Triples" },
          { slug: "distance-between-two-points",      title: "Distance Between Two Points" },
        ],
      },
      {
        slug: "geometry-angles",
        title: "Geometry and Angles",
        description:
          "Classify and calculate angle relationships, apply parallel-line properties, find angles in triangles and polygons, identify congruent triangles, and write geometric reasoning.",
        syllabusArea: "Measurement and Space",
        focus:
          "Build Stage 4 geometric fluency â€” angle relationships, parallel lines, polygon properties and introductory congruence â€” as the foundation for Year 9 geometric representations and Year 10 geometry proofs.",
        lessons: [
          { slug: "angle-relationships",             title: "Angle Relationships" },
          { slug: "parallel-lines-transversals",     title: "Parallel Lines and Transversals" },
          { slug: "angles-triangles-quadrilaterals", title: "Angles in Triangles and Quadrilaterals" },
          { slug: "properties-of-polygons",          title: "Properties of Polygons" },
          { slug: "congruent-triangles",             title: "Congruent Triangles" },
          { slug: "geometric-reasoning",             title: "Geometric Reasoning" },
        ],
      },
      {
        slug: "volume-and-surface-area",
        title: "Volume and Surface Area",
        description:
          "Calculate surface area and volume of prisms and cylinders, and solve problems involving composite solids.",
        syllabusArea: "Measurement and Space",
        focus:
          "Establish 3D measurement fluency that Year 9 prisms and cylinders content directly extends.",
        lessons: [
          { slug: "volume-of-prisms",                  title: "Volume of Prisms" },
          { slug: "surface-area-of-prisms",            title: "Surface Area of Prisms" },
          { slug: "volume-of-cylinders",               title: "Volume of Cylinders" },
          { slug: "surface-area-of-cylinders",         title: "Surface Area of Cylinders" },
          { slug: "volume-of-composite-solids",        title: "Volume of Composite Solids" },
          { slug: "surface-area-of-composite-solids",  title: "Surface Area of Composite Solids" },
        ],
      },
      {
        slug: "data-and-graphs",
        title: "Data Analysis and Graphs",
        description:
          "Organise, display and analyse data using frequency tables, cumulative frequency, IQR, back-to-back plots and sampling methods.",
        syllabusArea: "Statistics and Probability",
        focus:
          "Prepare for Year 9 data-based decisions and Year 10 statistics content including box plots and standard deviation.",
        lessons: [
          {
            slug: "collecting-and-displaying-data",
            title: "Collecting and Displaying Data",
            description:
              "Distinguish categorical and numerical data, read frequency tables and dot plots, and choose an appropriate display.",
          },
          {
            slug: "mean-median-mode-range",
            title: "Mean, Median, Mode and Range",
            description:
              "Calculate mean, median, mode and range to describe the centre and spread of a data set.",
          },
          {
            slug: "comparing-data-displays",
            title: "Comparing Data Displays",
            description:
              "Compare two data sets using median, mean and range, and interpret differences in centre and spread.",
          },
          {
            slug: "stem-and-leaf-plots",
            title: "Stem-and-Leaf Plots",
            description:
              "Read and construct ordered stem-and-leaf plots, find the median and range from ordered leaves, and compare two groups using a back-to-back display.",
          },
          {
            slug: "quartiles-and-iqr",
            title: "Quartiles and Interquartile Range",
            description:
              "Find Q1, Q2 and Q3 by splitting an ordered data set, calculate IQR = Q3 − Q1, and use it to compare the spread of two groups.",
          },
          {
            slug: "outliers-and-interpretation",
            title: "Outliers and Data Interpretation",
            description:
              "Identify outliers, explain how they affect the mean but not the median, and choose the appropriate measure of centre.",
          },
        ],
      },
      {
        slug: "probability-and-chance",
        title: "Probability and Chance",
        description:
          "Extend probability to two-step experiments, tree diagrams, arrays and expected outcomes.",
        syllabusArea: "Statistics and Probability",
        focus:
          "Build multi-stage probability skills that Year 9 making predictions and Year 10 probability units extend.",
        lessons: [
          {
            slug: "probability-language-and-scale",
            title: "Probability Language and Scale",
            description:
              "Describe likelihood using words and the probability scale from 0 to 1.",
          },
          {
            slug: "simple-probability",
            title: "Simple Probability",
            description:
              "Calculate P(event) = favourable outcomes Ã· total outcomes and apply the complement rule.",
          },
          {
            slug: "two-step-chance-experiments",
            title: "Two-Step Chance Experiments",
            description:
              "List all outcomes of two-step experiments using arrays and tree diagrams, and calculate combined probabilities.",
          },
          {
            slug: "relative-frequency",
            title: "Relative Frequency",
            description:
              "Calculate relative frequency from experimental results and explain how it approaches theoretical probability as trials increase.",
          },
          {
            slug: "expected-outcomes",
            title: "Expected Outcomes",
            description:
              "Use expected count = P(event) × n to predict how many times an event will occur in a repeated experiment.",
          },
        ],
      },
    ],
  },
];

// Stage 5 pathway split â€” Core and Advanced variants.
// Override guards in lib/lessons/year9/ and lib/lessons/year10/ accept all three slugs
// per year level. Question IDs are globally unique via COURSE_QUESTION_ID_PREFIX above.
// Advanced: shares full unit/lesson list from the base course (same content, course-prefixed IDs).
// Core: trimmed lesson lists matching Stage 5.1/5.2 (Y9) and Stage 5.2 (Y10) syllabi.
{
  const year9Base = newCoursePathways.find((p) => p.slug === "year-9-mathematics")!;
  const year10Base = newCoursePathways.find((p) => p.slug === "year-10-mathematics")!;
  const namespaceSkillMapIds = (
    units: CourseUnitSeed[],
    fromPrefix: string,
    toPrefix: string
  ): CourseUnitSeed[] =>
    units.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        stableSkillId: lesson.stableSkillId?.startsWith(fromPrefix)
          ? lesson.stableSkillId.replace(fromPrefix, toPrefix)
          : lesson.stableSkillId,
        skillCheckpoints: lesson.skillCheckpoints?.map((checkpoint) => ({
          ...checkpoint,
          stableCheckpointId: checkpoint.stableCheckpointId.startsWith(fromPrefix)
            ? checkpoint.stableCheckpointId.replace(fromPrefix, toPrefix)
            : checkpoint.stableCheckpointId,
        })),
      })),
    }));

  // Year 9 Core trims working-with-triangles to Pythagoras + Stage 5.2 trig (lessons 1–3).
  // The three trig-* slugs are Core-only and are not in the base unit, so we build the
  // lesson list explicitly rather than filtering from year9Base.
  const year9CoreTriangleLessons: CourseLessonSeed[] = [
    { slug: "pythagoras-hypotenuse", title: "Pythagoras: Finding the Hypotenuse" },
    { slug: "pythagoras-shorter-side", title: "Pythagoras: Finding a Shorter Side" },
    { slug: "right-triangle-applications", title: "Right-Triangle Applications" },
    { slug: "trig-naming-sides", title: "Naming Sides of a Right Triangle" },
    { slug: "trig-ratios-intro", title: "The Trig Ratios: SOH-CAH-TOA" },
    { slug: "trig-finding-sides-multiply", title: "Finding Sides (Multiply Step)" },
    { slug: "trig-finding-sides-divide", title: "Finding Sides (Divide Step)" },
    { slug: "trig-choosing-ratio", title: "Choosing the Right Ratio" },
    { slug: "trig-finding-angles", title: "Finding Unknown Angles" },
    { slug: "trig-applications", title: "Trig in Practical Contexts" },
  ];
  const year9CoreUnits = year9Base.units.map((u) =>
    u.slug !== "working-with-triangles"
      ? u
      : { ...u, lessons: year9CoreTriangleLessons }
  );

  // Year 10 Core trims:
  //   non-linear-relationships â†’ parabolas + circles only (no exponential / hyperbola)
  //   trigonometry             â†’ right-angled only (no sine/cosine rule, area, bearings)
  //   geometry-proofs          â†’ congruence + similarity only (no circle geometry / proofs)
  const year10CoreTrimmedUnits = year10Base.units.map((u) => {
    if (u.slug === "non-linear-relationships") {
      return {
        ...u,
        lessons: u.lessons.filter((l) =>
          ["introduction-to-parabolas", "sketching-parabolas", "circle-graphs"].includes(l.slug)
        ),
      };
    }
    if (u.slug === "trigonometry") {
      return {
        ...u,
        lessons: u.lessons.filter((l) =>
          [
            "trigonometric-ratios",
            "finding-sides-trig",
            "finding-angles-trig",
            "elevation-depression",
            "trig-ratios-identifying-sides",
            "trig-ratios-sin-cos-tan",
            "finding-sides-sin-cos",
            "finding-sides-tan",
            "finding-angles-inverse-trig",
            "elevation-depression-applications",
          ].includes(l.slug)
        ),
      };
    }
    if (u.slug === "geometry-proofs") {
      return {
        ...u,
        lessons: u.lessons.filter((l) =>
          ["congruent-triangles", "similar-triangles"].includes(l.slug)
        ),
      };
    }
    return u;
  });
  const year10AdvancedUnits = namespaceSkillMapIds(year10Base.units, "y10-", "y10a-");
  const year10CoreUnits = namespaceSkillMapIds(year10CoreTrimmedUnits, "y10-", "y10c-");

  newCoursePathways.push(
    {
      slug: "year-9-mathematics-advanced",
      title: "Year 9 Mathematics Advanced",
      yearLevel: "9",
      courseType: "Mathematics Advanced",
      status: "in_progress",
      description:
        "Stage 5.2/5.3 Year 9 Mathematics for students on the Advanced pathway. Includes full trigonometry, coordinate geometry and extended algebra.",
      positioning:
        "Advanced Stage 5 pathway. Covers all Year 9 content including trigonometric ratios, right-triangle applications, midpoint, distance and gradient foundations.",
      units: year9Base.units,
    },
    {
      slug: "year-9-mathematics-core",
      title: "Year 9 Mathematics Core",
      yearLevel: "9",
      courseType: "Mathematics Core",
      status: "in_progress",
      description:
        "Stage 5.1/5.2 Year 9 Mathematics for students on the Core pathway. Covers geometry, measurement, index laws, financial maths, linear relationships and statistics.",
      positioning:
        "Core Stage 5 pathway preparing students for Year 10 Core. Working with Triangles covers Pythagoras only â€” trigonometric ratios and coordinate geometry are Advanced topics.",
      units: year9CoreUnits,
    },
    {
      slug: "year-10-mathematics-advanced",
      title: "Year 10 Mathematics Advanced",
      yearLevel: "10",
      courseType: "Mathematics Advanced",
      status: "in_progress",
      description:
        "Stage 5.3 Year 10 Mathematics for students on the Advanced pathway. Includes circle geometry, geometric proofs, full trigonometry (sine/cosine rule, bearings) and all non-linear function types.",
      positioning:
        "Advanced Stage 5 pathway preparing students for Year 11 Advanced and Extension. Covers all Year 10 content.",
      units: year10AdvancedUnits,
    },
    {
      slug: "year-10-mathematics-core",
      title: "Year 10 Mathematics Core",
      yearLevel: "10",
      courseType: "Mathematics Core",
      status: "in_progress",
      description:
        "Stage 5.2 Year 10 Mathematics for students on the Core pathway. Covers algebra, linear and non-linear relationships, right-angled trigonometry, measurement, probability and statistics.",
      positioning:
        "Core Stage 5 pathway preparing students for Year 11 Standard. Circle geometry, geometric proofs, full trigonometry and all non-linear function types are Advanced topics.",
      units: year10CoreUnits,
    },
  );
}

export function getNewCourse(courseSlug: string) {
  return newCoursePathways.find((course) => course.slug === courseSlug);
}

export function getNewCourseUnit(courseSlug: string, unitSlug: string) {
  return getNewCourse(courseSlug)?.units.find((unit) => unit.slug === unitSlug);
}

export function isHiddenLegacyLesson(lesson: CourseLessonSeed) {
  return lesson.showInCourseNav === false;
}

export function isVisibleCourseLesson(lesson: CourseLessonSeed) {
  return !isHiddenLegacyLesson(lesson);
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

export function getVisibleNewCourseLessons(courseSlug: string, unitSlug: string) {
  const course = getNewCourse(courseSlug);
  const unit = course?.units.find((nextUnit) => nextUnit.slug === unitSlug);

  if (!course || !unit) {
    return [];
  }

  return unit.lessons
    .map((lesson, index) => ({ lesson, index }))
    .filter(({ lesson }) => isVisibleCourseLesson(lesson))
    .map(({ lesson, index }) => buildLesson(course, unit, lesson, index));
}

export const getVisibleCourseUnitLessons = getVisibleNewCourseLessons;

export function getNewCourseUnitOutline(
  courseSlug: string,
  unitSlug: string
): LessonOutlineItem[] {
  const unit = getNewCourseUnit(courseSlug, unitSlug);

  return (
    unit?.lessons
      .filter(isVisibleCourseLesson)
      .map((lesson) => ({
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

export function newCourseUnitLessonCount(unit: CourseUnitSeed) {
  return unit.lessons.filter(isVisibleCourseLesson).length;
}

export function newCourseLessonCount(course: CoursePathwaySeed) {
  return course.units.reduce((total, unit) => total + newCourseUnitLessonCount(unit), 0);
}
