import { NewCourseOverviewPage } from "../NewCoursePages";
import { buildCourseMetadata } from "../../../lib/seo";

export const metadata = buildCourseMetadata("year-11-extension");

export default function Year11ExtensionPage() {
  return <NewCourseOverviewPage courseSlug="year-11-extension" />;
}
