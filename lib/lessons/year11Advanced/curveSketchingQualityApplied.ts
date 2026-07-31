import {
  cubicGraph,
  richAnswer,
  richChoice,
  type CurveSketchingMasteryMap,
} from "./curveSketchingQualityHelpers";

export const curveSketchingQualityApplied: CurveSketchingMasteryMap = {
  optimisation: [
    richAnswer({
      id: "y11adv-cs-opt-qm1",
      prompt:
        "A rectangle has perimeter 80 cm. Find its dimensions and area when its area is maximised.",
      latex: "2x+2y=80",
      answer: "20 cm by 20 cm; maximum area 400 cm^2",
      acceptedAnswers: ["20x20 cm, A=400 cm^2", "x=20, y=20, area=400"],
      hint: "Use the perimeter constraint to write $A=x(40-x)$, then classify its stationary point.",
      explanation:
        "The constraint gives $y=40-x$, so $A(x)=x(40-x)=40x-x^2$ for $0<x<40$. Then $A'(x)=40-2x=0$ gives $x=20$, and $A''=-2<0$ confirms a maximum. Thus $y=20$ and the maximum area is $20\\times20=400$ square centimetres.",
      diagnosticIntent:
        "Checks the standard constraint-objective-classification workflow and requires a contextual answer with units.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-opt-qm2",
      prompt:
        "A differentiable function is being maximised on the closed interval $[a,b]$. Which candidates must be compared?",
      latex: "x\\in[a,b]",
      answer: "D",
      choices: [
        "only points where $f'(x)=0$",
        "only the two endpoints",
        "only points where $f''(x)<0$",
        "both endpoints and every interior critical point",
      ],
      distractorMisconceptions: {
        A: "Ignores that a global extremum can occur at an endpoint.",
        B: "Ignores interior stationary candidates.",
        C: "Uses a local classification test as though it located all global candidates.",
      },
      hint: "The extreme value theorem does not restrict a global extremum to an interior stationary point.",
      explanation:
        "On a closed interval, a global maximum or minimum can occur at either endpoint or at an interior critical point. Therefore all values $f(a)$, $f(b)$, and $f(c)$ for interior points where $f'(c)=0$ or is undefined must be compared. A second derivative sign classifies some local candidates but does not replace this comparison.",
      diagnosticIntent:
        "Targets omission of endpoints and confusion between local classification and global closed-interval optimisation.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm3",
      prompt:
        "A business models profit by the quadratic below, where $x\\ge0$ is the number of units. Find the production level and profit at the maximum.",
      latex: "P(x)=-2x^2+120x-1000",
      answer: "x=30 units; maximum profit 800",
      acceptedAnswers: ["30 units, P=800", "P(30)=800"],
      hint: "Solve $P'(x)=0$ and use the negative second derivative to justify the maximum.",
      explanation:
        "$P'(x)=-4x+120$, so the only stationary point is $x=30$. Since $P''(x)=-4<0$, it is a maximum. Substitution gives $P(30)=-2(900)+120(30)-1000=800$. Thus production of 30 units gives the model's maximum profit of 800 currency units.",
      diagnosticIntent:
        "Checks calculus optimisation and whether both the decision variable and objective value are interpreted.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-opt-qm4",
      prompt:
        "After solving $A'(x_0)=0$, which additional result directly confirms a local maximum by the second derivative test?",
      latex: "A'(x_0)=0",
      answer: "A",
      choices: [
        "$A''(x_0)<0$",
        "$A''(x_0)>0$",
        "$A(x_0)=0$",
        "$A''(x_0)=0$",
      ],
      distractorMisconceptions: {
        B: "Reverses concave-down and concave-up classifications.",
        C: "Confuses an objective value with the curvature condition.",
        D: "Treats the inconclusive second-derivative case as confirmation.",
      },
      hint: "At the top of a smooth hill the graph is concave down.",
      explanation:
        "At a stationary point, $A''(x_0)<0$ means the objective graph is concave down, so the point is a local maximum. A positive second derivative would confirm a minimum, while a zero second derivative is inconclusive. The numerical value $A(x_0)$ does not determine whether the point is maximal.",
      diagnosticIntent:
        "Checks precise use of the second derivative test after a stationary candidate has already been found.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-opt-qm5",
      prompt:
        "A closed cylinder has fixed volume $250\\pi$ cubic centimetres. A student writes $S=2\\pi r^2+500\\pi r$. What is the error?",
      latex: "\\pi r^2h=250\\pi,\\qquad S=2\\pi r^2+2\\pi rh",
      answer: "C",
      choices: [
        "the two circular ends should be omitted",
        "the volume constraint should be $rh=250$",
        "the student failed to substitute $h=250/r^2$, so the curved-area term should be $500\\pi/r$",
        "surface area cannot be optimised with calculus",
      ],
      distractorMisconceptions: {
        A: "Changes a closed cylinder into an open cylinder.",
        B: "Drops the squared radius from the cylinder volume formula.",
        D: "Rejects a standard differentiable objective rather than diagnosing the substitution.",
      },
      hint: "Solve the volume constraint for $h$ before substituting into the curved surface area $2\\pi rh$.",
      explanation:
        "The volume condition gives $h=250/r^2$. Hence the curved surface term is $2\\pi r(250/r^2)=500\\pi/r$, not $500\\pi r$. The correct one-variable objective is $S(r)=2\\pi r^2+500\\pi/r$ for $r>0$, so C identifies the precise algebraic modelling error.",
      diagnosticIntent:
        "Targets failure to eliminate a constrained variable correctly before differentiation.",
      taskType: "analytical",
      difficulty: 4,
      solid3DDiagram: {
        description:
          "Closed right circular cylinder labelled with radius r and height h, supporting the fixed-volume surface-area model.",
        solid: "cylinder",
        labels: { radius: "r", height: "h" },
      },
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm6",
      prompt:
        "A rectangle is symmetric about the y-axis, with upper vertices on the parabola and its base on the x-axis. Find its maximum dimensions and area.",
      latex: "y=12-x^2",
      answer: "width 4, height 8; maximum area 32",
      acceptedAnswers: ["4 by 8, A=32", "x=2, width=4, height=8, area=32"],
      hint: "If the upper-right vertex is $(x,12-x^2)$, the full width is $2x$.",
      explanation:
        "The rectangle has width $2x$ and height $12-x^2$, so $A(x)=2x(12-x^2)=24x-2x^3$ for $0<x<\\sqrt{12}$. Then $A'=24-6x^2=0$ gives $x=2$. Since $A''=-12x<0$ there, the maximum has width $4$, height $8$, and area $32$.",
      diagnosticIntent:
        "Checks geometric modelling, especially the factor of two created by symmetry, before calculus is applied.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm7",
      prompt:
        "For $a>0$, investigate the minimum of the family on its stated domain and express both the minimising x-value and minimum in terms of $a$.",
      latex: "S_a(x)=x+\\frac{a}{x},\\qquad x>0",
      answer: "minimum at x=sqrt(a); minimum value 2sqrt(a)",
      acceptedAnswers: ["x=√a, S_min=2√a", "min 2sqrt(a) when x=sqrt(a)"],
      hint: "Solve $1-a/x^2=0$ using the positive domain, then verify the sign of the second derivative.",
      explanation:
        "$S_a'(x)=1-a/x^2$, so the positive-domain stationary point is $x=\\sqrt a$. Also $S_a''(x)=2a/x^3>0$ for every $x>0$, confirming a minimum. Substitution gives $S_a(\\sqrt a)=\\sqrt a+a/\\sqrt a=2\\sqrt a$. This generalises the familiar reciprocal-sum optimisation.",
      diagnosticIntent:
        "Assesses a bounded symbolic investigation and whether domain restrictions remove the negative algebraic root.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm8",
      prompt:
        "A poster must contain 384 square centimetres of printed area. Side margins are 2 cm and top and bottom margins are 3 cm. Find the printed dimensions that minimise total paper area.",
      latex: "xy=384,\\qquad A=(x+4)(y+6)",
      answer: "printed area 16 cm by 24 cm; paper 20 cm by 30 cm; minimum paper area 600 cm^2",
      acceptedAnswers: ["x=16, y=24; page 20x30; A_min=600"],
      hint: "Substitute $y=384/x$ to obtain $A(x)=408+6x+1536/x$ for $x>0$.",
      explanation:
        "Using $y=384/x$ gives $A(x)=408+6x+1536/x$. Then $A'=6-1536/x^2=0$ gives $x=16$ on the positive domain, and $A''=3072/x^3>0$ confirms a minimum. Thus $y=24$, so the printed region is $16$ by $24$ cm, the page is $20$ by $30$ cm, and its area is $600$ square centimetres.",
      diagnosticIntent:
        "Synthesises a product constraint, margin translation, domain, calculus classification, and two sets of contextual dimensions.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm9",
      prompt:
        "A closed cylinder has fixed volume $V>0$. Investigate the relationship between height and radius at minimum surface area.",
      latex: "V=\\pi r^2h,\\qquad S=2\\pi r^2+2\\pi rh",
      answer: "h=2r at the minimum",
      acceptedAnswers: ["height equals the diameter", "h/r=2"],
      hint: "Eliminate $h$ to get $S(r)=2\\pi r^2+2V/r$, then use the stationary equation to simplify $h$.",
      explanation:
        "From the volume constraint, $h=V/(\\pi r^2)$ and $S(r)=2\\pi r^2+2V/r$. The stationary equation $4\\pi r-2V/r^2=0$ gives $V=2\\pi r^3$. Therefore $h=V/(\\pi r^2)=2r$. Since $S''=4\\pi+4V/r^3>0$, this relation occurs at the unique minimum.",
      diagnosticIntent:
        "Tests symbolic optimisation and extraction of a scale-free design relationship rather than a numerical radius only.",
      taskType: "investigative",
      difficulty: 5,
      solid3DDiagram: {
        description:
          "Closed right circular cylinder labelled with radius r and height h, used to derive the minimum-area shape for fixed volume.",
        solid: "cylinder",
        labels: { radius: "r", height: "h" },
      },
    }),
    richAnswer({
      id: "y11adv-cs-opt-qm10",
      prompt:
        "Squares of side $x$ are cut from each corner of a 20 cm by 30 cm sheet and the sides are folded to make an open box. Find the exact cut size that maximises volume and justify the global maximum.",
      latex: "V(x)=x(20-2x)(30-2x),\\qquad 0<x<10",
      answer: "x=(25-5sqrt(7))/3 cm",
      acceptedAnswers: ["x = 5(5-√7)/3 cm", "approximately 3.92 cm"],
      hint: "Expand the cubic, solve its quadratic derivative, and reject the critical root outside the physical domain.",
      explanation:
        "Expanding gives $V=600x-100x^2+4x^3$, so $V'=4(3x^2-50x+150)$. The roots are $(25\\pm5\\sqrt7)/3$, but only $(25-5\\sqrt7)/3$ lies in $0<x<10$. The volume approaches zero at both domain endpoints and is positive inside, so this sole admissible critical point gives the global maximum.",
      diagnosticIntent:
        "Combines physical-domain modelling, exact quadratic solutions, rejection of an extraneous critical point, and global justification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "curve-sketching-exam-practice": [
    richAnswer({
      id: "y11adv-cs-ex-qm1",
      prompt:
        "Produce the complete feature list needed to sketch the cubic: intercepts with multiplicity, stationary points, inflection point, and end behaviour.",
      latex: "f(x)=x^3-3x^2-9x+27",
      answer:
        "roots -3 (cross) and 3 (touch); local max (-1,32), local min (3,0), inflection (1,16); left down, right up",
      acceptedAnswers: [
        "x-ints (-3,0) crossing and (3,0) touching; max (-1,32), min (3,0), IP (1,16)",
      ],
      hint: "Factor the cubic as $(x+3)(x-3)^2$, then use the first and second derivatives.",
      explanation:
        "$f=(x+3)(x-3)^2$, so the curve crosses at $-3$ and touches at $3$. Since $f'=3(x+1)(x-3)$, the stationary points are a local maximum $(-1,32)$ and local minimum $(3,0)$. Also $f''=6(x-1)$ gives inflection $(1,16)$. Its positive cubic leading term gives left-down, right-up end behaviour.",
      diagnosticIntent:
        "Checks an exam-ready systematic sketch plan with every feature labelled and mutually consistent.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-ex-qm2",
      prompt:
        "The derivative crosses zero from positive to negative at $x=-2$ and from negative to positive at $x=3$. Which statement is correct?",
      latex: "f'(-2)=f'(3)=0",
      answer: "B",
      choices: [
        "$f$ has minima at both x-values",
        "$f$ has a local maximum at $-2$ and a local minimum at $3$",
        "$f$ has a local minimum at $-2$ and a local maximum at $3$",
        "both x-values are necessarily inflection points",
      ],
      distractorMisconceptions: {
        A: "Ignores the direction of each derivative sign change.",
        C: "Reverses both sign-change classifications.",
        D: "Confuses zeros of f' with sign changes of f''.",
      },
      hint: "Translate positive-to-negative as rise-then-fall and negative-to-positive as fall-then-rise.",
      explanation:
        "A positive-to-negative derivative change means $f$ rises then falls, so $x=-2$ is a local maximum. A negative-to-positive change means $f$ falls then rises, so $x=3$ is a local minimum. Inflection information would require the slope of $f'$, not merely its axis crossings.",
      diagnosticIntent:
        "Checks concise classification from derivative-graph crossings under exam-style wording.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm3",
      prompt:
        "At $x=2$, a twice-differentiable function satisfies the conditions below. State the feature and the local behaviour of the function.",
      latex: "f(2)=-5,\\qquad f'(2)=0,\\qquad f''(2)=6",
      answer: "local minimum at (2,-5); decreasing before and increasing after locally",
      acceptedAnswers: ["(2,-5) local min", "minimum at x=2 with value -5"],
      hint: "Use the positive second derivative only after noting the zero first derivative and supplied function value.",
      explanation:
        "Because $f'(2)=0$, the point $(2,-5)$ is stationary. The positive value $f''(2)=6$ means the curve is concave up there, so the second derivative test confirms a local minimum. Locally, the function changes from decreasing to increasing as it passes through that minimum.",
      diagnosticIntent:
        "Checks coordinated interpretation of function value, first derivative, and second derivative at one point.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-cs-ex-qm4",
      prompt:
        "Which factorised equation matches the displayed sketch with a crossing at $-3$ and a touching minimum at $3$?",
      latex: "f(x)=?",
      answer: "A",
      choices: [
        "$(x+3)(x-3)^2$",
        "$(x+3)^2(x-3)$",
        "$-(x+3)(x-3)^2$",
        "$(x-3)^3$",
      ],
      distractorMisconceptions: {
        B: "Assigns the double factor to the crossing root.",
        C: "Matches roots but reverses the cubic end behaviour.",
        D: "Collapses two distinct intercepts into one triple root.",
      },
      hint: "Match each intercept to a factor and use the touch to identify the repeated factor.",
      explanation:
        "Crossing at $x=-3$ gives the simple factor $x+3$, while touching at $x=3$ gives the even factor $(x-3)^2$. The displayed curve has positive-cubic end behaviour, so no negative multiplier is needed. Therefore $(x+3)(x-3)^2$ is the unique matching option.",
      diagnosticIntent:
        "Tests rapid synthesis of intercept location, multiplicity, and end behaviour from a complete sketch.",
      taskType: "procedural",
      difficulty: 3,
      cartesianGraph: cubicGraph(
        { a: 1, b: -3, c: -9, d: 27 },
        {
          description:
            "Cubic crossing at -3, rising to a local maximum, and touching the axis at the local minimum x=3",
          label: "y=f(x)",
          points: [
            { x: -3, y: 0, label: "(-3,0)" },
            { x: -1, y: 32, label: "(-1,32)" },
            { x: 3, y: 0, label: "(3,0)" },
          ],
          xMin: -4,
          xMax: 4,
          yMin: -10,
          yMax: 36,
        },
      ),
    }),
    richChoice({
      id: "y11adv-cs-ex-qm5",
      prompt:
        "A candidate writes '$f''(a)=0$, therefore $(a,f(a))$ is an inflection point.' Which response earns the correction mark?",
      latex: "f''(a)=0",
      answer: "C",
      choices: [
        "the statement is always true for polynomials",
        "the statement is true whenever $f'(a)=0$ as well",
        "$f''(a)=0$ only identifies a candidate; $f''$ must change sign across $a$",
        "an inflection instead requires $f(a)=0$",
      ],
      distractorMisconceptions: {
        A: "Treats a candidate equation as a theorem for a broad function class.",
        B: "Adds stationarity but still omits the defining concavity change.",
        D: "Confuses an inflection with an x-intercept.",
      },
      hint: "State the definition in terms of concavity on the two sides of the point.",
      explanation:
        "The equation $f''(a)=0$ is commonly used to locate candidates, but it is not sufficient. For example, $f=x^4$ has $f''(0)=0$ and no concavity change. The required verification is that $f''$ has opposite signs on the two sides of $a$, so option C gives the exam-quality correction.",
      diagnosticIntent:
        "Assesses precise error diagnosis and the distinction between a candidate condition and a sufficient test.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm6",
      prompt:
        "A cubic has a local maximum at $(-2,7)$ and a local minimum at $(1,-2)$. Reconstruct the function.",
      latex: "f'(x)=k(x+2)(x-1)",
      answer: "f(x)=2x^3/3+x^2-4x+1/3",
      acceptedAnswers: ["f=(2/3)x^3+x^2-4x+1/3"],
      hint: "Use $f(1)-f(-2)=-9$ to determine $k$, then use one stationary coordinate for the constant.",
      explanation:
        "Integrating gives $f=k(x³/3+x²/2-2x)+C$. The bracket changes by $-9/2$ from $-2$ to $1$, while the function changes by $-9$, so $k=2$. Using $f(1)=-2$ then gives $C=1/3$. Hence $f=2x³/3+x²-4x+1/3$, whose derivative sign confirms the stated maximum and minimum.",
      diagnosticIntent:
        "Tests reverse reconstruction from two classified stationary coordinates using both change and initial-value reasoning.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm7",
      prompt:
        "Investigate the number of distinct real x-intercepts as $k$ varies, including both boundary cases.",
      latex: "f_k(x)=x^3-3x^2+k",
      answer:
        "0<k<4: three; k=0 or k=4: two distinct with one double; k<0 or k>4: one",
      acceptedAnswers: [
        "three roots for 0<k<4, two for k=0,4, one otherwise",
      ],
      hint: "The stationary points are fixed at $x=0$ and $x=2$; compare their heights $k$ and $k-4$ with zero.",
      explanation:
        "$f_k'=3x(x-2)$, so the local maximum is $(0,k)$ and local minimum is $(2,k-4)$. Three crossings occur exactly when the maximum is above and the minimum below the axis: $0<k<4$. At $k=0$ or $4$, one extremum lies on the axis and gives a double root. Otherwise both extrema lie on one side and only one real intercept remains.",
      diagnosticIntent:
        "Assesses an exam-style parameter investigation through fixed stationary points and vertical translation.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm8",
      prompt:
        "Reconstruct the quartic and classify all stationary points, including the point where the derivative has a repeated zero.",
      latex: "f'(x)=3(x+1)^2(x-2),\\qquad f(0)=4",
      answer:
        "f=3x^4/4-9x^2/2-6x+4; horizontal inflection (-1,25/4), global minimum (2,-14)",
      acceptedAnswers: [
        "f=0.75x^4-4.5x^2-6x+4; stationary IP (-1,6.25), min (2,-14)",
      ],
      hint: "Expand and integrate the derivative, then use its double and simple roots to build a sign chart.",
      explanation:
        "The derivative expands to $3x^3-9x-6$, so $f=3x^4/4-9x^2/2-6x+4$. The squared factor at $x=-1$ leaves $f'$ negative on both sides, giving the horizontal inflection $(-1,25/4)$. At $x=2$, $f'$ changes negative-to-positive, giving the local minimum $(2,-14)$; positive quartic end behaviour makes it global.",
      diagnosticIntent:
        "Synthesises reverse integration, repeated derivative roots, exact coordinates, classification, and global end behaviour.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm9",
      prompt:
        "On the closed interval, find the global extrema and all inflection points, explaining which stationary point is not an extremum.",
      latex: "f(x)=x^4-4x^3,\\qquad -1\\le x\\le4",
      answer:
        "global max 5 at x=-1; global min -27 at x=3; inflections (0,0) and (2,-16); x=0 is a horizontal inflection",
      acceptedAnswers: [
        "max f(-1)=5, min f(3)=-27, IPs (0,0),(2,-16), stationary IP at 0",
      ],
      hint: "Compare both endpoints with all derivative zeros, then analyse the sign of $f''=12x(x-2)$.",
      explanation:
        "$f'=4x^2(x-3)$ gives stationary x-values $0$ and $3$. Function values at the candidates and endpoints are $f(-1)=5$, $f(0)=0$, $f(3)=-27$, and $f(4)=0$, so the global maximum is $5$ at $-1$ and minimum $-27$ at $3$. Since $f''=12x(x-2)$ changes sign at $0$ and $2$, the inflections are $(0,0)$ and $(2,-16)$; $x=0$ is stationary but not an extremum.",
      diagnosticIntent:
        "Combines closed-interval comparison, repeated derivative roots, global extrema, and nonstationary versus stationary inflections.",
      taskType: "analytical",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-cs-ex-qm10",
      prompt:
        "Construct the monic cubic with local maximum $(-1,2)$, local minimum $(1,-2)$, and inflection at the origin. Then find all global extrema on $[-2,2]$, including ties.",
      latex: "-2\\le x\\le2",
      answer:
        "f(x)=x^3-3x; global maximum 2 at x=-1 and x=2; global minimum -2 at x=-2 and x=1",
      acceptedAnswers: [
        "f=x^3-3x; max 2 at {-1,2}, min -2 at {-2,1}",
      ],
      hint: "The monic cubic derivative has roots $-1$ and $1$; use the inflection coordinate for the constant, then compare four candidates.",
      explanation:
        "The derivative must be $3(x+1)(x-1)=3x^2-3$, so $f=x^3-3x+C$. The inflection at $(0,0)$ gives $C=0$, and the stated local extrema follow. On $[-2,2]$, the values are $f(-2)=-2$, $f(-1)=2$, $f(1)=-2$, and $f(2)=2$. Thus both global extrema are tied at two x-values.",
      diagnosticIntent:
        "Requires reconstruction plus a complete closed-interval comparison that does not discard tied endpoint extrema.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
