export type CourseUnitSummary = {
  title: string;
  href: string;
  description: string;
  activeLessonCount: number;
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
    title: "Integral Calculus",
    href: "/course/integral-calculus",
    description:
      "Antidifferentiation, definite integrals, area, the Trapezoidal rule, total change, and applications.",
    activeLessonCount: 10,
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
