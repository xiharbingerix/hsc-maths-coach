import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year7MathematicsLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;

  return (
    <NewCourseLessonPage
      courseSlug="year-7-mathematics"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
