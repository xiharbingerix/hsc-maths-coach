import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-11-standard");

export default function Year11StandardPage() {
  return <NewCourseOverviewPage courseSlug="year-11-standard" />;
}
