type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20 text-white">
      <section className="mx-auto max-w-md space-y-6 rounded-2xl bg-white p-6 text-slate-900 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Admin login
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Enter the admin password to view diagnostic submissions.
          </p>
        </div>

        {hasError && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Incorrect password. Try again.
          </div>
        )}

        <form action="/api/admin/login" method="post" className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Admin password</span>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}