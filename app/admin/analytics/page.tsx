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
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {String(value)}
      </p>
    </div>
  );
}

function RateCard({
  label,
  numerator,
  denominator,
  description,
}: {
  label: string;
  numerator: number;
  denominator: number;
  description: string;
}) {
  const rate = pct(numerator, denominator);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {rate}
      </p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Count events from the last 7 days (event_name only — minimal payload).
  const { data: countData, error: countError } = await supabaseAdmin
    .from("analytics_events")
    .select("event_name")
    .gte("created_at", since);

  // Recent events for the activity log.
  const { data: recentData, error: recentError } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "id, user_id, anonymous_id, event_name, page, metadata, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const tableNotReady =
    countError?.message?.includes("does not exist") ||
    recentError?.message?.includes("does not exist");

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

  // Build counts map from the last 7 days.
  const counts = new Map<string, number>();
  for (const row of countData ?? []) {
    const key = (row as { event_name: string }).event_name;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  function count(name: string) {
    return counts.get(name) ?? 0;
  }

  const homepageViews = count("homepage_viewed");
  const hscMathsViews = count("hsc_maths_viewed");
  const diagnosticStarts = count("diagnostic_started");
  const diagnosticCompletions = count("diagnostic_completed");
  const checkoutStarts = count("checkout_started");
  const trialStarts = count("trial_started");
  const worksheetCompletions = count("worksheet_completed");
  const totalLast7Days = [...counts.values()].reduce((s, n) => s + n, 0);

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
              Last 7 days · {totalLast7Days} events recorded
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

        {/* ── Funnel health alerts ──────────────────────────────────────── */}
        {alerts.length > 0 && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Funnel health · last 7 days
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">
              Alerts
            </h2>
            <div className="mt-5 space-y-3">
              {alerts.map((alert, i) => (
                <FunnelAlert key={i} {...alert} />
              ))}
            </div>
          </section>
        )}

        {/* ── Top-of-funnel counts ──────────────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Funnel · last 7 days
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            Event counts
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Homepage views" value={homepageViews} />
            <StatCard label="HSC maths views" value={hscMathsViews} />
            <StatCard label="Diagnostic starts" value={diagnosticStarts} />
            <StatCard
              label="Diagnostic completions"
              value={diagnosticCompletions}
            />
            <StatCard label="Checkout starts" value={checkoutStarts} />
            <StatCard label="Trial starts" value={trialStarts} />
            <StatCard
              label="Worksheet completions"
              value={worksheetCompletions}
            />
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
            Rates are based on event counts, not unique users. A single student
            can fire multiple events of the same type.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <RateCard
              label="Diagnostic completion"
              numerator={diagnosticCompletions}
              denominator={diagnosticStarts}
              description={`${diagnosticCompletions} completed / ${diagnosticStarts} started`}
            />
            <RateCard
              label="HSC maths → checkout"
              numerator={checkoutStarts}
              denominator={hscMathsViews}
              description={`${checkoutStarts} checkout starts / ${hscMathsViews} HSC maths views`}
            />
            <RateCard
              label="Checkout → trial"
              numerator={trialStarts}
              denominator={checkoutStarts}
              description={`${trialStarts} trials / ${checkoutStarts} checkout starts`}
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
