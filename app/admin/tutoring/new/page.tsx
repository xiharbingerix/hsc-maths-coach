import Link from "next/link";
import { requireAdmin } from "../../../../lib/adminSession";
import { formatDate, upcomingMondays } from "../../../../lib/nswTermDates";
import { NewPlanForm } from "./NewPlanForm";

export default async function NewTutoringPlanPage() {
  await requireAdmin();

  const mondays = upcomingMondays().map((m) => ({
    value: m.date,
    label: `${formatDate(m.date)}${m.note ? ` — ${m.note}` : ""}`,
    inHoliday: m.inHoliday,
  }));

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <Link
          href="/admin/tutoring"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          ← Tutoring plans
        </Link>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          New tutoring plan
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Creates a Stripe Checkout link for the parent. Copy it and send it to
          them yourself. The plan activates once they pay.
        </p>
      </div>

      <NewPlanForm mondays={mondays} />
    </main>
  );
}
