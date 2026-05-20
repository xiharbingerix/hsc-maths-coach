import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20 text-white">
      <section className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          HSC Maths Coach
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Diagnostic submitted
        </h1>

        <p className="text-lg text-slate-300">
          Thanks — the diagnostic has been received. We&apos;ll review the
          responses and send the personalised report to the parent/guardian
          email provided.
        </p>

        <p className="text-slate-400">
          For the pilot version, reports are reviewed manually before being
          sent.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}