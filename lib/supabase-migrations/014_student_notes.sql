-- Private tutor notes on a student. Visible to admin only — not exposed
-- to students via any RLS policy or API route.

CREATE TABLE IF NOT EXISTS student_notes (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_user_id  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  student_email    text,
  note             text        NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS student_notes_student_user_id_idx
  ON student_notes (student_user_id);

CREATE INDEX IF NOT EXISTS student_notes_created_at_idx
  ON student_notes (created_at);

ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;

-- No SELECT policy for authenticated users — notes are admin-only.
-- Service role (used by all admin API routes and server actions) bypasses RLS.
