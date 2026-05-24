import { NewCourseLessonPage } from "../../../NewCoursePages";
import { redirect } from "next/navigation";

const oldLessonRedirects: Record<string, Record<string, string>> = {
  functions: {
    "function-notation-domain-range": "working-with-functions/function-notation-domain-range",
    "linear-quadratic-cubic-functions":
      "working-with-functions/linear-quadratic-cubic-functions",
    "polynomial-reciprocal-functions":
      "working-with-functions/polynomial-reciprocal-functions",
    "transformations-composite-functions":
      "graph-transformations/transformations-composite-functions",
    "functions-exam-practice":
      "working-with-functions/working-with-functions-exam-practice",
  },
  "trigonometric-functions": {
    "radians-exact-trigonometric-values":
      "trigonometry-measure-angles/radians-exact-trigonometric-values",
    "unit-circle-trigonometric-graphs":
      "trigonometry-measure-angles/unit-circle-trigonometric-graphs",
    "trigonometric-equations":
      "trigonometric-identities-equations/trigonometric-equations",
    "trigonometric-identities":
      "trigonometric-identities-equations/trigonometric-identities",
    "trigonometry-exam-practice":
      "trigonometric-identities-equations/trigonometric-identities-equations-exam-practice",
  },
  "introduction-calculus": {
    "rates-of-change-gradients":
      "introduction-differentiation/rates-of-change-gradients",
    "derivatives-first-principles":
      "introduction-differentiation/derivatives-first-principles",
    "differentiating-polynomial-functions":
      "introduction-differentiation/differentiating-polynomial-functions",
    "tangents-normals-applications":
      "introduction-differentiation/tangents-normals-applications",
    "introductory-calculus-exam-practice":
      "introduction-differentiation/introduction-differentiation-exam-practice",
  },
  "statistical-analysis": {
    "data-displays-summary-statistics":
      "probability-data/data-displays-summary-statistics",
    "probability-relative-frequency":
      "probability-data/probability-relative-frequency",
    "discrete-random-variables": "probability-data/discrete-random-variables",
    "expected-value-standard-deviation":
      "probability-data/expected-value-standard-deviation",
    "statistical-analysis-exam-practice":
      "probability-data/probability-data-exam-practice",
  },
};

export default async function Year11AdvancedLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  const redirectTarget = oldLessonRedirects[unitSlug]?.[lessonSlug];

  if (redirectTarget) {
    redirect(`/course/year-11-advanced/${redirectTarget}`);
  }

  return (
    <NewCourseLessonPage
      courseSlug="year-11-advanced"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
