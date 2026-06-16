-- Persists exam-readiness attempts so students can see band-over-time and the
-- weekly digest can summarise recent results.
--
-- Inserts are performed by the server (service role, bypasses RLS). Students may
-- read their own attempts.

create table if not exists exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exam_id text not null,
  course_slug text,
  marks_earned integer not null,
  marks_available integer not null,
  percentage integer not null,
  band text not null,
  topic_breakdown jsonb,
  created_at timestamptz not null default now()
);

alter table exam_attempts enable row level security;

drop policy if exists "Users can read own exam attempts" on exam_attempts;
create policy "Users can read own exam attempts"
  on exam_attempts for select
  using (auth.uid() = user_id);

create index if not exists exam_attempts_user_created_idx
  on exam_attempts (user_id, created_at desc);
