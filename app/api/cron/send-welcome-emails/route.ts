import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "../../../../lib/welcomeEmail";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const WELCOME_REASON = "welcome_day0";
const MIN_MINUTES_AFTER_SIGNUP = 10;
const MAX_MINUTES_AFTER_SIGNUP = 60 * 24 * 2; // 2 days cap
const MAX_SENDS_PER_RUN = 20;

type ProfileRow = {
  id: string;
  email: string | null;
  student_first_name: string | null;
  selected_course_slug: string | null;
};

type SentRow = {
  user_id: string;
};

function isAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const minCutoff = new Date(now - MIN_MINUTES_AFTER_SIGNUP * 60 * 1000).toISOString();
  const maxCutoff = new Date(now - MAX_MINUTES_AFTER_SIGNUP * 60 * 1000).toISOString();

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (usersError) {
    return NextResponse.json(
      { error: `Could not load users: ${usersError.message}` },
      { status: 500 }
    );
  }

  const users = (usersData?.users ?? []).filter(
    (u) =>
      u.email &&
      u.created_at &&
      u.created_at <= minCutoff &&
      u.created_at >= maxCutoff
  );

  if (users.length === 0) {
    return NextResponse.json({ checked: 0, sent: 0 });
  }

  const userIds = users.map((u) => u.id);

  const [profilesResult, sentResult] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("id,email,student_first_name,selected_course_slug")
      .in("id", userIds),
    supabaseAdmin
      .from("signup_recovery_emails")
      .select("user_id")
      .eq("reason", WELCOME_REASON)
      .in("user_id", userIds),
  ]);

  if (profilesResult.error) {
    return NextResponse.json(
      { error: `Could not load profiles: ${profilesResult.error.message}` },
      { status: 500 }
    );
  }

  const profilesById = new Map(
    ((profilesResult.data ?? []) as ProfileRow[]).map((p) => [p.id, p])
  );
  const alreadySent = new Set(
    ((sentResult.data ?? []) as SentRow[]).map((r) => r.user_id)
  );

  const candidates = users
    .filter((u) => !alreadySent.has(u.id))
    .slice(0, MAX_SENDS_PER_RUN);

  const sentIds: string[] = [];
  const failedIds: string[] = [];

  for (const user of candidates) {
    const profile = profilesById.get(user.id);
    const toEmail = profile?.email ?? user.email;
    if (!toEmail) continue;

    try {
      await sendWelcomeEmail({
        toEmail,
        studentName:
          profile?.student_first_name ??
          String(user.user_metadata?.student_first_name ?? ""),
        courseSlug: profile?.selected_course_slug ?? null,
      });

      const { error: insertError } = await supabaseAdmin
        .from("signup_recovery_emails")
        .insert({ user_id: user.id, email: toEmail, reason: WELCOME_REASON });

      if (insertError) throw insertError;

      sentIds.push(user.id);
    } catch (err) {
      console.error("[send-welcome-emails] failed", {
        userId: user.id,
        error: err,
      });
      failedIds.push(user.id);
    }
  }

  return NextResponse.json({
    checked: users.length,
    eligible: candidates.length,
    sent: sentIds.length,
    failed: failedIds.length,
  });
}
