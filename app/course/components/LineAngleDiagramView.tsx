"use client";

import type { ReactElement } from "react";
import type { LineAngleDiagram } from "../../../lib/lessons/types";
import { GeometryFigureView } from "./GeometryFigureView";

export function LineAngleDiagramView({
  diagram,
  className,
}: {
  diagram: LineAngleDiagram;
  className?: string;
}): ReactElement {
  return <GeometryFigureView diagram={diagram} className={className} />;
}
