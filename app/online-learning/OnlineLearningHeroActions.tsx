"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function OnlineLearningHeroActions() {
  const [hasActiveAccess, setHasActiveAccess] = useState(false);
  const [checkedAccess, setCheckedAccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadAccess() {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (!mounted || !user) {
          setCheckedAccess(true);
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

        if (!mounted) return;

        if (!error && accessData?.status === "active") {
          setHasActiveAccess(true);
        }
      } catch {
        // Ignore access check failures; leave the marketing page unchanged.
      } finally {
        if (mounted) {
          setCheckedAccess(true);
        }
      }
    }

    loadAccess();
    return () => {
      mounted = false;
    };
  }, []);

  if (hasActiveAccess) {
    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Go to dashboard
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Continue learning
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link
        href="/checkout?offer=online-learning"
        className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        Start your 7-day free trial
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
      >
        Create account
      </Link>
      <Link
        href="/diagnostic?offer=online-learning"
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
      >
        Start free diagnostic
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
      >
        Log in
      </Link>
    </div>
  );
}
