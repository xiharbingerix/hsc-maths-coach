import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function projChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Identify the relevant component or formula before selecting an answer."
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
    hint,
    explanation,
  };
}

function projTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Resolve the initial velocity into horizontal and vertical components, then substitute."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint,
    explanation,
  };
}

// ─── Lesson 1: Setting Up Projectile Equations ───────────────────────────────

const projectileEquationsSetup: Partial<ExplicitLesson> = {
  description:
    "Set up the parametric equations for a projectile launched at a given speed and angle, and evaluate position and velocity components at any time.",
  learningIntention:
    "Write the x(t) and y(t) equations for a projectile from its initial speed and launch angle, and calculate position or velocity at a given time.",
  successCriteria: [
    "Resolve initial speed V into horizontal component V·cosθ and vertical component V·sinθ.",
    "Write x(t) = Vt·cosθ for horizontal displacement (no air resistance).",
    "Write y(t) = Vt·sinθ − ½gt² for vertical displacement under gravity.",
    "Calculate x and y coordinates of a projectile at a given time t.",
    "Find horizontal and vertical velocity components at any time t.",
  ],
  teaching: {
    paragraphs: [
      "A projectile is launched into the air and moves under gravity alone. The key insight is that horizontal and vertical motions are independent: what happens vertically does not affect what happens horizontally, and vice versa.",
      "Horizontally, no force acts on the projectile (ignoring air resistance), so the horizontal velocity stays constant at V·cosθ for the entire flight. Multiplying by time gives the horizontal displacement: x(t) = Vt·cosθ.",
      "Vertically, gravity pulls the projectile downward at g = 10 m/s². The vertical velocity starts at V·sinθ and decreases by 10 each second. Position follows from integrating velocity: y(t) = Vt·sinθ − ½gt². The vertical velocity at time t is ẏ(t) = V·sinθ − gt.",
      "In HSC problems, take g = 10 m/s² and measure from the launch point, so x(0) = 0 and y(0) = 0. When the launch angle is given as a Pythagorean ratio (e.g. cosθ = 4/5, sinθ = 3/5), the arithmetic stays clean.",
    ],
    latexBlocks: [
      "x(t) = Vt\\cos\\theta",
      "y(t) = Vt\\sin\\theta - \\frac{1}{2}gt^2",
      "\\dot{x}(t) = V\\cos\\theta,\\quad \\dot{y}(t) = V\\sin\\theta - gt",
    ],
  },
  workedExamples: [
    {
      title: "Write position equations from a Pythagorean angle",
      questionLatex:
        "\\text{A projectile is launched at } V = 25 \\text{ m/s at angle } \\theta \\text{ where } \\cos\\theta = \\tfrac{4}{5}.\\text{ Write } x(t) \\text{ and } y(t).\\text{ Take } g = 10.",
      steps: [
        {
          explanation: "Find sinθ from cosθ = 4/5 using the Pythagorean identity.",
          latex: "\\sin\\theta = \\frac{3}{5}",
        },
        {
          explanation: "Write the horizontal equation using x = Vt·cosθ.",
          latex: "x(t) = 25 \\cdot \\frac{4}{5} \\cdot t = 20t",
        },
        {
          explanation: "Write the vertical equation using y = Vt·sinθ − 5t².",
          latex: "y(t) = 25 \\cdot \\frac{3}{5} \\cdot t - 5t^2 = 15t - 5t^2",
        },
      ],
      finalAnswerLatex: "x(t) = 20t,\\quad y(t) = 15t - 5t^2",
    },
    {
      title: "Find position at a given time",
      questionLatex:
        "\\text{Using } x(t) = 20t \\text{ and } y(t) = 15t - 5t^2 \\text{ from above, find the coordinates at } t = 2 \\text{ s.}",
      steps: [
        {
          explanation: "Substitute t = 2 into x(t).",
          latex: "x(2) = 20(2) = 40 \\text{ m}",
        },
        {
          explanation: "Substitute t = 2 into y(t).",
          latex: "y(2) = 15(2) - 5(4) = 30 - 20 = 10 \\text{ m}",
        },
      ],
      finalAnswerLatex: "(40,\\,10) \\text{ m}",
    },
    {
      title: "Find velocity components at a given time",
      questionLatex:
        "\\text{A projectile is launched at } V = 50 \\text{ m/s with } \\cos\\theta = \\tfrac{3}{5}.\\text{ Find velocity components at } t = 3 \\text{ s.}",
      steps: [
        {
          explanation: "The horizontal velocity is constant throughout.",
          latex: "\\dot{x} = 50 \\cdot \\frac{3}{5} = 30 \\text{ m/s}",
        },
        {
          explanation: "Find sinθ: since cosθ = 3/5, sinθ = 4/5.",
          latex: "\\dot{y}(3) = 50 \\cdot \\frac{4}{5} - 10(3) = 40 - 30 = 10 \\text{ m/s}",
        },
      ],
      finalAnswerLatex: "\\dot{x} = 30 \\text{ m/s},\\quad \\dot{y}(3) = 10 \\text{ m/s}",
    },
  ],
  guidedPractice: [
    projChoice(
      "y12e1-proj-setup-g1",
      "A projectile is launched at speed $V$ at angle $\\theta$. Which expression gives the horizontal position at time $t$?",
      "A",
      [
        "$Vt\\cos\\theta$",
        "$Vt\\sin\\theta$",
        "$Vt\\cos\\theta - \\frac{1}{2}gt^2$",
        "$V\\cos\\theta - gt$",
      ],
      "Horizontal position = constant horizontal velocity × time = Vt·cosθ (no horizontal acceleration)."
    ),
    projTyped(
      "y12e1-proj-setup-g2",
      "A projectile is launched at $V = 25$ m/s at angle $\\theta$ where $\\cos\\theta = \\frac{4}{5}$. Find the horizontal velocity component.",
      "\\dot{x} = V\\cos\\theta = 25 \\cdot \\frac{4}{5}",
      "20",
      ["20 m/s"],
      "Horizontal velocity = V·cosθ = 25 × 4/5 = 20 m/s. This stays constant throughout the flight."
    ),
    projTyped(
      "y12e1-proj-setup-g3",
      "A projectile has equations $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the $y$-coordinate at $t = 2$ s.",
      "y(2) = 15(2) - 5(2)^2",
      "10",
      ["10 m"],
      "y(2) = 15(2) - 5(4) = 30 - 20 = 10 m."
    ),
    projChoice(
      "y12e1-proj-setup-g4",
      "Which expression gives the vertical velocity $\\dot{y}$ at time $t$ for a projectile launched at speed $V$ and angle $\\theta$?",
      "D",
      [
        "$V\\cos\\theta$",
        "$V\\sin\\theta - \\frac{1}{2}gt^2$",
        "$Vt\\sin\\theta - gt$",
        "$V\\sin\\theta - gt$",
      ],
      "Vertical velocity = initial vertical velocity minus the effect of gravity: ẏ(t) = V·sinθ − gt."
    ),
  ],
  independentPractice: [
    projTyped(
      "y12e1-proj-setup-i1",
      "A projectile is launched at $V = 50$ m/s at angle $\\theta$ where $\\cos\\theta = \\frac{3}{5}$. Find the $x$-coordinate at $t = 3$ s.",
      "x(t) = 50 \\cdot \\frac{3}{5} \\cdot t = 30t",
      "90",
      ["90 m"],
      "Horizontal velocity = 50 × 3/5 = 30 m/s. x(3) = 30 × 3 = 90 m."
    ),
    projTyped(
      "y12e1-proj-setup-i2",
      "A projectile is launched at $V = 50$ m/s at angle $\\theta$ where $\\sin\\theta = \\frac{4}{5}$. Find the $y$-coordinate at $t = 2$ s. Use $g = 10$.",
      "y(t) = 50 \\cdot \\frac{4}{5} \\cdot t - 5t^2 = 40t - 5t^2",
      "60",
      ["60 m"],
      "y(t) = 40t - 5t². At t = 2: y(2) = 80 - 20 = 60 m."
    ),
    projChoice(
      "y12e1-proj-setup-i3",
      "Why is the horizontal velocity of a projectile constant throughout its flight?",
      "B",
      [
        "Gravity acts horizontally as well as vertically",
        "No horizontal force acts on the projectile (ignoring air resistance)",
        "The angle of projection is constant",
        "The initial speed is constant",
      ],
      "With no horizontal force (Newton's first law), horizontal velocity stays at its initial value V·cosθ."
    ),
    projChoice(
      "y12e1-proj-setup-i4",
      "A projectile is launched at $V = 25$ m/s with $\\cos\\theta = \\frac{4}{5}$ and $\\sin\\theta = \\frac{3}{5}$. Which equation is $y(t)$?",
      "C",
      [
        "$20t - 5t^2$",
        "$20t - 10t^2$",
        "$15t - 5t^2$",
        "$15t - 10t^2$",
      ],
      "y(t) = V·sinθ·t − 5t² = 25 × (3/5) × t − 5t² = 15t − 5t²."
    ),
    projTyped(
      "y12e1-proj-setup-i5",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{3}{5}$. Find the vertical velocity at $t = 1$ s. Use $g = 10$.",
      "\\dot{y}(t) = V\\sin\\theta - gt = 15 - 10t",
      "5",
      ["5 m/s"],
      "ẏ(t) = 25 × (3/5) − 10t = 15 − 10t. At t = 1: ẏ(1) = 15 − 10 = 5 m/s."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using sinθ for the horizontal component instead of cosθ.",
      fix: "Horizontal = cosθ (adjacent side); vertical = sinθ (opposite side). Draw the right triangle if unsure.",
    },
    {
      mistake: "Applying the −½gt² term to the horizontal equation.",
      fix: "Gravity only acts vertically. The horizontal equation is x = Vt·cosθ — no gravity term.",
    },
    {
      mistake: "Using g = 9.8 when the question expects g = 10.",
      fix: "In NSW HSC extension problems, use g = 10 m/s² unless the question explicitly states otherwise.",
    },
    {
      mistake: "Forgetting to differentiate y(t) to find vertical velocity.",
      fix: "ẏ(t) = V·sinθ − gt. This is the derivative of y(t) = Vt·sinθ − ½gt², not y(t) itself.",
    },
  ],
  masteryQuiz: [
    projTyped(
      "y12e1-proj-setup-m1",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{3}{5}$. Find the $x$-coordinate at $t = 4$ s.",
      "x(t) = 30t",
      "120",
      ["120 m"],
      "Horizontal velocity = 50 × 3/5 = 30 m/s. x(4) = 30 × 4 = 120 m."
    ),
    projTyped(
      "y12e1-proj-setup-m2",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{4}{5}$. Find the $y$-coordinate at $t = 3$ s. Use $g = 10$.",
      "y(t) = 40t - 5t^2,\\quad t = 3",
      "75",
      ["75 m"],
      "y(t) = 40t − 5t². At t = 3: y(3) = 120 − 45 = 75 m."
    ),
    projChoice(
      "y12e1-proj-setup-m3",
      "Which equation correctly gives the vertical displacement of a projectile at time $t$?",
      "B",
      [
        "$y(t) = Vt\\cos\\theta - \\frac{1}{2}gt^2$",
        "$y(t) = Vt\\sin\\theta - \\frac{1}{2}gt^2$",
        "$y(t) = Vt\\sin\\theta + \\frac{1}{2}gt^2$",
        "$y(t) = V\\sin\\theta - gt$",
      ],
      "Vertical displacement = initial vertical velocity × t − ½gt². The initial vertical velocity is V·sinθ, not V·cosθ."
    ),
    projChoice(
      "y12e1-proj-setup-m4",
      "A projectile is launched at $V = 25$ m/s with $\\cos\\theta = \\frac{4}{5}$. What is the horizontal velocity throughout the flight?",
      "C",
      ["$25$ m/s", "$15$ m/s", "$20$ m/s", "$10$ m/s"],
      "Horizontal velocity = V·cosθ = 25 × 4/5 = 20 m/s. It stays constant because no horizontal force acts."
    ),
    projTyped(
      "y12e1-proj-setup-m5",
      "A projectile has equations $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the $x$-coordinate at $t = 5$ s.",
      "x(t) = 20t,\\quad t = 5",
      "100",
      ["100 m"],
      "x(5) = 20 × 5 = 100 m."
    ),
    projChoice(
      "y12e1-proj-setup-m6",
      "What is the vertical velocity of a projectile at the moment of launch?",
      "A",
      [
        "$V\\sin\\theta$",
        "$V\\cos\\theta$",
        "$V\\sin\\theta - g$",
        "$0$",
      ],
      "At t = 0: ẏ(0) = V·sinθ − g(0) = V·sinθ. The full weight of the initial speed's vertical component."
    ),
    projTyped(
      "y12e1-proj-setup-m7",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{4}{5}$. Find the vertical velocity at $t = 2$ s. Use $g = 10$.",
      "\\dot{y}(t) = 40 - 10t,\\quad t = 2",
      "20",
      ["20 m/s"],
      "ẏ(t) = 50 × (4/5) − 10t = 40 − 10t. At t = 2: ẏ(2) = 40 − 20 = 20 m/s."
    ),
    projChoice(
      "y12e1-proj-setup-m8",
      "What value of $g$ is used in NSW HSC Extension 1 projectile problems unless stated otherwise?",
      "B",
      ["$9.8$ m/s$^2$", "$10$ m/s$^2$", "$9.81$ m/s$^2$", "$10.8$ m/s$^2$"],
      "The NSW HSC convention for Extension 1 is g = 10 m/s² unless the question specifies otherwise."
    ),
    projTyped(
      "y12e1-proj-setup-m9",
      "A projectile has equations $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the $y$-coordinate at $t = 1$ s.",
      "y(1) = 15(1) - 5(1)^2",
      "10",
      ["10 m"],
      "y(1) = 15 − 5 = 10 m."
    ),
    projChoice(
      "y12e1-proj-setup-m10",
      "Which pair of equations correctly describes a projectile launched at $V = 50$ m/s with $\\cos\\theta = \\frac{3}{5}$ and $\\sin\\theta = \\frac{4}{5}$?",
      "D",
      [
        "$x = 40t,\\; y = 30t - 5t^2$",
        "$x = 30t,\\; y = 30t - 5t^2$",
        "$x = 40t,\\; y = 40t - 5t^2$",
        "$x = 30t,\\; y = 40t - 5t^2$",
      ],
      "Horizontal: 50 × 3/5 = 30, so x = 30t. Vertical: 50 × 4/5 = 40, so y = 40t − 5t²."
    ),
  ],
  masteryPassMark: 0.8,
};

export function year12Extension1ProjectileMotionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "projectile-motion") return undefined;

  switch (lesson.slug) {
    case "projectile-equations-setup":
      return {
        ...projectileEquationsSetup,
        id: "projectile-equations-setup",
        slug: "projectile-equations-setup",
        title: "Setting Up Projectile Equations",
      };
    default:
      return undefined;
  }
}
