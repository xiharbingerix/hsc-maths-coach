import Link from "next/link";

const offers = [
  {
    id: "online-learning",
    title: "Online Learning Package",
    subtitle: "Low-cost beta access",
    description:
      "Structured HSC Maths Advanced lessons with explicit teaching, worked examples, guided practice, independent practice, and mastery quizzes.",
    href: "/diagnostic?offer=online-learning",
  },
  {
    id: "diagnostic-report",
    title: "Diagnostic PDF Report",
    subtitle: "Reviewed diagnostic summary",
    description:
      "A parent-friendly diagnostic report showing strengths, priority weak areas, confidence patterns, and recommended next steps.",
    href: "/diagnostic?offer=diagnostic-report",
  },
  {
    id: "study-plan",
    title: "Diagnostic + 30-Day Plan",
    subtitle: "Prioritised revision plan",
    description:
      "A diagnostic report plus a practical 30-day study plan for the highest-impact revision areas before the next assessment.",
    href: "/diagnostic?offer=study-plan",
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
            Choose the option you are interested in. Payments are not processed
            here yet. For now, the next step is the diagnostic so we can connect
            the enquiry to a student&apos;s current needs.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => {
            const isSelected = selectedOffer === offer.id;

            return (
              <article
                key={offer.id}
                className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${
                  isSelected
                    ? "border-slate-950 ring-2 ring-slate-950/10"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {offer.subtitle}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{offer.title}</h2>
                  </div>
                  {isSelected ? (
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                      Selected
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {offer.description}
                </p>

                <Link
                  href={offer.href}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Continue to diagnostic
                </Link>
              </article>
            );
          })}
        </section>

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
