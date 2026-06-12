import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  isDifficultyPreset,
  selectWorksheetQuestions,
} from "../../../../../lib/worksheetGeneration";

export const runtime = "nodejs";

type PreviewBody = {
  courseSlug?: string;
  topicSlugs?: string[];
  preset?: string;
  totalQuestions?: number;
  studentId?: string;
  selectedSubtopicSlugs?: string[];
};

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === getAdminToken();
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: PreviewBody;
  try {
    body = (await request.json()) as PreviewBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { courseSlug, topicSlugs, preset, totalQuestions, studentId, selectedSubtopicSlugs } = body;

  if (!courseSlug?.trim()) {
    return NextResponse.json({ error: "Course is required." }, { status: 400 });
  }

  if (!Array.isArray(topicSlugs) || topicSlugs.length === 0) {
    return NextResponse.json(
      { error: "At least one topic is required." },
      { status: 400 }
    );
  }

  if (!isDifficultyPreset(preset)) {
    return NextResponse.json(
      { error: "Invalid difficulty preset." },
      { status: 400 }
    );
  }

  const count = Number(totalQuestions);
  if (!Number.isInteger(count) || count < 1 || count > 50) {
    return NextResponse.json(
      { error: "Question count must be between 1 and 50." },
      { status: 400 }
    );
  }

  // Validate selectedSubtopicSlugs if provided
  const manualSubtopics =
    Array.isArray(selectedSubtopicSlugs) && selectedSubtopicSlugs.length > 0
      ? (selectedSubtopicSlugs as string[]).filter(
          (s) => typeof s === "string" && s.trim()
        )
      : [];

  // Look up weak subtopics for this student only when no manual selection is made
  let weakSubtopicSlugs: string[] = [];
  if (manualSubtopics.length === 0 && typeof studentId === "string" && studentId.trim()) {
    const { data: subtopicData } = await supabaseAdmin
      .from("student_subtopic_mastery")
      .select("subtopic_slug")
      .eq("user_id", studentId)
      .eq("course_slug", courseSlug)
      .in("topic_slug", topicSlugs as string[])
      .order("mastery_score", { ascending: true })
      .limit(6);

    weakSubtopicSlugs = ((subtopicData ?? []) as { subtopic_slug: string }[]).map(
      (row) => row.subtopic_slug
    );
  }

  try {
    const questions = await selectWorksheetQuestions({
      courseSlug,
      topicSlugs,
      preset,
      totalQuestions: count,
      weakSubtopicSlugs,
      selectedSubtopicSlugs: manualSubtopics.length > 0 ? manualSubtopics : undefined,
    });

    if (questions.length === 0) {
      return NextResponse.json(
        {
          error:
            "No active questions found for the selected course and topic(s). Apply the migration and run the seed script first.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      questions,
      questionCount: questions.length,
      prioritisedSubtopics:
        weakSubtopicSlugs.length > 0 ? weakSubtopicSlugs : undefined,
    });
  } catch (error) {
    console.error("[worksheets/preview] failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Could not preview worksheet questions." },
      { status: 500 }
    );
  }
}
