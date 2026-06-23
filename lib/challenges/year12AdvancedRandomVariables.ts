import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Advanced "Random Variables" (ma-s3) — discrete
// distributions, E[X], Var. Difficulty is carried by statistical STRUCTURE (which moments
// fix which parameters; when a claimed distribution is impossible; same-mean/different-
// variance comparison), not by arithmetic. Binomial is only 1 of 6; the rest use general
// discrete pmfs. All single-answer, auto-markable, hand-verified.

// → random-variables-probability-distributions
export const rvDiscreteChallenge: PracticeQuestion[] = [
  {
    // Parameter reconstruction from BOTH moments (not a single-step E=np or Var=np(1-p)).
    id: "chal-y12a-rv-1",
    prompt:
      "A binomial random variable has mean 4 and variance 2.4. Find n.",
    latex: "E[X]=np,\\quad \\mathrm{Var}(X)=np(1-p)",
    answer: "10",
    acceptedAnswers: ["n=10"],
    hint: "Divide the variance by the mean to get (1−p); that gives p, and then n from the mean.",
    explanation:
      "Var/E = np(1−p)/np = 1−p = 2.4/4 = 0.6, so p = 0.4. Then n = E/p = 4/0.4 = 10.",
  },
  {
    // Parameterised pmf: find the normalising constant, then E[X].
    id: "chal-y12a-rv-2",
    prompt:
      "A discrete random variable has P(X=k) = ck for k = 1, 2, 3, where c is a constant. Find E[X].",
    latex: "P(X=k)=ck,\\ k\\in\\{1,2,3\\}",
    answer: "7/3",
    acceptedAnswers: ["2.333", "2.33"],
    hint: "First use ΣP = 1 to find c, then compute E[X] = Σ k·P(X=k).",
    explanation:
      "ΣP = c(1+2+3) = 6c = 1 ⟹ c = 1/6. E[X] = Σ k·(ck) = c(1+4+9) = 14c = 14/6 = 7/3.",
  },
  {
    // Distribution validity via an inferred NEGATIVE probability (impossibility emerges).
    id: "chal-y12a-rv-3",
    prompt:
      "A random variable takes the values 0, 1 and 2, with P(X=0) = 0.5 and E[X] = 1.2. Find the value of P(X=1) implied by these conditions.",
    latex: "P(X=0)=0.5,\\ E[X]=1.2",
    answer: "-0.2",
    acceptedAnswers: ["−0.2"],
    hint: "Let P(X=1)=a and P(X=2)=b. Use ΣP = 1 and E[X] = a + 2b, then solve.",
    explanation:
      "a + b = 0.5 (since the probabilities sum to 1) and a + 2b = 1.2 (the mean). Subtracting: b = 0.7, so a = −0.2. The implied P(X=1) = −0.2 < 0, so no such distribution can exist.",
  },
];

// → mixed-statistical-analysis-exam-practice
export const rvMixedChallenge: PracticeQuestion[] = [
  {
    // Expectation–variance interaction with a non-trivial shift (needs (E[X]-a)^2 term).
    id: "chal-y12a-rv-4",
    prompt:
      "A random variable has E[X] = 5 and Var(X) = 4. Find E[(X − 3)²].",
    latex: "E[(X-a)^2] = \\mathrm{Var}(X) + (E[X]-a)^2",
    answer: "8",
    acceptedAnswers: [],
    hint: "Expand (X−3)² and use E[X²] = Var(X) + (E[X])². Note 3 is not the mean.",
    explanation:
      "E[(X−3)²] = E[X²] − 6E[X] + 9 = (Var + E[X]²) − 6E[X] + 9 = (4 + 25) − 30 + 9 = 8. Equivalently Var(X) + (E[X] − 3)² = 4 + 4 = 8.",
  },
  {
    // Probability-mass reconstruction from a mean constraint.
    id: "chal-y12a-rv-5",
    prompt:
      "A random variable takes the values 1, 2, 3, 4 with P(X=1) = 0.1, P(X=2) = a, P(X=3) = b, P(X=4) = 0.2, and E[X] = 2.7. Find b.",
    latex: "E[X]=2.7",
    answer: "0.4",
    acceptedAnswers: ["b=0.4"],
    hint: "Use ΣP = 1 and the mean to get two equations in a and b.",
    explanation:
      "ΣP = 1 ⟹ a + b = 0.7. Mean: 0.1 + 2a + 3b + 0.8 = 2.7 ⟹ 2a + 3b = 1.8. Substituting a = 0.7 − b: 1.4 + b = 1.8 ⟹ b = 0.4.",
  },
  {
    // Model comparison: same expectation, different variance.
    id: "chal-y12a-rv-6",
    prompt:
      "X takes the values 1 and 3, each with probability 0.5. Y takes the values 0 and 4, each with probability 0.5. Both have mean 2. Find Var(Y) − Var(X).",
    latex: "\\mathrm{Var}=E[X^2]-(E[X])^2",
    answer: "3",
    acceptedAnswers: [],
    hint: "Both means are 2, so compare E[X²] for each.",
    explanation:
      "Var(X) = E[X²] − 2² = (1+9)/2 − 4 = 5 − 4 = 1. Var(Y) = (0+16)/2 − 4 = 8 − 4 = 4. Var(Y) − Var(X) = 4 − 1 = 3 (same centre, Y is more spread out).",
  },
];
