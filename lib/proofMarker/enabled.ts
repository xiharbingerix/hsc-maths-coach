/**
 * Feature gate for the AI proof marker, kept in its own module (no SDK import) so
 * server code that only needs the flag — e.g. the topic-test assembler deciding
 * whether to include proof items — can check it without pulling in the Anthropic
 * client.
 *
 * On unless ANTHROPIC_API_KEY is set AND PROOF_MARKER_ENABLED === "true".
 */
export function proofMarkerEnabled(): boolean {
  return (
    Boolean(process.env.ANTHROPIC_API_KEY?.trim()) &&
    process.env.PROOF_MARKER_ENABLED === "true"
  );
}
