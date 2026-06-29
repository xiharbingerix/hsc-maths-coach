import { NewCourseLessonPage } from "../../../NewCoursePages";
import { buildCourseLessonMetadata } from "../../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return buildCourseLessonMetadata("year-12-standard-1", unitSlug, lessonSlug);
}

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
