import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getResend } from "../../../../lib/resend";
import { computeDigestData } from "../../../../lib/digest/computeDigestData";
import {
  buildWeeklyDigest,
  hasDigestActivity,
} from "../../../../lib/digest/buildWeeklyDigest";

export const runtime = "nodejs";

const MAX_SENDS_PER_RUN = 200;
const DIGEST_WEEKDAY = 0; // Sunday (UTC)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novamaths.com.au";

type ProfileRow = {
  id: string;
  email: string | null;
  student_first_name: string | null;
};
type AccessRow = { user_id: string; status: string | null };

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  // Auth required even for dry runs (the response references real student data).
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const dryRun = url.searchParams.get("dryRun") === "1";
  const force = url.searchParams.get("force") === "1";
  const enabled = process.env.DIGEST_ENABLED === "true";

  // Real sends require the explicit enable flag. Dry runs are always allowed.
  if (!dryRun && !enabled) {
    return NextResponse.json({ skipped: "DIGEST_ENABLED is not 'true'" });
  }
  // Weekday gate so a daily cron sends once a week. Bypassed by dryRun/force.
  const weekday = new Date().getUTCDay();
  if (!dryRun && !force && weekday !== DIGEST_WEEKDAY) {
    return NextResponse.json({ skipped: "not digest day", weekday });
  }

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError) {
    return NextResponse.json(
      { error: `Could not load users: ${usersError.message}` },
      { status: 500 }
    );
  }
  const users = (usersData?.users ?? []).filter((u) => u.email);
  const userIds = users.map((u) => u.id);
  if (userIds.length === 0) {
    return NextResponse.json({ candidates: 0, sent: 0 });
  }

  const [profilesResult, accessResult] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("id,email,student_first_name")
      .in("id", userIds),
    supabaseAdmin.from("user_access").select("user_id,status").eq("status", "active"),
  ]);

  const profilesById = new Map(
    ((profilesResult.data ?? []) as ProfileRow[]).map((p) => [p.id, p])
  );
  const activeIds = new Set(
    ((accessResult.data ?? []) as AccessRow[]).map((r) => r.user_id)
  );

  const candidates = users
    .filter((u) => activeIds.has(u.id))
    .slice(0, MAX_SENDS_PER_RUN);

  let sent = 0;
  let skippedNoActivity = 0;
  let failed = 0;
  const samples: Array<{ to: string; subject: string; preview: string }> = [];

  for (const user of candidates) {
    const profile = profilesById.get(user.id);
    const to = profile?.email ?? user.email;
    if (!to) continue;

    const data = await computeDigestData(
      user.id,
      profile?.student_first_name ?? "",
      SITE_URL
    );
    if (!hasDigestActivity(data)) {
      skippedNoActivity += 1;
      continue;
    }

    const { subject, html, text } = buildWeeklyDigest(data);

    if (dryRun) {
      if (samples.length < 3) {
        samples.push({ to, subject, preview: text.slice(0, 280) });
      }
      continue;
    }

    try {
      await getResend().emails.send({
        from: "Nova Maths <hello@novamaths.com.au>",
        to,
        subject,
        html,
        text,
      });
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error("[send-weekly-digest] send failed", { userId: user.id, error });
    }
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      candidates: candidates.length,
      wouldSend: candidates.length - skippedNoActivity,
      skippedNoActivity,
      samples,
    });
  }
  return NextResponse.json({
    candidates: candidates.length,
    sent,
    skippedNoActivity,
    failed,
  });
}
