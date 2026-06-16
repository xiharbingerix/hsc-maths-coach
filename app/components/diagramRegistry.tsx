"use client";

import type { ReactElement } from "react";
import type { DiagramType } from "../../lib/lessons/diagramRegistry";
import type {
  ArgandDiagram,
  BarChartDiagram,
  BoxPlotDiagram,
  CartesianGraph,
  DotPlotDiagram,
  HistogramDiagram,
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
  StemAndLeafDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TrigGraphDiagram,
  TwoWayTableDiagram,
  UnitCircleDiagram,
  Vector3DDiagram,
  VennDiagram,
} from "../../lib/lessons/types";
import { ArgandDiagramView } from "../course/components/ArgandDiagramView";
import { BoxPlotView } from "../course/components/BoxPlotView";
import { BarChartView } from "../course/components/BarChartView";
import { CartesianGraphView } from "../course/components/CartesianGraphView";
import { DotPlotView } from "../course/components/DotPlotView";
import { HistogramView } from "../course/components/HistogramView";
import { NetworkDiagramView } from "../course/components/NetworkDiagramView";
import { NormalDistributionView } from "../course/components/NormalDistributionView";
import { NumberLineView } from "../course/components/NumberLineView";
import { PieChartView } from "../course/components/PieChartView";
import { PlaneShapeView } from "../course/components/PlaneShapeView";
import { PolynomialCurveView } from "../course/components/PolynomialCurveView";
import { ProbabilityTreeView } from "../course/components/ProbabilityTreeView";
import { ScatterPlotView } from "../course/components/ScatterPlotView";
import { SectorView } from "../course/components/SectorView";
import { SlopeFieldView } from "../course/components/SlopeFieldView";
import { StemAndLeafView } from "../course/components/StemAndLeafView";
import { TrapezoidalRuleView } from "../course/components/TrapezoidalRuleView";
import { TriangleDiagramView } from "../course/components/TriangleDiagramView";
import { TrigGraphDiagramView } from "../course/components/TrigGraphDiagramView";
import { TwoWayTableView } from "../course/components/TwoWayTableView";
import { UnitCircleDiagramView } from "../course/components/UnitCircleDiagramView";
import { Vector3DDiagramView } from "../course/components/Vector3DDiagramView";
import { VennDiagramView } from "../course/components/VennDiagramView";

/** Renders a single raw diagram object (the payload without its `type` field). */
type DiagramComponent = (data: Record<string, unknown>) => ReactElement;

/**
 * Maps each registered {@link DiagramType} to its renderer. Typed as a total
 * `Record<DiagramType, …>`, so adding a payload to `DIAGRAM_SPECS` without a
 * renderer here is a compile error rather than a silently missing diagram.
 *
 * Diagram objects arrive either typed (from lesson content) or as opaque JSON
 * (from `questions.diagram_data`), so each entry casts through `unknown`.
 */
export const DIAGRAM_COMPONENTS: Record<DiagramType, DiagramComponent> = {
  cartesianGraph: (d) => <CartesianGraphView graph={d as unknown as CartesianGraph} />,
  unitCircleDiagram: (d) => <UnitCircleDiagramView diagram={d as unknown as UnitCircleDiagram} />,
  trigGraphDiagram: (d) => <TrigGraphDiagramView diagram={d as unknown as TrigGraphDiagram} />,
  argandDiagram: (d) => <ArgandDiagramView diagram={d as unknown as ArgandDiagram} />,
  vector3DDiagram: (d) => <Vector3DDiagramView diagram={d as unknown as Vector3DDiagram} />,
  triangleDiagram: (d) => <TriangleDiagramView diagram={d as unknown as TriangleDiagram} />,
  trapezoidalRuleDiagram: (d) => (
    <TrapezoidalRuleView diagram={d as unknown as TrapezoidalRuleDiagram} />
  ),
  boxPlotDiagram: (d) => <BoxPlotView diagram={d as unknown as BoxPlotDiagram} />,
  normalDistributionDiagram: (d) => (
    <NormalDistributionView diagram={d as unknown as NormalDistributionDiagram} />
  ),
  probabilityTreeDiagram: (d) => (
    <ProbabilityTreeView diagram={d as unknown as ProbabilityTreeDiagram} />
  ),
  twoWayTableDiagram: (d) => <TwoWayTableView diagram={d as unknown as TwoWayTableDiagram} />,
  vennDiagram: (d) => <VennDiagramView diagram={d as unknown as VennDiagram} />,
  networkDiagram: (d) => <NetworkDiagramView diagram={d as unknown as NetworkDiagram} />,
  polynomialCurveDiagram: (d) => (
    <PolynomialCurveView diagram={d as unknown as PolynomialCurveDiagram} />
  ),
  slopeFieldDiagram: (d) => <SlopeFieldView diagram={d as unknown as SlopeFieldDiagram} />,
  numberLineDiagram: (d) => <NumberLineView diagram={d as unknown as NumberLineDiagram} />,
  dotPlotDiagram: (d) => <DotPlotView diagram={d as unknown as DotPlotDiagram} />,
  stemAndLeafDiagram: (d) => (
    <StemAndLeafView diagram={d as unknown as StemAndLeafDiagram} />
  ),
  barChartDiagram: (d) => <BarChartView diagram={d as unknown as BarChartDiagram} />,
  histogramDiagram: (d) => <HistogramView diagram={d as unknown as HistogramDiagram} />,
  scatterPlotDiagram: (d) => <ScatterPlotView diagram={d as unknown as ScatterPlotDiagram} />,
  planeShapeDiagram: (d) => <PlaneShapeView diagram={d as unknown as PlaneShapeDiagram} />,
  sectorDiagram: (d) => <SectorView diagram={d as unknown as SectorDiagram} />,
  pieChartDiagram: (d) => <PieChartView diagram={d as unknown as PieChartDiagram} />,
};

/**
 * Render a serialized `diagram_data` object (`{ type, ...fields }`) read from the
 * database (worksheets, admin preview). Returns `null` for missing data or an
 * unrecognised `type`.
 */
export function renderDiagramData(
  data: Record<string, unknown> | null | undefined
): ReactElement | null {
  if (!data) return null;
  const { type, ...rest } = data;
  const render = DIAGRAM_COMPONENTS[type as DiagramType];
  return render ? render(rest) : null;
}
