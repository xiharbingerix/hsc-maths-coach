import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-9-mathematics");

export default function Year9MathematicsPage() {
  return <NewCourseOverviewPage courseSlug="year-9-mathematics" />;
}
