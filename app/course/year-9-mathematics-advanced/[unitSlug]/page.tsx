import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-9-mathematics-advanced", unitSlug);
}
import { notFound, permanentRedirect } from "next/navigation";
import { getNewCourseUnit } from "../../../../lib/newCourseCatalog";
import { year9LegacyUnitRedirect } from "../../../../lib/year9PathTags";

export default async function Year9MathematicsAdvancedUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const legacy = year9LegacyUnitRedirect("year-9-mathematics-advanced", unitSlug);
  if (legacy) permanentRedirect(legacy);
  const unit = getNewCourseUnit("year-9-mathematics-advanced", unitSlug);

  if (!unit || unit.lessons.length === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-9-mathematics-advanced" unitSlug={unitSlug} />;
}
