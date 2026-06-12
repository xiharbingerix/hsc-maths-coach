import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year12Standard1LessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return (
    <NewCourseLessonPage
      courseSlug="year-12-standard-1"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
