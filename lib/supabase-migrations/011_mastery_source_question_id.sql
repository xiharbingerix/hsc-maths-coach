-- Add a stable lesson-question identifier to mastery_events so that
-- lesson quiz submissions can be deduplicated and per-question analytics
-- can link back to the original lesson question ID.
--
-- source_question_id is intentionally nullable: worksheet and diagnostic
-- events do not have a meaningful question identity outside of the UUID
-- already stored in question_id. Existing rows are unaffected.

ALTER TABLE mastery_events
  ADD COLUMN IF NOT EXISTS source_question_id text;

-- Partial unique index: only enforces uniqueness when source_question_id
-- is present. NULL rows (worksheets, diagnostics) are excluded and can
-- continue to accumulate without constraint. Repeated POSTs for the same
-- lesson quiz attempt with the same question ID will be silently ignored
-- at the application layer (pre-check) backed by this index.
CREATE UNIQUE INDEX IF NOT EXISTS mastery_events_idempotency_idx
  ON mastery_events (user_id, source_type, source_id, source_question_id)
  WHERE source_question_id IS NOT NULL;
