"use server";

import { requireAdmin } from "../../../lib/adminSession";
import { getNewCourseLesson } from "../../../lib/newCourseCatalog";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import {
  generateTutorPlan,
  detectPlaceholderLesson,
  type LessonLength,
  type StudentLevel,
  type TutorLessonPlan,
} from "../../../lib/lessonMaker";

// ── Lesson plan generation ────────────────────────────────────────────────────

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

  const placeholderSignal = detectPlaceholderLesson(lesson);
  if (placeholderSignal) {
    return {
      error: `This lesson contains fallback/placeholder content ("${placeholderSignal}") and cannot be used as a tutor lesson. The lesson override for ${unitSlug}/${lessonSlug} in ${courseSlug} needs to be written before this plan can be generated.`,
    };
  }

  const plan = generateTutorPlan(lesson, { length, level });
  return { plan };
}

// ── Saved plans ───────────────────────────────────────────────────────────────

export type SavedPlanSummary = {
  id: string;
  title: string;
  courseSlug: string;
  unitSlug: string;
  lessonSlug: string;
  lessonLength: number;
  studentLevel: string;
  createdAt: string;
};

export type SavedPlanRecord = SavedPlanSummary & { plan: TutorLessonPlan };

export async function saveLessonPlanAction(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
  length: LessonLength,
  level: StudentLevel,
  plan: TutorLessonPlan,
): Promise<{ id: string } | { error: string }> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("saved_lesson_plans")
    .insert({
      title: plan.title,
      course_slug: courseSlug,
      unit_slug: unitSlug,
      lesson_slug: lessonSlug,
      lesson_length: length,
      student_level: level,
      plan: plan as unknown as Record<string, unknown>,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  return { id: (data as { id: string }).id };
}

export async function listSavedPlansAction(): Promise<
  { plans: SavedPlanSummary[] } | { error: string }
> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("saved_lesson_plans")
    .select(
      "id,title,course_slug,unit_slug,lesson_slug,lesson_length,student_level,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return { error: error.message };

  const plans: SavedPlanSummary[] = ((data ?? []) as Record<string, unknown>[]).map(
    (row) => ({
      id: row.id as string,
      title: row.title as string,
      courseSlug: row.course_slug as string,
      unitSlug: row.unit_slug as string,
      lessonSlug: row.lesson_slug as string,
      lessonLength: row.lesson_length as number,
      studentLevel: row.student_level as string,
      createdAt: row.created_at as string,
    }),
  );

  return { plans };
}

export async function loadSavedPlanAction(
  id: string,
): Promise<{ record: SavedPlanRecord } | { error: string }> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("saved_lesson_plans")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return { error: error?.message ?? "Not found" };

  const row = data as Record<string, unknown>;
  return {
    record: {
      id: row.id as string,
      title: row.title as string,
      courseSlug: row.course_slug as string,
      unitSlug: row.unit_slug as string,
      lessonSlug: row.lesson_slug as string,
      lessonLength: row.lesson_length as number,
      studentLevel: row.student_level as string,
      createdAt: row.created_at as string,
      plan: row.plan as unknown as TutorLessonPlan,
    },
  };
}

export async function deleteSavedPlanAction(
  id: string,
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();

  const { error } = await supabaseAdmin
    .from("saved_lesson_plans")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  return { success: true };
}
