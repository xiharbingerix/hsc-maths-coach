"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/adminSession";
import { getStripe } from "../../../lib/stripe";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { createTutoringCheckoutSession } from "../../../lib/tutoring";
import { isMonday, upcomingMondays } from "../../../lib/nswTermDates";

export type CreatePlanState = {
  ok: boolean;
  url?: string;
  error?: string;
  studentName?: string;
};

function parseAmountToCents(raw: string): number | null {
  const value = Number.parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

export async function createPlanAction(
  _prev: CreatePlanState,
  formData: FormData,
): Promise<CreatePlanState> {
  await requireAdmin();

  const studentName = String(formData.get("studentName") ?? "").trim();
  const parentEmail = String(formData.get("parentEmail") ?? "").trim();
  const amountRaw = String(formData.get("weeklyAmount") ?? "75").trim();
  const weeksRaw = String(formData.get("committedWeeks") ?? "10").trim();
  const billingMonday = String(formData.get("billingMonday") ?? "").trim();

  if (!studentName) return { ok: false, error: "Student name is required." };
  if (!parentEmail || !parentEmail.includes("@")) {
    return { ok: false, error: "A valid parent email is required." };
  }

  const weeklyAmountCents = parseAmountToCents(amountRaw);
  if (weeklyAmountCents === null) {
    return { ok: false, error: "Weekly amount must be a positive number." };
  }

  const committedWeeks = Number.parseInt(weeksRaw, 10);
  if (!Number.isInteger(committedWeeks) || committedWeeks < 1) {
    return { ok: false, error: "Committed weeks must be a whole number ≥ 1." };
  }

  // The first billing Monday must be one of the offered upcoming Mondays —
  // this guarantees it's a real, future Monday with a known term/holiday note.
  const option = upcomingMondays().find((m) => m.date === billingMonday);
  if (!isMonday(billingMonday) || !option) {
    return { ok: false, error: "Pick a valid upcoming Monday to start billing." };
  }
  const termLabel = option.note || null;

  try {
    const { url } = await createTutoringCheckoutSession({
      studentName,
      parentEmail,
      weeklyAmountCents,
      committedWeeks,
      billingMonday,
      termLabel,
    });
    revalidatePath("/admin/tutoring");
    return { ok: true, url, studentName };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not create the tutoring checkout link.",
    };
  }
}

async function getSubscriptionId(rowId: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from("tutoring_subscriptions")
    .select("stripe_subscription_id")
    .eq("id", rowId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data?.stripe_subscription_id ?? null;
}

async function setStatus(rowId: string, status: string) {
  const { error } = await supabaseAdmin
    .from("tutoring_subscriptions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", rowId);
  if (error) throw new Error(error.message);
}

export async function pausePlanAction(formData: FormData) {
  await requireAdmin();
  const rowId = String(formData.get("rowId") ?? "");
  if (!rowId) throw new Error("Missing plan id.");
  const subId = await getSubscriptionId(rowId);
  if (subId) {
    await getStripe().subscriptions.update(subId, {
      pause_collection: { behavior: "void" },
    });
  }
  await setStatus(rowId, "paused");
  revalidatePath("/admin/tutoring");
}

export async function resumePlanAction(formData: FormData) {
  await requireAdmin();
  const rowId = String(formData.get("rowId") ?? "");
  if (!rowId) throw new Error("Missing plan id.");
  const subId = await getSubscriptionId(rowId);
  if (subId) {
    await getStripe().subscriptions.update(subId, { pause_collection: "" });
  }
  await setStatus(rowId, "active");
  revalidatePath("/admin/tutoring");
}

export async function cancelPlanAction(formData: FormData) {
  await requireAdmin();
  const rowId = String(formData.get("rowId") ?? "");
  if (!rowId) throw new Error("Missing plan id.");
  const subId = await getSubscriptionId(rowId);
  if (subId) {
    await getStripe().subscriptions.cancel(subId);
  }
  await setStatus(rowId, "canceled");
  revalidatePath("/admin/tutoring");
}

// Removes a plan that was never paid (link sent in error, parent never
// completed checkout). Only pending rows can be deleted.
export async function deletePendingPlanAction(formData: FormData) {
  await requireAdmin();
  const rowId = String(formData.get("rowId") ?? "");
  if (!rowId) throw new Error("Missing plan id.");
  const { error } = await supabaseAdmin
    .from("tutoring_subscriptions")
    .delete()
    .eq("id", rowId)
    .eq("status", "pending");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tutoring");
}
