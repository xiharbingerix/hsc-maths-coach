"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type GateState = "checking" | "logged-out" | "logged-in";

type AccessGateProps = {
  children: React.ReactNode;
};

const loggedOutContent = {
  title: "Sign up free to start learning",
  text: "Create a free account to unlock full lessons, worked examples, guided practice, independent practice, mastery quizzes, saved progress and course pathways — no card required.",
  primaryHref: "/signup",
  primaryLabel: "Sign up free",
  secondaryHref: "/login",
  secondaryLabel: "Log in",
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

export function AccessGate({ children }: AccessGateProps) {
  const [gateState, setGateState] = useState<GateState>("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user ?? null;

      if (!isMounted) {
        return;
      }

      setGateState(user ? "logged-in" : "logged-out");
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
            Checking lesson access...
          </h1>
        </section>
      </main>
    );
  }

  if (gateState === "logged-in") {
    return <>{children}</>;
  }

  const content = loggedOutContent;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Nova Maths
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          {content.text}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <AccessButton href={content.primaryHref}>
            {content.primaryLabel}
          </AccessButton>
          <AccessButton href={content.secondaryHref} variant="secondary">
            {content.secondaryLabel}
          </AccessButton>
          <AccessButton href="/course" variant="secondary">
            Back to course
          </AccessButton>
        </div>
      </section>
    </main>
  );
}
