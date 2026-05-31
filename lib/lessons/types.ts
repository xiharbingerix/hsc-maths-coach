export type NetworkVertex = {
  id: string;
  label: string;
  x: number;
  y: number;
  highlighted?: boolean;
};

export type NetworkEdge = {
  from: string;
  to: string;
  weight?: number | string;
  directed?: boolean;
  highlighted?: boolean;
  dashed?: boolean;
};

export type NetworkDiagram = {
  description: string;
  vertices: NetworkVertex[];
  edges: NetworkEdge[];
  viewBox?: string;
  highlightedEdges?: [string, string][];
  highlightedVertices?: string[];
};

type TrianglePoint = {
  x: number;
  y: number;
};

type TriangleSideKey = "AB" | "BC" | "AC";

export type TriangleDiagram = {
  description: string;
  vertices: {
    A: TrianglePoint;
    B: TrianglePoint;
    C: TrianglePoint;
  };
  vertexLabels?: Partial<Record<"A" | "B" | "C", string>>;
  sideLabels?: Partial<Record<TriangleSideKey, string>>;
  angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
  rightAngleAt?: "A" | "B" | "C";
  highlightedSides?: TriangleSideKey[];
  viewBox?: string;
};

export type CartesianPoint = {
  x: number;
  y: number;
  label?: string;
};

export type CartesianGraph = {
  description: string;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xStep?: number;
  yStep?: number;
  showGrid?: boolean;
  showAxisLabels?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  points?: CartesianPoint[];
  lineSegments?: {
    from: CartesianPoint;
    to: CartesianPoint;
    label?: string;
  }[];
  lines?: {
    kind: "linear";
    m: number;
    b: number;
    label?: string;
    xMin?: number;
    xMax?: number;
  }[];
  parabolas?: {
    kind: "quadratic";
    a: number;
    b: number;
    c: number;
    label?: string;
    xMin?: number;
    xMax?: number;
  }[];
  circles?: {
    h: number;
    k: number;
    r: number;
    label?: string;
  }[];
};
