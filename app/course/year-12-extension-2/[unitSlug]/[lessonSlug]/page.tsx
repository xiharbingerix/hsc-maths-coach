import { NewCourseLessonPage } from "../../../NewCoursePages";
import { buildCourseLessonMetadata } from "../../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return buildCourseLessonMetadata("year-12-extension-2", unitSlug, lessonSlug);
}

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
