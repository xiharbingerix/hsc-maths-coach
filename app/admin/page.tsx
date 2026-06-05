import Link from "next/link";
import { revalidatePath } from "next/cache";
import { AdminGoogleAdsTestConversion } from "./AdminGoogleAdsTestConversion";
import { DeleteUserForm } from "./DeleteUserForm";
import { requireAdmin } from "../../lib/adminSession";
import {
  availableCourseLessonTargets,
  type CourseLessonTarget,
} from "../../lib/courseLessonTargets";
import { scoreDiagnostic } from "../../lib/diagnosticScoring";
import type { DiagnosticSubmission } from "../../lib/reportTypes";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { sendPurchasePromptEmail } from "../../lib/purchasePromptEmail";

// ─── Types ────────────────────────────────────────────────────────────────────

type BetaAccessStatus = "pending" | "active" | "revoked";

type BetaAccessRow = {
  id: string;
  user_id: string;
  access_type: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name?: string | null;
  student_name?: string | null;
  student_first_name: string | null;
  parent_email: string | null;
};

type AdminAuthUser = {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string | null;
  email_confirmed_at?: string | null;
  user_metadata?: {
    full_name?: string;
    name?: string;
    student_name?: string;
    student_first_name?: string;
    parent_email?: string;
  };
};

type StudentUserRow = {
  user: AdminAuthUser;
  profile?: ProfileRow;
  access?: BetaAccessRow;
};

type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

type EnquiryRow = {
  id: string;
  created_at: string | null;
  offer_selected: string | null;
  student_first_name: string | null;
  parent_first_name: string | null;
  parent_email: string | null;
  year_level: string | null;
  course: string | null;
  message: string | null;
  status: string | null;
};

type PaymentRow = {
  id: string;
  created_at: string | null;
  user_id: string | null;
  parent_email: string | null;
  student_first_name: string | null;
  offer_selected: string | null;
  stripe_checkout_session_id: string | null;
  stripe_subscription_id: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  subscription_status: string | null;
  access_status: string | null;
};

type CheckoutFunnelEventRow = {
  id: string;
  user_id: string | null;
  offer_selected: string | null;
  stripe_checkout_session_id: string | null;
  created_at: string | null;
};

type LessonProgressAdminRow = {
  user_id: string;
  course_slug: string;
  unit_slug: string;
  lesson_slug: string;
  passed: boolean;
  last_score: number | string | null;
  completed_stages: string[] | null;
  updated_at: string | null;
};

const betaAccessStatuses: BetaAccessStatus[] = ["pending", "active", "revoked"];
const enquiryStatuses: EnquiryStatus[] = ["new", "contacted", "converted", "closed"];

// ─── Server actions ───────────────────────────────────────────────────────────

async function ensureProfileAndAccess(
  userId: string,
  email: string | null | undefined,
) {
  const { data: existingProfile, error: profileReadError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (profileReadError) throw new Error(profileReadError.message);

  if (!existingProfile) {
    const { error: profileInsertError } = await supabaseAdmin
      .from("profiles")
      .insert({ id: userId, email: email ?? null, role: "student" });
    if (profileInsertError) throw new Error(profileInsertError.message);
  }

  const { data: existingAccess, error: accessReadError } = await supabaseAdmin
    .from("user_access")
    .select("id")
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta")
    .maybeSingle();

  if (accessReadError) throw new Error(accessReadError.message);

  if (!existingAccess) {
    const { error: accessInsertError } = await supabaseAdmin
      .from("user_access")
      .insert({
        user_id: userId,
        access_type: "online_learning_beta",
        status: "pending",
      });
    if (accessInsertError) throw new Error(accessInsertError.message);
  }
}

async function ensureProfileAccess(formData: FormData) {
  "use server";
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const email = String(formData.get("email") ?? "");
  if (!userId) throw new Error("Missing user id.");
  await ensureProfileAndAccess(userId, email || null);
  revalidatePath("/admin");
}

async function setStudentAccessStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const email = String(formData.get("email") ?? "");
  const status = String(formData.get("status") ?? "") as BetaAccessStatus;
  if (!userId || !betaAccessStatuses.includes(status)) {
    throw new Error("Invalid student access status update.");
  }
  await ensureProfileAndAccess(userId, email || null);
  const { error } = await supabaseAdmin
    .from("user_access")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta");
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

async function deleteTestUser(formData: FormData) {
  "use server";
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId) throw new Error("Missing user id.");
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

async function updateEnquiryStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as EnquiryStatus;
  if (!id || !enquiryStatuses.includes(status)) {
    throw new Error("Invalid enquiry status update.");
  }
  const { error } = await supabaseAdmin
    .from("enquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

async function sendPurchasePrompt(formData: FormData) {
  "use server";
  await requireAdmin();

  const toEmail = String(formData.get("email") ?? "").trim();
  const studentName = String(formData.get("studentName") ?? "").trim();
  if (!toEmail) throw new Error("Missing email.");

  await sendPurchasePromptEmail({
    toEmail,
    studentName,
  });
}
// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(new Date(value));
}

function formatOptionalDateTime(value: string | null | undefined) {
  if (!value) return "—";
  return formatDateTime(value);
}

function formatDateGroup(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
    timeZone: "Australia/Sydney",
  }).format(new Date(value));
}

function formatStatus(value: string | null | undefined) {
  return (value ?? "not_started").replace(/_/g, " ");
}

function formatMoney(cents: number | null, currency: string | null) {
  if (typeof cents !== "number") return "—";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: (currency ?? "aud").toUpperCase(),
  }).format(cents / 100);
}

function formatRevenue(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatScore(score: number | null) {
  return score === null ? "--" : `${Math.round(score * 100)}%`;
}

function numericScore(score: number | string | null) {
  if (score === null) return null;
  const value = Number(score);
  return Number.isFinite(value) ? value : null;
}

function lessonProgressKey({
  courseSlug,
  unitSlug,
  lessonSlug,
}: {
  courseSlug: string;
  unitSlug: string;
  lessonSlug: string;
}) {
  return `${courseSlug}/${unitSlug}/${lessonSlug}`;
}

function progressRowKey(row: LessonProgressAdminRow) {
  return lessonProgressKey({
    courseSlug: row.course_slug,
    unitSlug: row.unit_slug,
    lessonSlug: row.lesson_slug,
  });
}

function shortUserId(userId: string) {
  return userId.length > 8 ? `${userId.slice(0, 8)}...` : userId;
}

function firstPresent(...values: Array<string | null | undefined>) {
  return values
    .map((v) => v?.trim())
    .find((v): v is string => Boolean(v));
}

function studentDisplayName({
  profile,
  authUser,
  submissionName,
  email,
}: {
  profile?: ProfileRow;
  authUser?: AdminAuthUser;
  submissionName?: string | null;
  email?: string | null;
}) {
  return (
    firstPresent(
      profile?.student_name,
      profile?.full_name,
      profile?.student_first_name,
      submissionName,
      authUser?.user_metadata?.student_name,
      authUser?.user_metadata?.full_name,
      authUser?.user_metadata?.name,
      authUser?.user_metadata?.student_first_name,
      profile?.email,
      authUser?.email,
      email,
    ) ?? "Unnamed"
  );
}

function accessStatusClass(status: string | null | undefined) {
  if (status === "active") return "bg-emerald-100 text-emerald-900";
  if (status === "revoked") return "bg-red-100 text-red-800";
  return "bg-amber-100 text-amber-900";
}

function enquiryStatusClass(status: string | null | undefined) {
  if (status === "converted") return "bg-emerald-100 text-emerald-900";
  if (status === "closed") return "bg-slate-200 text-slate-700";
  if (status === "contacted") return "bg-blue-100 text-blue-900";
  return "bg-amber-100 text-amber-900";
}

function paymentStatusClass(status: string | null | undefined) {
  if (status === "paid") return "bg-emerald-100 text-emerald-900";
  if (status === "unpaid" || status === "failed") return "bg-red-100 text-red-800";
  return "bg-slate-100 text-slate-700";
}

function funnelStageClass(stage: string) {
  if (stage === "Mastery passed") return "bg-emerald-100 text-emerald-900";
  if (stage === "Lesson started") return "bg-blue-100 text-blue-900";
  if (stage === "Paid") return "bg-indigo-100 text-indigo-900";
  if (stage === "Checkout started") return "bg-amber-100 text-amber-900";
  return "bg-slate-100 text-slate-700";
}

function groupSubmissionsByDate(submissions: DiagnosticSubmission[]) {
  return submissions.reduce<Record<string, DiagnosticSubmission[]>>(
    (groups, submission) => {
      const key = formatDateGroup(submission.created_at);
      return { ...groups, [key]: [...(groups[key] ?? []), submission] };
    },
    {},
  );
}

// ─── Summary card ─────────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: "amber" | "red" | "emerald";
}) {
  const valueClass =
    highlight === "amber"
      ? "text-amber-700"
      : highlight === "red"
        ? "text-red-700"
        : highlight === "emerald"
          ? "text-emerald-700"
          : "text-slate-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${valueClass}`}>
        {String(value)}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  await requireAdmin();

  // Diagnostic submissions
  const { data, error: submissionsError } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (submissionsError) {
    throw new Error(
      `${submissionsError.message}. If report workflow columns are missing, add report_status, report_notes, follow_up_required, offer_selected, and report_sent_at to diagnostic_submissions.`,
    );
  }

  const submissions = (data ?? []) as DiagnosticSubmission[];
  const groupedSubmissions = groupSubmissionsByDate(submissions);

  // Enquiries
  const { data: enquiriesData, error: enquiriesError } = await supabaseAdmin
    .from("enquiries")
    .select(
      "id,created_at,offer_selected,student_first_name,parent_first_name,parent_email,year_level,course,message,status",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  const enquiries = (enquiriesData ?? []) as EnquiryRow[];

  // Payments (checkout session ID excluded — not useful at a glance)
  const { data: paymentsData, error: paymentsError } = await supabaseAdmin
    .from("payments")
    .select(
      "id,created_at,user_id,parent_email,student_first_name,offer_selected,stripe_checkout_session_id,stripe_subscription_id,amount_total,currency,payment_status,subscription_status,access_status",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const payments = (paymentsData ?? []) as PaymentRow[];

  const { data: checkoutFunnelData, error: checkoutFunnelError } =
    await supabaseAdmin
      .from("checkout_funnel_events")
      .select(
        "id,user_id,offer_selected,stripe_checkout_session_id,created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500);

  const checkoutFunnelEvents = (checkoutFunnelData ??
    []) as CheckoutFunnelEventRow[];

  // Auth users — increased perPage so the user count is accurate
  // Latest persisted lesson progress for internal learning analytics
  const { data: lessonProgressData, error: lessonProgressError } =
    await supabaseAdmin
      .from("lesson_progress")
      .select(
        "user_id,course_slug,unit_slug,lesson_slug,passed,last_score,completed_stages,updated_at",
      )
      .order("updated_at", { ascending: false })
      .limit(1000);

  const lessonProgressRows = (lessonProgressData ??
    []) as LessonProgressAdminRow[];

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  const adminUsers = ((usersData?.users ?? []) as AdminAuthUser[]).filter(
    (u) => u.email,
  );
  const authUserIds = adminUsers.map((u) => u.id);

  // Profiles — single merged query covering all auth users
  const { data: profilesData } =
    authUserIds.length > 0
      ? await supabaseAdmin.from("profiles").select("*").in("id", authUserIds)
      : { data: [] };

  const allProfilesById = new Map(
    ((profilesData ?? []) as ProfileRow[]).map((p) => [p.id, p]),
  );

  // User access keyed by user_id
  const { data: userAccessData } =
    authUserIds.length > 0
      ? await supabaseAdmin
          .from("user_access")
          .select("id,user_id,access_type,status,created_at,updated_at")
          .in("user_id", authUserIds)
          .eq("access_type", "online_learning_beta")
      : { data: [] };

  const userAccessByUserId = new Map(
    ((userAccessData ?? []) as BetaAccessRow[]).map((a) => [a.user_id, a]),
  );

  // Build student rows
  const studentUsers: StudentUserRow[] = adminUsers.map((user) => ({
    user,
    profile: allProfilesById.get(user.id),
    access: userAccessByUserId.get(user.id),
  }));

  // Summary metrics
  const totalUsers = studentUsers.length;
  const activeStudents = studentUsers.filter(
    (u) => u.access?.status === "active",
  ).length;
  const pendingAccessStudents = studentUsers.filter(
    (u) => u.access?.status === "pending",
  );
  const pendingCount = pendingAccessStudents.length;
  const newEnquiryCount = enquiries.filter(
    (e) => (e.status ?? "new") === "new",
  ).length;
  const totalRevenueCents = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + (p.amount_total ?? 0), 0);
  const onlineLearningPayments = payments.filter(
    (payment) => payment.offer_selected === "online-learning",
  );
  const paidOnlineLearningPayments = onlineLearningPayments.filter(
    (payment) => payment.payment_status === "paid",
  );
  const lessonTargetByKey = new Map(
    availableCourseLessonTargets.map((target) => [
      lessonProgressKey(target),
      target,
    ]),
  );
  const lessonScores = lessonProgressRows
    .map((row) => numericScore(row.last_score))
    .filter((score): score is number => score !== null);
  const averageLessonScore =
    lessonScores.length > 0
      ? lessonScores.reduce((sum, score) => sum + score, 0) /
        lessonScores.length
      : null;
  const recentLessonProgress = lessonProgressRows.slice(0, 20);
  const hardestLessonsByKey = new Map<
    string,
    {
      target: CourseLessonTarget;
      attempts: number;
      passes: number;
      scores: number[];
    }
  >();

  lessonProgressRows.forEach((row) => {
    const key = progressRowKey(row);
    const target = lessonTargetByKey.get(key);
    if (!target) return;

    const lessonSummary = hardestLessonsByKey.get(key) ?? {
      target,
      attempts: 0,
      passes: 0,
      scores: [],
    };
    const score = numericScore(row.last_score);
    lessonSummary.attempts += 1;
    if (row.passed) lessonSummary.passes += 1;
    if (score !== null) lessonSummary.scores.push(score);
    hardestLessonsByKey.set(key, lessonSummary);
  });

  const hardestLessons = [...hardestLessonsByKey.values()]
    .filter((lesson) => lesson.attempts >= 2)
    .map((lesson) => ({
      ...lesson,
      averageScore:
        lesson.scores.length > 0
          ? lesson.scores.reduce((sum, score) => sum + score, 0) /
            lesson.scores.length
          : null,
      passRate: lesson.passes / lesson.attempts,
    }))
    .sort(
      (left, right) =>
        left.passRate - right.passRate ||
        (left.averageScore ?? Number.POSITIVE_INFINITY) -
          (right.averageScore ?? Number.POSITIVE_INFINITY),
    )
    .slice(0, 10);

  const onlineLearningCheckoutEvents = checkoutFunnelEvents.filter(
    (event) => event.offer_selected === "online-learning",
  );
  const userHasOnlineLearningCheckout = new Set(
    onlineLearningCheckoutEvents
      .map((event) => event.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  );
  const userHasProgress = new Set(lessonProgressRows.map((row) => row.user_id));
  const userHasMasteryPass = new Set(
    lessonProgressRows.filter((row) => row.passed).map((row) => row.user_id),
  );

  const signupFunnelRows = studentUsers
    .map(({ user, profile, access }) => {
      const userPayments = onlineLearningPayments.filter(
        (payment) =>
          payment.user_id === user.id ||
          (payment.user_id === null && payment.parent_email === user.email),
      );
      const paidPayment = userPayments.find(
        (payment) => payment.payment_status === "paid",
      );
      const checkoutEvent = onlineLearningCheckoutEvents.find(
        (event) => event.user_id === user.id,
      );
      const progressRows = lessonProgressRows.filter(
        (row) => row.user_id === user.id,
      );
      const latestProgress = progressRows[0];
      const hasMasteryPass = progressRows.some((row) => row.passed);
      const stage = hasMasteryPass
        ? "Mastery passed"
        : progressRows.length > 0
          ? "Lesson started"
          : paidPayment
            ? "Paid"
            : checkoutEvent
              ? "Checkout started"
              : "Signed up only";

      return {
        user,
        profile,
        access,
        checkoutEvent,
        paidPayment,
        latestProgress,
        stage,
      };
    })
    .sort(
      (left, right) =>
        new Date(right.user.created_at ?? 0).getTime() -
        new Date(left.user.created_at ?? 0).getTime(),
    );

  const signupFunnelPaidUserIds = new Set(
    signupFunnelRows
      .filter((row) => Boolean(row.paidPayment))
      .map((row) => row.user.id),
  );
  const signupFunnelMetrics = {
    signedUp: studentUsers.length,
    checkoutStarted: userHasOnlineLearningCheckout.size,
    paid: signupFunnelPaidUserIds.size,
    lessonStarted: userHasProgress.size,
    masteryPassed: userHasMasteryPass.size,
    signedUpNotPaid: studentUsers.filter(
      ({ user }) => !signupFunnelPaidUserIds.has(user.id),
    ).length,
    checkoutStartedNotPaid: [...userHasOnlineLearningCheckout].filter(
      (userId) => !signupFunnelPaidUserIds.has(userId),
    ).length,
    paidNoLessonProgress: [...signupFunnelPaidUserIds].filter(
      (userId) => !userHasProgress.has(userId),
    ).length,
  };

  // Alert derivations
  const newEnquiriesList = enquiries.filter(
    (e) => (e.status ?? "new") === "new",
  );
  const paidButNotActive = payments.filter(
    (p) =>
      p.payment_status === "paid" &&
      p.offer_selected === "online-learning" &&
      p.access_status !== "active",
  );
  const hasAlerts =
    pendingAccessStudents.length > 0 ||
    newEnquiriesList.length > 0 ||
    paidButNotActive.length > 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage students, enquiries, payments and diagnostic reports.
            </p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Log out
            </button>
          </form>
        </header>

        {/* ── Summary cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <SummaryCard label="Total users" value={totalUsers} />
          <SummaryCard
            label="Active students"
            value={activeStudents}
            highlight="emerald"
          />
          <SummaryCard
            label="Pending access"
            value={pendingCount}
            highlight={pendingCount > 0 ? "amber" : undefined}
          />
          <SummaryCard
            label="New enquiries"
            value={newEnquiryCount}
            highlight={newEnquiryCount > 0 ? "amber" : undefined}
          />
          <SummaryCard
            label="Recent revenue"
            value={formatRevenue(totalRevenueCents)}
            highlight={totalRevenueCents > 0 ? "emerald" : undefined}
          />
        </div>

        {/* ── Alerts ────────────────────────────────────────────────────── */}
        {hasAlerts && (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-amber-900">
              Action required
            </h2>
            <ul className="mt-3 space-y-3 text-sm">

              {pendingAccessStudents.length > 0 && (
                <li>
                  <p className="font-semibold text-amber-900">
                    {pendingAccessStudents.length} student
                    {pendingAccessStudents.length === 1 ? "" : "s"} waiting for
                    access approval
                  </p>
                  <div className="mt-2 space-y-2">
                    {pendingAccessStudents.map(({ user, profile }) => {
                      const name = studentDisplayName({
                        profile,
                        authUser: user,
                      });
                      return (
                        <div
                          key={user.id}
                          className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/80 px-4 py-2.5"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-slate-900">
                              {name}
                            </span>
                            <span className="ml-2 text-slate-500">
                              {user.email}
                            </span>
                          </div>
                          <form
                            action={setStudentAccessStatus}
                            className="flex gap-2"
                          >
                            <input
                              type="hidden"
                              name="userId"
                              value={user.id}
                            />
                            <input
                              type="hidden"
                              name="email"
                              value={user.email ?? ""}
                            />
                            <button
                              name="status"
                              value="active"
                              type="submit"
                              className="rounded-lg bg-emerald-700 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-800"
                            >
                              Approve
                            </button>
                            <button
                              name="status"
                              value="revoked"
                              type="submit"
                              className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Revoke
                            </button>
                          </form>
                        </div>
                      );
                    })}
                  </div>
                </li>
              )}

              {newEnquiriesList.length > 0 && (
                <li className="rounded-2xl bg-white/80 px-4 py-2.5 text-slate-800">
                  <span className="font-semibold">
                    {newEnquiriesList.length} new enquir
                    {newEnquiriesList.length === 1 ? "y" : "ies"}
                  </span>
                  {" — "}
                  {newEnquiriesList.map((e) => (
                    <span key={e.id} className="mr-2">
                      {e.student_first_name ?? e.parent_email ?? "Unknown"}
                    </span>
                  ))}
                </li>
              )}

              {paidButNotActive.length > 0 && (
                <li className="rounded-2xl bg-white/80 px-4 py-2.5 text-slate-800">
                  <span className="font-semibold">
                    {paidButNotActive.length} online learning payment
                    {paidButNotActive.length === 1 ? "" : "s"} without active
                    access
                  </span>
                  {" — "}
                  {paidButNotActive.map((p) => (
                    <span key={p.id} className="mr-2">
                      {p.parent_email ?? p.student_first_name ?? "Unknown"}
                    </span>
                  ))}
                </li>
              )}

            </ul>
          </section>
        )}

        {/* ── Students table ────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Conversion
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Signup to learning funnel
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Tracks the online-learning path from account creation to Stripe
                checkout, payment, lesson progress and mastery. Checkout-started
                data begins after the checkout_funnel_events migration is
                applied.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {signupFunnelMetrics.signedUp} signup
              {signupFunnelMetrics.signedUp === 1 ? "" : "s"}
            </p>
          </div>

          {checkoutFunnelError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Checkout-started rows could not be loaded:{" "}
              {checkoutFunnelError.message}. Apply{" "}
              <span className="font-mono">
                lib/supabase-migrations/002_checkout_funnel_events.sql
              </span>{" "}
              to enable this middle-funnel signal.
            </div>
          ) : null}

          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-5">
            <SummaryCard label="Signed up" value={signupFunnelMetrics.signedUp} />
            <SummaryCard
              label="Checkout started"
              value={signupFunnelMetrics.checkoutStarted}
              highlight={
                signupFunnelMetrics.checkoutStartedNotPaid > 0
                  ? "amber"
                  : undefined
              }
            />
            <SummaryCard
              label="Paid online"
              value={signupFunnelMetrics.paid}
              highlight={signupFunnelMetrics.paid > 0 ? "emerald" : undefined}
            />
            <SummaryCard
              label="Lesson started"
              value={signupFunnelMetrics.lessonStarted}
            />
            <SummaryCard
              label="Mastery passed"
              value={signupFunnelMetrics.masteryPassed}
            />
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-3">
            <p>
              <span className="font-semibold text-slate-950">
                {signupFunnelMetrics.signedUpNotPaid}
              </span>{" "}
              signed up without a paid online-learning payment.
            </p>
            <p>
              <span className="font-semibold text-slate-950">
                {signupFunnelMetrics.checkoutStartedNotPaid}
              </span>{" "}
              started checkout without a paid online-learning payment.
            </p>
            <p>
              <span className="font-semibold text-slate-950">
                {signupFunnelMetrics.paidNoLessonProgress}
              </span>{" "}
              paid but have no recorded lesson progress.
            </p>
          </div>

          {signupFunnelRows.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No student accounts yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Student</th>
                    <th className="px-3 py-2 text-left">Signed up</th>
                    <th className="px-3 py-2 text-left">Checkout</th>
                    <th className="px-3 py-2 text-left">Payment</th>
                    <th className="px-3 py-2 text-left">Learning</th>
                    <th className="px-3 py-2 text-left">Current stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {signupFunnelRows.map(
                    ({
                      user,
                      profile,
                      access,
                      checkoutEvent,
                      paidPayment,
                      latestProgress,
                      stage,
                    }) => {
                      const name = studentDisplayName({
                        profile,
                        authUser: user,
                      });

                      return (
                        <tr key={user.id} className="align-top">
                          <td className="px-3 py-3">
                            <p className="font-medium text-slate-900">{name}</p>
                            <p className="mt-0.5 break-all text-xs text-slate-500">
                              {user.email}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              Access: {access?.status ?? "missing"}
                            </p>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                            {formatOptionalDateTime(user.created_at)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-slate-600">
                            {formatOptionalDateTime(checkoutEvent?.created_at)}
                          </td>
                          <td className="px-3 py-3 text-slate-600">
                            {paidPayment ? (
                              <>
                                <p className="font-medium text-slate-900">
                                  {formatMoney(
                                    paidPayment.amount_total,
                                    paidPayment.currency,
                                  )}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {formatOptionalDateTime(
                                    paidPayment.created_at,
                                  )}
                                </p>
                              </>
                            ) : (
                              "--"
                            )}
                          </td>
                          <td className="px-3 py-3 text-slate-600">
                            {latestProgress ? (
                              <>
                                <p>
                                  {latestProgress.passed
                                    ? "Mastery passed"
                                    : "In progress"}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {formatScore(
                                    numericScore(latestProgress.last_score),
                                  )}{" "}
                                  -{" "}
                                  {formatOptionalDateTime(
                                    latestProgress.updated_at,
                                  )}
                                </p>
                              </>
                            ) : (
                              "--"
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${funnelStageClass(stage)}`}
                            >
                              {stage}
                            </span>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Accounts
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Students
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Use Ensure to repair a partially created account. Delete is for
                test accounts only.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {totalUsers} user{totalUsers === 1 ? "" : "s"}
            </p>
          </div>

          {usersError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load Supabase Auth users: {usersError.message}. This
              requires a server-only SUPABASE_SERVICE_ROLE_KEY.
            </div>
          ) : studentUsers.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No student accounts yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Signed up</th>
                    <th className="px-3 py-2 text-left">Last login</th>
                    <th className="px-3 py-2 text-left">Access</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentUsers.map(({ user, profile, access }) => {
                    const status = access?.status ?? "missing";
                    const name = studentDisplayName({
                      profile,
                      authUser: user,
                    });
                    const parentEmail =
                      firstPresent(
                        profile?.parent_email,
                        user.user_metadata?.parent_email,
                      ) ?? null;

                    return (
                      <tr key={user.id} className="align-top">
                        <td className="px-3 py-3">
                          <p className="font-medium text-slate-900">{name}</p>
                          {parentEmail && (
                            <p className="mt-0.5 text-xs text-slate-400">
                              Parent: {parentEmail}
                            </p>
                          )}
                        </td>
                        <td className="px-3 py-3 break-all text-slate-600">
                          {user.email}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                          {formatOptionalDateTime(user.created_at)}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                          {formatOptionalDateTime(user.last_sign_in_at)}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${accessStatusClass(access?.status)}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col gap-2">
                            <form action={ensureProfileAccess}>
                              <input
                                type="hidden"
                                name="userId"
                                value={user.id}
                              />
                              <input
                                type="hidden"
                                name="email"
                                value={user.email ?? ""}
                              />
                              <button
                                type="submit"
                                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                Ensure
                              </button>
                            </form>
                            <form
                              action={setStudentAccessStatus}
                              className="flex flex-wrap gap-1"
                            >
                              <input
                                type="hidden"
                                name="userId"
                                value={user.id}
                              />
                              <input
                                type="hidden"
                                name="email"
                                value={user.email ?? ""}
                              />
                              {betaAccessStatuses.map((s) => (
                                <button
                                  key={s}
                                  type="submit"
                                  name="status"
                                  value={s}
                                  disabled={access?.status === s}
                                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 hover:bg-slate-50 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                                >
                                  {s}
                                </button>
                              ))}
                            </form>
                            {access?.status !== "active" && (
                              <form action={sendPurchasePrompt}>
                                <input type="hidden" name="email" value={user.email ?? ""} />
                                <input type="hidden" name="studentName" value={name} />
                                <button
                                  type="submit"
                                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  Email prompt
                                </button>
                              </form>
                            )}
                            <DeleteUserForm
                              userId={user.id}
                              deleteUserAction={deleteTestUser}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Enquiries table ───────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Funnel
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Enquiries
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Interest captured from /enquire before payment or sign-up.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"}
            </p>
          </div>

          {enquiriesError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load enquiries: {enquiriesError.message}. Create the
              public.enquiries table if it does not exist yet.
            </div>
          ) : enquiries.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No enquiries yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Created</th>
                    <th className="px-3 py-2 text-left">Student</th>
                    <th className="px-3 py-2 text-left">Parent email</th>
                    <th className="px-3 py-2 text-left">Offer</th>
                    <th className="px-3 py-2 text-left">Year</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enquiry) => {
                    const status = enquiry.status ?? "new";
                    return (
                      <tr key={enquiry.id} className="align-top">
                        <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                          {formatOptionalDateTime(enquiry.created_at)}
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-medium text-slate-900">
                            {enquiry.student_first_name ?? "—"}
                          </p>
                          {enquiry.message && (
                            <details className="mt-1 text-xs text-slate-500">
                              <summary className="cursor-pointer font-medium text-slate-600 hover:text-slate-900">
                                Message
                              </summary>
                              <p className="mt-1 max-w-xs leading-5">
                                {enquiry.message}
                              </p>
                            </details>
                          )}
                        </td>
                        <td className="px-3 py-3 break-all text-slate-600">
                          {enquiry.parent_email ?? "—"}
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                          {enquiry.offer_selected ?? "—"}
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                          {enquiry.year_level ?? "—"}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${enquiryStatusClass(status)}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <form
                            action={updateEnquiryStatus}
                            className="flex flex-wrap gap-1"
                          >
                            <input type="hidden" name="id" value={enquiry.id} />
                            {enquiryStatuses.map((s) => (
                              <button
                                key={s}
                                type="submit"
                                name="status"
                                value={s}
                                disabled={status === s}
                                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 hover:bg-slate-50 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                              >
                                {s}
                              </button>
                            ))}
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Payments table ────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Stripe
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Payments
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Recent checkout records. Revenue card above counts paid
                payments only.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {payments.length} payment{payments.length === 1 ? "" : "s"}
            </p>
          </div>

          {paymentsError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load payments: {paymentsError.message}. Create the
              public.payments table if it does not exist yet.
            </div>
          ) : payments.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No Stripe payments recorded yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Created</th>
                    <th className="px-3 py-2 text-left">Offer</th>
                    <th className="px-3 py-2 text-left">Parent / student</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Payment</th>
                    <th className="px-3 py-2 text-left">Subscription</th>
                    <th className="px-3 py-2 text-left">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="align-top">
                      <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                        {formatOptionalDateTime(payment.created_at)}
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {payment.offer_selected ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        <p>{payment.parent_email ?? "—"}</p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {payment.student_first_name ?? ""}
                        </p>
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {formatMoney(payment.amount_total, payment.currency)}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${paymentStatusClass(payment.payment_status)}`}
                        >
                          {payment.payment_status ?? "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {payment.subscription_status ?? "—"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${accessStatusClass(payment.access_status)}`}
                        >
                          {payment.access_status ?? "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Diagnostic submissions (collapsed) ───────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <details>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Reports
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Diagnostic submissions ({submissions.length})
                </h2>
              </div>
              <span className="shrink-0 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">
                Expand ▾
              </span>
            </summary>

            {submissions.length === 0 ? (
              <p className="mt-6 text-sm text-slate-600">No submissions yet.</p>
            ) : (
              <div className="mt-6 space-y-8">
                {Object.entries(groupedSubmissions).map(([date, items]) => (
                  <div key={date} className="space-y-3">
                    <h3 className="px-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {date}
                    </h3>
                    <div className="space-y-3">
                      {items.map((submission) => {
                        const score = scoreDiagnostic(
                          submission.answers,
                          submission.confidence,
                        );
                        return (
                          <article
                            key={submission.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                              <div className="grid gap-3 sm:grid-cols-3">
                                <div>
                                  <h4 className="font-semibold text-slate-900">
                                    {submission.student_first_name}
                                  </h4>
                                  <p className="mt-1 text-sm text-slate-500">
                                    {submission.parent_email}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-400">
                                    {formatDateTime(submission.created_at)}
                                  </p>
                                </div>
                                <div className="space-y-1 text-sm text-slate-600">
                                  <p>
                                    <span className="font-medium text-slate-900">
                                      Year:
                                    </span>{" "}
                                    {submission.year_level ?? "—"}
                                  </p>
                                  <p>
                                    <span className="font-medium text-slate-900">
                                      Course:
                                    </span>{" "}
                                    {submission.course ?? "—"}
                                  </p>
                                  <p>
                                    <span className="font-medium text-slate-900">
                                      Offer:
                                    </span>{" "}
                                    {submission.offer_selected ?? "—"}
                                  </p>
                                </div>
                                <div className="flex flex-wrap items-start gap-2">
                                  <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold capitalize text-white">
                                    {formatStatus(submission.report_status)}
                                  </span>
                                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                    {score.correct}/{score.totalQuestions} (
                                    {score.percentage}%)
                                  </span>
                                  {submission.follow_up_required && (
                                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900">
                                      Follow-up
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                                <Link
                                  href={`/admin/reports/${submission.id}`}
                                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                                >
                                  Open report
                                </Link>
                                <Link
                                  href={`/admin/reports/${submission.id}/pdf`}
                                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  View PDF
                                </Link>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </details>
        </section>

        {/* ── Learning analytics placeholder ────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Analytics
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Learning Analytics
          </h2>
          <p className="mt-3 max-w-prose text-sm leading-6 text-slate-600">
            Persisted lesson progress gives a compact view of recent student
            learning activity. Expand for internal metrics and lesson-level
            signals.
          </p>
          <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-semibold text-slate-800">
                Internal lesson progress
              </span>
              <span className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                Expand
              </span>
            </summary>

            {lessonProgressError ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Could not load internal lesson progress:{" "}
                {lessonProgressError.message}. Confirm the lesson_progress
                migration has been applied.
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <SummaryCard
                    label="Progress records"
                    value={lessonProgressRows.length}
                  />
                  <SummaryCard
                    label="Active learners"
                    value={
                      new Set(lessonProgressRows.map((row) => row.user_id)).size
                    }
                  />
                  <SummaryCard
                    label="Lessons passed"
                    value={lessonProgressRows.filter((row) => row.passed).length}
                    highlight="emerald"
                  />
                  <SummaryCard
                    label="Average latest score"
                    value={formatScore(averageLessonScore)}
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Recent activity
                  </h3>
                  {recentLessonProgress.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">
                      No lesson progress recorded yet.
                    </p>
                  ) : (
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead>
                          <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-3 py-2 text-left">Updated</th>
                            <th className="px-3 py-2 text-left">Student</th>
                            <th className="px-3 py-2 text-left">Course</th>
                            <th className="px-3 py-2 text-left">Unit</th>
                            <th className="px-3 py-2 text-left">Lesson</th>
                            <th className="px-3 py-2 text-left">Status</th>
                            <th className="px-3 py-2 text-left">Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {recentLessonProgress.map((row) => {
                            const user = adminUsers.find(
                              (nextUser) => nextUser.id === row.user_id,
                            );
                            const target = lessonTargetByKey.get(
                              progressRowKey(row),
                            );

                            return (
                              <tr key={progressRowKey(row)} className="align-top">
                                <td className="px-3 py-3 whitespace-nowrap text-slate-500">
                                  {formatOptionalDateTime(row.updated_at)}
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                  {user?.email ?? shortUserId(row.user_id)}
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                  {target?.courseTitle ?? row.course_slug}
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                  {target?.unitTitle ?? row.unit_slug}
                                </td>
                                <td className="px-3 py-3 font-medium text-slate-900">
                                  {target?.lessonTitle ?? "Unknown lesson"}
                                </td>
                                <td className="px-3 py-3">
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${row.passed ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
                                  >
                                    {row.passed ? "Passed" : "In progress"}
                                  </span>
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                  {formatScore(numericScore(row.last_score))}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Hardest lessons
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Active lessons with at least two learner progress records,
                    ordered by lowest pass rate.
                  </p>
                  {hardestLessons.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">
                      Not enough progress data yet.
                    </p>
                  ) : (
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead>
                          <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-3 py-2 text-left">Course</th>
                            <th className="px-3 py-2 text-left">Unit</th>
                            <th className="px-3 py-2 text-left">Lesson</th>
                            <th className="px-3 py-2 text-left">Attempts</th>
                            <th className="px-3 py-2 text-left">Passes</th>
                            <th className="px-3 py-2 text-left">Pass rate</th>
                            <th className="px-3 py-2 text-left">Average score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {hardestLessons.map((lesson) => (
                            <tr
                              key={lessonProgressKey(lesson.target)}
                              className="align-top"
                            >
                              <td className="px-3 py-3 text-slate-600">
                                {lesson.target.courseTitle}
                              </td>
                              <td className="px-3 py-3 text-slate-600">
                                {lesson.target.unitTitle}
                              </td>
                              <td className="px-3 py-3 font-medium text-slate-900">
                                {lesson.target.lessonTitle}
                              </td>
                              <td className="px-3 py-3 text-slate-600">
                                {lesson.attempts}
                              </td>
                              <td className="px-3 py-3 text-slate-600">
                                {lesson.passes}
                              </td>
                              <td className="px-3 py-3 text-slate-600">
                                {formatScore(lesson.passRate)}
                              </td>
                              <td className="px-3 py-3 text-slate-600">
                                {formatScore(lesson.averageScore)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </details>
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Open Google Analytics →
          </a>
        </section>

        {/* ── Testing tools ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <details>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Testing tools
              </p>
              <span className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                Expand
              </span>
            </summary>
            <div className="mt-5">
              <AdminGoogleAdsTestConversion />
            </div>
          </details>
        </section>

      </section>
    </main>
  );
}
