import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { recordMasteryEvents } from "../../../../lib/mastery/updateMastery";
import type { MasteryEventInput } from "../../../../lib/mastery/updateMastery";

export const runtime = "nodejs";

type LessonEventInput = {
  difficulty: number;
  isCorrect: boolean;
};

type LessonMasteryBody = {
  courseSlug: string;
  topicSlug: string;
  lessonSlug: string;
  sourceId: string;
  events: LessonEventInput[];
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: LessonMasteryBody;
  try {
    body = (await request.json()) as LessonMasteryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { courseSlug, topicSlug, lessonSlug, sourceId, events } = body;

  if (
    !courseSlug ||
    !topicSlug ||
    !lessonSlug ||
    !sourceId ||
    !Array.isArray(events) ||
    events.length === 0
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!UUID_RE.test(sourceId)) {
    return NextResponse.json({ error: "Invalid sourceId." }, { status: 400 });
  }

  const masteryEvents: MasteryEventInput[] = events.map((ev) => ({
    userId,
    sourceType: "lesson" as const,
    sourceId,
    questionId: crypto.randomUUID(),
    courseSlug,
    topicSlug,
    subtopicSlug: lessonSlug,
    difficulty: Math.max(1, Math.min(5, Math.round(ev.difficulty))),
    isCorrect: Boolean(ev.isCorrect),
  }));

  try {
    await recordMasteryEvents(masteryEvents);
  } catch (err) {
    console.error("[mastery/lesson] recordMasteryEvents failed", {
      userId,
      courseSlug,
      topicSlug,
      error: err instanceof Error ? err.message : err,
    });
    return NextResponse.json({ error: "Could not record mastery." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
