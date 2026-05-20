import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, getAdminToken } from "../../lib/adminAuth";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

type DiagnosticSubmission = {
  id: string;
  created_at: string;
  student_first_name: string;
  parent_first_name: string;
  parent_email: string;
  year_level: string | null;
  course: string | null;
  topics_studied: string[] | null;
  current_topic: string | null;
  target_result: string | null;
  assessment_timing: string | null;
  answers: Record<string, string> | null;
  confidence: Record<string, string> | null;
  working: Record<string, string> | null;
  consent_confirmed: boolean;
  report_status: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderJsonMap(value: Record<string, string> | null) {
  if (!value || Object.keys(value).length === 0) {
    return <p className="text-sm text-slate-500">No data</p>;
  }

  return (
    <div className="space-y-2">
      {Object.entries(value).map(([key, answer]) => (
        <div key={key} className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {key}
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
            {answer || "Blank"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (token !== getAdminToken()) {
    redirect("/admin/login");
  }

  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  const submissions = (data ?? []) as DiagnosticSubmission[];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              HSC Maths Coach
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Diagnostic submissions
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Showing the latest {submissions.length} submissions.
            </p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Log out
            </button>
          </form>
        </header>

        {submissions.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-slate-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {submission.student_first_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                      Parent: {submission.parent_first_name} ·{" "}
                      {submission.parent_email}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Submitted {formatDate(submission.created_at)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                    Status: {submission.report_status}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Course
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.course ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Year level
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.year_level ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Target
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.target_result ?? "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Current topic
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.current_topic || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Next assessment
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.assessment_timing || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Consent
                    </p>
                    <p className="mt-1 font-medium">
                      {submission.consent_confirmed ? "Confirmed" : "Not confirmed"}
                    </p>
                  </div>
                </div>

                <section>
                  <h3 className="text-lg font-semibold">Topics studied</h3>

                  {submission.topics_studied &&
                  submission.topics_studied.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {submission.topics_studied.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">
                      No topics selected.
                    </p>
                  )}
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Answers</h3>
                    {renderJsonMap(submission.answers)}
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Confidence</h3>
                    {renderJsonMap(submission.confidence)}
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Working</h3>
                    {renderJsonMap(submission.working)}
                  </div>
                </section>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}