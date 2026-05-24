import { NewCourseUnitPage } from "../../NewCoursePages";

export default async function Year11AdvancedUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return <NewCourseUnitPage courseSlug="year-11-advanced" unitSlug={unitSlug} />;
}
