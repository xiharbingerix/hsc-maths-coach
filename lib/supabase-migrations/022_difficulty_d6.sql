-- Allow difficulty level 6 (the D6 / synoptic exam tier) in the question bank
-- and mastery tracking. Both columns were previously capped at 5, which forced
-- Level-6 challenge, multi-part and exam questions to be stored as 5.
--
-- Apply in the Supabase SQL editor before re-seeding the question bank with D6
-- content.

alter table questions
  drop constraint if exists questions_difficulty_check;
alter table questions
  add constraint questions_difficulty_check check (difficulty between 1 and 6);

alter table student_mastery
  drop constraint if exists student_mastery_difficulty_check;
alter table student_mastery
  add constraint student_mastery_difficulty_check check (difficulty between 1 and 6);
