"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { normaliseUserAccessStatus } from "./userAccess";

/**
 * Client hook: true when the signed-in user has active paid (Premium) access,
 * false when free/logged-out, null while still resolving. Mirrors the
 * server-side `hasActiveAccess` check so paid features (mastery quizzes,
 * mastery reporting) can gate inline.
 */
export function usePaidAccess(): boolean | null {
  const [paid, setPaid] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function check() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user ?? null;

      if (!isMounted) return;

      if (!user) {
        setPaid(false);
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

      if (!isMounted) return;

      setPaid(
        !error && normaliseUserAccessStatus(accessData?.status) === "active",
      );
    }

    check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => check());

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return paid;
}
