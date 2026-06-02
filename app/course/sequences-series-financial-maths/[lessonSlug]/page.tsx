import { LessonRenderer } from "../../LessonRenderer";
import { sequencesSeriesFinancialMathsLessons } from "../../../../lib/lessons/sequencesSeriesFinancialMaths";

export default async function SequencesSeriesFinancialMathsLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug="sequences-series-financial-maths"
      lessonSlug={lessonSlug}
      lessons={sequencesSeriesFinancialMathsLessons}
      backHref="/course/sequences-series-financial-maths"
      backLabel="Back to Sequences, Series and Financial Mathematics"
    />
  );
}
