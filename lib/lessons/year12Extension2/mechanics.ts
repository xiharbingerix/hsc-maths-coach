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
  hint = "Identify the relevant formula or physical principle before selecting."
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
  };
}

function mechTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Identify the relevant formula, substitute the given values, then simplify."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

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
    ],
    latexBlocks: [
      "v = \\frac{dx}{dt},\\quad a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}",
      "\\text{Speed} = |v|\\quad(\\text{always }\\geq 0)",
      "\\text{If }a(t)\\text{ known: }v = \\int a\\,dt + C_1,\\quad x = \\int v\\,dt + C_2",
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
      "v = r\\omega,\\quad r = 4\\text{ m},\\; \\omega = 3\\text{ rad/s}",
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
      "a = r\\omega^2,\\quad r = 5\\text{ m},\\; \\omega = 4\\text{ rad/s}",
      "80",
      [],
      "a = rω² = 5 × 16 = 80 m/s².",
      "Apply a = rω²."
    ),
    mechTyped(
      "y12e2-circ-g4",
      "Find the period $T$ for an object with $\\omega = 2$ rad/s.",
      "T = \\frac{2\\pi}{\\omega},\\quad \\omega = 2\\text{ rad/s}",
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
      "a = v^2/r,\\quad v = 8\\text{ m/s},\\; r = 2\\text{ m}",
      "32",
      [],
      "a = v²/r = 64/2 = 32 m/s².",
      "Apply a = v²/r."
    ),
    mechTyped(
      "y12e2-circ-i2",
      "Given period $T = \\pi$ s, find angular velocity $\\omega$.",
      "T = \\pi\\text{ s},\\quad \\omega = \\frac{2\\pi}{T}",
      "2",
      [],
      "ω = 2π/T = 2π/π = 2 rad/s.",
      "Apply ω = 2π/T."
    ),
    mechTyped(
      "y12e2-circ-i3",
      "Find centripetal force for $m = 3$ kg, $r = 2$ m, $\\omega = 4$ rad/s.",
      "F = mr\\omega^2,\\quad m = 3\\text{ kg},\\; r = 2\\text{ m},\\; \\omega = 4\\text{ rad/s}",
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
      "v = r\\omega,\\quad r = 3\\text{ m},\\; \\omega = 6\\text{ rad/s}",
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
      "v = r\\omega,\\quad r = 2\\text{ m},\\; \\omega = 5\\text{ rad/s}",
      "10",
      [],
      "v = rω = 2 × 5 = 10 m/s.",
      "Apply v = rω."
    ),
    mechTyped(
      "y12e2-circ-m2",
      "Find centripetal acceleration for $r = 4$ m, $\\omega = 3$ rad/s.",
      "a = r\\omega^2,\\quad r = 4\\text{ m},\\; \\omega = 3\\text{ rad/s}",
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
      "a = v^2/r,\\quad v = 6\\text{ m/s},\\; r = 3\\text{ m}",
      "12",
      [],
      "a = v²/r = 36/3 = 12 m/s².",
      "Apply a = v²/r."
    ),
    mechTyped(
      "y12e2-circ-m5",
      "Find $\\omega$ for period $T = 4$ s.",
      "\\omega = \\frac{2\\pi}{T},\\quad T = 4\\text{ s}",
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
      "F = mv^2/r,\\quad m = 2\\text{ kg},\\; v = 5\\text{ m/s},\\; r = 2\\text{ m}",
      "25",
      [],
      "F = mv²/r = 2 × 25/2 = 25 N.",
      "Apply F = mv²/r."
    ),
    mechTyped(
      "y12e2-circ-m8",
      "Find speed for $r = 0.5$ m, $\\omega = 8$ rad/s.",
      "v = r\\omega,\\quad r = 0.5\\text{ m},\\; \\omega = 8\\text{ rad/s}",
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
    case "rectilinear-motion-calculus":
      return { ...base, ...rectilinearMotionLesson };
    case "simple-harmonic-motion-extended":
      return { ...base, ...shmExtendedLesson };
    case "circular-motion-uniform":
      return { ...base, ...circularMotionLesson };
    default:
      return undefined;
  }
}
