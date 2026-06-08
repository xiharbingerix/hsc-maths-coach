-- mastery_events: one row per question answered by a logged-in student
CREATE TABLE IF NOT EXISTS mastery_events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id),
  source_type text        NOT NULL CHECK (source_type IN ('diagnostic','lesson','quiz','worksheet')),
  source_id   uuid,
  question_id uuid,
  course_slug text        NOT NULL,
  topic_slug  text        NOT NULL,
  subtopic_slug text,
  difficulty  smallint    NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  is_correct  boolean     NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- student_mastery: current mastery score per (user, course, topic)
CREATE TABLE IF NOT EXISTS student_mastery (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id),
  course_slug   text        NOT NULL,
  topic_slug    text        NOT NULL,
  mastery_score smallint    NOT NULL DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 100),
  attempt_count integer     NOT NULL DEFAULT 0,
  correct_count integer     NOT NULL DEFAULT 0,
  last_updated  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug, topic_slug)
);

CREATE INDEX IF NOT EXISTS mastery_events_user_id_idx
  ON mastery_events (user_id);

CREATE INDEX IF NOT EXISTS mastery_events_user_course_topic_idx
  ON mastery_events (user_id, course_slug, topic_slug);

CREATE INDEX IF NOT EXISTS student_mastery_user_id_idx
  ON student_mastery (user_id);

CREATE INDEX IF NOT EXISTS student_mastery_user_course_idx
  ON student_mastery (user_id, course_slug);

ALTER TABLE mastery_events  ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_mastery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own mastery events"  ON mastery_events;
CREATE POLICY "Users can read own mastery events"
  ON mastery_events FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can read own mastery" ON student_mastery;
CREATE POLICY "Users can read own mastery"
  ON student_mastery FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- No direct INSERT/UPDATE/DELETE policies — all writes go through the
-- service-role API routes only.
