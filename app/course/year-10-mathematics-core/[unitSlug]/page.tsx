import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-10-mathematics-core", unitSlug);
}
import { notFound, permanentRedirect } from "next/navigation";
import {
  getNewCourseUnit,
  newCourseUnitLessonCount,
} from "../../../../lib/newCourseCatalog";
import { year10LegacyUnitRedirect } from "../../../../lib/year10PathTags";

export default async function Year10MathematicsCoreUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  const legacy = year10LegacyUnitRedirect("year-10-mathematics-core", unitSlug);
  if (legacy) permanentRedirect(legacy);
  const unit = getNewCourseUnit("year-10-mathematics-core", unitSlug);

  if (!unit || newCourseUnitLessonCount(unit) === 0) {
    notFound();
  }

  return <NewCourseUnitPage courseSlug="year-10-mathematics-core" unitSlug={unitSlug} />;
}
