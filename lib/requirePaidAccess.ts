import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Server-side entitlement check for Premium features (exams, topic tests,
 * AI tutor, AI proof marker, detailed band reports). Free = a logged-in user
 * with no `active` row; Paid = an `active` `online_learning_beta` row.
 */
export async function hasActiveAccess(
  userId: string | null | undefined
): Promise<boolean> {
  if (!userId) {
    return false;
  }

  const { data, error } = await supabaseAdmin
    .from("user_access")
    .select("status")
    .eq("user_id", userId)
    .eq("access_type", "online_learning_beta")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return false;
  }

  return data?.status === "active";
}
