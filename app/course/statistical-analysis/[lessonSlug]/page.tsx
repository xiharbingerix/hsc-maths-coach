import { notFound, permanentRedirect } from "next/navigation";
import { statisticalAnalysisLessons } from "../../../../lib/lessons/statisticalAnalysis";

// Legacy standalone route retired — redirects to the canonical Year 12
// Advanced nested lesson. Canonical routing lives in lib/year12AdvancedRoutes.ts.
export default async function Page({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const lesson = statisticalAnalysisLessons.find((l) => l.slug === lessonSlug);
  if (!lesson) {
    notFound();
  }
  permanentRedirect(
    `/course/year-12-advanced/${lesson.moduleSlug}/${lesson.slug}`
  );
}
