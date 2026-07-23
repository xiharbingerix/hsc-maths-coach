"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StudentNav } from "../components/StudentNav";
import {
  TopicBreakdownCard,
  type BreakdownLesson,
} from "../components/TopicBreakdownCard";
import { StreakCard } from "./StreakCard";
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
import {
  clientTrackEvent,
  readMarketingParams,
} from "../../lib/analytics/clientTrackEvent";
import {
  trackCourseSelected,
  trackContinueLearningClicked,
  trackDashboardViewed,
} from "../../lib/analytics";
import { predictBand, type BandPrediction } from "../../lib/bandPredictor";
import {
  getDailyReviewQueue,
  type DailyReviewItem,
} from "../../lib/dailyReviewQueue";

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

const HSC_HIGHLIGHT_SLUGS = new Set(["year-12-advanced", "year-12-standard-2"]);

function getFirstLessonHref(courseSlug: string | null): string {
  if (!courseSlug) return "/course";
  const pathway = newCoursePathways.find((p) => p.slug === courseSlug);
  if (pathway) {
    const firstUnit = pathway.units.find((u) => u.lessons.length > 0);
    if (firstUnit?.lessons[0]) {
      return `/course/${courseSlug}/${firstUnit.slug}/${firstUnit.lessons[0].slug}`;
    }
    return `/course/${courseSlug}`;
  }
  return `/course/${courseSlug}`;
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
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null | undefined>(undefined);
  const [isSavingCourse, setIsSavingCourse] = useState(false);
  const [isCoursePickerOpen, setIsCoursePickerOpen] = useState(false);
  const dashboardViewedRef = useRef(false);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      if (!sessionUser) {
        router.replace("/login");
        return;
      }

      setUser(sessionUser);

      // All of these reads depend only on the session user, so fire them in
      // one parallel batch instead of a serial round-trip waterfall.
      const userEmail = sessionUser.email?.toLowerCase() ?? null;
      const [
        progressResult,
        { data: profileData },
        { data: accessData, error: accessError },
        { data: paymentData },
        { data: masteryData },
        { data: subtopicMasteryData, error: subtopicMasteryError },
        { data: masteryHistoryData, error: masteryHistoryError },
        { data: diagnosticData },
        wsResult,
        { data: attemptsData },
      ] = await Promise.all([
        getUserAllProgress(sessionUser.id),
        supabase
          .from("profiles")
          .select("student_first_name, selected_course_slug")
          .eq("id", sessionUser.id)
          .maybeSingle(),
        supabase
          .from("user_access")
          .select("status")
          .eq("user_id", sessionUser.id)
          .eq("access_type", "online_learning_beta")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("payments")
          .select("stripe_customer_id")
          .eq("user_id", sessionUser.id)
          .eq("offer_selected", "online-learning")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("student_mastery")
          .select("course_slug, topic_slug, mastery_score, attempt_count, last_updated")
          .eq("user_id", sessionUser.id)
          .order("mastery_score", { ascending: false }),
        supabase
          .from("student_subtopic_mastery")
          .select(
            "course_slug, topic_slug, subtopic_slug, mastery_score, attempt_count, last_updated"
          )
          .eq("user_id", sessionUser.id)
          .order("mastery_score", { ascending: true }),
        supabase
          .from("student_mastery_history")
          .select("course_slug, topic_slug, mastery_score, created_at")
          .eq("user_id", sessionUser.id)
          .order("created_at", { ascending: false })
          .limit(500),
        supabase
          .from("diagnostic_results")
          .select("year_level, unit_results, created_at")
          .eq("user_id", sessionUser.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        // Worksheets assigned to this student's email (RLS: migration 010).
        userEmail
          ? supabase
              .from("worksheets")
              .select("id, title, share_token, due_at, status, created_at")
              .eq("assigned_student_email", userEmail)
              .order("created_at", { ascending: false })
              .limit(20)
          : Promise.resolve({ data: null }),
        // Recent attempts where this user was logged in — including unfinished
        // ones, so the dashboard can offer a "Resume" entry point.
        supabase
          .from("worksheet_attempts")
          .select("id, worksheet_id, completed_at, score_correct, score_total, started_at")
          .eq("user_id", sessionUser.id)
          .order("started_at", { ascending: false })
          .limit(20),
      ]);

      setLessonProgress(progressResult);

      if (profileData?.student_first_name) {
        setStudentFirstName(String(profileData.student_first_name));
      } else if (sessionUser.user_metadata?.student_first_name) {
        setStudentFirstName(String(sessionUser.user_metadata.student_first_name));
      }

      const rawCourse = (profileData as { selected_course_slug?: string | null } | null)?.selected_course_slug;
      setSelectedCourseSlug(typeof rawCourse === "string" && rawCourse.length > 0 ? rawCourse : null);

      if (accessError) {
        setAccessStatus("none");
      } else {
        setAccessStatus(normaliseUserAccessStatus(accessData?.status));
      }

      const cid = (paymentData as { stripe_customer_id?: string | null } | null)
        ?.stripe_customer_id ?? null;
      setStripeCustomerId(typeof cid === "string" && cid.length > 0 ? cid : null);

      if (masteryData) {
        setMasteryRows(masteryData as MasteryRow[]);
      }

      if (!subtopicMasteryError && subtopicMasteryData) {
        setSubtopicMasteryRows(subtopicMasteryData as SubtopicMasteryRow[]);
      } else {
        setSubtopicMasteryRows([]);
      }

      if (masteryHistoryError) {
        setMasteryHistoryRows([]);
        setIsMasteryHistoryUnavailable(true);
      } else if (masteryHistoryData) {
        setMasteryHistoryRows(masteryHistoryData as MasteryHistoryRow[]);
        setIsMasteryHistoryUnavailable(false);
      }

      if (diagnosticData) {
        const row = diagnosticData as DiagnosticResultRow;
        setHasDiagnosticResult(true);
        setDiagnosticYearLevel(row.year_level);
        setDiagnosticResults(
          Array.isArray(row.unit_results) ? row.unit_results : []
        );
      }

      const wsData = wsResult.data;
      if (wsData) setAssignedWorksheets(wsData as AssignedWorksheet[]);

      if (attemptsData) setRecentAttempts(attemptsData as AttemptRow[]);

      setIsLoading(false);
    }

    loadDashboard();
  }, [router]);

  useEffect(() => {
    if (isLoading || dashboardViewedRef.current) return;
    dashboardViewedRef.current = true;

    const metadata = {
      source: "dashboard",
      access_status: accessStatus,
      selected_course_slug: selectedCourseSlug ?? null,
      ...readMarketingParams(),
    };

    trackDashboardViewed(metadata);
    clientTrackEvent("dashboard_viewed", metadata);
  }, [accessStatus, isLoading, selectedCourseSlug]);

  const bandPredictorViewedRef = useRef(false);
  useEffect(() => {
    if (isLoading || bandPredictorViewedRef.current) return;
    if (accessStatus !== "active") return;
    bandPredictorViewedRef.current = true;
    clientTrackEvent("band_predictor_viewed", {
      source: "dashboard",
      selected_course_slug: selectedCourseSlug ?? null,
    });
  }, [isLoading, accessStatus, selectedCourseSlug]);

  const dailyReviewViewedRef = useRef(false);
  useEffect(() => {
    if (isLoading || dailyReviewViewedRef.current) return;
    dailyReviewViewedRef.current = true;
    clientTrackEvent("daily_review_viewed", {
      source: "dashboard",
      has_mastery: masteryRows.length > 0,
      selected_course_slug: selectedCourseSlug ?? null,
    });
  }, [isLoading, masteryRows.length, selectedCourseSlug]);

  const onboardingCoursePromptViewedRef = useRef(false);
  useEffect(() => {
    if (isLoading || onboardingCoursePromptViewedRef.current) return;
    if (accessStatus !== "active") return;
    if (selectedCourseSlug !== null) return;
    if (Object.keys(lessonProgress).length > 0) return;
    onboardingCoursePromptViewedRef.current = true;
    clientTrackEvent("onboarding_course_prompt_viewed", {
      source: "dashboard",
      access_status: accessStatus,
    });
  }, [isLoading, accessStatus, selectedCourseSlug, lessonProgress]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleSelectCourse(courseSlug: string) {
    if (!user) return;
    setIsSavingCourse(true);
    await supabase
      .from("profiles")
      .upsert({ id: user.id, selected_course_slug: courseSlug }, { onConflict: "id" });
    setSelectedCourseSlug(courseSlug);
    setIsCoursePickerOpen(false);
    setIsSavingCourse(false);

    const metadata = {
      source: "dashboard",
      access_status: accessStatus,
      selected_course_slug: courseSlug,
      ...readMarketingParams(),
    };
    trackCourseSelected(metadata);
    clientTrackEvent("course_selected", metadata);
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
      <>
        <StudentNav />
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
      </>
    );
  }

  const accessCopy = getUserAccessDashboardCopy(accessStatus);
  const availableCourses = courseCatalogue.filter(
    (course) => course.status === "available"
  );
  // Courses shown in the "What are you studying?" picker.
  // Include available courses plus any in_progress courses that have content.
  const coursePickerOptions = [
    ...availableCourses,
    ...newCoursePathways
      .filter(
        (c) =>
          c.status === "in_progress" &&
          c.units.some((u) => u.lessons.length > 0) &&
          !availableCourses.some((a) => a.courseSlug === c.slug)
      )
      .map((c) => ({ courseSlug: c.slug, courseTitle: c.title })),
  ];
  const showCoursePicker =
    accessStatus === "active" &&
    (selectedCourseSlug === null || isCoursePickerOpen);
  const selectedCourseTitle =
    selectedCourseSlug != null
      ? (coursePickerOptions.find((c) => c.courseSlug === selectedCourseSlug)?.courseTitle ?? null)
      : null;
  const progressRecords = Object.values(lessonProgress);
  const hasLessonProgress = progressRecords.length > 0;
  const continueLearningTarget = getContinueLearningTarget(progressRecords, selectedCourseSlug);
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
  // Every lesson in a unit, joined with the student's per-lesson (subtopic)
  // mastery so clicking a unit reveals lesson-level progress — including
  // lessons not yet started.
  function lessonsForTopic(row: MasteryRow): BreakdownLesson[] {
    const unit = newCoursePathways
      .find((p) => p.slug === row.course_slug)
      ?.units.find((u) => u.slug === row.topic_slug);
    if (!unit) return [];
    const masteryByLesson = new Map(
      subtopicMasteryRows
        .filter(
          (s) =>
            s.course_slug === row.course_slug && s.topic_slug === row.topic_slug
        )
        .map((s) => [s.subtopic_slug, s.mastery_score])
    );
    return unit.lessons.map((lesson) => ({
      name: lesson.title,
      score: masteryByLesson.has(lesson.slug)
        ? (masteryByLesson.get(lesson.slug) as number)
        : null,
      href: `/course/${row.course_slug}/${unit.slug}/${lesson.slug}`,
    }));
  }

  const hasMastery = masteryRows.length > 0;
  const avgMastery = hasMastery
    ? Math.round(
        masteryRows.reduce((s, r) => s + r.mastery_score, 0) / masteryRows.length
      )
    : 0;
  const masteryTrend = getMasteryTrendSummary(masteryRows, masteryHistoryRows);

  const totalCourseTopics =
    selectedCourseSlug != null
      ? (newCoursePathways.find((p) => p.slug === selectedCourseSlug)?.units.length ?? 0)
      : 0;
  const bandPrediction: BandPrediction = predictBand(
    masteryRows,
    selectedCourseSlug,
    totalCourseTopics
  );

  // Worksheet history: latest attempt (finished or not) keyed by worksheet_id.
  const latestAttemptByWorksheet = new Map<string, AttemptRow>();
  for (const attempt of recentAttempts) {
    if (!latestAttemptByWorksheet.has(attempt.worksheet_id)) {
      latestAttemptByWorksheet.set(attempt.worksheet_id, attempt);
    }
  }

  const hasWorksheets = assignedWorksheets.length > 0;

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

  const reviewQueue: DailyReviewItem[] = getDailyReviewQueue(
    masteryRows,
    subtopicMasteryRows,
    selectedCourseSlug ?? null,
    topicLabelMap,
    subtopicLabelMap,
  );
  const streakActivity: Array<string | null | undefined> = [
    ...Object.values(lessonProgress).map((r) => r.updatedAt),
    ...masteryHistoryRows.map((r) => r.created_at),
    ...recentAttempts.map((a) => a.completed_at),
    ...recentAttempts.map((a) => a.started_at),
  ];
  const firstOpenWorksheet =
    assignedWorksheets.find((ws) => !latestAttemptByWorksheet.get(ws.id)?.completed_at) ??
    assignedWorksheets[0] ??
    null;
  const firstOpenWorksheetAttempt = firstOpenWorksheet
    ? latestAttemptByWorksheet.get(firstOpenWorksheet.id) ?? null
    : null;
  const firstOpenWorksheetInProgress =
    !!firstOpenWorksheetAttempt && !firstOpenWorksheetAttempt.completed_at;
  const firstOpenWorksheetHref = firstOpenWorksheet
    ? firstOpenWorksheetInProgress && firstOpenWorksheetAttempt
      ? `/worksheet/${firstOpenWorksheet.share_token}?attempt=${firstOpenWorksheetAttempt.id}`
      : `/worksheet/${firstOpenWorksheet.share_token}`
    : null;
  const recommendedLessonHref =
    continueLearningTarget?.href ?? studyPlan.nextTopic?.href ?? nextBestAction?.href ?? "/course";
  const recommendedLessonTitle =
    studyPlan.nextTopic?.title ??
    continueLearningTarget?.lessonTitle ??
    nextBestAction?.topicName ??
    null;
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
        : firstOpenWorksheetInProgress
        ? "Resume worksheet"
        : firstOpenWorksheet
        ? "Open worksheet"
        : reviewQueue.length > 0
        ? "Review topic"
        : "Generate revision",
      href: hasReviewedTodaysRevision
        ? "/dashboard/worksheets"
        : firstOpenWorksheetHref
        ? firstOpenWorksheetHref
        : reviewQueue.length > 0
        ? reviewQueue[0].suggested_action_href
        : undefined,
      onClick:
        !hasReviewedTodaysRevision && !firstOpenWorksheet && reviewQueue.length === 0
          ? () => void handleGenerateRevisionWorksheet()
          : undefined,
      disabled: isGeneratingWorksheet,
    },
  ];
  const isOnboardingComplete = onboardingChecklist.every((item) => item.done);

  const isOnboardingPhase1 =
    accessStatus === "active" && selectedCourseSlug === null && !hasLessonProgress;
  const isOnboardingPhase2 =
    accessStatus === "active" && selectedCourseSlug !== null && !hasLessonProgress;
  const isOnboardingMode = isOnboardingPhase1 || isOnboardingPhase2;
  const firstLessonHref = getFirstLessonHref(selectedCourseSlug ?? null);

  const firstSessionChecklist = [
    {
      title: "Choose your course",
      description:
        "Pick the course you're studying so Nova Maths can personalise your experience.",
      done: selectedCourseSlug !== null,
      actionLabel: selectedCourseSlug !== null ? "Change course" : "Choose course",
      onClick: () => setIsCoursePickerOpen(true),
      disabled: false,
    },
    {
      title: "Start your first lesson",
      description: "Work through your first guided lesson and practice questions.",
      done: hasLessonProgress,
      actionLabel: hasLessonProgress ? "Continue learning" : "Start first lesson",
      onClick: () => {
        clientTrackEvent("onboarding_first_lesson_clicked", {
          source: "dashboard",
          course_slug: selectedCourseSlug ?? null,
          href: firstLessonHref,
        });
        router.push(firstLessonHref);
      },
      disabled: selectedCourseSlug === null,
    },
    {
      title: "Complete a mastery quiz",
      description:
        "Submit a mastery quiz at the end of a lesson to track your real progress.",
      done: hasCompletedMasteryQuiz,
      actionLabel: hasCompletedMasteryQuiz ? "Keep practising" : "Open a lesson",
      onClick: () => router.push(firstLessonHref),
      disabled: selectedCourseSlug === null,
    },
    {
      title: "Unlock your band estimate",
      description:
        "Complete a few mastery quizzes and Nova Maths will estimate your HSC band.",
      done:
        bandPrediction.state === "ready" || bandPrediction.state === "building",
      actionLabel:
        bandPrediction.state === "ready"
          ? "View estimate"
          : bandPrediction.state === "building"
          ? "Keep going"
          : "Complete more lessons",
      onClick: () => {
        if (
          bandPrediction.state === "ready" ||
          bandPrediction.state === "building"
        ) {
          document
            .getElementById("band-predictor")
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(firstLessonHref);
        }
      },
      disabled: !hasCompletedMasteryQuiz,
    },
  ];
  const isFirstSessionComplete = firstSessionChecklist.every((item) => item.done);

  return (
    <>
    <StudentNav />
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

        {!isOnboardingMode && (
          <StreakCard
            activityTimestamps={streakActivity}
            continueHref={recommendedLessonHref}
          />
        )}

        {/* ── Onboarding focus (active user, no progress yet) ───────────────── */}
        {isOnboardingMode ? (
          <>
            <section className="rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Getting started
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                You&apos;re in — start with one course and we&apos;ll personalise from there.
              </h2>

              {isOnboardingPhase1 || isCoursePickerOpen ? (
                <div className="mt-6">
                  <p className="text-base font-semibold text-slate-900">
                    Step 1 — Choose your course
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    HSC students: Year 12 Advanced and Standard 2 are the best
                    starting points.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {coursePickerOptions.map((course) => {
                      const isHighlighted = HSC_HIGHLIGHT_SLUGS.has(
                        course.courseSlug
                      );
                      return (
                        <button
                          key={course.courseSlug}
                          type="button"
                          onClick={() => void handleSelectCourse(course.courseSlug)}
                          disabled={isSavingCourse}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold shadow-sm transition disabled:opacity-60 ${
                            course.courseSlug === selectedCourseSlug
                              ? "border-blue-600 bg-blue-600 text-white"
                              : isHighlighted
                              ? "border-blue-200 bg-white text-slate-900 ring-2 ring-blue-100 hover:border-blue-400 hover:bg-blue-50"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {course.courseTitle}
                          {isHighlighted ? (
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              HSC
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                  {isCoursePickerOpen && selectedCourseSlug !== null ? (
                    <button
                      type="button"
                      onClick={() => setIsCoursePickerOpen(false)}
                      className="mt-3 text-sm text-slate-500 underline hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-base font-semibold text-slate-900">
                    Step 2 — Start your first lesson
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    You&apos;re studying{" "}
                    <span className="font-semibold">{selectedCourseTitle}</span>.
                    Open your first lesson and work through the guided content.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href={firstLessonHref}
                      onClick={() => {
                        clientTrackEvent("onboarding_first_lesson_clicked", {
                          source: "dashboard",
                          course_slug: selectedCourseSlug ?? null,
                          href: firstLessonHref,
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Start first lesson
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsCoursePickerOpen(true)}
                      className="text-sm text-slate-500 underline hover:text-slate-700"
                    >
                      Change course
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* First-session checklist */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Your progress
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    First session checklist
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  {firstSessionChecklist.filter((item) => item.done).length}/
                  {firstSessionChecklist.length} done
                </span>
              </div>

              {isFirstSessionComplete ? (
                <p className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                  First session complete — your full dashboard is now unlocked.
                </p>
              ) : null}

              <ol className="mt-6 space-y-3">
                {firstSessionChecklist.map((item, index) => (
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
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {item.actionLabel}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          </>
        ) : null}

        {/* ── Normal dashboard (has progress, or non-active users) ─────────── */}
        {!isOnboardingMode ? (
          <>
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

          {showCoursePicker ? (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900">
                What are you studying?
              </p>
              <p className="mt-1 text-sm text-blue-700">
                Choose your course so Nova Maths can recommend the right lessons for you.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coursePickerOptions.map((course) => (
                  <button
                    key={course.courseSlug}
                    type="button"
                    onClick={() => void handleSelectCourse(course.courseSlug)}
                    disabled={isSavingCourse}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition disabled:opacity-60 ${
                      course.courseSlug === selectedCourseSlug
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-blue-300 bg-white text-slate-900 hover:bg-blue-100"
                    }`}
                  >
                    {course.courseTitle}
                  </button>
                ))}
                {isCoursePickerOpen && selectedCourseSlug !== null ? (
                  <button
                    type="button"
                    onClick={() => setIsCoursePickerOpen(false)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {accessStatus === "active" ? (
              <>
                <Link
                  href={continueLearningTarget?.href ?? (selectedCourseSlug ? `/course/${selectedCourseSlug}` : "/course")}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  {continueLearningTarget !== null || selectedCourseSlug !== null
                    ? "Continue learning"
                    : "Choose your course"}
                </Link>
                {selectedCourseTitle && !isCoursePickerOpen ? (
                  <span className="inline-flex items-center gap-2 self-center text-sm text-slate-500">
                    {selectedCourseTitle}
                    <button
                      type="button"
                      onClick={() => setIsCoursePickerOpen(true)}
                      className="text-slate-400 underline hover:text-slate-700"
                    >
                      Change
                    </button>
                  </span>
                ) : null}
                <Link
                  href="/diagnostic/select?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  {hasDiagnosticResult ? "Retake diagnostic" : "Start diagnostic"}
                </Link>
                <Link
                  href="/dashboard/worksheets"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  View worksheets
                </Link>
                <Link
                  href="/course"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Browse courses
                </Link>
              </>
            ) : null}

            {accessStatus === "pending" || accessStatus === "none" ? (
              <>
                <Link
                  href="/checkout?offer=online-learning"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Upgrade — $19/month
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
                Follow these five steps to turn your free account into a clear study routine.
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

        {/* ── Band Predictor ────────────────────────────────────────────────── */}
        {accessStatus === "active" ? (
          <section id="band-predictor" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Band Predictor
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Estimated current band
            </h2>

            {bandPrediction.state === "no_course" ? (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Choose your course above to start estimating your band.
              </p>
            ) : bandPrediction.state === "no_data" ? (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Complete a lesson quiz or mastery check to start building your estimate.
              </p>
            ) : bandPrediction.state === "building" ? (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-lg font-bold text-amber-900">Building estimate</p>
                <p className="mt-1 text-sm text-amber-800">
                  Complete more topics so Nova Maths can build a more accurate picture.
                </p>
                <p className="mt-3 text-xs text-amber-700">
                  Based on completed Nova Maths practice. This is not an official HSC prediction.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-4xl font-extrabold tracking-tight text-slate-950">
                      {bandPrediction.band}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Confidence:{" "}
                      <span
                        className={`font-semibold capitalize ${
                          bandPrediction.confidence === "high"
                            ? "text-emerald-700"
                            : bandPrediction.confidence === "medium"
                            ? "text-amber-700"
                            : "text-slate-500"
                        }`}
                      >
                        {bandPrediction.confidence}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={bandPrediction.nextActionHref}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    {bandPrediction.nextActionLabel}
                  </Link>
                </div>
                <p className="text-xs text-slate-400">
                  Based on completed Nova Maths practice. This is not an official HSC prediction.
                </p>
              </div>
            )}
          </section>
        ) : null}

        {/* ── Today’s review ────────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Daily review
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Today&apos;s review</h2>
            </div>
            {hasMastery ? (
              <button
                type="button"
                onClick={() => void handleGenerateRevisionWorksheet()}
                disabled={isGeneratingWorksheet}
                className="shrink-0 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGeneratingWorksheet ? "Generating..." : "Generate review worksheet"}
              </button>
            ) : null}
          </div>

          {!hasMastery ? (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              {accessStatus === "active" && selectedCourseSlug !== null
                ? `Complete your first ${selectedCourseTitle ?? "course"} lesson quiz to unlock personalised review.`
                : "Complete a lesson quiz to unlock personalised review."}
            </p>
          ) : reviewQueue.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
              You&apos;re all caught up. Keep practising to maintain your mastery.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {reviewQueue.map((item) => (
                <li
                  key={`${item.course_slug}::${item.topic_slug}::${item.subtopic_slug ?? ""}`}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="tabular-nums">{item.mastery_score}% mastery</span>
                      <span>Last practised: {formatLastPractised(item.last_updated)}</span>
                      {item.subtopic_slug ? (
                        <span className="text-slate-400">
                          {topicLabel(item.course_slug, item.topic_slug)}
                        </span>
                      ) : null}
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${
                          item.reason === "weak"
                            ? "bg-red-100 text-red-700"
                            : item.reason === "stale"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.reason === "weak"
                          ? "Needs strengthening"
                          : item.reason === "stale"
                          ? "Due for review"
                          : "Confidence building"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={item.suggested_action_href}
                    onClick={() => {
                      clientTrackEvent("daily_review_item_clicked", {
                        source: "dashboard",
                        course_slug: item.course_slug,
                        topic_slug: item.topic_slug,
                        subtopic_slug: item.subtopic_slug ?? null,
                        reason: item.reason,
                      });
                    }}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Practise this
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {adaptiveWorksheetError ? (
            <p className="mt-3 text-sm text-red-600">{adaptiveWorksheetError}</p>
          ) : null}
        </section>

        {/* ── Mastery summary ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Mastery
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Your mastery</h2>

          {accessStatus !== "active" ? (
            <div className="mt-5 rounded-2xl border border-slate-900 bg-slate-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Premium
              </p>
              <p className="mt-1 font-semibold">
                Mastery tracking is part of Premium
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Mastery quizzes and your mastery map show exactly which topics
                are exam-ready and which need work. Upgrade to unlock them.
              </p>
              <Link
                href="/checkout?offer=online-learning"
                className="mt-3 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Upgrade — $19/month
              </Link>
            </div>
          ) : (
          <>
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
              {/* Polished topic breakdown — mirrors the home-page result preview. */}
              <div className="mt-6">
                <TopicBreakdownCard
                  title={selectedCourseTitle ?? "Your mastery"}
                  subtitle="Your topic breakdown"
                  topics={masteryRows.map((row) => ({
                    name: topicLabel(row.course_slug, row.topic_slug),
                    score: row.mastery_score,
                    lessons: lessonsForTopic(row),
                  }))}
                  overallScore={avgMastery}
                  overallLabel="Overall mastery"
                  recommended={
                    recommendedLessonTitle
                      ? {
                          title: recommendedLessonTitle,
                          description: "Targets your weakest topic first.",
                          href: recommendedLessonHref,
                        }
                      : null
                  }
                />
              </div>
            </>
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
                onClick={() => {
                  const metadata = {
                    source: "dashboard",
                    access_status: accessStatus,
                    selected_course_slug: selectedCourseSlug ?? null,
                    continue_target_href: continueLearningTarget.href,
                    ...readMarketingParams(),
                  };
                  trackContinueLearningClicked(metadata);
                  clientTrackEvent("continue_learning_clicked", metadata, {
                    beacon: true,
                  });
                }}
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
          </>
        ) : null}

        {accessStatus === "active" || accessStatus === "revoked" ? (
          <section id="account" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
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
    </>
  );
}
