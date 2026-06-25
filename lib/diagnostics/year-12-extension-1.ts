import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Extension 1",

  units: [
    {
      slug: "proof-induction",
      title: "Proof by Mathematical Induction",
      startHref: "/course/year-12-extension-1/proof-induction",
    },
    {
      slug: "vectors",
      title: "Introduction to Vectors",
      startHref: "/course/year-12-extension-1/vectors",
    },
    {
      slug: "inverse-trig",
      title: "Inverse Trigonometric Functions",
      startHref: "/course/year-12-extension-1/inverse-trig",
    },
    {
      slug: "further-calculus",
      title: "Further Calculus Skills",
      startHref: "/course/year-12-extension-1/further-calculus",
    },
    {
      slug: "calculus-applications",
      title: "Further Applications of Calculus",
      startHref: "/course/year-12-extension-1/calculus-applications",
    },
    {
      slug: "binomial-distribution",
      title: "The Binomial Distribution",
      startHref: "/course/year-12-extension-1/binomial-distribution",
    },
  ],

  questions: [
    // ── Proof by Mathematical Induction (3 questions) ─────────────────────────
    {
      id: "y12ext1-pi1",
      unitSlug: "proof-induction",
      prompt:
        "In a proof by mathematical induction, the inductive hypothesis assumes the statement is true for:",
      choices: [
        { label: "A", text: "All $n$" },
        { label: "B", text: "$n = k$ (some arbitrary positive integer)" },
        { label: "C", text: "$n = k + 1$" },
        { label: "D", text: "$n = 0$ only" },
      ],
      correctAnswer: "B",
      explanation:
        "The inductive hypothesis assumes the statement holds for $n = k$, then uses this to prove it for $n = k + 1$.",
    },
    {
      id: "y12ext1-pi2",
      unitSlug: "proof-induction",
      prompt:
        "The base case for proving a statement holds for all integers $n \\geq 1$ is established by showing it true for:",
      choices: [
        { label: "A", text: "$n = 0$" },
        { label: "B", text: "$n = 1$" },
        { label: "C", text: "$n = 2$" },
        { label: "D", text: "$n = k$" },
      ],
      correctAnswer: "B",
      explanation:
        "When proving for all $n \\geq 1$, the base case verifies the statement at $n = 1$.",
    },
    {
      id: "y12ext1-pi3",
      unitSlug: "proof-induction",
      prompt:
        "After proving the base case and inductive step in mathematical induction, the conclusion is that the statement holds for:",
      choices: [
        { label: "A", text: "Only $n = 1$ and $n = 2$" },
        { label: "B", text: "A finite number of values" },
        { label: "C", text: "All integers $n \\geq 1$" },
        { label: "D", text: "Only even integers" },
      ],
      correctAnswer: "C",
      explanation:
        "Mathematical induction proves the statement for all integers from the base case onward — infinitely many values.",
    },

    // ── Introduction to Vectors (4 questions) ─────────────────────────────────
    {
      id: "y12ext1-ve1",
      unitSlug: "vectors",
      prompt: "The magnitude of vector $\\mathbf{a} = (3, 4)$ is:",
      latex: "|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2}",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$4$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$7$" },
      ],
      correctAnswer: "C",
      explanation:
        "$|\\mathbf{a}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
    },
    {
      id: "y12ext1-ve2",
      unitSlug: "vectors",
      prompt:
        "$\\mathbf{a} = (1, 2)$ and $\\mathbf{b} = (3, -1)$. Then $\\mathbf{a} + \\mathbf{b} =$",
      choices: [
        { label: "A", text: "$(4, 1)$" },
        { label: "B", text: "$(2, 3)$" },
        { label: "C", text: "$(4, -1)$" },
        { label: "D", text: "$(3, -2)$" },
      ],
      correctAnswer: "A",
      explanation:
        "$(1 + 3,\\; 2 + (-1)) = (4, 1)$.",
    },
    {
      id: "y12ext1-ve3",
      unitSlug: "vectors",
      prompt:
        "If the dot product $\\mathbf{a} \\cdot \\mathbf{b} = 0$, the vectors are:",
      latex: "\\mathbf{a} \\cdot \\mathbf{b} = 0",
      choices: [
        { label: "A", text: "Parallel" },
        { label: "B", text: "Perpendicular" },
        { label: "C", text: "Equal" },
        { label: "D", text: "Opposite in direction" },
      ],
      correctAnswer: "B",
      explanation:
        "A zero dot product means $\\cos\\theta = 0$, so $\\theta = 90°$. The vectors are perpendicular.",
    },
    {
      id: "y12ext1-ve4",
      unitSlug: "vectors",
      prompt: "The unit vector in the direction of $(3, 0)$ is:",
      choices: [
        { label: "A", text: "$(3, 0)$" },
        { label: "B", text: "$(1, 0)$" },
        { label: "C", text: "$(0, 1)$" },
        { label: "D", text: "$\\left(\\dfrac{1}{3}, 0\\right)$" },
      ],
      correctAnswer: "B",
      explanation:
        "A unit vector has magnitude $1$. Divide by the magnitude: $\\dfrac{(3,0)}{|(3,0)|} = \\dfrac{(3,0)}{3} = (1, 0)$.",
    },

    // ── Inverse Trigonometric Functions (3 questions) ─────────────────────────
    {
      id: "y12ext1-it1",
      unitSlug: "inverse-trig",
      prompt: "The range of $y = \\arcsin(x)$ is:",
      choices: [
        { label: "A", text: "$[-1, 1]$" },
        { label: "B", text: "$\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$" },
        { label: "C", text: "$[0, \\pi]$" },
        { label: "D", text: "$[0, 2\\pi]$" },
      ],
      correctAnswer: "B",
      explanation:
        "The principal value range of $\\arcsin$ is $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$.",
    },
    {
      id: "y12ext1-it2",
      unitSlug: "inverse-trig",
      prompt: "$\\arcsin\\!\\left(\\dfrac{1}{2}\\right) =$",
      choices: [
        { label: "A", text: "$\\dfrac{\\pi}{3}$" },
        { label: "B", text: "$\\dfrac{\\pi}{4}$" },
        { label: "C", text: "$\\dfrac{\\pi}{6}$" },
        { label: "D", text: "$\\dfrac{\\pi}{2}$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\sin\\!\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{2}$, so $\\arcsin\\!\\left(\\dfrac{1}{2}\\right) = \\dfrac{\\pi}{6}$.",
    },
    {
      id: "y12ext1-it3",
      unitSlug: "inverse-trig",
      prompt: "$\\arctan(1) =$",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$\\dfrac{\\pi}{4}$" },
        { label: "C", text: "$\\dfrac{\\pi}{3}$" },
        { label: "D", text: "$\\dfrac{\\pi}{2}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\tan\\!\\left(\\dfrac{\\pi}{4}\\right) = 1$, so $\\arctan(1) = \\dfrac{\\pi}{4}$.",
    },

    // ── Further Calculus Skills (4 questions) ─────────────────────────────────
    {
      id: "y12ext1-fc1",
      unitSlug: "further-calculus",
      prompt: "$\\dfrac{d}{dx}[\\sin x] =$",
      choices: [
        { label: "A", text: "$-\\sin x$" },
        { label: "B", text: "$\\cos x$" },
        { label: "C", text: "$-\\cos x$" },
        { label: "D", text: "$\\tan x$" },
      ],
      correctAnswer: "B",
      explanation: "$\\dfrac{d}{dx}[\\sin x] = \\cos x$.",
    },
    {
      id: "y12ext1-fc2",
      unitSlug: "further-calculus",
      prompt: "$\\dfrac{d}{dx}[e^x] =$",
      choices: [
        { label: "A", text: "$x e^{x-1}$" },
        { label: "B", text: "$e^x$" },
        { label: "C", text: "$e^{x-1}$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "B",
      explanation:
        "The exponential function $e^x$ is its own derivative: $\\dfrac{d}{dx}[e^x] = e^x$.",
    },
    {
      id: "y12ext1-fc3",
      unitSlug: "further-calculus",
      prompt:
        "By the chain rule, $\\dfrac{d}{dx}[f(g(x))] =$",
      choices: [
        { label: "A", text: "$f'(x) \\times g'(x)$" },
        { label: "B", text: "$f(g'(x))$" },
        { label: "C", text: "$f'(g(x)) \\times g'(x)$" },
        { label: "D", text: "$f'(g(x)) + g'(x)$" },
      ],
      correctAnswer: "C",
      explanation:
        "The chain rule: differentiate the outer function (evaluated at the inner), then multiply by the derivative of the inner.",
    },
    {
      id: "y12ext1-fc4",
      unitSlug: "further-calculus",
      prompt: "$\\dfrac{d}{dx}[\\ln x] =$",
      choices: [
        { label: "A", text: "$\\dfrac{1}{x}$" },
        { label: "B", text: "$x$" },
        { label: "C", text: "$\\dfrac{\\ln x}{x}$" },
        { label: "D", text: "$e^x$" },
      ],
      correctAnswer: "A",
      explanation:
        "$\\dfrac{d}{dx}[\\ln x] = \\dfrac{1}{x}$ for $x > 0$.",
    },

    // ── Further Applications of Calculus (3 questions) ────────────────────────
    {
      id: "y12ext1-ca1",
      unitSlug: "calculus-applications",
      prompt: "$\\displaystyle\\int \\sin x\\,dx =$",
      choices: [
        { label: "A", text: "$\\cos x + C$" },
        { label: "B", text: "$-\\cos x + C$" },
        { label: "C", text: "$-\\sin x + C$" },
        { label: "D", text: "$\\tan x + C$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\int \\sin x\\,dx = -\\cos x + C$.",
    },
    {
      id: "y12ext1-ca2",
      unitSlug: "calculus-applications",
      prompt: "$\\displaystyle\\int e^x\\,dx =$",
      choices: [
        { label: "A", text: "$x e^{x-1} + C$" },
        { label: "B", text: "$e^{x+1} + C$" },
        { label: "C", text: "$e^x + C$" },
        { label: "D", text: "$\\ln x + C$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\int e^x\\,dx = e^x + C$, since $e^x$ is its own derivative.",
    },
    {
      id: "y12ext1-ca3",
      unitSlug: "calculus-applications",
      prompt:
        "The volume of the solid formed by rotating $y = f(x)$ about the $x$-axis from $x = a$ to $x = b$ is:",
      choices: [
        { label: "A", text: "$\\pi \\displaystyle\\int_a^b y\\,dx$" },
        { label: "B", text: "$\\pi \\displaystyle\\int_a^b y^2\\,dx$" },
        { label: "C", text: "$2\\pi \\displaystyle\\int_a^b x\\,dx$" },
        { label: "D", text: "$\\displaystyle\\int_a^b y^2\\,dx$" },
      ],
      correctAnswer: "B",
      explanation:
        "Volume of revolution about the $x$-axis: $V = \\pi \\displaystyle\\int_a^b [f(x)]^2\\,dx$.",
    },

    // ── The Binomial Distribution (3 questions) ────────────────────────────────
    {
      id: "y12ext1-bd1",
      unitSlug: "binomial-distribution",
      prompt:
        "$X \\sim B(n, p)$ means $X$ follows a binomial distribution with:",
      choices: [
        { label: "A", text: "$n$ independent trials, each with probability $p$ of success" },
        { label: "B", text: "$n$ outcomes and $p$ events" },
        { label: "C", text: "$n$ successes out of $p$ trials" },
        { label: "D", text: "$p$ trials each with $n$ outcomes" },
      ],
      correctAnswer: "A",
      explanation:
        "The binomial model has $n$ independent identical trials, each with success probability $p$.",
    },
    {
      id: "y12ext1-bd2",
      unitSlug: "binomial-distribution",
      prompt:
        "$X \\sim B(10, 0.3)$. The expected value $E(X)$ is:",
      latex: "E(X) = np",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$4$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$10$" },
      ],
      correctAnswer: "A",
      explanation:
        "$E(X) = np = 10 \\times 0.3 = 3$.",
    },
    {
      id: "y12ext1-bd3",
      unitSlug: "binomial-distribution",
      prompt:
        "For $X \\sim B(n, p)$, the variance $\\text{Var}(X)$ is:",
      choices: [
        { label: "A", text: "$np$" },
        { label: "B", text: "$np(1-p)$" },
        { label: "C", text: "$n(1-p)$" },
        { label: "D", text: "$p(1-p)$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\text{Var}(X) = np(1-p)$, where $1-p$ is the probability of failure on each trial.",
    },
  ],
};
