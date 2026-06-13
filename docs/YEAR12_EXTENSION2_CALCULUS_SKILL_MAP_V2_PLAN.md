# Year 12 Extension 2 Calculus Skill Map v2 Plan

Created: June 2026  
Scope: Planning only; no lesson code authored.

## 1. Current Scaffold State

`year-12-extension-2` is registered in `lib/newCourseCatalog.ts` with status `coming_soon`. The course has five NSW Extension 2 topic areas:

| Unit slug | Current state |
|---|---|
| `proof` | Planned only; no lessons |
| `vectors-3d` | Active; 4 lesson slugs, override file present |
| `complex-numbers` | Active; 4 lesson slugs, override file present, Skill Map v2 metadata pilot |
| `calculus` | Planned only; no lessons |
| `mechanics` | Planned only; no lessons |

The `calculus` unit currently has this catalog description: planned Extension 2 calculus including integration techniques, volumes of revolution and differential equations. Its lesson array is empty, so unit and lesson routes for Calculus have no real student-facing content.

`lib/lessons/year12Extension2/` currently contains only:

- `complexNumbers.ts`
- `vectors3D.ts`
- `index.ts`

`index.ts` exports only Complex Numbers and Vectors in 3D. There is no `calculus.ts` override file and no `year12Extension2CalculusLessonOverride` in the build chain.

## 2. Source Files To Create Or Update

Phase 1 implementation should touch only course catalog and lesson-authoring files:

| File | Change |
|---|---|
| `lib/newCourseCatalog.ts` | Add `calculus` lesson seeds with `stableSkillId`, `legacySlugs`, and `skillCheckpoints`; import and call the Calculus override after existing Extension 2 overrides |
| `lib/lessons/year12Extension2/calculus.ts` | New override file containing the authored lessons |
| `lib/lessons/year12Extension2/index.ts` | Export `./calculus` |
| `docs/YEAR12_EXTENSION2_HSC_STATUS.md` | Update active lesson count, question-bank count after dry-run, and Calculus status |

Do not touch checkout, auth, payments, Supabase writes, or unrelated route code. Do not rename existing Complex Numbers or Vectors slugs.

## 3. Proposed First-Release Lesson Split

This is a first real Calculus release, not complete Extension 2 Calculus coverage. The unit should start with 4-6 granular Skill Map v2 lessons; implement the first three first.

### Lesson 1: Advanced Integration Method Selection

| Field | Plan |
|---|---|
| Slug | `advanced-integration-method-selection` |
| Title | Advanced Integration Method Selection |
| Learning goal | Choose between substitution, parts, algebraic rearrangement, partial fractions, and trigonometric identities before calculating. |
| Prerequisites | Year 12 Advanced integral calculus; Extension 1 trig integrals, substitution, and introductory parts. |
| Worked example themes | Classify integrals by structure; choose a first step for rational functions; choose between substitution and parts for products/composites. |
| Practice focus | Mostly MCQ/method-selection and short typed first-step outputs, avoiding long equivalent antiderivatives. |
| Visual payload needs | None. |
| Answer-marking risks | Full antiderivatives have many equivalent forms; prefer method labels, constants, partial-fraction coefficients, or evaluated numeric values. |
| Multi-part appropriate | Yes, one optional method-selection chain is appropriate, but not required in Phase 1. |

### Lesson 2: Integration By Parts Extension

| Field | Plan |
|---|---|
| Slug | `integration-by-parts-extension` |
| Title | Integration by Parts Extension |
| Learning goal | Apply integration by parts to repeated parts, logarithmic integrals, definite integrals, and products involving trig/exponential functions. |
| Prerequisites | Extension 1 `integration-by-parts`; standard trig and exponential integrals; definite integral evaluation. |
| Worked example themes | `x^2e^x` by repeated parts; `x\ln x` or `\int \ln x dx`; definite parts integral with clean exact limits. |
| Practice focus | Choosing `u` and `dv`, computing a requested coefficient/value, and evaluating definite results with exact answers. |
| Visual payload needs | None. |
| Answer-marking risks | Equivalent expressions such as `e^x(x^2-2x+2)+C` versus expanded form; avoid asking for broad indefinite integrals in typed answers unless accepted variants are exhaustive. |
| Multi-part appropriate | Yes. A 3-part fluency chain can ask for `u`, an intermediate integral, then a definite value. |

### Lesson 3: Reduction Formulae Introduction

| Field | Plan |
|---|---|
| Slug | `reduction-formulae-introduction` |
| Title | Reduction Formulae Introduction |
| Learning goal | Derive and use simple reduction formulae for recursively evaluating families of integrals. |
| Prerequisites | Integration by parts, definite integrals, powers of sine/cosine, algebraic recurrence notation. |
| Worked example themes | Derive `I_n` for `\int x^ne^x dx`; use a supplied reduction formula to find `I_2` or `I_3`; evaluate simple sine/cosine power recurrence with supplied base case. |
| Practice focus | Fill recurrence coefficients, compute next value from a supplied recurrence, identify base cases. |
| Visual payload needs | None. |
| Answer-marking risks | Derivation/proof is not auto-markable; author derivations as worked examples, then assess coefficients or numeric recurrence outputs. |
| Multi-part appropriate | Yes. This is one of the best places for D5 multi-part practice: base value -> recurrence step -> final exact value. |

### Lesson 4: Partial Fractions And Rational Integrals

| Field | Plan |
|---|---|
| Slug | `partial-fractions-rational-integrals` |
| Title | Partial Fractions and Rational Integrals |
| Learning goal | Decompose rational functions and integrate forms that produce logarithmic terms. |
| Prerequisites | Algebraic factorisation, solving simultaneous linear equations, logarithmic integrals. |
| Worked example themes | Distinct linear factors; repeated linear factor; improper rational expression requiring division first. |
| Practice focus | Coefficients `A`, `B`, `C`; selecting the correct decomposition form; evaluated definite rational integrals. |
| Visual payload needs | None. |
| Answer-marking risks | Equivalent log combinations are difficult to mark; prefer coefficient questions or definite integrals with exact simplified values. |
| Multi-part appropriate | Yes: decompose -> integrate/evaluate -> identify domain or log absolute-value issue. |

### Lesson 5: Volumes Of Solids Of Revolution

| Field | Plan |
|---|---|
| Slug | `volumes-solids-of-revolution` |
| Title | Volumes of Solids of Revolution |
| Learning goal | Set up and evaluate volumes formed by rotating a region about an axis using disc/washer methods. |
| Prerequisites | Definite integrals, area between curves, graph interpretation, algebraic rearrangement. |
| Worked example themes | Rotate under `y=f(x)` about the x-axis; washer volume between two curves; rotate with respect to y after rearranging. |
| Practice focus | Selecting the correct integrand, limits, axis, and final exact volume. |
| Visual payload needs | `cartesianGraph` for regions where the student must read boundaries or compare curves. No new 3D solid renderer should be required for Phase 1. |
| Answer-marking risks | Students may omit `\pi`, square the wrong radius, or use area instead of volume; typed answers need variants like `pi/2`, `\pi/2`, and decimal only where intended. |
| Multi-part appropriate | Yes, but best after the single-output setup skills are stable. |

### Lesson 6: Calculus Exam Practice

| Field | Plan |
|---|---|
| Slug | `calculus-exam-practice` |
| Title | Calculus Exam Practice |
| Learning goal | Solve mixed Extension 2 calculus questions by selecting methods, managing exact values, and checking constraints. |
| Prerequisites | Lessons 1-5; Extension 1 calculus fluency. |
| Worked example themes | Mixed integration method selection; reduction formula application; volume setup and evaluation. |
| Practice focus | D3-D5 mixed questions, including one optional HSC-style `multiPartPractice`. |
| Visual payload needs | `cartesianGraph` only for volume/area graph stimuli. |
| Answer-marking risks | Mixed exam prompts often invite free-text reasoning; keep all marked parts exact/numeric/classification. Avoid "show that", "prove", and "justify" until free-text marking exists. |
| Multi-part appropriate | Yes. This lesson should carry the clearest Section II-style multi-part item. |

## 4. Recommended Phase 1 Chunk

Implement these first:

1. `advanced-integration-method-selection`
2. `integration-by-parts-extension`
3. `reduction-formulae-introduction`

Rationale: these lessons build directly from Extension 1 Further Calculus, need no new visual payloads, and create the procedural base for partial fractions and volumes. They also let the Calculus unit become active without pretending to complete all Extension 2 calculus.

Each Phase 1 lesson should follow the current standard 4 guided + 5 independent + 10 mastery questions, with optional `multiPartPractice` only where every part is auto-markable. Use stable IDs such as:

- `y12e2-calc-advanced-integration-method-selection`
- `y12e2-calc-integration-by-parts-extension`
- `y12e2-calc-reduction-formulae-introduction`

## 5. Route And Progress Risks

| Risk | Recommendation |
|---|---|
| Empty unit becomes visible without real overrides | Add catalog seeds and override file in the same implementation PR. |
| Placeholder fallback lesson content leaks into Ext2 | Ensure the override guard matches `course.slug === "year-12-extension-2"` and `unit.slug === "calculus"` for every new slug. |
| Existing progress keys break | Low risk: Calculus has no existing lesson slugs, so no hidden legacy aliases are needed for Phase 1. |
| Question seeding includes fallback content | Run dry-run seed after implementation and confirm only authored Calculus questions are prepared. |
| Multi-part exact marking rejects correct equivalent answers | Keep multi-part answers numeric, coefficient-based, or classification-based; avoid full-equation and proof answers. |
| Visual expectations exceed renderer support | Use no visuals in Phase 1; use `cartesianGraph` only when adding volumes later. |

## 6. Visual Needs

Phase 1 requires no new visual payload types.

Later volumes lessons should use `cartesianGraph` for the 2D region and axis/bounds where the visual is part of the question. A 3D solid-of-revolution renderer would be useful later, but it is not required for first release. If no faithful diagram is available, keep the prompt self-contained and do not ask students to "use the diagram".

## 7. Marking Risks

Extension 2 Calculus has high exact-answer risk. Prefer:

- MCQ for method selection,
- typed coefficient values for partial fractions and recurrence formulae,
- definite integral values over broad indefinite antiderivatives,
- exact numeric outputs for multi-part practice,
- accepted-answer variants for fractions, `\pi`, logarithms, and minus signs.

Avoid marked prompts containing "explain", "justify", "show that", "prove", "derive", or "describe". Derivations belong in teaching and worked examples until free-text marking exists.

## 8. Course Status Recommendation

Keep `year-12-extension-2` as `coming_soon` after this Calculus Phase 1 release.

Reason: even with three real Calculus lessons, Proof and Mechanics remain empty, and Calculus would still be partial. A more honest later status change would require at least one credible first-release unit in each of Proof, Calculus, and Mechanics, plus updated status documentation and seed dry-run evidence.

## 9. Implementation Prompt

```text
Task: Implement Year 12 Extension 2 Calculus Skill Map v2 Phase 1.

Work in c:\Users\joshu\hsc-maths-coach.
Do not touch checkout/auth/payments. Do not write to Supabase.

Implement only the first three Calculus lessons:
- advanced-integration-method-selection
- integration-by-parts-extension
- reduction-formulae-introduction

Create:
- lib/lessons/year12Extension2/calculus.ts

Update:
- lib/lessons/year12Extension2/index.ts
- lib/newCourseCatalog.ts
- docs/YEAR12_EXTENSION2_HSC_STATUS.md

For each lesson:
- follow 4 guided + 5 independent + 10 mastery questions
- add Skill Map v2 metadata in the catalog
- use only auto-markable answers
- include accepted answer variants for exact forms
- avoid free-text proof/show-that prompts
- add optional multiPartPractice only if every part is exact/numeric/classification

Validation:
- npm run audit:lessons
- npm run typecheck or tsc equivalent used by the repo
- scripts/seed-question-bank.ts --course year-12-extension-2 --dry-run only
- git diff --check
```
