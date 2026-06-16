/**
 * Best-effort per-user rate limiter for the AI tutor endpoint.
 *
 * In-memory and therefore per-instance — on serverless it resets on cold start
 * and isn't shared across concurrent instances, so it's a cost guardrail, not a
 * hard quota. For a strict cap, back this with Supabase or a KV store. Combined
 * with auth + the feature flag, it's adequate for the MVP rollout.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30; // per user per window

const hits = new Map<string, number[]>();

export function allowTutorRequest(userId: string): boolean {
  const now = Date.now();
  const recent = (hits.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(userId, recent);
    return false;
  }
  recent.push(now);
  hits.set(userId, recent);
  return true;
}
