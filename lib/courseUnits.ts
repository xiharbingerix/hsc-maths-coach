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

export const courseUnits: CourseUnitSummary[] = [
  {
    title: "Working with Functions",
    href: "/course/ma-f1-working-with-functions",
    description:
      "Functions, domain and range, function notation, graph transformations, solving equations graphically, and modelling with functions.",
    activeLessonCount: 7,
  },
  {
    title: "Graphing Techniques",
    href: "/course/ma-f2-graphing-techniques",
    description:
      "Reciprocal and asymptotic graphs, exponential and logarithmic graphs, absolute value functions, and inverse functions.",
    activeLessonCount: 4,
  },
  {
    title: "Trigonometry and Measure of Angles",
    href: "/course/ma-t1-trigonometry-and-measure-of-angles",
    description:
      "Angle measurement in radians, the unit circle, exact trigonometric values, and arc length and sector area.",
    activeLessonCount: 1,
  },
  {
    title: "Trigonometric Functions and Identities",
    href: "/course/ma-t2-trigonometric-functions-and-identities",
    description:
      "Graphs of sine, cosine, and tangent; amplitude and period transformations; Pythagorean identity; compound and double angle formulas; and modelling periodic phenomena.",
    activeLessonCount: 9,
  },
  {
    title: "Trigonometric Equations",
    href: "/course/ma-t3-trigonometric-equations",
    description:
      "Solving trigonometric equations using compound and double angle formulas and identities.",
    activeLessonCount: 2,
  },
  {
    title: "Introduction to Differentiation",
    href: "/course/ma-c1-introduction-to-differentiation",
    description:
      "Limits, derivatives as rates of change, differentiating polynomials using the power rule, tangents and normals, stationary points, and increasing and decreasing functions.",
    activeLessonCount: 7,
  },
  {
    title: "Differential Calculus",
    href: "/course/ma-c2-differential-calculus",
    description:
      "Differentiating trigonometric, exponential, and logarithmic functions; the chain rule, product rule, and quotient rule.",
    activeLessonCount: 5,
  },
  {
    title: "Applications of Differentiation",
    href: "/course/ma-c3-applications-of-differentiation",
    description:
      "The second derivative, concavity, inflection points, curve sketching, optimisation problems, and kinematics.",
    activeLessonCount: 11,
  },
  {
    title: "Integral Calculus",
    href: "/course/ma-c4-integral-calculus",
    description:
      "Antidifferentiation, indefinite and definite integrals, the fundamental theorem of calculus, area under and between curves, the trapezoidal rule, and further integration techniques.",
    activeLessonCount: 16,
  },
  {
    title: "Exponential and Logarithmic Functions",
    href: "/course/ma-e1-exponential-and-logarithmic-functions",
    description:
      "Logarithm laws, change of base, Euler's number, natural logarithms, solving equations with e and ln, and exponential growth and decay modelling.",
    activeLessonCount: 5,
  },
  {
    title: "Probability and Discrete Probability Distributions (Year 11 Assumed Knowledge)",
    href: "/course/ma-s1-probability-and-discrete-probability-distributions",
    description:
      "Revision of MA-S1 probability, simulation, random variables and discrete probability distributions assumed from Year 11.",
    activeLessonCount: 6,
  },
  {
    title: "Descriptive Statistics and Bivariate Data Analysis",
    href: "/course/ma-s2-descriptive-statistics-and-bivariate-data",
    description:
      "Data displays, measures of centre and spread, z-scores, correlation, least-squares regression, and interpreting bivariate data.",
    activeLessonCount: 6,
  },
  {
    title: "Random Variables",
    href: "/course/ma-s3-random-variables",
    description:
      "Continuous random variables, probability density and cumulative distribution functions, percentiles, and normal-distribution probabilities and quantiles.",
    activeLessonCount: 4,
  },
  {
    title: "Modelling Financial Situations",
    href: "/course/ma-m1-modelling-financial-situations",
    description:
      "Arithmetic and geometric sequences and series, limiting sums, compound interest, depreciation, recurrence relations, annuities, loans, and financial decision-making.",
    activeLessonCount: 11,
  },
];

export const year12AdvancedCourse: CourseCatalogueItem = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  yearLevel: "Year 12",
  courseType: "Mathematics Advanced",
  href: "/course/year-12-advanced",
  description:
    `Year 12 Mathematics Advanced now includes ${courseUnits.reduce(
      (total, unit) => total + unit.activeLessonCount,
      0
    )} active lessons across functions, trigonometry, exponential and logarithmic functions, calculus, statistics, sequences, series and financial mathematics. Ongoing refinements and visual supports are being added.`,
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
