import Link from "next/link";
import { getOfferConfig } from "../../lib/offers";
import { getStripe } from "../../lib/stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { TrackPaymentSuccess } from "./TrackPaymentSuccess";

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

// Fallback: if the Stripe webhook was delayed or failed, activate access
// directly when the student lands on this page. This is idempotent — running
// it when the webhook already succeeded is a no-op.
async function ensureOnlineLearningAccessActivated(
  sessionId: string | undefined
) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") return;
    if (session.metadata?.offer_selected !== "online-learning") return;

    const userId =
      session.metadata?.user_id || session.client_reference_id || null;
    if (!userId) {
      console.warn("[payment-success] No user_id in session", { sessionId });
      return;
    }

    const { data: existingAccess, error: readError } = await supabaseAdmin
      .from("user_access")
      .select("id, status")
      .eq("user_id", userId)
      .eq("access_type", "online_learning_beta")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (readError) {
      console.error("[payment-success] user_access read error", {
        userId,
        message: readError.message,
      });
      return;
    }

    if (existingAccess?.status === "active") {
      // Webhook already handled it — nothing to do.
      return;
    }

    if (existingAccess?.id) {
      const { error } = await supabaseAdmin
        .from("user_access")
        .update({ status: "active" })
        .eq("id", existingAccess.id);

      if (error) {
        console.error("[payment-success] user_access update error", {
          userId,
          message: error.message,
        });
        return;
      }
    } else {
      const { error } = await supabaseAdmin.from("user_access").insert({
        user_id: userId,
        access_type: "online_learning_beta",
        status: "active",
      });

      if (error) {
        console.error("[payment-success] user_access insert error", {
          userId,
          message: error.message,
        });
        return;
      }
    }

    console.log("[payment-success] Activated access via fallback", {
      userId,
      sessionId,
    });
  } catch (error) {
    console.error("[payment-success] ensureOnlineLearningAccessActivated failed", {
      sessionId,
      error,
    });
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  // Run both in parallel — the offer lookup and the fallback access activation.
  const [offer] = await Promise.all([
    getSessionOffer(sessionId),
    ensureOnlineLearningAccessActivated(sessionId),
  ]);

  const isOnlineLearning = offer?.slug === "online-learning";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <TrackPaymentSuccess />
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
              ? "Access is activated automatically. If your dashboard does not show active access within a few minutes, contact support@novamaths.com.au."
              : "Year 12 Mathematics Advanced report and study plan options are reviewed before follow-up."}
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight">
            {offer ? offer.label : "Next steps"}
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            {offer?.priceLabel ?? "Next steps"}
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
