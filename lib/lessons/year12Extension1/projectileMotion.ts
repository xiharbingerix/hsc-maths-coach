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

// Lesson 3: Range and Time of Flight

const projectileRangeFlight: Partial<ExplicitLesson> = {
  description:
    "Find the time of flight and horizontal range of a projectile by solving y(t) = 0 for the landing time, then substituting into x(t).",
  learningIntention:
    "Solve y(t) = 0 to find when a projectile lands, then calculate the horizontal range using x at that time.",
  successCriteria: [
    "Solve y(t) = Vt·sinθ − ½gt² = 0 to find the time of flight T.",
    "Discard the t = 0 solution and keep the positive landing time.",
    "Substitute T into x(t) to find the horizontal range.",
    "State the range formula R = V²sin(2θ)/g for equal launch and landing heights.",
  ],
  teaching: {
    paragraphs: [
      "The time of flight is the time the projectile spends in the air before landing at the same height it was launched from. We find this by setting y(t) = 0 and solving — but y(t) = 0 has two solutions: t = 0 (the moment of launch) and the positive landing time T.",
      "Factor out t from y(t) = Vt·sinθ − ½gt² = t(V·sinθ − ½gt) = 0 to find T = 2V·sinθ/g. Notice that T = 2 × t_max, so the projectile spends equal time rising and falling.",
      "Once T is found, the horizontal range R is R = x(T) = VT·cosθ. Substituting T = 2V·sinθ/g gives the compact formula R = V²sin(2θ)/g, which shows the range is maximised when θ = 45°.",
      "This formula only applies when the projectile lands at the same height it was launched. For launch from a cliff or other height differences, solve y(t) = 0 directly from the equations.",
    ],
    latexBlocks: [
      "y(t) = 0 \\;\\Rightarrow\\; t\\left(V\\sin\\theta - \\tfrac{g}{2}t\\right) = 0 \\;\\Rightarrow\\; T = \\frac{2V\\sin\\theta}{g}",
      "R = x(T) = VT\\cos\\theta = \\frac{V^2\\sin 2\\theta}{g}",
      "T = 2\\,t_{\\max}\\quad\\text{(equal time rising and falling)}",
    ],
  },
  workedExamples: [
    {
      title: "Find time of flight",
      questionLatex:
        "\\text{A projectile has } y(t) = 15t - 5t^2.\\text{ Find the time of flight.}",
      steps: [
        {
          explanation: "Set y(t) = 0 and factor.",
          latex: "15t - 5t^2 = 5t(3 - t) = 0 \\;\\Rightarrow\\; t = 0 \\text{ or } t = 3",
        },
        {
          explanation: "Discard t = 0 (launch). The landing time is t = 3 s.",
          latex: "T = 3 \\text{ s}",
        },
      ],
      finalAnswerLatex: "T = 3 \\text{ s}",
    },
    {
      title: "Find the horizontal range",
      questionLatex:
        "\\text{Using } x(t) = 20t \\text{ and } T = 3 \\text{ s from above, find the range.}",
      steps: [
        {
          explanation: "Substitute T = 3 into x(t).",
          latex: "R = x(3) = 20 \\times 3 = 60 \\text{ m}",
        },
      ],
      finalAnswerLatex: "R = 60 \\text{ m}",
    },
    {
      title: "Use the range formula",
      questionLatex:
        "\\text{A projectile is launched at } V = 50 \\text{ m/s with } \\cos\\theta = \\tfrac{3}{5},\\; \\sin\\theta = \\tfrac{4}{5}.\\text{ Find the range. Use } g = 10.",
      steps: [
        {
          explanation: "Apply the formula R = V²sin(2θ)/g, using sin(2θ) = 2sinθcosθ.",
          latex: "\\sin 2\\theta = 2 \\cdot \\frac{4}{5} \\cdot \\frac{3}{5} = \\frac{24}{25}",
        },
        {
          explanation: "Substitute into the range formula.",
          latex: "R = \\frac{50^2 \\times \\frac{24}{25}}{10} = \\frac{2500 \\times 0.96}{10} = 240 \\text{ m}",
        },
      ],
      finalAnswerLatex: "R = 240 \\text{ m}",
    },
  ],
  guidedPractice: [
    projChoice(
      "y12e1-proj-rf-g1",
      "To find the time of flight, which equation should be solved?",
      "C",
      [
        "$x(t) = 0$",
        "$\\dot{y}(t) = 0$",
        "$y(t) = 0$",
        "$\\dot{x}(t) = 0$",
      ],
      "The projectile lands when y(t) = 0 (returns to launch height). Setting y-dot = 0 gives the time of maximum height, not landing."
    ),
    projTyped(
      "y12e1-proj-rf-g2",
      "A projectile has $y(t) = 20t - 5t^2$. Find the time of flight.",
      "5t(4 - t) = 0 \\Rightarrow t = 0 \\text{ or } t = 4",
      "4",
      ["4 s"],
      "y(t) = 5t(4 − t) = 0 gives t = 0 (launch) or t = 4 (landing). Time of flight = 4 s.",
      "Factor y(t) = 0 and take the positive non-zero solution."
    ),
    projTyped(
      "y12e1-proj-rf-g3",
      "A projectile has $x(t) = 30t$ and lands at $T = 4$ s. Find the range.",
      "R = x(4) = 30 \\times 4",
      "120",
      ["120 m"],
      "R = 30 × 4 = 120 m."
    ),
    projChoice(
      "y12e1-proj-rf-g4",
      "For a projectile that lands at the same height it was launched, what is the relationship between time of flight $T$ and time of maximum height $t_{\\max}$?",
      "B",
      [
        "$T = t_{\\max}$",
        "$T = 2\\,t_{\\max}$",
        "$T = t_{\\max}/2$",
        "$T = t_{\\max}^2$",
      ],
      "The projectile spends equal time rising and falling, so T = 2 × t_max."
    ),
  ],
  independentPractice: [
    projTyped(
      "y12e1-proj-rf-i1",
      "A projectile has $y(t) = 30t - 5t^2$. Find the time of flight.",
      "5t(6 - t) = 0",
      "6",
      ["6 s"],
      "y(t) = 5t(6 − t) = 0 gives t = 0 or t = 6. Time of flight = 6 s."
    ),
    projTyped(
      "y12e1-proj-rf-i2",
      "A projectile has $x(t) = 20t$ and $y(t) = 15t - 5t^2$. Find the horizontal range.",
      "y(t) = 5t(3-t) = 0 \\Rightarrow T = 3;\\quad R = 20(3)",
      "60",
      ["60 m"],
      "T = 3 s (from y = 0). R = x(3) = 20 × 3 = 60 m."
    ),
    projTyped(
      "y12e1-proj-rf-i3",
      "A projectile has $y(t) = 40t - 5t^2$. If $x(t) = 30t$, find the range.",
      "y(t) = 5t(8-t) = 0 \\Rightarrow T = 8;\\quad R = 30(8)",
      "240",
      ["240 m"],
      "T = 8 s (from 40t − 5t² = 0). R = 30 × 8 = 240 m."
    ),
    projChoice(
      "y12e1-proj-rf-i4",
      "At what launch angle is the horizontal range maximised for a projectile (fixed $V$)?",
      "B",
      ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
      "R = V²sin(2θ)/g is maximised when sin(2θ) = 1, i.e. θ = 45°."
    ),
    projTyped(
      "y12e1-proj-rf-i5",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{3}{5}$ and $\\cos\\theta = \\frac{4}{5}$. Find the time of flight. Use $g = 10$.",
      "T = \\frac{2V\\sin\\theta}{g} = \\frac{2 \\times 15}{10}",
      "3",
      ["3 s"],
      "T = 2V·sinθ/g = 2 × 25 × (3/5) / 10 = 30/10 = 3 s."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using t = 0 as the time of flight.",
      fix: "y(t) = 0 has two solutions: t = 0 (launch) and t = T (landing). Always take the positive non-zero solution.",
    },
    {
      mistake: "Finding time of maximum height instead of time of flight.",
      fix: "Set y(t) = 0 for time of flight. Set y-dot(t) = 0 for time of maximum height — these are different calculations.",
    },
    {
      mistake: "Substituting T into y(t) instead of x(t) to find the range.",
      fix: "Range is horizontal distance: R = x(T) = VT·cosθ. At landing, y(T) = 0 by definition.",
    },
    {
      mistake: "Using the range formula R = V²sin(2θ)/g when launch and landing heights differ.",
      fix: "The range formula only applies for equal launch and landing heights. Otherwise, solve y(t) = 0 directly from the equations.",
    },
  ],
  masteryQuiz: [
    projTyped(
      "y12e1-proj-rf-m1",
      "A projectile has $y(t) = 25t - 5t^2$. Find the time of flight.",
      "5t(5-t) = 0",
      "5",
      ["5 s"],
      "y = 5t(5 − t) = 0 gives t = 5 s."
    ),
    projTyped(
      "y12e1-proj-rf-m2",
      "A projectile has $x(t) = 20t$ and lands at $T = 5$ s. Find the range.",
      "R = 20 \\times 5",
      "100",
      ["100 m"],
      "R = 20 × 5 = 100 m."
    ),
    projTyped(
      "y12e1-proj-rf-m3",
      "A projectile has $y(t) = 40t - 5t^2$ and $x(t) = 30t$. Find the horizontal range.",
      "5t(8-t)=0 \\Rightarrow T=8;\\quad R=30(8)",
      "240",
      ["240 m"],
      "T = 8 s. R = 30 × 8 = 240 m."
    ),
    projChoice(
      "y12e1-proj-rf-m4",
      "A projectile reaches maximum height at $t = 2$ s. What is its time of flight (landing at same height)?",
      "C",
      ["$1$ s", "$3$ s", "$4$ s", "$6$ s"],
      "Time of flight = 2 × t_max = 2 × 2 = 4 s."
    ),
    projTyped(
      "y12e1-proj-rf-m5",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{3}{5}$. Find the time of flight. Use $g = 10$.",
      "T = \\frac{2 \\times 50 \\times 3/5}{10} = \\frac{60}{10}",
      "6",
      ["6 s"],
      "T = 2 × 30/10 = 6 s."
    ),
    projTyped(
      "y12e1-proj-rf-m6",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{4}{5}$ and $T = 6$ s. Find the range.",
      "R = V\\cos\\theta \\cdot T = 40 \\times 6",
      "240",
      ["240 m"],
      "Horizontal velocity = 50 × 4/5 = 40 m/s. R = 40 × 6 = 240 m."
    ),
    projChoice(
      "y12e1-proj-rf-m7",
      "At what launch angle is the range of a projectile maximised (for fixed $V$)?",
      "B",
      ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
      "R = V²sin(2θ)/g is maximised when sin(2θ) = 1, i.e. 2θ = 90°, so θ = 45°."
    ),
    projTyped(
      "y12e1-proj-rf-m8",
      "A projectile has $y(t) = 15t - 5t^2$ and $x(t) = 20t$. Find the range.",
      "5t(3-t)=0 \\Rightarrow T=3;\\quad R=20(3)",
      "60",
      ["60 m"],
      "T = 3 s. R = 20 × 3 = 60 m."
    ),
    projChoice(
      "y12e1-proj-rf-m9",
      "Why are there two solutions when solving $y(t) = 0$ for a projectile?",
      "A",
      [
        "One is the launch time ($t = 0$) and the other is the landing time",
        "One is maximum height and the other is landing",
        "Both solutions are the landing time",
        "One solution is negative and therefore invalid",
      ],
      "y(t) = t(V·sinθ − ½gt) = 0 gives t = 0 (launch) and the positive T (landing). We keep T."
    ),
    projTyped(
      "y12e1-proj-rf-m10",
      "A projectile is launched with vertical component $V\\sin\\theta = 20$ m/s and horizontal component $V\\cos\\theta = 15$ m/s. Find the range. Use $g = 10$.",
      "T = \\frac{2 \\times 20}{10} = 4;\\quad R = 15 \\times 4",
      "60",
      ["60 m"],
      "T = 2 × 20/10 = 4 s. R = 15 × 4 = 60 m."
    ),
  ],
  masteryPassMark: 0.8,
};

// Lesson 4: Projectile Motion Exam Practice

const projectileExamPractice: Partial<ExplicitLesson> = {
  description:
    "HSC-style multi-step projectile motion problems combining time of flight, maximum height, range, and reading off components at a given time.",
  learningIntention:
    "Integrate all projectile motion skills to solve complete multi-part HSC exam questions.",
  successCriteria: [
    "Write down x(t) and y(t) from a given speed V and angle θ.",
    "Find time of maximum height (y-dot = 0), maximum height H, time of flight T, and range R.",
    "Use Pythagorean triples (3-4-5) to produce clean integer answers.",
    "Identify the position or speed of the projectile at a specified time.",
  ],
  teaching: {
    paragraphs: [
      "A complete HSC projectile question typically gives a launch speed V and angle θ, then asks for several of: the equations of motion, time of maximum height, maximum height, time of flight, horizontal range, and velocity components at a time. Set out the equations first, then work through each part systematically.",
      "The two key equations are x(t) = Vt·cosθ and y(t) = Vt·sinθ − ½gt². From these, four standard results follow: t_max = V·sinθ/g, H = (V·sinθ)²/(2g), T = 2V·sinθ/g, R = V²·sin(2θ)/g.",
      "For clean arithmetic, HSC problems often use Pythagorean triple angles: cosθ = 4/5, sinθ = 3/5 (a 3-4-5 triangle) or cosθ = 3/5, sinθ = 4/5. With V = 50 m/s and cosθ = 4/5, the horizontal component is 40 m/s; with sinθ = 3/5 it is 30 m/s.",
      "Speed at a time t is the magnitude of the velocity vector: speed = √(ẋ² + ẏ²). Remember horizontal velocity is constant (ẋ = V·cosθ), while vertical velocity changes with time (ẏ = V·sinθ − gt).",
    ],
    latexBlocks: [
      "x(t) = Vt\\cos\\theta,\\quad y(t) = Vt\\sin\\theta - \\tfrac{g}{2}t^2",
      "t_{\\max} = \\frac{V\\sin\\theta}{g},\\quad H = \\frac{(V\\sin\\theta)^2}{2g},\\quad T = \\frac{2V\\sin\\theta}{g},\\quad R = \\frac{V^2\\sin 2\\theta}{g}",
    ],
  },
  workedExamples: [
    {
      title: "Complete projectile question",
      questionLatex:
        "\\text{A ball is launched at } V = 50 \\text{ m/s with } \\cos\\theta = \\tfrac{3}{5},\\; \\sin\\theta = \\tfrac{4}{5}.\\text{ Use } g = 10." +
        "\\text{ Find: (a) the equations of motion, (b) the maximum height, (c) the range.}",
      steps: [
        {
          explanation: "(a) Horizontal component: 50 × 3/5 = 30; vertical: 50 × 4/5 = 40.",
          latex: "x(t) = 30t,\\quad y(t) = 40t - 5t^2",
        },
        {
          explanation: "(b) Set y-dot = 0: 40 − 10t = 0, t_max = 4 s. H = y(4).",
          latex: "H = 40(4) - 5(16) = 160 - 80 = 80 \\text{ m}",
        },
        {
          explanation: "(c) T = 2 × 4 = 8 s. R = x(8) = 30 × 8.",
          latex: "R = 240 \\text{ m}",
        },
      ],
      finalAnswerLatex: "H = 80 \\text{ m},\\quad R = 240 \\text{ m}",
    },
    {
      title: "Velocity at a specified time",
      questionLatex:
        "\\text{For the ball above (}x(t)=30t,\\;y(t)=40t-5t^2\\text{), find the speed at } t = 6 \\text{ s.}",
      steps: [
        {
          explanation: "Horizontal velocity is constant: ẋ = 30.",
          latex: "\\dot{x}(6) = 30 \\text{ m/s}",
        },
        {
          explanation: "Vertical velocity: ẏ = 40 − 10t. At t = 6: ẏ = 40 − 60 = −20.",
          latex: "\\dot{y}(6) = -20 \\text{ m/s}",
        },
        {
          explanation: "Speed = √(30² + (−20)²) = √(900 + 400) = √1300.",
          latex: "\\text{speed} = \\sqrt{1300} = 10\\sqrt{13} \\text{ m/s}",
        },
      ],
      finalAnswerLatex: "10\\sqrt{13} \\text{ m/s}",
    },
  ],
  guidedPractice: [
    projTyped(
      "y12e1-proj-ep-g1",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{4}{5}$ and $\\sin\\theta = \\frac{3}{5}$. Write $x(t)$ and state the horizontal component of velocity.",
      "\\dot{x} = V\\cos\\theta = 50 \\times \\frac{4}{5}",
      "40",
      ["40 m/s", "x(t) = 40t"],
      "V·cosθ = 50 × 4/5 = 40 m/s. x(t) = 40t."
    ),
    projTyped(
      "y12e1-proj-ep-g2",
      "A projectile has $y(t) = 30t - 5t^2$. Find the time of maximum height.",
      "\\dot{y} = 30 - 10t = 0",
      "3",
      ["3 s"],
      "y-dot = 30 − 10t = 0 gives t = 3 s."
    ),
    projTyped(
      "y12e1-proj-ep-g3",
      "Using $y(t) = 30t - 5t^2$ and $t_{\\max} = 3$ s, find the maximum height.",
      "H = y(3) = 30(3) - 5(9)",
      "45",
      ["45 m"],
      "H = 90 − 45 = 45 m."
    ),
    projChoice(
      "y12e1-proj-ep-g4",
      "A projectile is launched at $V = 50$ m/s and $\\cos\\theta = \\frac{3}{5}$. What is the horizontal range if the time of flight is $T = 8$ s?",
      "C",
      ["$160$ m", "$200$ m", "$240$ m", "$300$ m"],
      "Horizontal velocity = 50 × 3/5 = 30 m/s. R = 30 × 8 = 240 m."
    ),
  ],
  independentPractice: [
    projTyped(
      "y12e1-proj-ep-i1",
      "A projectile has $y(t) = 40t - 5t^2$. Find the time of flight.",
      "5t(8-t) = 0",
      "8",
      ["8 s"],
      "y = 5t(8−t) = 0 gives T = 8 s."
    ),
    projTyped(
      "y12e1-proj-ep-i2",
      "A projectile is launched at $V = 25$ m/s with $\\sin\\theta = \\frac{4}{5}$ and $\\cos\\theta = \\frac{3}{5}$. Find the maximum height. Use $g = 10$.",
      "t_{\\max} = \\frac{25 \\times 4/5}{10} = 2;\\quad H = 20(2) - 5(4)",
      "20",
      ["20 m"],
      "V·sinθ = 20 m/s. t_max = 2 s. H = 20(2) − 5(4) = 40 − 20 = 20 m."
    ),
    projTyped(
      "y12e1-proj-ep-i3",
      "For the projectile in i2, find the range. ($T = 4$ s, horizontal velocity $= 15$ m/s.)",
      "R = 15 \\times 4",
      "60",
      ["60 m"],
      "R = 15 × 4 = 60 m."
    ),
    projChoice(
      "y12e1-proj-ep-i4",
      "A projectile has $\\dot{x} = 30$ m/s and $\\dot{y}(t) = 40 - 10t$ m/s. At $t = 7$ s, the vertical velocity is:",
      "C",
      ["$+30$ m/s", "$0$ m/s", "$-30$ m/s", "$-70$ m/s"],
      "y-dot(7) = 40 − 70 = −30 m/s (downward)."
    ),
    projTyped(
      "y12e1-proj-ep-i5",
      "A projectile is launched at $V = 50$ m/s with $\\sin\\theta = \\frac{3}{5}$. Find the time of flight. Use $g = 10$.",
      "T = \\frac{2 \\times 30}{10}",
      "6",
      ["6 s"],
      "V·sinθ = 30 m/s. T = 2 × 30/10 = 6 s."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Mixing up sinθ and cosθ when computing horizontal and vertical components.",
      fix: "Horizontal uses cosθ (adjacent/hypotenuse), vertical uses sinθ (opposite/hypotenuse). Check: for a 3-4-5 triangle with angle opposite 4, sinθ = 4/5 and cosθ = 3/5.",
    },
    {
      mistake: "Using g = 9.8 instead of g = 10.",
      fix: "HSC Extension 1 problems state g = 10 m/s² unless told otherwise. Use 10 for clean answers in exam practice.",
    },
    {
      mistake: "Substituting T into x(t) to verify, but computing y(T) and calling it the range.",
      fix: "Range is horizontal: R = x(T) = V·cosθ × T. y(T) = 0 by definition (the projectile has landed).",
    },
    {
      mistake: "Forgetting that T = 2 × t_max when launch and landing heights are equal.",
      fix: "The trajectory is symmetric: equal time rising and falling. T = 2t_max gives a quick check on your time of flight.",
    },
  ],
  masteryQuiz: [
    projTyped(
      "y12e1-proj-ep-m1",
      "A projectile has $y(t) = 20t - 5t^2$. Find the maximum height.",
      "t_{\\max} = 2;\\quad H = 20(2) - 5(4)",
      "20",
      ["20 m"],
      "t_max = 2 s. H = 40 − 20 = 20 m."
    ),
    projTyped(
      "y12e1-proj-ep-m2",
      "A projectile has $x(t) = 15t$ and $y(t) = 20t - 5t^2$. Find the range.",
      "y = 5t(4-t) = 0 \\Rightarrow T = 4;\\quad R = 15(4)",
      "60",
      ["60 m"],
      "T = 4 s. R = 15 × 4 = 60 m."
    ),
    projChoice(
      "y12e1-proj-ep-m3",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{4}{5}$. What is the horizontal velocity at $t = 5$ s?",
      "A",
      ["$40$ m/s", "$30$ m/s", "$0$ m/s", "$50$ m/s"],
      "Horizontal velocity is constant throughout: V·cosθ = 50 × 4/5 = 40 m/s."
    ),
    projTyped(
      "y12e1-proj-ep-m4",
      "A projectile has $\\dot{y}(t) = 30 - 10t$ m/s. At what time does the projectile reach maximum height?",
      "30 - 10t = 0",
      "3",
      ["3 s", "t = 3"],
      "y-dot = 0: 30 − 10t = 0 gives t = 3 s."
    ),
    projTyped(
      "y12e1-proj-ep-m5",
      "A projectile has $y(t) = 30t - 5t^2$ and $x(t) = 40t$. Find the range.",
      "5t(6-t) = 0 \\Rightarrow T = 6;\\quad R = 40(6)",
      "240",
      ["240 m"],
      "T = 6 s. R = 40 × 6 = 240 m."
    ),
    projChoice(
      "y12e1-proj-ep-m6",
      "A projectile has $\\dot{x} = 40$ m/s and $\\dot{y}(t) = 30 - 10t$ m/s. At $t = 6$ s, the vertical velocity is:",
      "C",
      ["$30$ m/s", "$0$ m/s", "$-30$ m/s", "$-60$ m/s"],
      "y-dot(6) = 30 − 60 = −30 m/s (downward — past maximum height)."
    ),
    projTyped(
      "y12e1-proj-ep-m7",
      "A projectile reaches maximum height at $t = 3$ s. What is the time of flight (landing at same height)?",
      "T = 2 \\times t_{\\max} = 2 \\times 3",
      "6",
      ["6 s"],
      "T = 2 × 3 = 6 s."
    ),
    projTyped(
      "y12e1-proj-ep-m8",
      "A projectile is launched at $V = 50$ m/s with $\\cos\\theta = \\frac{3}{5}$ and $\\sin\\theta = \\frac{4}{5}$. Find the maximum height. Use $g = 10$.",
      "V\\sin\\theta = 40;\\quad t_{\\max} = 4;\\quad H = 40(4) - 5(16)",
      "80",
      ["80 m"],
      "V·sinθ = 40 m/s. t_max = 4 s. H = 160 − 80 = 80 m."
    ),
    projChoice(
      "y12e1-proj-ep-m9",
      "Which formula gives the horizontal range for a projectile launched and landing at the same height?",
      "B",
      [
        "$R = \\dfrac{V^2\\sin\\theta}{g}$",
        "$R = \\dfrac{V^2\\sin 2\\theta}{g}$",
        "$R = \\dfrac{2V\\sin\\theta}{g}$",
        "$R = \\dfrac{V\\sin 2\\theta}{g}$",
      ],
      "R = V²sin(2θ)/g, derived from R = V·cosθ × T = V·cosθ × 2V·sinθ/g = V²·2sinθcosθ/g = V²sin(2θ)/g."
    ),
    projTyped(
      "y12e1-proj-ep-m10",
      "A projectile is launched with vertical component $V\\sin\\theta = 30$ m/s and horizontal component $V\\cos\\theta = 40$ m/s. Find the range. Use $g = 10$.",
      "T = \\frac{2 \\times 30}{10} = 6;\\quad R = 40 \\times 6",
      "240",
      ["240 m"],
      "T = 6 s. R = 40 × 6 = 240 m."
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
    case "projectile-range-flight":
      return {
        ...projectileRangeFlight,
        id: "projectile-range-flight",
        slug: "projectile-range-flight",
        title: "Range and Time of Flight",
      };
    case "projectile-exam-practice":
      return {
        ...projectileExamPractice,
        id: "projectile-exam-practice",
        slug: "projectile-exam-practice",
        title: "Projectile Motion Exam Practice",
      };
    default:
      return undefined;
  }
}
