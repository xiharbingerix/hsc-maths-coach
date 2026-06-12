import { notFound } from "next/navigation";
import { NewCourseUnitPage } from "../../NewCoursePages";
import { getNewCourseUnit } from "../../../../lib/newCourseCatalog";

export default async function Year12Extension2UnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const unit = getNewCourseUnit("year-12-extension-2", unitSlug);

  if (!unit || unit.lessons.length === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-12-extension-2" unitSlug={unitSlug} />;
}
