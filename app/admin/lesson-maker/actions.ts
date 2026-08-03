"use server";

import { createHash } from "node:crypto";
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
import { buildYear9SyllabusScope } from "../../../lib/syllabus/year9Nesa";

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
  selectedSyllabusContentCodes: string[],
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

  const requestedCodes = [...new Set(selectedSyllabusContentCodes)].sort();
  const syllabusScope = buildYear9SyllabusScope(
    courseSlug,
    unitSlug,
    requestedCodes,
  );
  const acceptedCodes = new Set(
    syllabusScope?.outcomes.flatMap((outcome) =>
      outcome.focusAreas.flatMap((focus) =>
        focus.contentGroups.flatMap((group) =>
          group.contentPoints.map((point) => point.code),
        ),
      ),
    ) ?? [],
  );
  if (
    requestedCodes.length > 0 &&
    (acceptedCodes.size !== requestedCodes.length ||
      requestedCodes.some((code) => !acceptedCodes.has(code)))
  ) {
    return {
      error:
        "One or more selected syllabus content points do not belong to this Year 9 unit. Refresh the page and select the scope again.",
    };
  }

  const syllabusScopeKey = syllabusScope
    ? createHash("sha256")
        .update(requestedCodes.join("|"))
        .digest("hex")
        .slice(0, 24)
    : "default";

  const cacheKey = {
    course_slug: courseSlug,
    unit_slug: unitSlug,
    lesson_slug: lessonSlug,
    lesson_length: length,
    student_level: level,
    delivery_mode: deliveryMode,
    syllabus_scope_key: syllabusScopeKey,
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
      plan: generateTutorPlan(lesson, {
        length,
        level,
        deliveryMode,
        syllabusScope,
      }),
      source: "built-in",
    };
  }

  // 3. Generate with Claude and save as this topic's default.
  try {
    const { plan, model } = await generateAiLessonPlan(lesson, {
      length,
      level,
      deliveryMode,
      syllabusScope,
    });

    const { error: upsertError } = await supabaseAdmin
      .from("ai_lesson_plans")
      .upsert(
        {
          ...cacheKey,
          model,
          plan: plan as unknown as Record<string, unknown>,
          syllabus_scope: syllabusScope ?? null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict:
            "course_slug,unit_slug,lesson_slug,lesson_length,student_level,delivery_mode,syllabus_scope_key",
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
  syllabusOutcomeCodes: string[];
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
      syllabus_scope: plan.syllabusScope ?? null,
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
      "id,title,course_slug,unit_slug,lesson_slug,lesson_length,student_level,delivery_mode,syllabus_scope,created_at",
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
      syllabusOutcomeCodes:
        ((row.syllabus_scope as TutorLessonPlan["syllabusScope"] | null)
          ?.outcomes.map((outcome) => outcome.code) ?? []),
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
      syllabusOutcomeCodes:
        ((row.syllabus_scope as TutorLessonPlan["syllabusScope"] | null)
          ?.outcomes.map((outcome) => outcome.code) ?? []),
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
        syllabusScope:
          (row.plan as { syllabusScope?: TutorLessonPlan["syllabusScope"] })
            .syllabusScope ??
          (row.syllabus_scope as TutorLessonPlan["syllabusScope"] | undefined),
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
