import { LessonRenderer } from "../../LessonRenderer";
import { furtherIntegralCalculusLessons } from "../../../../lib/lessons/furtherIntegralCalculus";

export default async function FurtherIntegralCalculusLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      lessonSlug={lessonSlug}
      lessons={furtherIntegralCalculusLessons}
      backHref="/course/further-integral-calculus"
      backLabel="Back to Further Integral Calculus"
    />
  );
}
