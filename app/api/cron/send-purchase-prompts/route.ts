import { NextResponse } from "next/server";
import { sendPurchasePromptEmail } from "../../../../lib/purchasePromptEmail";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const RECOVERY_REASON = "signup_no_payment";
const MINUTES_AFTER_SIGNUP = 30;
const MAX_SENDS_PER_RUN = 20;

type ProfileRow = {
  id: string;
  email: string | null;
  student_first_name: string | null;
};

type PaymentRow = {
  user_id: string | null;
  parent_email: string | null;
  offer_selected: string | null;
  payment_status: string | null;
};

type SentPromptRow = {
  user_id: string;
  reason: string | null;
};

type AccessRow = {
  user_id: string;
  status: string | null;
  access_type: string | null;
};

function isAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(
    Date.now() - MINUTES_AFTER_SIGNUP * 60 * 1000,
  ).toISOString();

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (usersError) {
    return NextResponse.json(
      { error: `Could not load users: ${usersError.message}` },
      { status: 500 },
    );
  }

  const users = (usersData?.users ?? []).filter(
    (user) => user.email && user.created_at && user.created_at <= cutoff,
  );
  const userIds = users.map((user) => user.id);

  if (userIds.length === 0) {
    return NextResponse.json({ checked: 0, sent: 0 });
  }

  const [profilesResult, paymentsResult, sentPromptsResult, accessResult] =
    await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id,email,student_first_name")
        .in("id", userIds),
      supabaseAdmin
        .from("payments")
        .select("user_id,parent_email,offer_selected,payment_status")
        .eq("offer_selected", "online-learning")
        .eq("payment_status", "paid"),
      supabaseAdmin
        .from("signup_recovery_emails")
        .select("user_id,reason")
        .eq("reason", RECOVERY_REASON),
      supabaseAdmin
        .from("user_access")
        .select("user_id,status,access_type")
        .eq("access_type", "online_learning_beta")
        .eq("status", "active"),
    ]);

  if (profilesResult.error) {
    return NextResponse.json(
      { error: `Could not load profiles: ${profilesResult.error.message}` },
      { status: 500 },
    );
  }

  if (paymentsResult.error) {
    return NextResponse.json(
      { error: `Could not load payments: ${paymentsResult.error.message}` },
      { status: 500 },
    );
  }

  if (sentPromptsResult.error) {
    return NextResponse.json(
      {
        error: `Could not load sent recovery emails: ${sentPromptsResult.error.message}`,
      },
      { status: 500 },
    );
  }

  if (accessResult.error) {
    return NextResponse.json(
      { error: `Could not load user access: ${accessResult.error.message}` },
      { status: 500 },
    );
  }

  const profilesById = new Map(
    ((profilesResult.data ?? []) as ProfileRow[]).map((profile) => [
      profile.id,
      profile,
    ]),
  );
  const paidPayments = (paymentsResult.data ?? []) as PaymentRow[];
  const sentPromptUserIds = new Set(
    ((sentPromptsResult.data ?? []) as SentPromptRow[]).map(
      (row) => row.user_id,
    ),
  );
  const activeAccessUserIds = new Set(
    ((accessResult.data ?? []) as AccessRow[]).map((row) => row.user_id),
  );

  const candidates = users
    .filter((user) => {
      if (sentPromptUserIds.has(user.id)) return false;
      if (activeAccessUserIds.has(user.id)) return false;

      const hasPaidOnlineLearning = paidPayments.some(
        (payment) =>
          payment.user_id === user.id ||
          (payment.user_id === null && payment.parent_email === user.email),
      );

      return !hasPaidOnlineLearning;
    })
    .slice(0, MAX_SENDS_PER_RUN);

  const sentUserIds: string[] = [];
  const failedUserIds: string[] = [];

  for (const user of candidates) {
    const profile = profilesById.get(user.id);
    const toEmail = profile?.email ?? user.email;

    if (!toEmail) continue;

    try {
      await sendPurchasePromptEmail({
        toEmail,
        studentName:
          profile?.student_first_name ??
          String(user.user_metadata?.student_first_name ?? ""),
      });

      const { error: insertError } = await supabaseAdmin
        .from("signup_recovery_emails")
        .insert({
          user_id: user.id,
          email: toEmail,
          reason: RECOVERY_REASON,
        });

      if (insertError) {
        throw insertError;
      }

      sentUserIds.push(user.id);
    } catch (error) {
      console.error("Could not send signup recovery email", {
        userId: user.id,
        error,
      });
      failedUserIds.push(user.id);
    }
  }

  return NextResponse.json({
    checked: users.length,
    eligible: candidates.length,
    sent: sentUserIds.length,
    failed: failedUserIds.length,
  });
}
