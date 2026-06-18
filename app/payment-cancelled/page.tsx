import Link from "next/link";
import { getOfferConfig, type OfferSlug } from "../../lib/offers";
import { TrackPaymentCancelled } from "./TrackPaymentCancelled";

export default async function PaymentCancelledPage({
  searchParams,
}: {
  searchParams?: Promise<{ offer?: string }>;
}) {
  const params = await searchParams;
  const offer = getOfferConfig(params?.offer);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <TrackPaymentCancelled offerSlug={offer?.slug as OfferSlug | undefined} />
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Checkout cancelled
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          No payment has been taken.
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          {offer
            ? `You can return to ${offer.label}, choose another option, or send an enquiry instead.`
            : "You can return to the options or send an enquiry instead."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Back to homepage
          </Link>
          <Link
            href="/online-learning"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Online learning
          </Link>
          <Link
            href={offer?.enquiryHref ?? "/enquire"}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Enquire instead
          </Link>
        </div>
      </section>
    </main>
  );
}
