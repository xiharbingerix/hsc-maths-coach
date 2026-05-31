import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year9MathematicsLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;

  return (
    <NewCourseLessonPage
      courseSlug="year-9-mathematics"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
