import Link from "next/link";
import { getOfferConfig } from "../../lib/offers";
import { getStripe } from "../../lib/stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { TrackPaymentSuccess } from "./TrackPaymentSuccess";
import { SetPasswordForm } from "./SetPasswordForm";

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

type OnlineLearningSetupResult = {
  customerEmail: string | null;
  needsPasswordSetup: boolean;
};

// Look up a Supabase user by email. Returns the user's id if found.
async function findUserIdByEmail(email: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  return data?.id ?? null;
}

// Create a confirmed Supabase user with a random password. The user will set
// their own password via the email link sent from SetPasswordForm.
async function createUserByEmail(
  email: string,
  studentFirstName: string | null
): Promise<string | null> {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    password: crypto.randomUUID(),
    user_metadata: { needs_password_setup: true },
  });

  if (error || !data.user) {
    console.error("[payment-success] createUser failed", {
      email,
      message: error?.message,
    });
    return null;
  }

  const userId = data.user.id;

  await supabaseAdmin.from("profiles").upsert({
    id: userId,
    email,
    student_first_name: studentFirstName ?? null,
    role: "student",
  });

  return userId;
}

// Activate online_learning_beta access for a user. Idempotent.
async function activateOnlineLearningAccess(userId: string): Promise<void> {
  const { data: existing, error: readError } = await supabaseAdmin
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

  if (existing?.status === "active") return;

  if (existing?.id) {
    const { error } = await supabaseAdmin
      .from("user_access")
      .update({ status: "active" })
      .eq("id", existing.id);

    if (error) {
      console.error("[payment-success] user_access update error", {
        userId,
        message: error.message,
      });
    }
    return;
  }

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
  }
}

// Ensure online learning access is activated. Handles both the legacy flow
// (userId present in session metadata) and the new anonymous flow (no userId
// — user is looked up or created by their Stripe checkout email).
//
// Returns the customer email and whether a new Supabase account was created,
// so the page can render the appropriate password-setup prompt.
async function ensureOnlineLearningAccessActivated(
  sessionId: string | undefined
): Promise<OnlineLearningSetupResult> {
  const noResult: OnlineLearningSetupResult = {
    customerEmail: null,
    needsPasswordSetup: false,
  };

  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return noResult;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.offer_selected !== "online-learning") return noResult;

    const hasActiveSubscription =
      session.mode === "subscription" && Boolean(session.subscription);

    if (session.payment_status !== "paid" && !hasActiveSubscription) {
      return noResult;
    }

    // Email is always available on a completed Stripe checkout session.
    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    // Prefer the userId already embedded in the session (legacy/logged-in flow).
    let userId: string | null =
      session.metadata?.user_id || session.client_reference_id || null;
    let needsPasswordSetup = false;

    if (!userId) {
      if (!customerEmail) {
        console.warn(
          "[payment-success] No user_id and no customer email in session",
          { sessionId }
        );
        return noResult;
      }

      // Anonymous flow: find or create Supabase user by the email Stripe collected.
      const existingId = await findUserIdByEmail(customerEmail);

      if (existingId) {
        // User was already created — likely by the webhook (webhook-first ordering).
        // Check whether they still need to set a password. The webhook sets
        // needs_password_setup: true when it creates the user; the reset-password
        // page clears it to false once the user has set a real password.
        userId = existingId;
        const { data: authData } = await supabaseAdmin.auth.admin.getUserById(existingId);
        needsPasswordSetup = authData.user?.user_metadata?.needs_password_setup === true;
      } else {
        const studentFirstName =
          session.metadata?.student_first_name ?? null;
        userId = await createUserByEmail(customerEmail, studentFirstName);
        if (userId) {
          needsPasswordSetup = true;

          // Patch the payments row so future subscription lifecycle webhooks
          // can find and update this user's access. This is a best-effort
          // UPDATE — if the webhook hasn't created the row yet (payment-success
          // before webhook ordering), 0 rows are affected and the webhook's
          // post-upsert profile lookup will link the row instead.
          const { error: patchError } = await supabaseAdmin
            .from("payments")
            .update({ user_id: userId })
            .eq("stripe_checkout_session_id", session.id)
            .is("user_id", null);
          if (patchError) {
            console.error(
              "[payment-success] payments user_id patch failed (non-fatal)",
              { sessionId: session.id, message: patchError.message }
            );
          }
        }
      }
    }

    if (!userId) {
      console.warn(
        "[payment-success] Could not resolve userId for access activation",
        { sessionId, customerEmail }
      );
      return { customerEmail, needsPasswordSetup: false };
    }

    await activateOnlineLearningAccess(userId);

    console.log("[payment-success] Access activated", {
      userId,
      sessionId,
      needsPasswordSetup,
    });

    return { customerEmail, needsPasswordSetup };
  } catch (error) {
    console.error(
      "[payment-success] ensureOnlineLearningAccessActivated failed",
      { sessionId, error }
    );
    return noResult;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  const [offer, onlineLearningSetup] = await Promise.all([
    getSessionOffer(sessionId),
    ensureOnlineLearningAccessActivated(sessionId),
  ]);

  const isOnlineLearning = offer?.slug === "online-learning";
  const { customerEmail, needsPasswordSetup } = onlineLearningSetup;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <TrackPaymentSuccess
        extraEventName={isOnlineLearning ? "trial_started" : undefined}
      />
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            {isOnlineLearning ? "Trial active" : "Payment received"}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {isOnlineLearning
              ? "Your trial is active."
              : "Thanks — your payment has been received."}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {isOnlineLearning
              ? needsPasswordSetup
                ? "Your 7-day free trial is active. Set a password below to access your lessons and dashboard."
                : "Your 7-day free trial is active and access is activated automatically. Log in to access your dashboard."
              : "Year 12 Mathematics Advanced report and study plan options are reviewed before follow-up."}
          </p>
        </header>

        {/* Password setup prompt — only shown for the anonymous flow where a
            new Supabase account was just created in this request. */}
        {isOnlineLearning && needsPasswordSetup && customerEmail ? (
          <SetPasswordForm email={customerEmail} />
        ) : null}

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
                  href="/online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  View online learning
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                >
                  Having trouble? Log in again
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
                <Link
                  href="/online-learning"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  View online learning
                </Link>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
