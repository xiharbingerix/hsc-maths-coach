import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-10-mathematics");

export default function Year10MathematicsPage() {
  return <NewCourseOverviewPage courseSlug="year-10-mathematics" />;
}
