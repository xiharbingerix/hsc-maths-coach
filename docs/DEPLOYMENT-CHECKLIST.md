# Nova Maths Deployment Checklist

Internal checklist for recent Supabase, worksheet, mastery, dashboard, tutor workspace, and trial-funnel changes.

## 1. Supabase Migrations

Run these in Supabase SQL editor in order:

1. `lib/supabase-migrations/006_question_diagram_data.sql`
2. `lib/supabase-migrations/007_student_mastery.sql`
3. `lib/supabase-migrations/008_worksheet_student_name.sql`
4. `lib/supabase-migrations/009_assigned_worksheets.sql`
5. `lib/supabase-migrations/010_worksheet_email_rls.sql`
6. `lib/supabase-migrations/011_mastery_source_question_id.sql`

Must run before deploy because current code reads/writes these:

- `006_question_diagram_data.sql`: worksheet pages read `questions.diagram_data`.
- `007_student_mastery.sql`: dashboard, adaptive worksheets, tutor workspace, and mastery updates use `student_mastery` and `mastery_events`.
- `008_worksheet_student_name.sql`: worksheet start flow writes `worksheet_attempts.student_name`.
- `009_assigned_worksheets.sql`: admin worksheet generator/dashboard/tutor workspace read and write assigned student fields, due dates, and status.
- `010_worksheet_email_rls.sql`: student dashboard reads worksheets assigned by email.
- `011_mastery_source_question_id.sql`: lesson/worksheet mastery event tracking expects source/question ID compatibility.

## 2. Question Bank Seed

Dry-run all courses:

```powershell
npm.cmd run seed:question-bank -- --dry-run --course all
```

Live seed all courses:

```powershell
npm.cmd run seed:question-bank -- --course all
```

Single-course seed:

```powershell
npm.cmd run seed:question-bank -- --course year-10-mathematics
```

Use `npx.cmd` if running scripts directly in PowerShell. Avoid `npx` if execution policy blocks `npx.ps1`.

## 3. Required Environment Variables

Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Stripe:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ONLINE_LEARNING_MONTHLY`
- `STRIPE_PRICE_DIAGNOSTIC_REPORT`
- `STRIPE_PRICE_STUDY_PLAN`

Site/admin:

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`

Analytics/marketing if used:

- GA/Google Ads IDs configured in app/env as required by current analytics setup.
- Resend/cron env vars if purchase prompt emails are enabled.

Run before deploy when possible:

```powershell
npm.cmd run check:env
```

## 4. Production QA

Trial checkout:

- Visit `/checkout?offer=online-learning`.
- Confirm copy says 7-day free trial, no charge today, then `$19/month`.
- Complete Stripe test/live checkout as appropriate.
- Confirm Stripe session uses trial and redirects to `/payment-success?session_id=...`.

Access activation:

- Confirm Stripe webhook returns `200`.
- Confirm `user_access` becomes `active`.
- Confirm `/dashboard` and a protected lesson route are accessible.
- Confirm payment-success fallback works if webhook is delayed.

Diagnostic result CTA:

- Run a diagnostic.
- Confirm result CTA points to the trial/online-learning funnel.
- Confirm diagnostic result is saved for study plan use.

Worksheet generation:

- Open `/admin/worksheets/new`.
- Generate a worksheet.
- Open the share link.
- Start, answer, complete, and confirm score saves.

Adaptive worksheet:

- Log in as a student with `student_mastery` rows.
- Click `Generate revision worksheet` on `/dashboard`.
- Confirm it opens `/worksheet/{share_token}`.
- Confirm worksheet is assigned to the logged-in user/email.
- Confirm questions come from weak mastery topics.

Dashboard mastery:

- Complete a lesson/worksheet that records mastery.
- Confirm dashboard mastery, study plan, progress, worksheets, and continue-learning sections update.

Tutor workspace:

- Open `/admin/students`.
- Test search and filters.
- Open a student detail page.
- Confirm summary cards, weakest topic, recommended next action, worksheet history, and diagnostic history render.
- Click `Generate worksheet` and confirm student name/email prefill.

## 5. Rollback Notes

- If app deploy fails before migrations are applied, apply migrations first rather than rolling back code.
- If worksheet/adaptive features fail due to seed data, keep app deployed and run the question-bank seed.
- If a migration causes unexpected RLS behaviour, temporarily disable the affected UI path or add a corrective migration; do not remove policies blindly in production.
- Stripe trial/access problems should be rolled back cautiously because webhook and payment-success fallback both affect access state.

## 6. Common Failure Modes

- Missing migration columns: errors around `diagram_data`, `student_name`, `assigned_student_email`, `due_at`, `status`, `student_mastery`, or `mastery_events`.
- RLS hiding worksheet rows: student dashboard cannot see assigned worksheets unless `010_worksheet_email_rls.sql` is applied and email casing matches.
- Stripe webhook not activating access: check `STRIPE_WEBHOOK_SECRET`, webhook endpoint, `offer_selected=online-learning`, `metadata.user_id`, and `client_reference_id`.
- Seed script env not loaded: ensure Supabase URL/service role env vars exist in the shell running the seed.
- PowerShell `npx.ps1` execution policy issue: use `npx.cmd` or `npm.cmd run ...`.
- Not enough adaptive worksheet questions: run the seed for all courses and confirm active questions exist for the student's weakest `topic_slug`.
