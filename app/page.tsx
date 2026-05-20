import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20 text-white">
      <section className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            HSC Maths Coach
          </p>
          <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
            Know exactly where you&apos;re losing marks in HSC Maths Advanced.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            A focused diagnostic for NSW students that identifies weak topics,
            hidden gaps, and high-impact study priorities.
          </p>
        </div>

        <Link
          href="/diagnostic"
          className="inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200"
        >
          Start diagnostic
        </Link>
      </section>
      <div className="pt-8 text-sm text-slate-400">
  <Link href="/privacy" className="underline hover:text-white">
    Privacy Notice
  </Link>
</div>
    </main>
  );
}