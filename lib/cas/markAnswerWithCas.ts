/**
 * Server-side tiered typed-answer marker: local fast-path, then CAS.
 *
 * Drop-in async replacement for `markTypedAnswer` on server paths (worksheet
 * grading). Runs the existing local marker first; only if it says "wrong" — and
 * the answer looks symbolic — does it ask the CAS service. CAS can only upgrade
 * wrong → right, never the reverse, so this never regresses marking.
 */
import { markTypedAnswer, type MarkTypedAnswerResult } from "../answerMarking";
import { casEquivalentToAny } from "./checkEquivalence";
import { looksSymbolic } from "./looksSymbolic";

export type CasMarkResult = MarkTypedAnswerResult & {
  /** Set when CAS made the call, e.g. "symbolic" | "numeric" | "antiderivative". */
  casMethod?: string;
};

export async function markAnswerWithCas(args: {
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
}): Promise<CasMarkResult> {
  const local = markTypedAnswer(args);
  if (local.correct) return local;

  const user = args.userAnswer?.trim();
  if (!user) return local;
  if (!looksSymbolic(args.userAnswer, args.correctAnswer)) return local;

  const verdict = await casEquivalentToAny({
    student: user,
    candidates: [args.correctAnswer, ...(args.acceptedAnswers ?? [])],
  });

  if (verdict.equivalent) {
    return { ...local, correct: true, matchedBy: "cas", casMethod: verdict.method };
  }
  return local;
}
