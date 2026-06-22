-- Live "mirror" support: store the student's in-progress (unsubmitted) answer
-- state so the teacher can watch a faithful reconstruction of their worksheet
-- view in near real time, without screen sharing.
--
-- live_draft shape (jsonb):
--   { "typed": string, "choice": string, "parts": { [key]: string } }
ALTER TABLE worksheet_attempts
  ADD COLUMN IF NOT EXISTS live_draft jsonb;
