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
        "You can continue with the active HSC Maths Advanced beta units below.",
      badge: "Active",
    };
  }

  if (status === "revoked") {
    return {
      title: "Online learning access is not currently active",
      message:
        "This account does not currently have active beta access. If this looks wrong, contact Joshua or register interest again.",
      badge: "Revoked",
    };
  }

  if (status === "pending") {
    return {
      title: "Beta access is pending",
      message:
        "Your account has been created. Beta access is currently approved manually while the product is being tested.",
      badge: "Pending",
    };
  }

  return {
    title: "Beta access is not set up yet",
    message:
      "This account does not have an online learning beta access row yet. Register interest, start the diagnostic, or contact Joshua if this looks wrong.",
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
