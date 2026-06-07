CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id text UNIQUE,
  topic_slug text NOT NULL,
  subtopic_slug text NOT NULL,
  year_level text NOT NULL,
  course_slug text NOT NULL,
  difficulty smallint NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  question_type text NOT NULL DEFAULT 'procedural',
  prompt text NOT NULL,
  latex text,
  choices jsonb,
  answer text NOT NULL,
  accepted_answers text[] NOT NULL DEFAULT '{}',
  hint text,
  explanation text NOT NULL,
  syllabus_ref text,
  transfer_from_topics text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS worksheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES auth.users(id),
  title text NOT NULL,
  year_level text NOT NULL,
  topic_config jsonb NOT NULL,
  share_token text NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  assigned_to_user uuid REFERENCES auth.users(id),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS worksheet_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worksheet_id uuid NOT NULL REFERENCES worksheets(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id),
  position smallint NOT NULL,
  UNIQUE (worksheet_id, position)
);

CREATE TABLE IF NOT EXISTS worksheet_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worksheet_id uuid NOT NULL REFERENCES worksheets(id),
  user_id uuid REFERENCES auth.users(id),
  share_token text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  score_correct smallint,
  score_total smallint
);

CREATE TABLE IF NOT EXISTS worksheet_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES worksheet_attempts(id) ON DELETE CASCADE,
  worksheet_id uuid NOT NULL REFERENCES worksheets(id),
  question_id uuid NOT NULL REFERENCES questions(id),
  student_answer text,
  is_correct boolean,
  time_spent_secs smallint,
  answered_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS questions_course_topic_difficulty_active_idx
  ON questions (course_slug, topic_slug, difficulty, is_active);

CREATE INDEX IF NOT EXISTS questions_source_id_idx
  ON questions (source_id);

CREATE INDEX IF NOT EXISTS worksheet_questions_worksheet_id_idx
  ON worksheet_questions (worksheet_id);

CREATE INDEX IF NOT EXISTS worksheet_attempts_worksheet_id_idx
  ON worksheet_attempts (worksheet_id);

CREATE INDEX IF NOT EXISTS worksheet_answers_attempt_id_idx
  ON worksheet_answers (attempt_id);

CREATE INDEX IF NOT EXISTS worksheet_answers_worksheet_id_idx
  ON worksheet_answers (worksheet_id);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read active questions" ON questions;
CREATE POLICY "Authenticated users can read active questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Worksheet creators can read own worksheets" ON worksheets;
CREATE POLICY "Worksheet creators can read own worksheets"
  ON worksheets
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid() OR assigned_to_user = auth.uid());

DROP POLICY IF EXISTS "Worksheet creators can read own worksheet questions" ON worksheet_questions;
CREATE POLICY "Worksheet creators can read own worksheet questions"
  ON worksheet_questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM worksheets
      WHERE worksheets.id = worksheet_questions.worksheet_id
        AND (
          worksheets.created_by = auth.uid()
          OR worksheets.assigned_to_user = auth.uid()
        )
    )
  );

DROP POLICY IF EXISTS "Users can read own worksheet attempts" ON worksheet_attempts;
CREATE POLICY "Users can read own worksheet attempts"
  ON worksheet_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can read own worksheet answers" ON worksheet_answers;
CREATE POLICY "Users can read own worksheet answers"
  ON worksheet_answers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM worksheet_attempts
      WHERE worksheet_attempts.id = worksheet_answers.attempt_id
        AND worksheet_attempts.user_id = auth.uid()
    )
  );

-- No direct anon/authenticated INSERT, UPDATE or DELETE policies are created.
-- MVP worksheet creation, question seeding and answer saving should use
-- server-side API routes with the Supabase service role key.
