import { notFound } from "next/navigation";
import { LessonRenderer } from "../../../LessonRenderer";
import {
  getYear12AdvancedRouteLesson,
  getYear12AdvancedRouteUnit,
  year12AdvancedNestedLessonHref,
  year12AdvancedNestedUnitHref,
} from "../../../../../lib/year12AdvancedRoutes";

export default async function Year12AdvancedLessonPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const { unitSlug, lessonSlug } = await params;
  const unit = getYear12AdvancedRouteUnit(unitSlug);
  const lesson = getYear12AdvancedRouteLesson(unitSlug, lessonSlug);

  if (!unit || !lesson) {
    notFound();
  }

  const lessonIndex = unit.lessons.findIndex(
    (nextLesson) => nextLesson.slug === lessonSlug
  );
  const prevLesson =
    lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : undefined;
  const nextLesson =
    lessonIndex < unit.lessons.length - 1
      ? unit.lessons[lessonIndex + 1]
      : undefined;

  return (
    <LessonRenderer
      courseSlug="year-12-advanced"
      unitSlug={unit.slug}
      lessonSlug={lesson.slug}
      lessons={unit.lessons}
      backHref={year12AdvancedNestedUnitHref(unit.slug)}
      backLabel={`Back to ${unit.title}`}
      prevHref={
        prevLesson
          ? year12AdvancedNestedLessonHref(unit.slug, prevLesson.slug)
          : undefined
      }
      prevLabel={prevLesson?.title}
      nextHref={
        nextLesson
          ? year12AdvancedNestedLessonHref(unit.slug, nextLesson.slug)
          : undefined
      }
      nextLabel={nextLesson?.title}
    />
  );
}
