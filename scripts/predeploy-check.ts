import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

loadEnvConfig(process.cwd());

type Check = {
  name: string;
  ok: boolean;
  detail?: string;
};

type EnvRule = {
  name: string;
  shape: (value: string) => string | null;
};

const envRules: EnvRule[] = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    shape: (value) => {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "must be an http(s) URL";
        }
        return null;
      } catch {
        return "must be a valid URL";
      }
    },
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    shape: (value) =>
      value.startsWith("sb_secret_") || value.split(".").length === 3
        ? null
        : "must look like a Supabase secret key or service-role JWT",
  },
  {
    name: "STRIPE_SECRET_KEY",
    shape: (value) =>
      value.startsWith("sk_live_")
        ? null
        : "must start with sk_live_ for production deploys",
  },
  {
    name: "STRIPE_WEBHOOK_SECRET",
    shape: (value) =>
      value.startsWith("whsec_") ? null : "must start with whsec_",
  },
  {
    name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    shape: (value) =>
      value.startsWith("pk_live_")
        ? null
        : "must start with pk_live_ for production deploys",
  },
];

const requiredMigrationNumbers = [
  "012",
  "013",
  "014",
  "015",
  "016",
  "017",
  "018",
  "019",
];

const schemaChecks = [
  {
    name: "table analytics_events",
    table: "analytics_events",
    select: "id",
  },
  {
    name: "table student_subtopic_mastery",
    table: "student_subtopic_mastery",
    select: "id",
  },
  {
    name: "column question_flags.reviewed_at",
    table: "question_flags",
    select: "reviewed_at",
  },
  {
    name: "column question_flags.reviewed_by",
    table: "question_flags",
    select: "reviewed_by",
  },
  {
    name: "column profiles.selected_course_slug",
    table: "profiles",
    select: "selected_course_slug",
  },
  {
    name: "table saved_lesson_plans",
    table: "saved_lesson_plans",
    select: "id",
  },
];

function getEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function formatStatus(ok: boolean) {
  return ok ? "PASS" : "FAIL";
}

function printSection(title: string, checks: Check[]) {
  console.log(`\n${title}`);

  for (const check of checks) {
    const detail = check.detail ? ` - ${check.detail}` : "";
    console.log(`  ${formatStatus(check.ok)} ${check.name}${detail}`);
  }
}

function validateEnv() {
  const checks: Check[] = [];

  for (const rule of envRules) {
    const value = getEnv(rule.name);

    if (!value) {
      checks.push({
        name: rule.name,
        ok: false,
        detail: "missing",
      });
      continue;
    }

    const shapeError = rule.shape(value);
    checks.push({
      name: rule.name,
      ok: shapeError === null,
      detail: shapeError ?? "set",
    });
  }

  return checks;
}

function getWarnings() {
  const warnings: string[] = [];
  const stripeSecretKey = getEnv("STRIPE_SECRET_KEY");
  const stripePublishableKey = getEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");

  if (stripeSecretKey.startsWith("mk_") || stripeSecretKey.startsWith("pk_")) {
    warnings.push(
      "STRIPE_SECRET_KEY appears to be a monitoring or publishable key, not a secret key."
    );
  }

  const secretMode = stripeSecretKey.startsWith("sk_live_")
    ? "live"
    : stripeSecretKey.startsWith("sk_test_")
      ? "test"
      : "unknown";
  const publishableMode = stripePublishableKey.startsWith("pk_live_")
    ? "live"
    : stripePublishableKey.startsWith("pk_test_")
      ? "test"
      : "unknown";

  if (
    secretMode !== "unknown" &&
    publishableMode !== "unknown" &&
    secretMode !== publishableMode
  ) {
    warnings.push(
      `Stripe key mode mismatch is likely: STRIPE_SECRET_KEY is ${secretMode}, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is ${publishableMode}.`
    );
  }

  return warnings;
}

function checkMigrationFiles() {
  const migrationDirectory = path.join(process.cwd(), "lib", "supabase-migrations");
  const migrationFiles = existsSync(migrationDirectory)
    ? readdirSync(migrationDirectory)
    : [];

  return requiredMigrationNumbers.map((migrationNumber) => {
    const hasMigration = migrationFiles.some((file) =>
      file.startsWith(`${migrationNumber}_`)
    );

    return {
      name: `migration ${migrationNumber}`,
      ok: hasMigration,
      detail: hasMigration ? "present locally" : "missing from lib/supabase-migrations",
    };
  });
}

async function checkSupabaseSchema() {
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return schemaChecks.map((check) => ({
      name: check.name,
      ok: false,
      detail: "skipped because Supabase credentials are missing",
    }));
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const checks: Check[] = [];

  for (const check of schemaChecks) {
    const { error } = await supabase
      .from(check.table)
      .select(check.select, { head: true })
      .limit(0);

    checks.push({
      name: check.name,
      ok: error === null,
      detail: error === null ? "available" : error.message,
    });
  }

  return checks;
}

async function main() {
  console.log("Nova Maths pre-deploy check");
  console.log("Mode: read-only; no data writes are performed.");

  const envChecks = validateEnv();
  const warnings = getWarnings();
  const migrationChecks = checkMigrationFiles();
  const schemaResults = await checkSupabaseSchema();
  const allChecks = [...envChecks, ...migrationChecks, ...schemaResults];
  const failedChecks = allChecks.filter((check) => !check.ok);

  printSection("Environment", envChecks);

  if (warnings.length > 0) {
    console.log("\nWarnings");
    for (const warning of warnings) {
      console.log(`  WARN ${warning}`);
    }
  }

  printSection("Required migration files", migrationChecks);
  printSection("Supabase schema", schemaResults);

  console.log("\nOperational reminders");
  console.log("  WARN Re-seed the question bank after migrations and deploy.");
  console.log("  WARN Daily review and subtopic worksheets require migration 015.");
  console.log("  WARN Saved lesson plans require migration 019.");

  if (failedChecks.length > 0) {
    console.error("\nFAIL: Pre-deploy checks failed.");
    console.error("Missing or invalid items:");
    for (const failedCheck of failedChecks) {
      const detail = failedCheck.detail ? ` - ${failedCheck.detail}` : "";
      console.error(`  - ${failedCheck.name}${detail}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("\nPASS: Required pre-deploy checks passed.");
}

main().catch((error: unknown) => {
  console.error("\nFAIL: Pre-deploy check crashed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
