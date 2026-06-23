import { NewCourseUnitPage } from "../../NewCoursePages";
import { notFound, permanentRedirect } from "next/navigation";
import { getNewCourseUnit } from "../../../../lib/newCourseCatalog";
import { year9LegacyUnitRedirect } from "../../../../lib/year9PathTags";

export default async function Year9MathematicsCoreUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const legacy = year9LegacyUnitRedirect("year-9-mathematics-core", unitSlug);
  if (legacy) permanentRedirect(legacy);
  const unit = getNewCourseUnit("year-9-mathematics-core", unitSlug);

  if (!unit || unit.lessons.length === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-9-mathematics-core" unitSlug={unitSlug} />;
}
