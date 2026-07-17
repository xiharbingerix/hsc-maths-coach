"use client";

import type { ReactElement } from "react";
import type { TrianglePairDiagram } from "../../../lib/lessons/types";
import { mathLabel } from "./plotUtils";
import { TriangleDiagramView } from "./TriangleDiagramView";

export function TrianglePairView({
  diagram,
  className,
}: {
  diagram: TrianglePairDiagram;
  className?: string;
}): ReactElement {
  return (
    <div
      role="group"
      aria-label={diagram.description}
      className={`my-3 overflow-x-auto ${className ?? ""}`}
    >
      <div className="grid min-w-[320px] grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <figure className="min-w-0">
          <TriangleDiagramView diagram={diagram.left} className="my-0 [&>svg]:min-w-0" />
          {diagram.leftCaption ? (
            <figcaption className="text-center text-sm font-semibold text-slate-700">
              {diagram.leftCaption}
            </figcaption>
          ) : null}
        </figure>
        {diagram.relationLabel ? (
          <div className="text-center text-sm font-bold text-slate-600" aria-hidden="true">
            {mathLabel(diagram.relationLabel)}
          </div>
        ) : null}
        <figure className="min-w-0">
          <TriangleDiagramView diagram={diagram.right} className="my-0 [&>svg]:min-w-0" />
          {diagram.rightCaption ? (
            <figcaption className="text-center text-sm font-semibold text-slate-700">
              {diagram.rightCaption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </div>
  );
}
