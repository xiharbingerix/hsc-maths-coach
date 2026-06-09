import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { trackEvent } from "../../../../lib/analytics/trackEvent";

export const runtime = "nodejs";

type MasteryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  last_updated: string | null;
};

type QuestionRow = {
  id: string;
  source_id: string | null;
  difficulty: number;
};

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  return authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
}

function difficultyBand(masteryScore: number) {
  if (masteryScore < 40) return [1, 2];
  if (masteryScore <= 70) return [2, 3];
  return [3, 4];
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function stableDailyShuffle<T extends { id: string }>(items: T[], seed: string) {
  return [...items].sort(
    (a, b) =>
      stableHash(`${seed}:${a.id}`) - stableHash(`${seed}:${b.id}`)
  );
}

function displayTopic(topicSlug: string) {
  return topicSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getStudentName(userId: string) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("student_first_name")
    .eq("id", userId)
    .maybeSingle();

  const profileName = profile?.student_first_name;
  return typeof profileName === "string" && profileName.trim()
    ? profileName.trim().slice(0, 120)
    : null;
}

export async function POST(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return NextResponse.json(
      { error: "Please log in before generating a revision worksheet." },
      { status: 401 }
    );
  }

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.getUser(token);
  const user = authData.user;

  if (authError || !user) {
    return NextResponse.json(
      { error: "Session expired. Please log in again." },
      { status: 401 }
    );
  }

  const { data: masteryData, error: masteryError } = await supabaseAdmin
    .from("student_mastery")
    .select("course_slug, topic_slug, mastery_score, last_updated")
    .eq("user_id", user.id)
    .order("mastery_score", { ascending: true })
    .order("last_updated", { ascending: false })
    .limit(3);

  if (masteryError) {
    console.error("[worksheets/adaptive] mastery query failed", {
      userId: user.id,
      message: masteryError.message,
    });
    return NextResponse.json(
      { error: "Could not load your mastery data. Please try again." },
      { status: 500 }
    );
  }

  const weakestTopics = (masteryData ?? []) as MasteryRow[];

  if (weakestTopics.length === 0) {
    return NextResponse.json(
      {
        error:
          "Complete a diagnostic or worksheet first so we know what to revise.",
      },
      { status: 422 }
    );
  }

  const todaySeed = new Date().toISOString().slice(0, 10);
  const selectedIds: string[] = [];
  const selectedSet = new Set<string>();
  const fallbackQuestions: QuestionRow[] = [];

  for (const topic of weakestTopics) {
    const preferredDifficulties = difficultyBand(topic.mastery_score);
    const { data: preferred, error: preferredError } = await supabaseAdmin
      .from("questions")
      .select("id, source_id, difficulty")
      .eq("course_slug", topic.course_slug)
      .eq("topic_slug", topic.topic_slug)
      .eq("is_active", true)
      .in("difficulty", preferredDifficulties);

    if (preferredError) {
      console.error("[worksheets/adaptive] preferred question query failed", {
        userId: user.id,
        topic,
        message: preferredError.message,
      });
      return NextResponse.json(
        { error: "Could not load revision questions. Please try again." },
        { status: 500 }
      );
    }

    const shuffledPreferred = stableDailyShuffle(
      (preferred ?? []) as QuestionRow[],
      `${user.id}:${todaySeed}:${topic.course_slug}:${topic.topic_slug}:preferred`
    );

    for (const question of shuffledPreferred.slice(0, 4)) {
      if (selectedSet.has(question.id)) continue;
      selectedIds.push(question.id);
      selectedSet.add(question.id);
    }

    const { data: fallback, error: fallbackError } = await supabaseAdmin
      .from("questions")
      .select("id, source_id, difficulty")
      .eq("course_slug", topic.course_slug)
      .eq("topic_slug", topic.topic_slug)
      .eq("is_active", true);

    if (fallbackError) {
      console.error("[worksheets/adaptive] fallback question query failed", {
        userId: user.id,
        topic,
        message: fallbackError.message,
      });
      return NextResponse.json(
        { error: "Could not load revision questions. Please try again." },
        { status: 500 }
      );
    }

    fallbackQuestions.push(...((fallback ?? []) as QuestionRow[]));
  }

  if (selectedIds.length < 10) {
    const shuffledFallback = stableDailyShuffle(
      fallbackQuestions,
      `${user.id}:${todaySeed}:fallback`
    );

    for (const question of shuffledFallback) {
      if (selectedIds.length >= 10) break;
      if (selectedSet.has(question.id)) continue;
      selectedIds.push(question.id);
      selectedSet.add(question.id);
    }
  }

  const finalQuestionIds = selectedIds.slice(0, 10);

  if (finalQuestionIds.length < 8) {
    return NextResponse.json(
      {
        error:
          "Not enough active questions are seeded for your weakest topics yet.",
      },
      { status: 422 }
    );
  }

  const studentName = await getStudentName(user.id);
  const topicTitles = weakestTopics.map((topic) => displayTopic(topic.topic_slug));
  const primaryCourseSlug = weakestTopics[0].course_slug;

  const { data: worksheet, error: worksheetError } = await supabaseAdmin
    .from("worksheets")
    .insert({
      created_by: user.id,
      title: `Revision worksheet: ${topicTitles.slice(0, 2).join(", ")}`,
      year_level: primaryCourseSlug,
      topic_config: {
        type: "adaptive",
        source: "student_mastery",
        topics: weakestTopics.map((topic) => ({
          course_slug: topic.course_slug,
          topic_slug: topic.topic_slug,
          mastery_score: topic.mastery_score,
          preferred_difficulties: difficultyBand(topic.mastery_score),
        })),
      },
      assigned_to_user: user.id,
      assigned_student_name: studentName,
      assigned_student_email: user.email?.toLowerCase() ?? null,
      status: "active",
    })
    .select("id, share_token")
    .single();

  if (worksheetError || !worksheet) {
    console.error("[worksheets/adaptive] worksheet insert failed", {
      userId: user.id,
      message: worksheetError?.message,
    });
    return NextResponse.json(
      { error: "Could not create your revision worksheet." },
      { status: 500 }
    );
  }

  const worksheetQuestionRows = finalQuestionIds.map((questionId, index) => ({
    worksheet_id: worksheet.id,
    question_id: questionId,
    position: index,
  }));

  const { error: worksheetQuestionsError } = await supabaseAdmin
    .from("worksheet_questions")
    .insert(worksheetQuestionRows);

  if (worksheetQuestionsError) {
    console.error("[worksheets/adaptive] worksheet_questions insert failed", {
      worksheetId: worksheet.id,
      userId: user.id,
      message: worksheetQuestionsError.message,
    });
    await supabaseAdmin.from("worksheets").delete().eq("id", worksheet.id);
    return NextResponse.json(
      { error: "Could not attach questions to your revision worksheet." },
      { status: 500 }
    );
  }

  void trackEvent({
    userId: user.id,
    eventName: "adaptive_worksheet_generated",
    metadata: {
      questionCount: finalQuestionIds.length,
      courseSlug: primaryCourseSlug,
      topics: topicTitles,
    },
  });

  return NextResponse.json({
    worksheetId: worksheet.id,
    shareToken: worksheet.share_token,
    href: `/worksheet/${worksheet.share_token}`,
    questionCount: finalQuestionIds.length,
    topics: topicTitles,
  });
}
