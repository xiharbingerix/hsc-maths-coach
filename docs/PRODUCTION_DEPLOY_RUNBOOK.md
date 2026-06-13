# Nova Maths Production Deploy Runbook

Last updated: 2026-06-13

This runbook covers the current release: Stripe-first checkout, ads funnel analytics, first-session onboarding, Year 9/10 Core and Advanced pathways, Year 12 Standard 1 fixes, Year 12 Extension 1, Year 12 Extension 2 scaffold, Lesson Maker saved plans, worksheet subtopic control, multi-part questions, and marks-weighted multi-part worksheet scoring.

Current release status:

- HSC page-view attribution now includes UTM/gclid metadata.
- Cancelled Stripe checkout path has been smoke-tested and works.
- Year 10 Trigonometry Skill Map v2 split is implemented.
- Year 10 Trig Slots 1-4 have been content-deepened and now target isolated skills.
- Multi-part worksheet preview/scoring has been implemented and smoke-tested with a disposable worksheet.
- Extension 2 has active Complex Numbers and 3D Vectors units, but course remains coming_soon.

## 1. Rules for this deploy

- Do not scale ads until every blocker in this runbook is cleared.
- Do not paste secrets into docs, commits, screenshots, or tickets.
- Run Supabase migration checks read-only before deploy.
- Apply database migrations before reseeding questions.
- Reseed the question bank after migrations and after the Vercel deployment is live.
- Use headed Chrome for final smoke checks. Pause for Joshua sign-in wherever required.

## 2. Pre-deploy local checklist

Run from the repo root:

```powershell
cd C:\Users\joshu\hsc-maths-coach
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course all --dry-run
npx.cmd tsx scripts/predeploy-check.ts
git diff --check
git status --short
```

Expected:

- TypeScript: pass.
- Build: pass.
- Lesson audit: pass with 0 failures. Warnings may remain content-style warnings.
- Seed dry-run: no warnings for supported courses.
- Predeploy check: pass for production-shaped env and required schema.
- `git diff --check`: no whitespace errors. Windows CRLF warnings are acceptable.
- `git status --short`: only intended release files are modified or staged.

## 3. Production env checklist

Check Vercel Production env vars before deploy:

| Env var | Required shape | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...` | Production Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret/JWT | Server only |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Must not be `mk_`, `pk_`, or `sk_test_` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Must match live mode |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production webhook endpoint secret |

Run locally against the intended env where possible:

```powershell
npx.cmd tsx scripts/predeploy-check.ts
```

Block deploy if Stripe live/public key modes do not match.

## 4. Supabase migration checklist

Apply migrations in order in the Supabase SQL editor or approved migration runner:

```text
012_analytics_events.sql
013_mastery_history.sql
014_student_notes.sql
015_student_subtopic_mastery.sql
016_question_flags.sql
017_selected_course_slug.sql
018_question_flags_review_trace.sql
019_saved_lesson_plans.sql
020_multi_part_questions.sql
```

Critical dependencies:

- `015_student_subtopic_mastery.sql`: daily review queue and adaptive/manual worksheet subtopic features.
- `019_saved_lesson_plans.sql`: Lesson Maker saved lesson plans.
- `020_multi_part_questions.sql`: `questions.question_parts`, `worksheet_answers.answer_payload`, and `worksheet_answers.part_results`.

After migrations, rerun:

```powershell
npx.cmd tsx scripts/predeploy-check.ts
```

Note: if `scripts/predeploy-check.ts` does not yet verify migration 020 explicitly, manually confirm `questions.question_parts`, `worksheet_answers.answer_payload`, and `worksheet_answers.part_results` exist before deploy.

## 5. Deploy order

```powershell
git status --short
git add -A
git commit -m "Prepare current Nova Maths production release"
git push origin main
```

Then:

1. Confirm Vercel Production deployment starts and finishes successfully.
2. Apply any unapplied Supabase migrations 012-020.
3. Run production-shaped predeploy checks.
4. Reseed question bank.
5. Run headed Chrome post-deploy smoke.
6. Monitor Stripe, Vercel, Supabase, and analytics for 24 hours.

## 6. Question bank reseed

Dry-run:

```powershell
npx.cmd tsx scripts/seed-question-bank.ts --course all --dry-run
```

Live reseed:

```powershell
npx.cmd tsx scripts/seed-question-bank.ts --course all
```

Targeted checks:

```powershell
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-advanced --dry-run
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-extension-1 --dry-run
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-extension-2 --dry-run
```

Expected:

- Year 12 Advanced includes the `tan-norm-mp-*` multi-part pilot rows.
- Year 12 Extension 1 prepares real rows.
- Year 12 Extension 2 prepares 0 rows while scaffold-only.

## 7. Headed Chrome post-deploy smoke

Use production URL in headed Chrome. Pause for Joshua sign-in where required.

### Checkout and payment

- Open HSC CTA from public marketing page.
- Confirm it redirects to Stripe checkout.
- Confirm the cancelled Stripe checkout path still returns safely only if checkout redirect or cancel URL code changed.
- Complete a safe production payment test only if Joshua explicitly approves the action and account.
- Confirm `/payment-success` lands on dashboard and access is active.
- Confirm active paid user visiting `/checkout` is sent to dashboard.

Completed checkout path was manually verified previously. Do not repeat unless Stripe/webhook/payment-success code changes. Monitor trial_started and payment_success in admin analytics after real traffic.

### Dashboard and onboarding

- New/first-session student sees onboarding banner.
- Course selection can be set and persists.
- Continue Learning works for selected course.
- Daily Review queue does not crash.
- Band Predictor does not crash for HSC Advanced/Standard.

### Course routes

- `/course/year-12-advanced/differential-calculus/tangents-and-normals`
- `/course/year-12-extension-1/proof-induction/intro-to-mathematical-induction`
- `/course/year-12-extension-2`

Expected:

- Advanced nested route renders lesson.
- Extension 1 nested route renders lesson.
- Extension 2 shows honest coming-soon/scaffold state; empty unit/lesson routes should 404 until content exists.

### Worksheets

- Admin `/admin/worksheets/new`, Joshua sign-in if needed.
- Auto weakest mode: leave subtopics blank and preview/generate.
- Manual subtopic mode: select Year 12 Advanced, Differential Calculus, Tangents and Normals.
- Enable multi-part questions and preview 20 questions.
- Confirm candidate metadata shows total and multi-part counts.
- If Joshua explicitly approves a disposable write, create worksheet and submit mixed multi-part answers.
- Confirm per-part inputs, partial state, per-part marks, correct answers, explanations, and final marks summary.

Known disposable local/dev smoke token:

```text
/worksheet/7d22a574-41c6-48c0-9189-858c0b87f887
```

Do not rely on this token for production; create a fresh disposable worksheet only with explicit approval.

### Lesson Maker

- Open `/admin/lesson-maker`.
- Generate a plan.
- Save the plan.
- Reload/open saved plan.
- Use worksheet handoff and confirm course/topic/subtopic prefill.

### Admin analytics

- Open admin analytics.
- Confirm ads funnel events render without crashing:
  - `trial_cta_clicked`
  - `checkout_started`
  - `trial_started`
  - payment success/conversion events

## 8. Rollback notes

If Vercel deploy fails:

```powershell
vercel rollback
```

or use the Vercel dashboard to promote the last known-good deployment.

If code deploy succeeds but DB-dependent features fail:

- Do not revert migrations casually.
- Disable ads and stop traffic expansion.
- Promote previous Vercel deployment if failures are user-facing.
- Apply missing migration(s), then reseed.
- Re-run smoke before resuming ads.

If Stripe checkout fails:

- Stop paid traffic immediately.
- Check Vercel env prefixes: `sk_live_`, `pk_live_`, `whsec_`.
- Check Stripe webhook endpoint logs and Vercel function logs.
- Do not alter checkout/auth/payment code during incident response unless a clear bug is identified.

## 9. Known risks and do-not-scale-yet items

Do not scale ads until:

- Stripe production env is confirmed live-mode and webhook is healthy.
- Migrations 012-020 are applied.
- Question bank has been reseeded after deploy.
- Checkout through dashboard activation has passed in headed Chrome.
- Admin analytics confirms funnel events are arriving.

Known product risks:

- Attempt-level DB score columns still store question-count score; marks totals are computed from answer rows.
- Mastery partial weighting is not implemented yet.
- Extension 2 is scaffold-only and must not be sold as available.
- Extension 1 still lacks full past-paper/timed-exam coverage.
- Multi-part scoring supports exact/numeric/algebraic answers only; no AI/free-text proof marking.
- Lesson audit warnings remain content-quality warnings, not deploy blockers unless failures appear.
