import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-9-mathematics-advanced");

export default function Year9MathematicsAdvancedPage() {
  return <NewCourseOverviewPage courseSlug="year-9-mathematics-advanced" />;
}
