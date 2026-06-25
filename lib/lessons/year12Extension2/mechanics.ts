import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mechChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Identify the relevant formula or physical principle before selecting.",
  extras: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select the best option.}",
    choices: choices.map((text, i) => ({
      label: String.fromCharCode(65 + i),
      text,
    })),
    answer,
    acceptedAnswers: [],
    hint,
    explanation,
    ...extras,
  };
}

function mechTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Identify the relevant formula, substitute the given values, then simplify.",
  extras: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    ...extras,
  };
}

const smoothIncline30Diagram: Partial<PracticeQuestion> = {
  triangleDiagram: {
    description:
      "Right-triangle cross-section of a smooth incline represented by the sloping side AC, with a 30 degree angle at the base A.",
    vertices: {
      A: { x: 70, y: 230 },
      B: { x: 320, y: 230 },
      C: { x: 320, y: 86 },
    },
    rightAngleAt: "B",
    angleLabels: { A: "30°" },
    sideLabels: { AC: "smooth plane" },
  },
};

const smoothIncline45Diagram: Partial<PracticeQuestion> = {
  triangleDiagram: {
    description:
      "Right-triangle cross-section of a smooth incline represented by the sloping side AC, with a 45 degree angle at the base A.",
    vertices: {
      A: { x: 70, y: 230 },
      B: { x: 290, y: 230 },
      C: { x: 290, y: 110 },
    },
    rightAngleAt: "B",
    angleLabels: { A: "45°" },
    sideLabels: { AC: "smooth plane" },
  },
};

const smoothIncline60Diagram: Partial<PracticeQuestion> = {
  triangleDiagram: {
    description:
      "Right-triangle cross-section of a smooth incline represented by the sloping side AC, with a 60 degree angle at the base A.",
    vertices: {
      A: { x: 70, y: 230 },
      B: { x: 255, y: 230 },
      C: { x: 255, y: 70 },
    },
    rightAngleAt: "B",
    angleLabels: { A: "60°" },
    sideLabels: { AC: "smooth plane" },
  },
};

const smoothInclineThetaDiagram: Partial<PracticeQuestion> = {
  triangleDiagram: {
    description:
      "Right-triangle cross-section of a smooth incline represented by the sloping side AC, with an angle theta at the base A.",
    vertices: {
      A: { x: 70, y: 230 },
      B: { x: 305, y: 230 },
      C: { x: 305, y: 94 },
    },
    rightAngleAt: "B",
    angleLabels: { A: "\\theta" },
    sideLabels: { AC: "smooth plane" },
  },
};

// ─── Lesson 1: Rectilinear Motion with Calculus ───────────────────────────────

const rectilinearMotionLesson: Partial<ExplicitLesson> = {
  description:
    "Use v = dx/dt and a = dv/dt to find velocity and acceleration from a position function, recover position from acceleration using initial conditions, and interpret direction and speed from signs.",
  learningIntention:
    "Connect displacement, velocity and acceleration using differentiation and integration, and interpret motion from the sign of velocity.",
  successCriteria: [
    "Find velocity by differentiating a position function with respect to time.",
    "Find acceleration by differentiating a velocity function with respect to time.",
    "Recover velocity and position from acceleration by integrating with initial conditions.",
    "Interpret the sign and magnitude of velocity as direction and speed of motion.",
  ],
  teaching: {
    paragraphs: [
      "In rectilinear (straight-line) motion, the displacement x, velocity v and acceleration a are all functions of time t. Velocity is the rate of change of displacement: v = dx/dt. Acceleration is the rate of change of velocity: a = dv/dt = d²x/dt².",
      "The sign of velocity indicates direction. If v > 0 the particle moves in the positive direction; if v < 0 it moves in the negative direction. Speed is the magnitude |v|, always non-negative.",
      "When acceleration is known as a function of t, integrate to find velocity: v = ∫a dt + C. Use the initial condition v(0) to find C. Then integrate again to find displacement: x = ∫v dt + C₂, using x(0).",
      "A particle is momentarily at rest when v = 0. This does not mean it stops permanently — it may still have non-zero acceleration and immediately reverse or continue.",
      "When acceleration is expressed as a function of position rather than time, use the chain-rule identity a = v dv/dx. This rewrites Newton's second law as m·v dv/dx = F(x), which is separable. It is particularly useful in resisted motion problems where the resistance depends on velocity and you need velocity as a function of position.",
    ],
    latexBlocks: [
      "v = \\frac{dx}{dt},\\quad a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}",
      "\\text{Speed} = |v|\\quad(\\text{always }\\geq 0)",
      "\\text{If }a(t)\\text{ known: }v = \\int a\\,dt + C_1,\\quad x = \\int v\\,dt + C_2",
      "a = v\\,\\frac{dv}{dx}",
    ],
  },
  workedExamples: [
    {
      title: "Find velocity and acceleration at a given time",
      questionLatex:
        "x = t^3 - 6t^2 + 9t.\\quad\\text{Find }v(2)\\text{ and }a(2).",
      steps: [
        {
          explanation: "Differentiate x to find velocity.",
          latex: "v = \\frac{dx}{dt} = 3t^2 - 12t + 9",
        },
        {
          explanation: "Differentiate v to find acceleration.",
          latex: "a = \\frac{dv}{dt} = 6t - 12",
        },
        {
          explanation: "Substitute t = 2.",
          latex:
            "v(2) = 12 - 24 + 9 = -3,\\quad a(2) = 12 - 12 = 0",
        },
      ],
      finalAnswerLatex:
        "v(2) = -3\\text{ (moving in negative direction)},\\quad a(2) = 0",
    },
    {
      title: "Find when a particle is at rest",
      questionLatex:
        "v = 2t^2 - 8t + 6.\\quad\\text{Find }t > 0\\text{ when }v = 0.",
      steps: [
        {
          explanation: "Set v = 0 and solve the quadratic.",
          latex:
            "2t^2 - 8t + 6 = 0 \\implies t^2 - 4t + 3 = 0 \\implies (t-1)(t-3) = 0",
        },
        {
          explanation: "The particle is at rest at t = 1 and t = 3.",
          latex: "t = 1\\text{ or }t = 3",
        },
      ],
      finalAnswerLatex: "t = 1\\text{ s and }t = 3\\text{ s}",
    },
    {
      title: "Recover position from acceleration using initial conditions",
      questionLatex:
        "a = 6t - 2,\\; v(0) = 4,\\; x(0) = 1.\\quad\\text{Find }x(t).",
      steps: [
        {
          explanation: "Integrate a to find v, using v(0) = 4.",
          latex:
            "v = 3t^2 - 2t + C_1;\\quad v(0) = C_1 = 4,\\text{ so }v = 3t^2 - 2t + 4",
        },
        {
          explanation: "Integrate v to find x, using x(0) = 1.",
          latex:
            "x = t^3 - t^2 + 4t + C_2;\\quad x(0) = C_2 = 1,\\text{ so }x = t^3 - t^2 + 4t + 1",
        },
      ],
      finalAnswerLatex: "x = t^3 - t^2 + 4t + 1",
    },
  ],
  guidedPractice: [
    mechTyped(
      "y12e2-rect-g1",
      "For $x = 2t^2 - 6t + 1$, find the velocity at $t = 2$.",
      "x = 2t^2 - 6t + 1",
      "2",
      [],
      "v = dx/dt = 4t − 6. At t = 2: v = 4(2) − 6 = 8 − 6 = 2.",
      "Differentiate x with respect to t, then substitute t = 2."
    ),
    mechTyped(
      "y12e2-rect-g2",
      "For $x = t^3 - 3t^2 + 5$, find the acceleration at $t = 2$.",
      "x = t^3 - 3t^2 + 5",
      "6",
      [],
      "v = 3t² − 6t. a = dv/dt = 6t − 6. At t = 2: a = 12 − 6 = 6.",
      "Differentiate x twice. The acceleration is d²x/dt²."
    ),
    mechChoice(
      "y12e2-rect-g3",
      "A particle has velocity $v = 3 - t$. At $t = 5$, the particle is moving:",
      "A",
      [
        "In the negative direction",
        "In the positive direction",
        "At rest",
        "With speed 8 m/s",
      ],
      "v(5) = 3 − 5 = −2. Since v < 0, the particle moves in the negative direction. Speed is |v| = 2 m/s, not 8.",
      "Substitute t = 5 into v and check the sign."
    ),
    mechTyped(
      "y12e2-rect-g4",
      "Given $a(t) = 4t$ with $v(0) = 2$, find $v(3)$.",
      "a(t) = 4t,\\quad v(0) = 2",
      "20",
      [],
      "Integrate: v = 2t² + C₁. v(0) = 0 + C₁ = 2, so C₁ = 2. v = 2t² + 2. v(3) = 18 + 2 = 20.",
      "Integrate a(t) to get v(t), apply v(0) = 2 to find C, then substitute t = 3."
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-rect-i1",
      "For $x = t^3 - 6t^2 + 9t$, find velocity at $t = 2$.",
      "x = t^3 - 6t^2 + 9t",
      "-3",
      ["−3"],
      "v = 3t² − 12t + 9. At t = 2: v = 12 − 24 + 9 = −3. The negative sign indicates motion in the negative direction.",
      "Differentiate x, then substitute t = 2."
    ),
    mechTyped(
      "y12e2-rect-i2",
      "For $v = t^2 - 4t + 3$, find the first positive time $t > 0$ when the particle is at rest.",
      "v = t^2 - 4t + 3",
      "1",
      [],
      "Set v = 0: t² − 4t + 3 = 0, so (t − 1)(t − 3) = 0. Positive solutions: t = 1 and t = 3. First is t = 1.",
      "Solve v = 0 and take the smaller positive root."
    ),
    mechChoice(
      "y12e2-rect-i3",
      "For $x = 4t - t^2$, the acceleration is:",
      "A",
      [
        "$-2$ m/s² (constant)",
        "$4 - 2t$ m/s²",
        "$4$ m/s²",
        "$2t$ m/s²",
      ],
      "v = 4 − 2t. a = dv/dt = −2. The acceleration is the constant −2 m/s² throughout the motion.",
      "Differentiate x twice to find the constant acceleration."
    ),
    mechTyped(
      "y12e2-rect-i4",
      "Given $a = 6 - 2t$ with $v(0) = -3$, find $v(3)$.",
      "a = 6 - 2t,\\quad v(0) = -3",
      "6",
      [],
      "v = 6t − t² + C. v(0) = 0 − 0 + C = −3, so C = −3. v = 6t − t² − 3. v(3) = 18 − 9 − 3 = 6.",
      "Integrate a, use v(0) = −3 to find C, then substitute t = 3."
    ),
    mechTyped(
      "y12e2-rect-i5",
      "Given $v = 3t^2 - 12$ with $x(0) = 0$, find $x(2)$.",
      "v = 3t^2 - 12,\\quad x(0) = 0",
      "-16",
      ["−16"],
      "x = t³ − 12t + C. x(0) = 0 + C = 0, so C = 0. x = t³ − 12t. x(2) = 8 − 24 = −16.",
      "Integrate v, apply x(0) = 0, then substitute t = 2."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing speed with velocity.",
      fix: "Velocity can be negative (indicating direction); speed is |v|, always non-negative. A particle with v = −5 has speed 5.",
    },
    {
      mistake: "Forgetting the constant of integration when recovering v from a.",
      fix: "∫a dt produces a family of functions. The initial condition v(0) determines the specific constant C₁.",
    },
    {
      mistake: "Differentiating to find position from velocity.",
      fix: "To find position from velocity, integrate — not differentiate: x = ∫v dt + C.",
    },
    {
      mistake: "Concluding a particle stops permanently when v = 0.",
      fix: "v = 0 means momentarily at rest. If a ≠ 0 at that instant, the particle immediately begins moving again.",
    },
  ],
  masteryQuiz: [
    mechTyped(
      "y12e2-rect-m1",
      "For $x = 3t^2 - 2$, find $v(2)$.",
      "x = 3t^2 - 2",
      "12",
      [],
      "v = dx/dt = 6t. v(2) = 6 × 2 = 12.",
      "Differentiate x and substitute t = 2."
    ),
    mechChoice(
      "y12e2-rect-m2",
      "Which formula gives instantaneous velocity from a position function $x(t)$?",
      "A",
      [
        "$v = dx/dt$",
        "$v = d^2x/dt^2$",
        "$v = \\int x\\,dt$",
        "$v = x/t$",
      ],
      "Velocity is the first derivative of position with respect to time: v = dx/dt.",
      "Recall the definition of velocity in rectilinear motion."
    ),
    mechTyped(
      "y12e2-rect-m3",
      "Given $a(t) = 6t - 2$ with $v(0) = 4$, find $v(2)$.",
      "a(t) = 6t - 2,\\quad v(0) = 4",
      "12",
      [],
      "v = 3t² − 2t + C. v(0) = C = 4. v = 3t² − 2t + 4. v(2) = 12 − 4 + 4 = 12.",
      "Integrate a, use v(0) = 4 to find C, then substitute t = 2."
    ),
    mechChoice(
      "y12e2-rect-m4",
      "At some instant a particle has $v = -4$ m/s. The particle is:",
      "A",
      [
        "Moving in the negative direction",
        "At rest",
        "Accelerating positively",
        "Moving in the positive direction",
      ],
      "v < 0 means motion in the negative direction. Speed is |v| = 4 m/s. The sign of a is not determined by v alone.",
      "Check the sign of velocity to determine direction."
    ),
    mechTyped(
      "y12e2-rect-m5",
      "For $v = 2t - 6$, find the speed at $t = 1$.",
      "v = 2t - 6,\\quad t = 1",
      "4",
      [],
      "v(1) = 2(1) − 6 = −4. Speed = |v| = |−4| = 4.",
      "Substitute t = 1 into v, then take the absolute value."
    ),
    mechTyped(
      "y12e2-rect-m6",
      "For $x = t^2 - 4t + 3$, find $t$ when the particle is at rest.",
      "x = t^2 - 4t + 3",
      "2",
      [],
      "v = dx/dt = 2t − 4. Set v = 0: 2t − 4 = 0, so t = 2.",
      "Differentiate x to get v, then solve v = 0."
    ),
    mechChoice(
      "y12e2-rect-m7",
      "Given $a = 10$, $v(0) = 0$, $x(0) = 0$, find $x(3)$.",
      "A",
      ["45", "30", "90", "15"],
      "v = 10t (C₁ = 0). x = 5t² (C₂ = 0). x(3) = 5 × 9 = 45.",
      "Integrate a twice, apply both initial conditions, then substitute t = 3."
    ),
    mechTyped(
      "y12e2-rect-m8",
      "For $x = t^3 - 3t^2 + 2t$, find $a(1)$.",
      "x = t^3 - 3t^2 + 2t",
      "0",
      [],
      "v = 3t² − 6t + 2. a = 6t − 6. a(1) = 6 − 6 = 0.",
      "Differentiate x twice, then substitute t = 1."
    ),
    mechTyped(
      "y12e2-rect-m9",
      "Given $v = 4 - 2t$ with $x(0) = 2$, find $x(3)$.",
      "v = 4 - 2t,\\quad x(0) = 2",
      "5",
      [],
      "x = 4t − t² + C. x(0) = 0 + C = 2, so C = 2. x = 4t − t² + 2. x(3) = 12 − 9 + 2 = 5.",
      "Integrate v, use x(0) = 2 to find C, then substitute t = 3."
    ),
    mechChoice(
      "y12e2-rect-m10",
      "A particle's velocity is increasing over time. Its acceleration is:",
      "A",
      [
        "Positive",
        "Zero",
        "Negative",
        "Equal to velocity",
      ],
      "Increasing velocity means dv/dt > 0, so acceleration is positive. This applies even when v itself is negative — the particle is slowing its negative motion.",
      "Acceleration is the rate of change of velocity: a = dv/dt."
    ),
    mechChoice(
      "y12e2-rect-m11",
      "Which identity allows acceleration to be written as a function of position?",
      "B",
      [
        "a = dv/dt",
        "a = v dv/dx",
        "a = d²x/dt²",
        "a = dx/dt",
      ],
      "By the chain rule: a = dv/dt = (dv/dx)(dx/dt) = v dv/dx.",
      "Apply the chain rule to express dv/dt in terms of dv/dx."
    ),
    mechTyped(
      "y12e2-rect-m12",
      "A particle has acceleration $a = 2x$. Using $a = v\\,dv/dx$, find $v^2$ when $x = 3$, given $v = 0$ when $x = 0$.",
      "v\\,\\frac{dv}{dx} = 2x",
      "18",
      [],
      "v dv/dx = 2x → ∫v dv = ∫2x dx → v²/2 = x² + C. At x=0, v=0 → C=0. So v² = 2x². At x=3: v² = 18.",
      "Separate variables: v dv = 2x dx and integrate both sides."
    ),
  ],
  masteryQuizPool: [
    { ...mechChoice("y12e2-mech-rect-pool-1", "Acceleration is given as a function of displacement, a = f(x). Which form of acceleration lets you integrate directly with respect to x?", "B", ["a = dv/dt", "a = v·dv/dx = d(½v²)/dx", "a = dx/dt", "a = ∫v dt"], "When a depends on x (not t), use a = v·dv/dx = d(½v²)/dx so you can separate and integrate in x. Integrating a dt would need a as a function of t."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-rect-pool-2", "A particle moves with x = t³ − 6t² + 9t (metres). Its velocity is v = dx/dt = 3t² − 12t + 9. Find v at t = 0.", "v = 3t^2 - 12t + 9", "9", ["9 m/s"], "v(0) = 3(0) − 12(0) + 9 = 9 m/s."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-rect-pool-3", "With v = 3t² − 12t + 9, the particle is momentarily at rest when v = 0. Find the smaller value of t.", "3t^2 - 12t + 9 = 0", "1", ["t=1", "1 s"], "3(t² − 4t + 3) = 3(t − 1)(t − 3) = 0, so t = 1 or t = 3; the smaller is t = 1."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-rect-pool-4", "For the same motion, acceleration a = dv/dt = 6t − 12. Find the time at which the acceleration is zero.", "a = 6t - 12", "2", ["t=2", "2 s"], "6t − 12 = 0 gives t = 2 s — the instant of maximum speed between the two rest points."), difficulty: 3 },
    { ...mechChoice("y12e2-mech-rect-pool-5", "A student claims the particle is 'speeding up' whenever a > 0. Why is this not always correct?", "C", ["Speeding up depends only on position.", "a > 0 always means slowing down.", "Speeding up requires v and a to have the SAME sign; a > 0 with v < 0 means the particle is slowing down.", "Acceleration has no effect on speed."], "Speed increases only when velocity and acceleration share a sign. With a > 0 but v < 0 the particle decelerates toward rest before reversing."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-rect-pool-6", "A particle has a = −4x. Using a = d(½v²)/dx, integrate to get ½v² = −2x² + C. Given v = 6 when x = 0, find C.", "\\tfrac12 v^2 = -2x^2 + C", "18", [], "½(6²) = −2(0)² + C gives C = 18."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-rect-pool-7", "From ½v² = −2x² + 18 we get v² = 36 − 4x². Find the amplitude (the maximum displacement, where v = 0).", "v^2 = 36 - 4x^2", "3", ["x=3", "3 m"], "v = 0 when 4x² = 36, i.e. x² = 9, so the amplitude is x = 3 m."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-rect-pool-8", "The relation v² = 36 − 4x² has the SHM form v² = n²(a² − x²). Find n.", "v^2 = n^2(a^2 - x^2)", "2", [], "Matching the x² coefficient: n² = 4, so n = 2 (and then n²a² = 4·9 = 36 confirms a = 3)."), difficulty: 4 },
    { ...mechChoice("y12e2-mech-rect-pool-9", "Given a = −4x, a student integrates a with respect to t to find velocity. Why does this fail?", "C", ["a is constant, so integration is unnecessary.", "Velocity cannot be found from acceleration.", "a is expressed in terms of x, not t, so ∫a dt is not possible directly — use a = v·dv/dx = d(½v²)/dx instead.", "The sign of a is wrong."], "∫a dt needs a as a function of t. Here a depends on x, so the correct route is a = d(½v²)/dx, giving v as a function of x."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-rect-pool-10", "A particle in SHM satisfies a = −9x with maximum speed 12 m/s (at x = 0). Using v_max = n·a_amp with n² = 9, find the amplitude a_amp.", "v_{max} = n\\,a_{amp}", "4", ["4 m"], "n = √9 = 3 and v_max = n·a_amp gives 12 = 3·a_amp, so the amplitude is 4 m."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-rect-pool-11", "Acceleration is given in terms of velocity: a = −2v. Using a = v·dv/dx, this becomes dv/dx = −2, so v = v₀ − 2x. If v₀ = 10 m/s, find the displacement x when the particle first stops.", "v\\,\\frac{dv}{dx} = -2v \\Rightarrow \\frac{dv}{dx} = -2", "5", ["5 m"], "Cancelling v gives dv/dx = −2, so v = 10 − 2x. Setting v = 0: x = 5 m."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-rect-pool-12", "For SHM with v² = n²(a² − x²), speed is greatest at x = 0 where v² = n²a². Explain by result: for n = 2 and amplitude a = 3, state the maximum speed v_max.", "v_{max}^2 = n^2 a^2", "6", ["6 m/s"], "v_max = n·a = 2·3 = 6 m/s — the centre of the motion is exactly where the restoring 'pull' has done the most work, so speed peaks there."), difficulty: 5 },
  ],
};

// ─── Lesson 2: Simple Harmonic Motion — Energy and Initial Conditions ─────────

const shmExtendedLesson: Partial<ExplicitLesson> = {
  description:
    "Use x = a sin(nt + α) or x = a cos(nt + α) to identify amplitude, angular frequency and period, apply the energy equation v² = n²(a² − x²) to find speed at any position, and determine maximum speed and maximum acceleration.",
  learningIntention:
    "Analyse simple harmonic motion using displacement equations and the energy equation to find amplitude, period, maximum speed, maximum acceleration, and speed at any given position.",
  successCriteria: [
    "Identify amplitude and period from a SHM displacement equation.",
    "State maximum speed as an and maximum acceleration as an².",
    "Apply v² = n²(a² − x²) to find speed at any given position.",
    "Verify ẍ = −n²x as the defining condition of SHM.",
  ],
  teaching: {
    paragraphs: [
      "A particle undergoes simple harmonic motion (SHM) if its acceleration satisfies ẍ = −n²x for some positive constant n. The general solution is x = a sin(nt + α) or x = a cos(nt + α), where a is the amplitude and n is the angular frequency.",
      "The amplitude a is the maximum displacement from the centre. The period T = 2π/n is the time for one complete oscillation.",
      "Differentiating x = a sin(nt) gives v = an cos(nt). The maximum speed occurs when |cos(nt)| = 1, giving maximum speed = an. Differentiating again gives ẍ = −an² sin(nt) = −n²x, confirming SHM. The maximum acceleration magnitude is an², occurring at the extreme positions where |x| = a.",
      "The energy equation v² = n²(a² − x²) gives speed at any position x without needing t. It follows from substituting x = a sin(nt) and v = an cos(nt): v² = a²n²cos²(nt) = n²(a² − x²).",
    ],
    latexBlocks: [
      "x = a\\sin(nt+\\alpha)\\text{ or }x = a\\cos(nt+\\alpha)",
      "T = \\frac{2\\pi}{n},\\quad |v|_{\\max} = an,\\quad |a|_{\\max} = an^2",
      "v^2 = n^2(a^2 - x^2)",
      "\\ddot{x} = -n^2 x\\quad(\\text{defining SHM condition})",
    ],
  },
  workedExamples: [
    {
      title: "Identify amplitude, period and maximum speed",
      questionLatex:
        "x = 3\\sin(2t).\\quad\\text{Find amplitude, period and max speed.}",
      steps: [
        {
          explanation: "Read the amplitude directly from the coefficient.",
          latex: "a = 3",
        },
        {
          explanation: "Angular frequency n = 2. Period T = 2π/n.",
          latex: "T = \\frac{2\\pi}{2} = \\pi",
        },
        {
          explanation: "Maximum speed = an.",
          latex: "|v|_{\\max} = 3 \\times 2 = 6",
        },
      ],
      finalAnswerLatex: "a = 3,\\quad T = \\pi,\\quad |v|_{\\max} = 6",
    },
    {
      title: "Find speed at a given position using the energy equation",
      questionLatex:
        "x = 4\\sin(3t).\\quad\\text{Find speed when }x = 2.",
      steps: [
        {
          explanation: "Identify a = 4 and n = 3.",
          latex: "a = 4,\\quad n = 3",
        },
        {
          explanation: "Apply v² = n²(a² − x²) with x = 2.",
          latex: "v^2 = 9(16 - 4) = 9 \\times 12 = 108",
        },
        {
          explanation: "Take the positive square root for speed.",
          latex: "\\text{Speed} = \\sqrt{108} = 6\\sqrt{3} \\approx 10.4",
        },
      ],
      finalAnswerLatex: "\\text{Speed} = 6\\sqrt{3}",
    },
    {
      title: "Find maximum acceleration",
      questionLatex:
        "x = 5\\cos(2t).\\quad\\text{Find maximum acceleration.}",
      steps: [
        {
          explanation: "Identify a = 5 and n = 2.",
          latex: "a = 5,\\quad n = 2",
        },
        {
          explanation: "Use the formula: max acceleration = an².",
          latex: "|a|_{\\max} = an^2 = 5 \\times 4 = 20",
        },
        {
          explanation:
            "Verify: differentiating twice gives ẍ = −20cos(2t), maximum magnitude 20.",
          latex: "\\ddot{x} = -20\\cos(2t),\\quad |\\ddot{x}|_{\\max} = 20",
        },
      ],
      finalAnswerLatex: "|a|_{\\max} = 20",
    },
  ],
  guidedPractice: [
    mechTyped(
      "y12e2-shm-g1",
      "For $x = 5\\sin(3t)$, state the amplitude.",
      "x = 5\\sin(3t)",
      "5",
      [],
      "The amplitude is the coefficient of the sine: a = 5.",
      "The amplitude is the positive coefficient in front of sin or cos."
    ),
    mechTyped(
      "y12e2-shm-g2",
      "For $x = 4\\cos(2t)$, find the period $T$.",
      "x = 4\\cos(2t)",
      "pi",
      ["π", "3.14", "3.14159"],
      "Angular frequency n = 2. T = 2π/n = 2π/2 = π.",
      "Apply T = 2π/n, where n is the angular frequency inside the trig function."
    ),
    mechTyped(
      "y12e2-shm-g3",
      "For $x = 3\\sin(4t)$, find the maximum speed.",
      "x = 3\\sin(4t)",
      "12",
      [],
      "Maximum speed = an = 3 × 4 = 12.",
      "Maximum speed = amplitude × angular frequency."
    ),
    mechTyped(
      "y12e2-shm-g4",
      "For $x = 5\\sin(2t)$, use $v^2 = n^2(a^2 - x^2)$ to find speed when $x = 3$.",
      "x = 5\\sin(2t),\\quad x = 3",
      "8",
      [],
      "a = 5, n = 2. v² = 4(25 − 9) = 4 × 16 = 64. Speed = √64 = 8.",
      "Substitute n = 2, a = 5, x = 3 into v² = n²(a² − x²), then take the square root."
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-shm-i1",
      "For $x = 2\\cos(3t)$, find the maximum acceleration.",
      "x = 2\\cos(3t)",
      "18",
      [],
      "Maximum acceleration = an² = 2 × 9 = 18.",
      "Apply max acc = an², where a is the amplitude and n is the angular frequency."
    ),
    mechChoice(
      "y12e2-shm-i2",
      "Which equation is the defining condition for simple harmonic motion?",
      "A",
      [
        "$\\ddot{x} = -n^2 x$",
        "$v = -nx$",
        "$x = a\\sin(nt)$ only",
        "$T = 2\\pi/a$",
      ],
      "SHM is defined by ẍ = −n²x: acceleration is proportional to displacement and directed towards the centre. Any displacement function satisfying this is SHM.",
      "Recall the acceleration condition that defines SHM."
    ),
    mechTyped(
      "y12e2-shm-i3",
      "For $x = 4\\sin(3t)$, use $v^2 = n^2(a^2 - x^2)$ to find speed when $x = 2$.",
      "x = 4\\sin(3t),\\quad x = 2",
      "6sqrt(3)",
      ["6√3", "6*sqrt(3)", "sqrt(108)", "10.39"],
      "a = 4, n = 3. v² = 9(16 − 4) = 9 × 12 = 108. Speed = √108 = 6√3 ≈ 10.4.",
      "Substitute a = 4, n = 3, x = 2 into v² = n²(a² − x²), then simplify √108 = 6√3."
    ),
    mechTyped(
      "y12e2-shm-i4",
      "Given $\\ddot{x} = -25x$, state the angular frequency $n$.",
      "\\ddot{x} = -25x",
      "5",
      [],
      "Comparing ẍ = −n²x with ẍ = −25x gives n² = 25, so n = 5.",
      "Match to ẍ = −n²x and take the positive square root."
    ),
    mechTyped(
      "y12e2-shm-i5",
      "A particle satisfies $x = a\\sin(2t)$ with maximum speed $14$. Find amplitude $a$.",
      "x = a\\sin(2t),\\quad |v|_{\\max} = 14",
      "7",
      [],
      "Maximum speed = an = 2a = 14, so a = 7.",
      "Use max speed = an with n = 2, then solve for a."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing angular frequency n with period T.",
      fix: "n appears inside the trig function: x = a sin(nt). The period is T = 2π/n, not T = n. Larger n means shorter period.",
    },
    {
      mistake: "Using max speed an as the speed at all positions.",
      fix: "an is the maximum speed, reached only at x = 0. For other positions, use the energy equation v² = n²(a² − x²).",
    },
    {
      mistake: "Forgetting to square root when using v² = n²(a² − x²).",
      fix: "The formula gives v² (squared). Speed is the positive square root: speed = √(n²(a² − x²)).",
    },
    {
      mistake: "Using an as maximum acceleration instead of an².",
      fix: "Maximum speed = an. Maximum acceleration = an². The extra factor of n comes from differentiating velocity.",
    },
  ],
  masteryQuiz: [
    mechTyped(
      "y12e2-shm-m1",
      "For $x = 6\\sin(2t)$, state the amplitude.",
      "x = 6\\sin(2t)",
      "6",
      [],
      "The amplitude is the coefficient of the sine: a = 6.",
      "Read the amplitude from x = a sin(nt)."
    ),
    mechTyped(
      "y12e2-shm-m2",
      "For $x = 3\\cos(\\pi t)$, find the period $T$.",
      "x = 3\\cos(\\pi t)",
      "2",
      [],
      "n = π. T = 2π/n = 2π/π = 2.",
      "Apply T = 2π/n with n = π."
    ),
    mechTyped(
      "y12e2-shm-m3",
      "For $x = 4\\sin(5t)$, find the maximum speed.",
      "x = 4\\sin(5t)",
      "20",
      [],
      "Maximum speed = an = 4 × 5 = 20.",
      "Apply max speed = an."
    ),
    mechChoice(
      "y12e2-shm-m4",
      "Which is the energy equation connecting speed and position in SHM?",
      "A",
      [
        "$v^2 = n^2(a^2 - x^2)$",
        "$v = na\\sin(nt)$",
        "$v^2 = n^2 x^2$",
        "$v = a\\cos(nt)$",
      ],
      "The energy equation v² = n²(a² − x²) gives speed at any position x without needing t. It is derived by eliminating t from x = a sin(nt) and v = an cos(nt).",
      "Recall the equation derived by combining the displacement and velocity expressions."
    ),
    mechTyped(
      "y12e2-shm-m5",
      "For $x = 5\\sin(4t)$, use $v^2 = n^2(a^2 - x^2)$ to find speed when $x = 3$.",
      "x = 5\\sin(4t),\\quad x = 3",
      "16",
      [],
      "a = 5, n = 4. v² = 16(25 − 9) = 16 × 16 = 256. Speed = √256 = 16.",
      "Substitute a = 5, n = 4, x = 3 into v² = n²(a² − x²)."
    ),
    mechTyped(
      "y12e2-shm-m6",
      "For $x = 2\\cos(3t)$, find the maximum acceleration.",
      "x = 2\\cos(3t)",
      "18",
      [],
      "Maximum acceleration = an² = 2 × 9 = 18.",
      "Apply max acc = an²."
    ),
    mechChoice(
      "y12e2-shm-m7",
      "Given $\\ddot{x} = -4x$, the angular frequency $n$ is:",
      "A",
      ["2", "4", "$-2$", "16"],
      "Comparing ẍ = −n²x with ẍ = −4x gives n² = 4, so n = 2 (positive).",
      "Match to ẍ = −n²x and take the positive square root."
    ),
    mechTyped(
      "y12e2-shm-m8",
      "For $x = a\\sin(3t)$ with maximum speed $15$, find amplitude $a$.",
      "x = a\\sin(3t),\\quad |v|_{\\max} = 15",
      "5",
      [],
      "Max speed = an = 3a = 15, so a = 5.",
      "Apply max speed = an with n = 3, then solve for a."
    ),
    mechChoice(
      "y12e2-shm-m9",
      "For $x = a\\cos(nt)$, the speed at $x = 0$ is:",
      "A",
      [
        "Maximum (equal to $an$)",
        "Zero",
        "Equal to the acceleration",
        "Half the maximum speed",
      ],
      "At x = 0: v² = n²(a² − 0) = n²a², so speed = na = an (maximum). x = 0 is the centre of motion where speed is greatest.",
      "Substitute x = 0 into v² = n²(a² − x²) and evaluate."
    ),
    mechTyped(
      "y12e2-shm-m10",
      "For $x = 6\\sin(2t)$, find the period $T$.",
      "x = 6\\sin(2t)",
      "pi",
      ["π", "3.14"],
      "n = 2. T = 2π/n = 2π/2 = π.",
      "Apply T = 2π/n with n = 2."
    ),
  ],
  masteryQuizPool: [
    { ...mechChoice("y12e2-mech-shm-pool-1", "Simple harmonic motion is defined by which equation of motion?", "B", ["a = n²x", "a = −n²x (acceleration proportional to displacement, directed toward equilibrium)", "a = −nx", "v = −n²x"], "SHM means the restoring acceleration is proportional to displacement and always points back toward the centre: a = −n²x."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-shm-pool-2", "A particle moves as x = 5 cos(3t). State the amplitude.", "x = 5\\cos 3t", "5", ["5 m"], "The coefficient of the cosine is the amplitude, so a = 5."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-shm-pool-3", "For x = 5 cos(3t) the angular frequency is n = 3. Using T = 2π/n, find the period T.", "T = \\frac{2\\pi}{n}", "2π/3", ["2pi/3", "2.09"], "T = 2π/3 seconds."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-shm-pool-4", "For x = 5 cos(3t), the maximum speed is a·n. Find the maximum speed.", "v_{max} = a\\,n", "15", ["15 m/s"], "v_max = a·n = 5·3 = 15 m/s, attained as the particle passes through the centre."), difficulty: 3 },
    { ...mechChoice("y12e2-mech-shm-pool-5", "A student claims the acceleration in SHM is greatest at the centre (x = 0). Why is this wrong?", "C", ["Acceleration is constant in SHM.", "Acceleration is greatest when speed is greatest.", "Since a = −n²x, the magnitude |a| is greatest at the extremes (x = ±a) and zero at the centre.", "Acceleration is always zero."], "a = −n²x is proportional to displacement, so it is zero at x = 0 and maximal at the turning points."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-shm-pool-6", "For x = 5 cos(3t), the velocity is v = −15 sin(3t). Find v at t = 0.", "v = -15\\sin 3t", "0", ["0 m/s"], "v(0) = −15 sin 0 = 0 — the particle starts at rest at the extreme x = 5."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-shm-pool-7", "Using v² = n²(a² − x²) with n = 3 and amplitude a = 5, find the speed when x = 4.", "v^2 = n^2(a^2 - x^2)", "9", ["9 m/s"], "v² = 9(25 − 16) = 9·9 = 81, so v = 9 m/s."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-shm-pool-8", "For x = 5 cos(3t), acceleration satisfies a = −n²x = −9x. Find the acceleration when x = 2.", "a = -9x", "-18", ["−18", "-18 m/s²"], "a = −9(2) = −18 m/s² — directed back toward the centre."), difficulty: 4 },
    { ...mechChoice("y12e2-mech-shm-pool-9", "At which position does a particle in SHM have its maximum speed?", "C", ["At the extremes x = ±a.", "Halfway between centre and extreme.", "At the centre x = 0, where all the energy is kinetic.", "Speed is the same everywhere."], "Speed peaks at the centre (x = 0): from v² = n²(a² − x²), v is largest when x = 0. At the extremes the particle is momentarily at rest."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-shm-pool-10", "A particle in SHM has period π seconds. Using T = 2π/n, find n.", "\\pi = \\frac{2\\pi}{n}", "2", [], "π = 2π/n gives n = 2."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-shm-pool-11", "A particle moves as x = 3 sin(2t) + 4 cos(2t). Writing this as a single sinusoid R sin(2t + φ), the amplitude is R = √(3² + 4²). Find R.", "R = \\sqrt{3^2 + 4^2}", "5", ["5 m"], "R = √(9 + 16) = √25 = 5 — combining the sine and cosine components of the same frequency."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-shm-pool-12", "By energy: at the centre of SHM all energy is kinetic and at the extremes all potential. Explain by result — for amplitude 5 with n = 3, the centre speed is a·n = 15 m/s, so state the speed at the extreme x = 5.", "v(\\pm a) = 0", "0", ["0 m/s"], "At the extreme all energy is potential, so the kinetic energy (and speed) is 0 — the particle is momentarily at rest before reversing."), difficulty: 5 },
  ],
};

// ─── Lesson 3: Uniform Circular Motion ───────────────────────────────────────

const circularMotionLesson: Partial<ExplicitLesson> = {
  description:
    "Apply v = rω and a = rω² = v²/r to find speed, centripetal acceleration, and centripetal force for objects in uniform circular motion, and connect angular velocity to period.",
  learningIntention:
    "Use the relationships between linear speed, angular velocity, centripetal acceleration and centripetal force to solve problems involving uniform circular motion.",
  successCriteria: [
    "Convert between linear speed and angular velocity using v = rω.",
    "Calculate centripetal acceleration using a = rω² or a = v²/r.",
    "Apply F = mrω² to find the centripetal force.",
    "Use T = 2π/ω to find period and angular velocity.",
  ],
  teaching: {
    paragraphs: [
      "A particle in uniform circular motion moves at constant speed along a circular path of radius r. Its direction of motion changes continuously, so its velocity changes even though its speed is constant.",
      "The angular velocity ω (rad/s) measures how rapidly the angle changes: ω = dθ/dt. The linear speed v and angular velocity are related by v = rω. The period (time for one revolution) is T = 2π/ω.",
      "Although speed is constant, the particle continuously accelerates towards the centre of the circle. This centripetal acceleration has magnitude a = rω² = v²/r and is directed towards the centre at every instant.",
      "By Newton's second law, a net force directed towards the centre acts on the particle. This centripetal force has magnitude F = mrω² = mv²/r. It changes direction, not speed.",
    ],
    latexBlocks: [
      "v = r\\omega,\\quad T = \\frac{2\\pi}{\\omega}",
      "a = r\\omega^2 = \\frac{v^2}{r}\\quad(\\text{centripetal, directed towards centre})",
      "F = mr\\omega^2 = \\frac{mv^2}{r}\\quad(\\text{centripetal force})",
    ],
  },
  workedExamples: [
    {
      title: "Find speed and centripetal acceleration from angular velocity",
      questionLatex:
        "r = 0.5\\text{ m},\\; \\omega = 4\\text{ rad/s.}\\quad\\text{Find }v\\text{ and }a.",
      steps: [
        {
          explanation: "Apply v = rω to find speed.",
          latex: "v = r\\omega = 0.5 \\times 4 = 2\\text{ m/s}",
        },
        {
          explanation: "Apply a = rω² to find centripetal acceleration.",
          latex: "a = r\\omega^2 = 0.5 \\times 16 = 8\\text{ m/s}^2",
        },
      ],
      finalAnswerLatex:
        "v = 2\\text{ m/s},\\quad a = 8\\text{ m/s}^2\\text{ (directed towards centre)}",
    },
    {
      title: "Find centripetal acceleration from linear speed",
      questionLatex:
        "v = 20\\text{ m/s},\\; r = 100\\text{ m.}\\quad\\text{Find centripetal acceleration.}",
      steps: [
        {
          explanation: "Use a = v²/r when v is known.",
          latex: "a = \\frac{v^2}{r} = \\frac{400}{100} = 4\\text{ m/s}^2",
        },
      ],
      finalAnswerLatex: "a = 4\\text{ m/s}^2",
    },
    {
      title: "Find angular velocity and centripetal acceleration from period",
      questionLatex:
        "r = 2\\text{ m},\\; T = 4\\text{ s.}\\quad\\text{Find }\\omega\\text{ and centripetal acceleration.}",
      steps: [
        {
          explanation: "Find ω from the period.",
          latex:
            "\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{4} = \\frac{\\pi}{2}\\text{ rad/s}",
        },
        {
          explanation: "Find centripetal acceleration.",
          latex:
            "a = r\\omega^2 = 2 \\times \\left(\\frac{\\pi}{2}\\right)^2 = 2 \\times \\frac{\\pi^2}{4} = \\frac{\\pi^2}{2} \\approx 4.93\\text{ m/s}^2",
        },
      ],
      finalAnswerLatex:
        "\\omega = \\frac{\\pi}{2}\\text{ rad/s},\\quad a = \\frac{\\pi^2}{2}\\text{ m/s}^2",
    },
  ],
  guidedPractice: [
    mechTyped(
      "y12e2-circ-g1",
      "Find the speed of an object revolving at $r = 4$ m with $\\omega = 3$ rad/s.",
      "r = 4\\text{ m},\\; \\omega = 3\\text{ rad/s}",
      "12",
      [],
      "v = rω = 4 × 3 = 12 m/s.",
      "Apply v = rω."
    ),
    mechChoice(
      "y12e2-circ-g2",
      "Centripetal acceleration in uniform circular motion is directed:",
      "A",
      [
        "Towards the centre of the circle",
        "Away from the centre of the circle",
        "Tangent to the circular path",
        "Opposite to the velocity",
      ],
      "Centripetal means centre-seeking. The acceleration always points towards the centre, perpendicular to the velocity at every instant.",
      "Recall what 'centripetal' means."
    ),
    mechTyped(
      "y12e2-circ-g3",
      "Find centripetal acceleration for $r = 5$ m, $\\omega = 4$ rad/s.",
      "r = 5\\text{ m},\\; \\omega = 4\\text{ rad/s}",
      "80",
      [],
      "a = rω² = 5 × 16 = 80 m/s².",
      "Apply a = rω²."
    ),
    mechTyped(
      "y12e2-circ-g4",
      "Find the period $T$ for an object with $\\omega = 2$ rad/s.",
      "\\omega = 2\\text{ rad/s}",
      "pi",
      ["π", "3.14"],
      "T = 2π/ω = 2π/2 = π seconds.",
      "Apply T = 2π/ω."
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-circ-i1",
      "A particle travels at $v = 8$ m/s on a circle of radius $r = 2$ m. Find centripetal acceleration.",
      "v = 8\\text{ m/s},\\; r = 2\\text{ m}",
      "32",
      [],
      "a = v²/r = 64/2 = 32 m/s².",
      "Apply a = v²/r."
    ),
    mechTyped(
      "y12e2-circ-i2",
      "Given period $T = \\pi$ s, find angular velocity $\\omega$.",
      "T = \\pi\\text{ s}",
      "2",
      [],
      "ω = 2π/T = 2π/π = 2 rad/s.",
      "Apply ω = 2π/T."
    ),
    mechTyped(
      "y12e2-circ-i3",
      "Find centripetal force for $m = 3$ kg, $r = 2$ m, $\\omega = 4$ rad/s.",
      "m = 3\\text{ kg},\\; r = 2\\text{ m},\\; \\omega = 4\\text{ rad/s}",
      "96",
      [],
      "F = mrω² = 3 × 2 × 16 = 96 N.",
      "Apply F = mrω²."
    ),
    mechChoice(
      "y12e2-circ-i4",
      "An object in uniform circular motion has:",
      "A",
      [
        "Constant speed but changing direction of velocity",
        "Constant velocity",
        "Increasing speed",
        "Zero acceleration",
      ],
      "In uniform circular motion, speed is constant but velocity direction changes continuously. Velocity is not constant, and centripetal acceleration is non-zero.",
      "Distinguish between speed (magnitude) and velocity (magnitude + direction)."
    ),
    mechTyped(
      "y12e2-circ-i5",
      "Find speed for $r = 3$ m, $\\omega = 6$ rad/s.",
      "r = 3\\text{ m},\\; \\omega = 6\\text{ rad/s}",
      "18",
      [],
      "v = rω = 3 × 6 = 18 m/s.",
      "Apply v = rω."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the two centripetal acceleration formulas.",
      fix: "Both a = rω² and a = v²/r are correct and equivalent. Use rω² when ω is given; use v²/r when linear speed v is given.",
    },
    {
      mistake: "Thinking centripetal force acts outward.",
      fix: "Centripetal means centre-seeking. The force and acceleration both point inward towards the centre, not outward.",
    },
    {
      mistake: "Using a = rω instead of a = rω² for centripetal acceleration.",
      fix: "Speed v = rω uses one power of ω. Centripetal acceleration a = rω² uses two powers. Do not confuse the two.",
    },
    {
      mistake: "Setting T equal to ω.",
      fix: "T = 2π/ω. A larger ω means a shorter period, not a longer one. If ω = π then T = 2, not π.",
    },
  ],
  masteryQuiz: [
    mechTyped(
      "y12e2-circ-m1",
      "Find speed for $r = 2$ m, $\\omega = 5$ rad/s.",
      "r = 2\\text{ m},\\; \\omega = 5\\text{ rad/s}",
      "10",
      [],
      "v = rω = 2 × 5 = 10 m/s.",
      "Apply v = rω."
    ),
    mechTyped(
      "y12e2-circ-m2",
      "Find centripetal acceleration for $r = 4$ m, $\\omega = 3$ rad/s.",
      "r = 4\\text{ m},\\; \\omega = 3\\text{ rad/s}",
      "36",
      [],
      "a = rω² = 4 × 9 = 36 m/s².",
      "Apply a = rω²."
    ),
    mechChoice(
      "y12e2-circ-m3",
      "For $\\omega = 6$ rad/s, the period $T$ is:",
      "A",
      ["pi/3 s", "pi/6 s", "3pi s", "6pi s"],
      "T = 2π/ω = 2π/6 = π/3 seconds.",
      "Apply T = 2π/ω with ω = 6."
    ),
    mechTyped(
      "y12e2-circ-m4",
      "Find centripetal acceleration for $v = 6$ m/s, $r = 3$ m.",
      "v = 6\\text{ m/s},\\; r = 3\\text{ m}",
      "12",
      [],
      "a = v²/r = 36/3 = 12 m/s².",
      "Apply a = v²/r."
    ),
    mechTyped(
      "y12e2-circ-m5",
      "Find $\\omega$ for period $T = 4$ s.",
      "T = 4\\text{ s}",
      "pi/2",
      ["π/2", "1.57"],
      "ω = 2π/T = 2π/4 = π/2 rad/s.",
      "Apply ω = 2π/T."
    ),
    mechChoice(
      "y12e2-circ-m6",
      "The formula for centripetal force on a mass $m$ at radius $r$ with angular velocity $\\omega$ is:",
      "A",
      [
        "$F = mr\\omega^2$",
        "$F = m\\omega/r$",
        "$F = mv/r$",
        "$F = mr\\omega$",
      ],
      "F = ma = m × rω² = mrω². Alternatively F = mv²/r. Both are correct; mrω² is the form when ω is given.",
      "Apply Newton's second law with centripetal acceleration a = rω²."
    ),
    mechTyped(
      "y12e2-circ-m7",
      "Find centripetal force for $m = 2$ kg, $v = 5$ m/s, $r = 2$ m.",
      "m = 2\\text{ kg},\\; v = 5\\text{ m/s},\\; r = 2\\text{ m}",
      "25",
      [],
      "F = mv²/r = 2 × 25/2 = 25 N.",
      "Apply F = mv²/r."
    ),
    mechTyped(
      "y12e2-circ-m8",
      "Find speed for $r = 0.5$ m, $\\omega = 8$ rad/s.",
      "r = 0.5\\text{ m},\\; \\omega = 8\\text{ rad/s}",
      "4",
      [],
      "v = rω = 0.5 × 8 = 4 m/s.",
      "Apply v = rω."
    ),
    mechChoice(
      "y12e2-circ-m9",
      "If $\\omega$ doubles while $r$ stays fixed, centripetal acceleration:",
      "A",
      [
        "Quadruples",
        "Doubles",
        "Halves",
        "Stays the same",
      ],
      "a = rω². If ω → 2ω then a → r(2ω)² = 4rω². The acceleration quadruples.",
      "Substitute 2ω for ω in a = rω² and compare."
    ),
    mechTyped(
      "y12e2-circ-m10",
      "For $r = 5$ m, $T = \\pi$ s, find centripetal acceleration.",
      "r = 5\\text{ m},\\; T = \\pi\\text{ s}",
      "20",
      [],
      "ω = 2π/T = 2π/π = 2 rad/s. a = rω² = 5 × 4 = 20 m/s².",
      "Find ω = 2π/T first, then apply a = rω²."
    ),
  ],
  masteryQuizPool: [
    { ...mechChoice("y12e2-mech-circ-pool-1", "In uniform circular motion (constant speed), the net force on the object points in which direction?", "B", ["Tangent to the circle, in the direction of motion.", "Toward the centre of the circle (centripetal).", "Away from the centre (centrifugal).", "There is no net force."], "Constant speed but changing direction means the acceleration — and hence net force — points toward the centre: the centripetal direction."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-circ-pool-2", "Linear speed relates to angular speed by v = rω. For r = 2 m and ω = 5 rad/s, find v.", "v = r\\omega", "10", ["10 m/s"], "v = rω = 2·5 = 10 m/s."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-circ-pool-3", "Centripetal acceleration is a = v²/r. For v = 10 m/s and r = 2 m, find a.", "a = \\frac{v^2}{r}", "50", ["50 m/s²"], "a = 10²/2 = 100/2 = 50 m/s²."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-circ-pool-4", "The same acceleration can be written a = rω². For r = 2 m and ω = 5 rad/s, find a (confirming it matches a = v²/r).", "a = r\\omega^2", "50", ["50 m/s²"], "a = rω² = 2·25 = 50 m/s² — the same value as v²/r, since v = rω."), difficulty: 3 },
    { ...mechChoice("y12e2-mech-circ-pool-5", "A student claims the centripetal force does positive work on an object in uniform circular motion. Why is this wrong?", "C", ["The force is zero.", "The object is not moving.", "The centripetal force is perpendicular to the velocity, so it does no work; the speed stays constant.", "Work is always negative in circular motion."], "Work = force·displacement along the motion. The centripetal force is at right angles to the velocity, so it does zero work and the kinetic energy (speed) is unchanged."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-circ-pool-6", "The period of circular motion is T = 2π/ω. For ω = 5 rad/s, find T.", "T = \\frac{2\\pi}{\\omega}", "2π/5", ["2pi/5", "1.26"], "T = 2π/5 seconds."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-circ-pool-7", "The centripetal force is F = mv²/r. For m = 3 kg, v = 10 m/s, r = 2 m, find F.", "F = \\frac{mv^2}{r}", "150", ["150 N"], "F = 3·10²/2 = 300/2 = 150 N."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-circ-pool-8", "Conical pendulum: the tension's components give T cosθ = mg (vertical) and T sinθ = mv²/r (horizontal). Dividing gives tanθ = v²/(rg). If v² = rg, find tanθ.", "\\tan\\theta = \\frac{v^2}{rg}", "1", [], "tanθ = v²/(rg) = rg/(rg) = 1 (so θ = 45°)."), difficulty: 4 },
    { ...mechChoice("y12e2-mech-circ-pool-9", "A student insists a real 'centrifugal force' pushes the object outward. What is the correct view?", "C", ["The outward force is real and equals mv²/r.", "Both inward and outward forces act equally, cancelling.", "There is no real outward force; a real inward (centripetal) force is required, and the 'outward' feeling is just inertia in the rotating frame.", "Gravity provides the outward force."], "In an inertial frame only the inward centripetal force acts. The apparent outward push is the body's inertia (tendency to go straight), not a real force."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-circ-pool-10", "For a conical pendulum, tanθ = v²/(rg). With θ = 45°, r = 5 m, g = 10 m/s², find v².", "\\tan 45° = \\frac{v^2}{rg}", "50", [], "tan 45° = 1, so v² = rg = 5·10 = 50."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-circ-pool-11", "A frictionless banked track is designed so that tanθ = v²/(rg). For a bank with tanθ = 0.5, r = 20 m, g = 10 m/s², find the design speed v.", "v^2 = rg\\tan\\theta", "10", ["10 m/s"], "v² = rg·tanθ = 20·10·0.5 = 100, so v = 10 m/s."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-circ-pool-12", "Explain by result: since centripetal acceleration a = v²/r depends on the square of the speed, if the speed doubles at fixed radius the acceleration multiplies by what factor?", "a = \\frac{v^2}{r}", "4", ["4 times", "x4"], "a ∝ v², so doubling v multiplies a by 2² = 4 — which is why cornering forces grow rapidly with speed."), difficulty: 5 },
  ],
};

// ─── Lesson 4: Resisted Motion ────────────────────────────────────────────────

const resistedMotionLesson: Partial<ExplicitLesson> = {
  description:
    "Model horizontal resisted motion with ma = −kv and vertical resisted motion with ma = mg − kv, find terminal velocity, and solve the separable ODE to obtain v(t).",
  learningIntention:
    "Write equations of motion for horizontal and vertical resisted motion, find terminal velocity, and solve the separable ODE for velocity as a function of time.",
  successCriteria: [
    "Write the equation of motion for horizontal resisted motion: m(dv/dt) = −kv.",
    "Write the equation of motion for vertical resisted motion: m(dv/dt) = mg − kv.",
    "Find terminal velocity by setting dv/dt = 0.",
    "Solve the separable ODE for v(t) using separation of variables.",
  ],
  teaching: {
    paragraphs: [
      "In resisted horizontal motion, the only force is the resistance: ma = −kv (k > 0). The negative sign means resistance opposes the direction of motion. This gives dv/dt = −(k/m)v, which separates to dv/v = −(k/m)dt.",
      "In resisted vertical motion under gravity, two forces act: gravity mg downward and resistance kv upward (taking downward as positive). The equation is m(dv/dt) = mg − kv.",
      "Terminal velocity is reached when acceleration = 0, so dv/dt = 0. For vertical motion: mg − kv_T = 0, giving v_T = mg/k.",
      "To solve m(dv/dt) = mg − kv, separate variables: dv/(mg − kv) = dt/m. Integrate: −(1/k)ln|mg − kv| = t/m + C. Apply initial conditions to find C, then solve for v.",
    ],
    latexBlocks: [
      "\\text{Horizontal: }m\\frac{dv}{dt}=-kv\\implies v=v_0 e^{-kt/m}",
      "\\text{Vertical: }m\\frac{dv}{dt}=mg-kv",
      "\\text{Terminal velocity: }v_T=\\frac{mg}{k}\\;(\\text{set }dv/dt=0)",
      "\\int\\frac{dv}{mg-kv}=\\int\\frac{dt}{m}\\implies -\\frac{1}{k}\\ln|mg-kv|=\\frac{t}{m}+C",
    ],
  },
  workedExamples: [
    {
      title: "Solve horizontal resisted motion",
      questionLatex:
        "m\\frac{dv}{dt}=-kv,\\;v(0)=v_0.\\;\\text{Find }v(t).",
      steps: [
        {
          explanation: "Separate variables.",
          latex: "\\frac{dv}{v}=-\\frac{k}{m}\\,dt",
        },
        {
          explanation: "Integrate both sides.",
          latex: "\\ln|v|=-\\frac{k}{m}t+C_1",
        },
        {
          explanation: "Exponentiate and apply v(0) = v₀.",
          latex: "v=v_0\\,e^{-kt/m}",
        },
      ],
      finalAnswerLatex: "v(t)=v_0\\,e^{-kt/m}",
    },
    {
      title: "Find terminal velocity for vertical resisted motion",
      questionLatex:
        "m\\frac{dv}{dt}=mg-kv.\\;\\text{Find }v_T.",
      steps: [
        {
          explanation: "At terminal velocity, acceleration is zero.",
          latex: "0=mg-kv_T",
        },
        {
          explanation: "Solve for v_T.",
          latex: "v_T=\\frac{mg}{k}",
        },
      ],
      finalAnswerLatex: "v_T=\\frac{mg}{k}",
    },
  ],
  guidedPractice: [
    mechChoice(
      "y12e2-resist-g1",
      "For horizontal resisted motion $m\\frac{dv}{dt}=-kv$, the resistance force acts:",
      "A",
      [
        "Opposite to the direction of motion",
        "In the same direction as motion",
        "Perpendicular to motion",
        "Only when v > 0",
      ],
      "The negative sign means the force opposes motion. This is the defining feature of resistance (drag).",
      "Check the sign of −kv relative to v."
    ),
    mechTyped(
      "y12e2-resist-g2",
      "For horizontal resisted motion $m\\frac{dv}{dt}=-kv$, separate variables to obtain $\\frac{dv}{v}=\\square\\,dt$.",
      "\\frac{dv}{v}=\\square\\,dt",
      "-k/m",
      ["-(k/m)", "−k/m"],
      "Divide both sides by mv: dv/v = −(k/m) dt.",
      "Divide both sides of the ODE by mv."
    ),
    mechTyped(
      "y12e2-resist-g3",
      "For vertical resisted motion $m\\frac{dv}{dt}=mg-kv$, find the terminal velocity $v_T$.",
      "0=mg-kv_T",
      "mg/k",
      ["m·g/k"],
      "Set dv/dt = 0: 0 = mg − kv_T, so v_T = mg/k.",
      "Set the acceleration to zero and solve for v."
    ),
    mechChoice(
      "y12e2-resist-g4",
      "The solution to $\\frac{dv}{dt}=-\\frac{k}{m}v$ with $v(0)=v_0$ is:",
      "A",
      [
        "$v=v_0 e^{-kt/m}$",
        "$v=v_0-\\frac{k}{m}t$",
        "$v=v_0\\cos(kt/m)$",
        "$v=v_0+kt/m$",
      ],
      "Separating and integrating dv/v = −(k/m)dt gives ln v = −(k/m)t + C, so v = v₀$e^{−kt/m}$.",
      "Solve the separable ODE, apply the initial condition."
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-resist-i1",
      "Integrate $\\displaystyle\\int\\frac{dv}{v}$ to obtain $\\ln|v|+C$. What is the result after exponentiating?",
      "\\ln|v|=-\\frac{k}{m}t+C_1",
      "v=Ae^{-kt/m}",
      ["A·e^{-kt/m}", "v₀e^{-kt/m}"],
      "Exponentiate: |v| = e^{C₁}·e^{−kt/m}. Write A = ±e^{C₁}: v = Ae^{−kt/m}.",
      "Exponentiate both sides and absorb the constant."
    ),
    mechTyped(
      "y12e2-resist-i2",
      "For $v=v_0 e^{-kt/m}$, find $\\lim_{t\\to\\infty}v$.",
      "\\lim_{t\\to\\infty}v_0 e^{-kt/m}",
      "0",
      [],
      "As t → ∞, $e^{−kt/m}$ → 0, so v → 0. The particle decelerates to rest (horizontal case).",
      "Evaluate the exponential as t → ∞."
    ),
    mechChoice(
      "y12e2-resist-i3",
      "For vertical resisted motion $m\\frac{dv}{dt}=mg-kv$, which separation is correct?",
      "B",
      [
        "$\\dfrac{dv}{v}=\\dfrac{mg-k}{m}\\,dt$",
        "$\\dfrac{dv}{mg-kv}=\\dfrac{dt}{m}$",
        "$dv=(mg-kv)\\,dt$",
        "$\\dfrac{dv}{mg}=\\dfrac{dt}{kv}$",
      ],
      "Divide both sides by m(mg−kv): dv/(mg−kv) = dt/m.",
      "Isolate dv on the left and dt on the right."
    ),
    mechTyped(
      "y12e2-resist-i4",
      "Integrate the left side: $\\displaystyle\\int\\frac{dv}{mg-kv}$.",
      "\\int\\frac{dv}{mg-kv}",
      "-ln|mg-kv|/k",
      ["-(1/k)ln|mg-kv|+C", "-\\frac{1}{k}\\ln|mg-kv|+C"],
      "Let u = mg − kv, du = −k dv. So ∫dv/(mg−kv) = (−1/k)ln|mg−kv| + C.",
      "Substitute u = mg − kv to integrate."
    ),
    mechTyped(
      "y12e2-resist-i5",
      "For $v=\\frac{mg}{k}(1-e^{-kt/m})$, verify that as $t\\to\\infty$, $v$ approaches the terminal velocity.",
      "\\lim_{t\\to\\infty}\\frac{mg}{k}(1-e^{-kt/m})",
      "mg/k",
      ["m·g/k"],
      "As t → ∞, e^{−kt/m} → 0, so v → mg/k = v_T. ✓",
      "Evaluate the limit of the exponential term."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing the resistance force in the wrong direction.",
      fix: "Resistance always opposes motion. If downward is positive and the particle moves down, resistance acts upward, so it appears as −kv in the equation.",
    },
    {
      mistake: "Integrating 1/(mg−kv) as ln|mg−kv|.",
      fix: "There is a chain rule factor: ∫dv/(mg−kv) = −(1/k)ln|mg−kv| + C. The factor 1/k comes from the −k on v.",
    },
    {
      mistake: "Forgetting to apply the initial condition to find the constant.",
      fix: "After integrating, substitute the initial values (t=0, v=v₀) to determine the arbitrary constant C.",
    },
    {
      mistake: "Claiming terminal velocity is reached in finite time.",
      fix: "The solution involves e^{−kt/m}, which never reaches zero in finite time. Terminal velocity is a limit as t → ∞.",
    },
  ],
  masteryQuiz: [
    mechChoice(
      "y12e2-resist-m1",
      "The equation of motion for horizontal resisted motion is:",
      "A",
      [
        "$m\\frac{dv}{dt}=-kv$",
        "$m\\frac{dv}{dt}=kv$",
        "$m\\frac{dv}{dt}=mg-kv$",
        "$m\\frac{dv}{dt}=-mg$",
      ],
      "Horizontal resisted motion has only the resistance force −kv acting. (No gravity component in horizontal direction.)"
    ),
    mechTyped(
      "y12e2-resist-m2",
      "For $m\\frac{dv}{dt}=-kv$ with $v(0)=20$ m/s, $k/m=0.1$, find $v(10)$.",
      "v(0)=20\\text{ m/s},\\quad k/m=0.1,\\quad t=10",
      "20e^{-1}",
      ["20/e", "20·e^{−1}"],
      "v(10) = 20·e^{−0.1×10} = 20e^{−1} ≈ 7.36 m/s.",
      "Substitute into v = v₀e^{−kt/m} with k/m = 0.1, t = 10."
    ),
    mechTyped(
      "y12e2-resist-m3",
      "Find the terminal velocity for $m=2$ kg, $g=10$ m/s², $k=5$ N·s/m.",
      "m=2\\text{ kg},\\quad g=10\\text{ m/s}^2,\\quad k=5\\text{ N\\cdot s/m}",
      "4",
      ["4 m/s"],
      "v_T = mg/k = 2×10/5 = 4 m/s.",
      "Apply v_T = mg/k."
    ),
    mechChoice(
      "y12e2-resist-m4",
      "Terminal velocity occurs when:",
      "C",
      [
        "Velocity is maximum",
        "Displacement is maximum",
        "Acceleration is zero",
        "Time approaches zero",
      ],
      "At terminal velocity, dv/dt = 0 so acceleration is zero and the forces are balanced."
    ),
    mechTyped(
      "y12e2-resist-m5",
      "Separate variables in $m\\frac{dv}{dt}=mg-kv$ to get $\\frac{dv}{mg-kv}=\\square$.",
      "m\\frac{dv}{dt}=mg-kv",
      "dt/m",
      ["(1/m)dt"],
      "Divide both sides by m(mg−kv): dv/(mg−kv) = dt/m.",
      "Divide both sides by m(mg−kv)."
    ),
    mechChoice(
      "y12e2-resist-m6",
      "The integral $\\displaystyle\\int\\frac{dv}{mg-kv}$ equals:",
      "B",
      [
        "$\\ln|mg-kv|+C$",
        "$-\\dfrac{1}{k}\\ln|mg-kv|+C$",
        "$\\dfrac{1}{k}\\ln|mg-kv|+C$",
        "$-k\\ln|mg-kv|+C$",
      ],
      "Let u = mg−kv, du = −k dv. The integral becomes −(1/k)∫du/u = −(1/k)ln|u| + C.",
      "Use the substitution u = mg−kv and identify the factor from the chain rule."
    ),
    mechTyped(
      "y12e2-resist-m7",
      "For horizontal motion with $v(0)=v_0$, as $t\\to\\infty$ the particle's speed approaches:",
      "v_0 e^{-kt/m}\\to\\;?\\;\\text{as }t\\to\\infty",
      "0",
      [],
      "v = v₀$e^{−kt/m}$ → 0 as t → ∞. The particle gradually slows to rest.",
      "Evaluate the limit of the exponential."
    ),
    mechChoice(
      "y12e2-resist-m8",
      "Which expression is the solution for $v(t)$ in vertical resisted motion starting from rest?",
      "A",
      [
        "$v=\\dfrac{mg}{k}\\left(1-e^{-kt/m}\\right)$",
        "$v=\\dfrac{mg}{k}\\,e^{-kt/m}$",
        "$v=mg\\,t/k$",
        "$v=v_0\\,e^{-kt/m}$",
      ],
      "Starting from rest (v₀=0), solving m dv/dt = mg − kv gives v = (mg/k)(1−$e^{−kt/m}$)."
    ),
    mechTyped(
      "y12e2-resist-m9",
      "For vertical motion $v=\\frac{mg}{k}(1-e^{-kt/m})$, type the value of $v$ at $t=0$.",
      "v=\\frac{mg}{k}(1-e^{-kt/m}),\\quad t=0",
      "0",
      [],
      "v(0) = (mg/k)(1−1) = 0. The particle starts from rest.",
      "Substitute t = 0 and evaluate."
    ),
    mechChoice(
      "y12e2-resist-m10",
      "Resistance forces in these models are proportional to:",
      "A",
      ["Velocity", "Displacement", "Time", "Acceleration"],
      "Both −kv (horizontal) and kv (in the vertical equation) show resistance proportional to velocity."
    ),
  ],
  masteryQuizPool: [
    { ...mechChoice("y12e2-mech-resist-pool-1", "An object falling with air resistance reaches terminal velocity when:", "B", ["Its velocity becomes zero.", "Its acceleration becomes zero (resistance balances gravity).", "It hits the ground.", "The resistance becomes zero."], "Terminal velocity is the steady state where the net force — and so the acceleration — is zero: the resistance exactly balances the driving force."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-resist-pool-2", "An object falls with a = g − kv (g = 10, k = 2). Terminal velocity occurs when a = 0, so v_T = g/k. Find v_T.", "v_T = \\frac{g}{k}", "5", ["5 m/s"], "Setting a = 0: 10 − 2v = 0, so v_T = 10/2 = 5 m/s."), difficulty: 2 },
    { ...mechTyped("y12e2-mech-resist-pool-3", "For a = g − kv with g = 10, k = 2, find the initial acceleration at the instant of release (v = 0).", "a = g - kv", "10", ["10 m/s²"], "At v = 0: a = 10 − 2(0) = 10 m/s² — at release the motion is essentially free fall."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-resist-pool-4", "For falling motion a = g − kv the terminal velocity is v_T = g/k. If g = 10 m/s² and the measured terminal velocity is 4 m/s, find k.", "v_T = \\frac{g}{k}", "2.5", ["5/2"], "k = g/v_T = 10/4 = 2.5."), difficulty: 3 },
    { ...mechChoice("y12e2-mech-resist-pool-5", "A student claims a falling object with air resistance keeps accelerating forever. Why is this wrong?", "C", ["Air resistance speeds the object up.", "Gravity switches off at high speed.", "As v grows, the resistance kv increases until it balances gravity; the acceleration falls to zero and v approaches terminal velocity.", "The object stops instantly."], "Resistance rises with speed, so the net force shrinks toward zero. The speed asymptotically approaches v_T = g/k rather than increasing without bound."), difficulty: 3 },
    { ...mechTyped("y12e2-mech-resist-pool-6", "A projectile moving UPWARD against gravity and resistance has acceleration of magnitude g + kv (both act downward). For g = 10, k = 1, v = 5, find that magnitude.", "|a| = g + kv", "15", ["15 m/s²"], "Going up, gravity and resistance both decelerate the object: |a| = 10 + 1·5 = 15 m/s²."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-resist-pool-7", "A particle moves horizontally under resistance only, a = −kv². Using a = v·dv/dx gives dv/dx = −kv, so v = v₀·exp(−kx). For v₀ = 20 m/s and k = ln2 per metre, find v at x = 1 m.", "v = v_0 e^{-kx}", "10", ["10 m/s"], "v = 20·exp(−ln2·1) = 20·(1/2) = 10 m/s."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-resist-pool-8", "With v = v₀·exp(−kx), the 'half-distance' where the speed halves satisfies exp(−kx) = 1/2, i.e. kx = ln2. For k = ln2 per metre, find that half-distance x.", "e^{-kx} = \\tfrac12 \\Rightarrow kx = \\ln 2", "1", ["1 m"], "kx = ln2 with k = ln2 gives x = 1 m — every metre halves the speed."), difficulty: 4 },
    { ...mechChoice("y12e2-mech-resist-pool-9", "Compared with free fall, a projectile thrown straight UP with air resistance has, on the way up, an acceleration that is:", "C", ["Less than g, because resistance helps it rise.", "Exactly g, since resistance acts sideways.", "Greater than g in magnitude, because gravity AND resistance both act downward (a = −(g + kv)).", "Zero until the top."], "On the way up the velocity is upward, so resistance points down — adding to gravity. The deceleration g + kv exceeds g."), difficulty: 4 },
    { ...mechTyped("y12e2-mech-resist-pool-10", "Falling from rest with a = g − kv has solution v(t) = (g/k)(1 − exp(−kt)). As t → ∞, exp(−kt) → 0, so v → g/k. For g = 10, k = 2, find this limiting (terminal) velocity.", "v(t) = \\frac{g}{k}\\left(1 - e^{-kt}\\right)", "5", ["5 m/s"], "As t → ∞ the exponential vanishes, leaving v → g/k = 10/2 = 5 m/s."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-resist-pool-11", "For v(t) = (g/k)(1 − exp(−kt)), at the special time t = (ln2)/k we have exp(−kt) = exp(−ln2) = 1/2. State the fraction of terminal velocity reached at that time.", "1 - e^{-\\ln 2}", "1/2", ["0.5"], "1 − exp(−ln2) = 1 − 1/2 = 1/2, so the object has reached half of its terminal velocity."), difficulty: 5 },
    { ...mechTyped("y12e2-mech-resist-pool-12", "Explain by result: in a = g − kv, when v is small the resistance kv is negligible so a ≈ g (free fall), and when v reaches v_T = g/k the resistance exactly balances gravity. State the acceleration at v = v_T.", "a = g - k\\,v_T", "0", ["0 m/s²"], "At v = v_T = g/k: a = g − k(g/k) = 0 — the defining condition of terminal velocity."), difficulty: 5 },
  ],
};

// ─── Lesson 5: Projectile Motion with Air Resistance ──────────────────────────

const projectileMotionResistanceLesson: Partial<ExplicitLesson> = {
  description:
    "Analyse two-dimensional projectile motion with air resistance by solving decoupled horizontal and vertical ODEs, express velocity components as functions of time, and find terminal speed.",
  learningIntention:
    "Write and solve the decoupled ODEs for horizontal and vertical motion of a projectile with linear air resistance.",
  successCriteria: [
    "Write the horizontal equation of motion: m(ẍ) = −kẋ.",
    "Write the vertical equation of motion: m(ÿ) = −mg − kẏ (taking up as positive).",
    "Solve each ODE separately to find ẋ(t) and ẏ(t).",
    "Identify that the horizontal speed decays exponentially while the vertical approaches terminal speed.",
  ],
  teaching: {
    paragraphs: [
      "In 2D projectile motion with linear air resistance, the horizontal and vertical equations are independent (decoupled). Each can be solved separately.",
      "Taking rightward and upward as positive: horizontal: mẍ = −kẋ; vertical: mÿ = −mg − kẏ. The resistance force −kẋ or −kẏ always opposes the respective velocity component.",
      "Horizontal: ẍ = −(k/m)ẋ. This is the same form as horizontal resisted motion. Solution: ẋ = ẋ₀$e^{−kt/m}$.",
      "Vertical: ÿ = −g − (k/m)ẏ. This can be rewritten as dẏ/dt = −(k/m)(ẏ + mg/k). Let w = ẏ + mg/k, then dw/dt = −(k/m)w, giving w = w₀$e^{−kt/m}$. Terminal speed (downward) is mg/k.",
    ],
    latexBlocks: [
      "\\text{Horizontal: }m\\ddot{x}=-k\\dot{x}\\implies \\dot{x}=\\dot{x}_0\\,e^{-kt/m}",
      "\\text{Vertical (up positive): }m\\ddot{y}=-mg-k\\dot{y}",
      "\\dot{y}=\\left(\\dot{y}_0+\\frac{mg}{k}\\right)e^{-kt/m}-\\frac{mg}{k}",
      "\\text{Terminal speed: }|\\dot{y}|\\to\\frac{mg}{k}\\text{ as }t\\to\\infty",
    ],
  },
  workedExamples: [
    {
      title: "Solve the horizontal ODE",
      questionLatex:
        "m\\ddot{x}=-k\\dot{x},\\;\\dot{x}(0)=u\\cos\\theta.\\;\\text{Find }\\dot{x}(t).",
      steps: [
        {
          explanation: "This is the same as horizontal resisted motion.",
          latex: "\\frac{d\\dot{x}}{dt}=-\\frac{k}{m}\\dot{x}",
        },
        {
          explanation: "Separate and integrate.",
          latex: "\\dot{x}=u\\cos\\theta\\cdot e^{-kt/m}",
        },
      ],
      finalAnswerLatex: "\\dot{x}(t)=u\\cos\\theta\\cdot e^{-kt/m}",
    },
    {
      title: "Find terminal speed from the vertical equation",
      questionLatex:
        "m\\ddot{y}=-mg-k\\dot{y}\\;(\\text{up positive}).\\;\\text{Find the terminal speed.}",
      steps: [
        {
          explanation: "At terminal speed, vertical acceleration is zero.",
          latex: "0=-mg-k\\dot{y}_T\\implies \\dot{y}_T=-\\frac{mg}{k}",
        },
        {
          explanation: "The negative sign means downward. Terminal speed is mg/k.",
          latex: "\\text{Terminal speed}=\\frac{mg}{k}",
        },
      ],
      finalAnswerLatex: "\\text{Terminal speed}=\\frac{mg}{k}\\;(\\text{downward})",
    },
  ],
  guidedPractice: [
    mechChoice(
      "y12e2-proj-g1",
      "In 2D projectile motion with air resistance, the horizontal and vertical equations are:",
      "A",
      [
        "Independent (decoupled)",
        "Coupled and must be solved together",
        "Identical",
        "Both equal to zero",
      ],
      "With linear resistance, the horizontal and vertical components are decoupled — each involves only its own velocity component.",
      "Check whether ẋ appears in the vertical equation or vice versa."
    ),
    mechTyped(
      "y12e2-proj-g2",
      "Write the horizontal equation of motion with resistance $k$ (up and right positive).",
      "m\\ddot{x}=\\,?",
      "m*x''=-k*x'",
      ["-k·ẋ", "m(d²x/dt²) = -k(dx/dt)"],
      "mẍ = −kẋ. The only horizontal force is the horizontal resistance −kẋ.",
      "The resistance opposes horizontal velocity ẋ."
    ),
    mechChoice(
      "y12e2-proj-g3",
      "The horizontal velocity $\\dot{x}(t)=u\\cos\\theta\\cdot e^{-kt/m}$ shows that horizontal speed:",
      "B",
      [
        "Increases without bound",
        "Decays exponentially to zero",
        "Oscillates",
        "Stays constant",
      ],
      "The exponential $e^{−kt/m}$ → 0 as t → ∞, so horizontal speed decreases to zero.",
      "Evaluate the limit of the exponential as t → ∞."
    ),
    mechTyped(
      "y12e2-proj-g4",
      "At terminal speed in vertical resisted motion (up positive), $\\ddot{y}=0$. What is $\\dot{y}_T$?",
      "0=-mg-k\\dot{y}_T",
      "-mg/k",
      ["−mg/k"],
      "0 = −mg − kẏ_T, so ẏ_T = −mg/k. Negative means downward.",
      "Set ÿ = 0 and solve for ẏ_T."
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-proj-i1",
      "For the horizontal equation $\\dot{x}(t)=u\\cos\\theta\\cdot e^{-kt/m}$, find $\\dot{x}$ at $t=0$.",
      "\\dot{x}(t)=u\\cos\\theta\\cdot e^{-kt/m},\\quad t=0",
      "u*cos(theta)",
      ["u cos θ", "u·cos(θ)"],
      "e^0 = 1, so ẋ(0) = u cos θ. This is the initial horizontal velocity.",
      "Substitute t = 0 into the solution."
    ),
    mechChoice(
      "y12e2-proj-i2",
      "The vertical equation $m\\ddot{y}=-mg-k\\dot{y}$ can be rewritten as $\\frac{d\\dot{y}}{dt}=-\\frac{k}{m}\\left(\\dot{y}+\\frac{mg}{k}\\right)$. If $w=\\dot{y}+\\frac{mg}{k}$, then $\\frac{dw}{dt}=$",
      "A",
      [
        "$-\\dfrac{k}{m}w$",
        "$mg-kw$",
        "$-mg$",
        "$\\dfrac{k}{m}w$",
      ],
      "dw/dt = dẏ/dt = −(k/m)(ẏ + mg/k) = −(k/m)w.",
      "Substitute w = ẏ + mg/k into the vertical ODE."
    ),
    mechTyped(
      "y12e2-proj-i3",
      "Solve $\\frac{dw}{dt}=-\\frac{k}{m}w$ with $w(0)=w_0$ to find $w(t)$.",
      "\\frac{dw}{dt}=-\\frac{k}{m}w,\\;w(0)=w_0",
      "w0*e^{-kt/m}",
      ["w₀e^{−kt/m}", "w_0·e^{-kt/m}"],
      "This is the same form as horizontal resisted motion: w = w₀$e^{−kt/m}$.",
      "Apply the standard result for first-order linear ODEs."
    ),
    mechTyped(
      "y12e2-proj-i4",
      "Given $w=\\dot{y}+\\frac{mg}{k}$ and $w(t)=w_0 e^{-kt/m}$, write $\\dot{y}(t)$.",
      "w=\\dot{y}+\\frac{mg}{k},\\quad w(t)=w_0 e^{-kt/m}",
      "w0*e^{-kt/m} - mg/k",
      ["w₀e^{−kt/m} − mg/k"],
      "ẏ = w − mg/k = w₀e^{−kt/m} − mg/k.",
      "Substitute w(t) and rearrange for ẏ."
    ),
    mechTyped(
      "y12e2-proj-i5",
      "If $\\dot{y}(0)=u\\sin\\theta$ (upward launch), find $w_0=\\dot{y}(0)+\\frac{mg}{k}$.",
      "\\dot{y}(0)=u\\sin\\theta",
      "u*sin(theta)+mg/k",
      ["u sin θ + mg/k", "u·sin(θ) + mg/k"],
      "w₀ = u sin θ + mg/k.",
      "Substitute ẏ(0) = u sin θ."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the same sign convention inconsistently.",
      fix: "Fix a sign convention at the start (e.g., upward and rightward positive) and keep it throughout both equations.",
    },
    {
      mistake: "Applying vertical terminal velocity to horizontal motion.",
      fix: "Horizontal speed decays to zero (no gravity horizontally). Only vertical motion has a non-zero terminal speed mg/k.",
    },
    {
      mistake: "Forgetting the substitution w = ẏ + mg/k when solving the vertical ODE.",
      fix: "The substitution w = ẏ + mg/k transforms the vertical ODE into the standard form dw/dt = −(k/m)w, which has the exponential solution.",
    },
    {
      mistake: "Confusing ẏ_T = −mg/k with the terminal speed.",
      fix: "ẏ_T = −mg/k is the terminal velocity (negative means downward). The terminal speed is |ẏ_T| = mg/k, always positive.",
    },
  ],
  masteryQuiz: [
    mechChoice(
      "y12e2-proj-m1",
      "In 2D projectile motion with linear air resistance, the horizontal equation is:",
      "A",
      [
        "$m\\ddot{x}=-k\\dot{x}$",
        "$m\\ddot{x}=-mg$",
        "$m\\ddot{x}=k\\dot{x}$",
        "$m\\ddot{x}=-k\\dot{x}-mg$",
      ],
      "Horizontally, only resistance acts: mẍ = −kẋ. There is no vertical force component horizontally."
    ),
    mechChoice(
      "y12e2-proj-m2",
      "The vertical equation of motion (up positive) with air resistance is:",
      "B",
      [
        "$m\\ddot{y}=-k\\dot{y}$",
        "$m\\ddot{y}=-mg-k\\dot{y}$",
        "$m\\ddot{y}=mg-k\\dot{y}$",
        "$m\\ddot{y}=-mg+k\\dot{y}$",
      ],
      "With up positive: gravity acts downward (−mg) and resistance opposes ẏ (−kẏ). So mÿ = −mg − kẏ.",
      "Both forces (gravity and resistance) are in the downward direction when the particle moves up."
    ),
    mechTyped(
      "y12e2-proj-m3",
      "For horizontal velocity $\\dot{x}=u\\cos\\theta\\cdot e^{-kt/m}$, as $t\\to\\infty$:",
      "\\lim_{t\\to\\infty}\\dot{x}",
      "0",
      [],
      "$e^{−kt/m}$ → 0, so ẋ → 0. Horizontal speed decays to zero.",
      "Take the limit as t → ∞."
    ),
    mechTyped(
      "y12e2-proj-m4",
      "If $\\dot{y}(t)=\\left(u\\sin\\theta+\\frac{mg}{k}\\right)e^{-kt/m}-\\frac{mg}{k}$, find $\\dot{y}(0)$.",
      "\\dot{y}(t)=\\left(u\\sin\\theta+\\frac{mg}{k}\\right)e^{-kt/m}-\\frac{mg}{k},\\quad t=0",
      "u*sin(theta)",
      ["u sin θ", "u·sin(θ)"],
      "ẏ(0) = u sin θ + mg/k − mg/k = u sin θ. ✓",
      "Substitute t = 0 and simplify."
    ),
    mechChoice(
      "y12e2-proj-m5",
      "Terminal downward speed in vertical resisted motion equals:",
      "A",
      ["$mg/k$", "$mk/g$", "$gk/m$", "$m/(gk)$"],
      "At terminal speed: |ẏ_T| = mg/k."
    ),
    mechChoice(
      "y12e2-proj-m6",
      "The substitution $w=\\dot{y}+mg/k$ is used because:",
      "C",
      [
        "It removes gravity from the problem",
        "It converts a 2nd order ODE to 1st order",
        "It transforms the vertical ODE into the separable form $dw/dt=-\\frac{k}{m}w$",
        "It eliminates the constant of integration",
      ],
      "The substitution converts mÿ = −mg − kẏ into dw/dt = −(k/m)w, which has a clean exponential solution.",
      "Check what form the equation takes after the substitution."
    ),
    mechTyped(
      "y12e2-proj-m7",
      "Solve $\\frac{dw}{dt}=-\\frac{k}{m}w$ to find $w(t)$ in terms of $w_0$.",
      "\\frac{dw}{w}=-\\frac{k}{m}\\,dt",
      "w0*e^{-kt/m}",
      ["w₀e^{−kt/m}", "w_0 e^{-kt/m}"],
      "Separate and integrate: ln w = −(k/m)t + C₁, so w = w₀$e^{−kt/m}$.",
      "Apply the standard first-order linear ODE result."
    ),
    mechTyped(
      "y12e2-proj-m8",
      "Given $w(t)=w_0 e^{-kt/m}$ and $w=\\dot{y}+mg/k$, what does $\\dot{y}(t)$ approach as $t\\to\\infty$?",
      "w(t)=w_0 e^{-kt/m},\\quad w=\\dot{y}+mg/k",
      "-mg/k",
      ["−mg/k"],
      "As t → ∞, $e^{−kt/m}$ → 0, so ẏ → 0 − mg/k = −mg/k. Downward at terminal speed mg/k.",
      "Take the limit as t → ∞."
    ),
    mechChoice(
      "y12e2-proj-m9",
      "Which statement about a projectile with air resistance versus without is TRUE?",
      "B",
      [
        "The trajectory is longer with air resistance",
        "The maximum height and range are both reduced by air resistance",
        "Air resistance has no effect on horizontal motion",
        "The particle reaches the same maximum height",
      ],
      "Air resistance acts against the motion, reducing both horizontal range and vertical reach compared to the no-resistance case.",
      "Think about how resistance affects both the horizontal and vertical components."
    ),
    mechTyped(
      "y12e2-proj-m10",
      "For horizontal motion $\\dot{x}=v_0 e^{-t}$ (with $k/m=1$, $v_0=10$), find $\\dot{x}$ at $t=\\ln2$.",
      "\\dot{x}=v_0 e^{-t},\\quad v_0=10,\\quad t=\\ln2",
      "5",
      [],
      "e^{−ln2} = 1/2. ẋ = 10 × 1/2 = 5.",
      "Substitute t = ln2 and simplify e^{−ln2}."
    ),
  ],
};

// ─── Lesson 6: Forces and Motion on Inclined Planes ──────────────────────────

const forcesInclinedPlanesLesson: Partial<ExplicitLesson> = {
  description:
    "Apply Newton's three laws of motion and F = ma to model forces as vectors, resolve weight into components along and perpendicular to a smooth inclined plane, and analyse simple pulley systems.",
  learningIntention:
    "Use Newton's laws and component resolution to find acceleration and tension in inclined plane and pulley problems.",
  successCriteria: [
    "State Newton's three laws of motion and apply F = ma to find acceleration.",
    "Identify all forces acting on a body (weight mg, normal reaction N, tension T).",
    "Resolve the weight component along a smooth incline as mg sinθ and perpendicular as mg cosθ.",
    "Find the acceleration of a body on a smooth inclined plane.",
    "Find the acceleration and tension in a simple smooth pulley system using Newton's 2nd law for each body.",
  ],
  teaching: {
    paragraphs: [
      "Newton's laws of motion: (1) A body remains at rest or moves at constant velocity unless a net force acts on it. (2) The net force equals mass times acceleration: F = ma. (3) Every action has an equal and opposite reaction.",
      "Forces are vector quantities. On a body of mass m, the weight mg acts vertically downward; the normal reaction N acts perpendicular to the surface; tension T acts along a string.",
      "Resolving on an inclined plane at angle θ: the weight mg resolves into mg sinθ along the slope (down) and mg cosθ perpendicular to the slope. On a smooth (frictionless) surface, N = mg cosθ and the net force along the slope is mg sinθ, giving acceleration a = g sinθ.",
      "Pulley system: two masses M > m connected over a smooth pulley by a light inextensible string. Applying F = ma to each mass separately: Mg − T = Ma and T − mg = ma. Adding: (M − m)g = (M + m)a, so a = (M − m)g/(M + m). Tension: T = 2Mmg/(M + m).",
    ],
    latexBlocks: [
      "F = ma\\quad\\text{(Newton's 2nd law)}",
      "\\text{Inclined plane (smooth):}\\quad a=g\\sin\\theta,\\quad N=mg\\cos\\theta",
      "\\text{Pulley (}M>m\\text{)}:\\quad a=\\frac{(M-m)g}{M+m},\\quad T=\\frac{2Mmg}{M+m}",
    ],
  },
  workedExamples: [
    {
      title: "Acceleration on a smooth inclined plane",
      questionLatex: "\\text{A 4 kg block is on a smooth plane inclined at }30°.\\text{ Find the acceleration down the slope.}",
      steps: [
        { explanation: "The net force along the slope is the component of weight along the slope.", latex: "F=mg\\sin30°=4\\times10\\times\\tfrac{1}{2}=20\\text{ N}" },
        { explanation: "Apply F = ma.", latex: "a=\\frac{F}{m}=\\frac{20}{4}=5\\text{ m/s}^2" },
      ],
      finalAnswerLatex: "a = 5\\text{ m/s}^2\\text{ down the slope}",
    },
    {
      title: "Smooth pulley — acceleration and tension",
      questionLatex: "\\text{Masses }M=6\\text{ kg and }m=4\\text{ kg are connected over a smooth pulley. Find }a\\text{ and }T.\\text{ (Use }g=10.)",
      steps: [
        { explanation: "Apply Newton's 2nd law to each mass.", latex: "6g-T=6a\\quad\\text{and}\\quad T-4g=4a" },
        { explanation: "Add the equations.", latex: "2g=10a\\implies a=2\\text{ m/s}^2" },
        { explanation: "Find tension from the second equation.", latex: "T=4(a+g)=4(2+10)=48\\text{ N}" },
      ],
      finalAnswerLatex: "a=2\\text{ m/s}^2,\\quad T=48\\text{ N}",
    },
  ],
  guidedPractice: [
    mechChoice(
      "y12e2-fip-g1",
      "Newton's 2nd law states:",
      "A",
      ["F = ma", "F = m/a", "F = v/t", "a = m/F"],
      "Newton's 2nd law: the net force equals mass times acceleration, F = ma.",
      "Recall Newton's second law."
    ),
    mechTyped(
      "y12e2-fip-g2",
      "A net force of 30 N acts on a 5 kg mass. Find the acceleration.",
      "F=30\\text{ N},\\quad m=5\\text{ kg}",
      "6",
      [],
      "a = F/m = 30/5 = 6 m/s².",
      "Rearrange F = ma to a = F/m."
    ),
    mechChoice(
      "y12e2-fip-g3",
      "On a smooth inclined plane at angle θ, the component of weight along the slope (directed down the slope) is:",
      "A",
      ["mg sinθ", "mg cosθ", "mg tanθ", "mg"],
      "The component of weight along the slope is mg sinθ. The component perpendicular to the slope is mg cosθ.",
      "Draw a right triangle with the weight vector and resolve parallel and perpendicular to the slope.",
      smoothInclineThetaDiagram
    ),
    mechTyped(
      "y12e2-fip-g4",
      "Find the normal reaction N for a 10 kg block on a smooth plane inclined at 30°. Use g = 10.",
      "m=10\\text{ kg},\\quad \\theta=30^\\circ,\\quad g=10",
      "50*sqrt(3)",
      ["50√3", "86.6", "50\\sqrt{3}"],
      "N = mg cos30° = 10×10×(√3/2) = 50√3 ≈ 86.6 N.",
      "The normal reaction balances the perpendicular component of weight: N = mg cosθ.",
      smoothIncline30Diagram
    ),
  ],
  independentPractice: [
    mechTyped(
      "y12e2-fip-i1",
      "A 3 kg block is released from rest on a smooth incline at 30°. Find its acceleration (g = 10).",
      "m=3\\text{ kg},\\quad \\theta=30^\\circ,\\quad g=10",
      "5",
      [],
      "a = g sin30° = 10×0.5 = 5 m/s².",
      "Net force along slope = mg sinθ. Apply F = ma: a = g sinθ.",
      smoothIncline30Diagram
    ),
    mechTyped(
      "y12e2-fip-i2",
      "A 5 kg block sits on a smooth plane at 45°. Find N (normal reaction). Use g = 10.",
      "m=5\\text{ kg},\\quad \\theta=45^\\circ,\\quad g=10",
      "25*sqrt(2)",
      ["25√2", "35.4"],
      "N = 5×10×cos45° = 50×(1/√2) = 25√2 ≈ 35.4 N.",
      "N = mg cos45°.",
      smoothIncline45Diagram
    ),
    mechChoice(
      "y12e2-fip-i3",
      "For two masses M > m connected over a smooth pulley, the acceleration is:",
      "A",
      [
        "$\\dfrac{(M-m)g}{M+m}$",
        "$\\dfrac{(M+m)g}{M-m}$",
        "$\\dfrac{Mg}{M+m}$",
        "$\\dfrac{mg}{M+m}$",
      ],
      "Adding Newton's 2nd law equations for both masses: (M−m)g = (M+m)a, so a = (M−m)g/(M+m).",
      "Write F=ma for each mass and add the equations."
    ),
    mechTyped(
      "y12e2-fip-i4",
      "Masses M = 8 kg and m = 2 kg are connected over a smooth pulley (g = 10). Find the acceleration.",
      "M=8\\text{ kg},\\quad m=2\\text{ kg},\\quad g=10",
      "6",
      [],
      "a = (8−2)×10/(8+2) = 60/10 = 6 m/s².",
      "Apply a = (M−m)g/(M+m)."
    ),
    mechTyped(
      "y12e2-fip-i5",
      "For M = 8 kg, m = 2 kg over a smooth pulley with a = 6 m/s², find the tension T in the string. (Use m·a = T − mg with g = 10.)",
      "m=2\\text{ kg},\\quad a=6\\text{ m/s}^2,\\quad g=10",
      "32",
      [],
      "T = m(a+g) = 2×(6+10) = 2×16 = 32 N.",
      "Apply F = ma to the lighter mass: T − mg = ma → T = m(a+g)."
    ),
  ],
  masteryQuiz: [
    mechChoice(
      "y12e2-fip-m1",
      "Newton's 3rd law states:",
      "A",
      [
        "Every action has an equal and opposite reaction",
        "F = ma",
        "A body moves at constant velocity if no net force acts",
        "Force equals momentum divided by time",
      ],
      "Newton's 3rd law: for every action there is an equal and opposite reaction.",
      "Recall the statement of Newton's 3rd law."
    ),
    mechTyped(
      "y12e2-fip-m2",
      "A force of 42 N acts on a 6 kg mass. Find the acceleration.",
      "F=42\\text{ N},\\quad m=6\\text{ kg}",
      "7",
      [],
      "a = 42/6 = 7 m/s²."
    ),
    mechChoice(
      "y12e2-fip-m3",
      "On a smooth inclined plane, which forces act on the block?",
      "A",
      [
        "Weight mg downward and normal reaction N perpendicular to the surface",
        "Weight mg along the slope and N upward",
        "Only weight mg",
        "Weight mg and friction up the slope",
      ],
      "On a smooth (frictionless) inclined plane: weight mg acts vertically downward and normal reaction N acts perpendicular to the surface. No friction.",
      "Smooth means frictionless. Identify all forces on the block."
    ),
    mechTyped(
      "y12e2-fip-m4",
      "A 2 kg block is on a smooth plane at 60°. Find the acceleration down the slope (g = 10).",
      "m=2\\text{ kg},\\quad \\theta=60^\\circ,\\quad g=10",
      "5*sqrt(3)",
      ["5√3", "8.66"],
      "a = g sin60° = 10×(√3/2) = 5√3 ≈ 8.66 m/s².",
      "a = g sinθ for a smooth inclined plane.",
      smoothIncline60Diagram
    ),
    mechTyped(
      "y12e2-fip-m5",
      "Masses M = 7 kg and m = 3 kg over a smooth pulley (g = 10). Find acceleration.",
      "M=7\\text{ kg},\\quad m=3\\text{ kg},\\quad g=10",
      "4",
      [],
      "a = (4×10)/10 = 4 m/s²."
    ),
    mechTyped(
      "y12e2-fip-m6",
      "For M = 7 kg, m = 3 kg, a = 4 m/s² (g = 10). Find tension T using the lighter mass.",
      "m=3\\text{ kg},\\quad a=4\\text{ m/s}^2,\\quad g=10",
      "42",
      [],
      "T = 3×(4+10) = 3×14 = 42 N.",
      "Apply F=ma to the lighter mass: T−mg = ma → T = m(a+g)."
    ),
    mechChoice(
      "y12e2-fip-m7",
      "On a smooth horizontal surface, a horizontal force F acts on mass m. The normal reaction N equals:",
      "B",
      ["$F$", "$mg$", "$\\sqrt{F^2+(mg)^2}$", "$F/m$"],
      "On a horizontal surface, the normal reaction N balances gravity: N = mg. The horizontal force F causes horizontal acceleration; it does not affect N.",
      "Resolve vertically: N − mg = 0 (no vertical acceleration on a horizontal surface)."
    ),
    mechTyped(
      "y12e2-fip-m8",
      "A block is on a smooth incline at angle θ = sin⁻¹(3/5). Find its acceleration (g = 10).",
      "\\sin\\theta=\\frac{3}{5},\\quad g=10",
      "6",
      [],
      "sinθ = 3/5. a = 10×(3/5) = 6 m/s².",
      "Apply a = g sinθ once you identify the slope angle.",
      smoothInclineThetaDiagram
    ),
    mechTyped(
      "y12e2-fip-m9",
      "Two masses 5 kg and 5 kg are connected over a smooth pulley. Find the acceleration.",
      "M=5\\text{ kg},\\quad m=5\\text{ kg}",
      "0",
      [],
      "a = 0×g/10 = 0. Equal masses → no acceleration; the system is in equilibrium.",
      "Apply a = (M−m)g/(M+m). When M = m, numerator is zero."
    ),
    mechChoice(
      "y12e2-fip-m10",
      "Increasing θ (the angle of a smooth incline) while keeping mass constant:",
      "A",
      [
        "Increases the acceleration (since a = g sinθ increases with θ)",
        "Decreases the acceleration",
        "Has no effect on acceleration",
        "Increases N and decreases acceleration",
      ],
      "a = g sinθ. As θ increases from 0° to 90°, sinθ increases from 0 to 1, so acceleration increases.",
      "Recall a = g sinθ and consider how sinθ changes with θ."
    ),
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────

export function year12Extension2MechanicsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-2") return undefined;
  if (unit.slug !== "mechanics") return undefined;

  const base = { masteryPassMark: 0.8 };

  switch (lesson.slug) {
    case "forces-inclined-planes":
      return { ...base, ...forcesInclinedPlanesLesson };
    case "rectilinear-motion-calculus":
      return { ...base, ...rectilinearMotionLesson };
    case "simple-harmonic-motion-extended":
      return { ...base, ...shmExtendedLesson };
    case "circular-motion-uniform":
      return { ...base, ...circularMotionLesson };
    case "resisted-motion":
      return { ...base, ...resistedMotionLesson };
    case "projectile-motion-resistance":
      return { ...base, ...projectileMotionResistanceLesson };
    default:
      return undefined;
  }
}
