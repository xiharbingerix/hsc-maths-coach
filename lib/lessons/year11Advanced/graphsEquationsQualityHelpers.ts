import type { CartesianGraph } from "../types";
import {
  cubicGraph,
  quadraticGraph,
  richAnswer as answer,
  richChoice as choice,
  type CurveSketchingQualityQuestion,
} from "./curveSketchingQualityHelpers";

export { answer, choice, cubicGraph, quadraticGraph };

export type GraphsEquationsMasteryMap = Record<
  string,
  CurveSketchingQualityQuestion[]
>;

export function quadraticLineGraph(
  quadratic: { a: number; b: number; c: number; label: string },
  line: { m: number; b: number; label: string },
  options: {
    description: string;
    points?: CartesianGraph["points"];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  },
): CartesianGraph {
  return {
    description: options.description,
    xMin: options.xMin ?? -4,
    xMax: options.xMax ?? 4,
    yMin: options.yMin ?? -4,
    yMax: options.yMax ?? 8,
    showGrid: true,
    showAxisLabels: true,
    parabolas: [{ kind: "quadratic", ...quadratic }],
    lines: [{ kind: "linear", ...line }],
    points: options.points,
  };
}

export function cubicLineGraph(
  cubic: { a: number; b: number; c: number; d: number; label: string },
  line: { m: number; b: number; label: string },
  options: {
    description: string;
    points?: CartesianGraph["points"];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  },
): CartesianGraph {
  return {
    description: options.description,
    xMin: options.xMin ?? -3,
    xMax: options.xMax ?? 3,
    yMin: options.yMin ?? -4,
    yMax: options.yMax ?? 8,
    showGrid: true,
    showAxisLabels: true,
    curves: [{ kind: "cubic", ...cubic, color: "blue" }],
    lines: [{ kind: "linear", ...line }],
    points: options.points,
  };
}
