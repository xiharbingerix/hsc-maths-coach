import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-10-mathematics-advanced");

export default function Year10MathematicsAdvancedPage() {
  return <NewCourseOverviewPage courseSlug="year-10-mathematics-advanced" />;
}
