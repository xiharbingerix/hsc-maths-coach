import Link from "next/link";
import { requireAdmin } from "../../../lib/adminSession";
import { TestGoogleAdsConversionClient } from "./TestGoogleAdsConversionClient";

export const metadata = {
  title: "Google Ads test conversion | Admin",
};

export default async function TestGoogleAdsConversionPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Admin · Testing tools
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Google Ads test conversion
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            This admin-only page sends a test Google Ads purchase conversion
            from your browser for tag verification.
          </p>
        </header>

        <TestGoogleAdsConversionClient />

        <footer className="border-t border-slate-200 pt-6 text-sm text-slate-600">
          <Link
            href="/admin"
            className="font-medium text-slate-900 hover:underline"
          >
            ← Back to admin dashboard
          </Link>
        </footer>
      </section>
    </main>
  );
}
