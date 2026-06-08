import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type StartBody = {
  studentName?: string;
};

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
    .select("id, expires_at")
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

  // Create a new attempt (anonymous — user_id is null)
  const { data: attempt, error: insertError } = await supabaseAdmin
    .from("worksheet_attempts")
    .insert({
      worksheet_id: worksheet.id,
      user_id: null,
      share_token: token,
      student_name: studentName,
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
