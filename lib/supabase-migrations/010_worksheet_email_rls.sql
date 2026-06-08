-- Allow students to read worksheets that were assigned to their email address.
-- auth.email() returns the verified email from the user's JWT.
DROP POLICY IF EXISTS "Students can read worksheets assigned to their email" ON worksheets;
CREATE POLICY "Students can read worksheets assigned to their email"
  ON worksheets
  FOR SELECT
  TO authenticated
  USING (
    assigned_student_email IS NOT NULL
    AND lower(assigned_student_email) = lower(auth.email())
  );
