import type { PracticeQuestion } from "./lessons/differentialCalculus";

export type HintLevel = {
  label: string;
  text: string;
  /** True when this level reveals the complete worked solution including the answer. */
  isFinalReveal: boolean;
};

function splitExplanationSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by whitespace.
  // Lookbehind avoids splitting on LaTeX like \frac{1}{2}.
  return text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 3);
}

/**
 * Builds a progressive hint ladder from a question's existing fields.
 *
 * Level mapping:
 *  1 — question.hint (conceptual nudge, no answer)
 *  2 — explanation setup: all sentences except the last (partial working, no final answer)
 *  3 — full question.explanation (worked solution + answer, gated as final reveal)
 *
 * If explanation has only one sentence, levels 2 and 3 collapse into one final reveal.
 * If neither field exists, returns an empty array (no hint button rendered).
 */
export function buildHintLadder(question: PracticeQuestion): HintLevel[] {
  const levels: HintLevel[] = [];

  if (question.hint) {
    levels.push({ label: "Hint", text: question.hint, isFinalReveal: false });
  }

  if (question.explanation) {
    const sentences = splitExplanationSentences(question.explanation);

    if (sentences.length > 1) {
      const setupText = sentences.slice(0, -1).join(" ");
      // Only add as a separate level if it differs from the existing hint
      if (setupText !== question.hint) {
        levels.push({
          label: "Working steps",
          text: setupText,
          isFinalReveal: false,
        });
      }
    }

    levels.push({
      label: "Full solution",
      text: question.explanation,
      isFinalReveal: true,
    });
  }

  return levels;
}
