import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Further Calculus" (integration) — the
// integration-domain exemplar. Difficulty is carried by SELECTING or RECONSTRUCTING
// structure, not by executing a known antiderivative: recover a limit/coefficient from an
// integral value, see a hidden substitution, reconstruct an antiderivative from a given
// product-rule identity, exploit odd/even symmetry, or bound an integral to expose
// impossibility. Single-answer, auto-markable, hand-verified. Registered per lesson slug,
// ≤2 per lesson.

// → trig-integrals
export const fcalcTrigChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from a definite integral: recover the upper limit.
    id: "chal-y12e1-fc-1",
    prompt:
      "Find the smallest positive value of a for which ∫₀ᵃ cos x dx = 1/2.",
    latex: "\\int_0^a \\cos x\\,dx = \\tfrac{1}{2}",
    answer: "π/6",
    acceptedAnswers: ["pi/6", "\\frac{\\pi}{6}"],
    hint: "The antiderivative gives sin a; solve sin a = 1/2 for the smallest positive a.",
    explanation:
      "∫₀ᵃ cos x dx = sin a − sin 0 = sin a = 1/2. The smallest positive solution is a = π/6.",
  },
  {
    // Definite-integral symmetry: recognise the odd term vanishes (structure recognition).
    id: "chal-y12e1-fc-5",
    prompt:
      "Evaluate ∫₋π/₂^(π/2) (sin³x + cos x) dx.",
    latex: "\\int_{-\\pi/2}^{\\pi/2} (\\sin^3 x + \\cos x)\\,dx",
    answer: "2",
    acceptedAnswers: [],
    hint: "sin³x is an odd function over a symmetric interval — what does it contribute?",
    explanation:
      "sin³x is odd, so ∫₋π/₂^(π/2) sin³x dx = 0. cos x is even, so the integral = 2∫₀^(π/2) cos x dx = 2[sin x]₀^(π/2) = 2(1) = 2.",
  },
];

// → simple-substitution
export const fcalcSubstitutionChallenge: PracticeQuestion[] = [
  {
    // Substitution-parameter recovery: a hidden linear substitution rescales the integral
    // (structure recognition — no antiderivative is ever computed).
    id: "chal-y12e1-fc-3",
    prompt:
      "Given that ∫₀¹ f(2x) dx = 5, find ∫₀² f(u) du.",
    latex: "\\int_0^1 f(2x)\\,dx = 5",
    answer: "10",
    acceptedAnswers: [],
    hint: "Let u = 2x, so du = 2 dx and the limits become 0 to 2.",
    explanation:
      "With u = 2x, du = 2 dx and x: 0→1 gives u: 0→2. So ∫₀¹ f(2x) dx = (1/2)∫₀² f(u) du = 5, hence ∫₀² f(u) du = 10.",
  },
];

// → integration-by-parts
export const fcalcPartsChallenge: PracticeQuestion[] = [
  {
    // Integration-by-parts reconstruction: recognise the product-rule identity must be
    // reversed (structure recognition), then integrate term by term.
    id: "chal-y12e1-fc-4",
    prompt:
      "Given that d/dx[x sin x] = sin x + x cos x, evaluate ∫₀^(π/2) x cos x dx.",
    latex: "\\frac{d}{dx}[x\\sin x] = \\sin x + x\\cos x",
    answer: "π/2 - 1",
    acceptedAnswers: ["(π-2)/2", "(pi-2)/2", "pi/2 - 1", "\\frac{\\pi}{2}-1", "0.571", "0.5708"],
    hint: "Rearrange the identity to x cos x = d/dx[x sin x] − sin x, then integrate both sides.",
    explanation:
      "x cos x = d/dx[x sin x] − sin x, so ∫₀^(π/2) x cos x dx = [x sin x]₀^(π/2) − ∫₀^(π/2) sin x dx = (π/2 − 0) − [−cos x]₀^(π/2) = π/2 − 1.",
  },
];

// → further-calculus-exam-practice
export const fcalcExamChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from TWO definite-integral constraints (the structural layer:
    // a system of two integral equations, not a single direct recovery).
    id: "chal-y12e1-fc-2",
    prompt:
      "A function f(x) = ax + b satisfies ∫₀¹ f(x) dx = 4 and ∫₀² f(x) dx = 14. Find a.",
    latex: "\\int_0^1 (ax+b)\\,dx = 4,\\quad \\int_0^2 (ax+b)\\,dx = 14",
    answer: "6",
    acceptedAnswers: ["a=6"],
    hint: "Evaluate each integral to get two equations in a and b, then eliminate b.",
    explanation:
      "∫₀¹(ax+b)dx = a/2 + b = 4. ∫₀²(ax+b)dx = 2a + 2b = 14 ⟹ a + b = 7. From the first, a + 2b = 8; subtracting a + b = 7 gives b = 1, so a = 6.",
  },
  {
    // Validity/contradiction via an integral bound: difficulty is recognising the comparison,
    // not evaluating any integral.
    id: "chal-y12e1-fc-6",
    prompt:
      "A continuous function f satisfies f(x) ≥ 2 for all x in [0, 3]. Find the smallest possible value of ∫₀³ f(x) dx.",
    latex: "f(x) \\ge 2 \\text{ on } [0,3]",
    answer: "6",
    acceptedAnswers: [],
    hint: "Compare f with the constant 2; the integral is smallest when f is as small as allowed.",
    explanation:
      "Since f(x) ≥ 2, ∫₀³ f(x) dx ≥ ∫₀³ 2 dx = 2 × 3 = 6, with equality when f(x) = 2 throughout. So the smallest possible value is 6 (a claimed value of 5 would be impossible).",
  },
];
