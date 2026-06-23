import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { summariseAnalytics } from "../../../lib/analytics/summariseAnalytics";

// ── Types ─────────────────────────────────────────────────────────────────────

type AnalyticsEventRow = {
  id: string;
  user_id: string | null;
  anonymous_id: string | null;
  event_name: string;
  page: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type CountRow = {
  event_name: string;
  user_id: string | null;
  anonymous_id: string | null;
  page: string | null;
};

type DiagnosticAnalyticsRow = {
  event_name: string;
  user_id: string | null;
  anonymous_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type AdsFunnelRawRow = {
  event_name: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
}

function formatOptionalDateTime(value: string | null | undefined): string {
  if (!value) return "No data";
  return formatDateTime(value);
}

function isStale(value: string | null | undefined, thresholdHours: number) {
  if (!value) return true;
  const ageMs = Date.now() - new Date(value).getTime();
  return Number.isFinite(ageMs) ? ageMs > thresholdHours * 60 * 60 * 1000 : true;
}

function shortId(value: string | null | undefined): string {
  if (!value) return "—";
  return value.length > 8 ? `${value.slice(0, 8)}…` : value;
}

function metaPreview(meta: Record<string, unknown> | null): string {
  if (!meta || Object.keys(meta).length === 0) return "—";
  const raw = JSON.stringify(meta);
  return raw.length > 80 ? `${raw.slice(0, 80)}…` : raw;
}

function formatTimeShort(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
}

function formatDayShort(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
}

// Concise human duration between two ISO timestamps, e.g. "4m", "2h 10m".
function formatSpan(startIso: string, endIso: string): string {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms < 1000) return "instant";
  const totalMinutes = Math.floor(ms / 60000);
  if (totalMinutes < 1) return `${Math.floor(ms / 1000)}s`;
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

// Colour-codes an event chip by funnel stage so a journey is scannable at a glance.
function eventTone(name: string): string {
  if (name.startsWith("diagnostic_"))
    return "border-blue-200 bg-blue-50 text-blue-800";
  if (name.startsWith("checkout_"))
    return "border-amber-200 bg-amber-50 text-amber-900";
  if (name === "trial_started" || name === "payment_success" || name === "signup_completed")
    return "border-emerald-300 bg-emerald-100 text-emerald-900 font-semibold";
  if (name.startsWith("trial_"))
    return "border-indigo-200 bg-indigo-50 text-indigo-900";
  if (
    name.startsWith("lesson_") ||
    name.startsWith("worksheet_") ||
    name.includes("mastery")
  )
    return "border-violet-200 bg-violet-50 text-violet-900";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

function identityKey(
  userId: string | null | undefined,
  anonymousId: string | null | undefined
): string | null {
  if (userId) return `u:${userId}`;
  if (anonymousId) return `a:${anonymousId}`;
  return null;
}

function metadataString(
  metadata: Record<string, unknown> | null,
  key: string
): string | null {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function metadataNumber(
  metadata: Record<string, unknown> | null,
  key: string
): number | null {
  const value = metadata?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function trialCtaSource(row: AnalyticsEventRow): string {
  return (
    metadataString(row.metadata, "source") ??
    row.page ??
    metadataString(row.metadata, "href") ??
    "Unknown source"
  );
}

function healthTone(state: "healthy" | "stale" | "error") {
  if (state === "error") return "border-red-200 bg-red-50 text-red-800";
  if (state === "stale") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-emerald-200 bg-emerald-50 text-emerald-900";
}

// ── Alert types ───────────────────────────────────────────────────────────────

type AlertKind = "warning" | "positive";

type FunnelAlertData = {
  kind: AlertKind;
  title: string;
  detail: string;
};

function buildAlerts(counts: {
  hscMathsViews: number;
  checkoutStarts: number;
  diagnosticStarts: number;
  diagnosticCompletions: number;
  trialStarts: number;
  worksheetCompletions: number;
}): FunnelAlertData[] {
  const alerts: FunnelAlertData[] = [];

  if (counts.hscMathsViews > 20 && counts.checkoutStarts === 0) {
    alerts.push({
      kind: "warning",
      title: "Traffic is not reaching checkout.",
      detail: `HSC maths page had ${counts.hscMathsViews} views but 0 checkout starts in this period.`,
    });
  }

  if (
    counts.diagnosticStarts > 10 &&
    counts.diagnosticCompletions / counts.diagnosticStarts < 0.4
  ) {
    const rate = Math.round(
      (counts.diagnosticCompletions / counts.diagnosticStarts) * 100
    );
    alerts.push({
      kind: "warning",
      title: "Diagnostic completion rate is low.",
      detail: `${counts.diagnosticCompletions} of ${counts.diagnosticStarts} started diagnostics were completed (${rate}%).`,
    });
  }

  if (counts.checkoutStarts > 5 && counts.trialStarts === 0) {
    alerts.push({
      kind: "warning",
      title: "Checkout starts are not becoming trials.",
      detail: `${counts.checkoutStarts} checkout starts recorded with 0 trial conversions.`,
    });
  }

  if (counts.trialStarts > 0) {
    alerts.push({
      kind: "positive",
      title: "Trials are starting.",
      detail: `${counts.trialStarts} trial start${counts.trialStarts === 1 ? "" : "s"} in this period.`,
    });
  }

  if (counts.worksheetCompletions > 0) {
    alerts.push({
      kind: "positive",
      title: "Students are completing worksheets.",
      detail: `${counts.worksheetCompletions} worksheet completion${counts.worksheetCompletions === 1 ? "" : "s"} in this period.`,
    });
  }

  return alerts;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FunnelAlert({ kind, title, detail }: FunnelAlertData) {
  const isWarning = kind === "warning";
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        isWarning
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-emerald-200 bg-emerald-50 text-emerald-900"
      }`}
    >
      <span className="mt-0.5 shrink-0 text-base leading-none">
        {isWarning ? "⚠" : "✓"}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-sm opacity-80">{detail}</p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number | string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {String(value)}
      </p>
      {subtitle ? (
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  );
}

function RateCard({
  label,
  numerator,
  denominator,
  uniqueNumerator,
  uniqueDenominator,
  description,
}: {
  label: string;
  numerator: number;
  denominator: number;
  uniqueNumerator?: number;
  uniqueDenominator?: number;
  description: string;
}) {
  const rate = pct(numerator, denominator);
  const uRate =
    uniqueNumerator !== undefined && uniqueDenominator !== undefined
      ? pct(uniqueNumerator, uniqueDenominator)
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {rate}
      </p>
      {uRate !== null ? (
        <p className="mt-0.5 text-sm font-semibold text-slate-600">
          {uRate}{" "}
          <span className="font-normal text-slate-400">unique</span>
        </p>
      ) : null}
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const ALLOWED_DAYS = [1, 7, 30] as const;
type AllowedDays = (typeof ALLOWED_DAYS)[number];

function parseDays(raw: string | string[] | undefined): AllowedDays {
  const n = Number(raw);
  return (ALLOWED_DAYS as readonly number[]).includes(n)
    ? (n as AllowedDays)
    : 7;
}

function parseDiagnosticYear(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && value.trim().length > 0 ? value.trim() : "all";
}

function analyticsHref(days: AllowedDays, diagnosticYear: string) {
  const params = new URLSearchParams({ days: String(days) });
  if (diagnosticYear !== "all") {
    params.set("diagnosticYear", diagnosticYear);
  }
  return `/admin/analytics?${params.toString()}`;
}

function sinceDaysAgo(days: AllowedDays): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const days = parseDays(params?.days);
  const selectedDiagnosticYear = parseDiagnosticYear(params?.diagnosticYear);
  const since = sinceDaysAgo(days);

  // Fetch event_name + identity columns so we can compute both totals and
  // unique identity counts in a single query.
  const { data: countData, error: countError } = await supabaseAdmin
    .from("analytics_events")
    .select("event_name, user_id, anonymous_id, page")
    .gte("created_at", since);

  // Recent events for the activity log.
  const { data: recentData, error: recentError } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "id, user_id, anonymous_id, event_name, page, metadata, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: trialCtaSourceData, error: trialCtaSourceError } =
    await supabaseAdmin
      .from("analytics_events")
      .select(
        "id, user_id, anonymous_id, event_name, page, metadata, created_at"
      )
      .eq("event_name", "trial_cta_clicked")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1000);

  // Per-question answer counts — only populated once diagnostic_question_answered is tracked.
  const { data: diagnosticEventData, error: diagnosticEventError } =
    await supabaseAdmin
      .from("analytics_events")
      .select("event_name, user_id, anonymous_id, metadata, created_at")
      .in("event_name", [
        "diagnostic_cta_clicked",
        "diagnostic_started",
        "diagnostic_question_answered",
        "diagnostic_completed",
      ])
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .limit(20000);

  const { data: adsFunnelRaw, error: adsFunnelError } = await supabaseAdmin
    .from("analytics_events")
    .select("event_name, metadata, created_at")
    .in("event_name", [
      "hsc_maths_viewed",
      "diagnostic_cta_clicked",
      "diagnostic_started",
      "diagnostic_completed",
      "trial_cta_clicked",
      "checkout_started",
      "checkout_purchase_attempted",
      "checkout_redirected_to_stripe",
      "checkout_exited",
      "checkout_back_to_home_clicked",
      "checkout_enquire_instead_clicked",
      "checkout_cancelled_from_stripe",
      "payment_success",
      "trial_started",
      "dashboard_viewed",
      "lesson_started",
    ])
    .gte("created_at", since);

  // Period-bound events used to reconstruct per-person journeys. Ordered newest
  // first so the limit keeps the most recent activity; each person's events are
  // re-sorted ascending for display.
  const { data: journeyData, error: journeyError } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "id, user_id, anonymous_id, event_name, page, metadata, created_at"
    )
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(3000);

  const tableNotReady =
    countError?.message?.includes("does not exist") ||
    recentError?.message?.includes("does not exist") ||
    trialCtaSourceError?.message?.includes("does not exist") ||
    diagnosticEventError?.message?.includes("does not exist") ||
    adsFunnelError?.message?.includes("does not exist") ||
    journeyError?.message?.includes("does not exist");

  if (tableNotReady) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-4xl space-y-6">
          <Link
            href="/admin"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            ← Admin
          </Link>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <p className="font-semibold">Migration not applied</p>
            <p className="mt-2 text-sm">
              The <code className="font-mono">analytics_events</code> table does
              not exist yet. Run{" "}
              <code className="font-mono">
                lib/supabase-migrations/012_analytics_events.sql
              </code>{" "}
              in the Supabase SQL editor, then reload this page.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ── Build totals and unique-identity sets in one pass ─────────────────────
  // Identity key: "u:<user_id>" when authenticated, "a:<anonymous_id>" otherwise.
  // Events with neither identity are counted in totals but excluded from unique.

  const totalCounts = new Map<string, number>();
  const uniqueSets = new Map<string, Set<string>>();
  const allIdentities = new Set<string>();
  const pageCounts = new Map<string, number>();

  for (const raw of countData ?? []) {
    const row = raw as CountRow;
    totalCounts.set(row.event_name, (totalCounts.get(row.event_name) ?? 0) + 1);

    const id = identityKey(row.user_id, row.anonymous_id);

    if (id) {
      allIdentities.add(id);
      const set = uniqueSets.get(row.event_name) ?? new Set<string>();
      set.add(id);
      uniqueSets.set(row.event_name, set);
    }

    if (row.page) {
      pageCounts.set(row.page, (pageCounts.get(row.page) ?? 0) + 1);
    }
  }

  function count(name: string) {
    return totalCounts.get(name) ?? 0;
  }
  function unique(name: string) {
    return uniqueSets.get(name)?.size ?? 0;
  }

  // ── Totals ─────────────────────────────────────────────────────────────────

  const homepageViews = count("homepage_viewed");
  const hscMathsViews = count("hsc_maths_viewed");
  const diagnosticCtaClicks = count("diagnostic_cta_clicked");
  const diagnosticStarts = count("diagnostic_started");
  const diagnosticBegins = count("diagnostic_begun");
  const diagnosticCompletions = count("diagnostic_completed");
  const trialCtaClicks = count("trial_cta_clicked");
  const checkoutStarts = count("checkout_started");
  const checkoutFormSubmissions = count("checkout_form_submitted");
  const checkoutPurchaseAttempts = count("checkout_purchase_attempted");
  const checkoutRedirectsToStripe = count("checkout_redirected_to_stripe");
  const checkoutExits = count("checkout_exited");
  const checkoutBackClicks = count("checkout_back_to_home_clicked");
  const checkoutEnquiryClicks = count("checkout_enquire_instead_clicked");
  const checkoutStripeCancellations = count("checkout_cancelled_from_stripe");
  const trialStarts = count("trial_started");
  const signupCompletions = count("signup_completed");
  const adaptiveWorksheetGenerations = count("adaptive_worksheet_generated");
  const lessonMasterySubmissions = count("lesson_mastery_submitted");
  const lessonMasteryPasses = count("lesson_mastery_passed");
  const freeLessonViews = count("free_lesson_viewed");
  const sampleLessonViews = count("sample_lesson_viewed");
  const worksheetCompletions = count("worksheet_completed");
  const totalLast7Days = [...totalCounts.values()].reduce((s, n) => s + n, 0);

  // ── Unique identities ──────────────────────────────────────────────────────

  const totalUniqueIdentities = allIdentities.size;
  const uniqueHomepageViews = unique("homepage_viewed");
  const uniqueHscMathsViews = unique("hsc_maths_viewed");
  const uniqueDiagnosticCtaClicks = unique("diagnostic_cta_clicked");
  const uniqueTrialCtaClicks = unique("trial_cta_clicked");
  const uniqueCheckoutStarts = unique("checkout_started");
  const uniqueCheckoutForms = unique("checkout_form_submitted");
  const uniqueCheckoutPurchaseAttempts = unique("checkout_purchase_attempted");
  const uniqueStripeRedirects = unique("checkout_redirected_to_stripe");
  const uniqueCheckoutExits = unique("checkout_exited");
  const uniqueCheckoutBackClicks = unique("checkout_back_to_home_clicked");
  const uniqueCheckoutEnquiryClicks = unique("checkout_enquire_instead_clicked");
  const uniqueCheckoutStripeCancellations = unique("checkout_cancelled_from_stripe");
  const uniqueTrialStarts = unique("trial_started");
  const uniqueDiagnosticStarts = unique("diagnostic_started");
  const uniqueDiagnosticBegins = unique("diagnostic_begun");
  const uniqueDiagnosticCompletions = unique("diagnostic_completed");

  // ── Funnel steps (total + unique per step) ─────────────────────────────────

  const funnelSteps = [
    { label: "Homepage viewed",       event: "homepage_viewed",               total: homepageViews,             uniq: uniqueHomepageViews },
    { label: "HSC maths viewed",      event: "hsc_maths_viewed",              total: hscMathsViews,             uniq: uniqueHscMathsViews },
    { label: "Diagnostic CTA clicked", event: "diagnostic_cta_clicked",       total: diagnosticCtaClicks,       uniq: uniqueDiagnosticCtaClicks },
    { label: "Diagnostic started",    event: "diagnostic_started",            total: diagnosticStarts,          uniq: uniqueDiagnosticStarts },
    { label: "Diagnostic begun",      event: "diagnostic_begun",              total: diagnosticBegins,          uniq: uniqueDiagnosticBegins },
    { label: "Diagnostic completed",  event: "diagnostic_completed",          total: diagnosticCompletions,     uniq: uniqueDiagnosticCompletions },
    { label: "Trial CTA clicked",     event: "trial_cta_clicked",             total: trialCtaClicks,            uniq: uniqueTrialCtaClicks },
    { label: "Checkout started",      event: "checkout_started",              total: checkoutStarts,            uniq: uniqueCheckoutStarts },
    { label: "Purchase button pressed", event: "checkout_purchase_attempted", total: checkoutPurchaseAttempts, uniq: uniqueCheckoutPurchaseAttempts },
    { label: "Redirected to Stripe",  event: "checkout_redirected_to_stripe", total: checkoutRedirectsToStripe, uniq: uniqueStripeRedirects },
    { label: "Trial started",         event: "trial_started",                 total: trialStarts,               uniq: uniqueTrialStarts },
  ];

  const trialCtaSources = new Map<
    string,
    { source: string; clicks: number; identities: Set<string> }
  >();

  for (const raw of trialCtaSourceData ?? []) {
    const row = raw as AnalyticsEventRow;
    const source = trialCtaSource(row);
    const sourceRow =
      trialCtaSources.get(source) ??
      { source, clicks: 0, identities: new Set<string>() };

    sourceRow.clicks += 1;
    const id = identityKey(row.user_id, row.anonymous_id);
    if (id) {
      sourceRow.identities.add(id);
    }
    trialCtaSources.set(source, sourceRow);
  }

  const trialCtaSourceRows = [...trialCtaSources.values()].sort(
    (a, b) =>
      b.clicks - a.clicks ||
      b.identities.size - a.identities.size ||
      a.source.localeCompare(b.source)
  );

  // ── Diagnostic question-level analysis ────────────────────────────────────
  type DiagnosticSession = {
    key: string;
    yearLevel: string;
    started: boolean;
    completed: boolean;
    maxQuestionReached: number;
    totalQuestions: number | null;
    lastSeenAt: string;
  };

  type DiagnosticQuestionRow = {
    questionNumber: number;
    reached: number;
    completionPct: number | null;
    dropFromPrevious: number | null;
    dropPct: number | null;
    isBigDrop: boolean;
  };

  const diagnosticSessions = new Map<string, DiagnosticSession>();
  const diagnosticYears = new Set<string>();

  function diagnosticSession(row: DiagnosticAnalyticsRow): DiagnosticSession | null {
    const id = identityKey(row.user_id, row.anonymous_id);
    if (!id) return null;

    const yearLevel = metadataString(row.metadata, "yearLevel") ?? "unknown";
    diagnosticYears.add(yearLevel);

    const key = `${id}:${yearLevel}`;
    const existing = diagnosticSessions.get(key);
    if (existing) {
      existing.lastSeenAt = row.created_at;
      return existing;
    }

    const session = {
      key,
      yearLevel,
      started: false,
      completed: false,
      maxQuestionReached: 0,
      totalQuestions: null,
      lastSeenAt: row.created_at,
    };
    diagnosticSessions.set(key, session);
    return session;
  }

  for (const raw of diagnosticEventData ?? []) {
    const row = raw as DiagnosticAnalyticsRow;
    const session = diagnosticSession(row);
    if (!session) continue;

    if (row.event_name === "diagnostic_started") {
      session.started = true;
      const totalQuestions = metadataNumber(row.metadata, "totalQuestions");
      if (totalQuestions !== null) session.totalQuestions = totalQuestions;
      continue;
    }

    if (row.event_name === "diagnostic_completed") {
      session.completed = true;
      const totalQuestions = metadataNumber(row.metadata, "totalQuestions");
      if (totalQuestions !== null) {
        session.totalQuestions = totalQuestions;
        session.maxQuestionReached = Math.max(
          session.maxQuestionReached,
          totalQuestions
        );
      }
      continue;
    }

    if (row.event_name === "diagnostic_question_answered") {
      const rawQuestionIndex = metadataNumber(row.metadata, "questionIndex");
      if (rawQuestionIndex === null) continue;

      const questionNumber =
        rawQuestionIndex <= 0
          ? Math.max(1, Math.round(rawQuestionIndex + 1))
          : Math.round(rawQuestionIndex);

      session.maxQuestionReached = Math.max(
        session.maxQuestionReached,
        questionNumber
      );

      const totalQuestions = metadataNumber(row.metadata, "totalQuestions");
      if (totalQuestions !== null) session.totalQuestions = totalQuestions;
    }
  }

  const diagnosticYearOptions = [...diagnosticYears].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  const activeDiagnosticYear = diagnosticYears.has(selectedDiagnosticYear)
    ? selectedDiagnosticYear
    : "all";

  const allDiagnosticSessions = [...diagnosticSessions.values()];
  const filteredDiagnosticSessions =
    activeDiagnosticYear === "all"
      ? allDiagnosticSessions
      : allDiagnosticSessions.filter(
          (session) => session.yearLevel === activeDiagnosticYear
        );

  const filteredStartedSessions = filteredDiagnosticSessions.filter(
    (session) => session.started || session.maxQuestionReached > 0 || session.completed
  );
  const filteredStartedCount = filteredStartedSessions.length;
  const filteredCompletedCount = filteredStartedSessions.filter(
    (session) => session.completed
  ).length;
  const reachedTotal = filteredStartedSessions.reduce(
    (sum, session) => sum + session.maxQuestionReached,
    0
  );
  const averageQuestionReached =
    filteredStartedCount > 0
      ? Number((reachedTotal / filteredStartedCount).toFixed(1))
      : null;

  const maxDiagnosticQuestions = Math.max(
    0,
    ...filteredStartedSessions.map(
      (session) => session.totalQuestions ?? session.maxQuestionReached
    )
  );

  const questionDropRows: DiagnosticQuestionRow[] = Array.from(
    { length: maxDiagnosticQuestions },
    (_, index) => {
      const questionNumber = index + 1;
      const reached = filteredStartedSessions.filter(
        (session) => session.maxQuestionReached >= questionNumber
      ).length;
      const previous =
        questionNumber === 1
          ? filteredStartedCount
          : filteredStartedSessions.filter(
              (session) => session.maxQuestionReached >= questionNumber - 1
            ).length;
      const dropFromPrevious = previous - reached;
      const dropPct =
        previous > 0 ? Math.round((dropFromPrevious / previous) * 100) : null;

      return {
        questionNumber,
        reached,
        completionPct:
          filteredStartedCount > 0
            ? Math.round((reached / filteredStartedCount) * 100)
            : null,
        dropFromPrevious,
        dropPct,
        isBigDrop: dropPct !== null && dropPct > 25,
      };
    }
  );

  const biggestDropQuestion =
    questionDropRows
      .filter((row) => row.dropPct !== null)
      .sort(
        (a, b) =>
          (b.dropFromPrevious ?? 0) - (a.dropFromPrevious ?? 0) ||
          (b.dropPct ?? 0) - (a.dropPct ?? 0)
      )[0] ?? null;

  const diagnosticYearRows = diagnosticYearOptions.map((yearLevel) => {
    const sessions = allDiagnosticSessions.filter(
      (session) => session.yearLevel === yearLevel
    );
    const starts = sessions.filter(
      (session) => session.started || session.maxQuestionReached > 0 || session.completed
    ).length;
    const completions = sessions.filter((session) => session.completed).length;
    const average =
      starts > 0
        ? Number(
            (
              sessions.reduce(
                (sum, session) => sum + session.maxQuestionReached,
                0
              ) / starts
            ).toFixed(1)
          )
        : null;
    const maxQuestions = Math.max(
      0,
      ...sessions.map((session) => session.totalQuestions ?? session.maxQuestionReached)
    );
    const questionDrops = Array.from({ length: maxQuestions }, (_, index) => {
      const questionNumber = index + 1;
      const reached = sessions.filter(
        (session) => session.maxQuestionReached >= questionNumber
      ).length;
      const previous =
        questionNumber === 1
          ? starts
          : sessions.filter(
              (session) => session.maxQuestionReached >= questionNumber - 1
            ).length;
      const dropFromPrevious = previous - reached;
      const dropPct =
        previous > 0 ? Math.round((dropFromPrevious / previous) * 100) : null;
      return { questionNumber, dropFromPrevious, dropPct };
    });
    const biggestDrop =
      questionDrops
        .filter((row) => row.dropPct !== null)
        .sort(
          (a, b) =>
            b.dropFromPrevious - a.dropFromPrevious ||
            (b.dropPct ?? 0) - (a.dropPct ?? 0)
        )[0] ?? null;

    return {
      yearLevel,
      starts,
      completions,
      completionRate: starts > 0 ? Math.round((completions / starts) * 100) : 0,
      incomplete: starts - completions,
      averageQuestionReached: average,
      biggestDropQuestion: biggestDrop?.questionNumber ?? null,
      biggestDropPct: biggestDrop?.dropPct ?? null,
    };
  });

  const biggestDropYear =
    diagnosticYearRows
      .filter((row) => row.starts > 0)
      .sort(
        (a, b) =>
          b.incomplete - a.incomplete ||
          a.completionRate - b.completionRate ||
          b.starts - a.starts
      )[0] ?? null;
  const hasDiagQuestionData =
    filteredStartedCount > 0 || diagnosticYearRows.some((row) => row.starts > 0);

  const recentEvents = (recentData ?? []) as AnalyticsEventRow[];
  const latestEventAt = recentEvents[0]?.created_at ?? null;

  // ── Per-person journeys ────────────────────────────────────────────────────
  // Group period-bound events by identity and present each as a chronological
  // chain, so the sequence of what one person did is readable at a glance.
  type Journey = {
    key: string;
    label: string;
    isUser: boolean;
    events: AnalyticsEventRow[];
    firstAt: string;
    lastAt: string;
  };

  const journeyMap = new Map<string, Journey>();

  for (const raw of journeyData ?? []) {
    const row = raw as AnalyticsEventRow;
    const key = identityKey(row.user_id, row.anonymous_id);
    if (!key) continue;

    const existing = journeyMap.get(key);
    if (existing) {
      existing.events.push(row);
    } else {
      journeyMap.set(key, {
        key,
        label: row.user_id
          ? `uid:${shortId(row.user_id)}`
          : `anon:${shortId(row.anonymous_id)}`,
        isUser: Boolean(row.user_id),
        events: [row],
        firstAt: row.created_at,
        lastAt: row.created_at,
      });
    }
  }

  const journeys = [...journeyMap.values()]
    .map((journey) => {
      // journeyData arrives newest-first; sort ascending for left-to-right reading.
      journey.events.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
      journey.firstAt = journey.events[0].created_at;
      journey.lastAt = journey.events[journey.events.length - 1].created_at;
      return journey;
    })
    // Most recently active people first.
    .sort((a, b) => Date.parse(b.lastAt) - Date.parse(a.lastAt))
    .slice(0, 40);

  const journeysTruncated = journeyMap.size > journeys.length;

  const latestTrialCtaAt =
    ((trialCtaSourceData ?? []) as AnalyticsEventRow[])[0]?.created_at ?? null;
  const latestDiagnosticAt =
    ((diagnosticEventData ?? []) as DiagnosticAnalyticsRow[])
      .at(-1)
      ?.created_at ?? null;
  const latestAdsAt =
    ((adsFunnelRaw ?? []) as AdsFunnelRawRow[])
      .map((row) => row.created_at)
      .filter((value): value is string => Boolean(value))
      .sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? null;

  const sourceHealthRows = [
    {
      key: "core",
      label: "Core events",
      latestAt: latestEventAt,
      error: countError ?? recentError,
      staleHours: 6,
    },
    {
      key: "diagnostic",
      label: "Diagnostic events",
      latestAt: latestDiagnosticAt,
      error: diagnosticEventError,
      staleHours: 12,
    },
    {
      key: "trial-cta",
      label: "Trial CTA events",
      latestAt: latestTrialCtaAt,
      error: trialCtaSourceError,
      staleHours: 24,
    },
    {
      key: "ads-funnel",
      label: "Ads funnel events",
      latestAt: latestAdsAt,
      error: adsFunnelError,
      staleHours: 24,
    },
  ].map((row) => {
    if (row.error) {
      return {
        ...row,
        state: "error" as const,
        subtitle: row.error.message,
      };
    }

    const stale = isStale(row.latestAt, row.staleHours);
    return {
      ...row,
      state: stale ? ("stale" as const) : ("healthy" as const),
      subtitle: `Latest: ${formatOptionalDateTime(row.latestAt)}`,
    };
  });

  // ── Ads funnel aggregation ─────────────────────────────────────────────────
  type AdsCampaignRow = {
    campaign: string;
    isTest: boolean;
    viewed: number;
    diagnosticCta: number;
    diagnosticStarted: number;
    diagnosticCompleted: number;
    trialCta: number;
    checkout: number;
    purchaseAttempt: number;
    stripe: number;
    checkoutExit: number;
    checkoutBack: number;
    checkoutEnquiry: number;
    stripeCancelled: number;
    payment: number;
    trial: number;
    dashboard: number;
    lesson: number;
  };

  const adsCampaignMap = new Map<string, AdsCampaignRow>();

  for (const raw of adsFunnelRaw ?? []) {
    const r = raw as AdsFunnelRawRow;
    const campaign = metadataString(r.metadata, "utm_campaign");
    const gclid = metadataString(r.metadata, "gclid");
    const isTest =
      campaign === "test_hsc_trial" ||
      (gclid !== null && gclid.startsWith("TEST"));
    const key = `${isTest ? "1" : "0"}::${campaign ?? ""}`;

    if (!adsCampaignMap.has(key)) {
      adsCampaignMap.set(key, {
        campaign: campaign ?? "(none)",
        isTest,
        viewed: 0,
        diagnosticCta: 0,
        diagnosticStarted: 0,
        diagnosticCompleted: 0,
        trialCta: 0,
        checkout: 0,
        purchaseAttempt: 0,
        stripe: 0,
        checkoutExit: 0,
        checkoutBack: 0,
        checkoutEnquiry: 0,
        stripeCancelled: 0,
        payment: 0, trial: 0, dashboard: 0, lesson: 0,
      });
    }
    const cr = adsCampaignMap.get(key)!;
    const ev = r.event_name;
    if (ev === "hsc_maths_viewed")                       cr.viewed++;
    else if (ev === "diagnostic_cta_clicked")             cr.diagnosticCta++;
    else if (ev === "diagnostic_started")                 cr.diagnosticStarted++;
    else if (ev === "diagnostic_completed")               cr.diagnosticCompleted++;
    else if (ev === "trial_cta_clicked")                  cr.trialCta++;
    else if (ev === "checkout_started")                   cr.checkout++;
    else if (ev === "checkout_purchase_attempted")         cr.purchaseAttempt++;
    else if (ev === "checkout_redirected_to_stripe")      cr.stripe++;
    else if (ev === "checkout_exited")                    cr.checkoutExit++;
    else if (ev === "checkout_back_to_home_clicked")      cr.checkoutBack++;
    else if (ev === "checkout_enquire_instead_clicked")   cr.checkoutEnquiry++;
    else if (ev === "checkout_cancelled_from_stripe")     cr.stripeCancelled++;
    else if (ev === "payment_success")                    cr.payment++;
    else if (ev === "trial_started")                      cr.trial++;
    else if (ev === "dashboard_viewed")                   cr.dashboard++;
    else if (ev === "lesson_started")                     cr.lesson++;
  }

  const adsFunnelRows = [...adsCampaignMap.values()].sort((a, b) => {
    if (a.isTest !== b.isTest) return Number(a.isTest) - Number(b.isTest);
    const aActivity =
      a.diagnosticCta +
      a.diagnosticStarted +
      a.trialCta +
      a.checkout +
      a.purchaseAttempt +
      a.trial;
    const bActivity =
      b.diagnosticCta +
      b.diagnosticStarted +
      b.trialCta +
      b.checkout +
      b.purchaseAttempt +
      b.trial;
    if (aActivity !== bActivity) return bActivity - aActivity;
    return a.campaign.localeCompare(b.campaign);
  });

  const summary = summariseAnalytics({
    visitors: totalUniqueIdentities,
    diagnosticStarts,
    diagnosticCompletions,
    checkoutStarts,
    trialStarts,
    topCtaSource: trialCtaSourceRows[0]?.source ?? null,
    pageCounts,
    funnelSteps,
  });

  const alerts = buildAlerts({
    hscMathsViews,
    checkoutStarts,
    diagnosticStarts,
    diagnosticCompletions,
    trialStarts,
    worksheetCompletions,
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Nova Maths · Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Analytics
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Last {days} day{days === 1 ? "" : "s"} &middot;{" "}
              {totalLast7Days} events &middot;{" "}
              {totalUniqueIdentities} unique identities
            </p>
            <div className="mt-3 flex gap-2">
              {ALLOWED_DAYS.map((d) => (
                <Link
                  key={d}
                  href={analyticsHref(d, activeDiagnosticYear)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    d === days
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {d}d
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
              <div
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isStale(latestEventAt, 6)
                    ? "border-amber-200 bg-amber-50 text-amber-900"
                    : "border-emerald-200 bg-emerald-50 text-emerald-900"
                }`}
              >
                <p className="font-semibold">Core events</p>
                <p className="mt-0.5">Latest: {formatOptionalDateTime(latestEventAt)}</p>
              </div>
              <div
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isStale(latestDiagnosticAt, 12)
                    ? "border-amber-200 bg-amber-50 text-amber-900"
                    : "border-blue-200 bg-blue-50 text-blue-900"
                }`}
              >
                <p className="font-semibold">Diagnostic events</p>
                <p className="mt-0.5">Latest: {formatOptionalDateTime(latestDiagnosticAt)}</p>
              </div>
              <div
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isStale(latestTrialCtaAt, 24)
                    ? "border-slate-300 bg-slate-50 text-slate-700"
                    : "border-indigo-200 bg-indigo-50 text-indigo-900"
                }`}
              >
                <p className="font-semibold">Trial CTA events</p>
                <p className="mt-0.5">Latest: {formatOptionalDateTime(latestTrialCtaAt)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/api/admin/analytics/export?days=${days}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Export CSV
            </Link>
            <Link
              href="/admin"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              ← Admin
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Log out
              </button>
            </form>
          </div>
        </header>

        {countError && !tableNotReady && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Could not load event counts: {countError.message}
          </div>
        )}

        {!tableNotReady && recentError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Could not load recent activity log: {recentError.message}
          </div>
        )}

        {/* ── Data freshness and source health ───────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Data quality
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Freshness and source health
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {sourceHealthRows.map((row) => (
              <div
                key={row.key}
                className={`rounded-2xl border p-4 ${healthTone(row.state)}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {row.label}
                </p>
                <p className="mt-2 text-sm font-semibold capitalize">
                  {row.state}
                </p>
                <p className="mt-1 text-xs leading-5">{row.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Health alerts ─────────────────────────────────────────────── */}
        {alerts.length > 0 && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Funnel health · last 7 days
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">Alerts</h2>
            <div className="mt-5 space-y-3">
              {alerts.map((alert, i) => (
                <FunnelAlert key={i} {...alert} />
              ))}
            </div>
          </section>
        )}

        {/* ── Period summary ───────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Period summary · last {days} day{days === 1 ? "" : "s"}
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">Snapshot</h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatCard label="Visitors" value={summary.visitors} />
            <StatCard label="Diag starts" value={summary.diagnosticStarts} />
            <StatCard label="Diag completions" value={summary.diagnosticCompletions} />
            <StatCard label="Checkout starts" value={summary.checkoutStarts} />
            <StatCard label="Trial starts" value={summary.trialStarts} />
          </div>

          <dl className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-500">Top CTA source</dt>
              <dd className="mt-0.5 truncate font-mono text-xs text-slate-800">
                {summary.topCtaSource ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Top page</dt>
              <dd className="mt-0.5 truncate font-mono text-xs text-slate-800">
                {summary.topPage ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Biggest funnel drop</dt>
              <dd className="mt-0.5 text-xs text-slate-800">
                {summary.biggestDropLabel
                  ? `${summary.biggestDropLabel} (${summary.biggestDropPct})`
                  : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Recommended action
            </p>
            <p className="mt-1 text-sm text-blue-900">{summary.recommendedAction}</p>
          </div>
        </section>

        {/* ── Unique audience summary ───────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Unique audience · last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Unique identities
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Identity = user_id when authenticated, otherwise anonymous_id.
            Events with neither are counted in totals but excluded here.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              label="Total unique"
              value={totalUniqueIdentities}
              subtitle="across all events"
            />
            <StatCard
              label="Unique diagnostic starters"
              value={uniqueDiagnosticStarts}
              subtitle={`of ${diagnosticStarts} total starts`}
            />
            <StatCard
              label="Unique checkout starters"
              value={uniqueCheckoutStarts}
              subtitle={`of ${checkoutStarts} total starts`}
            />
            <StatCard
              label="Unique trial starters"
              value={uniqueTrialStarts}
              subtitle={`of ${trialStarts} total starts`}
            />
          </div>
        </section>

        {/* ── Event counts ──────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            All events · last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Event counts
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Homepage views"         value={homepageViews} />
            <StatCard label="HSC maths views"        value={hscMathsViews} />
            <StatCard label="Trial CTA clicks"       value={trialCtaClicks} />
            <StatCard label="Diagnostic starts"      value={diagnosticStarts} />
            <StatCard label="Diagnostic begun"       value={diagnosticBegins} />
            <StatCard label="Diagnostic completions" value={diagnosticCompletions} />
            <StatCard label="Checkout starts"        value={checkoutStarts} />
            <StatCard label="Checkout forms"         value={checkoutFormSubmissions} />
            <StatCard label="Purchase attempts"      value={checkoutPurchaseAttempts} />
            <StatCard label="Stripe redirects"       value={checkoutRedirectsToStripe} />
            <StatCard label="Checkout exits"         value={checkoutExits} />
            <StatCard label="Checkout back clicks"   value={checkoutBackClicks} />
            <StatCard label="Checkout enquiries"     value={checkoutEnquiryClicks} />
            <StatCard label="Stripe cancellations"   value={checkoutStripeCancellations} />
            <StatCard label="Trial starts"           value={trialStarts} />
            <StatCard label="Signup completions"     value={signupCompletions} />
            <StatCard label="Free lesson views"      value={freeLessonViews} />
            <StatCard label="Sample lesson views"    value={sampleLessonViews} />
            <StatCard label="Worksheet completions"  value={worksheetCompletions} />
          </div>
        </section>

        {/* ── Checkout behaviour ────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Checkout behaviour &middot; last {days} day{days === 1 ? "" : "s"}
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            What happens after checkout is reached
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Exit events fire with beacon delivery when someone leaves the
            checkout page before Stripe redirect. Stripe cancellations are
            counted when Stripe sends the visitor back to the cancellation page.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              label="Pressed purchase"
              value={checkoutPurchaseAttempts}
              subtitle={`${pct(checkoutPurchaseAttempts, checkoutStarts)} of checkout starts`}
            />
            <StatCard
              label="Reached Stripe"
              value={checkoutRedirectsToStripe}
              subtitle={`${pct(checkoutRedirectsToStripe, checkoutPurchaseAttempts)} of purchase attempts`}
            />
            <StatCard
              label="Left before Stripe"
              value={checkoutExits}
              subtitle={`${uniqueCheckoutExits} unique exits`}
            />
            <StatCard
              label="Cancelled on Stripe"
              value={checkoutStripeCancellations}
              subtitle={`${uniqueCheckoutStripeCancellations} unique returns`}
            />
            <StatCard
              label="Back/home clicks"
              value={checkoutBackClicks}
              subtitle={`${uniqueCheckoutBackClicks} unique`}
            />
            <StatCard
              label="Enquiry clicks"
              value={checkoutEnquiryClicks}
              subtitle={`${uniqueCheckoutEnquiryClicks} unique`}
            />
            <StatCard
              label="Legacy form submits"
              value={checkoutFormSubmissions}
              subtitle={`${uniqueCheckoutForms} unique`}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Funnel steps &middot; last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Trial funnel
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Rate columns show step-over-step drop-off using the previous
            step&apos;s same column as denominator.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2 text-left">Step</th>
                  <th className="px-3 py-2 text-left">Event</th>
                  <th className="px-3 py-2 text-right">Total</th>
                  <th className="px-3 py-2 text-right">Unique</th>
                  <th className="px-3 py-2 text-right">Rate (total)</th>
                  <th className="px-3 py-2 text-right">Rate (unique)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {funnelSteps.map((step, index) => {
                  const prevTotal = index > 0 ? funnelSteps[index - 1].total : 0;
                  const prevUniq  = index > 0 ? funnelSteps[index - 1].uniq  : 0;
                  return (
                    <tr key={step.event} className="align-middle">
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {step.label}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-slate-400">
                        {step.event}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-slate-900">
                        {step.total}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums text-slate-600">
                        {step.uniq}
                      </td>
                      <td className="px-3 py-3 text-right text-slate-500">
                        {index === 0 ? "—" : pct(step.total, prevTotal)}
                      </td>
                      <td className="px-3 py-3 text-right text-slate-500">
                        {index === 0 ? "—" : pct(step.uniq, prevUniq)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Trial CTA sources ─────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Trial CTA sources · last 7 days
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Which trial CTAs are getting clicks
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Source uses metadata.source when present, then page, then
                metadata.href.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {trialCtaSourceRows.length} source
              {trialCtaSourceRows.length !== 1 ? "s" : ""}
            </p>
          </div>

          {trialCtaSourceError && !tableNotReady ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load CTA source data: {trialCtaSourceError.message}
            </div>
          ) : trialCtaSourceRows.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No trial CTA clicks recorded in this period.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Source/page</th>
                    <th className="px-3 py-2 text-right">Clicks</th>
                    <th className="px-3 py-2 text-right">Unique identities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trialCtaSourceRows.map((row) => (
                    <tr key={row.source}>
                      <td className="max-w-lg px-3 py-3 font-medium text-slate-900">
                        <span className="break-words">{row.source}</span>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-slate-900">
                        {row.clicks}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums text-slate-600">
                        {row.identities.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Source labels may vary until every CTA consistently sends
                metadata.source.
              </p>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Learning activity · last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Student learning events
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Mastery submitted"   value={lessonMasterySubmissions} />
            <StatCard label="Mastery passed"       value={lessonMasteryPasses} />
            <StatCard label="Adaptive worksheets"  value={adaptiveWorksheetGenerations} />
            <StatCard label="Worksheet completions" value={worksheetCompletions} />
          </div>
        </section>

        {/* ── Diagnostic question-level progress ───────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Diagnostic progress · last {days} day{days === 1 ? "" : "s"}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Completion funnel by question
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Grouped by identity and year level. Use the filter to isolate a diagnostic.
              </p>
            </div>
            <div className="flex max-w-xl flex-wrap gap-2">
              <Link
                href={analyticsHref(days, "all")}
                className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  activeDiagnosticYear === "all"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                All years
              </Link>
              {diagnosticYearOptions.map((yearLevel) => (
                <Link
                  key={yearLevel}
                  href={analyticsHref(days, yearLevel)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    activeDiagnosticYear === yearLevel
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {yearLevel.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-5">
            <StatCard label="Started" value={filteredStartedCount} />
            <StatCard label="Completed" value={filteredCompletedCount} />
            <StatCard
              label="Completion rate"
              value={pct(filteredCompletedCount, filteredStartedCount)}
            />
            <StatCard
              label="Avg question reached"
              value={averageQuestionReached === null ? "-" : averageQuestionReached}
            />
            <StatCard
              label="Biggest drop"
              value={biggestDropQuestion ? `Q${biggestDropQuestion.questionNumber}` : "-"}
              subtitle={
                biggestDropQuestion?.dropPct !== null &&
                biggestDropQuestion?.dropPct !== undefined
                  ? `${biggestDropQuestion.dropPct}% drop`
                  : "No question drop yet"
              }
            />
          </div>

          {biggestDropYear ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <span className="font-semibold">Biggest year-level drop-off:</span>{" "}
              {biggestDropYear.yearLevel.replace(/-/g, " ")} with{" "}
              {biggestDropYear.incomplete} incomplete start
              {biggestDropYear.incomplete === 1 ? "" : "s"}.
            </div>
          ) : null}

          {!hasDiagQuestionData ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
              No diagnostic abandonment data yet. This section uses{" "}
              <code className="font-mono">diagnostic_started</code>,{" "}
              <code className="font-mono">diagnostic_question_answered</code>, and{" "}
              <code className="font-mono">diagnostic_completed</code>.
            </p>
          ) : (
            <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-3 py-2 text-left">Funnel step</th>
                      <th className="px-3 py-2 text-right">Reached</th>
                      <th className="px-3 py-2 text-right">Completion</th>
                      <th className="px-3 py-2 text-right">Drop</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-3 py-2 font-medium text-slate-900">Started</td>
                      <td className="px-3 py-2 text-right tabular-nums">{filteredStartedCount}</td>
                      <td className="px-3 py-2 text-right tabular-nums">100%</td>
                      <td className="px-3 py-2 text-right text-slate-400">-</td>
                    </tr>
                    {questionDropRows.map((row) => (
                      <tr
                        key={row.questionNumber}
                        className={
                          row.isBigDrop
                            ? "bg-amber-50"
                            : "bg-white"
                        }
                      >
                        <td className="px-3 py-2 font-medium text-slate-900">
                          Q{row.questionNumber}
                          {row.isBigDrop && (
                            <span className="ml-2 rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800">
                              drop
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.reached}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.completionPct === null ? "-" : `${row.completionPct}%`}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            row.isBigDrop ? "font-semibold text-amber-700" : "text-slate-600"
                          }`}
                        >
                          {row.dropPct === null
                            ? "-"
                            : `${row.dropFromPrevious} / ${row.dropPct}%`}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td className="px-3 py-2 font-medium text-slate-900">Completed</td>
                      <td className="px-3 py-2 text-right tabular-nums">{filteredCompletedCount}</td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {pct(filteredCompletedCount, filteredStartedCount)}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-500">Final submit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-3 py-2 text-left">Year level</th>
                      <th className="px-3 py-2 text-right">Started</th>
                      <th className="px-3 py-2 text-right">Completed</th>
                      <th className="px-3 py-2 text-right">Rate</th>
                      <th className="px-3 py-2 text-right">Avg Q</th>
                      <th className="px-3 py-2 text-right">Big drop</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {diagnosticYearRows.map((row) => (
                      <tr key={row.yearLevel}>
                        <td className="px-3 py-2 font-medium text-slate-900">
                          {row.yearLevel.replace(/-/g, " ")}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">{row.starts}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{row.completions}</td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.completionRate}%
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.averageQuestionReached ?? "-"}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.biggestDropQuestion
                            ? `Q${row.biggestDropQuestion} / ${row.biggestDropPct}%`
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* ── Conversion rates ──────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Conversion · last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Funnel rates
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Large figure = rate by total events. Smaller figure = rate by
            unique identities. Direct Stripe flow bypasses the checkout form,
            so checkout form submissions are not a required funnel step.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <RateCard
              label="HSC maths to diagnostic CTA"
              numerator={diagnosticCtaClicks}
              denominator={hscMathsViews}
              uniqueNumerator={uniqueDiagnosticCtaClicks}
              uniqueDenominator={uniqueHscMathsViews}
              description={`${diagnosticCtaClicks} diagnostic CTA clicks / ${hscMathsViews} HSC views`}
            />
            <RateCard
              label="Diagnostic CTA to start"
              numerator={diagnosticStarts}
              denominator={diagnosticCtaClicks}
              uniqueNumerator={uniqueDiagnosticStarts}
              uniqueDenominator={uniqueDiagnosticCtaClicks}
              description={`${diagnosticStarts} diagnostic starts / ${diagnosticCtaClicks} diagnostic CTA clicks`}
            />
            <RateCard
              label="Diagnostic completion"
              numerator={diagnosticCompletions}
              denominator={diagnosticStarts}
              uniqueNumerator={uniqueDiagnosticCompletions}
              uniqueDenominator={uniqueDiagnosticStarts}
              description={`${diagnosticCompletions} completed / ${diagnosticStarts} started`}
            />
            <RateCard
              label="Trial CTA to checkout"
              numerator={checkoutStarts}
              denominator={trialCtaClicks}
              uniqueNumerator={uniqueCheckoutStarts}
              uniqueDenominator={uniqueTrialCtaClicks}
              description={`${checkoutStarts} checkout starts / ${trialCtaClicks} trial CTA clicks`}
            />
            <RateCard
              label="Stripe → trial"
              numerator={trialStarts}
              denominator={checkoutRedirectsToStripe}
              uniqueNumerator={uniqueTrialStarts}
              uniqueDenominator={uniqueStripeRedirects}
              description={`${trialStarts} trials / ${checkoutRedirectsToStripe} redirects`}
            />
          </div>
        </section>

        {/* ── Ads funnel ────────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ads funnel · last {days} day{days === 1 ? "" : "s"}
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Campaign breakdown
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Grouped by{" "}
            <code className="font-mono">utm_campaign</code>. Rows with{" "}
            <code className="font-mono">utm_campaign = test_hsc_trial</code> or{" "}
            <code className="font-mono">gclid</code> starting with{" "}
            <code className="font-mono">TEST</code> are marked as test and
            sorted last; exclude those rows from campaign decisions. Direct Stripe flow:{" "}
            <code className="font-mono">checkout_form_submitted</code> may be 0
            and is not treated as a required step in this table.{" "}
            <code className="font-mono">payment_success</code> means verified
            success-page tracking after checkout-session verification.
          </p>

          {adsFunnelError && !tableNotReady ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load ads funnel data: {adsFunnelError.message}
            </div>
          ) : adsFunnelRows.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No ads funnel events in this period.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Campaign</th>
                    <th className="px-3 py-2 text-right" title="hsc_maths_viewed">Viewed</th>
                    <th className="px-3 py-2 text-right" title="diagnostic_cta_clicked">Diag CTA</th>
                    <th className="px-3 py-2 text-right" title="diagnostic_started">Diag start</th>
                    <th className="px-3 py-2 text-right" title="diagnostic_completed">Diag done</th>
                    <th className="px-3 py-2 text-right" title="trial_cta_clicked">Trial CTA</th>
                    <th className="px-3 py-2 text-right" title="checkout_started">Checkout</th>
                    <th className="px-3 py-2 text-right" title="checkout_purchase_attempted">Purchase</th>
                    <th className="px-3 py-2 text-right" title="checkout_redirected_to_stripe">→Stripe</th>
                    <th className="px-3 py-2 text-right" title="checkout_exited">Exit</th>
                    <th className="px-3 py-2 text-right" title="checkout_cancelled_from_stripe">Cancel</th>
                    <th className="px-3 py-2 text-right" title="payment_success">Verified payment</th>
                    <th className="px-3 py-2 text-right" title="trial_started">Trial</th>
                    <th className="px-3 py-2 text-right" title="dashboard_viewed">Dashboard</th>
                    <th className="px-3 py-2 text-right" title="lesson_started">Lesson</th>
                    <th className="px-3 py-2 text-right">View to diag CTA</th>
                    <th className="px-3 py-2 text-right">Trial CTA to checkout</th>
                    <th className="px-3 py-2 text-right">Checkout→Trial</th>
                    <th className="px-3 py-2 text-right">Trial→Lesson</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adsFunnelRows.map((row) => (
                    <tr
                      key={`${row.isTest ? "1" : "0"}::${row.campaign}`}
                      className={row.isTest ? "bg-slate-50 text-slate-400" : ""}
                    >
                      <td className="px-3 py-2 font-medium text-slate-900">
                        {row.campaign}
                        {row.isTest && (
                          <span className="ml-2 rounded-full bg-slate-200 px-1.5 py-0.5 text-xs font-semibold text-slate-500">
                            test
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.viewed}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.diagnosticCta}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.diagnosticStarted}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.diagnosticCompleted}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.trialCta}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.checkout}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.purchaseAttempt}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.stripe}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.checkoutExit}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.stripeCancelled}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.payment}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.trial}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.dashboard}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.lesson}</td>
                      <td className="px-3 py-2 text-right text-slate-500">{pct(row.diagnosticCta, row.viewed)}</td>
                      <td className="px-3 py-2 text-right text-slate-500">{pct(row.checkout, row.trialCta)}</td>
                      <td className="px-3 py-2 text-right text-slate-500">{pct(row.trial, row.checkout)}</td>
                      <td className="px-3 py-2 text-right text-slate-500">{pct(row.lesson, row.trial)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-500">
                Hover column headers to see the underlying event names. Rates
                use total event counts, not unique identities.
              </p>
            </div>
          )}
        </section>

        {/* ── Per-person journeys ───────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Journeys · last {days} day{days === 1 ? "" : "s"}
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">
                What each person did, in order
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Events grouped by identity and chained left-to-right. Chips are
                colour-coded by funnel stage; hover a chip for page and metadata.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {journeys.length} {journeys.length === 1 ? "person" : "people"}
              {journeysTruncated ? " (top 40)" : ""}
            </p>
          </div>

          {journeyError && !tableNotReady ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load journey data: {journeyError.message}
            </div>
          ) : journeys.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No identified activity in this period. Journeys need a user_id or
              anonymous_id on events.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {journeys.map((journey) => (
                <li
                  key={journey.key}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${
                        journey.isUser
                          ? "bg-slate-900 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {journey.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      {journey.events.length} event
                      {journey.events.length === 1 ? "" : "s"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDayShort(journey.firstAt)}{" "}
                      {formatTimeShort(journey.firstAt)} · spans{" "}
                      {formatSpan(journey.firstAt, journey.lastAt)}
                    </span>
                  </div>
                  <ol className="mt-3 flex flex-wrap items-center gap-y-2 overflow-x-auto">
                    {journey.events.map((ev, index) => (
                      <li key={ev.id} className="flex items-center">
                        {index > 0 ? (
                          <span
                            aria-hidden
                            className="mx-1 select-none text-slate-300"
                          >
                            →
                          </span>
                        ) : null}
                        <span
                          className={`whitespace-nowrap rounded-lg border px-2 py-1 text-xs ${eventTone(
                            ev.event_name
                          )}`}
                          title={`${formatDateTime(ev.created_at)}${
                            ev.page ? ` · ${ev.page}` : ""
                          }${
                            ev.metadata && Object.keys(ev.metadata).length > 0
                              ? ` · ${metaPreview(ev.metadata)}`
                              : ""
                          }`}
                        >
                          {ev.event_name}
                          <span className="ml-1.5 font-mono text-[10px] opacity-60">
                            {formatTimeShort(ev.created_at)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ── Recent events ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Activity log
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Recent events
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Most recent 50 events across all time.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {recentEvents.length} shown
            </p>
          </div>

          {recentError && !tableNotReady ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Could not load recent events: {recentError.message}
            </div>
          ) : recentEvents.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No events recorded yet. Events will appear here after students
              visit the site.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 text-left">Time (AEST)</th>
                    <th className="px-3 py-2 text-left">Event</th>
                    <th className="px-3 py-2 text-left">Page</th>
                    <th className="px-3 py-2 text-left">Identity</th>
                    <th className="px-3 py-2 text-left">Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEvents.map((ev) => {
                    const identity = ev.user_id
                      ? `uid:${shortId(ev.user_id)}`
                      : `anon:${shortId(ev.anonymous_id)}`;
                    return (
                      <tr key={ev.id} className="align-top">
                        <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                          {formatDateTime(ev.created_at)}
                        </td>
                        <td className="px-3 py-3 font-medium text-slate-900">
                          {ev.event_name}
                        </td>
                        <td className="px-3 py-3 text-slate-500">
                          {ev.page ?? "—"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-slate-500">
                          {identity}
                        </td>
                        <td className="max-w-xs px-3 py-3 font-mono text-xs text-slate-500">
                          {metaPreview(ev.metadata)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </section>
    </main>
  );
}
