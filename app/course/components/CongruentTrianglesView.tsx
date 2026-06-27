"use client";

import * as React from "react";
import type { CongruentTrianglesDiagram } from "../../../lib/lessons/types";
import { TriangleDiagramView } from "./TriangleDiagramView";

export function CongruentTrianglesView({
  diagram,
  className,
}: {
  diagram: CongruentTrianglesDiagram;
  className?: string;
}): React.ReactElement {
  return (
    <div
      role="group"
      aria-label={diagram.description}
      className={`my-3 overflow-x-auto ${className ?? ""}`}
    >
      <div className="grid min-w-[320px] grid-cols-1 gap-2 sm:grid-cols-2">
        <figure className="min-w-0">
          <TriangleDiagramView diagram={diagram.left} className="my-0" />
          {diagram.leftCaption ? (
            <figcaption className="text-center text-sm font-semibold text-slate-700">
              {diagram.leftCaption}
            </figcaption>
          ) : null}
        </figure>
        <figure className="min-w-0">
          <TriangleDiagramView diagram={diagram.right} className="my-0" />
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
