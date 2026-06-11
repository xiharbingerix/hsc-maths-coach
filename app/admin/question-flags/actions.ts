"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/adminSession";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const VALID_STATUSES = new Set(["open", "reviewed", "dismissed"]);

export async function updateFlagStatus(id: string, status: string) {
  await requireAdmin();

  if (!VALID_STATUSES.has(status)) {
    throw new Error("Invalid status");
  }

  const { error } = await supabaseAdmin
    .from("question_flags")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/question-flags");
}
