import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../../lib/adminAuth";
import { findReplacementQuestion } from "../../../../../../lib/worksheetGeneration";

export const runtime = "nodejs";

type ReplaceBody = {
  courseSlug?: string;
  topicSlug?: string;
  subtopicSlug?: string;
  difficulty?: number;
  excludeQuestionIds?: string[];
  includeMultiPart?: boolean;
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

  let body: ReplaceBody;
  try {
    body = (await request.json()) as ReplaceBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    courseSlug,
    topicSlug,
    subtopicSlug,
    difficulty,
    excludeQuestionIds,
    includeMultiPart,
  } = body;

  if (!courseSlug?.trim() || !topicSlug?.trim()) {
    return NextResponse.json(
      { error: "Course and topic are required." },
      { status: 400 }
    );
  }

  const desiredDifficulty = Number(difficulty);
  if (!Number.isFinite(desiredDifficulty)) {
    return NextResponse.json(
      { error: "Difficulty is required." },
      { status: 400 }
    );
  }

  try {
    const replacement = await findReplacementQuestion({
      courseSlug,
      topicSlug,
      subtopicSlug,
      difficulty: desiredDifficulty,
      excludeQuestionIds: Array.isArray(excludeQuestionIds)
        ? excludeQuestionIds
        : [],
      includeMultiPart: includeMultiPart === true,
    });

    if (!replacement) {
      return NextResponse.json(
        { error: "No replacement question is available for this topic." },
        { status: 422 }
      );
    }

    return NextResponse.json({ question: replacement });
  } catch (error) {
    console.error("[worksheets/preview/replace] failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Could not replace this question." },
      { status: 500 }
    );
  }
}
