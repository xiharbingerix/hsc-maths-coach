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

// ─── Lesson 1: Velocity and Acceleration from Displacement ───────────────────

const kinematicsVelocityAcceleration: Partial<ExplicitLesson> = {
  description:
    "Use differentiation to find velocity and acceleration from a displacement function, and interpret the signs of these quantities in straight-line motion.",
  learningIntention:
    "Differentiate a displacement function to find velocity and acceleration, and interpret their signs to describe the motion of a particle.",
  successCriteria: [
    "Find velocity by differentiating displacement with respect to time: v = dx/dt.",
    "Find acceleration by differentiating velocity: a = dv/dt = d²x/dt².",
    "Identify when a particle is at rest by solving v(t) = 0.",
    "Interpret the sign of velocity as the direction of motion.",
  ],
  teaching: {
    paragraphs: [
      "In kinematics, displacement x(t) measures a particle's position from a fixed origin at time t. The rate at which that position changes is the velocity. Since velocity measures how quickly displacement changes, it is simply the derivative of x with respect to t.",
      "Acceleration measures how quickly velocity is changing. It is the derivative of v — or equivalently the second derivative of x. These two relationships, v = dx/dt and a = dv/dt, are the foundation of all straight-line motion problems.",
      "When v(t) > 0 the particle moves in the positive direction. When v(t) < 0 it moves in the negative direction. The particle is momentarily at rest when v(t) = 0, and it often changes direction at that instant if the sign of v changes.",
      "Speed and velocity are different: speed = |v|. A particle can have a large speed while moving in the negative direction. Deceleration occurs when acceleration and velocity have opposite signs — the particle is slowing down even if it is not reversing.",
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
      "a(t) = dv/dt = 4. The acceleration is constant at 4 m/s²."
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
      ["−6", "-6 m/s^2"],
      "v(t) = 6t^2 - 18t + 12, so a(t) = 12t - 18. At t = 1: a(1) = 12 - 18 = -6 m/s²."
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
      "v(t) = 3t^2 - 6t, so a(t) = 6t - 6. At t = 2: a(2) = 12 - 6 = 6 m/s²."
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
      "Deceleration means the speed is decreasing, which occurs when a and v have opposite signs — the acceleration is working against the motion."
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
      "Acceleration is the second derivative of displacement with respect to time: a = d²x/dt²."
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
    default:
      return undefined;
  }
}
