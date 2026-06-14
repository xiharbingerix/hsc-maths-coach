import { LessonRenderer } from "../../LessonRenderer";
import { probabilityLessons } from "../../../../lib/lessons/probability";

export default async function ProbabilityLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="probability"
      lessonSlug={lessonSlug}
      lessons={probabilityLessons}
      backHref="/course/probability"
      backLabel="Back to Probability"
    />
  );
}
