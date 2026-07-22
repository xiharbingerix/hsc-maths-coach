import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function vmChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Differentiate each component separately: d/dt(x(t), y(t)) = (x'(t), y'(t)).",
    explanation,
  };
}

function vmTyped(
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
    hint: "Differentiate both components with respect to t to find the velocity vector.",
    explanation,
  };
}

// ─── Lesson 1: Vector Functions of Time ─────────────────────────────────────

const vectorsMotion2d: Partial<ExplicitLesson> = {
  description:
    "Represent the position of a moving point as a vector function of time r(t), differentiate to find the velocity and acceleration vectors, and calculate speed and direction of motion.",
  learningIntention:
    "Write the position of a moving point as r(t) = (x(t), y(t)), find velocity v(t) = r'(t) and acceleration a(t) = v'(t) by differentiating each component, and compute speed |v(t)|.",
  successCriteria: [
    "Write a position vector r(t) = (x(t), y(t)) for a point moving in 2D.",
    "Find the velocity vector v(t) = r'(t) = (x'(t), y'(t)) by differentiating each component.",
    "Find the acceleration vector a(t) = v'(t) = r''(t).",
    "Calculate the speed at time t as |v(t)| = √(x'(t)² + y'(t)²).",
    "Find the position vector at a specific time by substituting t into r(t).",
  ],
  teaching: {
    paragraphs: [
      "When a point moves in 2D, its position at time t is described by a vector function: **r**(t) = (x(t), y(t)). The two component functions x(t) and y(t) track the horizontal and vertical positions separately.",
      "Velocity is the rate of change of position. Since **r**(t) = (x(t), y(t)), we differentiate each component: **v**(t) = **r**'(t) = (x'(t), y'(t)). Similarly, acceleration is **a**(t) = **v**'(t) = (x''(t), y''(t)).",
      "Speed is the magnitude of the velocity vector: speed = |**v**(t)| = √(x'(t)² + y'(t)²). Direction of motion is the direction of **v**(t), which can be expressed as an angle using arctan(y'(t)/x'(t)).",
      "Integration reverses differentiation: if **v**(t) is known and **r**(0) is the initial position, then **r**(t) = **r**(0) + ∫₀ᵗ **v**(τ) dτ — integrating each component separately.",
    ],
    latexBlocks: [
      "\\mathbf{r}(t)=\\begin{pmatrix}x(t)\\\\y(t)\\end{pmatrix},\\quad\\mathbf{v}(t)=\\mathbf{r}'(t)=\\begin{pmatrix}x'(t)\\\\y'(t)\\end{pmatrix},\\quad\\mathbf{a}(t)=\\mathbf{v}'(t)=\\begin{pmatrix}x''(t)\\\\y''(t)\\end{pmatrix}",
      "\\text{speed}=|\\mathbf{v}(t)|=\\sqrt{(x'(t))^2+(y'(t))^2}",
    ],
  },
  workedExamples: [
    {
      title: "Find velocity, acceleration and speed from a position vector",
      questionLatex:
        "\\text{A particle has position }\\mathbf{r}(t)=\\begin{pmatrix}2t+1\\\\t^2-3\\end{pmatrix}.\\\\\\text{Find }\\mathbf{v}(t),\\;\\mathbf{a}(t),\\;\\text{and the speed at }t=2.",
      steps: [
        {
          explanation: "Differentiate each component to find the velocity vector.",
          latex: "\\mathbf{v}(t)=\\mathbf{r}'(t)=\\begin{pmatrix}2\\\\2t\\end{pmatrix}",
        },
        {
          explanation: "Differentiate again to find acceleration.",
          latex: "\\mathbf{a}(t)=\\mathbf{v}'(t)=\\begin{pmatrix}0\\\\2\\end{pmatrix}",
        },
        {
          explanation: "Substitute t = 2 into v(t) and find the magnitude.",
          latex:
            "\\mathbf{v}(2)=\\begin{pmatrix}2\\\\4\\end{pmatrix},\\quad|\\mathbf{v}(2)|=\\sqrt{4+16}=\\sqrt{20}=2\\sqrt{5}",
        },
      ],
      finalAnswerLatex:
        "\\mathbf{v}(t)=\\begin{pmatrix}2\\\\2t\\end{pmatrix},\\;\\mathbf{a}(t)=\\begin{pmatrix}0\\\\2\\end{pmatrix},\\;\\text{speed}=2\\sqrt{5}",
      cartesianGraph: {
        description: "Trajectory of r(t) = (2t + 1, t^2 - 3) for t from 0 to 3, beginning at (1, -3) and curving upward through the position (5, 1) at t = 2.",
        xMin: 0, xMax: 8, yMin: -4, yMax: 7,
        xAxisLabel: "x", yAxisLabel: "y",
        parabolas: [{ kind: "quadratic", a: 0.25, b: -0.5, c: -2.75, xMin: 1, xMax: 7, label: "r(t)" }],
        points: [{ x: 1, y: -3, label: "t = 0" }, { x: 5, y: 1, label: "t = 2" }],
      },
    },
    {
      title: "Find position from velocity by integration",
      questionLatex:
        "\\text{A particle has velocity }\\mathbf{v}(t)=\\begin{pmatrix}3\\\\4t-1\\end{pmatrix}\\text{ and initial position }\\mathbf{r}(0)=\\begin{pmatrix}1\\\\2\\end{pmatrix}.\\\\\\text{Find }\\mathbf{r}(t).",
      steps: [
        {
          explanation: "Integrate each component of v(t) with respect to t.",
          latex:
            "\\mathbf{r}(t)=\\begin{pmatrix}3t+C_1\\\\2t^2-t+C_2\\end{pmatrix}",
        },
        {
          explanation: "Apply the initial condition r(0) = (1, 2) to find the constants.",
          latex:
            "\\mathbf{r}(0)=\\begin{pmatrix}C_1\\\\C_2\\end{pmatrix}=\\begin{pmatrix}1\\\\2\\end{pmatrix}\\;\\Rightarrow\\;C_1=1,\\;C_2=2",
        },
      ],
      finalAnswerLatex:
        "\\mathbf{r}(t)=\\begin{pmatrix}3t+1\\\\2t^2-t+2\\end{pmatrix}",
    },
  ],
  guidedPractice: [
    vmChoice(
      "y12e1-vm-g1",
      "If r(t) = (x(t), y(t)), then v(t) = r'(t) equals:",
      "B",
      [
        "(x(t)·y(t), x(t)/y(t))",
        "(x'(t), y'(t))",
        "(|x(t)|, |y(t)|)",
        "(x(t)+y(t), 0)",
      ],
      "Differentiate each component separately: v(t) = (dx/dt, dy/dt)."
    ),
    vmTyped(
      "y12e1-vm-g2",
      "r(t) = (t², 3t). Find v(t).",
      "\\mathbf{r}(t)=\\begin{pmatrix}t^2\\\\3t\\end{pmatrix}",
      "(2t,3)",
      ["(2t, 3)", "2t,3"],
      "d/dt(t²) = 2t and d/dt(3t) = 3, so v(t) = (2t, 3)."
    ),
    vmTyped(
      "y12e1-vm-g3",
      "v(t) = (2, 2t). Find a(t).",
      "\\mathbf{v}(t)=\\begin{pmatrix}2\\\\2t\\end{pmatrix}",
      "(0,2)",
      ["(0, 2)", "0,2"],
      "d/dt(2) = 0 and d/dt(2t) = 2, so a(t) = (0, 2)."
    ),
    vmTyped(
      "y12e1-vm-g4",
      "r(t) = (2t+1, t²−3). Find |v(2)|.",
      "",
      "2sqrt(5)",
      ["2\\sqrt{5}", "√20", "\\sqrt{20}"],
      "|v(2)| = √(4 + 16) = √20 = 2√5."
    ),
  ],
  independentPractice: [
    vmTyped(
      "y12e1-vm-i1",
      "r(t) = (3t, t²). Find r(2).",
      "",
      "(6,4)",
      ["(6, 4)", "6,4"],
      "Substitute t = 2: (6, 4)."
    ),
    vmTyped(
      "y12e1-vm-i2",
      "r(t) = (3t, t²). Find v(t).",
      "\\mathbf{r}(t)=\\begin{pmatrix}3t\\\\t^2\\end{pmatrix}",
      "(3,2t)",
      ["(3, 2t)", "3,2t"],
      "d/dt(3t) = 3, d/dt(t²) = 2t. So v(t) = (3, 2t)."
    ),
    vmTyped(
      "y12e1-vm-i3",
      "v(t) = (4, 6t). Find a(t).",
      "\\mathbf{v}(t)=\\begin{pmatrix}4\\\\6t\\end{pmatrix}",
      "(0,6)",
      ["(0, 6)", "0,6"],
      "d/dt(4) = 0, d/dt(6t) = 6. So a(t) = (0, 6)."
    ),
    vmTyped(
      "y12e1-vm-i4",
      "r(t) = (cos t, sin t). Find v(t).",
      "\\mathbf{r}(t)=\\begin{pmatrix}\\cos t\\\\\\sin t\\end{pmatrix}",
      "(-sin t, cos t)",
      ["(-\\sin t,\\cos t)", "(-sint, cost)"],
      "d/dt(cos t) = −sin t, d/dt(sin t) = cos t. So v(t) = (−sin t, cos t)."
    ),
    vmChoice(
      "y12e1-vm-i5",
      "A particle moving under gravity has a(t) = (0, −10). This means:",
      "B",
      [
        "The particle moves in a circle.",
        "There is no horizontal acceleration and the vertical acceleration is 10 m/s² downward.",
        "The speed is constant.",
        "The particle returns to its starting point.",
      ],
      "a = (0, −10) means no change in horizontal velocity and a constant downward pull of 10 m/s² — this is uniform gravitational acceleration."
    ),
  ],
  masteryQuiz: [
    vmChoice(
      "y12e1-vm-m1",
      "r'(t) gives the particle's:",
      "C",
      ["Position", "Acceleration", "Velocity", "Speed only"],
      "r'(t) = v(t), the velocity vector. Speed is |v(t)| — a scalar."
    ),
    vmTyped(
      "y12e1-vm-m2",
      "r(t) = (2t², t+1). Find v(t).",
      "\\mathbf{r}(t)=\\begin{pmatrix}2t^2\\\\t+1\\end{pmatrix}",
      "(4t,1)",
      ["(4t, 1)", "4t,1"],
      "d/dt(2t²) = 4t, d/dt(t+1) = 1. So v(t) = (4t, 1)."
    ),
    vmTyped(
      "y12e1-vm-m3",
      "r(t) = (t², 4t). Find v(1).",
      "",
      "(2,4)",
      ["(2, 4)", "2,4"],
      "v(t) = (2t, 4). At t = 1: v(1) = (2, 4)."
    ),
    vmTyped(
      "y12e1-vm-m4",
      "v(t) = (3t, t²). Find a(t).",
      "\\mathbf{v}(t)=\\begin{pmatrix}3t\\\\t^2\\end{pmatrix}",
      "(3,2t)",
      ["(3, 2t)", "3,2t"],
      "d/dt(3t) = 3, d/dt(t²) = 2t. So a(t) = (3, 2t)."
    ),
    vmTyped(
      "y12e1-vm-m5",
      "r(t) = (3t, 4t). Find the speed (constant for all t).",
      "",
      "5",
      ["5 m/s"],
      "v(t) = (3, 4). Speed = √(9+16) = √25 = 5 (constant since neither component depends on t)."
    ),
    vmTyped(
      "y12e1-vm-m6",
      "v(t) = (2, 3) and r(0) = (1, 0). Find r(t).",
      "",
      "(1+2t,3t)",
      ["(2t+1, 3t)", "2t+1,3t"],
      "Integrate: r(t) = (1 + 2t, 0 + 3t) = (1+2t, 3t)."
    ),
    vmTyped(
      "y12e1-vm-m7",
      "r(t) = (t³, t²). Find a(t).",
      "",
      "(6t,2)",
      ["(6t, 2)", "6t,2"],
      "v(t) = (3t², 2t). a(t) = (6t, 2)."
    ),
    vmTyped(
      "y12e1-vm-m8",
      "r(t) = (t²+1, 2t). Find r(1).",
      "",
      "(2,2)",
      ["(2, 2)", "2,2"],
      "r(1) = (1+1, 2) = (2, 2)."
    ),
    vmTyped(
      "y12e1-vm-m9",
      "v(t) = (−sin t, cos t). Find v(0).",
      "",
      "(0,1)",
      ["(0, 1)", "0,1"],
      "sin 0 = 0, cos 0 = 1. So v(0) = (0, 1)."
    ),
    vmChoice(
      "y12e1-vm-m10",
      "The direction of motion of a particle at time t is given by:",
      "A",
      [
        "v(t)",
        "r(t)",
        "a(t)",
        "|v(t)|",
      ],
      "The velocity vector v(t) = r'(t) points in the direction of motion. Speed is |v(t)|, a scalar."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 2: Projectile Motion in Vector Form ──────────────────────────────

function ppTyped(
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
    hint: "Set up r(t) = (Vcosθ·t, Vsinθ·t − ½gt²). For max height, solve vy = 0. For landing, solve y = 0.",
    explanation,
  };
}

function ppChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Write r(t) = (Vcosθ·t, Vsinθ·t − ½gt²) and differentiate to get v(t) = (Vcosθ, Vsinθ − gt).",
    explanation,
  };
}

const vectorsProjectileParametric: Partial<ExplicitLesson> = {
  description:
    "Model projectile motion as a vector function r(t) = (Vcosθ·t, Vsinθ·t − ½gt²), differentiate to find the velocity vector, and use them to find time of flight, maximum height, range, impact velocity, and solve problems with unknown launch speed or angle.",
  learningIntention:
    "Set up projectile motion as r(t) = (Vcosθ·t, Vsinθ·t − ½gt²), find v(t) by differentiation, determine key quantities (max height, range, impact velocity), and solve problems where the launch speed or angle is unknown.",
  successCriteria: [
    "Write r(t) = (Vcosθ·t, Vsinθ·t − ½gt²) for a projectile launched at speed V and angle θ.",
    "Find v(t) = r'(t) = (Vcosθ, Vsinθ − gt) and identify the acceleration vector (0, −g).",
    "Find the time of maximum height by setting the vertical component of v(t) to zero.",
    "Find the time of flight by solving y(t) = 0 (for t > 0), then compute the range.",
    "Find the impact velocity vector and speed at landing.",
    "Given the range and launch speed, find the launch angle using sin2θ = Rg/V².",
  ],
  teaching: {
    paragraphs: [
      "Projectile motion is modelled by the position vector **r**(t) = (V cosθ · t, V sinθ · t − ½gt²), where V is the launch speed, θ is the angle above the horizontal, and g = 10 m/s². The horizontal position grows linearly while the vertical position traces a parabola.",
      "Differentiating gives the velocity vector: **v**(t) = **r**'(t) = (V cosθ, V sinθ − gt). The horizontal component is constant (no air resistance) and the vertical component decreases at rate g.",
      "Key quantities follow from setting components to zero. Maximum height: set the vertical velocity V sinθ − gt = 0 → t_max = V sinθ / g. Landing: set y(t) = 0 → t_flight = 2V sinθ / g (double t_max by symmetry). Range: R = V cosθ · t_flight = V² sin2θ / g.",
      "The impact velocity is **v**(t_flight). Its speed equals the launch speed (same by energy conservation with no air resistance). For unknown-angle problems, given R and V, use sin2θ = Rg/V² — this gives two solutions θ and 90°−θ (complementary angles give the same range).",
    ],
    latexBlocks: [
      "\\mathbf{r}(t)=\\begin{pmatrix}V\\cos\\theta\\cdot t\\\\V\\sin\\theta\\cdot t-\\tfrac{1}{2}gt^2\\end{pmatrix},\\quad\\mathbf{v}(t)=\\begin{pmatrix}V\\cos\\theta\\\\V\\sin\\theta-gt\\end{pmatrix}",
      "t_{\\max}=\\frac{V\\sin\\theta}{g},\\quad t_{\\text{flight}}=\\frac{2V\\sin\\theta}{g},\\quad R=\\frac{V^2\\sin 2\\theta}{g}",
      "\\text{Impact velocity: }\\mathbf{v}(t_{\\text{flight}})=(V\\cos\\theta,\\,-V\\sin\\theta)",
    ],
  },
  workedExamples: [
    {
      title: "Find time of flight, maximum height, range, and impact velocity",
      questionLatex:
        "\\text{A particle is projected at }V=20\\text{ m/s at }30°\\text{ to the horizontal (}g=10\\text{ m/s}^2\\text{).}\\\\\\text{Find the position vector }\\mathbf{r}(t)\\text{, velocity }\\mathbf{v}(t)\\text{, maximum height, time of flight, and range.}",
      steps: [
        {
          explanation: "Write r(t) using V = 20, θ = 30°: cos30° = √3/2, sin30° = 1/2.",
          latex:
            "\\mathbf{r}(t)=\\begin{pmatrix}20\\cdot\\tfrac{\\sqrt{3}}{2}\\cdot t\\\\20\\cdot\\tfrac{1}{2}\\cdot t-5t^2\\end{pmatrix}=\\begin{pmatrix}10\\sqrt{3}\\,t\\\\10t-5t^2\\end{pmatrix}",
        },
        {
          explanation: "Differentiate to get v(t).",
          latex:
            "\\mathbf{v}(t)=\\mathbf{r}'(t)=\\begin{pmatrix}10\\sqrt{3}\\\\10-10t\\end{pmatrix}",
        },
        {
          explanation: "Maximum height: set vertical velocity to zero.",
          latex:
            "10-10t=0\\;\\Rightarrow\\;t=1\\text{ s},\\quad y_{\\max}=10(1)-5(1)^2=5\\text{ m}",
        },
        {
          explanation: "Time of flight: set y(t) = 0 with t > 0.",
          latex:
            "10t-5t^2=0\\;\\Rightarrow\\;t(10-5t)=0\\;\\Rightarrow\\;t=2\\text{ s}",
        },
        {
          explanation: "Range: substitute t = 2 into x(t).",
          latex: "R=10\\sqrt{3}\\cdot 2=20\\sqrt{3}\\text{ m}",
        },
      ],
      finalAnswerLatex:
        "y_{\\max}=5\\text{ m},\\quad t_{\\text{flight}}=2\\text{ s},\\quad R=20\\sqrt{3}\\text{ m}",
      cartesianGraph: {
        description:
          "Trajectory of the projectile r(t) = (10√3·t, 10t − 5t²). The horizontal axis is x (range) and the vertical axis is y (height). The parabolic path rises to a maximum height of 5 m at t = 1 s (x = 10√3 ≈ 17.3 m), then returns to ground level at t = 2 s with range 20√3 ≈ 34.6 m. The trajectory is symmetric about the apex.",
        xMin: 0,
        xMax: 38,
        yMin: -0.5,
        yMax: 6,
        xStep: 5,
        yStep: 1,
        showGrid: true,
        xAxisLabel: "x (m)",
        yAxisLabel: "y (m)",
        lines: [{ kind: "linear", m: 0, b: 0, label: "ground" }],
        parabolas: [
          {
            kind: "quadratic",
            a: -1 / 60,
            b: 1 / Math.sqrt(3),
            c: 0,
            xMin: 0,
            xMax: 20 * Math.sqrt(3),
            label: "projectile path",
          },
        ],
        points: [
          { x: 0, y: 0, label: "launch" },
          { x: 17.3, y: 5, label: "max height (5 m)" },
          { x: 34.6, y: 0, label: "landing" },
        ],
      },
    },
    {
      title: "Impact velocity and unknown launch angle",
      questionLatex:
        "\\text{Using }V=20\\text{ m/s},\\;\\theta=30°,\\;g=10:\\\\\\text{(a) Find the impact velocity vector at landing.}\\\\\\text{(b) A different launch angle gives a range of }20\\sqrt{3}\\text{ m. Find both possible angles.}",
      steps: [
        {
          explanation: "Substitute t_flight = 2 into v(t) = (10√3, 10 − 10t).",
          latex:
            "\\mathbf{v}(2)=\\begin{pmatrix}10\\sqrt{3}\\\\10-20\\end{pmatrix}=\\begin{pmatrix}10\\sqrt{3}\\\\-10\\end{pmatrix}",
        },
        {
          explanation: "Find the speed at impact.",
          latex:
            "|\\mathbf{v}(2)|=\\sqrt{300+100}=\\sqrt{400}=20\\text{ m/s (same as launch speed)}",
        },
        {
          explanation: "For unknown angle: use R = V²sin2θ/g with V = 20, R = 20√3.",
          latex:
            "20\\sqrt{3}=\\frac{400\\sin 2\\theta}{10}=40\\sin 2\\theta\\;\\Rightarrow\\;\\sin 2\\theta=\\frac{\\sqrt{3}}{2}",
        },
        {
          explanation: "Solve sin2θ = √3/2 for θ in [0°, 90°].",
          latex:
            "2\\theta=60°\\text{ or }2\\theta=120°\\;\\Rightarrow\\;\\theta=30°\\text{ or }\\theta=60°",
        },
      ],
      finalAnswerLatex:
        "\\mathbf{v}(2)=(10\\sqrt{3},-10),\\quad\\theta=30°\\text{ or }60°",
    },
  ],
  guidedPractice: [
    ppChoice(
      "y12e1-pp-g1",
      "A projectile launched at speed V and angle θ (with g = 10) has position vector:",
      "A",
      [
        "r(t) = (Vcosθ·t, Vsinθ·t − 5t²)",
        "r(t) = (Vsinθ·t, Vcosθ·t − 5t²)",
        "r(t) = (Vcosθ, Vsinθ − 10t)",
        "r(t) = (t, Vt − gt)",
      ],
      "Horizontal: constant velocity Vcosθ. Vertical: initial velocity Vsinθ with acceleration −g = −10. So y(t) = Vsinθ·t − ½(10)t² = Vsinθ·t − 5t²."
    ),
    ppTyped(
      "y12e1-pp-g2",
      "r(t) = (10√3·t, 10t − 5t²). Find r(1).",
      "",
      "(10sqrt(3),5)",
      ["(10√3, 5)", "(17.3, 5)"],
      "r(1) = (10√3, 5). This is the highest point of the trajectory."
    ),
    ppTyped(
      "y12e1-pp-g3",
      "v(t) = (10√3, 10 − 10t). At what time is the vertical component of v zero?",
      "",
      "1",
      ["t=1", "1 s"],
      "10 − 10t = 0 → t = 1. This is the time of maximum height."
    ),
    ppTyped(
      "y12e1-pp-g4",
      "y(t) = 10t − 5t². Solve y(t) = 0 for t > 0 (the landing time).",
      "",
      "2",
      ["t=2", "2 s"],
      "t(10 − 5t) = 0 → t = 0 (launch) or t = 2 (landing)."
    ),
  ],
  independentPractice: [
    ppTyped(
      "y12e1-pp-i1",
      "r(t) = (10√3·t, 10t − 5t²). Find the range (x when t = 2).",
      "",
      "20sqrt(3)",
      ["20√3", "20\\sqrt{3}"],
      "x(2) = 20√3 m."
    ),
    ppTyped(
      "y12e1-pp-i2",
      "v(t) = (10√3, 10 − 10t). Find v(2).",
      "",
      "(10sqrt(3),-10)",
      ["(10√3, -10)", "(10\\sqrt{3},-10)"],
      "v(2) = (10√3, −10). The vertical component is negative — the projectile is moving downward."
    ),
    ppTyped(
      "y12e1-pp-i3",
      "Find the speed at impact: |v(2)| where v(2) = (10√3, −10).",
      "",
      "20",
      ["20 m/s"],
      "√400 = 20 m/s — same as the launch speed."
    ),
    ppChoice(
      "y12e1-pp-i4",
      "For V = 20 m/s and g = 10, the range formula R = V²sin2θ/g gives R = 40sin2θ. If R = 20, then sin2θ equals:",
      "B",
      ["1", "1/2", "√3/2", "√2/2"],
      "20 = 40sin2θ → sin2θ = 1/2."
    ),
    ppTyped(
      "y12e1-pp-i5",
      "sin2θ = 1/2 with θ ∈ [0°, 90°]. Find both possible values of θ.",
      "",
      "15° and 75°",
      ["15 and 75", "θ = 15° or 75°"],
      "2θ = 30° → θ = 15°, or 2θ = 150° → θ = 75°. Complementary angles give the same range."
    ),
  ],
  masteryQuiz: [
    ppChoice(
      "y12e1-pp-m1",
      "The acceleration vector for projectile motion (g = 10 m/s²) is:",
      "C",
      [
        "(10, 0)",
        "(0, 10)",
        "(0, −10)",
        "(−10, −10)",
      ],
      "Gravity acts downward only. a(t) = (0, −g) = (0, −10)."
    ),
    ppTyped(
      "y12e1-pp-m2",
      "r(t) = (8t, 6t − 5t²). Find r(1).",
      "",
      "(8,1)",
      ["(8, 1)", "8,1"],
      "r(1) = (8, 1)."
    ),
    ppTyped(
      "y12e1-pp-m3",
      "r(t) = (8t, 6t − 5t²). Find the time of maximum height.",
      "",
      "0.6",
      ["t=0.6", "3/5", "0.6 s"],
      "v_y = 6 − 10t = 0 → t = 0.6 s."
    ),
    ppTyped(
      "y12e1-pp-m4",
      "r(t) = (8t, 6t − 5t²). Find the maximum height.",
      "",
      "1.8",
      ["1.8 m", "9/5"],
      "y(0.6) = 3.6 − 1.8 = 1.8 m."
    ),
    ppTyped(
      "y12e1-pp-m5",
      "r(t) = (8t, 6t − 5t²). Find the time of flight.",
      "",
      "1.2",
      ["t=1.2", "6/5", "1.2 s"],
      "t = 6/5 = 1.2 s."
    ),
    ppTyped(
      "y12e1-pp-m6",
      "r(t) = (8t, 6t − 5t²). Find the range.",
      "",
      "9.6",
      ["9.6 m"],
      "Range = 8 × 1.2 = 9.6 m."
    ),
    ppTyped(
      "y12e1-pp-m7",
      "r(t) = (8t, 6t − 5t²). Find v(1.2).",
      "",
      "(8,-6)",
      ["(8, -6)", "8,-6"],
      "v(1.2) = (8, 6 − 12) = (8, −6)."
    ),
    ppTyped(
      "y12e1-pp-m8",
      "Find the impact speed |v(1.2)| where v(1.2) = (8, −6).",
      "",
      "10",
      ["10 m/s"],
      "√(64 + 36) = √100 = 10 m/s."
    ),
    ppChoice(
      "y12e1-pp-m9",
      "The impact velocity (8, −6) makes an angle below the horizontal equal to:",
      "B",
      [
        "30°",
        "arctan(3/4)",
        "45°",
        "arctan(4/3)",
      ],
      "tan α = 6/8 = 3/4, so α = arctan(3/4) ≈ 36.9° below horizontal. This equals the launch angle (symmetry with no air resistance)."
    ),
    ppTyped(
      "y12e1-pp-m10",
      "V = 10 m/s, g = 10 m/s², θ = 30°. Find the range.",
      "",
      "5sqrt(3)",
      ["5\\sqrt{3}", "5√3"],
      "R = 10·(√3/2) = 5√3 m."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "vectors-motion-2d": vectorsMotion2d,
  "vectors-projectile-parametric": vectorsProjectileParametric,
};

export function year12Extension1VectorsMotionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "vectors") return undefined;
  return lessons[lesson.slug];
}
