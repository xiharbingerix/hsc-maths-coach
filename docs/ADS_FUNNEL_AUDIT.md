# Ads Funnel Audit

## Summary

The current Nova Maths HSC funnel is instrumented but incomplete. The paid landing page, CTA click, and Stripe redirect are tracked. The Google Ads conversion event is only fired on `/payment-success`, not on CTA click or checkout start. I also added a small safeguard to preserve marketing parameters (gclid/UTM) from the HSC page before Stripe and replay them on payment success.

## Current tracking map

1. `/hsc-maths` page view
   - Event: `hsc_maths_viewed`
   - File: `app/hsc-maths/page.tsx` via `PageViewTracker`
   - Notes: page path is captured via `clientTrackEvent` default metadata.

2. Trial CTA click from HSC page
   - Events:
     - `subscribe_clicked` via `trackSubscribeClicked()`
     - `trial_cta_clicked` via `clientTrackEvent("trial_cta_clicked", { source: "hsc-maths", method: "direct-stripe" })`
   - File: `app/hsc-maths/HscMathsCTAs.tsx`
   - Notes: this fires before redirecting to Stripe.

3. Checkout start / direct Stripe flow
   - Events:
     - `checkout_started` via `trackCheckoutStarted()` and `clientTrackEvent("checkout_started", { offer: "online-learning" })`
     - `checkout_redirected_to_stripe` via `clientTrackEvent("checkout_redirected_to_stripe", { offer: "online-learning" }, { beacon: true })`
   - File: `app/hsc-maths/HscMathsCTAs.tsx`
   - Notes: the event is sent with beacon-safe delivery before navigating.

4. Stripe checkout session creation
   - File: `app/api/stripe/create-checkout-session/route.ts`
   - Notes: this API creates the Stripe session and returns `session.url`.
   - No analytics events are emitted server-side in this route beyond logging and optional `checkout_funnel_events` Supabase writes for logged-in users.

5. Payment success return
   - File: `app/payment-success/page.tsx`
   - Event tracking via `app/payment-success/TrackPaymentSuccess.tsx`
   - Events fired:
     - `payment_success` via `trackPaymentSuccess()` to gtag
     - Google Ads conversion via `trackGoogleAdsPurchaseConversion(sessionId)` to gtag
     - `trial_started` via `trackEvent("trial_started", marketingParams)` and `clientTrackEvent("trial_started", marketingParams)` when the offer is online-learning
     - `payment_success` now also recorded internally via `clientTrackEvent("payment_success", marketingParams)` after this audit

6. Dashboard access / lesson starts
   - Events added in this audit:
     - `dashboard_viewed` when the student dashboard loads.
     - `course_selected` when the course picker is updated.
     - `continue_learning_clicked` when the dashboard continue learning button is clicked.
     - `lesson_started` when an individual lesson page is loaded.
   - These events include marketing attribution metadata when available.

## Trial Started implementation

- `trial_started` is implemented in code.
- It is fired on the payment success page when `offer.slug === "online-learning"`.
- File: `app/payment-success/page.tsx` and `app/payment-success/TrackPaymentSuccess.tsx`.
- Internal analytics now also records `trial_started` and `payment_success` with preserved marketing metadata.

## Google Ads conversion firing points

- CTA click: not a Google Ads conversion event.
- Checkout start: not a Google Ads conversion event.
- Stripe redirect: not a Google Ads conversion event.
- Payment success: yes, `trackGoogleAdsPurchaseConversion()` fires a gtag conversion event on `/payment-success`.
- Trial/subscription creation: the site-side conversion is only on the success page, not at Stripe subscription activation.

## Google Ads conversion name mismatch

- The repo uses `trial_started` internally.
- The Google Ads conversion event is a separate `gtag('event', 'conversion', ...)` call with `send_to: "AW-18195883998/o6pYCKXb0rYcEN7PvORD"`.
- There is no exact string match to `"Trial Started"` in code, meaning the mapping is external to the site.
- That is acceptable, but it means Google Ads relies on the AW conversion action configuration, not the internal event name.

## Direct Stripe checkout risk

- The HSC CTA path sends users straight to Stripe from the page, so the final Google Ads conversion can only happen after they return to `/payment-success`.
- If a user drops off in Stripe or cancels, the site receives no conversion signal.
- The direct-stripe flow is instrumented for click and redirect, but the conversion itself depends on the return path.

## Payment success reliability

- Payment success uses client-side `gtag` and retries up to 10 times with 250ms delays.
- That is good, but it is still fragile if the Google tag loads slowly, is blocked, or the page is left before the retry window completes.
- The event will not fire if the user does not land on `/payment-success` successfully.

## UTM/gclid / attribution

- Before this audit, UTM and gclid values were not explicitly preserved through the Stripe flow.
- I added a small safe fix to preserve `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` from the HSC page before redirecting to Stripe.
- Those values are now replayed into `trial_started` and `payment_success` analytics metadata on the success page.
- This improves internal attribution and debugging, but it does not change how Google Ads auto-tagging works.

## Funnel gaps and risks

- The funnel now includes downstream engagement events like `dashboard_viewed` and `lesson_started`, which helps validate post-purchase activity.
- The source of truth still relies on `/payment-success` for Google Ads conversion and trial activation.
- There is no distinct `subscription_activated` event yet, but lesson and dashboard engagement events improve downstream coverage.
- If customers create accounts or access the dashboard via login after purchase, the dashboard and continue-learning events still provide better coverage than before.

## Offer/page audit

- The hero makes the offer visible quickly:
  - HSC maths / Year 12 Advanced and Standard 2 clearly stated.
  - The hero CTA says "Start your 7-day free trial".
  - The price flashing on the hero includes "No charge today" and "Then $19/month".
- The fixed mobile CTA bar exists and keeps the conversion action accessible on phones.
- The page mentions NSW HSC and online learning, and includes a preview lesson CTA.
- Risks:
  - The page may still ask users to start checkout before they have seen enough proof or a strong trust signal.
  - The promise is more about structure and progress than a quick Band 6 result, so ad copy and page messaging must match carefully.
  - The page is dense; the $19/month offer may not stand out enough for all visitors.
- A low-risk experiment adds a stronger above-the-fold offer block plus a demo-focused secondary CTA so users can preview a sample lesson before heading to Stripe.
### Must fix before spending more

- Pause or reduce spend until you confirm conversions on `/payment-success` via Google Ads tag diagnostics.
- Ensure the Google Ads conversion action configuration matches the `send_to` value in `lib/analytics.ts`.
- Add explicit internal tracking for the success page and preserve marketing attribution through Stripe. (Implemented in this audit.)

### Should fix this week

- Add a distinct `subscription_activated` or `checkout_completed` event separate from `trial_started`.
- Verify the newly added `dashboard_viewed`, `course_selected`, `continue_learning_clicked`, and `lesson_started` events in analytics reporting.
- Document the funnel in admin analytics so the team can compare ad clicks → checkout → trial starts.

### Later experiments

- A/B test clearer hero messaging for "NSW HSC maths" versus "7-day free trial".
- Test whether a preview lesson/demo before checkout improves conversion.
- Add stronger social proof or exam-aligned testimonials near the primary CTA.
