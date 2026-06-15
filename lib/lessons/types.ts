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

export type ArgandPoint = {
  re: number;
  im: number;
  label?: string;
};

export type ArgandDiagram = {
  description: string;
  realMin?: number;
  realMax?: number;
  imaginaryMin?: number;
  imaginaryMax?: number;
  realStep?: number;
  imaginaryStep?: number;
  points?: ArgandPoint[];
  vectorsFromOrigin?: {
    to: ArgandPoint;
    label?: string;
    dashed?: boolean;
  }[];
  segments?: {
    from: ArgandPoint;
    to: ArgandPoint;
    label?: string;
    dashed?: boolean;
  }[];
  showConjugates?: boolean;
  modulusCircles?: {
    radius: number;
    label?: string;
  }[];
};

export type Vector3DPoint = {
  x: number;
  y: number;
  z: number;
  label?: string;
};

export type Vector3DDiagram = {
  description: string;
  axisLength?: number;
  points?: Vector3DPoint[];
  vectors?: {
    from?: Vector3DPoint;
    to: Vector3DPoint;
    label?: string;
  }[];
  lines?: {
    point: Vector3DPoint;
    direction: Vector3DPoint;
    label?: string;
    tMin?: number;
    tMax?: number;
  }[];
};

export type UnitCirclePoint = {
  x: string;
  y: string;
  label?: string;
};

export type UnitCircleDiagram = {
  description: string;
  angleRadians?: string;
  angleDegrees?: string;
  terminalPoint?: UnitCirclePoint;
  quadrant?: 1 | 2 | 3 | 4 | "axis";
  referenceAngle?: string;
  showReferenceTriangle?: boolean;
  highlightRadius?: boolean;
  symmetryPoints?: UnitCirclePoint[];
  notes?: string[];
};

export type TrigGraphFunctionType = "sin" | "cos" | "tan";

export type TrigGraphPoint = {
  x: string;
  y: string;
  label?: string;
};

export type TrigGraphMarker = {
  x: string;
  label?: string;
};

export type TrigGraphDiagram = {
  description: string;
  functionType: TrigGraphFunctionType;
  equationLabel?: string;
  xMin?: string;
  xMax?: string;
  yMin?: number;
  yMax?: number;
  keyPoints?: TrigGraphPoint[];
  asymptotes?: TrigGraphMarker[];
  periodMarkers?: TrigGraphMarker[];
  notes?: string[];
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

export type BoxPlotDiagram = {
  description: string;
  plots: {
    label: string;
    min?: number;
    q1: number;
    median: number;
    q3: number;
    max?: number;
    lowerWhisker?: number;
    upperWhisker?: number;
    outliers?: number[];
  }[];
  axisLabel?: string;
  xMin?: number;
  xMax?: number;
  showValueLabels?: boolean;
};

export type NormalDistributionDiagram = {
  description: string;
  mean: number;
  standardDeviation: number;
  axisLabel?: string;
  xMin?: number;
  xMax?: number;
  showStandardDeviationLabels?: boolean;
  shadedBands?: {
    standardDeviations: 1 | 2 | 3;
    label?: string;
    color?: "blue" | "green" | "amber";
  }[];
  markers?: {
    value: number;
    label?: string;
    zScore?: number;
  }[];
};

export type VennDiagram = {
  description: string;
  setALabel: string;
  setBLabel: string;
  aOnly?: number | string;
  intersection?: number | string;
  bOnly?: number | string;
  neither?: number | string;
  total?: number | string;
  showCounts?: boolean;
};

export type TwoWayTableDiagram = {
  description: string;
  rowLabels: string[];
  columnLabels: string[];
  values: (number | string)[][];
  rowTotals?: (number | string)[];
  columnTotals?: (number | string)[];
  grandTotal?: number | string;
  highlight?: {
    kind: "cell" | "row" | "column" | "row-total" | "column-total" | "grand-total";
    rowIndex?: number;
    columnIndex?: number;
    label?: string;
  };
};

export type ProbabilityTreeBranch = {
  id: string;
  label: string;
  probability?: string;
  children?: ProbabilityTreeBranch[];
};

export type ProbabilityTreeDiagram = {
  description: string;
  rootLabel?: string;
  stages?: string[];
  branches: ProbabilityTreeBranch[];
  highlightedPaths?: string[][];
};

export type PolynomialRoot = {
  value: number;
  multiplicity: 1 | 2 | 3 | 4;
};

export type PolynomialCurveDiagram = {
  description: string;
  /** P(x) = leadingCoefficient * ∏(x − root.value)^root.multiplicity */
  roots: PolynomialRoot[];
  leadingCoefficient?: number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xStep?: number;
  yStep?: number;
  label?: string;
};
