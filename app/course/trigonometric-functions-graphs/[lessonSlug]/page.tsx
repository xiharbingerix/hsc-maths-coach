import { LessonRenderer } from "../../LessonRenderer";
import { trigonometricFunctionsGraphsLessons } from "../../../../lib/lessons/trigonometricFunctionsGraphs";

export default async function TrigonometricFunctionsGraphsLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      lessonSlug={lessonSlug}
      lessons={trigonometricFunctionsGraphsLessons}
      backHref="/course/trigonometric-functions-graphs"
      backLabel="Back to Trigonometric Functions and Graphs"
    />
  );
}
