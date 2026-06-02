import { supabase } from "./supabaseClient";

export type LessonProgressRecord = {
  courseSlug: string;
  unitSlug: string;
  lessonSlug: string;
  passed: boolean;
  lastScore?: number | null;
  completedStages: string[];
  updatedAt?: string;
};

type LessonProgressRow = {
  course_slug: string;
  unit_slug: string;
  lesson_slug: string;
  passed: boolean;
  last_score: number | string | null;
  completed_stages: string[] | null;
  updated_at: string;
};

function toLessonProgressRecord(row: LessonProgressRow): LessonProgressRecord {
  const numericScore =
    row.last_score === null ? null : Number(row.last_score);

  return {
    courseSlug: row.course_slug,
    unitSlug: row.unit_slug,
    lessonSlug: row.lesson_slug,
    passed: row.passed,
    lastScore: Number.isFinite(numericScore) ? numericScore : null,
    completedStages: Array.isArray(row.completed_stages)
      ? row.completed_stages
      : [],
    updatedAt: row.updated_at,
  };
}

export async function upsertLessonProgress(
  userId: string,
  record: LessonProgressRecord
) {
  try {
    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: userId,
        course_slug: record.courseSlug,
        unit_slug: record.unitSlug,
        lesson_slug: record.lessonSlug,
        passed: record.passed,
        last_score: record.lastScore ?? null,
        completed_stages: record.completedStages,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_slug,unit_slug,lesson_slug" }
    );

    if (error) {
      console.error("Could not save lesson progress.", error);
    }
  } catch (error) {
    console.error("Could not save lesson progress.", error);
  }
}

export async function getUserCourseProgress(
  userId: string,
  courseSlug: string
): Promise<Record<string, LessonProgressRecord>> {
  try {
    const { data, error } = await supabase
      .from("lesson_progress")
      .select(
        "course_slug, unit_slug, lesson_slug, passed, last_score, completed_stages, updated_at"
      )
      .eq("user_id", userId)
      .eq("course_slug", courseSlug);

    if (error) {
      console.error("Could not load course progress.", error);
      return {};
    }

    return ((data ?? []) as LessonProgressRow[]).reduce<
      Record<string, LessonProgressRecord>
    >((progress, row) => {
      const record = toLessonProgressRecord(row);
      progress[`${record.unitSlug}/${record.lessonSlug}`] = record;
      return progress;
    }, {});
  } catch (error) {
    console.error("Could not load course progress.", error);
    return {};
  }
}

export async function getUserAllProgress(
  userId: string
): Promise<Record<string, LessonProgressRecord>> {
  try {
    const { data, error } = await supabase
      .from("lesson_progress")
      .select(
        "course_slug, unit_slug, lesson_slug, passed, last_score, completed_stages, updated_at"
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Could not load lesson progress.", error);
      return {};
    }

    return ((data ?? []) as LessonProgressRow[]).reduce<
      Record<string, LessonProgressRecord>
    >((progress, row) => {
      const record = toLessonProgressRecord(row);
      progress[
        `${record.courseSlug}/${record.unitSlug}/${record.lessonSlug}`
      ] = record;
      return progress;
    }, {});
  } catch (error) {
    console.error("Could not load lesson progress.", error);
    return {};
  }
}
