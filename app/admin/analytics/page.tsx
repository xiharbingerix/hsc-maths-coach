import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

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
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
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

function trialCtaSource(row: AnalyticsEventRow): string {
  return (
    metadataString(row.metadata, "source") ??
    row.page ??
    metadataString(row.metadata, "href") ??
    "Unknown source"
  );
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

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Fetch event_name + identity columns so we can compute both totals and
  // unique identity counts in a single query.
  const { data: countData, error: countError } = await supabaseAdmin
    .from("analytics_events")
    .select("event_name, user_id, anonymous_id")
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

  const tableNotReady =
    countError?.message?.includes("does not exist") ||
    recentError?.message?.includes("does not exist") ||
    trialCtaSourceError?.message?.includes("does not exist");

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
  const diagnosticStarts = count("diagnostic_started");
  const diagnosticCompletions = count("diagnostic_completed");
  const trialCtaClicks = count("trial_cta_clicked");
  const checkoutStarts = count("checkout_started");
  const checkoutFormSubmissions = count("checkout_form_submitted");
  const checkoutRedirectsToStripe = count("checkout_redirected_to_stripe");
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
  const uniqueTrialCtaClicks = unique("trial_cta_clicked");
  const uniqueCheckoutStarts = unique("checkout_started");
  const uniqueCheckoutForms = unique("checkout_form_submitted");
  const uniqueStripeRedirects = unique("checkout_redirected_to_stripe");
  const uniqueTrialStarts = unique("trial_started");
  const uniqueDiagnosticStarts = unique("diagnostic_started");
  const uniqueDiagnosticCompletions = unique("diagnostic_completed");

  // ── Funnel steps (total + unique per step) ─────────────────────────────────

  const funnelSteps = [
    { label: "Homepage viewed",       event: "homepage_viewed",               total: homepageViews,             uniq: uniqueHomepageViews },
    { label: "HSC maths viewed",      event: "hsc_maths_viewed",              total: hscMathsViews,             uniq: uniqueHscMathsViews },
    { label: "Trial CTA clicked",     event: "trial_cta_clicked",             total: trialCtaClicks,            uniq: uniqueTrialCtaClicks },
    { label: "Checkout started",      event: "checkout_started",              total: checkoutStarts,            uniq: uniqueCheckoutStarts },
    { label: "Checkout form submitted", event: "checkout_form_submitted",     total: checkoutFormSubmissions,   uniq: uniqueCheckoutForms },
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

  const recentEvents = (recentData ?? []) as AnalyticsEventRow[];

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
              Last 7 days &middot; {totalLast7Days} events &middot;{" "}
              {totalUniqueIdentities} unique identities
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
            <StatCard label="Diagnostic completions" value={diagnosticCompletions} />
            <StatCard label="Checkout starts"        value={checkoutStarts} />
            <StatCard label="Checkout forms"         value={checkoutFormSubmissions} />
            <StatCard label="Stripe redirects"       value={checkoutRedirectsToStripe} />
            <StatCard label="Trial starts"           value={trialStarts} />
            <StatCard label="Signup completions"     value={signupCompletions} />
            <StatCard label="Free lesson views"      value={freeLessonViews} />
            <StatCard label="Sample lesson views"    value={sampleLessonViews} />
            <StatCard label="Worksheet completions"  value={worksheetCompletions} />
          </div>
        </section>

        {/* ── Trial funnel table ────────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Funnel steps · last 7 days
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
            unique identities.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <RateCard
              label="HSC maths → CTA"
              numerator={trialCtaClicks}
              denominator={hscMathsViews}
              uniqueNumerator={uniqueTrialCtaClicks}
              uniqueDenominator={uniqueHscMathsViews}
              description={`${trialCtaClicks} CTA clicks / ${hscMathsViews} HSC views`}
            />
            <RateCard
              label="CTA → checkout"
              numerator={checkoutStarts}
              denominator={trialCtaClicks}
              uniqueNumerator={uniqueCheckoutStarts}
              uniqueDenominator={uniqueTrialCtaClicks}
              description={`${checkoutStarts} checkout starts / ${trialCtaClicks} CTA clicks`}
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
              label="Checkout form → Stripe"
              numerator={checkoutRedirectsToStripe}
              denominator={checkoutFormSubmissions}
              uniqueNumerator={uniqueStripeRedirects}
              uniqueDenominator={uniqueCheckoutForms}
              description={`${checkoutRedirectsToStripe} redirects / ${checkoutFormSubmissions} forms`}
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
