"use client";

import type { ReactElement } from "react";
import type { CircleGeometryDiagram } from "../../../lib/lessons/types";
import { GeometryFigureView } from "./GeometryFigureView";

export function CircleGeometryDiagramView({
  diagram,
  className,
}: {
  diagram: CircleGeometryDiagram;
  className?: string;
}): ReactElement {
  return <GeometryFigureView diagram={diagram} className={className} />;
}
