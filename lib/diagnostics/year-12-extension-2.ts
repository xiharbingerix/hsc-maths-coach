import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Extension 2",

  units: [
    {
      slug: "proof",
      title: "Proof",
      startHref: "/course/year-12-extension-2/proof",
    },
    {
      slug: "vectors-3d",
      title: "Vectors in Three Dimensions",
      startHref: "/course/year-12-extension-2/vectors-3d",
    },
    {
      slug: "complex-numbers",
      title: "Complex Numbers",
      startHref: "/course/year-12-extension-2/complex-numbers",
    },
    {
      slug: "calculus",
      title: "Calculus",
      startHref: "/course/year-12-extension-2/calculus",
    },
    {
      slug: "mechanics",
      title: "Mechanics",
      startHref: "/course/year-12-extension-2/mechanics",
    },
  ],

  questions: [
    {
      id: "y12e2-d5-complex-locus-bisector",
      difficulty: 5,
      targetMisconception:
        "Interprets |z-a| = |z-b| as a circle instead of the perpendicular bisector of two fixed points.",
      unitSlug: "complex-numbers",
      assessedUnitSlugs: ["proof"],
      prompt:
        "On the Argand plane, which describes the locus of points $z$ satisfying $|z-3|=|z+1|$?",
      choices: [
        { label: "A", text: "The vertical line $x=1$." },
        { label: "B", text: "A circle centred at the origin with radius $2$." },
        { label: "C", text: "The line $y=x$." },
        { label: "D", text: "The vertical line $x=-1$." },
      ],
      correctAnswer: "A",
      explanation:
        "$|z-3|=|z-(-1)|$ says $z$ is equidistant from the points $3$ and $-1$ on the real axis. The locus is the perpendicular bisector of the segment joining them, so it is the vertical line through the midpoint $x=1$.",
    },
    {
      id: "y12e2-d5-demoivre-real-negative",
      difficulty: 5,
      targetMisconception:
        "Treats 'real' as any multiple of pi/2, or ignores that 'negative real' needs argument pi modulo 2pi.",
      unitSlug: "complex-numbers",
      assessedUnitSlugs: ["proof"],
      prompt:
        "What is the smallest positive integer $n$ for which $(1+i)^n$ is real and negative?",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$4$" },
        { label: "C", text: "$6$" },
        { label: "D", text: "$8$" },
      ],
      correctAnswer: "B",
      explanation:
        "Write $1+i=\\sqrt{2}\\operatorname{cis}(\\pi/4)$. Then $(1+i)^n=(\\sqrt{2})^n\\operatorname{cis}(n\\pi/4)$. For the result to be real and negative, its argument must be $\\pi$ modulo $2\\pi$. The smallest positive solution is $n=4$.",
    },
    {
      id: "y12e2-d5-vector-position-velocity-perpendicular",
      difficulty: 5,
      targetMisconception:
        "Looks for matching components or equal magnitudes instead of using the dot product condition for perpendicular vectors.",
      unitSlug: "vectors-3d",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle has position vector $\\mathbf{r}(t)=(t,\\ t^2,\\ t^3)$. At which value of $t$ are $\\mathbf{r}(t)$ and the velocity vector $\\mathbf{r}'(t)$ perpendicular?",
      choices: [
        { label: "A", text: "$t=0$ only" },
        { label: "B", text: "$t=1$ only" },
        { label: "C", text: "$t=\\pm 1$" },
        { label: "D", text: "There is no real value of $t$" },
      ],
      correctAnswer: "A",
      explanation:
        "Perpendicular vectors satisfy $\\mathbf{r}(t)\\cdot\\mathbf{r}'(t)=0$. Here $\\mathbf{r}'(t)=(1,2t,3t^2)$, so $\\mathbf{r}(t)\\cdot\\mathbf{r}'(t)=t+2t^3+3t^5=t(1+2t^2+3t^4)$. Since $1+2t^2+3t^4>0$ for all real $t$, the only real solution is $t=0$.",
    },
    {
      id: "y12e2-d5-skew-lines",
      difficulty: 5,
      targetMisconception:
        "Assumes two non-parallel lines in 3D must intersect, overlooking the possibility of skew lines.",
      unitSlug: "vectors-3d",
      assessedUnitSlugs: ["proof"],
      prompt:
        "Two lines are $\\mathbf{r}_1=(1,0,0)+\\lambda(1,1,0)$ and $\\mathbf{r}_2=(0,1,0)+\\mu(0,0,1)$. What is their relationship?",
      choices: [
        { label: "A", text: "Skew: they are neither parallel nor intersecting." },
        {
          label: "B",
          text: "They intersect, because their direction vectors are not parallel.",
        },
        { label: "C", text: "They are parallel." },
        { label: "D", text: "They are identical." },
      ],
      correctAnswer: "A",
      explanation:
        "The direction vectors $(1,1,0)$ and $(0,0,1)$ are not multiples, so the lines are not parallel. Equating coordinates gives $1+\\lambda=0$ from the $x$-coordinate but $\\lambda=1$ from the $y$-coordinate, so no common point exists. Non-parallel and non-intersecting means skew.",
    },
    {
      id: "y12e2-d5-integral-complete-square-strategy",
      difficulty: 5,
      targetMisconception:
        "Looks for partial fractions immediately instead of first recognising the denominator has no real roots and should be completed to a square.",
      unitSlug: "calculus",
      assessedUnitSlugs: ["complex-numbers"],
      prompt:
        "Which rewrite is the most useful first step when evaluating $\\displaystyle\\int \\frac{1}{x^2+2x+5}\\,dx$?",
      choices: [
        { label: "A", text: "$x^2+2x+5=(x+1)^2+4$" },
        { label: "B", text: "$x^2+2x+5=(x+5)(x-1)$" },
        { label: "C", text: "$x^2+2x+5=x(x+2)+5$, so use parts" },
        { label: "D", text: "$x^2+2x+5=(x+1)^2$, so substitute $u=x+1$" },
      ],
      correctAnswer: "A",
      explanation:
        "Complete the square: $x^2+2x+5=(x+1)^2+4$. That exposes the standard arctangent form after the shift $u=x+1$. Because the quadratic has no real factors, partial fractions is the wrong first move.",
    },
    {
      id: "y12e2-d5-partial-fractions-structure",
      difficulty: 5,
      targetMisconception:
        "Uses constants over every factor, including an irreducible quadratic, instead of a linear numerator over the quadratic term.",
      unitSlug: "calculus",
      assessedUnitSlugs: ["complex-numbers"],
      prompt:
        "Which partial-fractions form is needed for $\\displaystyle\\frac{2x+1}{(x-1)(x^2+1)}$?",
      choices: [
        { label: "A", text: "$\\dfrac{A}{x-1}+\\dfrac{Bx+C}{x^2+1}$" },
        { label: "B", text: "$\\dfrac{A}{x-1}+\\dfrac{B}{x^2+1}$" },
        { label: "C", text: "$\\dfrac{Ax+B}{x-1}+\\dfrac{C}{x^2+1}$" },
        { label: "D", text: "$\\dfrac{A}{x-1}+\\dfrac{B}{x-i}+\\dfrac{C}{x+i}$" },
      ],
      correctAnswer: "A",
      explanation:
        "Over the reals, the linear factor $x-1$ gets a constant numerator, while the irreducible quadratic $x^2+1$ needs a linear numerator $Bx+C$. Splitting into $(x-i)(x+i)$ is a complex-factor viewpoint, not the standard real partial-fractions setup used here.",
    },
    {
      id: "y12e2-d5-proof-contrapositive-assumption",
      difficulty: 5,
      targetMisconception:
        "Negates the wrong part of the statement, or starts a contrapositive proof from the original hypothesis instead of the negation of the conclusion.",
      unitSlug: "proof",
      assessedUnitSlugs: ["complex-numbers"],
      prompt:
        "To prove 'if $n^2$ is even, then $n$ is even' by contrapositive, which assumption should be made first?",
      choices: [
        { label: "A", text: "Assume $n^2$ is even." },
        { label: "B", text: "Assume $n$ is odd." },
        { label: "C", text: "Assume $n^2$ is odd." },
        { label: "D", text: "Assume $n$ is even." },
      ],
      correctAnswer: "B",
      explanation:
        "For a statement 'if $P$ then $Q$', the contrapositive is 'if not $Q$ then not $P$'. Here $P$ is '$n^2$ is even' and $Q$ is '$n$ is even', so the contrapositive starts by assuming $n$ is odd and then showing $n^2$ is odd.",
    },
    {
      id: "y12e2-d5-proof-induction-sufficient-step",
      difficulty: 5,
      targetMisconception:
        "Thinks the inductive step is finished once the hypothesis is doubled, without checking that this dominates the exact target expression for k+1.",
      unitSlug: "proof",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "In an induction proof that $2^n>n^2$ for all $n\\ge 5$, suppose $2^k>k^2$. After writing $2^{k+1}=2\\cdot 2^k>2k^2$, which inequality is enough to finish the step?",
      choices: [
        { label: "A", text: "$2k^2\\ge (k+1)^2$" },
        { label: "B", text: "$2k^2\\ge k^2+1$" },
        { label: "C", text: "$2^k\\ge (k+1)^2$" },
        { label: "D", text: "$k^2\\ge (k+1)^2$" },
      ],
      correctAnswer: "A",
      explanation:
        "To prove the $k+1$ case, it is enough to force $2^{k+1}$ above $(k+1)^2$. Since $2^{k+1}>2k^2$, the step is complete once you show $2k^2\\ge (k+1)^2$. The key is to dominate the new target, not just make the expression larger.",
    },
    {
      id: "y12e2-d5-mechanics-acceleration-form",
      difficulty: 5,
      targetMisconception:
        "Defaults to a = dv/dt when acceleration is a function of displacement, instead of using a = v dv/dx.",
      unitSlug: "mechanics",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle's acceleration is given as a function of its displacement $x$. To find the velocity $v$ as a function of $x$, which form of acceleration should be used?",
      choices: [
        {
          label: "A",
          text: "$a=v\\dfrac{dv}{dx}=\\dfrac{d}{dx}\\left(\\tfrac{1}{2}v^2\\right)$",
        },
        { label: "B", text: "$a=\\dfrac{dv}{dt}$" },
        { label: "C", text: "$a=\\dfrac{dx}{dt}$" },
        { label: "D", text: "$a=\\dfrac{d^2v}{dx^2}$" },
      ],
      correctAnswer: "A",
      explanation:
        "When acceleration depends on displacement and velocity is wanted as a function of $x$, the chain rule gives $a=\\dfrac{dv}{dt}=\\dfrac{dv}{dx}\\dfrac{dx}{dt}=v\\dfrac{dv}{dx}=\\dfrac{d}{dx}(\\tfrac12 v^2)$. This separates variables in $x$ and $v$.",
    },
    {
      id: "y12e2-d5-mechanics-shm-max-speed",
      difficulty: 5,
      targetMisconception:
        "Finds the frequency or period correctly but misses that maximum speed in SHM is A omega, not the amplitude or the angular speed alone.",
      unitSlug: "mechanics",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle satisfies $\\ddot{x}=-9x$, with $x(0)=2$ and $\\dot{x}(0)=0$. Which statement shows that its speed can never be $7$?",
      choices: [
        {
          label: "A",
          text: "The amplitude is $2$ and $\\omega=3$, so the maximum speed is $A\\omega=6$.",
        },
        {
          label: "B",
          text: "The period is $\\dfrac{2\\pi}{3}$, so the speed is always less than $\\dfrac{2\\pi}{3}$.",
        },
        { label: "C", text: "Since $x(0)=2$, the speed is always $2$." },
        {
          label: "D",
          text: "Since $\\ddot{x}=-9x$, the maximum speed is $9$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "From $\\ddot{x}=-9x$, we have SHM with $\\omega=3$. The initial conditions show the particle starts at an endpoint, so the amplitude is $A=2$. In SHM, the maximum speed is $A\\omega=2\\cdot 3=6$, so speed $7$ is impossible.",
    },
  ],
};
