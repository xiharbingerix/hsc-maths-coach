import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type DiagnosticEvent = {
  id: string;
  user_id: string | null;
  anonymous_id: string | null;
  created_at: string;
  metadata: {
    yearLevel?: string;
    totalCorrect?: number;
    totalQuestions?: number;
    unitResults?: { unitSlug: string; unitTitle: string; correct: number; total: number }[];
    utm_source?: string;
  } | null;
};

type ProfileRow = {
  id: string;
  email: string | null;
  student_first_name: string | null;
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scorePct(correct?: number, total?: number) {
  if (correct == null || !total) return null;
  return Math.round((correct / total) * 100);
}

async function assignDiagnosticAction(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;
  const yearLevel = formData.get("yearLevel") as string;
  const unitResults = JSON.parse((formData.get("unitResults") as string) || "[]") as {
    unitSlug: string;
    unitTitle: string;
    correct: number;
    total: number;
  }[];

  if (!userId || !yearLevel) return;

  await supabaseAdmin.from("diagnostic_results").insert({
    user_id: userId,
    year_level: yearLevel,
    unit_results: unitResults,
  });

  revalidatePath("/admin/diagnostics");
}

export default async function AdminDiagnosticsPage({
  searchParams,
}: {
  searchParams: Promise<{ yearLevel?: string; days?: string }>;
}) {
  const { yearLevel: filterYearLevel, days: filterDays } = await searchParams;
  const days = Math.min(90, Math.max(1, parseInt(filterDays ?? "14", 10)));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const [eventsResult, profilesResult, usersResult, savedResult] = await Promise.all([
    supabaseAdmin
      .from("analytics_events")
      .select("id,user_id,anonymous_id,created_at,metadata")
      .eq("event_name", "diagnostic_completed")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(300),
    supabaseAdmin
      .from("profiles")
      .select("id,email,student_first_name")
      .limit(2000),
    supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    supabaseAdmin
      .from("diagnostic_results")
      .select("user_id,year_level,created_at")
      .gte("created_at", since)
      .limit(1000),
  ]);

  const events = ((eventsResult.data ?? []) as DiagnosticEvent[]).filter((e) => {
    if (!filterYearLevel) return true;
    return e.metadata?.yearLevel === filterYearLevel;
  });

  const profilesById = new Map(
    ((profilesResult.data ?? []) as ProfileRow[]).map((p) => [p.id, p])
  );
  const authUsersById = new Map(
    (usersResult.data?.users ?? []).map((u) => [u.id, u])
  );

  // Build a set of (user_id + year_level) combos that already have saved results
  const savedSet = new Set(
    ((savedResult.data ?? []) as { user_id: string; year_level: string }[]).map(
      (r) => `${r.user_id}::${r.year_level}`
    )
  );

  const yearLevels = Array.from(
    new Set(
      ((eventsResult.data ?? []) as DiagnosticEvent[])
        .map((e) => e.metadata?.yearLevel)
        .filter(Boolean)
    )
  ).sort() as string[];

  function studentLabel(userId: string) {
    const profile = profilesById.get(userId);
    const authUser = authUsersById.get(userId);
    const name = profile?.student_first_name ?? authUser?.user_metadata?.student_first_name ?? null;
    const email = profile?.email ?? authUser?.email ?? null;
    return [name, email].filter(Boolean).join(" — ") || userId.slice(0, 8);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</p>
            <h1 className="mt-1 text-2xl font-bold">Diagnostic completions</h1>
            <p className="mt-1 text-sm text-slate-500">
              {events.length} completion{events.length !== 1 ? "s" : ""} in the last {days} days
            </p>
          </div>
          <a
            href="/admin"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Admin
          </a>
        </div>

        {/* Filters */}
        <form method="GET" className="flex flex-wrap gap-3">
          <select
            name="days"
            defaultValue={String(days)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <option value="1">Last 24 h</option>
            <option value="3">Last 3 days</option>
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <select
            name="yearLevel"
            defaultValue={filterYearLevel ?? ""}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <option value="">All year levels</option>
            {yearLevels.map((yl) => (
              <option key={yl} value={yl}>
                {yl.replace(/-/g, " ")}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Filter
          </button>
        </form>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No diagnostic completions in this period.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 text-left">When (AEST)</th>
                  <th className="px-4 py-3 text-left">Year level</th>
                  <th className="px-4 py-3 text-left">Score</th>
                  <th className="px-4 py-3 text-left">Units</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Assign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {events.map((event) => {
                  const meta = event.metadata ?? {};
                  const pct = scorePct(meta.totalCorrect, meta.totalQuestions);
                  const isLinked = !!event.user_id;
                  const alreadySaved =
                    isLinked && savedSet.has(`${event.user_id}::${meta.yearLevel}`);
                  const unitResults = meta.unitResults ?? [];
                  const unitResultsJson = JSON.stringify(unitResults);

                  return (
                    <tr key={event.id} className="align-top hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {formatDateTime(event.created_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {meta.yearLevel
                          ? meta.yearLevel.replace(/-/g, " ").replace(/year /, "Y")
                          : <span className="text-slate-400">unknown</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {pct != null ? (
                          <span className={`font-semibold ${pct >= 70 ? "text-emerald-700" : pct >= 40 ? "text-amber-700" : "text-red-700"}`}>
                            {meta.totalCorrect}/{meta.totalQuestions} ({pct}%)
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {unitResults.length > 0 ? (
                          <details className="cursor-pointer">
                            <summary className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                              {unitResults.length} unit{unitResults.length !== 1 ? "s" : ""}
                            </summary>
                            <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                              {unitResults.map((u) => (
                                <li key={u.unitSlug}>
                                  {u.correct}/{u.total} — {u.unitTitle}
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <span className="text-xs text-slate-400">no breakdown</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {meta.utm_source ? (
                          <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                            {meta.utm_source}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">direct</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isLinked ? (
                          <div>
                            <span className="text-slate-700">{studentLabel(event.user_id!)}</span>
                            {alreadySaved && (
                              <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">saved</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            anon · {event.anonymous_id?.slice(0, 8) ?? "?"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {alreadySaved ? (
                          <span className="text-xs text-slate-400">already saved</span>
                        ) : (
                          <form action={assignDiagnosticAction}>
                            <input type="hidden" name="yearLevel" value={meta.yearLevel ?? ""} />
                            <input type="hidden" name="unitResults" value={unitResultsJson} />
                            <div className="flex flex-col gap-1.5">
                              <select
                                name="userId"
                                required
                                defaultValue={event.user_id ?? ""}
                                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 min-w-[180px]"
                              >
                                <option value="">— select student —</option>
                                {(usersResult.data?.users ?? [])
                                  .sort((a, b) => {
                                    const aName = profilesById.get(a.id)?.student_first_name ?? a.email ?? "";
                                    const bName = profilesById.get(b.id)?.student_first_name ?? b.email ?? "";
                                    return aName.localeCompare(bName);
                                  })
                                  .map((u) => (
                                    <option key={u.id} value={u.id}>
                                      {studentLabel(u.id)}
                                    </option>
                                  ))}
                              </select>
                              <button
                                type="submit"
                                className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700"
                              >
                                Assign
                              </button>
                            </div>
                          </form>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
