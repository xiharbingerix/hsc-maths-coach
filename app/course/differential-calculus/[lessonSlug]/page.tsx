import { LessonRenderer } from "../../LessonRenderer";
import { differentialCalculusLessons } from "../../../../lib/lessons/differentialCalculus";

export default async function DifferentialCalculusLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      lessonSlug={lessonSlug}
      lessons={differentialCalculusLessons}
      backHref="/course/differential-calculus"
      backLabel="Back to Differential Calculus"
    />
  );
}
