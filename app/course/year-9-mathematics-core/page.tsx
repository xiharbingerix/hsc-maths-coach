import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-9-mathematics-core");

export default function Year9MathematicsCorePage() {
  return <NewCourseOverviewPage courseSlug="year-9-mathematics-core" />;
}
