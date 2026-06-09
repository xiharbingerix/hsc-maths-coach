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
  last_updated: string;
};

type SubtopicMasteryRow = {
  course_slug: string;
  topic_slug: string;
  subtopic_slug: string;
  mastery_score: number;
  attempt_count: number;
  last_updated: string;
};

type MasteryHistoryRow = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  created_at: string | null;
};

type MasteryTrendSummary = {
  latestAverage: number | null;
  previousAverage: number | null;
  change: number | null;
};

type RevisionReason = "Needs strengthening" | "Due for review" | "Long time since practice";

type RevisionDueItem = {
  course_slug: string;
  topic_slug: string;
  mastery_score: number;
  last_updated: string;
  reason: RevisionReason;
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

function averageRounded(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getMasteryTrendSummary(
  masteryRows: MasteryRow[],
  historyRows: MasteryHistoryRow[]
): MasteryTrendSummary {
  const latestAverage = averageRounded(
    masteryRows.map((row) => row.mastery_score)
  );
  const historyByTopic = new Map<string, MasteryHistoryRow[]>();

  for (const row of historyRows) {
    const key = `${row.course_slug}/${row.topic_slug}`;
    historyByTopic.set(key, [...(historyByTopic.get(key) ?? []), row]);
  }

  for (const snapshots of historyByTopic.values()) {
    snapshots.sort((a, b) => {
      const aTime = a.created_at ? Date.parse(a.created_at) : 0;
      const bTime = b.created_at ? Date.parse(b.created_at) : 0;
      return bTime - aTime;
    });
  }

  const previousScores = masteryRows
    .map((row) => {
      const snapshots =
        historyByTopic.get(`${row.course_slug}/${row.topic_slug}`) ?? [];
      const latestSnapshot = snapshots[0] ?? null;
      const previousSnapshot =
        latestSnapshot?.mastery_score === row.mastery_score
          ? snapshots[1] ?? null
          : latestSnapshot;
      return previousSnapshot?.mastery_score ?? null;
    })
    .filter((score): score is number => score != null);

  const previousAverage = averageRounded(previousScores);

  return {
    latestAverage,
    previousAverage,
    change:
      latestAverage == null || previousAverage == null
        ? null
        : latestAverage - previousAverage,
  };
}

function formatMasteryChange(change: number | null): string {
  if (change == null) return "No change yet";
  if (change > 0) return `+${change}`;
  if (change < 0) return String(change);
  return "No change";
}

function masteryTrendMessage(summary: MasteryTrendSummary): string {
  if (summary.latestAverage == null || summary.previousAverage == null) {
    return "Complete quizzes or worksheets to build your mastery trend.";
  }
  if ((summary.change ?? 0) > 0) return "Your mastery is improving.";
  if ((summary.change ?? 0) < 0) {
    return "Your recent answers show some topics need revision.";
  }
  return "Your mastery is steady. Keep practising to move it up.";
}

function masteryTrendTone(change: number | null): string {
  if (change == null || change === 0) return "text-slate-700";
  return change > 0 ? "text-emerald-700" : "text-rose-700";
}

const REVISION_REASON_ORDER: Record<RevisionReason, number> = {
  "Needs strengthening": 0,
  "Long time since practice": 1,
  "Due for review": 2,
};

function getRevisionQueue(rows: MasteryRow[]): RevisionDueItem[] {
  const now = Date.now();
  const MS_14 = 14 * 24 * 60 * 60 * 1000;
  const MS_21 = 21 * 24 * 60 * 60 * 1000;

  const due: RevisionDueItem[] = [];
  for (const row of rows) {
    const age = now - new Date(row.last_updated).getTime();
    let reason: RevisionReason | null = null;
    if (row.mastery_score < 50) {
      reason = "Needs strengthening";
    } else if (age > MS_21) {
      reason = "Long time since practice";
    } else if (age > MS_14 && row.mastery_score < 80) {
      reason = "Due for review";
    }
    if (reason) {
      due.push({ course_slug: row.course_slug, topic_slug: row.topic_slug, mastery_score: row.mastery_score, last_updated: row.last_updated, reason });
    }
  }
  due.sort((a, b) => {
    const r = REVISION_REASON_ORDER[a.reason] - REVISION_REASON_ORDER[b.reason];
    return r !== 0 ? r : a.mastery_score - b.mastery_score;
  });
  return due.slice(0, 3);
}

function formatLastPractised(isoString: string): string {
  const ms = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? "s" : ""} ago`;
}

function isTodayInSydney(isoString: string | null | undefined): boolean {
  if (!isoString) return false;
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date(isoString)) === formatter.format(new Date());
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
  const [subtopicMasteryRows, setSubtopicMasteryRows] = useState<
    SubtopicMasteryRow[]
  >([]);
  const [masteryHistoryRows, setMasteryHistoryRows] = useState<
    MasteryHistoryRow[]
  >([]);
  const [isMasteryHistoryUnavailable, setIsMasteryHistoryUnavailable] =
    useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<
    StudyPlanDiagnosticResult[]
  >([]);
  const [hasDiagnosticResult, setHasDiagnosticResult] = useState(false);
  const [diagnosticYearLevel, setDiagnosticYearLevel] = useState("year-12-advanced");
  const [assignedWorksheets, setAssignedWorksheets] = useState<AssignedWorksheet[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<AttemptRow[]>([]);
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = useState(false);
  const [adaptiveWorksheetError, setAdaptiveWorksheetError] = useState("");

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
        .select("course_slug, topic_slug, mastery_score, attempt_count, last_updated")
        .eq("user_id", sessionUser.id)
        .order("mastery_score", { ascending: false });

      if (masteryData) {
        setMasteryRows(masteryData as MasteryRow[]);
      }

      const { data: subtopicMasteryData, error: subtopicMasteryError } =
        await supabase
          .from("student_subtopic_mastery")
          .select(
            "course_slug, topic_slug, subtopic_slug, mastery_score, attempt_count, last_updated"
          )
          .eq("user_id", sessionUser.id)
          .order("mastery_score", { ascending: true });

      if (!subtopicMasteryError && subtopicMasteryData) {
        setSubtopicMasteryRows(subtopicMasteryData as SubtopicMasteryRow[]);
      } else {
        setSubtopicMasteryRows([]);
      }

      const { data: masteryHistoryData, error: masteryHistoryError } =
        await supabase
          .from("student_mastery_history")
          .select("course_slug, topic_slug, mastery_score, created_at")
          .eq("user_id", sessionUser.id)
          .order("created_at", { ascending: false })
          .limit(500);

      if (masteryHistoryError) {
        setMasteryHistoryRows([]);
        setIsMasteryHistoryUnavailable(true);
      } else if (masteryHistoryData) {
        setMasteryHistoryRows(masteryHistoryData as MasteryHistoryRow[]);
        setIsMasteryHistoryUnavailable(false);
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
        setHasDiagnosticResult(true);
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

  async function handleGenerateRevisionWorksheet() {
    setIsGeneratingWorksheet(true);
    setAdaptiveWorksheetError("");

    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        setAdaptiveWorksheetError("Session expired. Please log in again.");
        setIsGeneratingWorksheet(false);
        return;
      }

      const response = await fetch("/api/worksheets/adaptive", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      let payload: { href?: string; error?: string } = {};
      const rawText = await response.text();
      if (rawText) {
        try {
          payload = JSON.parse(rawText) as { href?: string; error?: string };
        } catch {
          // Ignore parse errors and show the generic fallback below.
        }
      }

      if (!response.ok || payload.error) {
        setAdaptiveWorksheetError(
          payload.error ?? "Could not generate a revision worksheet."
        );
        setIsGeneratingWorksheet(false);
        return;
      }

      if (payload.href) {
        router.push(payload.href);
        return;
      }

      setAdaptiveWorksheetError("Could not generate a revision worksheet.");
      setIsGeneratingWorksheet(false);
    } catch {
      setAdaptiveWorksheetError(
        "Network error while generating your worksheet. Please try again."
      );
      setIsGeneratingWorksheet(false);
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
  const subtopicLabelMap = new Map<string, string>();
  for (const pathway of newCoursePathways) {
    for (const unit of pathway.units) {
      topicLabelMap.set(`${pathway.slug}::${unit.slug}`, unit.title);
      for (const lesson of unit.lessons) {
        subtopicLabelMap.set(
          `${pathway.slug}::${unit.slug}::${lesson.slug}`,
          lesson.title
        );
      }
    }
  }
  function topicLabel(courseSlug: string, topicSlug: string): string {
    return topicLabelMap.get(`${courseSlug}::${topicSlug}`) ?? prettifySlug(topicSlug);
  }
  function subtopicLabel(
    courseSlug: string,
    topicSlug: string,
    subtopicSlug: string
  ): string {
    return (
      subtopicLabelMap.get(`${courseSlug}::${topicSlug}::${subtopicSlug}`) ??
      prettifySlug(subtopicSlug)
    );
  }
  function subtopicsForTopic(row: MasteryRow): SubtopicMasteryRow[] {
    return subtopicMasteryRows
      .filter(
        (subtopic) =>
          subtopic.course_slug === row.course_slug &&
          subtopic.topic_slug === row.topic_slug
      )
      .sort((a, b) => a.mastery_score - b.mastery_score)
      .slice(0, 3);
  }

  const hasMastery = masteryRows.length > 0;
  const avgMastery = hasMastery
    ? Math.round(
        masteryRows.reduce((s, r) => s + r.mastery_score, 0) / masteryRows.length
      )
    : 0;
  const masteryTrend = getMasteryTrendSummary(masteryRows, masteryHistoryRows);
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

  const revisionQueue = getRevisionQueue(masteryRows);
  const firstOpenWorksheet =
    assignedWorksheets.find((ws) => !latestAttemptByWorksheet.get(ws.id)?.completed_at) ??
    assignedWorksheets[0] ??
    null;
  const recommendedLessonHref =
    continueLearningTarget?.href ?? studyPlan.nextTopic?.href ?? nextBestAction?.href ?? "/course";
  const hasStartedRecommendedLesson = progressRecords.some(
    (record) =>
      record.passed ||
      record.lastScore != null ||
      (record.completedStages?.length ?? 0) > 0
  );
  const hasCompletedMasteryQuiz = progressRecords.some(
    (record) => record.passed || record.lastScore != null
  );
  const hasGeneratedRevisionWorksheet = hasWorksheets || recentAttempts.length > 0;
  const hasReviewedTodaysRevision = recentAttempts.some((attempt) =>
    isTodayInSydney(attempt.completed_at)
  );
  const onboardingChecklist = [
    {
      title: "Complete a diagnostic",
      description: "Get a quick baseline so Nova Maths can choose what to prioritise.",
      done: hasDiagnosticResult,
      actionLabel: hasDiagnosticResult ? "Retake diagnostic" : "Start diagnostic",
      href: "/diagnostic/select",
    },
    {
      title: "Start your first recommended lesson",
      description: "Open the lesson Nova Maths thinks is the best next step for you.",
      done: hasStartedRecommendedLesson,
      actionLabel: hasStartedRecommendedLesson ? "Continue learning" : "Start lesson",
      href: recommendedLessonHref,
    },
    {
      title: "Complete a mastery quiz",
      description: "Submit a mastery quiz so your dashboard can track real progress.",
      done: hasCompletedMasteryQuiz,
      actionLabel: hasCompletedMasteryQuiz ? "Keep practising" : "Open lesson",
      href: recommendedLessonHref,
    },
    {
      title: "Generate a revision worksheet",
      description: hasMastery
        ? "Create a short worksheet from your weakest topics."
        : "Complete a mastery quiz or diagnostic first so we know what to revise.",
      done: hasGeneratedRevisionWorksheet,
      actionLabel: isGeneratingWorksheet
        ? "Generating..."
        : hasGeneratedRevisionWorksheet
        ? "Generate another"
        : "Generate worksheet",
      onClick: () => void handleGenerateRevisionWorksheet(),
      disabled: !hasMastery || isGeneratingWorksheet,
    },
    {
      title: "Review today's revision",
      description: "Finish or review a worksheet so today has a clear revision win.",
      done: hasReviewedTodaysRevision,
      actionLabel: hasReviewedTodaysRevision
        ? "View worksheets"
        : firstOpenWorksheet
        ? "Open worksheet"
        : revisionQueue.length > 0
        ? "Review topic"
        : "Generate revision",
      href: hasReviewedTodaysRevision
        ? "#worksheets"
        : firstOpenWorksheet
        ? `/worksheet/${firstOpenWorksheet.share_token}`
        : revisionQueue.length > 0
        ? `/course/${revisionQueue[0].course_slug}/${revisionQueue[0].topic_slug}`
        : undefined,
      onClick:
        !hasReviewedTodaysRevision && !firstOpenWorksheet && revisionQueue.length === 0
          ? () => void handleGenerateRevisionWorksheet()
          : undefined,
      disabled: isGeneratingWorksheet,
    },
  ];
  const isOnboardingComplete = onboardingChecklist.every((item) => item.done);

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
                  href="/diagnostic/select?offer=online-learning"
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
                  href="/diagnostic/select?offer=online-learning"
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
                  href="/diagnostic/select?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Start diagnostic
                </Link>
              </>
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Getting started
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Your Nova Maths setup checklist
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                Follow these five steps to turn your trial into a clear study routine.
              </p>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {onboardingChecklist.filter((item) => item.done).length}/
              {onboardingChecklist.length} done
            </span>
          </div>

          {isOnboardingComplete ? (
            <p className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
              You&apos;re set up — keep following your study plan.
            </p>
          ) : null}

          <ol className="mt-6 space-y-3">
            {onboardingChecklist.map((item, index) => (
              <li
                key={item.title}
                className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                  item.done
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      item.done
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-700 ring-1 ring-slate-300"
                    }`}
                  >
                    {item.done ? "✓" : index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    {item.actionLabel}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {item.actionLabel}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </section>

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
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <Link
                  href={studyPlan.nextTopic.href}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start studying
                </Link>
                <button
                  type="button"
                  onClick={() => void handleGenerateRevisionWorksheet()}
                  disabled={!hasMastery || isGeneratingWorksheet}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGeneratingWorksheet
                    ? "Generating..."
                    : "Generate revision worksheet"}
                </button>
                {adaptiveWorksheetError ? (
                  <p className="max-w-xs text-sm text-red-600">
                    {adaptiveWorksheetError}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <Link
                  href="/diagnostic/select"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start diagnostic
                </Link>
                <button
                  type="button"
                  onClick={() => void handleGenerateRevisionWorksheet()}
                  disabled={!hasMastery || isGeneratingWorksheet}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGeneratingWorksheet
                    ? "Generating..."
                    : "Generate revision worksheet"}
                </button>
                {adaptiveWorksheetError ? (
                  <p className="max-w-xs text-sm text-red-600">
                    {adaptiveWorksheetError}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </section>

        {/* ── Today's revision ──────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Spaced revision
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Today&apos;s revision</h2>

          {revisionQueue.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              {hasMastery
                ? "You’re all caught up. Keep practising to maintain your mastery."
                : "Complete your first lesson quiz to start building your revision queue."}
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {revisionQueue.map((item) => (
                <li
                  key={`${item.course_slug}::${item.topic_slug}`}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {topicLabel(item.course_slug, item.topic_slug)}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="tabular-nums">{item.mastery_score}% mastery</span>
                      <span>Last practised: {formatLastPractised(item.last_updated)}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${
                          item.reason === "Needs strengthening"
                            ? "bg-red-100 text-red-700"
                            : item.reason === "Long time since practice"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.reason}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/course/${item.course_slug}/${item.topic_slug}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Revise
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="worksheets" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Practice
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Your worksheets</h2>

          {!hasWorksheets && !hasExtraAttempts ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              No worksheets yet. Generate one from your study plan when you are ready.
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

        {/* ── Mastery summary ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Mastery
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Your mastery</h2>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Mastery trend
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {masteryTrendMessage(masteryTrend)}
                </p>
                {isMasteryHistoryUnavailable ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Trend history is not available yet, so this card is using
                    current mastery only.
                  </p>
                ) : null}
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Latest
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums">
                    {masteryTrend.latestAverage == null
                      ? "-"
                      : `${masteryTrend.latestAverage}%`}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Previous
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums">
                    {masteryTrend.previousAverage == null
                      ? "-"
                      : `${masteryTrend.previousAverage}%`}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Change
                  </p>
                  <p
                    className={`mt-1 text-2xl font-bold tabular-nums ${masteryTrendTone(
                      masteryTrend.change
                    )}`}
                  >
                    {formatMasteryChange(masteryTrend.change)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!hasMastery ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Complete a quiz or worksheet to start building your mastery map.
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
                          {subtopicsForTopic(row).length > 0 ? (
                            <ul className="mt-2 space-y-1 rounded-xl bg-white p-2 text-xs text-slate-600">
                              {subtopicsForTopic(row).map((subtopic) => (
                                <li
                                  key={`${subtopic.course_slug}::${subtopic.topic_slug}::${subtopic.subtopic_slug}`}
                                  className="flex items-center justify-between gap-2"
                                >
                                  <span className="truncate">
                                    {subtopicLabel(
                                      subtopic.course_slug,
                                      subtopic.topic_slug,
                                      subtopic.subtopic_slug
                                    )}
                                  </span>
                                  <span className="shrink-0 tabular-nums text-slate-500">
                                    {subtopic.mastery_score}% / {subtopic.attempt_count}q
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
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
                      {subtopicsForTopic(row).length > 0 ? (
                        <ul className="mt-2 space-y-1 rounded-xl bg-white p-2 text-xs text-slate-600">
                          {subtopicsForTopic(row).map((subtopic) => (
                            <li
                              key={`${subtopic.course_slug}::${subtopic.topic_slug}::${subtopic.subtopic_slug}`}
                              className="flex items-center justify-between gap-2"
                            >
                              <span className="truncate">
                                {subtopicLabel(
                                  subtopic.course_slug,
                                  subtopic.topic_slug,
                                  subtopic.subtopic_slug
                                )}
                              </span>
                              <span className="shrink-0 tabular-nums text-slate-500">
                                {subtopic.mastery_score}% / {subtopic.attempt_count}q
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </>
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
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Progress
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Your courses</h2>
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
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p>Start a lesson to see course progress here.</p>
              <Link
                href="/course"
                className="mt-3 inline-flex font-semibold text-slate-950 hover:underline"
              >
                Browse courses
              </Link>
            </div>
          )}
        </section>

        {accessStatus === "active" || accessStatus === "revoked" ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Account
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">Billing</h2>
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

      </section>
    </main>
  );
}
