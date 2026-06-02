import { LessonRenderer } from "../../LessonRenderer";
import { statisticalAnalysisLessons } from "../../../../lib/lessons/statisticalAnalysis";

export default async function StatisticalAnalysisLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="statistical-analysis"
      lessonSlug={lessonSlug}
      lessons={statisticalAnalysisLessons}
      backHref="/course/statistical-analysis"
      backLabel="Back to Statistical Analysis"
    />
  );
}
