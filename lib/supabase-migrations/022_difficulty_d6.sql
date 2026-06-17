-- Allow difficulty level 6 (the D6 / synoptic exam tier) in the question bank.
-- The difficulty column was previously capped at 5, which forced Level-6
-- challenge, multi-part and exam questions to be stored as 5.
--
-- Apply in the Supabase SQL editor before re-seeding the question bank with D6
-- content. Only the `questions` table needs this — worksheet difficulty lives
-- there; lesson mastery only ever uses the 1–5 mastery quiz.

alter table questions
  drop constraint if exists questions_difficulty_check;
alter table questions
  add constraint questions_difficulty_check check (difficulty between 1 and 6);
