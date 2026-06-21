import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Kinematics. (Pilot, see
 * docs/TOPIC_TEST_DIAGNOSTIC_PLAN.md.)
 *
 * D4/D5 only, auto-markable, per docs/QUESTION_AUTHORING_STANDARD.md.
 * Authored per subtopic, one band (10) at a time, audited after each batch.
 *
 * Status: subtopic 1 "Velocity and Acceleration from Displacement" — D4 batch
 * complete (10). D5 batch + subtopics 2–4 still on starter items.
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/kinematics/${lesson}`;

// ── Subtopic 1: Velocity and Acceleration from Displacement ──────────────────
// D4 (transfer/interpretation): each item differentiates, selects the right
// instant (a decision), then evaluates a *different* quantity.
const velAccD4: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-va-d4-1",
    prompt:
      "A particle's displacement is x = t³ − 6t² + 9t (metres, t ≥ 0). Find its acceleration at the second time it is momentarily at rest.",
    latex: "x = t^3 - 6t^2 + 9t",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$-6 \\text{ m/s}^2$" },
      { label: "B", text: "$6 \\text{ m/s}^2$" },
      { label: "C", text: "$18 \\text{ m/s}^2$" },
      { label: "D", text: "$0 \\text{ m/s}^2$" },
    ],
    answer: "B",
    explanation:
      "v = 3t² − 12t + 9 = 3(t − 1)(t − 3), so it is at rest at t = 1 and t = 3; the second is t = 3. a = 6t − 12, so a(3) = 6 m/s². A is the acceleration at the first rest; C drops the −12; D assumes a = 0 whenever v = 0.",
  },
  {
    id: "y12e1-kin-va-d4-2",
    prompt:
      "A particle moves with displacement x = t³ − 3t² − 24t (metres). Find its velocity, in m/s, at the instant its acceleration is zero.",
    latex: "x = t^3 - 3t^2 - 24t",
    marks: 3,
    difficulty: 4,
    answer: "-27",
    acceptedAnswers: ["−27"],
    explanation:
      "v = 3t² − 6t − 24 and a = 6t − 6. a = 0 at t = 1. v(1) = 3 − 6 − 24 = −27 m/s.",
  },
  {
    id: "y12e1-kin-va-d4-3",
    prompt:
      "A particle has displacement x = 2t³ − 9t² + 12t (metres). It is momentarily at rest twice; find the distance, in metres, between the two positions.",
    latex: "x = 2t^3 - 9t^2 + 12t",
    marks: 3,
    difficulty: 4,
    answer: "1",
    explanation:
      "v = 6t² − 18t + 12 = 6(t − 1)(t − 2), so it is at rest at t = 1 and t = 2. x(1) = 5 and x(2) = 4, so the positions are 1 m apart.",
  },
  {
    id: "y12e1-kin-va-d4-4",
    prompt:
      "A particle has displacement x = t³ − 12t (metres). Find its speed, in m/s, as it passes through the origin (t > 0).",
    latex: "x = t^3 - 12t",
    marks: 3,
    difficulty: 4,
    answer: "24",
    explanation:
      "x = t(t² − 12) = 0 at t = √12 (t > 0). v = 3t² − 12, so v = 3(12) − 12 = 24; the speed is 24 m/s.",
  },
  {
    id: "y12e1-kin-va-d4-5",
    prompt:
      "A particle has displacement x = t³ − 3t² (metres). Find its acceleration, in m/s², at the instant it returns to its starting position (t > 0).",
    latex: "x = t^3 - 3t^2",
    marks: 2,
    difficulty: 4,
    answer: "12",
    explanation:
      "It starts at x = 0. x = t²(t − 3) = 0 again at t = 3. a = 6t − 6, so a(3) = 12 m/s².",
  },
  {
    id: "y12e1-kin-va-d4-6",
    prompt:
      "A particle has displacement x = t³ − 9t² + 24t (metres). It is momentarily at rest at two times; find its average velocity, in m/s, over the interval between them.",
    latex: "x = t^3 - 9t^2 + 24t",
    marks: 3,
    difficulty: 4,
    answer: "-2",
    acceptedAnswers: ["−2"],
    explanation:
      "v = 3t² − 18t + 24 = 3(t − 2)(t − 4) = 0 at t = 2 and t = 4. Average velocity = (x(4) − x(2)) / (4 − 2) = (16 − 20) / 2 = −2 m/s (note this differs from the velocity, which is 0 at both ends).",
  },
  {
    id: "y12e1-kin-va-d4-7",
    prompt:
      "A particle has displacement x = −t³ + 6t² − 9t (metres). Find its minimum acceleration, in m/s², for 0 ≤ t ≤ 4.",
    latex: "x = -t^3 + 6t^2 - 9t",
    marks: 2,
    difficulty: 4,
    answer: "-12",
    acceptedAnswers: ["−12"],
    explanation:
      "a = −6t + 12 is linear and decreasing, so its minimum on [0, 4] is at t = 4: a(4) = −24 + 12 = −12 m/s².",
  },
  {
    id: "y12e1-kin-va-d4-8",
    prompt:
      "A particle has displacement x = t³ − 6t² + 9t (metres, t ≥ 0). How many times does it change direction?",
    latex: "x = t^3 - 6t^2 + 9t",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0$" },
      { label: "B", text: "$1$" },
      { label: "C", text: "$2$" },
      { label: "D", text: "$3$" },
    ],
    answer: "C",
    explanation:
      "Direction changes where v = 3(t − 1)(t − 3) changes sign — at t = 1 and t = 3, so twice. B counts only one root; A assumes constant direction; D over-counts.",
  },
  {
    id: "y12e1-kin-va-d4-9",
    prompt:
      "A particle has displacement x = t³ − 3t² − 9t (metres). Find its displacement, in metres, at the instant its velocity is least.",
    latex: "x = t^3 - 3t^2 - 9t",
    marks: 3,
    difficulty: 4,
    answer: "-11",
    acceptedAnswers: ["−11"],
    explanation:
      "v = 3t² − 6t − 9 is least where a = 6t − 6 = 0, i.e. t = 1. x(1) = 1 − 3 − 9 = −11 m.",
  },
  {
    id: "y12e1-kin-va-d4-10",
    prompt:
      "A particle has displacement x = t³ + 3t² − 9t (metres). Find its maximum velocity, in m/s, for 0 ≤ t ≤ 4.",
    latex: "x = t^3 + 3t^2 - 9t",
    marks: 3,
    difficulty: 4,
    answer: "63",
    explanation:
      "v = 3t² + 6t − 9. a = 6t + 6 > 0 on [0, 4], so v is increasing and is greatest at t = 4: v(4) = 48 + 24 − 9 = 63 m/s.",
  },
];

// D5 (synthesis / constraint reasoning / optimisation / transfer): the solution
// path is not a single obvious algorithm — each needs a constraint set up and
// solved, a parameter recovered, a genuine optimisation, or a comparison.
const velAccD5: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-va-d5-1",
    prompt:
      "A particle's displacement is x = t³ + at² + bt (metres), where a and b are constants. It is momentarily at rest at t = 2 and t = 4. Find its acceleration, in m/s², at t = 0.",
    latex: "x = t^3 + at^2 + bt",
    marks: 4,
    difficulty: 5,
    answer: "-18",
    acceptedAnswers: ["−18"],
    explanation:
      "v = 3t² + 2at + b has roots t = 2 and t = 4, so the sum 2 + 4 = −2a/3 gives a = −9. Acceleration is 6t + 2a = 6t − 18, so at t = 0 it is −18 m/s².",
  },
  {
    id: "y12e1-kin-va-d5-2",
    prompt:
      "A particle has displacement x = t³ − 6t² + kt (metres), where k is constant. Its minimum velocity is 5 m/s. Find k.",
    latex: "x = t^3 - 6t^2 + kt",
    marks: 3,
    difficulty: 5,
    answer: "17",
    explanation:
      "v = 3t² − 12t + k is least at its vertex t = 2, where v(2) = 12 − 24 + k = k − 12. Setting k − 12 = 5 gives k = 17.",
  },
  {
    id: "y12e1-kin-va-d5-3",
    prompt:
      "A particle has displacement of the form x = t³ + pt² + qt + r (metres). It starts at x = 2 m with velocity −9 m/s and acceleration 6 m/s². Find its displacement, in m, at t = 2.",
    latex: "x = t^3 + pt^2 + qt + r",
    marks: 4,
    difficulty: 5,
    answer: "4",
    explanation:
      "a = 6t + 2p, so a(0) = 2p = 6 gives p = 3; v(0) = q = −9; x(0) = r = 2. Thus x = t³ + 3t² − 9t + 2 and x(2) = 8 + 12 − 18 + 2 = 4 m.",
  },
  {
    id: "y12e1-kin-va-d5-4",
    prompt:
      "A particle has displacement x = t³ − 3t² + kt + 1 (metres), where k is constant. Find the smallest integer value of k for which the particle is never at rest.",
    latex: "x = t^3 - 3t^2 + kt + 1",
    marks: 3,
    difficulty: 5,
    answer: "4",
    explanation:
      "Never at rest means v = 3t² − 6t + k > 0 for all t, i.e. the discriminant 36 − 12k < 0, so k > 3. The smallest integer is k = 4.",
  },
  {
    id: "y12e1-kin-va-d5-5",
    prompt:
      "A particle has displacement x = t⁴ − 4t³ (metres). Find its minimum acceleration, in m/s², for t ≥ 0.",
    latex: "x = t^4 - 4t^3",
    marks: 4,
    difficulty: 5,
    answer: "-12",
    acceptedAnswers: ["−12"],
    explanation:
      "a = 12t² − 24t. This is least where da/dt = 24t − 24 = 0, i.e. t = 1. a(1) = 12 − 24 = −12 m/s² (a minimum since da/dt changes − to +).",
  },
  {
    id: "y12e1-kin-va-d5-6",
    prompt:
      "A particle has displacement x = t³ + pt² + qt (metres). Its displacement–time graph has a horizontal point of inflection at t = 2. Find q.",
    latex: "x = t^3 + pt^2 + qt",
    marks: 4,
    difficulty: 5,
    answer: "12",
    explanation:
      "A horizontal point of inflection needs both a = 0 and v = 0 there. a = 6t + 2p = 0 at t = 2 gives p = −6. Then v = 3t² − 12t + q and v(2) = q − 12 = 0 gives q = 12.",
  },
  {
    id: "y12e1-kin-va-d5-7",
    prompt:
      "Particle A has displacement x = t³ − 6t² + 9t and particle B has displacement x = t² − 2t (both in metres). Find the earliest time t > 0 at which they have the same velocity.",
    latex: "x_A = t^3 - 6t^2 + 9t, \\quad x_B = t^2 - 2t",
    marks: 4,
    difficulty: 5,
    answer: "1",
    explanation:
      "v_A = 3t² − 12t + 9 and v_B = 2t − 2. Equate: 3t² − 14t + 11 = 0 → (3t − 11)(t − 1) = 0, so t = 1 or t = 11/3. The earliest is t = 1 s.",
  },
  {
    id: "y12e1-kin-va-d5-8",
    prompt:
      "A particle has displacement of the form x = t³ + at² + bt (metres). It is momentarily at rest at t = 1 and again at t = 5. At what time, in seconds, is its acceleration zero?",
    latex: "x = t^3 + at^2 + bt",
    marks: 3,
    difficulty: 5,
    answer: "3",
    explanation:
      "v is a parabola whose roots are the rest times t = 1 and t = 5, so its vertex — where a = v′ = 0 — lies midway, at t = (1 + 5)/2 = 3 s. (No need to find a or b.)",
  },
  {
    id: "y12e1-kin-va-d5-9",
    prompt:
      "A particle has displacement x = t³ − 3t² − 9t (metres). Find its maximum speed, in m/s, for 0 ≤ t ≤ 2.",
    latex: "x = t^3 - 3t^2 - 9t",
    marks: 4,
    difficulty: 5,
    answer: "12",
    explanation:
      "v = 3t² − 6t − 9. On [0, 2] the endpoints give |v(0)| = |v(2)| = 9, but v has a turning point (a = 6t − 6 = 0) at t = 1 where v(1) = −12. Speed is |v|, so the maximum speed is 12 m/s at t = 1 — the insight is that maximum speed can occur where the velocity is most negative.",
  },
  {
    id: "y12e1-kin-va-d5-10",
    prompt:
      "A particle moves with displacement x = t³ − 3t² − 9t + 5 (metres). Find its minimum velocity, in m/s.",
    latex: "x = t^3 - 3t^2 - 9t + 5",
    marks: 3,
    difficulty: 5,
    answer: "-12",
    acceptedAnswers: ["−12"],
    explanation:
      "v = 3t² − 6t − 9 is least where a = 6t − 6 = 0, i.e. t = 1 (acceleration changes − to +). v(1) = 3 − 6 − 9 = −12 m/s.",
  },
];

// ── Subtopic 2: Displacement from Velocity by Integration ────────────────────
// D4: integrate v, fix the constant from a condition, then reason about
// position (a value, a turning point, a return, a net change).
const dispVelD4: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-dv-d4-1",
    prompt:
      "A particle has velocity v = 3t² − 12t + 9 (m/s) and is at x = 4 m when t = 0. Find its position, in m, at t = 2.",
    latex: "v = 3t^2 - 12t + 9, \\quad x(0) = 4",
    marks: 3,
    difficulty: 4,
    answer: "6",
    explanation:
      "x = ∫v dt = t³ − 6t² + 9t + C. x(0) = 4 gives C = 4. x(2) = 8 − 24 + 18 + 4 = 6 m.",
  },
  {
    id: "y12e1-kin-dv-d4-2",
    prompt:
      "A particle has velocity v = 3t² − 12t + 9 (m/s). Find its change in position (displacement), in metres, from t = 0 to t = 3.",
    latex: "v = 3t^2 - 12t + 9",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0 \\text{ m}$" },
      { label: "B", text: "$8 \\text{ m}$" },
      { label: "C", text: "$27 \\text{ m}$" },
      { label: "D", text: "$9 \\text{ m}$" },
    ],
    answer: "A",
    explanation:
      "Displacement = ∫₀³ v dt = [t³ − 6t² + 9t]₀³ = 27 − 54 + 27 = 0 m. B is the total distance (it changes direction at t = 1), not the displacement; C keeps only the t³ term; D is v(3).",
  },
  {
    id: "y12e1-kin-dv-d4-3",
    prompt:
      "A particle has velocity v = 6t² − 6 (m/s) and is at x = 5 m when t = 0. Find its position, in m, at t = 2.",
    latex: "v = 6t^2 - 6, \\quad x(0) = 5",
    marks: 2,
    difficulty: 4,
    answer: "9",
    explanation:
      "x = ∫v dt = 2t³ − 6t + C. x(0) = 5 gives C = 5. x(2) = 16 − 12 + 5 = 9 m.",
  },
  {
    id: "y12e1-kin-dv-d4-4",
    prompt:
      "A particle starts at the origin with velocity v = 2t − 8 (m/s). Find its position, in m, at the instant it is momentarily at rest.",
    latex: "v = 2t - 8, \\quad x(0) = 0",
    marks: 3,
    difficulty: 4,
    answer: "-16",
    acceptedAnswers: ["−16"],
    explanation:
      "x = ∫v dt = t² − 8t (C = 0). At rest v = 0 gives t = 4. x(4) = 16 − 32 = −16 m.",
  },
  {
    id: "y12e1-kin-dv-d4-5",
    prompt:
      "A particle starts at x = 3 m with velocity v = 8 − 2t (m/s). At what time t > 0 does it return to its starting position?",
    latex: "v = 8 - 2t, \\quad x(0) = 3",
    marks: 3,
    difficulty: 4,
    answer: "8",
    explanation:
      "x = ∫v dt = 8t − t² + 3. Returning to the start means x = 3, so 8t − t² = 0, i.e. t(8 − t) = 0. The non-zero solution is t = 8 s.",
  },
  {
    id: "y12e1-kin-dv-d4-6",
    prompt:
      "A particle starts at x = 1 m with velocity v = 4 − 2t (m/s). Find its maximum displacement, in metres.",
    latex: "v = 4 - 2t, \\quad x(0) = 1",
    marks: 3,
    difficulty: 4,
    answer: "5",
    explanation:
      "x = ∫v dt = 4t − t² + 1. Displacement is greatest where v = 0, i.e. t = 2. x(2) = 8 − 4 + 1 = 5 m.",
  },
  {
    id: "y12e1-kin-dv-d4-7",
    prompt:
      "A particle starts at x = 4 m with velocity v = 3t² − 6t (m/s). Find its minimum displacement, in metres, for t ≥ 0.",
    latex: "v = 3t^2 - 6t, \\quad x(0) = 4",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$4 \\text{ m}$" },
      { label: "B", text: "$0 \\text{ m}$" },
      { label: "C", text: "$-4 \\text{ m}$" },
      { label: "D", text: "$2 \\text{ m}$" },
    ],
    answer: "B",
    explanation:
      "x = ∫v dt = t³ − 3t² + 4. v = 3t(t − 2) = 0 at t = 0 and t = 2; the minimum on t ≥ 0 is at t = 2: x(2) = 8 − 12 + 4 = 0 m. A is the starting position; D is the time, not the position.",
  },
  {
    id: "y12e1-kin-dv-d4-8",
    prompt:
      "A particle starts at the origin with velocity v = 6t² − 18t + 12 (m/s). Find its position, in m, at the later of the two times it is at rest.",
    latex: "v = 6t^2 - 18t + 12, \\quad x(0) = 0",
    marks: 3,
    difficulty: 4,
    answer: "4",
    explanation:
      "x = ∫v dt = 2t³ − 9t² + 12t (C = 0). v = 6(t − 1)(t − 2) = 0 at t = 1 and t = 2; the later is t = 2. x(2) = 16 − 36 + 24 = 4 m.",
  },
  {
    id: "y12e1-kin-dv-d4-9",
    prompt:
      "A particle has velocity v = 2t + 1 (m/s) and is at x = 10 m when t = 3. Find its position, in m, at t = 0.",
    latex: "v = 2t + 1, \\quad x(3) = 10",
    marks: 3,
    difficulty: 4,
    answer: "-2",
    acceptedAnswers: ["−2"],
    explanation:
      "x = ∫v dt = t² + t + C. x(3) = 9 + 3 + C = 10 gives C = −2, so x(0) = C = −2 m.",
  },
  {
    id: "y12e1-kin-dv-d4-10",
    prompt:
      "A particle starts at x = 1 m with velocity v = 6t − 3t² (m/s). Find its displacement, in metres, at the instant its acceleration is zero.",
    latex: "v = 6t - 3t^2, \\quad x(0) = 1",
    marks: 3,
    difficulty: 4,
    answer: "3",
    explanation:
      "x = ∫v dt = 3t² − t³ + 1. Acceleration a = dv/dt = 6 − 6t = 0 at t = 1. x(1) = 3 − 1 + 1 = 3 m.",
  },
];

// D5: constraint reasoning, optimisation, transfer between two motions,
// generalisation, or synthesis — the integration is only the first move.
const dispVelD5: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-dv-d5-1",
    prompt:
      "A particle has velocity v = 6t + c (m/s), where c is constant. It is at x = 2 m when t = 0 and at x = 12 m when t = 2. Find c.",
    latex: "v = 6t + c, \\quad x(0) = 2, \\; x(2) = 12",
    marks: 4,
    difficulty: 5,
    answer: "-1",
    acceptedAnswers: ["−1"],
    explanation:
      "x = ∫v dt = 3t² + ct + C. x(0) = 2 gives C = 2. x(2) = 12 + 2c + 2 = 12, so 2c = −2 and c = −1.",
  },
  {
    id: "y12e1-kin-dv-d5-2",
    prompt:
      "A particle starts at the origin with velocity v = 4t − k (m/s), where k is constant. It returns to the origin at t = 4. Find k.",
    latex: "v = 4t - k, \\quad x(0) = 0",
    marks: 3,
    difficulty: 5,
    answer: "8",
    explanation:
      "x = ∫v dt = 2t² − kt (C = 0). Returning to the origin means x = 0 for t > 0: t(2t − k) = 0 gives t = k/2. Setting k/2 = 4 gives k = 8.",
  },
  {
    id: "y12e1-kin-dv-d5-3",
    prompt:
      "A particle has velocity v = at + b (m/s). Its initial velocity is −4 m/s, it is momentarily at rest at t = 2, and it starts at x = 1 m. Find its position, in m, at t = 2.",
    latex: "v = at + b, \\quad v(0) = -4, \\; x(0) = 1",
    marks: 4,
    difficulty: 5,
    answer: "-3",
    acceptedAnswers: ["−3"],
    explanation:
      "v(0) = b = −4. At rest v(2) = 2a + b = 0 gives a = 2, so v = 2t − 4. Then x = t² − 4t + C with x(0) = 1, so C = 1 and x(2) = 4 − 8 + 1 = −3 m.",
  },
  {
    id: "y12e1-kin-dv-d5-4",
    prompt:
      "Two particles leave the origin at t = 0: A has velocity v = 4t (m/s) and B has constant velocity v = 12 (m/s). At what time t > 0 are they at the same position again?",
    latex: "v_A = 4t, \\quad v_B = 12",
    marks: 4,
    difficulty: 5,
    answer: "6",
    explanation:
      "x_A = 2t² and x_B = 12t (both from the origin). Equal positions: 2t² = 12t, so 2t(t − 6) = 0, giving t = 6 s.",
  },
  {
    id: "y12e1-kin-dv-d5-5",
    prompt:
      "A particle starts at the origin with velocity v = 3t² − 18t + 24 (m/s). Find its greatest distance from the origin, in metres, during 0 ≤ t ≤ 4.",
    latex: "v = 3t^2 - 18t + 24, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "20",
    explanation:
      "x = t³ − 9t² + 24t. v = 3(t − 2)(t − 4) = 0 at t = 2 and t = 4. Comparing x(0) = 0, x(2) = 20, x(4) = 16, the greatest distance from the origin is 20 m at t = 2.",
  },
  {
    id: "y12e1-kin-dv-d5-6",
    prompt:
      "A particle has velocity v = 3t² − 12t + 9 (m/s). Its average velocity over 0 ≤ t ≤ T is zero. Find the value of T (T > 0).",
    latex: "v = 3t^2 - 12t + 9",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation:
      "Average velocity zero means net displacement ∫₀ᵀ v dt = 0. T³ − 6T² + 9T = T(T − 3)² = 0, so T = 3 s.",
  },
  {
    id: "y12e1-kin-dv-d5-7",
    prompt:
      "A particle has velocity v = 2t − 6 (m/s) and starts at an unknown position x = c. Find the time, in seconds, at which its displacement is least.",
    latex: "v = 2t - 6, \\quad x(0) = c",
    marks: 3,
    difficulty: 5,
    answer: "3",
    explanation:
      "x = t² − 6t + c. Displacement is least where v = 0, i.e. t = 3 — and this is independent of the starting position c.",
  },
  {
    id: "y12e1-kin-dv-d5-8",
    prompt:
      "A particle starts at x = 2 m with velocity v = 3t² − 6t − 9 (m/s). Find its minimum displacement, in metres, for t ≥ 0.",
    latex: "v = 3t^2 - 6t - 9, \\quad x(0) = 2",
    marks: 4,
    difficulty: 5,
    answer: "-25",
    acceptedAnswers: ["−25"],
    explanation:
      "x = t³ − 3t² − 9t + 2. v = 3(t − 3)(t + 1) = 0 at t = 3 (for t ≥ 0). Since x → ∞ afterwards, the minimum is x(3) = 27 − 27 − 27 + 2 = −25 m.",
  },
  {
    id: "y12e1-kin-dv-d5-9",
    prompt:
      "At t = 0, particle A leaves the origin with velocity v = 2t (m/s) while particle B is at x = 12 m moving with constant velocity v = −4 (m/s). At what time t > 0 do they meet?",
    latex: "v_A = 2t, \\quad v_B = -4, \\; x_B(0) = 12",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "x_A = t² and x_B = 12 − 4t. They meet when t² = 12 − 4t, i.e. t² + 4t − 12 = (t + 6)(t − 2) = 0, giving t = 2 s.",
  },
  {
    id: "y12e1-kin-dv-d5-10",
    prompt:
      "A particle has velocity v = 6t² − 6 (m/s) and starts at x = k. It passes through the origin at t = 1. Find k.",
    latex: "v = 6t^2 - 6, \\quad x(0) = k",
    marks: 3,
    difficulty: 5,
    answer: "4",
    explanation:
      "x = 2t³ − 6t + k. Passing through the origin at t = 1 means x(1) = 2 − 6 + k = 0, so k = 4.",
  },
];

// ── Subtopic 3: Analysing Motion — Direction Changes and Total Distance ──────
// D4: split the motion at direction changes (v = 0), then total distance,
// distance-vs-displacement, average speed, or the time/number of changes.
const motionD4: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ma-d4-1",
    prompt:
      "A particle starts at the origin with velocity v = t² − 4 (m/s) for 0 ≤ t ≤ 3. Find the total distance travelled, in metres.",
    latex: "v = t^2 - 4, \\quad 0 \\le t \\le 3",
    marks: 3,
    difficulty: 4,
    choices: [
      { label: "A", text: "$\\dfrac{23}{3} \\text{ m}$" },
      { label: "B", text: "$3 \\text{ m}$" },
      { label: "C", text: "$\\dfrac{16}{3} \\text{ m}$" },
      { label: "D", text: "$\\dfrac{25}{3} \\text{ m}$" },
    ],
    answer: "A",
    explanation:
      "v = 0 at t = 2 (a direction change). x = t³/3 − 4t, so x(2) = −16/3 and x(3) = −3. Distance = |−16/3| + |−3 − (−16/3)| = 16/3 + 7/3 = 23/3 m. B is the magnitude of the displacement (|x(3)|), not the distance; C is only the first leg; D adds |x(2)| + |x(3)| (positions from the origin) instead of the per-leg distances.",
  },
  {
    id: "y12e1-kin-ma-d4-2",
    prompt:
      "A particle starts at the origin with velocity v = 2t − 6 (m/s) for 0 ≤ t ≤ 5. Find the total distance travelled, in metres.",
    latex: "v = 2t - 6, \\quad 0 \\le t \\le 5",
    marks: 3,
    difficulty: 4,
    answer: "13",
    explanation:
      "v = 0 at t = 3. x = t² − 6t, so x(3) = −9 and x(5) = −5. Distance = |−9| + |−5 − (−9)| = 9 + 4 = 13 m.",
  },
  {
    id: "y12e1-kin-ma-d4-3",
    prompt:
      "A particle starts at the origin with velocity v = 4 − 2t (m/s). Find the distance, in metres, it travels between the instant it changes direction and t = 5.",
    latex: "v = 4 - 2t, \\quad x(0) = 0",
    marks: 3,
    difficulty: 4,
    answer: "9",
    explanation:
      "x = 4t − t². It changes direction at v = 0, i.e. t = 2, where x(2) = 4. After that v < 0, so the distance to t = 5 is |x(5) − x(2)| = |−5 − 4| = 9 m.",
  },
  {
    id: "y12e1-kin-ma-d4-4",
    prompt:
      "A particle has velocity v = t² − 5t + 6 (m/s) for t ≥ 0. How many times does it change direction?",
    latex: "v = t^2 - 5t + 6",
    marks: 2,
    difficulty: 4,
    choices: [
      { label: "A", text: "$0$" },
      { label: "B", text: "$1$" },
      { label: "C", text: "$2$" },
      { label: "D", text: "$3$" },
    ],
    answer: "C",
    explanation:
      "v = (t − 2)(t − 3) changes sign at t = 2 and t = 3, so the particle changes direction twice. B counts only one root.",
  },
  {
    id: "y12e1-kin-ma-d4-5",
    prompt:
      "A particle starts at the origin with velocity v = 12 − 6t (m/s) for 0 ≤ t ≤ 4. Find the total distance travelled, in metres.",
    latex: "v = 12 - 6t, \\quad 0 \\le t \\le 4",
    marks: 3,
    difficulty: 4,
    answer: "24",
    explanation:
      "v = 0 at t = 2. x = 12t − 3t², so x(2) = 12 and x(4) = 0. Distance = 12 + |0 − 12| = 24 m.",
  },
  {
    id: "y12e1-kin-ma-d4-6",
    prompt:
      "A particle starts at the origin with velocity v = 2t − 8 (m/s) for 0 ≤ t ≤ 6. By how many metres does the total distance travelled exceed the magnitude of its displacement?",
    latex: "v = 2t - 8, \\quad 0 \\le t \\le 6",
    marks: 4,
    difficulty: 4,
    answer: "8",
    explanation:
      "x = t² − 8t. v = 0 at t = 4, where x(4) = −16; x(6) = −12. Total distance = 16 + |−12 − (−16)| = 16 + 4 = 20 m; displacement magnitude = |x(6)| = 12 m. The excess is 20 − 12 = 8 m.",
  },
  {
    id: "y12e1-kin-ma-d4-7",
    prompt:
      "A particle starts at the origin with velocity v = 6 − 2t (m/s) for 0 ≤ t ≤ 6. Find its average speed, in m/s.",
    latex: "v = 6 - 2t, \\quad 0 \\le t \\le 6",
    marks: 4,
    difficulty: 4,
    answer: "3",
    explanation:
      "v = 0 at t = 3. x = 6t − t², so x(3) = 9 and x(6) = 0. Total distance = 9 + 9 = 18 m. Average speed = distance / time = 18 / 6 = 3 m/s.",
  },
  {
    id: "y12e1-kin-ma-d4-8",
    prompt:
      "A particle has velocity v = t² − 6t + 8 (m/s) for t ≥ 0. At what time, in seconds, does it first change direction?",
    latex: "v = t^2 - 6t + 8",
    marks: 2,
    difficulty: 4,
    answer: "2",
    explanation:
      "v = (t − 2)(t − 4), which first changes sign at t = 2 s.",
  },
  {
    id: "y12e1-kin-ma-d4-9",
    prompt:
      "A particle starts at the origin with velocity v = 3t² − 18t + 24 (m/s) for 0 ≤ t ≤ 5. Find the total distance travelled, in metres.",
    latex: "v = 3t^2 - 18t + 24, \\quad 0 \\le t \\le 5",
    marks: 4,
    difficulty: 4,
    answer: "28",
    explanation:
      "v = 3(t − 2)(t − 4) = 0 at t = 2 and t = 4. x = t³ − 9t² + 24t gives x(2) = 20, x(4) = 16, x(5) = 20. Distance = 20 + |16 − 20| + |20 − 16| = 20 + 4 + 4 = 28 m.",
  },
  {
    id: "y12e1-kin-ma-d4-10",
    prompt:
      "A particle starts at the origin with velocity v = 8 − 2t (m/s). Find the total distance, in metres, it has travelled by the time it next returns to the origin.",
    latex: "v = 8 - 2t, \\quad x(0) = 0",
    marks: 4,
    difficulty: 4,
    answer: "32",
    explanation:
      "x = 8t − t² = t(8 − t), so it returns to the origin at t = 8. It changes direction at v = 0, i.e. t = 4, where x(4) = 16. Distance = 16 (out) + 16 (back) = 32 m.",
  },
];

// D5: total-distance reasoning combined with constraint, work-backwards,
// transfer between particles, optimisation, or generalisation.
const motionD5: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ma-d5-1",
    prompt:
      "A particle has velocity v = 3t² − 12t + 9 (m/s) for 0 ≤ t ≤ 4 and starts at the origin. Find the total distance travelled, in metres.",
    latex: "v = 3t^2 - 12t + 9, \\quad 0 \\le t \\le 4",
    marks: 4,
    difficulty: 5,
    answer: "12",
    explanation:
      "v = 3(t − 1)(t − 3), so direction changes at t = 1 and t = 3. x = t³ − 6t² + 9t gives positions 0, 4, 0, 4 at t = 0, 1, 3, 4. Distance = 4 + 4 + 4 = 12 m.",
  },
  {
    id: "y12e1-kin-ma-d5-2",
    prompt:
      "A particle starts at the origin with velocity v = 2t − c (m/s), where c is constant. It changes direction at t = 3. Find the total distance travelled, in metres, for 0 ≤ t ≤ 4.",
    latex: "v = 2t - c, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "10",
    explanation:
      "Changing direction at t = 3 means v(3) = 6 − c = 0, so c = 6 and v = 2t − 6. x = t² − 6t gives x(3) = −9, x(4) = −8. Distance = 9 + |−8 − (−9)| = 9 + 1 = 10 m.",
  },
  {
    id: "y12e1-kin-ma-d5-3",
    prompt:
      "A particle starts at the origin with velocity v = 2t − 8 (m/s). Find the time, in seconds, at which the total distance travelled first reaches 20 m.",
    latex: "v = 2t - 8, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "6",
    explanation:
      "x = t² − 8t. It moves backward until t = 4, reaching x(4) = −16 (16 m travelled). For t > 4 it moves forward, so distance = 16 + (x(t) − x(4)) = t² − 8t + 32. Setting this to 20 gives t² − 8t + 12 = 0, (t − 2)(t − 6) = 0, so t = 6 s.",
  },
  {
    id: "y12e1-kin-ma-d5-4",
    prompt:
      "Two particles leave the origin at t = 0: A has velocity v = 2t (m/s) and B has constant velocity v = 6 (m/s). How far apart are they, in metres, at t = 4?",
    latex: "v_A = 2t, \\quad v_B = 6",
    marks: 3,
    difficulty: 5,
    answer: "8",
    explanation:
      "x_A = t² = 16 m and x_B = 6t = 24 m at t = 4. They are |24 − 16| = 8 m apart.",
  },
  {
    id: "y12e1-kin-ma-d5-5",
    prompt:
      "A particle starts at the origin with velocity v = 2t − 6 (m/s). Find the largest time T (in seconds) for which the total distance travelled over 0 ≤ t ≤ T still equals the magnitude of its displacement.",
    latex: "v = 2t - 6, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "3",
    explanation:
      "Distance equals |displacement| only while the particle has not reversed. It first changes direction at v = 0, i.e. t = 3, so the largest such T is 3 s.",
  },
  {
    id: "y12e1-kin-ma-d5-6",
    prompt:
      "A particle has velocity v = 3t² − 12t + k (m/s), where k is constant. It is momentarily at rest exactly once for t > 0. Find that time, in seconds.",
    latex: "v = 3t^2 - 12t + k",
    marks: 4,
    difficulty: 5,
    answer: "2",
    explanation:
      "Exactly one rest means v = 0 has a repeated root: discriminant 144 − 12k = 0, so k = 12 and v = 3(t − 2)². The particle is at rest at t = 2 s.",
  },
  {
    id: "y12e1-kin-ma-d5-7",
    prompt:
      "A particle has velocity v = 2t − 6 (m/s) and starts at an unknown position x = c. Find the total distance, in metres, it travels by the time it next returns to its starting position.",
    latex: "v = 2t - 6, \\quad x(0) = c",
    marks: 4,
    difficulty: 5,
    answer: "18",
    explanation:
      "x = t² − 6t + c. It returns to x = c when t² − 6t = 0, i.e. t = 6, having turned at t = 3 (where x = c − 9). Distance = 9 (out) + 9 (back) = 18 m — independent of c.",
  },
  {
    id: "y12e1-kin-ma-d5-8",
    prompt:
      "Two particles leave the origin at t = 0: A has velocity v = 4t (m/s) and B has constant velocity v = 12 (m/s). How far apart are they, in metres, at the instant B has travelled 36 m?",
    latex: "v_A = 4t, \\quad v_B = 12",
    marks: 4,
    difficulty: 5,
    answer: "18",
    explanation:
      "B has travelled 36 m when 12t = 36, i.e. t = 3. Then x_A = 2t² = 18 m, so they are |36 − 18| = 18 m apart.",
  },
  {
    id: "y12e1-kin-ma-d5-9",
    prompt:
      "A particle starts at the origin with velocity v = 3t² + bt (m/s), where b is constant. It changes direction at t = 2 (in addition to t = 0). Find the total distance travelled, in metres, for 0 ≤ t ≤ 3.",
    latex: "v = 3t^2 + bt, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "8",
    explanation:
      "v = t(3t + b) is zero at t = 0 and t = −b/3. Setting −b/3 = 2 gives b = −6, so v = 3t² − 6t and x = t³ − 3t². x(2) = −4, x(3) = 0. Distance = 4 + |0 − (−4)| = 8 m.",
  },
  {
    id: "y12e1-kin-ma-d5-10",
    prompt:
      "A particle starts at the origin with velocity v = t² − 6t + 5 (m/s). Find its greatest distance from the origin, in metres, during 0 ≤ t ≤ 5.",
    latex: "v = t^2 - 6t + 5, \\quad x(0) = 0",
    marks: 4,
    difficulty: 5,
    answer: "25/3",
    acceptedAnswers: ["8.33", "8.333333333333334", "8.3"],
    explanation:
      "v = (t − 1)(t − 5) = 0 at t = 1 and t = 5. x = t³/3 − 3t² + 5t gives x(1) = 7/3 and x(5) = −25/3. The greatest distance from the origin is |−25/3| = 25/3 ≈ 8.33 m at t = 5.",
  },
];

// ── Subtopic 4: Kinematics Exam Practice — D6 (exam-mastery synoptic) ─────────
// Multi-part Section II–style items: each combines ≥2 concepts across a
// multi-stage solution where later parts build on earlier ones. See the D6
// definition in docs/QUESTION_AUTHORING_STANDARD.md.
const examD6: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ex-d6-1",
    prompt:
      "A particle moves in a straight line with acceleration a = 6t − 12 (m/s²). At t = 0 it is at the origin with velocity 9 m/s.",
    latex: "a = 6t - 12, \\quad x(0) = 0, \\; v(0) = 9",
    marks: 7,
    difficulty: 6,
    explanation:
      "Integrate a → v → x, then analyse direction changes. v = 3t² − 12t + 9, x = t³ − 6t² + 9t.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the velocity, in m/s, at t = 3.",
        marks: 2,
        answer: "0",
        explanation: "v = ∫a dt = 3t² − 12t + C; v(0) = 9 ⇒ C = 9. v(3) = 27 − 36 + 9 = 0.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the minimum velocity, in m/s, during 0 ≤ t ≤ 3.",
        marks: 2,
        answer: "-3",
        acceptedAnswers: ["−3"],
        explanation: "Velocity is least where a = 0, i.e. t = 2: v(2) = 12 − 24 + 9 = −3 m/s.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the total distance travelled, in metres, in the first 3 seconds.",
        marks: 3,
        answer: "8",
        explanation:
          "x = t³ − 6t² + 9t. v = 3(t − 1)(t − 3): direction change at t = 1. x(1) = 4, x(3) = 0. Distance = 4 + |0 − 4| = 8 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-2",
    prompt:
      "A train starts from rest and accelerates uniformly at 2 m/s² for 10 s, then travels at constant velocity for 30 s, then decelerates uniformly to rest in a further 5 s.",
    marks: 6,
    difficulty: 6,
    explanation:
      "Three-phase motion: combine v = u + at and distance as area under the velocity–time graph.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the maximum velocity, in m/s.",
        marks: 1,
        answer: "20",
        explanation: "v = u + at = 0 + 2 × 10 = 20 m/s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the distance, in metres, travelled during the acceleration phase.",
        marks: 2,
        answer: "100",
        explanation: "s = ½at² = ½ × 2 × 10² = 100 m.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the total distance, in metres, travelled by the train.",
        marks: 3,
        answer: "750",
        explanation:
          "Accel 100 m + constant 20 × 30 = 600 m + decel ½ × 20 × 5 = 50 m. Total = 750 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-3",
    prompt:
      "A ball is thrown vertically upward from ground level with velocity 30 m/s and acceleration −10 m/s², so its height is h = 30t − 5t² (metres).",
    latex: "h = 30t - 5t^2",
    marks: 6,
    difficulty: 6,
    explanation:
      "Combine maximum height (v = 0), time of flight (h = 0), and total distance (up + down).",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the maximum height, in metres.",
        marks: 2,
        answer: "45",
        explanation: "v = 30 − 10t = 0 at t = 3. h(3) = 90 − 45 = 45 m.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the time, in seconds, it returns to the ground.",
        marks: 1,
        answer: "6",
        explanation: "h = t(30 − 5t) = 0 at t = 6 s.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the total distance travelled, in metres, in the first 5 seconds.",
        marks: 3,
        answer: "65",
        explanation:
          "Up 45 m to t = 3, then h(5) = 150 − 125 = 25, a fall of 20 m. Total = 45 + 20 = 65 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-4",
    prompt:
      "A particle moves in a straight line with displacement x = t⁴ − 4t³ (metres).",
    latex: "x = t^4 - 4t^3",
    marks: 6,
    difficulty: 6,
    explanation:
      "Work with v = 4t³ − 12t² and a = 12t² − 24t, including optimising the acceleration.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the velocity, in m/s, at the time (t > 0) the acceleration is zero.",
        marks: 2,
        answer: "-16",
        acceptedAnswers: ["−16"],
        explanation: "a = 12t² − 24t = 12t(t − 2) = 0 at t = 2 (t > 0). v(2) = 32 − 48 = −16 m/s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the minimum acceleration, in m/s², for t ≥ 0.",
        marks: 2,
        answer: "-12",
        acceptedAnswers: ["−12"],
        explanation: "a = 12t² − 24t is least where da/dt = 24t − 24 = 0, i.e. t = 1: a(1) = −12 m/s².",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the displacement, in metres, when the particle is momentarily at rest (t > 0).",
        marks: 2,
        answer: "-27",
        acceptedAnswers: ["−27"],
        explanation: "v = 4t²(t − 3) = 0 at t = 3. x(3) = 81 − 108 = −27 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-5",
    prompt:
      "Two particles leave the origin at t = 0. Particle A has displacement x = t³ and particle B has displacement x = 12t (metres).",
    latex: "x_A = t^3, \\quad x_B = 12t",
    marks: 6,
    difficulty: 6,
    explanation:
      "Compare the two motions through velocity, separation, and position.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the time, in seconds, at which they have the same velocity.",
        marks: 2,
        answer: "2",
        explanation: "v_A = 3t², v_B = 12. 3t² = 12 ⇒ t = 2 s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find how far apart they are, in metres, at that time.",
        marks: 2,
        answer: "16",
        explanation: "x_A(2) = 8, x_B(2) = 24, so they are |24 − 8| = 16 m apart.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the time, in seconds, at which A overtakes B (same position, t > 0). Give an exact value.",
        marks: 2,
        answer: "2sqrt3",
        acceptedAnswers: ["2√3", "2 sqrt 3", "2*sqrt(3)", "3.46", "3.464"],
        explanation: "Same position: t³ = 12t ⇒ t² = 12 ⇒ t = 2√3 s (≈ 3.46).",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-6",
    prompt:
      "A car travelling at 20 m/s brakes with constant deceleration and stops after 50 m.",
    marks: 7,
    difficulty: 6,
    explanation:
      "Use v² = u² + 2as and v = u + at, then a distance-in-an-interval calculation.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the deceleration, in m/s² (give it as a negative acceleration).",
        marks: 2,
        answer: "-4",
        acceptedAnswers: ["−4"],
        explanation: "0 = 20² + 2a(50) ⇒ 100a = −400 ⇒ a = −4 m/s².",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the time, in seconds, it takes to stop.",
        marks: 2,
        answer: "5",
        explanation: "0 = 20 + (−4)t ⇒ t = 5 s.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the distance, in metres, travelled during the final second before stopping.",
        marks: 3,
        answer: "2",
        explanation:
          "x = 20t − 2t². x(5) = 50, x(4) = 48, so the distance from t = 4 to t = 5 is 2 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-7",
    prompt:
      "A stone is thrown downward from a 120 m cliff with initial speed 10 m/s and acceleration 10 m/s², so the distance fallen is s = 5t² + 10t (metres).",
    latex: "s = 5t^2 + 10t",
    marks: 5,
    difficulty: 6,
    explanation:
      "Combine time of flight, impact velocity, and distance in the final second.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the time, in seconds, it takes to hit the ground.",
        marks: 2,
        answer: "4",
        explanation: "5t² + 10t = 120 ⇒ t² + 2t − 24 = (t + 6)(t − 4) = 0 ⇒ t = 4 s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find its speed, in m/s, when it hits the ground.",
        marks: 1,
        answer: "50",
        explanation: "v = 10 + 10t = 10 + 40 = 50 m/s.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the distance, in metres, it falls during the final second.",
        marks: 2,
        answer: "45",
        explanation: "s(4) = 120, s(3) = 45 + 30 = 75, so the final-second distance is 120 − 75 = 45 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-8",
    prompt:
      "A particle moves in a straight line with displacement x = t³ − 3t² − 9t + 5 (metres).",
    latex: "x = t^3 - 3t^2 - 9t + 5",
    marks: 6,
    difficulty: 6,
    explanation:
      "Combine an optimisation of velocity with a rest analysis and a total-distance calculation.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the minimum velocity, in m/s.",
        marks: 2,
        answer: "-12",
        acceptedAnswers: ["−12"],
        explanation: "v = 3t² − 6t − 9 is least where a = 6t − 6 = 0, i.e. t = 1: v(1) = −12 m/s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the time (t > 0), in seconds, when the particle is momentarily at rest.",
        marks: 2,
        answer: "3",
        explanation: "v = 3(t − 3)(t + 1) = 0 ⇒ t = 3 s (for t > 0).",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the total distance, in metres, travelled in the first 3 seconds.",
        marks: 2,
        answer: "27",
        explanation:
          "v < 0 throughout 0 < t < 3, so distance = |x(3) − x(0)| = |−22 − 5| = 27 m.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-9",
    prompt:
      "A particle starts from rest and accelerates uniformly in a straight line, reaching a speed of 24 m/s after travelling 144 m.",
    marks: 6,
    difficulty: 6,
    explanation:
      "Use v² = u² + 2as, v = u + at, and average velocity for uniform acceleration.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the acceleration, in m/s².",
        marks: 2,
        answer: "2",
        explanation: "24² = 0 + 2a(144) ⇒ 576 = 288a ⇒ a = 2 m/s².",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the time taken, in seconds.",
        marks: 2,
        answer: "12",
        explanation: "v = u + at ⇒ 24 = 2t ⇒ t = 12 s.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the average velocity, in m/s, over the 144 m.",
        marks: 2,
        answer: "12",
        explanation: "For uniform acceleration, average velocity = (u + v)/2 = (0 + 24)/2 = 12 m/s.",
      },
    ],
  },
  {
    id: "y12e1-kin-ex-d6-10",
    prompt:
      "A particle moves in a straight line with displacement x = t³ − 9t² + 24t (metres).",
    latex: "x = t^3 - 9t^2 + 24t",
    marks: 6,
    difficulty: 6,
    explanation:
      "Combine rest analysis, total distance across two direction changes, and maximum speed.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the later of the two times, in seconds, the particle is at rest.",
        marks: 1,
        answer: "4",
        explanation: "v = 3(t − 2)(t − 4) = 0 ⇒ t = 2 and t = 4; the later is t = 4 s.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the total distance, in metres, travelled during 0 ≤ t ≤ 5.",
        marks: 3,
        answer: "28",
        explanation:
          "x(0) = 0, x(2) = 20, x(4) = 16, x(5) = 20. Distance = 20 + |16 − 20| + |20 − 16| = 28 m.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the maximum speed, in m/s, during 0 ≤ t ≤ 5.",
        marks: 2,
        answer: "24",
        explanation:
          "v = 3t² − 18t + 24. Values |v| are 24, 3, 9 at t = 0, 3, 5, so the maximum speed is 24 m/s at t = 0.",
      },
    ],
  },
];

export const kinematicsPool: TopicTestPool = {
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  topicSlug: "kinematics",
  topicTitle: "Kinematics",
  subtopics: [
    {
      subtopicSlug: "kinematics-velocity-acceleration",
      subtopicTitle: "Velocity and Acceleration from Displacement",
      remediationHref: href("kinematics-velocity-acceleration"),
      d4: velAccD4,
      d5: velAccD5,
    },
    {
      subtopicSlug: "kinematics-displacement-from-velocity",
      subtopicTitle: "Displacement from Velocity by Integration",
      remediationHref: href("kinematics-displacement-from-velocity"),
      d4: dispVelD4,
      d5: dispVelD5,
    },
    {
      subtopicSlug: "kinematics-motion-analysis",
      subtopicTitle: "Analysing Motion: Direction Changes and Total Distance",
      remediationHref: href("kinematics-motion-analysis"),
      d4: motionD4,
      d5: motionD5,
    },
    {
      subtopicSlug: "kinematics-exam-practice",
      subtopicTitle: "Kinematics Exam Practice",
      remediationHref: href("kinematics-exam-practice"),
      d4: [],
      d5: [],
      d6: examD6,
    },
  ],
};
