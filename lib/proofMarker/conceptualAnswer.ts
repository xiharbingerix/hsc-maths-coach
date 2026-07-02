/**
 * Decide whether a stored correct answer is a worded / conceptual answer that
 * the AI short-explanation marker should judge, as opposed to a numeric or
 * symbolic answer the local string/CAS matcher already handles.
 *
 * A worded answer contains a real word (3+ letters) and no maths (digits,
 * equals, caret, backslash, or braces). Examples that qualify: "the principal",
 * "strong positive linear association", "The savings account (compound
 * interest) — interest accumulates on the growing balance." Examples that do
 * not: "9903", "$1200", "y=2x+3", "\\tan 22^\\circ", "36\\pi".
 *
 * This gate only matters as a fallback AFTER local matching has already failed,
 * so it exists purely to avoid spending an AI call on answers that are genuinely
 * numeric/symbolic (where a failed match means the student is simply wrong).
 */
export function isWordedConceptualAnswer(answer: string): boolean {
  const value = answer.trim();
  if (!/[a-zA-Z]{3,}/.test(value)) return false;
  if (/[0-9=\\^_{}]/.test(value)) return false;
  return true;
}
