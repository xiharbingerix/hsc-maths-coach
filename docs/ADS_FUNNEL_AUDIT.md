# Ads Funnel Audit

## Summary

The current Nova Maths HSC funnel is instrumented but incomplete. The paid landing page, CTA click, and Stripe redirect are tracked. The Google Ads conversion event is only fired on `/payment-success`, not on CTA click or checkout start. I also added a small safeguard to preserve marketing parameters (gclid/UTM) from the HSC page before Stripe and replay them on payment success.

## Current tracking map

1. `/hsc-maths` page view
   - Event: `hsc_maths_viewed`
   - File: `app/hsc-maths/page.tsx` via `PageViewTracker`
   - Notes: page path is captured via `clientTrackEvent`, and the HSC page now opts into `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` metadata on the page-view event.

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
- Follow-up fix: `hsc_maths_viewed` now also reads the same URL marketing parameters before firing, so the first landing-page event can be attributed to the same campaign as later CTA and checkout events.
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

## Ads funnel diagnostic SQL

Use the `analytics_events` table to compare real ad traffic vs test traffic. The following query groups by `utm_campaign` and marks `gclid` values starting with `TEST` as test traffic.

```sql
with relevant_events as (
  select
    event_name,
    metadata->> 'utm_campaign' as utm_campaign,
    metadata->> 'gclid' as gclid,
    case
      when metadata->> 'utm_campaign' = 'test_hsc_trial'
        or metadata->> 'gclid' like 'TEST%'
      then true
      else false
    end as is_test
  from analytics_events
  where event_name in (
    'hsc_maths_viewed',
    'trial_cta_clicked',
    'checkout_started',
    'checkout_redirected_to_stripe',
    'payment_success',
    'trial_started',
    'dashboard_viewed',
    'lesson_started'
  )
)
select
  case
    when is_test then 'test_hsc_trial / TEST gclid'
    else 'real ads / organic'
  end as traffic_segment,
  coalesce(utm_campaign, '(none)') as utm_campaign,
  sum((event_name = 'hsc_maths_viewed')::int) as hsc_maths_viewed,
  sum((event_name = 'trial_cta_clicked')::int) as trial_cta_clicked,
  sum((event_name = 'checkout_started')::int) as checkout_started,
  sum((event_name = 'checkout_redirected_to_stripe')::int) as checkout_redirected_to_stripe,
  sum((event_name = 'payment_success')::int) as payment_success,
  sum((event_name = 'trial_started')::int) as trial_started,
  sum((event_name = 'dashboard_viewed')::int) as dashboard_viewed,
  sum((event_name = 'lesson_started')::int) as lesson_started,
  round(100.0 * nullif(sum((event_name = 'trial_cta_clicked')::int), 0) / nullif(sum((event_name = 'hsc_maths_viewed')::int), 0), 1) as pct_view_to_cta,
  round(100.0 * nullif(sum((event_name = 'checkout_started')::int), 0) / nullif(sum((event_name = 'trial_cta_clicked')::int), 0), 1) as pct_cta_to_checkout_started,
  round(100.0 * nullif(sum((event_name = 'checkout_redirected_to_stripe')::int), 0) / nullif(sum((event_name = 'checkout_started')::int), 0), 1) as pct_checkout_started_to_stripe_redirect,
  round(100.0 * nullif(sum((event_name = 'trial_started')::int), 0) / nullif(sum((event_name = 'checkout_redirected_to_stripe')::int), 0), 1) as pct_stripe_redirect_to_trial_started,
  round(100.0 * nullif(sum((event_name = 'lesson_started')::int), 0) / nullif(sum((event_name = 'trial_started')::int), 0), 1) as pct_trial_started_to_lesson_started
from relevant_events
group by traffic_segment, utm_campaign
order by traffic_segment, utm_campaign;
```

### How to read this

- `traffic_segment = test_hsc_trial / TEST gclid` shows the controlled test traffic that should be excluded from real ad reporting.
- `real ads / organic` includes all other traffic, including production UTM campaigns.
- `pct_view_to_cta` measures the landing page conversion from page view to trial CTA click.
- `pct_cta_to_checkout_started` measures the drop from clicking the CTA to starting checkout.
- `pct_checkout_started_to_stripe_redirect` measures whether checkout attempts are actually reaching Stripe.
- `pct_stripe_redirect_to_trial_started` measures how many Stripe redirects return and record a trial start.
- `pct_trial_started_to_lesson_started` measures downstream engagement after trial activation.

### Recommended diagnostic steps

1. Run the query and verify test traffic is isolated by `utm_campaign = test_hsc_trial` or `gclid LIKE 'TEST%'`.
2. Focus on the `real ads / organic` rows for production performance.
3. If `hsc_maths_viewed` is large but `trial_cta_clicked` is low, the issue is landing page messaging.
4. If `trial_cta_clicked` is healthy but `checkout_started` is low, the issue is CTA/checkout friction.
5. If `checkout_started` is healthy but `checkout_redirected_to_stripe` is low, the issue is server/API or redirect flow.
6. If `checkout_redirected_to_stripe` is healthy but `trial_started` is low, the issue is Stripe dropoff or return-path conversion.
7. If `trial_started` is healthy but `lesson_started` is low, the issue is post-purchase onboarding.
