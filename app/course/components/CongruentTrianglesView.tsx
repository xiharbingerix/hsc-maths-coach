"use client";

import * as React from "react";
import type { CongruentTrianglesDiagram } from "../../../lib/lessons/types";
import { TrianglePairView } from "./TrianglePairView";

export function CongruentTrianglesView({
  diagram,
  className,
}: {
  diagram: CongruentTrianglesDiagram;
  className?: string;
}): React.ReactElement {
  return <TrianglePairView diagram={{ ...diagram, relationLabel: "congruent" }} className={className} />;
}
