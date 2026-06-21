import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import {
  markProofWithAi,
  proofMarkerEnabled,
  type ProofQuestion,
} from "../../../lib/proofMarker/markProofWithAi";
import { allowProofMarkRequest } from "../../../lib/proofMarker/rateLimit";

export const runtime = "nodejs";

type MarkProofBody = {
  question?: Partial<ProofQuestion>;
  answer?: unknown;
};

export async function POST(request: Request) {
  // Feature flag: off unless ANTHROPIC_API_KEY is set AND PROOF_MARKER_ENABLED=true.
  if (!proofMarkerEnabled()) {
    return NextResponse.json({ error: "Marking is unavailable." }, { status: 503 });
  }

  // Require a logged-in user (bounds abuse; ties usage to an account).
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Sign in to use this." }, { status: 401 });
  }
  let userId: string | null = null;
  try {
    const token = authorization.slice("Bearer ".length);
    const { data } = await supabaseAdmin.auth.getUser(token);
    userId = data.user?.id ?? null;
  } catch {
    userId = null;
  }
  if (!userId) {
    return NextResponse.json({ error: "Sign in to use this." }, { status: 401 });
  }

  if (!allowProofMarkRequest(userId)) {
    return NextResponse.json(
      { error: "You've used this a lot in a short time. Try again soon." },
      { status: 429 }
    );
  }

  let body: MarkProofBody;
  try {
    body = (await request.json()) as MarkProofBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const q = body.question ?? {};
  if (typeof q.prompt !== "string" || typeof q.modelSolution !== "string") {
    return NextResponse.json({ error: "Missing question content." }, { status: 400 });
  }
  if (typeof body.answer !== "string") {
    return NextResponse.json({ error: "Missing answer." }, { status: 400 });
  }

  const result = await markProofWithAi(
    {
      prompt: q.prompt,
      modelSolution: q.modelSolution,
      latex: typeof q.latex === "string" ? q.latex : undefined,
    },
    body.answer
  );

  // null = system couldn't mark (disabled/error) — distinct from a graded verdict.
  if (!result) {
    return NextResponse.json(
      { error: "Couldn't mark this right now." },
      { status: 502 }
    );
  }

  // Return ONLY the binary verdict. No model-generated text ever reaches the client.
  return NextResponse.json({ correct: result.correct });
}
