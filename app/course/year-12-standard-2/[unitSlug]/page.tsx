import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-12-standard-2", unitSlug);
}

export default async function Year12Standard2UnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return (
    <NewCourseUnitPage
      courseSlug="year-12-standard-2"
      unitSlug={unitSlug}
    />
  );
}
