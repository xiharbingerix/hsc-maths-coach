import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

type EnvironmentGroup = {
  title: string;
  description: string;
  variables: string[];
  failWhenMissing: boolean;
};

const environmentGroups: EnvironmentGroup[] = [
  {
    title: "Core app (required)",
    description: "Required for Supabase authentication and lesson progress.",
    variables: [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ],
    failWhenMissing: true,
  },
  {
    title: "Payments (required when Stripe checkout is enabled)",
    description: "Required for checkout, payment success lookup, and webhooks.",
    variables: [
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "NEXT_PUBLIC_SITE_URL",
      "STRIPE_PRICE_DIAGNOSTIC_REPORT",
      "STRIPE_PRICE_STUDY_PLAN",
      "STRIPE_PRICE_ONLINE_LEARNING_MONTHLY",
    ],
    failWhenMissing: false,
  },
  {
    title: "Admin (required when the admin dashboard is enabled)",
    description: "Required for admin authentication and server-side Supabase access.",
    variables: ["ADMIN_PASSWORD", "SUPABASE_SERVICE_ROLE_KEY"],
    failWhenMissing: false,
  },
  {
    title: "Optional analytics / marketing",
    description: "Optional GA4 measurement ID. Google Ads is configured in app code.",
    variables: ["NEXT_PUBLIC_GA_MEASUREMENT_ID"],
    failWhenMissing: false,
  },
];

function isSet(name: string) {
  return typeof process.env[name] === "string" && process.env[name]!.trim() !== "";
}

const missingCoreVariables: string[] = [];
const missingFeatureVariables: string[] = [];

console.log("Nova Maths environment check");

for (const group of environmentGroups) {
  console.log(`\n${group.title}`);
  console.log(group.description);

  for (const variable of group.variables) {
    const status = isSet(variable) ? "set" : "missing";
    console.log(`  ${variable}: ${status}`);

    if (status === "missing") {
      if (group.failWhenMissing) {
        missingCoreVariables.push(variable);
      } else {
        missingFeatureVariables.push(variable);
      }
    }
  }
}

console.log("\nPlatform note");
console.log("  VERCEL_URL: provided automatically by Vercel when deployed");

if (missingFeatureVariables.length > 0) {
  console.log(
    "\nWARNING: Some feature-specific or optional variables are missing. " +
      "Configure the relevant groups before enabling those features."
  );
}

if (missingCoreVariables.length > 0) {
  console.error(
    `\nFAIL: Missing required core environment variables: ${missingCoreVariables.join(
      ", "
    )}`
  );
  process.exitCode = 1;
} else {
  console.log("\nPASS: Required core environment variables are set.");
}
