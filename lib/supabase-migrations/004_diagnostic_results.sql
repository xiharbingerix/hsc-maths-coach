CREATE TABLE IF NOT EXISTS diagnostic_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  year_level text NOT NULL,
  unit_results jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own diagnostic results"
  ON diagnostic_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can read their own diagnostic results"
  ON diagnostic_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS diagnostic_results_user_idx
  ON diagnostic_results (user_id, created_at DESC);
