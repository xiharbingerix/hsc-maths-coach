import Link from "next/link";
import { EnquireForm } from "./EnquireForm";
import { buildPageMetadata } from "../../lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Enquire About Nova Maths",
  description:
    "Ask about Nova Maths online learning, diagnostic reports, study plans and maths support for NSW secondary students.",
  path: "/enquire",
});

const offers = [
  {
    id: "online-learning",
    title: "Online Learning Access",
    subtitle: "$19/month",
    description:
      "Self-serve access is available through the 7-day free trial checkout. Use this form only if you need help before starting.",
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
      "A Year 12 Mathematics Advanced diagnostic report plus a focused month of revision priorities based on the student's results.",
  },
  {
    id: "weekly-tutoring",
    title: "Weekly Tutoring",
    subtitle: "Currently full",
    description:
      "Joshua is not taking new weekly tutoring students right now. Existing tutoring students receive online learning access for free.",
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
            Nova Maths
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Enquiries and report requests
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            For Nova Maths online learning, the fastest path is the 7-day free
            trial checkout. Use this form for diagnostic reports, study plans,
            or questions that need a manual reply. Joshua's tutoring spots are
            currently full.
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
