import type { CartesianGraph } from "./types";

export type Year9SimultaneousGraphVisual = {
  prompt: string;
  cartesianGraph: CartesianGraph;
};

type Line = { m: number; b: number; label: string };

function visual(
  prompt: string,
  first: Line,
  second: Line
): Year9SimultaneousGraphVisual {
  const parallel = first.m === second.m;
  const x = parallel ? null : (second.b - first.b) / (first.m - second.m);
  const y = x === null ? null : first.m * x + first.b;
  const xMax = x === null ? 6 : Math.max(6, Math.ceil(x + 2));
  const yMax = y === null ? 18 : Math.max(14, Math.ceil(y + 4));
  const relationship = parallel
    ? "The two lines are parallel and do not intersect."
    : `The two lines intersect at (${x}, ${y}).`;

  return {
    prompt,
    cartesianGraph: {
      description: `Cartesian graph of ${first.label} and ${second.label}. ${relationship}`,
      xMin: -1,
      xMax,
      yMin: -5,
      yMax,
      xStep: 1,
      yStep: 1,
      xAxisLabel: "x",
      yAxisLabel: "y",
      showGrid: true,
      lines: [
        { kind: "linear", m: first.m, b: first.b, label: first.label },
        { kind: "linear", m: second.m, b: second.b, label: second.label },
      ],
    },
  };
}

const line = (m: number, b: number, label: string): Line => ({ m, b, label });

const graphA = [line(1, 1, "y = x + 1"), line(2, -1, "y = 2x - 1")] as const;
const graphB = [line(2, 0, "y = 2x"), line(1, 3, "y = x + 3")] as const;
const graphC = [line(3, -2, "y = 3x - 2"), line(1, 4, "y = x + 4")] as const;
const graphD = [line(4, 0, "y = 4x"), line(2, 6, "y = 2x + 6")] as const;
const graphE = [line(2, 1, "y = 2x + 1"), line(2, 5, "y = 2x + 5")] as const;
const graphF = [line(-1, 5, "y = 5 - x"), line(1, 1, "y = x + 1")] as const;
const graphG = [line(3, 0, "y = 3x"), line(-1, 12, "y = 12 - x")] as const;
const graphH = [line(1, 0, "y = x"), line(-1, 8, "y = -x + 8")] as const;
const graphI = [line(2, -3, "y = 2x - 3"), line(1, 2, "y = x + 2")] as const;
const graphJ = [line(4, -1, "y = 4x - 1"), line(2, 5, "y = 2x + 5")] as const;
const graphK = [line(1, 4, "y = x + 4"), line(3, 0, "y = 3x")] as const;

const findX = "Use the graph to find the x-coordinate of the simultaneous solution.";
const findY = "Use the graph to find the y-coordinate of the simultaneous solution.";
const countSolutions = "Use the graph to determine how many simultaneous solutions the lines have.";

export const year9SimultaneousGraphVisuals: Record<
  string,
  Year9SimultaneousGraphVisual
> = {
  "y9-gs-p1": visual(findX, ...graphA),
  "y9-gs-p2": visual(findX, ...graphB),
  "y9-gs-p3": visual(findX, ...graphC),
  "y9-gs-p4": visual(findY, ...graphA),
  "y9-gs-p5": visual(findX, ...graphD),
  "y9-gs-p6": visual(countSolutions, ...graphE),
  "y9-gs-p7": visual(findX, ...graphF),
  "y9-gs-p8": visual(findX, ...graphG),
  "y9-gs-p9": visual(findX, ...graphH),
  "y9-gs-p10": visual(findY, ...graphI),
  "y9c-gs-1": visual(findX, ...graphA),
  "y9c-gs-2": visual(findX, ...graphB),
  "y9c-gs-3": visual(findX, ...graphC),
  "y9c-gs-4": visual(findY, ...graphA),
  "y9c-gs-5": visual(findX, ...graphD),
  "y9c-gs-6": visual(countSolutions, ...graphE),
  "y9c-gs-7": visual(findX, ...graphF),
  "y9c-gs-8": visual(findX, ...graphG),
  "y9c-gs-9": visual(findX, ...graphH),
  "y9c-gs-10": visual(findY, ...graphI),
  "y9c-gs-11": visual(findX, ...graphJ),
  "y9c-gs-12": visual(findX, ...graphK),
};
