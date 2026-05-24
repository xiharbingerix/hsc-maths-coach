import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year11AdvancedLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return (
    <NewCourseLessonPage
      courseSlug="year-11-advanced"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
