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
      title: "The Binomial Distribution and Sampling Distribution of the Mean",
      startHref: "/course/year-12-extension-1/binomial-distribution",
    },
    {
      slug: "kinematics",
      title: "Rates of Change and Kinematics",
      startHref: "/course/year-12-extension-1/kinematics",
    },
  ],

  questions: [
    {
      id: "y12ext1-d5-induction-binomial-sum",
      unitSlug: "proof-induction",
      assessedUnitSlugs: ["binomial-distribution"],
      difficulty: 5,
      targetMisconception:
        "Treats the next binomial row as the previous row plus one extra endpoint instead of using Pascal's identity across the whole row.",
      prompt:
        "Assume $\\sum_{r=0}^{k}{k \\choose r}=2^k$. Which line correctly proves the $k+1$ case using Pascal's identity?",
      choices: [
        {
          label: "A",
          text: "$\\sum_{r=0}^{k+1}{k+1 \\choose r}=\\sum_{r=0}^{k}{k \\choose r}+{k+1 \\choose k+1}=2^k+1$",
        },
        {
          label: "B",
          text: "$\\sum_{r=0}^{k+1}{k+1 \\choose r}=\\sum_{r=0}^{k+1}\\left({k \\choose r}+{k \\choose r-1}\\right)=2^k+2^k=2^{k+1}$",
        },
        {
          label: "C",
          text: "$\\sum_{r=0}^{k+1}{k+1 \\choose r}=2^k+2=2^{k+1}$",
        },
        {
          label: "D",
          text: "$\\sum_{r=0}^{k+1}{k+1 \\choose r}=(k+1)2^k$",
        },
      ],
      correctAnswer: "B",
      explanation:
        "Pascal's identity splits each entry in row $k+1$ into two shifted row-$k$ entries. The two shifted sums each equal $2^k$, so the total is $2^{k+1}$.",
    },
    {
      id: "y12ext1-d5-vector-kinematics-state",
      unitSlug: "vectors",
      assessedUnitSlugs: ["kinematics", "further-calculus"],
      difficulty: 5,
      targetMisconception:
        "Confuses position coordinates with velocity and tests perpendicularity without using the dot product.",
      prompt:
        "A particle has position vector $\\mathbf{r}(t)=(t^2,\\ln t)$ for $t>0$. At $t=1$, which statement is true?",
      choices: [
        {
          label: "A",
          text: "The position and velocity vectors are perpendicular, and the speed is $\\sqrt{5}$.",
        },
        {
          label: "B",
          text: "The speed is $\\sqrt{5}$, but the position and velocity vectors are not perpendicular.",
        },
        {
          label: "C",
          text: "The speed is $1$, because the second coordinate of the position is $0$.",
        },
        {
          label: "D",
          text: "The velocity vector is $(1,0)$, so the motion is horizontal at that instant.",
        },
      ],
      correctAnswer: "B",
      explanation:
        "$\\mathbf{r}(1)=(1,0)$ and $\\mathbf{v}(t)=\\mathbf{r}'(t)=(2t,1/t)$, so $\\mathbf{v}(1)=(2,1)$. The speed is $\\sqrt{2^2+1^2}=\\sqrt{5}$ and the dot product is $2$, not $0$.",
    },
    {
      id: "y12ext1-d5-inverse-trig-tangent",
      unitSlug: "inverse-trig",
      assessedUnitSlugs: ["further-calculus"],
      difficulty: 5,
      targetMisconception:
        "Uses the inverse trig value but differentiates the inverse sine function or tangent-line intercept incorrectly.",
      prompt:
        "The tangent to $y=\\arcsin x$ at $x=\\frac12$ meets the $y$-axis at which value?",
      choices: [
        { label: "A", text: "$\\dfrac{\\pi}{6}+\\dfrac{1}{\\sqrt{3}}$" },
        { label: "B", text: "$\\dfrac{\\pi}{6}-\\dfrac{\\sqrt{3}}{2}$" },
        { label: "C", text: "$\\dfrac{\\pi}{6}-\\dfrac{1}{\\sqrt{3}}$" },
        { label: "D", text: "$\\dfrac{\\pi}{3}-\\dfrac{1}{\\sqrt{3}}$" },
      ],
      correctAnswer: "C",
      explanation:
        "At $x=\\frac12$, $y=\\frac{\\pi}{6}$ and $y'=1/\\sqrt{1-x^2}=2/\\sqrt{3}$. The tangent is $y-\\frac{\\pi}{6}=\\frac{2}{\\sqrt{3}}(x-\\frac12)$, giving intercept $\\frac{\\pi}{6}-\\frac{1}{\\sqrt{3}}$.",
    },
    {
      id: "y12ext1-d5-volume-representation",
      unitSlug: "further-calculus",
      assessedUnitSlugs: ["calculus-applications"],
      difficulty: 5,
      targetMisconception:
        "Integrates the curve height instead of the squared radius when converting an area under a curve into a volume of revolution.",
      prompt:
        "The region under $y=\\sqrt{x+1}$ from $x=0$ to $x=3$ is rotated about the $x$-axis. What is the exact volume?",
      choices: [
        { label: "A", text: "$\\dfrac{14\\pi}{3}$" },
        { label: "B", text: "$\\dfrac{15\\pi}{2}$" },
        { label: "C", text: "$8\\pi$" },
        { label: "D", text: "$12\\pi$" },
      ],
      correctAnswer: "B",
      explanation:
        "The radius is $y$, so the volume is $\\pi\\int_0^3 y^2\\,dx=\\pi\\int_0^3(x+1)\\,dx=\\pi\\left[\\frac{x^2}{2}+x\\right]_0^3=\\frac{15\\pi}{2}$.",
    },
    {
      id: "y12ext1-d5-shm-state",
      unitSlug: "calculus-applications",
      assessedUnitSlugs: ["kinematics"],
      difficulty: 5,
      targetMisconception:
        "Misses that acceleration in simple harmonic motion is determined by displacement and that velocity direction determines whether the particle is returning to centre.",
      prompt:
        "A particle in simple harmonic motion has acceleration $a=-9x$, where $x$ is displacement from the centre. At one instant $x=2$ and $v<0$. Which statement is forced?",
      choices: [
        {
          label: "A",
          text: "The acceleration is $-18$ and the particle is moving toward the centre.",
        },
        {
          label: "B",
          text: "The acceleration is $18$ and the particle is moving away from the centre.",
        },
        {
          label: "C",
          text: "The acceleration is $-18$ and the particle is moving away from the centre.",
        },
        {
          label: "D",
          text: "The acceleration cannot be determined without the amplitude.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Substituting $x=2$ gives $a=-9(2)=-18$. Since the displacement is positive and velocity is negative, the particle is moving back toward the centre.",
    },
    {
      id: "y12ext1-d5-binomial-reliability-constraint",
      unitSlug: "binomial-distribution",
      assessedUnitSlugs: ["calculus-applications"],
      difficulty: 5,
      targetMisconception:
        "Uses a linear approximation for at least one event instead of modelling the complement of independent repeated trials.",
      prompt:
        "A sensor has independent probability $p$ of missing a signal on each of 6 trials. The design requirement is $P(\\text{at least one miss})\\leq 0.2$. What is the largest allowable value of $p$?",
      choices: [
        { label: "A", text: "$\\dfrac{0.2}{6}$" },
        { label: "B", text: "$1-0.8^{1/6}$" },
        { label: "C", text: "$0.8^{1/6}$" },
        { label: "D", text: "$1-0.2^6$" },
      ],
      correctAnswer: "B",
      explanation:
        "Use the complement: $P(\\text{at least one miss})=1-(1-p)^6$. The boundary is $1-(1-p)^6=0.2$, so $(1-p)^6=0.8$ and $p=1-0.8^{1/6}$.",
    },
    {
      id: "y12ext1-d5-kinematics-integral-sign",
      unitSlug: "kinematics",
      assessedUnitSlugs: ["further-calculus", "calculus-applications"],
      difficulty: 5,
      targetMisconception:
        "Calculates an antiderivative without interpreting the sign of velocity over the interval.",
      prompt:
        "A particle has velocity $v(t)=(2-t)e^{-t}$ for $0\\leq t\\leq 2$. Which option gives its displacement from $t=0$ to $t=2$ and correctly interprets the motion?",
      choices: [
        {
          label: "A",
          text: "$1+e^{-2}$; the particle moves in the positive direction until it stops at $t=2$.",
        },
        {
          label: "B",
          text: "$1-e^{-2}$; the particle changes direction inside the interval.",
        },
        {
          label: "C",
          text: "$2e^{-2}$; the displacement is found by substituting $t=2$ into $v(t)$.",
        },
        {
          label: "D",
          text: "$0$; the factor $(2-t)$ means the positive and negative motion cancels.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "An antiderivative is $(t-1)e^{-t}$. From $0$ to $2$, the displacement is $e^{-2}-(-1)=1+e^{-2}$. Since $(2-t)e^{-t}\\geq 0$ on the interval, there is no reversal before the stop at $t=2$.",
    },
    {
      id: "y12ext1-d5-vector-inverse-trig-branch",
      unitSlug: "inverse-trig",
      assessedUnitSlugs: ["vectors"],
      difficulty: 5,
      targetMisconception:
        "Finds the reference angle but ignores the vector's quadrant and the principal branch of the inverse trig function.",
      prompt:
        "A unit vector $\\mathbf{u}$ has $\\mathbf{u}\\cdot(1,0)=-\\frac12$ and positive second component. Which angle from the positive $x$-axis is forced?",
      choices: [
        { label: "A", text: "$\\dfrac{\\pi}{3}$" },
        { label: "B", text: "$\\dfrac{2\\pi}{3}$" },
        { label: "C", text: "$-\\dfrac{\\pi}{3}$" },
        { label: "D", text: "$\\dfrac{4\\pi}{3}$" },
      ],
      correctAnswer: "B",
      explanation:
        "The dot product with $(1,0)$ gives the $x$-component, so $\\cos\\theta=-\\frac12$. A positive second component puts the vector in quadrant II, giving $\\theta=\\frac{2\\pi}{3}$.",
    },
    {
      id: "y12ext1-d5-induction-derivative-pattern",
      unitSlug: "proof-induction",
      assessedUnitSlugs: ["further-calculus"],
      difficulty: 5,
      targetMisconception:
        "Differentiates the product but fails to convert the sine-cosine combination into the next phase-shifted form.",
      prompt:
        "Assume $f_k(x)=2^{k/2}e^x\\sin\\left(x+\\frac{k\\pi}{4}\\right)$ for $f_n(x)=\\dfrac{d^n}{dx^n}(e^x\\sin x)$. Which step proves the $k+1$ case?",
      choices: [
        {
          label: "A",
          text: "Differentiate to get $2^{k/2}e^x\\sin\\left(x+\\frac{k\\pi}{4}\\right)$ again, so the formula is unchanged.",
        },
        {
          label: "B",
          text: "Differentiate to get $2^{k/2}e^x\\left[\\sin\\left(x+\\frac{k\\pi}{4}\\right)+\\cos\\left(x+\\frac{k\\pi}{4}\\right)\\right]=2^{(k+1)/2}e^x\\sin\\left(x+\\frac{(k+1)\\pi}{4}\\right)$.",
        },
        {
          label: "C",
          text: "Differentiate only the sine factor to get $2^{k/2}e^x\\cos\\left(x+\\frac{k\\pi}{4}\\right)=2^{(k+1)/2}e^x\\sin\\left(x+\\frac{(k+1)\\pi}{4}\\right)$.",
        },
        {
          label: "D",
          text: "Multiply by $2$ at each derivative, giving $2^{k+1}e^x\\sin\\left(x+\\frac{(k+1)\\pi}{4}\\right)$.",
        },
      ],
      correctAnswer: "B",
      explanation:
        "The product rule gives the sum of sine and cosine with the same phase. Since $\\sin u+\\cos u=\\sqrt{2}\\sin(u+\\pi/4)$, the coefficient becomes $2^{k/2}\\sqrt{2}=2^{(k+1)/2}$ and the phase advances by $\\pi/4$.",
    },
    {
      id: "y12ext1-d5-random-walk-vector-expectation",
      unitSlug: "vectors",
      assessedUnitSlugs: ["binomial-distribution"],
      difficulty: 5,
      targetMisconception:
        "Matches expected step counts separately but does not impose the vector parallel condition as a ratio.",
      prompt:
        "A particle makes 4 independent moves. Each move is $(1,0)$ with probability $p$ or $(0,1)$ with probability $1-p$. What value of $p$ makes the expected displacement parallel to $(2,1)$?",
      choices: [
        { label: "A", text: "$\\dfrac{1}{3}$" },
        { label: "B", text: "$\\dfrac{1}{2}$" },
        { label: "C", text: "$\\dfrac{2}{3}$" },
        { label: "D", text: "$\\dfrac{3}{4}$" },
      ],
      correctAnswer: "C",
      explanation:
        "The expected displacement is $(4p,4(1-p))$. For it to be parallel to $(2,1)$, $4p:4(1-p)=2:1$, so $p/(1-p)=2$ and $p=2/3$.",
    },
  ],
};
