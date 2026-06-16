import { NextResponse } from "next/server";
import {
  casEquivalentToAny,
  type CasKind,
} from "../../../../lib/cas/checkEquivalence";

export const runtime = "nodejs";

type EquivBody = {
  student?: string;
  correctAnswer?: string;
  acceptedAnswers?: string[];
  kind?: CasKind;
};

// Browser-facing proxy to the CAS service. The lesson client already has the
// answer (lesson content ships to the client), so this exposes nothing new; it
// exists so the shared secret and service URL stay server-side.
export async function POST(request: Request) {
  let body: EquivBody;
  try {
    body = (await request.json()) as EquivBody;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const student = typeof body.student === "string" ? body.student : "";
  const correctAnswer =
    typeof body.correctAnswer === "string" ? body.correctAnswer : "";

  if (!student.trim() || !correctAnswer.trim()) {
    return NextResponse.json(
      { error: "student and correctAnswer are required." },
      { status: 400 }
    );
  }

  const accepted = Array.isArray(body.acceptedAnswers)
    ? body.acceptedAnswers.filter((a): a is string => typeof a === "string")
    : [];

  const verdict = await casEquivalentToAny({
    student,
    candidates: [correctAnswer, ...accepted],
    kind: body.kind,
  });

  return NextResponse.json(verdict);
}
