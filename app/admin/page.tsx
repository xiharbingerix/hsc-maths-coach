import Link from "next/link";
import { revalidatePath } from "next/cache";
import { DeleteUserForm } from "./DeleteUserForm";
import { requireAdmin } from "../../lib/adminSession";
import { scoreDiagnostic } from "../../lib/diagnosticScoring";
import type { DiagnosticSubmission } from "../../lib/reportTypes";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

type BetaAccessStatus = "pending" | "active" | "revoked";

type BetaAccessRow = {
  id: string;
  user_id: string;
  access_type: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ProfileRow = {
  id: string;
  email: string | null;
  student_first_name: string | null;
  parent_email: string | null;
};

type BetaAccessRequest = BetaAccessRow & {
  profile?: ProfileRow;
};

type AdminAuthUser = {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string | null;
  email_confirmed_at?: string | null;
  user_metadata?: {
    student_first_name?: string;
    parent_email?: string;
  };
};

type StudentUserRow = {
  user: AdminAuthUser;
  profile?: ProfileRow;
  access?: BetaAccessRow;
};

type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

type EnquiryRow = {
  id: string;
  created_at: string | null;
  offer_selected: string | null;
  student_first_name: string | null;
  parent_first_name: string | null;
  parent_email: string | null;
  year_level: string | null;
  course: string | null;
  message: string | null;
  status: string | null;
};

type PaymentRow = {
  id: string;
  created_at: string | null;
  user_id: string | null;
  parent_email: string | null;
  student_first_name: string | null;
  offer_selected: string | null;
  stripe_checkout_session_id: string | null;
  stripe_subscription_id: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  subscription_status: string | null;
  access_status: string | null;
};

const betaAccessStatuses: BetaAccessStatus[] = ["pending", "active", "revoked"];
const enquiryStatuses: EnquiryStatus[] = [
  "new",
  "contacted",
  "converted",
  "closed",
];

const launchChecklist = [
  {
    area: "Public funnel",
    items: [
      { label: "Homepage loads", href: "/" },
      { label: "Online learning page loads", href: "/online-learning" },
      { label: "Course page lists six units", href: "/course" },
      { label: "Enquiry form submits", href: "/enquire?offer=online-learning" },
      { label: "Diagnostic form submits", href: "/diagnostic" },
      { label: "Thanks page shows next steps", href: "/thanks" },
    ],
  },
  {
    area: "Student access",
    items: [
      { label: "Signup creates account", href: "/signup" },
      { label: "Dashboard shows pending access", href: "/dashboard" },
      { label: "Admin can approve access", href: "/admin" },
      { label: "Active user can open lessons", href: "/course" },
      { label: "Pending user sees access gate", href: "/course" },
      { label: "Revoked user sees access gate", href: "/course" },
    ],
  },
  {
    area: "Diagnostic/report workflow",
    items: [
      { label: "Diagnostic submission appears in admin", href: "/admin" },
      { label: "Report draft can be generated" },
      { label: "Report notes can be edited" },
      { label: "PDF report opens" },
      { label: "PDF can be saved manually" },
      { label: "Parent email template can be copied" },
      { label: "Report can be marked sent" },
      { label: "Follow-up required can be marked" },
    ],
  },
  {
    area: "Course quality",
    items: [
      { label: "All six unit pages load", href: "/course" },
      { label: "One lesson from each unit loads for active user" },
      { label: "Watch stage remains hidden" },
      { label: "Mastery quiz works" },
    ],
  },
  {
    area: "Environment",
    items: [
      { label: "Supabase public submissions working" },
      { label: "Admin login working", href: "/admin/login" },
      { label: "Service role/admin actions working" },
      { label: "Vercel deployment current" },
    ],
  },
];

async function ensureProfileAndAccess(
  userId: string,
  email: string | null | undefined
) {
  const { data: existingProfile, error: profileReadError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (profileReadError) {
    throw new Error(profileReadError.message);
  }

  if (!existingProfile) {
    const { error: profileInsertError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        email: email ?? null,
        role: "student",
      });

    if (profileInsertError) {
      throw new Error(profileInsertError.message);
    }
  }

  const { data: existingAccess, error: accessReadError } = await supabaseAdmin
    .from("user_access")
    .select("id")
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta")
    .maybeSingle();

  if (accessReadError) {
    throw new Error(accessReadError.message);
  }

  if (!existingAccess) {
    const { error: accessInsertError } = await supabaseAdmin
      .from("user_access")
      .insert({
        user_id: userId,
        access_type: "online_learning_beta",
        status: "pending",
      });

    if (accessInsertError) {
      throw new Error(accessInsertError.message);
    }
  }
}

async function ensureProfileAccess(formData: FormData) {
  "use server";

  await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const email = String(formData.get("email") ?? "");

  if (!userId) {
    throw new Error("Missing user id.");
  }

  await ensureProfileAndAccess(userId, email || null);
  revalidatePath("/admin");
}

async function setStudentAccessStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const email = String(formData.get("email") ?? "");
  const status = String(formData.get("status") ?? "") as BetaAccessStatus;

  if (!userId || !betaAccessStatuses.includes(status)) {
    throw new Error("Invalid student access status update.");
  }

  await ensureProfileAndAccess(userId, email || null);

  const { error } = await supabaseAdmin
    .from("user_access")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta");

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

async function deleteTestUser(formData: FormData) {
  "use server";

  await requireAdmin();

  const userId = String(formData.get("userId") ?? "");

  if (!userId) {
    throw new Error("Missing user id.");
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

async function updateBetaAccessStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as BetaAccessStatus;

  if (!id || !betaAccessStatuses.includes(status)) {
    throw new Error("Invalid beta access status update.");
  }

  const { error } = await supabaseAdmin
    .from("user_access")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

async function updateEnquiryStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as EnquiryStatus;

  if (!id || !enquiryStatuses.includes(status)) {
    throw new Error("Invalid enquiry status update.");
  }

  const { error } = await supabaseAdmin
    .from("enquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatOptionalDateTime(value: string | null | undefined) {
  if (!value) {
    return "Not recorded";
  }

  return formatDateTime(value);
}

function formatDateGroup(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
  }).format(new Date(value));
}

function formatStatus(value: string | null | undefined) {
  return (value ?? "not_started").replace(/_/g, " ");
}

function formatMoney(cents: number | null, currency: string | null) {
  if (typeof cents !== "number") {
    return "Not recorded";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: (currency ?? "aud").toUpperCase(),
  }).format(cents / 100);
}

function shortId(value: string | null | undefined) {
  if (!value) {
    return "Not recorded";
  }

  return value.length > 14 ? `${value.slice(0, 14)}...` : value;
}

function accessStatusClass(status: string | null | undefined) {
  if (status === "active") {
    return "bg-emerald-100 text-emerald-900";
  }

  if (status === "revoked") {
    return "bg-red-100 text-red-800";
  }

  return "bg-amber-100 text-amber-900";
}

function enquiryStatusClass(status: string | null | undefined) {
  if (status === "converted") {
    return "bg-emerald-100 text-emerald-900";
  }

  if (status === "closed") {
    return "bg-slate-200 text-slate-700";
  }

  if (status === "contacted") {
    return "bg-blue-100 text-blue-900";
  }

  return "bg-amber-100 text-amber-900";
}

function LaunchChecklistSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Launch readiness
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Beta launch checklist
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Static admin checklist for a final smoke test before inviting
            students or parents.
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-500">
          Visual only for now
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {launchChecklist.map((group) => (
          <article
            key={group.area}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="font-semibold text-slate-950">{group.area}</h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm text-slate-700"
                >
                  <label className="flex min-w-0 items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      aria-label={item.label}
                    />
                    <span>{item.label}</span>
                  </label>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="shrink-0 font-semibold text-slate-950 underline"
                    >
                      Open
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function groupSubmissionsByDate(submissions: DiagnosticSubmission[]) {
  return submissions.reduce<Record<string, DiagnosticSubmission[]>>(
    (groups, submission) => {
      const key = formatDateGroup(submission.created_at);
      return {
        ...groups,
        [key]: [...(groups[key] ?? []), submission],
      };
    },
    {}
  );
}

export default async function AdminPage() {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(
      `${error.message}. If report workflow columns are missing, add report_status, report_notes, follow_up_required, offer_selected, and report_sent_at to diagnostic_submissions.`
    );
  }

  const submissions = (data ?? []) as DiagnosticSubmission[];
  const groupedSubmissions = groupSubmissionsByDate(submissions);

  const { data: enquiriesData, error: enquiriesError } = await supabaseAdmin
    .from("enquiries")
    .select(
      "id,created_at,offer_selected,student_first_name,parent_first_name,parent_email,year_level,course,message,status"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  const enquiries = (enquiriesData ?? []) as EnquiryRow[];

  const { data: paymentsData, error: paymentsError } = await supabaseAdmin
    .from("payments")
    .select(
      "id,created_at,user_id,parent_email,student_first_name,offer_selected,stripe_checkout_session_id,stripe_subscription_id,amount_total,currency,payment_status,subscription_status,access_status"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  const payments = (paymentsData ?? []) as PaymentRow[];

  const {
    data: betaAccessData,
    error: betaAccessError,
  } = await supabaseAdmin
    .from("user_access")
    .select("id,user_id,access_type,status,created_at,updated_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const betaAccessRows = (betaAccessData ?? []) as BetaAccessRow[];
  const userIds = Array.from(
    new Set(betaAccessRows.map((request) => request.user_id).filter(Boolean))
  );

  const { data: profilesData } =
    userIds.length > 0
      ? await supabaseAdmin
          .from("profiles")
          .select("id,email,student_first_name,parent_email")
          .in("id", userIds)
      : { data: [] };

  const profilesById = new Map(
    ((profilesData ?? []) as ProfileRow[]).map((profile) => [
      profile.id,
      profile,
    ])
  );

  const betaAccessRequests: BetaAccessRequest[] = betaAccessRows.map(
    (request) => ({
      ...request,
      profile: profilesById.get(request.user_id),
    })
  );

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });

  const adminUsers = ((usersData?.users ?? []) as AdminAuthUser[]).filter(
    (user) => user.email
  );

  const authUserIds = adminUsers.map((user) => user.id);
  const { data: userProfilesData } =
    authUserIds.length > 0
      ? await supabaseAdmin
          .from("profiles")
          .select("id,email,student_first_name,parent_email")
          .in("id", authUserIds)
      : { data: [] };

  const { data: userAccessData } =
    authUserIds.length > 0
      ? await supabaseAdmin
          .from("user_access")
          .select("id,user_id,access_type,status,created_at,updated_at")
          .in("user_id", authUserIds)
          .eq("access_type", "online_learning_beta")
      : { data: [] };

  const userProfilesById = new Map(
    ((userProfilesData ?? []) as ProfileRow[]).map((profile) => [
      profile.id,
      profile,
    ])
  );

  const userAccessByUserId = new Map(
    ((userAccessData ?? []) as BetaAccessRow[]).map((access) => [
      access.user_id,
      access,
    ])
  );

  const studentUsers: StudentUserRow[] = adminUsers.map((user) => ({
    user,
    profile: userProfilesById.get(user.id),
    access: userAccessByUserId.get(user.id),
  }));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              HSC Maths Coach
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Report dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review diagnostic submissions, open report editors, and view
              printable parent reports.
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

        <LaunchChecklistSection />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Funnel
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Enquiries
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Interest captured from /enquire before a diagnostic is
                completed.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"}
            </p>
          </div>

          {enquiriesError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Could not load enquiries: {enquiriesError.message}. Create the
              public.enquiries table if it does not exist yet.
            </div>
          ) : enquiries.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No enquiries yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {enquiries.map((enquiry) => {
                const status = enquiry.status ?? "new";

                return (
                  <article
                    key={enquiry.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-5 xl:grid-cols-[1.2fr_1.1fr_1.3fr] xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-950">
                            {enquiry.student_first_name ?? "Unnamed student"}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${enquiryStatusClass(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          Parent: {enquiry.parent_first_name ?? "Not saved"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {enquiry.parent_email ?? "No parent email"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Created {formatOptionalDateTime(enquiry.created_at)}
                        </p>
                      </div>

                      <div className="text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-900">
                            Offer:
                          </span>{" "}
                          {enquiry.offer_selected ?? "Not selected"}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium text-slate-900">
                            Year:
                          </span>{" "}
                          {enquiry.year_level ?? "Not saved"}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium text-slate-900">
                            Course:
                          </span>{" "}
                          {enquiry.course ?? "Not saved"}
                        </p>
                        {enquiry.message ? (
                          <p className="mt-3 rounded-xl bg-white p-3 leading-6 text-slate-700">
                            {enquiry.message}
                          </p>
                        ) : null}
                      </div>

                      <form
                        action={updateEnquiryStatus}
                        className="flex flex-wrap gap-2 xl:justify-end"
                      >
                        <input type="hidden" name="id" value={enquiry.id} />
                        {enquiryStatuses.map((nextStatus) => (
                          <button
                            key={nextStatus}
                            type="submit"
                            name="status"
                            value={nextStatus}
                            disabled={status === nextStatus}
                            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold capitalize text-slate-800 transition hover:bg-slate-50 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            {nextStatus}
                          </button>
                        ))}
                      </form>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Stripe
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Recent payments
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Checkout records for report options and online learning
                subscriptions. Manual report and enquiry workflows stay
                available.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {payments.length} payment{payments.length === 1 ? "" : "s"}
            </p>
          </div>

          {paymentsError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Could not load payments: {paymentsError.message}. Create the
              public.payments table if it does not exist yet.
            </div>
          ) : payments.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No Stripe payments recorded yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2">Offer</th>
                    <th className="px-3 py-2">Parent/student</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Payment</th>
                    <th className="px-3 py-2">Subscription</th>
                    <th className="px-3 py-2">Access</th>
                    <th className="px-3 py-2">User/session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="align-top">
                      <td className="px-3 py-3 text-slate-600">
                        {formatOptionalDateTime(payment.created_at)}
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-950">
                        {payment.offer_selected ?? "Not recorded"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        <p>{payment.parent_email ?? "No parent email"}</p>
                        <p className="mt-1 text-xs">
                          {payment.student_first_name ?? "No student name"}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {formatMoney(payment.amount_total, payment.currency)}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {payment.payment_status ?? "Not recorded"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {payment.subscription_status ?? "Not applicable"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${accessStatusClass(
                            payment.access_status
                          )}`}
                        >
                          {payment.access_status ?? "pending"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">
                        <p>User: {shortId(payment.user_id)}</p>
                        <p className="mt-1">
                          Session: {shortId(payment.stripe_checkout_session_id)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Accounts
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Student users
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use Ensure profile/access if a signup partially failed.
                Deleting a user only deletes the account/profile/access rows,
                not diagnostic submissions.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {studentUsers.length} user{studentUsers.length === 1 ? "" : "s"}
            </p>
          </div>

          {usersError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Could not load Supabase Auth users: {usersError.message}. This
              requires a server-only SUPABASE_SERVICE_ROLE_KEY.
            </div>
          ) : studentUsers.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No student Auth users found yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {studentUsers.map(({ user, profile, access }) => {
                const status = access?.status ?? "missing";
                const accessType = access?.access_type ?? "missing";
                const studentName =
                  profile?.student_first_name ??
                  user.user_metadata?.student_first_name ??
                  "Not saved";
                const parentEmail =
                  profile?.parent_email ??
                  user.user_metadata?.parent_email ??
                  "Not saved";

                return (
                  <article
                    key={user.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr_1.4fr] xl:items-start">
                      <div>
                        <h3 className="font-semibold text-slate-950">
                          {user.email}
                        </h3>
                        <p className="mt-1 break-all text-xs text-slate-500">
                          {user.id}
                        </p>
                        <dl className="mt-3 grid gap-1 text-sm text-slate-600">
                          <div>
                            <dt className="inline font-medium text-slate-900">
                              Created:
                            </dt>{" "}
                            <dd className="inline">
                              {formatOptionalDateTime(user.created_at)}
                            </dd>
                          </div>
                          <div>
                            <dt className="inline font-medium text-slate-900">
                              Last sign in:
                            </dt>{" "}
                            <dd className="inline">
                              {formatOptionalDateTime(user.last_sign_in_at)}
                            </dd>
                          </div>
                          <div>
                            <dt className="inline font-medium text-slate-900">
                              Email confirmed:
                            </dt>{" "}
                            <dd className="inline">
                              {formatOptionalDateTime(user.email_confirmed_at)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-900">
                            Student:
                          </span>{" "}
                          {studentName}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium text-slate-900">
                            Parent:
                          </span>{" "}
                          {parentEmail}
                        </p>
                        <p className="mt-1">
                          <span className="font-medium text-slate-900">
                            Access:
                          </span>{" "}
                          {accessType}
                        </p>
                        <p className="mt-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold capitalize ${accessStatusClass(
                              access?.status
                            )}`}
                          >
                            {status}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <form action={ensureProfileAccess}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="email"
                            value={user.email ?? ""}
                          />
                          <button
                            type="submit"
                            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                          >
                            Ensure profile/access
                          </button>
                        </form>

                        <form
                          action={setStudentAccessStatus}
                          className="flex flex-wrap gap-2"
                        >
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="email"
                            value={user.email ?? ""}
                          />
                          {betaAccessStatuses.map((nextStatus) => (
                            <button
                              key={nextStatus}
                              type="submit"
                              name="status"
                              value={nextStatus}
                              disabled={access?.status === nextStatus}
                              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold capitalize text-slate-800 transition hover:bg-slate-50 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                            >
                              {nextStatus}
                            </button>
                          ))}
                        </form>

                        <DeleteUserForm
                          userId={user.id}
                          deleteUserAction={deleteTestUser}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Online learning beta
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Beta access requests
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Approve or revoke dashboard access for student beta accounts.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {betaAccessRequests.length} request
              {betaAccessRequests.length === 1 ? "" : "s"}
            </p>
          </div>

          {betaAccessError ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Could not load beta access requests: {betaAccessError.message}.
              Check that the profiles and user_access tables exist. This admin
              section uses the existing protected server-side Supabase admin
              client, so no service role key is exposed to the browser.
            </div>
          ) : betaAccessRequests.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No beta access requests yet.
            </p>
          ) : (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="hidden grid-cols-[1.4fr_1fr_0.9fr_1.2fr] gap-4 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
                <span>Student</span>
                <span>Access</span>
                <span>Status</span>
                <span>Manage</span>
              </div>

              <div className="divide-y divide-slate-200">
                {betaAccessRequests.map((request) => {
                  const profile = request.profile;
                  const status = request.status ?? "pending";

                  return (
                    <article
                      key={request.id}
                      className="grid gap-4 px-4 py-4 lg:grid-cols-[1.4fr_1fr_0.9fr_1.2fr] lg:items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-950">
                          {profile?.student_first_name ?? "Unnamed student"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {profile?.email ?? "No student email saved"}
                        </p>
                        {profile?.parent_email ? (
                          <p className="mt-1 text-xs text-slate-500">
                            Parent: {profile.parent_email}
                          </p>
                        ) : null}
                      </div>

                      <div className="text-sm text-slate-600">
                        <p className="font-medium text-slate-900">
                          {request.access_type ?? "online_learning_beta"}
                        </p>
                        <p className="mt-1">
                          Created {formatOptionalDateTime(request.created_at)}
                        </p>
                        <p className="mt-1">
                          Updated {formatOptionalDateTime(request.updated_at)}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold capitalize ${accessStatusClass(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>

                      <form
                        action={updateBetaAccessStatus}
                        className="flex flex-wrap gap-2"
                      >
                        <input type="hidden" name="id" value={request.id} />
                        {betaAccessStatuses.map((nextStatus) => (
                          <button
                            key={nextStatus}
                            type="submit"
                            name="status"
                            value={nextStatus}
                            disabled={status === nextStatus}
                            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold capitalize text-slate-800 transition hover:bg-slate-50 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            {nextStatus}
                          </button>
                        ))}
                      </form>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {submissions.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-slate-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSubmissions).map(([date, items]) => (
              <section key={date} className="space-y-3">
                <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {date}
                </h2>

                <div className="space-y-3">
                  {items.map((submission) => {
                    const score = scoreDiagnostic(
                      submission.answers,
                      submission.confidence
                    );

                    return (
                      <article
                        key={submission.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-950">
                                {submission.student_first_name}
                              </h3>
                              <p className="mt-1 text-sm text-slate-600">
                                {submission.parent_email}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Submitted {formatDateTime(submission.created_at)}
                              </p>
                            </div>

                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Year:</span>{" "}
                                {submission.year_level ?? "Not provided"}
                              </p>
                              <p>
                                <span className="font-medium">Course:</span>{" "}
                                {submission.course ?? "Not provided"}
                              </p>
                              <p>
                                <span className="font-medium">Offer:</span>{" "}
                                {submission.offer_selected ?? "Not selected"}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-semibold capitalize text-white">
                                {formatStatus(submission.report_status)}
                              </span>
                              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                                Score {score.correct}/{score.totalQuestions} (
                                {score.percentage}%)
                              </span>
                              {submission.follow_up_required ? (
                                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-900">
                                  Follow-up required
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 lg:justify-end">
                            <Link
                              href={`/admin/reports/${submission.id}`}
                              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Open report
                            </Link>
                            <Link
                              href={`/admin/reports/${submission.id}/pdf`}
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                            >
                              View PDF
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
