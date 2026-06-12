"use server";

import { requireAdmin } from "../../../lib/adminSession";
import { getNewCourseLesson } from "../../../lib/newCourseCatalog";
import {
  generateTutorPlan,
  type LessonLength,
  type StudentLevel,
  type TutorLessonPlan,
} from "../../../lib/lessonMaker";

export async function generateLessonPlanAction(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
  length: LessonLength,
  level: StudentLevel,
): Promise<{ plan: TutorLessonPlan } | { error: string }> {
  await requireAdmin();

  const lesson = getNewCourseLesson(courseSlug, unitSlug, lessonSlug);
  if (!lesson) {
    return {
      error: `Lesson not found: ${courseSlug} / ${unitSlug} / ${lessonSlug}`,
    };
  }

  const plan = generateTutorPlan(lesson, { length, level });
  return { plan };
}
