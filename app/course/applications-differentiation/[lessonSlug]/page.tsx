import { LessonRenderer } from "../../LessonRenderer";
import { applicationsDifferentiationLessons } from "../../../../lib/lessons/applicationsDifferentiation";

export default async function ApplicationsDifferentiationLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      lessonSlug={lessonSlug}
      lessons={applicationsDifferentiationLessons}
      backHref="/course/applications-differentiation"
      backLabel="Back to Applications of Differentiation"
    />
  );
}
