import { NewCourseLessonPage } from "../../../NewCoursePages";

export default async function Year11ExtensionLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;

  return (
    <NewCourseLessonPage
      courseSlug="year-11-extension"
      unitSlug={unitSlug}
      lessonSlug={lessonSlug}
    />
  );
}
