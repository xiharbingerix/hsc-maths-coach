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

/**
 * Browser-safe analytics helper. Creates/persists an anonymous_id in
 * localStorage, optionally attaches the current user's auth token, and
 * POSTs to /api/analytics/event. Fire-and-forget — never throws.
 *
 * Safe to call from any client component or event handler. Does nothing
 * during SSR.
 */
export function clientTrackEvent(
  eventName: string,
  metadata?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (!eventName?.trim()) return;

  void (async () => {
    const anonymousId = getOrCreateAnonId();
    const page = window.location.pathname;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Attach auth token when available so the API can record user_id.
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
      body: JSON.stringify({
        eventName: eventName.trim(),
        anonymousId,
        page,
        metadata: metadata ?? {},
      }),
    });
  })().catch(() => {
    // Tracking failure never reaches the product flow.
  });
}
