import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const ALLOWED_DAYS = new Set([1, 7, 30]);
const MAX_ROWS = 5000;

function csvField(value: string | null | undefined): string {
  const s = value ?? "";
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function csvRow(fields: (string | null | undefined)[]): string {
  return fields.map(csvField).join(",");
}

type ExportRow = {
  created_at: string;
  event_name: string;
  page: string | null;
  user_id: string | null;
  anonymous_id: string | null;
  metadata: Record<string, unknown> | null;
};

export async function GET(request: Request) {
  // Admin cookie check — return 401 rather than redirect for API routes.
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (token !== getAdminToken()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawDays = Number(searchParams.get("days") ?? "7");
  const days = ALLOWED_DAYS.has(rawDays) ? rawDays : 7;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("analytics_events")
    .select("created_at, event_name, page, user_id, anonymous_id, metadata")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) {
    return new Response(`Export failed: ${error.message}`, { status: 500 });
  }

  const rows = (data ?? []) as ExportRow[];

  const header = csvRow([
    "created_at",
    "event_name",
    "page",
    "user_id",
    "anonymous_id",
    "metadata",
  ]);

  const body = rows
    .map((row) =>
      csvRow([
        row.created_at,
        row.event_name,
        row.page,
        row.user_id,
        row.anonymous_id,
        row.metadata ? JSON.stringify(row.metadata) : "",
      ])
    )
    .join("\n");

  const csv = [header, body].join("\n");
  const filename = `analytics-events-${days}d-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
