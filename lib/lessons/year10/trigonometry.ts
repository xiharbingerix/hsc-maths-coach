import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function trigAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Draw the triangle, label the known sides and angle, then choose sin, cos, or tan.",
    explanation: `The answer is ${answer}.`,
  };
}

function trigChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({
      label,
      text: choices[i],
    })),
    answer,
    hint: "Identify which sides are known and unknown, then choose the matching ratio.",
    explanation,
  };
}

// ─── Lesson 1: Trigonometric Ratios ──────────────────────────────────────────

const trigRatiosWorkedExamples: WorkedExample[] = [
  {
    title: "Labelling the three sides relative to a given angle",
    questionLatex:
      "\\text{In the right triangle, label the hypotenuse, opposite and adjacent sides relative to angle }\\theta\\text{ at }A.",
    triangleDiagram: {
      description:
        "Right triangle with angle theta at A (top left), right angle at C (bottom left), and vertex B at bottom right. Side AB is the hypotenuse, AC is adjacent to theta, and BC is opposite to theta.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
      sideLabels: {
        AB: "hypotenuse",
        AC: "adjacent",
        BC: "opposite",
      },
    },
    steps: [
      {
        explanation:
          "The hypotenuse is always the longest side. It is opposite the right angle — it does not touch the right-angle vertex.",
        latex: "\\text{Hypotenuse: }AB\\text{ (opposite right angle at }C)",
      },
      {
        explanation:
          "The adjacent side is next to angle θ. It is one of the two sides that form angle θ, but it is not the hypotenuse.",
        latex: "\\text{Adjacent: }AC\\text{ (from }\\theta\\text{ to the right angle)}",
      },
      {
        explanation:
          "The opposite side is directly across from angle θ. It does not touch vertex A at all.",
        latex: "\\text{Opposite: }BC\\text{ (does not touch vertex }A)",
      },
    ],
    finalAnswerLatex:
      "\\text{Hyp: }AB,\\quad\\text{Adj: }AC,\\quad\\text{Opp: }BC",
  },
  {
    title: "Writing the three trigonometric ratios",
    questionLatex:
      "\\text{A right triangle has hypotenuse 5, opposite side 4 and adjacent side 3 relative to angle }\\theta.\\text{ Write }\\sin\\theta,\\cos\\theta\\text{ and }\\tan\\theta.",
    triangleDiagram: {
      description:
        "Right triangle with angle theta, hypotenuse 5, opposite side 4, and adjacent side 3.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
      sideLabels: {
        AB: "5 (hyp)",
        AC: "3 (adj)",
        BC: "4 (opp)",
      },
    },
    steps: [
      {
        explanation: "SOH: sine equals opposite over hypotenuse.",
        latex: "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}=\\frac{4}{5}",
      },
      {
        explanation: "CAH: cosine equals adjacent over hypotenuse.",
        latex: "\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}}=\\frac{3}{5}",
      },
      {
        explanation: "TOA: tangent equals opposite over adjacent.",
        latex: "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}=\\frac{4}{3}",
      },
    ],
    finalAnswerLatex:
      "\\sin\\theta=\\tfrac{4}{5},\\quad\\cos\\theta=\\tfrac{3}{5},\\quad\\tan\\theta=\\tfrac{4}{3}",
  },
  {
    title: "Choosing which ratio to use",
    questionLatex:
      "\\text{You know the hypotenuse is 10 and angle }\\theta=35^\\circ.\\text{ You need the side opposite }\\theta.\\text{ Which ratio do you use?}",
    triangleDiagram: {
      description:
        "Right triangle with angle theta = 35 degrees at A, hypotenuse AB = 10, and unknown opposite side BC labelled x.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "35°" },
      sideLabels: {
        AB: "10",
        BC: "x",
      },
    },
    steps: [
      {
        explanation:
          "Identify what you know (hypotenuse = 10, angle = 35°) and what you want (opposite side).",
        latex: "\\text{Known: hyp}=10,\\;\\theta=35^\\circ\\quad\\text{Want: opp}",
      },
      {
        explanation:
          "SOH connects opposite and hypotenuse: sin θ = opp ÷ hyp. That is the ratio to use.",
        latex: "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}",
      },
      {
        explanation: "Rearrange to find the opposite side.",
        latex: "\\text{opp}=\\text{hyp}\\times\\sin\\theta=10\\times\\sin 35^\\circ",
      },
    ],
    finalAnswerLatex: "\\text{Use }\\sin\\theta=\\dfrac{\\text{opp}}{\\text{hyp}}",
  },
];

const trigRatiosGuided: PracticeQuestion[] = [
  trigChoice(
    "trig-rat-g1",
    "In a right triangle, which side is always the longest and opposite the right angle?",
    "A",
    ["Hypotenuse", "Opposite", "Adjacent", "It depends on the angle"],
    "The hypotenuse is always the longest side of a right triangle. It is opposite the right angle, regardless of which other angle is marked.",
    "\\text{Which side is longest in a right triangle?}"
  ),
  {
    id: "trig-rat-g2",
    prompt:
      "In the right triangle shown, which side is opposite to angle θ at A?",
    latex: "\\text{Identify the side opposite }\\theta.",
    triangleDiagram: {
      description:
        "Right triangle with angle theta at vertex A (top left), right angle at C (bottom left), and vertex B at bottom right. Vertices are labelled A, B, C.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
    },
    choices: [
      { label: "A", text: "BC — it does not touch vertex A" },
      { label: "B", text: "AC — it runs from A to C" },
      { label: "C", text: "AB — it is the hypotenuse" },
      { label: "D", text: "CA — same as AC, adjacent to A" },
    ],
    answer: "A",
    hint: "The opposite side is across from the marked angle — it does not share vertex A.",
    explanation:
      "BC is the side opposite θ at A because BC does not touch vertex A at all. AC is adjacent (it connects A to the right angle), and AB is the hypotenuse.",
  },
  trigChoice(
    "trig-rat-g3",
    "Which trigonometric ratio is defined as opposite ÷ hypotenuse?",
    "A",
    ["sin θ", "cos θ", "tan θ", "1 ÷ cos θ"],
    "SOH stands for Sin = Opposite ÷ Hypotenuse. CAH gives Cos = Adjacent ÷ Hypotenuse, and TOA gives Tan = Opposite ÷ Adjacent.",
    "\\text{Which ratio equals }\\dfrac{\\text{opp}}{\\text{hyp}}?"
  ),
  trigChoice(
    "trig-rat-g4",
    "You know the hypotenuse and need the adjacent side. Which ratio should you use?",
    "B",
    ["sin θ", "cos θ", "tan θ", "Neither — you need two sides first"],
    "CAH: cos θ = adjacent ÷ hypotenuse. Rearranging: adjacent = hypotenuse × cos θ. This uses exactly the sides you have (hyp) and want (adj).",
    "\\text{Known: hyp. Want: adj. Which ratio?}"
  ),
];

const trigRatiosIndependent: PracticeQuestion[] = [
  trigChoice(
    "trig-rat-i1",
    "In a right triangle, angle θ is at vertex A and the right angle is at C. Which side is adjacent to θ?",
    "A",
    ["AC — it connects A to the right angle and is not the hypotenuse", "BC — it is opposite A", "AB — it is the hypotenuse", "Any side can be adjacent"],
    "Adjacent means 'next to'. The side adjacent to θ at A is AC — it shares vertex A, runs to the right angle at C, and is shorter than the hypotenuse AB.",
    "\\text{Right angle at }C,\\text{ angle }\\theta\\text{ at }A.\\text{ Identify adjacent.}"
  ),
  trigChoice(
    "trig-rat-i2",
    "What does TOA stand for in SOH-CAH-TOA?",
    "A",
    [
      "Tan = Opposite ÷ Adjacent",
      "Tan = Adjacent ÷ Opposite",
      "Tan = Opposite ÷ Hypotenuse",
      "Tan = Hypotenuse ÷ Adjacent",
    ],
    "TOA: Tangent equals Opposite divided by Adjacent. Remember — tan uses the two shorter sides of the right triangle relative to the marked angle.",
    "\\text{What does TOA represent?}"
  ),
  trigChoice(
    "trig-rat-i3",
    "You know the opposite and adjacent sides. Which ratio uses both?",
    "C",
    ["sin θ", "cos θ", "tan θ", "All three ratios use both sides"],
    "TOA: tan θ = opp ÷ adj. This is the only ratio that involves opposite and adjacent without the hypotenuse.",
    "\\text{Known: opp and adj. Which ratio?}"
  ),
  trigChoice(
    "trig-rat-i4",
    "In a right triangle, opposite = 3 and hypotenuse = 5. What is sin θ?",
    "A",
    ["$\\dfrac{3}{5}$", "$\\dfrac{5}{3}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$"],
    "SOH: sin θ = opp ÷ hyp = 3 ÷ 5 = 3/5. Note: 5/3 would be upside-down, and 4/5 would be cos θ (using the adjacent side = 4 from Pythagoras).",
    "\\text{opp}=3,\\quad\\text{hyp}=5"
  ),
  trigChoice(
    "trig-rat-i5",
    "In a right triangle, adjacent = 4 and hypotenuse = 5. What is cos θ?",
    "B",
    ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{4}{3}$", "$\\dfrac{5}{4}$"],
    "CAH: cos θ = adj ÷ hyp = 4 ÷ 5 = 4/5. The ratio 3/5 would be sin θ using the opposite side.",
    "\\text{adj}=4,\\quad\\text{hyp}=5"
  ),
];

const trigRatiosMistakes = [
  {
    mistake:
      "Swapping opposite and adjacent — labelling the side next to the angle as 'opposite'.",
    fix:
      "Opposite means 'directly across from' the marked angle. It does not touch the marked vertex at all. Adjacent is the side that runs from the marked angle to the right angle.",
  },
  {
    mistake:
      "Thinking the hypotenuse is the side adjacent to the right angle because 'adjacent' sounds like 'next to'.",
    fix:
      "Hypotenuse is opposite the right angle — it is the longest side connecting the two non-right-angle vertices. The labels opposite/adjacent are always relative to the marked angle, not the right angle.",
  },
  {
    mistake: "Using sin when cos is needed, e.g. writing sin θ = adj/hyp.",
    fix:
      "Use SOH-CAH-TOA. Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj. Check which two sides appear in your problem and match them to the correct ratio.",
  },
  {
    mistake:
      "Inverting the ratio, e.g. writing sin θ = hyp/opp instead of opp/hyp.",
    fix:
      "The angle is always on the left: sin θ = opp/hyp. The side you want to find goes in the numerator when you rearrange, but the ratio itself is always smaller ÷ larger for sin and cos (both are at most 1).",
  },
];

const trigRatiosMastery: PracticeQuestion[] = [
  {
    id: "trig-rat-m1",
    prompt:
      "In the right triangle shown, angle θ is at A and the right angle is at C. Which side is the hypotenuse?",
    latex: "\\text{Identify the hypotenuse.}",
    triangleDiagram: {
      description:
        "Right triangle with angle theta at A (top left), right angle at C (bottom left), vertex B at bottom right.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
    },
    choices: [
      { label: "A", text: "AB — it is opposite the right angle at C" },
      { label: "B", text: "AC — it runs along the left side" },
      { label: "C", text: "BC — it is the bottom side" },
      { label: "D", text: "It depends on which angle is largest" },
    ],
    answer: "A",
    hint: "The hypotenuse is always opposite the right angle.",
    explanation:
      "AB connects the two non-right-angle vertices (A and B) and is opposite the right angle at C. It is always the longest side.",
  },
  trigChoice(
    "trig-rat-m2",
    "Which ratio is defined as opposite ÷ adjacent?",
    "C",
    ["sin θ", "cos θ", "tan θ", "1 ÷ sin θ"],
    "TOA: tan θ = opposite ÷ adjacent. This ratio can be greater than 1 (unlike sin and cos, which are at most 1 for acute angles).",
    "\\text{Which ratio equals }\\dfrac{\\text{opp}}{\\text{adj}}?"
  ),
  trigChoice(
    "trig-rat-m3",
    "A right triangle has opposite = 5 and hypotenuse = 13. What is sin θ?",
    "A",
    ["$\\dfrac{5}{13}$", "$\\dfrac{13}{5}$", "$\\dfrac{12}{13}$", "$\\dfrac{5}{12}$"],
    "SOH: sin θ = opp ÷ hyp = 5 ÷ 13. The value 12/13 would be cos θ (adj/hyp with adj = 12 from the 5-12-13 Pythagorean triple).",
    "\\text{opp}=5,\\quad\\text{hyp}=13"
  ),
  trigChoice(
    "trig-rat-m4",
    "A right triangle has adjacent = 12 and hypotenuse = 13. What is cos θ?",
    "B",
    ["$\\dfrac{5}{13}$", "$\\dfrac{12}{13}$", "$\\dfrac{13}{12}$", "$\\dfrac{5}{12}$"],
    "CAH: cos θ = adj ÷ hyp = 12 ÷ 13. The value 5/13 would be sin θ (opp/hyp with opp = 5).",
    "\\text{adj}=12,\\quad\\text{hyp}=13"
  ),
  trigChoice(
    "trig-rat-m5",
    "You know the opposite and hypotenuse. Which ratio connects them?",
    "A",
    ["sin θ", "cos θ", "tan θ", "All three"],
    "SOH: sin θ = opposite ÷ hypotenuse. This is the only ratio that involves opposite and hypotenuse together (without the adjacent side).",
    "\\text{Known: opp and hyp. Which ratio?}"
  ),
  trigAnswer(
    "trig-rat-m6",
    "In a right triangle, opposite = 3 and adjacent = 4. What is tan θ? Give your answer as a decimal.",
    "\\text{opp}=3,\\quad\\text{adj}=4",
    "0.75",
    ["3/4", "0.75"]
  ),
  trigChoice(
    "trig-rat-m7",
    "A right triangle has sides 5, 12 and 13 (right angle opposite 13). Angle θ is at the vertex where the sides of length 5 and 13 meet. Which side is adjacent to θ?",
    "A",
    [
      "The side of length 5 — it connects θ to the right angle",
      "The side of length 12 — it is opposite θ",
      "The side of length 13 — it is the hypotenuse",
      "Both 5 and 12 are adjacent",
    ],
    "Adjacent means the non-hypotenuse side that shares the marked angle vertex. The side of length 5 runs from θ to the right angle. The side of length 12 is opposite (doesn't touch θ), and 13 is the hypotenuse.",
    "\\text{5-12-13 triangle, }\\theta\\text{ between sides 5 and 13}"
  ),
  trigChoice(
    "trig-rat-m8",
    "In a 3-4-5 right triangle, sin θ = 3/5. What is cos θ for the same angle θ?",
    "C",
    [
      "$\\dfrac{3}{5}$",
      "$\\dfrac{3}{4}$",
      "$\\dfrac{4}{5}$",
      "$\\dfrac{5}{4}$",
    ],
    "If sin θ = 3/5, then opp = 3 and hyp = 5. By Pythagoras, adj = 4. So cos θ = adj/hyp = 4/5.",
    "\\sin\\theta=\\dfrac{3}{5}\\implies\\cos\\theta=?"
  ),
  trigChoice(
    "trig-rat-m9",
    "Which expression correctly gives tan θ when opposite = 7 and adjacent = 24?",
    "A",
    [
      "$\\tan\\theta=\\dfrac{7}{24}$",
      "$\\tan\\theta=\\dfrac{24}{7}$",
      "$\\tan\\theta=\\dfrac{7}{25}$",
      "$\\tan\\theta=\\dfrac{24}{25}$",
    ],
    "TOA: tan θ = opp ÷ adj = 7 ÷ 24. Note: 24/7 is upside-down, and 7/25 or 24/25 confuse the hypotenuse (25 in this Pythagorean triple) with adjacent.",
    "\\text{opp}=7,\\quad\\text{adj}=24"
  ),
  trigChoice(
    "trig-rat-m10",
    "A student claims: 'the hypotenuse is adjacent to the right angle because adjacent means next to.' What is wrong?",
    "B",
    [
      "Nothing — the hypotenuse does touch the right-angle vertex",
      "Adjacent and opposite are defined relative to the MARKED angle, not the right angle. The hypotenuse is always OPPOSITE the right angle.",
      "Adjacent only applies to the longest side",
      "The student is correct for isosceles right triangles",
    ],
    "The terms opposite, adjacent, and hypotenuse are all defined relative to the marked angle θ, not the right angle. The hypotenuse is the side OPPOSITE the right angle — it is the longest side.",
    "\\text{Identify the error in the student's claim}"
  ),
];

// ─── Lesson 2: Finding Unknown Sides ─────────────────────────────────────────

const findingSidesWorkedExamples: WorkedExample[] = [
  {
    title: "Finding the opposite side using sin",
    questionLatex:
      "\\text{Find }x\\text{ in a right triangle where the hypotenuse is 10 and }\\theta=35^\\circ.",
    triangleDiagram: {
      description:
        "Right triangle with angle theta = 35 degrees at A (top left), right angle at C (bottom left), hypotenuse AB = 10, and unknown opposite side BC labelled x.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "35°" },
      sideLabels: { AB: "10", BC: "x" },
    },
    steps: [
      {
        explanation:
          "Known: hypotenuse = 10 and angle = 35°. Want: opposite side x. Use SOH.",
        latex: "\\sin 35^\\circ=\\frac{x}{10}",
      },
      {
        explanation: "Multiply both sides by 10.",
        latex: "x=10\\times\\sin 35^\\circ",
      },
      {
        explanation: "Evaluate on a calculator in degree mode. Round to 1 decimal place.",
        latex: "x=10\\times 0.5736\\approx 5.7",
      },
    ],
    finalAnswerLatex: "x\\approx 5.7",
  },
  {
    title: "Finding the adjacent side using cos",
    questionLatex:
      "\\text{Find }x\\text{ in a right triangle where the hypotenuse is 8 and }\\theta=42^\\circ.",
    triangleDiagram: {
      description:
        "Right triangle with angle theta = 42 degrees at A (top left), right angle at C (bottom left), hypotenuse AB = 8, and unknown adjacent side AC labelled x.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "42°" },
      sideLabels: { AB: "8", AC: "x" },
    },
    steps: [
      {
        explanation:
          "Known: hypotenuse = 8 and angle = 42°. Want: adjacent side x. Use CAH.",
        latex: "\\cos 42^\\circ=\\frac{x}{8}",
      },
      {
        explanation: "Multiply both sides by 8.",
        latex: "x=8\\times\\cos 42^\\circ",
      },
      {
        explanation: "Evaluate. Round to 1 decimal place.",
        latex: "x=8\\times 0.7431\\approx 5.9",
      },
    ],
    finalAnswerLatex: "x\\approx 5.9",
  },
  {
    title: "Finding the hypotenuse using sin",
    questionLatex:
      "\\text{The opposite side is 6 and }\\theta=30^\\circ.\\text{ Find the hypotenuse.}",
    triangleDiagram: {
      description:
        "Right triangle with angle theta = 30 degrees at A (top left), right angle at C (bottom left), opposite side BC = 6, and unknown hypotenuse AB labelled h.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "30°" },
      sideLabels: { AB: "h", BC: "6" },
    },
    steps: [
      {
        explanation:
          "Known: opposite = 6, angle = 30°. Want: hypotenuse h. Use SOH.",
        latex: "\\sin 30^\\circ=\\frac{6}{h}",
      },
      {
        explanation:
          "Multiply both sides by h, then divide by sin 30°.",
        latex: "h=\\frac{6}{\\sin 30^\\circ}",
      },
      {
        explanation:
          "sin 30° = 0.5 exactly, so divide.",
        latex: "h=\\frac{6}{0.5}=12",
      },
    ],
    finalAnswerLatex: "h=12",
  },
];

const findingSidesGuided: PracticeQuestion[] = [
  trigChoice(
    "find-side-g1",
    "In a right triangle, hypotenuse = 10 and angle θ = 40°. Which equation correctly finds the opposite side?",
    "A",
    [
      "$\\text{opp}=10\\times\\sin 40^\\circ$",
      "$\\text{opp}=10\\times\\cos 40^\\circ$",
      "$\\text{opp}=10\\times\\tan 40^\\circ$",
      "$\\text{opp}=10\\div\\sin 40^\\circ$",
    ],
    "SOH: sin θ = opp/hyp. Rearranging: opp = hyp × sin θ = 10 × sin 40°. Dividing by sin 40° would give the hypotenuse (when opp is known), not the opposite.",
    "\\text{hyp}=10,\\;\\theta=40^\\circ,\\;\\text{find opp}"
  ),
  trigChoice(
    "find-side-g2",
    "In a right triangle, hypotenuse = 15 and angle θ = 55°. Which equation finds the adjacent side?",
    "A",
    [
      "$\\text{adj}=15\\times\\cos 55^\\circ$",
      "$\\text{adj}=15\\times\\sin 55^\\circ$",
      "$\\text{adj}=15\\div\\cos 55^\\circ$",
      "$\\text{adj}=15\\times\\tan 55^\\circ$",
    ],
    "CAH: cos θ = adj/hyp. Rearranging: adj = hyp × cos θ = 15 × cos 55°.",
    "\\text{hyp}=15,\\;\\theta=55^\\circ,\\;\\text{find adj}"
  ),
  trigAnswer(
    "find-side-g3",
    "In a right triangle, hypotenuse = 12 and angle θ = 30°. Find the opposite side. Round to 1 decimal place.",
    "\\text{hyp}=12,\\;\\theta=30^\\circ,\\;\\text{find opp}",
    "6",
    ["6.0"]
  ),
  trigChoice(
    "find-side-g4",
    "The opposite side = 4 and angle θ = 40°. Which equation gives the hypotenuse?",
    "A",
    [
      "$\\text{hyp}=4\\div\\sin 40^\\circ$",
      "$\\text{hyp}=4\\times\\sin 40^\\circ$",
      "$\\text{hyp}=4\\div\\cos 40^\\circ$",
      "$\\text{hyp}=4\\times\\cos 40^\\circ$",
    ],
    "SOH: sin θ = opp/hyp, so hyp = opp ÷ sin θ = 4 ÷ sin 40°. When the hyp is unknown, you divide by the ratio, not multiply.",
    "\\text{opp}=4,\\;\\theta=40^\\circ,\\;\\text{find hyp}"
  ),
];

const findingSidesIndependent: PracticeQuestion[] = [
  trigAnswer(
    "find-side-i1",
    "In a right triangle, hypotenuse = 10 and angle θ = 45°. Find the opposite side to 1 decimal place.",
    "\\text{hyp}=10,\\;\\theta=45^\\circ,\\;\\text{find opp}",
    "7.1",
    ["7.1"]
  ),
  trigAnswer(
    "find-side-i2",
    "In a right triangle, hypotenuse = 20 and angle θ = 60°. Find the adjacent side to 1 decimal place.",
    "\\text{hyp}=20,\\;\\theta=60^\\circ,\\;\\text{find adj}",
    "10",
    ["10.0"]
  ),
  trigChoice(
    "find-side-i3",
    "In a right triangle, opposite = 5 and angle θ = 30°. Which equation gives the hypotenuse?",
    "A",
    [
      "$\\text{hyp}=5\\div\\sin 30^\\circ$",
      "$\\text{hyp}=5\\times\\sin 30^\\circ$",
      "$\\text{hyp}=5\\div\\tan 30^\\circ$",
      "$\\text{hyp}=5\\times\\cos 30^\\circ$",
    ],
    "SOH: hyp = opp ÷ sin θ = 5 ÷ sin 30° = 5 ÷ 0.5 = 10.",
    "\\text{opp}=5,\\;\\theta=30^\\circ,\\;\\text{find hyp}"
  ),
  trigAnswer(
    "find-side-i4",
    "In a right triangle, adjacent = 9 and angle θ = 53°. Find the opposite side to 1 decimal place.",
    "\\text{adj}=9,\\;\\theta=53^\\circ,\\;\\text{find opp}",
    "11.9",
    ["11.9"]
  ),
  trigAnswer(
    "find-side-i5",
    "In a right triangle, hypotenuse = 16 and angle θ = 25°. Find the adjacent side to 1 decimal place.",
    "\\text{hyp}=16,\\;\\theta=25^\\circ,\\;\\text{find adj}",
    "14.5",
    ["14.5"]
  ),
];

const findingSidesMistakes = [
  {
    mistake:
      "Using sin when cos is needed — e.g. writing sin θ = adj/hyp and getting the wrong side.",
    fix:
      "Always label the triangle first: mark the known angle, then identify which two sides are involved. Use SOH-CAH-TOA to match them to the correct ratio.",
  },
  {
    mistake:
      "Multiplying when the hypotenuse is unknown — writing hyp = opp × sin θ instead of hyp = opp ÷ sin θ.",
    fix:
      "When the hypotenuse is the unknown, rearrange: sin θ = opp/hyp → hyp = opp ÷ sin θ. Multiplying would make hyp smaller than opp, which is impossible since the hypotenuse is the longest side.",
  },
  {
    mistake:
      "Calculator left in radian mode — getting a completely wrong decimal answer such as sin 35° = −0.428.",
    fix:
      "Always check your calculator is in DEG mode before any trigonometry calculation. In radian mode, sin(35) means 35 radians, which is not the angle 35°.",
  },
  {
    mistake:
      "Rounding an intermediate value and then continuing the calculation, causing accumulated rounding error.",
    fix:
      "Keep the full calculator value throughout the working. Only round the final answer to the specified number of decimal places.",
  },
];

const findingSidesMastery: PracticeQuestion[] = [
  trigChoice(
    "find-side-m1",
    "In a right triangle, angle θ = 50° and hypotenuse = 18. Which equation finds the opposite side?",
    "A",
    [
      "$\\text{opp}=18\\times\\sin 50^\\circ$",
      "$\\text{opp}=18\\times\\cos 50^\\circ$",
      "$\\text{opp}=18\\div\\sin 50^\\circ$",
      "$\\text{opp}=18\\div\\cos 50^\\circ$",
    ],
    "SOH: opp = hyp × sin θ = 18 × sin 50°.",
    "\\text{hyp}=18,\\;\\theta=50^\\circ,\\;\\text{find opp}"
  ),
  trigAnswer(
    "find-side-m2",
    "In a right triangle, hypotenuse = 8 and angle θ = 35°. Find the opposite side to 1 decimal place.",
    "\\text{hyp}=8,\\;\\theta=35^\\circ,\\;\\text{find opp}",
    "4.6",
    ["4.6"]
  ),
  trigAnswer(
    "find-side-m3",
    "In a right triangle, hypotenuse = 14 and angle θ = 40°. Find the adjacent side to 1 decimal place.",
    "\\text{hyp}=14,\\;\\theta=40^\\circ,\\;\\text{find adj}",
    "10.7",
    ["10.7"]
  ),
  trigChoice(
    "find-side-m4",
    "Adjacent = 6 and angle θ = 50°. Which equation gives the hypotenuse?",
    "A",
    [
      "$\\text{hyp}=6\\div\\cos 50^\\circ$",
      "$\\text{hyp}=6\\times\\cos 50^\\circ$",
      "$\\text{hyp}=6\\div\\sin 50^\\circ$",
      "$\\text{hyp}=6\\times\\sin 50^\\circ$",
    ],
    "CAH: cos θ = adj/hyp → hyp = adj ÷ cos θ = 6 ÷ cos 50°.",
    "\\text{adj}=6,\\;\\theta=50^\\circ,\\;\\text{find hyp}"
  ),
  trigAnswer(
    "find-side-m5",
    "In a right triangle, adjacent = 20 and angle θ = 28°. Find the opposite side to 1 decimal place.",
    "\\text{adj}=20,\\;\\theta=28^\\circ,\\;\\text{find opp}",
    "10.6",
    ["10.6"]
  ),
  trigChoice(
    "find-side-m6",
    "Opposite = 5 and angle θ = 60°. A student writes hyp = 5 × sin 60°. What is wrong?",
    "A",
    [
      "The hypotenuse should be opp ÷ sin 60°, not opp × sin 60°",
      "The student should use cos 60°, not sin 60°",
      "The student should use tan 60°",
      "Nothing is wrong — both forms are equivalent",
    ],
    "SOH: sin θ = opp/hyp → hyp = opp ÷ sin θ. Multiplying gives a result smaller than 5, but the hypotenuse must be longer than the opposite side.",
    "\\text{opp}=5,\\;\\theta=60^\\circ,\\;\\text{find hyp}"
  ),
  trigAnswer(
    "find-side-m7",
    "In a right triangle, opposite = 5 and angle θ = 60°. Find the hypotenuse to 1 decimal place.",
    "\\text{opp}=5,\\;\\theta=60^\\circ,\\;\\text{find hyp}",
    "5.8",
    ["5.8"]
  ),
  trigAnswer(
    "find-side-m8",
    "A ramp rises at an angle of 20° and is 8 m long. Find the vertical height of the ramp to 1 decimal place.",
    "\\text{hyp}=8\\text{ m},\\;\\theta=20^\\circ,\\;\\text{find vertical height}",
    "2.7",
    ["2.7", "2.7 m", "2.7m"]
  ),
  trigChoice(
    "find-side-m9",
    "A 6 m ladder leans against a wall at 65° to the ground. Which equation gives the height reached on the wall?",
    "A",
    [
      "$h=6\\times\\sin 65^\\circ$",
      "$h=6\\times\\cos 65^\\circ$",
      "$h=6\\div\\sin 65^\\circ$",
      "$h=6\\times\\tan 65^\\circ$",
    ],
    "The ladder is the hypotenuse (6 m), the height up the wall is the opposite side, and the angle to the ground is θ = 65°. SOH: h = 6 × sin 65°.",
    "\\text{hyp}=6\\text{ m},\\;\\theta=65^\\circ,\\;\\text{find height}"
  ),
  trigChoice(
    "find-side-m10",
    "A roof has a horizontal run of 8 m and a rise angle of 25° at the eaves. Which equation gives the length of the sloping roof?",
    "B",
    [
      "$\\text{slant}=8\\times\\cos 25^\\circ$",
      "$\\text{slant}=8\\div\\cos 25^\\circ$",
      "$\\text{slant}=8\\times\\sin 25^\\circ$",
      "$\\text{slant}=8\\div\\sin 25^\\circ$",
    ],
    "The horizontal run (8 m) is adjacent to the 25° angle. The sloping roof is the hypotenuse. CAH: hyp = adj ÷ cos θ = 8 ÷ cos 25°.",
    "\\text{adj}=8\\text{ m},\\;\\theta=25^\\circ,\\;\\text{find hyp (slant)}"
  ),
];

// ─── Lesson 3: Finding Unknown Angles ────────────────────────────────────────

const findingAnglesWorkedExamples: WorkedExample[] = [
  {
    title: "Finding an angle using sin⁻¹",
    questionLatex:
      "\\text{Find angle }\\theta\\text{ to the nearest degree. Opposite}=6,\\text{ Hypotenuse}=10.",
    triangleDiagram: {
      description:
        "Right triangle with unknown angle theta at A (top left), right angle at C (bottom left), opposite side BC = 6, and hypotenuse AB = 10.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
      sideLabels: { AB: "10", BC: "6" },
    },
    steps: [
      {
        explanation:
          "The opposite (6) and hypotenuse (10) are known. Use SOH: sin θ = opp/hyp.",
        latex: "\\sin\\theta=\\frac{6}{10}=0.6",
      },
      {
        explanation:
          "Apply the inverse sine function to find θ. Make sure the calculator is in degree mode.",
        latex: "\\theta=\\sin^{-1}(0.6)",
      },
      {
        explanation: "Evaluate and round to the nearest degree.",
        latex: "\\theta\\approx 37^\\circ",
      },
    ],
    finalAnswerLatex: "\\theta\\approx 37^\\circ",
  },
  {
    title: "Finding an angle using cos⁻¹",
    questionLatex:
      "\\text{Find angle }\\theta\\text{ to the nearest degree. Adjacent}=8,\\text{ Hypotenuse}=17.",
    triangleDiagram: {
      description:
        "Right triangle with unknown angle theta at A (top left), right angle at C (bottom left), adjacent side AC = 8, and hypotenuse AB = 17.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
      sideLabels: { AB: "17", AC: "8" },
    },
    steps: [
      {
        explanation:
          "Adjacent (8) and hypotenuse (17) are known. Use CAH: cos θ = adj/hyp.",
        latex: "\\cos\\theta=\\frac{8}{17}\\approx 0.4706",
      },
      {
        explanation: "Apply the inverse cosine to find θ.",
        latex: "\\theta=\\cos^{-1}\\!\\left(\\frac{8}{17}\\right)",
      },
      {
        explanation: "Evaluate and round to the nearest degree.",
        latex: "\\theta\\approx 62^\\circ",
      },
    ],
    finalAnswerLatex: "\\theta\\approx 62^\\circ",
  },
  {
    title: "Finding an angle using tan⁻¹",
    questionLatex:
      "\\text{Find angle }\\theta\\text{ to the nearest degree. Opposite}=5,\\text{ Adjacent}=5.",
    triangleDiagram: {
      description:
        "Right triangle with unknown angle theta at A (top left), right angle at C (bottom left), opposite side BC = 5, and adjacent side AC = 5.",
      vertices: {
        A: { x: 80, y: 40 },
        C: { x: 80, y: 230 },
        B: { x: 330, y: 230 },
      },
      rightAngleAt: "C",
      angleLabels: { A: "θ" },
      sideLabels: { AC: "5", BC: "5" },
    },
    steps: [
      {
        explanation:
          "Opposite (5) and adjacent (5) are known. Use TOA: tan θ = opp/adj.",
        latex: "\\tan\\theta=\\frac{5}{5}=1",
      },
      {
        explanation: "Apply the inverse tangent to find θ.",
        latex: "\\theta=\\tan^{-1}(1)",
      },
      {
        explanation: "tan⁻¹(1) = 45° exactly — this is a special angle.",
        latex: "\\theta=45^\\circ",
      },
    ],
    finalAnswerLatex: "\\theta=45^\\circ",
  },
];

const findingAnglesGuided: PracticeQuestion[] = [
  trigChoice(
    "find-ang-g1",
    "Opposite = 4, hypotenuse = 8. Which equation correctly finds angle θ?",
    "A",
    [
      "$\\theta=\\sin^{-1}(0.5)$",
      "$\\theta=\\cos^{-1}(0.5)$",
      "$\\theta=\\tan^{-1}(0.5)$",
      "$\\theta=\\sin^{-1}(2)$",
    ],
    "SOH: sin θ = opp/hyp = 4/8 = 0.5. To find θ, apply the inverse: θ = sin⁻¹(0.5) = 30°. Note: sin⁻¹(2) is undefined (sine cannot exceed 1).",
    "\\text{opp}=4,\\quad\\text{hyp}=8"
  ),
  trigAnswer(
    "find-ang-g2",
    "Adjacent = 6, hypotenuse = 10. Find angle θ to the nearest degree.",
    "\\text{adj}=6,\\quad\\text{hyp}=10",
    "53",
    ["53°", "53 degrees"]
  ),
  trigChoice(
    "find-ang-g3",
    "Opposite = 5, adjacent = 5. Which calculation gives θ?",
    "A",
    [
      "$\\theta=\\tan^{-1}(1)=45^\\circ$",
      "$\\theta=\\sin^{-1}(1)=90^\\circ$",
      "$\\theta=\\cos^{-1}(1)=0^\\circ$",
      "$\\theta=\\tan^{-1}(5)$",
    ],
    "TOA: tan θ = opp/adj = 5/5 = 1. So θ = tan⁻¹(1) = 45°. When opp = adj, the angle is always 45°.",
    "\\text{opp}=5,\\quad\\text{adj}=5"
  ),
  trigAnswer(
    "find-ang-g4",
    "Opposite = 3, hypotenuse = 5. Find angle θ to the nearest degree.",
    "\\text{opp}=3,\\quad\\text{hyp}=5",
    "37",
    ["37°", "37 degrees"]
  ),
];

const findingAnglesIndependent: PracticeQuestion[] = [
  trigAnswer(
    "find-ang-i1",
    "Adjacent = 9, hypotenuse = 15. Find angle θ to the nearest degree.",
    "\\text{adj}=9,\\quad\\text{hyp}=15",
    "53",
    ["53°", "53 degrees"]
  ),
  trigChoice(
    "find-ang-i2",
    "If tan θ = 2.5, how do you find θ on a calculator?",
    "A",
    [
      "Press $\\tan^{-1}$ then enter 2.5",
      "Press $\\tan$ then enter 2.5",
      "Divide 1 by 2.5 and press $\\tan$",
      "Press $\\cos^{-1}$ then enter 2.5",
    ],
    "The inverse tangent (tan⁻¹ or arctan) undoes the tangent function. Press tan⁻¹ then 2.5 to get θ ≈ 68°.",
    "\\tan\\theta=2.5\\implies\\theta=?"
  ),
  trigAnswer(
    "find-ang-i3",
    "Opposite = 7, adjacent = 24. Find angle θ to the nearest degree.",
    "\\text{opp}=7,\\quad\\text{adj}=24",
    "16",
    ["16°", "16 degrees"]
  ),
  trigAnswer(
    "find-ang-i4",
    "Opposite = 12, hypotenuse = 13. Find angle θ to the nearest degree.",
    "\\text{opp}=12,\\quad\\text{hyp}=13",
    "67",
    ["67°", "67 degrees"]
  ),
  trigChoice(
    "find-ang-i5",
    "A student writes θ = sin(3/5) instead of θ = sin⁻¹(3/5). What is the error?",
    "A",
    [
      "sin(3/5) computes the sine of the number 0.6, not the angle whose sine is 0.6. The inverse function sin⁻¹ is required.",
      "The ratio 3/5 is upside-down — it should be 5/3.",
      "The student should use cos⁻¹ instead of sin⁻¹.",
      "There is no error — both expressions give the same result.",
    ],
    "sin⁻¹ (inverse sine) finds the angle when the ratio is known. sin(0.6) evaluates the sine of 0.6 radians ≈ 0.565, which is a ratio, not an angle.",
    "\\theta=\\sin(3/5)\\text{ vs }\\theta=\\sin^{-1}(3/5)"
  ),
];

const findingAnglesMistakes = [
  {
    mistake:
      "Pressing sin instead of sin⁻¹ — the calculator returns a ratio (a decimal), not an angle.",
    fix:
      "Use the inverse function: sin⁻¹ (sometimes labelled arcsin or ASIN). The result will be an angle in degrees when the calculator is in degree mode.",
  },
  {
    mistake:
      "Inverting the ratio — e.g. computing cos⁻¹(hyp/adj) instead of cos⁻¹(adj/hyp).",
    fix:
      "Write the ratio correctly first: cos θ = adj/hyp (adj in the numerator). Only then apply cos⁻¹. If adj < hyp, the ratio is less than 1, which is valid. If you invert it, you get a value greater than 1 and the inverse trig is undefined.",
  },
  {
    mistake:
      "Calculator in radian mode — getting an angle in radians instead of degrees (e.g. 0.6435 rad instead of 36.9°).",
    fix:
      "Check that the calculator displays 'D' or 'DEG' before computing. In degree mode, sin⁻¹(0.5) = 30, not 0.5236.",
  },
  {
    mistake:
      "Rounding the ratio to fewer decimal places before applying the inverse function, e.g. rounding 12/13 ≈ 0.9 before taking sin⁻¹.",
    fix:
      "Enter the full fraction or unrounded decimal into the inverse function: sin⁻¹(12 ÷ 13). Rounding 0.9231 to 0.9 changes the answer from 67° to 64°.",
  },
];

const findingAnglesMastery: PracticeQuestion[] = [
  trigChoice(
    "find-ang-m1",
    "Opposite = 5, hypotenuse = 13. Which equation finds θ?",
    "A",
    [
      "$\\theta=\\sin^{-1}(5/13)$",
      "$\\theta=\\cos^{-1}(5/13)$",
      "$\\theta=\\tan^{-1}(5/13)$",
      "$\\theta=\\sin^{-1}(13/5)$",
    ],
    "SOH: sin θ = opp/hyp = 5/13. Apply the inverse: θ = sin⁻¹(5/13) ≈ 23°.",
    "\\text{opp}=5,\\quad\\text{hyp}=13"
  ),
  trigAnswer(
    "find-ang-m2",
    "Adjacent = 15, hypotenuse = 17. Find angle θ to the nearest degree.",
    "\\text{adj}=15,\\quad\\text{hyp}=17",
    "28",
    ["28°", "28 degrees"]
  ),
  trigChoice(
    "find-ang-m3",
    "Which calculator button gives the inverse of the cosine function?",
    "B",
    ["$\\cos$", "$\\cos^{-1}$  (or arccos)", "$\\frac{1}{\\cos}$", "$\\cos^2$"],
    "cos⁻¹ (also written arccos) is the inverse cosine function. It returns the angle whose cosine equals the given value. 1/cos is the reciprocal (secant), which is different.",
    "\\text{Which button finds }\\theta\\text{ from }\\cos\\theta?"
  ),
  trigAnswer(
    "find-ang-m4",
    "Opposite = 5, adjacent = 5. Find angle θ to the nearest degree.",
    "\\text{opp}=5,\\quad\\text{adj}=5",
    "45",
    ["45°", "45 degrees"]
  ),
  trigAnswer(
    "find-ang-m5",
    "Opposite = 8, hypotenuse = 10. Find angle θ to the nearest degree.",
    "\\text{opp}=8,\\quad\\text{hyp}=10",
    "53",
    ["53°", "53 degrees"]
  ),
  trigChoice(
    "find-ang-m6",
    "A student computes θ = sin⁻¹(0.6) on a calculator in radian mode and gets θ ≈ 0.64. What should θ be in degrees?",
    "C",
    ["$0.64^\\circ$", "$6.4^\\circ$", "$37^\\circ$", "$64^\\circ$"],
    "sin⁻¹(0.6) = 36.87° ≈ 37°. In radian mode the calculator returns 0.6435 radians, which is approximately 37° when converted. Always use degree mode.",
    "\\sin^{-1}(0.6)\\text{ in degree mode}"
  ),
  trigAnswer(
    "find-ang-m7",
    "Adjacent = 5, hypotenuse = 13. Find angle θ to the nearest degree.",
    "\\text{adj}=5,\\quad\\text{hyp}=13",
    "67",
    ["67°", "67 degrees"]
  ),
  trigChoice(
    "find-ang-m8",
    "In a right triangle, opp = 9 and hyp = 10. A student writes θ = sin⁻¹(10/9). What is wrong?",
    "A",
    [
      "The ratio is inverted — sin θ = opp/hyp = 9/10, so θ = sin⁻¹(9/10)",
      "The student should use cos⁻¹, not sin⁻¹",
      "10/9 > 1, but this is valid for inverse sine",
      "Nothing is wrong",
    ],
    "sin θ = opp/hyp = 9/10 (smaller ÷ larger). The inverse must also use 9/10: θ = sin⁻¹(9/10) ≈ 64°. The value sin⁻¹(10/9) is undefined because 10/9 > 1.",
    "\\text{opp}=9,\\quad\\text{hyp}=10"
  ),
  trigAnswer(
    "find-ang-m9",
    "Opposite = 24, adjacent = 7. Find angle θ to the nearest degree.",
    "\\text{opp}=24,\\quad\\text{adj}=7",
    "74",
    ["74°", "74 degrees"]
  ),
  trigChoice(
    "find-ang-m10",
    "The horizontal distance from a point to the base of a wall is 21 m. An observer looks up to the top at angle θ = tan⁻¹(28/21). What is the height of the wall?",
    "C",
    ["$21\\text{ m}$", "$\\sqrt{28^2+21^2}\\text{ m}$", "$28\\text{ m}$", "$\\tan^{-1}(28/21)\\text{ m}$"],
    "tan θ = opp/adj = height/21. The expression tan⁻¹(28/21) tells us that height = 28 m (the numerator is opposite, the denominator is adjacent).",
    "\\theta=\\tan^{-1}\\!\\left(\\dfrac{28}{21}\\right),\\quad\\text{adj}=21"
  ),
];

// ─── Lesson 4: Angles of Elevation and Depression ────────────────────────────

const elevationDepressionWorkedExamples: WorkedExample[] = [
  {
    title: "Using angle of elevation to find a height",
    questionLatex:
      "\\text{A person stands 20 m from a building. The angle of elevation to the top is 38}^\\circ.\\text{ Find the height.}",
    triangleDiagram: {
      description:
        "Right triangle modelling angle of elevation. Observer at A (bottom left), right angle at B (bottom right), top of building at C (top right). Horizontal distance AB = 20 m, height BC = h, angle of elevation at A = 38 degrees.",
      vertices: {
        A: { x: 60, y: 230 },
        B: { x: 330, y: 230 },
        C: { x: 330, y: 60 },
      },
      rightAngleAt: "B",
      angleLabels: { A: "38°" },
      sideLabels: { AB: "20 m", BC: "h" },
      vertexLabels: { A: "Observer", C: "Top" },
    },
    steps: [
      {
        explanation:
          "Draw the right triangle: the horizontal distance (20 m) is adjacent to the elevation angle, and the height h is opposite.",
        latex: "\\tan 38^\\circ=\\frac{h}{20}",
      },
      {
        explanation: "Multiply both sides by 20.",
        latex: "h=20\\times\\tan 38^\\circ",
      },
      {
        explanation: "Evaluate on a calculator in degree mode. Round to 1 decimal place.",
        latex: "h=20\\times 0.7813\\approx 15.6\\text{ m}",
      },
    ],
    finalAnswerLatex: "h\\approx 15.6\\text{ m}",
  },
  {
    title: "Using angle of depression to find a horizontal distance",
    questionLatex:
      "\\text{From the top of a 30 m cliff, the angle of depression to a boat is 25}^\\circ.\\text{ Find the horizontal distance.}",
    triangleDiagram: {
      description:
        "Right triangle modelling angle of depression. Observer at A (top left), horizontal reference at B (top right) with right angle, boat at C (bottom right). Cliff height BC = 30 m, horizontal distance AB = d, angle of depression at A = 25 degrees.",
      vertices: {
        A: { x: 60, y: 60 },
        B: { x: 330, y: 60 },
        C: { x: 330, y: 230 },
      },
      rightAngleAt: "B",
      angleLabels: { A: "25°" },
      sideLabels: { BC: "30 m", AB: "d" },
      vertexLabels: { A: "Observer", C: "Boat" },
    },
    steps: [
      {
        explanation:
          "The angle of depression (25°) is at the observer A, measured downward from the horizontal AB. In the right triangle, BC = 30 m is opposite to angle A and AB = d is adjacent.",
        latex: "\\tan 25^\\circ=\\frac{30}{d}",
      },
      {
        explanation: "Multiply both sides by d, then divide by tan 25°.",
        latex: "d=\\frac{30}{\\tan 25^\\circ}",
      },
      {
        explanation: "Evaluate and round to 1 decimal place.",
        latex: "d=\\frac{30}{0.4663}\\approx 64.3\\text{ m}",
      },
    ],
    finalAnswerLatex: "d\\approx 64.3\\text{ m}",
  },
  {
    title: "Finding the angle of elevation from distance and height",
    questionLatex:
      "\\text{A flag pole is 15 m tall. An observer is 20 m away. Find the angle of elevation to the nearest degree.}",
    triangleDiagram: {
      description:
        "Right triangle with observer at A (bottom left), right angle at B (bottom right), flag top at C (top right). Horizontal distance AB = 20 m, height BC = 15 m, angle of elevation theta at A.",
      vertices: {
        A: { x: 60, y: 230 },
        B: { x: 330, y: 230 },
        C: { x: 330, y: 60 },
      },
      rightAngleAt: "B",
      angleLabels: { A: "θ" },
      sideLabels: { AB: "20 m", BC: "15 m" },
    },
    steps: [
      {
        explanation:
          "Height (15 m) is opposite θ and horizontal distance (20 m) is adjacent. Use TOA.",
        latex: "\\tan\\theta=\\frac{15}{20}=0.75",
      },
      {
        explanation: "Apply the inverse tangent.",
        latex: "\\theta=\\tan^{-1}(0.75)",
      },
      {
        explanation: "Evaluate and round to the nearest degree.",
        latex: "\\theta\\approx 37^\\circ",
      },
    ],
    finalAnswerLatex: "\\theta\\approx 37^\\circ",
  },
];

const elevationDepressionGuided: PracticeQuestion[] = [
  trigChoice(
    "elev-dep-g1",
    "What is the angle of elevation?",
    "A",
    [
      "The angle measured upward from the horizontal to the line of sight to an object above",
      "The angle measured downward from the vertical to the line of sight",
      "The angle at the top of a right triangle",
      "The angle between the two shorter sides of the triangle",
    ],
    "The angle of elevation is always measured upward from a horizontal line to the line of sight. It is formed at the observer's eye level.",
    "\\text{Define angle of elevation}"
  ),
  trigAnswer(
    "elev-dep-g2",
    "From 30 m away, the angle of elevation to the top of a tower is 45°. Find the height of the tower to the nearest metre.",
    "\\text{horizontal}=30\\text{ m},\\;\\theta=45^\\circ,\\;\\text{find height}",
    "30",
    ["30 m", "30m", "30 metres"]
  ),
  trigChoice(
    "elev-dep-g3",
    "An observer on a cliff looks down at a boat. The angle of depression is 35°. Which side of the right triangle is the horizontal distance?",
    "B",
    [
      "The hypotenuse — it is the line of sight from observer to boat",
      "The side from the observer horizontally to a point directly above the boat",
      "The vertical side — the height of the cliff",
      "There is no horizontal side in a depression problem",
    ],
    "In the right triangle for depression: the horizontal is from the observer to a point directly above (or level with) the object. It is adjacent to the angle of depression. The line of sight is the hypotenuse, and the vertical is the opposite side.",
    "\\text{Angle of depression: identify horizontal side}"
  ),
  trigAnswer(
    "elev-dep-g4",
    "From the top of a 50 m cliff, the angle of depression to a ship is 28°. Find the horizontal distance to the ship to the nearest metre.",
    "\\text{height}=50\\text{ m},\\;\\theta=28^\\circ,\\;\\text{find horizontal distance}",
    "94",
    ["94 m", "94m", "94 metres"]
  ),
];

const elevationDepressionIndependent: PracticeQuestion[] = [
  trigAnswer(
    "elev-dep-i1",
    "From 40 m away from the base of a tree, the angle of elevation to the top is 32°. Find the height of the tree to the nearest metre.",
    "\\text{horizontal}=40\\text{ m},\\;\\theta=32^\\circ,\\;\\text{find height}",
    "25",
    ["25 m", "25m", "25 metres"]
  ),
  trigChoice(
    "elev-dep-i2",
    "Which diagram correctly represents an angle of depression from an observer O to an object P below?",
    "A",
    [
      "Observer O at top-left, horizontal reference H at top-right, object P at bottom-right — angle measured from OH down to OP",
      "Observer O at bottom-left, object P at top-right — angle measured from OP up to the horizontal",
      "Observer O at bottom-left, object P at top-left — angle between the two sides",
      "Observer O and object P at the same height — angle is 0°",
    ],
    "Angle of depression: the observer is higher than the object. The angle is measured downward from the horizontal at O. The horizontal reference goes from O to a point level with O, and the line of sight OP goes downward to P.",
    "\\text{Which describes angle of depression correctly?}"
  ),
  trigAnswer(
    "elev-dep-i3",
    "A building is 18 m tall. An observer stands 24 m from the base. Find the angle of elevation to the top, to the nearest degree.",
    "\\text{height}=18\\text{ m},\\;\\text{horizontal}=24\\text{ m}",
    "37",
    ["37°", "37 degrees"]
  ),
  trigAnswer(
    "elev-dep-i4",
    "From the top of a 45 m lighthouse, the angle of depression to a boat is 15°. Find the horizontal distance from the lighthouse to the boat to the nearest metre.",
    "\\text{height}=45\\text{ m},\\;\\theta=15^\\circ,\\;\\text{find horizontal distance}",
    "168",
    ["168 m", "168m", "168 metres"]
  ),
  trigAnswer(
    "elev-dep-i5",
    "Building A is 25 m tall and building B is 10 m tall. They are 30 m apart (horizontally). Find the angle of elevation from the top of building B to the top of building A, to the nearest degree.",
    "\\text{height difference}=15\\text{ m},\\;\\text{horizontal}=30\\text{ m}",
    "27",
    ["27°", "27 degrees"]
  ),
];

const elevationDepressionMistakes = [
  {
    mistake:
      "Mixing up the opposite and adjacent sides — writing tan θ = horizontal/height instead of height/horizontal for an elevation angle.",
    fix:
      "The angle of elevation is at the observer's position. Opposite = height (vertical), adjacent = horizontal distance. tan θ = opp/adj = height/horizontal.",
  },
  {
    mistake:
      "Thinking the angle of depression and the angle of elevation are different angles for the same scenario.",
    fix:
      "When an observer looks down at an object, the angle of depression from the observer equals the angle of elevation from the object looking back up — they are alternate interior angles formed by parallel horizontal lines.",
  },
  {
    mistake:
      "Using the wrong side as hypotenuse — treating the horizontal distance as the hypotenuse in an elevation problem.",
    fix:
      "The hypotenuse is the line of sight (the direct line from observer to object). The horizontal and vertical sides are the two legs of the right triangle.",
  },
  {
    mistake:
      "Measuring the angle from the vertical instead of the horizontal — getting 90° − θ instead of θ.",
    fix:
      "Angles of elevation and depression are always measured from the horizontal, not the vertical. If you measure from the vertical you get the complementary angle.",
  },
];

const elevationDepressionMastery: PracticeQuestion[] = [
  trigChoice(
    "elev-dep-m1",
    "Which correctly defines the angle of depression?",
    "B",
    [
      "The angle between the line of sight and the vertical",
      "The angle measured downward from the horizontal to the line of sight to an object below",
      "The angle at the base of the triangle in a depression problem",
      "90° minus the angle of elevation",
    ],
    "The angle of depression is measured downward from a horizontal line at the observer's eye level to the line of sight. It is not the complement of elevation (though they are numerically equal when the observer and object swap positions).",
    "\\text{Define angle of depression}"
  ),
  trigAnswer(
    "elev-dep-m2",
    "From 25 m away, the angle of elevation to the top of a mast is 40°. Find the height to the nearest metre.",
    "\\text{horizontal}=25\\text{ m},\\;\\theta=40^\\circ,\\;\\text{find height}",
    "21",
    ["21 m", "21m", "21 metres"]
  ),
  trigChoice(
    "elev-dep-m3",
    "Which right triangle correctly models an angle of elevation of 30° from a point 50 m from a wall?",
    "A",
    [
      "Horizontal leg = 50 m (adjacent), vertical leg = height (opposite), angle = 30° at the observer",
      "Hypotenuse = 50 m, angle = 30° at the base",
      "Vertical leg = 50 m (adjacent), angle = 30° at the top",
      "Horizontal leg = 50 m (hypotenuse), angle = 30°",
    ],
    "Elevation angle is at the observer on the ground. The 50 m horizontal is adjacent to the angle, the height is opposite, and the line of sight is the hypotenuse. tan 30° = height/50.",
    "\\text{Model: 30}^\\circ\\text{ elevation, 50 m away}"
  ),
  trigAnswer(
    "elev-dep-m4",
    "From the top of a 60 m cliff, the angle of depression to a boat is 30°. Find the horizontal distance to the nearest metre.",
    "\\text{height}=60\\text{ m},\\;\\theta=30^\\circ,\\;\\text{find horizontal distance}",
    "104",
    ["104 m", "104m", "104 metres"]
  ),
  trigChoice(
    "elev-dep-m5",
    "A ship sees the top of a lighthouse at an angle of elevation of 18°. The lighthouse is on a cliff. From the lighthouse top, the angle of depression to the ship is:",
    "A",
    ["18° — alternate interior angles with parallel horizontal lines", "72°", "90° − 18° = 72°", "It depends on the height of the lighthouse"],
    "The angle of elevation from the ship (18°) equals the angle of depression from the lighthouse to the ship (18°). They are alternate interior angles formed by the two parallel horizontal lines at the two locations.",
    "\\text{Elevation from ship}=18^\\circ\\implies\\text{depression from lighthouse}=?"
  ),
  trigAnswer(
    "elev-dep-m6",
    "An observer is 30 m from a wall. The top of the wall is 30 m above the observer's eye level. Find the angle of elevation to the nearest degree.",
    "\\text{height}=30\\text{ m},\\;\\text{horizontal}=30\\text{ m}",
    "45",
    ["45°", "45 degrees"]
  ),
  trigChoice(
    "elev-dep-m7",
    "A student solves an elevation problem and writes tan θ = 12/35 for a triangle where the horizontal distance is 35 m and the height is 12 m. They get θ = 19°. Another student writes tan θ = 35/12 and gets θ = 71°. Who is correct?",
    "A",
    [
      "First student — horizontal (35 m) is adjacent, height (12 m) is opposite, so tan θ = 12/35",
      "Second student — tan uses height over horizontal",
      "Both — depending on which angle you label",
      "Neither — they should use sin or cos",
    ],
    "For the angle of elevation at the observer: adjacent = 35 m (horizontal), opposite = 12 m (height). tan θ = opp/adj = 12/35, giving θ ≈ 19°. The 71° answer is the angle at the top of the triangle.",
    "\\text{Horizontal}=35\\text{ m},\\;\\text{height}=12\\text{ m}"
  ),
  trigAnswer(
    "elev-dep-m8",
    "A surveyor stands 15 m from a tree. The angle of elevation to the top of the tree is 52°. Find the height of the tree to 1 decimal place.",
    "\\text{horizontal}=15\\text{ m},\\;\\theta=52^\\circ,\\;\\text{find height}",
    "19.2",
    ["19.2 m", "19.2m", "19.2 metres"]
  ),
  trigAnswer(
    "elev-dep-m9",
    "From the top of a 40 m building, the angle of depression to a car is 18°. Find the horizontal distance from the building to the car to the nearest metre.",
    "\\text{height}=40\\text{ m},\\;\\theta=18^\\circ,\\;\\text{find horizontal distance}",
    "123",
    ["123 m", "123m", "123 metres"]
  ),
  trigAnswer(
    "elev-dep-m10",
    "A boat at sea sees the top of a 22 m lighthouse at an angle of elevation of 14°. Find the horizontal distance from the boat to the lighthouse to the nearest metre.",
    "\\text{height}=22\\text{ m},\\;\\theta=14^\\circ,\\;\\text{find horizontal distance}",
    "88",
    ["88 m", "88m", "88 metres"]
  ),
];

// ─── Main override function ───────────────────────────────────────────────────

export function year10TrigonometryLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "trigonometry") {
    return null;
  }

  if (lesson.slug === "trigonometric-ratios") {
    return {
      description:
        "Identify the hypotenuse, opposite and adjacent sides relative to a marked angle in a right triangle, and write the three trigonometric ratios using SOH-CAH-TOA.",
      learningIntention:
        "Use SOH-CAH-TOA to name the sides of a right triangle relative to a given angle and write the correct trigonometric ratio.",
      successCriteria: [
        "Identify the hypotenuse as the side opposite the right angle.",
        "Label opposite and adjacent sides relative to the marked angle θ.",
        "Write sin θ, cos θ and tan θ as fractions using the correct side lengths.",
        "Choose which ratio to use based on which two sides are involved.",
      ],
      teaching: {
        paragraphs: [
          "In a right triangle, the hypotenuse is always the longest side — it sits opposite the right angle and never changes regardless of which angle you label.",
          "The labels opposite and adjacent are relative to the marked angle θ. The opposite side does not touch the marked vertex. The adjacent side is next to θ but is not the hypotenuse.",
          "SOH-CAH-TOA is a memory aid: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.",
          "To choose a ratio, identify which two sides are in your problem. If you have opp and hyp, use sin. If adj and hyp, use cos. If opp and adj, use tan.",
        ],
        latexBlocks: [
          "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}},\\quad\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}},\\quad\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}",
          "\\text{SOH-CAH-TOA}",
        ],
      },
      workedExamples: trigRatiosWorkedExamples,
      guidedPractice: trigRatiosGuided,
      independentPractice: trigRatiosIndependent,
      commonMistakes: trigRatiosMistakes,
      masteryQuiz: trigRatiosMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "finding-sides-trig") {
    return {
      description:
        "Use trigonometric ratios to find an unknown side length in a right triangle when one side and one acute angle are known.",
      learningIntention:
        "Select the correct ratio, substitute known values, and rearrange to find an unknown side in a right triangle.",
      successCriteria: [
        "Identify which two sides are involved and choose sin, cos, or tan.",
        "Write the ratio equation and substitute the known angle and side.",
        "Rearrange to isolate the unknown side — multiply or divide as required.",
        "Evaluate on a calculator in degree mode and round to the required precision.",
      ],
      teaching: {
        paragraphs: [
          "To find an unknown side, first label the triangle: mark the known angle and identify which sides are opposite, adjacent and hypotenuse relative to it.",
          "Choose the ratio that connects the known side to the unknown side: sin for opp/hyp, cos for adj/hyp, tan for opp/adj.",
          "Set up the equation (e.g. sin θ = x/hyp) and rearrange. If the unknown is in the numerator, multiply both sides by the denominator. If it is in the denominator, divide the numerator by the ratio.",
          "Always check that your calculator is in DEG mode. Round only the final answer, not intermediate values.",
        ],
        latexBlocks: [
          "\\text{e.g. }\\ \\sin 35^\\circ=\\frac{x}{10}\\implies x=10\\times\\sin 35^\\circ\\approx 5.7",
          "\\text{e.g. }\\ \\sin 30^\\circ=\\frac{6}{h}\\implies h=\\frac{6}{\\sin 30^\\circ}=12",
        ],
      },
      workedExamples: findingSidesWorkedExamples,
      guidedPractice: findingSidesGuided,
      independentPractice: findingSidesIndependent,
      commonMistakes: findingSidesMistakes,
      masteryQuiz: findingSidesMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "finding-angles-trig") {
    return {
      description:
        "Use inverse trigonometric functions to find an unknown angle in a right triangle when two side lengths are known.",
      learningIntention:
        "Apply sin⁻¹, cos⁻¹ or tan⁻¹ to find an unknown angle from two known sides of a right triangle.",
      successCriteria: [
        "Identify which two sides are known and choose the correct inverse ratio.",
        "Write the ratio (e.g. sin θ = opp/hyp) and apply the inverse function.",
        "Evaluate using a calculator in degree mode.",
        "Round angles to the nearest degree or to 1 decimal place as required.",
      ],
      teaching: {
        paragraphs: [
          "When two sides of a right triangle are known and an angle is required, use the inverse trigonometric functions: sin⁻¹, cos⁻¹ or tan⁻¹.",
          "Choose the ratio based on which sides are known: if you have opp and hyp, write sin θ = opp/hyp, then θ = sin⁻¹(opp/hyp).",
          "The inverse function 'undoes' the trig function: sin⁻¹ returns the angle whose sine equals a given value. It is not the same as 1/sin.",
          "Always confirm the calculator is in degree mode. A result in radians will look like a small decimal (e.g. 0.64 instead of 37°).",
        ],
        latexBlocks: [
          "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}\\implies\\theta=\\sin^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{hyp}}\\right)",
          "\\text{e.g. }\\ \\cos\\theta=\\frac{8}{17}\\implies\\theta=\\cos^{-1}\\!\\left(\\frac{8}{17}\\right)\\approx 62^\\circ",
        ],
      },
      workedExamples: findingAnglesWorkedExamples,
      guidedPractice: findingAnglesGuided,
      independentPractice: findingAnglesIndependent,
      commonMistakes: findingAnglesMistakes,
      masteryQuiz: findingAnglesMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "elevation-depression") {
    return {
      description:
        "Model real-world situations using angles of elevation and depression, and solve for unknown heights and distances using right-triangle trigonometry.",
      learningIntention:
        "Identify the right triangle formed by an angle of elevation or depression and apply trigonometry to find unknown heights and distances.",
      successCriteria: [
        "Distinguish between angles of elevation (measured upward from horizontal) and depression (measured downward).",
        "Draw and label the right triangle from a context description.",
        "Apply sin, cos, or tan to find an unknown side.",
        "Apply inverse trig to find an angle, and interpret answers in context.",
      ],
      teaching: {
        paragraphs: [
          "An angle of elevation is measured upward from the horizontal to the line of sight to an object above the observer. An angle of depression is measured downward from the horizontal to the line of sight to an object below.",
          "Both scenarios form a right triangle with three parts: the horizontal distance (adjacent), the vertical height (opposite), and the line of sight (hypotenuse).",
          "When modelling the problem, draw the horizontal line at the observer's level. The right angle is where the vertical meets the horizontal. Label the known side and angle before choosing a ratio.",
          "A useful fact: the angle of depression from A to B equals the angle of elevation from B to A (alternate interior angles on parallel horizontal lines).",
        ],
        latexBlocks: [
          "\\text{Elevation: }\\tan\\theta=\\frac{\\text{height}}{\\text{horizontal distance}}",
          "\\text{Depression: same triangle — observer is higher; angle is measured downward from horizontal}",
          "\\text{e.g. height}=20\\tan 38^\\circ\\approx 15.6\\text{ m}",
        ],
      },
      workedExamples: elevationDepressionWorkedExamples,
      guidedPractice: elevationDepressionGuided,
      independentPractice: elevationDepressionIndependent,
      commonMistakes: elevationDepressionMistakes,
      masteryQuiz: elevationDepressionMastery,
      masteryPassMark: 0.8,
    };
  }

  return null;
}
