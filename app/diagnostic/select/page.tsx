import Link from "next/link";

const yearLevels = [
  { slug: "year-9-mathematics", label: "Year 9 Mathematics", available: false },
  { slug: "year-10-mathematics", label: "Year 10 Mathematics", available: false },
  { slug: "year-11-standard", label: "Year 11 Standard", available: false },
  { slug: "year-11-advanced", label: "Year 11 Advanced", available: false },
  { slug: "year-12-advanced", label: "Year 12 Advanced", available: true },
  { slug: "year-12-standard-2", label: "Year 12 Standard 2", available: false },
];

export default function DiagnosticSelectPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Automated diagnostic
          </p>
          <h1 className="mt-2 text-3xl font-bold">Choose your year level</h1>
          <p className="mt-3 text-slate-600">
            Complete 20 multiple-choice questions to find out which units to focus
            on first. No login required.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {yearLevels.map((yl) =>
            yl.available ? (
              <Link
                key={yl.slug}
                href={`/diagnostic/${yl.slug}`}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <p className="font-semibold text-lg">{yl.label}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    20 questions across all major units
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  Available now
                </span>
              </Link>
            ) : (
              <div
                key={yl.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 opacity-60"
              >
                <div>
                  <p className="font-semibold text-lg">{yl.label}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Questions in development
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>

        <p className="text-center text-sm text-slate-500">
          Looking for a personalised report?{" "}
          <Link href="/diagnostic" className="font-medium text-slate-900 underline">
            Try the full diagnostic
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
