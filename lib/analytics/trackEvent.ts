import { supabaseAdmin } from "../supabaseAdmin";

export type TrackEventInput = {
  userId?: string | null;
  anonymousId?: string | null;
  eventName: string;
  page?: string | null;
  metadata?: Record<string, unknown>;
};

/**
 * Server-side analytics event recorder. Uses the service-role client so it
 * works in API routes and server components. Never throws — logs and returns
 * { ok: false } on any failure so callers stay clean.
 */
export async function trackEvent(
  input: TrackEventInput
): Promise<{ ok: boolean }> {
  if (!input.eventName?.trim()) {
    console.warn("[trackEvent] eventName is empty — skipping");
    return { ok: false };
  }

  // Ensure metadata is a plain JSON-safe object.
  const metadata =
    input.metadata && typeof input.metadata === "object" &&
    !Array.isArray(input.metadata)
      ? input.metadata
      : {};

  try {
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      user_id: input.userId ?? null,
      anonymous_id: input.anonymousId?.trim() || null,
      event_name: input.eventName.trim(),
      page: input.page?.trim() || null,
      metadata,
    });

    if (error) {
      console.error("[trackEvent]", input.eventName, error.message);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error(
      "[trackEvent] unexpected failure",
      input.eventName,
      err instanceof Error ? err.message : err
    );
    return { ok: false };
  }
}
