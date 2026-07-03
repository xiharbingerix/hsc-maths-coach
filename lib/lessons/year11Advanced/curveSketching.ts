import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { Choice } from "../diagramRegistry";
import type { CartesianGraph } from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

function sk(id: string, prompt: string, answer: string, choices: Choice[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

function cubicGraph(a: number, b: number, c: number, d: number, pts: { x: number; y: number; label?: string }[], opts: { xMin?: number; xMax?: number; yMin?: number; yMax?: number; color?: "blue" | "violet" | "teal" | "pink" | "amber" | "green" | "red" } = {}): CartesianGraph {
  return {
    description: "Cubic curve",
    xMin: opts.xMin ?? -3, xMax: opts.xMax ?? 3, yMin: opts.yMin ?? -6, yMax: opts.yMax ?? 6,
    showGrid: true,
    curves: [{ kind: "cubic", a, b, c, d, color: opts.color ?? "blue" }],
    points: pts,
  };
}

function quadGraph(a: number, b: number, c: number, pts: { x: number; y: number; label?: string }[], opts: { xMin?: number; xMax?: number; yMin?: number; yMax?: number } = {}): CartesianGraph {
  return {
    description: "Graph of f′(x)",
    xMin: opts.xMin ?? -4, xMax: opts.xMax ?? 4, yMin: opts.yMin ?? -6, yMax: opts.yMax ?? 6,
    showGrid: true,
    parabolas: [{ kind: "quadratic", a, b, c, label: "y = f′(x)" }],
    points: pts,
  };
}

// ─── L1: Stationary Points ────────────────────────────────────────────────────
// y = x³ − 3x: f′ = 3x²−3 = 0 at x=±1; f(−1)=2 (max), f(1)=−2 (min)
// y = 2x³−9x²+12x: f′=6x²−18x+12=6(x−1)(x−2); SPs at (1,5),(2,4)
// y = x³+3x²−9x: f′=3x²+6x−9=3(x+3)(x−1); SPs at (−3,27),(1,−5)

const spWorked: WorkedExample[] = [
  {
    title: "Find stationary points of y = x³ − 3x",
    questionLatex: "y = x^3 - 3x",
    steps: [
      { explanation: "Differentiate.", latex: "\\frac{dy}{dx} = 3x^2 - 3" },
      { explanation: "Set the derivative equal to zero.", latex: "3x^2 - 3 = 0 \\implies x^2 = 1 \\implies x = \\pm 1" },
      { explanation: "Substitute x = −1 to find y.", latex: "y = (-1)^3 - 3(-1) = -1 + 3 = 2" },
      { explanation: "Substitute x = 1 to find y.", latex: "y = 1 - 3 = -2" },
      { explanation: "State the stationary points.", latex: "(-1,\\,2)\\text{ and }(1,\\,-2)" },
    ],
    finalAnswerLatex: "\\text{Stationary points: }(-1,\\,2)\\text{ and }(1,\\,-2)",
  },
  {
    title: "Find where f(x) = x³ + 3x² − 9x is increasing",
    questionLatex: "f(x) = x^3 + 3x^2 - 9x",
    steps: [
      { explanation: "Find the derivative.", latex: "f'(x) = 3x^2 + 6x - 9 = 3(x^2 + 2x - 3) = 3(x+3)(x-1)" },
      { explanation: "The derivative is zero at x = −3 and x = 1. Draw a sign chart.", latex: "" },
      { explanation: "For x < −3: test x = −4: f′(−4) = 3(−1)(−5) = 15 > 0 → increasing.", latex: "" },
      { explanation: "For −3 < x < 1: test x = 0: f′(0) = 3(3)(−1) = −9 < 0 → decreasing.", latex: "" },
      { explanation: "For x > 1: test x = 2: f′(2) = 3(5)(1) = 15 > 0 → increasing.", latex: "" },
    ],
    finalAnswerLatex: "f\\text{ is increasing for }x < -3\\text{ and }x > 1",
  },
];

const spGuided: PracticeQuestion[] = [
  fa("y11adv-cs-sp-g1", "Find the x-values of the stationary points.", "f(x) = x^3 + 3x^2 - 9x", "x = −3 and x = 1", ["x = 1 and x = −3", "x=-3, x=1"]),
  sk("y11adv-cs-sp-g2", "Which sketch correctly represents y = x³ − 3x with stationary points marked?", "A",
    [
      { label: "A", text: "Local max (−1, 2), local min (1, −2)", ...cubicGraph(1,0,-3,0,[{x:-1,y:2,label:"max"},{x:1,y:-2,label:"min"}]) },
      { label: "B", text: "Max at (1, −2), min at (−1, 2) — classification swapped", ...cubicGraph(-1,0,3,0,[{x:-1,y:-2,label:"min"},{x:1,y:2,label:"max"}]) },
      { label: "C", text: "Stationary point only at origin (inflection)", ...cubicGraph(1,0,0,0,[{x:0,y:0,label:"inflection"}]) },
      { label: "D", text: "No stationary points — monotonically increasing", ...cubicGraph(1,0,1,0,[]) },
    ],
    "y = x³−3x has f′=3x²−3=0 at x=±1. At x=−1: y=2 (local max). At x=1: y=−2 (local min). The curve falls from (−1,2) to (1,−2) then rises."
  ),
  fa("y11adv-cs-sp-g3", "Find the interval(s) where f(x) = x³ + 3x² − 9x is decreasing.", "", "−3 < x < 1", ["-3 < x < 1", "(-3, 1)"]),
  mc("y11adv-cs-sp-g4", "How many stationary points does f(x) = x³ + x have?", "C",
    [{label:"A",text:"1"},{label:"B",text:"2"},{label:"C",text:"0"},{label:"D",text:"3"}],
    "f′(x) = 3x²+1 ≥ 1 > 0 for all x. The derivative is never zero, so there are no stationary points.", "f(x) = x^3 + x"),
];

const spIndep: PracticeQuestion[] = [
  fa("y11adv-cs-sp-i1", "Find the stationary points of y = x³ − 12x.", "y = x^3 - 12x", "(−2, 16) and (2, −16)", ["(2,-16) and (-2,16)", "x=±2"]),
  sk("y11adv-cs-sp-i2", "Which sketch correctly represents y = x³ − 12x?", "A",
    [
      { label: "A", text: "Local max (−2, 16), local min (2, −16)", ...cubicGraph(1,0,-12,0,[{x:-2,y:16,label:"max"},{x:2,y:-16,label:"min"}],{yMin:-20,yMax:20,xMin:-4,xMax:4}) },
      { label: "B", text: "Stationary points at (−2, −16) and (2, 16) — y-values wrong", ...cubicGraph(-1,0,12,0,[{x:-2,y:-16,label:"?"},{x:2,y:16,label:"?"}],{yMin:-20,yMax:20,xMin:-4,xMax:4}) },
      { label: "C", text: "Only one stationary point at origin", ...cubicGraph(1,0,0,0,[{x:0,y:0,label:"inflection"}],{yMin:-20,yMax:20,xMin:-4,xMax:4}) },
      { label: "D", text: "Stationary points at x = ±√12 ≈ ±3.46 — wrong positions", ...cubicGraph(1,0,-12,0,[{x:-3.46,y:0,label:"?"},{x:3.46,y:0,label:"?"}],{yMin:-20,yMax:20,xMin:-4,xMax:4}) },
    ],
    "f′=3x²−12=0 gives x=±2. f(−2)=−8+24=16, f(2)=8−24=−16. Sketch A correctly places max at (−2,16) and min at (2,−16)."
  ),
  fa("y11adv-cs-sp-i3", "Find the stationary points of f(x) = 3x² − x³.", "f(x) = 3x^2 - x^3", "(0, 0) and (2, 4)", ["x=0 and x=2", "(2,4) and (0,0)"]),
  mc("y11adv-cs-sp-i4", "If f′(a) = 0 but f′(x) > 0 for all x ≠ a near a, what type of point is x = a?", "C",
    [{label:"A",text:"Local maximum"},{label:"B",text:"Local minimum"},{label:"C",text:"Horizontal inflection"},{label:"D",text:"A local minimum if f″(a) > 0"}],
    "If f′ does not change sign at x = a, it is a horizontal inflection — the tangent is horizontal but the function does not turn around."),
  fa("y11adv-cs-sp-i5", "Find all values of x where y = −x³ + 6x² is stationary.", "y = -x^3 + 6x^2", "x = 0 and x = 4", ["x=4, x=0"]),
];

const spMastery: PracticeQuestion[] = [
  fa("y11adv-cs-sp-m1", "Find the x-values of the stationary points of y = x³ − 3x.", "y = x^3 - 3x", "x = −1 and x = 1", ["x=1 and x=-1"]),
  mc("y11adv-cs-sp-m2", "For y = x³, which statement is correct?", "B",
    [{label:"A",text:"No stationary points"},{label:"B",text:"One stationary point at the origin"},{label:"C",text:"Two stationary points"},{label:"D",text:"A local minimum at the origin"}],
    "f′=3x²=0 only at x=0. There is one stationary point. It is a horizontal inflection, not a local extremum, since f′ does not change sign there.", "y=x^3"),
  fa("y11adv-cs-sp-m3", "f(x) = x³ − 6x + 1. Find the x-coordinates where f has stationary points.", "f(x) = x^3 - 6x + 1", "x = −√2 and x = √2", ["x=±√2", "x = ±1.41"]),
  mc("y11adv-cs-sp-m4", "For f(x) = x³ + 3x² − 9x, the function is decreasing on:", "B",
    [{label:"A",text:"x < −3"},{label:"B",text:"−3 < x < 1"},{label:"C",text:"x > 1"},{label:"D",text:"x < 1"}],
    "f′=3(x+3)(x−1). The factor signs give f′ < 0 between the roots x=−3 and x=1. So f is decreasing on −3 < x < 1.", "f(x)=x^3+3x^2-9x"),
  fa("y11adv-cs-sp-m5", "Find the coordinates of the stationary points of y = 2x³ − 3x².", "y = 2x^3 - 3x^2", "(0, 0) and (1, −1)", ["(1,-1) and (0,0)"]),
  mc("y11adv-cs-sp-m6", "The gradient function f′(x) = (x−2)(x+1). On which interval is f increasing?", "D",
    [{label:"A",text:"−1 < x < 2"},{label:"B",text:"x < 2"},{label:"C",text:"x > −1"},{label:"D",text:"x < −1 or x > 2"}],
    "f′ > 0 when both factors are positive (x > 2) or both negative (x < −1). These are the increasing intervals."),
  sk("y11adv-cs-sp-m7", "Which sketch correctly shows stationary points of y = 2x³ − 3x²?", "B",
    [
      { label: "A", text: "Only one stationary point at (1, −1)", ...cubicGraph(2,-3,0,0,[{x:1,y:-1,label:"min"}]) },
      { label: "B", text: "Stationary points at (0, 0) and (1, −1)", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"SP"},{x:1,y:-1,label:"SP"}]) },
      { label: "C", text: "Stationary points at (0, 0) and (2, 4)", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"SP"},{x:2,y:4,label:"SP"}]) },
      { label: "D", text: "No stationary points", ...cubicGraph(2,0,0,0,[]) },
    ],
    "f′=6x²−6x=6x(x−1)=0 at x=0 and x=1. f(0)=0, f(1)=2−3=−1. Sketch B correctly marks both stationary points.", "y=2x^3-3x^2"),
  fa("y11adv-cs-sp-m8", "f(x) = x³ − 3x. Find the y-value at each stationary point.", "f(x) = x^3 - 3x", "f(−1) = 2 and f(1) = −2", ["y=2 and y=-2", "2 and -2"]),
];

// ─── L2: Classifying Stationary Points ────────────────────────────────────────

const clsWorked: WorkedExample[] = [
  {
    title: "Classify the stationary points of y = x³ − 3x using the second derivative",
    questionLatex: "y = x^3 - 3x",
    steps: [
      { explanation: "Stationary points are at x = −1 and x = 1 (found previously).", latex: "" },
      { explanation: "Find the second derivative.", latex: "\\frac{d^2y}{dx^2} = 6x" },
      { explanation: "At x = −1: f″(−1) = −6 < 0 → concave down → local maximum.", latex: "f''(-1) = -6 < 0 \\implies \\text{local max at } (-1,\\,2)" },
      { explanation: "At x = 1: f″(1) = 6 > 0 → concave up → local minimum.", latex: "f''(1) = 6 > 0 \\implies \\text{local min at } (1,\\,-2)" },
    ],
    finalAnswerLatex: "\\text{Local max at }(-1,2),\\quad \\text{local min at }(1,-2)",
  },
  {
    title: "Classify using the first derivative test (sign chart)",
    questionLatex: "f(x) = x^3 + 3x^2 - 9x,\\quad \\text{stationary points at }x=-3,\\;x=1",
    steps: [
      { explanation: "f′(x) = 3(x+3)(x−1). Check sign of f′ either side of each SP.", latex: "" },
      { explanation: "At x = −3: f′ changes from + (x<−3) to − (−3<x<1) → local maximum.", latex: "f'(-4) > 0,\\quad f'(0) < 0 \\implies \\text{local max at }(-3,\\,27)" },
      { explanation: "At x = 1: f′ changes from − to + → local minimum.", latex: "f'(0) < 0,\\quad f'(2) > 0 \\implies \\text{local min at }(1,\\,-5)" },
    ],
    finalAnswerLatex: "\\text{Local max at }(-3,27),\\quad\\text{local min at }(1,-5)",
  },
  {
    title: "Identify a horizontal inflection",
    questionLatex: "y = x^3,\\quad\\text{stationary point at }x=0",
    steps: [
      { explanation: "f′(x) = 3x². Set equal to zero: x = 0. f(0) = 0.", latex: "" },
      { explanation: "Apply the first derivative test.", latex: "f'(-1) = 3 > 0,\\quad f'(1) = 3 > 0" },
      { explanation: "f′ does not change sign — the function does not turn around.", latex: "\\text{Neither maximum nor minimum: horizontal inflection at }(0,0)" },
    ],
    finalAnswerLatex: "\\text{Horizontal inflection at }(0,\\,0)",
  },
];

const clsGuided: PracticeQuestion[] = [
  mc("y11adv-cs-cls-g1", "At a stationary point where f″ < 0, the function has a:", "A",
    [{label:"A",text:"Local maximum"},{label:"B",text:"Local minimum"},{label:"C",text:"Horizontal inflection"},{label:"D",text:"Vertical asymptote"}],
    "f″ < 0 means the graph is concave down at that point — like the top of a hill — so it is a local maximum."),
  sk("y11adv-cs-cls-g2", "Which sketch correctly classifies the stationary points of y = x³ − 3x?", "A",
    [
      { label: "A", text: "Local max at (−1, 2), local min at (1, −2)", ...cubicGraph(1,0,-3,0,[{x:-1,y:2,label:"local max"},{x:1,y:-2,label:"local min"}]) },
      { label: "B", text: "Local min at (−1, 2), local max at (1, −2) — classification reversed", ...cubicGraph(-1,0,3,0,[{x:-1,y:-2,label:"local min"},{x:1,y:2,label:"local max"}]) },
      { label: "C", text: "One horizontal inflection at origin", ...cubicGraph(1,0,0,0,[{x:0,y:0,label:"horiz. inflection"}]) },
      { label: "D", text: "Local max at (1, 2), local min at (−1, −2) — coordinates switched", ...cubicGraph(1,0,-3,0,[{x:1,y:2,label:"local max?"},{x:-1,y:-2,label:"local min?"}]) },
    ],
    "f″=6x. At x=−1: f″=−6<0 → local max; at x=1: f″=6>0 → local min. Values: f(−1)=2, f(1)=−2. Sketch A is correct."
  ),
  fa("y11adv-cs-cls-g3", "f(x) = x³ − 12x. Use the second derivative test to classify each stationary point.", "f(x) = x^3 - 12x", "local max at (−2, 16), local min at (2, −16)", ["(-2,16) local max and (2,-16) local min"]),
  mc("y11adv-cs-cls-g4", "For y = x³, the stationary point at the origin is a:", "C",
    [{label:"A",text:"Local maximum"},{label:"B",text:"Local minimum"},{label:"C",text:"Horizontal inflection"},{label:"D",text:"Global minimum"}],
    "f′=3x²≥0 everywhere and equals 0 only at x=0. The sign of f′ does not change, so the point is a horizontal inflection — not a local max or min.", "y=x^3"),
];

const clsIndep: PracticeQuestion[] = [
  fa("y11adv-cs-cls-i1", "Classify each stationary point of f(x) = 2x³ − 3x².", "f(x) = 2x^3 - 3x^2", "local max at (0, 0), local min at (1, −1)", ["(0,0) local max and (1,-1) local min"]),
  sk("y11adv-cs-cls-i2", "Which sketch correctly classifies the stationary points of y = 2x³ − 3x²?", "C",
    [
      { label: "A", text: "No stationary points — monotone curve", ...cubicGraph(2,0,0,0,[]) },
      { label: "B", text: "Horizontal inflection only at x = 0", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"inflection"}]) },
      { label: "C", text: "Local max at (0, 0), local min at (1, −1)", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"local max"},{x:1,y:-1,label:"local min"}]) },
      { label: "D", text: "Local min at (0, 0), local max at (1, −1) — reversed", ...cubicGraph(-2,3,0,0,[{x:0,y:0,label:"local min"},{x:1,y:1,label:"local max"}]) },
    ],
    "f′=6x²−6x=6x(x−1). f″=12x−6. At x=0: f″=−6<0 → local max, f(0)=0. At x=1: f″=6>0 → local min, f(1)=−1. Sketch C is correct.", "y=2x^3-3x^2"),
  mc("y11adv-cs-cls-i3", "The second derivative test is inconclusive (f″(a) = 0). You should:", "B",
    [{label:"A",text:"Conclude it is a horizontal inflection"},{label:"B",text:"Use the first derivative sign chart instead"},{label:"C",text:"Conclude it is a local minimum"},{label:"D",text:"Conclude the point does not exist"}],
    "When f″(a)=0, the test is inconclusive. Use the first derivative test — check whether f′ changes sign at x=a."),
  fa("y11adv-cs-cls-i4", "f(x) = x³ + 3x² − 9x. Classify each stationary point.", "f(x) = x^3 + 3x^2 - 9x", "local max at (−3, 27), local min at (1, −5)", ["(-3,27) local max, (1,-5) local min"]),
  fa("y11adv-cs-cls-i5", "Find and classify all stationary points of y = −x³ + 3x.", "y = -x^3 + 3x", "local max at (1, 2), local min at (−1, −2)", ["(1,2) local max and (-1,-2) local min"]),
];

const clsMastery: PracticeQuestion[] = [
  mc("y11adv-cs-cls-m1", "At a stationary point where f″ > 0, the curve is:", "B",
    [{label:"A",text:"Concave down — local maximum"},{label:"B",text:"Concave up — local minimum"},{label:"C",text:"Neither concave up nor down"},{label:"D",text:"A horizontal inflection"}],
    "f″>0 means concave up at that point — like the bottom of a bowl — so it is a local minimum."),
  fa("y11adv-cs-cls-m2", "y = x³ − 3x. State the y-value at the local maximum.", "y = x^3 - 3x", "2", ["y = 2", "f(-1) = 2"]),
  fa("y11adv-cs-cls-m3", "Classify the stationary point of y = x³ at the origin using the first derivative test.", "y = x^3", "horizontal inflection", ["neither max nor min", "inflection point"]),
  mc("y11adv-cs-cls-m4", "f(x) has a local minimum at x = 3. Which must be true?", "C",
    [{label:"A",text:"f(3) = 0"},{label:"B",text:"f″(3) < 0"},{label:"C",text:"f′(3) = 0"},{label:"D",text:"f(3) is the smallest value of f"}],
    "At a local min: f′(3)=0 (stationary point). f(3)=0 is not required. f″(3)<0 would be a max. f(3) need not be the global minimum."),
  sk("y11adv-cs-cls-m5", "Which sketch correctly shows a local max at (−1, 4) and local min at (1, 0) for a cubic?", "B",
    [
      { label: "A", text: "Local min at (−1, 4), local max at (1, 0)", ...cubicGraph(-1,0,3,4,[{x:-1,y:4,label:"local min"},{x:1,y:0,label:"local max"}]) },
      { label: "B", text: "Local max at (−1, 4), local min at (1, 0)", ...cubicGraph(1,0,-3,2,[{x:-1,y:4,label:"local max"},{x:1,y:0,label:"local min"}]) },
      { label: "C", text: "Both points are inflections", ...cubicGraph(1,0,0,2,[{x:-1,y:4,label:"inflection"},{x:1,y:0,label:"inflection"}]) },
      { label: "D", text: "Local max at (1, 0), local min at (−1, 4)", ...cubicGraph(1,0,-3,2,[{x:1,y:0,label:"local max"},{x:-1,y:4,label:"local min"}]) },
    ],
    "A cubic with a local max at (−1,4) then a local min at (1,0) rises to x=−1, falls to x=1, then rises — the standard decreasing-then-increasing S-shape."),
  fa("y11adv-cs-cls-m6", "y = x³ − 6x. Find and classify all stationary points.", "y = x^3 - 6x", "local max at (−√2, 4√2), local min at (√2, −4√2)", ["local max at x=−√2, local min at x=√2"]),
  mc("y11adv-cs-cls-m7", "Which condition guarantees a local maximum at x = a?", "D",
    [{label:"A",text:"f′(a) > 0"},{label:"B",text:"f″(a) > 0"},{label:"C",text:"f(a) > 0"},{label:"D",text:"f′(a) = 0 and f′ changes from + to −"}],
    "A local max requires f′(a)=0 (SP) and f′ changing from positive to negative across x=a (first derivative test)."),
  fa("y11adv-cs-cls-m8", "f(x) = −2x³ + 3x². Find the local maximum value of f.", "f(x) = -2x^3 + 3x^2", "1", ["f(1) = 1", "y = 1"]),
];

// ─── L3: Concavity and Inflection Points ──────────────────────────────────────

const conWorked: WorkedExample[] = [
  {
    title: "Find inflection point and concavity of y = x³ − 3x",
    questionLatex: "y = x^3 - 3x",
    steps: [
      { explanation: "Second derivative.", latex: "y'' = 6x" },
      { explanation: "Set y″ = 0 to find candidate inflection.", latex: "6x = 0 \\implies x = 0,\\quad y = 0" },
      { explanation: "Check sign change of y″.", latex: "y''(-1) = -6 < 0\\;(\\text{concave down}),\\quad y''(1) = 6 > 0\\;(\\text{concave up})" },
      { explanation: "Sign changes at x = 0, so (0, 0) is an inflection point.", latex: "\\text{Inflection point: }(0,\\,0)" },
    ],
    finalAnswerLatex: "\\text{Concave down for }x<0,\\text{ concave up for }x>0;\\text{ inflection at }(0,0)",
  },
  {
    title: "Find inflection point of y = 2x³ − 3x²",
    questionLatex: "y = 2x^3 - 3x^2",
    steps: [
      { explanation: "Second derivative.", latex: "y'' = 12x - 6" },
      { explanation: "Set y″ = 0.", latex: "12x - 6 = 0 \\implies x = \\tfrac{1}{2}" },
      { explanation: "Find y at x = 1/2.", latex: "y = 2(\\tfrac{1}{8}) - 3(\\tfrac{1}{4}) = \\tfrac{1}{4} - \\tfrac{3}{4} = -\\tfrac{1}{2}" },
      { explanation: "Check sign change: y″(0) = −6 < 0, y″(1) = 6 > 0. Sign changes ✓", latex: "\\text{Inflection point: }\\left(\\tfrac{1}{2},\\,-\\tfrac{1}{2}\\right)" },
    ],
    finalAnswerLatex: "\\text{Inflection point at }\\left(\\tfrac{1}{2},\\;-\\tfrac{1}{2}\\right)",
  },
];

const conGuided: PracticeQuestion[] = [
  mc("y11adv-cs-con-g1", "f″(x) > 0 on an interval means the curve is:", "B",
    [{label:"A",text:"Decreasing on that interval"},{label:"B",text:"Concave up on that interval"},{label:"C",text:"Concave down on that interval"},{label:"D",text:"At a local minimum on that interval"}],
    "f″>0 means the rate of change (gradient) is increasing — the curve bends upward like a bowl. This is concave up."),
  fa("y11adv-cs-con-g2", "Find the inflection point of y = x³ − 3x.", "y = x^3 - 3x", "(0, 0)", ["x=0, y=0", "origin"]),
  sk("y11adv-cs-con-g3", "Which sketch correctly shows concavity of y = x³ − 3x (concave down for x < 0, concave up for x > 0)?", "A",
    [
      { label: "A", text: "Standard cubic: concave down left, concave up right, inflection at origin", ...cubicGraph(1,0,-3,0,[{x:0,y:0,label:"inflection"},{x:-1,y:2,label:"max"},{x:1,y:-2,label:"min"}]) },
      { label: "B", text: "Reflected cubic: concave up left, concave down right", ...cubicGraph(-1,0,3,0,[{x:0,y:0,label:"inflection"},{x:-1,y:-2,label:"min"},{x:1,y:2,label:"max"}]) },
      { label: "C", text: "Parabola — only one concavity direction", ...cubicGraph(0,1,-3,0,[{x:1.5,y:-2.25,label:"min"}]) },
      { label: "D", text: "Cubic with inflection at x = 1, not x = 0", ...cubicGraph(1,0,-3,0,[{x:1,y:0,label:"inflection?"}]) },
    ],
    "y=x³−3x has y″=6x. Negative for x<0 (concave down) and positive for x>0 (concave up). Inflection at x=0 where y=0. Sketch A is correct."),
  fa("y11adv-cs-con-g4", "For what values of x is y = 2x³ − 3x² concave up?", "y = 2x^3 - 3x^2", "x > 1/2", ["x > 0.5", "x>½"]),
];

const conIndep: PracticeQuestion[] = [
  fa("y11adv-cs-con-i1", "Find the inflection point of y = 2x³ − 3x².", "y = 2x^3 - 3x^2", "(1/2, −1/2)", ["(0.5, -0.5)", "x=1/2, y=-1/2"]),
  mc("y11adv-cs-con-i2", "An inflection point occurs where:", "C",
    [{label:"A",text:"f′ = 0"},{label:"B",text:"f″ > 0"},{label:"C",text:"f″ changes sign"},{label:"D",text:"f = 0"}],
    "An inflection point is where the concavity changes — f″ changes from positive to negative or vice versa. f″=0 is necessary but not sufficient (the sign must actually change)."),
  fa("y11adv-cs-con-i3", "Find where y = x³ − 6x² + 9x is concave down.", "y = x^3 - 6x^2 + 9x", "x < 2", ["x<2"]),
  sk("y11adv-cs-con-i4", "Which sketch correctly shows y = 2x³ − 3x² with inflection at (1/2, −1/2)?", "B",
    [
      { label: "A", text: "Inflection marked at (0, 0) — wrong position", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"inflection?"}]) },
      { label: "B", text: "Inflection at (0.5, −0.5), max at (0, 0), min at (1, −1)", ...cubicGraph(2,-3,0,0,[{x:0.5,y:-0.5,label:"inflection"},{x:0,y:0,label:"max"},{x:1,y:-1,label:"min"}]) },
      { label: "C", text: "Inflection at (1, −1) — confused with the local min", ...cubicGraph(2,-3,0,0,[{x:1,y:-1,label:"inflection?"}]) },
      { label: "D", text: "No inflection — always concave up", ...cubicGraph(0,2,-3,0,[{x:0.75,y:-1.125,label:"min"}]) },
    ],
    "y″=12x−6=0 at x=0.5. f(0.5)=−0.5. y″ changes from negative to positive, confirming inflection. Sketch B is correct.", "y=2x^3-3x^2"),
  fa("y11adv-cs-con-i5", "f(x) = x³ − 6x² + 12x − 5. Find the inflection point.", "f(x) = x^3 - 6x^2 + 12x - 5", "(2, 3)", ["x=2, y=3"]),
];

const conMastery: PracticeQuestion[] = [
  mc("y11adv-cs-con-m1", "A curve has f″(x) = 6x − 12. Where is it concave up?", "C",
    [{label:"A",text:"x < 2"},{label:"B",text:"x < −2"},{label:"C",text:"x > 2"},{label:"D",text:"All x"}],
    "f″>0 when 6x−12>0, i.e. x>2. The curve is concave up for x>2."),
  fa("y11adv-cs-con-m2", "Find the inflection point of f(x) = x³ + 3x² + 3x + 1.", "f(x) = x^3 + 3x^2 + 3x + 1", "(−1, 0)", ["x=-1, y=0"]),
  mc("y11adv-cs-con-m3", "y = x³ − 3x has an inflection point at:", "A",
    [{label:"A",text:"(0, 0)"},{label:"B",text:"(−1, 2)"},{label:"C",text:"(1, −2)"},{label:"D",text:"(0, −3)"}],
    "y″=6x=0 at x=0. y(0)=0. Sign of y″ changes, confirming inflection at (0,0).", "y=x^3-3x"),
  fa("y11adv-cs-con-m4", "For f(x) = 2x³ − 9x² + 12x − 4, find the inflection point.", "f(x) = 2x^3 - 9x^2 + 12x - 4", "(3/2, 1/2)", ["(1.5, 0.5)", "x=3/2"]),
  mc("y11adv-cs-con-m5", "The point (2, 5) is an inflection of f. Which is NOT necessarily true?", "D",
    [{label:"A",text:"f″(2) = 0"},{label:"B",text:"Concavity changes at x = 2"},{label:"C",text:"f′(2) may or may not be zero"},{label:"D",text:"f′(2) = 0"}],
    "An inflection requires f″=0 (or undefined) with sign change. f′(2)=0 would make it a horizontal inflection — possible but not required. An inflection can occur where the tangent is not horizontal."),
  fa("y11adv-cs-con-m6", "Find all values of x where y = x³ − 3x + 2 is concave up.", "y = x^3 - 3x + 2", "x > 0", ["x>0"]),
  mc("y11adv-cs-con-m7", "A cubic y = ax³ + … has y″ = 6ax + b. The inflection point always occurs at:", "B",
    [{label:"A",text:"x = 0"},{label:"B",text:"x = −b/(6a)"},{label:"C",text:"x = b/(6a)"},{label:"D",text:"x = a/b"}],
    "y″=0 gives 6ax+b=0, so x=−b/(6a). For y=x³−3x: a=1, b=0, x=0; for y=2x³−3x²: a=2, b=−6, x=6/12=1/2."),
  fa("y11adv-cs-con-m8", "f(x) = −x³ + 6x². State the concavity for x > 4.", "f(x) = -x^3 + 6x^2", "concave down", ["concave downward"]),
];

// ─── L4: Systematic Curve Sketching ───────────────────────────────────────────
// Hierarchy: Domain → Intercepts → End behaviour → Stationary → Concavity → Sketch
// y = x³ − 3x + 2 = (x−1)²(x+2): x-ints at x=−2 (cross) and x=1 (touch); y-int (0,2); SP local max (−1,4), local min (1,0)

const scsWorked: WorkedExample[] = [
  {
    title: "Complete sketch of y = x³ − 3x + 2",
    questionLatex: "y = x^3 - 3x + 2",
    steps: [
      { explanation: "Domain: all real x (polynomial).", latex: "x \\in \\mathbb{R}" },
      { explanation: "y-intercept: set x=0.", latex: "y = 2 \\implies (0,\\,2)" },
      { explanation: "x-intercepts: solve x³−3x+2=0. Try x=1: 1−3+2=0 ✓. Factor.", latex: "(x-1)^2(x+2) = 0 \\implies x=1\\;(\\text{touch}),\\;x=-2\\;(\\text{cross})" },
      { explanation: "End behaviour (leading term x³).", latex: "x \\to -\\infty: y \\to -\\infty;\\quad x \\to +\\infty: y \\to +\\infty" },
      { explanation: "Stationary points: f′=3x²−3=0 → x=±1.", latex: "(-1,\\,4)\\text{ local max};\\quad(1,\\,0)\\text{ local min}" },
      { explanation: "Inflection: f″=6x=0 → x=0.", latex: "\\text{Inflection at }(0,\\,2)" },
    ],
    finalAnswerLatex: "\\text{Crosses }x\\text{-axis at }(-2,0),\\text{ touches at }(1,0);\\text{ max at }(-1,4);\\text{ inflection at }(0,2)",
  },
  {
    title: "Complete sketch of y = 2x³ − 3x²",
    questionLatex: "y = 2x^3 - 3x^2",
    steps: [
      { explanation: "y-intercept: (0, 0).", latex: "" },
      { explanation: "x-intercepts: 2x³−3x²=x²(2x−3)=0.", latex: "x=0\\;(\\text{touch}),\\;x=\\tfrac{3}{2}\\;(\\text{cross})" },
      { explanation: "End behaviour: as x→±∞, y→±∞.", latex: "" },
      { explanation: "Stationary: f′=6x²−6x=6x(x−1)=0 → x=0,1.", latex: "(0,0)\\text{ local max};\\quad(1,-1)\\text{ local min}" },
      { explanation: "Inflection: f″=12x−6=0 → x=1/2.", latex: "(\\tfrac{1}{2},\\,-\\tfrac{1}{2})\\text{ inflection}" },
    ],
    finalAnswerLatex: "\\text{x-ints: }0\\text{ (touch)},\\;\\tfrac{3}{2};\\text{ max }(0,0);\\text{ min }(1,-1);\\text{ inflection }(\\tfrac{1}{2},-\\tfrac{1}{2})",
  },
];

const scsGuided: PracticeQuestion[] = [
  fa("y11adv-cs-scs-g1", "For y = x³ − 3x + 2, find the x-intercepts.", "y = x^3 - 3x + 2", "x = −2 and x = 1 (double root)", ["x=-2, x=1", "crosses at -2, touches at 1"]),
  sk("y11adv-cs-scs-g2", "Which sketch correctly represents the complete curve y = x³ − 3x + 2?", "C",
    [
      { label: "A", text: "Correct shape but both x-intercepts are crossing roots", ...cubicGraph(1,0,-3,2,[{x:-2,y:0,label:"−2"},{x:1,y:0,label:"1"},{x:-1,y:4,label:"max"},{x:0,y:2,label:"inflection"}]) },
      { label: "B", text: "x-intercepts at wrong positions (at −1 and 2)", ...cubicGraph(1,0,-3,2,[{x:-1,y:0,label:"?"},{x:2,y:0,label:"?"}]) },
      { label: "C", text: "Crosses at (−2, 0), touches at (1, 0), local max (−1, 4)", ...cubicGraph(1,0,-3,2,[{x:-2,y:0,label:"cross"},{x:1,y:0,label:"touch"},{x:-1,y:4,label:"max"}]) },
      { label: "D", text: "Max at (1, 4) and min at (−1, 0) — stationary points switched", ...cubicGraph(1,0,-3,2,[{x:1,y:4,label:"max?"},{x:-1,y:0,label:"min?"}]) },
    ],
    "y=(x−1)²(x+2): x=−2 (cross), x=1 (touch, double root). Local max at (−1,4), local min at (1,0). Sketch C correctly marks these features.", "y=x^3-3x+2"),
  fa("y11adv-cs-scs-g3", "For y = x³ − 3x + 2, what is the y-coordinate of the local maximum?", "y = x^3 - 3x + 2", "4", ["y = 4", "f(-1) = 4"]),
  mc("y11adv-cs-scs-g4", "The 'hierarchy of information' for curve sketching starts with:", "A",
    [{label:"A",text:"Domain and intercepts, then end behaviour, then stationary points"},{label:"B",text:"Stationary points first, then intercepts"},{label:"C",text:"Second derivative first to determine concavity"},{label:"D",text:"Drawing the shape first, then checking the algebra"}],
    "The standard hierarchy: domain → intercepts → end behaviour → stationary points → concavity → sketch. This order builds information systematically."),
];

const scsIndep: PracticeQuestion[] = [
  fa("y11adv-cs-scs-i1", "For y = 2x³ − 3x², find all x-intercepts (state whether curve crosses or touches the axis at each).", "y = 2x^3 - 3x^2", "touches at x = 0, crosses at x = 3/2", ["x=0 (touch), x=3/2 (cross)"]),
  sk("y11adv-cs-scs-i2", "Which sketch correctly represents y = 2x³ − 3x²?", "D",
    [
      { label: "A", text: "Two crossing roots and wrong stationary points", ...cubicGraph(2,-3,0,0,[{x:-1,y:0,label:"?"},{x:1.5,y:0,label:"?"}]) },
      { label: "B", text: "Correct roots but stationary points at wrong y-values", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"cross"},{x:1.5,y:0,label:"cross"}]) },
      { label: "C", text: "Min at (0,0), max at (1,−1) — classification reversed", ...cubicGraph(-2,3,0,0,[{x:0,y:0,label:"min"},{x:1,y:1,label:"max"}]) },
      { label: "D", text: "Touch at (0,0), cross at (3/2,0), max (0,0), min (1,−1)", ...cubicGraph(2,-3,0,0,[{x:0,y:0,label:"touch/max"},{x:1.5,y:0,label:"cross"},{x:1,y:-1,label:"min"},{x:0.5,y:-0.5,label:"inflection"}]) },
    ],
    "y=x²(2x−3): touches at x=0 (double root), crosses at x=3/2. f(0)=0 is a local max, f(1)=−1 is a local min. Sketch D is correct.", "y=2x^3-3x^2"),
  fa("y11adv-cs-scs-i3", "y = x³ + 3x² − 9x + 5. Find the local maximum value.", "y = x^3 + 3x^2 - 9x + 5", "27", ["f(-3)=27", "y = 27"]),
  mc("y11adv-cs-scs-i4", "A double root at x = a on a cubic curve means the curve:", "B",
    [{label:"A",text:"Crosses the x-axis and has a stationary point there"},{label:"B",text:"Touches the x-axis and has a stationary point there"},{label:"C",text:"Has a vertical tangent at x = a"},{label:"D",text:"Crosses the x-axis at a 45° angle"}],
    "A double root means (x−a)² is a factor. The curve touches (not crosses) the x-axis at x=a. The derivative also equals zero there, making it a stationary point (local min or max)."),
  fa("y11adv-cs-scs-i5", "Describe the end behaviour of y = −2x³ + x.", "", "as x→+∞, y→−∞; as x→−∞, y→+∞", ["falls to the right and rises to the left"]),
];

const scsMastery: PracticeQuestion[] = [
  mc("y11adv-cs-scs-m1", "For a cubic y = ax³ + … with a > 0, as x → +∞:", "B",
    [{label:"A",text:"y → −∞"},{label:"B",text:"y → +∞"},{label:"C",text:"y → 0"},{label:"D",text:"y approaches the maximum value"}],
    "The leading term ax³ dominates for large x. With a>0, as x→+∞, ax³→+∞."),
  fa("y11adv-cs-scs-m2", "y = x³ − 3x + 2. Find all three key features: x-intercepts, local max, local min.", "y = x^3 - 3x + 2", "x-ints: −2 (cross) and 1 (touch); local max (−1,4); local min (1,0)", []),
  sk("y11adv-cs-scs-m3", "Which sketch correctly shows y = x³ + 3x² − 9x − 27?", "A",
    [
      { label: "A", text: "Correct: crosses at (−3,0), touches at (3,0), max at (−3,0), min near (1,−32)", ...cubicGraph(1,3,-9,-27,[{x:-3,y:0,label:"−3"},{x:3,y:0,label:"3(touch)"},{x:-3,y:0,label:"max"},{x:1,y:-32,label:"min"}],{yMin:-40,yMax:20,xMin:-5,xMax:5}) },
      { label: "B", text: "Wrong intercepts", ...cubicGraph(1,3,-9,-27,[{x:-1,y:0,label:"?"},{x:2,y:0,label:"?"}],{yMin:-40,yMax:20,xMin:-5,xMax:5}) },
      { label: "C", text: "Reflected cubic (negative leading term)", ...cubicGraph(-1,-3,9,27,[{x:-3,y:0,label:""},{x:3,y:0,label:""}],{yMin:-40,yMax:20,xMin:-5,xMax:5}) },
      { label: "D", text: "Monotone — no stationary points", ...cubicGraph(1,0,0,-27,[],{yMin:-40,yMax:20,xMin:-5,xMax:5}) },
    ],
    "y=x³+3x²−9x−27=(x−3)(x+3)². Double root at x=−3 (touch), single root at x=3 (cross). f′=3x²+6x−9=3(x+3)(x−1). Local max at (−3,0), local min at (1,−32). Sketch A is correct."),
  fa("y11adv-cs-scs-m4", "For y = x³ − 12x + 16, show that x = 2 is a double root, then sketch key features.", "y = x^3 - 12x + 16", "double root at x=2, simple root at x=−4; local max (−2,32), local min (2,0)", []),
  mc("y11adv-cs-scs-m5", "Which step comes third in the systematic curve-sketching hierarchy?", "C",
    [{label:"A",text:"Stationary points"},{label:"B",text:"Intercepts"},{label:"C",text:"End behaviour"},{label:"D",text:"Concavity"}],
    "The hierarchy is: 1. Domain, 2. Intercepts, 3. End behaviour, 4. Stationary points, 5. Concavity, 6. Sketch."),
  fa("y11adv-cs-scs-m6", "y = −x³ + 3x + 2. Find the local maximum and minimum values.", "y = -x^3 + 3x + 2", "local max 4 at x = 1, local min 0 at x = −1", ["max y=4, min y=0"]),
  mc("y11adv-cs-scs-m7", "A cubic with a positive leading coefficient has how many x-intercepts?", "D",
    [{label:"A",text:"Always exactly 3"},{label:"B",text:"Always exactly 1"},{label:"C",text:"Always exactly 2"},{label:"D",text:"1, 2, or 3 depending on the discriminant"}],
    "A cubic always crosses the x-axis at least once (odd degree) but can have 1, 2, or 3 x-intercepts. Two intercepts occur when there is a double root; three when all roots are distinct and real."),
  fa("y11adv-cs-scs-m8", "For y = x³ − 3x + 2, identify the inflection point.", "y = x^3 - 3x + 2", "(0, 2)", ["x=0, y=2"]),
];

// ─── L5: Reading Derivative Graphs ───────────────────────────────────────────
// Question carries cartesianGraph showing f′; student reasons about f

const rdWorked: WorkedExample[] = [
  {
    title: "Read features of f from its derivative graph",
    questionLatex: "\\text{The graph shows }y = f'(x) = 3x^2 - 3.\\text{ Describe }f.",
    steps: [
      { explanation: "f has stationary points where f′ = 0: at x = −1 and x = 1.", latex: "f'(x) = 0 \\text{ at } x = \\pm 1" },
      { explanation: "f′ > 0 for x < −1 and x > 1 → f is increasing there.", latex: "" },
      { explanation: "f′ < 0 for −1 < x < 1 → f is decreasing there.", latex: "" },
      { explanation: "f′ changes from + to − at x = −1 → local max; from − to + at x = 1 → local min.", latex: "" },
      { explanation: "f′ has minimum at x = 0 (vertex of parabola f′) → f has an inflection at x = 0.", latex: "" },
    ],
    finalAnswerLatex: "\\text{Local max at }x=-1;\\text{ local min at }x=1;\\text{ inflection at }x=0",
  },
  {
    title: "Determine concavity of f from f′ graph",
    questionLatex: "\\text{f′ is shown. On what interval is f concave up?}",
    steps: [
      { explanation: "f is concave up where f″ > 0, i.e. where the slope of f′ is positive.", latex: "" },
      { explanation: "The slope of f′(x) = 3x²−3 is f″(x) = 6x.", latex: "f'' > 0 \\iff 6x > 0 \\iff x > 0" },
      { explanation: "On the f′ graph, f′ is increasing (slope positive) for x > 0.", latex: "" },
    ],
    finalAnswerLatex: "f\\text{ is concave up for }x > 0",
  },
];

const rdGuided: PracticeQuestion[] = [
  {
    id: "y11adv-cs-rd-g1",
    prompt: "The graph shows y = f′(x). At which x-value does f have a local minimum?",
    latex: "",
    answer: "x = 1",
    acceptedAnswers: ["1"],
    cartesianGraph: quadGraph(3, 0, -3, [{x:-1,y:0,label:"x=−1"},{x:1,y:0,label:"x=1"},{x:0,y:-3,label:"min"}], {yMin:-5,yMax:8}),
  } as PracticeQuestion,
  {
    id: "y11adv-cs-rd-g2",
    prompt: "The graph shows y = f′(x). On what interval(s) is f decreasing?",
    latex: "",
    answer: "−1 < x < 1",
    acceptedAnswers: ["-1<x<1","(-1,1)"],
    cartesianGraph: quadGraph(3, 0, -3, [{x:-1,y:0,label:"x=−1"},{x:1,y:0,label:"x=1"}], {yMin:-5,yMax:8}),
  } as PracticeQuestion,
  mc("y11adv-cs-rd-g3", "On the graph of f′(x) = 3x² − 3, the point x = 0 corresponds to what feature of f?", "C",
    [{label:"A",text:"A local maximum of f"},{label:"B",text:"A local minimum of f"},{label:"C",text:"An inflection point of f"},{label:"D",text:"An x-intercept of f"}],
    "x=0 is the vertex (minimum point) of f′. This means f′ is changing from decreasing to increasing at x=0, so f″ changes sign → f has an inflection at x=0.", "f'(x)=3x^2-3"),
  {
    id: "y11adv-cs-rd-g4",
    prompt: "The graph shows y = f′(x). How many stationary points does f have, and what type are they?",
    latex: "",
    answer: "Two stationary points: local max at x = −1, local min at x = 1",
    acceptedAnswers: ["local max at x=-1 and local min at x=1","max at -1, min at 1"],
    cartesianGraph: quadGraph(3, 0, -3, [{x:-1,y:0,label:""},{x:1,y:0,label:""}], {yMin:-5,yMax:8}),
  } as PracticeQuestion,
];

const rdIndep: PracticeQuestion[] = [
  {
    id: "y11adv-cs-rd-i1",
    prompt: "The graph shows y = f′(x). On what interval is f concave up?",
    latex: "",
    answer: "x > 0",
    acceptedAnswers: ["x>0","(0, ∞)"],
    cartesianGraph: quadGraph(3, 0, -3, [{x:0,y:-3,label:"vertex"},{x:-1,y:0,label:""},{x:1,y:0,label:""}], {yMin:-5,yMax:8}),
  } as PracticeQuestion,
  {
    id: "y11adv-cs-rd-i2",
    prompt: "The graph shows a linear f′(x) = 2x − 4. Where does f have a stationary point, and what type is it?",
    latex: "f'(x) = 2x - 4",
    answer: "local minimum at x = 2",
    acceptedAnswers: ["min at x=2","x=2, local min"],
    cartesianGraph: {
      description: "Graph of f′(x) = 2x−4",
      xMin: -1, xMax: 5, yMin: -5, yMax: 5,
      showGrid: true,
      lines: [{ kind: "linear", m: 2, b: -4, label: "y = f′(x)" }],
      points: [{ x: 2, y: 0, label: "x = 2" }],
    } as CartesianGraph,
  } as PracticeQuestion,
  mc("y11adv-cs-rd-i3", "f′(x) > 0 on (1, 4) and f′(x) < 0 outside this interval. What does f look like?", "B",
    [{label:"A",text:"f is decreasing on (1, 4)"},{label:"B",text:"f has a local min at x=1 and local max at x=4"},{label:"C",text:"f has a local max at x=1 and local min at x=4"},{label:"D",text:"f is concave up on (1, 4)"}],
    "f′<0 before x=1 (f decreasing), f′>0 on (1,4) (f increasing) → local min at x=1. f′>0 then f′<0 at x=4 → local max at x=4."),
  {
    id: "y11adv-cs-rd-i4",
    prompt: "The graph shows y = f′(x) = −3x² + 3 (an inverted parabola). At what x-value does f have a local maximum?",
    latex: "f'(x) = -3x^2 + 3",
    answer: "x = 1",
    acceptedAnswers: ["1","x=1"],
    cartesianGraph: quadGraph(-3, 0, 3, [{x:-1,y:0,label:""},{x:1,y:0,label:"x=1"},{x:0,y:3,label:"max"}], {yMin:-5,yMax:5}),
  } as PracticeQuestion,
  mc("y11adv-cs-rd-i5", "On the graph of f′, a local minimum of f′ at x = a means f:", "C",
    [{label:"A",text:"Has a local minimum at x = a"},{label:"B",text:"Has a local maximum at x = a"},{label:"C",text:"Has an inflection point at x = a"},{label:"D",text:"Equals zero at x = a"}],
    "A local minimum of f′ means f″ changes from negative to positive at x=a → concavity changes → f has an inflection. The stationary points of f′ are the inflection points of f."),
];

const rdMastery: PracticeQuestion[] = [
  mc("y11adv-cs-rd-m1", "f′(a) = 0 and f′ changes from negative to positive at x = a. Then f has:", "B",
    [{label:"A",text:"Local maximum at x = a"},{label:"B",text:"Local minimum at x = a"},{label:"C",text:"Inflection at x = a"},{label:"D",text:"Zero gradient for all x near a"}],
    "f decreasing then increasing → local minimum at x=a (first derivative test)."),
  {
    id: "y11adv-cs-rd-m2",
    prompt: "The graph shows y = f′(x). For what x-values is f both increasing and concave down?",
    latex: "",
    answer: "−2 < x < 0",
    acceptedAnswers: ["-2<x<0","(-2,0)"],
    cartesianGraph: quadGraph(3, 0, -12, [{x:-2,y:0,label:"x=−2"},{x:2,y:0,label:"x=2"},{x:0,y:-12,label:"min"}], {xMin:-3,xMax:3,yMin:-14,yMax:4}),
  } as PracticeQuestion,
  fa("y11adv-cs-rd-m3", "f′(x) = 3x² − 12. How many inflection points does f have, and where?", "f'(x)=3x^2-12", "one inflection at x = 0", ["inflection at x=0"]),
  mc("y11adv-cs-rd-m4", "The gradient of f′ is positive at x = 5. This means f is:", "B",
    [{label:"A",text:"Increasing at x = 5"},{label:"B",text:"Concave up at x = 5"},{label:"C",text:"At a local minimum at x = 5"},{label:"D",text:"Decreasing at x = 5"}],
    "Gradient of f′ = f″. If f″>0 at x=5, the curve is concave up there. This tells us nothing directly about whether f is increasing or decreasing."),
  {
    id: "y11adv-cs-rd-m5",
    prompt: "The graph shows y = f′(x) as a line through (0, 2) with slope −1 (i.e. f′=−x+2). Where does f have its maximum, and is f concave up or down everywhere?",
    latex: "f'(x) = -x + 2",
    answer: "maximum at x = 2; f is concave down everywhere (f″ = −1 < 0)",
    acceptedAnswers: ["max at x=2, concave down", "x=2 maximum, always concave down"],
    cartesianGraph: {
      description: "Linear f′(x) = −x+2",
      xMin: -1, xMax: 5, yMin: -3, yMax: 4,
      showGrid: true,
      lines: [{ kind: "linear", m: -1, b: 2, label: "y = f′(x)" }],
      points: [{ x: 2, y: 0, label: "x = 2" }],
    } as CartesianGraph,
  } as PracticeQuestion,
  mc("y11adv-cs-rd-m6", "f′ has a positive value everywhere. What does this mean for f?", "A",
    [{label:"A",text:"f is strictly increasing"},{label:"B",text:"f is strictly decreasing"},{label:"C",text:"f has no stationary points and is concave up"},{label:"D",text:"f is a horizontal line"}],
    "f′>0 everywhere → f is increasing everywhere. No stationary points. The concavity depends on f″, which we cannot determine from f′>0 alone."),
  fa("y11adv-cs-rd-m7", "f′(x) = (x−1)(x−3). Find the x-values where f has stationary points and classify them.", "f'(x)=(x-1)(x-3)", "local max at x = 1, local min at x = 3", ["max x=1, min x=3"]),
  mc("y11adv-cs-rd-m8", "On the graph of f′, the x-intercepts give the __ of f, and the turning points of f′ give the __ of f.", "C",
    [{label:"A",text:"inflection points; stationary points"},{label:"B",text:"y-intercepts; x-intercepts"},{label:"C",text:"stationary points; inflection points"},{label:"D",text:"intercepts; asymptotes"}],
    "f′=0 at its x-intercepts → stationary points of f. f′ has turning points where f″=0 → inflection points of f."),
];

// ─── L6: Optimisation ─────────────────────────────────────────────────────────

const optWorked: WorkedExample[] = [
  {
    title: "Maximise the area of a rectangle with perimeter 40 m",
    questionLatex: "\\text{A rectangle has perimeter 40 m. Find the dimensions for maximum area.}",
    steps: [
      { explanation: "Let length = x, width = y. Constraint: 2x + 2y = 40, so y = 20 − x.", latex: "y = 20 - x" },
      { explanation: "Objective: A = xy = x(20 − x) = 20x − x².", latex: "A(x) = 20x - x^2,\\quad 0 < x < 20" },
      { explanation: "Differentiate and set to zero.", latex: "A'(x) = 20 - 2x = 0 \\implies x = 10" },
      { explanation: "Classify: A″(x) = −2 < 0 → concave down → maximum.", latex: "A''(10) = -2 < 0 \\implies \\text{maximum}" },
      { explanation: "Dimensions: x = 10, y = 10. Maximum area.", latex: "A = 10 \\times 10 = 100\\text{ m}^2" },
    ],
    finalAnswerLatex: "\\text{Square: } 10\\text{ m} \\times 10\\text{ m},\\quad A_{\\max} = 100\\text{ m}^2",
  },
  {
    title: "Minimise the surface area of a box",
    questionLatex: "\\text{An open box with square base has volume 32 cm}^3.\\text{ Minimise total surface area.}",
    steps: [
      { explanation: "Let base side = x, height = h. Volume constraint: x²h = 32, so h = 32/x².", latex: "h = \\frac{32}{x^2}" },
      { explanation: "Surface area (open top): S = x² + 4xh = x² + 4x·(32/x²).", latex: "S(x) = x^2 + \\frac{128}{x},\\quad x > 0" },
      { explanation: "Differentiate.", latex: "S'(x) = 2x - \\frac{128}{x^2}" },
      { explanation: "Set S′ = 0.", latex: "2x = \\frac{128}{x^2} \\implies x^3 = 64 \\implies x = 4" },
      { explanation: "Classify: S″(x) = 2 + 256/x³ > 0 → minimum.", latex: "h = 32/16 = 2,\\quad S = 16 + 32 = 48\\text{ cm}^2" },
    ],
    finalAnswerLatex: "\\text{Base side 4 cm, height 2 cm, min surface area 48 cm}^2",
  },
];

const optGuided: PracticeQuestion[] = [
  fa("y11adv-cs-opt-g1", "A piece of wire 60 cm is bent into a rectangle. Find dimensions for maximum area.", "", "15 cm × 15 cm (square)", ["15 by 15", "x=15, y=15"]),
  fa("y11adv-cs-opt-g2", "y = −x² + 6x + 1 on the closed interval [0, 5]. Find the maximum value.", "y = -x^2 + 6x + 1", "10", ["y=10 at x=3"]),
  mc("y11adv-cs-opt-g3", "To confirm a stationary point gives a minimum in an optimisation problem, you should:", "C",
    [{label:"A",text:"Check that f′ = 0 at that point"},{label:"B",text:"Check that f is positive there"},{label:"C",text:"Show f″ > 0 or use the first derivative test to confirm sign changes from − to +"},{label:"D",text:"Check the problem context alone"}],
    "Justification of the type of extremum requires showing f″>0 (concave up → min) or that f′ changes from negative to positive. Simply finding f′=0 only shows it is stationary."),
  fa("y11adv-cs-opt-g4", "Find the value of x in [−2, 4] that maximises f(x) = x³ − 6x + 1.", "f(x) = x^3 - 6x + 1", "x = −2 (endpoint, f = 5) and check x = −√2 ≈ −1.41; maximum is f(−2) = 5", ["5 at x = -2", "f(-2) = 5"]),
];

const optIndep: PracticeQuestion[] = [
  fa("y11adv-cs-opt-i1", "A farmer has 200 m of fencing. One side uses a wall. Find the dimensions that maximise the enclosed area.", "", "100 m × 50 m, area 5000 m²", ["100 by 50", "x=100, y=50"]),
  fa("y11adv-cs-opt-i2", "Find the maximum value of P = 60x − x² for x ∈ [0, 60].", "P = 60x - x^2", "900 at x = 30", ["P=900", "maximum 900"]),
  mc("y11adv-cs-opt-i3", "On a closed interval [a, b], the global maximum can occur:", "D",
    [{label:"A",text:"Only at a stationary point inside the interval"},{label:"B",text:"Only at the endpoints"},{label:"C",text:"Only where f′ > 0"},{label:"D",text:"At a stationary point inside or at an endpoint"}],
    "On a closed interval, check all stationary points in the interior AND both endpoints. The largest of these values is the global maximum."),
  fa("y11adv-cs-opt-i4", "A cylinder has volume 250π cm³. Express the surface area in terms of radius r, then find r for minimum area.", "", "r = 5 cm", ["radius 5", "r=5"]),
  fa("y11adv-cs-opt-i5", "The profit function is P(x) = −2x³ + 18x² − 30x, where x is units sold (x > 0). Find the production level that maximises profit.", "P(x) = -2x^3 + 18x^2 - 30x", "x = 5", ["5 units"]),
];

const optMastery: PracticeQuestion[] = [
  fa("y11adv-cs-opt-m1", "Maximise A = xy given x + 2y = 20.", "", "A = 50 at x = 10, y = 5", ["maximum 50"]),
  mc("y11adv-cs-opt-m2", "To solve an optimisation problem you must:", "B",
    [{label:"A",text:"Differentiate and substitute without justification"},{label:"B",text:"Identify variables, write an objective function, differentiate, solve, and justify the type of extremum"},{label:"C",text:"Only evaluate at endpoints"},{label:"D",text:"Always use the second derivative test"}],
    "Complete optimisation: state variables, write and simplify the objective function, differentiate, set to zero, solve, then JUSTIFY (classify) the optimum."),
  fa("y11adv-cs-opt-m3", "A rectangle is inscribed in a circle of radius 5. Find the maximum area.", "", "50 square units", ["area 50", "50"]),
  fa("y11adv-cs-opt-m4", "f(x) = x³ − 3x² on [−1, 4]. Find the global maximum and minimum.", "f(x) = x^3 - 3x^2", "global max = 16 at x = 4; global min = −4 at x = 2", ["max 16, min -4"]),
  mc("y11adv-cs-opt-m5", "A constraint equation is used to:", "C",
    [{label:"A",text:"Eliminate the objective function"},{label:"B",text:"Find the derivative"},{label:"C",text:"Reduce the objective function to one variable"},{label:"D",text:"Confirm the answer is positive"}],
    "An optimisation problem typically has two variables. The constraint (e.g. perimeter = constant) lets you express one variable in terms of the other, reducing the objective to one variable for differentiation."),
  fa("y11adv-cs-opt-m6", "Find the minimum value of S = x + 4/x for x > 0.", "S = x + \\frac{4}{x}", "4 at x = 2", ["S=4", "minimum 4"]),
  mc("y11adv-cs-opt-m7", "After finding S′(x) = 0 gives x = 3 and S″(3) = 2 > 0, the conclusion is:", "A",
    [{label:"A",text:"Local minimum at x = 3"},{label:"B",text:"Local maximum at x = 3"},{label:"C",text:"Inflection at x = 3"},{label:"D",text:"The test is inconclusive"}],
    "S″(3) > 0 → concave up → local minimum at x = 3."),
  fa("y11adv-cs-opt-m8", "A ball is thrown so its height is h = 20t − 5t². Find the maximum height.", "h = 20t - 5t^2", "20 m at t = 2 s", ["maximum height 20"]),
];

// ─── L7: Curve Sketching Exam Practice ────────────────────────────────────────

const exWorked: WorkedExample[] = [
  {
    title: "Full curve sketch: y = x³ − 3x + 2",
    questionLatex: "\\text{Sketch }y = x^3 - 3x + 2,\\text{ showing all key features.}",
    steps: [
      { explanation: "Intercepts: y-int (0,2); x-ints: (x−1)²(x+2)=0 → x=1 (touch), x=−2 (cross).", latex: "" },
      { explanation: "Stationary points: f′=3x²−3=0 at x=±1. Local max (−1,4), local min (1,0).", latex: "" },
      { explanation: "Inflection: f″=6x=0 at x=0. (0,2) is inflection.", latex: "" },
      { explanation: "End behaviour: x→−∞: y→−∞; x→+∞: y→+∞.", latex: "" },
      { explanation: "Sketch: falls from bottom-left, rises through (−2,0), peaks at (−1,4), falls through (0,2), touches (1,0), rises to top-right.", latex: "" },
    ],
    finalAnswerLatex: "\\text{All features: intercepts, stationary points, inflection, end behaviour}",
  },
  {
    title: "Reverse reasoning: given graph features, find information about derivatives",
    questionLatex: "\\text{A curve has a local max at }(-2,5)\\text{ and passes through }(0,1).\\text{ What can you say about }f'(-2)\\text{ and }f''(-2)?",
    steps: [
      { explanation: "At a local maximum, f′ = 0.", latex: "f'(-2) = 0" },
      { explanation: "At a local maximum, the curve is concave down.", latex: "f''(-2) < 0" },
    ],
    finalAnswerLatex: "f'(-2) = 0\\text{ and }f''(-2) < 0",
  },
];

const exGuided: PracticeQuestion[] = [
  sk("y11adv-cs-ex-g1", "Which sketch correctly represents the full curve y = x³ − 3x + 2, including all key features?", "B",
    [
      { label: "A", text: "Correct shape but crosses the x-axis at x=1 instead of touching", ...cubicGraph(1,0,-3,2,[{x:-2,y:0,label:"−2"},{x:1,y:0,label:"1 (cross?)"},{x:-1,y:4,label:"max"},{x:0,y:2,label:"inflection"}]) },
      { label: "B", text: "Correct: touches at x=1, crosses at x=−2, max at (−1,4), inflection (0,2)", ...cubicGraph(1,0,-3,2,[{x:-2,y:0,label:"cross"},{x:1,y:0,label:"touch"},{x:-1,y:4,label:"local max"},{x:0,y:2,label:"inflection"}]) },
      { label: "C", text: "Reflected — wrong end behaviour", ...cubicGraph(-1,0,3,-2,[{x:2,y:0,label:""},{x:-1,y:0,label:""}]) },
      { label: "D", text: "Correct local max and min but wrong x-intercept positions", ...cubicGraph(1,0,-3,2,[{x:-1,y:0,label:"?"},{x:2,y:0,label:"?"},{x:-1,y:4,label:"max"}]) },
    ],
    "y=(x−1)²(x+2): touches at x=1 (double root), crosses at x=−2. Local max (−1,4), local min (1,0), inflection (0,2). Sketch B shows all features correctly.", "y=x^3-3x+2"),
  fa("y11adv-cs-ex-g2", "A curve has a local minimum at (3, −2). State the value of f′(3) and the sign of f″(3).", "", "f′(3) = 0 and f″(3) > 0", ["f'(3)=0, f''(3)>0"]),
  mc("y11adv-cs-ex-g3", "The curve y = f(x) is concave up and increasing at x = 4. Which best describes f′ and f″ at x = 4?", "B",
    [{label:"A",text:"f′ < 0 and f″ > 0"},{label:"B",text:"f′ > 0 and f″ > 0"},{label:"C",text:"f′ > 0 and f″ < 0"},{label:"D",text:"f′ = 0 and f″ > 0"}],
    "Increasing → f′>0. Concave up → f″>0. Both conditions are simultaneously satisfied at x=4."),
  fa("y11adv-cs-ex-g4", "Find all stationary points, classify them, and find the inflection point of y = x³ + 3x² − 9x − 27.", "y = x^3 + 3x^2 - 9x - 27", "local max (−3, 0), local min (1, −32), inflection (−1, −16)", ["max (-3,0), min (1,-32), inflection (-1,-16)"]),
];

const exIndep: PracticeQuestion[] = [
  fa("y11adv-cs-ex-i1", "Sketch the key features of y = −x³ + 6x² − 9x + 4. Find stationary points and inflection.", "y = -x^3 + 6x^2 - 9x + 4", "local min (1,0), local max (3,4), inflection (2,2)", []),
  sk("y11adv-cs-ex-i2", "Which sketch correctly represents y = x³ − 6x² + 9x (a cubic touching x-axis at x=3)?", "A",
    [
      { label: "A", text: "Correct: x-intercepts at 0 (cross) and 3 (touch), local max (1,4), local min (3,0)", ...cubicGraph(1,-6,9,0,[{x:0,y:0,label:"0"},{x:3,y:0,label:"3 (touch)"},{x:1,y:4,label:"max"},{x:3,y:0,label:"min"}]) },
      { label: "B", text: "Both roots are crossing roots", ...cubicGraph(1,-6,9,0,[{x:0,y:0,label:"cross"},{x:3,y:0,label:"cross"}]) },
      { label: "C", text: "Reflected cubic — wrong end behaviour", ...cubicGraph(-1,6,-9,0,[{x:0,y:0,label:""},{x:3,y:0,label:""}]) },
      { label: "D", text: "Local max and min at wrong positions", ...cubicGraph(1,-6,9,0,[{x:2,y:2,label:"max?"},{x:4,y:-4,label:"min?"}]) },
    ],
    "y=x(x−3)²: x=0 (cross), x=3 (touch). f′=3x²−12x+9=3(x−1)(x−3)=0 at x=1,3. f(1)=4 (local max), f(3)=0 (local min). Sketch A is correct.", "y=x^3-6x^2+9x"),
  fa("y11adv-cs-ex-i3", "A rectangle has area 100 cm². Find the minimum perimeter.", "", "40 cm (10 × 10 square)", ["P=40", "minimum perimeter 40"]),
  mc("y11adv-cs-ex-i4", "Which is a correct statement about the curve y = x³ − 3x?", "D",
    [{label:"A",text:"It has no inflection points"},{label:"B",text:"The local maximum y-value is −2"},{label:"C",text:"It is concave up for all x"},{label:"D",text:"It has a local maximum at (−1, 2) and local minimum at (1, −2)"}],
    "f′=3x²−3=0 at x=±1. f(−1)=2, f(1)=−2. f″=6x: at x=−1 f″<0 (max), at x=1 f″>0 (min). D is correct.", "y=x^3-3x"),
  fa("y11adv-cs-ex-i5", "For y = x³ − 3x², explain why x = 0 is a local maximum even though f(0) = 0.", "y = x^3 - 3x^2", "f′=3x²−6x=3x(x−2)=0 at x=0 and x=2; f″(0)=−6<0 → concave down → local max at (0,0). The value f(0)=0 is the y-coordinate, not a condition for maximum.", []),
];

const exMastery: PracticeQuestion[] = [
  fa("y11adv-cs-ex-m1", "For f(x) = x³ − 3x + 2, state: (a) local max y-value, (b) local min y-value, (c) inflection point.", "f(x) = x^3 - 3x + 2", "(a) 4; (b) 0; (c) (0, 2)", ["local max 4, local min 0, inflection (0,2)"]),
  mc("y11adv-cs-ex-m2", "A local minimum at x = 3 means:", "C",
    [{label:"A",text:"f(3) = 0"},{label:"B",text:"f is decreasing at x = 3"},{label:"C",text:"f′(3) = 0 and f′ changes from negative to positive"},{label:"D",text:"f″(3) < 0"}],
    "Local min: f′(3)=0 (stationary) and f′ changes from − to + (first derivative test). f″(3)>0 would be the second derivative condition."),
  sk("y11adv-cs-ex-m3", "Which sketch correctly represents y = x³ − 6x + 4?", "C",
    [
      { label: "A", text: "x-intercepts at wrong positions", ...cubicGraph(1,0,-6,4,[{x:-1,y:0,label:"?"},{x:2,y:0,label:"?"}]) },
      { label: "B", text: "Reflected cubic", ...cubicGraph(-1,0,6,-4,[{x:-2,y:0,label:""},{x:1,y:0,label:""}]) },
      { label: "C", text: "Local max (−√2, 4+4√2), local min (√2, 4−4√2), inflection (0,4)", ...cubicGraph(1,0,-6,4,[{x:-1.41,y:9.66,label:"max"},{x:1.41,y:-1.66,label:"min"},{x:0,y:4,label:"inflection"}]) },
      { label: "D", text: "No stationary points — monotone", ...cubicGraph(1,0,0,4,[]) },
    ],
    "f′=3x²−6=0 gives x=±√2≈±1.41. f(−√2)≈9.66 (max), f(√2)≈−1.66 (min). Inflection: f″=6x=0 → (0,4). Sketch C is correct.", "y=x^3-6x+4"),
  fa("y11adv-cs-ex-m4", "Prove that f(x) = x³ + x is strictly increasing for all x.", "f(x) = x^3 + x", "f′(x) = 3x² + 1 ≥ 1 > 0 for all x, so f is strictly increasing everywhere.", []),
  mc("y11adv-cs-ex-m5", "Which conditions together confirm an inflection point at x = a?", "D",
    [{label:"A",text:"f′(a) = 0 only"},{label:"B",text:"f″(a) = 0 only"},{label:"C",text:"f(a) = 0 and f′(a) = 0"},{label:"D",text:"f″(a) = 0 and f″ changes sign at x = a"}],
    "An inflection requires f″=0 (necessary) AND f″ changes sign (sufficient). f″=0 alone is not enough — e.g. f(x)=x⁴ has f″(0)=0 but no inflection there."),
  fa("y11adv-cs-ex-m6", "A curve satisfies f′(x) > 0 for all x. What can you conclude about the number of stationary points and intercepts?", "", "No stationary points (f′ never zero). Exactly one x-intercept (f strictly increasing → one-to-one).", []),
  mc("y11adv-cs-ex-m7", "The gradient of f(x) = x³ − 3x is zero at x = ±1. Between these points the curve:", "B",
    [{label:"A",text:"Increases from (−1, 2) to (1, −2)"},{label:"B",text:"Decreases from (−1, 2) to (1, −2)"},{label:"C",text:"Has an inflection at x = 0 and increases throughout"},{label:"D",text:"Has zero gradient throughout the interval"}],
    "f′=3x²−3<0 for −1<x<1, so f is decreasing on this interval. It drops from local max (−1,2) to local min (1,−2).", "f(x)=x^3-3x"),
  fa("y11adv-cs-ex-m8", "Find the global maximum and minimum of f(x) = x³ − 3x on the interval [−2, 2].", "f(x) = x^3 - 3x,\\;[-2,2]", "global max 2 at x = −1; global min −2 at x = 1", ["max f(-1)=2, min f(1)=-2"]),
];

// ─── Override Function ────────────────────────────────────────────────────────

export function year11AdvancedCurveSketchingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "curve-sketching") return null;

  const base = {
    syllabusArea: "Calculus",
    masteryPassMark: 6,
  } as const;

  if (lesson.slug === "stationary-points") {
    return {
      ...base,
      description: "Find where the derivative equals zero and use sign charts to determine where a function is increasing, decreasing, or stationary.",
      learningIntention: "Locate stationary points by solving f′(x) = 0 and determine intervals of increase and decrease from the sign of the derivative.",
      successCriteria: [
        "Differentiate a polynomial and set f′(x) = 0 to find stationary x-values.",
        "Calculate the y-coordinate of each stationary point.",
        "Use a sign chart to determine where f is increasing (f′ > 0) and decreasing (f′ < 0).",
        "Recognise that a polynomial with no real solutions to f′(x) = 0 has no stationary points.",
        "Identify horizontal tangent lines as the geometric meaning of a stationary point.",
      ],
      teaching: {
        paragraphs: [
          "A stationary point occurs where the derivative equals zero — where the tangent to the curve is horizontal. To find them, differentiate f(x), set the result equal to zero, and solve.",
          "For each stationary x-value, substitute back into the original function (not the derivative) to find the y-coordinate. The point (a, f(a)) is the stationary point.",
          "The sign of f′(x) tells you whether the function is rising or falling. When f′(x) > 0, the gradient is positive and f is increasing. When f′(x) < 0, the gradient is negative and f is decreasing.",
          "To determine increasing and decreasing intervals, draw a number line with the stationary x-values marked, then test the sign of f′ in each interval using a convenient test value.",
          "Not every polynomial has stationary points. If f′(x) > 0 everywhere (for example, f′(x) = 3x² + 1), the function is strictly increasing with no turning points.",
        ],
        latexBlocks: [
          "\\text{Stationary point: solve }f'(x)=0,\\text{ substitute into }f(x)",
          "f'(x)>0 \\implies f\\text{ increasing};\\quad f'(x)<0 \\implies f\\text{ decreasing}",
        ],
      },
      workedExamples: spWorked,
      guidedPractice: spGuided,
      independentPractice: spIndep,
      commonMistakes: [
        { mistake: "Substituting into f′(x) to find the y-coordinate of the stationary point.", fix: "Always substitute the x-value into the original function f(x), not the derivative." },
        { mistake: "Confusing x-intercepts with stationary points.", fix: "x-intercepts come from f(x)=0; stationary points come from f′(x)=0. These are different conditions." },
        { mistake: "Forgetting to test sign of f′ in every interval between stationary points.", fix: "Use a fresh test value in each sub-interval to determine whether f is increasing or decreasing there." },
      ],
      masteryQuiz: spMastery,
    };
  }

  if (lesson.slug === "classifying-stationary-points") {
    return {
      ...base,
      description: "Classify stationary points as local maxima, local minima, or horizontal inflections using the first and second derivative tests.",
      learningIntention: "Determine the nature of each stationary point using either the sign change of f′ or the sign of f″.",
      successCriteria: [
        "Apply the first derivative test: f′ changes + to − → local max; − to + → local min; no change → horizontal inflection.",
        "Apply the second derivative test: f″(a) < 0 → local max; f″(a) > 0 → local min; f″(a) = 0 → inconclusive.",
        "Identify a horizontal inflection when f′(a) = 0 but f′ does not change sign.",
        "State the coordinates of each classified stationary point.",
        "Choose between the two tests and explain why the second derivative test may be inconclusive.",
      ],
      teaching: {
        paragraphs: [
          "Once a stationary point is located, you must classify it. The two standard tools are the first derivative test (sign chart) and the second derivative test.",
          "First derivative test: examine the sign of f′ either side of x = a. If f′ changes from positive to negative, the function rises then falls — a local maximum. If it changes from negative to positive, it falls then rises — a local minimum. If f′ does not change sign, the function bends but does not turn — a horizontal inflection.",
          "Second derivative test: compute f″(a). If f″(a) < 0, the curve is concave down at x = a (like an upside-down bowl), confirming a local maximum. If f″(a) > 0, the curve is concave up (like a right-side-up bowl), confirming a local minimum.",
          "When f″(a) = 0, the second derivative test is inconclusive. You must use the first derivative test instead. This happens, for example, at the origin for y = x⁴.",
          "A horizontal inflection is still a stationary point because f′ = 0 there, but the function does not change direction. The classic example is y = x³ at the origin.",
        ],
        latexBlocks: [
          "\\text{First deriv. test: }f'\\text{ changes }+\\to-\\implies\\text{local max};\\quad -\\to+\\implies\\text{local min}",
          "\\text{Second deriv. test: }f''(a)<0\\implies\\text{local max};\\quad f''(a)>0\\implies\\text{local min}",
        ],
      },
      workedExamples: clsWorked,
      guidedPractice: clsGuided,
      independentPractice: clsIndep,
      commonMistakes: [
        { mistake: "Applying the second derivative test when f″(a) = 0 and concluding it is an inflection.", fix: "f″(a) = 0 makes the test inconclusive — not all such points are inflections. Revert to the first derivative sign chart." },
        { mistake: "Confusing the sign of f″ needed for a maximum vs minimum.", fix: "f″ < 0 → concave down → maximum (like a hill top). f″ > 0 → concave up → minimum (like a valley bottom)." },
        { mistake: "Using f′ to find the y-coordinate of the classified stationary point.", fix: "The y-coordinate is f(a), the original function value, not the derivative value (which is zero)." },
      ],
      masteryQuiz: clsMastery,
    };
  }

  if (lesson.slug === "concavity-inflection") {
    return {
      ...base,
      description: "Use the second derivative to determine concavity and locate inflection points where the concavity changes direction.",
      learningIntention: "Identify intervals of concavity from f″(x) and find inflection points where f″ changes sign.",
      successCriteria: [
        "State that f″(x) > 0 means concave up and f″(x) < 0 means concave down on an interval.",
        "Find candidate inflection points by solving f″(x) = 0.",
        "Confirm an inflection point by verifying that f″ changes sign either side.",
        "Calculate the coordinates of the inflection point by substituting into f(x).",
        "Identify concave up and concave down intervals for a given polynomial.",
      ],
      teaching: {
        paragraphs: [
          "Concavity describes how the gradient itself is changing. When f″(x) > 0, the gradient is increasing — the curve bends upward like the inside of a bowl. When f″(x) < 0, the gradient is decreasing — the curve bends downward like the top of a hill.",
          "A curve switches between concave up and concave down at an inflection point. To find candidates, set f″(x) = 0 and solve. Then check that f″ actually changes sign either side of that x-value.",
          "f″(a) = 0 alone is not enough to confirm an inflection. For example, f(x) = x⁴ has f″(0) = 0 but is always concave up — no inflection. You must verify the sign change.",
          "For a standard cubic y = ax³ + bx² + …, f″ is linear. It changes sign exactly once, so every cubic has exactly one inflection point.",
          "At an inflection point the tangent line crosses the curve. The gradient there can be any value — the tangent need not be horizontal.",
        ],
        latexBlocks: [
          "f''(x)>0 \\implies \\text{concave up};\\quad f''(x)<0 \\implies \\text{concave down}",
          "\\text{Inflection: }f''(a)=0\\text{ and }f''\\text{ changes sign at }x=a",
        ],
      },
      workedExamples: conWorked,
      guidedPractice: conGuided,
      independentPractice: conIndep,
      commonMistakes: [
        { mistake: "Declaring f″(a) = 0 automatically means an inflection point.", fix: "The sign of f″ must actually change. Always test a value either side of the candidate before confirming an inflection." },
        { mistake: "Mixing up concave up and concave down.", fix: "Concave UP: like a cup (holds water), f″>0, gradient increasing. Concave DOWN: like an umbrella, f″<0, gradient decreasing." },
        { mistake: "Forgetting to find the y-coordinate of the inflection.", fix: "Substitute the x-value of the inflection into f(x), not f″(x), to get the y-coordinate." },
      ],
      masteryQuiz: conMastery,
    };
  }

  if (lesson.slug === "systematic-curve-sketching") {
    return {
      ...base,
      description: "Sketch polynomial curves by systematically gathering information: domain, intercepts, end behaviour, stationary points, and concavity.",
      learningIntention: "Apply a systematic six-step workflow to produce an accurate sketch of any polynomial function.",
      successCriteria: [
        "List the six-step sketching hierarchy: domain → intercepts → end behaviour → stationary points → concavity → sketch.",
        "Factorise to find all x-intercepts, distinguishing crossing roots from touching roots (double roots).",
        "Determine end behaviour from the sign and degree of the leading term.",
        "Find and classify all stationary points, then locate the inflection point.",
        "Combine all gathered information to produce a correctly proportioned sketch.",
        "Identify that a double root means the curve touches (does not cross) the x-axis at that point.",
      ],
      teaching: {
        paragraphs: [
          "Curve sketching is not about plotting many points — it is about gathering the right information in the right order. The hierarchy is: (1) domain, (2) intercepts, (3) end behaviour, (4) stationary points, (5) concavity, (6) sketch.",
          "For polynomials, the domain is always all real numbers. The y-intercept is f(0). For x-intercepts, solve f(x) = 0 by factoring. A single factor (x − a) means the curve crosses at x = a; a repeated factor (x − a)² means the curve touches the x-axis and bounces back.",
          "End behaviour is controlled by the leading term. For odd-degree polynomials with positive leading coefficient, the curve falls to the left and rises to the right. For negative leading coefficient, the reverse.",
          "After gathering intercepts and end behaviour, find stationary points (f′ = 0) and classify each. Then find the inflection point (f″ = 0 with sign change). Ordering the information this way prevents contradictions in your sketch.",
          "A double root at x = a means f(a) = 0 AND f′(a) = 0 — the x-axis is tangent to the curve at that point. This touching point is also a local maximum or minimum.",
        ],
        latexBlocks: [
          "\\text{Workflow: domain}\\to\\text{intercepts}\\to\\text{end behaviour}\\to f'=0\\to f''=0\\to\\text{sketch}",
          "\\text{Double root: }(x-a)^2\\text{ factor}\\implies\\text{curve touches axis at }x=a",
        ],
      },
      workedExamples: scsWorked,
      guidedPractice: scsGuided,
      independentPractice: scsIndep,
      commonMistakes: [
        { mistake: "Sketching from the stationary points first without checking intercepts and end behaviour.", fix: "Follow the hierarchy in order. End behaviour anchors the sketch at the extremes; stationary points provide the detail in the middle." },
        { mistake: "Assuming all x-intercepts are crossing roots.", fix: "Always check the multiplicity of each root. Odd multiplicity → cross; even multiplicity → touch." },
        { mistake: "Drawing the sketch without labelling key coordinates.", fix: "Mark every x-intercept, y-intercept, stationary point, and inflection with its exact coordinates." },
      ],
      masteryQuiz: scsMastery,
    };
  }

  if (lesson.slug === "reading-derivative-graphs") {
    return {
      ...base,
      description: "Given a graph of f′(x), determine the features of f: stationary points, intervals of increase and decrease, concavity, and inflection points.",
      learningIntention: "Read a graph of f′ to extract information about the shape, turning points, and concavity of f without knowing f explicitly.",
      successCriteria: [
        "Identify x-values where f′ = 0 from the x-intercepts of the f′ graph — these are stationary points of f.",
        "Determine intervals where f is increasing (f′ > 0) or decreasing (f′ < 0) from the sign of f′ on the graph.",
        "Classify stationary points from sign changes of f′ on the graph.",
        "Identify inflection points of f as local maxima or minima on the f′ graph.",
        "Determine concavity of f from whether f′ is increasing (concave up) or decreasing (concave down).",
      ],
      teaching: {
        paragraphs: [
          "When you are given a graph of f′ instead of f, every feature of f is encoded in the derivative graph. Learning to read this encoding is a key skill in HSC Advanced.",
          "The x-intercepts of the f′ graph (where f′ = 0) are the stationary points of f. The sign of f′ between intercepts tells you whether f is increasing (f′ > 0, graph above x-axis) or decreasing (f′ < 0, graph below x-axis).",
          "Sign changes of f′ classify the stationary points: if f′ crosses from positive to negative at x = a, then f has a local maximum at x = a. If f′ crosses from negative to positive, f has a local minimum.",
          "The turning points of the f′ graph are the inflection points of f. Where f′ reaches a local maximum or minimum, the gradient of f is momentarily neither increasing nor decreasing — f changes concavity there.",
          "Concavity of f is determined by whether f′ is increasing or decreasing. An increasing f′ means f″ > 0 → concave up. A decreasing f′ means f″ < 0 → concave down.",
        ],
        latexBlocks: [
          "f'(a)=0\\iff\\text{ stationary point of }f\\quad\\text{(x-intercepts of }f'\\text{ graph)}",
          "f'\\text{ has a turning point at }x=a\\iff f\\text{ has an inflection at }x=a",
        ],
      },
      workedExamples: rdWorked,
      guidedPractice: rdGuided,
      independentPractice: rdIndep,
      commonMistakes: [
        { mistake: "Reading the turning points of f′ as the stationary points of f.", fix: "The x-intercepts of f′ are the stationary points of f. The turning points of f′ are the inflection points of f — these are different features." },
        { mistake: "Confusing f′ > 0 with the curve being concave up.", fix: "f′ > 0 means f is increasing. Concavity depends on f″, which is the slope of the f′ graph — whether f′ is itself going up or down." },
        { mistake: "Forgetting to check whether f′ changes sign to classify stationary points.", fix: "A zero of f′ is only classified as max/min if f′ changes sign there. If f′ touches zero but stays positive (or negative), it is a horizontal inflection of f." },
      ],
      masteryQuiz: rdMastery,
    };
  }

  if (lesson.slug === "optimisation") {
    return {
      ...base,
      description: "Use calculus to find maximum or minimum values of a quantity, including applied word problems and closed-interval global extrema.",
      learningIntention: "Formulate an objective function, differentiate it, find critical points, justify the type of extremum, and interpret the result in context.",
      successCriteria: [
        "Define variables and write an objective function in one variable using any given constraint.",
        "Differentiate the objective function and solve for critical points.",
        "Justify whether each critical point is a maximum or minimum using f″ or a sign chart.",
        "Check endpoints when optimising on a closed interval.",
        "Interpret the result in the context of the original problem, including units.",
      ],
      teaching: {
        paragraphs: [
          "Optimisation means finding the value of a quantity (area, profit, distance) that is as large or as small as possible. Calculus makes this systematic: the maximum or minimum of a smooth function occurs where the derivative is zero (or at an endpoint).",
          "The standard process: (1) Define variables clearly. (2) Use any constraint equation to eliminate one variable, writing the objective as a function of one variable. (3) Differentiate. (4) Set equal to zero and solve. (5) Justify the type of extremum using f″ or a sign chart. (6) Interpret in context.",
          "Justification is required in HSC: you must show that the critical point is indeed a maximum or minimum, not just that f′ = 0. Use the second derivative test (f″ < 0 → max, f″ > 0 → min) or state the sign change of f′.",
          "On a closed interval [a, b], the global maximum is the largest value among: f(a), f(b), and all critical point values inside the interval. Always evaluate the function at all endpoints and interior critical points.",
          "In many optimisation problems, the physical context restricts the domain (e.g. length must be positive). State the domain restriction explicitly before differentiating.",
        ],
        latexBlocks: [
          "\\text{At a maximum: }f'(x_0)=0\\text{ and }f''(x_0)<0",
          "\\text{At a minimum: }f'(x_0)=0\\text{ and }f''(x_0)>0",
          "\\text{Closed interval: compare }f(a),\\,f(b),\\,\\text{and all critical values}",
        ],
      },
      workedExamples: optWorked,
      guidedPractice: optGuided,
      independentPractice: optIndep,
      commonMistakes: [
        { mistake: "Finding f′(x) = 0 but failing to justify whether it is a maximum or minimum.", fix: "Always classify the critical point using f″ or a sign chart. The HSC requires this justification for full marks." },
        { mistake: "Ignoring endpoints when working on a closed interval.", fix: "On a closed interval, evaluate f at both endpoints and all interior critical points. The global extremum might be at an endpoint, not at a stationary point." },
        { mistake: "Writing the objective function in two variables without using the constraint to eliminate one.", fix: "Use the constraint equation to substitute out one variable so the objective function depends on one variable only, before differentiating." },
      ],
      masteryQuiz: optMastery,
    };
  }

  if (lesson.slug === "curve-sketching-exam-practice") {
    return {
      ...base,
      description: "HSC-style curve sketching problems combining all skills: systematic sketching, derivative graphs, reverse reasoning, and optimisation.",
      learningIntention: "Apply the full curve sketching toolkit — stationary points, concavity, inflection, and interpretation — to exam-standard questions.",
      successCriteria: [
        "Complete a full systematic sketch of a cubic, labelling all key features.",
        "Use reverse reasoning: given features of a sketch, state properties of f′ and f″.",
        "Read a derivative graph to determine all features of f.",
        "Solve an optimisation problem with full justification.",
        "Identify and correct common misconceptions about stationary points, inflection, and concavity.",
        "The calculus chain: differentiation gives slope → curve sketching gives shape → integration gives accumulated area.",
      ],
      teaching: {
        paragraphs: [
          "Exam questions test whether you can run the workflow in both directions. Forward: given f(x), find all features and sketch. Reverse: given a sketch or features of f, find properties of f′ and f″.",
          "Key reverse reasoning: at a local max, f′ = 0 and f″ < 0. At a local min, f′ = 0 and f″ > 0. At an inflection, f″ = 0 (with sign change). These conditions can be used to answer questions about derivatives when only the graph is shown.",
          "When reading a derivative graph, remember: x-intercepts of f′ → stationary points of f; turning points of f′ → inflection points of f; sign of f′ above axis → f increasing.",
          "Differentiation, curve sketching, and integration form a chain. Differentiation extracts slope information from a function. Curve sketching uses that slope information to reconstruct the shape of the graph. Integration is the reverse of differentiation — the tools from this unit are used again in motion, finance, and probability.",
          "In the HSC, always label the y-intercept, all x-intercepts (with coordinates), all stationary points (with coordinates and classification), and the inflection point. Unlabelled sketches lose marks.",
        ],
        latexBlocks: [
          "\\text{Reverse reasoning: local max} \\implies f'=0,\\;f''<0",
          "\\text{Chain: differentiation}\\to\\text{slope}\\to\\text{sketching}\\to\\text{shape}\\to\\text{integration}",
        ],
      },
      workedExamples: exWorked,
      guidedPractice: exGuided,
      independentPractice: exIndep,
      commonMistakes: [
        { mistake: "Labelling a sketch with only the stationary point coordinates and missing the inflection and y-intercept.", fix: "A complete HSC sketch needs: y-intercept, all x-intercepts, all stationary points (classified), the inflection point, and correct end behaviour." },
        { mistake: "Stating 'the curve has a minimum at x = a' without giving the y-coordinate.", fix: "Always state the full coordinates. The exam expects (a, f(a)), not just x = a." },
        { mistake: "Reversing the chain: concluding from f″(a) > 0 that f has a local maximum at a.", fix: "f″>0 at a stationary point → local MINIMUM (concave up, bowl shape). f″<0 at a stationary point → local MAXIMUM (concave down, hill shape)." },
      ],
      masteryQuiz: exMastery,
    };
  }

  return null;
}
