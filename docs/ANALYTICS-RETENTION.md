# Analytics Retention Plan

This note documents how Nova Maths should manage `analytics_events` so the table stays useful without growing forever.

## Current Schema Summary

`analytics_events` stores internal product and funnel events.

Expected columns:

- `id`: unique event id
- `user_id`: authenticated user id when available
- `anonymous_id`: browser/device identifier for logged-out journeys
- `event_name`: event key, such as `homepage_viewed`, `trial_cta_clicked`, or `lesson_mastery_submitted`
- `page`: page path where the event happened, when available
- `metadata`: JSON event details, such as CTA source, offer, href, lesson slug, or score
- `created_at`: event timestamp

Admin analytics currently reads raw events for recent funnel, learning activity, and CTA-source views.

## Expected Growth

These are rough planning estimates. Actual size depends on metadata payload size and repeat page views.

| Traffic level | Approx events/day | Approx events/year |
| --- | ---: | ---: |
| Low traffic | 100-500 | 36k-183k |
| Moderate traffic | 1k-5k | 365k-1.8m |
| High traffic | 10k-50k | 3.6m-18m |

At low and moderate traffic, keeping raw events for 12 months should be manageable. At high traffic, aggregate tables become more important.

## Suggested Retention

- Keep raw `analytics_events` for 12 months.
- Use raw events for debugging, attribution checks, and recent admin dashboards.
- Later, add aggregate summary tables for long-term reporting before deleting older raw events.

Recommended first policy:

```sql
DELETE FROM analytics_events
WHERE created_at < now() - interval '12 months';
```

Do not run this automatically until Joshua is comfortable losing raw event-level history older than 12 months.

## Future Aggregate Tables

Add these before aggressive cleanup if long-term trends matter.

### `daily_event_counts`

Suggested shape:

```sql
CREATE TABLE daily_event_counts (
  event_date date NOT NULL,
  event_name text NOT NULL,
  total_count integer NOT NULL,
  unique_identity_count integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_date, event_name)
);
```

### `daily_funnel_counts`

Suggested shape:

```sql
CREATE TABLE daily_funnel_counts (
  event_date date PRIMARY KEY,
  homepage_viewed integer NOT NULL DEFAULT 0,
  hsc_maths_viewed integer NOT NULL DEFAULT 0,
  trial_cta_clicked integer NOT NULL DEFAULT 0,
  checkout_started integer NOT NULL DEFAULT 0,
  checkout_form_submitted integer NOT NULL DEFAULT 0,
  checkout_redirected_to_stripe integer NOT NULL DEFAULT 0,
  trial_started integer NOT NULL DEFAULT 0,
  unique_homepage_viewed integer NOT NULL DEFAULT 0,
  unique_hsc_maths_viewed integer NOT NULL DEFAULT 0,
  unique_trial_cta_clicked integer NOT NULL DEFAULT 0,
  unique_checkout_started integer NOT NULL DEFAULT 0,
  unique_trial_started integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

## Risks

- Deleting raw events too early can remove evidence needed to debug conversion drops.
- Anonymous journeys may be lost if only logged-in user data is aggregated.
- Repeated page views can overstate intent unless reports distinguish total events from unique identities.
- CTA source names may fragment if `metadata.source` is not populated consistently.
- Cleanup should not run until aggregate reporting exists or raw history older than 12 months is no longer needed.

## Manual Cleanup Instructions

1. Open Supabase.
2. Go to SQL Editor.
3. Run a count first:

```sql
SELECT count(*) AS events_to_delete
FROM analytics_events
WHERE created_at < now() - interval '12 months';
```

4. If the count looks safe, run:

```sql
DELETE FROM analytics_events
WHERE created_at < now() - interval '12 months';
```

5. Recheck recent admin analytics after cleanup.

## Scheduled Cleanup Option

If Supabase scheduled jobs are available later, create a monthly job that runs the 12-month cleanup SQL.

Suggested cadence:

- Run once per month.
- Run after aggregate tables have been updated.
- Alert/log the deleted row count.

Until then, use manual cleanup only.
