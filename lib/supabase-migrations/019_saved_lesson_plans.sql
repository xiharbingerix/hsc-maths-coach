-- Persisted admin lesson plans. Created via the Lesson Maker UI.
-- All access is through supabaseAdmin (service role), which bypasses RLS entirely.
-- No policies are granted to anon or authenticated roles.

CREATE TABLE IF NOT EXISTS saved_lesson_plans (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  title          text        NOT NULL,
  course_slug    text        NOT NULL,
  unit_slug      text        NOT NULL,
  lesson_slug    text        NOT NULL,
  lesson_length  integer     NOT NULL,
  student_level  text        NOT NULL,
  plan           jsonb       NOT NULL,
  notes          text
);

CREATE INDEX IF NOT EXISTS saved_lesson_plans_created_at_idx
  ON saved_lesson_plans (created_at DESC);

ALTER TABLE saved_lesson_plans ENABLE ROW LEVEL SECURITY;
