import { NewCourseUnitPage } from "../../NewCoursePages";

export default async function Year12Standard1UnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return (
    <NewCourseUnitPage
      courseSlug="year-12-standard-1"
      unitSlug={unitSlug}
    />
  );
}
