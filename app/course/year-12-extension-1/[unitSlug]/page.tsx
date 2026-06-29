import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-12-extension-1", unitSlug);
}
import { notFound } from "next/navigation";
import { getNewCourseUnit } from "../../../../lib/newCourseCatalog";

export default async function Year12Extension1UnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const unit = getNewCourseUnit("year-12-extension-1", unitSlug);

  if (!unit || unit.lessons.length === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-12-extension-1" unitSlug={unitSlug} />;
}
