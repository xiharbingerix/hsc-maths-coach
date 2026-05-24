import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year11StandardLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return (
    <NewCourseLessonPage
      courseSlug="year-11-standard"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
