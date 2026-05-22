"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";

type AccessStatus = "pending" | "active" | "revoked" | "unknown";

const units = [
  {
    title: "Differential Calculus",
    href: "/course/differential-calculus",
  },
  {
    title: "Integral Calculus",
    href: "/course/integral-calculus",
  },
  {
    title: "Functions and Graphing Techniques",
    href: "/course/functions-graphing-techniques",
  },
];

function statusText(status: AccessStatus) {
  if (status === "active") {
    return "active";
  }

  if (status === "revoked") {
    return "revoked";
  }

  return "pending";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [studentFirstName, setStudentFirstName] = useState("");
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("unknown");
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      if (!sessionUser) {
        router.replace("/login");
        return;
      }

      setUser(sessionUser);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("student_first_name")
        .eq("id", sessionUser.id)
        .maybeSingle();

      if (profileData?.student_first_name) {
        setStudentFirstName(String(profileData.student_first_name));
      } else if (sessionUser.user_metadata?.student_first_name) {
        setStudentFirstName(String(sessionUser.user_metadata.student_first_name));
      }

      const { data: accessData, error: accessError } = await supabase
        .from("user_access")
        .select("status")
        .eq("user_id", sessionUser.id)
        .eq("access_type", "online_learning_beta")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (accessError) {
        setAccessStatus("pending");
        setNotice(
          "Beta access is pending. Register interest or contact Joshua for access updates."
        );
      } else {
        setAccessStatus((accessData?.status as AccessStatus) ?? "pending");
      }

      setIsLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HSC Maths Coach
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Loading dashboard
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Student dashboard
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Welcome{studentFirstName ? `, ${studentFirstName}` : ""}
              </h1>
              <p className="mt-3 text-sm text-slate-600">{user?.email}</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Online learning beta access
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Status:{" "}
                <span className="font-semibold capitalize text-slate-950">
                  {statusText(accessStatus)}
                </span>
              </p>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700">
              {statusText(accessStatus)}
            </span>
          </div>

          {accessStatus !== "active" ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {notice ||
                "Beta access is currently pending. Register interest or contact Joshua for access updates."}
            </div>
          ) : null}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {units.map((unit) => (
            <Link
              key={unit.href}
              href={unit.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Active course unit
              </p>
              <h2 className="mt-3 text-xl font-bold">{unit.title}</h2>
              <p className="mt-5 text-sm font-semibold text-slate-950">
                Open unit
              </p>
            </Link>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-100/80 p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight">Next steps</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/diagnostic?offer=online-learning"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Start diagnostic
            </Link>
            <Link
              href="/online-learning"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Online learning page
            </Link>
            <Link
              href="/enquire?offer=online-learning"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Register interest
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
