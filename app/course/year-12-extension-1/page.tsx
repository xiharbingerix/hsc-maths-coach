import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-12-extension-1");

export default function Year12Extension1Page() {
  return <NewCourseOverviewPage courseSlug="year-12-extension-1" />;
}
