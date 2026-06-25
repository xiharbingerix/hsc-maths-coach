-- Store acquisition attribution at signup time so admin can see which channel produced each user.
alter table profiles add column if not exists utm_source text;
alter table profiles add column if not exists utm_medium text;
alter table profiles add column if not exists utm_campaign text;
alter table profiles add column if not exists utm_gclid text;
