import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year12Standard2LessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return (
    <NewCourseLessonPage
      courseSlug="year-12-standard-2"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
