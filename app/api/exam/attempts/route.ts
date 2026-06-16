import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export type ExamAttemptRow = {
  exam_id: string;
  course_slug: string | null;
  marks_earned: number;
  marks_available: number;
  percentage: number;
  band: string;
  created_at: string;
};

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ attempts: [] });
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
    return NextResponse.json({ attempts: [] });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("exam_attempts")
      .select(
        "exam_id,course_slug,marks_earned,marks_available,percentage,band,created_at"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) {
      // Table not applied yet — degrade quietly.
      return NextResponse.json({ attempts: [] });
    }
    return NextResponse.json({ attempts: (data ?? []) as ExamAttemptRow[] });
  } catch {
    return NextResponse.json({ attempts: [] });
  }
}
