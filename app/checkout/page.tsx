import { redirect } from "next/navigation";
import { CheckoutFooterLinks } from "./CheckoutFooterLinks";
import { CheckoutForm } from "./CheckoutForm";
import { getOfferConfig, type OfferSlug } from "../../lib/offers";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ offer?: string }>;
}) {
  const params = await searchParams;
  const offer = getOfferConfig(params?.offer);

  if (!offer) {
    redirect("/enquire");
  }

  if (!offer.checkoutEnabled || offer.slug === "weekly-tutoring") {
    redirect(offer.enquiryHref);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Secure checkout
          </h1>

          {offer.slug === "online-learning" ? (
            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                Nova Maths Online Learning &mdash; 7-day free trial
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                <li>No charge today &middot; then $19/month</li>
                <li>Secure payment through Stripe</li>
                <li>Cancel any time from your account</li>
                <li>Access activates automatically when your trial starts</li>
                <li>Progress saved across devices</li>
              </ul>
            </div>
          ) : (
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              You will be redirected to Stripe&apos;s secure payment page. No
              card details are entered here.
            </p>
          )}
        </header>

        <CheckoutForm offerSlug={offer.slug as OfferSlug} />

        <CheckoutFooterLinks
          enquiryHref={offer.enquiryHref}
          offerSlug={offer.slug as OfferSlug}
        />
      </section>
    </main>
  );
}
