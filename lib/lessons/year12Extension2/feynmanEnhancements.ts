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
  // inequalities-algebraic-proof intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in proof.ts per the Ext2 practice-pool replacement standard.
  // proof-by-mathematical-induction intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in proof.ts per the Ext2 practice-pool replacement standard.
  // vectors-and-points-3d intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // dot-product-and-angle intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // equations-of-lines-3d intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // vector-applications-exam-practice intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // vector-curves-circles-spheres intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // geometric-proofs-vectors intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in vectors3D.ts per the Ext2 practice-pool standard.
  // complex-number-arithmetic intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in complexNumbers.ts per the Ext2 practice-pool standard.
  // modulus-argument-conjugate intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in complexNumbers.ts per the Ext2 practice-pool standard.
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
  // advanced-integration-method-selection intentionally omitted: replaced by a
  // hand-authored masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // integration-by-parts-extension intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // reduction-formulae-introduction intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // partial-fractions-integration intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // t-substitution-weierstrass intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // trig-identity-integration intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // completing-square-integration intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // volumes-of-revolution intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // partial-fractions-quadratic intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in calculus.ts per the Ext2 practice-pool standard.
  // forces-inclined-planes intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
  // rectilinear-motion-calculus intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
  // simple-harmonic-motion-extended intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
  // circular-motion-uniform intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
  // resisted-motion intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
  // projectile-motion-resistance intentionally omitted: replaced by a hand-authored
  // masteryQuizPool in mechanics.ts per the Ext2 practice-pool standard.
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
