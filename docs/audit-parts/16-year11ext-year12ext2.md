# Audit — Year 11 Extension & Year 12 Extension 2

Scope: all `.ts` files under `lib/lessons/year11Extension/` and `lib/lessons/year12Extension2/`.
Factory helpers read first in every file. `formulaAnswer`/`intAnswer`/`countAnswer` add a `.0` integer
variant and dedupe `[answer, ...acceptedAnswers]`; `practicalChoice`/`*Choice` build MCQs;
`cxTyped`/`calcTyped`/`mechTyped`/`v3Typed`/`proofTyped` pass `acceptedAnswers` straight through.
Marking auto-normalises integers/decimals/fractions, coordinates, units, `x²`⇔`x^2`, leading `var=`,
whitespace/case/unicode-minus (per spec). Evaluations below are of the *resolved* question.

---

## lib/lessons/year11Extension/binomialTheorem.ts

No issues found. Spot-checked the greatest-term/greatest-coefficient ratio questions
(`y11ext-bt-grt-*`): all ratio inequalities, floor logic and tie cases recompute correctly
(e.g. grt-i1 C(7,3)=C(7,4)=35; grt-m5 C(12,6)=924; grt-m10 C(8,4)=70 ⇒ n=8). Coefficient,
constant-term, row-sum and substitution questions all correct.

## lib/lessons/year11Extension/furtherFunctions.ts

No issues found. Inverse functions accept equivalent algebraic forms (e.g. ff-inv-i1 `(x-6)/3`
also accepts `x/3-2`). Parametric, remainder, symmetry, absolute-value and reciprocal/squared-graph
questions all correct; interval answers carry inequality-form accepted variants.

## lib/lessons/year11Extension/furtherTrigonometry.ts

- [P4] year11ExtensionFurtherTrigonometry (double-angle lesson) :: teaching.latexBlocks line 340 —
  `"\\tan2A=\\frac{2\\tan A}{1-\tan^2A}"` contains `\t` (a literal TAB escape) instead of `\\tan`.
  Renders as `1-<TAB>an^2A` (broken LaTeX in a student-facing teaching block). Not a graded field.
  Proposed: `1-\\tan^2A`. Evidence: the same expression is written correctly on line 557.

All graded questions correct. Verified the trig-equation-solving solution counts:
ft-eqs-g3 (cos2θ=cosθ ⇒ θ=0,120,240,360 ⇒ 4), i5 (cos2θ+sinθ=0 ⇒ 90,210,330 ⇒ 3),
m4 (cos2θ=sin²θ ⇒ 3sin²θ=1 ⇒ 4), m8 (sin2θ+2sinθ=0 ⇒ 0,180,360 ⇒ 3),
m10 (cos2θ−sinθ=1 ⇒ sinθ=0 or −1/2 ⇒ 5). Product-to-sum exact values (e.g. prod-i3 = 1+√3/2,
accepts (2+√3)/2) correct.

## lib/lessons/year11Extension/permutationsCombinations.ts

No issues found. Verified factorials, P(n,r), C(n,r), block/complement restricted arrangements and
repeated-letter counts: LEVEL 5!/(2!2!)=30, BALLOON 7!/(2!2!)=1260, SUCCESS 7!/(3!2!)=420,
RADAR 30, 7-people-not-together 5040−1440=3600, 8 round-table 7!=5040. All correct.

## lib/lessons/year11Extension/polynomials.ts

No issues found. Factorisation questions list all factor-order permutations in `acceptedAnswers`;
remainder/factor-theorem, Vieta sum/product (incl. non-monic c/a forms with decimal variants) and
graph intercept/multiplicity questions all correct.

---

## lib/lessons/year12Extension2/complexNumbers.ts

- [P1] complex-polynomials :: cx6-m8 — MCQ "Which polynomial has roots i, −i, 2?" Correct answer is
  (z−i)(z+i)(z−2) = z³−2z²+z−2. Choices B and C are BOTH the identical string `z^3-2z^2+z-2`;
  the marked answer is **C**, so a student selecting the equally-correct, textually-identical option
  **B** is mis-marked wrong. Current: answer C with duplicate B. Proposed: change distractor B to a
  genuinely different (incorrect) polynomial, e.g. `z^3+2z^2+z+2`. Evidence: B and C are character-
  for-character identical, both equal the true product.

- [P4] roots-of-unity :: cx5-m7 — the MCQ correctly marks "Their product is always 0" as the FALSE
  statement (answer C is right), but the explanation prose is garbled: "argument sum = 2π(0+1+…+(n−1))/n
  = π(n−1) which is a multiple of 2π only at limits" is confusing/incorrect reasoning, even though its
  final claim (product = (−1)^{n+1}, never 0) is correct. Cosmetic; rewrite the explanation.

All other complex-number questions correct, including arithmetic, modulus/argument/conjugate,
Argand geometry (perpendicular-bisector loci), polar form / De Moivre (cx4-m10 Re(z⁴)=−4;
cx4-mp-1c Re(z⁴)=−8), roots of unity, and the conjugate-root / quadratic-factor / fully-factorised
complex-polynomial questions (cx6-m2 z²−6z+13, cx6-m9 z²−2z+5, cx6-m10 r=2). multiPartPractice
cx1-mp-1c (Im(z²)=12) verified.

## lib/lessons/year12Extension2/vectors3D.ts

No issues found. Verified 3D magnitudes, dot products, angle cos values (8/9, 1/2, 16/25),
perpendicularity parameters (t=1/2, t=0, t=1), line parametrics/point-on-line tests, circle/sphere
vector↔Cartesian conversions, and the Cauchy–Schwarz / rhombus-diagonal dot-product proofs.
v3l-g4 accepts both `(2,2,2)` and simplified `(1,1,1)`. multiPartPractice answers all consistent.

## lib/lessons/year12Extension2/calculus.ts

- [P1] partialFractionsLesson :: y12e2-pf-i5 — "Evaluate ∫₀¹ 4/((x−2)(x+2)) dx using A=1, B=−1."
  Current answer: `ln(4/3)` (accepts `ln 4/3`, `\ln(4/3)`). This is WRONG. The integrand
  4/(x²−4) is negative on all of [0,1], so the integral must be negative; ln(4/3) > 0 is impossible.
  Compute: ∫₀¹[1/(x−2) − 1/(x+2)]dx = [ln|x−2| − ln|x+2|]₀¹ = (ln1 − ln3) − (ln2 − ln2)
  = (0 − ln3) − 0 = **−ln3** = ln(1/3) ≈ −1.0986. Proposed answer: `-ln3` (accept `ln(1/3)`,
  `-ln(3)`, `-1.0986`). Note the existing explanation text also contains visible draft working
  ("…Hmm let me recompute: …") that must be removed (P4, subsumed by this P1).

All other calculus questions correct, including: method-selection MCQs; integration-by-parts
definite values (ibp-g3 =1, ibp-m6 (e²+1)/4, ibp-m8 (e^π+1)/2); reduction-formula chains
(red-i1 6−2e, red-m1 9e−24, red-m2 5π/32, red-m6 16/35, red-m10 35π/256); the *other* partial-
fraction questions (pf-m10 A=2,B=−1; pfq-m9 A=1/2); t-substitution; half-angle/product-to-sum
trig integrals (trig-i5 −cos4x/8−cos2x/4+C, trig-m10 π/2); completing-the-square arctan forms
(csq-m10 ½arctan(2x)+C); and all volumes of revolution (32π/5, π/6, 8π, 15π/2, 2π/15, π/7,
2π/3, 16π/3, π(e²−1)/2, π²/2, 8π/3 — m10 verified 8−16/3=8/3).

## lib/lessons/year12Extension2/mechanics.ts

No issues found. Verified rectilinear motion (differentiation/integration with initial conditions;
rect-m12 a=v dv/dx ⇒ v²=18), SHM (amplitude/period/max-speed an, max-acc an², energy eqn
v²=n²(a²−x²): shm-g4 =8, shm-i3 =6√3, shm-m5 =16), uniform circular motion (v=rω, a=rω²=v²/r,
F=mrω²; all numeric answers correct), resisted motion (terminal velocity mg/k, exponential
solutions, ∫dv/(mg−kv)=−(1/k)ln|mg−kv|), 2D projectile-with-resistance (decoupled ODEs,
ẏ_T=−mg/k, proj-m10 =5), and inclined-plane/pulley statics (a=g sinθ; pulley a=(M−m)g/(M+m),
T values 48, 32, 42 all correct; a=5√3, N=50√3, N=25√2).

## lib/lessons/year12Extension2/proof.ts

No issues found. Contradiction (irrationality lowest-terms, infinitude of primes, parity),
contrapositive (negation/direction, mod-3/mod-5 residues), inequalities (completing-the-square
constants and discriminants Δ=−16, −24, −12 all correct; equality conditions), and induction
(base cases, hypotheses, divisibility 3|4ⁿ−1 and 5|6ⁿ−1, summation (k+1)(k+2)/2, 2ⁿ>n) all
correct. Minor cosmetic: y12e2-proof-contra-m10 uses the literal `"2"` as its `latex` field rather
than a display expression — does not affect marking.

---

## SUMMARY

| File | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| year11Extension/binomialTheorem.ts | 0 | 0 | 0 | 0 |
| year11Extension/furtherFunctions.ts | 0 | 0 | 0 | 0 |
| year11Extension/furtherTrigonometry.ts | 0 | 0 | 0 | 1 |
| year11Extension/permutationsCombinations.ts | 0 | 0 | 0 | 0 |
| year11Extension/polynomials.ts | 0 | 0 | 0 | 0 |
| year12Extension2/complexNumbers.ts | 1 | 0 | 0 | 1 |
| year12Extension2/vectors3D.ts | 0 | 0 | 0 | 0 |
| year12Extension2/calculus.ts | 1 | 0 | 0 | 0 |
| year12Extension2/mechanics.ts | 0 | 0 | 0 | 0 |
| year12Extension2/proof.ts | 0 | 0 | 0 | 1 |
| **TOTAL** | **2** | **0** | **0** | **3** |

### P1 list

calculus.ts | y12e2-pf-i5 | — | `ln(4/3)` → `-ln3` (≡ ln(1/3)) | ∫₀¹4/((x−2)(x+2))dx = [ln|x−2|−ln|x+2|]₀¹ = (0−ln3)−0 = −ln3; integrand is negative on [0,1] so a positive answer is impossible. Explanation also contains stray "Hmm let me recompute" draft text to delete.
complexNumbers.ts | cx6-m8 | — | duplicate MCQ option (B = C) → make B a wrong polynomial | Choices B and C are both `z^3-2z^2+z-2` (the correct product (z−i)(z+i)(z−2)); marked answer is C, so a student picking the identical B is mis-marked.
