# Nova Maths Deployment

Run `npm run check:env` before deploying and after configuring a new Vercel
environment. The check reports presence only: it never prints secret values and
does not contact Supabase or Stripe.

## Vercel Environment Variables

Configure variables for the relevant Vercel environments: Production, Preview,
and Development. Redeploy after changing any `NEXT_PUBLIC_` variable because
Next.js includes public variables in the browser bundle at build time.

### Core App

These variables are required. `npm run check:env` exits with code `1` when
either is missing.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL used by authentication and lesson progress |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-safe Supabase anonymous key |

### Payments

These variables are required when Stripe checkout and payment webhooks are
enabled. The environment check warns when they are missing.

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-only Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Server-only webhook signature secret |
| `NEXT_PUBLIC_SITE_URL` | Public site origin used for Stripe success and cancellation redirects, for example `https://www.novamaths.com.au` |
| `STRIPE_PRICE_DIAGNOSTIC_REPORT` | Stripe Price ID for the diagnostic report |
| `STRIPE_PRICE_STUDY_PLAN` | Stripe Price ID for the study plan |
| `STRIPE_PRICE_ONLINE_LEARNING_MONTHLY` | Stripe Price ID for the online-learning subscription |

Vercel supplies `VERCEL_URL` automatically, and the shared URL helper can use it
as a fallback. Stripe checkout currently reads `NEXT_PUBLIC_SITE_URL`
explicitly, so set that variable for deployed environments.

### Admin

These server-only variables are required when the admin dashboard is enabled.
The environment check warns when they are missing.

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Password used by the admin login route |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase key used by admin and Stripe webhook operations |

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, or `ADMIN_PASSWORD` as `NEXT_PUBLIC_` variables.

### Email Automation

These server-only variables are required for automated signup recovery emails.
The environment check warns when they are missing.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend API key used to send purchase prompt emails |
| `CRON_SECRET` | Secret used by Vercel Cron to call `/api/cron/send-purchase-prompts` |

The scheduled recovery route runs daily from `vercel.json`. It sends the
existing purchase prompt to users who signed up more than 30 minutes ago, do
not already have active online-learning access, have not paid for online
learning, and have not already received the automated signup recovery email.

Vercel Hobby projects only support daily cron schedules. If the project is moved
to Vercel Pro, the schedule can be increased to every 30 minutes.

### Symbolic Answer Marking (CAS) — optional

These enable Tier-1 CAS marking (see `cas-service/`), which accepts
mathematically-equivalent-but-differently-written answers (`2(x+3)` = `2x+6`).
**If `CAS_SERVICE_URL` is unset, the feature is completely inert** and marking
behaves exactly as before — so the app can ship without these configured.

| Variable | Purpose |
| --- | --- |
| `CAS_SERVICE_URL` | Base URL of the deployed `cas-service` (e.g. `https://nova-cas.fly.dev`). Unset = CAS disabled. |
| `CAS_SHARED_SECRET` | Server-only secret sent as `X-CAS-Secret`; must match the value set on the CAS service. |
| `CAS_MARKING_ENABLED` | Optional kill switch. Set to `false` to force-disable even when `CAS_SERVICE_URL` is present. |

The CAS service is a separate Python deployment (its own host — Fly/Render/Cloud
Run/Vercel project), not part of this Next.js app. Prefer an always-warm
instance to avoid cold-start latency on the marking path. Both server (worksheet
grading) and client (lesson practice, via `/api/cas/equiv`) only ever call CAS
*after* the local marker says "wrong", and fall back to the local result on any
timeout or error.

### Optional Analytics And Marketing

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 property ID for analytics reporting |

The Google Ads base tag and purchase conversion destination are configured in
application code. No additional Google Ads environment variable is currently
required.

## Supabase Setup

Before testing cross-device lesson progress, open the Supabase SQL editor and
run:

`lib/supabase-migrations/001_lesson_progress.sql`

This creates the `lesson_progress` table, enables row-level security, adds the
policy that lets users manage only their own progress, and creates the user and
course lookup index.

The environment check cannot verify whether the SQL migration has been applied.

Before testing checkout funnel analytics, run:

`lib/supabase-migrations/002_checkout_funnel_events.sql`

Before enabling automated signup recovery emails, run:

`lib/supabase-migrations/003_signup_recovery_emails.sql`

## Pre-Deploy Checks

Run:

```powershell
npm.cmd run check:env
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
```

## Post-Deploy Smoke Checklist

- Confirm the homepage loads.
- Log in and open `/dashboard`.
- Open a lesson route.
- Pass mastery in a lesson, then confirm dashboard progress updates.
- Log in to `/admin`.
- Test Stripe checkout and the payment success page when Stripe is enabled.
- Confirm Stripe webhooks are being received when payments are enabled.
- Check GA4 Realtime when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
