import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for the Year 12 Advanced "Working with Functions" topic
// (ma-f1). Synoptic D6, all single-answer and auto-markable, answers hand-verified.
// Split across four lessons so the seeded items carry distinct subtopic slugs (keeps a
// generated worksheet within the "<=5 from one subtopic" acceptance rule).

// → intercepts-key-features: two-condition parameter systems.
export const functionsParamChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-fn-1",
    prompt:
      "The parabola y = x² + bx + c passes through (1, 0) and (7, 0). Find the y-coordinate of its vertex.",
    latex: "y = x^2 + bx + c",
    answer: "-9",
    acceptedAnswers: ["−9", "y=-9"],
    hint: "Two roots give the factored form y = (x − 1)(x − 7); the vertex sits on the axis of symmetry, midway between the roots.",
    explanation:
      "With roots 1 and 7: y = (x − 1)(x − 7). The axis of symmetry is x = 4, and y(4) = (4 − 1)(4 − 7) = (3)(−3) = −9.",
  },
  {
    // D6 (strengthened): use the absent x² coefficient (sum of roots = 0), not substitution.
    id: "chal-y12a-fn-2",
    prompt:
      "The cubic y = x³ + ax + b has x-intercepts at x = 1 and x = 2. Find its third x-intercept.",
    latex: "y = x^3 + ax + b",
    answer: "-3",
    acceptedAnswers: ["−3", "x=-3"],
    hint: "The cubic has no x² term — what does that force about the sum of its three roots?",
    explanation:
      "Since y = x³ + ax + b has no x² term, the sum of its three roots is 0. With roots 1, 2 and r: 1 + 2 + r = 0 ⟹ r = −3. (Indeed (x − 1)(x − 2)(x + 3) = x³ − 7x + 6.)",
  },
];

// → graph-transformations: transformation + tangency.
export const functionsTransformChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-fn-3",
    prompt:
      "The parabola y = x² is translated up by k units so that the line y = 4x − 1 is tangent to the translated parabola. Find k.",
    latex: "y = x^2 + k",
    answer: "3",
    acceptedAnswers: ["k=3"],
    hint: "Set x² + k = 4x − 1 and require a repeated root (discriminant = 0).",
    explanation:
      "x² + k = 4x − 1 ⟹ x² − 4x + (k + 1) = 0. Tangency needs discriminant 0: 16 − 4(k + 1) = 0 ⟹ k + 1 = 4 ⟹ k = 3.",
  },
];

// → modelling-with-functions: reconstruction / modelling.
export const functionsModellingChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-fn-4",
    prompt:
      "A parabolic arch is 9 m high at its centre and spans 12 m at the base. Find its height (in m) at a horizontal distance of 4 m from the centre.",
    latex: "y = a x^2 + 9",
    answer: "5",
    acceptedAnswers: ["5 m", "5m"],
    hint: "Put the vertex at (0, 9). The base meets the ground 6 m either side of the centre — use that to find a.",
    explanation:
      "Take y = a x² + 9 with the ground at x = ±6: 36a + 9 = 0 ⟹ a = −1/4. At x = 4: y = −¼(16) + 9 = −4 + 9 = 5 m.",
  },
  {
    id: "chal-y12a-fn-5",
    prompt:
      "A ball's height is h(x) = ax² + bx, where x is the horizontal distance (m). It reaches a maximum height of 5 m at x = 4 m. Find the horizontal distance (m) at which it lands (h = 0, x ≠ 0).",
    latex: "h(x) = a x^2 + b x",
    answer: "8",
    acceptedAnswers: ["8 m", "8m"],
    hint: "The maximum is on the axis of symmetry, so b = −8a; the path through the origin lands at x = −b/a.",
    explanation:
      "Maximum at x = 4 ⟹ −b/(2a) = 4 ⟹ b = −8a (and the max height fixes a = −5/16, b = 5/2). Landing: x(ax + b) = 0 ⟹ x = −b/a = 8 m. (The path is symmetric, so it lands at twice the axis distance.)",
  },
];

// → solving-equations-inequalities-graphically: reciprocal interaction + tangency.
export const functionsReciprocalChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12a-fn-6",
    prompt:
      "The line y = −x + k is tangent to the curve y = 4/x. Find the positive value of k.",
    latex: "y = \\dfrac{4}{x}",
    answer: "4",
    acceptedAnswers: ["k=4"],
    hint: "Set −x + k = 4/x, clear the fraction, and require a repeated root.",
    explanation:
      "−x + k = 4/x ⟹ −x² + kx = 4 ⟹ x² − kx + 4 = 0. Tangency needs discriminant 0: k² − 16 = 0 ⟹ k = 4 (positive). The line y = −x + 4 touches y = 4/x at x = 2.",
  },
];
