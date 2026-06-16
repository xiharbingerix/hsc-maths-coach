import { permanentRedirect } from "next/navigation";
import { furtherTrigonometryLessons } from "../../../lib/lessons/furtherTrigonometry";

// Legacy standalone route retired — redirects to the canonical Year 12
// Advanced nested unit. Canonical routing lives in lib/year12AdvancedRoutes.ts.
export default function Page() {
  permanentRedirect(
    `/course/year-12-advanced/${furtherTrigonometryLessons[0].moduleSlug}`
  );
}
