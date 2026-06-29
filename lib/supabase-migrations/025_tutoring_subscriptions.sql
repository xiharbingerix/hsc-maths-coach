-- Admin-managed weekly tutoring subscriptions.
--
-- A tutoring plan is created by the admin (per student), who sends the parent a
-- Stripe Checkout link. The parent enters their card; the webhook then fills in
-- the Stripe ids and flips status to active. All access is server-side (service
-- role, bypasses RLS) — this table holds no student-readable data, so RLS is
-- enabled with no public policies.

create table if not exists tutoring_subscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Who the plan is for
  student_name text not null,
  parent_email text not null,

  -- Commitment terms (the "block") — stored for the record + reminders.
  -- The Stripe subscription itself is open-ended; committed_weeks is the
  -- agreement we communicate to the parent, not a Stripe auto-cancel.
  weekly_amount_cents integer not null,
  currency text not null default 'aud',
  committed_weeks integer not null,

  -- billing_monday is the Monday the first full charge lands on; billing then
  -- recurs every Monday. term_label records the term/holiday status of that
  -- Monday at the time the plan was created (e.g. "Term 3 2026").
  billing_monday date not null,
  term_label text,

  -- Stripe linkage (filled in by the webhook once the parent pays).
  stripe_checkout_session_id text unique,
  stripe_subscription_id text,
  stripe_customer_id text,

  -- Lifecycle: 'pending' (link sent, not yet paid), 'active', 'paused',
  -- 'canceled'.
  status text not null default 'pending'
    check (status in ('pending', 'active', 'paused', 'canceled')),

  notes text
);

alter table tutoring_subscriptions enable row level security;

create index if not exists tutoring_subscriptions_status_idx
  on tutoring_subscriptions (status, created_at desc);

create index if not exists tutoring_subscriptions_stripe_sub_idx
  on tutoring_subscriptions (stripe_subscription_id);
