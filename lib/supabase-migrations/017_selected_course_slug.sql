-- Add selected_course_slug to profiles so students can declare their year/course.
-- This drives Continue Learning and dashboard primary course for new students.
alter table profiles add column if not exists selected_course_slug text;
