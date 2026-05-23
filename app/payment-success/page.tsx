import Link from "next/link";
import { getOfferConfig } from "../../lib/offers";
import { getStripe } from "../../lib/stripe";

async function getSessionOffer(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return getOfferConfig(session.metadata?.offer_selected);
  } catch {
    return null;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const offer = await getSessionOffer(params?.session_id);
  const isOnlineLearning = offer?.slug === "online-learning";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Payment received
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Thanks - your payment has been received.
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {isOnlineLearning
              ? "Online learning access is linked automatically when checkout was completed while logged in. If you checked out with an email only, Joshua may need to match the payment to your account manually."
              : "Report and study plan options are manually reviewed before follow-up during early access."}
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight">
            {offer ? offer.label : "Next steps"}
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            {offer?.priceLabel ?? "Early access"}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {isOnlineLearning ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Go to dashboard
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Create account
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Start diagnostic
                </Link>
                <Link
                  href="/enquire"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Enquire
                </Link>
              </>
            )}
            <Link
              href="/online-learning"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              View online learning
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
