import { LessonRenderer } from "../../LessonRenderer";
import { financialMathematicsLessons } from "../../../../lib/lessons/financialMathematics";

export default async function FinancialMathematicsLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      lessonSlug={lessonSlug}
      lessons={financialMathematicsLessons}
      backHref="/course/financial-mathematics"
      backLabel="Back to Financial Mathematics"
    />
  );
}
