import { LessonRenderer } from "../../LessonRenderer";
import { exponentialLogarithmicFunctionsLessons } from "../../../../lib/lessons/exponentialLogarithmicFunctions";

export default async function ExponentialLogarithmicFunctionsLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="exponential-logarithmic-functions"
      lessonSlug={lessonSlug}
      lessons={exponentialLogarithmicFunctionsLessons}
      backHref="/course/exponential-logarithmic-functions"
      backLabel="Back to Exponential and Logarithmic Functions"
    />
  );
}
