import { LessonRenderer } from "../../LessonRenderer";
import { integralCalculusLessons } from "../../../../lib/lessons/integralCalculus";

export default async function IntegralCalculusLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="integral-calculus"
      lessonSlug={lessonSlug}
      lessons={integralCalculusLessons}
      backHref="/course/integral-calculus"
      backLabel="Back to Integral Calculus"
    />
  );
}
