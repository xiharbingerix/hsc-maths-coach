/**
 * Server-side client for the CAS equivalence service (`cas-service/`).
 *
 * Tier 1 of the marking pipeline. Only ever called after the local marker says
 * "wrong"; its job is to confirm a mathematically-equivalent-but-differently-
 * written answer (`2(x+3)` = `2x+6`).
 *
 * Safety: every failure mode — service disabled, unreachable, slow, or a non-OK
 * response — resolves to `{ equivalent: false, method: "defer" }`, so the caller
 * keeps the local "wrong". This module can therefore never make marking worse.
 *
 * Do NOT import this from client components: it reads server-only env vars and
 * holds the shared secret. The browser reaches it via `/api/cas/equiv`.
 */

export type CasKind =
  | "expression"
  | "antiderivative"
  | "equation"
  | "set"
  | "inequality"
  | "interval";

export type CasVerdict = {
  equivalent: boolean;
  /** "symbolic" | "numeric" | "antiderivative" | … | "defer" | "disabled" */
  method: string;
  confidence?: string;
};

const DEFER: CasVerdict = { equivalent: false, method: "defer" };
const DEFAULT_TIMEOUT_MS = 2500;

function serviceUrl(): string | null {
  if (process.env.CAS_MARKING_ENABLED === "false") return null;
  const url = process.env.CAS_SERVICE_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

/** Check one (student, expected) pair for mathematical equivalence. */
export async function checkCasEquivalence(args: {
  student: string;
  expected: string;
  kind?: CasKind;
  timeoutMs?: number;
}): Promise<CasVerdict> {
  const base = serviceUrl();
  if (!base) return { equivalent: false, method: "disabled" };
  if (!args.student?.trim() || !args.expected?.trim()) return DEFER;

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    args.timeoutMs ?? DEFAULT_TIMEOUT_MS
  );
  const secret = process.env.CAS_SHARED_SECRET?.trim();

  try {
    const res = await fetch(`${base}/equiv`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-cas-secret": secret } : {}),
      },
      body: JSON.stringify({
        student: args.student,
        expected: args.expected,
        ...(args.kind ? { kind: args.kind } : {}),
      }),
      signal: controller.signal,
    });
    if (!res.ok) return DEFER;
    const data = (await res.json()) as Partial<CasVerdict>;
    return {
      equivalent: data.equivalent === true,
      method: typeof data.method === "string" ? data.method : "defer",
      confidence: data.confidence,
    };
  } catch {
    // Aborted, network error, bad JSON — never throw into a marking call.
    return DEFER;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Return the first equivalent verdict across the correct answer and any accepted
 * alternatives. Stops on the first match to bound network cost.
 */
export async function casEquivalentToAny(args: {
  student: string;
  candidates: Array<string | undefined | null>;
  kind?: CasKind;
  timeoutMs?: number;
}): Promise<CasVerdict> {
  if (!serviceUrl()) return { equivalent: false, method: "disabled" };
  const seen = new Set<string>();
  for (const expected of args.candidates) {
    const value = expected?.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    const verdict = await checkCasEquivalence({
      student: args.student,
      expected: value,
      kind: args.kind,
      timeoutMs: args.timeoutMs,
    });
    if (verdict.equivalent) return verdict;
  }
  return DEFER;
}
