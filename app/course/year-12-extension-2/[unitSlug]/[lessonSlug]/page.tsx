import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year12Extension2LessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;

  return (
    <NewCourseLessonPage
      courseSlug="year-12-extension-2"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
