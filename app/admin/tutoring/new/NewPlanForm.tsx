"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createPlanAction, type CreatePlanState } from "../actions";

const initialState: CreatePlanState = { ok: false };

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none";
const labelClass = "block text-sm font-semibold text-slate-800";

export function NewPlanForm({
  mondays,
}: {
  mondays: Array<{ value: string; label: string; inHoliday: boolean }>;
}) {
  const [state, formAction, pending] = useActionState(
    createPlanAction,
    initialState,
  );
  const [copied, setCopied] = useState(false);

  // Default to the first upcoming Monday that is not in the school holidays.
  const defaultMonday =
    mondays.find((m) => !m.inHoliday)?.value ?? mondays[0]?.value;

  if (state.ok && state.url) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-900">
          Checkout link ready
        </h2>
        <p className="mt-2 text-sm text-emerald-800">
          Send this link to {state.studentName}&apos;s parent. The plan stays
          {" "}
          <span className="font-semibold">pending</span> on the plans page until
          they pay.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={state.url}
            className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 font-mono text-xs text-slate-700"
          />
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(state.url ?? "");
              setCopied(true);
            }}
            className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
        <div className="mt-5 flex gap-3">
          <Link
            href="/admin/tutoring/new"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Create another
          </Link>
          <Link
            href="/admin/tutoring"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            View plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {state.error}
        </p>
      ) : null}

      <div>
        <label className={labelClass} htmlFor="studentName">
          Student name
        </label>
        <input
          id="studentName"
          name="studentName"
          required
          className={inputClass}
          placeholder="e.g. Mia"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="parentEmail">
          Parent email
        </label>
        <input
          id="parentEmail"
          name="parentEmail"
          type="email"
          required
          className={inputClass}
          placeholder="parent@example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="weeklyAmount">
            Weekly amount (AUD)
          </label>
          <input
            id="weeklyAmount"
            name="weeklyAmount"
            defaultValue="75"
            inputMode="decimal"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="committedWeeks">
            Committed block (weeks)
          </label>
          <input
            id="committedWeeks"
            name="committedWeeks"
            type="number"
            min={1}
            defaultValue={10}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-slate-500">
            Shown to the parent in the commitment they accept. Billing is
            open-ended (you pause/cancel manually).
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="billingMonday">
          First billing Monday
        </label>
        {mondays.length > 0 ? (
          <select
            id="billingMonday"
            name="billingMonday"
            className={inputClass}
            defaultValue={defaultMonday}
          >
            {mondays.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        ) : (
          <p className="mt-1 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            No upcoming Mondays are configured. Add the next year&apos;s term
            dates in lib/nswTermDates.ts.
          </p>
        )}
        <p className="mt-1 text-xs text-slate-500">
          No charge today. The first full payment lands on this Monday, then
          weekly every Monday. Pick a Monday outside the school holidays if you
          do not want billing over a break.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {pending ? "Creating link…" : "Create checkout link"}
      </button>
    </form>
  );
}
