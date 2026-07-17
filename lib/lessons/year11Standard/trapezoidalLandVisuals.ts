import type { PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { TrapezoidalRuleDiagram } from "../types";

type Visual = {
  prompt: string;
  latex?: string;
  trapezoidalRuleDiagram: TrapezoidalRuleDiagram;
};

function landDiagram(
  description: string,
  xValues: number[],
  yValues: number[],
  options: Partial<TrapezoidalRuleDiagram> = {}
): TrapezoidalRuleDiagram {
  return {
    description,
    xValues,
    yValues,
    xAxisLabel: "Baseline distance (m)",
    yAxisLabel: "Offset (m)",
    showOrdinateLabels: true,
    showTrapezoidLabels: true,
    ...options,
  };
}

const visuals: Record<string, Visual> = {
  "y11s-tra-g1": {
    prompt: "Use the two offsets shown to find the area of the single strip.", latex: "",
    trapezoidalRuleDiagram: landDiagram("A single land-survey strip 15 metres wide with endpoint offsets 6 metres and 10 metres.", [0, 15], [6, 10]),
  },
  "y11s-tra-g2": {
    prompt: "Use the equally spaced offsets shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Two land-survey strips at 8 metre intervals with offsets 0, 14 and 0 metres.", [0, 8, 16], [0, 14, 0]),
  },
  "y11s-tra-g3": {
    prompt: "The diagram labels the first, interior and last offsets. In the multi-strip rule, how are the first and last offsets weighted?", latex: "",
    trapezoidalRuleDiagram: landDiagram("Three equally spaced strips with endpoint offsets labelled d first and d last and two interior offsets.", [0, 10, 20, 30], [3, 8, 6, 4], { ordinateLabels: ["d_f", "d_2", "d_3", "d_l"] }),
  },
  "y11s-tra-i1": {
    prompt: "Use the two offsets shown to find the area of the single strip.", latex: "",
    trapezoidalRuleDiagram: landDiagram("A single land-survey strip 20 metres wide with offsets 5 metres and 9 metres.", [0, 20], [5, 9]),
  },
  "y11s-tra-i2": {
    prompt: "Use the four equally spaced strips shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Four land-survey strips at 12 metre intervals with offsets 0, 10, 16, 10 and 0 metres.", [0, 12, 24, 36, 48], [0, 10, 16, 10, 0]),
  },
  "y11s-tra-i3": {
    prompt: "Use the two equally spaced strips shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Two land-survey strips at 15 metre intervals with offsets 8, 12 and 10 metres.", [0, 15, 30], [8, 12, 10]),
  },
  "y11s-tra-i4": {
    prompt: "The curved boundary and its straight trapezoidal chords are shown. Why is the result an estimate rather than exact?", latex: "",
    trapezoidalRuleDiagram: landDiagram(
      "Two trapezoidal strips approximate a curved land boundary; the straight chords do not exactly follow the visible curve.",
      [0, 10, 20], [0, 12, 0],
      { curvePoints: Array.from({ length: 21 }, (_, x) => ({ x, y: 0.12 * x * (20 - x) })), functionLabel: "irregular boundary" }
    ),
  },
  "y11s-tra-m1": {
    prompt: "Use the offsets shown to find the single-strip area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("A single strip 10 metres wide with endpoint offsets 4 metres and 16 metres.", [0, 10], [4, 16]),
  },
  "y11s-tra-m2": {
    prompt: "Use the equally spaced offsets shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Two strips at 6 metre intervals with offsets 0, 18 and 0 metres.", [0, 6, 12], [0, 18, 0]),
  },
  "y11s-tra-m3": {
    prompt: "Inspect the positions of the offsets in the diagram. What spacing condition does the standard multi-strip rule require?", latex: "",
    trapezoidalRuleDiagram: landDiagram("Four vertical offsets positioned at equal 10 metre intervals along a survey baseline.", [0, 10, 20, 30], [2, 8, 7, 3]),
  },
  "y11s-tra-m4": {
    prompt: "Use the four equally spaced strips shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Four strips at 5 metre intervals with offsets 2, 8, 14, 8 and 2 metres.", [0, 5, 10, 15, 20], [2, 8, 14, 8, 2]),
  },
  "y11s-tra-m6": {
    prompt: "How many trapezoidal strips are formed by the five offsets shown?", latex: "",
    trapezoidalRuleDiagram: landDiagram("Five offsets of 0, 5, 10, 5 and 0 metres create four adjacent trapezoidal strips.", [0, 1, 2, 3, 4], [0, 5, 10, 5, 0]),
  },
  "y11s-tra-m7": {
    prompt: "Use the four equally spaced strips shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Four strips at 10 metre intervals with offsets 0, 6, 12, 6 and 0 metres.", [0, 10, 20, 30, 40], [0, 6, 12, 6, 0]),
  },
  "y11s-tra-m8": {
    prompt: "The diagram shows an irregular boundary sampled by perpendicular offsets. Why is the trapezoidal rule useful here?", latex: "",
    trapezoidalRuleDiagram: landDiagram(
      "An irregular land boundary sampled at four baseline positions, with straight trapezoidal chords approximating the curved edge.",
      [0, 10, 20, 30], [0, 8, 5, 0],
      { curvePoints: [{ x: 0, y: 0 }, { x: 4, y: 5 }, { x: 9, y: 8 }, { x: 15, y: 7 }, { x: 21, y: 5 }, { x: 26, y: 2 }, { x: 30, y: 0 }], functionLabel: "irregular boundary" }
    ),
  },
  "y11s-tra-m9": {
    prompt: "Use the two equally spaced strips shown to estimate the area.", latex: "",
    trapezoidalRuleDiagram: landDiagram("Two strips at 30 metre intervals with offsets 10, 20 and 10 metres.", [0, 30, 60], [10, 20, 10]),
  },
};

const workedVisuals = [
  landDiagram("A single survey strip 20 metres wide with endpoint offsets 12 metres and 18 metres.", [0, 20], [12, 18]),
  landDiagram("Three survey strips at 10 metre intervals with offsets 0, 8, 12 and 6 metres.", [0, 10, 20, 30], [0, 8, 12, 6]),
  landDiagram("Four survey strips at 40 metre intervals with offsets 0, 20, 30, 25 and 0 metres.", [0, 40, 80, 120, 160], [0, 20, 30, 25, 0]),
];

export function addTrapezoidalLandQuestionVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = visuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

export function addTrapezoidalLandWorkedVisual(example: WorkedExample, index: number): WorkedExample {
  const trapezoidalRuleDiagram = workedVisuals[index];
  return trapezoidalRuleDiagram ? { ...example, trapezoidalRuleDiagram } : example;
}
