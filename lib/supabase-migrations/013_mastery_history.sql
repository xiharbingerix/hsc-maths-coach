CREATE TABLE IF NOT EXISTS student_mastery_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  course_slug text NOT NULL,
  topic_slug text NOT NULL,
  mastery_score smallint NOT NULL CHECK (mastery_score BETWEEN 0 AND 100),
  attempt_count integer NOT NULL,
  source_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS student_mastery_history_user_id_idx
  ON student_mastery_history (user_id);

CREATE INDEX IF NOT EXISTS student_mastery_history_user_course_topic_idx
  ON student_mastery_history (user_id, course_slug, topic_slug);

CREATE INDEX IF NOT EXISTS student_mastery_history_created_at_idx
  ON student_mastery_history (created_at);

ALTER TABLE student_mastery_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own mastery history" ON student_mastery_history;
CREATE POLICY "Users can read own mastery history"
  ON student_mastery_history FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- No direct INSERT/UPDATE/DELETE policies. Writes go through service-role API routes.
