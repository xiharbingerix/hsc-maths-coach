import { NewCourseUnitPage } from "../../NewCoursePages";
import { buildCourseUnitMetadata } from "../../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;
  return buildCourseUnitMetadata("year-11-standard", unitSlug);
}
import { redirect } from "next/navigation";

const oldUnitRedirects: Record<string, string> = {
  "algebra-linear-relationships": "formulas-equations",
  "money-financial-mathematics": "earning-money",
  "measurement-time-location": "applications-measurement",
  "data-analysis-probability": "data-analysis",
};

export default async function Year11StandardUnitPage({
  params,
}: {
  params: Promise<{ unitSlug: string }>;
}) {
  const { unitSlug } = await params;

  const redirectedUnit = oldUnitRedirects[unitSlug];

  if (redirectedUnit) {
    redirect(`/course/year-11-standard/${redirectedUnit}`);
  }

  return <NewCourseUnitPage courseSlug="year-11-standard" unitSlug={unitSlug} />;
}
