import { permanentRedirect } from "next/navigation";
import { integralCalculusLessons } from "../../../lib/lessons/integralCalculus";

// Legacy standalone route retired — redirects to the canonical Year 12
// Advanced nested unit. Canonical routing lives in lib/year12AdvancedRoutes.ts.
export default function Page() {
  permanentRedirect(
    `/course/year-12-advanced/${integralCalculusLessons[0].moduleSlug}`
  );
}
