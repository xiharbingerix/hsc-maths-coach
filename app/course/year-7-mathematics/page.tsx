import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-7-mathematics");

export default function Year7MathematicsPage() {
  return <NewCourseOverviewPage courseSlug="year-7-mathematics" />;
}
