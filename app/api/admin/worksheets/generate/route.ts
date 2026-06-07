import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { getSiteUrl } from "../../../../../lib/stripe";

export const runtime = "nodejs";

// ── Difficulty presets ────────────────────────────────────────────────────────
// Each sums to 10. Scaled to the requested total via largest-remainder rounding.

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
type DifficultyDist = Record<DifficultyLevel, number>;

const PRESETS: Record<string, DifficultyDist> = {
  "catch-up":     { 1: 3, 2: 4, 3: 2, 4: 1, 5: 0 },
  "standard":     { 1: 1, 2: 3, 3: 3, 4: 2, 5: 1 },
  "push-forward": { 1: 0, 2: 2, 3: 3, 4: 3, 5: 2 },
};

function scalePreset(preset: DifficultyDist, target: number): Map<DifficultyLevel, number> {
  const total = (Object.values(preset) as number[]).reduce((s, v) => s + v, 0);
  if (total === 0) return new Map();

  const levels = (Object.keys(preset) as unknown as DifficultyLevel[]).map((level) => ({
    level,
    exact: (preset[level] / total) * target,
    floor: Math.floor((preset[level] / total) * target),
  }));

  const floorSum = levels.reduce((s, l) => s + l.floor, 0);
  const remainder = target - floorSum;

  // Give leftover to levels with the largest fractional parts
  const sorted = [...levels].sort(
    (a, b) => (b.exact - b.floor) - (a.exact - a.floor)
  );
  sorted.slice(0, remainder).forEach((l) => { l.floor++; });

  return new Map(
    levels
      .filter((l) => l.floor > 0)
      .map((l) => [l.level, l.floor])
  );
}

// ── Admin auth helper ─────────────────────────────────────────────────────────

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === getAdminToken();
  } catch {
    return false;
  }
}

// ── Request body ──────────────────────────────────────────────────────────────

type GenerateBody = {
  title?: string;
  courseSlug?: string;
  topicSlugs?: string[];
  preset?: string;
  totalQuestions?: number;
};

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, courseSlug, topicSlugs, preset, totalQuestions } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!courseSlug?.trim()) {
    return NextResponse.json({ error: "Course is required." }, { status: 400 });
  }
  if (!Array.isArray(topicSlugs) || topicSlugs.length === 0) {
    return NextResponse.json({ error: "At least one topic is required." }, { status: 400 });
  }
  if (!preset || !(preset in PRESETS)) {
    return NextResponse.json({ error: "Invalid difficulty preset." }, { status: 400 });
  }
  const count = Number(totalQuestions);
  if (!Number.isInteger(count) || count < 1 || count > 50) {
    return NextResponse.json(
      { error: "Question count must be between 1 and 50." },
      { status: 400 }
    );
  }

  const distribution = scalePreset(PRESETS[preset], count);

  // ── Fetch question IDs per difficulty level ───────────────────────────────

  const allSelectedIds: string[] = [];

  for (const [level, needed] of distribution) {
    if (needed === 0) continue;

    const { data: qRows, error } = await supabaseAdmin
      .from("questions")
      .select("id")
      .eq("course_slug", courseSlug)
      .in("topic_slug", topicSlugs)
      .eq("difficulty", level)
      .eq("is_active", true);

    if (error) {
      console.error("[worksheets/generate] questions query failed", {
        level,
        message: error.message,
      });
      return NextResponse.json(
        { error: "Could not query questions. Check the database." },
        { status: 500 }
      );
    }

    if (!qRows || qRows.length === 0) continue;

    // Shuffle and take up to `needed`
    const shuffled = (qRows as { id: string }[])
      .map((q) => q.id)
      .sort(() => Math.random() - 0.5);

    allSelectedIds.push(...shuffled.slice(0, needed));
  }

  if (allSelectedIds.length === 0) {
    return NextResponse.json(
      {
        error:
          "No active questions found for the selected course and topic(s). " +
          "Apply the migration and run the seed script first.",
      },
      { status: 422 }
    );
  }

  // ── Create worksheet ──────────────────────────────────────────────────────

  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .insert({
      title: title.trim(),
      year_level: courseSlug,
      topic_config: { course_slug: courseSlug, topic_slugs: topicSlugs, preset },
    })
    .select("id, share_token")
    .single();

  if (wsError || !worksheet) {
    console.error("[worksheets/generate] worksheet insert failed", {
      message: wsError?.message,
    });
    return NextResponse.json(
      { error: "Could not create worksheet." },
      { status: 500 }
    );
  }

  // ── Create worksheet_questions rows ──────────────────────────────────────

  const wqRows = allSelectedIds.map((questionId, index) => ({
    worksheet_id: worksheet.id,
    question_id: questionId,
    position: index,
  }));

  const { error: wqError } = await supabaseAdmin
    .from("worksheet_questions")
    .insert(wqRows);

  if (wqError) {
    console.error("[worksheets/generate] worksheet_questions insert failed", {
      worksheetId: worksheet.id,
      message: wqError.message,
    });
    // Best-effort cleanup
    await supabaseAdmin.from("worksheets").delete().eq("id", worksheet.id);
    return NextResponse.json(
      { error: "Could not attach questions to worksheet." },
      { status: 500 }
    );
  }

  const shareToken = worksheet.share_token as string;
  const shareUrl = `${getSiteUrl()}/worksheet/${shareToken}`;

  console.log("[worksheets/generate] created", {
    worksheetId: worksheet.id,
    shareToken,
    questionCount: allSelectedIds.length,
    courseSlug,
    topicSlugs,
    preset,
  });

  return NextResponse.json({
    worksheetId: worksheet.id,
    shareToken,
    shareUrl,
    questionCount: allSelectedIds.length,
  });
}
