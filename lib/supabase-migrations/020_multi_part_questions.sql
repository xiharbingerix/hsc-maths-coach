ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS question_parts jsonb;

COMMENT ON COLUMN questions.question_parts IS
  'Optional structured parts for HSC-style multi-part questions. Each item carries key, label, prompt, marks, answer, acceptedAnswers, explanation, and optional latex/working.';

ALTER TABLE worksheet_answers
  ADD COLUMN IF NOT EXISTS answer_payload jsonb,
  ADD COLUMN IF NOT EXISTS part_results jsonb;

COMMENT ON COLUMN worksheet_answers.answer_payload IS
  'Optional structured student answer payload, used for multi-part question answers.';

COMMENT ON COLUMN worksheet_answers.part_results IS
  'Optional per-part marking result payload for multi-part worksheet questions.';
