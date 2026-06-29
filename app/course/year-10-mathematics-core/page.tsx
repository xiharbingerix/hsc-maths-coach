import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-10-mathematics-core");

export default function Year10MathematicsCorePage() {
  return <NewCourseOverviewPage courseSlug="year-10-mathematics-core" />;
}
