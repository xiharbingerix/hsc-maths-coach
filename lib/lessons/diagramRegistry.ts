import type {
  AngleFigureDiagram,
  ArgandDiagram,
  BarChartDiagram,
  BearingsDiagram,
  BoxPlotDiagram,
  CartesianGraph,
  DotPlotDiagram,
  HistogramDiagram,
  NetDiagram,
  NetworkDiagram,
  NormalDistributionDiagram,
  NumberLineDiagram,
  PieChartDiagram,
  PlaneShapeDiagram,
  PolynomialCurveDiagram,
  ProbabilityTreeDiagram,
  ScatterPlotDiagram,
  SectorDiagram,
  SlopeFieldDiagram,
  Solid3DDiagram,
  StemAndLeafDiagram,
  StepGraphDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TrigGraphDiagram,
  TwoWayTableDiagram,
  UnitCircleDiagram,
  Vector3DDiagram,
  VennDiagram,
} from "./types";

/**
 * Single source of truth for the diagram payloads Nova can render.
 *
 * - `type`  — the discriminator stored in `questions.diagram_data.type` and used
 *   by the serialized-data renderers (worksheets, admin worksheet preview).
 * - `field` — the property a diagram lives on in a `PracticeQuestion` /
 *   `WorkedExample` (note: `NetworkDiagram` historically uses the field `diagram`).
 *
 * Register a payload here exactly once. The seed extractor
 * ({@link extractDiagramData}), the lesson auditor, and the prop-based lesson
 * renderer ({@link VisualPayloadRenderer}) all derive their behaviour from this
 * list. The React component map in `app/components/diagramRegistry.tsx` is keyed
 * by {@link DiagramType}, so the build fails if a type is added here without a
 * matching renderer — which is what previously let `polynomialCurveDiagram` and
 * `slopeFieldDiagram` ship half-wired.
 */
export const DIAGRAM_SPECS = [
  { type: "cartesianGraph", field: "cartesianGraph" },
  { type: "unitCircleDiagram", field: "unitCircleDiagram" },
  { type: "trigGraphDiagram", field: "trigGraphDiagram" },
  { type: "argandDiagram", field: "argandDiagram" },
  { type: "vector3DDiagram", field: "vector3DDiagram" },
  { type: "triangleDiagram", field: "triangleDiagram" },
  { type: "trapezoidalRuleDiagram", field: "trapezoidalRuleDiagram" },
  { type: "boxPlotDiagram", field: "boxPlotDiagram" },
  { type: "normalDistributionDiagram", field: "normalDistributionDiagram" },
  { type: "probabilityTreeDiagram", field: "probabilityTreeDiagram" },
  { type: "twoWayTableDiagram", field: "twoWayTableDiagram" },
  { type: "vennDiagram", field: "vennDiagram" },
  { type: "networkDiagram", field: "diagram" },
  { type: "polynomialCurveDiagram", field: "polynomialCurveDiagram" },
  { type: "slopeFieldDiagram", field: "slopeFieldDiagram" },
  { type: "numberLineDiagram", field: "numberLineDiagram" },
  { type: "dotPlotDiagram", field: "dotPlotDiagram" },
  { type: "stemAndLeafDiagram", field: "stemAndLeafDiagram" },
  { type: "barChartDiagram", field: "barChartDiagram" },
  { type: "histogramDiagram", field: "histogramDiagram" },
  { type: "scatterPlotDiagram", field: "scatterPlotDiagram" },
  { type: "planeShapeDiagram", field: "planeShapeDiagram" },
  { type: "angleFigureDiagram", field: "angleFigureDiagram" },
  { type: "sectorDiagram", field: "sectorDiagram" },
  { type: "pieChartDiagram", field: "pieChartDiagram" },
  { type: "solid3DDiagram", field: "solid3DDiagram" },
  { type: "netDiagram", field: "netDiagram" },
  { type: "bearingsDiagram", field: "bearingsDiagram" },
  { type: "stepGraphDiagram", field: "stepGraphDiagram" },
] as const;

/** Serialized `diagram_data.type` discriminator for a registered payload. */
export type DiagramType = (typeof DIAGRAM_SPECS)[number]["type"];

/** Property name a diagram payload lives on in a question / worked example. */
export type DiagramField = (typeof DIAGRAM_SPECS)[number]["field"];

/**
 * The optional diagram fields any question or worked example can carry. Used as
 * the props for {@link VisualPayloadRenderer}; keep in sync with the diagram
 * fields on `PracticeQuestion` / `WorkedExample`.
 */
export type DiagramFields = {
  diagram?: NetworkDiagram;
  cartesianGraph?: CartesianGraph;
  unitCircleDiagram?: UnitCircleDiagram;
  trigGraphDiagram?: TrigGraphDiagram;
  argandDiagram?: ArgandDiagram;
  vector3DDiagram?: Vector3DDiagram;
  triangleDiagram?: TriangleDiagram;
  trapezoidalRuleDiagram?: TrapezoidalRuleDiagram;
  boxPlotDiagram?: BoxPlotDiagram;
  normalDistributionDiagram?: NormalDistributionDiagram;
  probabilityTreeDiagram?: ProbabilityTreeDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
  vennDiagram?: VennDiagram;
  polynomialCurveDiagram?: PolynomialCurveDiagram;
  slopeFieldDiagram?: SlopeFieldDiagram;
  numberLineDiagram?: NumberLineDiagram;
  dotPlotDiagram?: DotPlotDiagram;
  stemAndLeafDiagram?: StemAndLeafDiagram;
  barChartDiagram?: BarChartDiagram;
  histogramDiagram?: HistogramDiagram;
  scatterPlotDiagram?: ScatterPlotDiagram;
  planeShapeDiagram?: PlaneShapeDiagram;
  angleFigureDiagram?: AngleFigureDiagram;
  sectorDiagram?: SectorDiagram;
  pieChartDiagram?: PieChartDiagram;
  solid3DDiagram?: Solid3DDiagram;
  netDiagram?: NetDiagram;
  bearingsDiagram?: BearingsDiagram;
  stepGraphDiagram?: StepGraphDiagram;
};

/**
 * A multiple-choice option. Beyond its text, a choice may carry any diagram
 * payload (rendered beneath the text), so MCQ answers can be diagrams — e.g.
 * "which graph matches y = x²?" with four `cartesianGraph` options. Persisted
 * inside the `questions.choices` JSON column alongside `label`/`text`.
 */
export type Choice = {
  label: string;
  text: string;
} & DiagramFields;

/**
 * Serialise the first diagram present on a question / worked example into the
 * `{ type, ...fields }` shape stored in `questions.diagram_data`. Returns `null`
 * when the item carries no diagram payload.
 */
export function extractDiagramData(
  source: Partial<Record<DiagramField, unknown>>
): Record<string, unknown> | null {
  for (const spec of DIAGRAM_SPECS) {
    const value = source[spec.field];
    if (value) {
      return { type: spec.type, ...(value as Record<string, unknown>) };
    }
  }
  return null;
}

/**
 * Copy only the diagram fields from a source object (a choice, raw JSON, etc.),
 * dropping everything else. Used by the choice normalisers so MCQ option
 * diagrams survive the round-trip through `questions.choices`.
 */
export function pickDiagramFields(
  source: Partial<Record<DiagramField, unknown>>
): DiagramFields {
  const out: Record<string, unknown> = {};
  for (const spec of DIAGRAM_SPECS) {
    if (source[spec.field]) out[spec.field] = source[spec.field];
  }
  return out as DiagramFields;
}
