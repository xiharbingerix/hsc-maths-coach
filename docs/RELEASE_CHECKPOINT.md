# Nova Maths Release Checkpoint

Checkpoint date: 2026-06-13

This checkpoint summarises the current production release state. Use `docs/PRODUCTION_DEPLOY_RUNBOOK.md` as the operational deploy and smoke-test procedure.

## 1. Release scope

The current release includes:

- Stripe-first checkout and post-payment dashboard flow.
- Ads funnel analytics for CTA, checkout, trial, and conversion tracking.
- First-session onboarding.
- Year 9 and Year 10 Core/Advanced split pathways.
- Year 12 Standard 1 fixes and diagnostic coverage for active units.
- Year 12 Extension 1 content and nested course routes.
- Year 12 Extension 2 scaffold marked as not available for real study yet.
- Lesson Maker generation, saved plans, print/clipboard export, and worksheet handoff.
- Worksheet subtopic control: auto weakest mode and manual subtopic selection.
- Multi-part questions.
- Marks-weighted multi-part worksheet scoring.

## 2. Required checks before deploy

Run from `C:\Users\joshu\hsc-maths-coach`:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run audit:lessons
npx.cmd tsx scripts/seed-question-bank.ts --course all --dry-run
npx.cmd tsx scripts/predeploy-check.ts
git diff --check
git status --short
```

Deploy is blocked by any TypeScript error, build failure, lesson audit failure, seed dry-run warning that affects release courses, missing production env, missing migration, or unintended dirty working-tree change.

## 3. Production env blockers

Vercel Production must have:

| Env var | Required shape |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret/JWT |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |

Known blocker: a local Stripe secret has previously been invalid with an `mk_` prefix. Production must be checked directly in Vercel before ads or checkout smoke.

## 4. Migrations required

Apply in order before production reseed:

| # | File | Required for |
|---|---|---|
| 012 | `012_analytics_events.sql` | Ads and product analytics event store |
| 013 | `013_mastery_history.sql` | Mastery history |
| 014 | `014_student_notes.sql` | Tutor notes |
| 015 | `015_student_subtopic_mastery.sql` | Daily review and adaptive/manual worksheet subtopic logic |
| 016 | `016_question_flags.sql` | Question flag workflow |
| 017 | `017_selected_course_slug.sql` | Persisted course selection |
| 018 | `018_question_flags_review_trace.sql` | Question flag review trace |
| 019 | `019_saved_lesson_plans.sql` | Lesson Maker saved plans |
| 020 | `020_multi_part_questions.sql` | Multi-part question parts and worksheet answer storage |

Migration 020 is required for `questions.question_parts`, `worksheet_answers.answer_payload`, and `worksheet_answers.part_results`.

## 5. Question bank reseed

Run after migrations and deploy:

```powershell
npx.cmd tsx scripts/seed-question-bank.ts --course all --dry-run
npx.cmd tsx scripts/seed-question-bank.ts --course all
```

Targeted dry-runs worth checking:

```powershell
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-advanced --dry-run
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-extension-1 --dry-run
npx.cmd tsx scripts/seed-question-bank.ts --course year-12-extension-2 --dry-run
```

Expected:

- Year 12 Advanced includes `tan-norm-mp-1`, `tan-norm-mp-2`, and `tan-norm-mp-3`.
- Extension 1 prepares real questions.
- Extension 2 prepares 0 questions until real lessons exist.

## 6. Post-deploy smoke summary

Use headed Chrome and pause for Joshua sign-in where required.

- HSC CTA opens Stripe checkout.
- Stripe success returns to dashboard with access active.
- Active paid user is guarded away from checkout.
- Dashboard onboarding, course selection, Continue Learning, Daily Review, and Band Predictor do not crash.
- Year 12 Advanced nested route works:
  `/course/year-12-advanced/differential-calculus/tangents-and-normals`
- Year 12 Extension 1 nested route works:
  `/course/year-12-extension-1/proof-induction/intro-to-mathematical-induction`
- Year 12 Extension 2 course page shows honest scaffold state.
- Worksheet generator works in auto weakest mode.
- Worksheet generator works with manual Year 12 Advanced subtopic selection.
- Multi-part worksheet scoring shows partial credit, per-part marks, explanations, and final marks total.
- Lesson Maker can generate, save, reload, and hand off to worksheet creation.
- Admin analytics ads funnel renders and shows expected events.

Recent disposable local/dev worksheet smoke token:

```text
/worksheet/7d22a574-41c6-48c0-9189-858c0b87f887
```

Do not treat that token as production evidence.

## 7. Things not to scale yet

Do not scale ads until:

1. Vercel Stripe env is confirmed live-mode: `sk_live_`, `pk_live_`, `whsec_`.
2. Migrations 012-020 are applied.
3. Question bank reseed has completed after deploy.
4. Checkout, payment success, dashboard activation, and analytics funnel smoke pass.
5. Worksheet and Lesson Maker smoke pass.

## 8. Known risks

| Risk | Severity | Notes |
|---|---|---|
| Attempt-level worksheet score columns store question-count score | Medium | Marks totals are computed from answer rows for multi-part summaries |
| Mastery partial weighting is not implemented | Medium | Multi-part partial credit does not yet feed weighted mastery |
| Extension 2 scaffold only | Medium | Must remain coming-soon/in-progress until real lessons and diagnostics exist |
| Multi-part auto-marking is exact/numeric/algebraic only | Medium | No AI/free-text proof marking yet |
| Extension 1 HSC prep incomplete | Low | Course content exists, but timed exam/past-paper workflow is not complete |
| Audit warnings remain | Low | Current audit warnings are content-quality warnings unless failures appear |

## 9. Reference docs

- `docs/PRODUCTION_DEPLOY_RUNBOOK.md`
- `docs/CONTENT_AUTHENTICITY_AUDIT.md`
- `docs/YEAR12_EXTENSION1_HSC_STATUS.md`
- `docs/YEAR12_EXTENSION2_HSC_STATUS.md`
- `docs/YEAR12_STANDARD1_COURSE_STATUS.md`
- `docs/QUESTION_AUTHORING_STANDARD.md`
- `docs/PRACTICE_QUESTION_STANDARD.md`
