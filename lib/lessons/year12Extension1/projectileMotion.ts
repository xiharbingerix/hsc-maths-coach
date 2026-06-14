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

// â”€â”€â”€ Lesson 1: Setting Up Projectile Equations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const projectileEquationsSetup: Partial<ExplicitLesson> = {
  description:
    "Set up the parametric equations for a projectile launched at a given speed and angle, and evaluate position and velocity components at any time.",
  learningIntention:
    "Write the x(t) and y(t) equations for a projectile from its initial speed and launch angle, and calculate position or velocity at a given time.",
  successCriteria: [
    "Resolve initial speed V into horizontal component VÂ·cosÎ¸ and vertical component VÂ·sinÎ¸.",
    "Write x(t) = VtÂ·cosÎ¸ for horizontal displacement (no air resistance).",
    "Write y(t) = VtÂ·sinÎ¸ âˆ’ Â½gtÂ² for vertical displacement under gravity.",
    "Calculate x and y coordinates of a projectile at a given time t.",
    "Find horizontal and vertical velocity components at any time t.",
  ],
  teaching: {
    paragraphs: [
      "A projectile is launched into the air and moves under gravity alone. The key insight is that horizontal and vertical motions are independent: what happens vertically does not affect what happens horizontally, and vice versa.",
      "Horizontally, no force acts on the projectile (ignoring air resistance), so the horizontal velocity stays constant at VÂ·cosÎ¸ for the entire flight. Multiplying by time gives the horizontal displacement: x(t) = VtÂ·cosÎ¸.",
      "Vertically, gravity pulls the projectile downward at g = 10 m/sÂ². The vertical velocity starts at VÂ·sinÎ¸ and decreases by 10 each second. Position follows from integrating velocity: y(t) = VtÂ·sinÎ¸ âˆ’ Â½gtÂ². The vertical velocity at time t is áº(t) = VÂ·sinÎ¸ âˆ’ gt.",
      "In HSC problems, take g = 10 m/sÂ² and measure from the launch point, so x(0) = 0 and y(0) = 0. When the launch angle is given as a Pythagorean ratio (e.g. cosÎ¸ = 4/5, sinÎ¸ = 3/5), the arithmetic stays clean.",
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
          explanation: "Find sinÎ¸ from cosÎ¸ = 4/5 using the Pythagorean identity.",
          latex: "\\sin\\theta = \\frac{3}{5}",
        },
        {
          explanation: "Write the horizontal equation using x = VtÂ·cosÎ¸.",
          latex: "x(t) = 25 \\cdot \\frac{4}{5} \\cdot t = 20t",
        },
        {
          explanation: "Write the vertical equation using y = VtÂ·sinÎ¸ âˆ’ 5tÂ².",
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
          explanation: "Find sinÎ¸: since cosÎ¸ = 3/5, sinÎ¸ = 4/5.",
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
      "Horizontal position = constant horizontal velocity Ã— time = VtÂ·cosÎ¸ (no horizontal acceleration)."
    ),
    projTyped(
      "y12e1-proj-setup-g2",
      "A projectile is launched at $V = 25$ m/s at angle $\\theta$ where $\\cos\\theta = \\frac{4}{5}$. Find the horizontal velocity component.",
      "\\dot{x} = V\\cos\\theta = 25 \\cdot \\frac{4}{5}",
      "20",
      ["20 m/s"],
      "Horizontal velocity = VÂ·cosÎ¸ = 25 Ã— 4/5 = 20 m/s. This stays constant throughout the flight."
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
      "Vertical velocity = initial vertical velocity minus the effect of gravity: áº(t) = VÂ·sinÎ¸ âˆ’ gt."
    ),
  ],
  independentPractice: [
    projTyped(
      "y12e1-proj-setup-i1",
      "A projectile is launched at $V = 50$ m/s at angle $\\theta$ where $\\cos\\theta = \\frac{3}{5}$. Find the $x$-coordinate at $t = 3$ s.",
      "x(t) = 50 \\cdot \\frac{3}{5} \\cdot t = 30t",
      "90",
      ["90 m"],
      "Horizontal velocity = 50 Ã— 3/5 = 30 m/s. x(3) = 30 Ã— 3 = 90 m."
    ),
    projTyped(
      "y12e1-proj-setup-i2",
      "A projectile is launched at $V = 50$ m/s at angle $\\theta$ where $\\sin\\theta = \\frac{4}{5}$. Find the $y$-coordinate at $t = 2$ s. Use $g = 10$.",
      "y(t) = 50 \\cdot \\frac{4}{5} \\cdot t - 5t^2 = 40t - 5t^2",
      "60",
      ["60 m"],
      "y(t) = 40t - 5tÂ². At t = 2: y(2) = 80 - 20 = 60 m."
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
      "With no horizontal force (Newton's first law), horizontal velocity stays at its initial value VÂ·cosÎ¸."
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
      "y(t) = VÂ·sinÎ¸Â·t âˆ’ 5tÂ² = 25 Ã— (3/5) Ã— t âˆ’ 5tÂ² = 15t âˆ’ 5tÂ²."
    ),
    projTyped(
      "y12e1-proj-setup-i5",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{3}{5}$. Find the vertical velocity at $t = 1$ s. Use $g = 10$.",
      "\\dot{y}(t) = V\\sin\\theta - gt = 15 - 10t",
      "5",
      ["5 m/s"],
      "áº(t) = 25 Ã— (3/5) âˆ’ 10t = 15 âˆ’ 10t. At t = 1: áº(1) = 15 âˆ’ 10 = 5 m/s."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using sinÎ¸ for the horizontal component instead of cosÎ¸.",
      fix: "Horizontal = cosÎ¸ (adjacent side); vertical = sinÎ¸ (opposite side). Draw the right triangle if unsure.",
    },
    {
      mistake: "Applying the âˆ’Â½gtÂ² term to the horizontal equation.",
      fix: "Gravity only acts vertically. The horizontal equation is x = VtÂ·cosÎ¸ â€” no gravity term.",
    },
    {
      mistake: "Using g = 9.8 when the question expects g = 10.",
      fix: "In NSW HSC extension problems, use g = 10 m/sÂ² unless the question explicitly states otherwise.",
    },
    {
      mistake: "Forgetting to differentiate y(t) to find vertical velocity.",
      fix: "áº(t) = VÂ·sinÎ¸ âˆ’ gt. This is the derivative of y(t) = VtÂ·sinÎ¸ âˆ’ Â½gtÂ², not y(t) itself.",
    },
  ],
  masteryQuiz: [
    projTyped(
      "y12e1-proj-setup-m1",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{3}{5}$. Find the $x$-coordinate at $t = 4$ s.",
      "x(t) = 30t",
      "120",
      ["120 m"],
      "Horizontal velocity = 50 Ã— 3/5 = 30 m/s. x(4) = 30 Ã— 4 = 120 m."
    ),
    projTyped(
      "y12e1-proj-setup-m2",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{4}{5}$. Find the $y$-coordinate at $t = 3$ s. Use $g = 10$.",
      "y(t) = 40t - 5t^2,\\quad t = 3",
      "75",
      ["75 m"],
      "y(t) = 40t âˆ’ 5tÂ². At t = 3: y(3) = 120 âˆ’ 45 = 75 m."
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
      "Vertical displacement = initial vertical velocity Ã— t âˆ’ Â½gtÂ². The initial vertical velocity is VÂ·sinÎ¸, not VÂ·cosÎ¸."
    ),
    projChoice(
      "y12e1-proj-setup-m4",
      "A projectile is launched at $V = 25$ m/s with $\\cos\\theta = \\frac{4}{5}$. What is the horizontal velocity throughout the flight?",
      "C",
      ["$25$ m/s", "$15$ m/s", "$20$ m/s", "$10$ m/s"],
      "Horizontal velocity = VÂ·cosÎ¸ = 25 Ã— 4/5 = 20 m/s. It stays constant because no horizontal force acts."
    ),
    projTyped(
      "y12e1-proj-setup-m5",
      "A projectile has equations $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the $x$-coordinate at $t = 5$ s.",
      "x(t) = 20t,\\quad t = 5",
      "100",
      ["100 m"],
      "x(5) = 20 Ã— 5 = 100 m."
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
      "At t = 0: áº(0) = VÂ·sinÎ¸ âˆ’ g(0) = VÂ·sinÎ¸. The full weight of the initial speed's vertical component."
    ),
    projTyped(
      "y12e1-proj-setup-m7",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{4}{5}$. Find the vertical velocity at $t = 2$ s. Use $g = 10$.",
      "\\dot{y}(t) = 40 - 10t,\\quad t = 2",
      "20",
      ["20 m/s"],
      "áº(t) = 50 Ã— (4/5) âˆ’ 10t = 40 âˆ’ 10t. At t = 2: áº(2) = 40 âˆ’ 20 = 20 m/s."
    ),
    projChoice(
      "y12e1-proj-setup-m8",
      "What value of $g$ is used in NSW HSC Extension 1 projectile problems unless stated otherwise?",
      "B",
      ["$9.8$ m/s$^2$", "$10$ m/s$^2$", "$9.81$ m/s$^2$", "$10.8$ m/s$^2$"],
      "The NSW HSC convention for Extension 1 is g = 10 m/sÂ² unless the question specifies otherwise."
    ),
    projTyped(
      "y12e1-proj-setup-m9",
      "A projectile has equations $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the $y$-coordinate at $t = 1$ s.",
      "y(1) = 15(1) - 5(1)^2",
      "10",
      ["10 m"],
      "y(1) = 15 âˆ’ 5 = 10 m."
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
      "Horizontal: 50 Ã— 3/5 = 30, so x = 30t. Vertical: 50 Ã— 4/5 = 40, so y = 40t âˆ’ 5tÂ²."
    ),
  ],
  masteryPassMark: 0.8,
};

// â”€â”€â”€ Lesson 2: Maximum Height and Time â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const projectileMaxHeight: Partial<ExplicitLesson> = {
  description:
    "Find the time at which a projectile reaches maximum height by setting vertical velocity to zero, then calculate the maximum height by substituting that time into y(t).",
  learningIntention:
    "Find the time of maximum height and the maximum height itself for a projectile launched at a given speed and angle.",
  successCriteria: [
    "Identify that maximum height occurs when vertical velocity áº(t) = 0.",
    "Solve VÂ·sinÎ¸ âˆ’ gt = 0 to find the time of maximum height.",
    "Substitute that time into y(t) to find the maximum height.",
    "Interpret maximum height in context and check the answer is positive.",
  ],
  teaching: {
    paragraphs: [
      "A projectile rises, reaches a peak, then falls. At the very top of the trajectory, the vertical velocity is zero â€” the particle has stopped moving upward and is about to start moving downward. This is the key condition for finding maximum height.",
      "Set áº(t) = VÂ·sinÎ¸ âˆ’ gt = 0 and solve for t. This gives the time at which the projectile is at its highest point: t_max = VÂ·sinÎ¸ / g. With g = 10, this simplifies nicely for Pythagorean-triple angles.",
      "Once you have t_max, substitute it into the vertical position equation y(t) = VtÂ·sinÎ¸ âˆ’ Â½gtÂ² to find the maximum height. Do not skip this substitution step â€” t_max alone is not the height.",
      "The horizontal velocity does not affect maximum height. Only the vertical component VÂ·sinÎ¸ and gravity g determine how high the projectile goes.",
    ],
    latexBlocks: [
      "\\dot{y}(t) = V\\sin\\theta - gt = 0 \\;\\Rightarrow\\; t_{\\max} = \\frac{V\\sin\\theta}{g}",
      "H = y(t_{\\max}) = Vt_{\\max}\\sin\\theta - \\frac{1}{2}g\\,t_{\\max}^2",
      "H = \\frac{(V\\sin\\theta)^2}{2g}",
    ],
  },
  workedExamples: [
    {
      title: "Time of maximum height",
      questionLatex:
        "\\text{A projectile is launched at } V = 25 \\text{ m/s with } \\sin\\theta = \\tfrac{3}{5}.\\text{ Find the time of maximum height. Use } g = 10.",
      steps: [
        {
          explanation: "Set vertical velocity equal to zero.",
          latex: "\\dot{y}(t) = V\\sin\\theta - gt = 25 \\cdot \\frac{3}{5} - 10t = 15 - 10t = 0",
        },
        {
          explanation: "Solve for t.",
          latex: "t = \\frac{15}{10} = 1.5 \\text{ s}",
        },
      ],
      finalAnswerLatex: "t_{\\max} = 1.5 \\text{ s}",
    },
    {
      title: "Maximum height",
      questionLatex:
        "\\text{Using } y(t) = 15t - 5t^2 \\text{ from above, find the maximum height.}",
      steps: [
        {
          explanation: "Substitute t = 1.5 into y(t).",
          latex: "y(1.5) = 15(1.5) - 5(1.5)^2 = 22.5 - 5(2.25)",
        },
        {
          explanation: "Simplify.",
          latex: "y(1.5) = 22.5 - 11.25 = 11.25 \\text{ m}",
        },
      ],
      finalAnswerLatex: "H = 11.25 \\text{ m}",
    },
    {
      title: "Maximum height using the compact formula",
      questionLatex:
        "\\text{A projectile is launched at } V = 50 \\text{ m/s with } \\sin\\theta = \\tfrac{4}{5}.\\text{ Find the maximum height using } H = \\dfrac{(V\\sin\\theta)^2}{2g}.",
      steps: [
        {
          explanation: "Find the vertical component of initial velocity.",
          latex: "V\\sin\\theta = 50 \\cdot \\frac{4}{5} = 40 \\text{ m/s}",
        },
        {
          explanation: "Apply the formula with g = 10.",
          latex: "H = \\frac{40^2}{2 \\times 10} = \\frac{1600}{20} = 80 \\text{ m}",
        },
      ],
      finalAnswerLatex: "H = 80 \\text{ m}",
    },
  ],
  guidedPractice: [
    projChoice(
      "y12e1-proj-max-g1",
      "At what point in its flight does a projectile reach maximum height?",
      "C",
      [
        "When horizontal velocity is zero",
        "When displacement is zero",
        "When vertical velocity is zero",
        "When the projectile returns to ground level",
      ],
      "Maximum height occurs when the projectile momentarily stops moving upward, i.e. when áº(t) = 0."
    ),
    projTyped(
      "y12e1-proj-max-g2",
      "A projectile has vertical velocity $\\dot{y}(t) = 20 - 10t$ m/s. Find the time of maximum height.",
      "\\dot{y}(t) = 20 - 10t = 0",
      "2",
      ["2 s", "t = 2"],
      "Set 20 âˆ’ 10t = 0: t = 2 s.",
      "Set áº(t) = 0 and solve for t."
    ),
    projTyped(
      "y12e1-proj-max-g3",
      "A projectile has $y(t) = 20t - 5t^2$. Find the maximum height.",
      "\\dot{y}(t) = 20 - 10t = 0 \\Rightarrow t = 2",
      "20",
      ["20 m"],
      "áº(t) = 20 âˆ’ 10t = 0 gives t = 2. y(2) = 20(2) âˆ’ 5(4) = 40 âˆ’ 20 = 20 m.",
      "Find t when áº = 0, then substitute into y(t)."
    ),
    projTyped(
      "y12e1-proj-max-g4",
      "Use the formula $H = \\dfrac{(V\\sin\\theta)^2}{2g}$ to find the maximum height when $V\\sin\\theta = 30$ m/s and $g = 10$.",
      "H = \\frac{30^2}{2 \\times 10}",
      "45",
      ["45 m"],
      "H = 900 / 20 = 45 m."
    ),
  ],
  independentPractice: [
    projTyped(
      "y12e1-proj-max-i1",
      "A projectile has $y(t) = 30t - 5t^2$. Find the time of maximum height.",
      "\\dot{y}(t) = 30 - 10t = 0",
      "3",
      ["3 s"],
      "áº(t) = 30 âˆ’ 10t = 0 gives t = 3 s."
    ),
    projTyped(
      "y12e1-proj-max-i2",
      "A projectile has $y(t) = 30t - 5t^2$. Find the maximum height.",
      "y(3) = 30(3) - 5(3)^2",
      "45",
      ["45 m"],
      "y(3) = 90 âˆ’ 5(9) = 90 âˆ’ 45 = 45 m."
    ),
    projChoice(
      "y12e1-proj-max-i3",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{3}{5}$. What is the initial vertical velocity?",
      "B",
      ["$20$ m/s", "$15$ m/s", "$25$ m/s", "$12.5$ m/s"],
      "VÂ·sinÎ¸ = 25 Ã— 3/5 = 15 m/s."
    ),
    projTyped(
      "y12e1-proj-max-i4",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{3}{5}$. Find the maximum height using $H = \\dfrac{(V\\sin\\theta)^2}{2g}$, with $g = 10$.",
      "V\\sin\\theta = 30,\\quad H = \\frac{30^2}{20}",
      "45",
      ["45 m"],
      "VÂ·sinÎ¸ = 50 Ã— 3/5 = 30. H = 900/20 = 45 m."
    ),
    projTyped(
      "y12e1-proj-max-i5",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{4}{5}$ and $g = 10$. Find the time of maximum height.",
      "\\dot{y}(t) = 40 - 10t = 0",
      "4",
      ["4 s"],
      "VÂ·sinÎ¸ = 50 Ã— 4/5 = 40. áº(t) = 40 âˆ’ 10t = 0 gives t = 4 s."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Setting x(t) = 0 or y(t) = 0 to find maximum height.",
      fix: "Set áº(t) = VÂ·sinÎ¸ âˆ’ gt = 0. Maximum height requires zero vertical velocity, not zero position.",
    },
    {
      mistake: "Reporting t_max as the maximum height.",
      fix: "t_max is the time of maximum height. Substitute t_max into y(t) to find the actual height.",
    },
    {
      mistake: "Using V instead of VÂ·sinÎ¸ in the formula H = (V sinÎ¸)Â² / (2g).",
      fix: "Only the vertical component VÂ·sinÎ¸ drives vertical motion. The horizontal component has no effect on height.",
    },
    {
      mistake: "Using g = 9.8 instead of g = 10.",
      fix: "NSW HSC Extension 1 convention is g = 10 m/sÂ² unless explicitly told otherwise.",
    },
  ],
  masteryQuiz: [
    projTyped(
      "y12e1-proj-max-m1",
      "A projectile has $y(t) = 40t - 5t^2$. Find the time of maximum height.",
      "\\dot{y}(t) = 40 - 10t = 0",
      "4",
      ["4 s"],
      "áº(t) = 40 âˆ’ 10t = 0 gives t = 4 s."
    ),
    projTyped(
      "y12e1-proj-max-m2",
      "A projectile has $y(t) = 40t - 5t^2$. Find the maximum height.",
      "y(4) = 40(4) - 5(4)^2",
      "80",
      ["80 m"],
      "y(4) = 160 âˆ’ 5(16) = 160 âˆ’ 80 = 80 m."
    ),
    projTyped(
      "y12e1-proj-max-m3",
      "Use $H = \\dfrac{(V\\sin\\theta)^2}{2g}$ to find the maximum height when $V = 25$ m/s, $\\sin\\theta = \\dfrac{3}{5}$, $g = 10$.",
      "H = \\frac{(25 \\cdot 3/5)^2}{20} = \\frac{15^2}{20}",
      "11.25",
      ["11.25 m", "45/4"],
      "VÂ·sinÎ¸ = 15. H = 225/20 = 11.25 m."
    ),
    projChoice(
      "y12e1-proj-max-m4",
      "Which quantity determines maximum height?",
      "B",
      [
        "Horizontal velocity component only",
        "Vertical velocity component only",
        "Both components equally",
        "The launch angle only",
      ],
      "Maximum height depends on the vertical component VÂ·sinÎ¸ and gravity. Horizontal velocity plays no role."
    ),
    projTyped(
      "y12e1-proj-max-m5",
      "A projectile is launched with vertical velocity component $V\\sin\\theta = 20$ m/s. Find the time of maximum height. Use $g = 10$.",
      "\\dot{y}(t) = 20 - 10t = 0",
      "2",
      ["2 s"],
      "t_max = 20/10 = 2 s."
    ),
    projTyped(
      "y12e1-proj-max-m6",
      "A projectile is launched with $V = 50$ m/s and $\\sin\\theta = \\frac{4}{5}$. Find the maximum height using $H = \\dfrac{(V\\sin\\theta)^2}{2g}$.",
      "H = \\frac{40^2}{20}",
      "80",
      ["80 m"],
      "VÂ·sinÎ¸ = 40. H = 1600/20 = 80 m."
    ),
    projChoice(
      "y12e1-proj-max-m7",
      "A projectile has $y(t) = 15t - 5t^2$. At what time is it at maximum height?",
      "C",
      ["$t = 1$", "$t = 2$", "$t = 1.5$", "$t = 3$"],
      "áº(t) = 15 âˆ’ 10t = 0 gives t = 1.5 s."
    ),
    projTyped(
      "y12e1-proj-max-m8",
      "A projectile has $y(t) = 15t - 5t^2$. Find the maximum height.",
      "y(1.5) = 15(1.5) - 5(1.5)^2",
      "11.25",
      ["11.25 m", "45/4"],
      "y(1.5) = 22.5 âˆ’ 5(2.25) = 22.5 âˆ’ 11.25 = 11.25 m."
    ),
    projChoice(
      "y12e1-proj-max-m9",
      "At maximum height, which of the following is true?",
      "A",
      [
        "Vertical velocity = 0, horizontal velocity unchanged",
        "Both velocity components equal zero",
        "Acceleration equals zero",
        "Displacement equals zero",
      ],
      "At maximum height áº = 0. Horizontal velocity is constant throughout (no horizontal force), and acceleration is still g downward."
    ),
    projTyped(
      "y12e1-proj-max-m10",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{4}{5}$. Find the time of maximum height.",
      "\\dot{y}(t) = 25 \\cdot \\frac{4}{5} - 10t = 20 - 10t = 0",
      "2",
      ["2 s"],
      "VÂ·sinÎ¸ = 20. t_max = 20/10 = 2 s."
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
    case "projectile-max-height":
      return {
        ...projectileMaxHeight,
        id: "projectile-max-height",
        slug: "projectile-max-height",
        title: "Maximum Height and Time",
      };
    default:
      return undefined;
  }
}
