import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { enhanceMotionRatesRetainedPractice, getMotionRatesQualityMastery } from "./motionRatesQuality";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

// ─── L1: Displacement, Velocity and Acceleration ──────────────────────────────

const daWorked: WorkedExample[] = [
  {
    title: "Find velocity and acceleration from x = t³ − 6t² + 9t",
    questionLatex: "x = t^3 - 6t^2 + 9t",
    steps: [
      { explanation: "Velocity is the first derivative of displacement.", latex: "v = \\frac{dx}{dt} = 3t^2 - 12t + 9" },
      { explanation: "Acceleration is the derivative of velocity (second derivative of x).", latex: "a = \\frac{dv}{dt} = 6t - 12" },
      { explanation: "Initial velocity: v(0) = 9 m/s. Initial acceleration: a(0) = −12 m/s².", latex: "v(0)=9,\\quad a(0)=-12" },
    ],
    finalAnswerLatex: "v=3t^2-12t+9,\\quad a=6t-12",
  },
  {
    title: "Find when the particle is momentarily at rest from x = t² − 4t + 3",
    questionLatex: "x = t^2 - 4t + 3",
    steps: [
      { explanation: "Find velocity.", latex: "v = \\frac{dx}{dt} = 2t - 4" },
      { explanation: "Set v = 0.", latex: "2t-4=0\\implies t=2" },
      { explanation: "The particle is momentarily at rest at t = 2.", latex: "" },
    ],
    finalAnswerLatex: "t=2\\text{ s}",
  },
];

const daGuided: PracticeQuestion[] = [
  fa("y11adv-mot-da-g1", "A particle moves with x = t² + 3t. Find the velocity at t = 2.", "x = t^2 + 3t", "v = 7 m/s", ["7", "7 m/s"]),
  mc("y11adv-mot-da-g2", "Acceleration is defined as:", "B",
    [{ label: "A", text: "The first derivative of displacement" }, { label: "B", text: "The derivative of velocity, or the second derivative of displacement" }, { label: "C", text: "The integral of velocity" }, { label: "D", text: "The rate of change of position with respect to velocity" }],
    "a = dv/dt = d²x/dt². Acceleration is the rate of change of velocity, or equivalently the second derivative of displacement.", ""),
  fa("y11adv-mot-da-g3", "x = 2t³ − 3t². Find a(t).", "x = 2t^3 - 3t^2", "a = 12t - 6", ["12t-6"]),
  mc("y11adv-mot-da-g4", "For x = t² − 4t + 3, the particle is momentarily at rest when:", "C",
    [{ label: "A", text: "$t = 0$" }, { label: "B", text: "$t = 1$" }, { label: "C", text: "$t = 2$" }, { label: "D", text: "$t = 3$" }],
    "v = dx/dt = 2t−4 = 0 → t = 2.", "x=t^2-4t+3"),
];

const daIndep: PracticeQuestion[] = [
  fa("y11adv-mot-da-i1", "x = t³ − 6t + 1. Find v(t) and a(t).", "", "v = 3t²-6, a = 6t", ["v=3t^2-6; a=6t"]),
  mc("y11adv-mot-da-i2", "A particle has x = 5t − t². What is the initial velocity?", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$5$ m/s" }, { label: "C", text: "$-2$ m/s" }, { label: "D", text: "$5t$" }],
    "v = dx/dt = 5 − 2t. At t = 0: v(0) = 5 m/s.", "x=5t-t^2"),
  fa("y11adv-mot-da-i3", "x = t² − 4t. Find when the particle is at the origin (x = 0).", "x=t^2-4t", "t = 0 and t = 4", ["t=0, t=4"]),
  mc("y11adv-mot-da-i4", "x = t³ − 3t² − 9t. The acceleration at t = 2 is:", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$6$ m/s²" }, { label: "C", text: "$-6$ m/s²" }, { label: "D", text: "$12$ m/s²" }],
    "v = 3t²−6t−9. a = dv/dt = 6t−6. At t=2: a = 12−6 = 6 m/s².", ""),
  fa("y11adv-mot-da-i5", "x = 4t − t². When does the particle have zero velocity?", "x = 4t-t^2", "t = 2 s", ["t=2"]),
];

const daMastery: PracticeQuestion[] = [
  fa("y11adv-mot-da-m1", "x = t³ − 3t. Find v(t) and a(t).", "", "v = 3t²-3, a = 6t", ["v=3t^2-3; a=6t"]),
  mc("y11adv-mot-da-m2", "A particle has x = 6t − t². What is the maximum displacement?", "B",
    [{ label: "A", text: "$3$" }, { label: "B", text: "$9$" }, { label: "C", text: "$6$" }, { label: "D", text: "$12$" }],
    "Maximum when v = 0: dx/dt = 6−2t = 0 → t = 3. x(3) = 18−9 = 9.", ""),
  fa("y11adv-mot-da-m3", "x = 2t² − 8t + 3. Find the acceleration.", "x=2t^2-8t+3", "a = 4 m/s² (constant)", ["4"]),
  mc("y11adv-mot-da-m4", "If velocity is constant (non-zero), what is the acceleration?", "A",
    [{ label: "A", text: "$0$" }, { label: "B", text: "Equal to the velocity" }, { label: "C", text: "Negative" }, { label: "D", text: "Cannot be determined" }],
    "If v = constant, then a = dv/dt = 0. A constant velocity means no change in motion.", ""),
  fa("y11adv-mot-da-m5", "x = t³ − 6t² + 9t + 1. Find v when a = 0.", "x=t^3-6t^2+9t+1", "v = -3 m/s", ["-3"]),
  mc("y11adv-mot-da-m6", "x = t² + 2. What does x(0) = 2 represent?", "C",
    [{ label: "A", text: "Initial velocity" }, { label: "B", text: "Initial acceleration" }, { label: "C", text: "Initial displacement from the origin" }, { label: "D", text: "The particle is 2 units per second from the origin" }],
    "x is displacement. x(0) = 2 means the particle starts 2 units from the origin at time t = 0.", ""),
  fa("y11adv-mot-da-m7", "A particle has v = 6t − 4. Find the acceleration.", "v=6t-4", "a = 6 m/s² (constant)", ["6"]),
  mc("y11adv-mot-da-m8", "x = t³ − 6t² + 9t. When is the acceleration equal to zero?", "B",
    [{ label: "A", text: "$t=0$" }, { label: "B", text: "$t=2$" }, { label: "C", text: "$t=1$ and $t=3$" }, { label: "D", text: "$t=3$" }],
    "v = 3t²−12t+9, a = 6t−12 = 0 → t = 2.", ""),
];

// ─── L2: Finding Displacement by Integration ──────────────────────────────────

const fdWorked: WorkedExample[] = [
  {
    title: "Find x(t) given v = 3t² − 4t and x(0) = 5",
    questionLatex: "v = 3t^2 - 4t,\\quad x(0)=5",
    steps: [
      { explanation: "Integrate velocity to find displacement.", latex: "x = \\int (3t^2-4t)\\,dt = t^3-2t^2+C" },
      { explanation: "Apply initial condition x(0) = 5.", latex: "5=0-0+C\\implies C=5" },
      { explanation: "State the displacement function.", latex: "x=t^3-2t^2+5" },
    ],
    finalAnswerLatex: "x=t^3-2t^2+5",
  },
  {
    title: "A particle starts at the origin with v = 2t − 6. Find x(t) and the position at t = 4.",
    questionLatex: "v = 2t-6,\\quad x(0)=0",
    steps: [
      { explanation: "Integrate.", latex: "x=\\int(2t-6)\\,dt=t^2-6t+C" },
      { explanation: "Initial condition: x(0) = 0 → C = 0.", latex: "x=t^2-6t" },
      { explanation: "Position at t = 4.", latex: "x(4)=16-24=-8" },
    ],
    finalAnswerLatex: "x=t^2-6t;\\quad x(4)=-8\\text{ m}",
  },
];

const fdGuided: PracticeQuestion[] = [
  fa("y11adv-mot-fd-g1", "v = 4t − 2 and x(0) = 3. Find x(t).", "v=4t-2", "x = 2t²-2t+3", ["2t^2-2t+3"]),
  mc("y11adv-mot-fd-g2", "Why is an initial condition needed when finding x from v?", "D",
    [{ label: "A", text: "So we can differentiate x twice" }, { label: "B", text: "Integration produces a constant C; the initial condition determines its value" }, { label: "C", text: "Velocity doesn't determine displacement uniquely without C" }, { label: "D", text: "Both B and C — the constant of integration can only be found from a given condition" }],
    "The antiderivative of v gives x + C, a family of displacement functions. The initial condition x(t₀) = x₀ fixes C and uniquely determines x(t).", ""),
  fa("y11adv-mot-fd-g3", "v = 6t² and x(1) = 4. Find x(t).", "v=6t^2,\\;x(1)=4", "x = 2t³+2", ["2t^3+2"]),
  mc("y11adv-mot-fd-g4", "A particle starts at the origin with v = t². What is its displacement at t = 3?", "C",
    [{ label: "A", text: "$3$" }, { label: "B", text: "$6$" }, { label: "C", text: "$9$" }, { label: "D", text: "$27$" }],
    "x = ∫t² dt = t³/3 + C. x(0) = 0 → C = 0. x(t) = t³/3. At t=3: x(3) = 27/3 = 9.", ""),
];

const fdIndep: PracticeQuestion[] = [
  fa("y11adv-mot-fd-i1", "v = 2t + 5 and x(0) = 0. Find x(t).", "v=2t+5", "x = t²+5t", ["t^2+5t"]),
  fa("y11adv-mot-fd-i2", "v = 6t² − 4t and x(2) = 10. Find x(t).", "v=6t^2-4t,\\;x(2)=10", "x = 2t³-2t²+2", ["2t^3-2t^2+2"]),
  mc("y11adv-mot-fd-i3", "A particle starts at x = 2 with v = 4. How far from the origin is it at t = 3?", "B",
    [{ label: "A", text: "$12$" }, { label: "B", text: "$14$" }, { label: "C", text: "$10$" }, { label: "D", text: "$6$" }],
    "v = 4 (constant). x = ∫4 dt = 4t + C. x(0) = 2 → C = 2. x(t) = 4t + 2. At t=3: x(3) = 14.", ""),
  fa("y11adv-mot-fd-i4", "a = 6 and v(0) = 2 and x(0) = 1. Find x(t).", "a=6,\\;v(0)=2,\\;x(0)=1", "x = 3t²+2t+1", ["3t^2+2t+1"]),
  mc("y11adv-mot-fd-i5", "v = −2t + 6 and x(0) = 0. What is the displacement when the particle first stops?", "B",
    [{ label: "A", text: "$6$" }, { label: "B", text: "$9$" }, { label: "C", text: "$3$" }, { label: "D", text: "$12$" }],
    "v = 0 → t = 3. x = ∫(−2t+6) dt = −t²+6t+C. C=0. x(3) = −9+18 = 9.", ""),
];

const fdMastery: PracticeQuestion[] = [
  fa("y11adv-mot-fd-m1", "v = 3t² − 6t and x(0) = 0. Find x(t).", "v=3t^2-6t", "x = t³-3t²", ["t^3-3t^2"]),
  mc("y11adv-mot-fd-m2", "a = 4, v(0) = −2, x(0) = 0. Find x at t = 3.", "C",
    [{ label: "A", text: "$18$" }, { label: "B", text: "$24$" }, { label: "C", text: "$12$" }, { label: "D", text: "$6$" }],
    "v = ∫4 dt = 4t + C₁. v(0) = −2 → C₁ = −2. v = 4t−2. x = ∫(4t−2) dt = 2t²−2t+C₂. x(0)=0 → C₂=0. x = 2t²−2t. x(3) = 18−6 = 12.", ""),
  fa("y11adv-mot-fd-m3", "v = cos t and x(0) = 0. Find x(π/2).", "v=\\cos t,\\;x(0)=0", "x(π/2) = 1", ["1"]),
  mc("y11adv-mot-fd-m4", "What does the definite integral of velocity from time 0 to time T represent?", "B",
    [{ label: "A", text: "Total distance travelled from t = 0 to t = T" }, { label: "B", text: "Displacement (change in position) from t = 0 to t = T" }, { label: "C", text: "Total speed from t = 0 to t = T" }, { label: "D", text: "Average velocity" }],
    "The definite integral of velocity equals x(T) − x(0), the signed change in position. If velocity changes sign, this displacement is smaller in magnitude than the total distance.", ""),
  fa("y11adv-mot-fd-m5", "v = e^t and x(0) = 1. Find x(t).", "v=e^t,\\;x(0)=1", "x = e^t", ["e^t"]),
  mc("y11adv-mot-fd-m6", "A particle starts at x = 0 with v = t − 2. At t = 4, its displacement is:", "A",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$4$" }, { label: "C", text: "$-4$" }, { label: "D", text: "$8$" }],
    "x = ∫(t−2) dt = t²/2 − 2t + C. x(0) = 0 → C = 0. x(t) = t²/2 − 2t. x(4) = 8 − 8 = 0.", ""),
  fa("y11adv-mot-fd-m7", "v = 2 sin t and x(0) = 0. Find x(π).", "v=2\\sin t,\\;x(0)=0", "x(π) = 4", ["4"]),
  mc("y11adv-mot-fd-m8", "Integrating v twice (with two initial conditions) is needed to find:", "C",
    [{ label: "A", text: "Velocity from acceleration" }, { label: "B", text: "Displacement from displacement" }, { label: "C", text: "Displacement from acceleration" }, { label: "D", text: "Acceleration from displacement" }],
    "x → v by one differentiation; v → a by another. Reversing: a → v (integrate once) → x (integrate again). Each step introduces a constant, requiring one initial condition each.", ""),
];

// ─── L3: Motion Analysis — Direction, Distance, and Rest ─────────────────────

const maWorked: WorkedExample[] = [
  {
    title: "Find total distance travelled from x = t³ − 3t² on [0, 4]",
    questionLatex: "x = t^3-3t^2,\\quad 0\\leq t\\leq 4",
    steps: [
      { explanation: "Find velocity and when v = 0.", latex: "v=3t^2-6t=3t(t-2)=0\\implies t=0,\\;t=2" },
      { explanation: "Position at key times.", latex: "x(0)=0,\\quad x(2)=8-12=-4,\\quad x(4)=64-48=16" },
      { explanation: "From t=0 to t=2: displacement = x(2)−x(0) = −4. Distance = 4.", latex: "" },
      { explanation: "From t=2 to t=4: displacement = x(4)−x(2) = 20. Distance = 20.", latex: "" },
      { explanation: "Total distance = 4 + 20 = 24 m.", latex: "\\text{Total distance}=4+20=24\\text{ m}" },
    ],
    finalAnswerLatex: "\\text{Total distance}=24\\text{ m}",
  },
  {
    title: "Determine when the particle changes direction from x = t² − 6t + 5",
    questionLatex: "x = t^2-6t+5",
    steps: [
      { explanation: "v = dx/dt = 2t − 6.", latex: "" },
      { explanation: "v = 0 at t = 3.", latex: "" },
      { explanation: "For t < 3: v = 2(0)−6 = −6 < 0 → moving in negative direction.", latex: "" },
      { explanation: "For t > 3: v = 2(4)−6 = 2 > 0 → moving in positive direction.", latex: "" },
      { explanation: "Direction changes at t = 3.", latex: "" },
    ],
    finalAnswerLatex: "\\text{Direction changes at }t=3",
  },
];

const maGuided: PracticeQuestion[] = [
  mc("y11adv-mot-ma-g1", "x = t² − 4t + 3. When does the particle change direction?", "B",
    [{ label: "A", text: "$t=1$" }, { label: "B", text: "$t=2$" }, { label: "C", text: "$t=3$" }, { label: "D", text: "$t=0$" }],
    "v = 2t−4 = 0 → t = 2. Check: v < 0 for t < 2 (moving negative), v > 0 for t > 2 (moving positive). Direction changes at t = 2.", ""),
  fa("y11adv-mot-ma-g2", "x = t² − 6t. Find total distance from t = 0 to t = 6.", "x=t^2-6t", "18 m", ["18"]),
  mc("y11adv-mot-ma-g3", "What is the difference between displacement and total distance?", "C",
    [{ label: "A", text: "They are always equal" }, { label: "B", text: "Displacement is always positive; distance can be negative" }, { label: "C", text: "Displacement is the net change in position (can be negative); distance is the total path length (always positive)" }, { label: "D", text: "Distance is the derivative of displacement" }],
    "Displacement = final position − initial position (can be negative if the particle moved backwards overall). Distance = total path length (always non-negative, counts all movement regardless of direction).", ""),
  fa("y11adv-mot-ma-g4", "v = t − 3. A particle starts at x = 0. Find the total distance from t = 0 to t = 6.", "v=t-3", "9 m", ["9"]),
];

const maIndep: PracticeQuestion[] = [
  fa("y11adv-mot-ma-i1", "x = t³ − 3t on [0, 3]. Find total distance travelled.", "x=t^3-3t", "22 m", ["22"]),
  mc("y11adv-mot-ma-i2", "A particle has v = 2 − 4t. At what time is its speed a minimum (i.e., the particle momentarily at rest)?", "B",
    [{ label: "A", text: "$t=0$" }, { label: "B", text: "$t=1/2$" }, { label: "C", text: "$t=1$" }, { label: "D", text: "$t=2$" }],
    "Speed is minimum at 0 when the particle is at rest: v = 0 → 2−4t = 0 → t = 1/2.", ""),
  mc("y11adv-mot-ma-i3", "x = t² − 4t + 3 on [0, 5]. Displacement = x(5) − x(0) =", "B",
    [{ label: "A", text: "$3$" }, { label: "B", text: "$5$" }, { label: "C", text: "$8$" }, { label: "D", text: "$-2$" }],
    "x(0) = 3; x(5) = 25−20+3 = 8. Displacement = 8−3 = 5.", ""),
  fa("y11adv-mot-ma-i4", "For t > 0, v = 3t² − 12t = 3t(t−4). Find when the particle changes direction.", "v=3t^2-12t,\\quad t>0", "t = 4", ["4"]),
  mc("y11adv-mot-ma-i5", "A particle has v > 0 throughout. How does total distance relate to displacement?", "A",
    [{ label: "A", text: "They are equal" }, { label: "B", text: "Distance > displacement always" }, { label: "C", text: "Displacement > distance always" }, { label: "D", text: "Cannot be compared without the position function" }],
    "If v > 0 throughout, the particle only moves in one direction. Total distance = displacement (both equal x(T) − x(0) > 0).", ""),
];

// Corrected i1 answer:
// x(0)=0, v=3t²-3=0 at t=1. x(1)=1-3=-2. x(3)=27-9=18.
// Distance = |x(1)-x(0)| + |x(3)-x(1)| = 2 + 20 = 22 m

const maMastery: PracticeQuestion[] = [
  mc("y11adv-mot-ma-m1", "x = t² − 2t. On [0, 4], the total distance is:", "B",
    [{ label: "A", text: "$8$" }, { label: "B", text: "$10$" }, { label: "C", text: "$4$" }, { label: "D", text: "$6$" }],
    "v = 2t−2 = 0 at t=1. x(0)=0, x(1)=−1, x(4)=8. Distance = |−1−0|+|8−(−1)| = 1+9 = 10.", ""),
  fa("y11adv-mot-ma-m2", "v = 2t − 4. On [0, 5], find the total distance.", "v=2t-4", "13 m", ["13"]),
  mc("y11adv-mot-ma-m3", "A particle changes direction when:", "C",
    [{ label: "A", text: "Acceleration is zero" }, { label: "B", text: "Displacement is zero" }, { label: "C", text: "Velocity is zero and changes sign" }, { label: "D", text: "Velocity is a minimum" }],
    "Changing direction means the particle momentarily stops (v = 0) and then moves the other way (v changes sign). Not every v = 0 means direction change — if v = 0 but doesn't change sign, it's a horizontal inflection in x.", ""),
  fa("y11adv-mot-ma-m4", "x = t³ − 6t² + 9t on [0, 5]. Find total distance.", "x=t^3-6t^2+9t", "20 m", ["20"]),
  mc("y11adv-mot-ma-m5", "x = −t² + 4t. The particle is moving in the positive direction when:", "B",
    [{ label: "A", text: "$t > 2$" }, { label: "B", text: "$0 < t < 2$" }, { label: "C", text: "$t < 0$" }, { label: "D", text: "Never" }],
    "v = −2t+4 > 0 → t < 2. So for 0 < t < 2, the particle moves in the positive direction.", ""),
  fa("y11adv-mot-ma-m6", "v = 6 − 2t. Starting from x = 0, find the maximum displacement.", "v=6-2t", "9 m", ["9"]),
  mc("y11adv-mot-ma-m7", "∫₀^4 |v(t)| dt computes:", "B",
    [{ label: "A", text: "Displacement" }, { label: "B", text: "Total distance" }, { label: "C", text: "Speed at t = 4" }, { label: "D", text: "Average velocity" }],
    "∫|v| dt integrates speed (the magnitude of velocity), giving total distance. ∫v dt without absolute value gives displacement (signed).", ""),
  mc("y11adv-mot-ma-m8", "x = t² − 6t. Displacement from t=0 to t=6 is 0. Total distance is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$6$" }, { label: "C", text: "$18$" }, { label: "D", text: "$36$" }],
    "v=0 at t=3. x(0)=0, x(3)=−9, x(6)=0. Distance = |−9−0|+|0−(−9)| = 9+9 = 18.", ""),
];

// ─── L4: Rates of Change Applications ────────────────────────────────────────

const rcWorked: WorkedExample[] = [
  {
    title: "Water drains from a tank. V = 100 − 5t². Find the rate of change at t = 3.",
    questionLatex: "V = 100-5t^2",
    steps: [
      { explanation: "Differentiate to find the rate of change of volume.", latex: "\\frac{dV}{dt}=-10t" },
      { explanation: "At t = 3.", latex: "\\frac{dV}{dt}\\bigg|_{t=3}=-30" },
      { explanation: "Interpret: the volume is decreasing at 30 units per second at t = 3.", latex: "" },
    ],
    finalAnswerLatex: "\\frac{dV}{dt}=-30\\text{ units}^3/\\text{s}",
  },
  {
    title: "The temperature T°C of a cooling object at time t hours is T = 20 + 80e^(−t). Find the initial rate of cooling.",
    questionLatex: "T = 20+80e^{-t}",
    steps: [
      { explanation: "Differentiate.", latex: "\\frac{dT}{dt}=-80e^{-t}" },
      { explanation: "At t = 0.", latex: "\\frac{dT}{dt}\\bigg|_{t=0}=-80e^0=-80" },
      { explanation: "The temperature is decreasing at 80°C per hour initially.", latex: "" },
    ],
    finalAnswerLatex: "-80\\;^\\circ\\text{C/hour}",
  },
];

const rcGuided: PracticeQuestion[] = [
  fa("y11adv-mot-rc-g1", "V = 200 − 4t². Find dV/dt and interpret its sign at t = 3.", "V=200-4t^2", "dV/dt = -8t; at t=3: dV/dt=-24 (decreasing)", ["-8t; -24"]),
  mc("y11adv-mot-rc-g2", "For the displayed population model, what does dP/dt represent?", "B",
    [{ label: "A", text: "The total population at time t" }, { label: "B", text: "The rate at which the population is growing" }, { label: "C", text: "The average population over time t" }, { label: "D", text: "The population in year 0" }],
    "The derivative dP/dt is the instantaneous rate at which the population changes with time. For this model it is positive, so it measures population growth rather than population size.", "P=1000e^{0.2t}"),
  fa("y11adv-mot-rc-g3", "The height of a projectile is h = 30t − 5t². Find the rate of change of height at t = 2.", "h=30t-5t^2", "dh/dt = 10 m/s", ["10"]),
  mc("y11adv-mot-rc-g4", "For the displayed temperature model, the rate of cooling dT/dt at t = 0 is:", "C",
    [{ label: "A", text: "$-80$" }, { label: "B", text: "$80$" }, { label: "C", text: "$-40$" }, { label: "D", text: "$40$" }],
    "Differentiating multiplies the model's exponential term by −0.5, giving an initial rate of −40 degrees per unit time. The negative sign means the temperature is falling.", "T=80e^{-0.5t}+20"),
];

const rcIndep: PracticeQuestion[] = [
  fa("y11adv-mot-rc-i1", "A balloon has radius r = 2t + 1. Find dr/dt (the rate of change of radius).", "r=2t+1", "dr/dt = 2", ["2"]),
  mc("y11adv-mot-rc-i2", "A quantity Q = 500/t. The rate of change dQ/dt at t = 5 is:", "B",
    [{ label: "A", text: "$-100$" }, { label: "B", text: "$-20$" }, { label: "C", text: "$100$" }, { label: "D", text: "$20$" }],
    "Q = 500t^(−1). dQ/dt = −500t^(−2) = −500/t². At t=5: −500/25 = −20.", ""),
  fa("y11adv-mot-rc-i3", "For the displayed population model, find the initial rate of growth at t = 0.", "P=2000e^{0.1t}", "dP/dt = 200 per unit time", ["200"]),
  mc("y11adv-mot-rc-i4", "Which context is NOT a rate of change problem?", "D",
    [{ label: "A", text: "How fast a tank drains (dV/dt)" }, { label: "B", text: "How quickly a population grows (dP/dt)" }, { label: "C", text: "The temperature drop per hour (dT/dt)" }, { label: "D", text: "The total volume in a tank after 3 hours" }],
    "The total volume after 3 hours is a value, not a rate. Rates always involve derivatives — 'how fast' some quantity changes.", ""),
  fa("y11adv-mot-rc-i5", "A = πr². Find dA/dr and interpret it when r = 5.", "A=\\pi r^2", "dA/dr = 2πr; at r=5: dA/dr = 10π", ["10π", "10\\pi"]),
];

const rcMastery: PracticeQuestion[] = [
  fa("y11adv-mot-rc-m1", "N = 1000e^(0.3t). Find dN/dt when t = 0.", "N=1000e^{0.3t}", "dN/dt = 300", ["300"]),
  mc("y11adv-mot-rc-m2", "Water flows in at a rate dV/dt = 5 − t. At what time does the volume stop increasing?", "C",
    [{ label: "A", text: "$t = 0$" }, { label: "B", text: "$t = 2.5$" }, { label: "C", text: "$t = 5$" }, { label: "D", text: "$t = 10$" }],
    "Volume stops increasing when dV/dt = 0: 5 − t = 0 → t = 5.", ""),
  fa("y11adv-mot-rc-m3", "h = 20 − 4t² (height above ground). Find the rate of descent at t = 2.", "h=20-4t^2", "dh/dt = -16 m/s (descending at 16 m/s)", ["-16"]),
  mc("y11adv-mot-rc-m4", "For the displayed population model, which is the correct dP/dt?", "B",
    [{ label: "A", text: "$500e^{0.2t}$" }, { label: "B", text: "$100e^{0.2t}$" }, { label: "C", text: "$0.2e^{0.2t}$" }, { label: "D", text: "$2500e^{0.2t}$" }],
    "The chain rule multiplies the original exponential term by the exponent coefficient. Since 500 times 0.2 is 100, option B retains both the population scale and growth constant.", "P=500e^{0.2t}"),
  fa("y11adv-mot-rc-m5", "At t=0, V = 100 and dV/dt = −5. When (approximately) is V = 0?", "V=100,\\;dV/dt=-5", "t = 20 (if rate is constant)", ["20"]),
  mc("y11adv-mot-rc-m6", "A rate of −40°C/hour means:", "B",
    [{ label: "A", text: "The temperature is −40°C" }, { label: "B", text: "The temperature is decreasing by 40°C each hour" }, { label: "C", text: "The temperature fell by 40°C in total" }, { label: "D", text: "The temperature will reach −40°C" }],
    "A rate is per unit time. A negative rate means the quantity is decreasing. dT/dt = −40°C/hour → temperature falls 40°C for each hour elapsed (instantaneous rate).", ""),
  fa("y11adv-mot-rc-m7", "V = 50 − 2t + t². Find the time when the volume is at a minimum.", "V=50-2t+t^2", "t = 1", ["t=1"]),
  mc("y11adv-mot-rc-m8", "The rate of change dA/dt for A = πr²(t) depends on r and dr/dt. This is an example of:", "C",
    [{ label: "A", text: "Integration" }, { label: "B", text: "Second derivative" }, { label: "C", text: "Chain rule (composite differentiation)" }, { label: "D", text: "Product rule" }],
    "dA/dt = d/dt(πr²) = 2πr·(dr/dt) by the chain rule. A depends on r, and r depends on t.", ""),
];

// ─── L5: Exam Practice ────────────────────────────────~~~~~~~~~~~~~~~~────────

const mrExGuided: PracticeQuestion[] = [
  fa("y11adv-mot-ex-g1", "x = t³ − 3t² + 1. Find v when a = 0.", "x=t^3-3t^2+1", "v = -3 m/s", ["-3"]),
  mc("y11adv-mot-ex-g2", "A particle starts at origin with v = 6t − 6. Find displacement at t = 3.", "B",
    [{ label: "A", text: "$6$" }, { label: "B", text: "$9$" }, { label: "C", text: "$18$" }, { label: "D", text: "$0$" }],
    "x = ∫(6t−6) dt = 3t²−6t+C. x(0)=0→C=0. x(3)=27−18=9.", ""),
  fa("y11adv-mot-ex-g3", "v = 2t − 6 on [0, 5] from x(0) = 0. Find total distance.", "v=2t-6", "13 m", ["13"]),
  mc("y11adv-mot-ex-g4", "V = 100 − 5t² (litres). At what rate is V changing when t = 4?", "C",
    [{ label: "A", text: "$-5$ L/min" }, { label: "B", text: "$-20$ L/min" }, { label: "C", text: "$-40$ L/min" }, { label: "D", text: "$-80$ L/min" }],
    "dV/dt = −10t. At t=4: −40 L/min.", ""),
];

const mrExIndep: PracticeQuestion[] = [
  fa("y11adv-mot-ex-i1", "x = 2t³ − 9t² + 12t. Find all times when the particle is at rest and classify the motion before and after each.", "", "t=1 (moves +, then -); t=2 (moves -, then +)", ["t=1, t=2"]),
  mc("y11adv-mot-ex-i2", "A particle starts at x = 5 with v = 3 − 2t. Its position when it first stops is:", "B",
    [{ label: "A", text: "$5$" }, { label: "B", text: "$7.25$" }, { label: "C", text: "$9.25$" }, { label: "D", text: "$7.5$" }],
    "The particle first stops when v=0, so 3−2t=0 and t=1.5. Integrating gives x=3t−t²+C; x(0)=5 makes C=5. Therefore x(1.5)=4.5−2.25+5=7.25.", ""),
  fa("y11adv-mot-ex-i3", "The height of a ball is h = −5t² + 20t. Find the maximum height and when it is reached.", "", "max h = 20 m at t = 2 s", ["20 m, t=2"]),
  mc("y11adv-mot-ex-i4", "The displacement integral from t = 0 to t = 4 is 8, while the corresponding speed integral is 16. What does this tell us?", "B",
    [{ label: "A", text: "The particle moved 16 m in total and ended 16 m from start" }, { label: "B", text: "The particle moved a total of 16 m but the displacement was only 8 m" }, { label: "C", text: "The particle moved 8 m in total" }, { label: "D", text: "The velocity was always positive" }],
    "∫|v| dt = 16 = total distance. ∫v dt = 8 = displacement. Since 16 ≠ 8, the particle reversed direction at some point during [0, 4].", ""),
  fa("y11adv-mot-ex-i5", "For the displayed cooling model, find the temperature when the rate of cooling is −3°C/hour.", "T=60e^{-0.1t}+20", "T = 50°C", ["50"]),
];

const mrExMastery: PracticeQuestion[] = [
  fa("y11adv-mot-ex-m1", "x = t³ − 6t² + 9t − 2 on [0, 5]. Find total distance.", "x=t^3-6t^2+9t-2", "28 m", ["28"]),
  mc("y11adv-mot-ex-m2", "For constant acceleration a, integrating once gives:", "B",
    [{ label: "A", text: "Position" }, { label: "B", text: "Velocity: v = at + v₀" }, { label: "C", text: "Jerk (rate of change of acceleration)" }, { label: "D", text: "Distance" }],
    "∫a dt = at + C = at + v₀ where v₀ is the initial velocity. One more integration gives position x = (1/2)at² + v₀t + x₀.", ""),
  fa("y11adv-mot-ex-m3", "v = t² − 4t + 3 = (t−1)(t−3). Find total distance on [0, 4].", "v=(t-1)(t-3)", "8/3 + 8/3 + 4/3 m", ["20/3 m"]),
  mc("y11adv-mot-ex-m4", "A particle has x = sin(2t). When does it first return to x = 0?", "B",
    [{ label: "A", text: "$t = \\pi/2$" }, { label: "B", text: "$t = \\pi/2$" }, { label: "C", text: "$t = \\pi$" }, { label: "D", text: "$t = 2\\pi$" }],
    "x = sin(2t) = 0 when 2t = 0, π, 2π,... so t = 0, π/2, π,... First return (after t=0): t = π/2.", ""),
  fa("y11adv-mot-ex-m5", "N = 500e^(0.2t) (bacteria). Find dN/dt when N = 1000.", "N=500e^{0.2t}", "dN/dt = 200 per hour", ["200"]),
  mc("y11adv-mot-ex-m6", "Given a = 2, v(0) = −6, x(0) = 5. The particle returns to its starting position when:", "C",
    [{ label: "A", text: "$t = 3$" }, { label: "B", text: "$t = 6$" }, { label: "C", text: "$t = 6$" }, { label: "D", text: "$t = 2$" }],
    "v = 2t−6. x = t²−6t+C. x(0)=5→C=5. x=t²−6t+5. Return to start: x=5 → t²−6t=0 → t(t−6)=0 → t=6 (first non-zero).", ""),
  fa("y11adv-mot-ex-m7", "A cooling model satisfies dT/dt = −k(T−20), T(0)=80, and the displayed solution. Find k if T(2)=50.", "T=60e^{-kt}+20,\\;T(2)=50", "k = ln 2/2", ["(ln 2)/2"]),
  mc("y11adv-mot-ex-m8", "Which integral gives the displacement of a particle from t=a to t=b?", "A",
    [{ label: "A", text: "$\\int_a^b v\\,dt$" }, { label: "B", text: "$\\int_a^b |v|\\,dt$" }, { label: "C", text: "$\\int_a^b a\\,dt$" }, { label: "D", text: "$\\int_a^b x\\,dt$" }],
    "Displacement = ∫v dt (signed). Distance = ∫|v| dt. ∫a dt gives velocity change. ∫x dt has no standard kinematic meaning.", ""),
];

// ─── Export ───────────────────────────────────────────────────────────────────

function year11AdvancedMotionRatesLessonOverrideBase(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "motion-rates") return null;

  const base = { moduleSlug: lesson.slug, syllabusRef: "MA-C3" };

  if (lesson.slug === "displacement-velocity-acceleration") {
    return {
      ...base,
      description: "Define displacement, velocity and acceleration using derivatives and evaluate them from a position function.",
      learningIntention: "Apply v = dx/dt and a = dv/dt = d²x/dt² to find velocity and acceleration from a displacement function.",
      successCriteria: [
        "Define displacement x, velocity v = dx/dt, and acceleration a = dv/dt = d²x/dt².",
        "Find the velocity and acceleration functions from a given displacement function.",
        "Evaluate v and a at specific times, including t = 0.",
        "Determine when the particle is at rest by setting v = 0.",
        "State whether the particle is accelerating or decelerating from the signs of v and a.",
      ],
      teaching: {
        paragraphs: [
          "In kinematics, x(t) is the displacement (position) of a particle from a reference point at time t. The velocity is the rate of change of displacement: v = dx/dt. The acceleration is the rate of change of velocity: a = dv/dt = d²x/dt².",
          "These relationships form a chain: differentiate x to get v, differentiate v to get a. To reverse: integrate a to get v, integrate v to get x. Both directions appear in HSC questions.",
          "At t = 0: x(0) = initial position, v(0) = initial velocity, a(0) = initial acceleration. These are often the first values asked for in a kinematics question.",
          "The particle is momentarily at rest when v = 0. Set dx/dt = 0 and solve for t. Check whether v changes sign at this t — if it does, the particle changes direction; if not, it's a momentary pause (rare in HSC problems).",
          "Signs convey direction: if x and v are measured positive to the right (standard), then v > 0 means moving right, v < 0 means moving left. a > 0 means accelerating to the right; a < 0 means accelerating to the left. 'Decelerating' means v and a have opposite signs.",
        ],
        latexBlocks: [
          "v = \\frac{dx}{dt}\\qquad a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}",
          "\\text{Rest: }v=0;\\quad \\text{direction change: }v=0\\text{ and }v\\text{ changes sign}",
        ],
      },
      workedExamples: daWorked,
      guidedPractice: daGuided,
      independentPractice: daIndep,
      commonMistakes: [
        { mistake: "Confusing 'at rest' with 'at the origin': v = 0 means the particle has stopped moving, not that it is at x = 0.", fix: "At rest means velocity is zero: v = 0. At the origin means position is zero: x = 0. Find them separately." },
        { mistake: "Finding a = d/dt(x) instead of d/dt(v).", fix: "Differentiate TWICE to go from x to a: a = d²x/dt². Or differentiate v once: a = dv/dt." },
        { mistake: "Interpreting negative velocity as 'backwards acceleration'.", fix: "Velocity tells you direction of motion; acceleration tells you whether speed is increasing or decreasing. Negative v means moving in the negative direction — nothing about speeding up or slowing down." },
      ],
      masteryQuiz: daMastery,
    };
  }

  if (lesson.slug === "finding-displacement-by-integration") {
    return {
      ...base,
      description: "Recover the displacement function by integrating velocity, applying initial conditions to find the constant.",
      learningIntention: "Use x = ∫v dt with initial conditions to find the position function and evaluate displacement.",
      successCriteria: [
        "Integrate a velocity function to obtain displacement x = ∫v dt + C.",
        "Apply an initial condition (x at a given t) to find the constant of integration.",
        "Find displacement at a specific time from the position function.",
        "Integrate twice (from a) to find x: first find v = ∫a dt, then x = ∫v dt.",
        "State the difference between displacement (∫v dt) and total distance (∫|v| dt).",
      ],
      teaching: {
        paragraphs: [
          "Integration reverses differentiation. Since v = dx/dt, integrating both sides gives x = ∫v dt + C. The constant C is determined by the initial (or other given) position.",
          "If given a(t) and two conditions (v₀ and x₀), you integrate twice. First: v = ∫a dt + C₁, then use v(t₀) = v₀ to find C₁. Second: x = ∫v dt + C₂, then use x(t₀) = x₀ to find C₂.",
          "The definite integral ∫ₐᵇ v dt = x(b) − x(a) gives displacement from t = a to t = b. This is NOT the total distance if v changes sign during the interval.",
          "Total distance requires ∫|v| dt, which means splitting the integral at every time t where v = 0 (direction change), and taking the absolute value of each piece.",
          "Initial conditions in kinematics are typically: 'the particle starts at the origin' (x(0) = 0) or 'the particle is initially at rest' (v(0) = 0). Substitute t = 0 and the known value into your integrated function to find C.",
        ],
        latexBlocks: [
          "x = \\int v\\,dt + C,\\quad C\\text{ from }x(t_0)=x_0",
          "\\text{Displacement from }a\\text{ to }b: \\int_a^b v\\,dt = x(b)-x(a)",
          "\\text{Total distance: }\\int_a^b|v|\\,dt",
        ],
      },
      workedExamples: fdWorked,
      guidedPractice: fdGuided,
      independentPractice: fdIndep,
      commonMistakes: [
        { mistake: "Forgetting to add the constant of integration when integrating v to find x.", fix: "∫v dt = F(t) + C. Without the +C, you cannot apply the initial condition." },
        { mistake: "Using ∫v dt as total distance when v changes sign.", fix: "∫v dt gives displacement (can be zero even if the particle moved a lot). For total distance, compute ∫|v| dt by splitting at direction changes." },
        { mistake: "Integrating a to find x directly (skipping the v step).", fix: "You must integrate a to get v first, apply the v initial condition to find C₁, then integrate v to get x, and apply the x initial condition to find C₂." },
      ],
      masteryQuiz: fdMastery,
    };
  }

  if (lesson.slug === "motion-analysis") {
    return {
      ...base,
      description: "Analyse straight-line motion: identify direction changes, compute total distance, and interpret the particle's behaviour.",
      learningIntention: "Use v = 0 to find direction changes and calculate total distance by summing path lengths between turning points.",
      successCriteria: [
        "Identify times when the particle changes direction (v = 0 with sign change in v).",
        "Evaluate position at key times (start, turning points, end) to compute path lengths.",
        "Sum absolute displacements between turning points to find total distance.",
        "Distinguish displacement from total distance in a given interval.",
        "Determine the direction of motion (positive/negative) from the sign of v.",
      ],
      teaching: {
        paragraphs: [
          "To find the total distance travelled, you cannot just subtract positions — you must account for every direction change. The process: (1) find v(t), (2) solve v = 0 to find turning times, (3) evaluate x at the start, each turning time, and the end, (4) add up the absolute differences between consecutive positions.",
          "Direction changes occur where v = 0 AND v changes sign. At such a time, the particle stops and reverses. If v = 0 but the sign of v does not change, the particle briefly pauses but continues in the same direction — this is rare in standard HSC questions.",
          "Example layout: for a particle on [0, 5] with v = 0 at t = 2: compute x(0), x(2), x(5). Distance = |x(2) − x(0)| + |x(5) − x(2)|.",
          "The sign of v tells you direction of motion. v > 0 → positive direction (right). v < 0 → negative direction (left). The sign of a tells you whether the particle is accelerating (v and a same sign) or decelerating (v and a opposite signs).",
          "Common HSC question types: (a) 'find the total distance in [0, T]', (b) 'when does the particle first return to its starting position?', (c) 'find the particle's position when it stops for the first time'.",
        ],
        latexBlocks: [
          "\\text{Total distance}=\\sum_{\\text{segments}}|x_{\\text{end}}-x_{\\text{start}}|",
          "v=0\\text{ with sign change}\\implies\\text{direction change}",
        ],
      },
      workedExamples: maWorked,
      guidedPractice: maGuided,
      independentPractice: maIndep,
      commonMistakes: [
        { mistake: "Computing x(T) − x(0) and calling it total distance.", fix: "x(T) − x(0) is the net displacement, not the total distance. If the particle reversed direction, you must compute the distance in each segment separately and add them." },
        { mistake: "Treating every zero of v as a direction change.", fix: "Check that v changes sign at v = 0. If v has a double root (e.g., v = (t−2)²), it touches zero but does not change sign — the particle momentarily stops but does not turn around." },
        { mistake: "Forgetting to check x at t = 0 and t = T when computing total distance on [0, T].", fix: "You need the position at the start, at each turning point, and at the end to sum all the path segments." },
      ],
      masteryQuiz: maMastery,
    };
  }

  if (lesson.slug === "rates-of-change-applications") {
    return {
      ...base,
      description: "Apply derivatives to find rates of change in practical contexts: volume, temperature, population, height and area.",
      learningIntention: "Differentiate practical functions with respect to time (or another variable) to find and interpret instantaneous rates of change.",
      successCriteria: [
        "Find dQ/dt for a quantity Q(t) by differentiating the given formula.",
        "Evaluate a rate of change at a specific time and interpret its sign and magnitude.",
        "Set up a rate-of-change question: identify the quantity, the variable, and what 'rate' means.",
        "Connect the sign of dQ/dt to whether the quantity is increasing or decreasing.",
        "Use rates of change to find when a quantity is a maximum or minimum.",
      ],
      teaching: {
        paragraphs: [
          "Differentiation measures how fast something changes. Any quantity that varies with time (volume, temperature, population, height) has a rate of change given by its derivative with respect to time.",
          "The sign of dQ/dt is meaningful. dQ/dt > 0 → Q is increasing. dQ/dt < 0 → Q is decreasing. dQ/dt = 0 → Q is momentarily constant (at a maximum or minimum). This is the first derivative test for any real-world quantity.",
          "Exponential models appear frequently in rate problems. For the displayed general model, the derivative satisfies dN/dt = kN. The rate of growth is proportional to the current size; when k < 0, this instead gives exponential decay.",
          "For area and volume problems using geometry: A = πr², V = (4/3)πr³. Differentiating with respect to r gives the rate of change of area or volume per unit radius. These are spatial rates, not time rates — but the technique is identical.",
          "Units of a rate of change: if Q is in litres and t is in seconds, dQ/dt is in litres per second (L/s). Always attach units to rates of change — it is part of the correct answer in HSC questions.",
        ],
        latexBlocks: [
          "\\frac{dQ}{dt}>0\\Rightarrow Q\\text{ increasing};\\quad \\frac{dQ}{dt}<0\\Rightarrow Q\\text{ decreasing}",
          "N=N_0e^{kt}\\implies\\frac{dN}{dt}=kN\\quad\\text{(rate proportional to quantity)}",
        ],
      },
      workedExamples: rcWorked,
      guidedPractice: rcGuided,
      independentPractice: rcIndep,
      commonMistakes: [
        { mistake: "Confusing the rate dQ/dt with the quantity Q itself.", fix: "Q(t) is the value of the quantity at time t. dQ/dt is how fast that value is changing. They are different: Q = 100 litres, dQ/dt = −5 litres/second." },
        { mistake: "Ignoring units in a rate of change answer.", fix: "If V is in litres and t is in minutes, dV/dt is in litres/minute. The HSC requires units for full marks on rate questions." },
        { mistake: "Evaluating the rate before finding dQ/dt by differentiating.", fix: "First differentiate the formula to find dQ/dt as a function of t, then substitute the specific t-value to evaluate the rate at that moment." },
      ],
      masteryQuiz: rcMastery,
    };
  }

  if (lesson.slug === "motion-rates-exam-practice") {
    return {
      ...base,
      description: "HSC-style kinematics and rates of change problems combining displacement, velocity, acceleration, integration, and practical rate models.",
      learningIntention: "Apply all calculus-based motion and rate skills to exam-standard problems.",
      successCriteria: [
        "Find x, v, and a from a position function and vice versa.",
        "Identify turning points and compute total distance on a given interval.",
        "Integrate a velocity function with initial conditions to recover position.",
        "Interpret rates of change in practical contexts (temperature, volume, population).",
        "Apply both differentiation and integration in a single multi-step problem.",
      ],
      teaching: {
        paragraphs: [
          "HSC kinematics questions usually present x(t) and ask about v, a, rest times, direction changes, and total distance. Or they give v(t) and ask for x after integration with an initial condition. Know which direction you're travelling (differentiate x to get v) and which way to reverse (integrate v to get x).",
          "Total distance strategy: solve v = 0, find all turning times on the interval, evaluate x at each, and sum |differences| between consecutive positions. This method always works regardless of how many direction changes occur.",
          "Rates of change in context: find dQ/dt by differentiating Q(t). Evaluate at the required t. Interpret: dQ/dt = −4 means Q is decreasing at 4 units per unit time. For maximum/minimum Q, set dQ/dt = 0.",
          "The definite integral ∫ₐᵇ v dt = x(b) − x(a) is a compact way to compute displacement without needing C. For total distance, split at turning points and add absolute values.",
          "Connect calculus to physics: v = 0 at maximum displacement from the origin (particle turns); a = 0 at maximum speed (for particles starting from rest); ∫v dt > 0 means net forward motion.",
        ],
        latexBlocks: [
          "x(b)-x(a)=\\int_a^b v\\,dt\\quad\\text{(displacement)}",
          "\\text{Total distance}=\\int_a^b|v|\\,dt=\\sum|\\Delta x|\\text{ per segment}",
        ],
      },
      workedExamples: [],
      guidedPractice: mrExGuided,
      independentPractice: mrExIndep,
      commonMistakes: [
        { mistake: "Stating total distance = |x(b) − x(a)|.", fix: "This only gives distance if v doesn't change sign. With direction changes, sum the path lengths between turning times instead." },
        { mistake: "Using dv/dt = v when computing acceleration.", fix: "a = dv/dt, not v itself. Differentiate the velocity function to get acceleration." },
        { mistake: "Writing x = ∫v dt and stopping without applying the initial condition.", fix: "∫v dt = F(t) + C. You must find C using the given initial position. Without C, your x formula is a family of curves, not a specific one." },
      ],
      masteryQuiz: mrExMastery,
    };
  }

  return null;
}

export function year11AdvancedMotionRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed,
): Partial<ExplicitLesson> | null {
  const base = year11AdvancedMotionRatesLessonOverrideBase(course, unit, lesson);
  if (!base) return null;

  const masteryQuiz = getMotionRatesQualityMastery(lesson.slug);
  if (!masteryQuiz) return base;

  return {
    ...base,
    guidedPractice: enhanceMotionRatesRetainedPractice(base.guidedPractice ?? []),
    independentPractice: enhanceMotionRatesRetainedPractice(base.independentPractice ?? []),
    masteryQuiz,
  };
}
