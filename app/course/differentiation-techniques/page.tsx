import { permanentRedirect } from "next/navigation";
import { differentiationTechniquesLessons } from "../../../lib/lessons/differentiationTechniques";

// Legacy standalone route retired — redirects to the canonical Year 12
// Advanced nested unit. Canonical routing lives in lib/year12AdvancedRoutes.ts.
export default function Page() {
  permanentRedirect(
    `/course/year-12-advanced/${differentiationTechniquesLessons[0].moduleSlug}`
  );
}
