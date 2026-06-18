import {
  newCourseLessonCount,
  newCoursePathways,
} from "./newCourseCatalog";
import type { CoursePathwayStatus, NewCourseSlug } from "./courseTypes";

export type CourseUnitSummary = {
  title: string;
  href: string;
  description: string;
  activeLessonCount: number;
  lessonModuleSlugs?: string[];
  excludeLessonSlugs?: string[];
};

export type CourseCatalogueItem = {
  courseSlug: string;
  courseTitle: string;
  yearLevel: string;
  courseType: string;
  href: string;
  description: string;
  unitCount: number;
  activeLessonCount: number;
  status: CoursePathwayStatus;
  units: CourseUnitSummary[];
};

// Year 12 Mathematics Advanced currently follows the NSW Mathematics Advanced
// Stage 6 Syllabus (2017), for students sitting the existing HSC course before
// the 2024 syllabus reaches Year 12. Some legacy lesson arrays use older or
// incoming-syllabus module slugs, so units may list `lessonModuleSlugs` to draw
// the public 2017 pathway from the right existing lesson banks.
export const courseUnits: CourseUnitSummary[] = [
  {
    title: "Graphing Techniques",
    href: "/course/ma-f2-graphing-techniques",
    description:
      "Function transformations, inverse functions, polynomial and reciprocal-style graphs, interpreting key features, and modelling with functions.",
    activeLessonCount: 4,
    excludeLessonSlugs: [
      "exponential-logarithmic-graphs",
      "absolute-value-functions",
    ],
  },
  {
    title: "Trigonometric Functions and Graphs",
    href: "/course/ma-t3-trigonometric-functions-and-graphs",
    description:
      "Sine, cosine and tangent graphs; amplitude, period and phase shift; trigonometric transformations; trigonometric equations; and periodic modelling.",
    activeLessonCount: 7,
    lessonModuleSlugs: [
      "ma-f2-further-graph-transformations-and-modelling",
      "ma-t3-trigonometric-equations",
    ],
    excludeLessonSlugs: ["logarithmic-scales"],
  },
  {
    title: "Differential Calculus",
    href: "/course/ma-c2-differential-calculus",
    description:
      "Differentiating exponential, logarithmic, and trigonometric functions; the chain rule, product rule, and quotient rule; tangents and normals.",
    activeLessonCount: 5,
    excludeLessonSlugs: [
      "reciprocal-trig-derivatives",
      "log-to-any-base-derivative",
    ],
  },
  {
    title: "Integral Calculus",
    href: "/course/ma-c4-integral-calculus",
    description:
      "Primitive functions, indefinite and definite integrals, the fundamental theorem of calculus, areas bounded by the x-axis and y-axis, the reverse chain rule, integration of exponential/logarithmic/trigonometric functions, and the trapezoidal rule.",
    activeLessonCount: 18,
  },
  {
    title: "Applications of Calculus",
    href: "/course/ma-c3-applications-of-differentiation",
    description:
      "The second derivative, concavity and points of inflection, curve sketching, optimisation, rates of change, exponential growth and decay, and motion in a straight line using both differentiation and integration.",
    activeLessonCount: 8,
    excludeLessonSlugs: ["differentiability-and-continuity"],
  },
  {
    title: "Descriptive Statistics and Bivariate Data Analysis",
    href: "/course/ma-s2-descriptive-statistics-and-bivariate-data",
    description:
      "Scatter plots, correlation, least-squares regression, residual analysis, data interpretation, and statistical modelling.",
    activeLessonCount: 5,
  },
  {
    title: "Random Variables",
    href: "/course/ma-s3-random-variables",
    description:
      "Discrete random variables, probability distributions, expected value, variance, standard deviation, binomial distribution ideas, probability modelling, and decision-making using probability.",
    activeLessonCount: 2,
    excludeLessonSlugs: [
      "normal-distribution-empirical-rule",
      "continuous-random-variables-pdf",
      "cumulative-distribution-functions",
      "median-quartiles-continuous",
      "expected-value-continuous",
      "variance-standard-deviation-continuous",
      "normal-probabilities-z-tables",
    ],
  },
  {
    title: "Financial Mathematics",
    href: "/course/ma-m1-modelling-financial-situations",
    description:
      "Reducing-balance loans, annuities and their future and present value via geometric series, compound interest, depreciation, recurrence relations, and financial decision-making.",
    activeLessonCount: 6,
  },
];

export const year12AdvancedCourse: CourseCatalogueItem = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  yearLevel: "Year 12",
  courseType: "Mathematics Advanced",
  href: "/course/year-12-advanced",
  description:
    `Current HSC Mathematics Advanced support aligned to the NSW Mathematics Advanced Stage 6 Syllabus (2017): ${courseUnits.reduce(
      (total, unit) => total + unit.activeLessonCount,
      0
    )} active lessons across graphing techniques, trigonometric functions and graphs, differential and integral calculus, applications of calculus, financial mathematics, bivariate data analysis, and random variables. Incoming 2024-only content is kept out of this public pathway until schools start teaching it in Year 12.`,
  unitCount: courseUnits.length,
  activeLessonCount: courseUnits.reduce(
    (total, unit) => total + unit.activeLessonCount,
    0
  ),
  status: "available",
  units: courseUnits,
};

export const newCourseCatalogueItems: CourseCatalogueItem[] =
  newCoursePathways.map((course) => ({
    courseSlug: course.slug,
    courseTitle: course.title,
    yearLevel: course.yearLevel,
    courseType: course.courseType,
    href: `/course/${course.slug}`,
    description: course.description,
    unitCount: course.units.length,
    activeLessonCount: newCourseLessonCount(course),
    status: course.status,
    units: course.units.map((unit) => ({
      title: unit.title,
      href: `/course/${course.slug}/${unit.slug}`,
      description: unit.description,
      activeLessonCount: unit.lessons.length,
    })),
  }));

// Visual order of the public course catalogue, youngest to oldest year level.
// Slugs omitted here are hidden from the catalogue. The generic
// `year-9-mathematics` / `year-10-mathematics` pathways are intentionally
// excluded — they exist only as the base for the derived core/advanced
// variants (see newCourseCatalog.ts) and are not shown directly.
const catalogueOrder = [
  "year-7-mathematics",
  "year-8-mathematics",
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
  "year-10-mathematics-core",
  "year-10-mathematics-advanced",
  "year-11-standard",
  "year-11-advanced",
  "year-11-extension",
  "year-12-standard-1",
  "year-12-standard-2",
  "year-12-advanced",
  "year-12-extension-1",
  "year-12-extension-2",
];

const allCatalogueItems: CourseCatalogueItem[] = [
  year12AdvancedCourse,
  ...newCourseCatalogueItems,
];

export const courseCatalogue: CourseCatalogueItem[] = catalogueOrder
  .map((slug) => allCatalogueItems.find((course) => course.courseSlug === slug))
  .filter((course): course is CourseCatalogueItem => course !== undefined);

export const totalActiveLessonCount = courseCatalogue.reduce(
  (total, course) => total + course.activeLessonCount,
  0
);

export function getCourseCatalogueItem(slug: NewCourseSlug) {
  return newCourseCatalogueItems.find((course) => course.courseSlug === slug);
}
