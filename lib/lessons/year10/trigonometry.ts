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

// ─── Lesson 5: The Sine Rule ──────────────────────────────────────────────────

function nonRightAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  hint = "Set up the formula, substitute the known values, and solve."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation: `The answer is ${answer}.`,
  };
}

function nonRightChoice(
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
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    hint: "Consider which pieces of information are given and what you are asked to find.",
    explanation,
  };
}

const sineRuleWorkedExamples: WorkedExample[] = [
  {
    title: "Labelling opposite side–angle pairs",
    questionLatex:
      "\\text{In triangle }ABC\\text{, angle }A=50^\\circ\\text{, angle }B=70^\\circ\\text{, angle }C=60^\\circ.\\text{ Label side }a\\text{ (opposite }A\\text{), side }b\\text{ (opposite }B\\text{), side }c\\text{ (opposite }C\\text{).}",
    triangleDiagram: {
      description:
        "General triangle with vertices A at bottom-left, B at bottom-right, and C at top-centre. Angle A = 50° is at bottom-left, angle B = 70° is at bottom-right, angle C = 60° is at top. Side a (opposite A) is BC, side b (opposite B) is AC, side c (opposite C) is AB.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { A: "50°", B: "70°", C: "60°" },
      sideLabels: { BC: "a", AC: "b", AB: "c" },
    },
    steps: [
      {
        explanation:
          "Each side is named by the lowercase letter matching the opposite angle. Side a sits across from angle A.",
        latex: "a=BC\\text{ (opposite }A)",
      },
      {
        explanation: "Side b sits across from angle B.",
        latex: "b=AC\\text{ (opposite }B)",
      },
      {
        explanation:
          "Side c sits across from angle C. This labelling is the foundation of the sine rule.",
        latex:
          "c=AB\\text{ (opposite }C)\\quad\\Rightarrow\\quad\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
      },
    ],
    finalAnswerLatex:
      "\\frac{a}{\\sin 50^\\circ}=\\frac{b}{\\sin 70^\\circ}=\\frac{c}{\\sin 60^\\circ}",
  },
  {
    title: "Finding a side using the sine rule",
    questionLatex:
      "\\text{In triangle }ABC\\text{, angle }A=40^\\circ\\text{, angle }B=70^\\circ\\text{, and side }a=8\\text{ cm. Find side }b\\text{ to 1 decimal place.}",
    triangleDiagram: {
      description:
        "General triangle with A at bottom-left, B at bottom-right, C at top-centre. Angle A = 40°, angle B = 70°. Side a (BC) = 8 cm. Side b (AC) is unknown.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { A: "40°", B: "70°" },
      sideLabels: { BC: "8 cm", AC: "b" },
    },
    steps: [
      {
        explanation:
          "Write the sine rule using the two opposite pairs: A with a, and B with b.",
        latex: "\\frac{b}{\\sin B}=\\frac{a}{\\sin A}",
      },
      {
        explanation: "Substitute the known values.",
        latex: "\\frac{b}{\\sin 70^\\circ}=\\frac{8}{\\sin 40^\\circ}",
      },
      {
        explanation: "Multiply both sides by sin 70°.",
        latex: "b=\\frac{8\\times\\sin 70^\\circ}{\\sin 40^\\circ}",
      },
      {
        explanation: "Evaluate using a calculator in degree mode.",
        latex:
          "b=\\frac{8\\times 0.9397}{0.6428}\\approx 11.7\\text{ cm}",
      },
    ],
    finalAnswerLatex: "b\\approx 11.7\\text{ cm}",
  },
  {
    title: "Finding an angle using the sine rule",
    questionLatex:
      "\\text{In triangle }ABC\\text{, }a=12\\text{ m, }b=9\\text{ m, and angle }B=35^\\circ.\\text{ Find angle }A\\text{ to the nearest degree (take the acute solution).}",
    triangleDiagram: {
      description:
        "General triangle with A at bottom-left, B at bottom-right, C at top-centre. Side a (BC) = 12 m, side b (AC) = 9 m, angle B = 35°. Angle A is unknown.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { B: "35°" },
      sideLabels: { BC: "12 m", AC: "9 m" },
    },
    steps: [
      {
        explanation:
          "Write the sine rule with the angle-to-find (A) on the left.",
        latex: "\\frac{\\sin A}{a}=\\frac{\\sin B}{b}",
      },
      {
        explanation: "Substitute known values.",
        latex:
          "\\frac{\\sin A}{12}=\\frac{\\sin 35^\\circ}{9}",
      },
      {
        explanation: "Solve for sin A.",
        latex:
          "\\sin A=\\frac{12\\times\\sin 35^\\circ}{9}=\\frac{12\\times 0.5736}{9}\\approx 0.7648",
      },
      {
        explanation: "Apply inverse sine to find A.",
        latex: "A=\\sin^{-1}(0.7648)\\approx 50^\\circ",
      },
    ],
    finalAnswerLatex: "A\\approx 50^\\circ",
  },
];

const sineRuleGuided: PracticeQuestion[] = [
  nonRightChoice(
    "sine-rule-g1",
    "In triangle PQR, angle Q = 50°. Which side is opposite angle Q?",
    "C",
    ["PQ", "QR", "PR", "All three sides"],
    "Side PR is opposite vertex Q because it does not touch Q. In any triangle, the side opposite an angle is the one that does not include that vertex.",
    "\\text{Triangle }PQR,\\;\\angle Q=50^\\circ"
  ),
  nonRightChoice(
    "sine-rule-g2",
    "In triangle ABC, angle A = 45°, angle B = 65°, side a = 10. Which expression correctly finds side b?",
    "A",
    [
      "$b=\\dfrac{10\\times\\sin 65^\\circ}{\\sin 45^\\circ}$",
      "$b=\\dfrac{10\\times\\sin 45^\\circ}{\\sin 65^\\circ}$",
      "$b=\\dfrac{\\sin 65^\\circ}{10\\times\\sin 45^\\circ}$",
      "$b=10\\times\\cos 65^\\circ$",
    ],
    "From b/sin B = a/sin A: b = a × sin B / sin A = 10 × sin 65° / sin 45°. Option B has the sines inverted.",
    "a=10,\\;\\angle A=45^\\circ,\\;\\angle B=65^\\circ"
  ),
  nonRightAnswer(
    "sine-rule-g3",
    "In triangle ABC, angle A = 55°, angle C = 70°, a = 10 cm. Find side c to 1 decimal place.",
    "\\angle A=55^\\circ,\\;\\angle C=70^\\circ,\\;a=10\\text{ cm}",
    "11.5",
    ["11.5 cm"],
    "Use c/sin C = a/sin A, so c = 10 × sin 70° / sin 55°."
  ),
  nonRightAnswer(
    "sine-rule-g4",
    "In triangle ABC, a = 7 m, b = 10 m, angle A = 32°. Find angle B to the nearest degree (take the acute value).",
    "a=7\\text{ m},\\;b=10\\text{ m},\\;\\angle A=32^\\circ",
    "49",
    ["49°", "49 degrees"],
    "Use sin B / b = sin A / a, so sin B = 10 × sin 32° / 7 ≈ 0.757, then B = sin⁻¹(0.757) ≈ 49°."
  ),
];

const sineRuleIndependent: PracticeQuestion[] = [
  nonRightAnswer(
    "sine-rule-i1",
    "In triangle ABC, angle B = 48°, angle C = 63°, b = 15 m. Find side c to 1 decimal place.",
    "\\angle B=48^\\circ,\\;\\angle C=63^\\circ,\\;b=15\\text{ m}",
    "18.0",
    ["18.0 m", "18 m", "18"],
    "Use c/sin C = b/sin B: c = 15 × sin 63° / sin 48°."
  ),
  nonRightAnswer(
    "sine-rule-i2",
    "In triangle ABC, a = 6 m, b = 9 m, angle B = 55°. Find angle A to the nearest degree.",
    "a=6\\text{ m},\\;b=9\\text{ m},\\;\\angle B=55^\\circ",
    "33",
    ["33°", "33 degrees"],
    "Use sin A / a = sin B / b: sin A = 6 × sin 55° / 9 ≈ 0.546, so A = sin⁻¹(0.546) ≈ 33°."
  ),
  nonRightChoice(
    "sine-rule-i3",
    "Triangle DEF has angle D = 72°, side d = 20 m, side e = 15 m. Which equation correctly finds angle E?",
    "A",
    [
      "$\\sin E=\\dfrac{15\\times\\sin 72^\\circ}{20}$",
      "$\\sin E=\\dfrac{20\\times\\sin 72^\\circ}{15}$",
      "$\\sin E=\\dfrac{\\sin 72^\\circ}{15\\times 20}$",
      "$E=\\cos^{-1}\\!\\left(\\dfrac{15}{20}\\right)$",
    ],
    "From sin E / e = sin D / d: sin E = e × sin D / d = 15 × sin 72° / 20.",
    "\\angle D=72^\\circ,\\;d=20\\text{ m},\\;e=15\\text{ m}"
  ),
  nonRightAnswer(
    "sine-rule-i4",
    "Two observers at points A and B, 200 m apart, sight a tower at C. Angle A = 72°, angle B = 65°. Find the distance BC to 1 decimal place.",
    "AB=200\\text{ m},\\;\\angle A=72^\\circ,\\;\\angle B=65^\\circ",
    "278.9",
    ["278.9 m"],
    "Angle C = 180° − 72° − 65° = 43°. Then BC/sin A = AB/sin C, so BC = 200 × sin 72° / sin 43°."
  ),
  nonRightAnswer(
    "sine-rule-i5",
    "In triangle ABC, c = 8 m, a = 5 m, angle C = 60°. Find angle A to the nearest degree.",
    "c=8\\text{ m},\\;a=5\\text{ m},\\;\\angle C=60^\\circ",
    "33",
    ["33°", "33 degrees"],
    "Use sin A / a = sin C / c: sin A = 5 × sin 60° / 8 ≈ 0.541, so A = sin⁻¹(0.541) ≈ 33°."
  ),
];

const sineRuleMistakes = [
  {
    mistake: "Pairing a side with the wrong opposite angle in the sine rule.",
    fix: "Always match lowercase side a with angle A, side b with angle B, side c with angle C. Draw the triangle and label pairs before substituting.",
  },
  {
    mistake:
      "Using the sine rule when the cosine rule is required — for example, when two sides and the included angle are given.",
    fix: "The sine rule needs an opposite pair (a side and its opposite angle). If only sides and their included angle are known, use the cosine rule instead.",
  },
  {
    mistake:
      "Forgetting the ambiguous case: assuming sin⁻¹ always gives the only valid angle.",
    fix: "When finding an angle, check whether 180° minus your answer also gives a valid triangle. If so, both are possible solutions.",
  },
  {
    mistake:
      "Setting up the ratio as sin A / a on one side and b / sin B on the other, mixing which way the fractions go.",
    fix: "Keep a consistent form: either a/sin A = b/sin B throughout, or sin A/a = sin B/b throughout. Never mix the two arrangements.",
  },
];

const sineRuleMastery: PracticeQuestion[] = [
  nonRightChoice(
    "sine-rule-m1",
    "In triangle XYZ, which side is opposite angle X?",
    "C",
    ["XY", "XZ", "YZ", "The hypotenuse"],
    "Side YZ is opposite vertex X because it does not touch X. The hypotenuse only applies to right triangles.",
    "\\text{Triangle }XYZ"
  ),
  nonRightAnswer(
    "sine-rule-m2",
    "In triangle ABC, angle A = 52°, angle B = 67°, a = 9 cm. Find side b to 1 decimal place.",
    "\\angle A=52^\\circ,\\;\\angle B=67^\\circ,\\;a=9\\text{ cm}",
    "10.5",
    ["10.5 cm"],
    "b = 9 × sin 67° / sin 52°."
  ),
  nonRightAnswer(
    "sine-rule-m3",
    "In triangle PQR, p = 7, q = 5, angle P = 58°. Find angle Q to the nearest degree.",
    "p=7,\\;q=5,\\;\\angle P=58^\\circ",
    "37",
    ["37°", "37 degrees"],
    "sin Q = 5 × sin 58° / 7 ≈ 0.606, so Q = sin⁻¹(0.606) ≈ 37°."
  ),
  nonRightChoice(
    "sine-rule-m4",
    "Triangle has a = 8, b = 6, angle A = 50°. Which equation finds angle B?",
    "A",
    [
      "$\\sin B=\\dfrac{6\\times\\sin 50^\\circ}{8}$",
      "$\\sin B=\\dfrac{8\\times\\sin 50^\\circ}{6}$",
      "$B=\\cos^{-1}\\!\\left(\\dfrac{6}{8}\\right)$",
      "$\\sin B=\\dfrac{\\sin 50^\\circ}{6\\times 8}$",
    ],
    "From sin B / b = sin A / a: sin B = 6 × sin 50° / 8.",
    "a=8,\\;b=6,\\;\\angle A=50^\\circ"
  ),
  nonRightAnswer(
    "sine-rule-m5",
    "In triangle XYZ, angle X = 44°, angle Y = 82°, x = 13 m. Find side y to 1 decimal place.",
    "\\angle X=44^\\circ,\\;\\angle Y=82^\\circ,\\;x=13\\text{ m}",
    "18.5",
    ["18.5 m"],
    "y = 13 × sin 82° / sin 44°."
  ),
  nonRightAnswer(
    "sine-rule-m6",
    "In triangle ABC, a = 15, b = 9, angle A = 70°. Find angle B to the nearest degree.",
    "a=15,\\;b=9,\\;\\angle A=70^\\circ",
    "34",
    ["34°", "34 degrees"],
    "sin B = 9 × sin 70° / 15 ≈ 0.564, so B = sin⁻¹(0.564) ≈ 34°."
  ),
  nonRightChoice(
    "sine-rule-m7",
    "In triangle ABC, angle A = 30°, a = 5, b = 9. After calculating sin B = 0.9, how many valid triangles are possible?",
    "C",
    [
      "None — sin B cannot exceed 1",
      "Exactly one, taking the acute angle",
      "Two — both B ≈ 64° and B ≈ 116° give positive remaining angles",
      "It is impossible to determine without knowing side c",
    ],
    "sin B = 0.9 < 1, so a triangle exists. B ≈ 64° gives C ≈ 86° (valid). B ≈ 116° gives C ≈ 34° (also valid). Both work — this is the ambiguous case.",
    "\\angle A=30^\\circ,\\;a=5,\\;b=9"
  ),
  nonRightAnswer(
    "sine-rule-m8",
    "In triangle ABC, angle A = 48°, angle B = 73°, b = 22 m. Find side c to 1 decimal place.",
    "\\angle A=48^\\circ,\\;\\angle B=73^\\circ,\\;b=22\\text{ m}",
    "19.7",
    ["19.7 m"],
    "Angle C = 180° − 48° − 73° = 59°. Then c = 22 × sin 59° / sin 73°."
  ),
  nonRightAnswer(
    "sine-rule-m9",
    "A triangular plot has angles 43° and 78°, with the side between them 65 m long. Find the longest side to the nearest metre.",
    "\\text{angles }43^\\circ,\\;78^\\circ,\\;\\text{side between them }=65\\text{ m}",
    "74",
    ["74 m"],
    "The third angle is 59°. The side between 43° and 78° is opposite the 59° angle. The longest side is opposite 78°: b = 65 × sin 78° / sin 59°."
  ),
  nonRightAnswer(
    "sine-rule-m10",
    "Two angles of a triangle are 51° and 46°. The side opposite the 51° angle is 18 m. Find the side opposite the 46° angle to 1 decimal place.",
    "\\text{angles }51^\\circ,\\;46^\\circ;\\text{ side opposite }51^\\circ\\text{ is }18\\text{ m}",
    "16.7",
    ["16.7 m"],
    "b = 18 × sin 46° / sin 51°."
  ),
];

// ─── Lesson 6: The Cosine Rule ────────────────────────────────────────────────

const cosineRuleWorkedExamples: WorkedExample[] = [
  {
    title: "Finding a side using the cosine rule",
    questionLatex:
      "\\text{In triangle }ABC\\text{, }a=8\\text{ cm, }b=11\\text{ cm, and angle }C=60^\\circ.\\text{ Find side }c\\text{ to 1 decimal place.}",
    triangleDiagram: {
      description:
        "General triangle with A at bottom-left, B at bottom-right, C at top-centre. Side a (BC) = 8 cm, side b (AC) = 11 cm, included angle C = 60°. Side c (AB) is unknown.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { C: "60°" },
      sideLabels: { BC: "8 cm", AC: "11 cm", AB: "c" },
    },
    steps: [
      {
        explanation:
          "Write the cosine rule. Side c is opposite the known angle C, and a and b are the two sides that form angle C.",
        latex: "c^2=a^2+b^2-2ab\\cos C",
      },
      {
        explanation: "Substitute a = 8, b = 11, C = 60°.",
        latex:
          "c^2=8^2+11^2-2\\times 8\\times 11\\times\\cos 60^\\circ",
      },
      {
        explanation: "cos 60° = 0.5 exactly.",
        latex: "c^2=64+121-176\\times 0.5=185-88=97",
      },
      {
        explanation: "Take the positive square root.",
        latex: "c=\\sqrt{97}\\approx 9.8\\text{ cm}",
      },
    ],
    finalAnswerLatex: "c\\approx 9.8\\text{ cm}",
  },
  {
    title: "Finding an angle using the cosine rule",
    questionLatex:
      "\\text{In triangle }ABC\\text{, }a=5\\text{ cm, }b=7\\text{ cm, }c=9\\text{ cm. Find angle }C\\text{ to the nearest degree.}",
    triangleDiagram: {
      description:
        "General triangle with A at bottom-left, B at bottom-right, C at top-centre. Side a (BC) = 5 cm, side b (AC) = 7 cm, side c (AB) = 9 cm. All sides known, finding angle C.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      sideLabels: { BC: "5 cm", AC: "7 cm", AB: "9 cm" },
    },
    steps: [
      {
        explanation:
          "Rearrange the cosine rule to make cos C the subject.",
        latex:
          "\\cos C=\\frac{a^2+b^2-c^2}{2ab}",
      },
      {
        explanation: "Substitute a = 5, b = 7, c = 9.",
        latex:
          "\\cos C=\\frac{25+49-81}{2\\times 5\\times 7}=\\frac{-7}{70}=-0.1",
      },
      {
        explanation: "Apply inverse cosine.",
        latex: "C=\\cos^{-1}(-0.1)\\approx 96^\\circ",
      },
    ],
    finalAnswerLatex: "C\\approx 96^\\circ",
  },
  {
    title: "Choosing between the sine rule and cosine rule",
    questionLatex:
      "\\text{For each triangle, decide which rule to use: (i) two sides and the included angle; (ii) two angles and one side; (iii) three sides.}",
    steps: [
      {
        explanation:
          "Two sides and the included angle (SAS) → cosine rule. You cannot use the sine rule because you do not have an opposite pair.",
        latex:
          "\\text{SAS: }c^2=a^2+b^2-2ab\\cos C",
      },
      {
        explanation:
          "Two angles and one side (AAS or ASA) → sine rule. You know an opposite pair (the given side and its opposite angle), so the sine rule applies directly.",
        latex:
          "\\text{AAS/ASA: }\\frac{a}{\\sin A}=\\frac{b}{\\sin B}",
      },
      {
        explanation:
          "Three sides (SSS) → cosine rule rearranged. No angle is given, so the sine rule cannot start the solution.",
        latex:
          "\\text{SSS: }\\cos C=\\frac{a^2+b^2-c^2}{2ab}",
      },
    ],
    finalAnswerLatex:
      "\\text{SAS or SSS}\\Rightarrow\\text{cosine rule};\\quad\\text{AAS or ASA}\\Rightarrow\\text{sine rule}",
  },
];

const cosineRuleGuided: PracticeQuestion[] = [
  nonRightChoice(
    "cosine-rule-g1",
    "Triangle PQR has sides PQ = 8 cm, PR = 6 cm, and angle P = 50°. Which rule should you use to find QR?",
    "A",
    [
      "Cosine rule — two sides and the included angle are known",
      "Sine rule — an angle–opposite-side pair is known",
      "Pythagoras — this is a right triangle",
      "Cannot be solved with the given information",
    ],
    "PQ and PR are the two sides forming angle P (the included angle), and QR is the unknown. This is SAS — use the cosine rule.",
    "PQ=8,\\;PR=6,\\;\\angle P=50^\\circ"
  ),
  nonRightAnswer(
    "cosine-rule-g2",
    "In triangle ABC, a = 6 cm, b = 10 cm, C = 45°. Find side c to 1 decimal place.",
    "a=6\\text{ cm},\\;b=10\\text{ cm},\\;C=45^\\circ",
    "7.2",
    ["7.2 cm"],
    "c² = 6² + 10² − 2(6)(10) cos 45° = 136 − 84.9 = 51.1, so c = √51.1 ≈ 7.2."
  ),
  nonRightChoice(
    "cosine-rule-g3",
    "In triangle ABC with sides a, b, c and angles A, B, C, the formula c² = a² + b² − 2ab cos C uses C as the included angle. Which angle is the included angle between sides a and b?",
    "C",
    ["Angle A", "Angle B", "Angle C", "Any of the three angles"],
    "Sides a and b meet at vertex C, so angle C is the included angle between them. This is always true by the labelling convention.",
    "\\text{Triangle }ABC\\text{ with standard labelling}"
  ),
  nonRightAnswer(
    "cosine-rule-g4",
    "A triangle has sides 5 cm, 8 cm, 10 cm. Find the largest angle to the nearest degree.",
    "\\text{sides }5,\\;8,\\;10\\text{ cm}",
    "98",
    ["98°", "98 degrees"],
    "The largest angle is opposite the longest side (10). cos C = (25 + 64 − 100)/(2×5×8) = −11/80 ≈ −0.1375, so C ≈ 98°."
  ),
];

const cosineRuleIndependent: PracticeQuestion[] = [
  nonRightAnswer(
    "cosine-rule-i1",
    "In triangle ABC, a = 12 cm, b = 15 cm, C = 38°. Find side c to 1 decimal place.",
    "a=12\\text{ cm},\\;b=15\\text{ cm},\\;C=38^\\circ",
    "9.2",
    ["9.2 cm"],
    "c² = 144 + 225 − 2(12)(15) cos 38° = 369 − 283.7 = 85.3, so c = √85.3 ≈ 9.2."
  ),
  nonRightChoice(
    "cosine-rule-i2",
    "A triangle has sides a = 7, b = 9, c = 11, and no angle is given. Which method finds angle C directly?",
    "A",
    [
      "Cosine rule: $\\cos C=\\dfrac{a^2+b^2-c^2}{2ab}$",
      "Sine rule (requires a known angle to start)",
      "Pythagoras (only for right triangles)",
      "Cannot be solved without an angle",
    ],
    "With all three sides known (SSS), rearrange the cosine rule: cos C = (a² + b² − c²)/(2ab). The sine rule requires at least one known angle.",
    "a=7,\\;b=9,\\;c=11"
  ),
  nonRightAnswer(
    "cosine-rule-i3",
    "A triangle has sides 8 cm, 10 cm, 13 cm. Find the largest angle to the nearest degree.",
    "\\text{sides }8,\\;10,\\;13\\text{ cm}",
    "92",
    ["92°", "92 degrees"],
    "Largest angle opposite longest side (13). cos C = (64 + 100 − 169)/160 = −5/160 ≈ −0.031, so C ≈ 92°."
  ),
  nonRightAnswer(
    "cosine-rule-i4",
    "In triangle ABC, a = 5 cm, b = 7 cm, C = 110°. Find side c to 1 decimal place.",
    "a=5\\text{ cm},\\;b=7\\text{ cm},\\;C=110^\\circ",
    "9.9",
    ["9.9 cm"],
    "c² = 25 + 49 − 2(5)(7) cos 110° = 74 + 23.9 = 97.9 (cos 110° is negative), so c = √97.9 ≈ 9.9."
  ),
  nonRightAnswer(
    "cosine-rule-i5",
    "Two ships A and B leave port P. Ship A travels 50 km and ship B travels 70 km. The angle between their paths is 50°. Find the distance AB to 1 decimal place.",
    "PA=50\\text{ km},\\;PB=70\\text{ km},\\;\\text{angle between paths}=50^\\circ",
    "53.9",
    ["53.9 km"],
    "AB² = 50² + 70² − 2(50)(70) cos 50° = 7400 − 4499.5 = 2900.5, so AB = √2900.5 ≈ 53.9 km."
  ),
];

const cosineRuleMistakes = [
  {
    mistake:
      "Writing c² = a² + b² + 2ab cos C (adding instead of subtracting).",
    fix: "The cosine rule always subtracts the 2ab cos C term. Remember: c² = a² + b² − 2ab cos C. The subtraction accounts for the triangle not being right-angled.",
  },
  {
    mistake:
      "Rearranging the angle form incorrectly: writing cos C = (c² − a² − b²)/(2ab).",
    fix: "Rearrange carefully: subtract c² from both sides of c² = a² + b² − 2ab cos C to get cos C = (a² + b² − c²)/(2ab). The numerator is a² + b² − c², not c² − a² − b².",
  },
  {
    mistake: "Forgetting to take the square root after finding c².",
    fix: "The formula gives c², not c. Always take the positive square root as the final step: c = √(c²).",
  },
  {
    mistake:
      "Using the cosine rule when the sine rule is more efficient — for example, with two angles and one side.",
    fix: "If you have an angle–opposite-side pair and one more angle or side, the sine rule is simpler. The cosine rule is for SAS (two sides, included angle) or SSS (three sides).",
  },
];

const cosineRuleMastery: PracticeQuestion[] = [
  nonRightChoice(
    "cosine-rule-m1",
    "In the cosine rule c² = a² + b² − 2ab cos C, angle C is the included angle between which two sides?",
    "A",
    [
      "Sides a and b",
      "Sides b and c",
      "Sides a and c",
      "Any two of the three sides",
    ],
    "Angle C is at vertex C. The two sides meeting at C are a (opposite A, from C to A) and b (opposite B, from C to B). Side c (AB) is opposite C and does not touch vertex C.",
    "c^2=a^2+b^2-2ab\\cos C"
  ),
  nonRightAnswer(
    "cosine-rule-m2",
    "In triangle ABC, a = 9 cm, b = 12 cm, C = 55°. Find side c to 1 decimal place.",
    "a=9\\text{ cm},\\;b=12\\text{ cm},\\;C=55^\\circ",
    "10.1",
    ["10.1 cm"],
    "c² = 81 + 144 − 2(9)(12) cos 55° = 225 − 123.9 = 101.1, so c ≈ 10.1."
  ),
  nonRightAnswer(
    "cosine-rule-m3",
    "A triangle has sides 6 cm, 8 cm, 11 cm. Find the largest angle to the nearest degree.",
    "\\text{sides }6,\\;8,\\;11\\text{ cm}",
    "103",
    ["103°", "103 degrees"],
    "cos C = (36 + 64 − 121)/(2×6×8) = −21/96 ≈ −0.219, so C = cos⁻¹(−0.219) ≈ 103°."
  ),
  nonRightChoice(
    "cosine-rule-m4",
    "Which situation requires the cosine rule?",
    "C",
    [
      "Two angles and one side given (AAS)",
      "Two sides and a non-included angle given (SSA)",
      "Two sides and the included angle given (SAS)",
      "Three angles given",
    ],
    "SAS (two sides and the included angle) requires the cosine rule because there is no opposite-angle pair to use the sine rule. Three angles give no side lengths. SSA may use the sine rule (or creates the ambiguous case).",
    "\\text{Choose the correct rule for each situation}"
  ),
  nonRightAnswer(
    "cosine-rule-m5",
    "In triangle ABC, a = 4 cm, b = 7 cm, C = 120°. Find side c to 1 decimal place.",
    "a=4\\text{ cm},\\;b=7\\text{ cm},\\;C=120^\\circ",
    "9.6",
    ["9.6 cm"],
    "cos 120° = −0.5, so c² = 16 + 49 − 2(4)(7)(−0.5) = 65 + 28 = 93, c = √93 ≈ 9.6."
  ),
  nonRightAnswer(
    "cosine-rule-m6",
    "A triangle has sides 6 cm, 9 cm, 12 cm. Find the largest angle to the nearest degree.",
    "\\text{sides }6,\\;9,\\;12\\text{ cm}",
    "104",
    ["104°", "104 degrees"],
    "cos C = (36 + 81 − 144)/(2×6×9) = −27/108 = −0.25, so C = cos⁻¹(−0.25) ≈ 104°."
  ),
  nonRightChoice(
    "cosine-rule-m7",
    "From c² = a² + b² − 2ab cos C, which equation correctly isolates cos C?",
    "A",
    [
      "$\\cos C=\\dfrac{a^2+b^2-c^2}{2ab}$",
      "$\\cos C=\\dfrac{c^2-a^2-b^2}{2ab}$",
      "$\\cos C=\\dfrac{a^2+b^2+c^2}{2ab}$",
      "$\\cos C=\\dfrac{2ab}{a^2+b^2-c^2}$",
    ],
    "Add 2ab cos C to both sides, then subtract c²: 2ab cos C = a² + b² − c², so cos C = (a² + b² − c²)/(2ab).",
    "c^2=a^2+b^2-2ab\\cos C"
  ),
  nonRightAnswer(
    "cosine-rule-m8",
    "In triangle ABC, a = 13 cm, b = 17 cm, C = 52°. Find side c to 1 decimal place.",
    "a=13\\text{ cm},\\;b=17\\text{ cm},\\;C=52^\\circ",
    "13.6",
    ["13.6 cm"],
    "c² = 169 + 289 − 2(13)(17) cos 52° = 458 − 272.1 = 185.9, so c = √185.9 ≈ 13.6."
  ),
  nonRightAnswer(
    "cosine-rule-m9",
    "A triangular park has sides 20 m, 25 m, and 30 m. Find the largest angle to the nearest degree.",
    "\\text{sides }20,\\;25,\\;30\\text{ m}",
    "83",
    ["83°", "83 degrees"],
    "Largest angle opposite 30 m: cos C = (400 + 625 − 900)/1000 = 0.125, so C = cos⁻¹(0.125) ≈ 83°."
  ),
  nonRightAnswer(
    "cosine-rule-m10",
    "Two paths from a camp meet at an angle of 78°. One path is 3.5 km and the other is 5.2 km. Find the direct distance between the far ends of the paths to 1 decimal place.",
    "\\text{sides }3.5\\text{ km and }5.2\\text{ km},\\;\\text{included angle }78^\\circ",
    "5.6",
    ["5.6 km"],
    "d² = 3.5² + 5.2² − 2(3.5)(5.2) cos 78° = 12.25 + 27.04 − 7.57 = 31.72, so d = √31.72 ≈ 5.6 km."
  ),
];

// ─── Lesson 7: Area of a Triangle ────────────────────────────────────────────

const areaTrigWorkedExamples: WorkedExample[] = [
  {
    title: "Finding area from two sides and the included angle",
    questionLatex:
      "\\text{Triangle }ABC\\text{ has }a=8\\text{ cm, }b=11\\text{ cm, and included angle }C=40^\\circ.\\text{ Find the area to 1 decimal place.}",
    triangleDiagram: {
      description:
        "General triangle with A at bottom-left, B at bottom-right, C at top-centre. Sides a (BC) = 8 cm and b (AC) = 11 cm form the included angle C = 40° at vertex C.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { C: "40°" },
      sideLabels: { BC: "8 cm", AC: "11 cm" },
    },
    steps: [
      {
        explanation:
          "The area formula uses two sides and the angle between them (the included angle).",
        latex: "A=\\tfrac{1}{2}ab\\sin C",
      },
      {
        explanation: "Substitute a = 8, b = 11, C = 40°.",
        latex:
          "A=\\tfrac{1}{2}\\times 8\\times 11\\times\\sin 40^\\circ",
      },
      {
        explanation: "Evaluate.",
        latex:
          "A=44\\times 0.6428\\approx 28.3\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "A\\approx 28.3\\text{ cm}^2",
  },
  {
    title: "Identifying the included angle",
    questionLatex:
      "\\text{A triangle has two sides of }7\\text{ m and }10\\text{ m meeting at an angle of }65^\\circ.\\text{ Find the area to 1 decimal place.}",
    triangleDiagram: {
      description:
        "General triangle. The two known sides are 7 m and 10 m, and the included angle between them is 65°.",
      vertices: {
        A: { x: 80, y: 220 },
        B: { x: 340, y: 220 },
        C: { x: 210, y: 50 },
      },
      angleLabels: { C: "65°" },
      sideLabels: { BC: "7 m", AC: "10 m" },
    },
    steps: [
      {
        explanation:
          "The angle between the two known sides is the included angle — here 65°.",
        latex: "\\text{Included angle }C=65^\\circ",
      },
      {
        explanation: "Apply the area formula.",
        latex:
          "A=\\tfrac{1}{2}\\times 7\\times 10\\times\\sin 65^\\circ",
      },
      {
        explanation: "Evaluate.",
        latex:
          "A=35\\times 0.9063\\approx 31.7\\text{ m}^2",
      },
    ],
    finalAnswerLatex: "A\\approx 31.7\\text{ m}^2",
  },
  {
    title: "Applying the area formula to a real context",
    questionLatex:
      "\\text{A triangular garden has two fences of }12\\text{ m and }15\\text{ m meeting at an angle of }72^\\circ.\\text{ Find the area to 1 decimal place.}",
    steps: [
      {
        explanation:
          "Identify the two sides (12 m and 15 m) and the included angle (72°).",
        latex: "A=\\tfrac{1}{2}\\times 12\\times 15\\times\\sin 72^\\circ",
      },
      {
        explanation: "Evaluate.",
        latex: "A=90\\times 0.9511\\approx 85.6\\text{ m}^2",
      },
    ],
    finalAnswerLatex: "A\\approx 85.6\\text{ m}^2",
  },
];

const areaTrigGuided: PracticeQuestion[] = [
  nonRightChoice(
    "area-trig-g1",
    "Triangle ABC has AB = 9 m, BC = 7 m, and angle B = 58°. Which angle is the included angle for the area formula using sides AB and BC?",
    "B",
    ["Angle A", "Angle B", "Angle C", "Any angle will work"],
    "Sides AB and BC both touch vertex B, so angle B is the included angle between them.",
    "AB=9\\text{ m},\\;BC=7\\text{ m},\\;\\angle B=58^\\circ"
  ),
  nonRightAnswer(
    "area-trig-g2",
    "A triangle has sides a = 6 cm and b = 9 cm with included angle C = 55°. Find the area to 1 decimal place.",
    "a=6\\text{ cm},\\;b=9\\text{ cm},\\;C=55^\\circ",
    "22.1",
    ["22.1 cm²", "22.1 cm2"],
    "A = ½ × 6 × 9 × sin 55° = 27 × 0.8192 ≈ 22.1 cm²."
  ),
  nonRightChoice(
    "area-trig-g3",
    "Two sides of a triangle are 5 m and 8 m. The angle between them is 40°. Which expression gives the area?",
    "A",
    [
      "$\\tfrac{1}{2}\\times 5\\times 8\\times\\sin 40^\\circ$",
      "$5\\times 8\\times\\sin 40^\\circ$",
      "$\\tfrac{1}{2}\\times 5\\times 8\\times\\cos 40^\\circ$",
      "$\\tfrac{1}{2}\\times(5+8)\\times\\sin 40^\\circ$",
    ],
    "Area = ½ × side₁ × side₂ × sin(included angle) = ½ × 5 × 8 × sin 40°. Option B forgets the ½; option C uses cosine instead of sine.",
    "\\text{sides }5\\text{ m and }8\\text{ m},\\;\\text{included angle }40^\\circ"
  ),
  nonRightAnswer(
    "area-trig-g4",
    "A triangle has sides 14 m and 18 m with included angle 80°. Find the area to the nearest square metre.",
    "\\text{sides }14\\text{ m and }18\\text{ m},\\;\\text{included angle }80^\\circ",
    "124",
    ["124 m²", "124 m2", "124 square metres"],
    "A = ½ × 14 × 18 × sin 80° = 126 × 0.9848 ≈ 124 m²."
  ),
];

const areaTrigIndependent: PracticeQuestion[] = [
  nonRightAnswer(
    "area-trig-i1",
    "A triangle has sides 5 cm and 8 cm with included angle 30°. Find the area to 1 decimal place.",
    "\\text{sides }5\\text{ cm and }8\\text{ cm},\\;\\text{included angle }30^\\circ",
    "10.0",
    ["10", "10 cm²", "10.0 cm²"],
    "A = ½ × 5 × 8 × sin 30° = 20 × 0.5 = 10 cm²."
  ),
  nonRightAnswer(
    "area-trig-i2",
    "Triangle ABC has a = 11 cm, b = 13 cm, included angle C = 48°. Find the area to 1 decimal place.",
    "a=11\\text{ cm},\\;b=13\\text{ cm},\\;C=48^\\circ",
    "53.1",
    ["53.1 cm²", "53.1 cm2"],
    "A = ½ × 11 × 13 × sin 48° = 71.5 × 0.7431 ≈ 53.1 cm²."
  ),
  nonRightChoice(
    "area-trig-i3",
    "Two sides are 6 m and 9 m. The angle between them is 105°. Which expression gives the area?",
    "A",
    [
      "$\\tfrac{1}{2}\\times 6\\times 9\\times\\sin 105^\\circ$",
      "$6\\times 9\\times\\sin 105^\\circ$",
      "$\\tfrac{1}{2}\\times 6\\times 9\\times\\cos 105^\\circ$",
      "$\\tfrac{1}{2}\\times 6\\times 9\\times\\tan 105^\\circ$",
    ],
    "Area = ½ × 6 × 9 × sin 105°. The ½ is essential and sin (not cos or tan) is used regardless of whether the angle is acute or obtuse.",
    "\\text{sides }6\\text{ m and }9\\text{ m},\\;\\text{included angle }105^\\circ"
  ),
  nonRightAnswer(
    "area-trig-i4",
    "A triangular sail has two sides of 6 m and 9 m meeting at an angle of 105°. Find the area to the nearest square metre.",
    "\\text{sides }6\\text{ m and }9\\text{ m},\\;\\text{included angle }105^\\circ",
    "26",
    ["26 m²", "26 m2", "26 square metres"],
    "A = ½ × 6 × 9 × sin 105° = 27 × 0.9659 ≈ 26 m²."
  ),
  nonRightAnswer(
    "area-trig-i5",
    "A triangular field has two sides of 20 m and 25 m with included angle 63°. Find the area to the nearest square metre.",
    "\\text{sides }20\\text{ m and }25\\text{ m},\\;\\text{included angle }63^\\circ",
    "223",
    ["223 m²", "223 m2", "223 square metres"],
    "A = ½ × 20 × 25 × sin 63° = 250 × 0.8910 ≈ 223 m²."
  ),
];

const areaTrigMistakes = [
  {
    mistake: "Forgetting the ½ and writing Area = ab sin C instead of ½ab sin C.",
    fix: "The formula is A = ½ab sin C. The ½ comes from the fact that a triangle is half a parallelogram. Always include it.",
  },
  {
    mistake:
      "Using an angle that is not between the two chosen sides (not the included angle).",
    fix: "The angle in the formula must be the one sandwiched between the two sides you are using. If you pick sides AB and BC, the angle must be at vertex B.",
  },
  {
    mistake: "Using cos C instead of sin C in the formula.",
    fix: "The formula is A = ½ab sin C — sine, not cosine. The area formula uses the sine of the included angle.",
  },
  {
    mistake:
      "Thinking the formula only works for acute triangles and refusing to apply it when C is obtuse.",
    fix: "A = ½ab sin C works for any triangle, including those with obtuse angles. sin C is positive for any angle between 0° and 180°, so the formula always gives a positive area.",
  },
];

const areaTrigMastery: PracticeQuestion[] = [
  nonRightChoice(
    "area-trig-m1",
    "The formula A = ½ab sin C is most directly useful when:",
    "B",
    [
      "All three sides are known",
      "Two sides and the included angle are known",
      "One side and two angles are known",
      "The triangle is right-angled",
    ],
    "The formula needs two sides (a and b) and the angle between them (C). If all three sides are known, you would need the cosine rule to find an angle first.",
    "A=\\tfrac{1}{2}ab\\sin C"
  ),
  nonRightAnswer(
    "area-trig-m2",
    "A triangle has sides 4 cm and 7 cm with included angle 90°. Find the area.",
    "\\text{sides }4\\text{ cm and }7\\text{ cm},\\;\\text{included angle }90^\\circ",
    "14",
    ["14 cm²", "14 cm2", "14.0"],
    "A = ½ × 4 × 7 × sin 90° = ½ × 28 × 1 = 14 cm². This confirms the formula: a right triangle's area is ½ × base × height."
  ),
  nonRightAnswer(
    "area-trig-m3",
    "Triangle ABC has sides 8 cm and 10 cm with included angle 43°. Find the area to 1 decimal place.",
    "\\text{sides }8\\text{ cm and }10\\text{ cm},\\;\\text{included angle }43^\\circ",
    "27.3",
    ["27.3 cm²", "27.3 cm2"],
    "A = ½ × 8 × 10 × sin 43° = 40 × 0.682 ≈ 27.3 cm²."
  ),
  nonRightChoice(
    "area-trig-m4",
    "Triangle PQR has PQ = 12 m, QR = 9 m, angle Q = 67°. Which expression gives the area?",
    "A",
    [
      "$\\tfrac{1}{2}\\times 12\\times 9\\times\\sin 67^\\circ$",
      "$\\tfrac{1}{2}\\times 12\\times 9\\times\\cos 67^\\circ$",
      "$12\\times 9\\times\\sin 67^\\circ$",
      "$\\tfrac{1}{2}\\times(12+9)\\times\\sin 67^\\circ$",
    ],
    "Sides PQ and QR form angle Q. Area = ½ × PQ × QR × sin Q = ½ × 12 × 9 × sin 67°.",
    "PQ=12\\text{ m},\\;QR=9\\text{ m},\\;\\angle Q=67^\\circ"
  ),
  nonRightAnswer(
    "area-trig-m5",
    "A triangular roof panel has sides 15 m and 22 m with included angle 58°. Find the area to the nearest square metre.",
    "\\text{sides }15\\text{ m and }22\\text{ m},\\;\\text{included angle }58^\\circ",
    "140",
    ["140 m²", "140 m2", "140 square metres"],
    "A = ½ × 15 × 22 × sin 58° = 165 × 0.848 ≈ 140 m²."
  ),
  nonRightAnswer(
    "area-trig-m6",
    "A triangle has sides 9 cm and 12 cm with included angle 135°. Find the area to 1 decimal place.",
    "\\text{sides }9\\text{ cm and }12\\text{ cm},\\;\\text{included angle }135^\\circ",
    "38.2",
    ["38.2 cm²", "38.2 cm2"],
    "A = ½ × 9 × 12 × sin 135° = 54 × 0.7071 ≈ 38.2 cm². sin 135° = sin 45° ≈ 0.707."
  ),
  nonRightChoice(
    "area-trig-m7",
    "A student writes: Area = ½ × 10 × 14 × sin 50°. What does 50° represent in this triangle?",
    "A",
    [
      "The angle between the two known sides (the included angle)",
      "The angle opposite the longest side",
      "The angle opposite the shortest side",
      "The sum of the other two angles",
    ],
    "In A = ½ab sin C, the angle C is always the included angle between the two sides used. Here, 10 and 14 are the two sides, and 50° is the angle between them. The angle opposite the longest side in this triangle is approximately 85°, not 50°.",
    "A=\\tfrac{1}{2}\\times 10\\times 14\\times\\sin 50^\\circ"
  ),
  nonRightAnswer(
    "area-trig-m8",
    "A triangular block of land has two sides of 40 m and 55 m, with the angle between them 71°. Find the area to the nearest square metre.",
    "\\text{sides }40\\text{ m and }55\\text{ m},\\;\\text{included angle }71^\\circ",
    "1040",
    ["1040 m²", "1040 m2", "1040 square metres"],
    "A = ½ × 40 × 55 × sin 71° = 1100 × 0.9455 ≈ 1040 m²."
  ),
  nonRightAnswer(
    "area-trig-m9",
    "A triangle has area 30 cm² and two sides of 10 cm and 8 cm. Find the included angle to the nearest degree.",
    "\\text{Area}=30\\text{ cm}^2,\\;\\text{sides }10\\text{ cm and }8\\text{ cm}",
    "49",
    ["49°", "49 degrees"],
    "30 = ½ × 10 × 8 × sin C = 40 sin C, so sin C = 0.75, C = sin⁻¹(0.75) ≈ 49°."
  ),
  nonRightAnswer(
    "area-trig-m10",
    "A triangular plot has sides 18 m and 24 m. Its area is 180 m². Find the included angle to the nearest degree.",
    "\\text{sides }18\\text{ m and }24\\text{ m},\\;\\text{Area}=180\\text{ m}^2",
    "56",
    ["56°", "56 degrees"],
    "180 = ½ × 18 × 24 × sin C = 216 sin C, so sin C = 180/216 ≈ 0.833, C = sin⁻¹(0.833) ≈ 56°."
  ),
];

// ─── Lesson 8: Bearings ───────────────────────────────────────────────────────

const bearingsWorkedExamples: WorkedExample[] = [
  {
    title: "Converting compass directions to three-digit bearings",
    questionLatex:
      "\\text{Write each compass direction as a three-digit bearing: (a) North, (b) South-East, (c) West, (d) a direction }25^\\circ\\text{ east of north.}",
    steps: [
      {
        explanation:
          "Bearings are measured clockwise from north. North is 0°, written as 000° using three digits.",
        latex: "\\text{(a) North}=000^\\circ",
      },
      {
        explanation:
          "South-East is halfway between south (180°) and east (90°), so 135° clockwise from north.",
        latex: "\\text{(b) South-East}=135^\\circ",
      },
      {
        explanation: "West is 270° clockwise from north.",
        latex: "\\text{(c) West}=270^\\circ",
      },
      {
        explanation:
          "25° east of north means 25° clockwise from north, written as a three-digit bearing.",
        latex: "\\text{(d) }25^\\circ\\text{ east of north}=025^\\circ",
      },
    ],
    finalAnswerLatex:
      "000^\\circ,\\;135^\\circ,\\;270^\\circ,\\;025^\\circ",
  },
  {
    title: "Finding a reverse bearing",
    questionLatex:
      "\\text{Point B is on a bearing of }110^\\circ\\text{ from point A. Find the bearing of A from B.}",
    steps: [
      {
        explanation:
          "The reverse (back) bearing differs by 180° because you are looking in the opposite direction.",
        latex: "\\text{Reverse bearing}=\\text{bearing}\\pm 180^\\circ",
      },
      {
        explanation:
          "Since 110° < 180°, add 180° to stay within the 0°–360° range.",
        latex: "110^\\circ+180^\\circ=290^\\circ",
      },
      {
        explanation:
          "The bearing of A from B is 290°. Rule: add 180° if the original bearing is less than 180°; subtract 180° if it is 180° or more.",
        latex: "\\text{Bearing of A from B}=290^\\circ",
      },
    ],
    finalAnswerLatex: "290^\\circ",
  },
  {
    title: "Finding north and east components from a bearing",
    questionLatex:
      "\\text{A ship travels }100\\text{ km on a bearing of }060^\\circ.\\text{ Find how far north and how far east it has traveled, to 1 decimal place.}",
    steps: [
      {
        explanation:
          "Draw a right triangle. The bearing 060° is 60° measured clockwise from north. The north component uses cosine, the east component uses sine.",
        latex:
          "\\text{North component}=100\\cos 60^\\circ,\\quad\\text{East component}=100\\sin 60^\\circ",
      },
      {
        explanation: "cos 60° = 0.5 exactly.",
        latex: "\\text{North}=100\\times 0.5=50\\text{ km}",
      },
      {
        explanation: "sin 60° ≈ 0.8660.",
        latex: "\\text{East}=100\\times 0.8660\\approx 86.6\\text{ km}",
      },
    ],
    finalAnswerLatex:
      "\\text{North}=50\\text{ km},\\quad\\text{East}\\approx 86.6\\text{ km}",
  },
];

const bearingsGuided: PracticeQuestion[] = [
  nonRightChoice(
    "bearings-g1",
    "Which three-digit bearing represents north-east (NE)?",
    "A",
    ["045°", "090°", "135°", "315°"],
    "NE is exactly halfway between north (000°) and east (090°), so it is 045°. East is 090°, south-east is 135°, north-west is 315°.",
    "\\text{Convert NE to a three-digit bearing}"
  ),
  nonRightAnswer(
    "bearings-g2",
    "State the reverse bearing of 130°.",
    "\\text{bearing }130^\\circ",
    "310",
    ["310°"],
    "Since 130° < 180°, add 180°: 130° + 180° = 310°."
  ),
  nonRightChoice(
    "bearings-g3",
    "A bearing of 250° points in which general direction?",
    "C",
    ["North-west", "South-east", "South-west", "North-east"],
    "250° is between 180° (south) and 270° (west), so it points south-west. NW is 270°–360°, SE is 090°–180°, NE is 000°–090°.",
    "\\text{bearing }250^\\circ"
  ),
  nonRightAnswer(
    "bearings-g4",
    "A ship travels 80 km on bearing 030°. How far east has it traveled? Give your answer to 1 decimal place.",
    "\\text{distance }80\\text{ km},\\;\\text{bearing }030^\\circ",
    "40.0",
    ["40", "40 km", "40.0 km"],
    "East = 80 × sin 30° = 80 × 0.5 = 40 km."
  ),
];

const bearingsIndependent: PracticeQuestion[] = [
  nonRightAnswer(
    "bearings-i1",
    "Write the bearing for due south as a three-digit number.",
    "\\text{due south}",
    "180",
    ["180°"],
    "South is directly opposite north. Measured clockwise from north, south is 180°."
  ),
  nonRightAnswer(
    "bearings-i2",
    "Find the reverse bearing of 225°.",
    "\\text{bearing }225^\\circ",
    "045",
    ["45", "45°", "045°"],
    "Since 225° ≥ 180°, subtract 180°: 225° − 180° = 045°."
  ),
  nonRightChoice(
    "bearings-i3",
    "A bearing of 315° points in which direction?",
    "B",
    ["South-west", "North-west", "South-east", "North-east"],
    "315° is between 270° (west) and 360°/000° (north), so it points north-west. SW is 180°–270°, SE is 090°–180°, NE is 000°–090°.",
    "\\text{bearing }315^\\circ"
  ),
  nonRightAnswer(
    "bearings-i4",
    "A hiker walks 50 km on bearing 060°. How far east has the hiker traveled? Give your answer to 1 decimal place.",
    "\\text{distance }50\\text{ km},\\;\\text{bearing }060^\\circ",
    "43.3",
    ["43.3 km"],
    "East = 50 × sin 60° = 50 × 0.8660 ≈ 43.3 km."
  ),
  nonRightAnswer(
    "bearings-i5",
    "A boat travels 90 km on bearing 120°. How far south has it traveled? Give your answer to the nearest kilometre.",
    "\\text{distance }90\\text{ km},\\;\\text{bearing }120^\\circ",
    "45",
    ["45 km"],
    "Bearing 120° is 120° clockwise from north. South component = 90 × |cos 120°| = 90 × 0.5 = 45 km (cos 120° = −0.5)."
  ),
];

const bearingsMistakes = [
  {
    mistake: "Measuring bearings from south or from the nearest axis rather than from north.",
    fix: "Bearings are always measured from north, clockwise. Start by drawing a north line at the point, then rotate clockwise to the direction of travel.",
  },
  {
    mistake: "Measuring anti-clockwise instead of clockwise.",
    fix: "Bearings increase clockwise. East is 090°, south is 180°, west is 270°. Going anti-clockwise from north gives compass directions, not bearings.",
  },
  {
    mistake: "Writing 45 instead of 045° — not using three digits.",
    fix: "Bearings always use three digits. Write 045°, not 45°. This convention avoids confusion between a bearing and an ordinary angle.",
  },
  {
    mistake:
      "Finding the reverse bearing by subtracting 90° rather than 180°.",
    fix: "The reverse bearing (looking back along a path) differs by 180°, not 90°. Add 180° if the original bearing is less than 180°; subtract 180° if it is 180° or greater.",
  },
];

const bearingsMastery: PracticeQuestion[] = [
  nonRightChoice(
    "bearings-m1",
    "Which three-digit bearing represents south-west (SW)?",
    "B",
    ["180°", "225°", "270°", "315°"],
    "SW is halfway between south (180°) and west (270°), so it is 225°. South is 180°, west is 270°, NW is 315°.",
    "\\text{Convert SW to a three-digit bearing}"
  ),
  nonRightAnswer(
    "bearings-m2",
    "Find the reverse bearing of 065°.",
    "\\text{bearing }065^\\circ",
    "245",
    ["245°"],
    "65° < 180°, so add 180°: 65° + 180° = 245°."
  ),
  nonRightAnswer(
    "bearings-m3",
    "Find the reverse bearing of 280°.",
    "\\text{bearing }280^\\circ",
    "100",
    ["100°"],
    "280° ≥ 180°, so subtract 180°: 280° − 180° = 100°."
  ),
  nonRightChoice(
    "bearings-m4",
    "A ship sails in the direction 'S 40° W' (40° west of south). What is its three-digit bearing?",
    "B",
    ["140°", "220°", "040°", "320°"],
    "S 40° W means starting at south (180°) and rotating 40° further clockwise towards west: 180° + 40° = 220°.",
    "\\text{S }40^\\circ\\text{ W}"
  ),
  nonRightAnswer(
    "bearings-m5",
    "From point A, point B has a bearing of 042°. What is the bearing of A from B?",
    "\\text{bearing of B from A}=042^\\circ",
    "222",
    ["222°"],
    "42° < 180°, so add 180°: 42° + 180° = 222°."
  ),
  nonRightAnswer(
    "bearings-m6",
    "A ship travels 120 km on bearing 035°. How far north has it traveled? Give your answer to the nearest kilometre.",
    "\\text{distance }120\\text{ km},\\;\\text{bearing }035^\\circ",
    "98",
    ["98 km"],
    "North = 120 × cos 35° = 120 × 0.8192 ≈ 98 km."
  ),
  nonRightAnswer(
    "bearings-m7",
    "A ship travels 120 km on bearing 035°. How far east has it traveled? Give your answer to the nearest kilometre.",
    "\\text{distance }120\\text{ km},\\;\\text{bearing }035^\\circ",
    "69",
    ["69 km"],
    "East = 120 × sin 35° = 120 × 0.5736 ≈ 69 km."
  ),
  nonRightChoice(
    "bearings-m8",
    "Which of the following bearings is in the north-west quadrant (between 270° and 360°)?",
    "B",
    ["230°", "310°", "180°", "095°"],
    "310° is between 270° and 360°, so it is in the north-west quadrant. 230° is SW, 180° is south, 095° is just east of east.",
    "\\text{Identify the NW quadrant bearing}"
  ),
  nonRightAnswer(
    "bearings-m9",
    "Town B is on a bearing of 145° from Town A. What is the bearing of Town A from Town B?",
    "\\text{bearing of B from A}=145^\\circ",
    "325",
    ["325°"],
    "145° < 180°, so add 180°: 145° + 180° = 325°."
  ),
  nonRightAnswer(
    "bearings-m10",
    "A ship sails 80 km on bearing 200°. How far south has it traveled? Give your answer to 1 decimal place.",
    "\\text{distance }80\\text{ km},\\;\\text{bearing }200^\\circ",
    "75.2",
    ["75.2 km"],
    "Bearing 200° is 20° past south. South component = 80 × |cos 200°| = 80 × cos 20° ≈ 80 × 0.9397 ≈ 75.2 km."
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

  if (lesson.slug === "sine-rule") {
    return {
      description:
        "Use the sine rule to find unknown sides and angles in non-right-angled triangles when an opposite side–angle pair is known.",
      learningIntention:
        "Apply the sine rule to find an unknown side or angle in a non-right-angled triangle.",
      successCriteria: [
        "Identify opposite side–angle pairs and label the triangle using the a, b, c and A, B, C convention.",
        "Set up the sine rule correctly for finding a side or an angle.",
        "Use the inverse sine function to find an unknown angle and round to the nearest degree.",
        "Recognise when the sine rule applies and be aware that two solutions may exist when finding an angle.",
      ],
      teaching: {
        paragraphs: [
          "The sine rule connects the sides and angles of any triangle — not just right triangles. In triangle ABC, side a is opposite angle A, side b is opposite angle B, and side c is opposite angle C.",
          "The rule states: a/sin A = b/sin B = c/sin C. Any two of these equal fractions can be used to find an unknown side or angle, as long as you have one complete opposite pair.",
          "To find a side: isolate the unknown side on the left. For example, b = a × sin B / sin A.",
          "To find an angle: isolate sin of the unknown angle, then apply sin⁻¹. Note that sin⁻¹ always returns an acute angle. If the problem allows an obtuse solution (the ambiguous case), you must check whether 180° minus your answer also forms a valid triangle.",
        ],
        latexBlocks: [
          "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
          "\\text{Finding a side: }b=\\frac{a\\times\\sin B}{\\sin A}",
          "\\text{Finding an angle: }\\sin A=\\frac{a\\times\\sin B}{b}\\implies A=\\sin^{-1}\\!\\left(\\frac{a\\times\\sin B}{b}\\right)",
        ],
      },
      workedExamples: sineRuleWorkedExamples,
      guidedPractice: sineRuleGuided,
      independentPractice: sineRuleIndependent,
      commonMistakes: sineRuleMistakes,
      masteryQuiz: sineRuleMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "cosine-rule") {
    return {
      description:
        "Use the cosine rule to find unknown sides and angles in non-right-angled triangles when two sides and the included angle, or all three sides, are known.",
      learningIntention:
        "Apply the cosine rule to find an unknown side or angle in a non-right-angled triangle.",
      successCriteria: [
        "Identify the included angle between two known sides and apply c² = a² + b² − 2ab cos C.",
        "Rearrange the cosine rule to find an angle: cos C = (a² + b² − c²)/(2ab).",
        "Recognise which rule — sine or cosine — is appropriate for a given set of known information.",
        "Round correctly and interpret answers in context.",
      ],
      teaching: {
        paragraphs: [
          "The cosine rule is used for non-right triangles when either two sides and the included angle are given (SAS), or all three sides are given (SSS).",
          "To find a side: c² = a² + b² − 2ab cos C, where C is the angle between sides a and b. Take the square root at the end.",
          "To find an angle from three known sides: rearrange to cos C = (a² + b² − c²)/(2ab), then apply cos⁻¹. If the result is negative, the angle is obtuse — cos⁻¹ handles this correctly.",
          "Decision guide: if you have AAS or ASA (an angle–side pair), use the sine rule. If you have SAS or SSS, use the cosine rule.",
        ],
        latexBlocks: [
          "c^2=a^2+b^2-2ab\\cos C",
          "\\cos C=\\frac{a^2+b^2-c^2}{2ab}",
          "\\text{SAS or SSS}\\Rightarrow\\text{cosine rule};\\quad\\text{AAS or ASA}\\Rightarrow\\text{sine rule}",
        ],
      },
      workedExamples: cosineRuleWorkedExamples,
      guidedPractice: cosineRuleGuided,
      independentPractice: cosineRuleIndependent,
      commonMistakes: cosineRuleMistakes,
      masteryQuiz: cosineRuleMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "area-trig-formula") {
    return {
      description:
        "Use the trigonometric area formula A = ½ab sin C to find the area of any triangle when two sides and their included angle are known.",
      learningIntention:
        "Apply A = ½ab sin C to calculate the area of a triangle from two sides and their included angle.",
      successCriteria: [
        "Identify the included angle — the angle between the two known sides.",
        "Substitute correctly into A = ½ab sin C and evaluate.",
        "Express area in square units and round to the required precision.",
        "Rearrange the formula to find an included angle from a known area and two sides.",
      ],
      teaching: {
        paragraphs: [
          "For a right triangle, area = ½ × base × height. When the triangle is not right-angled and the perpendicular height is not given, the formula A = ½ab sin C connects the area to two sides and their included angle.",
          "The included angle C is the angle formed between sides a and b at their common vertex. If sides AB and BC are the two chosen sides, the included angle is at vertex B.",
          "The formula works for any triangle — acute, obtuse, or right-angled. For a right triangle (C = 90°), sin 90° = 1, so the formula reduces to ½ab, which matches the standard formula.",
          "Square units must always be stated in the answer. Common contexts include triangular land areas, sail areas, and roof panels.",
        ],
        latexBlocks: [
          "A=\\tfrac{1}{2}ab\\sin C",
          "\\text{Rearranged: }\\sin C=\\frac{2A}{ab}\\implies C=\\sin^{-1}\\!\\left(\\frac{2A}{ab}\\right)",
        ],
      },
      workedExamples: areaTrigWorkedExamples,
      guidedPractice: areaTrigGuided,
      independentPractice: areaTrigIndependent,
      commonMistakes: areaTrigMistakes,
      masteryQuiz: areaTrigMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "bearings") {
    return {
      description:
        "Read, write, and work with three-digit compass bearings, find reverse bearings, and calculate north/east components from a bearing and distance.",
      learningIntention:
        "Use three-digit bearings to describe directions and solve simple navigation problems.",
      successCriteria: [
        "Write any compass direction as a three-digit bearing measured clockwise from north.",
        "Find the reverse bearing of a given bearing by adding or subtracting 180°.",
        "Use sin and cos to find the north and east components of a journey given a bearing and distance.",
        "Interpret bearing diagrams and descriptions correctly.",
      ],
      teaching: {
        paragraphs: [
          "A bearing is an angle measured clockwise from north, always written as a three-digit number. North is 000°, east is 090°, south is 180°, west is 270°.",
          "Three digits are always used: write 045°, not 45°. This convention distinguishes bearings from ordinary angles and avoids ambiguity.",
          "The reverse bearing (bearing back along the same path) differs by 180°. If the original bearing is less than 180°, add 180°. If it is 180° or more, subtract 180°.",
          "To find north and east components of a journey: north = distance × cos(bearing), east = distance × sin(bearing). These follow from resolving the displacement vector along the north and east axes.",
        ],
        latexBlocks: [
          "\\text{Reverse bearing: bearing}\\pm 180^\\circ",
          "\\text{North component}=d\\cos\\theta,\\quad\\text{East component}=d\\sin\\theta",
          "\\text{e.g. bearing }060^\\circ,\\;d=100\\text{ km}:\\;\\text{North}=50\\text{ km},\\;\\text{East}\\approx 86.6\\text{ km}",
        ],
      },
      workedExamples: bearingsWorkedExamples,
      guidedPractice: bearingsGuided,
      independentPractice: bearingsIndependent,
      commonMistakes: bearingsMistakes,
      masteryQuiz: bearingsMastery,
      masteryPassMark: 0.8,
    };
  }

  return null;
}
