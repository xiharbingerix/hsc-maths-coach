import { LessonRenderer } from "../../LessonRenderer";
import { differentiationTechniquesLessons } from "../../../../lib/lessons/differentiationTechniques";

export default async function DifferentiationTechniquesLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="differentiation-techniques"
      lessonSlug={lessonSlug}
      lessons={differentiationTechniquesLessons}
      backHref="/course/differentiation-techniques"
      backLabel="Back to Differentiation Techniques"
    />
  );
}
