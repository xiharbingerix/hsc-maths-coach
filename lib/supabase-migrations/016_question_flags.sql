-- Student-submitted flags on worksheet questions. Inserted server-side via
-- the /api/worksheet/[token]/flag route after a student answers a question.
-- No login is required to submit a flag; the token validates the worksheet.

CREATE TABLE IF NOT EXISTS question_flags (
  id                       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id              uuid        REFERENCES questions(id) ON DELETE SET NULL,
  source_id                text,
  worksheet_token          text,
  attempt_id               uuid        REFERENCES worksheet_attempts(id) ON DELETE SET NULL,
  prompt_snapshot          text,
  expected_answer_snapshot text,
  student_answer           text,
  marked_correct           boolean,
  reason                   text        NOT NULL,
  comment                  text,
  user_id                  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  status                   text        NOT NULL DEFAULT 'open',
  created_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS question_flags_status_idx
  ON question_flags (status);

CREATE INDEX IF NOT EXISTS question_flags_created_at_idx
  ON question_flags (created_at DESC);

CREATE INDEX IF NOT EXISTS question_flags_question_id_idx
  ON question_flags (question_id);

ALTER TABLE question_flags ENABLE ROW LEVEL SECURITY;

-- Anonymous and authenticated users can insert via the API route, which
-- validates the worksheet token before allowing the insert.
CREATE POLICY "anon_insert_question_flags"
  ON question_flags
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT policy for non-admin roles — flags are read via admin routes only.
-- Service role (used by all admin server components and routes) bypasses RLS.
