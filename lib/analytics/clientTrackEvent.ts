const ANON_ID_KEY = "nova_anon_id";

function getOrCreateAnonId(): string {
  try {
    const existing = localStorage.getItem(ANON_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(ANON_ID_KEY, id);
    return id;
  } catch {
    return "";
  }
}

export type ClientTrackOptions = {
  /**
   * Use navigation-safe delivery. Tries fetch with keepalive:true first
   * (survives page unload, supports auth headers), then falls back to
   * navigator.sendBeacon (no auth header). Use this for events fired
   * immediately before window.location.href navigation.
   */
  beacon?: boolean;
  /**
   * Optional pre-resolved auth token. When provided with beacon:true,
   * the keepalive fetch will include the Authorization header so user_id
   * is recorded. If omitted, the event is stored anonymously.
   */
  token?: string;
};

/**
 * Browser-safe analytics helper. Creates/persists an anonymous_id in
 * localStorage, then delivers the event to /api/analytics/event.
 *
 * Default mode: async fetch with auth token resolved from Supabase session.
 * Beacon mode (options.beacon): synchronous keepalive fetch (auth optional)
 *   with navigator.sendBeacon fallback. Safe to call before navigation.
 *
 * Never throws. Does nothing during SSR.
 */
export function clientTrackEvent(
  eventName: string,
  metadata?: Record<string, unknown>,
  options?: ClientTrackOptions
): void {
  if (typeof window === "undefined") return;
  if (!eventName?.trim()) return;

  const anonymousId = getOrCreateAnonId();
  const page = window.location.pathname;
  const body = JSON.stringify({
    eventName: eventName.trim(),
    anonymousId,
    page,
    metadata: metadata ?? {},
  });

  if (options?.beacon) {
    // ── Beacon / navigation-safe path ──────────────────────────────────────
    // fetch with keepalive:true queues the request to complete even after the
    // page navigates away, and supports Authorization headers unlike sendBeacon.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (options.token) headers["Authorization"] = `Bearer ${options.token}`;

    try {
      // keepalive fetch is synchronous to schedule — the browser resolves it
      // in the background. We intentionally discard the returned promise.
      void fetch("/api/analytics/event", {
        method: "POST",
        headers,
        body,
        keepalive: true,
      });
      return;
    } catch {
      // keepalive not supported or quota exceeded — fall through to sendBeacon.
    }

    // sendBeacon fallback: no auth header, but payload is guaranteed delivered.
    try {
      navigator.sendBeacon(
        "/api/analytics/event",
        new Blob([body], { type: "application/json" })
      );
    } catch {
      // Both paths failed — event is lost. Acceptable for analytics.
    }
    return;
  }

  // ── Default async path ───────────────────────────────────────────────────
  // Resolves the Supabase session so user_id is recorded when available.
  void (async () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    try {
      const { supabase } = await import("../supabaseClient");
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch {
      // No auth — anonymous tracking only.
    }

    await fetch("/api/analytics/event", {
      method: "POST",
      headers,
      body,
    });
  })().catch(() => {
    // Tracking failure never reaches the product flow.
  });
}
