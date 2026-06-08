ALTER TABLE worksheets
  ADD COLUMN IF NOT EXISTS assigned_student_name text,
  ADD COLUMN IF NOT EXISTS assigned_student_email text,
  ADD COLUMN IF NOT EXISTS due_at timestamptz,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

