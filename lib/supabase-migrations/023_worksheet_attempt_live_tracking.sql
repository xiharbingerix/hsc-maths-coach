ALTER TABLE worksheet_attempts
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz,
  ADD COLUMN IF NOT EXISTS live_question_id uuid REFERENCES questions(id),
  ADD COLUMN IF NOT EXISTS live_question_index smallint,
  ADD COLUMN IF NOT EXISTS live_phase text;

CREATE INDEX IF NOT EXISTS worksheet_attempts_worksheet_last_seen_idx
  ON worksheet_attempts (worksheet_id, last_seen_at DESC);
