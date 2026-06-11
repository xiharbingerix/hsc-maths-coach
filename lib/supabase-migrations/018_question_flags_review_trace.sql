-- Add review traceability columns to question_flags.
-- reviewed_at: when an admin marked the flag reviewed or dismissed.
-- reviewed_by: which auth.users row took the action (null until admin auth is per-user).

ALTER TABLE question_flags
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid NULL REFERENCES auth.users(id);
