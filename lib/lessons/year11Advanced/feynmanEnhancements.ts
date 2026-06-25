import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";

const FEYNMAN_PARAGRAPHS: Record<string, string[]> = {
  "function-notation-domain-range": [
    "The reason function notation is powerful is that it separates the rule from the input. The symbol f is the machine, and x is a placeholder. When the input changes, every copy of x in the rule must change together, which is why brackets around negative inputs are not optional.",
    "Domain restrictions come from asking which inputs make the machine break. Division by zero breaks a fraction, and the square root of a negative number breaks a real-valued square-root function. Range is different: it asks what outputs the unbroken machine can actually produce.",
  ],
  "linear-quadratic-cubic-functions": [
    "The shape of a polynomial is controlled by the highest power because that term grows fastest for large positive or negative x. A linear function changes at a constant rate, a quadratic bends with one turning point, and a cubic can pass from one end of the plane to the other with an S-like bend.",
    "Do not memorise these as disconnected graph pictures. The algebra explains the graph: the degree controls broad shape, the leading coefficient controls end direction, and substituting x = 0 gives the y-intercept that anchors the sketch.",
  ],
  "polynomial-reciprocal-functions": [
    "A reciprocal graph is built from the idea that multiplying by a very small denominator makes a very large output. That is why a vertical asymptote appears where the denominator approaches zero, and why the curve gets close to but does not cross its horizontal asymptote.",
    "Polynomial graphs and reciprocal graphs behave differently at forbidden inputs. Polynomials accept every real input, but reciprocal functions exclude denominator-zero inputs. In unfamiliar questions, first ask whether any input is illegal before thinking about intercepts or shape.",
  ],
  "absolute-value-functions": [
    "Absolute value is distance from zero, so it cannot be negative. The graph bends at the input where the inside expression changes sign because the rule switches from leaving a positive value alone to flipping a negative value upward.",
    "This is why equations involving absolute value often split into two cases. The expression inside the bars may equal the positive target or the negative target, because both have the same distance from zero. Forgetting the second case loses half the graph.",
  ],
  "odd-even-functions": [
    "The tests f(-x)=f(x) and f(-x)=-f(x) are symmetry tests, not random algebra rules. Replacing x with -x reflects the graph across the y-axis; comparing the new output with the original tells you whether that reflection leaves the graph unchanged.",
    "Odd symmetry is a different movement: reflecting across the y-axis and then across the x-axis is the same as rotating 180 degrees about the origin. That is why the output changes sign as well as the input.",
  ],
  "working-with-functions-exam-practice": [
    "Mixed function questions are difficult because the question may hide the skill label. Start by classifying the object: is it asking for a value, a domain restriction, a graph feature, an intercept, or a transformed rule?",
    "The transfer move is to let the algebra tell you the graph feature. Denominators reveal forbidden inputs, square roots reveal domain endpoints, leading powers reveal broad shape, and substitution reveals particular values. This prevents guessing from a memorised sketch.",
  ],
  "function-translations-general": [
    "A translation moves every point of a graph by the same amount. Vertical moves are direct because adding k changes every output by k. Horizontal moves feel backwards because changing x inside f changes which old input is being reused.",
    "For y=f(x-h), the new graph reaches an old output h units later, so the graph shifts right. That is the reason the sign inside the bracket appears reversed; it is not a convention to memorise blindly.",
  ],
  "function-dilations-reflections": [
    "A dilation changes distance from an axis. Multiplying the whole function by a stretches outputs away from the x-axis; multiplying x inside the function changes how quickly the old graph is reached along the x-axis.",
    "Reflections are sign changes with a geometric meaning. A negative outside the function flips y-values across the x-axis; a negative inside flips inputs across the y-axis. Naming the axis first prevents the common inside/outside mix-up.",
  ],
  "graph-transformations-exam-practice": [
    "In exam-style transformation questions, do not transform isolated points before identifying the order of operations. Read the equation as instructions applied to the base graph: inside changes act on inputs, outside changes act on outputs.",
    "A reliable check is to track one anchor point such as the vertex, intercept, or centre. If the transformed equation predicts where that anchor moves, the full graph usually follows. If the anchor disagrees, the sign or scale has been reversed.",
  ],
  "radians-exact-trigonometric-values": [
    "Radians measure angle by comparing arc length with radius. One radian is the angle made when the arc length equals the radius, so a full circle has angle circumference divided by radius: 2pi r / r = 2pi.",
    "Exact trig values come from geometry, not calculators. The 30-60-90 and 45-45-90 triangles give side ratios, and the unit circle transfers those ratios to all quadrants by attaching the correct signs.",
  ],
  "unit-circle-trigonometric-graphs": [
    "The unit circle turns trigonometry into coordinates. At angle theta, cosine is the x-coordinate and sine is the y-coordinate, so the sine and cosine graphs are just coordinate shadows of a point moving around a circle.",
    "This explains periodicity. After one full turn the point returns to the same coordinate pair, so sine and cosine repeat after 2pi. Tangent repeats after pi because both sine and cosine change sign, leaving their ratio unchanged.",
  ],
  "degrees-and-radians-concept": [
    "Degrees and radians measure the same turn with different rulers. Degrees split a full turn into 360 parts; radians use the circle itself by asking how many radii fit along the arc.",
    "The bridge is one full turn: 360 degrees equals 2pi radians. Every conversion comes from multiplying by a form of 1, either pi/180 or 180/pi, so the size of the angle is unchanged.",
  ],
  "converting-degrees-radians": [
    "Converting degrees to radians is not a new trig skill; it is unit conversion. Since 180 degrees equals pi radians, multiplying by pi/180 replaces each degree with its radian equivalent.",
    "Simplify the fraction before doing any decimal work. Exact radian answers such as 5pi/6 preserve the geometry of the angle, which is why HSC questions usually prefer them to rounded decimals.",
    "A quick sense-check is to compare with benchmark turns. An angle less than 180 degrees should convert to less than pi radians, and an angle greater than 180 degrees should convert to more than pi radians.",
  ],
  "converting-radians-degrees": [
    "Converting radians to degrees uses the same equality in the opposite direction: pi radians equals 180 degrees. Multiplying by 180/pi cancels the pi unit and leaves a degree measure.",
    "The cancellation is the meaning, not a trick. If the radian measure is 3pi/4, the pi cancels and the question becomes three quarters of 180 degrees, which is 135 degrees.",
    "Use the size of the turn as a check. A radian angle of pi/6 is one sixth of a half-turn, so it should be 30 degrees; an answer like 60 degrees would be twice as large as the original turn.",
  ],
  "arc-length-radian-measure": [
    "The formula s=r theta works because radians are defined as arc length divided by radius. Rearranging theta=s/r gives s=r theta, so the formula is really the definition written in the direction we need.",
    "This is why theta must be in radians. If theta is in degrees, it is not measuring arc-length-per-radius yet. Convert first, then multiply by r, otherwise the units are mixed and the answer has no geometric meaning.",
  ],
  "sector-area-radian-measure": [
    "Sector area comes from taking the same fraction of a circle. A full circle has angle 2pi and area pi r^2, so a sector with angle theta has fraction theta/(2pi) of the full area.",
    "Multiplying pi r^2 by theta/(2pi) gives one half r^2 theta. This derivation also explains why radians are required: theta must be a fraction of a full 2pi turn.",
    "The formula should feel smaller than the full circle area when theta is less than 2pi. If a sector angle is pi/3, it is one sixth of a full turn, so its area must be one sixth of the whole circle.",
  ],
  "exact-trig-values-special-triangles": [
    "The special triangles are not tables to memorise first. A 45-45-90 triangle comes from cutting a square in half, so its legs are equal and the hypotenuse is sqrt(2) times a leg.",
    "A 30-60-90 triangle comes from cutting an equilateral triangle in half. The short side is half the hypotenuse and the remaining side is sqrt(3) times the short side, which produces the exact sine, cosine, and tangent values.",
  ],
  "unit-circle-all-quadrants": [
    "Reference angles carry the size of the triangle; quadrants carry the sign. The triangle lengths stay positive, but the unit-circle coordinates may be positive or negative depending on whether the point sits left/right or above/below the axes.",
    "This is why ASTC is a shortcut for coordinate signs, not a separate rule. Cosine follows x, sine follows y, and tangent follows y/x. If you know the quadrant, the sign is forced.",
  ],
  "trig-graph-amplitude-period": [
    "Amplitude measures vertical distance from the midline to a crest, so it depends on the multiplier outside sine or cosine. A negative multiplier reflects the graph, but distance is positive, so amplitude is the absolute value.",
    "Period measures how much x is needed for one full repeat. In y=sin(bx), the inside angle bx must increase by 2pi, so x only needs to increase by 2pi/b. Larger b compresses the graph.",
  ],
  "right-angle-trig-applications": [
    "Right-angle trigonometry is ratio reasoning in a triangle. Sine, cosine, and tangent compare pairs of sides relative to the chosen angle, so labelling opposite, adjacent, and hypotenuse is the real setup step.",
    "Application questions often hide the triangle inside words. Draw or imagine the right triangle first, then choose the ratio that contains the known side and the required side. Choosing the ratio before labelling is the common source of wrong equations.",
  ],
  "trigonometric-equations": [
    "A trigonometric equation has two layers: first isolate the trig function, then find every angle in the required interval with that trig value. Solving only the algebraic layer gives a ratio, not the final angles.",
    "The unit circle explains why there are often two solutions. A horizontal line can meet the sine coordinate in two quadrants, and a vertical line can meet the cosine coordinate in two quadrants. The stated domain decides which intersections count.",
  ],
  "trigonometric-identities": [
    "An identity is true for all allowed values, so proving or simplifying an identity is about rewriting, not solving. The goal is to show two expressions are the same object wearing different algebraic clothing.",
    "The Pythagorean identity comes directly from the unit circle: x^2+y^2=1 becomes cos^2 x+sin^2 x=1. The quotient identity comes from opposite/adjacent divided by hypotenuse ratios, giving tan x=sin x/cos x.",
  ],
  "related-angle-identities": [
    "Related-angle identities are symmetry statements on the unit circle. Reflecting a point across an axis keeps one coordinate the same and changes the sign of the other, which determines the sine and cosine identities.",
    "Do not treat pi-theta, pi+theta, and 2pi-theta as formulas to recite. Ask where the terminal point lands, identify the reference angle, then attach signs from the coordinate quadrant.",
  ],
  "trig-equations-basic": [
    "Basic trig equations are unit-circle coordinate questions. Solving sin x = 1/2 means finding the angles whose y-coordinate is 1/2, not just pressing inverse sine once.",
    "Inverse trig gives a reference or principal angle, but the interval supplies the full answer set. After finding the reference angle, use quadrant signs to list every valid solution in the given domain.",
  ],
  "trig-equations-advanced": [
    "Advanced trig equations usually need an algebraic move before the unit-circle move. Factorising, expanding, or using an identity can split a complicated equation into simpler branches such as sin x=0 or cos x=1/2.",
    "The danger is losing branches. When a product equals zero, each factor may be zero. When you divide by a trig expression, you may accidentally discard solutions where that expression is zero, so factor instead whenever possible.",
  ],
  "trig-identities-proof-strategies": [
    "A trig proof is a controlled rewrite from one side to the other. Start with the more complicated side because it has more structure to transform, and aim for sine and cosine when the path is unclear.",
    "Every step must be reversible or justified by an identity. This is what separates proof from pattern matching: you are not checking a few values, you are showing the expressions are identical for all allowed inputs.",
  ],
  "trigonometric-identities-equations-exam-practice": [
    "Mixed trig exam questions test method selection. First decide whether the task is solving an equation, simplifying with an identity, or proving equivalence. Each has a different endpoint: angles, a simpler expression, or a chain of equal expressions.",
    "When the question combines identities and equations, simplify before solving. A cleaner expression exposes the unit-circle value, reduces sign errors, and makes it easier to see all solutions in the interval.",
  ],
  "solving-exponential-logarithmic-equations": [
    "Exponential and logarithmic equations are inverse-operation problems. A logarithm answers the question 'what power produced this number?', so taking logs is the way to bring an unknown exponent down into ordinary algebra.",
    "The base and domain matter. Exponential outputs are positive, so logarithms only accept positive arguments. Before accepting a solution, check that every logarithm in the original equation is defined.",
  ],
  "exponential-logarithmic-functions-exam-practice": [
    "Mixed exponential and logarithmic questions reward recognising the structure before choosing a technique. If the unknown is in the exponent, use a common base or logarithms; if the unknown is inside a log, rewrite in exponential form or combine logs first.",
    "The graph gives a reasonableness check. Exponential functions stay positive and logs require positive inputs, so any answer that violates these basic behaviours is not just unlikely; it is outside the function's definition.",
  ],
  "product-rule": [
    "The product rule exists because both factors can change at the same time. When x increases a little, the first factor changes while the second is roughly fixed, and the second factor changes while the first is roughly fixed.",
    "Adding those two contributions gives (uv)'=u'v+uv'. The common mistake is multiplying the derivatives u'v', which ignores the two separate ways the product can change.",
  ],
  "quotient-rule": [
    "A quotient is a product with a reciprocal denominator, so the quotient rule is really the product and chain rules working together. The denominator changes the output in the opposite direction, which is why the numerator contains a subtraction.",
    "The squared denominator appears because differentiating the reciprocal of v produces a denominator of v squared. Remembering this derivation is safer than memorising a chant, especially when the numerator and denominator are themselves multi-term functions.",
  ],
  "tangents-normals-applications": [
    "A derivative gives the gradient of the tangent because it measures the limiting gradient of secant lines near the point. Once the tangent gradient is known, the tangent line is just a straight-line equation through the point of contact.",
    "A normal is perpendicular to the tangent, so its gradient is the negative reciprocal. This is a geometry fact about perpendicular lines, not a calculus rule; the calculus only supplies the tangent gradient.",
  ],
  "curve-sketching-calculus": [
    "Calculus curve sketching turns algebra into shape. First derivatives show where the graph rises, falls, and has stationary points; second derivatives show how the gradient itself changes, giving concavity.",
    "The purpose is not to plot many points. It is to identify structural features: intercepts, stationary points, increasing/decreasing intervals, concavity, and end behaviour. Those features make an unfamiliar graph predictable.",
  ],
  "discrete-random-variables": [
    "A discrete random variable turns outcomes into numbers so probability can be handled algebraically. Instead of listing every story outcome, we list each possible value of X and attach its probability.",
    "The probabilities must sum to 1 because one of the listed values must occur. If the total is less or more than 1, the distribution is missing an outcome or double-counting an outcome.",
  ],
  "expected-value-standard-deviation": [
    "Expected value is a long-run balance point, not a promise for a single trial. Multiplying each value by its probability weights common outcomes more heavily than rare outcomes.",
    "Standard deviation measures typical spread around that balance point. Squaring the deviations prevents positive and negative differences from cancelling, and the final square root returns the measure to the original units.",
  ],
  "probability-data-exam-practice": [
    "Mixed probability and data questions often test whether you know what the denominator should be. Conditional probability changes the sample space, while ordinary probability uses the whole relevant population.",
    "For data displays, the calculation is only half the work. Decide whether the question asks for centre, spread, comparison, probability, or expected value, then choose the statistic that answers that exact question.",
  ],

  // ── Sequences and Series ──────────────────────────────────────────────────
  "arithmetic-sequences": [
    "An arithmetic sequence is a model of constant change. The common difference d is the rate, and the general term formula Tₙ = a + (n-1)d is a linear function of n dressed in sequence notation.",
    "When two terms are given, treat a and d as two unknowns in two equations. Subtracting one equation from the other eliminates a and gives d directly.",
  ],
  "geometric-sequences": [
    "A geometric sequence models repeated multiplication — compound growth, not additive growth. The ratio r is the growth factor, and Tₙ = arⁿ⁻¹ is an exponential function of n.",
    "If |r| < 1, the terms shrink toward zero. If r is negative, the terms alternate in sign. Both behaviours are explained by what happens when you raise a fraction or a negative number to increasing powers.",
  ],
  "arithmetic-series-sigma-notation": [
    "The formula Sₙ = n/2 (a + l) comes from pairing first and last terms. Gauss's trick: if you write the series forwards and backwards and add them, every pair sums to the same value a + l, and there are n pairs — giving 2Sₙ = n(a+l).",
    "Sigma notation is a compact way to say 'sum these terms'. The bottom number gives the starting index and the top gives the ending index. Evaluating a sigma is just substituting each index value and adding the results.",
  ],
  "geometric-series-limiting-sums": [
    "The partial sum formula Sₙ = a(1-rⁿ)/(1-r) is derived by multiplying Sₙ by r and subtracting. Most terms cancel in the resulting rSₙ − Sₙ, leaving just the first and last.",
    "A limiting sum exists only when |r| < 1, because rⁿ → 0 as n → ∞. Sending rⁿ → 0 in the partial sum formula gives S∞ = a/(1-r). This is the geometric meaning of a convergent series.",
  ],
  "sequences-series-exam-practice": [
    "Exam questions mix sequences and series, and the deciding step is recognising which type of sequence you have. Constant difference means arithmetic; constant ratio means geometric; neither means neither formula applies directly.",
    "When the question gives two pieces of information, write two equations, then solve the system. For arithmetic, subtract to find d; for geometric, divide to find r. This systematic approach avoids guessing.",
  ],

  // ── Integration ───────────────────────────────────────────────────────────
  "primitives-and-antidifferentiation": [
    "Antidifferentiation and differentiation are inverse processes, just like multiplication and division. If the derivative of F(x) is f(x), then the antiderivative of f(x) is F(x) plus any constant.",
    "The family of curves F(x) + C all have the same derivative. They are parallel curves, vertically shifted versions of each other. Without an initial condition they are indistinguishable from each other by their slopes alone.",
  ],
  "standard-antiderivatives": [
    "The standard antiderivative table is built entirely from derivative facts run backwards. If you know that the derivative of sin x is cos x, then the antiderivative of cos x is sin x. The table has no new information — it is the same chain read from right to left.",
    "The most surprising entry is ∫(1/x) dx = ln|x| + C. The reverse power rule gives x⁰/0 which is undefined, so 1/x is the one power function that needs a completely different antiderivative — one that comes from the logarithm.",
  ],
  "initial-value-problems": [
    "An initial condition resolves the ambiguity of +C. The full family of antiderivatives F(x) + C is a sheaf of parallel curves; specifying one point selects exactly one member of that sheaf.",
    "Initial-value problems appear constantly in physics and modelling: if you know the rate of change and one reference measurement, you can reconstruct the full function. The derivative is the description; the integral is the reconstruction.",
  ],
  "definite-integrals": [
    "A definite integral has no +C because the constants cancel in F(b) − F(a). The result is a single number, not a family of functions, because the ambiguity was resolved by the subtraction.",
    "The sign of the definite integral depends on whether the signed area is above or below the x-axis. This is not an error — it is the geometric content of the integral. Area and signed area are different ideas.",
  ],
  "fundamental-theorem-of-calculus": [
    "The FTC is the deepest result in elementary calculus: it shows that the accumulated sum of infinitely many infinitely thin strips equals the net change in the antiderivative. A continuous sum of rates equals a net change — this is the unifying idea behind all of integration.",
    "The version d/dx ∫₀ˣ f(t) dt = f(x) says that if you accumulate an area up to a moving boundary and then ask how fast the area is growing, the answer is the height of the curve at that boundary. Rate equals height.",
  ],
  "areas-under-curves": [
    "The connection between areas and antiderivatives is not obvious until the FTC makes it so. Summing thin rectangles under a curve converges to the antiderivative evaluated at the endpoints — this is the theorem that turned area from geometry into algebra.",
    "Signed area and geometric area are genuinely different. A curve below the axis contributes negative signed area; to find the physical region's size you must take absolute values. HSC exams often test whether students recognise this distinction.",
  ],
  "reverse-chain-rule-integration": [
    "The reverse chain rule is the chain rule read backwards. When you differentiate f(ax+b), the result has an extra factor of a from the inner derivative. To undo this, the integral must divide by a.",
    "This is why the technique only works cleanly for linear inner functions. If the inner function were quadratic, the extra factor after differentiation would be 2x — and the integral would require you to supply that 2x from nowhere. Linear inner functions produce constant factors, which can be divided away.",
  ],
  "trapezoidal-rule": [
    "The trapezoidal rule replaces the curve with straight-line chords, then sums the areas of the resulting trapezoids. The interior function values get doubled because each interior strip-height is a shared edge between two adjacent trapezoids.",
    "The accuracy of the rule is geometric: a nearly-straight arc is well approximated by a chord, so the trapezoidal rule is very accurate for gradual curves and less accurate for rapidly-changing ones. Concavity determines whether you are over- or underestimating, not the direction of the function.",
    "The tools built in this unit — antidifferentiation, definite integrals, the FTC, and area — are the engine for almost every applied calculus topic ahead: velocity-to-displacement in motion problems, loan repayment accumulation in finance, and probability density functions in statistics.",
  ],
  "stationary-points": [
    "A stationary point is where the gradient machine outputs zero — the tangent is horizontal. The function is neither rising nor falling at that instant, like a ball at the top of its arc or the bottom of a valley.",
    "The sign chart is the key reasoning tool. Positive gradient means the function is climbing; negative means it is falling. The stationary point is where it transitions, and the sign chart tells you which transition it is.",
  ],
  "classifying-stationary-points": [
    "The second derivative test asks: at the stationary point, is the gradient itself increasing or decreasing? If the gradient goes from negative to positive (increasing through zero), the function has a local minimum — the shape of a bowl. If the gradient goes from positive to negative (decreasing through zero), the function has a local maximum — the shape of an upside-down bowl.",
    "A horizontal inflection is the exception: the gradient touches zero but then continues in the same direction. The function pauses momentarily but does not change from rising to falling or vice versa. y = x³ at the origin is the prototype.",
  ],
  "concavity-inflection": [
    "Concavity is the shape of the bend, not the direction. A concave-up curve opens like a cup — the gradient is increasing even if the function itself is decreasing. A concave-down curve opens like a dome — the gradient is decreasing even if the function is increasing.",
    "An inflection point is where the bending reverses. The second derivative changes sign there, which means the rate of change of the gradient switches from positive to negative (or vice versa). On a cubic, this happens exactly once — at the middle of the S-shape.",
  ],
  "systematic-curve-sketching": [
    "Systematic curve sketching is a translation process: algebraic information in, geometric picture out. The hierarchy — domain, intercepts, end behaviour, stationary points, concavity, sketch — is ordered so each step constrains the sketch further, leaving less and less ambiguity by the time you draw.",
    "A double root at x = a is where the curve kisses the x-axis and turns back. The factor (x−a)² means the curve touches (tangent contact) rather than crosses. This always coincides with a local minimum or maximum because the derivative is also zero there.",
  ],
  "reading-derivative-graphs": [
    "Reading the derivative graph is like reading a weather map for the function: the altitude of f′ tells you the slope of f, and the slope of f′ tells you the concavity of f. Every feature of f is encoded one layer deeper.",
    "The most common error is confusing the zeros of f′ with the turning points of f′. Zeros of f′ are the stationary points of f. Turning points of f′ — where f′ itself has a local max or min — are the inflection points of f. These are completely different features at different x-values.",
  ],
  "optimisation": [
    "Optimisation is applied curve sketching with a real-world constraint. The constraint reduces the problem to one variable, then you find the stationary point of the resulting function. The only new skill is the justification step: proving the stationary point is the type of extremum the context requires.",
    "On a closed interval, the largest or smallest value might be at an endpoint, not at an interior stationary point. The calculus finds interior candidates; you then compare with both endpoints to determine the global extremum.",
  ],
  "curve-sketching-exam-practice": [
    "Curve sketching problems are graded in both directions: forward (given function, produce sketch) and reverse (given sketch features, state derivative properties). Mastering the reverse direction — knowing that a local max forces f′=0 and f″<0 — separates students who memorise procedures from those who understand the structure.",
    "The calculus chain closes here: differentiation extracts slope information, curve sketching uses that slope to reconstruct shape, and integration (the next unit) works backwards from rate of change to accumulated quantity. This unit sits at the hinge of the chain.",
  ],
};

const FEYNMAN_WORKED_EXAMPLES: Record<string, WorkedExample[]> = {
  "graph-transformations-exam-practice": [
    {
      title: "Track an anchor point through combined transformations",
      questionLatex:
        "\\text{The vertex of }y=f(x)\\text{ is }(2,-1).\\text{ Find the vertex of }y=-2f(x-3)+4.",
      steps: [
        {
          explanation:
            "The inside change x - 3 means the old input is reached 3 units later, so the x-coordinate moves right.",
          latex: "x: 2 \\rightarrow 2+3=5",
        },
        {
          explanation:
            "The outside multiplier -2 reflects and vertically stretches the old output.",
          latex: "y: -1 \\rightarrow -2(-1)=2",
        },
        {
          explanation:
            "The outside +4 then lifts every output by 4.",
          latex: "2+4=6",
        },
      ],
      finalAnswerLatex: "\\text{New vertex }(5,6)",
    },
  ],
  "right-angle-trig-applications": [
    {
      title: "Choose a ratio from the triangle, not from memory",
      questionLatex:
        "\\text{An angle of elevation is }35^\\circ\\text{ and the horizontal distance is }40\\text{ m. Find the height to 1 d.p.}",
      steps: [
        {
          explanation:
            "Relative to the angle, the height is opposite and the ground distance is adjacent.",
          latex: "\\tan 35^\\circ=\\frac{h}{40}",
        },
        {
          explanation:
            "Multiply by 40 because h is divided by 40 in the ratio.",
          latex: "h=40\\tan 35^\\circ",
        },
        {
          explanation:
            "Evaluate and round only at the end so the final height is not affected by early rounding.",
          latex: "h\\approx 28.0",
        },
      ],
      finalAnswerLatex: "28.0\\text{ m}",
    },
  ],
};

export function enrichYear11AdvancedFeynmanDepth(
  lesson: ExplicitLesson
): ExplicitLesson {
  const additions = FEYNMAN_PARAGRAPHS[lesson.slug];
  const workedExamples = FEYNMAN_WORKED_EXAMPLES[lesson.slug];
  if (!additions && !workedExamples) return lesson;

  return {
    ...lesson,
    teaching: {
      ...lesson.teaching,
      paragraphs: [...lesson.teaching.paragraphs, ...(additions ?? [])],
    },
    workedExamples: [
      ...lesson.workedExamples,
      ...(workedExamples ?? []),
    ],
  };
}
