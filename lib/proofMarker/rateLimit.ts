/**
 * Best-effort per-user rate limiter for the AI proof-marker endpoint.
 *
 * In-memory and per-instance (resets on cold start, not shared across instances),
 * so it's a cost/abuse guardrail rather than a hard quota. Combined with auth and
 * the feature flag it is adequate for the MVP. For a strict cap, back this with
 * Supabase or a KV store.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 40; // per user per window

const hits = new Map<string, number[]>();

export function allowProofMarkRequest(userId: string): boolean {
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
