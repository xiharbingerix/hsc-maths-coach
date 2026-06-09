# Nova Maths — Product Roadmap

_Last updated: June 2026_

---

## 1. Current Product State

Nova Maths is a structured online maths learning platform for NSW students in Years 7–12. Students follow explicit lesson pathways (watch → learn → guided practice → independent practice → mastery quiz), earn a mastery score per topic, and receive adaptive revision worksheets based on their weakest areas.

**Live and working:**
- Year 9, 10, 11 (Advanced, Standard, Extension), 12 (Advanced, Standard 2, Extension 1) lesson pathways
- Lesson progress and mastery quiz tracking (per-lesson, per-topic)
- Spaced revision queue on the student dashboard
- Adaptive revision worksheet generation (AI-seeded question bank)
- Diagnostic quiz for all year levels — seeds study plan and mastery
- 7-day free trial via Stripe subscription
- Admin workspace: student detail, worksheet assignment, tutor notes, analytics dashboard

**Pricing:** $19/month after a 7-day free trial.

---

## 2. Active Infrastructure

### Analytics
- `analytics_events` table — funnel and learning events with `user_id`/`anonymous_id`
- Client helper (`clientTrackEvent`) and server helper (`trackEvent`)
- `/api/analytics/event` POST endpoint (anonymous + authenticated)
- `/admin/analytics` dashboard: unique identities, funnel rates, health alerts, period summary, CSV export
- Events tracked: `homepage_viewed`, `hsc_maths_viewed`, `trial_cta_clicked`, `diagnostic_started/completed`, `checkout_started/form_submitted/redirected_to_stripe`, `trial_started`, `signup_completed`, `lesson_mastery_submitted/passed`, `worksheet_completed`, `adaptive_worksheet_generated`, `free_lesson_viewed`, `sample_lesson_viewed`
- Delivery: `keepalive: true` fetch for navigation-critical events, `sendBeacon` fallback

### Mastery
- `mastery_events` table — per-question events with `source_type`, `source_id`, `source_question_id` (idempotency)
- `student_mastery` table — EMA-scored mastery per `(user_id, course_slug, topic_slug)`
- `student_mastery_history` table — snapshot history for trend tracking
- Mastery seeded from: diagnostic completion, lesson mastery quiz, worksheet completion
- Spaced revision queue logic on dashboard (14-day / 21-day thresholds)
- Partial unique index on `mastery_events` for lesson/diagnostic deduplication

### Worksheets
- Admin worksheet generator (AI-generated, question bank backed)
- Adaptive revision worksheet (student-triggered, weakest-topics-first)
- Student worksheet flow: start → answer → complete → score saved
- Assigned worksheets visible on student dashboard via RLS on `assigned_student_email`
- Worksheet preview and replace flow for admin review before publishing

### Tutor Workspace
- `/admin/students` — searchable student list
- `/admin/students/[id]` — student detail: mastery trend, study plan, activity timeline, worksheet history, diagnostic history, tutor notes
- Tutor notes: `student_notes` table, admin-only RLS, server action, graceful migration fallback
- `/admin/worksheets` — worksheet list and management
- `/admin/worksheets/new` — worksheet generator with student prefill
- `/admin/analytics` — funnel analytics with health alerts and CSV export

---

## 3. Curriculum Backlog

### Split Year 9 into Core and Advanced
- Current: single Year 9 Mathematics pathway
- Split into: Year 9 Core (foundation/Stage 5.1) and Year 9 Advanced (Stage 5.2/5.3)
- Requires new course slugs, lesson splits, and diagnostic variants

### Split Year 10 into Core and Advanced
- Same split pattern as Year 9
- Year 10 Core (Stage 5.2 foundation) and Year 10 Advanced (Stage 5.3)

### Add Full Year 8 Course
- 8 units covering Stage 4: algebra, fractions, geometry, statistics, measurement, probability, ratios, linear equations
- Requires lesson content creation and question bank seeding

### Add Full Year 7 Course
- 8 units covering Stage 4 entry: integers, fractions, geometry, measurement, ratios, basic algebra, data, probability
- Free Year 7 Algebra lesson already exists as a marketing entry point
- Full course would be the paid version

---

## 4. Conversion Backlog

### Testimonials
- Add student/parent testimonials to `/hsc-maths`, `/online-learning`, and the homepage
- Requires outreach to early trial students and a testimonial display component

### Onboarding Polish
- Improve post-trial-start flow:
  - Auto-redirect to diagnostic on first dashboard load
  - Animated onboarding checklist progress indicator
  - "What to do next" explainer card for zero-progress students
- Payment success page already improved (removed confusing "Log in" button)

### Trial-to-Paid Tracking
- Currently: `trial_started` and `checkout_started` events are tracked
- Missing: explicit `subscription_activated` event distinct from `trial_started`
- Add cohort analysis to `/admin/analytics` to compare trial start → paid conversion by week
- Stripe webhook already activates `user_access`; add analytics event there

---

## 5. Tutor Workspace Backlog

### Notes (shipped)
- ✅ Tutor notes on student profiles (`student_notes` table, admin-only)
- Future: edit/delete notes, note categories or tags

### Activity Timeline (shipped)
- ✅ Activity timeline on `/admin/students/[id]` showing diagnostics, worksheets, mastery events, access changes
- Future: filter by event type, date range selector

### Assigned Worksheets (shipped)
- ✅ Worksheet assignment via `assigned_student_email` / `assigned_to_user`
- Future: bulk assignment, assignment templates, due-date reminders

### Parent Communication
- Later scope: parent-facing progress email (weekly/monthly digest)
- Requires parent email capture (partially done via `parent_email` in profiles)
- Send via Resend API (already integrated for purchase prompts)

---

## 6. Adaptive Learning Backlog

### Mastery History (shipped)
- ✅ `student_mastery_history` snapshots on every mastery event
- ✅ Trend chart data available on admin student detail page
- Future: expose mastery trend to student on dashboard

### Spaced Revision (shipped)
- ✅ Revision queue on student dashboard (14-day / 21-day thresholds)
- Future: configurable thresholds per topic difficulty, student-controlled snooze

### Adaptive Worksheets (shipped)
- ✅ Adaptive worksheet generation from weakest mastery topics
- ✅ Daily-stable question shuffle (prevents same questions every day)
- Future: difficulty progression across attempts, mixed-topic worksheets

### Subtopic-Level Recommendations
- Currently: mastery is tracked at topic (unit) level
- `subtopic_slug` column exists in `mastery_events` (populated from `lesson_slug`)
- Future: surface subtopic-level weaknesses in study plan and worksheet selection
- Requires subtopic-level question bank tagging

---

## 7. Technical Debt

### Migration Order
- Migrations 001–014 must be applied in order before deploying code that reads those tables
- Current deployment checklist: `docs/DEPLOYMENT-CHECKLIST.md`
- Risk: `013_mastery_history.sql` and `014_student_notes.sql` are not yet applied in production — both have graceful fallbacks in the app code

### Analytics Retention
- `analytics_events` has no retention/archival policy
- At current volume, no action needed for 12+ months
- When volume grows: add a Postgres cron job or Supabase scheduled function to archive events older than 90 days to a cold table

### Question Quality Audits
- `npm run audit:lessons` runs a static audit of lesson content (currently 171 warnings, 0 failures)
- No automated audit for question bank rows in Supabase
- Backlog: build admin question bank review UI, flag low-attempt / low-pass-rate questions

### Question-Bank Seeding
- `npm run seed:question-bank` seeds from lesson content
- Some question bank gaps remain for newer year levels (Year 9, Year 10, Year 11 Advanced post-split)
- Seeding is idempotent but requires manual re-run after adding new lesson content
- Future: CI hook to warn when new lesson content exists but has not been seeded
