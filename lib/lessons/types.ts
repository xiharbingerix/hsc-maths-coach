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

export type TrianglePoint = {
  x: number;
  y: number;
};

export type TriangleVertexKey = "A" | "B" | "C";
export type TriangleSideKey = "AB" | "BC" | "AC";

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
  /** Matching side marks: 1, 2 or 3 short ticks across the side. */
  sideTicks?: Partial<Record<TriangleSideKey, 1 | 2 | 3>>;
  /** Matching angle marks: 1, 2 or 3 concentric arcs at the vertex. */
  angleMarks?: Partial<Record<TriangleVertexKey, 1 | 2 | 3>>;
  rightAngleAt?: "A" | "B" | "C";
  highlightedSides?: TriangleSideKey[];
  viewBox?: string;
};

/** Two triangles displayed together with correspondence marks for congruence work. */
export type CongruentTrianglesDiagram = {
  description: string;
  left: TriangleDiagram;
  right: TriangleDiagram;
  leftCaption?: string;
  rightCaption?: string;
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

export type CartesianCurveColor =
  | "blue"
  | "violet"
  | "teal"
  | "pink"
  | "amber"
  | "green"
  | "red";

type CartesianCurveBase = {
  /** Restrict the plotted x-domain (intersected with the graph bounds). */
  xMin?: number;
  xMax?: number;
  label?: string;
  color?: CartesianCurveColor;
  dashed?: boolean;
};

/**
 * Non-polynomial / higher-order function families for the standard plane,
 * sampled and clipped by `CartesianGraphView`. Complements the dedicated
 * `lines`, `parabolas`, `circles` and `sinusoidals` fields.
 *
 * - exponential: y = a·base^(b(x − c)) + d   (base defaults to e)
 * - logarithmic: y = a·log_base(x − c) + d    (domain x > c; base defaults to e)
 * - reciprocal:  y = a/(x − h) + k            (asymptotes x = h, y = k)
 * - absolute:    y = a·|x − h| + k
 * - squareRoot:  y = a·√(x − h) + k           (domain x ≥ h)
 * - cubic:       y = a·x³ + b·x² + c·x + d
 */
export type CartesianCurve = CartesianCurveBase &
  (
    | { kind: "exponential"; a?: number; b?: number; c?: number; d?: number; base?: number }
    | { kind: "logarithmic"; a?: number; c?: number; d?: number; base?: number }
    | { kind: "reciprocal"; a?: number; h?: number; k?: number }
    | { kind: "absolute"; a?: number; h?: number; k?: number }
    | { kind: "squareRoot"; a?: number; h?: number; k?: number }
    | { kind: "cubic"; a?: number; b?: number; c?: number; d?: number }
  );

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
  curves?: CartesianCurve[];
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

/** Discriminated union describing dy/dx = f(x, y) for slope-field diagrams */
export type SlopeFieldDE =
  | { kind: "linear"; a?: number; b?: number; c?: number }  // dy/dx = a·x + b·y + c
  | { kind: "x-squared"; k?: number };                      // dy/dx = k·x²

export type SlopeFieldDiagram = {
  description: string;
  de: SlopeFieldDE;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  /** Spacing between arrow centres (in data units, default 0.5) */
  gridSpacing?: number;
  /** Solution curves traced by RK4 from these initial conditions */
  solutionCurves?: Array<{ x0: number; y0: number; label?: string }>;
  /** Draws a dashed red horizontal line at this y value */
  equilibriumY?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
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

export type NumberLineColor = "blue" | "red" | "green" | "amber";

/** A single marked value on a number line (e.g. an integer, or an endpoint). */
export type NumberLinePoint = {
  value: number;
  /** Label drawn above the point; defaults to the value. Pass "" to hide. */
  label?: string;
  /** Open (hollow) circle for strict endpoints; closed (filled) by default. */
  open?: boolean;
  color?: NumberLineColor;
};

/**
 * A shaded ray or segment, used for inequalities and intervals. Use the string
 * sentinels for unbounded ends, which render as an arrow to the axis edge:
 * `x > 4` → `{ from: 4, to: "inf", fromOpen: true }`;
 * `-2 ≤ x < 3` → `{ from: -2, to: 3, toOpen: true }`.
 */
export type NumberLineInterval = {
  from: number | "-inf";
  to: number | "inf";
  /** Open endpoint at `from` (strict). Ignored when `from` is "-inf". */
  fromOpen?: boolean;
  /** Open endpoint at `to` (strict). Ignored when `to` is "inf". */
  toOpen?: boolean;
  color?: NumberLineColor;
  label?: string;
};

export type NumberLineDiagram = {
  description: string;
  min: number;
  max: number;
  /** Tick spacing; defaults to 1. */
  step?: number;
  points?: NumberLinePoint[];
  intervals?: NumberLineInterval[];
  /** Axis label drawn at the right end (e.g. "x"). */
  axisLabel?: string;
};

/**
 * A dot plot: stacked dots above a number line. Supply either raw `values`
 * (the renderer tallies repeats) or pre-counted `counts`.
 */
export type DotPlotDiagram = {
  description: string;
  min: number;
  max: number;
  /** Tick spacing; defaults to 1. */
  step?: number;
  values?: number[];
  counts?: { value: number; count: number }[];
  axisLabel?: string;
};

export type StemAndLeafRow = {
  stem: number | string;
  /** Leaves for the (right-hand) group, e.g. [2, 3, 5] for 32, 33, 35. */
  leaves: number[];
  /** Left-hand group's leaves for a back-to-back plot (read outward from stem). */
  leftLeaves?: number[];
};

/**
 * A stem-and-leaf plot rendered as an aligned table. Provide `leftLeaves` on
 * rows and both labels for a back-to-back comparison of two datasets.
 */
export type StemAndLeafDiagram = {
  description: string;
  rows: StemAndLeafRow[];
  /** Reading key, e.g. "3 | 7 = 37". */
  keyText: string;
  /** Column heading for the left group (back-to-back only). */
  leftLabel?: string;
  /** Column heading for the right/only group. */
  rightLabel?: string;
};

export type StatChartColor = "blue" | "teal" | "violet" | "amber" | "green" | "red";

export type BarChartBar = {
  label: string;
  value: number;
  color?: StatChartColor;
};

/**
 * A column/bar graph for categorical data (bars separated by gaps). Use
 * `orientation: "horizontal"` for long category labels.
 */
export type BarChartDiagram = {
  description: string;
  bars: BarChartBar[];
  orientation?: "vertical" | "horizontal";
  /** Label for the numeric axis (e.g. "Frequency"). */
  valueAxisLabel?: string;
  /** Label for the category axis. */
  categoryAxisLabel?: string;
  valueMax?: number;
  valueStep?: number;
};

export type HistogramBin = {
  /** Class-interval label, e.g. "10–20" (or the midpoint). */
  label: string;
  frequency: number;
};

/**
 * A histogram for grouped continuous data (adjacent bars). Optionally overlay a
 * frequency polygon, or set `cumulative` to plot a cumulative-frequency
 * histogram — with the polygon overlay this gives an ogive.
 */
export type HistogramDiagram = {
  description: string;
  bins: HistogramBin[];
  axisLabel?: string;
  frequencyAxisLabel?: string;
  valueMax?: number;
  valueStep?: number;
  showFrequencyPolygon?: boolean;
  cumulative?: boolean;
};

export type PlaneShapeColor =
  | "blue"
  | "teal"
  | "violet"
  | "amber"
  | "green"
  | "red"
  | "none";

export type PlaneShapeVertex = {
  x: number;
  y: number;
  /** Vertex label (e.g. "A"), drawn just outside the shape. */
  label?: string;
  /** Interior-angle label (e.g. "60°" or "x"), drawn inside with an arc. */
  angleLabel?: string;
  /** Draw a right-angle square at this vertex. */
  rightAngle?: boolean;
};

/** Marks for the edge from vertex i to vertex i+1 (parallel array to vertices). */
export type PlaneShapeEdge = {
  label?: string;
  /** Equal-length tick marks (0–3). */
  ticks?: number;
  /** Parallel-marking chevrons (0–2). */
  arrows?: number;
};

/**
 * A polygon (triangle, quadrilateral, pentagon, composite/L-shape, …) given by
 * ordered vertices in natural coordinates (y-up; the renderer auto-fits and
 * flips). Supports side labels, interior-angle arcs, right-angle marks,
 * equal-length ticks and parallel chevrons — for area/perimeter and geometry.
 */
export type PlaneShapeDiagram = {
  description: string;
  vertices: PlaneShapeVertex[];
  edges?: PlaneShapeEdge[];
  fill?: PlaneShapeColor;
  showVertexDots?: boolean;
};

export type Solid3DKind =
  | "rectangularPrism"
  | "cube"
  | "cylinder"
  | "cone"
  | "squarePyramid"
  | "triangularPrism"
  | "sphere";

/**
 * A common 3D solid drawn in oblique projection with dashed hidden edges, for
 * volume / surface-area work. Only the labels relevant to `solid` are used.
 */
export type Solid3DDiagram = {
  description: string;
  solid: Solid3DKind;
  labels?: {
    length?: string;
    width?: string;
    height?: string;
    radius?: string;
    slant?: string;
    base?: string;
  };
  color?: StatChartColor;
};

export type BearingRay = {
  /** Bearing in degrees, clockwise from North (0–360). */
  bearing: number;
  /** Endpoint label (e.g. "B"). */
  label?: string;
  /** Relative ray length (0–1 of the available radius); defaults to 1. */
  length?: number;
  /** Draw the bearing arc from North to this ray, annotated with the value. */
  showAngle?: boolean;
};

/**
 * A compass/bearings diagram: rays from a common origin at true bearings
 * (clockwise from North), for navigation and bearing problems.
 */
export type BearingsDiagram = {
  description: string;
  originLabel?: string;
  rays: BearingRay[];
  color?: StatChartColor;
};

export type StepSegment = {
  xStart: number;
  xEnd: number;
  y: number;
  /** Filled dot at the left end (default true). */
  closedStart?: boolean;
  /** Filled dot at the right end (default false — open). */
  closedEnd?: boolean;
};

/**
 * A step graph (piecewise-constant function with open/closed endpoints), for
 * parking/postage tariffs, tax brackets and similar. Bounds default to the data.
 */
export type StepGraphDiagram = {
  description: string;
  segments: StepSegment[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xStep?: number;
  yStep?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

export type NetKind =
  | "cube"
  | "rectangularPrism"
  | "cylinder"
  | "cone"
  | "squarePyramid"
  | "triangularPrism";

/**
 * The 2D net (unfolded faces) of a solid, for surface-area work. Only the
 * labels relevant to `solid` are used.
 */
export type NetDiagram = {
  description: string;
  solid: NetKind;
  labels?: {
    length?: string;
    width?: string;
    height?: string;
    radius?: string;
    slant?: string;
    base?: string;
  };
  color?: StatChartColor;
};

/**
 * A circle sector (wedge) for arc-length / sector-area / radian problems. The
 * sector starts on the positive x-axis and sweeps anticlockwise by
 * `angleDegrees`.
 */
export type SectorDiagram = {
  description: string;
  angleDegrees: number;
  /** Label on a radius (e.g. "r" or "6 cm"). */
  radiusLabel?: string;
  /** Label inside the wedge near the centre (e.g. "60°" or "θ"). */
  angleLabel?: string;
  /** Label on the arc (e.g. "l" or the arc length). */
  arcLabel?: string;
  /** Faintly complete the circle to show the sector in context. */
  showFullCircle?: boolean;
  color?: StatChartColor;
};

export type PieSlice = {
  label: string;
  value: number;
  color?: StatChartColor;
};

/** A pie chart of categorical proportions; slice angles are value/total·360°. */
export type PieChartDiagram = {
  description: string;
  slices: PieSlice[];
  showPercentages?: boolean;
};

export type ScatterPoint = { x: number; y: number; label?: string };

/**
 * A scatter plot for bivariate data. `lineOfBestFit: "auto"` computes the
 * least-squares regression line from the points; pass `{ m, b }` to draw an
 * explicit line. Bounds default to the data range (with margin) when omitted.
 */
export type ScatterPlotDiagram = {
  description: string;
  points: ScatterPoint[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xStep?: number;
  yStep?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  lineOfBestFit?: "auto" | { m: number; b: number };
  /** Optional annotation, e.g. "r = 0.85". */
  correlationLabel?: string;
};
