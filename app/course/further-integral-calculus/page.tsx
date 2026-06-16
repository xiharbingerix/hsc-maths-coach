import { permanentRedirect } from "next/navigation";
import { furtherIntegralCalculusLessons } from "../../../lib/lessons/furtherIntegralCalculus";

// Legacy standalone route retired — redirects to the canonical Year 12
// Advanced nested unit. Canonical routing lives in lib/year12AdvancedRoutes.ts.
export default function Page() {
  permanentRedirect(
    `/course/year-12-advanced/${furtherIntegralCalculusLessons[0].moduleSlug}`
  );
}
