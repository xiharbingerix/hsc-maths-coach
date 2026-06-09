import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { recordMasteryEvents } from "../../../../lib/mastery/updateMastery";
import type { MasteryEventInput } from "../../../../lib/mastery/updateMastery";

export const runtime = "nodejs";

type DiagnosticEventInput = {
  questionId: string;
  topicSlug: string;
  isCorrect: boolean;
};

type DiagnosticMasteryBody = {
  courseSlug: string;
  sourceId: string;
  events: DiagnosticEventInput[];
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

  let body: DiagnosticMasteryBody;
  try {
    body = (await request.json()) as DiagnosticMasteryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { courseSlug, sourceId, events } = body;

  if (
    !courseSlug ||
    !sourceId ||
    !Array.isArray(events) ||
    events.length === 0
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!UUID_RE.test(sourceId)) {
    return NextResponse.json({ error: "Invalid sourceId." }, { status: 400 });
  }

  // Idempotency: find question IDs already recorded for this diagnostic attempt.
  const { data: existingRows } = await supabaseAdmin
    .from("mastery_events")
    .select("source_question_id")
    .eq("user_id", userId)
    .eq("source_type", "diagnostic")
    .eq("source_id", sourceId)
    .not("source_question_id", "is", null);

  const alreadyRecorded = new Set(
    (existingRows ?? []).map(
      (r: { source_question_id: string | null }) => r.source_question_id
    )
  );

  const newEvents = events.filter((ev) => !alreadyRecorded.has(ev.questionId));
  if (newEvents.length === 0) {
    return NextResponse.json({ ok: true });
  }

  const masteryEvents: MasteryEventInput[] = newEvents.map((ev) => ({
    userId,
    sourceType: "diagnostic" as const,
    sourceId,
    questionId: crypto.randomUUID(),
    sourceQuestionId: ev.questionId,
    courseSlug,
    topicSlug: ev.topicSlug,
    subtopicSlug: null,
    difficulty: 3,
    isCorrect: Boolean(ev.isCorrect),
  }));

  try {
    await recordMasteryEvents(masteryEvents);
  } catch (err) {
    console.error("[mastery/diagnostic] recordMasteryEvents failed", {
      userId,
      courseSlug,
      error: err instanceof Error ? err.message : err,
    });
    return NextResponse.json({ error: "Could not record mastery." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
