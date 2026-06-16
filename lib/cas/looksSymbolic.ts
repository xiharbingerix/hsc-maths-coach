/**
 * Cheap gate deciding whether an answer is worth sending to the CAS service.
 *
 * The CAS tier only ever runs after the local marker (`markTypedAnswer`) has
 * already returned "wrong", so this just avoids a pointless network call for
 * plainly numeric answers — where a mismatch is a genuine mismatch the symbolic
 * layer cannot rescue (e.g. "12.5" vs "13"). Anything with a variable, an
 * operator, a fraction, a grouping, or a maths glyph is worth a CAS check.
 *
 * Pure and dependency-free so it can run on both client and server.
 */
export function looksSymbolic(...parts: Array<string | undefined | null>): boolean {
  const t = parts.filter(Boolean).join(" ");
  if (!t.trim()) return false;
  return (
    /[a-zA-Z]/.test(t) || // variable, function name, pi/sin/ln, "C"
    /[\\^=<>]/.test(t) || // LaTeX macro, power, relation
    t.includes("/") || // fraction
    t.includes("(") || // grouped expression
    /[√π≤≥∞]/.test(t) // maths glyphs
  );
}
