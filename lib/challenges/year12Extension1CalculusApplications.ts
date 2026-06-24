import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 "Calculus Applications" — the differential home for
// tangent/normal, stationary-point, optimisation/extremum and validity gates (further-calculus is held
// for a later integration pass). Difficulty is carried by working BACKWARDS from calculus information —
// recover a rate/parameter from decay/period/extremum data, recover a radius from a target rate, expose
// an impossible SHM state, reconstruct a tangent from a through-point — NOT "differentiate and substitute".
// Single-answer, auto-markable, hand-verified. Registered per lesson slug, ≤2 per lesson.

// → newtons-law-cooling-growth-decay
export const calcAppsGrowthChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from TWO non-initial values (eliminate Q0 via a ratio — the extra step).
    id: "chal-y12e1-ca-1",
    prompt:
      "A quantity decays as Q = Q₀e^(−kt). When t = 2, Q = 50; when t = 5, Q = 12.5. Find the exact value of k.",
    latex: "Q = Q_0 e^{-kt},\\ Q(2)=50,\\ Q(5)=12.5",
    answer: "(ln 4)/3",
    acceptedAnswers: ["ln4/3", "(2 ln 2)/3", "\\frac{\\ln 4}{3}", "0.462"],
    hint: "Divide the two equations to cancel Q₀, leaving an equation in k only.",
    explanation:
      "Q(2)/Q(5) = e^(−2k)/e^(−5k) = e^(3k) = 50/12.5 = 4. So 3k = ln 4 ⟹ k = (ln 4)/3 = (2 ln 2)/3.",
  },
  {
    // Tangent/normal structure (reverse): recover k from a through-point of the tangent.
    id: "chal-y12e1-ca-6",
    prompt:
      "The tangent to the curve y = e^(kx) at the point where x = 0 passes through (−1, 0). Find k.",
    latex: "y = e^{kx},\\ \\text{tangent at }x=0\\text{ through }(-1,0)",
    answer: "1",
    acceptedAnswers: ["k=1"],
    hint: "At x = 0, y = 1 and the gradient is k, so the tangent is y = 1 + kx. Substitute (−1, 0).",
    explanation:
      "y(0) = 1 and y′(0) = k, so the tangent is y = 1 + kx. Through (−1, 0): 0 = 1 + k(−1) = 1 − k ⟹ k = 1.",
  },
];

// → simple-harmonic-motion-intro
export const calcAppsShmChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction + extremum: recover n from the period, a from x(0), then max speed = an.
    id: "chal-y12e1-ca-2",
    prompt:
      "A particle moves in simple harmonic motion x = a cos(nt). Its period is π and x = 3 when t = 0. Find its maximum speed.",
    latex: "x = a\\cos(nt),\\ T=\\pi,\\ x(0)=3",
    answer: "6",
    acceptedAnswers: ["6 units/s"],
    hint: "Get n from the period (T = 2π/n) and a from x(0); the maximum speed of SHM is a·n.",
    explanation:
      "T = 2π/n = π ⟹ n = 2. x(0) = a = 3. Maximum speed = a·n = 3 × 2 = 6.",
  },
  {
    // Validity/contradiction: a negative v² emerges, exposing an impossible state.
    id: "chal-y12e1-ca-5",
    prompt:
      "For a particle in SHM, v² = n²(a² − x²) with a = 3 and n = 2. Evaluate v² at x = 4.",
    latex: "v^2 = n^2(a^2 - x^2),\\ a=3,\\ n=2",
    answer: "-28",
    acceptedAnswers: ["−28", "impossible"],
    hint: "Substitute the values, then interpret the sign of the result.",
    explanation:
      "v² = 4(9 − 16) = 4(−7) = −28. A squared speed cannot be negative, so the particle never reaches x = 4 (it exceeds the amplitude a = 3): the state is impossible.",
  },
];

// → related-rates-of-change
export const calcAppsRatesChallenge: PracticeQuestion[] = [
  {
    // Optimisation/related-rate (reverse): recover the radius from a target volume-rate.
    id: "chal-y12e1-ca-4",
    prompt:
      "A spherical balloon is inflated so its radius increases at a constant 0.5 cm/s. At what radius is the volume increasing at 50π cm³/s?",
    latex: "\\frac{dr}{dt}=0.5,\\ \\frac{dV}{dt}=50\\pi",
    answer: "5",
    acceptedAnswers: ["5 cm", "r=5"],
    hint: "dV/dt = 4πr²·(dr/dt). Set it equal to 50π and solve for r.",
    explanation:
      "V = (4/3)πr³ ⟹ dV/dt = 4πr²(dr/dt) = 4πr²(0.5) = 2πr². Set 2πr² = 50π ⟹ r² = 25 ⟹ r = 5.",
  },
];

// → calculus-applications-exam-practice
export const calcAppsExamChallenge: PracticeQuestion[] = [
  {
    // Stationary-point reasoning (reverse): recover A from a stated maximum value.
    id: "chal-y12e1-ca-3",
    prompt:
      "The function C(t) = A·t·e^(−t) (for t ≥ 0) has a maximum value of 6. Find A.",
    latex: "C(t) = A t e^{-t},\\ C_{\\max}=6",
    answer: "6e",
    acceptedAnswers: ["6 e", "6*e", "16.31"],
    hint: "Locate where the maximum occurs (C′(t) = 0), then use C(t_max) = 6 to recover A.",
    explanation:
      "C′(t) = A e^(−t)(1 − t) = 0 ⟹ t = 1. The maximum value is C(1) = A·1·e^(−1) = A/e. Set A/e = 6 ⟹ A = 6e.",
  },
];
