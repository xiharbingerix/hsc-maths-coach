import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-11-advanced", unitSlug);
}
import { redirect } from "next/navigation";

const oldUnitRedirects: Record<string, string> = {
  functions: "working-with-functions",
  "trigonometric-functions": "trigonometry-measure-angles",
  "introduction-calculus": "introduction-differentiation",
  "statistical-analysis": "probability-data",
};

export default async function Year11AdvancedUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;

  const redirectedUnit = oldUnitRedirects[unitSlug];

  if (redirectedUnit) {
    redirect(`/course/year-11-advanced/${redirectedUnit}`);
  }

  return <NewCourseUnitPage courseSlug="year-11-advanced" unitSlug={unitSlug} />;
}
