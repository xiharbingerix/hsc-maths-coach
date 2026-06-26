create or replace function distinct_question_courses()
returns table(course_slug text)
language sql
stable
as $$
  select distinct course_slug from questions order by course_slug;
$$;
