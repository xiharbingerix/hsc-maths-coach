import type { PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { TrapezoidalRuleDiagram } from "../types";

type TrapVisual = {
  prompt: string;
  latex?: string;
  trapezoidalRuleDiagram: TrapezoidalRuleDiagram;
};

const xSquaredCurve = Array.from({ length: 33 }, (_, index) => {
  const x = index / 8;
  return { x, y: x * x };
});

const sqrtCurve = Array.from({ length: 33 }, (_, index) => {
  const x = index / 8;
  return { x, y: Math.sqrt(x) };
});

function diagram(
  description: string,
  xValues: number[],
  yValues: number[],
  options: Partial<TrapezoidalRuleDiagram> = {}
): TrapezoidalRuleDiagram {
  return {
    description,
    xValues,
    yValues,
    showOrdinateLabels: true,
    showTrapezoidLabels: true,
    ...options,
  };
}

const questionVisuals: Record<string, TrapVisual> = {
  "y11adv-intg-trap-g1": {
    prompt: "Using the two trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Two trapezoidal strips approximate the area under y = x squared from x = 0 to x = 2 using ordinates 0, 1 and 4.",
      [0, 1, 2], [0, 1, 4],
      { curvePoints: xSquaredCurve.filter((point) => point.x <= 2), functionLabel: "y = x^2" }
    ),
  },
  "y11adv-intg-trap-g2": {
    prompt: "The diagram shows trapezoidal chords above a concave-up curve. Which curve shape produces this overestimate?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "A concave-up curve y = x squared with two trapezoidal chords lying above the curve between x = 0 and x = 2.",
      [0, 1, 2], [0, 1, 4],
      { curvePoints: xSquaredCurve.filter((point) => point.x <= 2), functionLabel: "concave up" }
    ),
  },
  "y11adv-intg-trap-g3": {
    prompt: "Using the ordinates shown in the diagram, apply the trapezoidal rule.",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Two trapezoidal strips through the sampled points (0, 2), (1, 5) and (2, 6).",
      [0, 1, 2], [2, 5, 6], { functionLabel: "sampled values" }
    ),
  },
  "y11adv-intg-trap-g4": {
    prompt: "The diagram uses four narrow strips across the curve. Which change generally improves a trapezoidal approximation?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Four narrow trapezoidal strips approximate the concave-up curve y = x squared from x = 0 to x = 4.",
      [0, 1, 2, 3, 4], [0, 1, 4, 9, 16],
      { curvePoints: xSquaredCurve, functionLabel: "y = x^2" }
    ),
  },
  "y11adv-intg-trap-i1": {
    prompt: "Using the four trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Four trapezoidal strips approximate the area under y = square root of x from x = 0 to x = 4 using unit spacing.",
      [0, 1, 2, 3, 4], [0, 1, Math.sqrt(2), Math.sqrt(3), 2],
      { curvePoints: sqrtCurve, functionLabel: "y = sqrt{x}" }
    ),
  },
  "y11adv-intg-trap-i2": {
    prompt: "Using the sampled values shown, apply the trapezoidal rule.",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Three trapezoidal strips through the sampled points (1, 4), (2, 3), (3, 5) and (4, 2).",
      [1, 2, 3, 4], [4, 3, 5, 2], { functionLabel: "sampled values" }
    ),
  },
  "y11adv-intg-trap-i3": {
    prompt: "The diagram shows chords below a concave-down curve. What type of estimate does the trapezoidal rule give?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "A concave-down square-root curve with four trapezoidal chords lying below the curve from x = 0 to x = 4.",
      [0, 1, 2, 3, 4], [0, 1, Math.sqrt(2), Math.sqrt(3), 2],
      { curvePoints: sqrtCurve, functionLabel: "concave down" }
    ),
  },
  "y11adv-intg-trap-i4": {
    prompt: "Using the three trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width trapezoidal strips approximate the area under y = e to the x from x = 0 to x = 3.",
      [0, 1, 2, 3], [1, Math.E, Math.E ** 2, Math.E ** 3],
      {
        curvePoints: Array.from({ length: 25 }, (_, index) => {
          const x = index / 8;
          return { x, y: Math.exp(x) };
        }),
        functionLabel: "y = e^x",
      }
    ),
  },
  "y11adv-intg-trap-i5": {
    prompt: "The diagram labels the endpoint and interior ordinates for four strips. Which formula matches this weighting?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Four trapezoidal strips with endpoint ordinates y zero and y four used once, and interior ordinates y one, y two and y three shared by adjacent strips.",
      [0, 1, 2, 3, 4], [2, 5, 4, 6, 3],
      { ordinateLabels: ["y_0", "y_1", "y_2", "y_3", "y_4"], functionLabel: "n = 4" }
    ),
  },
  "y11adv-intg-trap-m1": {
    prompt: "Using the two trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Two trapezoidal strips approximate the area under y = x squared plus 1 from x = 0 to x = 2 using ordinates 1, 2 and 5.",
      [0, 1, 2], [1, 2, 5],
      {
        curvePoints: xSquaredCurve.filter((point) => point.x <= 2).map((point) => ({ x: point.x, y: point.y + 1 })),
        functionLabel: "y = x^2 + 1",
      }
    ),
  },
  "y11adv-intg-trap-m2": {
    prompt: "The diagram shows a curve approximated with four narrow strips. Which statement correctly describes trapezoidal-rule error?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Four narrow trapezoidal strips follow the concave-up curve y = x squared more closely than a small number of wide strips.",
      [0, 1, 2, 3, 4], [0, 1, 4, 9, 16],
      { curvePoints: xSquaredCurve, functionLabel: "y = x^2" }
    ),
  },
  "y11adv-intg-trap-m3": {
    prompt: "Using the sampled values shown, apply the trapezoidal rule.",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Four trapezoidal strips through the sampled points (0, 1), (1, 4), (2, 3), (3, 5) and (4, 2).",
      [0, 1, 2, 3, 4], [1, 4, 3, 5, 2], { functionLabel: "sampled values" }
    ),
  },
  "y11adv-intg-trap-m4": {
    prompt: "The diagram shows the top of each trapezoid between adjacent ordinates. What replaces the curve on each strip?",
    latex: "",
    trapezoidalRuleDiagram: diagram(
      "Three trapezoidal strips whose straight top edges are chords joining adjacent points on a visible concave-up curve.",
      [0, 1, 2, 3], [0, 1, 4, 9],
      { curvePoints: xSquaredCurve.filter((point) => point.x <= 3), functionLabel: "curve and chords" }
    ),
  },
  "y11adv-intg-trap-m6": {
    prompt: "Using the four trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Four unit-width trapezoidal strips for y = sin x from x = 0 to x = 4, including the final negative ordinate at x = 4.",
      [0, 1, 2, 3, 4], [0, Math.sin(1), Math.sin(2), Math.sin(3), Math.sin(4)],
      {
        curvePoints: Array.from({ length: 33 }, (_, index) => {
          const x = index / 8;
          return { x, y: Math.sin(x) };
        }),
        functionLabel: "y = sin x",
      }
    ),
  },
  "y11adv-intg-trap-m8": {
    prompt: "Using the three trapezoidal strips shown, approximate the integral.",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width trapezoidal strips for y = cos x from x = 0 to x = 3, with the curve crossing the x-axis between x = 1 and x = 2.",
      [0, 1, 2, 3], [1, Math.cos(1), Math.cos(2), Math.cos(3)],
      {
        curvePoints: Array.from({ length: 25 }, (_, index) => {
          const x = index / 8;
          return { x, y: Math.cos(x) };
        }),
        functionLabel: "y = cos x",
      }
    ),
  },
  "y11adv-intg-trap-qm1": {
    prompt: "Use the four displayed ordinates and three unit-width strips to calculate the trapezoidal estimate.",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width trapezoidal strips through the sampled points (0, 2), (1, 4), (2, 5) and (3, 3).",
      [0, 1, 2, 3], [2, 4, 5, 3],
      { functionLabel: "sampled values" }
    ),
  },
  "y11adv-intg-trap-qm2": {
    prompt: "The diagram labels endpoint and shared interior ordinates. Which correction gives the composite trapezoidal rule?",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width strips with endpoint ordinates y zero and y three used by one trapezoid, and interior ordinates y one and y two shared by two.",
      [0, 1, 2, 3], [1, 4, 3, 2],
      {
        ordinateLabels: ["y_0", "y_1", "y_2", "y_3"],
        functionLabel: "endpoint and interior weights",
      }
    ),
  },
  "y11adv-intg-trap-qm3": {
    prompt: "The three-strip trapezoidal estimate shown is 15. Determine the missing interior ordinate p.",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width strips with sampled ordinates 2, 5, p and 4; the unknown ordinate p is the second interior height.",
      [0, 1, 2, 3], [2, 5, 7, 4],
      {
        ordinateLabels: ["2", "5", "p", "4"],
        functionLabel: "T = 15",
      }
    ),
  },
  "y11adv-intg-trap-qm4": {
    prompt: "The displayed square-root curve is concave down. What does that imply about the trapezoidal estimate?",
    trapezoidalRuleDiagram: diagram(
      "Four trapezoidal chords lie below the concave-down square-root curve from x equals zero to x equals four.",
      [0, 1, 2, 3, 4], [0, 1, Math.sqrt(2), Math.sqrt(3), 2],
      {
        curvePoints: sqrtCurve,
        functionLabel: "y = sqrt{x}",
      }
    ),
  },
  "y11adv-intg-trap-qm5": {
    prompt: "For y=x squared on [0,4], compare the displayed four-strip estimate with the stated two-strip estimate. By what factor is the absolute error reduced?",
    trapezoidalRuleDiagram: diagram(
      "Four unit-width trapezoidal strips approximate the concave-up curve y equals x squared from zero to four.",
      [0, 1, 2, 3, 4], [0, 1, 4, 9, 16],
      {
        curvePoints: xSquaredCurve,
        functionLabel: "T_4 = 22; T_2 = 24",
      }
    ),
  },
  "y11adv-intg-trap-qm6": {
    prompt: "Investigate the displayed linear data: find the trapezoidal estimate and compare it with the exact integral of y=2x+1.",
    trapezoidalRuleDiagram: diagram(
      "Three unit-width trapezoids lie exactly on the straight line through (0, 1), (1, 3), (2, 5) and (3, 7).",
      [0, 1, 2, 3], [1, 3, 5, 7],
      {
        curvePoints: [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }],
        functionLabel: "y = 2x + 1",
      }
    ),
  },
  "y11adv-intg-trap-qm7": {
    prompt: "The displayed sample points are not equally spaced. Estimate the signed integral by calculating each trapezoid separately.",
    trapezoidalRuleDiagram: diagram(
      "Three trapezoids have unequal widths one, two and one through the points (0, 2), (1, 4), (3, 8) and (4, 6).",
      [0, 1, 3, 4], [2, 4, 8, 6],
      { functionLabel: "unequal spacing" }
    ),
  },
  "y11adv-intg-trap-qm8": {
    prompt: "Some displayed ordinates are negative. Which statement correctly estimates the signed integral?",
    trapezoidalRuleDiagram: diagram(
      "Two unit-width trapezoids use signed ordinates 2, negative 1 and negative 2, crossing the x-axis between the first two samples.",
      [0, 1, 2], [2, -1, -2],
      {
        curvePoints: [{ x: 0, y: 2 }, { x: 1, y: -1 }, { x: 2, y: -2 }],
        functionLabel: "signed ordinates",
      }
    ),
  },
  "y11adv-intg-trap-qm9": {
    prompt: "A vehicle's speed is sampled at the unequal times shown. Use trapezoids to estimate the distance travelled.",
    trapezoidalRuleDiagram: diagram(
      "A speed-time approximation with sample points (0, 0), (2, 6), (5, 10) and (7, 4), giving strip widths two, three and two seconds.",
      [0, 2, 5, 7], [0, 6, 10, 4],
      {
        xAxisLabel: "time (s)",
        yAxisLabel: "speed (m/s)",
        functionLabel: "sampled speed",
      }
    ),
  },
  "y11adv-intg-trap-qm10": {
    prompt: "The four-strip estimate shown is 20 and the missing interior ordinates satisfy b=a+2. Determine a and b.",
    trapezoidalRuleDiagram: diagram(
      "Four unit-width strips with ordinates 1, a, b, 7 and 5; a and b are the first two interior heights.",
      [0, 1, 2, 3, 4], [1, 4, 6, 7, 5],
      {
        ordinateLabels: ["1", "a", "b", "7", "5"],
        functionLabel: "T = 20",
      }
    ),
  },
};

const workedVisuals: TrapezoidalRuleDiagram[] = [
  diagram(
    "One trapezoidal strip under y = x squared from x = 0 to x = 2 with endpoint ordinates 0 and 4.",
    [0, 2], [0, 4],
    { curvePoints: xSquaredCurve.filter((point) => point.x <= 2), functionLabel: "y = x^2" }
  ),
  diagram(
    "Three trapezoidal strips approximate y = x squared from x = 0 to x = 3 using ordinates 0, 1, 4 and 9; the concave-up curve lies below the chords.",
    [0, 1, 2, 3], [0, 1, 4, 9],
    { curvePoints: xSquaredCurve.filter((point) => point.x <= 3), functionLabel: "y = x^2" }
  ),
  diagram(
    "Four trapezoidal strips through the sampled points (1, 3), (2, 5), (3, 4), (4, 6) and (5, 2).",
    [1, 2, 3, 4, 5], [3, 5, 4, 6, 2], { functionLabel: "sampled values" }
  ),
];

export function addTrapezoidalQuestionVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = questionVisuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

export function addTrapezoidalWorkedVisual(example: WorkedExample, index: number): WorkedExample {
  const trapezoidalRuleDiagram = workedVisuals[index];
  return trapezoidalRuleDiagram ? { ...example, trapezoidalRuleDiagram } : example;
}
