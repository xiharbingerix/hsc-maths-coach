import { LessonRenderer } from "../../LessonRenderer";
import { functionsGraphingTechniquesLessons } from "../../../../lib/lessons/functionsGraphingTechniques";

export default async function FunctionsGraphingTechniquesLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="functions-graphing-techniques"
      lessonSlug={lessonSlug}
      lessons={functionsGraphingTechniquesLessons}
      backHref="/course/functions-graphing-techniques"
      backLabel="Back to Functions and Graphing Techniques"
    />
  );
}
