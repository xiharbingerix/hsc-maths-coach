import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { getExamPaper } from "../../../../../lib/exams";
import { scoreExam } from "../../../../../lib/exams/scoreExam";
import {
  getTopicTestPaper,
  parseTopicTestId,
} from "../../../../../lib/topicTests";
import {
  recordMasteryEvents,
  type MasteryEventInput,
} from "../../../../../lib/mastery/updateMastery";

export const runtime = "nodejs";

type SubmitBody = {
  answers?: Record<string, string>;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;

  // Require a signed-in student.
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Sign in to submit." }, { status: 401 });
  }
  let userId: string | null = null;
  try {
    const token = authorization.slice("Bearer ".length);
    const { data } = await supabaseAdmin.auth.getUser(token);
    userId = data.user?.id ?? null;
  } catch {
    userId = null;
  }
  if (!userId) {
    return NextResponse.json({ error: "Sign in to submit." }, { status: 401 });
  }

  // Topic tests have a dynamic, deterministic id (topic-test:course:topic:seed);
  // static papers come from the registry.
  const topicTest = parseTopicTestId(examId);
  const paper = topicTest ? getTopicTestPaper(examId) : getExamPaper(examId);
  if (!paper) {
    return NextResponse.json({ error: "Exam not found." }, { status: 404 });
  }

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const answers =
    body.answers && typeof body.answers === "object" ? body.answers : {};
  // Coerce all values to strings defensively.
  const safeAnswers: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    safeAnswers[k] = typeof v === "string" ? v : String(v ?? "");
  }

  const result = await scoreExam(paper, safeAnswers);

  // Persist the attempt (graceful — never block the result if the table isn't
  // applied yet or the insert fails).
  try {
    await supabaseAdmin.from("exam_attempts").insert({
      user_id: userId,
      exam_id: examId,
      course_slug: paper.courseSlug,
      marks_earned: result.marksEarned,
      marks_available: result.marksAvailable,
      percentage: result.percentage,
      band: result.band,
      topic_breakdown: result.topicBreakdown,
    });
  } catch (error) {
    console.error("[exam/submit] could not save attempt", error);
  }

  // Topic tests feed subtopic mastery so the dashboard "Where they're at" card
  // and study plan update. The parent topic comes from the id; each question's
  // subtopic was stamped onto it by the assembler.
  if (topicTest) {
    try {
      const meta = new Map(
        paper.sections
          .flatMap((s) => s.questions)
          .map((q) => [
            q.id,
            { subtopicSlug: q.subtopicSlug ?? null, difficulty: q.difficulty },
          ])
      );
      const sourceId = crypto.randomUUID();
      const events: MasteryEventInput[] = [];
      for (const r of result.questions) {
        const m = meta.get(r.id);
        if (!m?.subtopicSlug) continue;
        events.push({
          userId,
          sourceType: "quiz",
          sourceId,
          questionId: crypto.randomUUID(),
          sourceQuestionId: r.id,
          courseSlug: topicTest.courseSlug,
          topicSlug: topicTest.topicSlug,
          subtopicSlug: m.subtopicSlug,
          difficulty: m.difficulty,
          isCorrect: r.correct,
        });
      }
      if (events.length > 0) await recordMasteryEvents(events);
    } catch (error) {
      console.error("[exam/submit] could not record topic-test mastery", error);
    }
  }

  return NextResponse.json(result);
}
