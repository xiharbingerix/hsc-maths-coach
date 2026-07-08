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

type SubtopicMasteryRow = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  mastery_score: number;
};

type QuestionRow = {
  id: string;
  source_id: string | null;
  difficulty: number;
  subtopic_slug: string;
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

  // Fetch subtopic mastery for the weakest topics in one query
  const { data: subtopicMasteryData } = await supabaseAdmin
    .from("student_subtopic_mastery")
    .select("course_slug, topic_slug, subtopic_slug, mastery_score")
    .eq("user_id", user.id)
    .in(
      "topic_slug",
      weakestTopics.map((t) => t.topic_slug)
    )
    .order("mastery_score", { ascending: true });

  const subtopicMasteryRows = (subtopicMasteryData ?? []) as SubtopicMasteryRow[];

  // Bottom 3 subtopics per topic (already ordered ascending by mastery_score)
  const weakSubtopicsByTopic = new Map<string, string[]>();
  for (const topic of weakestTopics) {
    const topicSubtopics = subtopicMasteryRows
      .filter(
        (s) =>
          s.course_slug === topic.course_slug &&
          s.topic_slug === topic.topic_slug
      )
      .slice(0, 3)
      .map((s) => s.subtopic_slug);
    weakSubtopicsByTopic.set(topic.topic_slug, topicSubtopics);
  }

  const todaySeed = new Date().toISOString().slice(0, 10);
  const selectedIds: string[] = [];
  const selectedSet = new Set<string>();
  const fallbackQuestions: QuestionRow[] = [];

  // One query per topic (all active questions), fired in parallel; the
  // weak-subtopic and preferred-difficulty phases are subsets of that result,
  // so they filter in memory instead of extra round-trips. The seeded shuffle
  // is order-independent, so selection is unchanged.
  const topicResults = await Promise.all(
    weakestTopics.map((topic) =>
      supabaseAdmin
        .from("questions")
        .select("id, source_id, difficulty, subtopic_slug")
        .eq("course_slug", topic.course_slug)
        .eq("topic_slug", topic.topic_slug)
        .eq("is_active", true)
    )
  );

  for (const [topicIndex, topic] of weakestTopics.entries()) {
    const { data: topicData, error: topicError } = topicResults[topicIndex];

    if (topicError) {
      console.error("[worksheets/adaptive] topic question query failed", {
        userId: user.id,
        topic,
        message: topicError.message,
      });
      return NextResponse.json(
        { error: "Could not load revision questions. Please try again." },
        { status: 500 }
      );
    }

    const topicQuestions = (topicData ?? []) as QuestionRow[];
    const preferredDifficulties = difficultyBand(topic.mastery_score);
    const weakSubtopics = weakSubtopicsByTopic.get(topic.topic_slug) ?? [];
    const topicSeed = `${user.id}:${todaySeed}:${topic.course_slug}:${topic.topic_slug}`;
    const weakTarget = Math.ceil(4 * 0.65); // 3 questions from weak subtopics
    let topicQuestionCount = 0;

    // Phase 1: preferred difficulty + weak subtopics
    if (weakSubtopics.length > 0) {
      const weakPreferred = topicQuestions.filter(
        (question) =>
          weakSubtopics.includes(question.subtopic_slug) &&
          preferredDifficulties.includes(question.difficulty)
      );

      const shuffledWeak = stableDailyShuffle(
        weakPreferred,
        `${topicSeed}:weak-preferred`
      );

      for (const question of shuffledWeak) {
        if (topicQuestionCount >= weakTarget) break;
        if (selectedSet.has(question.id)) continue;
        selectedIds.push(question.id);
        selectedSet.add(question.id);
        topicQuestionCount++;
      }
    }

    // Phase 2: fill remaining from all subtopics at preferred difficulty
    const preferred = topicQuestions.filter((question) =>
      preferredDifficulties.includes(question.difficulty)
    );

    const shuffledPreferred = stableDailyShuffle(
      preferred,
      `${topicSeed}:preferred`
    );

    for (const question of shuffledPreferred) {
      if (topicQuestionCount >= 4) break;
      if (selectedSet.has(question.id)) continue;
      selectedIds.push(question.id);
      selectedSet.add(question.id);
      topicQuestionCount++;
    }

    fallbackQuestions.push(...topicQuestions);
  }

  const allWeakSubtopics = [
    ...new Set([...weakSubtopicsByTopic.values()].flat()),
  ];

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
    prioritisedSubtopics: allWeakSubtopics.length > 0 ? allWeakSubtopics : undefined,
  });
}
