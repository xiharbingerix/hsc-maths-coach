import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import {
  generateTutorResponse,
  tutorEnabled,
  type TutorMode,
  type TutorQuestion,
} from "../../../lib/tutor/generateTutorResponse";
import { allowTutorRequest } from "../../../lib/tutor/rateLimit";

export const runtime = "nodejs";

type TutorBody = {
  mode?: string;
  question?: Partial<TutorQuestion>;
};

const MODES: TutorMode[] = ["rephrase", "steps"];

export async function POST(request: Request) {
  // Feature flag: off unless ANTHROPIC_API_KEY is set AND TUTOR_ENABLED=true.
  if (!tutorEnabled()) {
    return NextResponse.json({ error: "Tutor is unavailable." }, { status: 503 });
  }

  // Require a logged-in user (paid feature; also bounds abuse).
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

  if (!allowTutorRequest(userId)) {
    return NextResponse.json(
      { error: "You've used this a lot in a short time. Try again soon." },
      { status: 429 }
    );
  }

  let body: TutorBody;
  try {
    body = (await request.json()) as TutorBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const mode = body.mode as TutorMode;
  if (!MODES.includes(mode)) {
    return NextResponse.json({ error: "Unknown mode." }, { status: 400 });
  }

  const q = body.question ?? {};
  if (typeof q.prompt !== "string" || typeof q.explanation !== "string") {
    return NextResponse.json(
      { error: "Missing question content." },
      { status: 400 }
    );
  }

  const result = await generateTutorResponse(mode, {
    prompt: q.prompt,
    latex: typeof q.latex === "string" ? q.latex : undefined,
    answer: typeof q.answer === "string" ? q.answer : "",
    explanation: q.explanation,
    hint: typeof q.hint === "string" ? q.hint : undefined,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Couldn't generate help right now." },
      { status: 502 }
    );
  }

  return NextResponse.json(result);
}
