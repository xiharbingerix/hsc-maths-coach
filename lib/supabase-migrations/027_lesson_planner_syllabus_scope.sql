-- Store the exact official NESA content selection used to generate a plan,
-- and give each distinct selection its own cached default.

ALTER TABLE saved_lesson_plans
  ADD COLUMN IF NOT EXISTS syllabus_scope jsonb;

ALTER TABLE ai_lesson_plans
  ADD COLUMN IF NOT EXISTS syllabus_scope jsonb;

ALTER TABLE ai_lesson_plans
  ADD COLUMN IF NOT EXISTS syllabus_scope_key text NOT NULL DEFAULT 'default';

DO $$
DECLARE
  old_constraint text;
BEGIN
  SELECT conname
  INTO old_constraint
  FROM pg_constraint
  WHERE conrelid = 'ai_lesson_plans'::regclass
    AND contype = 'u'
    AND pg_get_constraintdef(oid) LIKE '%delivery_mode%'
    AND pg_get_constraintdef(oid) NOT LIKE '%syllabus_scope_key%'
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
    delivery_mode,
    syllabus_scope_key
  );
