import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function kinChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Identify the correct kinematic relationship before selecting an answer."
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

function kinTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Differentiate the displacement function and substitute the given value."
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

// â”€â”€â”€ Lesson 1: Velocity and Acceleration from Displacement â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const kinematicsVelocityAcceleration: Partial<ExplicitLesson> = {
  description:
    "Use differentiation to find velocity and acceleration from a displacement function, and interpret the signs of these quantities in straight-line motion.",
  learningIntention:
    "Differentiate a displacement function to find velocity and acceleration, and interpret their signs to describe the motion of a particle.",
  successCriteria: [
    "Find velocity by differentiating displacement with respect to time: v = dx/dt.",
    "Find acceleration by differentiating velocity: a = dv/dt = dÂ²x/dtÂ².",
    "Identify when a particle is at rest by solving v(t) = 0.",
    "Interpret the sign of velocity as the direction of motion.",
  ],
  teaching: {
    paragraphs: [
      "In kinematics, displacement x(t) measures a particle's position from a fixed origin at time t. The rate at which that position changes is the velocity. Since velocity measures how quickly displacement changes, it is simply the derivative of x with respect to t.",
      "Acceleration measures how quickly velocity is changing. It is the derivative of v â€” or equivalently the second derivative of x. These two relationships, v = dx/dt and a = dv/dt, are the foundation of all straight-line motion problems.",
      "When v(t) > 0 the particle moves in the positive direction. When v(t) < 0 it moves in the negative direction. The particle is momentarily at rest when v(t) = 0, and it often changes direction at that instant if the sign of v changes.",
      "Speed and velocity are different: speed = |v|. A particle can have a large speed while moving in the negative direction. Deceleration occurs when acceleration and velocity have opposite signs â€” the particle is slowing down even if it is not reversing.",
    ],
    latexBlocks: [
      "v(t) = \\frac{dx}{dt}",
      "a(t) = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}",
      "\\text{Particle at rest: } v(t) = 0",
    ],
  },
  workedExamples: [
    {
      title: "Find velocity and acceleration from displacement",
      questionLatex:
        "\\text{A particle has displacement } x(t) = t^3 - 6t^2 + 9t \\text{ m. Find } v(t) \\text{ and } a(t).",
      steps: [
        {
          explanation: "Differentiate x(t) with respect to t to obtain velocity.",
          latex: "v(t) = \\frac{dx}{dt} = 3t^2 - 12t + 9",
        },
        {
          explanation: "Differentiate v(t) with respect to t to obtain acceleration.",
          latex: "a(t) = \\frac{dv}{dt} = 6t - 12",
        },
      ],
      finalAnswerLatex: "v(t) = 3t^2 - 12t + 9,\\quad a(t) = 6t - 12",
    },
    {
      title: "Find when the particle is at rest",
      questionLatex:
        "\\text{Using } v(t) = 3t^2 - 12t + 9 \\text{ from above, find the times when the particle is at rest.}",
      steps: [
        {
          explanation: "Set v(t) = 0 and solve.",
          latex: "3t^2 - 12t + 9 = 0 \\;\\Rightarrow\\; t^2 - 4t + 3 = 0",
        },
        {
          explanation: "Factorise the quadratic.",
          latex: "(t - 1)(t - 3) = 0 \\;\\Rightarrow\\; t = 1 \\text{ or } t = 3",
        },
      ],
      finalAnswerLatex: "\\text{At rest when } t = 1 \\text{ s and } t = 3 \\text{ s}",
    },
    {
      title: "Evaluate velocity at a specific time",
      questionLatex:
        "\\text{A particle has displacement } x(t) = 2t^3 - 3t^2 + 1 \\text{ m. Find the velocity at } t = 2 \\text{ s.}",
      steps: [
        {
          explanation: "Differentiate x(t) to obtain v(t).",
          latex: "v(t) = 6t^2 - 6t",
        },
        {
          explanation: "Substitute t = 2 and evaluate.",
          latex: "v(2) = 6(4) - 6(2) = 24 - 12 = 12",
        },
      ],
      finalAnswerLatex: "v(2) = 12 \\text{ m/s}",
    },
  ],
  guidedPractice: [
    kinChoice(
      "y12e1-kin-va-g1",
      "A particle has displacement $x(t) = t^2 - 4t + 3$. Which expression gives its velocity?",
      "B",
      ["$2t - 3$", "$2t - 4$", "$t - 4$", "$2t + 4$"],
      "Differentiate x(t) = t^2 - 4t + 3 with respect to t: v(t) = 2t - 4."
    ),
    kinTyped(
      "y12e1-kin-va-g2",
      "A particle has displacement $x(t) = 3t^2 - 12t$. Find the velocity at $t = 3$.",
      "x(t) = 3t^2 - 12t,\\quad t = 3",
      "6",
      ["6 m/s"],
      "v(t) = 6t - 12. At t = 3: v(3) = 18 - 12 = 6 m/s."
    ),
    kinTyped(
      "y12e1-kin-va-g3",
      "A particle has velocity $v(t) = 4t - 8$. Find the acceleration.",
      "v(t) = 4t - 8",
      "4",
      ["4 m/s^2"],
      "a(t) = dv/dt = 4. The acceleration is constant at 4 m/sÂ²."
    ),
    kinChoice(
      "y12e1-kin-va-g4",
      "When $v(t) = 0$, which statement best describes the particle's motion?",
      "C",
      [
        "The particle is at the origin",
        "The particle has zero acceleration",
        "The particle is momentarily at rest and may change direction",
        "The displacement is zero",
      ],
      "v(t) = 0 means the particle is instantaneously at rest. It can be at any position, and it may reverse direction immediately after."
    ),
  ],
  independentPractice: [
    kinTyped(
      "y12e1-kin-va-i1",
      "A particle has displacement $x(t) = t^3 - 3t$. Find the velocity at $t = 2$.",
      "x(t) = t^3 - 3t,\\quad t = 2",
      "9",
      ["9 m/s"],
      "v(t) = 3t^2 - 3. At t = 2: v(2) = 3(4) - 3 = 12 - 3 = 9 m/s."
    ),
    kinTyped(
      "y12e1-kin-va-i2",
      "A particle has displacement $x(t) = 2t^3 - 9t^2 + 12t$. Find the acceleration at $t = 1$.",
      "x(t) = 2t^3 - 9t^2 + 12t,\\quad t = 1",
      "-6",
      ["âˆ’6", "-6 m/s^2"],
      "v(t) = 6t^2 - 18t + 12, so a(t) = 12t - 18. At t = 1: a(1) = 12 - 18 = -6 m/sÂ²."
    ),
    kinChoice(
      "y12e1-kin-va-i3",
      "A particle has velocity $v(t) = 2t - 6$. At what time is the particle at rest?",
      "B",
      ["$t = 2$", "$t = 3$", "$t = 6$", "$t = 0$"],
      "Set v(t) = 0: 2t - 6 = 0, so t = 3."
    ),
    kinChoice(
      "y12e1-kin-va-i4",
      "A particle has displacement $x(t) = t^2 - 4t + 1$. At $t = 1$, in which direction is the particle moving?",
      "D",
      [
        "Positive direction",
        "At rest",
        "Cannot be determined without more information",
        "Negative direction",
      ],
      "v(t) = 2t - 4. At t = 1: v(1) = 2 - 4 = -2. Negative velocity means motion in the negative direction."
    ),
    kinTyped(
      "y12e1-kin-va-i5",
      "A particle has displacement $x(t) = t^3 - 6t^2 + 9t + 2$. Find the smallest positive time at which the particle is at rest.",
      "v(t) = 3t^2 - 12t + 9 = 0",
      "1",
      [],
      "v(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3). Setting v = 0 gives t = 1 or t = 3. The smallest positive value is t = 1."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Substituting the given time into x(t) before differentiating.",
      fix: "Always differentiate first to get v(t), then substitute the time value into v(t).",
    },
    {
      mistake: "Confusing speed with velocity.",
      fix: "Velocity has sign (direction); speed = |v|. A particle moving at -10 m/s has speed 10 m/s.",
    },
    {
      mistake: "Finding v(t) when asked for a(t).",
      fix: "Acceleration requires a second derivative of x(t), not the first.",
    },
    {
      mistake: "Assuming v(t) = 0 means the particle is at the origin.",
      fix: "v = 0 means the particle is momentarily at rest. It can be at any position, not necessarily x = 0.",
    },
  ],
  masteryQuiz: [
    kinTyped(
      "y12e1-kin-va-m1",
      "A particle has displacement $x(t) = t^2 - 6t + 8$. Find the velocity at $t = 4$.",
      "x(t) = t^2 - 6t + 8",
      "2",
      ["2 m/s"],
      "v(t) = 2t - 6. At t = 4: v(4) = 8 - 6 = 2 m/s."
    ),
    kinTyped(
      "y12e1-kin-va-m2",
      "A particle has displacement $x(t) = t^3 - 3t^2$. Find the acceleration at $t = 2$.",
      "x(t) = t^3 - 3t^2",
      "6",
      ["6 m/s^2"],
      "v(t) = 3t^2 - 6t, so a(t) = 6t - 6. At t = 2: a(2) = 12 - 6 = 6 m/sÂ²."
    ),
    kinChoice(
      "y12e1-kin-va-m3",
      "A particle has velocity $v(t) = 3t^2 - 12$. At what positive time is it at rest?",
      "B",
      ["$t = 4$", "$t = 2$", "$t = 3$", "$t = 1$"],
      "Set 3t^2 - 12 = 0: t^2 = 4, so t = 2 (taking the positive root)."
    ),
    kinChoice(
      "y12e1-kin-va-m4",
      "Which statement correctly interprets $v(t) < 0$?",
      "A",
      [
        "The particle is moving in the negative direction",
        "The particle has negative displacement",
        "The particle is decelerating",
        "The particle is at the origin",
      ],
      "Negative velocity means motion in the negative direction. Displacement and acceleration sign are separate considerations."
    ),
    kinTyped(
      "y12e1-kin-va-m5",
      "A particle has velocity $v(t) = 6t - 12$. Find the acceleration.",
      "v(t) = 6t - 12",
      "6",
      ["6 m/s^2"],
      "a(t) = dv/dt = 6. The acceleration is constant."
    ),
    kinChoice(
      "y12e1-kin-va-m6",
      "What does it mean for a particle to be decelerating?",
      "C",
      [
        "Its velocity equals zero",
        "Its acceleration is negative",
        "Acceleration and velocity have opposite signs",
        "Its displacement is decreasing",
      ],
      "Deceleration means the speed is decreasing, which occurs when a and v have opposite signs â€” the acceleration is working against the motion."
    ),
    kinTyped(
      "y12e1-kin-va-m7",
      "Find the time when acceleration is zero for a particle with displacement $x(t) = t^3 - 3t^2 + 2$.",
      "a(t) = 6t - 6 = 0",
      "1",
      ["t = 1", "1 s"],
      "v(t) = 3t^2 - 6t, so a(t) = 6t - 6. Setting a(t) = 0 gives t = 1."
    ),
    kinChoice(
      "y12e1-kin-va-m8",
      "A particle has displacement $x(t) = 5t - t^2$. What is the maximum displacement?",
      "C",
      ["$x = 5$", "$x = 4$", "$x = 6.25$", "$x = 10$"],
      "v(t) = 5 - 2t = 0 at t = 2.5. x(2.5) = 5(2.5) - (2.5)^2 = 12.5 - 6.25 = 6.25 m."
    ),
    kinTyped(
      "y12e1-kin-va-m9",
      "A particle has displacement $x(t) = 4t - t^2$. What is the velocity at the instant of maximum displacement?",
      "x(t) = 4t - t^2",
      "0",
      [],
      "Maximum displacement occurs when velocity is zero (the particle has stopped momentarily). So the velocity at the maximum is 0 m/s."
    ),
    kinChoice(
      "y12e1-kin-va-m10",
      "Which formula gives the acceleration of a particle in terms of displacement?",
      "D",
      [
        "$a(t) = \\int v(t)\\,dt$",
        "$a(t) = x'(t)$",
        "$a(t) = \\frac{dx}{dt}$",
        "$a(t) = \\frac{d^2x}{dt^2}$",
      ],
      "Acceleration is the second derivative of displacement with respect to time: a = dÂ²x/dtÂ²."
    ),
  ],
  masteryPassMark: 0.8,
};

// â”€â”€â”€ Lesson 2: Displacement from Velocity by Integration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const kinematicsDisplacementFromVelocity: Partial<ExplicitLesson> = {
  description:
    "Use integration to recover displacement from a velocity function and velocity from an acceleration function, applying initial conditions to determine constants.",
  learningIntention:
    "Integrate a velocity (or acceleration) function and apply an initial condition to find the displacement (or velocity) function.",
  successCriteria: [
    "Find displacement by integrating velocity: x = âˆ«v dt, then apply x(0) to find C.",
    "Find velocity by integrating acceleration: v = âˆ«a dt, then apply v(0) to find C.",
    "Recognise that integration is the reverse process of differentiation in kinematics.",
    "Calculate displacement over a time interval using a definite integral of velocity.",
  ],
  teaching: {
    paragraphs: [
      "Differentiation takes us from displacement to velocity to acceleration. Integration reverses the journey: given velocity, integrate to recover displacement; given acceleration, integrate to recover velocity.",
      "When you integrate a velocity function, you get a family of displacement functions differing by a constant C. An initial condition â€” such as the starting position x(0) = 0 â€” pins down the exact function by fixing the value of C.",
      "Distance travelled is not the same as displacement. Displacement can be negative if the particle moves in the negative direction. To find total distance, split the integral at times when v = 0 and take the magnitude of each piece.",
      "Definite integration of velocity over a time interval gives the net displacement (change in position) over that interval, not the total distance covered.",
    ],
    latexBlocks: [
      "x(t) = \\int v(t)\\,dt + C",
      "v(t) = \\int a(t)\\,dt + C",
      "\\text{Net displacement from } t_1 \\text{ to } t_2: \\int_{t_1}^{t_2} v(t)\\,dt",
    ],
  },
  workedExamples: [
    {
      title: "Find displacement from velocity using initial conditions",
      questionLatex:
        "\\text{A particle has velocity } v(t) = 6t - 4 \\text{ m/s and starts at } x = 3 \\text{ when } t = 0.\\text{ Find } x(t).",
      steps: [
        {
          explanation: "Integrate v(t) with respect to t.",
          latex: "x(t) = \\int (6t - 4)\\,dt = 3t^2 - 4t + C",
        },
        {
          explanation: "Apply the initial condition x(0) = 3 to find C.",
          latex: "3(0)^2 - 4(0) + C = 3 \\;\\Rightarrow\\; C = 3",
        },
        {
          explanation: "Write the complete displacement function.",
          latex: "x(t) = 3t^2 - 4t + 3",
        },
      ],
      finalAnswerLatex: "x(t) = 3t^2 - 4t + 3",
    },
    {
      title: "Find velocity from acceleration",
      questionLatex:
        "\\text{A particle has acceleration } a(t) = 6 - 2t \\text{ m/s}^2 \\text{ and initial velocity } v(0) = 2 \\text{ m/s. Find } v(t).",
      steps: [
        {
          explanation: "Integrate a(t) with respect to t.",
          latex: "v(t) = \\int (6 - 2t)\\,dt = 6t - t^2 + C",
        },
        {
          explanation: "Apply v(0) = 2 to find C.",
          latex: "6(0) - (0)^2 + C = 2 \\;\\Rightarrow\\; C = 2",
        },
      ],
      finalAnswerLatex: "v(t) = 6t - t^2 + 2",
    },
    {
      title: "Net displacement using a definite integral",
      questionLatex:
        "\\text{A particle has velocity } v(t) = 3t^2 - 6t \\text{ m/s. Find the net displacement from } t = 0 \\text{ to } t = 3.",
      steps: [
        {
          explanation: "Integrate v(t) from 0 to 3.",
          latex: "\\int_0^3 (3t^2 - 6t)\\,dt = \\left[t^3 - 3t^2\\right]_0^3",
        },
        {
          explanation: "Evaluate at the upper and lower limits.",
          latex: "(27 - 27) - (0 - 0) = 0",
        },
      ],
      finalAnswerLatex: "\\text{Net displacement} = 0 \\text{ m}",
    },
  ],
  guidedPractice: [
    kinChoice(
      "y12e1-kin-int-g1",
      "Which operation recovers displacement from a velocity function?",
      "C",
      [
        "Differentiation",
        "Multiplying by t",
        "Integration",
        "Taking the absolute value",
      ],
      "Integration is the reverse of differentiation, so integrating v(t) gives x(t) up to a constant C."
    ),
    kinTyped(
      "y12e1-kin-int-g2",
      "A particle has velocity $v(t) = 4t - 2$ m/s and starts at the origin when $t = 0$. Find $x(2)$.",
      "x(t) = \\int (4t - 2)\\,dt = 2t^2 - 2t + C,\\quad x(0) = 0",
      "4",
      ["4 m"],
      "x(t) = 2tÂ² âˆ’ 2t + C. x(0) = 0 gives C = 0. x(2) = 2(4) âˆ’ 2(2) = 8 âˆ’ 4 = 4 m.",
      "Integrate v(t), apply x(0) = 0 to find C, then substitute t = 2."
    ),
    kinTyped(
      "y12e1-kin-int-g3",
      "A particle has acceleration $a(t) = 10$ m/sÂ² and initial velocity $v(0) = 5$ m/s. Find $v(3)$.",
      "v(t) = 10t + C,\\quad v(0) = 5",
      "35",
      ["35 m/s"],
      "v(t) = 10t + C. v(0) = 5 gives C = 5. v(3) = 30 + 5 = 35 m/s."
    ),
    kinChoice(
      "y12e1-kin-int-g4",
      "What does $\\int_{t_1}^{t_2} v(t)\\,dt$ give?",
      "B",
      [
        "Total distance travelled",
        "Net displacement from $t_1$ to $t_2$",
        "Average speed",
        "The velocity at $t_2$",
      ],
      "A definite integral of velocity over a time interval gives net displacement (change in position), which can be positive, negative, or zero."
    ),
  ],
  independentPractice: [
    kinTyped(
      "y12e1-kin-int-i1",
      "A particle has velocity $v(t) = 6t^2 - 4$ m/s and starts at $x = 1$ when $t = 0$. Find $x(2)$.",
      "x(t) = 2t^3 - 4t + C,\\quad x(0) = 1",
      "9",
      ["9 m"],
      "x(t) = 2tÂ³ âˆ’ 4t + C. x(0) = 1 gives C = 1. x(2) = 2(8) âˆ’ 4(2) + 1 = 16 âˆ’ 8 + 1 = 9 m."
    ),
    kinTyped(
      "y12e1-kin-int-i2",
      "A particle has acceleration $a(t) = 4 - 6t$ m/sÂ² and $v(0) = 0$. Find $v(2)$.",
      "v(t) = 4t - 3t^2 + C,\\quad v(0) = 0",
      "-4",
      ["âˆ’4", "-4 m/s"],
      "v(t) = 4t âˆ’ 3tÂ² + C. v(0) = 0 gives C = 0. v(2) = 8 âˆ’ 12 = -4 m/s."
    ),
    kinTyped(
      "y12e1-kin-int-i3",
      "Find the net displacement of a particle from $t = 0$ to $t = 2$ if its velocity is $v(t) = 3t^2 - 6$.",
      "\\int_0^2 (3t^2 - 6)\\,dt = \\left[t^3 - 6t\\right]_0^2",
      "-4",
      ["âˆ’4", "-4 m"],
      "âˆ«â‚€Â² (3tÂ² âˆ’ 6) dt = [tÂ³ âˆ’ 6t]â‚€Â² = (8 âˆ’ 12) âˆ’ (0) = -4 m. Net displacement is -4 m."
    ),
    kinChoice(
      "y12e1-kin-int-i4",
      "A particle starts at rest at the origin. Its velocity becomes $v(t) = 2t$. Which expression gives its displacement at time $t$?",
      "A",
      ["$t^2$", "$2t^2$", "$t^2 + C$", "$2$"],
      "x(t) = âˆ«2t dt = tÂ² + C. With x(0) = 0, C = 0, so x(t) = tÂ²."
    ),
    kinTyped(
      "y12e1-kin-int-i5",
      "A particle has velocity $v(t) = 8 - 2t$ m/s. Find the net displacement from $t = 0$ to $t = 6$.",
      "\\int_0^6 (8 - 2t)\\,dt = \\left[8t - t^2\\right]_0^6",
      "12",
      ["12 m"],
      "âˆ«â‚€â¶ (8 âˆ’ 2t) dt = [8t âˆ’ tÂ²]â‚€â¶ = (48 âˆ’ 36) âˆ’ 0 = 12 m."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to apply the initial condition to find C.",
      fix: "After integrating, substitute the known value (e.g. x(0) = 0) to determine C before writing the final function.",
    },
    {
      mistake: "Treating net displacement as total distance.",
      fix: "Net displacement is âˆ«v dt and can be zero or negative. Total distance requires splitting at v = 0 and adding magnitudes.",
    },
    {
      mistake: "Integrating x(t) instead of v(t) to find displacement.",
      fix: "Integrate velocity to get displacement: x = âˆ«v dt. Integrating displacement gives something unrelated to motion.",
    },
    {
      mistake: "Leaving C in the answer after an initial condition is given.",
      fix: "Always substitute the initial condition to find the numerical value of C and remove it from the final answer.",
    },
  ],
  masteryQuiz: [
    kinTyped(
      "y12e1-kin-int-m1",
      "A particle has velocity $v(t) = 2t + 3$ m/s and starts at the origin. Find $x(4)$.",
      "x(t) = t^2 + 3t + C,\\quad x(0) = 0",
      "28",
      ["28 m"],
      "x(t) = tÂ² + 3t. x(4) = 16 + 12 = 28 m."
    ),
    kinTyped(
      "y12e1-kin-int-m2",
      "A particle has acceleration $a(t) = 6t$ m/sÂ² and $v(0) = -4$ m/s. Find $v(2)$.",
      "v(t) = 3t^2 + C,\\quad v(0) = -4",
      "8",
      ["8 m/s"],
      "v(t) = 3tÂ² + C. v(0) = -4 gives C = -4. v(2) = 3(4) âˆ’ 4 = 12 âˆ’ 4 = 8 m/s."
    ),
    kinTyped(
      "y12e1-kin-int-m3",
      "Find the net displacement from $t = 1$ to $t = 3$ for a particle with velocity $v(t) = 2t$.",
      "\\int_1^3 2t\\,dt = \\left[t^2\\right]_1^3",
      "8",
      ["8 m"],
      "âˆ«â‚Â³ 2t dt = [tÂ²]â‚Â³ = 9 âˆ’ 1 = 8 m."
    ),
    kinChoice(
      "y12e1-kin-int-m4",
      "A particle starts at $x = 5$ when $t = 0$. After integrating $v(t)$, you get $x(t) = t^2 - 3t + C$. What is $C$?",
      "B",
      ["$0$", "$5$", "$-5$", "$3$"],
      "x(0) = 0 âˆ’ 0 + C = 5, so C = 5."
    ),
    kinTyped(
      "y12e1-kin-int-m5",
      "A particle has velocity $v(t) = 12 - 4t$ m/s. Find the net displacement from $t = 0$ to $t = 4$.",
      "\\int_0^4 (12 - 4t)\\,dt = \\left[12t - 2t^2\\right]_0^4",
      "16",
      ["16 m"],
      "âˆ«â‚€â´ (12 âˆ’ 4t) dt = [12t âˆ’ 2tÂ²]â‚€â´ = (48 âˆ’ 32) âˆ’ 0 = 16 m."
    ),
    kinChoice(
      "y12e1-kin-int-m6",
      "What does it mean for net displacement to equal zero over an interval?",
      "D",
      [
        "The particle stayed at the origin the whole time",
        "The particle did not move",
        "The velocity was always zero",
        "The particle returned to its starting position",
      ],
      "Zero net displacement means the particle finished at the same position it started â€” it may have moved away and returned."
    ),
    kinTyped(
      "y12e1-kin-int-m7",
      "A particle has acceleration $a(t) = -10$ m/sÂ² (constant) and $v(0) = 30$ m/s. Find the time when the particle is at rest.",
      "v(t) = 30 - 10t = 0",
      "3",
      ["3 s", "t = 3"],
      "v(t) = -10t + 30. Setting v = 0: 30 âˆ’ 10t = 0, so t = 3 s."
    ),
    kinChoice(
      "y12e1-kin-int-m8",
      "Which expression gives the velocity function when $a(t) = 4$ and $v(0) = 7$?",
      "A",
      ["$4t + 7$", "$4t$", "$4t - 7$", "$4t^2 + 7$"],
      "v(t) = âˆ«4 dt = 4t + C. v(0) = 7 gives C = 7, so v(t) = 4t + 7."
    ),
    kinTyped(
      "y12e1-kin-int-m9",
      "A particle has velocity $v(t) = t^2 - 4$ m/s and starts at $x = 0$ when $t = 0$. Find $x(3)$.",
      "x(t) = \\frac{t^3}{3} - 4t + C,\\quad x(0) = 0",
      "-3",
      ["âˆ’3", "-3 m"],
      "x(t) = tÂ³/3 âˆ’ 4t. x(3) = 27/3 âˆ’ 12 = 9 âˆ’ 12 = -3 m."
    ),
    kinChoice(
      "y12e1-kin-int-m10",
      "Which is the correct relationship between displacement, velocity and acceleration?",
      "C",
      [
        "$v = \\int a\\,dt,\\quad x = \\int v\\,dt$",
        "$a = \\int v\\,dt,\\quad v = \\int x\\,dt$",
        "$v = \\int a\\,dt,\\quad x = \\int v\\,dt$",
        "$x = \\frac{dv}{dt},\\quad v = \\frac{da}{dt}$",
      ],
      "Velocity is the integral of acceleration; displacement is the integral of velocity. Differentiation goes the other way."
    ),
  ],
  masteryPassMark: 0.8,
};

export function year12Extension1KinematicsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "kinematics") return undefined;

  switch (lesson.slug) {
    case "kinematics-velocity-acceleration":
      return {
        ...kinematicsVelocityAcceleration,
        id: "kinematics-velocity-acceleration",
        slug: "kinematics-velocity-acceleration",
        title: "Velocity and Acceleration from Displacement",
      };
    case "kinematics-displacement-from-velocity":
      return {
        ...kinematicsDisplacementFromVelocity,
        id: "kinematics-displacement-from-velocity",
        slug: "kinematics-displacement-from-velocity",
        title: "Displacement from Velocity by Integration",
      };
    default:
      return undefined;
  }
}
