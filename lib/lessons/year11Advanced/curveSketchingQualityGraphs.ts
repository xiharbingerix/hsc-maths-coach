import {
  cubicGraph,
  quadraticGraph,
  richAnswer,
  richChoice,
  type CurveSketchingMasteryMap,
} from "./curveSketchingQualityHelpers";

export const curveSketchingQualityGraphs: CurveSketchingMasteryMap = {
  "systematic-curve-sketching": [
    richAnswer({
      id: "y11adv-cs-scs-qm1",
      prompt:
        "State the x-intercepts and whether the curve crosses or touches at each one, then give its end behaviour.",
      latex: "f(x)=(x+2)(x-1)^2",
      answer:
        "crosses at x=-2; touches at x=1; f(x)->-infinity as x->-infinity and f(x)->infinity as x->infinity",
      acceptedAnswers: [
        "x=-2 crossing, x=1 touching; left end down and right end up",
      ],
      hint: "Use root multiplicity for intercept behaviour and the positive cubic leading term for the two ends.",
      explanation:
        "The simple factor $x+2$ gives a crossing x-intercept at $x=-2$. The squared factor $(x-1)^2$ gives a touching intercept at $x=1$. The product is a cubic with positive leading coefficient, so $f(x)\\to-\\infty$ as $x\\to-\\infty$ and $f(x)\\to\\infty$ as $x\\to\\infty$.",
      diagnosticIntent:
        "Checks the intercept-multiplicity and end-behaviour information that must precede detailed calculus in a sketch.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-scs-qm2",
      prompt:
        "The displayed cubic crosses the axis at $x=-2$ and touches it at $x=1$. Which factorisation matches the graph?",
      latex: "f(x)=?",
      answer: "B",
      choices: [
        "$(x+2)^2(x-1)$",
        "$(x+2)(x-1)^2$",
        "$(x-2)(x+1)^2$",
        "$-(x+2)(x-1)^2$",
      ],
      distractorMisconceptions: {
        A: "Assigns the double factor to the crossing intercept instead of the touching intercept.",
        C: "Reverses the signs used to encode the two x-intercepts.",
        D: "Matches the roots but reverses the displayed end behaviour with a negative leading coefficient.",
      },
      hint: "A crossing root has odd multiplicity, a touching root has even multiplicity, and the right end is rising.",
      explanation:
        "Crossing at $x=-2$ requires a simple factor $x+2$, while touching at $x=1$ requires the even factor $(x-1)^2$. The graph falls left and rises right, so its leading coefficient is positive. Therefore the matching factorisation is $(x+2)(x-1)^2$, option B.",
      diagnosticIntent:
        "Tests reverse translation from visible intercept behaviour and end behaviour to algebraic factor structure.",
      taskType: "analytical",
      difficulty: 3,
      cartesianGraph: cubicGraph(
        { a: 1, b: 0, c: -3, d: 2 },
        {
          description:
            "Cubic crossing the x-axis at -2 and touching it at 1 before rising",
          label: "y=f(x)",
          points: [
            { x: -2, y: 0, label: "(-2,0)" },
            { x: 1, y: 0, label: "(1,0)" },
          ],
          xMin: -3.5,
          xMax: 2.5,
          yMin: -6,
          yMax: 6,
        },
      ),
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm3",
      prompt:
        "Construct the monic cubic with a simple root at $-2$ and a double root at $1$, then find its stationary points and inflection point.",
      latex: "f(x)=(x+2)(x-1)^2",
      answer:
        "f(x)=x^3-3x+2; local max (-1,4), local min (1,0), inflection (0,2)",
      acceptedAnswers: [
        "x^3-3x+2; max (-1,4), min (1,0), IP (0,2)",
      ],
      hint: "Expand first, then solve $f'=0$ and $f''=0$, substituting each x-value into the cubic.",
      explanation:
        "Expansion gives $f=x^3-3x+2$. Then $f'=3(x-1)(x+1)$, so $(-1,4)$ is a local maximum and $(1,0)$ is a local minimum. Also $f''=6x$ changes sign at zero, and $f(0)=2$, so the inflection point is $(0,2)$. These features agree with the simple and double roots.",
      diagnosticIntent:
        "Connects root multiplicity, expanded algebra, stationary-point calculus, and inflection information in one sketch plan.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-scs-qm4",
      prompt:
        "Which statement about a polynomial root of multiplicity four is correct?",
      latex: "f(x)=(x-a)^4g(x),\\qquad g(a)\\ne0",
      answer: "C",
      choices: [
        "the curve must cross the axis with nonzero gradient",
        "the curve must cross the axis with zero gradient",
        "the curve touches the axis and has zero gradient at $x=a$",
        "the root cannot be a stationary point",
      ],
      distractorMisconceptions: {
        A: "Treats an even-multiplicity root as a simple crossing.",
        B: "Recognises zero gradient but still assigns odd-multiplicity crossing behaviour.",
        D: "Ignores that differentiating a fourth-power factor retains a zero factor at the root.",
      },
      hint: "Even multiplicity controls crossing behaviour, while multiplicity greater than one also forces $f'(a)=0$.",
      explanation:
        "An even-multiplicity root does not change the sign of the function, so the graph touches rather than crosses the axis. Because the multiplicity exceeds one, differentiation leaves a factor $(x-a)^3$, giving $f'(a)=0$. Thus the intercept is stationary and option C is correct.",
      diagnosticIntent:
        "Checks generalisation beyond double roots while keeping intercept behaviour and stationarity conceptually separate.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-scs-qm5",
      prompt:
        "A student sketches the quartic as crossing the axis at both roots. Which diagnosis is correct?",
      latex: "f(x)=(x+1)^2(x-3)^2",
      answer: "D",
      choices: [
        "the sketch is correct because quartics cross at every real root",
        "it should cross only at $x=-1$ because that root is negative",
        "it should cross only at $x=3$ because that root is positive",
        "it should touch at both roots because both have even multiplicity",
      ],
      distractorMisconceptions: {
        A: "Uses polynomial degree instead of root multiplicity to decide local intercept behaviour.",
        B: "Uses the sign of a root rather than its multiplicity.",
        C: "Uses the sign of a root rather than its multiplicity.",
      },
      hint: "Inspect the exponent on each factor; the sign of the root does not determine crossing or touching.",
      explanation:
        "Both factors are squared, so neither changes sign through its root. The function is nonnegative everywhere and equals zero only at $x=-1$ and $x=3$. Consequently the graph touches the axis at both roots and turns back upward; the student's two crossings are incompatible with the factorisation.",
      diagnosticIntent:
        "Targets a sketching error caused by ignoring multiplicity and relying on a superficial all-roots-cross rule.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm6",
      prompt:
        "A cubic has stationary points $(-1,4)$ and $(1,0)$. Reconstruct it, then determine its x-intercepts and inflection point.",
      latex: "f'(x)=k(x+1)(x-1)",
      answer:
        "f(x)=x^3-3x+2; x-intercepts -2 and 1 (double); inflection (0,2)",
      acceptedAnswers: [
        "f=x^3-3x+2; roots -2 and 1 twice; IP (0,2)",
      ],
      hint: "Use the change in function value between $x=-1$ and $x=1$ to find $k$, then determine the constant.",
      explanation:
        "Integrating gives $f=k(x³/3-x)+C$. The bracket changes from $2/3$ at $-1$ to $-2/3$ at $1$, so the function change $-4$ gives $k=3$. Using $f(1)=0$ gives $C=2$, hence $f=x³-3x+2=(x+2)(x-1)²$. The roots are $-2$ and a double root $1$, and $f''=6x$ gives inflection $(0,2)$.",
      diagnosticIntent:
        "Requires reverse reconstruction and then checks that calculus features agree with factorisation and intercept behaviour.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm7",
      prompt:
        "Investigate how the number of distinct real x-intercepts changes with $k$.",
      latex: "f_k(x)=x^3-3x+k",
      answer:
        "|k|<2: three; |k|=2: two distinct with one double; |k|>2: one",
      acceptedAnswers: [
        "three roots for -2<k<2, two for k=+-2, one for k<-2 or k>2",
      ],
      hint: "The stationary x-values remain $-1$ and $1$; compare their y-values with the x-axis.",
      explanation:
        "The local maximum occurs at $x=-1$ with value $k+2$, and the local minimum at $x=1$ with value $k-2$. Three crossings require the maximum above and minimum below the axis, giving $-2<k<2$. At $k=\\pm2$ one extremum lies on the axis, creating a double root. Outside this range both extrema lie on the same side, leaving one real intercept.",
      diagnosticIntent:
        "Assesses a bounded vertical-shift investigation using extrema to classify the number and multiplicity of roots.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm8",
      prompt:
        "Construct and completely analyse the monic cubic that crosses at $x=-3$ and touches at $x=1$.",
      latex: "f(x)=(x+3)(x-1)^2",
      answer:
        "f=x^3+x^2-5x+3; local max (-5/3,256/27), local min (1,0), inflection (-1/3,128/27)",
      acceptedAnswers: [
        "x^3+x^2-5x+3; max (-5/3,256/27), min (1,0), IP (-1/3,128/27)",
      ],
      hint: "Expand, factor the derivative, and use $x=-b/(3a)$ for the cubic's inflection x-value.",
      explanation:
        "Expansion gives $f=x^3+x^2-5x+3$. Its derivative factors as $(3x+5)(x-1)$, giving a local maximum at $(-5/3,256/27)$ and the touching local minimum $(1,0)$. Since $f''=6x+2$, concavity changes at $x=-1/3$; substitution gives the inflection point $(-1/3,128/27)$.",
      diagnosticIntent:
        "Synthesises multiplicity, exact rational stationary coordinates, classification, and an exact inflection coordinate.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm9",
      prompt:
        "For nonzero $a$, investigate all intercept, stationary-point, and end-behaviour features, distinguishing $a>0$ from $a<0$.",
      latex: "f_a(x)=(x-a)^2(x+2a)",
      answer:
        "roots x=a (touch) and x=-2a (cross); stationary x=+-a; if a>0 max (-a,4a^3), min (a,0), reversed locations if a<0; positive cubic end behaviour",
      acceptedAnswers: [
        "touch at a, cross at -2a; for a>0 max at -a and min at a, for a<0 max at a and min at -a",
      ],
      hint: "Differentiate the factored form to obtain $3(x-a)(x+a)$, then order $-a$ and $a$ in each sign case.",
      explanation:
        "The roots are a double root $x=a$ and simple root $x=-2a$. Differentiation gives $f_a'=3(x-a)(x+a)$. For $a>0$, $-a<a$, so $(-a,4a^3)$ is a local maximum and $(a,0)$ a local minimum. For $a<0$, the order reverses: $(a,0)$ is the maximum and $(-a,4a^3)$ the minimum. The positive leading coefficient gives left-down, right-up ends.",
      diagnosticIntent:
        "Requires a sign-sensitive family analysis in which algebraic labels and the geometric left-to-right order differ.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-scs-qm10",
      prompt:
        "Reconstruct the function, then list every intercept, stationary point, inflection point, and end behaviour needed for a complete sketch.",
      latex: "f'(x)=3(x+1)(x-3),\\qquad f(-1)=0",
      answer:
        "f=(x+1)^2(x-5); roots -1 (double), 5; local max (-1,0), local min (3,-32), inflection (1,-16); left down, right up",
      acceptedAnswers: [
        "f=x^3-3x^2-9x-5 with max (-1,0), min (3,-32), IP (1,-16), roots -1 twice and 5",
      ],
      hint: "Integrate the derivative, use the point to find the constant, then factor the resulting cubic before assembling the sketch.",
      explanation:
        "Integration gives $f=x^3-3x^2-9x+C$, and $f(-1)=0$ gives $C=-5$, so $f=(x+1)^2(x-5)$. It touches at $-1$ and crosses at $5$. The derivative sign gives a local maximum $(-1,0)$ and minimum $(3,-32)$. Since $f''=6(x-1)$, the inflection is $(1,-16)$; the positive cubic falls left and rises right.",
      diagnosticIntent:
        "Combines reverse calculus, factorisation, multiplicity, classification, concavity, coordinates, and end behaviour.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "reading-derivative-graphs": [
    richAnswer({
      id: "y11adv-cs-rd-qm1",
      prompt:
        "The displayed graph is $y=f'(x)$. State the increasing and decreasing intervals of $f$ and classify both stationary points.",
      latex: "f'(x)=x^2-4",
      answer:
        "increasing for x<-2 or x>2, decreasing for -2<x<2; local max at x=-2 and local min at x=2",
      acceptedAnswers: [
        "inc (-infinity,-2) union (2,infinity), dec (-2,2), max -2, min 2",
      ],
      hint: "Read the sign of the derivative above and below the x-axis, then note each crossing direction.",
      explanation:
        "The derivative is positive outside its zeros $-2$ and $2$, so $f$ increases there, and it is negative between them, so $f$ decreases on $(-2,2)$. At $-2$, $f'$ changes positive-to-negative, giving a local maximum. At $2$, it changes negative-to-positive, giving a local minimum.",
      diagnosticIntent:
        "Checks complete extraction of monotonicity and stationary-point classification from a derivative graph.",
      taskType: "procedural",
      difficulty: 3,
      cartesianGraph: quadraticGraph(
        { a: 1, b: 0, c: -4 },
        {
          description:
            "Upward-opening graph of the derivative y=x squared minus 4, crossing at -2 and 2",
          label: "y=f'(x)",
          points: [
            { x: -2, y: 0, label: "(-2,0)" },
            { x: 2, y: 0, label: "(2,0)" },
          ],
          xMin: -4,
          xMax: 4,
          yMin: -5,
          yMax: 8,
        },
      ),
    }),
    richChoice({
      id: "y11adv-cs-rd-qm2",
      prompt:
        "The displayed graph of $f'$ has a strict local maximum at $x=1$. What does $f$ have at $x=1$?",
      latex: "f'(x)=-(x-1)^2+4",
      answer: "B",
      choices: [
        "necessarily a local maximum",
        "an inflection point where concavity changes from up to down",
        "necessarily a local minimum",
        "an x-intercept",
      ],
      distractorMisconceptions: {
        A: "Transfers a turning point of the derivative directly to the original function.",
        C: "Reverses the derivative-to-concavity interpretation.",
        D: "Confuses a feature of f' with the value f(1)=0.",
      },
      hint: "The slope of the $f'$ graph is $f''$; inspect how that slope changes through the vertex.",
      explanation:
        "To the left of $x=1$, the derivative graph is rising, so $f''>0$ and $f$ is concave up. To the right it is falling, so $f''<0$ and $f$ is concave down. Therefore $f$ has an inflection at $x=1$. Since $f'(1)=4$, it is not stationary there.",
      diagnosticIntent:
        "Distinguishes a turning point of f' from a zero of f' and links derivative slope to concavity.",
      taskType: "analytical",
      difficulty: 3,
      cartesianGraph: quadraticGraph(
        { a: -1, b: 2, c: 3 },
        {
          description:
            "Downward-opening derivative graph with vertex at (1,4)",
          label: "y=f'(x)",
          points: [{ x: 1, y: 4, label: "(1,4)" }],
          xMin: -2,
          xMax: 4,
          yMin: -5,
          yMax: 5,
        },
      ),
    }),
    richAnswer({
      id: "y11adv-cs-rd-qm3",
      prompt:
        "Use the displayed derivative graph to state all increasing and decreasing intervals of $f$ and classify its stationary points.",
      latex: "f'(x)=-(x+1)(x-3)",
      answer:
        "decreasing for x<-1 or x>3, increasing for -1<x<3; local min at x=-1, local max at x=3",
      acceptedAnswers: [
        "dec outside [-1,3], inc between; minimum -1, maximum 3",
      ],
      hint: "The inverted parabola is above the axis between its roots and below it outside them.",
      explanation:
        "The derivative is negative for $x<-1$, positive for $-1<x<3$, and negative for $x>3$. Thus $f$ decreases, then increases, then decreases. The sign changes negative-to-positive at $-1$, giving a local minimum, and positive-to-negative at $3$, giving a local maximum.",
      diagnosticIntent:
        "Checks interpretation of an inverted derivative graph, including both intervals and crossing classifications.",
      taskType: "problem-solving",
      difficulty: 3,
      cartesianGraph: quadraticGraph(
        { a: -1, b: 2, c: 3 },
        {
          description:
            "Inverted derivative parabola crossing the x-axis at -1 and 3",
          label: "y=f'(x)",
          points: [
            { x: -1, y: 0, label: "(-1,0)" },
            { x: 3, y: 0, label: "(3,0)" },
          ],
          xMin: -3,
          xMax: 5,
          yMin: -8,
          yMax: 5,
        },
      ),
    }),
    richChoice({
      id: "y11adv-cs-rd-qm4",
      prompt:
        "At a point, $f'$ is positive while $f''$ is negative. Which description of $f$ is correct there?",
      latex: "f'(x)>0,\\qquad f''(x)<0",
      answer: "A",
      choices: [
        "increasing and concave down",
        "increasing and concave up",
        "decreasing and concave down",
        "decreasing and concave up",
      ],
      distractorMisconceptions: {
        B: "Uses the positive value of f' to infer positive f'' as well.",
        C: "Treats a downward-sloping derivative as a negative derivative value.",
        D: "Reverses both the value and slope interpretations of the derivative graph.",
      },
      hint: "The height of the derivative graph controls increase or decrease; its slope controls concavity.",
      explanation:
        "Being above the axis means $f'>0$, so $f$ is increasing. Sloping downward means the gradient of $f'$ is negative, so $f''<0$ and $f$ is concave down. These are independent features of the derivative graph, giving the combined description in A.",
      diagnosticIntent:
        "Separates the value of f' from the slope of f', a central distinction when reading derivative graphs.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-rd-qm5",
      prompt:
        "A student labels every local extremum of $f'$ as a stationary point of $f$. What is the correct rule?",
      latex: "y=f'(x)",
      answer: "D",
      choices: [
        "turning points of $f'$ are always maxima of $f$",
        "turning points of $f'$ are always minima of $f$",
        "turning points and x-intercepts of $f'$ describe the same features of $f$",
        "x-intercepts of $f'$ are stationary points of $f$; turning points of $f'$ indicate inflections of $f$",
      ],
      distractorMisconceptions: {
        A: "Transfers the derivative graph's local shape directly to f.",
        B: "Transfers the derivative graph's local shape directly to f with reversed classification.",
        C: "Collapses derivative value and derivative slope into one condition.",
      },
      hint: "Stationarity depends on the value $f'=0$, while inflection depends on the slope $f''$ changing sign.",
      explanation:
        "A stationary point of $f$ occurs where the value of the derivative is zero, so it comes from an x-intercept of the $f'$ graph. A turning point of $f'$ is where its slope $f''$ changes sign, so it indicates an inflection of $f$. The two features coincide only in special cases, not as a general rule.",
      diagnosticIntent:
        "Directly diagnoses the most common category error in derivative-graph interpretation.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-rd-qm6",
      prompt:
        "The graph below is $f'$. Given $f(0)=2$, reconstruct $f$ and find its stationary points and inflection point.",
      latex: "f'(x)=x^2-4x+3,\\qquad f(0)=2",
      answer:
        "f=x^3/3-2x^2+3x+2; local max (1,10/3), local min (3,2), inflection (2,8/3)",
      acceptedAnswers: [
        "f=(1/3)x^3-2x^2+3x+2; max (1,10/3), min (3,2), IP (2,8/3)",
      ],
      hint: "Integrate the derivative and use the initial value, then read derivative crossings and its vertex.",
      explanation:
        "Integration gives $f=x^3/3-2x^2+3x+C$, and $f(0)=2$ gives $C=2$. Since $f'=(x-1)(x-3)$, $f$ has a local maximum at $(1,10/3)$ and a local minimum at $(3,2)$. The derivative graph turns at $x=2$, where $f(2)=8/3$, so the inflection is $(2,8/3)$.",
      diagnosticIntent:
        "Synthesises derivative-graph reading with reverse integration and exact coordinate recovery.",
      taskType: "problem-solving",
      difficulty: 4,
      cartesianGraph: quadraticGraph(
        { a: 1, b: -4, c: 3 },
        {
          description:
            "Derivative parabola crossing at 1 and 3 with a minimum at (2,-1)",
          label: "y=f'(x)",
          points: [
            { x: 1, y: 0, label: "(1,0)" },
            { x: 2, y: -1, label: "(2,-1)" },
            { x: 3, y: 0, label: "(3,0)" },
          ],
          xMin: -1,
          xMax: 5,
          yMin: -2,
          yMax: 8,
        },
      ),
    }),
    richAnswer({
      id: "y11adv-cs-rd-qm7",
      prompt:
        "Investigate the number and classification of stationary points of $f$ as the real parameter $a$ varies.",
      latex: "f_a'(x)=x^2-a",
      answer:
        "a>0: max at x=-sqrt(a), min at x=sqrt(a); a=0: horizontal inflection at x=0; a<0: no stationary points",
      acceptedAnswers: [
        "two turning points for a>0, one stationary inflection for a=0, none for a<0",
      ],
      hint: "Study the intersections of the derivative parabola $y=x^2-a$ with the x-axis in each case.",
      explanation:
        "For $a>0$, the derivative crosses at $-\\sqrt a$ from positive to negative, giving a local maximum, and at $\\sqrt a$ from negative to positive, giving a local minimum. At $a=0$, $f'=x^2$ only touches zero and stays positive, so $f$ has a horizontal inflection. For $a<0$, $f'=x^2+|a|>0$ and there are no stationary points.",
      diagnosticIntent:
        "Assesses a parameterised derivative-graph investigation across crossing, touching, and no-intercept cases.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-rd-qm8",
      prompt:
        "Reconstruct $f$ and use the multiplicities in $f'$ to classify its stationary points. Then find every inflection x-value.",
      latex: "f'(x)=(x+2)(x-1)^2,\\qquad f(0)=0",
      answer:
        "f=x^4/4-3x^2/2+2x; local min (-2,-6), horizontal inflection (1,3/4); inflections x=-1 and x=1",
      acceptedAnswers: [
        "f=0.25x^4-1.5x^2+2x; min (-2,-6), stationary IP (1,0.75), IP x-values -1,1",
      ],
      hint: "Expand and integrate $f'$, use its simple and double roots for stationarity, then solve $f''=0$.",
      explanation:
        "Expanding and integrating gives $f=x^4/4-3x^2/2+2x$. The derivative changes negative-to-positive at $x=-2$, producing the local minimum $(-2,-6)$, but only touches zero at $x=1$, producing the horizontal inflection $(1,3/4)$. Since $f''=3(x^2-1)$ changes sign at both $-1$ and $1$, these are the two inflection x-values.",
      diagnosticIntent:
        "Combines derivative multiplicity, reverse integration, stationary classification, and distinct concavity analysis.",
      taskType: "synthesis",
      difficulty: 5,
      cartesianGraph: cubicGraph(
        { a: 1, b: 0, c: -3, d: 2 },
        {
          description:
            "Cubic derivative crossing at -2 and touching the x-axis at 1",
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
      id: "y11adv-cs-rd-qm9",
      prompt:
        "Investigate how the stationary-point structure of $f$ depends on $k$.",
      latex: "f_k'(x)=x^2-2kx+1",
      answer:
        "|k|>1: local max at k-sqrt(k^2-1), local min at k+sqrt(k^2-1); |k|=1: horizontal inflection at x=k; |k|<1: none",
      acceptedAnswers: [
        "two turning points if |k|>1, one stationary inflection if |k|=1, no stationary points if |k|<1",
      ],
      hint: "Use the discriminant and then distinguish a double tangency of the derivative graph from two crossings.",
      explanation:
        "The discriminant of $f_k'$ is $4(k^2-1)$. If $|k|>1$, the two roots are $k\\pm\\sqrt{k^2-1}$; the upward parabola crosses positive-to-negative at the smaller root and negative-to-positive at the larger, giving a maximum then minimum. If $|k|=1$, it touches zero at $x=k$, giving a horizontal inflection. If $|k|<1$, it stays positive and gives no stationary point.",
      diagnosticIntent:
        "Requires discriminant reasoning to interpret a family of derivative graphs and classify every boundary case.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-rd-qm10",
      prompt:
        "A derivative is modelled below and $f(0)=1$. Reconstruct $f$, classify all stationary points, and explain the feature at $x=0$.",
      latex: "f'(x)=(x+2)x^2(x-3),\\qquad f(0)=1",
      answer:
        "f=x^5/5-x^4/4-2x^3+1; local max (-2,33/5), horizontal inflection (0,1), local min (3,-493/20)",
      acceptedAnswers: [
        "f=(1/5)x^5-(1/4)x^4-2x^3+1; max (-2,6.6), stationary IP (0,1), min (3,-24.65)",
      ],
      hint: "Expand and integrate, then use the simple roots and the double root of $f'$ to track its sign.",
      explanation:
        "The derivative expands to $x^4-x^3-6x^2$, so $f=x^5/5-x^4/4-2x^3+1$. Its sign changes positive-to-negative at $-2$, giving the local maximum $(-2,33/5)$; stays negative through the double root $0$, giving the horizontal inflection $(0,1)$; and changes negative-to-positive at $3$, giving the local minimum $(3,-493/20)$.",
      diagnosticIntent:
        "Synthesises a qualitative derivative graph, multiplicity, reverse integration, and three distinct stationary classifications.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
