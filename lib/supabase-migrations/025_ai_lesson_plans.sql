-- AI-generated tutor lesson plan cache.
--
-- One row per (topic, length, level) combination. The lesson-maker generates a
-- plan with the Claude API on first request, stores it here, and serves the
-- cached row on every subsequent request so tokens are only spent once per
-- topic. Regeneration explicitly overwrites the row (upsert on the unique key).

CREATE TABLE IF NOT EXISTS ai_lesson_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  course_slug text NOT NULL,
  unit_slug text NOT NULL,
  lesson_slug text NOT NULL,
  lesson_length integer NOT NULL,
  student_level text NOT NULL,
  model text NOT NULL,
  plan jsonb NOT NULL,
  UNIQUE (course_slug, unit_slug, lesson_slug, lesson_length, student_level)
);

CREATE INDEX IF NOT EXISTS ai_lesson_plans_lookup_idx
  ON ai_lesson_plans (course_slug, unit_slug, lesson_slug);

-- Service-role-only access (same posture as saved_lesson_plans): RLS on, no
-- policies — only supabaseAdmin can touch it.
ALTER TABLE ai_lesson_plans ENABLE ROW LEVEL SECURITY;
