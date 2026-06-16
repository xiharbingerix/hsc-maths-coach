/**
 * Assemble a student's weekly DigestData from Supabase (server-only).
 *
 * Every query is defensive: a missing table/column or an error yields a default
 * for that field, so the digest still builds. Reuses the shared streak logic.
 */
import { supabaseAdmin } from "../supabaseAdmin";
import { computeStudyStreak } from "../retention/studyStreak";
import { getExamPaper } from "../exams";
import type { DigestData } from "./buildWeeklyDigest";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function computeDigestData(
  userId: string,
  studentName: string,
  siteUrl: string
): Promise<DigestData> {
  const now = Date.now();
  const weekAgoISO = new Date(now - WEEK_MS).toISOString();
  const activity: Array<string | null | undefined> = [];

  // Exam attempts this week (our own table — known schema).
  let examAttempts: DigestData["examAttempts"] = [];
  try {
    const { data } = await supabaseAdmin
      .from("exam_attempts")
      .select("exam_id,band,percentage,created_at")
      .eq("user_id", userId)
      .gte("created_at", weekAgoISO)
      .order("created_at", { ascending: false });
    for (const row of (data ?? []) as Array<{
      exam_id: string;
      band: string;
      percentage: number;
      created_at: string;
    }>) {
      activity.push(row.created_at);
      examAttempts.push({
        title: getExamPaper(row.exam_id)?.title ?? "Practice exam",
        band: row.band,
        percentage: row.percentage,
      });
    }
  } catch {
    examAttempts = [];
  }

  // Lessons passed this week + activity timestamps.
  let lessonsPassedThisWeek = 0;
  try {
    const { data } = await supabaseAdmin
      .from("lesson_progress")
      .select("passed,updated_at")
      .eq("user_id", userId);
    for (const row of (data ?? []) as Array<{
      passed: boolean | null;
      updated_at: string | null;
    }>) {
      if (row.updated_at) {
        activity.push(row.updated_at);
        if (row.passed && row.updated_at >= weekAgoISO) lessonsPassedThisWeek += 1;
      }
    }
  } catch {
    lessonsPassedThisWeek = 0;
  }

  // Mastery history → more activity dates for the streak.
  try {
    const { data } = await supabaseAdmin
      .from("student_mastery_history")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", new Date(now - 40 * 24 * 60 * 60 * 1000).toISOString());
    for (const row of (data ?? []) as Array<{ created_at: string | null }>) {
      activity.push(row.created_at);
    }
  } catch {
    /* ignore */
  }

  // Weakest topic (current mastery) → focus + continue link.
  let weakestTopic: DigestData["weakestTopic"] = null;
  let continueHref = "/dashboard";
  try {
    const { data } = await supabaseAdmin
      .from("student_mastery")
      .select("course_slug,topic_slug,mastery_score,attempt_count")
      .eq("user_id", userId)
      .gt("attempt_count", 0)
      .order("mastery_score", { ascending: true })
      .limit(1);
    const row = (data ?? [])[0] as
      | { course_slug: string; topic_slug: string }
      | undefined;
    if (row) {
      weakestTopic = {
        title: prettifySlug(row.topic_slug),
        href: `/course/${row.course_slug}/${row.topic_slug}`,
      };
      continueHref = `/course/${row.course_slug}`;
    }
  } catch {
    weakestTopic = null;
  }

  const streak = computeStudyStreak(activity, now);

  return {
    studentName,
    siteUrl,
    streakCurrent: streak.current,
    lessonsPassedThisWeek,
    examAttempts,
    weakestTopic,
    continueHref,
  };
}
