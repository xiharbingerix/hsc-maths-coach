"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { normaliseUserAccessStatus } from "../../lib/userAccess";

type GateState = "checking" | "logged-out" | "locked" | "active";

type RequirePaidProps = {
  children: React.ReactNode;
  featureLabel?: string;
};

function AccessButton({
  href,
  children,
  variant = "primary",
}: Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}>) {
  const classes =
    variant === "primary"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${classes}`}
    >
      {children}
    </Link>
  );
}

export function RequirePaid({ children, featureLabel }: RequirePaidProps) {
  const [gateState, setGateState] = useState<GateState>("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user ?? null;

      if (!isMounted) {
        return;
      }

      if (!user) {
        setGateState("logged-out");
        return;
      }

      const { data: accessData, error } = await supabase
        .from("user_access")
        .select("status")
        .eq("user_id", user.id)
        .eq("access_type", "online_learning_beta")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        setGateState("locked");
        return;
      }

      setGateState(
        normaliseUserAccessStatus(accessData?.status) === "active"
          ? "active"
          : "locked",
      );
    }

    checkAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAccess();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (gateState === "checking") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Checking access...
          </h1>
        </section>
      </main>
    );
  }

  if (gateState === "active") {
    return <>{children}</>;
  }

  const feature = featureLabel ? `${featureLabel} are` : "This is";
  const title = featureLabel ? `Unlock ${featureLabel}` : "Upgrade to unlock this";
  const text = `${feature} part of Nova Maths Premium. Lessons and practice are free — upgrade for full exam papers, topic tests, step-by-step hints and detailed band reports.`;

  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : "/course";
  const loginHref = `/login?next=${encodeURIComponent(currentPath)}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths Premium
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">{text}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {gateState === "logged-out" ? (
            <>
              <AccessButton href={loginHref}>Log in</AccessButton>
              <AccessButton href="/signup" variant="secondary">
                Sign up free
              </AccessButton>
            </>
          ) : (
            <AccessButton href="/checkout?offer=online-learning">
              Upgrade — $19/month
            </AccessButton>
          )}
          <AccessButton href="/course" variant="secondary">
            Back to course
          </AccessButton>
        </div>
      </section>
    </main>
  );
}
