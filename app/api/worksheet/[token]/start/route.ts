import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type StartBody = {
  studentName?: string;
};

async function getUserIdFromRequest(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;

  return data.user.id;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: StartBody = {};
  try {
    body = (await request.json()) as StartBody;
  } catch {
    body = {};
  }

  const studentName =
    typeof body.studentName === "string" && body.studentName.trim()
      ? body.studentName.trim().slice(0, 120)
      : null;

  if (!token) {
    return NextResponse.json({ error: "Invalid worksheet link." }, { status: 400 });
  }

  // Verify the worksheet exists and is not expired
  const { data: worksheet, error: wsError } = await supabaseAdmin
    .from("worksheets")
    .select("id, expires_at, assigned_student_name, assigned_to_user")
    .eq("share_token", token)
    .maybeSingle();

  if (wsError || !worksheet) {
    return NextResponse.json(
      { error: "Worksheet not found. Check the link and try again." },
      { status: 404 }
    );
  }

  if (worksheet.expires_at && new Date(worksheet.expires_at) < new Date()) {
    return NextResponse.json(
      { error: "This worksheet link has expired." },
      { status: 410 }
    );
  }

  const authUserId = await getUserIdFromRequest(request);
  // Fall back to the assigned user so mastery is recorded even when the
  // student opens the link without being logged in.
  const assignedUserId =
    typeof worksheet.assigned_to_user === "string" && worksheet.assigned_to_user
      ? worksheet.assigned_to_user
      : null;
  const userId = authUserId ?? assignedUserId;
  const resolvedStudentName =
    studentName ??
    (typeof worksheet.assigned_student_name === "string" &&
    worksheet.assigned_student_name.trim()
      ? worksheet.assigned_student_name.trim().slice(0, 120)
      : null);

  // Shared links still work anonymously; logged-in attempts are tied to the user.
  const { data: attempt, error: insertError } = await supabaseAdmin
    .from("worksheet_attempts")
    .insert({
      worksheet_id: worksheet.id,
      user_id: userId,
      share_token: token,
      student_name: resolvedStudentName,
    })
    .select("id")
    .single();

  if (insertError || !attempt) {
    console.error("[worksheet/start] insert failed", {
      token,
      message: insertError?.message,
    });
    return NextResponse.json(
      { error: "Could not start worksheet. Please reload and try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ attemptId: attempt.id });
}
