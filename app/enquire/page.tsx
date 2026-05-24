import Link from "next/link";
import { EnquireForm } from "./EnquireForm";

const offers = [
  {
    id: "online-learning",
    title: "Online Learning Access",
    subtitle: "$19/month",
    description:
      "Structured online lessons, practice, and mastery checks across available early-access course pathways.",
  },
  {
    id: "diagnostic-report",
    title: "Diagnostic PDF Report",
    subtitle: "$49 one-off",
    description:
      "A parent-friendly report showing strengths, priority areas, likely mark leaks, and recommended next lessons.",
  },
  {
    id: "study-plan",
    title: "Diagnostic + 30-Day Plan",
    subtitle: "$79 one-off",
    description:
      "A diagnostic report plus a focused month of revision priorities based on the student's results.",
  },
  {
    id: "weekly-tutoring",
    title: "Weekly Tutoring + Online Learning",
    subtitle: "$75/week",
    description:
      "Weekly tutoring support plus access to the available online learning course pathways.",
  },
];

export default async function EnquirePage({
  searchParams,
}: {
  searchParams?: Promise<{ offer?: string }>;
}) {
  const params = await searchParams;
  const selectedOffer = params?.offer ?? "";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Register interest
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Choose the option you are interested in and leave a few details.
            No payment is taken on this page. Your enquiry is saved even if you
            do not complete the diagnostic today. Joshua will follow up with
            next steps during early access.
          </p>
        </header>

        <EnquireForm offers={offers} initialOffer={selectedOffer} />

        <footer className="flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm">
          <Link href="/course" className="font-medium text-slate-900 hover:underline">
            View online lessons
          </Link>
          <Link href="/" className="font-medium text-slate-900 hover:underline">
            Back to homepage
          </Link>
        </footer>
      </section>
    </main>
  );
}
