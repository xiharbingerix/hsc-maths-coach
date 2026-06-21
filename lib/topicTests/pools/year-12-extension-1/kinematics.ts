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

// ── Subtopic 2: Displacement from Velocity by Integration (starter) ──────────
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
];

const dispVelD5: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-dv-d5-1",
    prompt:
      "A particle starts at the origin with velocity v = 3t² − 12t (m/s). At what time t > 0 does it next return to the origin?",
    latex: "v = 3t^2 - 12t, \\quad x(0) = 0",
    marks: 3,
    difficulty: 5,
    answer: "6",
    explanation:
      "x = ∫v dt = t³ − 6t² (C = 0). x = t²(t − 6) = 0 at t = 0 and t = 6, so it returns to the origin at t = 6 s.",
  },
];

// ── Subtopic 3: Analysing Motion (starter) ───────────────────────────────────
const motionD4: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ma-d4-1",
    prompt:
      "A particle starts at the origin with velocity v = t² − 4 (m/s) for 0 ≤ t ≤ 3. Find the total distance travelled, in metres.",
    latex: "v = t^2 - 4, \\quad 0 \\le t \\le 3",
    marks: 3,
    difficulty: 4,
    answer: "23/3",
    acceptedAnswers: ["7.67", "7.666666666666667", "7.66"],
    explanation:
      "v = 0 at t = 2 (a direction change). x = t³/3 − 4t, so x(2) = −16/3 and x(3) = −3. Distance = |−16/3| + |−3 − (−16/3)| = 16/3 + 7/3 = 23/3 ≈ 7.67 m.",
  },
];

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
];

// ── Subtopic 4: Kinematics Exam Practice (starter) ───────────────────────────
const examD4: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ex-d4-1",
    prompt:
      "A ball is thrown vertically and its height is h = 20t − 5t² (metres). Find its maximum height, in metres.",
    latex: "h = 20t - 5t^2",
    marks: 2,
    difficulty: 4,
    answer: "20",
    explanation:
      "v = h′ = 20 − 10t = 0 at t = 2 s. h(2) = 40 − 20 = 20 m.",
  },
];

const examD5: TopicTestQuestion[] = [
  {
    id: "y12e1-kin-ex-d5-1",
    prompt:
      "A ball's height above its launch level is h = 20t − 5t² (metres). Find the total distance it travels in the first 5 seconds, in metres.",
    latex: "h = 20t - 5t^2",
    marks: 3,
    difficulty: 5,
    answer: "65",
    explanation:
      "It rises to a maximum of 20 m at t = 2 (20 m up), then falls to h(5) = 100 − 125 = −25 m (45 m down). Total distance = 20 + 45 = 65 m.",
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
      d4: examD4,
      d5: examD5,
    },
  ],
};
