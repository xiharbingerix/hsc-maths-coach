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

export type CartesianFunction =
  | {
      functionType: "line";
      line: { m: number; b: number };
      quadratic?: never;
    }
  | {
      functionType: "quadratic";
      line?: never;
      quadratic: { a: number; b: number; c: number };
    };

export type ShadedRegionColor = "blue" | "green" | "red" | "amber";

export type CartesianShadedRegion =
  | (CartesianFunction & {
      kind: "under-function";
      xMin: number;
      xMax: number;
      baseline?: number;
      color?: ShadedRegionColor;
      description?: string;
    })
  | {
      kind: "between-functions";
      xMin: number;
      xMax: number;
      top: CartesianFunction;
      bottom: CartesianFunction;
      color?: ShadedRegionColor;
      description?: string;
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
  sinusoidals?: {
    kind: "sin" | "cos" | "tan";
    a: number;
    b: number;
    c: number;
    d: number;
    xMin?: number;
    xMax?: number;
    label?: string;
    description?: string;
  }[];
  shadedRegions?: CartesianShadedRegion[];
};

export type TrapezoidalRuleDiagram = {
  description: string;
  xValues: number[];
  yValues: number[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showOrdinateLabels?: boolean;
  showTrapezoidLabels?: boolean;
  functionLabel?: string;
};
