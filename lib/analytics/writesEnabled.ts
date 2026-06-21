/**
 * Single source of truth for whether analytics events should be written to the
 * database.
 *
 * Local `next dev` runs use the production Supabase keys from `.env.local`, so
 * without this guard every page view fired while developing (including AI/agent
 * sessions) lands in the production `analytics_events` table and pollutes the
 * dashboard as fake "anonymous visitors".
 *
 * Rule: only record in a real production runtime. Next.js sets
 * NODE_ENV="production" for `next start`/production builds and "development" for
 * `next dev`. An explicit `ANALYTICS_FORCE_WRITE=1` escape hatch lets you record
 * from a local run when you genuinely need to test the pipeline end to end.
 */
export function analyticsWritesEnabled(): boolean {
  if (process.env.ANALYTICS_FORCE_WRITE === "1") return true;
  return process.env.NODE_ENV === "production";
}
