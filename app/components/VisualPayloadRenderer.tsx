"use client";

import { Fragment } from "react";
import type { DiagramFields } from "../../lib/lessons/diagramRegistry";
import { DIAGRAM_SPECS } from "../../lib/lessons/diagramRegistry";
import { DIAGRAM_COMPONENTS } from "./diagramRegistry";

/**
 * Renders whichever diagram payload(s) a question or worked example carries.
 * Accepts the diagram fields directly (extra, non-diagram props are ignored), so
 * call sites can spread the whole item: `<VisualPayloadRenderer {...question} />`.
 *
 * Dispatch is driven entirely by `DIAGRAM_SPECS`, so a newly registered payload
 * renders here automatically.
 */
export function VisualPayloadRenderer(props: DiagramFields) {
  const fields = props as unknown as Record<string, Record<string, unknown> | undefined>;

  const rendered = DIAGRAM_SPECS.flatMap((spec) => {
    const value = fields[spec.field];
    if (!value) return [];
    return [<Fragment key={spec.type}>{DIAGRAM_COMPONENTS[spec.type](value)}</Fragment>];
  });

  if (rendered.length === 0) return null;

  return (
    <div className="my-2 overflow-x-auto print:break-inside-avoid">{rendered}</div>
  );
}
