"use server";

import { requireAdmin } from "../../../lib/adminSession";
import { getNewCourseLesson } from "../../../lib/newCourseCatalog";
import { getYear12AdvancedRouteLesson } from "../../../lib/year12AdvancedRoutes";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import {
  generateTutorPlan,
  detectPlaceholderLesson,
  type LessonLength,
  type LessonDeliveryMode,
  type StudentLevel,
  type TutorLessonPlan,
} from "../../../lib/lessonMaker";
import {
  aiLessonPlannerEnabled,
  generateAiLessonPlan,
} from "../../../lib/aiLessonPlanner";
import {
  normaliseDeliveryMode,
  normaliseStudentLevel,
} from "../../../lib/lessonPlannerConfig";

// ── Lesson plan generation ────────────────────────────────────────────────────
//
// AI-first with a per-topic cache: the first generation for a
// (course, unit, lesson, length, level, delivery mode) key calls Claude and stores the result
// in ai_lesson_plans as that topic's default. Subsequent generations serve the
// cached plan (no tokens spent) unless forceRegenerate is set, which overwrites
// the cached default. With no ANTHROPIC_API_KEY the built-in deterministic
// generator is used instead (never cached).

export type GenerateResult =
  | { plan: TutorLessonPlan; source: "cache" | "ai" | "built-in" }
  | { error: string };

export async function generateLessonPlanAction(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
  length: LessonLength,
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
  opts?: { forceRegenerate?: boolean },
): Promise<GenerateResult> {
  await requireAdmin();

  // Year 12 Advanced has its own hand-authored registry; everything else
  // comes from the newCoursePathways catalog.
  const lesson =
    courseSlug === "year-12-advanced"
      ? (getYear12AdvancedRouteLesson(unitSlug, lessonSlug) ?? null)
      : getNewCourseLesson(courseSlug, unitSlug, lessonSlug);
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

  const cacheKey = {
    course_slug: courseSlug,
    unit_slug: unitSlug,
    lesson_slug: lessonSlug,
    lesson_length: length,
    student_level: level,
    delivery_mode: deliveryMode,
  };

  // 1. Cached default for this topic — free.
  if (!opts?.forceRegenerate) {
    const { data } = await supabaseAdmin
      .from("ai_lesson_plans")
      .select("plan")
      .match(cacheKey)
      .maybeSingle();
    const cached = (data as { plan?: TutorLessonPlan } | null)?.plan;
    if (cached) return { plan: cached, source: "cache" };
  }

  // 2. No API key → deterministic built-in generator (not cached).
  if (!aiLessonPlannerEnabled()) {
    return {
      plan: generateTutorPlan(lesson, { length, level, deliveryMode }),
      source: "built-in",
    };
  }

  // 3. Generate with Claude and save as this topic's default.
  try {
    const { plan, model } = await generateAiLessonPlan(lesson, {
      length,
      level,
      deliveryMode,
    });

    const { error: upsertError } = await supabaseAdmin
      .from("ai_lesson_plans")
      .upsert(
        {
          ...cacheKey,
          model,
          plan: plan as unknown as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict:
            "course_slug,unit_slug,lesson_slug,lesson_length,student_level,delivery_mode",
        },
      );
    if (upsertError) {
      // Plan still usable — surface the caching failure without losing it.
      console.error("ai_lesson_plans upsert failed:", upsertError.message);
    }

    return { plan, source: "ai" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { error: `AI lesson generation failed: ${message}` };
  }
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
  deliveryMode: LessonDeliveryMode;
  createdAt: string;
};

export type SavedPlanRecord = SavedPlanSummary & { plan: TutorLessonPlan };

export async function saveLessonPlanAction(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
  length: LessonLength,
  level: StudentLevel,
  deliveryMode: LessonDeliveryMode,
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
      delivery_mode: deliveryMode,
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
      "id,title,course_slug,unit_slug,lesson_slug,lesson_length,student_level,delivery_mode,created_at",
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
      studentLevel: normaliseStudentLevel(row.student_level as string),
      deliveryMode: normaliseDeliveryMode(row.delivery_mode as string | undefined),
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
      studentLevel: normaliseStudentLevel(row.student_level as string),
      deliveryMode: normaliseDeliveryMode(row.delivery_mode as string | undefined),
      createdAt: row.created_at as string,
      plan: {
        ...(row.plan as unknown as TutorLessonPlan),
        level: normaliseStudentLevel(
          (row.plan as { level?: string }).level ?? (row.student_level as string),
        ),
        deliveryMode: normaliseDeliveryMode(
          (row.plan as { deliveryMode?: string }).deliveryMode ??
            (row.delivery_mode as string | undefined),
        ),
      },
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
