CREATE TABLE IF NOT EXISTS student_subtopic_mastery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  course_slug text NOT NULL,
  topic_slug text NOT NULL,
  subtopic_slug text NOT NULL,
  mastery_score smallint NOT NULL DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 100),
  attempt_count integer NOT NULL DEFAULT 0,
  correct_count integer NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug, topic_slug, subtopic_slug)
);

CREATE INDEX IF NOT EXISTS student_subtopic_mastery_user_id_idx
  ON student_subtopic_mastery (user_id);

CREATE INDEX IF NOT EXISTS student_subtopic_mastery_user_course_topic_idx
  ON student_subtopic_mastery (user_id, course_slug, topic_slug);

CREATE INDEX IF NOT EXISTS student_subtopic_mastery_user_course_topic_subtopic_idx
  ON student_subtopic_mastery (user_id, course_slug, topic_slug, subtopic_slug);

ALTER TABLE student_subtopic_mastery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subtopic mastery" ON student_subtopic_mastery;
CREATE POLICY "Users can read own subtopic mastery"
  ON student_subtopic_mastery FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- No direct INSERT/UPDATE/DELETE policies. Writes go through service-role API routes.
