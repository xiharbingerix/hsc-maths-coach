import { NewCourseLessonPage } from "../../../NewCoursePages";
import { redirect } from "next/navigation";

const oldLessonRedirects: Record<string, Record<string, string>> = {
  "algebra-linear-relationships": {
    "substitution-formulae-equations": "formulas-equations/substitution-formulae-equations",
    "changing-subject-formula": "formulas-equations/changing-subject-formula",
    "linear-relationships-graphs": "linear-relationships/linear-relationships-graphs",
    "direct-variation-practical-linear-models":
      "linear-relationships/direct-variation-practical-linear-models",
    "algebra-linear-relationships-exam-practice":
      "linear-relationships/linear-relationships-exam-practice",
  },
  "money-financial-mathematics": {
    "earning-money-payslips": "earning-money/earning-money-payslips",
    "tax-deductions-net-pay": "earning-money/tax-deductions-net-pay",
    "budgeting-managing-money": "managing-money/budgeting-managing-money",
    "simple-interest-financial-decisions":
      "managing-money/simple-interest-financial-decisions",
    "money-matters-exam-practice": "managing-money/managing-money-exam-practice",
  },
  "measurement-time-location": {
    "units-accuracy-measurement-error":
      "applications-measurement/units-accuracy-measurement-error",
    "area-surface-area-volume": "applications-measurement/area-surface-area-volume",
    "energy-mass-practical-measurement":
      "applications-measurement/energy-mass-practical-measurement",
    "time-zones-timetables": "time-location/time-zones-timetables",
    "measurement-time-location-exam-practice":
      "applications-measurement/applications-measurement-exam-practice",
  },
  "data-analysis-probability": {
    "data-displays-summary-statistics": "data-analysis/data-displays-summary-statistics",
    "interpreting-data-outliers": "data-analysis/interpreting-data-outliers",
    "relative-frequency-probability": "data-analysis/data-analysis-exam-practice",
    "multistage-events-probability-tables": "data-analysis/data-analysis-exam-practice",
    "data-probability-exam-practice": "data-analysis/data-analysis-exam-practice",
  },
};

export default async function Year11StandardLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  const redirectTarget = oldLessonRedirects[unitSlug]?.[lessonSlug];

  if (redirectTarget) {
    redirect(`/course/year-11-standard/${redirectTarget}`);
  }

  return (
    <NewCourseLessonPage
      courseSlug="year-11-standard"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
