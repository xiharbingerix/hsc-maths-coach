# Audit — Year 7 & Year 8 Lesson Catalog

Auditor scope: every gradeable question (`guidedPractice`, `independentPractice`, `masteryQuiz`,
`multiPartPractice`) in all `.ts` files under `lib/lessons/year7/` and `lib/lessons/year8/`.
All files use the same `answer(...)` / `choice(...)` factories. `answer` auto-generates accepted
variants: thousands separators (4+ digit ints), `.0` for ints, trailing `0` for decimals, the
`0.x`→`.x` form, and (in year7/integers only) a unicode-minus variant. Questions were evaluated as
RESOLVED.

---

## lib/lessons/year7/integers.ts

No issues found. All five lessons (number line, add/subtract, multiply/divide, BEDMAS, problem
solving) recompute correctly; MCQ keys and distractors verified; the `answer` helper supplies the
unicode-minus form for negative answers so typed `−6` etc. mark correctly.

## lib/lessons/year7/fractions.ts

- [P4] fractions-decimals-conversion::y7-frc-cvt-i3 — accepted answer list for `2/3 → 0.6666...`
  includes `"0.67"`, a rounded approximation that is not equal to 2/3. Accepting it is lenient (does
  not mis-mark a correct student) but technically marks a wrong value as correct. Evidence: 2/3 =
  0.6666…, not 0.67. Low impact.
- [P4] fractions-decimals-conversion::y7-frc-cvt-g4 / i3 / m5 — recurring-decimal answers stored as
  `0.1666...`, `0.6666...`, `0.1111...` with accepted variants that include combining-overline
  glyphs (`0.1̄6̄`, `0.6̄`). These exotic forms will not normalize to anything a student types; the
  primary `0.x...` form is the only realistic match. Not a mismark, just dead accepted entries.

Otherwise mathematically correct throughout (types/equivalence, comparing/ordering, add/subtract,
multiply/divide, decimal operations). Mixed-number answers consistently list both mixed and improper
forms where relevant.

## lib/lessons/year7/algebraicTechniques.ts

No issues found. Notation, like terms, expanding, factorising, substitution all recompute correctly.
Power/expression answers (`m^3`, `4a^2`, `6x+4`, `a^2+b^2`) supply superscript and spacing variants;
`x²⇔x^2`/`x³⇔x^3` auto-normalization covers the rest.

## lib/lessons/year7/percentages.ts

- [P4] percentage-applications::y7-pct-app-m8 — prompt states "After a 12% GST … bill comes to
  $112" in a lesson whose teaching says Australian GST is 10%. The arithmetic is internally
  consistent (112 ÷ 1.12 = 100, answer 100) so it is NOT a mismark, but the 12% figure contradicts
  the lesson's own GST rate. Realism nit only.

Otherwise correct: conversions, percentage-of-quantity, increase/decrease, GST/discount/mark-up and
unitary-method applications all recompute correctly.

## lib/lessons/year7/equations.ts

No issues found. One/two-step equations, worded problems, and `ax²=c` quadratics all correct. The
quadratic lesson deliberately asks for "the positive solution"/"the negative solution" to keep
answers atomic and auto-markable — good design, not a multi-part candidate.

## lib/lessons/year7/indices.ts

No issues found. Factors/multiples/HCF/LCM, primes/prime-factorisation, squares/cubes/roots, index
laws, and zero-index all recompute correctly. Index-form answers (`2^2*5`, `2^4*3`, etc.) list `x`,
`×`, and `*` separator variants. y7-ind-fac-m9 accepts both `12` and `30` (both genuinely satisfy
HCF(n,18)=6), so the multi-valued prompt does not mismark.

## lib/lessons/year7/perimeter.ts

- [P4] perimeter-composite-shapes::y7-per-com-i4 — explanation is self-contradictory/garbled
  ("the missing horizontal = 8 − 3 = 5 cm, but that is already given"). The answer 28 is consistent
  with sides {8,6,3,3,5,3}, so no mismark, but the worded reasoning is confusing. Wording only.

Otherwise correct: polygon perimeters, composite/rectilinear shapes, and real-world problem solving
(fencing cost, unit conversion, missing-side) all recompute correctly.

## lib/lessons/year7/area.ts

No issues found. Rectangles/triangles, parallelograms/rhombus/trapezoid, composite shapes (add and
subtract methods, including the cross-shape overlap subtraction), and problem solving (cost, unit
conversion m²↔cm², tile counts) all recompute correctly.

## lib/lessons/year7/angles.ts

No issues found. Angle types/relationships, triangles (sum + exterior-angle), quadrilaterals (360°
sum + special-quad properties), parallel lines/transversals, and multi-step problem solving all
recompute correctly, including the ratio and algebraic-angle questions.

## lib/lessons/year7/data.ts

- [P4] dot-plots-stem-and-leaf::y7-dat-dot-g3 — explanation contains the draft-wording marker
  "Wait —" ("Wait — 14 and 22 both appear 3 times"). The dataset is genuinely bimodal (14 and 22 each
  ×3); both modes are accepted so it does not mismark, but the prompt asks for a single mode and the
  explanation reads like an un-cleaned draft.
- [P4] dot-plots-stem-and-leaf::y7-dat-dot-m4 — same bimodal issue (23 and 31 each ×3); both
  accepted, single-answer prompt. Minor.
- [P4] choosing-and-interpreting-displays::y7-dat-int-i5 — prompt asks for THE two consecutive weeks
  with the greatest increase, but three week-pairs tie at +$15 (1–2, 3–4, 4–5). All three are in the
  accepted list so no mismark, but the explanation is a rambling un-cleaned draft ("… all tie.
  Listing Week 4–5 as the answer."). Ambiguous-by-design + draft wording.

Otherwise correct: data types, frequency/relative-frequency tables, dot/stem-and-leaf plots
(mode/median/range, back-to-back reading), column/bar/line graphs (incl. misleading-axis questions),
and display-choice questions all recompute correctly.

