import { LessonRenderer } from "../../LessonRenderer";
import { furtherTrigonometryLessons } from "../../../../lib/lessons/furtherTrigonometry";

export default async function FurtherTrigonometryLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="further-trigonometry"
      lessonSlug={lessonSlug}
      lessons={furtherTrigonometryLessons}
      backHref="/course/further-trigonometry"
      backLabel="Back to Further Trigonometry"
    />
  );
}
