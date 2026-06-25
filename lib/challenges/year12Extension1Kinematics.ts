import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Kinematics" — the motion / phase-
// relationship exemplar. Difficulty is carried by REVERSE and RELATIONAL motion reasoning:
// reconstruct initial conditions from later motion states, use the a = v dv/dx = d(½v²)/dx
// relationship to link a, v and x without time, expose an impossible motion via v² < 0, and
// infer a parameter from a model comparison. NOT constant-acceleration SUVAT, and never
// "substitute into a known formula". Single-answer, auto-markable, hand-verified.
// Registered per lesson slug, ≤2 per lesson.

// → kinematics-velocity-acceleration
export const kinVelocityAccelChallenge: PracticeQuestion[] = [
  {
    // Reverse motion reconstruction: recover the integration constant (v at rest) from a
    // rest condition — not a forward differentiate-and-substitute.
    id: "chal-y12e1-kin-2",
    prompt:
      "A particle has acceleration a = 6t − 12. It is momentarily at rest when t = 1. Find its velocity when t = 0.",
    latex: "a = 6t - 12,\\ v(1) = 0",
    answer: "9",
    acceptedAnswers: ["v(0)=9", "9 m/s"],
    hint: "Integrate a to get v with a constant C, then use v(1) = 0 to find C — which is v(0).",
    explanation:
      "v = ∫(6t − 12) dt = 3t² − 12t + C. At rest at t = 1: 3 − 12 + C = 0 ⟹ C = 9. So v(0) = C = 9 (and v = 0 again at t = 3, consistent).",
  },
  {
    // a–v–x interaction: use a = d(½v²)/dx to get acceleration from a v²–x relationship,
    // with no time variable available.
    id: "chal-y12e1-kin-3",
    prompt:
      "A particle moves so that v² = 16 − x². Find its acceleration when x = 2.",
    latex: "v^2 = 16 - x^2",
    answer: "-2",
    acceptedAnswers: ["−2", "-2 m/s²"],
    hint: "Acceleration a = d/dx(½v²). Differentiate ½v² with respect to x.",
    explanation:
      "a = d/dx(½v²) = ½·d/dx(16 − x²) = ½(−2x) = −x. At x = 2, a = −2.",
  },
];

// → kinematics-displacement-from-velocity
export const kinDisplacementChallenge: PracticeQuestion[] = [
  {
    // Reverse motion reconstruction: two displacement conditions fix both integration
    // constants; recover the initial velocity.
    id: "chal-y12e1-kin-1",
    prompt:
      "A particle has acceleration a = 6t. It is at x = 2 when t = 0 and at x = 16 when t = 2. Find its velocity when t = 0.",
    latex: "a = 6t,\\ x(0) = 2,\\ x(2) = 16",
    answer: "3",
    acceptedAnswers: ["v(0)=3", "3 m/s"],
    hint: "Integrate twice: v = 3t² + C₁ and x = t³ + C₁t + C₂. Use the two positions to find C₁ = v(0).",
    explanation:
      "v = 3t² + C₁, x = t³ + C₁t + C₂. x(0) = C₂ = 2. x(2) = 8 + 2C₁ + 2 = 16 ⟹ C₁ = 3. So v(0) = C₁ = 3.",
  },
  {
    // Model/condition inference (UPGRADED): recover a parameter so equal displacement occurs
    // at a specified time — one interpretive step beyond directly equating positions.
    id: "chal-y12e1-kin-6",
    prompt:
      "Particle A moves from the origin with velocity vₐ = 2t. Particle B moves from the origin with velocity v_b = 3t² − kt. They have equal displacement when t = 3. Find k.",
    latex: "v_A = 2t,\\ v_B = 3t^2 - kt,\\ x_A(3) = x_B(3)",
    answer: "4",
    acceptedAnswers: ["k=4"],
    hint: "Integrate each velocity from the origin to get displacement, set them equal at t = 3, and solve for k.",
    explanation:
      "xₐ = t² and x_b = t³ − (k/2)t² (both from the origin). Equal at t = 3: 9 = 27 − (k/2)(9) ⟹ (k/2)(9) = 18 ⟹ k = 4.",
  },
];

// → kinematics-motion-analysis
export const kinMotionAnalysisChallenge: PracticeQuestion[] = [
  {
    // Validity/contradiction: the motion is impossible because v² < 0 everywhere.
    id: "chal-y12e1-kin-5",
    prompt:
      "A particle is claimed to move so that v² = −x² + 6x − 13. Find the largest possible value of v² (and hence decide whether such motion can occur).",
    latex: "v^2 = -x^2 + 6x - 13",
    answer: "-4",
    acceptedAnswers: ["−4", "max v^2 = -4"],
    hint: "Complete the square on −x² + 6x − 13 to find its maximum value.",
    explanation:
      "v² = −(x² − 6x + 13) = −((x − 3)² + 4) = −(x − 3)² − 4 ≤ −4. The largest possible value of v² is −4, which is negative, so v² < 0 for all x — the motion is impossible.",
  },
];

// → kinematics-exam-practice
export const kinExamChallenge: PracticeQuestion[] = [
  {
    // a–v–x interaction: integrate a dx = ½v² (the energy-like relationship) to get speed at
    // a new position — an SHM-style link between a, v and x.
    id: "chal-y12e1-kin-4",
    prompt:
      "A particle moves so that a = −4x. Its speed is 6 when x = 0. Find its speed when x = 1.",
    latex: "a = -4x,\\ v = 6 \\text{ at } x = 0",
    answer: "4√2",
    acceptedAnswers: ["4 sqrt 2", "sqrt(32)", "√32", "5.657", "5.66"],
    hint: "Use a = d(½v²)/dx, so ½v² = ∫a dx = ∫−4x dx. Find the constant from x = 0, v = 6.",
    explanation:
      "½v² = ∫(−4x) dx = −2x² + C. At x = 0, v = 6: ½(36) = 18 = C. At x = 1: ½v² = −2 + 18 = 16 ⟹ v² = 32 ⟹ v = √32 = 4√2.",
  },
];
