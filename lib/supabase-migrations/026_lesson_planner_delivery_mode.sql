-- Allow lesson plans to be generated and saved separately for Zoom tutoring
-- and classroom teaching. Existing plans remain Zoom plans.

ALTER TABLE saved_lesson_plans
  ADD COLUMN IF NOT EXISTS delivery_mode text NOT NULL DEFAULT 'zoom';

ALTER TABLE ai_lesson_plans
  ADD COLUMN IF NOT EXISTS delivery_mode text NOT NULL DEFAULT 'zoom';

ALTER TABLE saved_lesson_plans
  DROP CONSTRAINT IF EXISTS saved_lesson_plans_delivery_mode_check;
ALTER TABLE saved_lesson_plans
  ADD CONSTRAINT saved_lesson_plans_delivery_mode_check
  CHECK (delivery_mode IN ('zoom', 'classroom'));

ALTER TABLE ai_lesson_plans
  DROP CONSTRAINT IF EXISTS ai_lesson_plans_delivery_mode_check;
ALTER TABLE ai_lesson_plans
  ADD CONSTRAINT ai_lesson_plans_delivery_mode_check
  CHECK (delivery_mode IN ('zoom', 'classroom'));

-- Drop the previous generated unique constraint regardless of the exact name
-- Postgres assigned to it, then include delivery mode in the cache identity.
DO $$
DECLARE
  old_constraint text;
BEGIN
  SELECT conname
  INTO old_constraint
  FROM pg_constraint
  WHERE conrelid = 'ai_lesson_plans'::regclass
    AND contype = 'u'
    AND pg_get_constraintdef(oid) LIKE '%student_level%'
    AND pg_get_constraintdef(oid) NOT LIKE '%delivery_mode%'
  LIMIT 1;

  IF old_constraint IS NOT NULL THEN
    EXECUTE format(
      'ALTER TABLE ai_lesson_plans DROP CONSTRAINT %I',
      old_constraint
    );
  END IF;
END $$;

ALTER TABLE ai_lesson_plans
  DROP CONSTRAINT IF EXISTS ai_lesson_plans_generation_key;
ALTER TABLE ai_lesson_plans
  ADD CONSTRAINT ai_lesson_plans_generation_key
  UNIQUE (
    course_slug,
    unit_slug,
    lesson_slug,
    lesson_length,
    student_level,
    delivery_mode
  );
