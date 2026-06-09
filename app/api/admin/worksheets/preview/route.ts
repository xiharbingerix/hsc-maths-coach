import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../lib/adminAuth";
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

  const { courseSlug, topicSlugs, preset, totalQuestions } = body;

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

  try {
    const questions = await selectWorksheetQuestions({
      courseSlug,
      topicSlugs,
      preset,
      totalQuestions: count,
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
