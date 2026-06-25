-- Allow difficulty 6 in mastery_events to match the questions table (migration 022).
-- Migration 022 only extended the check on `questions`; worksheet completions that
-- include D6 questions were failing the insert constraint on mastery_events.

alter table mastery_events
  drop constraint if exists mastery_events_difficulty_check;
alter table mastery_events
  add constraint mastery_events_difficulty_check check (difficulty between 1 and 6);
