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
    title: "Differential Calculus",
    href: "/course/differential-calculus",
    description:
      "Derivatives, tangent gradients, stationary points, curve sketching, optimisation, and rates of change.",
    activeLessonCount: 12,
  },
  {
    title: "Differentiation Techniques",
    href: "/course/differentiation-techniques",
    description:
      "Standard derivatives, chain rule, product rule, quotient rule, tangents, normals, rates and stationary point applications.",
    activeLessonCount: 5,
  },
  {
    title: "Applications of Differentiation",
    href: "/course/applications-differentiation",
    description:
      "Second derivative, concavity, inflection points, curve sketching, optimisation, kinematics and motion applications.",
    activeLessonCount: 6,
  },
  {
    title: "Integral Calculus",
    href: "/course/integral-calculus",
    description:
      "Antidifferentiation, definite integrals, area, the Trapezoidal rule, total change, and applications.",
    activeLessonCount: 10,
  },
  {
    title: "Further Integral Calculus",
    href: "/course/further-integral-calculus",
    description:
      "Standard trigonometric, exponential and logarithmic integrals, reverse chain rule, definite integrals and area between curves.",
    activeLessonCount: 5,
  },
  {
    title: "Functions and Graphing Techniques",
    href: "/course/functions-graphing-techniques",
    description:
      "Function notation, domain and range, transformations, graph features, asymptotes, exponential/logarithmic graphs, graphical solving, and modelling.",
    activeLessonCount: 9,
  },
  {
    title: "Trigonometric Functions and Graphs",
    href: "/course/trigonometric-functions-graphs",
    description:
      "Radians, exact values, the unit circle, sine, cosine, tangent graphs, equations, identities, and modelling.",
    activeLessonCount: 7,
  },
  {
    title: "Further Trigonometry",
    href: "/course/further-trigonometry",
    description:
      "Compound angle formulas, double angle formulas, exact values, identity simplification and further trigonometric equations.",
    activeLessonCount: 5,
  },
  {
    title: "Financial Mathematics",
    href: "/course/financial-mathematics",
    description:
      "Growth factors, sequences, series, compound interest, depreciation, recurrence relations, annuities, loans, and financial decision-making.",
    activeLessonCount: 10,
  },
  {
    title: "Statistical Analysis",
    href: "/course/statistical-analysis",
    description:
      "Data displays, summary statistics, outliers, standard deviation, z-scores, correlation, regression, normal distributions, and random variables.",
    activeLessonCount: 7,
  },
];

export const year12AdvancedCourse: CourseCatalogueItem = {
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  yearLevel: "Year 12",
  courseType: "Mathematics Advanced",
  href: "/course/year-12-advanced",
  description:
    "Year 12 Advanced is in active development. Current lessons cover functions, trigonometry, further trigonometry, introductory calculus, differentiation techniques, applications of differentiation, integral calculus, further integral calculus, statistics and financial mathematics. Further HSC topics are being added.",
  unitCount: courseUnits.length,
  activeLessonCount: courseUnits.reduce(
    (total, unit) => total + unit.activeLessonCount,
    0
  ),
  status: "in_progress",
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

export const courseCatalogue: CourseCatalogueItem[] = [
  year12AdvancedCourse,
  ...newCourseCatalogueItems,
];

export function getCourseCatalogueItem(slug: NewCourseSlug) {
  return newCourseCatalogueItems.find((course) => course.courseSlug === slug);
}
