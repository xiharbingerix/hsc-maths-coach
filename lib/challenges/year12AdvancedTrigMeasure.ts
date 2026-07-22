import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge set for Year 12 Advanced "Trigonometry and Measure of Angles" (ma-t1).
// One-lesson topic (radians / exact values / unit circle / arc length & sector area / quadrants),
// so all six D6 share the single subtopic — accepted small-topic concentration. Difficulty is
// carried by trig STRUCTURE: reverse sector/arc geometry, coordinate→angle reconstruction with
// normalization, ratio + quadrant combination, and the Pythagorean identity used as a constraint —
// not unit-circle reading or a forward formula plug-in. Single-answer, auto-markable, hand-verified.

// → radians-exact-values-unit-circle
export const trigMeasureChallenge: PracticeQuestion[] = [
  {
    // Reverse geometry via Area = ½ r ℓ (no angle given) — distinct path from #2.
    id: "chal-y12a-tm-1",
    prompt:
      "A sector has arc length 6 cm and area 12 cm². Find the radius of the circle.",
    latex: "\\ell = 6,\\quad A = 12",
    answer: "4",
    acceptedAnswers: ["4 cm", "r=4"],
    sectorDiagram: {
      description: "Circle sector with arc length 6 centimetres, area 12 square centimetres and unknown radius r.",
      angleDegrees: 86,
      radiusLabel: "r",
      angleLabel: "theta",
      arcLabel: "6 cm",
      showFullCircle: true,
    },
    hint: "Area of a sector can be written as A = ½ r ℓ (combining A = ½ r²θ with ℓ = rθ).",
    explanation:
      "A = ½ r ℓ ⟹ 12 = ½ · r · 6 = 3r ⟹ r = 4. (Check: θ = ℓ/r = 1.5 rad, A = ½ · 16 · 1.5 = 12.)",
  },
  {
    // Reverse geometry via ℓ = rθ + degree→radian conversion, then OUTPUT the area — distinct from #1.
    id: "chal-y12a-tm-2",
    prompt:
      "An arc of length 3π cm subtends an angle of 60° at the centre of a circle. Find the exact area of the corresponding sector.",
    latex: "\\ell = 3\\pi,\\quad \\theta = 60^\\circ",
    answer: "27π/2",
    acceptedAnswers: ["27pi/2", "\\frac{27\\pi}{2}", "13.5π"],
    hint: "Convert 60° to radians, use ℓ = rθ to find r, then the sector area.",
    explanation:
      "60° = π/3. ℓ = rθ ⟹ 3π = r · π/3 ⟹ r = 9. Area = ½ r ℓ = ½ · 9 · 3π = 27π/2.",
  },
  {
    // Coordinate→angle with NON-unit coordinates: must normalize (find r) before reading the angle.
    id: "chal-y12a-tm-3",
    prompt:
      "The terminal side of an angle θ (with 0 ≤ θ < 2π) passes through the point (−2√3, 2). Find θ in radians.",
    latex: "P(-2\\sqrt3,\\ 2)",
    answer: "5π/6",
    acceptedAnswers: ["5pi/6", "\\frac{5\\pi}{6}"],
    hint: "First find the distance r from the origin to P, then cos θ = x/r and sin θ = y/r, and use the quadrant.",
    explanation:
      "r = √((2√3)² + 2²) = √(12 + 4) = 4. So cos θ = −2√3/4 = −√3/2 and sin θ = 2/4 = 1/2. The point is in quadrant II, reference angle π/6, giving θ = 5π/6.",
  },
  {
    // Ratio + quadrant: build the reference triangle, apply third-quadrant signs.
    id: "chal-y12a-tm-4",
    prompt:
      "θ is in the third quadrant and tan θ = 2. Find the exact value of sin θ + cos θ.",
    latex: "\\tan\\theta = 2,\\quad \\theta\\in\\text{Q3}",
    answer: "-3√5/5",
    acceptedAnswers: ["−3√5/5", "-3/sqrt(5)", "-3/\\sqrt5", "-\\frac{3\\sqrt5}{5}"],
    hint: "Use a right triangle with opposite 2 and adjacent 1, then apply the signs for quadrant III.",
    explanation:
      "Reference triangle: opp = 2, adj = 1, hyp = √5. In quadrant III both sine and cosine are negative: sin θ = −2/√5, cos θ = −1/√5. Sum = −3/√5 = −3√5/5.",
  },
  {
    // Exact-value + quadrant: combine two ratios under an obtuse-angle sign constraint.
    id: "chal-y12a-tm-5",
    prompt:
      "θ is obtuse and sin θ = 3/5. Find the exact value of cos θ + tan θ.",
    latex: "\\sin\\theta = \\tfrac35,\\quad \\theta\\text{ obtuse}",
    answer: "-31/20",
    acceptedAnswers: ["−31/20", "-1.55"],
    hint: "Obtuse means quadrant II, so cosine is negative. Find cos θ, then tan θ = sin θ / cos θ.",
    explanation:
      "Obtuse ⟹ quadrant II ⟹ cos θ = −4/5. tan θ = (3/5)/(−4/5) = −3/4. cos θ + tan θ = −4/5 − 3/4 = −16/20 − 15/20 = −31/20.",
  },
  {
    // Pythagorean-identity reconstruction with a derived quantity + quadrant sign (not just "solve for k").
    id: "chal-y12a-tm-6",
    prompt:
      "An angle θ in the third quadrant satisfies sin θ = k and cos θ = 2k for some constant k. Find the exact value of cos θ.",
    latex: "\\sin\\theta = k,\\ \\cos\\theta = 2k,\\ \\theta\\in\\text{Q3}",
    answer: "-2√5/5",
    acceptedAnswers: ["−2√5/5", "-2/sqrt(5)", "-2/\\sqrt5", "-\\frac{2\\sqrt5}{5}"],
    hint: "Use sin²θ + cos²θ = 1 to find k², then choose the sign of k using the quadrant before computing cos θ = 2k.",
    explanation:
      "sin²θ + cos²θ = 1 ⟹ k² + 4k² = 5k² = 1 ⟹ k² = 1/5. In quadrant III cosine is negative, so 2k < 0 ⟹ k = −1/√5. Then cos θ = 2k = −2/√5 = −2√5/5.",
  },
];
