import {
  cubicGraph,
  lineGraph,
  quadraticGraph,
  richAnswer,
  richChoice,
  type CurveSketchingMasteryMap,
} from "./curveSketchingQualityHelpers";

export const curveSketchingQualityCore: CurveSketchingMasteryMap = {
  "stationary-points": [
    richAnswer({
      id: "y11adv-cs-sp-qm1",
      prompt:
        "Find the coordinates of every stationary point of the cubic, showing how the derivative is factorised.",
      latex: "f(x)=x^3-6x^2+9x+2",
      answer: "(1,6) and (3,2)",
      acceptedAnswers: ["(1, 6), (3, 2)", "(3,2) and (1,6)"],
      hint: "Differentiate, factor the quadratic derivative, then substitute both roots into the original cubic.",
      explanation:
        "Differentiate to obtain $f'(x)=3x^2-12x+9=3(x-1)(x-3)$. Hence the stationary x-values are $1$ and $3$. Substitution into the original function gives $f(1)=6$ and $f(3)=2$, so the stationary points are $(1,6)$ and $(3,2)$.",
      diagnosticIntent:
        "Checks that a student finds coordinates rather than stopping after solving the derivative equation.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-sp-qm2",
      prompt:
        "The displayed curve is the derivative $f'(x)=(x+2)^2(x-1)$. What does it imply about the stationary x-values of $f$?",
      latex: "f'(x)=(x+2)^2(x-1)",
      answer: "C",
      choices: [
        "$x=-2$ is a local maximum and $x=1$ is a local minimum",
        "$x=-2$ is a local minimum and $x=1$ is a local maximum",
        "$x=-2$ is a horizontal inflection and $x=1$ is a local minimum",
        "Both $x=-2$ and $x=1$ are horizontal inflections",
      ],
      distractorMisconceptions: {
        A: "Treats every zero as a turning point and ignores the even multiplicity at -2.",
        B: "Reverses the sign-change classifications at both derivative zeros.",
        D: "Treats the simple zero at 1 as though the derivative only touched the axis.",
      },
      hint: "Track the sign of the derivative on the three intervals separated by $-2$ and $1$.",
      explanation:
        "At $x=-2$ the squared factor makes $f'$ touch zero without changing sign, so $f$ remains decreasing and has a horizontal inflection. At $x=1$ the derivative changes from negative to positive, so $f$ changes from decreasing to increasing and has a local minimum. Therefore C is correct.",
      diagnosticIntent:
        "Distinguishes multiplicity-aware derivative reasoning from the belief that every derivative zero is an extremum.",
      taskType: "analytical",
      difficulty: 3,
      cartesianGraph: cubicGraph(
        { a: 1, b: 3, c: 0, d: -4 },
        {
          description:
            "Graph of the derivative y=(x+2)^2(x-1), touching the axis at -2 and crossing at 1",
          label: "y=f'(x)",
          points: [
            { x: -2, y: 0, label: "(-2,0)" },
            { x: 1, y: 0, label: "(1,0)" },
          ],
          xMin: -3.5,
          xMax: 2.5,
          yMin: -6,
          yMax: 8,
        },
      ),
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm3",
      prompt:
        "A differentiable function has the derivative below. Determine all intervals on which the function is increasing and state how many stationary points it has.",
      latex: "f'(x)=3(x-2)(x+1)",
      answer: "increasing for x<-1 or x>2; two stationary points",
      acceptedAnswers: [
        "(-infinity,-1) union (2,infinity); 2 stationary points",
        "x < -1 and x > 2, with stationary points at x=-1 and x=2",
      ],
      hint: "Use the two derivative zeros to split the real line, then determine the sign of each factor.",
      explanation:
        "The derivative is zero at $x=-1$ and $x=2$. Because the quadratic has positive leading coefficient, $f'(x)$ is positive outside these roots and negative between them. Thus $f$ is increasing for $x<-1$ and $x>2$, and it has two stationary points, at $x=-1$ and $x=2$.",
      diagnosticIntent:
        "Checks transfer from a factored derivative to monotonic intervals without requiring the original function.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-sp-qm4",
      prompt:
        "For which values of the real parameter $k$ does the function have exactly two distinct stationary points?",
      latex: "f_k(x)=x^3-3kx",
      answer: "B",
      choices: ["$k<0$", "$k>0$", "$k\\ne0$", "all real $k$"],
      distractorMisconceptions: {
        A: "Reverses the condition needed for x squared to equal a positive parameter.",
        C: "Assumes any nonzero parameter produces two real derivative roots.",
        D: "Ignores that k=0 gives one repeated stationary x-value and k<0 gives none.",
      },
      hint: "Solve $f_k'(x)=0$ and ask when the resulting equation has two distinct real roots.",
      explanation:
        "Here $f_k'(x)=3x^2-3k=3(x^2-k)$. Two distinct real stationary x-values require $x^2=k$ to have the two solutions $x=\\pm\\sqrt{k}$, which occurs exactly when $k>0$. At $k=0$ there is one repeated solution, and for $k<0$ there are no real solutions.",
      diagnosticIntent:
        "Tests whether parameter conditions are derived from real-root structure rather than guessed from a familiar cubic.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-sp-qm5",
      prompt:
        "A student says the zeros of $f(x)$ are automatically the stationary points of $f$. Which response most precisely diagnoses the error?",
      latex: "f(x)=(x-1)^2(x+2)",
      answer: "D",
      choices: [
        "The statement is always correct for a factorised polynomial",
        "Only the simple zero $x=-2$ must be stationary",
        "Only zeros with odd multiplicity are stationary",
        "Stationary points solve $f'(x)=0$; a zero of $f$ is stationary only when it is also a zero of $f'$",
      ],
      distractorMisconceptions: {
        A: "Confuses x-intercepts with zero-gradient points for every polynomial.",
        B: "Associates stationarity with a simple crossing rather than a repeated root.",
        C: "Reverses the multiplicity relationship between touching roots and zero gradient.",
      },
      hint: "Compare the equations used to find x-intercepts and stationary points, then differentiate the factorised cubic.",
      explanation:
        "Zeros of $f$ locate x-intercepts, whereas stationary points satisfy $f'=0$. For this function, the repeated zero $x=1$ is also stationary because the curve touches the axis there, but the simple zero $x=-2$ is not stationary. The two conditions can overlap, but they are not interchangeable, so D is the precise diagnosis.",
      diagnosticIntent:
        "Targets the common structural confusion between roots of a function and roots of its derivative.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm6",
      prompt:
        "Determine the coefficients $p$ and $q$ if the cubic has stationary points at x-values $-1$ and $2$.",
      latex: "f(x)=x^3+px^2+qx+7",
      answer: "p=-3/2, q=-6",
      acceptedAnswers: ["p = -1.5 and q = -6", "(p,q)=(-3/2,-6)"],
      hint: "The derivative has leading coefficient 3 and roots $-1$ and $2$, so write it in factored form.",
      explanation:
        "The derivative is $f'(x)=3x²+2px+q$. Its leading coefficient is $3$ and its roots are $-1$ and $2$, hence $f'(x)=3(x+1)(x-2)=3x²-3x-6$. Comparing coefficients gives $2p=-3$ and $q=-6$, so $p=-3/2$ and $q=-6$.",
      diagnosticIntent:
        "Checks reverse reasoning from prescribed stationary locations to coefficients of the original cubic.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm7",
      prompt:
        "Investigate the family and classify the number and nature of its stationary points for $a<0$, $a=0$, and $a>0$.",
      latex: "f_a(x)=x^3-3ax",
      answer:
        "a<0: none; a=0: horizontal inflection at (0,0); a>0: local max at (-sqrt(a),2a sqrt(a)) and local min at (sqrt(a),-2a sqrt(a))",
      acceptedAnswers: [
        "no stationary points if a<0; one horizontal inflection if a=0; two turning points if a>0",
      ],
      hint: "Solve $3(x^2-a)=0$, then use either the sign of $f'$ or $f''=6x$ in each parameter case.",
      explanation:
        "Since $f_a'(x)=3(x^2-a)$, there are no real stationary points when $a<0$. At $a=0$, the origin is stationary but $f'=3x^2$ stays nonnegative, so it is a horizontal inflection. When $a>0$, $x=\\pm\\sqrt a$; $f''=6x$ makes the negative root a local maximum with value $2a^{3/2}$ and the positive root a local minimum with value $-2a^{3/2}$.",
      diagnosticIntent:
        "Assesses a bounded parameter investigation that must distinguish no-root, repeated-root, and two-root cases.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm8",
      prompt:
        "Reconstruct $f(x)$ from its derivative and initial value, then find and classify every stationary point.",
      latex: "f'(x)=3(x-1)^2(x+2),\\qquad f(0)=5",
      answer:
        "f(x)=3x^4/4-9x^2/2+6x+5; local min at (-2,-13), horizontal inflection at (1,29/4)",
      acceptedAnswers: [
        "f=0.75x^4-4.5x^2+6x+5; minimum (-2,-13), stationary inflection (1,7.25)",
      ],
      hint: "Expand and integrate the derivative, use $f(0)=5$, then read sign changes from its factored form.",
      explanation:
        "Expanding gives $f'=3x^3-9x+6$, so $f=3x^4/4-9x^2/2+6x+C$ and $C=5$. The derivative changes from negative to positive at $x=-2$, giving a local minimum at $(-2,-13)$. The squared factor at $x=1$ produces no sign change, so $(1,29/4)$ is a horizontal inflection.",
      diagnosticIntent:
        "Combines reverse integration, an initial condition, multiplicity, coordinates, and stationary-point classification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm9",
      prompt:
        "For the quartic family, determine every stationary point and its classification for $a>0$, $a=0$, and $a<0$.",
      latex: "f_a(x)=x^4-2ax^2",
      answer:
        "a>0: minima at x=+-sqrt(a), maximum at x=0; a=0: minimum at x=0; a<0: minimum at x=0",
      acceptedAnswers: [
        "if a>0, (-sqrt(a),-a^2) and (sqrt(a),-a^2) are minima and (0,0) is a maximum; otherwise (0,0) is the only minimum",
      ],
      hint: "Factor $f_a'(x)=4x(x^2-a)$ and use $f_a''(x)=12x^2-4a$ in each case.",
      explanation:
        "The derivative is $4x(x^2-a)$. For $a>0$, the stationary x-values are $-\\sqrt a,0,\\sqrt a$; the second derivative makes the outer points minima of value $-a^2$ and the origin a maximum. When $a=0$, $f=x^4$ has a flat minimum at the origin. When $a<0$, the origin is the only stationary point and $f''(0)=-4a>0$, so it is a minimum.",
      diagnosticIntent:
        "Tests a three-case quartic investigation where the second derivative test is inconclusive in one boundary case.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-sp-qm10",
      prompt:
        "Construct the monic quartic with stationary x-values $-1$, $0$, and $2$ and with $f(0)=3$. Then classify all three stationary points.",
      latex: "f(x)=x^4+bx^3+cx^2+dx+e",
      answer:
        "f(x)=x^4-4x^3/3-4x^2+3; minima at x=-1 and x=2, maximum at x=0",
      acceptedAnswers: [
        "f=x^4-(4/3)x^3-4x^2+3; local min at -1, local max at 0, local min at 2",
      ],
      hint: "A monic quartic has derivative leading term $4x^3$, so build the derivative from the three given roots.",
      explanation:
        "The derivative must be $f'(x)=4(x+1)x(x-2)=4x^3-4x^2-8x$. Integration gives $f=x^4-4x^3/3-4x^2+C$, and $f(0)=3$ gives $C=3$. Since $f''=12x^2-8x-8$ is positive at $-1$, negative at $0$, and positive at $2$, the outer points are local minima and the origin is a local maximum.",
      diagnosticIntent:
        "Requires construction from derivative roots, recovery of an integration constant, and complete second-derivative classification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "classifying-stationary-points": [
    richAnswer({
      id: "y11adv-cs-cls-qm1",
      prompt:
        "Find and classify all stationary points of the cubic using the second derivative test.",
      latex: "f(x)=x^3-3x^2-9x+1",
      answer: "local max at (-1,6); local min at (3,-26)",
      acceptedAnswers: ["(-1,6) maximum and (3,-26) minimum"],
      hint: "Factor the first derivative to locate the points, then evaluate $f''(x)=6x-6$ at each root.",
      explanation:
        "Differentiate to get $f'(x)=3(x+1)(x-3)$, so the stationary x-values are $-1$ and $3$. Their coordinates are $(-1,6)$ and $(3,-26)$. Since $f''(-1)=-12<0$, the first is a local maximum; since $f''(3)=12>0$, the second is a local minimum.",
      diagnosticIntent:
        "Checks the complete locate-coordinate-classify workflow rather than classification from x-values alone.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-cls-qm2",
      prompt:
        "A function has $f'(x)=(x-2)^2$ near $x=2$. Which classification follows?",
      latex: "f'(x)=(x-2)^2",
      answer: "C",
      choices: [
        "local maximum at $x=2$",
        "local minimum at $x=2$",
        "horizontal inflection at $x=2$",
        "no stationary point at $x=2$",
      ],
      distractorMisconceptions: {
        A: "Uses the zero derivative alone and guesses a maximum without a sign chart.",
        B: "Mistakes a nonnegative derivative for a function that decreases then increases.",
        D: "Ignores that the derivative is exactly zero at x=2.",
      },
      hint: "Determine the sign of $f'$ immediately to the left and right of $x=2$.",
      explanation:
        "The derivative is zero at $x=2$ but positive on both sides. Thus the function is increasing before and after the stationary point and does not turn. The even-multiplicity zero of $f'$ corresponds to a horizontal inflection, so C is the only classification consistent with the sign chart.",
      diagnosticIntent:
        "Tests whether classification is based on derivative sign change rather than merely on the equation f'=0.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm3",
      prompt:
        "The sign of $f'$ is positive, then negative, then positive across the listed critical values. Classify both stationary points.",
      latex:
        "\\begin{array}{c|ccccc}x&(-\\infty,-2)&-2&(-2,4)&4&(4,\\infty)\\\\ f'(x)&+&0&-&0&+\\end{array}",
      answer: "local maximum at x=-2; local minimum at x=4",
      acceptedAnswers: ["x=-2 max, x=4 min"],
      hint: "Translate each sign transition into rise-then-fall or fall-then-rise behaviour.",
      explanation:
        "At $x=-2$, the derivative changes from positive to negative, so $f$ changes from increasing to decreasing and has a local maximum. At $x=4$, the derivative changes from negative to positive, so $f$ changes from decreasing to increasing and has a local minimum. Coordinates cannot be found without values of $f$.",
      diagnosticIntent:
        "Checks direct interpretation of a derivative sign chart and whether unsupported y-coordinates are avoided.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-cls-qm4",
      prompt:
        "At a stationary point $x=a$, calculation gives $f''(a)=0$. What is the mathematically justified next step?",
      latex: "f'(a)=0,\\qquad f''(a)=0",
      answer: "B",
      choices: [
        "declare a horizontal inflection",
        "use a first-derivative sign chart or another higher-order argument",
        "declare a local minimum",
        "declare that the stationary point does not exist",
      ],
      distractorMisconceptions: {
        A: "Treats a necessary candidate condition as a sufficient inflection test.",
        C: "Interprets zero second derivative as though it were positive.",
        D: "Confuses an inconclusive classification test with absence of the point.",
      },
      hint: "A zero second derivative makes that particular test inconclusive, not the stationary point invalid.",
      explanation:
        "$f''(a)=0$ does not determine the classification: $x^4$ has a minimum at the origin, while $x^3$ has a horizontal inflection there. A first-derivative sign chart distinguishes whether $f$ changes from increasing to decreasing, decreasing to increasing, or does not turn. Therefore B is required.",
      diagnosticIntent:
        "Targets misuse of the inconclusive case of the second derivative test.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-cls-qm5",
      prompt:
        "A student argues: '$f''(0)=0$, so the origin is an inflection point of $f(x)=x^4$.' Which correction is best?",
      latex: "f(x)=x^4",
      answer: "D",
      choices: [
        "The student is correct because every zero of $f''$ is an inflection",
        "The origin is a local maximum, not an inflection",
        "The function has no stationary point at the origin",
        "$f''(x)=12x^2$ does not change sign, so the origin is a flat local minimum and not an inflection",
      ],
      distractorMisconceptions: {
        A: "Uses f''=0 as a sufficient condition without checking concavity.",
        B: "Reverses the bowl-shaped classification of the quartic.",
        C: "Ignores that f'(0)=0.",
      },
      hint: "Compute the signs of both $f'$ and $f''$ on either side of zero.",
      explanation:
        "For $f(x)=x^4$, $f'(x)=4x^3$ changes from negative to positive, so the origin is a local minimum. Also $f''(x)=12x^2$ is nonnegative on both sides and does not change sign, so concavity does not change. Thus the second derivative was inconclusive at the point and D gives the correct classification.",
      diagnosticIntent:
        "Uses a counterexample to expose the false rule that f''=0 automatically identifies an inflection.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm6",
      prompt:
        "Find and classify every stationary point. Explain why one point defeats a naive use of the second derivative test.",
      latex: "f(x)=x^4-4x^3",
      answer: "horizontal inflection at (0,0); local minimum at (3,-27)",
      acceptedAnswers: ["(0,0) stationary inflection and (3,-27) minimum"],
      hint: "Factor $f'(x)=4x^2(x-3)$ and inspect its sign at the double and simple roots.",
      explanation:
        "The derivative is $4x^2(x-3)$, giving stationary x-values $0$ and $3$. Around $0$, $f'$ is negative on both sides, so $(0,0)$ is a horizontal inflection even though $f''(0)=0$. At $3$, $f'$ changes from negative to positive, giving a local minimum, and $f(3)=81-108=-27$.",
      diagnosticIntent:
        "Requires multiplicity-aware classification and explicit handling of an inconclusive second derivative value.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm7",
      prompt:
        "Investigate how the stationary-point structure changes between $a=0$ and $a\\ne0$.",
      latex: "f_a(x)=x^3-3a^2x",
      answer:
        "a=0: horizontal inflection at (0,0); a!=0: local max at (-|a|,2|a|³) and local min at (|a|,-2|a|³)",
      acceptedAnswers: [
        "one stationary inflection when a=0; two turning points at x=+-|a| when a is nonzero",
      ],
      hint: "The derivative depends on $a^2$, so its real roots are determined by $|a|$, not by the sign of $a$.",
      explanation:
        "Since $f_a'(x)=3(x^2-a^2)$, a nonzero $a$ gives roots $x=\\pm|a|$. The second derivative $6x$ classifies the negative root as a local maximum with value $2|a|^3$ and the positive root as a local minimum with value $-2|a|^3$. When $a=0$, $f=x^3$ and the origin is a horizontal inflection.",
      diagnosticIntent:
        "Assesses a parameter investigation where students must recognise that squaring removes the sign of the parameter.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm8",
      prompt:
        "A cubic has a local maximum at $(-1,5)$ and a local minimum at $(2,-4)$. Reconstruct the cubic and verify both classifications.",
      latex: "f'(x)=k(x+1)(x-2)",
      answer: "f(x)=2x^3/3-x^2-4x+8/3",
      acceptedAnswers: ["f=(2/3)x^3-x^2-4x+8/3"],
      hint: "Use the difference $f(2)-f(-1)$ to determine $k$, then use either given point to find the constant.",
      explanation:
        "Integrating gives $f=k(x^3/3-x^2/2-2x)+C$. Across $-1$ to $2$, the bracket changes by $-9/2$, while $f(2)-f(-1)=-9$, so $k=2$. Using $f(-1)=5$ gives $C=8/3$. Because $f'=2(x+1)(x-2)$ changes positive-to-negative at $-1$ and negative-to-positive at $2$, the stated maximum and minimum are verified.",
      diagnosticIntent:
        "Synthesises stationary coordinates, a derivative model, definite change, integration, and classification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm9",
      prompt:
        "Compare the stationary point at $x=1$ for the two functions. State why the second derivative test succeeds for one and is inconclusive for the other.",
      latex: "f(x)=(x-1)^2,\\qquad g(x)=(x-1)^4",
      answer:
        "both have a local minimum at x=1; f''(1)=2>0, while g''(1)=0 so a first-derivative sign change is needed",
      acceptedAnswers: [
        "both minima; the second derivative proves f's minimum but is inconclusive for g",
      ],
      hint: "Calculate both second derivatives, then check the sign of each first derivative around $x=1$.",
      explanation:
        "Both functions are nonnegative and vanish at $x=1$, so both have local minima there. For $f$, $f''(1)=2>0$ directly confirms the minimum. For $g$, $g''(1)=0$, so the second derivative test says nothing; however, $g'(x)=4(x-1)^3$ changes from negative to positive, confirming the flat local minimum.",
      diagnosticIntent:
        "Checks comparison of two valid classification methods and interpretation of an inconclusive test result.",
      taskType: "analytical",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-cls-qm10",
      prompt:
        "Choose $k$ so that $x=1$ is stationary, then find and classify all stationary points of the resulting quartic.",
      latex: "f(x)=x^4-4x^2+kx",
      answer:
        "k=4; local minima at x=(-1-sqrt(5))/2 and x=1, local maximum at x=(-1+sqrt(5))/2",
      acceptedAnswers: [
        "k=4; minima at (-1-sqrt5)/2 and 1, maximum at (-1+sqrt5)/2",
      ],
      hint: "First use $f'(1)=0$, then factor the cubic derivative by $(x-1)$ and order its three roots.",
      explanation:
        "$f'(x)=4x^3-8x+k$, so $f'(1)=0$ gives $k=4$. Then $f'=4(x-1)(x^2+x-1)$, with ordered roots $(-1-\\sqrt5)/2$, $(-1+\\sqrt5)/2$, and $1$. Its sign alternates from negative to positive to negative to positive, so the first and third roots are local minima and the middle root is a local maximum.",
      diagnosticIntent:
        "Combines a parameter condition, exact factorisation, root ordering, and a full first-derivative classification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "concavity-inflection": [
    richAnswer({
      id: "y11adv-cs-con-qm1",
      prompt:
        "Find all intervals of concavity and the coordinates of every inflection point.",
      latex: "f(x)=x^4-4x^3",
      answer:
        "concave up for x<0 or x>2; concave down for 0<x<2; inflections (0,0) and (2,-16)",
      acceptedAnswers: [
        "CU (-infinity,0) union (2,infinity), CD (0,2), IPs (0,0),(2,-16)",
      ],
      hint: "Factor the second derivative and use its two zeros to build a concavity sign chart.",
      explanation:
        "$f''(x)=12x^2-24x=12x(x-2)$. It is positive for $x<0$ and $x>2$, and negative for $0<x<2$. The sign changes at both zeros, so both are inflection x-values. Substituting into $f$ gives the inflection points $(0,0)$ and $(2,-16)$.",
      diagnosticIntent:
        "Checks interval notation, sign analysis, sign-change confirmation, and recovery of inflection coordinates.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-con-qm2",
      prompt:
        "Which condition is sufficient to confirm that $x=a$ is an inflection point of a twice-differentiable function?",
      latex: "x=a",
      answer: "C",
      choices: [
        "$f(a)=0$",
        "$f'(a)=0$",
        "$f''$ changes sign at $x=a$",
        "$f''(a)=0$",
      ],
      distractorMisconceptions: {
        A: "Confuses an x-intercept with a change in concavity.",
        B: "Confuses a stationary point with an inflection point.",
        D: "Uses a common candidate equation without checking the required sign change.",
      },
      hint: "An inflection is defined by a change in the direction of concavity, not by one isolated equation.",
      explanation:
        "An inflection point occurs where concavity changes, so a sign change of $f''$ across $a$ is sufficient. The equations $f(a)=0$ and $f'(a)=0$ describe different features. Even $f''(a)=0$ is only a candidate condition: for $f=x^4$, it holds at zero but concavity stays upward.",
      diagnosticIntent:
        "Distinguishes the defining sign-change criterion from three common but insufficient point conditions.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm3",
      prompt:
        "The displayed line is the graph of $f''$. Given $f(1)=4$, find the inflection point and state the concavity intervals of $f$.",
      latex: "f''(x)=6(x-1),\\qquad f(1)=4",
      answer: "inflection (1,4); concave down for x<1 and concave up for x>1",
      acceptedAnswers: ["IP (1,4), CD x<1, CU x>1"],
      hint: "Read where the second derivative crosses the axis and which side of the axis it occupies.",
      explanation:
        "The line $f''=6(x-1)$ crosses zero at $x=1$. It is negative to the left and positive to the right, so $f$ changes from concave down to concave up there. The supplied function value gives the coordinate $f(1)=4$, hence the inflection point is $(1,4)$.",
      diagnosticIntent:
        "Tests interpretation of a second-derivative graph and use of separate information to recover a coordinate.",
      taskType: "problem-solving",
      difficulty: 3,
      cartesianGraph: lineGraph(
        { m: 6, b: -6 },
        {
          description:
            "Line graph of the second derivative y=6(x-1), crossing the x-axis at x=1",
          label: "y=f''(x)",
          points: [{ x: 1, y: 0, label: "(1,0)" }],
          xMin: -1,
          xMax: 3,
          yMin: -12,
          yMax: 12,
        },
      ),
    }),
    richChoice({
      id: "y11adv-cs-con-qm4",
      prompt:
        "A smooth graph of $f'$ has a strict local maximum at $x=2$. What feature must $f$ have at that x-value?",
      latex: "f'\\text{ has a strict local maximum at }x=2",
      answer: "B",
      choices: [
        "a local maximum",
        "an inflection point",
        "an x-intercept",
        "a local minimum",
      ],
      distractorMisconceptions: {
        A: "Reads a turning point of f' as a turning point of f.",
        C: "Treats derivative information as a statement that f itself equals zero.",
        D: "Reads the derivative's local maximum as the original function's local minimum.",
      },
      hint: "At a turning point of $f'$, its gradient $f''$ changes sign.",
      explanation:
        "At a strict local maximum of $f'$, the derivative graph changes from increasing to decreasing. Therefore $f''$ changes from positive to negative, so $f$ changes from concave up to concave down. That is an inflection point of $f$; it need not be stationary because the value of $f'(2)$ need not be zero.",
      diagnosticIntent:
        "Checks the derivative-to-concavity connection without confusing values, zeros, and turning points across graphs.",
      taskType: "procedural",
      difficulty: 3,
      cartesianGraph: quadraticGraph(
        { a: -1, b: 4, c: -3 },
        {
          description:
            "Downward-opening graph of the derivative with a strict local maximum at x=2",
          label: "y=f'(x)",
          points: [{ x: 2, y: 1, label: "local max" }],
          xMin: -1,
          xMax: 5,
          yMin: -8,
          yMax: 2,
        },
      ),
    }),
    richChoice({
      id: "y11adv-cs-con-qm5",
      prompt:
        "A student marks an inflection at the origin solely because $f''(0)=0$. Which example disproves that reasoning?",
      latex: "f''(0)=0",
      answer: "A",
      choices: ["$f(x)=x^4$", "$f(x)=x^3$", "$f(x)=x^3+x$", "$f(x)=-x^3$"],
      distractorMisconceptions: {
        B: "Selects the standard horizontal-inflection example rather than a counterexample.",
        C: "Selects a cubic whose second derivative changes sign at the origin.",
        D: "Selects another cubic whose concavity changes at the origin.",
      },
      hint: "Find a function whose second derivative is zero at the origin but has the same sign on both sides.",
      explanation:
        "For $f=x^4$, $f''=12x^2$, which equals zero at the origin but remains nonnegative on both sides. Thus the curve stays concave up and has no inflection there. Each cubic option has a second derivative proportional to $x$, which changes sign at zero and therefore does have an inflection.",
      diagnosticIntent:
        "Requires a counterexample to an invalid sufficient condition rather than recall of a definition alone.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm6",
      prompt:
        "Find $p$ so that the cubic has an inflection at $x=2$, and then find the coordinates of that inflection point.",
      latex: "f(x)=x^3+px^2+4x+1",
      answer: "p=-6; inflection point (2,-7)",
      acceptedAnswers: ["p = -6, IP (2,-7)"],
      hint: "For a cubic the linear second derivative changes sign at its zero, so impose $f''(2)=0$.",
      explanation:
        "$f''(x)=6x+2p$. Requiring the zero at $x=2$ gives $12+2p=0$, hence $p=-6$. The second derivative is then $6(x-2)$ and changes sign, confirming an inflection. Substitution into $f=x^3-6x^2+4x+1$ gives $f(2)=8-24+8+1=-7$, so the point is $(2,-7)$.",
      diagnosticIntent:
        "Checks reverse use of an inflection location to determine a coefficient and then recover a full coordinate.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm7",
      prompt:
        "Investigate how many inflection points the quartic has for $a>0$, $a=0$, and $a<0$.",
      latex: "f_a(x)=x^4-ax^2",
      answer:
        "a>0: two at x=+-sqrt(a/6); a<=0: no inflection points",
      acceptedAnswers: [
        "two inflections when a is positive, none when a is zero or negative",
      ],
      hint: "Solve $f_a''(x)=12x^2-2a=0$ and check whether real zeros actually separate opposite signs.",
      explanation:
        "The second derivative is $12x^2-2a$. If $a>0$, it vanishes at $x=\\pm\\sqrt{a/6}$ and is negative between the roots but positive outside, so both are inflections. If $a=0$, $f''=12x^2$ never changes sign. If $a<0$, $f''=12x^2+2|a|$ is always positive, so there are no inflections.",
      diagnosticIntent:
        "Assesses a bounded parameter investigation in which real candidate roots and sign changes must both be considered.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm8",
      prompt:
        "Reconstruct $f$ from the second derivative and initial data, then find all concavity intervals and inflection points.",
      latex: "f''(x)=6(x+1)(x-2),\\qquad f'(0)=1,\\qquad f(0)=3",
      answer:
        "f(x)=x^4/2-x^3-6x^2+x+3; inflections (-1,-5/2) and (2,-19); concave up outside [-1,2] and down between",
      acceptedAnswers: [
        "f=0.5x^4-x^3-6x^2+x+3; IPs (-1,-2.5),(2,-19), CU x<-1 or x>2, CD -1<x<2",
      ],
      hint: "Integrate twice and apply one initial condition after each integration before analysing the factored second derivative.",
      explanation:
        "Expanding and integrating gives $f'=2x^3-3x^2-12x+1$, then $f=x^4/2-x^3-6x^2+x+3$. The factored $f''$ is positive for $x<-1$ and $x>2$, and negative between. Both roots are sign-changing, and substitution gives the inflection points $(-1,-5/2)$ and $(2,-19)$.",
      diagnosticIntent:
        "Synthesises two reverse-calculus steps, initial conditions, a sign chart, and exact inflection coordinates.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm9",
      prompt:
        "Investigate the number and coordinates of inflection points as the real parameter $a$ varies.",
      latex: "f_a(x)=x^4+ax^3",
      answer:
        "a=0: no inflection; a!=0: inflections at (0,0) and (-a/2,-a^4/16)",
      acceptedAnswers: [
        "none if a=0; otherwise IPs x=0 and x=-a/2 with points (0,0),(-a/2,-a^4/16)",
      ],
      hint: "Factor $f_a''(x)=6x(2x+a)$ and treat the case where its two roots coincide separately.",
      explanation:
        "Here $f_a''(x)=6x(2x+a)$. For $a\\ne0$, the distinct simple roots $0$ and $-a/2$ each produce a sign change, so both are inflections. Their coordinates are $(0,0)$ and $(-a/2,-a⁴/16)$. When $a=0$, $f''=12x²$ only touches zero, stays nonnegative, and gives no inflection.",
      diagnosticIntent:
        "Tests parameter-dependent root coalescence and requires exact coordinates rather than candidate x-values alone.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-con-qm10",
      prompt:
        "Construct the monic quartic of least degree with inflection x-values $-1$ and $2$, concave up outside them, and satisfying $f'(0)=f(0)=0$.",
      latex: "f''(x)=12(x+1)(x-2)",
      answer: "f(x)=x^4-2x^3-12x^2",
      acceptedAnswers: ["f=x^4-2x^3-12x^2"],
      hint: "The monic condition fixes the leading coefficient of $f''$ at 12; integrate twice and apply both zero conditions.",
      explanation:
        "A monic quartic has second derivative leading term $12x^2$, so the required sign pattern gives $f''=12(x+1)(x-2)$. Integration yields $f'=4x^3-6x^2-24x+C$, and $f'(0)=0$ gives $C=0$. Integrating again and using $f(0)=0$ gives $f=x^4-2x^3-12x^2$.",
      diagnosticIntent:
        "Requires construction from concavity data, use of the monic constraint, and two successive initial conditions.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
