CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug text NOT NULL,
  unit_slug text NOT NULL,
  lesson_slug text NOT NULL,
  passed boolean NOT NULL DEFAULT false,
  last_score numeric,
  completed_stages text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug, unit_slug, lesson_slug)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress"
  ON lesson_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS lesson_progress_user_course_idx
  ON lesson_progress (user_id, course_slug);
