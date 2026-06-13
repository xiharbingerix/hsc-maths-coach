import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { getSiteUrl } from "../../../../../lib/stripe";
import {
  isDifficultyPreset,
  loadApprovedWorksheetQuestions,
  selectWorksheetQuestions,
} from "../../../../../lib/worksheetGeneration";

export const runtime = "nodejs";

type GenerateBody = {
  title?: string;
  courseSlug?: string;
  topicSlugs?: string[];
  preset?: string;
  totalQuestions?: number;
  questionIds?: string[];
  assignedStudentName?: string;
  assignedStudentEmail?: string;
  dueAt?: string;
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

function normaliseOptionalText(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, maxLength)
    : null;
}

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

  const {
    title,
    courseSlug,
    topicSlugs,
    preset,
    totalQuestions,
    questionIds,
    assignedStudentName,
    assignedStudentEmail,
    dueAt,
    includeMultiPart,
  } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
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

  const trimmedStudentName = normaliseOptionalText(assignedStudentName, 120);
  const trimmedStudentEmail = normaliseOptionalText(
    typeof assignedStudentEmail === "string"
      ? assignedStudentEmail.toLowerCase()
      : assignedStudentEmail,
    180
  );
  const parsedDueAt =
    typeof dueAt === "string" && dueAt.trim() ? new Date(dueAt) : null;
  if (parsedDueAt && Number.isNaN(parsedDueAt.getTime())) {
    return NextResponse.json({ error: "Due date is invalid." }, { status: 400 });
  }

  const approvedQuestionIds = Array.isArray(questionIds)
    ? questionIds.filter((id) => typeof id === "string" && id.trim())
    : [];
  if (approvedQuestionIds.length > 50) {
    return NextResponse.json(
      { error: "Question count must be between 1 and 50." },
      { status: 400 }
    );
  }

  let selectedQuestionIds: string[];
  try {
    selectedQuestionIds =
      approvedQuestionIds.length > 0
        ? await loadApprovedWorksheetQuestions(approvedQuestionIds)
        : (
            await selectWorksheetQuestions({
              courseSlug,
              topicSlugs,
              preset,
              totalQuestions: count,
              includeMultiPart: includeMultiPart === true,
            })
          ).map((question) => question.id);
  } catch (error) {
    console.error("[worksheets/generate] questions query failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Could not query questions. Check the database." },
      { status: 500 }
    );
  }

  if (
    approvedQuestionIds.length > 0 &&
    selectedQuestionIds.length !== approvedQuestionIds.length
  ) {
    return NextResponse.json(
      { error: "One or more preview questions are no longer available." },
      { status: 422 }
    );
  }

  if (selectedQuestionIds.length === 0) {
    return NextResponse.json(
      {
        error:
          "No active questions found for the selected course and topic(s). Apply the migration and run the seed script first.",
      },
      { status: 422 }
    );
  }

  const { data: worksheet, error: worksheetError } = await supabaseAdmin
    .from("worksheets")
    .insert({
      title: title.trim(),
      year_level: courseSlug,
      topic_config: {
        course_slug: courseSlug,
        topic_slugs: topicSlugs,
        preset,
        preview_approved: approvedQuestionIds.length > 0,
      },
      assigned_student_name: trimmedStudentName,
      assigned_student_email: trimmedStudentEmail,
      due_at: parsedDueAt ? parsedDueAt.toISOString() : null,
      status: "active",
    })
    .select("id, share_token")
    .single();

  if (worksheetError || !worksheet) {
    console.error("[worksheets/generate] worksheet insert failed", {
      message: worksheetError?.message,
    });
    return NextResponse.json(
      { error: "Could not create worksheet." },
      { status: 500 }
    );
  }

  const worksheetQuestionRows = selectedQuestionIds.map((questionId, index) => ({
    worksheet_id: worksheet.id,
    question_id: questionId,
    position: index,
  }));

  const { error: worksheetQuestionsError } = await supabaseAdmin
    .from("worksheet_questions")
    .insert(worksheetQuestionRows);

  if (worksheetQuestionsError) {
    console.error("[worksheets/generate] worksheet_questions insert failed", {
      worksheetId: worksheet.id,
      message: worksheetQuestionsError.message,
    });
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
    questionCount: selectedQuestionIds.length,
    courseSlug,
    topicSlugs,
    preset,
    usedPreview: approvedQuestionIds.length > 0,
  });

  return NextResponse.json({
    worksheetId: worksheet.id,
    shareToken,
    shareUrl,
    questionCount: selectedQuestionIds.length,
  });
}
