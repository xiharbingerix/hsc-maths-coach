# Nova Maths — Release Checkpoint

_Checkpoint date: 2026-06-12_
_Branch: main | 1 commit ahead of origin/main_

---

## 1. What Has Landed (last ~30 commits)

### Ads & funnel
- Ads funnel analytics: gclid/UTM preservation, `trial_cta_clicked`, `checkout_started`, `trial_started`, Google Ads conversion on `/payment-success` → see `docs/ADS_FUNNEL_AUDIT.md`
- Active-user checkout guard: logged-in paying students are redirected to dashboard instead of re-entering checkout
- Post-payment dashboard flow: `/payment-success` → dashboard with access activation and first-session banner

### Student experience
- First-session onboarding banner on dashboard for new trial students
- Daily review queue on dashboard (weakest subtopics)
- Band predictor on dashboard (HSC Advanced/Standard)
- Progressive hint ladder in lesson practice questions
- Continue Learning deep-links to first active lesson per selected course

### Admin / tutor workspace
- Lesson Maker: plan generation, rich visual payloads, saved plans, clipboard/print export → `lib/supabase-migrations/019_saved_lesson_plans.sql`
- Lesson Maker → worksheet handoff: pre-fills course/topic/subtopic via query params
- Worksheet subtopic control: admin can manually select subtopics or leave blank for adaptive/weak-subtopic logic

### Curriculum
- **Year 8**: 10 units, 54 lessons, 1 026 seedable questions. All complete → `docs/YEAR8-COURSE-STATUS.md`
- **Year 9/10 Core/Advanced split**: four courses (`year-9-mathematics-core`, `year-9-mathematics-advanced`, `year-10-mathematics-core`, `year-10-mathematics-advanced`) with separate lessons and seeds
- **Year 12 Standard 1**: routes, diagnostic, 8 Standard-1-specific overrides, 2 scope-mismatched lessons rewritten June 2026 → `docs/YEAR12_STANDARD1_COURSE_STATUS.md`
- **Year 12 Extension 1**: all 6 units complete (22 lessons), routes active, 366 seedable questions (0 warnings) → `docs/YEAR12_EXTENSION1_HSC_STATUS.md`

---

## 2. Uncommitted / Untracked Files

The following files are **modified but not staged**:

| File | Reason |
|---|---|
| `app/course/NewCoursePages.tsx` | Worksheet subtopic control |
| `docs/YEAR12_EXTENSION1_HSC_STATUS.md` | Status field updated to `available` |
| `lib/diagnostics/year-12-standard-1.ts` | LaTeX escape fixes |
| `lib/lessons/year10/*.ts` (9 files) | Year 10 Core/Advanced split rewrites |
| `lib/lessons/year9/*.ts` (8 files) | Year 9 Core/Advanced split rewrites |
| `lib/lessons/year12Extension1/binomialDistribution.ts` | LaTeX and answer fixes |

Untracked:

| File | Reason |
|---|---|
| `docs/NEW_COURSE_QUALITY_AUDIT.md` | New audit doc — not committed |

**These must all be committed before deploy.**

---

## 3. Migrations Required

Run in the Supabase SQL editor in order. All are `IF NOT EXISTS` safe.

| # | File | Required for |
|---|---|---|
| 001–011 | Already in `docs/DEPLOYMENT-CHECKLIST.md` | Core mastery, worksheets, RLS |
| 012 | `012_analytics_events.sql` | Analytics event store |
| 013 | `013_mastery_history.sql` | Mastery history timeline |
| 014 | `014_student_notes.sql` | Student notes (tutor workspace) |
| 015 | `015_student_subtopic_mastery.sql` | Daily review queue, adaptive worksheet subtopic prioritisation |
| 016 | `016_question_flags.sql` | Question flag/review workflow |
| 017 | `017_selected_course_slug.sql` | Course selection persisted on profile |
| 018 | `018_question_flags_review_trace.sql` | Flag review traceability |
| 019 | `019_saved_lesson_plans.sql` | Lesson Maker saved plans |

**015 is the most critical new one**: the daily review queue, subtopic-aware worksheet generation, and student subtopic mastery all depend on the `student_subtopic_mastery` table.

---

## 4. Seeds / Imports Required

After migrations, seed the question bank for all courses:

```powershell
# Dry-run first
npx.cmd tsx scripts/seed-question-bank.ts --course all --dry-run

# Live seed
npx.cmd tsx scripts/seed-question-bank.ts --course all
```

New courses since last known-good seed:

| Course | Est. questions |
|---|---|
| `year-9-mathematics-core` | ~400 |
| `year-9-mathematics-advanced` | ~450 |
| `year-10-mathematics-core` | ~400 |
| `year-10-mathematics-advanced` | ~450 |
| `year-12-standard-1` | ~300 |
| `year-12-extension-1` | 366 |

---

## 5. QA Required Before Deploy

### Critical path (must pass)
- [ ] Checkout → Stripe → `/payment-success` → dashboard access granted
- [ ] Active-user guard: logged-in paying user visiting `/checkout` is redirected to dashboard
- [ ] Adaptive worksheet: generates from student's weakest subtopics (requires migration 015)
- [ ] Worksheet subtopic control: selecting manual subtopics restricts question pool; leaving blank uses adaptive logic
- [ ] Lesson Maker: generate plan, save, export to worksheet with topic/subtopic pre-filled
- [ ] Daily review queue on dashboard: shows questions from weak subtopics, not blank

### Regression checks
- [ ] Year 8 unit and lesson pages load
- [ ] Year 9/10 Core and Advanced landing pages, unit pages, lesson pages all load
- [ ] Standard 1 diagnostic completes and saves result
- [ ] Extension 1 unit and lesson pages load (proof-induction, vectors, inverse-trig, further-calculus, calculus-applications, binomial-distribution)
- [ ] Hint ladder appears on lesson practice questions
- [ ] Band predictor renders on dashboard for HSC Advanced/Standard students
- [ ] Admin question flag workflow: flag, review, approve/decline

---

## 6. Blockers Before Increasing Ads

**Do not scale ads spend until:**

1. **Stripe production key confirmed valid** — local `.env.local` has an `mk_` prefixed key which is invalid. Verify production `STRIPE_SECRET_KEY` in Vercel env is a live `sk_live_` key. See memory note: `project-stripe-key.md`.
2. **Migration 015 applied** — daily review queue and subtopic adaptive worksheet are broken without `student_subtopic_mastery` table.
3. **Migration 019 applied** — Lesson Maker "Save plan" will error without `saved_lesson_plans` table (admin-facing but a crash risk).
4. **All uncommitted files committed and deployed** — Year 10 and Year 9 lesson files are still modified/untracked.
5. **Question bank re-seeded** — new Year 9/10 Core/Advanced splits and Standard 1 are not in the database until seeded; adaptive worksheets will fail for students in those courses.

---

## 7. Known Risks

| Risk | Severity | Notes |
|---|---|---|
| Year 9/10 split — old `year-9-mathematics` and `year-10-mathematics` slugs still routable | Low | Original slugs remain in catalog as aliases; existing student mastery rows are unaffected |
| Standard 1 diagnostic only covers 3 of 5 planned units | Low | Documented as intentional; remaining units are in-progress |
| Extension 1 missing `further-trig` and `statistical-hypothesis-testing` units | Low | Documented in `docs/YEAR12_EXTENSION1_HSC_STATUS.md` §4; no student-visible gap until those slugs are added |
| Binomial distribution question counts lower than other Extension 1 units | Low | Fixed in last audit — 6 questions/lesson vs 19; not a crash risk |
| `audit:lessons` still reports 858 warnings | Low | All warnings are content-quality flags (not errors); audit PASS means no failures |
| Year 8 duplicate lesson slugs across units | Low | Documented in `docs/YEAR8-COURSE-STATUS.md`; no routing conflict in practice |
| Stripe trial email confirmation disabled | Medium | Needed to get students into onboarding faster; monitor for support requests about "no email received" |
| No multi-part question type | Low | Blocks HSC Extension exam simulation; not needed for current scope |

---

## 8. Validation (at checkpoint)

```
tsc --noEmit:   PASS (0 errors)
next build:     PASS (all routes compiled)
audit:lessons:  PASS (0 failures, 858 warnings)
seed dry-run (extension-1): 366 questions, 0 warnings
git diff --check: PASS (CRLF line-ending warnings only)
```

---

## 9. Deploy Order

1. Commit all staged/unstaged changes (`git add -A && git commit`)
2. Push to origin/main
3. Apply Supabase migrations 012–019 in order
4. Run environment variable check (`npm.cmd run check:env`)
5. Deploy to Vercel (auto-deploys on push, or trigger manually)
6. Run question bank seed for all courses
7. Smoke-test critical path (see §5)
8. Monitor Stripe webhook logs and `analytics_events` table for first 24 hours
