import { NewCourseUnitPage } from "../../NewCoursePages";
import { notFound } from "next/navigation";
import {
  getNewCourseUnit,
  newCourseUnitLessonCount,
} from "../../../../lib/newCourseCatalog";

export default async function Year10MathematicsUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const unit = getNewCourseUnit("year-10-mathematics", unitSlug);

  if (!unit || newCourseUnitLessonCount(unit) === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-10-mathematics" unitSlug={unitSlug} />;
}
