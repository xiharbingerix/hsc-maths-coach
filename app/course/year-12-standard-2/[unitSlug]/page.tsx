import { NewCourseUnitPage } from "../../NewCoursePages";

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
