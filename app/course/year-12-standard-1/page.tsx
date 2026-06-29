import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-12-standard-1");

export default function Year12Standard1Page() {
  return <NewCourseOverviewPage courseSlug="year-12-standard-1" />;
}
