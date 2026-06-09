import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

type EventBody = {
  eventName?: string;
  anonymousId?: string;
  page?: string;
  metadata?: unknown;
};

export async function POST(request: Request) {
  let body: EventBody;
  try {
    body = (await request.json()) as EventBody;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { eventName, anonymousId, page, metadata } = body;

  if (!eventName?.trim()) {
    return NextResponse.json({ error: "eventName required." }, { status: 400 });
  }

  // Optionally resolve authenticated user from Bearer token.
  let userId: string | null = null;
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.slice("Bearer ".length);
    try {
      const { data } = await supabaseAdmin.auth.getUser(token);
      userId = data.user?.id ?? null;
    } catch {
      // Token invalid — proceed as anonymous.
    }
  }

  // Ensure metadata is a plain object before storing.
  const safeMeta =
    metadata !== null &&
    typeof metadata === "object" &&
    !Array.isArray(metadata)
      ? (metadata as Record<string, unknown>)
      : {};

  try {
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      user_id: userId,
      anonymous_id: anonymousId?.trim() || null,
      event_name: eventName.trim(),
      page: page?.trim() || null,
      metadata: safeMeta,
    });

    if (error) {
      console.error("[analytics/event] insert failed", eventName, error.message);
    }
  } catch (err) {
    // Log but always return 200 — analytics must never break the client.
    console.error(
      "[analytics/event] insert failed",
      eventName,
      err instanceof Error ? err.message : err
    );
  }

  return NextResponse.json({ ok: true });
}
