# Year 12 Extension 2 Proof Skill Map v2 Plan

Created: June 2026
Phase 1 implemented: June 2026

---

## 1. Current Scaffold State

`year-12-extension-2` is registered in `lib/newCourseCatalog.ts` with status `in_progress`. The `proof` unit now has Phase 1 lesson seeds and a dedicated override file.

| Field | Value |
|---|---|
| Unit slug | `proof` |
| Unit title | Proof |
| Unit description (catalog) | Planned Extension 2 proof work including advanced induction, contradiction, contrapositive reasoning and inequality proofs. |
| Lessons | 3 active lessons (Phase 1) |
| Override file | `lib/lessons/year12Extension2/proof.ts` |
| Override wired in `buildLesson` | Yes |
| Export in `index.ts` | Yes |
| Questions in bank | 57 Proof questions in dry-run seed output |
| Skill Map v2 metadata | `stableSkillId` + checkpoints on all 3 Phase 1 lessons |

The unit slug `proof` is distinct from the Extension 1 unit `proof-induction`. No slug collision exists.

**Related Extension 1 content already live** (`lib/lessons/year12Extension1/proofInduction.ts`):
- `intro-to-mathematical-induction` — summation formulae, base case + inductive step structure
- `induction-divisibility` — divisibility proofs by exposing multiples
- `induction-inequalities` — inequality proofs, correct base case selection

Extension 2 Proof must go substantially beyond Ext 1 induction: contradiction, contrapositive, inequality techniques, and advanced induction applications (products, recurrences, compound formulae).

---

## 2. Source Files To Create Or Update

| File | Change |
|---|---|
| `lib/lessons/year12Extension2/proof.ts` | New override file; one export per lesson |
| `lib/lessons/year12Extension2/index.ts` | Add `export * from "./proof"` |
| `lib/newCourseCatalog.ts` | Add lesson seeds to `proof` unit with `stableSkillId` + `skillCheckpoints`; import `year12Extension2ProofLessonOverride`; wire into `buildLesson` after existing Extension 2 overrides |
| `docs/YEAR12_EXTENSION2_HSC_STATUS.md` | Update proof row from "Planned only" to "N lessons active (Phase 1)"; update lesson count and question-bank count after dry-run |

Do not touch checkout, auth, payments, Supabase writes, or unrelated routes. Do not rename existing Extension 2 slugs.

---

## 3. Proposed First-Release Lesson Split (6 lessons)

This is a first real Proof release, not complete Extension 2 Proof coverage. Six focused Skill Map v2 lessons cover all NSW Extension 2 Proof content strands; implement the first three in Phase 1.

---

### Lesson 1: Proof by Contradiction

| Field | Plan |
|---|---|
| Slug | `proof-by-contradiction` |
| Title | Proof by Contradiction |
| Stable skill ID | `y12e2-proof-proof-by-contradiction` |
| Learning goal | Assume the negation of a statement, derive a logical or arithmetic contradiction, and conclude the original statement must be true. |
| Prerequisites | Year 12 Advanced algebra; understanding of rational vs irrational numbers; familiarity with number parity. |
| Worked example themes | (1) Prove √2 is irrational: assume p/q in lowest terms, show 2 \| p, then 2 \| q, contradiction. (2) Prove there is no greatest prime: assume a finite set, construct a product + 1, derive contradiction. (3) Prove that if n² is even then n is even (via contradiction; contrast with Lesson 2 contrapositive approach). |
| Practice focus | MCQ to identify the correct assumption to negate; typed values for intermediate algebraic steps (e.g. a specific exponent or divisor); MCQ to identify where the contradiction occurs. |
| Visual payload needs | None. All proof steps are algebraic or number-theoretic. |
| Answer-marking risks | "Derive the contradiction" is free-text. Author the contradiction step as a worked example and assess it via MCQ ("Which of these represents the contradiction?") or by asking for a specific numeric consequence. Never ask for a free-form proof paragraph as a typed answer. |
| Multi-part appropriate | Yes. A 3-part chain: (a) MCQ — state the assumption that begins the contradiction proof; (b) typed — given the assumption p/q in lowest terms and p = 2m, state the value of p² in terms of m; (c) MCQ — which of these correctly identifies the contradiction? |
| Checkpoints | (a) State the assumption that begins a proof by contradiction; (b) Derive the key consequence that creates the contradiction; (c) Identify which property or condition is violated; (d) Write a correct concluding sentence for the proof. |

---

### Lesson 2: Proof by Contrapositive

| Field | Plan |
|---|---|
| Slug | `proof-by-contrapositive` |
| Title | Proof by Contrapositive |
| Stable skill ID | `y12e2-proof-proof-by-contrapositive` |
| Learning goal | Convert a conditional P → Q to its contrapositive ¬Q → ¬P, recognise when contrapositive proof is easier, and complete the contrapositive argument. |
| Prerequisites | Basic conditional logic (if–then statements); Extension 1 proof structure; Year 12 parity and divisibility. |
| Worked example themes | (1) Prove: if n² is odd then n is odd. Contrapositive: if n is even then n² is even. (2) Prove: if n² is divisible by 3 then n is divisible by 3. (3) Prove: if xy is irrational then at least one of x, y is irrational. |
| Practice focus | MCQ to state the correct contrapositive of a given conditional; typed value of a specific algebraic expression in the contrapositive proof; MCQ to identify whether contrapositive or contradiction is more appropriate. |
| Visual payload needs | None. |
| Answer-marking risks | Contrapositive statements have multiple equivalent wordings — ask for a specific algebraic consequence (numeric or MCQ) rather than asking students to write the full contrapositive statement as free text. |
| Multi-part appropriate | Yes. (a) MCQ — choose the correct contrapositive of a given statement; (b) typed — in the contrapositive proof, if n = 2k then n² equals what in terms of k? (c) MCQ — does this complete the proof of the original statement? |
| Checkpoints | (a) Form the contrapositive ¬Q → ¬P from a given conditional P → Q; (b) Identify when contrapositive proof is simpler than direct proof; (c) Complete a contrapositive argument with a correct algebraic step; (d) Link the proven contrapositive back to the truth of the original conditional. |

---

### Lesson 3: Inequalities and Algebraic Proof

| Field | Plan |
|---|---|
| Slug | `inequalities-algebraic-proof` |
| Title | Inequalities and Algebraic Proof |
| Stable skill ID | `y12e2-proof-inequalities-algebraic-proof` |
| Learning goal | Use algebraic manipulation — completing a square, sum-of-squares arguments, AM-GM, and factored forms — to prove inequalities without induction. |
| Prerequisites | Year 12 Advanced algebra; perfect square expansion; understanding of non-negative squares; basic modulus/absolute value. |
| Worked example themes | (1) Prove a² + b² ≥ 2ab for all real a, b by showing (a − b)² ≥ 0. (2) Prove that for positive reals x + 1/x ≥ 2 using AM-GM. (3) Prove a specific quadratic expression is always non-negative by completing the square. |
| Practice focus | Typed value of an expanded or factored intermediate expression; MCQ to select the key algebraic move (e.g. "which identity is the correct first step?"); typed value of a specific coefficient or discriminant to confirm the expression is non-negative. |
| Visual payload needs | None. All work is algebraic. |
| Answer-marking risks | Full algebraic expressions in typed answers have many equivalent forms. Avoid asking for a full rearranged expression; instead ask for a specific coefficient, discriminant value, or perfect-square constant. For AM-GM-style questions, ask for the equality condition (a numeric value) or a yes/no classification as MCQ. |
| Multi-part appropriate | Yes — this is the clearest use case for a D5 inequality multi-part: (a) expand (a − b)²; (b) rearrange to show a² + b² − 2ab ≥ 0; (c) MCQ — when does equality hold? Part (a) and (b) answers must be numeric or typed exact coefficients, not symbolic expressions. |
| Checkpoints | (a) Expand and simplify a perfect-square expression; (b) Argue from a non-negative square to an algebraic inequality; (c) Apply the AM-GM inequality to positive real numbers; (d) Use completing the square to prove a quadratic is always non-negative. |

---

### Lesson 4: Advanced Mathematical Induction

| Field | Plan |
|---|---|
| Slug | `advanced-mathematical-induction` |
| Title | Advanced Mathematical Induction |
| Stable skill ID | `y12e2-proof-advanced-mathematical-induction` |
| Learning goal | Apply mathematical induction to products, recursive sequences, compound angle formulae, and inequality problems that go beyond the summation and divisibility patterns taught in Extension 1. |
| Prerequisites | Extension 1 `intro-to-mathematical-induction`, `induction-divisibility`, `induction-inequalities` — all three active lessons. |
| Worked example themes | (1) Prove a product formula: e.g. ∏(1 − 1/k²) = (n+1)/2n by induction. (2) Prove an inequality requiring a looser bound argument: e.g. 2^n > n² for n ≥ 5. (3) Prove a recursively defined sequence satisfies a closed-form formula or stays within a bound. |
| Practice focus | Typed value of the base case expression; typed value of the expression after substituting the inductive hypothesis and adding the (k+1) term; MCQ to identify the correct manipulation step in the inductive step. |
| Visual payload needs | None. |
| Answer-marking risks | Inductive step working is not auto-markable in full. Author the full derivation in worked examples and assess specific intermediate values — the base case result, a stated recurrence term, or a key simplified coefficient. Never ask for a fully written proof as a typed answer. |
| Multi-part appropriate | Yes: (a) compute the base case expression; (b) given the inductive hypothesis, compute the next term added; (c) confirm that the result matches the formula for n = k + 1 (MCQ or numeric). |
| Checkpoints | (a) Verify the base case for an induction involving products or inequalities; (b) State the inductive hypothesis precisely for a product or recursive formula; (c) Manipulate the k + 1 case algebraically to match the required form; (d) Identify the correct base case when the result only holds from n = N for some N > 1. |

---

### Lesson 5: Divisibility and Integer Proof

| Field | Plan |
|---|---|
| Slug | `divisibility-integer-proof` |
| Title | Divisibility and Integer Proof |
| Stable skill ID | `y12e2-proof-divisibility-integer-proof` |
| Learning goal | Prove divisibility results without induction using parity arguments, factored forms, modular-arithmetic reasoning, and the properties of consecutive integers. |
| Prerequisites | Year 12 Advanced algebra; Extension 1 induction divisibility; basic number theory (even/odd, multiples). |
| Worked example themes | (1) Prove m(m+1)(m+2) is always divisible by 6 by arguing one factor is even and one of three consecutive integers is divisible by 3. (2) Prove n² − 1 is divisible by 8 for all odd n using n = 2k+1 and factoring (n−1)(n+1). (3) Prove a difference of squares identity and use it to show a specific expression is always composite. |
| Practice focus | Typed value of a specific factor or residue; MCQ to select the correct factored form; typed value of a divisor shown to divide an expression. |
| Visual payload needs | None. |
| Answer-marking risks | Parity conclusions are best assessed by MCQ ("even" / "odd" / "divisible by 6") or by asking for a specific numeric quotient, factor, or exponent. Avoid asking for full algebraic manipulations as typed free text. |
| Multi-part appropriate | Yes: (a) write n in the form 2k+1; (b) typed — expand (2k+1)² − 1 in terms of k; (c) MCQ — identify the factor that shows divisibility by 8. |
| Checkpoints | (a) Write an odd integer in the form 2k+1 and an even integer in the form 2k; (b) Factor an expression to expose a required divisor; (c) Argue that a product of consecutive integers contains specific multiples; (d) Conclude a divisibility result from a factored or residue argument. |

---

### Lesson 6: Proof Exam Practice

| Field | Plan |
|---|---|
| Slug | `proof-exam-practice` |
| Title | Proof Exam Practice |
| Stable skill ID | `y12e2-proof-proof-exam-practice` |
| Learning goal | Select the appropriate proof technique for a given problem and execute it in exam conditions, covering contradiction, contrapositive, algebraic inequality, and advanced induction. |
| Prerequisites | Lessons 1–5; Extension 1 proof induction lessons. |
| Worked example themes | (1) Mixed proof selection: given a statement, identify whether contradiction, contrapositive, or direct proof is most efficient. (2) A 3–4 mark HSC-style inequality proof using algebraic manipulation. (3) An induction proof for a product or recursive bound. |
| Practice focus | D3–D5 mixed questions; MCQ for proof method selection; typed intermediate values for specific proof steps; one `multiPartPractice` item reproducing a full HSC Section II-style proof question with typed numeric parts and MCQ method classification. |
| Visual payload needs | None. |
| Answer-marking risks | Mixed exam questions naturally invite "show that", "prove", and "justify". Keep every marked part numeric, MCQ, or a specific algebraic value. Derivation steps belong in worked examples, not in typed practice answers. |
| Multi-part appropriate | Yes — required here. Should carry one Section II-style item with 3–4 parts: (a) MCQ — identify the proof technique; (b) typed — compute the base case or key algebraic value; (c) typed — state a specific consequence from the inductive hypothesis; (d) MCQ — which of these is a correct concluding sentence? |
| Checkpoints | (a) Identify the most efficient proof technique for a given statement; (b) Execute a key algebraic or arithmetic step inside a proof argument; (c) Recognise a valid proof structure vs a circular or incomplete argument; (d) Write a correct concluding sentence linking the proof steps to the original claim. |

---

## 4. Phase 1 Chunk

Implemented these three lessons first:

1. `proof-by-contradiction`
2. `proof-by-contrapositive`
3. `inequalities-algebraic-proof`

**Rationale:**

- These three introduce the two new proof techniques unique to Extension 2 (contradiction and contrapositive) plus the algebraic inequality approach.
- None require Extension 1 Proof as a hard prerequisite — students who missed Ext 1 induction can still access them.
- All three need no visual payloads, no new diagram types, and no floating-point answers — the cleanest possible auto-marking surface.
- Together they cover three of the four NSW Extension 2 Proof content strands and give the Proof unit real content for the first time.
- Advanced induction (`advanced-mathematical-induction`) is deferred to Phase 2 because it requires solid Extension 1 induction fluency and the inductive step marking risk is higher.

Phase 2 adds: `advanced-mathematical-induction`, `divisibility-integer-proof`, `proof-exam-practice`.

**Phase 1 question counts:** 4 guided + 5 independent + 10 mastery = 19 per lesson x 3 = **57 questions**. No optional `multiPartPractice` was added in Phase 1.

**Stable IDs for Phase 1:**

```
y12e2-proof-proof-by-contradiction
y12e2-proof-proof-by-contrapositive
y12e2-proof-inequalities-algebraic-proof
```

---

## 5. Route and Progress Risks

| Risk | Recommendation |
|---|---|
| Empty unit becomes visible without overrides | Add catalog seeds and `proof.ts` override file in the same PR. |
| Placeholder fallback content leaks into Proof | Guard every override with `course.slug === "year-12-extension-2"` and `unit.slug === "proof"` for every new lesson slug. |
| Slug collision with Extension 1 | Extension 1 unit is `proof-induction`, Extension 2 unit is `proof`. Lesson slugs are fully distinct — no collision. |
| "Prove" / "show that" prompts leak into practice | Enforce the constraint at authoring time: derivations go in `workedExamples` only; `guidedPractice`, `independentPractice`, and `masteryQuiz` use MCQ method-selection or typed specific values. |
| Multi-part free-text answers silently mis-marked | Every part must have a specific numeric answer, MCQ label, or canonical single-word answer. The question-authoring audit warns on "explain", "justify", "show that", "prove" in `parts[].prompt`. |
| Progress keys from future migration | No existing Proof lesson slugs, so no hidden legacy aliases are needed in Phase 1. Low risk. |
| Dry-run seed includes fallback content | Run dry-run after implementation and confirm that only the three Phase 1 lessons produce questions; fallback content must not appear for the empty Phase 2 slots. |

---

## 6. Visual Needs

No new visual payload type is required for any Proof lesson, Phase 1 or Phase 2.

| Lesson | Phase 1 | Phase 2 |
|---|---|---|
| `proof-by-contradiction` | None | None |
| `proof-by-contrapositive` | None | None |
| `inequalities-algebraic-proof` | None | Optional number-line for inequality direction |
| `advanced-mathematical-induction` | None (Phase 2) | None |
| `divisibility-integer-proof` | None (Phase 2) | None |
| `proof-exam-practice` | None (Phase 2) | None |

Proof is a text-and-algebra topic. No `cartesianGraph`, `vector3DDiagram`, or `argandDiagram` payloads are needed. If a question references a number line for inequality direction, embed the description in the prompt text — do not use a diagram payload.

---

## 7. Marking Risks Summary

Proof carries the highest auto-marking risk of any Extension 2 unit because the natural outputs of proof work — written arguments, algebraic manipulations, conditional statements — are all free text.

| Risk | Mitigation |
|---|---|
| "Show that" / "prove" prompts | Put all derivations in `teaching` and `workedExamples`; never in `guidedPractice`, `independentPractice`, or `masteryQuiz` |
| Full algebraic expressions with equivalent forms | Ask for a specific coefficient, constant, or exponent — not the full expression |
| Contrapositive statement written as free text | Use MCQ: provide 4 candidate statements, one of which is the correct contrapositive |
| Contradiction conclusion as free text | Use MCQ: "Which of these represents the contradiction?" |
| "When does equality hold?" | Accepts a single numeric value (e.g. `"1"` for x = y = 1 in AM-GM) — fully safe |
| Inductive step values | Ask for the numeric base-case result or a specific intermediate algebraic term, not the full step |
| Parity conclusions ("even" / "odd") | Safe typed answers — add `["even", "Even"]` to `acceptedAnswers` |
| Divisibility conclusions ("divisible by 6") | Use MCQ: choose the correct divisor from 4 options |
| Proof method selection | Always MCQ: "Which technique would you use to prove this statement?" |

---

## 8. Course Status Recommendation

**Completed:** `year-12-extension-2` changed from `coming_soon` to `in_progress` after Proof Phase 1 landed.

Rationale: once Proof Phase 1 is complete, every NSW Extension 2 topic area will have at least some real lesson content for the first time. The Proof unit has been the sole completely empty topic, making `coming_soon` the only honest description. With three Proof lessons added:

| Unit | Status after Phase 1 |
|---|---|
| Proof | 3 lessons active (Phase 1) |
| Vectors in 3D | 4 lessons active |
| Complex Numbers | 4 lessons active |
| Calculus | 3 lessons active (Phase 1) |
| Mechanics | 3 lessons active (Phase 1) |

**Total: 17 lessons active across all 5 NSW Extension 2 topic areas.**

This is the inflection point. `in_progress` is honest — all five units exist, but Calculus, Mechanics, and Proof are each partial. `available` should wait until at least Proof and one of Calculus/Mechanics reach full Phase 2 completion.

The `description` and `positioning` copy in `newCourseCatalog.ts` must also be updated when status changes — remove references to "no real lessons" and replace with an accurate count of active topics and partial units.

---

## 9. Implementation Prompt

```text
Task: Implement Year 12 Extension 2 Proof Skill Map v2 Phase 1.

Work in c:\Users\joshu\hsc-maths-coach.
Do not touch checkout/auth/payments. Do not write to Supabase.

Read before coding:
- docs/YEAR12_EXTENSION2_PROOF_SKILL_MAP_V2_PLAN.md (this file)
- docs/YEAR12_EXTENSION2_CALCULUS_SKILL_MAP_V2_PLAN.md (structure reference)
- lib/lessons/year12Extension2/calculus.ts (question/override style reference)
- lib/lessons/year12Extension1/proofInduction.ts (proof domain reference)
- docs/QUESTION_AUTHORING_STANDARD.md
- node_modules/next/dist/docs/ (check any Next.js API used)

Implement only the first three Proof lessons:
- proof-by-contradiction
- proof-by-contrapositive
- inequalities-algebraic-proof

Create:
- lib/lessons/year12Extension2/proof.ts

Update:
- lib/lessons/year12Extension2/index.ts (add export * from "./proof")
- lib/newCourseCatalog.ts:
    - Add lesson seeds to the proof unit with stableSkillId + skillCheckpoints
    - Import year12Extension2ProofLessonOverride
    - Wire it into buildLesson after year12Extension2MechanicsLessonOverride
    - Update course status from coming_soon to in_progress
    - Update description and positioning to reflect 5 active units (all partial)
- docs/YEAR12_EXTENSION2_HSC_STATUS.md (update proof row and lesson count)

For each lesson:
- 4 guided + 5 independent + 10 mastery = 19 questions
- Skill Map v2 metadata: stableSkillId + 4 skillCheckpoints per lesson in catalog
- Auto-markable answers only: MCQ labels, specific numeric values, parity words ("even"/"odd"), exact algebraic coefficients
- NO typed free-text: no "prove", "show that", "justify", "explain", "describe" in any practice question prompt
- Derivations and full proof steps go in teaching paragraphs and workedExamples only
- Optional multiPartPractice on proof-by-contradiction and inequalities-algebraic-proof only if every part is MCQ or exact numeric

Question ID prefix: y12e2-proof-

Validation:
- npm run audit:lessons
- npm run typecheck
- npx tsx scripts/seed-question-bank.ts --course=year-12-extension-2 --dry-run
- git diff --check
- Confirm dry-run shows 57 new questions (19 × 3) with 0 warnings
- Confirm proof-exam-practice, advanced-mathematical-induction, divisibility-integer-proof are NOT seeded (not yet in catalog)
```
