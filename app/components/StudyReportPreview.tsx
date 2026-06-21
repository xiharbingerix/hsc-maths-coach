import type { ReactNode } from "react";

/**
 * Static "study report" preview, styled like a generated document rather than a
 * marketing card — letterhead, a radial readiness gauge, labelled findings and
 * a suggested weekly focus. Presentational only; example data.
 */

const overall = 67;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const weeklyFocus = [
  { value: "4", label: "Lessons" },
  { value: "2", label: "Quizzes" },
  { value: "1", label: "Revision checkpoint" },
];

function Field({
  label,
  value,
  dotClass,
}: Readonly<{ label: string; value: string; dotClass?: string }>) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="flex items-center gap-2 text-right text-sm font-semibold text-slate-900">
        {dotClass ? (
          <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
        ) : null}
        {value}
      </span>
    </div>
  );
}

function SectionHeading({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

export function StudyReportPreview({
  title = "Example HSC Readiness Report",
  courseLabel = "HSC Mathematics Advanced",
}: Readonly<{ title?: string; courseLabel?: string }>) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <SectionHeading>Sample output</SectionHeading>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>

      {/* Report document */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Letterhead */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              N
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900">
                Nova Maths · Readiness Report
              </p>
              <p className="text-xs text-slate-500">{courseLabel}</p>
            </div>
          </div>
          <span className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 sm:inline">
            Example
          </span>
        </div>

        {/* Body: readiness gauge + key findings */}
        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - overall / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  {overall}%
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Overall readiness
            </p>
          </div>

          <dl className="divide-y divide-slate-100 border-t border-slate-100 md:border-t-0 md:border-l md:border-slate-100 md:pl-8">
            <Field
              label="Strongest topic"
              value="Financial Maths"
              dotClass="bg-emerald-500"
            />
            <Field
              label="Needs attention"
              value="Calculus"
              dotClass="bg-rose-500"
            />
            <Field
              label="Recommended next lesson"
              value="Applications of Differentiation"
            />
          </dl>
        </div>

        {/* Suggested weekly focus */}
        <div className="border-t border-slate-200 px-5 py-5 sm:px-6">
          <SectionHeading>Suggested weekly focus</SectionHeading>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {weeklyFocus.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
              >
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:px-6">
          <svg
            className="h-4 w-4 shrink-0 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            />
          </svg>
          <p className="text-xs text-slate-500">
            Generated automatically after your diagnostic.
          </p>
        </div>
      </div>
    </section>
  );
}
