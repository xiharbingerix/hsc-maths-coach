import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-11-advanced");

export default function Year11AdvancedPage() {
  return <NewCourseOverviewPage courseSlug="year-11-advanced" />;
}
