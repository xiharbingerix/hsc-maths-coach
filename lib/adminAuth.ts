import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "hsc_admin_token";

export function getAdminToken() {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("Missing ADMIN_PASSWORD");
  }

  return createHash("sha256").update(adminPassword).digest("hex");
}