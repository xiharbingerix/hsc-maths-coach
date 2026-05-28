export type UserAccessStatus = "active" | "pending" | "revoked" | "none";

export function normaliseUserAccessStatus(
  value: string | null | undefined
): UserAccessStatus {
  if (value === "active" || value === "pending" || value === "revoked") {
    return value;
  }

  return "none";
}

export function getUserAccessDashboardCopy(status: UserAccessStatus) {
  if (status === "active") {
    return {
      title: "Your online learning access is active",
      message:
        "You can continue with the available HSC Maths course units below.",
      badge: "Active",
    };
  }

  if (status === "revoked") {
    return {
      title: "Online learning access is not currently active",
      message:
        "This account does not currently have active online learning access. If this looks wrong, register interest again or reply to your HSC Maths Coach follow-up email.",
      badge: "Revoked",
    };
  }

  if (status === "pending") {
    return {
      title: "Online learning access is pending",
      message:
        "Your account has been created. Access is approved manually during early access.",
      badge: "Pending",
    };
  }

  return {
    title: "Online learning access is not set up yet",
    message:
      "Register interest or start the diagnostic so we can review the right next step for online learning access.",
    badge: "Not set up",
  };
}

export function getUserAccessTone(status: UserAccessStatus) {
  if (status === "active") {
    return "border-emerald-200 bg-emerald-50 text-emerald-900";
  }

  if (status === "revoked") {
    return "border-red-200 bg-red-50 text-red-800";
  }

  return "border-amber-200 bg-amber-50 text-amber-900";
}
