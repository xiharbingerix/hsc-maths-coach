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

// Year 12 Mathematics Advanced is exactly the seven NESA Year-12 focus areas of
// the 2024 syllabus (implementation from 2026):
//   1. Further graph transformations and modelling   (MAV-12-01/02)
//   2. Sequences and series                          (MAV-12-03)
//   3. Differential calculus                         (MAV-12-04)
//   4. Integral calculus                             (MAV-12-05)
//   5. Applications of calculus                      (MAV-12-06)
//   6. Random variables                              (MAV-12-07)
//   7. Financial mathematics                         (MAV-12-08)
// The Year-11 topics (working with functions, graph transformations, all
// trigonometry, intro to differentiation, exponential/logarithmic functions,
// probability and data) live in the separate Year 11 Advanced course and are
// not repeated here. Note: the 2024 syllabus REMOVED bivariate data,
// correlation and least-squares regression from Mathematics Advanced (now
// Standard-only), so there is no descriptive-statistics unit. Some unit `href`
// slugs retain their legacy `ma-c#`/`ma-m1` identifiers for URL/seed stability
// even though the 2024 titles differ.
export const courseUnits: CourseUnitSummary[] = [
  {
    title: "Further Graph Transformations and Modelling",
    href: "/course/ma-f2-further-graph-transformations-and-modelling",
    description:
      "Transformations of the trigonometric functions (reflections, translations, dilations; amplitude, period, phase and vertical shift), solving trigonometric equations over a domain, modelling periodic phenomena, and using logarithmic scales (decibels, the Richter scale, star magnitudes and pH).",
    activeLessonCount: 5,
  },
  {
    title: "Sequences and Series",
    href: "/course/ma-sequences-and-series",
    description:
      "Arithmetic and geometric sequences and series, summation (sigma) notation, partial sums, limiting sums of geometric series, and growth and decay modelling.",
    activeLessonCount: 5,
  },
  {
    title: "Differential Calculus",
    href: "/course/ma-c2-differential-calculus",
    description:
      "Differentiating exponential, logarithmic, and trigonometric functions; the chain rule, product rule, and quotient rule; tangents and normals.",
    activeLessonCount: 5,
  },
  {
    title: "Integral Calculus",
    href: "/course/ma-c4-integral-calculus",
    description:
      "Primitive functions, indefinite and definite integrals, the fundamental theorem of calculus, areas bounded by the x-axis and y-axis, the reverse chain rule, integration of exponential/logarithmic/trigonometric functions, and the trapezoidal rule.",
    activeLessonCount: 16,
  },
  {
    title: "Applications of Calculus",
    href: "/course/ma-c3-applications-of-differentiation",
    description:
      "The second derivative, concavity and points of inflection, curve sketching, optimisation, rates of change, exponential growth and decay, and motion in a straight line using both differentiation and integration.",
    activeLessonCount: 11,
  },
  {
    title: "Random Variables",
    href: "/course/ma-s3-random-variables",
    description:
      "Discrete probability distributions, expected value and variance, continuous random variables (probability density and cumulative distribution functions), the normal distribution, the empirical rule, and z-scores using standard-normal tables.",
    activeLessonCount: 3,
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
    `Year 12 Mathematics Advanced covers the seven NSW 2024 Year-12 focus areas: ${courseUnits.reduce(
      (total, unit) => total + unit.activeLessonCount,
      0
    )} active lessons across further graph transformations and modelling, sequences and series, differential and integral calculus, applications of calculus, random variables, and financial mathematics. The Year 11 topics are covered in the separate Year 11 Advanced course.`,
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
