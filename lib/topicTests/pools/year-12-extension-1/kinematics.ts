import type { TopicTestPool, TopicTestQuestion } from "../../types";

/**
 * Topic-test pool — Year 12 Extension 1 · Kinematics. (Pilot, see
 * docs/TOPIC_TEST_DIAGNOSTIC_PLAN.md.)
 *
 * STARTER SET: 1 D4 + 1 D5 per subtopic, hand-verified, to light up the
 * pipeline end-to-end. CONTENT TODO (Phase 1 content slice): grow each band to
 * 10. Every item is auto-markable (numeric / MCQ) per
 * docs/QUESTION_AUTHORING_STANDARD.md — no "prove/justify/explain".
 */

const href = (lesson: string) =>
  `/course/year-12-extension-1/kinematics/${lesson}`;

// ── Velocity and Acceleration from Displacement ──────────────────────────────
const velAccD4: TopicTestQuestion = {
  id: "y12e1-kin-va-d4-1",
  prompt:
    "A particle's displacement is x = t³ − 6t² + 9t (metres, t ≥ 0). Find its acceleration at the second time it is momentarily at rest.",
  latex: "x = t^3 - 6t^2 + 9t",
  marks: 2,
  difficulty: 4,
  choices: [
    { label: "A", text: "$-6 \\text{ m/s}^2$" },
    { label: "B", text: "$6 \\text{ m/s}^2$" },
    { label: "C", text: "$0 \\text{ m/s}^2$" },
    { label: "D", text: "$12 \\text{ m/s}^2$" },
  ],
  answer: "B",
  explanation:
    "v = 3t² − 12t + 9 = 3(t − 1)(t − 3), so the particle is at rest at t = 1 and t = 3; the second time is t = 3. a = 6t − 12, so a(3) = 6 m/s². Option A is the acceleration at the first rest (t = 1); C confuses 'at rest' (v = 0) with a = 0.",
};

const velAccD5: TopicTestQuestion = {
  id: "y12e1-kin-va-d5-1",
  prompt:
    "A particle moves with displacement x = t³ − 3t² − 9t + 5 (metres). Find its minimum velocity, in m/s.",
  latex: "x = t^3 - 3t^2 - 9t + 5",
  marks: 3,
  difficulty: 5,
  answer: "-12",
  acceptedAnswers: ["−12"],
  explanation:
    "v = 3t² − 6t − 9. Velocity is minimised where a = v′ = 6t − 6 = 0, i.e. t = 1 (acceleration changes − to +). v(1) = 3 − 6 − 9 = −12 m/s.",
};

// ── Displacement from Velocity by Integration ────────────────────────────────
const dispVelD4: TopicTestQuestion = {
  id: "y12e1-kin-dv-d4-1",
  prompt:
    "A particle has velocity v = 3t² − 12t + 9 (m/s) and is at x = 4 m when t = 0. Find its position, in m, at t = 2.",
  latex: "v = 3t^2 - 12t + 9, \\quad x(0) = 4",
  marks: 3,
  difficulty: 4,
  answer: "6",
  explanation:
    "x = ∫v dt = t³ − 6t² + 9t + C. x(0) = 4 gives C = 4. x(2) = 8 − 24 + 18 + 4 = 6 m.",
};

const dispVelD5: TopicTestQuestion = {
  id: "y12e1-kin-dv-d5-1",
  prompt:
    "A particle starts at the origin with velocity v = 3t² − 12t (m/s). At what time t > 0 does it next return to the origin?",
  latex: "v = 3t^2 - 12t, \\quad x(0) = 0",
  marks: 3,
  difficulty: 5,
  answer: "6",
  explanation:
    "x = ∫v dt = t³ − 6t² (C = 0). x = t²(t − 6) = 0 at t = 0 and t = 6, so it returns to the origin at t = 6 s.",
};

// ── Analysing Motion: Direction Changes and Total Distance ───────────────────
const motionD4: TopicTestQuestion = {
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
};

const motionD5: TopicTestQuestion = {
  id: "y12e1-kin-ma-d5-1",
  prompt:
    "A particle has velocity v = 3t² − 12t + 9 (m/s) for 0 ≤ t ≤ 4 and starts at the origin. Find the total distance travelled, in metres.",
  latex: "v = 3t^2 - 12t + 9, \\quad 0 \\le t \\le 4",
  marks: 4,
  difficulty: 5,
  answer: "12",
  explanation:
    "v = 3(t − 1)(t − 3), so direction changes at t = 1 and t = 3. x = t³ − 6t² + 9t gives positions 0, 4, 0, 4 at t = 0, 1, 3, 4. Distance = 4 + 4 + 4 = 12 m.",
};

// ── Kinematics Exam Practice (synoptic) ──────────────────────────────────────
const examD4: TopicTestQuestion = {
  id: "y12e1-kin-ex-d4-1",
  prompt:
    "A ball is thrown vertically and its height is h = 20t − 5t² (metres). Find its maximum height, in metres.",
  latex: "h = 20t - 5t^2",
  marks: 2,
  difficulty: 4,
  answer: "20",
  explanation:
    "v = h′ = 20 − 10t = 0 at t = 2 s. h(2) = 40 − 20 = 20 m.",
};

const examD5: TopicTestQuestion = {
  id: "y12e1-kin-ex-d5-1",
  prompt:
    "A ball's height above its launch level is h = 20t − 5t² (metres). Find the total distance it travels in the first 5 seconds, in metres.",
  latex: "h = 20t - 5t^2",
  marks: 3,
  difficulty: 5,
  answer: "65",
  explanation:
    "It rises to a maximum of 20 m at t = 2 (20 m up), then falls to h(5) = 100 − 125 = −25 m (45 m down). Total distance = 20 + 45 = 65 m.",
};

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
      d4: [velAccD4],
      d5: [velAccD5],
    },
    {
      subtopicSlug: "kinematics-displacement-from-velocity",
      subtopicTitle: "Displacement from Velocity by Integration",
      remediationHref: href("kinematics-displacement-from-velocity"),
      d4: [dispVelD4],
      d5: [dispVelD5],
    },
    {
      subtopicSlug: "kinematics-motion-analysis",
      subtopicTitle: "Analysing Motion: Direction Changes and Total Distance",
      remediationHref: href("kinematics-motion-analysis"),
      d4: [motionD4],
      d5: [motionD5],
    },
    {
      subtopicSlug: "kinematics-exam-practice",
      subtopicTitle: "Kinematics Exam Practice",
      remediationHref: href("kinematics-exam-practice"),
      d4: [examD4],
      d5: [examD5],
    },
  ],
};
