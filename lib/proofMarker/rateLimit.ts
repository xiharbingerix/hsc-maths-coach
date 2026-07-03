/**
 * Best-effort per-user rate limiter for the AI proof-marker endpoint.
 *
 * In-memory and per-instance (resets on cold start, not shared across instances),
 * so it's a cost/abuse guardrail rather than a hard quota. Combined with auth and
 * the feature flag it is adequate for the MVP. For a strict cap, back this with
 * Supabase or a KV store.
 */
function readPositiveInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const WINDOW_MS =
  readPositiveInt("PROOF_MARKER_WINDOW_MS", 10 * 60 * 1000);
const MAX_REQUESTS =
  readPositiveInt("PROOF_MARKER_MAX_REQUESTS", 40);

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

export function resetProofMarkRateLimitForTests() {
  hits.clear();
}
