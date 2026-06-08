"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { courseCatalogue } from "../../lib/courseUnits";
import { getContinueLearningTarget } from "../../lib/courseLessonTargets";
import {
  getUserAllProgress,
  type LessonProgressRecord,
} from "../../lib/lessonProgress";
import {
  generateStudyPlan,
  type StudyPlanDiagnosticResult,
} from "../../lib/studyPlans/generateStudyPlan";
import { newCoursePathways } from "../../lib/newCourseCatalog";
import { supabase } from "../../lib/supabaseClient";
import {
  getUserAccessDashboardCopy,
  getUserAccessTone,
  normaliseUserAccessStatus,
  type UserAccessStatus,
} from "../../lib/userAccess";

type MasteryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  attempt_count: number;
};

type AssignedWorksheet = {
  id: string;
  title: string;
  share_token: string;
  due_at: string | null;
  status: string | null;
  created_at: string;
};

type AttemptRow = {
  id: string;
  worksheet_id: string;
  completed_at: string | null;
  score_correct: number | null;
  score_total: number | null;
  started_at: string;
};

type DiagnosticResultRow = {
  year_level: string;
  unit_results: StudyPlanDiagnosticResult[];
  created_at: string;
};

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function masteryBarColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [studentFirstName, setStudentFirstName] = useState("");
  const [accessStatus, setAccessStatus] = useState<UserAccessStatus>("none");
  const [isLoading, setIsLoading] = useState(true);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [billingPortalError, setBillingPortalError] = useState("");
  const [lessonProgress, setLessonProgress] = useState<
    Record<string, LessonProgressRecord>
  >({});
  const [masteryRows, setMasteryRows] = useState<MasteryRow[]>([]);
  const [diagnosticResults, setDiagnosticResults] = useState<
    StudyPlanDiagnosticResult[]
  >([]);
  const [diagnosticYearLevel, setDiagnosticYearLevel] = useState("year-12-advanced");
  const [assignedWorksheets, setAssignedWorksheets] = useState<AssignedWorksheet[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<AttemptRow[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      if (!sessionUser) {
        router.replace("/login");
        return;
      }

      setUser(sessionUser);
      setLessonProgress(await getUserAllProgress(sessionUser.id));

      const { data: profileData } = await supabase
        .from("profiles")
        .select("student_first_name")
        .eq("id", sessionUser.id)
        .maybeSingle();

      if (profileData?.student_first_name) {
        setStudentFirstName(String(profileData.student_first_name));
      } else if (sessionUser.user_metadata?.student_first_name) {
        setStudentFirstName(String(sessionUser.user_metadata.student_first_name));
      }

      const { data: accessData, error: accessError } = await supabase
        .from("user_access")
        .select("status")
        .eq("user_id", sessionUser.id)
        .eq("access_type", "online_learning_beta")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (accessError) {
        setAccessStatus("none");
      } else {
        setAccessStatus(normaliseUserAccessStatus(accessData?.status));
      }

      const { data: paymentData } = await supabase
        .from("payments")
        .select("stripe_customer_id")
        .eq("user_id", sessionUser.id)
        .eq("offer_selected", "online-learning")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const cid = (paymentData as { stripe_customer_id?: string | null } | null)
        ?.stripe_customer_id ?? null;
      setStripeCustomerId(typeof cid === "string" && cid.length > 0 ? cid : null);

      const { data: masteryData } = await supabase
        .from("student_mastery")
        .select("course_slug, topic_slug, mastery_score, attempt_count")
        .eq("user_id", sessionUser.id)
        .order("mastery_score", { ascending: false });

      if (masteryData) {
        setMasteryRows(masteryData as MasteryRow[]);
      }

      const { data: diagnosticData } = await supabase
        .from("diagnostic_results")
        .select("year_level, unit_results, created_at")
        .eq("user_id", sessionUser.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (diagnosticData) {
        const row = diagnosticData as DiagnosticResultRow;
        setDiagnosticYearLevel(row.year_level);
        setDiagnosticResults(
          Array.isArray(row.unit_results) ? row.unit_results : []
        );
      }

      // Worksheets assigned to this student's email (RLS: migration 010).
      const userEmail = sessionUser.email ?? null;
      if (userEmail) {
        const { data: wsData } = await supabase
          .from("worksheets")
          .select("id, title, share_token, due_at, status, created_at")
          .eq("assigned_student_email", userEmail)
          .order("created_at", { ascending: false })
          .limit(20);
        if (wsData) setAssignedWorksheets(wsData as AssignedWorksheet[]);
      }

      // Recent completed attempts where this user was logged in.
      const { data: attemptsData } = await supabase
        .from("worksheet_attempts")
        .select("id, worksheet_id, completed_at, score_correct, score_total, started_at")
        .eq("user_id", sessionUser.id)
        .not("completed_at", "is", null)
        .order("started_at", { ascending: false })
        .limit(20);
      if (attemptsData) setRecentAttempts(attemptsData as AttemptRow[]);

      setIsLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleManageSubscription() {
    setIsPortalLoading(true);
    setBillingPortalError("");

    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        setBillingPortalError("Session expired. Please log in again.");
        setIsPortalLoading(false);
        return;
      }

      const response = await fetch("/api/stripe/billing-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      let payload: { url?: string; error?: string } = {};
      const rawText = await response.text();
      if (rawText) {
        try {
          payload = JSON.parse(rawText) as { url?: string; error?: string };
        } catch {
          // ignore parse error
        }
      }

      if (!response.ok || payload.error) {
        setBillingPortalError(
          payload.error ?? "Could not open billing portal. Please try again."
        );
        setIsPortalLoading(false);
        return;
      }

      if (payload.url) {
        window.location.href = payload.url;
        return;
      }

      setBillingPortalError("Could not open billing portal. Please try again.");
      setIsPortalLoading(false);
    } catch {
      setBillingPortalError("Could not open billing portal. Please try again.");
      setIsPortalLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Loading dashboard
          </h1>
        </section>
      </main>
    );
  }

  const accessCopy = getUserAccessDashboardCopy(accessStatus);
  const availableCourses = courseCatalogue.filter(
    (course) => course.status === "available"
  );
  const progressRecords = Object.values(lessonProgress);
  const hasLessonProgress = progressRecords.length > 0;
  const continueLearningTarget = getContinueLearningTarget(progressRecords);
  const studyPlan = generateStudyPlan({
    yearLevel: diagnosticYearLevel,
    masteryRows,
    diagnosticResults,
  });

  // Build a slug → human label lookup from the course catalog.
  const topicLabelMap = new Map<string, string>();
  for (const pathway of newCoursePathways) {
    for (const unit of pathway.units) {
      topicLabelMap.set(`${pathway.slug}::${unit.slug}`, unit.title);
    }
  }
  function topicLabel(courseSlug: string, topicSlug: string): string {
    return topicLabelMap.get(`${courseSlug}::${topicSlug}`) ?? prettifySlug(topicSlug);
  }

  const hasMastery = masteryRows.length > 0;
  const avgMastery = hasMastery
    ? Math.round(
        masteryRows.reduce((s, r) => s + r.mastery_score, 0) / masteryRows.length
      )
    : 0;
  // Rows are already sorted descending by mastery_score from the query.
  const strongestTopics = masteryRows.slice(0, 3);
  const weakestTopics = [...masteryRows]
    .sort((a, b) => a.mastery_score - b.mastery_score)
    .slice(0, 3);
  const showSplit = masteryRows.length >= 4;

  // Worksheet history: latest completed attempt keyed by worksheet_id.
  const latestAttemptByWorksheet = new Map<string, AttemptRow>();
  for (const attempt of recentAttempts) {
    if (!latestAttemptByWorksheet.has(attempt.worksheet_id)) {
      latestAttemptByWorksheet.set(attempt.worksheet_id, attempt);
    }
  }

  // Attempts for worksheets not in the assigned list (logged-in open-link attempts).
  const assignedIds = new Set(assignedWorksheets.map((w) => w.id));
  const extraAttempts = recentAttempts.filter((a) => !assignedIds.has(a.worksheet_id));

  const hasWorksheets = assignedWorksheets.length > 0;
  const hasExtraAttempts = extraAttempts.length > 0;

  // Next best action: weakest topic with at least one attempt.
  const nextBestRow = hasMastery
    ? masteryRows
        .filter((r) => r.attempt_count > 0)
        .sort((a, b) => a.mastery_score - b.mastery_score)[0] ?? null
    : null;
  const nextBestAction = nextBestRow
    ? {
        topicName: topicLabel(nextBestRow.course_slug, nextBestRow.topic_slug),
        mastery: nextBestRow.mastery_score,
        href: `/course/${nextBestRow.course_slug}/${nextBestRow.topic_slug}`,
      }
    : null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Student dashboard
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Welcome{studentFirstName ? `, ${studentFirstName}` : ""}
              </h1>
              <p className="mt-3 text-sm text-slate-600">{user?.email}</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {accessCopy.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {accessCopy.message}
              </p>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700">
              {accessCopy.badge}
            </span>
          </div>

          <div
            className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${getUserAccessTone(
              accessStatus
            )}`}
          >
            <p className="font-semibold">{accessCopy.title}</p>
            {accessStatus === "pending" ? (
              <p className="mt-1">
                Course previews may remain visible while access is being
                reviewed, but full online learning access is not approved yet.
              </p>
            ) : null}
            {accessStatus === "none" ? (
              <p className="mt-1">
                Use Register interest if online learning access should already
                be set up for this account.
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {accessStatus === "active" ? (
              <>
                <Link
                  href={continueLearningTarget?.href ?? "/course"}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Continue learning
                </Link>
                <Link
                  href="/diagnostic?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Start diagnostic
                </Link>
              </>
            ) : null}

            {accessStatus === "pending" || accessStatus === "none" ? (
              <>
                <Link
                  href="/checkout?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start your 7-day free trial
                </Link>
                <Link
                  href="/enquire?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Register interest
                </Link>
                <Link
                  href="/diagnostic?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Start diagnostic
                </Link>
                <Link
                  href="/course"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Preview course units
                </Link>
              </>
            ) : null}

            {accessStatus === "revoked" ? (
              <>
                <Link
                  href="/checkout?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Subscribe to online learning
                </Link>
                <Link
                  href="/enquire?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Register interest
                </Link>
                <Link
                  href="/diagnostic?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Start diagnostic
                </Link>
              </>
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Quick diagnostic quiz
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Find out where to focus
              </h2>
              <p className="mt-2 max-w-xl leading-7 text-slate-600">
                20 multiple-choice questions across all major units. Takes about
                5 minutes and gives you a prioritised study list.
              </p>
            </div>
            <Link
              href="/diagnostic/select"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Start quiz →
            </Link>
          </div>
        </section>

        {/* ── Your worksheets ───────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your Study Plan
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {studyPlan.headline}
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                {studyPlan.nextTopic?.reason ?? studyPlan.summary}
              </p>
              {studyPlan.nextTopic ? (
                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Next topic</p>
                    <p className="mt-1">{studyPlan.nextTopic.title}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Study time</p>
                    <p className="mt-1">
                      About {studyPlan.estimatedHours} hour
                      {studyPlan.estimatedHours !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Priority</p>
                    <p className="mt-1 capitalize">{studyPlan.priorityLevel}</p>
                  </div>
                </div>
              ) : null}
            </div>
            {studyPlan.nextTopic ? (
              <Link
                href={studyPlan.nextTopic.href}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start studying
              </Link>
            ) : (
              <Link
                href="/diagnostic/select"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start diagnostic
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Your worksheets</h2>

          {!hasWorksheets && !hasExtraAttempts ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              No assigned worksheets yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {/* Assigned worksheets */}
              {assignedWorksheets.map((ws) => {
                const attempt = latestAttemptByWorksheet.get(ws.id) ?? null;
                const isCompleted = !!attempt?.completed_at;
                const isPastDue =
                  ws.due_at && !isCompleted && new Date(ws.due_at) < new Date();

                return (
                  <div
                    key={ws.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {ws.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {ws.due_at ? (
                          <span className={isPastDue ? "font-semibold text-red-600" : ""}>
                            Due{" "}
                            {new Date(ws.due_at).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {isPastDue ? " — overdue" : ""}
                          </span>
                        ) : null}
                        {ws.status && ws.status !== "active" ? (
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold capitalize text-slate-700">
                            {ws.status}
                          </span>
                        ) : null}
                        {isCompleted && attempt ? (
                          <span className="font-semibold text-emerald-700">
                            Score: {attempt.score_correct}/{attempt.score_total}
                          </span>
                        ) : attempt && !isCompleted ? (
                          <span className="text-amber-600">In progress</span>
                        ) : null}
                      </div>
                    </div>
                    <Link
                      href={`/worksheet/${ws.share_token}`}
                      className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      {isCompleted ? "Review" : "Open worksheet"}
                    </Link>
                  </div>
                );
              })}

              {/* Extra logged-in attempts (open-link worksheets) */}
              {hasExtraAttempts ? (
                <p className="pt-1 text-xs text-slate-400">
                  Plus {extraAttempts.length} other worksheet attempt
                  {extraAttempts.length !== 1 ? "s" : ""} from shared links.
                </p>
              ) : null}
            </div>
          )}
        </section>

        {continueLearningTarget ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Continue learning
            </p>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {continueLearningTarget.status}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {continueLearningTarget.lessonTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {continueLearningTarget.courseTitle} &middot;{" "}
                  {continueLearningTarget.unitTitle}
                </p>
                {continueLearningTarget.lastScore != null ? (
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Last mastery score:{" "}
                    {Math.round(continueLearningTarget.lastScore * 100)}%
                  </p>
                ) : null}
              </div>
              <Link
                href={continueLearningTarget.href}
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                {continueLearningTarget.status === "In progress"
                  ? "Continue lesson"
                  : "Start lesson"}
              </Link>
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Your progress</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Lessons count as complete after you pass their mastery quiz.
          </p>

          {hasLessonProgress ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {availableCourses.map((course) => {
                const completedLessons = Math.min(
                  progressRecords.filter(
                    (record) =>
                      record.courseSlug === course.courseSlug && record.passed
                  ).length,
                  course.activeLessonCount
                );
                const percentage =
                  course.activeLessonCount > 0
                    ? Math.round(
                        (completedLessons / course.activeLessonCount) * 100
                      )
                    : 0;

                return (
                  <Link
                    key={course.courseSlug}
                    href={course.href}
                    className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
                  >
                    <h3 className="font-bold">{course.courseTitle}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {completedLessons} of {course.activeLessonCount} lessons
                      complete
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-950"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {percentage}%
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Start a lesson and pass mastery to see your progress here.
            </p>
          )}
        </section>

        {/* ── Next best action ──────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Your next best action
          </p>

          {!nextBestAction ? (
            <p className="mt-3 text-sm text-slate-600">
              Complete a diagnostic or worksheet to get your personalised next step.
            </p>
          ) : (
            <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Focus on {nextBestAction.topicName} next.
                </h2>
                <p className="mt-2 text-slate-600">
                  Your current mastery is {nextBestAction.mastery}%.
                </p>
                <div className="mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${masteryBarColor(nextBestAction.mastery)}`}
                    style={{ width: `${nextBestAction.mastery}%` }}
                  />
                </div>
              </div>
              <Link
                href={nextBestAction.href}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start this topic
              </Link>
            </div>
          )}
        </section>

        {/* ── Mastery summary ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Your mastery</h2>

          {!hasMastery ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Complete a worksheet or quiz to start building your mastery map.
            </p>
          ) : (
            <>
              {/* Overall average */}
              <div className="mt-5 flex items-center gap-4">
                <div className="w-16 shrink-0 text-center">
                  <p className="text-3xl font-bold tabular-nums leading-none">
                    {avgMastery}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">
                    avg %
                  </p>
                </div>
                <div className="flex-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${masteryBarColor(avgMastery)}`}
                      style={{ width: `${avgMastery}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {masteryRows.length} topic{masteryRows.length !== 1 ? "s" : ""} tracked
                  </p>
                </div>
              </div>

              {showSplit ? (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Needs work */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Needs work
                    </p>
                    <ul className="mt-3 space-y-3">
                      {weakestTopics.map((row) => (
                        <li key={`weak-${row.course_slug}::${row.topic_slug}`}>
                          <div className="flex items-baseline justify-between gap-2 text-sm">
                            <span className="font-medium text-slate-800 leading-snug">
                              {topicLabel(row.course_slug, row.topic_slug)}
                            </span>
                            <span className="shrink-0 tabular-nums text-slate-400 text-xs">
                              {row.mastery_score}% · {row.attempt_count}q
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${masteryBarColor(row.mastery_score)}`}
                              style={{ width: `${row.mastery_score}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strongest */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Strong topics
                    </p>
                    <ul className="mt-3 space-y-3">
                      {strongestTopics.map((row) => (
                        <li key={`strong-${row.course_slug}::${row.topic_slug}`}>
                          <div className="flex items-baseline justify-between gap-2 text-sm">
                            <span className="font-medium text-slate-800 leading-snug">
                              {topicLabel(row.course_slug, row.topic_slug)}
                            </span>
                            <span className="shrink-0 tabular-nums text-slate-400 text-xs">
                              {row.mastery_score}% · {row.attempt_count}q
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${masteryBarColor(row.mastery_score)}`}
                              style={{ width: `${row.mastery_score}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                /* 1–3 topics: single flat list */
                <ul className="mt-5 space-y-3">
                  {masteryRows.map((row) => (
                    <li key={`${row.course_slug}::${row.topic_slug}`}>
                      <div className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="font-medium text-slate-800 leading-snug">
                          {topicLabel(row.course_slug, row.topic_slug)}
                        </span>
                        <span className="shrink-0 tabular-nums text-slate-400 text-xs">
                          {row.mastery_score}% · {row.attempt_count}q
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${masteryBarColor(row.mastery_score)}`}
                          style={{ width: `${row.mastery_score}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        {accessStatus === "active" || accessStatus === "revoked" ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-xl font-bold tracking-tight">Billing</h2>
            {stripeCustomerId ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  disabled={isPortalLoading}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPortalLoading ? "Opening portal..." : "Manage subscription"}
                </button>
                <p className="mt-2 text-sm text-slate-500">
                  Update payment method, view invoices, or cancel through Stripe.
                </p>
                {billingPortalError ? (
                  <p className="mt-2 text-sm text-red-600">{billingPortalError}</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                Need to cancel or update billing? Contact us and we&apos;ll help.
              </p>
            )}
          </section>
        ) : null}

        {accessStatus === "active" ? (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Link
                key={course.courseSlug}
                href={course.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Available pathway
                </p>
                <h2 className="mt-3 text-xl font-bold">{course.courseTitle}</h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {course.unitCount} units &middot; {course.activeLessonCount} active lessons
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {course.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-950">
                  Continue pathway
                </p>
              </Link>
            ))}
          </section>
        ) : null}

        {accessStatus === "pending" ? (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Link
                key={course.courseSlug}
                href={course.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Preview available
                </p>
                <h2 className="mt-3 text-xl font-bold">{course.courseTitle}</h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {course.unitCount} units &middot; {course.activeLessonCount} active lessons
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {course.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-950">
                  Preview pathway
                </p>
              </Link>
            ))}
          </section>
        ) : null}
      </section>
    </main>
  );
}
