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
      targetMisconception: "Interprets |z - a| = |z - b| as a circle instead of the perpendicular bisector of the two fixed points.",
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
        "$|z-3|=|z-(-1)|$ says $z$ is equidistant from the points $3$ and $-1$ on the real axis. That locus is the perpendicular bisector of the segment joining them: the vertical line through the midpoint $x=1$. A modulus difference set equal like this is never a circle.",
    },
    {
      id: "y12e2-d5-demoivre-power",
      difficulty: 5,
      targetMisconception: "Raises 2 (not √2) to the eighth power, or mishandles the argument, when applying De Moivre's theorem.",
      unitSlug: "complex-numbers",
      assessedUnitSlugs: ["proof"],
      prompt: "Evaluate $(1+i)^8$.",
      choices: [
        { label: "A", text: "$16$" },
        { label: "B", text: "$256$" },
        { label: "C", text: "$16i$" },
        { label: "D", text: "$-16$" },
      ],
      correctAnswer: "A",
      explanation:
        "Write $1+i=\\sqrt{2}\\operatorname{cis}\\dfrac{\\pi}{4}$. By De Moivre, $(1+i)^8=(\\sqrt{2})^8\\operatorname{cis}\\left(8\\cdot\\dfrac{\\pi}{4}\\right)=2^4\\operatorname{cis}(2\\pi)=16$. Option B comes from using $2^8$ instead of $(\\sqrt{2})^8$; option C mishandles the argument $2\\pi$.",
    },
    {
      id: "y12e2-d5-vector-speed-derivative",
      difficulty: 5,
      targetMisconception: "Uses the magnitude of the position vector as the speed instead of the magnitude of the velocity vector.",
      unitSlug: "vectors-3d",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle has position vector $\\mathbf{r}(t)=(t,\\ t^2,\\ t^3)$. What is its speed at $t=1$?",
      choices: [
        { label: "A", text: "$\\sqrt{14}$" },
        { label: "B", text: "$\\sqrt{3}$" },
        { label: "C", text: "$\\sqrt{6}$" },
        { label: "D", text: "$14$" },
      ],
      correctAnswer: "A",
      explanation:
        "Speed is $|\\mathbf{r}'(t)|$. Here $\\mathbf{r}'(t)=(1,\\ 2t,\\ 3t^2)$, so $\\mathbf{r}'(1)=(1,\\ 2,\\ 3)$ and the speed is $\\sqrt{1^2+2^2+3^2}=\\sqrt{14}$. Option B uses $|\\mathbf{r}(1)|=\\sqrt{3}$, the position magnitude; option D forgets the square root.",
    },
    {
      id: "y12e2-d5-skew-lines",
      difficulty: 5,
      targetMisconception: "Assumes two non-parallel lines in 3D must intersect, overlooking the possibility of skew lines.",
      unitSlug: "vectors-3d",
      assessedUnitSlugs: ["proof"],
      prompt:
        "Two lines are $\\mathbf{r}_1=(1,0,0)+\\lambda(1,1,0)$ and $\\mathbf{r}_2=(0,1,0)+\\mu(0,0,1)$. What is their relationship?",
      choices: [
        { label: "A", text: "Skew: they are neither parallel nor intersecting." },
        { label: "B", text: "They intersect, because their direction vectors are not parallel." },
        { label: "C", text: "They are parallel." },
        { label: "D", text: "They are identical." },
      ],
      correctAnswer: "A",
      explanation:
        "The direction vectors $(1,1,0)$ and $(0,0,1)$ are not multiples, so the lines are not parallel. Equating components gives $1+\\lambda=0$ (so $\\lambda=-1$) from the $x$-coordinate but $\\lambda=1$ from the $y$-coordinate, a contradiction, so they never meet. Non-parallel and non-intersecting means skew.",
    },
    {
      id: "y12e2-d5-integral-arctan-form",
      difficulty: 5,
      targetMisconception: "Omits the 1/a factor in the standard integral of 1/(x²+a²), or mistakes it for a logarithmic form.",
      unitSlug: "calculus",
      assessedUnitSlugs: ["complex-numbers"],
      prompt: "Find $\\displaystyle\\int \\frac{1}{x^2+4}\\,dx$.",
      choices: [
        { label: "A", text: "$\\dfrac{1}{2}\\arctan\\dfrac{x}{2}+C$" },
        { label: "B", text: "$\\arctan\\dfrac{x}{2}+C$" },
        { label: "C", text: "$\\dfrac{1}{2}\\ln(x^2+4)+C$" },
        { label: "D", text: "$\\dfrac{1}{4}\\arctan\\dfrac{x}{2}+C$" },
      ],
      correctAnswer: "A",
      explanation:
        "Using $\\displaystyle\\int\\frac{dx}{x^2+a^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+C$ with $a=2$ gives $\\frac{1}{2}\\arctan\\frac{x}{2}+C$. The denominator $x^2+4$ does not factor over the reals (its roots are $\\pm 2i$), so the integral is an arctangent, not a logarithm. Option B drops the $\\frac{1}{2}$.",
    },
    {
      id: "y12e2-d5-integral-partial-fractions",
      difficulty: 5,
      targetMisconception: "Treats 1/(x²-1) as an arctangent (as if it were x²+1) instead of splitting it into partial fractions for a logarithm.",
      unitSlug: "calculus",
      assessedUnitSlugs: ["complex-numbers"],
      prompt: "Find $\\displaystyle\\int \\frac{1}{x^2-1}\\,dx$.",
      choices: [
        { label: "A", text: "$\\dfrac{1}{2}\\ln\\left|\\dfrac{x-1}{x+1}\\right|+C$" },
        { label: "B", text: "$\\arctan x+C$" },
        { label: "C", text: "$\\ln|x^2-1|+C$" },
        { label: "D", text: "$\\dfrac{1}{2}\\ln\\left|\\dfrac{x+1}{x-1}\\right|+C$" },
      ],
      correctAnswer: "A",
      explanation:
        "Because $x^2-1=(x-1)(x+1)$ has real roots, use partial fractions: $\\frac{1}{x^2-1}=\\frac{1}{2}\\left(\\frac{1}{x-1}-\\frac{1}{x+1}\\right)$. Integrating gives $\\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right|+C$. Option B confuses this with $\\frac{1}{x^2+1}$; option D has the quotient inverted (a sign error).",
    },
    {
      id: "y12e2-d5-proof-inequality-start",
      difficulty: 5,
      targetMisconception: "Begins the proof by assuming the inequality to be proved, rather than starting from a known-true statement such as a square being non-negative.",
      unitSlug: "proof",
      assessedUnitSlugs: ["complex-numbers"],
      prompt:
        "To prove $a^2+b^2\\geq 2ab$ for all real $a,b$, which opening step is logically valid?",
      choices: [
        { label: "A", text: "Start from $(a-b)^2\\geq 0$, then expand to $a^2-2ab+b^2\\geq 0$." },
        { label: "B", text: "Assume $a^2+b^2\\geq 2ab$, then subtract $2ab$ from both sides." },
        { label: "C", text: "Divide both sides by $ab$ and show $\\dfrac{a}{b}+\\dfrac{b}{a}\\geq 2$." },
        { label: "D", text: "Substitute $a=b$ to show both sides are equal." },
      ],
      correctAnswer: "A",
      explanation:
        "A direct proof must begin from something already known to be true. Since any real square satisfies $(a-b)^2\\geq 0$, expanding gives $a^2-2ab+b^2\\geq 0$, hence $a^2+b^2\\geq 2ab$. Option B assumes the conclusion; option C divides by $ab$, which may be zero or negative; option D only checks one case.",
    },
    {
      id: "y12e2-d5-proof-contradiction-point",
      difficulty: 5,
      targetMisconception: "Misidentifies where the contradiction arises in the proof that √2 is irrational.",
      unitSlug: "proof",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "In proving $\\sqrt{2}$ is irrational, we assume $\\sqrt{2}=\\dfrac{p}{q}$ in lowest terms and deduce that $p$ and $q$ are both even. Why is this a contradiction?",
      choices: [
        { label: "A", text: "Both being even means $p$ and $q$ share the factor $2$, contradicting that $\\dfrac{p}{q}$ was in lowest terms." },
        { label: "B", text: "It is impossible for $p^2$ to be even." },
        { label: "C", text: "An even number cannot be squared." },
        { label: "D", text: "It contradicts $\\sqrt{2}>1$." },
      ],
      correctAnswer: "A",
      explanation:
        "The fraction was assumed to be in lowest terms, meaning $p$ and $q$ have no common factor. Deriving that both are even gives them the common factor $2$, which directly contradicts that assumption. The contradiction is with 'lowest terms', not with any property of even numbers themselves.",
    },
    {
      id: "y12e2-d5-mechanics-acceleration-form",
      difficulty: 5,
      targetMisconception: "Defaults to a = dv/dt when acceleration is a function of displacement, instead of using a = v·dv/dx.",
      unitSlug: "mechanics",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle's acceleration is given as a function of its displacement $x$. To find the velocity $v$ as a function of $x$, which form of acceleration should be used?",
      choices: [
        { label: "A", text: "$a=v\\dfrac{dv}{dx}=\\dfrac{d}{dx}\\!\\left(\\tfrac{1}{2}v^2\\right)$" },
        { label: "B", text: "$a=\\dfrac{dv}{dt}$" },
        { label: "C", text: "$a=\\dfrac{dx}{dt}$" },
        { label: "D", text: "$a=\\dfrac{d^2v}{dx^2}$" },
      ],
      correctAnswer: "A",
      explanation:
        "When acceleration depends on displacement and velocity is wanted as a function of $x$, the chain rule gives $a=\\dfrac{dv}{dt}=\\dfrac{dv}{dx}\\dfrac{dx}{dt}=v\\dfrac{dv}{dx}=\\dfrac{d}{dx}\\!\\left(\\tfrac12 v^2\\right)$. This separates variables in $x$ and $v$. Option B keeps $t$, which cannot be integrated directly against a function of $x$.",
    },
    {
      id: "y12e2-d5-mechanics-shm-period",
      difficulty: 5,
      targetMisconception: "Takes ω as the coefficient of x in ẍ = -ω²x rather than its square root, giving the wrong period.",
      unitSlug: "mechanics",
      assessedUnitSlugs: ["calculus"],
      prompt:
        "A particle moves in simple harmonic motion with $\\ddot{x}=-9x$. What is the period of the motion?",
      choices: [
        { label: "A", text: "$\\dfrac{2\\pi}{3}$" },
        { label: "B", text: "$\\dfrac{2\\pi}{9}$" },
        { label: "C", text: "$6\\pi$" },
        { label: "D", text: "$\\dfrac{\\pi}{3}$" },
      ],
      correctAnswer: "A",
      explanation:
        "For SHM, $\\ddot{x}=-\\omega^2 x$, so here $\\omega^2=9$ and $\\omega=3$. The period is $T=\\dfrac{2\\pi}{\\omega}=\\dfrac{2\\pi}{3}$. Option B uses $\\omega=9$ (the coefficient itself) instead of $\\omega=\\sqrt{9}=3$.",
    },
  ],
};
