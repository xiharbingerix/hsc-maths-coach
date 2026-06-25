import Link from "next/link";
import { PageViewTracker } from "../../components/PageViewTracker";
import { DiagnosticSelectLink } from "../../components/DiagnosticSelectLink";
import { visibleDiagnostics } from "../../../lib/diagnostics";

export default function DiagnosticSelectPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <PageViewTracker
        eventName="diagnostic_select_viewed"
        includeMarketingParams
        includeCtaExperiment
      />
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
          {visibleDiagnostics.map((diagnostic) => (
            <DiagnosticSelectLink
              key={diagnostic.slug}
              slug={diagnostic.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-lg">{diagnostic.label}</p>
                <p className="mt-1 text-sm text-slate-600">
                  Targeted questions across major units
                </p>
              </div>
              <span className="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                Available now
              </span>
            </DiagnosticSelectLink>
          ))}
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
