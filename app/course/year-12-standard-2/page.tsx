import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-12-standard-2");

export default function Year12Standard2Page() {
  return <NewCourseOverviewPage courseSlug="year-12-standard-2" />;
}
