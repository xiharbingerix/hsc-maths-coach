import { NewCourseUnitPage } from "../../NewCoursePages";

export default async function Year11StandardUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return <NewCourseUnitPage courseSlug="year-11-standard" unitSlug={unitSlug} />;
}
