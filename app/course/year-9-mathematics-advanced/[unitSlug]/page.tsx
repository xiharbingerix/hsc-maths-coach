import { NewCourseUnitPage } from "../../NewCoursePages";
import { notFound } from "next/navigation";
import { getNewCourseUnit } from "../../../../lib/newCourseCatalog";

export default async function Year9MathematicsAdvancedUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const unit = getNewCourseUnit("year-9-mathematics-advanced", unitSlug);

  if (!unit || unit.lessons.length === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-9-mathematics-advanced" unitSlug={unitSlug} />;
}
