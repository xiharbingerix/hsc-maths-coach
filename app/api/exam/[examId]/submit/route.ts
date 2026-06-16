import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { getExamPaper } from "../../../../../lib/exams";
import { scoreExam } from "../../../../../lib/exams/scoreExam";

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

  const paper = getExamPaper(examId);
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
  return NextResponse.json(result);
}
