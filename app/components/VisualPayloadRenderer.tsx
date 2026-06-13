"use client";

import type {
  ArgandDiagram,
  BoxPlotDiagram,
  CartesianGraph,
  NetworkDiagram,
  NormalDistributionDiagram,
  ProbabilityTreeDiagram,
  TrigGraphDiagram,
  TrapezoidalRuleDiagram,
  TriangleDiagram,
  TwoWayTableDiagram,
  UnitCircleDiagram,
  Vector3DDiagram,
  VennDiagram,
} from "../../lib/lessons/types";
import { ArgandDiagramView } from "../course/components/ArgandDiagramView";
import { CartesianGraphView } from "../course/components/CartesianGraphView";
import { TriangleDiagramView } from "../course/components/TriangleDiagramView";
import { BoxPlotView } from "../course/components/BoxPlotView";
import { TwoWayTableView } from "../course/components/TwoWayTableView";
import { NormalDistributionView } from "../course/components/NormalDistributionView";
import { ProbabilityTreeView } from "../course/components/ProbabilityTreeView";
import { VennDiagramView } from "../course/components/VennDiagramView";
import { NetworkDiagramView } from "../course/components/NetworkDiagramView";
import { TrapezoidalRuleView } from "../course/components/TrapezoidalRuleView";
import { Vector3DDiagramView } from "../course/components/Vector3DDiagramView";
import { UnitCircleDiagramView } from "../course/components/UnitCircleDiagramView";
import { TrigGraphDiagramView } from "../course/components/TrigGraphDiagramView";

interface Props {
  diagram?: NetworkDiagram;
  triangleDiagram?: TriangleDiagram;
  cartesianGraph?: CartesianGraph;
  unitCircleDiagram?: UnitCircleDiagram;
  trigGraphDiagram?: TrigGraphDiagram;
  argandDiagram?: ArgandDiagram;
  vector3DDiagram?: Vector3DDiagram;
  trapezoidalRuleDiagram?: TrapezoidalRuleDiagram;
  boxPlotDiagram?: BoxPlotDiagram;
  normalDistributionDiagram?: NormalDistributionDiagram;
  probabilityTreeDiagram?: ProbabilityTreeDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
  vennDiagram?: VennDiagram;
}

export function VisualPayloadRenderer({
  diagram,
  triangleDiagram,
  cartesianGraph,
  unitCircleDiagram,
  trigGraphDiagram,
  argandDiagram,
  vector3DDiagram,
  trapezoidalRuleDiagram,
  boxPlotDiagram,
  normalDistributionDiagram,
  probabilityTreeDiagram,
  twoWayTableDiagram,
  vennDiagram,
}: Props) {
  const hasAny =
    diagram ||
    triangleDiagram ||
    cartesianGraph ||
    unitCircleDiagram ||
    trigGraphDiagram ||
    argandDiagram ||
    vector3DDiagram ||
    trapezoidalRuleDiagram ||
    boxPlotDiagram ||
    normalDistributionDiagram ||
    probabilityTreeDiagram ||
    twoWayTableDiagram ||
    vennDiagram;

  if (!hasAny) return null;

  return (
    <div className="my-2 overflow-x-auto print:break-inside-avoid">
      {cartesianGraph && <CartesianGraphView graph={cartesianGraph} />}
      {unitCircleDiagram && <UnitCircleDiagramView diagram={unitCircleDiagram} />}
      {trigGraphDiagram && <TrigGraphDiagramView diagram={trigGraphDiagram} />}
      {argandDiagram && <ArgandDiagramView diagram={argandDiagram} />}
      {vector3DDiagram && <Vector3DDiagramView diagram={vector3DDiagram} />}
      {triangleDiagram && <TriangleDiagramView diagram={triangleDiagram} />}
      {boxPlotDiagram && <BoxPlotView diagram={boxPlotDiagram} />}
      {twoWayTableDiagram && <TwoWayTableView diagram={twoWayTableDiagram} />}
      {normalDistributionDiagram && (
        <NormalDistributionView diagram={normalDistributionDiagram} />
      )}
      {probabilityTreeDiagram && (
        <ProbabilityTreeView diagram={probabilityTreeDiagram} />
      )}
      {vennDiagram && <VennDiagramView diagram={vennDiagram} />}
      {diagram && <NetworkDiagramView diagram={diagram} />}
      {trapezoidalRuleDiagram && (
        <TrapezoidalRuleView diagram={trapezoidalRuleDiagram} />
      )}
    </div>
  );
}
