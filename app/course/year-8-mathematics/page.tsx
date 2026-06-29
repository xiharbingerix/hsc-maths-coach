import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-8-mathematics");

export default function Year8MathematicsPage() {
  return <NewCourseOverviewPage courseSlug="year-8-mathematics" />;
}
