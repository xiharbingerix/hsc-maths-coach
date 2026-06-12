import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year10MathematicsAdvancedLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;

  return (
    <NewCourseLessonPage
      courseSlug="year-10-mathematics-advanced"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
