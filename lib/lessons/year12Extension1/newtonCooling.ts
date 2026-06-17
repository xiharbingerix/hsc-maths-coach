import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function ncChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Write $Q(t) = A + Ce^{kt}$ first, then substitute the given values.",
    explanation,
  };
}

function ncTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Use $Q(t) = A + Ce^{kt}$. Find C from the initial condition, then substitute the given t.",
    explanation,
  };
}

// ─── Lesson: Newton's Law of Cooling and dQ/dt = k(Q − A) ──────────────────

const newtonCooling: Partial<ExplicitLesson> = {
  description:
    "Solve dQ/dt = k(Q − A) by separation of variables, apply it to Newton's Law of Cooling and limited-growth models, and justify long-run conclusions in context.",
  learningIntention:
    "Solve dQ/dt = k(Q − A) to obtain Q(t) = A + Ce^(kt), identify the equilibrium value A, and use initial and boundary conditions to solve Newton's Cooling and carrying-capacity problems.",
  successCriteria: [
    "Solve $dQ/dt = k(Q − A)$ by substituting $u = Q − A$ and separating variables to obtain $Q(t) = A + Ce^{kt}$.",
    "Identify A as the long-run equilibrium: as t → ∞, Q → A when k < 0.",
    "Find C from the initial condition Q(0) = Q₀: C = Q₀ − A.",
    "Use a second data point to determine k, then answer questions about future values or time.",
    "State conclusions in context: temperature approaching room temperature, population approaching carrying capacity.",
  ],
  teaching: {
    paragraphs: [
      "Many physical processes change at a rate proportional to how far they are from a fixed value. Newton's Law of Cooling is the classic example: an object cools faster when it is much hotter than the surroundings. Mathematically, dT/dt = k(T − S), where S is the surrounding temperature and k < 0 (negative because temperature decreases toward S).",
      "The general equation is $dQ/dt = k(Q − A)$. To solve it, substitute $u = Q − A$ so that $du/dt = dQ/dt = ku$. This is simple exponential growth/decay, giving $u(t) = Ce^{kt}$. Substituting back: $Q(t) = A + Ce^{kt}$. The initial condition $Q(0) = Q_0$ gives $C = Q_0 − A$.",
      "The fixed value $A$ is the equilibrium: when $k < 0$, the exponential term $e^{kt}$ → 0 as $t$ → ∞, so $Q(t)$ → A. For Newton's Cooling, the object eventually reaches the surrounding temperature $S$. For a population model $dP/dt = k(P − M)$ with $k < 0$ and $P < M$, the population grows and approaches the carrying capacity $M$.",
      "To find $k$ from a data point $Q(t_1) = Q_1$: substitute $t = t_1$ and solve for $e^{kt_1} = (Q_1 − A)/(Q_0 − A)$, then $k = (1/t_1)ln((Q_1 − A)/(Q_0 − A))$. Once $k$ is found, predict any future $Q$ value or find when $Q$ reaches a given level.",
    ],
    latexBlocks: [
      "\\frac{dQ}{dt} = k(Q-A) \\;\\Rightarrow\\; Q(t) = A + Ce^{kt},\\quad C = Q_0 - A",
      "\\text{Newton's Cooling: }\\frac{dT}{dt} = k(T-S),\\quad T(t) = S+(T_0-S)e^{kt},\\quad k<0",
      "\\text{As }t\\to\\infty\\text{ (k<0): }Q(t)\\to A\\quad\\text{(equilibrium)}",
    ],
  },
  workedExamples: [
    {
      title: "Newton's Law of Cooling — find temperature at a later time",
      questionLatex:
        "\\text{An object at }80^\\circ\\text{C is placed in a room at }20^\\circ\\text{C. After 5 minutes its temperature is }50^\\circ\\text{C.}\\\\\\text{Find a formula for }T(t)\\text{ and predict the temperature after 10 minutes.}",
      steps: [
        {
          explanation: "Write the general solution with S = 20 and T₀ = 80.",
          latex: "T(t) = 20 + (80-20)e^{kt} = 20 + 60e^{kt}",
        },
        {
          explanation: "Substitute the data point $T(5) = 50$ to find $e^{5k}$.",
          latex: "50 = 20 + 60e^{5k} \\;\\Rightarrow\\; e^{5k} = \\frac{30}{60} = \\frac{1}{2}",
        },
        {
          explanation: "Use $e^{10k} = (e^{5k})^2$ to find T(10).",
          latex: "T(10) = 20 + 60\\left(e^{5k}\\right)^2 = 20 + 60\\cdot\\frac{1}{4} = 20+15 = 35",
        },
      ],
      finalAnswerLatex: "T(t) = 20 + 60e^{kt},\\quad T(10)=35^\\circ\\text{C}",
      cartesianGraph: {
        description:
          "Temperature versus time for Newton's Law of Cooling. The horizontal line at T = 20°C is the surrounding temperature S (the asymptote). Points mark the initial temperature T = 80 at t = 0, the known value T = 50 at t = 5 min, and the predicted value T = 35 at t = 10 min. The curve approaches 20°C but never reaches it.",
        xMin: -0.5,
        xMax: 12,
        yMin: 0,
        yMax: 90,
        xStep: 2,
        yStep: 10,
        showGrid: true,
        xAxisLabel: "t (minutes)",
        yAxisLabel: "T (°C)",
        lines: [{ kind: "linear", m: 0, b: 20, label: "S = 20°C" }],
        points: [
          { x: 0, y: 80, label: "T₀=80" },
          { x: 5, y: 50, label: "T(5)=50" },
          { x: 10, y: 35, label: "T(10)=35" },
        ],
      },
    },
    {
      title: "Limited-growth model approaching carrying capacity",
      questionLatex:
        "\\text{A population satisfies }\\frac{dP}{dt} = k(P-500)\\text{ with }k<0\\text{ and }P_0=100.\\\\\\text{Given }P(4)=300,\\text{ find }P(8).",
      steps: [
        {
          explanation: "Write the general solution with A = 500 and P₀ = 100.",
          latex: "P(t) = 500 + (100-500)e^{kt} = 500 - 400e^{kt}",
        },
        {
          explanation: "Substitute $P(4) = 300$ to find $e^{4k}$.",
          latex: "300 = 500 - 400e^{4k} \\;\\Rightarrow\\; e^{4k} = \\frac{200}{400} = \\frac{1}{2}",
        },
        {
          explanation: "Use $e^{8k} = (e^{4k})^2$ to find P(8).",
          latex: "P(8) = 500 - 400\\left(\\frac{1}{2}\\right)^2 = 500 - 100 = 400",
        },
      ],
      finalAnswerLatex: "P(8) = 400",
      cartesianGraph: {
        description:
          "Population versus time approaching carrying capacity. The horizontal line at P = 500 is the carrying capacity (the asymptote A = 500). Points mark P₀ = 100 at t = 0, P = 300 at t = 4, and the predicted P = 400 at t = 8. The population grows and approaches 500 but never exceeds it.",
        xMin: -0.5,
        xMax: 12,
        yMin: 0,
        yMax: 550,
        xStep: 2,
        yStep: 100,
        showGrid: true,
        xAxisLabel: "t (time)",
        yAxisLabel: "P (population)",
        lines: [{ kind: "linear", m: 0, b: 500, label: "M = 500 (carrying capacity)" }],
        points: [
          { x: 0, y: 100, label: "P₀=100" },
          { x: 4, y: 300, label: "P(4)=300" },
          { x: 8, y: 400, label: "P(8)=400" },
        ],
      },
    },
  ],
  guidedPractice: [
    ncChoice(
      "y12e1-nc-g1",
      "The general solution to dQ/dt = k(Q − A) is:",
      "C",
      [
        "Q = ke^(At)",
        "Q = A·e^(kt)",
        "Q = A + Ce^(kt)",
        "Q = Ce^(kt) − A",
      ],
      "Substituting u = Q − A gives du/dt = ku → u = Ce^(kt) → Q = A + Ce^(kt)."
    ),
    ncTyped(
      "y12e1-nc-g2",
      "T(t) = 10 + 60e^(kt) with k = −(ln 2)/3. Find T(3).",
      "T(3) = 10 + 60\\,e^{-\\ln 2} = 10 + 60\\cdot\\tfrac{1}{2}",
      "40",
      ["40°C", "40^\\circ C"],
      "e^(−ln2) = 1/2, so T(3) = 10 + 60·(1/2) = 10 + 30 = 40°C."
    ),
    ncTyped(
      "y12e1-nc-g3",
      "$T(t) = 20 + 60e^{kt}$ and $T(5) = 50$. Find the value of $e^{5k}$.",
      "50 = 20 + 60\\,e^{5k}",
      "1/2",
      ["0.5"],
      "60·e^(5k) = 30 → e^(5k) = 1/2."
    ),
    ncChoice(
      "y12e1-nc-g4",
      "A population model satisfies dP/dt = k(P − 1000) with k < 0 and P₀ = 200. As t → ∞, P approaches:",
      "B",
      ["0", "1000", "200", "∞"],
      "With $k < 0$, $e^{kt}$ → 0 as $t$ → ∞, so $P(t) = 1000 + Ce^{kt}$ → 1000. The population approaches the equilibrium $A = 1000$."
    ),
  ],
  independentPractice: [
    ncTyped(
      "y12e1-nc-i1",
      "T(t) = 10 + 80e^(kt) with k = −(ln 2)/4. Find T(4).",
      "T(4) = 10 + 80\\,e^{-\\ln 2}",
      "50",
      ["50°C", "50^\\circ C"],
      "e^(−ln2) = 1/2, so T(4) = 10 + 80·(1/2) = 10 + 40 = 50°C."
    ),
    ncChoice(
      "y12e1-nc-i2",
      "For $Q(t) = A + Ce^{kt}$ with $k < 0$, the long-run limit of $Q(t)$ as $t$ → ∞ is:",
      "A",
      ["A", "C", "A + C", "0"],
      "As t → ∞, e^(kt) → 0 since k < 0, so Q(t) → A + 0 = A."
    ),
    ncTyped(
      "y12e1-nc-i3",
      "T(t) = 20 + 80e^(kt) and T(5) = 60. Find T(10).",
      "T(5)=60\\Rightarrow 80e^{5k}=40\\Rightarrow e^{5k}=\\tfrac{1}{2}",
      "40",
      ["40°C", "40^\\circ C"],
      "e^(10k) = (e^(5k))² = 1/4. T(10) = 20 + 80·(1/4) = 20 + 20 = 40°C."
    ),
    ncChoice(
      "y12e1-nc-i4",
      "Newton's Law of Cooling: dT/dt = k(T − S). When T₀ = 75°C, S = 15°C and k = −0.2, the initial cooling rate dT/dt|_{t=0} equals:",
      "D",
      [
        "−0.2 °C/min",
        "−60 °C/min",
        "−3 °C/min",
        "−12 °C/min",
      ],
      "dT/dt|_{t=0} = k(T₀ − S) = −0.2(75 − 15) = −0.2 × 60 = −12°C/min."
    ),
    ncTyped(
      "y12e1-nc-i5",
      "$P(t) = 800 − 600e^{kt}$ and $P(6) = 500$. Find the value of $e^{6k}$.",
      "500 = 800 - 600\\,e^{6k}",
      "1/2",
      ["0.5"],
      "600·e^(6k) = 300 → e^(6k) = 1/2."
    ),
  ],
  masteryQuiz: [
    ncChoice(
      "y12e1-nc-m1",
      "The general solution to dQ/dt = k(Q − A) obtained by separation of variables is:",
      "B",
      [
        "Q = k(Q − A)",
        "Q = A + Ce^(kt)",
        "Q = Ae^(kt)",
        "Q = A + kt",
      ],
      "Let u = Q − A → du/dt = ku → u = Ce^(kt) → Q = A + Ce^(kt)."
    ),
    ncTyped(
      "y12e1-nc-m2",
      "T(t) = 20 + 80e^(kt) and T(4) = 60. Find T(8).",
      "T(4)=60\\Rightarrow e^{4k}=\\tfrac{1}{2}\\Rightarrow T(8)=20+80\\cdot\\tfrac{1}{4}",
      "40",
      ["40°C", "40^\\circ C"],
      "e^(8k) = (1/2)² = 1/4. T(8) = 20 + 80·(1/4) = 40°C."
    ),
    ncChoice(
      "y12e1-nc-m3",
      "In $Q(t) = A + Ce^{kt}$, the equilibrium value that $Q$ approaches (for $k < 0$) is:",
      "A",
      ["A", "C", "k", "A + C"],
      "As $t$ → ∞ with $k < 0$, $e^{kt}$ → 0, so $Q$ → A. The equilibrium is $A$, not the initial condition."
    ),
    ncTyped(
      "y12e1-nc-m4",
      "Q(t) = 3 + 5e^(kt). If k = −ln 2, find Q(1).",
      "Q(1) = 3 + 5e^{-\\ln 2} = 3 + 5\\cdot\\tfrac{1}{2}",
      "5.5",
      ["11/2"],
      "e^(−ln2) = 1/2. Q(1) = 3 + 5·(1/2) = 3 + 2.5 = 5.5."
    ),
    ncChoice(
      "y12e1-nc-m5",
      "In Newton's Law of Cooling, the sign of k is always:",
      "C",
      [
        "Positive, because temperature increases.",
        "Zero, because the equilibrium is constant.",
        "Negative, because the object cools toward the surrounding temperature.",
        "Dependent on whether the object is hotter or cooler than the surroundings.",
      ],
      "Cooling means T decreases toward S, so dT/dt < 0 when T > S. Since k(T−S) must be negative and (T−S) > 0, k must be negative."
    ),
    ncTyped(
      "y12e1-nc-m6",
      "T(t) = 60e^(kt) with k = −(ln 2)/2. Find T(4).",
      "T(4) = 60\\,e^{-2\\ln 2} = 60\\cdot\\tfrac{1}{4}",
      "15",
      ["15°C", "15^\\circ C"],
      "k·4 = −(ln2/2)·4 = −2ln2. e^(−2ln2) = 1/4. T(4) = 60/4 = 15°C."
    ),
    ncChoice(
      "y12e1-nc-m7",
      "A population satisfies dP/dt = k(P − 2000) with k < 0 and P₀ = 500. Which statement is correct?",
      "A",
      [
        "The population grows toward 2000.",
        "The population decays to 0.",
        "The population grows without bound.",
        "The population is constant at 500.",
      ],
      "k < 0 and P₀ < 2000 means k(P−2000) = (negative)(negative) > 0, so dP/dt > 0 — the population grows toward A = 2000."
    ),
    ncTyped(
      "y12e1-nc-m8",
      "Q(t) = 50 + Ce^(kt). If Q(0) = 80, find C.",
      "Q(0) = 50 + C\\,e^0 = 50 + C = 80",
      "30",
      [],
      "C = Q₀ − A = 80 − 50 = 30."
    ),
    ncChoice(
      "y12e1-nc-m9",
      "As t increases (k < 0), the rate of change |dQ/dt| = |k||Q − A|:",
      "C",
      [
        "Increases, because k is negative.",
        "Stays constant.",
        "Decreases, because Q approaches A so |Q − A| shrinks.",
        "Increases, because e^(kt) grows.",
      ],
      "As Q approaches A, the difference |Q − A| → 0, so the rate |dQ/dt| = |k||Q − A| → 0. Cooling or growth slows as it nears equilibrium."
    ),
    ncTyped(
      "y12e1-nc-m10",
      "T(t) = 20 + 80e^(kt). Object at 100°C, room 20°C. After 10 min, T = 60°C. Find e^(10k).",
      "60 = 20 + 80\\,e^{10k}",
      "1/2",
      ["0.5"],
      "80·e^(10k) = 40 → e^(10k) = 1/2."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "calculus-applications-newton-cooling": newtonCooling,
};

export function year12Extension1NewtonCoolingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "calculus-applications") return undefined;
  return lessons[lesson.slug];
}
