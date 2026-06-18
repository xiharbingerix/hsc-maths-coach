"use client";

import Link from "next/link";
import type { OfferSlug } from "../../lib/offers";
import { clientTrackEvent } from "../../lib/analytics/clientTrackEvent";

type CheckoutFooterLinksProps = {
  enquiryHref: string;
  offerSlug: OfferSlug;
};

export function CheckoutFooterLinks({
  enquiryHref,
  offerSlug,
}: CheckoutFooterLinksProps) {
  function trackClick(eventName: string) {
    clientTrackEvent(eventName, { offer: offerSlug }, { beacon: true });
  }

  return (
    <footer className="flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm">
      <Link
        href="/"
        onClick={() => trackClick("checkout_back_to_home_clicked")}
        className="font-medium text-slate-900 hover:underline"
      >
        Back to homepage
      </Link>
      <Link
        href={enquiryHref}
        onClick={() => trackClick("checkout_enquire_instead_clicked")}
        className="font-medium text-slate-900 hover:underline"
      >
        Enquire instead
      </Link>
    </footer>
  );
}
