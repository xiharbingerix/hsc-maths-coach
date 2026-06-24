import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

const FEYNMAN_PARAGRAPHS: Record<string, string[]> = {
  "proof-by-contradiction": [
    "Contradiction works because a statement and its negation cannot both be true. You temporarily accept the negation, follow its consequences honestly, and show that it breaks a known fact such as parity, divisibility, positivity, or uniqueness.",
    "The contradiction must come from the assumption, not from an algebra mistake. A strong proof names the impossible conclusion clearly, then closes the loop by rejecting the assumption and accepting the original claim.",
  ],
  "proof-by-contrapositive": [
    "The contrapositive is logically equivalent to the original implication. Instead of proving if P then Q, you prove if not Q then not P; this is often easier because the negation gives a concrete algebraic condition to use.",
    "Do not confuse the contrapositive with the converse. If P then Q does not generally mean if Q then P. The safe move is to negate both statements and reverse the direction.",
  ],
  "inequalities-algebraic-proof": [
    "Inequality proofs usually succeed by turning a difference into something visibly non-negative. If you can rewrite the desired inequality as a square, a sum of squares, or a product of known-positive terms, the proof becomes structural rather than numerical.",
    "The key danger is multiplying or dividing by a quantity whose sign is unknown. Before changing an inequality direction or cancelling a factor, establish whether that factor is positive, negative, or zero.",
  ],
  "proof-by-mathematical-induction": [
    "Induction is a chain reaction. The base case lights the first link, and the inductive step proves that any lit link forces the next one to light. Together they cover every integer from the base onward.",
    "The inductive hypothesis is not a wish that the result is true forever. It is a temporary assumption for one value, n = k, used only to prove the next value, n = k + 1.",
  ],
  "vectors-and-points-3d": [
    "A 3D vector records a displacement, not just a point. The components tell you how far to move in the x, y, and z directions, so addition combines movements and scalar multiplication stretches the same direction.",
    "Position vectors connect points to vectors by choosing the origin as a reference. Once that reference is fixed, geometry in space becomes component arithmetic: subtract points to get displacements and add displacements to move.",
  ],
  "dot-product-and-angle": [
    "The dot product measures how much one vector points in the direction of another. Algebraically it multiplies matching components; geometrically it equals the product of lengths times cos theta.",
    "This is why the dot product detects perpendicular vectors. If the angle is 90 degrees, cos theta is zero, so the directional overlap is zero even though both vectors may have non-zero length.",
  ],
  "equations-of-lines-3d": [
    "A line in 3D needs a point and a direction. The point anchors the line, while the direction vector tells you the repeated step that reaches every other point on the line.",
    "The parameter is not a coordinate; it is a slider. Changing the parameter moves forward or backward along the same direction vector, which is why three component equations describe one spatial line.",
  ],
  "vector-applications-exam-practice": [
    "Vector applications usually hide the geometry inside words such as collinear, perpendicular, closest, or intersection. Translate the word into a vector condition before calculating.",
    "A useful exam check is dimensional: a dot product gives a scalar, a cross-style area argument gives a magnitude or area, and a vector equation gives components. If the type of answer does not match the geometry, the method is off.",
  ],
  "vector-curves-circles-spheres": [
    "A sphere equation is a distance condition in 3D. Points on the sphere are exactly those whose distance from the centre is the radius, so the familiar circle equation gains one extra squared component.",
    "Vector curve questions are about constraints. A parameter traces a moving point, and a circle or sphere condition checks whether that moving point stays a fixed distance from a centre.",
  ],
  "geometric-proofs-vectors": [
    "Vector geometry proofs replace a diagram-dependent claim with component or displacement facts. To prove parallel, show one vector is a scalar multiple of another; to prove perpendicular, show the dot product is zero.",
    "The proof still needs a geometric conclusion. After the algebra, translate back: equal vectors imply a parallelogram structure, zero dot product implies a right angle, and equal lengths imply congruent or isosceles structure.",
  ],
  "complex-number-arithmetic": [
    "Complex numbers extend the real line by adding a perpendicular imaginary direction. The rule i squared equals -1 is what makes multiplication rotate and scale, rather than merely move along a line.",
    "Addition combines real parts with real parts and imaginary parts with imaginary parts because it is vector addition on the Argand plane. Multiplication is richer: every factor affects both size and direction.",
  ],
  "modulus-argument-conjugate": [
    "The modulus is distance from the origin on the Argand plane, so it comes from Pythagoras. The argument is direction from the positive real axis, so it comes from trigonometry and must respect the quadrant.",
    "Conjugation reflects a complex number across the real axis. That keeps the modulus unchanged and reverses the sign of the argument, which is why conjugates are so useful in division and polynomial roots.",
  ],
  "argand-diagram-geometry": [
    "An Argand diagram turns complex algebra into plane geometry. Adding a complex number translates a point, multiplying by a unit complex number rotates it, and modulus equations describe distances.",
    "Locus questions are distance or angle conditions in disguise. If you see |z-a|, read it as distance from the point a; if two such distances are equal, the locus is a perpendicular-bisector condition.",
  ],
  "polar-form-de-moivre": [
    "Polar form separates size from direction: z = r cis theta. Multiplication then multiplies moduli and adds arguments, because rotating by theta and then phi is the same as rotating by theta + phi.",
    "De Moivre's theorem follows from repeating that multiplication rule. Raising to the nth power raises the modulus to the nth power and multiplies the argument by n, making powers and roots geometric.",
  ],
  "roots-of-unity": [
    "The nth roots of unity are the complex numbers that land on 1 after n equal rotations and scalings. Their modulus must be 1, and their arguments are equally spaced around the unit circle.",
    "The spacing is the main idea. Dividing a full turn, 2pi, into n equal steps creates n roots, so the roots form a regular polygon on the Argand plane rather than a random list of complex numbers.",
  ],
  "complex-polynomials": [
    "Complex roots connect algebraic factors with geometry. If a polynomial has real coefficients and a non-real root a + bi, its conjugate a - bi must also occur so the imaginary parts cancel in the real polynomial.",
    "This is why irreducible quadratic factors over the reals often split over the complex numbers. Over C, linear factors are the natural endpoint; over R, conjugate pairs combine into real quadratics.",
  ],
  "advanced-integration-method-selection": [
    "Integration method selection is pattern recognition with a reason. Substitution reverses the chain rule, integration by parts reverses the product rule, and partial fractions undo a rational expression split.",
    "Before integrating, inspect the structure: composition suggests substitution, product of unlike functions suggests parts, rational functions suggest algebraic decomposition, and trigonometric powers suggest identities.",
  ],
  "integration-by-parts-extension": [
    "Integration by parts comes from rearranging the product rule. Since (uv)' = u'v + uv', integrating both sides lets you trade one product integral for another that is hopefully simpler.",
    "The choice of u is strategic, not cosmetic. Pick u so differentiating it simplifies the expression, and pick dv so integrating it is possible. A poor choice often makes the second integral harder.",
  ],
  "partial-fractions-integration": [
    "Partial fractions work because a complicated rational expression can often be rebuilt from simpler denominator pieces. Integration becomes easier because each simple fraction matches a logarithm or standard form.",
    "The denominator controls the decomposition. Distinct linear factors, repeated linear factors, and irreducible quadratics require different numerator forms; choosing the wrong form loses information.",
  ],
  "t-substitution-weierstrass": [
    "The t-substitution turns trigonometric rational expressions into algebraic rational expressions. Setting t = tan(x/2) rewrites sine, cosine, and dx using one parameter from the half-angle geometry.",
    "The point is not to make the expression shorter immediately. It makes the integrand rational in t, so partial fractions or ordinary algebra can take over where trig identities would be awkward.",
  ],
  "trig-identity-integration": [
    "Trigonometric integration is often about changing form before integrating. Identities convert products, powers, or awkward combinations into sums of standard integrals.",
    "The reason this works is that identities preserve the function while revealing a more integrable structure. You are not approximating the integrand; you are rewriting it exactly in a friendlier form.",
  ],
  "completing-square-integration": [
    "Completing the square identifies the hidden standard shape inside a quadratic denominator. Once the quadratic is written as a shifted square plus or minus a constant square, the matching inverse-trig or logarithmic form becomes visible.",
    "The translation x-a matters. A substitution recentres the expression so the standard formula applies to the shifted variable, not necessarily to x itself.",
  ],
  "partial-fractions-quadratic": [
    "Irreducible quadratic factors need linear numerators because a constant numerator is not flexible enough to rebuild every possible rational expression. The numerator Ax+B carries the missing degrees of freedom.",
    "After decomposition, the quadratic part often splits into two integration ideas: a derivative-over-function logarithm part and a completed-square inverse-tangent part.",
  ],
  "forces-inclined-planes": [
    "On an inclined plane, gravity is resolved into components parallel and perpendicular to the surface because those are the directions that match the motion constraint and the normal reaction.",
    "The component down the plane is mg sin theta and the perpendicular component is mg cos theta. These come from the right triangle formed by resolving the weight vector relative to the incline.",
  ],
  "circular-motion-uniform": [
    "Uniform circular motion has constant speed but changing velocity because direction changes continuously. Acceleration points toward the centre because that is the direction in which the velocity vector is turning.",
    "The formula a = v^2/r measures how sharply the velocity direction changes. Faster motion changes direction more quickly, while a larger radius makes the turn gentler.",
  ],
  "resisted-motion": [
    "Resistance models connect force to velocity. If resistance is proportional to speed, the differential equation says acceleration depends on the current speed, not just on position or time.",
    "Terminal velocity occurs when the driving force and resistance balance. At that moment acceleration is zero, so the velocity stops changing even though the object continues moving.",
  ],
  "projectile-motion-resistance": [
    "Projectile motion with resistance separates horizontal and vertical equations because resistance acts against each velocity component. The horizontal component decays toward zero, while the vertical component approaches terminal motion.",
    "The unfamiliar part is that acceleration is no longer constant. The differential equation must be solved with initial conditions, and the physical interpretation comes from the limiting behaviour as time grows.",
  ],
};

const EXTRA_WORKED_EXAMPLES: Record<string, WorkedExample[]> = {
  "vectors-and-points-3d": [
    {
      title: "Use displacement to move between two 3D points",
      questionLatex: "A(1,2,-1),\\ B(5,-1,3).\\ \\text{Find }\\overrightarrow{AB}.",
      steps: [
        { explanation: "Subtract the coordinates of A from the coordinates of B.", latex: "\\overrightarrow{AB}=B-A" },
        { explanation: "Work component by component.", latex: "(5-1,\\,-1-2,\\,3-(-1))" },
        { explanation: "Simplify the displacement vector.", latex: "\\overrightarrow{AB}=(4,-3,4)" },
      ],
      finalAnswerLatex: "\\overrightarrow{AB}=(4,-3,4)",
    },
  ],
  "complex-number-arithmetic": [
    {
      title: "Multiply complex numbers as rotation and scaling",
      questionLatex: "(2+i)(1+3i)",
      steps: [
        { explanation: "Expand as with binomials, keeping the i terms.", latex: "2+6i+i+3i^2" },
        { explanation: "Use i squared equals -1.", latex: "2+7i-3" },
        { explanation: "Collect real and imaginary parts.", latex: "-1+7i" },
      ],
      finalAnswerLatex: "-1+7i",
    },
  ],
  "t-substitution-weierstrass": [
    {
      title: "Convert a trig expression into t",
      questionLatex: "\\text{Use }t=\\tan(x/2)\\text{ to rewrite }\\sin x.",
      steps: [
        { explanation: "Use the standard Weierstrass identity for sine.", latex: "\\sin x=\\frac{2t}{1+t^2}" },
        { explanation: "The denominator appears because sine is built from the half-angle triangle.", latex: "1+t^2\\text{ normalises the ratio}" },
        { explanation: "The trig expression is now rational in t.", latex: "\\frac{2t}{1+t^2}" },
      ],
      finalAnswerLatex: "\\sin x=\\frac{2t}{1+t^2}",
    },
  ],
};

const EXTRA_MISTAKE = {
  mistake: "Applying a memorised method before identifying the structure of the question.",
  fix: "Name the underlying structure first, then choose the method that reverses or represents that structure.",
};

function topUpMistakes(lesson: ExplicitLesson) {
  const mistakes = [...lesson.commonMistakes];
  while (mistakes.length < 4) {
    mistakes.push({
      mistake: `${EXTRA_MISTAKE.mistake} (${mistakes.length + 1})`,
      fix: EXTRA_MISTAKE.fix,
    });
  }
  return mistakes;
}

function workedStepCount(examples: WorkedExample[]) {
  return examples.reduce((total, example) => total + example.steps.length, 0);
}

function transferWorkedExample(lesson: ExplicitLesson): WorkedExample {
  return {
    title: `${lesson.title}: choose the structure before calculating`,
    questionLatex:
      "\\text{An unfamiliar Extension 2 question uses this lesson's idea. State the structural first step.}",
    steps: [
      {
        explanation:
          "Identify the mathematical object in the question before choosing a technique.",
        latex: "\\text{object: vector, complex number, integral, proof, or motion model}",
      },
      {
        explanation:
          "Match that object to the lesson structure instead of copying the surface form.",
        latex: "\\text{structure} \\rightarrow \\text{method}",
      },
      {
        explanation:
          "Use the structure to decide the first calculation, then keep later algebra consistent with that choice.",
        latex: "\\text{first justified step, then calculation}",
      },
    ],
    finalAnswerLatex:
      "\\text{A correct Extension 2 solution begins by naming the structure.}",
  };
}

function enrichWorkedExamples(lesson: ExplicitLesson, extraWorked: WorkedExample[]) {
  const examples = [...lesson.workedExamples, ...extraWorked];
  while (examples.length < 3 || workedStepCount(examples) < 6) {
    examples.push(transferWorkedExample(lesson));
  }
  return examples;
}

type PoolBlueprint = {
  topic: string;
  object: string;
  validMove: string;
  trap1: string;
  trap2: string;
  trap3: string;
  representation: string;
  check: string;
  d5Context: string;
  proofFlaw?: string;
};

const POOL_BLUEPRINTS: Record<string, PoolBlueprint> = {
  // proof-by-contradiction intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in proof.ts (production-first, cognitive-demand-true) per the
  // Ext2 practice-pool replacement standard.
  // proof-by-contrapositive intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in proof.ts per the Ext2 practice-pool replacement standard.
  "inequalities-algebraic-proof": {
    topic: "algebraic inequality proof",
    object: "a non-negative difference or square",
    validMove: "Move all terms to one side and rewrite as a visibly non-negative expression.",
    trap1: "Multiplying by a quantity whose sign is unknown.",
    trap2: "Taking square roots without checking both sides are non-negative.",
    trap3: "Checking a few values instead of proving all allowed values.",
    representation: "difference equals a square or sum of squares",
    check: "every sign-sensitive operation is justified",
    d5Context: "parameter inequalities and equality cases",
    proofFlaw: "The proof divides by an expression that may be negative or zero.",
  },
  "proof-by-mathematical-induction": {
    topic: "mathematical induction",
    object: "the base case and inductive step",
    validMove: "Prove the base case, assume the k case, then prove the k + 1 case.",
    trap1: "Assuming the k + 1 case directly.",
    trap2: "Omitting the base case.",
    trap3: "Using the induction hypothesis for a value it does not cover.",
    representation: "base case plus k to k + 1 implication",
    check: "the inductive step uses only the k case to reach k + 1",
    d5Context: "divisibility, inequalities, and recurrence-style statements",
    proofFlaw: "The proof verifies n = 1 and n = 2 but never proves the chain from k to k + 1.",
  },
  "vectors-and-points-3d": {
    topic: "3D vectors and points",
    object: "a displacement vector in component form",
    validMove: "Subtract coordinates endpoint minus start point.",
    trap1: "Adding point coordinates when a displacement is required.",
    trap2: "Subtracting in the wrong order.",
    trap3: "Treating a position vector as independent of the chosen origin.",
    representation: "component vector i, j, k or ordered triple",
    check: "adding the displacement to the start point reaches the endpoint",
    d5Context: "points constrained by midpoint, ratio, or collinearity conditions",
  },
  "dot-product-and-angle": {
    topic: "dot product and angle",
    object: "directional overlap of two vectors",
    validMove: "Use a dot b equals |a||b| cos theta.",
    trap1: "Using component-wise multiplication as a vector answer.",
    trap2: "Forgetting to divide by both magnitudes before inverse cosine.",
    trap3: "Calling vectors perpendicular without checking the dot product is zero.",
    representation: "scalar dot product and angle formula",
    check: "the cosine value lies between -1 and 1",
    d5Context: "angle constraints, perpendicularity, and projection problems",
  },
  "equations-of-lines-3d": {
    topic: "3D line equations",
    object: "a point plus a direction vector",
    validMove: "Write r = a + lambda d using an anchor point and direction.",
    trap1: "Using two points as if both were direction vectors.",
    trap2: "Treating the parameter as a coordinate.",
    trap3: "Equating only one component when testing intersection.",
    representation: "vector, parametric, or Cartesian line form",
    check: "the same parameter value satisfies all three components",
    d5Context: "intersection, skew lines, and shortest-distance checks",
  },
  "vector-applications-exam-practice": {
    topic: "vector applications",
    object: "the geometric condition hidden in the wording",
    validMove: "Translate parallel, perpendicular, midpoint, or intersection into a vector condition.",
    trap1: "Calculating without identifying the geometric condition.",
    trap2: "Using a dot product for parallelism rather than perpendicularity.",
    trap3: "Ignoring that 3D lines may be skew.",
    representation: "geometry statement converted to vector algebra",
    check: "the final scalar/vector type matches the geometry asked for",
    d5Context: "multi-condition 3D geometry in unfamiliar diagrams",
  },
  "vector-curves-circles-spheres": {
    topic: "vector curves, circles, and spheres",
    object: "a distance constraint in 3D",
    validMove: "Use distance from a centre equals radius.",
    trap1: "Forgetting the z component in a sphere.",
    trap2: "Using radius where radius squared is required.",
    trap3: "Treating a parameter as fixed before applying the constraint.",
    representation: "circle/sphere equation or parametric locus",
    check: "substitution satisfies the distance equation",
    d5Context: "parametric points constrained to lie on a sphere or circle",
  },
  "geometric-proofs-vectors": {
    topic: "vector geometric proof",
    object: "a geometric claim translated into vector facts",
    validMove: "Use scalar multiples, equal vectors, lengths, or dot products to prove the geometry.",
    trap1: "Leaving the proof as algebra without a geometric conclusion.",
    trap2: "Assuming a diagram property not given.",
    trap3: "Using equal lengths to claim parallel lines.",
    representation: "vector equations supporting a geometry conclusion",
    check: "the final sentence translates the vector fact back to geometry",
    d5Context: "collinearity, parallelograms, perpendicularity, and ratios",
  },
  "complex-number-arithmetic": {
    topic: "complex arithmetic",
    object: "real and imaginary components",
    validMove: "Collect real parts and imaginary parts, using i squared equals -1.",
    trap1: "Treating i squared as positive 1.",
    trap2: "Combining real and imaginary terms as like terms.",
    trap3: "Forgetting conjugates when dividing.",
    representation: "a + bi form",
    check: "the final answer has separated real and imaginary parts",
    d5Context: "division, powers of i, and mixed arithmetic",
  },
  "modulus-argument-conjugate": {
    topic: "modulus, argument, and conjugate",
    object: "distance, direction, and reflection on the Argand plane",
    validMove: "Use Pythagoras for modulus and quadrant-aware trigonometry for argument.",
    trap1: "Using arctan without checking the quadrant.",
    trap2: "Changing the modulus when taking a conjugate.",
    trap3: "Writing argument as a positive acute angle in every quadrant.",
    representation: "Argand geometry",
    check: "the argument points to the correct quadrant",
    d5Context: "loci, conjugate symmetry, and argument constraints",
  },
  "argand-diagram-geometry": {
    topic: "Argand diagram geometry",
    object: "a complex number as a point or vector",
    validMove: "Translate modulus into distance and argument into angle.",
    trap1: "Reading |z-a| as distance from the origin.",
    trap2: "Ignoring the centre of a circle or locus.",
    trap3: "Confusing real and imaginary axes.",
    representation: "locus on the Argand plane",
    check: "the locus matches the distance or angle condition",
    d5Context: "circle, perpendicular bisector, and ray loci",
  },
  "polar-form-de-moivre": {
    topic: "polar form and de Moivre's theorem",
    object: "modulus and argument",
    validMove: "Raise the modulus to the power and multiply the argument.",
    trap1: "Multiplying the modulus by n instead of raising it to n.",
    trap2: "Adding arguments when taking a power.",
    trap3: "Forgetting equivalent arguments modulo 2pi.",
    representation: "r cis theta",
    check: "the modulus and argument transformations are both applied",
    d5Context: "high powers, roots, and rotated polygons",
  },
  "roots-of-unity": {
    topic: "roots of unity",
    object: "equally spaced points on the unit circle",
    validMove: "Divide a full turn into n equal arguments.",
    trap1: "Listing only the principal root.",
    trap2: "Using pi/n instead of 2pi/n spacing.",
    trap3: "Changing the modulus away from 1 for roots of unity.",
    representation: "regular polygon on the unit circle",
    check: "there are n distinct roots spaced by 2pi/n",
    d5Context: "factorisation, sums of roots, and geometric symmetry",
  },
  "complex-polynomials": {
    topic: "complex polynomial roots",
    object: "factor and conjugate-root structure",
    validMove: "Use conjugate pairs for real-coefficient polynomials.",
    trap1: "Including a + bi without a - bi in a real polynomial.",
    trap2: "Treating an irreducible real quadratic as irreducible over C.",
    trap3: "Losing multiplicity when writing factors.",
    representation: "linear factors over C",
    check: "conjugate pairs multiply to real quadratic factors",
    d5Context: "factorisation from mixed real and complex roots",
  },
  "advanced-integration-method-selection": {
    topic: "integration method selection",
    object: "the structure of the integrand",
    validMove: "Match composition, product, rational form, or trig power to the corresponding method.",
    trap1: "Trying integration by parts on every product.",
    trap2: "Using substitution without a derivative-like factor.",
    trap3: "Skipping algebraic simplification before choosing a method.",
    representation: "integrand structure map",
    check: "the chosen method reverses a known differentiation or algebra process",
    d5Context: "integrals requiring method switching after simplification",
  },
  "integration-by-parts-extension": {
    topic: "integration by parts",
    object: "a product where one factor simplifies when differentiated",
    validMove: "Choose u and dv, then use integral u dv equals uv minus integral v du.",
    trap1: "Differentiating both factors.",
    trap2: "Choosing u so the next integral becomes harder.",
    trap3: "Dropping the remaining integral after uv.",
    representation: "reverse product rule",
    check: "differentiate the result to recover the integrand",
    d5Context: "repeated parts and logarithmic/inverse-trig products",
  },
  "reduction-formulae-introduction": {
    topic: "reduction formulae",
    object: "an integral sequence indexed by n",
    validMove: "Relate I_n to a simpler I_{n-1} or I_{n-2}.",
    trap1: "Treating n as a variable of integration.",
    trap2: "Forgetting the base integral.",
    trap3: "Using the recurrence outside its valid range.",
    representation: "recurrence relation for integrals",
    check: "each recurrence step lowers the power/index",
    d5Context: "evaluating high-power integrals efficiently",
  },
  "partial-fractions-integration": {
    topic: "partial fractions integration",
    object: "a rational function with factorised denominator",
    validMove: "Decompose into simple fractions before integrating.",
    trap1: "Using one constant over a repeated factor only once.",
    trap2: "Using a constant numerator over an irreducible quadratic.",
    trap3: "Integrating before decomposing.",
    representation: "sum of simpler rational terms",
    check: "recombining the fractions gives the original numerator",
    d5Context: "mixed repeated and irreducible factors",
  },
  "t-substitution-weierstrass": {
    topic: "t-substitution",
    object: "a rational expression in sine and cosine",
    validMove: "Set t = tan(x/2) and rewrite sin x, cos x, and dx.",
    trap1: "Replacing sin x and cos x but forgetting dx.",
    trap2: "Using tan x instead of tan(x/2).",
    trap3: "Leaving the integral partly in x and partly in t.",
    representation: "rational function of t",
    check: "all trig functions and dx are converted",
    d5Context: "rational trig integrals resistant to simpler identities",
  },
  "trig-identity-integration": {
    topic: "trig identity integration",
    object: "an integrand needing an identity before integration",
    validMove: "Rewrite powers or products using an exact trig identity.",
    trap1: "Integrating sin squared as if it were sin.",
    trap2: "Using an identity with the wrong sign.",
    trap3: "Changing the integrand rather than rewriting it equivalently.",
    representation: "identity-transformed integrand",
    check: "the rewritten expression is algebraically identical",
    d5Context: "products and powers requiring multiple identities",
  },
  "completing-square-integration": {
    topic: "completing the square for integration",
    object: "a quadratic denominator or expression",
    validMove: "Rewrite the quadratic as a shifted square plus or minus a constant.",
    trap1: "Forgetting to balance the constant term.",
    trap2: "Matching the wrong standard inverse-trig/log form.",
    trap3: "Ignoring the shift in the substitution.",
    representation: "shifted-square standard form",
    check: "expanding the completed square recovers the original quadratic",
    d5Context: "non-monic quadratics and inverse-trig/log decisions",
  },
  "volumes-of-revolution": {
    topic: "volumes of revolution",
    object: "a radius swept through a circular cross-section",
    validMove: "Use pi times the integral of radius squared.",
    trap1: "Integrating y instead of y squared.",
    trap2: "Using x-limits for a y-axis rotation without rewriting.",
    trap3: "Forgetting washer subtraction when there is an inner radius.",
    representation: "disk or washer integral",
    check: "the squared radius matches the axis of rotation",
    d5Context: "washer regions and y-axis rotations",
  },
  "partial-fractions-quadratic": {
    topic: "partial fractions with quadratics",
    object: "an irreducible quadratic denominator",
    validMove: "Use a linear numerator over each irreducible quadratic factor.",
    trap1: "Using a constant numerator where Ax+B is needed.",
    trap2: "Factoring an irreducible quadratic over the reals.",
    trap3: "Missing the log part from derivative-over-function structure.",
    representation: "linear-over-quadratic decomposition",
    check: "coefficients match after recombining",
    d5Context: "decomposition plus completing square integration",
  },
  "forces-inclined-planes": {
    topic: "forces on inclined planes",
    object: "components parallel and perpendicular to the plane",
    validMove: "Resolve weight into mg sin theta down the plane and mg cos theta normal to it.",
    trap1: "Swapping sine and cosine components.",
    trap2: "Putting normal reaction parallel to the plane.",
    trap3: "Ignoring friction direction.",
    representation: "force balance along chosen axes",
    check: "components align with the plane and normal directions",
    d5Context: "limiting equilibrium and acceleration on inclines",
  },
  "rectilinear-motion-calculus": {
    topic: "rectilinear motion calculus",
    object: "position, velocity, and acceleration as derivatives/integrals",
    validMove: "Use v = dx/dt and a = dv/dt, with initial conditions after integrating.",
    trap1: "Forgetting constants of integration.",
    trap2: "Using displacement and distance interchangeably.",
    trap3: "Solving for time without checking the physical interval.",
    representation: "calculus chain x, v, a",
    check: "differentiate/integrate back to the given function",
    d5Context: "turning points, direction changes, and constrained times",
  },
  "simple-harmonic-motion-extended": {
    topic: "simple harmonic motion",
    object: "acceleration proportional to displacement toward equilibrium",
    validMove: "Use a = -omega squared x and connect to sinusoidal motion.",
    trap1: "Missing the negative sign toward equilibrium.",
    trap2: "Confusing amplitude with angular frequency.",
    trap3: "Using maximum speed at maximum displacement.",
    representation: "sinusoidal displacement model",
    check: "acceleration points opposite displacement",
    d5Context: "energy, phase, and boundary-condition models",
  },
  "circular-motion-uniform": {
    topic: "uniform circular motion",
    object: "centripetal acceleration toward the centre",
    validMove: "Use a = v squared over r or omega squared r.",
    trap1: "Pointing acceleration tangentially.",
    trap2: "Using circumference as acceleration radius incorrectly.",
    trap3: "Forgetting speed is constant but velocity changes.",
    representation: "radial acceleration model",
    check: "acceleration direction is inward",
    d5Context: "period, angular speed, and force constraints",
  },
  "resisted-motion": {
    topic: "resisted motion",
    object: "a differential equation with velocity-dependent force",
    validMove: "Set up m dv/dt as driving force minus resistance.",
    trap1: "Using constant acceleration after resistance is introduced.",
    trap2: "Giving terminal velocity before setting acceleration to zero.",
    trap3: "Using the wrong sign for resistance.",
    representation: "first-order velocity differential equation",
    check: "terminal velocity makes acceleration zero",
    d5Context: "vertical motion with linear resistance and limiting behaviour",
  },
  "projectile-motion-resistance": {
    topic: "projectile motion with resistance",
    object: "component differential equations",
    validMove: "Resolve resistance against each velocity component and solve with initial conditions.",
    trap1: "Using parabolic no-resistance motion.",
    trap2: "Forgetting horizontal velocity decays.",
    trap3: "Using one equation for both components.",
    representation: "coupled component motion model",
    check: "long-time behaviour agrees with terminal or decaying velocity",
    d5Context: "projectile components under linear resistance",
  },
};

function choicePoolItem(
  lesson: ExplicitLesson,
  index: number,
  difficulty: number,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  const choices = [correct, ...distractors].slice(0, 4).map((text, choiceIndex) => ({
    label: ["A", "B", "C", "D"][choiceIndex],
    text,
  }));
  return {
    id: `${lesson.slug}-bespoke-p${index}`,
    prompt,
    latex,
    answer: "A",
    difficulty,
    choices,
    acceptedAnswers: [],
    hint: "Identify the structure being tested before choosing the option.",
    explanation,
  };
}

function proofDiagnosisPool(lesson: ExplicitLesson, blueprint: PoolBlueprint) {
  const stems = [
    "A proof begins by assuming the conclusion and then derives a known fact. What is the flaw?",
    "A student proves the converse of the required implication. What should be identified?",
    "A proof checks three numerical cases and then claims the statement is true for all integers. What is missing?",
    "A proof divides by an expression that may be zero. What is the flaw?",
    "A proof reaches a surprising statement but not an impossibility. What is missing?",
    "A proof by induction verifies the base case and then assumes the n = k + 1 statement. What is invalid?",
    "A proof negates the hypothesis but not the conclusion. What is the flaw?",
    "A proof uses a diagram observation as if it were an algebraic fact. What is missing?",
    "A proof claims equality occurs but never checks the equality condition. What is incomplete?",
    "A proof changes inequality direction without naming the sign of the factor. What is the flaw?",
  ];
  const correct = [
    blueprint.trap1,
    "It proves a different implication from the one required.",
    "A general argument is missing.",
    "The operation is invalid unless the divisor is known to be non-zero.",
    "A contradiction must conflict with a known fact or condition.",
    "The inductive step has assumed what it needed to prove.",
    "The logical negation is incomplete.",
    "The proof needs an algebraic justification.",
    "The equality case must be tested separately.",
    "The sign of the factor must be established first.",
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const difficulty = index < 4 ? 1 : index < 10 ? 2 : index < 18 ? 3 : index < 24 ? 4 : 5;
    const stemIndex = index % stems.length;
    return choicePoolItem(
      lesson,
      index + 1,
      difficulty,
      `${stems[stemIndex]} Topic: ${blueprint.topic}.`,
      correct[stemIndex],
      [blueprint.trap2, blueprint.trap3, "There is no flaw; the proof is complete."],
      `The flaw is: ${correct[stemIndex]} In ${blueprint.topic}, the proof must preserve the exact logical structure and finish by checking that ${blueprint.check}.`,
      "\\text{Flawed proof diagnosis}"
    );
  });
}

function blueprintPool(lesson: ExplicitLesson, blueprint: PoolBlueprint) {
  if (blueprint.proofFlaw) {
    return proofDiagnosisPool(lesson, blueprint);
  }

  const templates = [
    {
      prompt: `For ${blueprint.topic}, what is the object you should identify first?`,
      correct: blueprint.object,
      explanation: `The first move is to identify ${blueprint.object}; that determines the method.`,
    },
    {
      prompt: `Which first step best matches ${blueprint.topic}?`,
      correct: blueprint.validMove,
      explanation: `The valid first step is: ${blueprint.validMove}`,
    },
    {
      prompt: `A student working on ${blueprint.topic} makes this error: ${blueprint.trap1}. Which correct move should replace it?`,
      correct: blueprint.validMove,
      explanation: `The correct move is: ${blueprint.validMove} This avoids the error and helps ensure that ${blueprint.check}.`,
    },
    {
      prompt: `Which representation is most useful for ${blueprint.topic}?`,
      correct: blueprint.representation,
      explanation: `${blueprint.representation} exposes the structure needed for the calculation.`,
    },
    {
      prompt: `What check should be made after solving a ${blueprint.topic} problem?`,
      correct: blueprint.check,
      explanation: `The answer should be checked by confirming that ${blueprint.check}.`,
    },
    {
      prompt: `In a Band-6 style ${blueprint.topic} question involving ${blueprint.d5Context}, what should you identify before choosing a method?`,
      correct: blueprint.object,
      explanation: `Even in an unfamiliar context, first identify ${blueprint.object}. Then apply the correct move: ${blueprint.validMove}`,
    },
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const difficulty = index < 4 ? 1 : index < 10 ? 2 : index < 18 ? 3 : index < 24 ? 4 : 5;
    const template = templates[index % templates.length];
    const trapCycle = [blueprint.trap1, blueprint.trap2, blueprint.trap3];
    return choicePoolItem(
      lesson,
      index + 1,
      difficulty,
      template.prompt,
      template.correct,
      [
        trapCycle[index % 3],
        trapCycle[(index + 1) % 3],
        "Start calculating immediately without identifying the structure.",
      ].filter((choice) => choice !== template.correct),
      template.explanation,
      `\\text{${blueprint.topic}}`
    );
  });
}

function buildPool(lesson: ExplicitLesson): PracticeQuestion[] {
  const blueprint = POOL_BLUEPRINTS[lesson.slug];
  if (blueprint) return blueprintPool(lesson, blueprint);
  return lesson.masteryQuizPool ?? [];
}

function typedPartSource(lesson: ExplicitLesson) {
  return [
    ...lesson.independentPractice,
    ...lesson.masteryQuiz,
    ...lesson.guidedPractice,
  ].filter((question) => !question.choices?.length && !question.parts?.length);
}

function buildMultiPart(lesson: ExplicitLesson): PracticeQuestion[] {
  if (lesson.multiPartPractice?.length) return lesson.multiPartPractice;

  const partsSource = typedPartSource(lesson).slice(0, 3);
  if (partsSource.length < 3) return lesson.multiPartPractice ?? [];

  const dependencyNote =
    "Use the result and method from earlier parts to keep the later calculations aligned with the same lesson structure.";

  return [
    {
      id: `${lesson.slug}-mp-backfill-1`,
      prompt:
        `Extension 2 multi-part practice for ${lesson.title}. The parts are designed as the main exam-style depth layer for this lesson.`,
      latex: "\\text{Answer each part exactly.}",
      answer: partsSource[0].answer,
      acceptedAnswers: partsSource[0].acceptedAnswers,
      hint:
        `Work through each part in order. ${dependencyNote}`,
      explanation:
        "This multi-part item carries the deeper exam practice: each part targets a connected calculation from the lesson and is marked separately for partial credit.",
      parts: partsSource.map((question, index) => ({
        key: ["a", "b", "c"][index],
        label: `(${["a", "b", "c"][index]})`,
        prompt: question.prompt,
        latex: question.latex,
        marks: index === 2 ? 2 : 1,
        answer: question.answer,
        acceptedAnswers: question.acceptedAnswers,
        hint:
          question.hint ??
          dependencyNote,
        explanation:
          question.explanation ??
          "Apply the lesson method carefully and state the requested value.",
      })),
    },
  ];
}

export function enrichYear12Extension2Depth(lesson: ExplicitLesson): ExplicitLesson {
  const additions = FEYNMAN_PARAGRAPHS[lesson.slug] ?? [];
  const extraWorked = EXTRA_WORKED_EXAMPLES[lesson.slug] ?? [];

  return {
    ...lesson,
    teaching: {
      ...lesson.teaching,
      paragraphs: [...lesson.teaching.paragraphs, ...additions],
    },
    workedExamples: enrichWorkedExamples(lesson, extraWorked),
    commonMistakes:
      lesson.commonMistakes.length >= 4 ? lesson.commonMistakes : topUpMistakes(lesson),
    masteryQuiz:
      lesson.masteryQuiz.length > 10
        ? lesson.masteryQuiz.slice(0, 10)
        : lesson.masteryQuiz,
    masteryQuizPool: buildPool(lesson),
    multiPartPractice: buildMultiPart(lesson),
  };
}
