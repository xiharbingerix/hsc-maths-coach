import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { formatAud } from "../../../lib/tutoring";
import { formatDate, nextBreakWithinDays } from "../../../lib/nswTermDates";
import {
  cancelPlanAction,
  deletePendingPlanAction,
  pausePlanAction,
  resumePlanAction,
} from "./actions";
import { ConfirmActionForm } from "./ConfirmActionForm";

type TutoringRow = {
  id: string;
  created_at: string | null;
  student_name: string;
  parent_email: string;
  weekly_amount_cents: number;
  committed_weeks: number;
  billing_monday: string;
  term_label: string | null;
  status: string;
  stripe_subscription_id: string | null;
};

// How many days before the holidays we start nudging the admin to pause.
const HOLIDAY_LEAD_DAYS = 10;

function statusClass(status: string) {
  if (status === "active") return "bg-emerald-100 text-emerald-900";
  if (status === "paused") return "bg-amber-100 text-amber-900";
  if (status === "canceled") return "bg-slate-200 text-slate-600";
  return "bg-blue-100 text-blue-900"; // pending
}

const actionBtn =
  "rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50";

export default async function TutoringPlansPage() {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("tutoring_subscriptions")
    .select(
      "id,created_at,student_name,parent_email,weekly_amount_cents,committed_weeks,billing_monday,term_label,status,stripe_subscription_id",
    )
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as TutoringRow[];
  const activePlans = rows.filter((r) => r.status === "active");
  const upcomingBreak = nextBreakWithinDays(HOLIDAY_LEAD_DAYS);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            ← Admin
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Tutoring plans
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Weekly recurring tutoring subscriptions billed through Stripe.
          </p>
        </div>
        <Link
          href="/admin/tutoring/new"
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          + New plan
        </Link>
      </div>

      {upcomingBreak && activePlans.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="text-base font-bold text-amber-900">
            {upcomingBreak.label} start {formatDate(upcomingBreak.breakStart)}
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            School holidays begin soon (term ends {formatDate(upcomingBreak.termEnd)}
            ). You have {activePlans.length} active plan
            {activePlans.length === 1 ? "" : "s"} that will keep billing through
            the break. Pause any that should not be charged over the holidays,
            then resume when term goes back
            {upcomingBreak.nextTermStart
              ? ` on ${formatDate(upcomingBreak.nextTermStart)}`
              : ""}
            .
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Could not load tutoring plans: {error.message}. Apply{" "}
          <span className="font-mono">
            lib/supabase-migrations/025_tutoring_subscriptions.sql
          </span>{" "}
          in Supabase.
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No tutoring plans yet. Create one to generate a parent checkout link.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 text-left">Student / parent</th>
                <th className="px-4 py-3 text-left">Weekly</th>
                <th className="px-4 py-3 text-left">Block</th>
                <th className="px-4 py-3 text-left">Billing start</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">
                      {row.student_name}
                    </p>
                    <p className="mt-0.5 break-all text-xs text-slate-500">
                      {row.parent_email}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {formatAud(row.weekly_amount_cents)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.committed_weeks} wks
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <p>{formatDate(row.billing_monday)}</p>
                    {row.term_label ? (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {row.term_label}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClass(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {row.status === "active" ? (
                        <form action={pausePlanAction}>
                          <input type="hidden" name="rowId" value={row.id} />
                          <button type="submit" className={actionBtn}>
                            Pause
                          </button>
                        </form>
                      ) : null}
                      {row.status === "paused" ? (
                        <form action={resumePlanAction}>
                          <input type="hidden" name="rowId" value={row.id} />
                          <button type="submit" className={actionBtn}>
                            Resume
                          </button>
                        </form>
                      ) : null}
                      {row.status === "active" || row.status === "paused" ? (
                        <ConfirmActionForm
                          rowId={row.id}
                          action={cancelPlanAction}
                          label="Cancel"
                          confirm={`Cancel ${row.student_name}'s tutoring subscription? This stops all future billing in Stripe.`}
                          className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                        />
                      ) : null}
                      {row.status === "pending" ? (
                        <ConfirmActionForm
                          rowId={row.id}
                          action={deletePendingPlanAction}
                          label="Delete"
                          confirm="Delete this unpaid plan? The checkout link will no longer be tracked."
                          className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
