import { NewCourseLessonPage } from "../../../NewCoursePages";
import { buildCourseLessonMetadata } from "../../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  return buildCourseLessonMetadata("year-9-mathematics", unitSlug, lessonSlug);
}

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
